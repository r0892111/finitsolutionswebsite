// Supabase Edge Function to refresh integration tokens
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface TokenRefreshResult {
  integrationId: string;
  userId: string;
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
    // Get Supabase configuration
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY');
    const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    
    if (!supabaseUrl || !supabaseAnonKey) {
      return new Response(
        JSON.stringify({ error: 'Server configuration error: Missing Supabase URL or key' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (!serviceRoleKey) {
      return new Response(
        JSON.stringify({ error: 'Server configuration error: Service role key not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Parse request body once (can only be read once)
    let requestBody: { integration_id?: string; refresh_all_users?: boolean } = {};
    try {
      const bodyText = await req.text();
      if (bodyText) {
        requestBody = JSON.parse(bodyText);
      }
    } catch {
      // No body or invalid JSON - use empty object
    }

    // Get authorization header
    const authHeader = req.headers.get('Authorization');
    
    // Check if this is an unauthenticated request (cronjob or direct call)
    // If no auth header OR auth header matches service role key, treat as cronjob
    const authToken = authHeader?.startsWith('Bearer ') ? authHeader.replace('Bearer ', '').trim() : null;
    const isCronjobRequest = !authHeader || 
                             (authToken && serviceRoleKey && authToken === serviceRoleKey.trim());

    let user: { id: string; email?: string | null } | null = null;
    let isAdmin = false;
    let queryClient: ReturnType<typeof createClient>;
    let refreshAllUsers = false;

    if (isCronjobRequest) {
      // Cronjob/unauthenticated request - use service role and refresh all users
      console.log('Unauthenticated/cronjob request detected - refreshing all users');
      queryClient = createClient(supabaseUrl, serviceRoleKey, {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      });
      refreshAllUsers = true; // Always refresh all users for cronjobs
    } else {
      // Regular user request - require authorization
      if (!authHeader) {
        return new Response(
          JSON.stringify({ error: 'Missing authorization header' }),
          { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      const supabase = createClient(supabaseUrl, supabaseAnonKey, {
        global: {
          headers: { Authorization: authHeader },
        },
      });

      // Get user from token
      const { data: { user: authUser }, error: userError } = await supabase.auth.getUser();
      if (userError || !authUser) {
        return new Response(
          JSON.stringify({ error: `Unauthorized: ${userError?.message || 'Invalid or expired token'}` }),
          { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      user = authUser;
      queryClient = supabase;

      // Check if user is admin
      isAdmin = user.email?.toLowerCase().endsWith('@finitsolutions.be') || 
                user.email?.toLowerCase().endsWith('@finitsolutions.com');

      // Use parsed request body
      refreshAllUsers = requestBody.refresh_all_users === true;

      // If refresh_all_users is requested, verify admin access
      if (refreshAllUsers && !isAdmin) {
        return new Response(
          JSON.stringify({ error: 'Forbidden: Admin access required to refresh all users\' tokens' }),
          { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      // Create service role client if refreshing all users (to bypass RLS)
      if (refreshAllUsers) {
        if (!serviceRoleKey) {
          return new Response(
            JSON.stringify({ error: 'Server configuration error: Service role key not configured' }),
            { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }
        queryClient = createClient(supabaseUrl, serviceRoleKey, {
          auth: {
            autoRefreshToken: false,
            persistSession: false,
          },
        });
      }
    }

    // Use parsed request body for integration_id
    const targetIntegrationId: string | null = requestBody.integration_id || null;

    // Build query
    let query = queryClient
      .from('user_integrations')
      .select(`
        id,
        user_id,
        integration_type_id,
        access_token,
        refresh_token,
        token_expires_at,
        metadata,
        integration_type:integration_types(name, display_name)
      `)
      .eq('status', 'connected');

    // If not refreshing all users, filter by current user
    if (!refreshAllUsers && user) {
      query = query.eq('user_id', user.id);
    }

    // If specific integration ID provided, filter by that
    if (targetIntegrationId) {
      query = query.eq('id', targetIntegrationId);
    }

    const { data: integrations, error: fetchError } = await query;

    // Query all integrations (any status) for debugging
    let allIntegrationsCount = 0;
    let allIntegrationsSample: any[] = [];
    let statusBreakdown: Record<string, number> = {};
    
    const debugQuery = refreshAllUsers 
      ? queryClient.from('user_integrations')
      : queryClient.from('user_integrations').eq('user_id', user.id);
    
    const { data: allIntegrations, error: allError } = await debugQuery
      .select('id, user_id, status, integration_type:integration_types(name)')
      .limit(20);
    
    allIntegrationsCount = allIntegrations?.length || 0;
    allIntegrationsSample = allIntegrations || [];
    
    // Calculate status breakdown
    if (allIntegrations && allIntegrations.length > 0) {
      statusBreakdown = allIntegrations.reduce((acc: Record<string, number>, int: any) => {
        const status = int.status || 'null';
        acc[status] = (acc[status] || 0) + 1;
        return acc;
      }, {});
    }
    
    console.log('All integrations (any status) count:', allIntegrationsCount);
    console.log('Status breakdown:', statusBreakdown);
    console.log('Sample integrations:', JSON.stringify(allIntegrationsSample.slice(0, 5), null, 2));

    // Log for debugging
    console.log('Refresh all users:', refreshAllUsers);
    console.log('Is admin:', isAdmin);
    console.log('Query client type:', refreshAllUsers ? 'service_role' : 'user_token');
    console.log('Fetch error:', fetchError);
    console.log('Connected integrations found:', integrations?.length || 0);
    if (integrations && integrations.length > 0) {
      console.log('Sample connected integrations:', JSON.stringify(integrations.slice(0, 3), null, 2));
    }

    if (fetchError) {
      console.error('Failed to fetch integrations:', fetchError);
      return new Response(
        JSON.stringify({ 
          error: `Failed to fetch integrations: ${fetchError.message}`,
          debug: {
            refresh_all_users: refreshAllUsers,
            is_admin: isAdmin,
            query_type: refreshAllUsers ? 'service_role' : 'user_token',
            error_details: fetchError,
          }
        }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (!integrations || integrations.length === 0) {
      return new Response(
        JSON.stringify({ 
          message: refreshAllUsers 
            ? `No connected integrations found across all users. Found ${allIntegrationsCount} total integrations (any status).`
            : `No connected integrations found for your account. Found ${allIntegrationsCount} total integrations (any status).`,
          results: [],
          debug: {
            refresh_all_users: refreshAllUsers,
            is_admin: isAdmin,
            query_type: refreshAllUsers ? 'service_role' : 'user_token',
            user_id: user.id,
            user_email: user.email,
            total_integrations_any_status: allIntegrationsCount,
            connected_integrations_count: 0,
            status_breakdown: statusBreakdown,
            sample_integrations: allIntegrationsSample.slice(0, 5),
            query_error: fetchError ? {
              message: fetchError.message,
              details: fetchError.details,
              hint: fetchError.hint,
            } : null,
          }
        }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const results: TokenRefreshResult[] = [];

    // Refresh tokens for each integration
    for (const integration of integrations) {
      const integrationName = (integration.integration_type as { name: string })?.name || 'unknown';
      const integrationDisplayName = (integration.integration_type as { display_name: string })?.display_name || 'Unknown';
      const userId = integration.user_id || 'unknown';
      
      let refreshed = false;
      let error: string | undefined;

      // Use service role client for updates if refreshing all users
      const updateClient = refreshAllUsers ? queryClient : supabase;

      try {
        if (integrationName === 'google') {
          // Refresh Google token
          const refreshResult = await refreshGoogleToken(
            integration.refresh_token,
            integration.id,
            updateClient
          );
          refreshed = refreshResult.refreshed;
          error = refreshResult.error;
        } else if (integrationName === 'shopify') {
          // Shopify tokens don't expire, but we can verify they're still valid
          const verifyResult = await verifyShopifyToken(
            integration.access_token,
            integration.metadata as { shop?: string },
            integration.id,
            updateClient
          );
          refreshed = verifyResult.refreshed;
          error = verifyResult.error;
        } else if (integrationName === 'dropbox') {
          // Dropbox tokens can be refreshed if refresh_token exists, otherwise verify
          const dropboxResult = await refreshOrVerifyDropboxToken(
            integration.access_token,
            integration.refresh_token,
            integration.id,
            updateClient
          );
          refreshed = dropboxResult.refreshed;
          error = dropboxResult.error;
        } else {
          // Unknown integration type - skip
          results.push({
            integrationId: integration.id,
            userId,
            integrationName: integrationDisplayName,
            success: false,
            error: `Unsupported integration type: ${integrationName}`,
            refreshed: false,
          });
          continue;
        }

        results.push({
          integrationId: integration.id,
          userId,
          integrationName: integrationDisplayName,
          success: !error,
          error,
          refreshed,
        });
      } catch (err) {
        results.push({
          integrationId: integration.id,
          userId,
          integrationName: integrationDisplayName,
          success: false,
          error: err instanceof Error ? err.message : 'Unknown error',
          refreshed: false,
        });
      }
    }

    const successCount = results.filter(r => r.success).length;
    const refreshedCount = results.filter(r => r.refreshed).length;
    const uniqueUsers = new Set(results.map(r => r.userId)).size;

    return new Response(
      JSON.stringify({
        message: refreshAllUsers 
          ? `Processed ${results.length} integration(s) across ${uniqueUsers} user(s). ${refreshedCount} token(s) refreshed.`
          : `Processed ${results.length} integration(s). ${refreshedCount} token(s) refreshed.`,
        total: results.length,
        refreshed: refreshedCount,
        success: successCount,
        users_affected: refreshAllUsers ? uniqueUsers : 1,
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

    // Get current integration to preserve refresh_token if Google doesn't return a new one
    const { data: currentIntegration } = await supabase
      .from('user_integrations')
      .select('access_token, refresh_token, metadata, user_id')
      .eq('id', integrationId)
      .single();

    // Determine refresh_token to save (new one if provided, otherwise preserve existing)
    const refreshTokenToSave = tokens.refresh_token || currentIntegration?.refresh_token || refreshToken || null;

    console.log('Google token refresh - saving tokens:', {
      has_new_access_token: !!tokens.access_token,
      has_new_refresh_token: !!tokens.refresh_token,
      preserving_refresh_token: !tokens.refresh_token && !!currentIntegration?.refresh_token,
      refresh_token_to_save: refreshTokenToSave ? refreshTokenToSave.substring(0, 20) + '...' : 'null',
    });

    // Update integration with new tokens - ALWAYS explicitly set both tokens
    const updateData: {
      access_token: string;
      refresh_token: string | null;
      token_expires_at: string | null;
      metadata: Record<string, unknown>;
    } = {
      access_token: tokens.access_token, // Always set new access_token
      refresh_token: refreshTokenToSave, // Always set refresh_token (new or preserved)
      token_expires_at: expiresAt,
      metadata: {
        ...(currentIntegration?.metadata as Record<string, unknown> || {}),
        scope: tokens.scope || (currentIntegration?.metadata as Record<string, unknown>)?.scope,
        token_type: tokens.token_type || 'Bearer',
        last_refreshed_at: new Date().toISOString(),
      },
    };

    console.log('Google token refresh - update data prepared:', {
      access_token_length: updateData.access_token?.length,
      refresh_token_length: updateData.refresh_token?.length,
      has_refresh_token: !!updateData.refresh_token,
    });

    // Update user_integrations table - explicitly save both tokens
    const { error: updateError } = await supabase
      .from('user_integrations')
      .update({
        access_token: updateData.access_token,
        refresh_token: updateData.refresh_token,
        token_expires_at: updateData.token_expires_at,
        metadata: updateData.metadata,
      })
      .eq('id', integrationId);
    
    if (updateError) {
      return { refreshed: false, error: `Failed to save token: ${updateError.message}` };
    }

    // Verify tokens were actually saved
    const { data: verifyIntegration, error: verifyError } = await supabase
      .from('user_integrations')
      .select('access_token, refresh_token, token_expires_at')
      .eq('id', integrationId)
      .single();

    if (verifyError) {
      console.error('Failed to verify token save:', verifyError);
      return { refreshed: false, error: `Token saved but verification failed: ${verifyError.message}` };
    }

    // Check if tokens match what we tried to save
    const tokensMatch = verifyIntegration?.access_token === tokens.access_token &&
                        verifyIntegration?.refresh_token === refreshTokenToSave;
    
    if (!tokensMatch) {
      console.error('Token mismatch after save:', {
        expected_access_token: tokens.access_token?.substring(0, 20) + '...',
        saved_access_token: verifyIntegration?.access_token?.substring(0, 20) + '...',
        expected_refresh_token: refreshTokenToSave?.substring(0, 20) + '...',
        saved_refresh_token: verifyIntegration?.refresh_token?.substring(0, 20) + '...',
      });
      return { refreshed: false, error: 'Tokens were not saved correctly - verification failed' };
    }

    console.log('Google tokens successfully saved and verified:', {
      access_token_length: verifyIntegration?.access_token?.length,
      refresh_token_length: verifyIntegration?.refresh_token?.length,
      expires_at: verifyIntegration?.token_expires_at,
    });

    // Also update user_profiles.refresh_token if user_id is available
    if (currentIntegration?.user_id && refreshTokenToSave) {
      const { error: profileError } = await supabase
        .from('user_profiles')
        .upsert({
          id: currentIntegration.user_id,
          refresh_token: refreshTokenToSave,
          updated_at: new Date().toISOString(),
        }, {
          onConflict: 'id',
        });

      if (profileError) {
        console.error('Failed to save refresh token to user_profiles:', profileError);
        // Don't fail the whole request if profile update fails
      } else {
        // Verify user_profiles was updated
        const { data: verifyProfile } = await supabase
          .from('user_profiles')
          .select('refresh_token')
          .eq('id', currentIntegration.user_id)
          .single();
        
        if (verifyProfile?.refresh_token === refreshTokenToSave) {
          console.log('user_profiles.refresh_token successfully saved and verified');
        } else {
          console.warn('user_profiles.refresh_token may not have been saved correctly');
        }
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

// Refresh or verify Dropbox token
async function refreshOrVerifyDropboxToken(
  accessToken: string | null,
  refreshToken: string | null,
  integrationId: string,
  supabase: ReturnType<typeof createClient>
): Promise<{ refreshed: boolean; error?: string }> {
  if (!accessToken) {
    return { refreshed: false, error: 'No access token available' };
  }

  console.log('Dropbox token verification:', {
    hasAccessToken: !!accessToken,
    hasRefreshToken: !!refreshToken,
    accessTokenLength: accessToken?.length,
    refreshTokenLength: refreshToken?.length,
    tokensAreSame: refreshToken === accessToken,
    refreshTokenPrefix: refreshToken?.substring(0, 20),
    accessTokenPrefix: accessToken?.substring(0, 20),
  });

  // If refresh_token exists and is different from access_token, try to refresh
  // Note: If refresh_token === access_token, it means no real refresh token was obtained
  // (likely because token_access_type=offline wasn't requested during OAuth)
  if (refreshToken && refreshToken !== accessToken) {
    console.log('Attempting Dropbox token refresh (refresh_token differs from access_token)');
    const clientId = Deno.env.get('DROPBOX_CLIENT_ID');
    const clientSecret = Deno.env.get('DROPBOX_CLIENT_SECRET');

    if (clientId && clientSecret) {
      try {
        // Dropbox refresh token endpoint uses Basic Auth (like token exchange)
        const credentials = btoa(`${clientId}:${clientSecret}`);
        const tokenResponse = await fetch('https://api.dropbox.com/oauth2/token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Basic ${credentials}`,
          },
          body: new URLSearchParams({
            grant_type: 'refresh_token',
            refresh_token: refreshToken,
          }),
        });

        if (tokenResponse.ok) {
          const tokens = await tokenResponse.json();
          
          if (tokens.access_token) {
            const expiresAt = tokens.expires_in
              ? new Date(Date.now() + tokens.expires_in * 1000).toISOString()
              : null;

            // Get current integration to preserve refresh_token and get user_id
            const { data: currentIntegration } = await supabase
              .from('user_integrations')
              .select('access_token, refresh_token, metadata, user_id')
              .eq('id', integrationId)
              .single();

            // Determine refresh_token to save (new one if provided, otherwise preserve existing)
            const refreshTokenToSave = tokens.refresh_token || currentIntegration?.refresh_token || refreshToken || null;

            console.log('Dropbox token refresh - saving tokens:', {
              has_new_access_token: !!tokens.access_token,
              has_new_refresh_token: !!tokens.refresh_token,
              preserving_refresh_token: !tokens.refresh_token && !!currentIntegration?.refresh_token,
              refresh_token_to_save: refreshTokenToSave ? refreshTokenToSave.substring(0, 20) + '...' : 'null',
            });

            // Update user_integrations table - ALWAYS explicitly set both tokens
            const { error: updateError } = await supabase
              .from('user_integrations')
              .update({
                access_token: tokens.access_token, // Always set new access_token
                refresh_token: refreshTokenToSave, // Always set refresh_token (new or preserved)
                token_expires_at: expiresAt,
                metadata: {
                  ...(currentIntegration?.metadata as Record<string, unknown> || {}),
                  last_refreshed_at: new Date().toISOString(),
                },
              })
              .eq('id', integrationId);

            if (updateError) {
              return { refreshed: false, error: `Failed to save token: ${updateError.message}` };
            }

            // Verify tokens were actually saved
            const { data: verifyIntegration, error: verifyError } = await supabase
              .from('user_integrations')
              .select('access_token, refresh_token, token_expires_at')
              .eq('id', integrationId)
              .single();

            if (verifyError) {
              console.error('Failed to verify Dropbox token save:', verifyError);
              return { refreshed: false, error: `Token saved but verification failed: ${verifyError.message}` };
            }

            // Check if tokens match what we tried to save
            const tokensMatch = verifyIntegration?.access_token === tokens.access_token &&
                                verifyIntegration?.refresh_token === refreshTokenToSave;
            
            if (!tokensMatch) {
              console.error('Dropbox token mismatch after save:', {
                expected_access_token: tokens.access_token?.substring(0, 20) + '...',
                saved_access_token: verifyIntegration?.access_token?.substring(0, 20) + '...',
                expected_refresh_token: refreshTokenToSave?.substring(0, 20) + '...',
                saved_refresh_token: verifyIntegration?.refresh_token?.substring(0, 20) + '...',
              });
              return { refreshed: false, error: 'Dropbox tokens were not saved correctly - verification failed' };
            }

            console.log('Dropbox tokens successfully saved and verified:', {
              access_token_length: verifyIntegration?.access_token?.length,
              refresh_token_length: verifyIntegration?.refresh_token?.length,
              expires_at: verifyIntegration?.token_expires_at,
            });

            // Also update user_profiles.refresh_token if user_id is available
            if (currentIntegration?.user_id && refreshTokenToSave) {
              const { error: profileError } = await supabase
                .from('user_profiles')
                .upsert({
                  id: currentIntegration.user_id,
                  refresh_token: refreshTokenToSave,
                  updated_at: new Date().toISOString(),
                }, {
                  onConflict: 'id',
                });

              if (profileError) {
                console.error('Failed to save refresh token to user_profiles:', profileError);
                // Don't fail the whole request if profile update fails
              } else {
                // Verify user_profiles was updated
                const { data: verifyProfile } = await supabase
                  .from('user_profiles')
                  .select('refresh_token')
                  .eq('id', currentIntegration.user_id)
                  .single();
                
                if (verifyProfile?.refresh_token === refreshTokenToSave) {
                  console.log('user_profiles.refresh_token successfully saved and verified');
                } else {
                  console.warn('user_profiles.refresh_token may not have been saved correctly');
                }
              }
            }

            return { refreshed: true };
          } else {
            console.error('Dropbox refresh response missing access_token:', tokens);
            // Fall through to verification
          }
        } else {
          const errorText = await tokenResponse.text();
          console.error('Dropbox token refresh failed:', {
            status: tokenResponse.status,
            statusText: tokenResponse.statusText,
            error: errorText.substring(0, 500),
          });
          // Fall through to verification if refresh fails
        }
      } catch (error) {
        console.error('Dropbox token refresh error:', error);
        // Fall through to verification if refresh fails
      }
    } else {
      console.log('Dropbox refresh skipped: Missing DROPBOX_CLIENT_ID or DROPBOX_CLIENT_SECRET');
    }
  } else {
    console.warn('Dropbox refresh skipped: refresh_token is missing or identical to access_token', {
      hasRefreshToken: !!refreshToken,
      tokensAreSame: refreshToken === accessToken,
      note: 'This usually means token_access_type=offline was not requested during OAuth',
    });
  }

  // If no refresh_token or refresh failed, verify the access token is still valid
  try {
    // Dropbox API v2 RPC endpoints require NO body at all (not even empty JSON)
    // We use a different endpoint that doesn't require Content-Type header
    const verifyResponse = await fetch('https://api.dropboxapi.com/2/users/get_current_account', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        // Don't include Content-Type header - Dropbox RPC endpoints don't expect it
      },
      // No body parameter at all - fetch will send no body
    });

    if (!verifyResponse.ok) {
      // Get detailed error message from Dropbox
      const errorText = await verifyResponse.text();
      console.error('Dropbox verification error:', {
        status: verifyResponse.status,
        statusText: verifyResponse.statusText,
        errorText: errorText.substring(0, 500),
      });
      
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
      
      // Parse error message from Dropbox
      let errorMessage = `Token verification failed: ${verifyResponse.statusText}`;
      try {
        const errorData = JSON.parse(errorText);
        if (errorData.error_summary) {
          errorMessage = `Token verification failed: ${errorData.error_summary}`;
        } else if (errorData.error) {
          errorMessage = `Token verification failed: ${errorData.error}`;
        } else if (errorData.error_description) {
          errorMessage = `Token verification failed: ${errorData.error_description}`;
        }
      } catch {
        // If error text is not JSON, use the text as-is (truncated)
        if (errorText) {
          errorMessage = `Token verification failed: ${errorText.substring(0, 200)}`;
        }
      }
      
      return { refreshed: false, error: errorMessage };
    }

    // Token is still valid - update last verified timestamp
    // Also ensure access_token and refresh_token are preserved (in case they were updated elsewhere)
    const { data: currentIntegration } = await supabase
      .from('user_integrations')
      .select('access_token, refresh_token, metadata, user_id')
      .eq('id', integrationId)
      .single();

    const refreshTokenToSave = currentIntegration?.refresh_token || refreshToken || null;
    
    console.log('Dropbox token verification - preserving tokens:', {
      access_token_length: accessToken?.length,
      refresh_token_to_save: refreshTokenToSave ? refreshTokenToSave.substring(0, 20) + '...' : 'null',
      has_refresh_token: !!refreshTokenToSave,
    });

    // Update user_integrations table - ALWAYS explicitly set both tokens
    const { error: updateError } = await supabase
      .from('user_integrations')
      .update({
        // Ensure tokens are preserved (explicitly set them to prevent accidental clearing)
        access_token: accessToken, // Always explicitly set access_token
        refresh_token: refreshTokenToSave, // Always explicitly set refresh_token (even if null)
        metadata: {
          ...(currentIntegration?.metadata as Record<string, unknown> || {}),
          last_verified_at: new Date().toISOString(),
        },
      })
      .eq('id', integrationId);

    if (updateError) {
      return { refreshed: false, error: `Failed to update verification timestamp: ${updateError.message}` };
    }

    // Verify tokens were actually saved
    const { data: verifyIntegration, error: verifyError } = await supabase
      .from('user_integrations')
      .select('access_token, refresh_token')
      .eq('id', integrationId)
      .single();

    if (verifyError) {
      console.error('Failed to verify Dropbox token save:', verifyError);
    } else {
      const tokensMatch = verifyIntegration?.access_token === accessToken &&
                          verifyIntegration?.refresh_token === refreshTokenToSave;
      
      if (!tokensMatch) {
        console.error('Dropbox token mismatch after verification update:', {
          expected_access_token: accessToken?.substring(0, 20) + '...',
          saved_access_token: verifyIntegration?.access_token?.substring(0, 20) + '...',
          expected_refresh_token: refreshTokenToSave?.substring(0, 20) + '...',
          saved_refresh_token: verifyIntegration?.refresh_token?.substring(0, 20) + '...',
        });
      } else {
        console.log('Dropbox tokens verified and preserved correctly');
      }
    }

    // Also update user_profiles.refresh_token if available
    if (currentIntegration?.user_id && refreshTokenToSave) {
      const { error: profileError } = await supabase
        .from('user_profiles')
        .upsert({
          id: currentIntegration.user_id,
          refresh_token: refreshTokenToSave,
          updated_at: new Date().toISOString(),
        }, {
          onConflict: 'id',
        });

      if (profileError) {
        console.error('Failed to save refresh token to user_profiles:', profileError);
        // Don't fail the whole request if profile update fails
      } else {
        // Verify user_profiles was updated
        const { data: verifyProfile } = await supabase
          .from('user_profiles')
          .select('refresh_token')
          .eq('id', currentIntegration.user_id)
          .single();
        
        if (verifyProfile?.refresh_token === refreshTokenToSave) {
          console.log('user_profiles.refresh_token successfully saved and verified');
        } else {
          console.warn('user_profiles.refresh_token may not have been saved correctly');
        }
      }
    }

    return { refreshed: true };
  } catch (error) {
    return {
      refreshed: false,
      error: error instanceof Error ? error.message : 'Unknown error during token verification',
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
    // Also ensure access_token and refresh_token are preserved (Shopify tokens don't expire but can be revoked)
    const { data: currentIntegration } = await supabase
      .from('user_integrations')
      .select('access_token, refresh_token, metadata, user_id')
      .eq('id', integrationId)
      .single();

    const refreshTokenToSave = currentIntegration?.refresh_token || null;
    
    console.log('Shopify token verification - preserving tokens:', {
      access_token_length: accessToken?.length,
      refresh_token_to_save: refreshTokenToSave ? refreshTokenToSave.substring(0, 20) + '...' : 'null',
      has_refresh_token: !!refreshTokenToSave,
    });

    // Update user_integrations table - ALWAYS explicitly set both tokens
    const { error: updateError } = await supabase
      .from('user_integrations')
      .update({
        // Ensure tokens are preserved (explicitly set them to prevent accidental clearing)
        access_token: accessToken, // Always explicitly set access_token
        refresh_token: refreshTokenToSave, // Always explicitly set refresh_token (even if null)
        metadata: {
          ...(currentIntegration?.metadata as Record<string, unknown> || {}),
          last_verified_at: new Date().toISOString(),
        },
      })
      .eq('id', integrationId);

    if (updateError) {
      return { refreshed: false, error: `Failed to update verification timestamp: ${updateError.message}` };
    }

    // Verify tokens were actually saved
    const { data: verifyIntegration, error: verifyError } = await supabase
      .from('user_integrations')
      .select('access_token, refresh_token')
      .eq('id', integrationId)
      .single();

    if (verifyError) {
      console.error('Failed to verify Shopify token save:', verifyError);
    } else {
      const tokensMatch = verifyIntegration?.access_token === accessToken &&
                          verifyIntegration?.refresh_token === refreshTokenToSave;
      
      if (!tokensMatch) {
        console.error('Shopify token mismatch after verification update:', {
          expected_access_token: accessToken?.substring(0, 20) + '...',
          saved_access_token: verifyIntegration?.access_token?.substring(0, 20) + '...',
          expected_refresh_token: refreshTokenToSave?.substring(0, 20) + '...',
          saved_refresh_token: verifyIntegration?.refresh_token?.substring(0, 20) + '...',
        });
      } else {
        console.log('Shopify tokens verified and preserved correctly');
      }
    }

    // Also update user_profiles.refresh_token if available
    if (currentIntegration?.user_id && refreshTokenToSave) {
      const { error: profileError } = await supabase
        .from('user_profiles')
        .upsert({
          id: currentIntegration.user_id,
          refresh_token: refreshTokenToSave,
          updated_at: new Date().toISOString(),
        }, {
          onConflict: 'id',
        });

      if (profileError) {
        console.error('Failed to save refresh token to user_profiles:', profileError);
        // Don't fail the whole request if profile update fails
      } else {
        // Verify user_profiles was updated
        const { data: verifyProfile } = await supabase
          .from('user_profiles')
          .select('refresh_token')
          .eq('id', currentIntegration.user_id)
          .single();
        
        if (verifyProfile?.refresh_token === refreshTokenToSave) {
          console.log('user_profiles.refresh_token successfully saved and verified');
        } else {
          console.warn('user_profiles.refresh_token may not have been saved correctly');
        }
      }
    }

    return { refreshed: true };
  } catch (error) {
    return {
      refreshed: false,
      error: error instanceof Error ? error.message : 'Unknown error during token verification',
    };
  }
}
