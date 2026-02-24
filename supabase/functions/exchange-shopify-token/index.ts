// Supabase Edge Function to exchange Shopify OAuth code for tokens
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    // Get Supabase configuration
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    
    if (!supabaseUrl || !serviceRoleKey) {
      console.error('Missing Supabase configuration:', {
        hasUrl: !!supabaseUrl,
        hasServiceRoleKey: !!serviceRoleKey,
      });
      return new Response(
        JSON.stringify({ error: 'Server configuration error: Missing Supabase URL or service role key' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Create Supabase client with service role key (bypasses RLS, secure server-side only)
    const supabase = createClient(supabaseUrl, serviceRoleKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });

    // Parse request body
    let code: string;
    let shop: string;
    let redirectUri: string;
    let userId: string;
    try {
      const body = await req.json();
      code = body.code;
      shop = body.shop;
      redirectUri = body.redirectUri;
      userId = body.userId;
    } catch (parseError) {
      return new Response(
        JSON.stringify({ error: 'Invalid request body. Expected JSON with code, shop, redirectUri, and userId.' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (!code || !shop || !redirectUri || !userId) {
      return new Response(
        JSON.stringify({ 
          error: `Missing required fields. code: ${code ? 'provided' : 'missing'}, shop: ${shop ? 'provided' : 'missing'}, redirectUri: ${redirectUri ? 'provided' : 'missing'}, userId: ${userId ? 'provided' : 'missing'}` 
        }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Verify user exists using service role (security check)
    const { data: { user }, error: userError } = await supabase.auth.admin.getUserById(userId);
    
    if (userError || !user) {
      console.error('User verification failed:', {
        userId,
        error: userError?.message,
      });
      return new Response(
        JSON.stringify({ 
          code: 401,
          message: `Invalid user: ${userError?.message || 'User not found'}` 
        }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Normalize shop domain
    let shopDomain = shop.trim().toLowerCase();
    if (shopDomain.startsWith('http://') || shopDomain.startsWith('https://')) {
      shopDomain = shopDomain.replace(/^https?:\/\//, '');
    }
    if (!shopDomain.endsWith('.myshopify.com')) {
      shopDomain = `${shopDomain}.myshopify.com`;
    }

    // Get Shopify OAuth credentials from environment
    const clientId = Deno.env.get('SHOPIFY_CLIENT_ID');
    const clientSecret = Deno.env.get('SHOPIFY_CLIENT_SECRET');

    if (!clientId || !clientSecret) {
      return new Response(
        JSON.stringify({ error: 'Shopify OAuth not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Exchange code for access token
    // Shopify uses POST to /admin/oauth/access_token
    // Note: Shopify expects form-urlencoded, not JSON
    const tokenResponse = await fetch(`https://${shopDomain}/admin/oauth/access_token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        code,
      }),
    });

    if (!tokenResponse.ok) {
      let errorMessage = 'Token exchange failed';
      let errorDetails: Record<string, unknown> = {};
      
      try {
        const errorText = await tokenResponse.text();
        errorDetails.responseText = errorText;
        
        // Try to parse as JSON
        try {
          const errorData = JSON.parse(errorText);
          errorMessage = errorData.error_description || errorData.error || errorMessage;
          errorDetails = { ...errorDetails, ...errorData };
        } catch {
          // Not JSON, use text as error message
          errorMessage = errorText || errorMessage;
        }
      } catch {
        errorMessage = `HTTP ${tokenResponse.status}: ${tokenResponse.statusText}`;
      }
      
      console.error('Shopify token exchange error:', {
        status: tokenResponse.status,
        statusText: tokenResponse.statusText,
        error: errorMessage,
        shop: shopDomain,
        redirectUri,
        code: code ? 'present' : 'missing',
        clientId: clientId ? 'present' : 'missing',
        clientSecret: clientSecret ? 'present' : 'missing',
        errorDetails,
      });
      
      return new Response(
        JSON.stringify({ 
          error: `Token exchange failed: ${errorMessage}`,
          details: errorDetails,
        }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const tokens = await tokenResponse.json();

    if (!tokens.access_token) {
      return new Response(
        JSON.stringify({ error: 'No access token received from Shopify' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Get integration type ID for Shopify
    const { data: integrationType, error: typeError } = await supabase
      .from('integration_types')
      .select('id')
      .eq('name', 'shopify')
      .single();

    if (typeError || !integrationType) {
      return new Response(
        JSON.stringify({ error: 'Shopify integration type not found' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // For Shopify, store the shop domain as the authenticated identifier
    // Shopify doesn't provide user email directly, so we use the shop domain
    const authenticatedEmail = shopDomain;

    // Check if integration with same authenticated_email (shop domain) already exists to preserve refresh_token
    // This allows multiple accounts per integration type, but prevents duplicate connections to the same shop
    const { data: existingIntegration } = await supabase
      .from('user_integrations')
      .select('id, refresh_token')
      .eq('user_id', user.id)
      .eq('integration_type_id', integrationType.id)
      .eq('authenticated_email', authenticatedEmail)
      .maybeSingle();

    // Prepare update data - Shopify doesn't use refresh tokens in the same way as Google
    // Store shop domain and scope in metadata
    const updateData: {
      user_id: string;
      integration_type_id: string;
      status: string;
      access_token: string;
      refresh_token?: string;
      token_expires_at: string | null;
      connected_at: string;
      authenticated_email?: string | null;
      metadata: Record<string, unknown>;
    } = {
      user_id: user.id,
      integration_type_id: integrationType.id,
      status: 'connected',
      access_token: tokens.access_token,
      token_expires_at: null, // Shopify tokens don't expire unless revoked
      connected_at: new Date().toISOString(),
      authenticated_email: authenticatedEmail,
      metadata: {
        shop: shopDomain,
        scope: tokens.scope || '',
        associated_user_scope: tokens.associated_user_scope || '',
        associated_user: tokens.associated_user || null,
      },
    };

    // Shopify doesn't provide refresh_token in the same way, but preserve if exists
    // For Shopify, the access_token itself acts as a refresh token (offline access)
    // We'll use the access_token as the refresh token for user_profiles
    const refreshToken = tokens.refresh_token || tokens.access_token;
    
    if (refreshToken) {
      updateData.refresh_token = refreshToken;
    } else if (existingIntegration?.refresh_token) {
      // Preserve existing refresh_token if Shopify didn't return a new one
      updateData.refresh_token = existingIntegration.refresh_token;
    }

    // Store integration connection
    // If existing integration found, update it; otherwise insert new one
    let upsertError;
    if (existingIntegration?.id) {
      // Update existing integration
      const { error } = await supabase
        .from('user_integrations')
        .update(updateData)
        .eq('id', existingIntegration.id);
      upsertError = error;
    } else {
      // Insert new integration
      const { error } = await supabase
        .from('user_integrations')
        .insert(updateData);
      upsertError = error;
    }

    if (upsertError) {
      return new Response(
        JSON.stringify({ error: `Failed to save integration: ${upsertError.message}` }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Save refresh token to user_profiles table
    // Shopify uses offline access tokens, so we save the access_token as refresh_token
    if (refreshToken) {
      const { error: profileError } = await supabase
        .from('user_profiles')
        .upsert({
          id: user.id,
          refresh_token: refreshToken,
          updated_at: new Date().toISOString(),
        }, {
          onConflict: 'id',
        });

      if (profileError) {
        console.error('Failed to save refresh token to user_profiles:', profileError);
        // Don't fail the whole request if profile update fails
      }
    }

    return new Response(
      JSON.stringify({ success: true }),
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
