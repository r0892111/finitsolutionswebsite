"use client";

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';
import { useLanguage } from '@/contexts/language-context';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LogOut, FileText, MessageSquare, Settings, Shield, Clock, CheckCircle2, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { IntegrationsList } from '@/components/integrations-list';
import { TestRefreshTokens } from '@/components/test-refresh-tokens';
import { useToast } from '@/hooks/use-toast';

function PortalContent() {
  const { user, isAuthenticated, isAdmin, logout, isLoading, needsPasswordReset } = useAuth();
  const { t } = useLanguage();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const [showWelcomeMessage, setShowWelcomeMessage] = useState(false);
  useEffect(() => {
    // Handle Supabase auth tokens/errors in hash fragment (magic links)
    // Supabase redirects with tokens in hash: #access_token=...&token_type=bearer&expires_in=...&type=magiclink
    // Or errors: #error=access_denied&error_code=otp_expired&error_description=...
    if (typeof window !== 'undefined') {
      const hash = window.location.hash;
      if (hash) {
        const hashParams = new URLSearchParams(hash.substring(1)); // Remove '#'
        
        // Check for errors first
        const error = hashParams.get('error');
        if (error) {
          const errorCode = hashParams.get('error_code');
          const errorDescription = hashParams.get('error_description');
          
          // Determine user-friendly error message
          let errorMessage = errorDescription 
            ? decodeURIComponent(errorDescription.replace(/\+/g, ' '))
            : 'An authentication error occurred';
          
          if (errorCode === 'otp_expired') {
            errorMessage = t('portal.error.linkExpired');
          } else if (error === 'access_denied') {
            errorMessage = t('portal.error.accessDenied');
          }
          
          toast({
            title: t('portal.error.linkInvalid'),
            description: errorMessage,
            variant: 'destructive',
            duration: 5000,
          });
          
          // Clean URL and redirect to login
          router.replace('/portal/login?error=link_expired');
          return;
        }
        
        // Check for access token (magic link success)
        const accessToken = hashParams.get('access_token');
        const refreshToken = hashParams.get('refresh_token');
        const hashType = hashParams.get('type');
        
        if (accessToken && (hashType === 'magiclink' || hashType === 'email')) {
          // Magic link verified - set session and redirect
          const handleMagicLinkAuth = async () => {
            try {
              const { createClient } = await import('@/lib/supabase/client');
              const supabase = createClient();
              
              const { error: sessionError, data: sessionData } = await supabase.auth.setSession({
                access_token: accessToken,
                refresh_token: refreshToken || '',
              });
              
              if (sessionError) {
                console.error('Magic link session error:', sessionError);
                toast({
                  title: t('portal.error.loginFailed'),
                  description: t('portal.error.loginFailedDescription'),
                  variant: 'destructive',
                });
                router.replace('/portal/login');
                return;
              }
              
              if (sessionData.session) {
                // Successfully logged in - clean URL and stay on portal
                router.replace('/portal');
              }
            } catch (error) {
              console.error('Magic link auth error:', error);
              toast({
                title: t('portal.error.loginFailed'),
                description: t('portal.error.generic'),
                variant: 'destructive',
              });
              router.replace('/portal/login');
            }
          };
          
          handleMagicLinkAuth();
          return;
        }
      }
    }
    
    // Handle Supabase auth redirects (magic links, etc.)
    // If Supabase redirects here with auth parameters, forward to callback handler
    const code = searchParams.get('code');
    const token = searchParams.get('token');
    const type = searchParams.get('type');
    const tokenHash = searchParams.get('token_hash');
    
    if (code || (token && type)) {
      // Supabase auth redirect detected - forward to callback handler
      const params = new URLSearchParams();
      if (code) params.set('code', code);
      if (token) params.set('token', token);
      if (type) params.set('type', type);
      if (tokenHash) params.set('token_hash', tokenHash);
      
      router.replace(`/portal/auth/callback?${params.toString()}`);
      return;
    }
    
    // Handle success/error messages from OAuth redirects
    const success = searchParams.get('success');
    const error = searchParams.get('error');
    
    if (success === 'google_connected') {
      toast({
        title: 'Success',
        description: 'Google account connected successfully',
      });
      // Clean URL
      router.replace('/portal');
    }
    
    if (error) {
      toast({
        title: 'Error',
        description: error === 'google_oauth_not_configured' 
          ? 'Google OAuth is not configured. Please contact support.'
          : decodeURIComponent(error),
        variant: 'destructive',
      });
    }
  }, [searchParams, toast, router]);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/portal/login');
      return;
    }
    
    // Check if user needs to reset password (first login)
    if (!isLoading && isAuthenticated && needsPasswordReset) {
      // Force password reset on first login
      router.push('/portal/reset-password?first_login=true');
      return;
    }
    
    // Check if user just completed password setup (redirected from reset-password)
    if (!isLoading && isAuthenticated && !needsPasswordReset) {
      const justSetPassword = sessionStorage.getItem('justSetPassword');
      if (justSetPassword === 'true') {
        setShowWelcomeMessage(true);
        sessionStorage.removeItem('justSetPassword');
      }
    }
    
    if (!isLoading && isAuthenticated && isAdmin) {
      // Redirect admins to admin dashboard
      router.push('/portal/admin');
    }
  }, [isAuthenticated, isAdmin, isLoading, needsPasswordReset, router]);


  const handleLogout = () => {
    logout();
    router.push('/portal/login');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-finit-aurora flex items-center justify-center font-instrument">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1A2D63] mx-auto"></div>
          <p className="mt-4 text-[#1A2D63]/60">{t('portal.loading')}</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || needsPasswordReset) {
    return null;
  }

  return (
    <div className="min-h-screen bg-finit-aurora font-instrument">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-xl shadow-brand border-b border-[#1A2D63]/10 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="h-8 w-auto relative">
                <Image
                  src="/Finit Logo Blue@4x.png"
                  alt="Finit Solutions Logo"
                  width={120}
                  height={32}
                  className="object-contain h-full w-auto"
                />
              </div>
              <div className="h-6 w-px bg-[#1A2D63]/20"></div>
              <h1 className="finit-h2 text-[#1A2D63]">{t('portal.title')}</h1>
            </div>
            <Button
              onClick={handleLogout}
              variant="outline"
              size="sm"
              className="gap-2 border-[#1A2D63]/20 text-[#1A2D63] hover:bg-[#1A2D63]/5 transition-premium"
            >
              <LogOut className="h-4 w-4" />
              {t('portal.logout')}
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12">
        {/* First Login Welcome Banner */}
        {showWelcomeMessage && (
          <div className="mb-8 animate-in slide-in-from-top-5 duration-500">
            <Card className="bg-gradient-to-r from-[#1A2D63] to-[#2A3D73] border-0 shadow-brand-lg">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="rounded-full bg-white/20 p-2 flex-shrink-0">
                    <CheckCircle2 className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="finit-h2 text-white mb-2">
                      {t('portal.welcome.firstLogin.title')}
                    </h3>
                    <p className="finit-body text-white/90">
                      {t('portal.welcome.firstLogin.description')}
                    </p>
                  </div>
                  <button
                    onClick={() => setShowWelcomeMessage(false)}
                    className="flex-shrink-0 text-white/80 hover:text-white transition-colors"
                    aria-label="Close"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Welcome Section */}
        <div className="mb-12 text-center">
          <h2 className="finit-h1 text-[#1A2D63] mb-4">
            {t('portal.welcome.title')}
            {user?.email && (
              <span className="block text-lg font-normal text-[#1A2D63]/60 mt-2 font-instrument">
                {user.email}
              </span>
            )}
          </h2>
          <p className="finit-body text-[#1A2D63]/70 max-w-2xl mx-auto">
            {t('portal.welcome.description')}
          </p>
        </div>

        {/* Integrations */}
        <div className="w-full">
          <IntegrationsList showConnectButton={true} />
        </div>

        {/* Status Section */}
        <Card className="bg-white/95 backdrop-blur-sm shadow-brand-lg border-[#1A2D63]/10 mt-8">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-[#1A2D63]/10 p-2">
                <Shield className="h-5 w-5 text-[#1A2D63]" />
              </div>
              <CardTitle className="finit-h2 text-[#1A2D63]">
                {t('portal.status.title')}
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-2.5 w-2.5 rounded-full bg-green-500 animate-pulse"></div>
                  <span className="finit-body text-[#1A2D63]">{t('portal.status.authenticated')}</span>
                </div>
                <Clock className="h-4 w-4 text-[#1A2D63]/50" />
              </div>
              <p className="text-sm text-[#1A2D63]/60">
                {t('portal.status.description')}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Test Refresh Tokens - Admin Only */}
        {isAdmin && <TestRefreshTokens />}
      </main>
    </div>
  );
}

export default function PortalPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-finit-aurora flex items-center justify-center font-instrument">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1A2D63] mx-auto"></div>
        </div>
      </div>
    }>
      <PortalContent />
    </Suspense>
  );
}
