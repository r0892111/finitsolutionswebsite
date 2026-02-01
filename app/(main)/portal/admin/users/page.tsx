"use client";

import { useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import UserDetailClient from './[userId]/UserDetailClient';
import { useAuth } from '@/contexts/auth-context';
import { Loader2 } from 'lucide-react';

function UserDetailContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isAuthenticated, isAdmin, isLoading: authLoading } = useAuth();
  const userId = searchParams.get('userId');

  useEffect(() => {
    if (!authLoading && (!isAuthenticated || !isAdmin)) {
      router.push('/portal');
    }
  }, [isAuthenticated, isAdmin, authLoading, router]);

  useEffect(() => {
    if (!userId && !authLoading) {
      router.push('/portal/admin');
    }
  }, [userId, authLoading, router]);

  if (authLoading) {
    return (
      <div className="min-h-screen bg-finit-aurora flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto" />
        </div>
      </div>
    );
  }

  if (!userId) {
    return null;
  }

  return <UserDetailClient userId={userId} />;
}

export default function UserDetailPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-finit-aurora flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto" />
        </div>
      </div>
    }>
      <UserDetailContent />
    </Suspense>
  );
}
