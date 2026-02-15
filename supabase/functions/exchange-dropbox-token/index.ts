// Supabase Edge Function to exchange Dropbox OAuth code for tokens
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
    let redirectUri: string;
    try {
      const body = await req.json();
      code = body.code;
      redirectUri = body.redirectUri;
    } catch (parseError) {
      return new Response(
        JSON.stringify({ error: 'Invalid request body. Expected JSON with code and redirectUri.' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (!code || !redirectUri) {
      return new Response(
        JSON.stringify({ error: `Missing required fields. code: ${code ? 'provided' : 'missing'}, redirectUri: ${redirectUri ? 'provided' : 'missing'}` }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Get Dropbox OAuth credentials from environment
    const clientId = Deno.env.get('DROPBOX_CLIENT_ID');
    const clientSecret = Deno.env.get('DROPBOX_CLIENT_SECRET');

    if (!clientId || !clientSecret) {
      return new Response(
        JSON.stringify({ error: 'Dropbox OAuth not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Exchange code for tokens
    // Dropbox uses POST to /oauth2/token with Basic Auth
    const credentials = btoa(`${clientId}:${clientSecret}`);
    const tokenResponse = await fetch('https://api.dropbox.com/oauth2/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${credentials}`,
      },
      body: new URLSearchParams({
        code,
        grant_type: 'authorization_code',
        redirect_uri: redirectUri,
      }),
    });

    if (!tokenResponse.ok) {
      let errorMessage = 'Token exchange failed';
      try {
        const errorData = await tokenResponse.json();
        errorMessage = errorData.error_description || errorData.error || errorMessage;
      } catch {
        try {
          const errorText = await tokenResponse.text();
          errorMessage = errorText || errorMessage;
        } catch {
          errorMessage = `HTTP ${tokenResponse.status}: ${tokenResponse.statusText}`;
        }
      }
      console.error('Dropbox token exchange error:', {
        status: tokenResponse.status,
        statusText: tokenResponse.statusText,
        error: errorMessage,
        redirectUri,
      });
      return new Response(
        JSON.stringify({ error: `Token exchange failed: ${errorMessage}` }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const tokens = await tokenResponse.json();

    if (!tokens.access_token) {
      return new Response(
        JSON.stringify({ error: 'No access token received from Dropbox' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Get integration type ID for Dropbox
    const { data: integrationType, error: typeError } = await supabase
      .from('integration_types')
      .select('id')
      .eq('name', 'dropbox')
      .single();

    if (typeError || !integrationType) {
      return new Response(
        JSON.stringify({ error: 'Dropbox integration type not found' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Calculate token expiry
    const expiresAt = tokens.expires_in
      ? new Date(Date.now() + tokens.expires_in * 1000).toISOString()
      : null;

    // Check if integration already exists to preserve refresh_token if Dropbox doesn't return a new one
    const { data: existingIntegration } = await supabase
      .from('user_integrations')
      .select('refresh_token')
      .eq('user_id', user.id)
      .eq('integration_type_id', integrationType.id)
      .single();

    // Prepare update data - Dropbox doesn't provide refresh_token in OAuth 2.0 flow
    // Access tokens are long-lived but can be revoked
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
      token_expires_at: expiresAt,
      connected_at: new Date().toISOString(),
      metadata: {
        account_id: tokens.account_id || null,
        token_type: tokens.token_type || 'bearer',
        scope: tokens.scope || '',
      },
    };

    // Dropbox provides refresh_token when token_access_type=offline is requested
    // Save refresh_token if provided, otherwise use access_token as fallback (for offline access)
    const refreshToken = tokens.refresh_token || tokens.access_token;
    
    if (refreshToken) {
      updateData.refresh_token = refreshToken;
    } else if (existingIntegration?.refresh_token) {
      // Preserve existing refresh_token if Dropbox didn't return a new one
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

    // Save refresh token to user_profiles table
    // Dropbox provides refresh_token when token_access_type=offline is requested
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
      } else {
        console.log('Successfully saved Dropbox refresh token to user_profiles');
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
