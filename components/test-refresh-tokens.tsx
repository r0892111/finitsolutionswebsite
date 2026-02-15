"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { createClient } from '@/lib/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/auth-context';
import { Loader2, RefreshCw, CheckCircle2, XCircle } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

export function TestRefreshTokens() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [refreshAllUsers, setRefreshAllUsers] = useState(false);
  const { toast } = useToast();
  const supabase = createClient();
  const { isAdmin } = useAuth();

  const handleRefresh = async () => {
    setIsLoading(true);
    setResult(null);

    try {
      // Get current session
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();

      if (sessionError || !session?.access_token) {
        toast({
          title: 'Error',
          description: 'Not authenticated. Please log in first.',
          variant: 'destructive',
        });
        setIsLoading(false);
        return;
      }

      // Get Supabase URL from environment
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

      if (!supabaseUrl) {
        toast({
          title: 'Error',
          description: 'Supabase URL not configured. Please check your environment variables.',
          variant: 'destructive',
        });
        setIsLoading(false);
        return;
      }

      // Call refresh function
      const response = await fetch(`${supabaseUrl}/functions/v1/refresh-integration-tokens`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${session.access_token}`,
          'apikey': process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          refresh_all_users: refreshAllUsers && isAdmin,
        }),
      });

      const data = await response.json();
      setResult(data);

      if (response.ok) {
        if (data.message?.includes('No connected integrations')) {
          toast({
            title: 'Info',
            description: 'No connected integrations found. Connect an integration first to test refresh.',
          });
        } else {
          toast({
            title: 'Success',
            description: data.message || `Refreshed ${data.refreshed || 0} integration(s)`,
          });
        }
      } else {
        toast({
          title: 'Error',
          description: data.error || 'Failed to refresh tokens',
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Error refreshing tokens:', error);
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to refresh tokens',
        variant: 'destructive',
      });
      setResult({ error: error instanceof Error ? error.message : 'Unknown error' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="bg-white/95 backdrop-blur-sm shadow-brand-lg border-[#1A2D63]/10 mt-8">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="rounded-full bg-[#1A2D63]/10 p-2">
            <RefreshCw className="h-5 w-5 text-[#1A2D63]" />
          </div>
          <div>
            <CardTitle className="finit-h2 text-[#1A2D63]">
              Test Refresh Integration Tokens
            </CardTitle>
            <CardDescription className="text-[#1A2D63]/60">
              Test the refresh-integration-tokens edge function
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {isAdmin && (
          <div className="flex items-center space-x-2 p-3 bg-amber-50 border border-amber-200 rounded-md">
            <Checkbox
              id="refresh-all-users"
              checked={refreshAllUsers}
              onCheckedChange={(checked) => setRefreshAllUsers(checked === true)}
            />
            <Label
              htmlFor="refresh-all-users"
              className="text-sm font-medium text-amber-900 cursor-pointer"
            >
              Refresh tokens for all users (Admin only)
            </Label>
          </div>
        )}
        <Button
          onClick={handleRefresh}
          disabled={isLoading}
          className="w-full"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {refreshAllUsers ? 'Refreshing all users...' : 'Refreshing...'}
            </>
          ) : (
            <>
              <RefreshCw className="mr-2 h-4 w-4" />
              {refreshAllUsers ? 'Refresh All Users\' Tokens' : 'Refresh My Tokens'}
            </>
          )}
        </Button>

        {result && (
          <div className="mt-4 p-4 bg-[#1A2D63]/5 rounded-lg border border-[#1A2D63]/10">
            <div className="flex items-center gap-2 mb-2">
              {result.error ? (
                <XCircle className="h-5 w-5 text-red-500" />
              ) : result.message?.includes('No connected integrations') ? (
                <XCircle className="h-5 w-5 text-amber-500" />
              ) : (
                <CheckCircle2 className="h-5 w-5 text-green-500" />
              )}
              <h4 className="font-semibold text-[#1A2D63]">Result:</h4>
            </div>
            {result.message?.includes('No connected integrations') && (
              <div className="mb-3 p-3 bg-amber-50 border border-amber-200 rounded text-sm text-amber-800">
                <p className="font-medium mb-1">No integrations found</p>
                <p className="text-xs">
                  To test token refresh, you need to connect an integration first. 
                  Go to the integrations section above and connect Google, Shopify, or Dropbox.
                </p>
              </div>
            )}
            <pre className="text-xs overflow-auto bg-white/50 p-3 rounded border border-[#1A2D63]/10 max-h-64">
              {JSON.stringify(result, null, 2)}
            </pre>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
