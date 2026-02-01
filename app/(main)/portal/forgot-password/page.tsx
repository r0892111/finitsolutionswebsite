"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/contexts/auth-context';
import { useLanguage } from '@/contexts/language-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Mail, Loader2, ArrowLeft, CheckCircle2 } from 'lucide-react';
import Image from 'next/image';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { resetPassword } = useAuth();
  const { t } = useLanguage();
  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      toast({
        title: t('portal.forgotPassword.error.title'),
        description: t('portal.forgotPassword.error.emailRequired'),
        variant: 'destructive',
      });
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast({
        title: t('portal.forgotPassword.error.title'),
        description: t('portal.forgotPassword.error.invalidEmail'),
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await resetPassword(email);
      
      if (error) {
        toast({
          title: t('portal.forgotPassword.error.title'),
          description: error,
          variant: 'destructive',
        });
      } else {
        setIsSuccess(true);
        toast({
          title: t('portal.forgotPassword.success.title'),
          description: t('portal.forgotPassword.success.description'),
        });
      }
    } catch (error) {
      console.error('Password reset error:', error);
      toast({
        title: t('portal.forgotPassword.error.title'),
        description: t('portal.forgotPassword.error.generic'),
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

        {/* Forgot Password Card */}
        <Card className="shadow-brand-lg border-primary/20 bg-white/95 backdrop-blur-sm">
          <CardHeader className="space-y-1 text-center pb-6">
            <div className="flex justify-center mb-4">
              <div className="rounded-full bg-primary/10 p-3">
                <Mail className="h-6 w-6 text-primary" />
              </div>
            </div>
            <CardTitle className="finit-h2 text-primary">
              {t('portal.forgotPassword.title')}
            </CardTitle>
            <CardDescription className="finit-body text-muted-foreground">
              {t('portal.forgotPassword.description')}
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
                  <h3 className="finit-h2 text-primary">
                    {t('portal.forgotPassword.success.title')}
                  </h3>
                  <p className="finit-body text-muted-foreground">
                    {t('portal.forgotPassword.success.description')}
                  </p>
                </div>
                <Link href="/portal/login">
                  <Button className="w-full">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    {t('portal.forgotPassword.backToLogin')}
                  </Button>
                </Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="text-sm font-medium text-foreground"
                  >
                    {t('portal.forgotPassword.emailLabel')}
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={t('portal.forgotPassword.emailPlaceholder')}
                      disabled={isSubmitting}
                      className="h-12 pl-10"
                      autoFocus
                      autoComplete="email"
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting || !email.trim()}
                  className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground transition-premium"
                  size="lg"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {t('portal.forgotPassword.submitting')}
                    </>
                  ) : (
                    t('portal.forgotPassword.submit')
                  )}
                </Button>
              </form>
            )}

            <div className="mt-6 pt-6 border-t border-border">
              <Link
                href="/portal/login"
                className="flex items-center justify-center text-sm text-primary hover:underline"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                {t('portal.forgotPassword.backToLogin')}
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
