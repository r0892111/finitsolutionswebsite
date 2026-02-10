"use client";

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';
import { useLanguage } from '@/contexts/language-context';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LogOut, FileText, MessageSquare, Settings, Shield, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { IntegrationsList } from '@/components/integrations-list';
import { useToast } from '@/hooks/use-toast';

function PortalContent() {
  const { user, isAuthenticated, isAdmin, logout, isLoading } = useAuth();
  const { t } = useLanguage();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();
  useEffect(() => {
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
    } else if (!isLoading && isAuthenticated && isAdmin) {
      // Redirect admins to admin dashboard
      router.push('/portal/admin');
    }
  }, [isAuthenticated, isAdmin, isLoading, router]);


  const handleLogout = () => {
    logout();
    router.push('/portal/login');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-finit-aurora flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">{t('portal.loading')}</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-finit-aurora">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100 sticky top-0 z-50">
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
              <div className="h-6 w-px bg-border"></div>
              <h1 className="finit-h2 text-primary">{t('portal.title')}</h1>
            </div>
            <Button
              onClick={handleLogout}
              variant="outline"
              size="sm"
              className="gap-2"
            >
              <LogOut className="h-4 w-4" />
              {t('portal.logout')}
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12">
        {/* Welcome Section */}
        <div className="mb-12 text-center">
          <h2 className="finit-h1 text-primary mb-4">
            {t('portal.welcome.title')}
            {user?.email && (
              <span className="block text-lg font-normal text-muted-foreground mt-2">
                {user.email}
              </span>
            )}
          </h2>
          <p className="finit-body text-muted-foreground max-w-2xl mx-auto">
            {t('portal.welcome.description')}
          </p>
        </div>

        {/* Integrations */}
        <div className="w-full">
          <IntegrationsList showConnectButton={true} />
        </div>

        {/* Status Section */}
        <Card className="bg-primary/5 border-primary/20">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Shield className="h-5 w-5 text-primary" />
              <CardTitle className="finit-h2 text-primary">
                {t('portal.status.title')}
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-green-500"></div>
                  <span className="finit-body">{t('portal.status.authenticated')}</span>
                </div>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </div>
              <p className="text-sm text-muted-foreground">
                {t('portal.status.description')}
              </p>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

export default function PortalPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-finit-aurora flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
        </div>
      </div>
    }>
      <PortalContent />
    </Suspense>
  );
}
