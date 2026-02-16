"use client";

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Loader2, CheckCircle2, XCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/language-context';
import Image from 'next/image';
import Link from 'next/link';

function CallbackHandler() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { t } = useLanguage();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    const handleCallback = async () => {
      const code = searchParams.get('code');
      const token = searchParams.get('token'); // Used by Supabase verify endpoint for magic links
      const tokenHash = searchParams.get('token_hash');
      const type = searchParams.get('type'); // 'signup', 'recovery', 'invite', 'magiclink'
      
      try {
        const supabase = createClient();
        
        // Handle Supabase verify endpoint redirect (magic links)
        // When Supabase verifies a magic link, it redirects with a token parameter
        // We need to exchange this token for a session
        if (token && type === 'magiclink') {
          // The token from Supabase verify endpoint needs to be exchanged
          // Supabase's verify endpoint should redirect here with a code, but if it doesn't,
          // we need to handle the token directly
          
          // Try to verify the token and get a session
          // For magic links, Supabase should redirect with a code parameter after verification
          // If we're here with a token, it means Supabase redirected directly
          // We need to complete the verification flow
          
          // Actually, Supabase's verify endpoint redirects with a code after verification
          // If we're here with just a token, we should redirect to Supabase's verify endpoint
          // with the correct redirect_to parameter
          const callbackUrl = `${window.location.origin}/portal/auth/callback`;
          const verifyUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/auth/v1/verify?token=${encodeURIComponent(token)}&type=magiclink&redirect_to=${encodeURIComponent(callbackUrl)}`;
          
          // Redirect to Supabase verify endpoint which will verify and redirect back with code
          window.location.href = verifyUrl;
          return;
        }
        
        if (!code) {
          setStatus('error');
          setErrorMessage('No authorization code provided');
          return;
        }
        
        // Exchange code for session
        const { error, data } = await supabase.auth.exchangeCodeForSession(code);
        
        if (error) {
          console.error('Auth callback error:', error);
          setStatus('error');
          setErrorMessage(error.message);
          
          // If it's an invite error, redirect to signup
          if (type === 'invite' && tokenHash) {
            setTimeout(() => {
              router.push(`/portal/signup?type=invite&token_hash=${tokenHash}&code=${code}`);
            }, 2000);
            return;
          }
          
          return;
        }

        // Success - handle different auth types
        if (data.session) {
          // For magic links and successful logins, redirect immediately
          // Magic links don't always have type=magiclink, so we check if it's not recovery/invite
          const isMagicLink = type === 'magiclink' || (!type && data.session && !tokenHash);
          const isRecovery = type === 'recovery';
          const isInvite = type === 'invite' && tokenHash;
          
          if (isMagicLink) {
            // Magic link: user is now logged in, redirect immediately to portal
            router.push('/portal');
            return;
          }
          
          if (isRecovery) {
            // Password reset flow
            setStatus('success');
            setTimeout(() => {
              router.push('/portal/reset-password');
            }, 1500);
            return;
          }
          
          if (isInvite) {
            // Invite flow - redirect to reset password page to force password reset
            // User will be logged in via the session, but must set their password
            setStatus('success');
            setTimeout(() => {
              router.push(`/portal/reset-password?type=invite&token_hash=${tokenHash}`);
            }, 1500);
            return;
          }
          
          // Default: successful login/confirmation (including magic links without explicit type)
          // Redirect immediately to portal
          router.push('/portal');
        } else {
          setStatus('error');
          setErrorMessage('Failed to create session');
        }
      } catch (error) {
        console.error('Callback error:', error);
        setStatus('error');
        setErrorMessage(error instanceof Error ? error.message : 'An unexpected error occurred');
      }
    };

    handleCallback();
  }, [searchParams, router]);

  return (
    <div className="min-h-screen bg-finit-aurora flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div className="h-12 w-auto relative">
            <Image
              src="/Finit Logo Blue@4x.png"
              alt="Finit Solutions Logo"
              width={160}
              height={48}
              className="object-contain h-full w-auto"
              priority
            />
          </div>
        </div>

        {/* Status Card */}
        <Card className="shadow-brand-lg border-primary/20 bg-white/95 backdrop-blur-sm">
          <CardHeader className="space-y-1 text-center pb-6">
            {status === 'loading' && (
              <>
                <div className="flex justify-center mb-4">
                  <Loader2 className="h-8 w-8 text-primary animate-spin" />
                </div>
                <CardTitle className="finit-h2 text-primary">
                  {t('portal.callback.loading')}
                </CardTitle>
                <CardDescription className="finit-body text-muted-foreground">
                  {t('portal.callback.processing')}
                </CardDescription>
              </>
            )}
            
            {status === 'success' && (
              <>
                <div className="flex justify-center mb-4">
                  <div className="rounded-full bg-green-100 p-3">
                    <CheckCircle2 className="h-8 w-8 text-green-600" />
                  </div>
                </div>
                <CardTitle className="finit-h2 text-primary">
                  {t('portal.callback.success')}
                </CardTitle>
                <CardDescription className="finit-body text-muted-foreground">
                  {t('portal.callback.redirecting')}
                </CardDescription>
              </>
            )}
            
            {status === 'error' && (
              <>
                <div className="flex justify-center mb-4">
                  <div className="rounded-full bg-red-100 p-3">
                    <XCircle className="h-8 w-8 text-red-600" />
                  </div>
                </div>
                <CardTitle className="finit-h2 text-primary">
                  {t('portal.callback.error')}
                </CardTitle>
                <CardDescription className="finit-body text-muted-foreground">
                  {errorMessage || t('portal.callback.errorGeneric')}
                </CardDescription>
              </>
            )}
          </CardHeader>
          {status === 'error' && (
            <CardContent>
              <div className="space-y-4">
                <Link href="/portal/login">
                  <Button className="w-full">
                    {t('portal.callback.backToLogin')}
                  </Button>
                </Link>
              </div>
            </CardContent>
          )}
        </Card>
      </div>
    </div>
  );
}

export default function CallbackPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-finit-aurora flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 text-primary animate-spin mx-auto" />
        </div>
      </div>
    }>
      <CallbackHandler />
    </Suspense>
  );
}
