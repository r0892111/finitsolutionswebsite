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

    // Create admin client with service role for secure database operations
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
        JSON.stringify({ 
          error: `Missing required fields. code: ${code ? 'provided' : 'missing'}, redirectUri: ${redirectUri ? 'provided' : 'missing'}, userId: ${userId ? 'provided' : 'missing'}` 
        }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Verify user exists in database (security check)
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

    console.log('User verified:', { userId: user.id, email: user.email });

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

    // Fetch user email from Dropbox API first (needed for checking existing integration)
    let authenticatedEmail: string | null = null;
    try {
      const accountInfoResponse = await fetch('https://api.dropbox.com/2/users/get_current_account', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${tokens.access_token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
      });
      
      if (accountInfoResponse.ok) {
        const accountInfo = await accountInfoResponse.json();
        authenticatedEmail = accountInfo.email || null;
        console.log('Fetched Dropbox user email:', authenticatedEmail);
      } else {
        console.warn('Failed to fetch Dropbox account info:', accountInfoResponse.status);
      }
    } catch (emailError) {
      console.error('Error fetching Dropbox user email:', emailError);
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
    // If existing integration found, update it; otherwise insert new one
    let connectedIntegrationId: string | null = null;
    let upsertError;
    if (existingIntegration?.id) {
      // Update existing integration
      const { error } = await supabase
        .from('user_integrations')
        .update(updateData)
        .eq('id', existingIntegration.id);
      upsertError = error;
      connectedIntegrationId = existingIntegration.id;
    } else {
      // Insert new integration and get the ID back
      const { data: insertedData, error } = await supabase
        .from('user_integrations')
        .insert(updateData)
        .select('id')
        .single();
      upsertError = error;
      connectedIntegrationId = insertedData?.id || null;
    }

    if (upsertError) {
      return new Response(
        JSON.stringify({ error: `Failed to save integration: ${upsertError.message}` }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // If we don't have the ID, query for it using authenticated_email
    if (!connectedIntegrationId && authenticatedEmail) {
      const { data: connectedIntegration } = await supabase
        .from('user_integrations')
        .select('id')
        .eq('user_id', user.id)
        .eq('integration_type_id', integrationType.id)
        .eq('authenticated_email', authenticatedEmail)
        .eq('status', 'connected')
        .order('connected_at', { ascending: false })
        .limit(1)
        .maybeSingle();
      connectedIntegrationId = connectedIntegration?.id || null;
    }

    // Clean up any pending integrations for this user and integration type
    // This ensures no orphaned pending records remain after successful connection
    const cleanupQuery = supabase
      .from('user_integrations')
      .delete()
      .eq('user_id', user.id)
      .eq('integration_type_id', integrationType.id)
      .eq('status', 'pending');
    
    // Exclude the connected integration if we have its ID
    if (connectedIntegrationId) {
      cleanupQuery.neq('id', connectedIntegrationId);
    }
    
    const { error: cleanupError } = await cleanupQuery;

    if (cleanupError) {
      console.warn('Failed to cleanup pending integrations:', cleanupError);
      // Don't fail the request if cleanup fails, just log it
    } else {
      console.log('Cleaned up pending integrations for user:', user.id);
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
