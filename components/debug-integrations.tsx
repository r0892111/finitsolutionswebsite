"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { createClient } from '@/lib/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/auth-context';
import { Loader2, Database, CheckCircle2, XCircle } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

export function DebugIntegrations() {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<any>(null);
  const [showAllUsers, setShowAllUsers] = useState(false);
  const { toast } = useToast();
  const supabase = createClient();
  const { isAdmin } = useAuth();

  const handleDebug = async () => {
    setIsLoading(true);
    setData(null);

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

      const userId = session.user.id;

      // Build query - if admin and showAllUsers, query all users
      let allIntegrationsQuery = supabase
        .from('user_integrations')
        .select(`
          id,
          user_id,
          account_id,
          status,
          access_token,
          refresh_token,
          token_expires_at,
          metadata,
          connected_at,
          created_at,
          updated_at,
          integration_type:integration_types(name, display_name)
        `);

      let connectedIntegrationsQuery = supabase
        .from('user_integrations')
        .select(`
          id,
          user_id,
          account_id,
          status,
          access_token,
          refresh_token,
          token_expires_at,
          metadata,
          connected_at,
          created_at,
          updated_at,
          integration_type:integration_types(name, display_name)
        `)
        .eq('status', 'connected');

      // If not showing all users, filter by current user
      if (!showAllUsers || !isAdmin) {
        allIntegrationsQuery = allIntegrationsQuery.eq('user_id', userId);
        connectedIntegrationsQuery = connectedIntegrationsQuery.eq('user_id', userId);
      }

      // Query all integrations (no status filter)
      const { data: allIntegrations, error: allError } = await allIntegrationsQuery;

      // Query connected integrations only
      const { data: connectedIntegrations, error: connectedError } = await connectedIntegrationsQuery;

      // Get user info
      const { data: { user }, error: userError } = await supabase.auth.getUser();

      const debugData = {
        user: {
          id: user?.id,
          email: user?.email,
          error: userError?.message,
        },
        allIntegrations: {
          count: allIntegrations?.length || 0,
          data: allIntegrations,
          error: allError?.message,
        },
        connectedIntegrations: {
          count: connectedIntegrations?.length || 0,
          data: connectedIntegrations,
          error: connectedError?.message,
        },
        statusBreakdown: allIntegrations?.reduce((acc: Record<string, number>, integration: any) => {
          const status = integration.status || 'null';
          acc[status] = (acc[status] || 0) + 1;
          return acc;
        }, {}),
      };

      setData(debugData);

      if (allError || connectedError) {
        toast({
          title: 'Warning',
          description: 'Some queries had errors. Check the debug output.',
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'Success',
          description: `Found ${allIntegrations?.length || 0} total integration(s), ${connectedIntegrations?.length || 0} connected`,
        });
      }
    } catch (error) {
      console.error('Error debugging integrations:', error);
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to debug integrations',
        variant: 'destructive',
      });
      setData({ error: error instanceof Error ? error.message : 'Unknown error' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="bg-white/95 backdrop-blur-sm shadow-brand-lg border-[#1A2D63]/10 mt-8">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="rounded-full bg-[#1A2D63]/10 p-2">
            <Database className="h-5 w-5 text-[#1A2D63]" />
          </div>
          <div>
            <CardTitle className="finit-h2 text-[#1A2D63]">
              Debug Integrations
            </CardTitle>
            <CardDescription className="text-[#1A2D63]/60">
              Check what integrations exist in the database
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {isAdmin && (
          <div className="flex items-center space-x-2 p-3 bg-blue-50 border border-blue-200 rounded-md">
            <Checkbox
              id="show-all-users"
              checked={showAllUsers}
              onCheckedChange={(checked) => setShowAllUsers(checked === true)}
            />
            <Label
              htmlFor="show-all-users"
              className="text-sm font-medium text-blue-900 cursor-pointer"
            >
              Show integrations for all users (Admin only)
            </Label>
          </div>
        )}
        <Button
          onClick={handleDebug}
          disabled={isLoading}
          variant="outline"
          className="w-full"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Loading...
            </>
          ) : (
            <>
              <Database className="mr-2 h-4 w-4" />
              {showAllUsers && isAdmin ? 'Check All Users\' Integrations' : 'Check My Integrations'}
            </>
          )}
        </Button>

        {data && (
          <div className="mt-4 space-y-4">
            {/* Summary */}
            <div className="p-4 bg-[#1A2D63]/5 rounded-lg border border-[#1A2D63]/10">
              <div className="flex items-center gap-2 mb-3">
                {data.error ? (
                  <XCircle className="h-5 w-5 text-red-500" />
                ) : (
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                )}
                <h4 className="font-semibold text-[#1A2D63]">Summary:</h4>
              </div>
              <div className="space-y-2 text-sm">
                <div>
                  <span className="font-medium text-[#1A2D63]">User ID:</span>{' '}
                  <span className="text-[#1A2D63]/70 font-mono text-xs">{data.user?.id}</span>
                </div>
                <div>
                  <span className="font-medium text-[#1A2D63]">Email:</span>{' '}
                  <span className="text-[#1A2D63]/70">{data.user?.email}</span>
                </div>
                <div>
                  <span className="font-medium text-[#1A2D63]">Total Integrations:</span>{' '}
                  <span className="text-[#1A2D63]/70">{data.allIntegrations?.count || 0}</span>
                </div>
                <div>
                  <span className="font-medium text-[#1A2D63]">Connected Integrations:</span>{' '}
                  <span className="text-[#1A2D63]/70">{data.connectedIntegrations?.count || 0}</span>
                </div>
                {data.statusBreakdown && Object.keys(data.statusBreakdown).length > 0 && (
                  <div>
                    <span className="font-medium text-[#1A2D63]">Status Breakdown:</span>
                    <ul className="list-disc list-inside ml-2 mt-1">
                      {Object.entries(data.statusBreakdown).map(([status, count]) => (
                        <li key={status} className="text-[#1A2D63]/70">
                          <span className="font-mono">{status}</span>: {count as number}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* Full Data */}
            <div className="p-4 bg-[#1A2D63]/5 rounded-lg border border-[#1A2D63]/10">
              <h4 className="font-semibold text-[#1A2D63] mb-2">Full Debug Data:</h4>
              <pre className="text-xs overflow-auto bg-white/50 p-3 rounded border border-[#1A2D63]/10 max-h-96">
                {JSON.stringify(data, null, 2)}
              </pre>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
