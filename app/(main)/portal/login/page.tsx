"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/contexts/auth-context';
import { useLanguage } from '@/contexts/language-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Lock, Loader2, ArrowRight, Mail, Eye, EyeOff } from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login, isAuthenticated } = useAuth();
  const { t } = useLanguage();
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    // Redirect if already authenticated
    if (isAuthenticated) {
      router.push('/portal');
    }
  }, [isAuthenticated, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim() || !password.trim()) {
      toast({
        title: t('portal.login.error.title'),
        description: t('portal.login.error.fieldsRequired'),
        variant: 'destructive',
      });
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast({
        title: t('portal.login.error.title'),
        description: t('portal.login.error.invalidEmail'),
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await login(email, password);
      
      if (error) {
        toast({
          title: t('portal.login.error.title'),
          description: error,
          variant: 'destructive',
        });
      } else {
        toast({
          title: t('portal.login.success.title'),
          description: t('portal.login.success.description'),
        });
        router.push('/portal');
      }
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: t('portal.login.error.title'),
        description: t('portal.login.error.generic'),
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

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

        {/* Login Card */}
        <Card className="shadow-brand-lg border-primary/20 bg-white/95 backdrop-blur-sm">
          <CardHeader className="space-y-1 text-center pb-6">
            <div className="flex justify-center mb-4">
              <div className="rounded-full bg-primary/10 p-3">
                <Lock className="h-6 w-6 text-primary" />
              </div>
            </div>
            <CardTitle className="finit-h2 text-primary">
              {t('portal.login.title')}
            </CardTitle>
            <CardDescription className="finit-body text-muted-foreground">
              {t('portal.login.description')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-foreground"
                >
                  {t('portal.login.emailLabel')}
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t('portal.login.emailPlaceholder')}
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
                  {t('portal.login.passwordLabel')}
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={t('portal.login.passwordPlaceholder')}
                    disabled={isSubmitting}
                    className="h-12 pl-10 pr-10"
                    autoComplete="current-password"
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
              </div>

              <div className="flex items-center justify-end">
                <Link
                  href="/portal/forgot-password"
                  className="text-sm text-primary hover:underline"
                >
                  {t('portal.login.forgotPassword')}
                </Link>
              </div>

              <Button
                type="submit"
                disabled={isSubmitting || !email.trim() || !password.trim()}
                className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground transition-premium"
                size="lg"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {t('portal.login.submitting')}
                  </>
                ) : (
                  <>
                    {t('portal.login.submit')}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </form>

            <div className="mt-6 pt-6 border-t border-border">
              <p className="text-sm text-center text-muted-foreground">
                {t('portal.login.noAccount')}{' '}
                <Link href="/portal/signup" className="text-primary hover:underline">
                  {t('portal.login.signupLink')}
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Security Badge */}
        <div className="mt-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 border border-primary/10">
            <Lock className="h-3 w-3 text-primary" />
            <span className="text-xs font-medium text-primary">
              {t('portal.login.secure')}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
