"use client";

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';
import { useLanguage } from '@/contexts/language-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Lock, Loader2, Eye, EyeOff, CheckCircle2 } from 'lucide-react';
import Image from 'next/image';

function ResetPasswordForm() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { updatePassword, isAuthenticated, isLoading, needsPasswordReset } = useAuth();
  const { t } = useLanguage();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();
  
  // Check if this is an invite flow or first login
  const isInviteFlow = searchParams.get('type') === 'invite';
  const isFirstLogin = searchParams.get('first_login') === 'true' || needsPasswordReset;
  const tokenHash = searchParams.get('token_hash');

  useEffect(() => {
    // Ensure user is authenticated (session should exist from callback for both invite and password reset flows)
    // Wait for auth context to finish loading before checking
    if (!isLoading && !isAuthenticated) {
      // User is not authenticated - redirect to login
      router.push('/portal/login');
      return;
    }
    
    // If user is authenticated but doesn't need password reset (and not in invite flow),
    // redirect to portal (they shouldn't be here)
    if (!isLoading && isAuthenticated && !needsPasswordReset && !isInviteFlow) {
      router.push('/portal');
    }
  }, [isAuthenticated, isLoading, needsPasswordReset, isInviteFlow, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!password.trim() || !confirmPassword.trim()) {
      toast({
        title: t('portal.resetPassword.error.title'),
        description: t('portal.resetPassword.error.fieldsRequired'),
        variant: 'destructive',
      });
      return;
    }

    if (password.length < 8) {
      toast({
        title: t('portal.resetPassword.error.title'),
        description: t('portal.resetPassword.error.passwordTooShort'),
        variant: 'destructive',
      });
      return;
    }

    if (password !== confirmPassword) {
      toast({
        title: t('portal.resetPassword.error.title'),
        description: t('portal.resetPassword.error.passwordsDontMatch'),
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await updatePassword(password);
      
      if (error) {
        toast({
          title: t('portal.resetPassword.error.title'),
          description: error,
          variant: 'destructive',
        });
      } else {
        setIsSuccess(true);
        toast({
          title: t('portal.resetPassword.success.title'),
          description: isInviteFlow 
            ? t('portal.resetPassword.success.inviteAccepted')
            : t('portal.resetPassword.success.description'),
        });
        // Set flag to show welcome message on portal
        if (isFirstLogin || isInviteFlow) {
          sessionStorage.setItem('justSetPassword', 'true');
        }
        // Redirect to portal after 2 seconds
        setTimeout(() => {
          router.push('/portal');
        }, 2000);
      }
    } catch (error) {
      console.error('Password update error:', error);
      toast({
        title: t('portal.resetPassword.error.title'),
        description: t('portal.resetPassword.error.generic'),
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-finit-aurora flex items-center justify-center p-4 font-instrument">
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

        {/* Reset Password Card */}
        <Card className="shadow-brand-lg border-[#1A2D63]/10 bg-white/95 backdrop-blur-xl">
          <CardHeader className="space-y-1 text-center pb-6">
            <div className="flex justify-center mb-4">
              <div className="rounded-full bg-[#1A2D63]/10 p-3">
                <Lock className="h-6 w-6 text-[#1A2D63]" />
              </div>
            </div>
            <CardTitle className="finit-h2 text-[#1A2D63]">
              {isFirstLogin || isInviteFlow
                ? t('portal.resetPassword.firstLoginTitle')
                : t('portal.resetPassword.title')}
            </CardTitle>
            <CardDescription className="finit-body text-[#1A2D63]/60">
              {isFirstLogin
                ? t('portal.resetPassword.firstLoginDescription')
                : isInviteFlow
                ? t('portal.resetPassword.inviteDescription')
                : t('portal.resetPassword.description')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isSuccess ? (
              <div className="space-y-6 text-center">
                <div className="flex justify-center">
                  <div className="rounded-full bg-green-100 p-3">
                    <CheckCircle2 className="h-8 w-8 text-green-600" />
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="finit-h2 text-[#1A2D63]">
                    {t('portal.resetPassword.success.title')}
                  </h3>
                  <p className="finit-body text-[#1A2D63]/60">
                    {t('portal.resetPassword.success.description')}
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label
                    htmlFor="password"
                    className="text-sm font-medium text-[#1A2D63]"
                  >
                    {t('portal.resetPassword.passwordLabel')}
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#1A2D63]/50" />
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder={t('portal.resetPassword.passwordPlaceholder')}
                      disabled={isSubmitting}
                      className="h-12 pl-10 pr-10 border-[#1A2D63]/20 focus:border-[#1A2D63]/40 focus:ring-[#1A2D63]/20"
                      autoFocus
                      autoComplete="new-password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#1A2D63]/50 hover:text-[#1A2D63] transition-colors"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                  <p className="text-xs text-[#1A2D63]/50">
                    {t('portal.resetPassword.passwordHint')}
                  </p>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="confirmPassword"
                    className="text-sm font-medium text-[#1A2D63]"
                  >
                    {t('portal.resetPassword.confirmPasswordLabel')}
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#1A2D63]/50" />
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder={t('portal.resetPassword.confirmPasswordPlaceholder')}
                      disabled={isSubmitting}
                      className="h-12 pl-10 pr-10 border-[#1A2D63]/20 focus:border-[#1A2D63]/40 focus:ring-[#1A2D63]/20"
                      autoComplete="new-password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#1A2D63]/50 hover:text-[#1A2D63] transition-colors"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting || !password.trim() || !confirmPassword.trim()}
                  className="w-full h-12 bg-[#1A2D63] hover:bg-[#1A2D63]/90 text-white transition-premium"
                  size="lg"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {t('portal.resetPassword.submitting')}
                    </>
                  ) : (
                    t('portal.resetPassword.submit')
                  )}
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-finit-aurora flex items-center justify-center font-instrument">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1A2D63] mx-auto"></div>
        </div>
      </div>
    }>
      <ResetPasswordForm />
    </Suspense>
  );
}
