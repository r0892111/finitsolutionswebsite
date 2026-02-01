"use client";

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/contexts/auth-context';
import { useLanguage } from '@/contexts/language-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { UserPlus, Loader2, ArrowRight, Mail, Eye, EyeOff, Lock, CheckCircle2 } from 'lucide-react';
import Image from 'next/image';

function SignupForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { signUp, isAuthenticated } = useAuth();
  const { t } = useLanguage();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();

  useEffect(() => {
    // Check if there's an invite token in the URL
    const token = searchParams.get('token');
    const tokenHash = searchParams.get('token_hash');
    const type = searchParams.get('type');
    
    // If it's an invite, pre-fill email if available
    if (type === 'invite' && tokenHash) {
      // The email might be in the token, but we'll let user enter it
      // Supabase will handle the invite verification
    }

    // Redirect if already authenticated
    if (isAuthenticated) {
      router.push('/portal');
    }
  }, [isAuthenticated, router, searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim() || !password.trim() || !confirmPassword.trim()) {
      toast({
        title: t('portal.signup.error.title'),
        description: t('portal.signup.error.fieldsRequired'),
        variant: 'destructive',
      });
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast({
        title: t('portal.signup.error.title'),
        description: t('portal.signup.error.invalidEmail'),
        variant: 'destructive',
      });
      return;
    }

    if (password.length < 8) {
      toast({
        title: t('portal.signup.error.title'),
        description: t('portal.signup.error.passwordTooShort'),
        variant: 'destructive',
      });
      return;
    }

    if (password !== confirmPassword) {
      toast({
        title: t('portal.signup.error.title'),
        description: t('portal.signup.error.passwordsDontMatch'),
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Check if this is an invite flow
      const tokenHash = searchParams.get('token_hash');
      const type = searchParams.get('type');
      
      let signupOptions: any = {
        emailRedirectTo: `${window.location.origin}/portal/auth/callback`,
      };

      // For invites, exchange code first then set password
      if (type === 'invite' && tokenHash && code) {
        const { createClient } = await import('@/lib/supabase/client');
        const supabase = createClient();
        
        // Exchange the code for session
        const { error: exchangeError, data: exchangeData } = await supabase.auth.exchangeCodeForSession(code);
        
        if (exchangeError) {
          toast({
            title: t('portal.signup.error.title'),
            description: exchangeError.message || t('portal.signup.error.invalidInvite'),
            variant: 'destructive',
          });
          setIsSubmitting(false);
          return;
        }
        
        // If we have a session, update the password
        if (exchangeData.session) {
          const { error: updateError } = await supabase.auth.updateUser({
            password: password,
          });
          
          if (updateError) {
            toast({
              title: t('portal.signup.error.title'),
              description: updateError.message || t('portal.signup.error.generic'),
              variant: 'destructive',
            });
          } else {
            // Success - user is now logged in with password set
            toast({
              title: t('portal.signup.success.title'),
              description: t('portal.signup.success.inviteAccepted'),
            });
            // Redirect to portal
            setTimeout(() => {
              router.push('/portal');
            }, 1500);
          }
        } else {
          toast({
            title: t('portal.signup.error.title'),
            description: t('portal.signup.error.invalidInvite'),
            variant: 'destructive',
          });
        }
        setIsSubmitting(false);
        return;
      }
      
      // Regular signup flow (not invite)
      const result = await signUp(email, password);
      
      if (result.error) {
        // Check if user already exists (might be accepting invite)
        if (result.error.includes('already registered') || result.error.includes('User already registered')) {
          toast({
            title: t('portal.signup.error.title'),
            description: t('portal.signup.error.alreadyRegistered'),
            variant: 'destructive',
          });
        } else {
          toast({
            title: t('portal.signup.error.title'),
            description: result.error,
            variant: 'destructive',
          });
        }
      } else {
        setIsSuccess(true);
        toast({
          title: t('portal.signup.success.title'),
          description: result.requiresConfirmation 
            ? t('portal.signup.success.checkEmail')
            : t('portal.signup.success.description'),
        });
      }
    } catch (error) {
      console.error('Signup error:', error);
      toast({
        title: t('portal.signup.error.title'),
        description: t('portal.signup.error.generic'),
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-finit-aurora flex items-center justify-center p-4">
        <div className="w-full max-w-md">
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

          <Card className="shadow-brand-lg border-primary/20 bg-white/95 backdrop-blur-sm">
            <CardHeader className="space-y-1 text-center pb-6">
              <div className="flex justify-center mb-4">
                <div className="rounded-full bg-green-100 p-3">
                  <CheckCircle2 className="h-6 w-6 text-green-600" />
                </div>
              </div>
              <CardTitle className="finit-h2 text-primary">
                {t('portal.signup.success.title')}
              </CardTitle>
              <CardDescription className="finit-body text-muted-foreground">
                {t('portal.signup.success.description')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground text-center">
                  {t('portal.signup.success.checkEmail')}
                </p>
                <Link href="/portal/login">
                  <Button className="w-full">
                    {t('portal.signup.success.backToLogin')}
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

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

        {/* Signup Card */}
        <Card className="shadow-brand-lg border-primary/20 bg-white/95 backdrop-blur-sm">
          <CardHeader className="space-y-1 text-center pb-6">
            <div className="flex justify-center mb-4">
              <div className="rounded-full bg-primary/10 p-3">
                <UserPlus className="h-6 w-6 text-primary" />
              </div>
            </div>
            <CardTitle className="finit-h2 text-primary">
              {t('portal.signup.title')}
            </CardTitle>
            <CardDescription className="finit-body text-muted-foreground">
              {searchParams.get('type') === 'invite' 
                ? t('portal.signup.inviteDescription')
                : t('portal.signup.description')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-foreground"
                >
                  {t('portal.signup.emailLabel')}
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t('portal.signup.emailPlaceholder')}
                    disabled={isSubmitting}
                    className="h-12 pl-10"
                    autoFocus
                    autoComplete="email"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-foreground"
                >
                  {t('portal.signup.passwordLabel')}
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={t('portal.signup.passwordPlaceholder')}
                    disabled={isSubmitting}
                    className="h-12 pl-10 pr-10"
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
                <p className="text-xs text-muted-foreground">
                  {t('portal.signup.passwordHint')}
                </p>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="confirmPassword"
                  className="text-sm font-medium text-foreground"
                >
                  {t('portal.signup.confirmPasswordLabel')}
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder={t('portal.signup.confirmPasswordPlaceholder')}
                    disabled={isSubmitting}
                    className="h-12 pl-10 pr-10"
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
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
                disabled={isSubmitting || !email.trim() || !password.trim() || !confirmPassword.trim()}
                className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground transition-premium"
                size="lg"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {t('portal.signup.submitting')}
                  </>
                ) : (
                  <>
                    {t('portal.signup.submit')}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </form>

            <div className="mt-6 pt-6 border-t border-border">
              <p className="text-sm text-center text-muted-foreground">
                {t('portal.signup.alreadyHaveAccount')}{' '}
                <Link href="/portal/login" className="text-primary hover:underline">
                  {t('portal.signup.loginLink')}
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function SignupPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-finit-aurora flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
        </div>
      </div>
    }>
      <SignupForm />
    </Suspense>
  );
}
