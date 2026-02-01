"use client";

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/contexts/auth-context';
import { useLanguage } from '@/contexts/language-context';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, User, Calendar, Mail, Shield, Loader2 } from 'lucide-react';
import { format } from 'date-fns';
import Image from 'next/image';

interface UserDetails {
  id: string;
  email: string;
  created_at: string;
  last_sign_in_at: string | null;
  email_confirmed_at: string | null;
  is_admin: boolean;
}

export default function UserDetailPage() {
  const { isAuthenticated, isAdmin, isLoading: authLoading } = useAuth();
  const { t } = useLanguage();
  const router = useRouter();
  const params = useParams();
  const userId = params?.userId as string;
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && (!isAuthenticated || !isAdmin)) {
      router.push('/portal');
    }
  }, [isAuthenticated, isAdmin, authLoading, router]);

  useEffect(() => {
    if (isAdmin && isAuthenticated && userId) {
      fetchUserDetails();
    }
  }, [isAdmin, isAuthenticated, userId]);

  const fetchUserDetails = async () => {
    try {
      setIsLoading(true);
      const { createClient } = await import('@/lib/supabase/client');
      const supabase = createClient();
      
      // Get current session
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        throw new Error('No session found');
      }

      // Fetch all users and find the one we need
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const response = await fetch(`${supabaseUrl}/functions/v1/list-users`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${session.access_token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }

      const data = await response.json();
      const user = data.users?.find((u: UserDetails) => u.id === userId);
      
      if (user) {
        setUserDetails(user);
      } else {
        throw new Error('User not found');
      }
    } catch (error) {
      console.error('Error fetching user details:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen bg-finit-aurora flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">{t('portal.loading')}</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || !isAdmin) {
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
              <h1 className="finit-h2 text-primary">{t('portal.admin.userDetail.title')}</h1>
            </div>
            <Link href="/portal/admin">
              <Button variant="outline" size="sm" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                {t('portal.admin.userDetail.back')}
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          {/* User Info Card */}
          <Card className="mb-6">
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-primary/10 p-4">
                  <User className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <CardTitle className="finit-h2">
                    {userDetails?.email || 'Loading...'}
                  </CardTitle>
                  <CardDescription>{t('portal.admin.userDetail.userId')}: {userId}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Mail className="h-4 w-4" />
                    <span>{t('portal.admin.userDetail.email')}</span>
                  </div>
                  <p className="font-medium">{userDetails?.email}</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Shield className="h-4 w-4" />
                    <span>{t('portal.admin.userDetail.role')}</span>
                  </div>
                  <p className="font-medium">
                    {userDetails?.is_admin
                      ? t('portal.admin.userDetail.admin')
                      : t('portal.admin.userDetail.user')}
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>{t('portal.admin.userDetail.createdAt')}</span>
                  </div>
                  <p className="font-medium">
                    {userDetails?.created_at
                      ? format(new Date(userDetails.created_at), 'PPpp')
                      : '-'}
                  </p>
                </div>
                {userDetails?.last_sign_in_at && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>{t('portal.admin.userDetail.lastLogin')}</span>
                    </div>
                    <p className="font-medium">
                      {format(new Date(userDetails.last_sign_in_at), 'PPpp')}
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Custom Dashboard Placeholder */}
          <Card>
            <CardHeader>
              <CardTitle className="finit-h2">{t('portal.admin.userDetail.dashboard.title')}</CardTitle>
              <CardDescription>{t('portal.admin.userDetail.dashboard.description')}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <p className="text-muted-foreground mb-4">
                  {t('portal.admin.userDetail.dashboard.comingSoon')}
                </p>
                <p className="text-sm text-muted-foreground">
                  {t('portal.admin.userDetail.dashboard.note')}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
