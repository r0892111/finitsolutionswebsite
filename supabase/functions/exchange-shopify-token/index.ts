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
    // Get authorization header
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      console.error('Missing authorization header');
      return new Response(
        JSON.stringify({ error: 'Missing authorization header' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Create Supabase client with user's token
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY');
    
    if (!supabaseUrl || !supabaseAnonKey) {
      console.error('Missing Supabase configuration:', {
        hasUrl: !!supabaseUrl,
        hasKey: !!supabaseAnonKey,
      });
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
      console.error('Auth error:', {
        userError: userError?.message,
        hasUser: !!user,
        authHeader: authHeader ? 'present' : 'missing',
      });
      return new Response(
        JSON.stringify({ 
          error: `Unauthorized: ${userError?.message || 'Invalid or expired token'}` 
        }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Parse request body
    let code: string;
    let shop: string;
    let redirectUri: string;
    try {
      const body = await req.json();
      code = body.code;
      shop = body.shop;
      redirectUri = body.redirectUri;
    } catch (parseError) {
      return new Response(
        JSON.stringify({ error: 'Invalid request body. Expected JSON with code, shop, and redirectUri.' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (!code || !shop || !redirectUri) {
      return new Response(
        JSON.stringify({ 
          error: `Missing required fields. code: ${code ? 'provided' : 'missing'}, shop: ${shop ? 'provided' : 'missing'}, redirectUri: ${redirectUri ? 'provided' : 'missing'}` 
        }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
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

    // Check if integration already exists to preserve refresh_token if Shopify doesn't return a new one
    const { data: existingIntegration } = await supabase
      .from('user_integrations')
      .select('refresh_token')
      .eq('user_id', user.id)
      .eq('integration_type_id', integrationType.id)
      .single();

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
      metadata: Record<string, unknown>;
    } = {
      user_id: user.id,
      integration_type_id: integrationType.id,
      status: 'connected',
      access_token: tokens.access_token,
      token_expires_at: null, // Shopify tokens don't expire unless revoked
      connected_at: new Date().toISOString(),
      metadata: {
        shop: shopDomain,
        scope: tokens.scope || '',
        associated_user_scope: tokens.associated_user_scope || '',
        associated_user: tokens.associated_user || null,
      },
    };

    // Shopify doesn't provide refresh_token in the same way, but preserve if exists
    if (tokens.refresh_token) {
      updateData.refresh_token = tokens.refresh_token;
    } else if (existingIntegration?.refresh_token) {
      // Preserve existing refresh_token if Shopify didn't return a new one
      updateData.refresh_token = existingIntegration.refresh_token;
    }

    // Store integration connection
    const { error: upsertError } = await supabase
      .from('user_integrations')
      .upsert(updateData, {
        onConflict: 'user_id,integration_type_id',
      });

    if (upsertError) {
      return new Response(
        JSON.stringify({ error: `Failed to save integration: ${upsertError.message}` }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
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
