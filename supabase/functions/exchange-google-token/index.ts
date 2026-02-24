// Supabase Edge Function to exchange Google OAuth code for tokens
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
    let redirectUri: string;
    let userId: string;
    try {
      const body = await req.json();
      code = body.code;
      redirectUri = body.redirectUri;
      userId = body.userId;
    } catch (parseError) {
      return new Response(
        JSON.stringify({ error: 'Invalid request body. Expected JSON with code, redirectUri, and userId.' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (!code || !redirectUri || !userId) {
      return new Response(
        JSON.stringify({ error: `Missing required fields. code: ${code ? 'provided' : 'missing'}, redirectUri: ${redirectUri ? 'provided' : 'missing'}, userId: ${userId ? 'provided' : 'missing'}` }),
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

    // Get Google OAuth credentials from environment
    const clientId = Deno.env.get('GOOGLE_CLIENT_ID');
    const clientSecret = Deno.env.get('GOOGLE_CLIENT_SECRET');

    if (!clientId || !clientSecret) {
      return new Response(
        JSON.stringify({ error: 'Google OAuth not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Exchange code for tokens
    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
        grant_type: 'authorization_code',
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
      console.error('Google token exchange error:', {
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
        JSON.stringify({ error: 'No access token received from Google' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Get integration type ID for Google
    const { data: integrationType, error: typeError } = await supabase
      .from('integration_types')
      .select('id')
      .eq('name', 'google')
      .single();

    if (typeError || !integrationType) {
      return new Response(
        JSON.stringify({ error: 'Google integration type not found' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Calculate token expiry
    const expiresAt = tokens.expires_in
      ? new Date(Date.now() + tokens.expires_in * 1000).toISOString()
      : null;

    // Fetch user email from Google API first (needed for checking existing integration)
    let authenticatedEmail: string | null = null;
    try {
      const userInfoResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
        headers: {
          'Authorization': `Bearer ${tokens.access_token}`,
        },
      });
      
      if (userInfoResponse.ok) {
        const userInfo = await userInfoResponse.json();
        authenticatedEmail = userInfo.email || null;
        console.log('Fetched Google user email:', authenticatedEmail);
      } else {
        console.warn('Failed to fetch Google user info:', userInfoResponse.status);
      }
    } catch (emailError) {
      console.error('Error fetching Google user email:', emailError);
      // Don't fail the whole request if email fetch fails
    }

    // Check if integration with same authenticated_email already exists to preserve refresh_token
    // This allows multiple accounts per integration type, but prevents duplicate connections to the same account
    const { data: existingIntegration } = await supabase
      .from('user_integrations')
      .select('id, refresh_token')
      .eq('user_id', user.id)
      .eq('integration_type_id', integrationType.id)
      .eq('authenticated_email', authenticatedEmail || '')
      .maybeSingle();

    // Prepare update data - always save refresh_token if provided, otherwise preserve existing
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
      token_expires_at: expiresAt,
      connected_at: new Date().toISOString(),
      authenticated_email: authenticatedEmail,
      metadata: {
        scope: tokens.scope,
        token_type: tokens.token_type,
      },
    };

    // Save refresh_token if provided, otherwise preserve existing one
    if (tokens.refresh_token) {
      updateData.refresh_token = tokens.refresh_token;
    } else if (existingIntegration?.refresh_token) {
      // Preserve existing refresh_token if Google didn't return a new one
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
