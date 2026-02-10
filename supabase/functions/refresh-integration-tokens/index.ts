// Supabase Edge Function to refresh integration tokens
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface TokenRefreshResult {
  integrationId: string;
  integrationName: string;
  success: boolean;
  error?: string;
  refreshed: boolean;
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    // Get authorization header
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: 'Missing authorization header' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Create Supabase client with user's token
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY');
    
    if (!supabaseUrl || !supabaseAnonKey) {
      return new Response(
        JSON.stringify({ error: 'Server configuration error: Missing Supabase URL or key' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseAnonKey, {
      global: {
        headers: { Authorization: authHeader },
      },
    });

    // Get user from token
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) {
      return new Response(
        JSON.stringify({ error: `Unauthorized: ${userError?.message || 'Invalid or expired token'}` }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Parse request body (optional - if no body, refresh all user's integrations)
    let targetIntegrationId: string | null = null;
    try {
      const body = await req.json().catch(() => ({}));
      targetIntegrationId = body.integration_id || null;
    } catch {
      // No body provided, refresh all integrations
    }

    // Get all connected integrations for the user
    let query = supabase
      .from('user_integrations')
      .select(`
        id,
        integration_type_id,
        access_token,
        refresh_token,
        token_expires_at,
        metadata,
        integration_type:integration_types(name, display_name)
      `)
      .eq('user_id', user.id)
      .eq('status', 'connected');

    if (targetIntegrationId) {
      query = query.eq('id', targetIntegrationId);
    }

    const { data: integrations, error: fetchError } = await query;

    if (fetchError) {
      return new Response(
        JSON.stringify({ error: `Failed to fetch integrations: ${fetchError.message}` }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (!integrations || integrations.length === 0) {
      return new Response(
        JSON.stringify({ 
          message: 'No connected integrations found',
          results: []
        }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const results: TokenRefreshResult[] = [];

    // Refresh tokens for each integration
    for (const integration of integrations) {
      const integrationName = (integration.integration_type as { name: string })?.name || 'unknown';
      const integrationDisplayName = (integration.integration_type as { display_name: string })?.display_name || 'Unknown';
      
      let refreshed = false;
      let error: string | undefined;

      try {
        if (integrationName === 'google') {
          // Refresh Google token
          const refreshResult = await refreshGoogleToken(
            integration.refresh_token,
            integration.id,
            supabase
          );
          refreshed = refreshResult.refreshed;
          error = refreshResult.error;
        } else if (integrationName === 'shopify') {
          // Shopify tokens don't expire, but we can verify they're still valid
          const verifyResult = await verifyShopifyToken(
            integration.access_token,
            integration.metadata as { shop?: string },
            integration.id,
            supabase
          );
          refreshed = verifyResult.refreshed;
          error = verifyResult.error;
        } else {
          // Unknown integration type - skip
          results.push({
            integrationId: integration.id,
            integrationName: integrationDisplayName,
            success: false,
            error: `Unsupported integration type: ${integrationName}`,
            refreshed: false,
          });
          continue;
        }

        results.push({
          integrationId: integration.id,
          integrationName: integrationDisplayName,
          success: !error,
          error,
          refreshed,
        });
      } catch (err) {
        results.push({
          integrationId: integration.id,
          integrationName: integrationDisplayName,
          success: false,
          error: err instanceof Error ? err.message : 'Unknown error',
          refreshed: false,
        });
      }
    }

    const successCount = results.filter(r => r.success).length;
    const refreshedCount = results.filter(r => r.refreshed).length;

    return new Response(
      JSON.stringify({
        message: `Processed ${results.length} integration(s). ${refreshedCount} token(s) refreshed.`,
        total: results.length,
        refreshed: refreshedCount,
        success: successCount,
        results,
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Edge Function error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ error: `Edge Function error: ${errorMessage}` }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

// Refresh Google OAuth token
async function refreshGoogleToken(
  refreshToken: string | null,
  integrationId: string,
  supabase: ReturnType<typeof createClient>
): Promise<{ refreshed: boolean; error?: string }> {
  if (!refreshToken) {
    return { refreshed: false, error: 'No refresh token available' };
  }

  const clientId = Deno.env.get('GOOGLE_CLIENT_ID');
  const clientSecret = Deno.env.get('GOOGLE_CLIENT_SECRET');

  if (!clientId || !clientSecret) {
    return { refreshed: false, error: 'Google OAuth not configured' };
  }

  try {
    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        refresh_token: refreshToken,
        grant_type: 'refresh_token',
      }),
    });

    if (!tokenResponse.ok) {
      const errorData = await tokenResponse.text();
      return { refreshed: false, error: `Token refresh failed: ${errorData}` };
    }

    const tokens = await tokenResponse.json();

    if (!tokens.access_token) {
      return { refreshed: false, error: 'No access token received from Google' };
    }

    // Calculate new expiry
    const expiresAt = tokens.expires_in
      ? new Date(Date.now() + tokens.expires_in * 1000).toISOString()
      : null;

    // Update integration with new token
    const updateData: {
      access_token: string;
      token_expires_at: string | null;
      metadata?: Record<string, unknown>;
    } = {
      access_token: tokens.access_token,
      token_expires_at: expiresAt,
    };

    // Update metadata if scope changed
    if (tokens.scope) {
      const { data: currentIntegration } = await supabase
        .from('user_integrations')
        .select('metadata')
        .eq('id', integrationId)
        .single();

      updateData.metadata = {
        ...(currentIntegration?.metadata as Record<string, unknown> || {}),
        scope: tokens.scope,
        token_type: tokens.token_type || 'Bearer',
        last_refreshed_at: new Date().toISOString(),
      };
    }

    // Save new refresh token if provided (Google sometimes returns a new one)
    if (tokens.refresh_token) {
      const { error: updateError } = await supabase
        .from('user_integrations')
        .update({
          ...updateData,
          refresh_token: tokens.refresh_token,
        })
        .eq('id', integrationId);
      
      if (updateError) {
        return { refreshed: false, error: `Failed to save token: ${updateError.message}` };
      }
    } else {
      // Keep existing refresh token
      const { error: updateError } = await supabase
        .from('user_integrations')
        .update(updateData)
        .eq('id', integrationId);
      
      if (updateError) {
        return { refreshed: false, error: `Failed to save token: ${updateError.message}` };
      }
    }

    return { refreshed: true };
  } catch (error) {
    return {
      refreshed: false,
      error: error instanceof Error ? error.message : 'Unknown error during token refresh',
    };
  }
}

// Verify Shopify token (tokens don't expire but can be revoked)
async function verifyShopifyToken(
  accessToken: string | null,
  metadata: { shop?: string },
  integrationId: string,
  supabase: ReturnType<typeof createClient>
): Promise<{ refreshed: boolean; error?: string }> {
  if (!accessToken) {
    return { refreshed: false, error: 'No access token available' };
  }

  const shop = metadata?.shop;
  if (!shop) {
    return { refreshed: false, error: 'No shop domain in metadata' };
  }

  // Normalize shop domain
  let shopDomain = shop.trim().toLowerCase();
  if (shopDomain.startsWith('http://') || shopDomain.startsWith('https://')) {
    shopDomain = shopDomain.replace(/^https?:\/\//, '');
  }
  if (!shopDomain.endsWith('.myshopify.com')) {
    shopDomain = `${shopDomain}.myshopify.com`;
  }

  try {
    // Verify token by making a simple API call
    const verifyResponse = await fetch(`https://${shopDomain}/admin/api/2024-01/shop.json`, {
      method: 'GET',
      headers: {
        'X-Shopify-Access-Token': accessToken,
        'Content-Type': 'application/json',
      },
    });

    if (!verifyResponse.ok) {
      if (verifyResponse.status === 401) {
        // Token is invalid/revoked
        const { error: updateError } = await supabase
          .from('user_integrations')
          .update({
            status: 'disconnected',
            disconnected_at: new Date().toISOString(),
            error_message: 'Token revoked or invalid',
          })
          .eq('id', integrationId);

        return {
          refreshed: false,
          error: 'Token revoked or invalid. Integration disconnected.',
        };
      }
      return { refreshed: false, error: `Token verification failed: ${verifyResponse.statusText}` };
    }

    // Token is still valid - update last verified timestamp
    const { data: currentIntegration } = await supabase
      .from('user_integrations')
      .select('metadata')
      .eq('id', integrationId)
      .single();

    const { error: updateError } = await supabase
      .from('user_integrations')
      .update({
        metadata: {
          ...(currentIntegration?.metadata as Record<string, unknown> || {}),
          last_verified_at: new Date().toISOString(),
        },
      })
      .eq('id', integrationId);

    if (updateError) {
      return { refreshed: false, error: `Failed to update verification timestamp: ${updateError.message}` };
    }

    return { refreshed: true };
  } catch (error) {
    return {
      refreshed: false,
      error: error instanceof Error ? error.message : 'Unknown error during token verification',
    };
  }
}
