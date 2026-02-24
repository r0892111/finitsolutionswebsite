"use client";

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Loader2, RefreshCw } from 'lucide-react';
import { getGoogleRedirectUri } from '@/lib/oauth';

function GoogleCallbackContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { toast } = useToast();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isRetrying, setIsRetrying] = useState(false);
  const [hasProcessed, setHasProcessed] = useState(false);

  useEffect(() => {
    // Prevent duplicate processing in React Strict Mode
    if (hasProcessed) return;

    const handleCallback = async () => {
      // Mark as processed immediately to prevent duplicate calls
      setHasProcessed(true);
      const code = searchParams.get('code');
      const error = searchParams.get('error');

      if (error) {
        setStatus('error');
        setErrorMessage(error);
        toast({
          title: 'OAuth Error',
          description: error,
          variant: 'destructive',
        });
        // Don't auto-redirect, allow user to retry
        return;
      }

      if (!code) {
        setStatus('error');
        setErrorMessage('No authorization code provided');
        toast({
          title: 'Error',
          description: 'No authorization code provided',
          variant: 'destructive',
        });
        // Don't auto-redirect, allow user to retry
        return;
      }

      try {
        const supabase = createClient();
        
        // Get current session and refresh if needed to ensure we have a valid token
        let currentSession = null;
        let sessionError = null;
        
        try {
          const sessionResult = await supabase.auth.getSession();
          currentSession = sessionResult.data?.session;
          sessionError = sessionResult.error;
        } catch (err) {
          console.error('Error getting session:', err);
          sessionError = err as Error;
        }
        
        if (sessionError || !currentSession) {
          console.error('Session error:', sessionError);
          // Try to get user directly - sometimes session isn't set but user is authenticated
          const { data: { user }, error: userError } = await supabase.auth.getUser();
          if (userError || !user) {
            throw new Error('Not authenticated. Please log in again.');
          }
          // If we have a user but no session, redirect to login
          throw new Error('Session expired. Please log in again.');
        }

        // Check if token is expired or about to expire (within 60 seconds)
        const now = Math.floor(Date.now() / 1000);
        const expiresAt = currentSession.expires_at || 0;
        const timeUntilExpiry = expiresAt - now;
        
        // Refresh session if expired or expiring soon
        let sessionToUse = currentSession;
        if (timeUntilExpiry < 60) {
          console.log('Token expiring soon, refreshing session...', { timeUntilExpiry, expiresAt, now });
          try {
            const { data: { session }, error: refreshError } = await supabase.auth.refreshSession(currentSession);
            if (refreshError) {
              console.error('Session refresh error:', refreshError);
              // If refresh fails, try to get user to see if we're still authenticated
              const { data: { user }, error: userError } = await supabase.auth.getUser();
              if (userError || !user) {
                throw new Error('Session expired. Please log in again.');
              }
              // If we have a user, try refreshing one more time
              const { data: { session: retrySession }, error: retryError } = await supabase.auth.refreshSession(currentSession);
              if (retryError || !retrySession) {
                throw new Error('Session expired. Please log in again.');
              }
              sessionToUse = retrySession;
            } else if (session) {
              sessionToUse = session;
            }
          } catch (refreshErr) {
            console.error('Failed to refresh session:', refreshErr);
            throw new Error('Session expired. Please log in again.');
          }
        }
        
        if (!sessionToUse?.access_token) {
          throw new Error('Invalid session. Please log in again.');
        }
        
        console.log('Using session token:', {
          hasToken: !!sessionToUse.access_token,
          tokenLength: sessionToUse.access_token?.length,
          expiresAt: sessionToUse.expires_at,
          timeUntilExpiry: (sessionToUse.expires_at || 0) - Math.floor(Date.now() / 1000),
        });

        // Get redirect URI (must match what was used in the OAuth request)
        const redirectUri = getGoogleRedirectUri();

        // Call Supabase Edge Function to exchange code for tokens
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
        const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

        if (!supabaseUrl || !anonKey) {
          throw new Error('Supabase configuration missing');
        }

        const response = await fetch(`${supabaseUrl}/functions/v1/exchange-google-token`, {
          method: 'POST',
          headers: {
            'apikey': anonKey,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            code,
            redirectUri,
            userId: sessionToUse.user.id,
          }),
        });

        if (!response.ok) {
          // Read response as text first (can only read body once)
          const responseText = await response.text();
          let errorMessage = `HTTP ${response.status}: ${response.statusText}`;
          let errorData: { error?: string; code?: number; message?: string } = {};
          
          // Try to parse as JSON
          try {
            errorData = JSON.parse(responseText);
            errorMessage = errorData.error || errorData.message || errorMessage;
          } catch {
            // If not JSON, use the text response
            errorMessage = responseText || errorMessage;
          }
          
          // Handle 401 errors - user not found or invalid
          if (response.status === 401) {
            const isUserError = errorMessage.includes("Invalid user") || 
                               errorMessage.includes("User not found") ||
                               errorData.code === 401;
            
            if (isUserError) {
              // User verification failed - redirect to login
              toast({
                title: 'Authentication Error',
                description: 'Unable to verify your account. Please log in again and try connecting.',
                variant: 'destructive',
              });
              setTimeout(() => {
                router.push('/portal/login?error=session_expired');
              }, 2000);
              return;
            }
          }
          
          // For 400 errors (Bad Request), check if integration was already created
          // This can happen if React Strict Mode causes duplicate calls
          // The code might have been used successfully on the first call
          if (response.status === 400) {
            try {
              const supabase = createClient();
              // Check if integration was actually created (might have succeeded on first call)
              const { data: integrationType } = await supabase
                .from('integration_types')
                .select('id')
                .eq('name', 'google')
                .single();
              
              if (integrationType) {
                const { data: existingIntegration } = await supabase
                  .from('user_integrations')
                  .select('id, status')
                  .eq('user_id', sessionToUse.user.id)
                  .eq('integration_type_id', integrationType.id)
                  .maybeSingle();
                
                // If integration exists and is connected, this was a duplicate call - ignore error
                if (existingIntegration && existingIntegration.status === 'connected') {
                  console.log('Integration already connected - ignoring duplicate code exchange attempt');
                  setStatus('success');
                  toast({
                    title: 'Success',
                    description: 'Google account connected successfully',
                  });
                  router.replace('/portal/integrations/google/callback?success=true');
                  setTimeout(() => router.push('/portal?refresh=integrations'), 2000);
                  return;
                }
              }
            } catch (checkError) {
              // If check fails, continue with normal error handling
              console.warn('Error checking for existing integration:', checkError);
            }
          }
          
          // Check if error is about code being expired/already used (for better error messages)
          const isCodeError = errorMessage.includes("code doesn't exist") || 
                            errorMessage.includes("expired") || 
                            errorMessage.includes("invalid_grant") ||
                            errorMessage.includes("Bad Request") ||
                            errorMessage.includes("invalid_request");
          
          console.error('Edge Function error:', {
            status: response.status,
            statusText: response.statusText,
            responseBody: responseText.substring(0, 500), // Limit log size
            parsedError: errorMessage,
            isCodeError,
          });
          throw new Error(errorMessage);
        }

        // Edge Function succeeded - now verify the integration is actually connected
        // Poll for up to 5 seconds to ensure the database update is visible
        const { data: integrationType } = await supabase
          .from('integration_types')
          .select('id')
          .eq('name', 'google')
          .single();

        if (integrationType) {
          let attempts = 0;
          const maxAttempts = 10; // 5 seconds total (500ms * 10)
          let integrationConnected = false;

          while (attempts < maxAttempts && !integrationConnected) {
            const { data: integration, error: fetchError } = await supabase
              .from('user_integrations')
              .select('id, status, authenticated_email')
              .eq('user_id', sessionToUse.user.id)
              .eq('integration_type_id', integrationType.id)
              .order('connected_at', { ascending: false })
              .limit(1)
              .maybeSingle();

            if (!fetchError && integration && integration.status === 'connected') {
              integrationConnected = true;
              console.log('Integration verified as connected:', integration);
              break;
            }

            attempts++;
            if (attempts < maxAttempts) {
              // Wait 500ms before next attempt
              await new Promise(resolve => setTimeout(resolve, 500));
            }
          }

          if (!integrationConnected) {
            console.warn('Integration status not updated to connected after polling. Proceeding anyway.');
          }
        }

        setStatus('success');
        toast({
          title: 'Success',
          description: 'Google account connected successfully',
        });
        
        // Clean up URL to prevent re-processing on refresh
        router.replace('/portal/integrations/google/callback?success=true');
        setTimeout(() => router.push('/portal?refresh=integrations'), 2000);
      } catch (error) {
        console.error('OAuth callback error:', error);
        setStatus('error');
        let message = 'Failed to connect Google account';
        if (error instanceof Error) {
          message = error.message;
        } else if (typeof error === 'string') {
          message = error;
        }
        setErrorMessage(message);
        
        // If error is about expired code, provide helpful message
        const isCodeError = message.includes("code doesn't exist") || 
                          message.includes("expired") || 
                          message.includes("invalid_grant") ||
                          message.includes("Bad Request") ||
                          message.includes("invalid_request");
        
        if (isCodeError) {
          setErrorMessage('The authorization code has expired or was already used. Please try connecting again.');
        }
        
        toast({
          title: 'Error',
          description: message.includes("code doesn't exist") || message.includes("expired") || message.includes("invalid_grant")
            ? 'The authorization code has expired. Please try connecting again.'
            : message,
          variant: 'destructive',
        });
        // Don't auto-redirect on error, allow user to retry
      }
    };

    // Only run callback if we have a code or error parameter
    const code = searchParams.get('code');
    const error = searchParams.get('error');
    const success = searchParams.get('success');
    
    // If already successful, don't process again
    if (success === 'true') {
      setStatus('success');
      setTimeout(() => router.push('/portal'), 2000);
      return;
    }
    
    if (code || error) {
      handleCallback();
    } else {
      // No code or error, show error state
      setStatus('error');
      setErrorMessage('No authorization code or error provided');
    }
  }, [searchParams, router, toast, hasProcessed]);

  const handleRetry = async () => {
    try {
      setIsRetrying(true);
      const supabase = createClient();
      const { data: { session } } = await supabase.auth.getSession();

      if (!session?.user?.id) {
        throw new Error('Not authenticated');
      }

      // Get Google OAuth credentials from environment
      const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
      if (!clientId) {
        throw new Error('Google OAuth is not configured');
      }

      // Get Google integration type ID
      const { data: integrationType, error: typeError } = await supabase
        .from('integration_types')
        .select('id')
        .eq('name', 'google')
        .single();

      if (typeError || !integrationType) {
        throw new Error('Google integration type not found');
      }

      // Create pending integration record
      // Allow multiple pending records - Edge Functions will handle deduplication by authenticated_email
      const { error: upsertError } = await supabase
        .from('user_integrations')
        .insert({
          user_id: session.user.id,
          integration_type_id: integrationType.id,
          status: 'pending',
        });

      if (upsertError) {
        throw upsertError;
      }

      // Construct redirect URI (must match Google Cloud Console)
      const redirectUri = getGoogleRedirectUri();
      const scope = 'https://www.googleapis.com/auth/gmail.readonly https://www.googleapis.com/auth/calendar.readonly';

      // Build Google OAuth URL
      const authUrl = new URL('https://accounts.google.com/o/oauth2/v2/auth');
      authUrl.searchParams.set('client_id', clientId);
      authUrl.searchParams.set('redirect_uri', redirectUri);
      authUrl.searchParams.set('response_type', 'code');
      authUrl.searchParams.set('scope', scope);
      authUrl.searchParams.set('access_type', 'offline');
      authUrl.searchParams.set('prompt', 'consent');
      authUrl.searchParams.set('state', session.user.id);

      // Redirect to Google OAuth
      window.location.href = authUrl.toString();
    } catch (error) {
      console.error('Retry error:', error);
      const message = error instanceof Error ? error.message : 'Failed to retry OAuth connection';
      setErrorMessage(message);
      toast({
        title: 'Error',
        description: message,
        variant: 'destructive',
      });
      setIsRetrying(false);
    }
  };

  return (
    <div className="min-h-screen bg-finit-aurora flex items-center justify-center p-4">
      <div className="text-center">
        {status === 'loading' && (
          <>
            <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
            <h2 className="finit-h2 text-primary mb-2">Connecting Google...</h2>
            <p className="text-muted-foreground">Please wait while we connect your account</p>
          </>
        )}
        {status === 'success' && (
          <>
            <div className="h-12 w-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="finit-h2 text-primary mb-2">Connected!</h2>
            <p className="text-muted-foreground">Redirecting to portal...</p>
          </>
        )}
        {status === 'error' && (
          <>
            <div className="h-12 w-12 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h2 className="finit-h2 text-primary mb-2">Connection Failed</h2>
            <p className="text-muted-foreground mb-4">{errorMessage}</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
              <Button
                onClick={handleRetry}
                disabled={isRetrying}
                className="min-w-[120px]"
              >
                {isRetrying ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Retrying...
                  </>
                ) : (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Try Again
                  </>
                )}
              </Button>
              <Button
                onClick={() => router.push('/portal')}
                className="min-w-[120px] bg-background border border-input hover:bg-accent"
              >
                Go to Portal
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default function GoogleCallbackPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-finit-aurora flex items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    }>
      <GoogleCallbackContent />
    </Suspense>
  );
}
