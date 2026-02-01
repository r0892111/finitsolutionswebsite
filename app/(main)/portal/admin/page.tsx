"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/contexts/auth-context';
import { useLanguage } from '@/contexts/language-context';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { LogOut, Users, Search, User, Calendar, Shield, Loader2, ArrowRight } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import Image from 'next/image';
import { format } from 'date-fns';

interface PortalUser {
  id: string;
  email: string;
  created_at: string;
  last_sign_in_at: string | null;
  email_confirmed_at: string | null;
  is_admin: boolean;
}

export default function AdminDashboardPage() {
  const { user, isAuthenticated, isAdmin, logout, isLoading: authLoading } = useAuth();
  const { t } = useLanguage();
  const router = useRouter();
  const { toast } = useToast();
  const [users, setUsers] = useState<PortalUser[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<PortalUser[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    if (!authLoading && (!isAuthenticated || !isAdmin)) {
      router.push('/portal');
    }
  }, [isAuthenticated, isAdmin, authLoading, router]);

  useEffect(() => {
    if (isAdmin && isAuthenticated) {
      fetchUsers();
    }
  }, [isAdmin, isAuthenticated]);

  useEffect(() => {
    // Filter users based on search query
    if (searchQuery.trim() === '') {
      setFilteredUsers(users);
    } else {
      const query = searchQuery.toLowerCase();
      setFilteredUsers(
        users.filter(
          (u) =>
            u.email.toLowerCase().includes(query) ||
            u.id.toLowerCase().includes(query)
        )
      );
    }
  }, [searchQuery, users]);

  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      
      // Get current session
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        throw new Error('No session found');
      }

      // Call Supabase Edge Function to list users
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
      
      if (!supabaseUrl || !anonKey) {
        throw new Error('Supabase configuration missing');
      }

      const response = await fetch(`${supabaseUrl}/functions/v1/list-users`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${session.access_token}`,
          'apikey': anonKey,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        let error;
        try {
          error = JSON.parse(errorText);
        } catch {
          error = { error: errorText || `HTTP ${response.status}` };
        }
        
        console.error('Edge Function error:', error);
        throw new Error(error.error || 'Failed to fetch users');
      }

      const data = await response.json();
      console.log('Users fetched:', data);
      setUsers(data.users || []);
      setFilteredUsers(data.users || []);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast({
        title: t('portal.admin.error.title'),
        description: error instanceof Error ? error.message : t('portal.admin.error.fetchFailed'),
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    router.push('/portal/login');
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
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                <h1 className="finit-h2 text-primary">{t('portal.admin.title')}</h1>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Link href="/portal">
                <Button variant="outline" size="sm">
                  {t('portal.admin.backToPortal')}
                </Button>
              </Link>
              <Button onClick={handleLogout} variant="outline" size="sm" className="gap-2">
                <LogOut className="h-4 w-4" />
                {t('portal.logout')}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12">
        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-primary/5 border-primary/20">
            <CardHeader className="pb-2">
              <CardDescription>{t('portal.admin.stats.totalUsers')}</CardDescription>
              <CardTitle className="finit-h2 text-primary">{users.length}</CardTitle>
            </CardHeader>
          </Card>
          <Card className="bg-primary/5 border-primary/20">
            <CardHeader className="pb-2">
              <CardDescription>{t('portal.admin.stats.activeUsers')}</CardDescription>
              <CardTitle className="finit-h2 text-primary">
                {users.filter((u) => u.last_sign_in_at).length}
              </CardTitle>
            </CardHeader>
          </Card>
          <Card className="bg-primary/5 border-primary/20">
            <CardHeader className="pb-2">
              <CardDescription>{t('portal.admin.stats.adminUsers')}</CardDescription>
              <CardTitle className="finit-h2 text-primary">
                {users.filter((u) => u.is_admin).length}
              </CardTitle>
            </CardHeader>
          </Card>
        </div>

        {/* Search Bar */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder={t('portal.admin.search.placeholder')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Users List */}
        <Card>
          <CardHeader>
            <CardTitle className="finit-h2 flex items-center gap-2">
              <Users className="h-5 w-5" />
              {t('portal.admin.users.title')}
            </CardTitle>
            <CardDescription>{t('portal.admin.users.description')}</CardDescription>
          </CardHeader>
          <CardContent>
            {filteredUsers.length === 0 ? (
              <div className="text-center py-12">
                <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">{t('portal.admin.users.noUsers')}</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredUsers.map((portalUser) => (
                  <Link
                    key={portalUser.id}
                    href={`/portal/admin/users/${portalUser.id}`}
                    className="block"
                  >
                    <Card className="highlight-card hover:shadow-brand-lg transition-all duration-300 cursor-pointer">
                      <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4 flex-1">
                            <div className="rounded-full bg-primary/10 p-3">
                              <User className="h-5 w-5 text-primary" />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className="font-semibold text-foreground">
                                  {portalUser.email}
                                </h3>
                                {portalUser.is_admin && (
                                  <span className="px-2 py-0.5 text-xs font-medium bg-primary/10 text-primary rounded-full">
                                    {t('portal.admin.users.admin')}
                                  </span>
                                )}
                              </div>
                              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                <div className="flex items-center gap-1">
                                  <Calendar className="h-3 w-3" />
                                  <span>
                                    {t('portal.admin.users.created')}:{' '}
                                    {format(new Date(portalUser.created_at), 'MMM d, yyyy')}
                                  </span>
                                </div>
                                {portalUser.last_sign_in_at && (
                                  <div className="flex items-center gap-1">
                                    <span>
                                      {t('portal.admin.users.lastLogin')}:{' '}
                                      {format(new Date(portalUser.last_sign_in_at), 'MMM d, yyyy')}
                                    </span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                          <ArrowRight className="h-5 w-5 text-muted-foreground" />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
