"use client";

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { createClient } from '@/lib/supabase/client';
import { Loader2, Plug, CheckCircle2, XCircle, AlertCircle, ExternalLink, Plus } from 'lucide-react';
import { useAuth } from '@/contexts/auth-context';
import { getDropboxRedirectUri, getGoogleRedirectUri, getShopifyRedirectUri } from '@/lib/oauth';
import Image from 'next/image';

// Fallback icon mapping for integrations
const INTEGRATION_ICONS: Record<string, string> = {
  google: '/Gmail_icon_(2020).png',
  microsoft: '/Microsoft_Office_Teams_(2019–2025).svg',
  shopify: '/shopify_icon.png',
  dropbox: '/dropbox_icon.png',
};

interface IntegrationType {
  id: string;
  name: string;
  display_name: string;
  description: string | null;
  icon_url: string | null;
  enabled: boolean;
}

interface UserIntegration {
  id: string;
  user_id: string;
  integration_type_id: string;
  status: 'pending' | 'connected' | 'disconnected' | 'error';
  connected_at: string | null;
  last_sync_at: string | null;
  error_message: string | null;
  authenticated_email: string | null;
  user_email: string | null;
  integration_type: IntegrationType;
}

interface IntegrationsListProps {
  userId?: string; // If provided, shows integrations for specific user (admin view)
  showConnectButton?: boolean; // Show connect buttons for available integrations
}

export function IntegrationsList({ userId, showConnectButton = true }: IntegrationsListProps) {
  const { toast } = useToast();
  const { user: currentUser, isAdmin } = useAuth();
  const supabase = createClient();
  const searchParams = useSearchParams();
  const [integrations, setIntegrations] = useState<UserIntegration[]>([]);
  const [availableTypes, setAvailableTypes] = useState<IntegrationType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isConnecting, setIsConnecting] = useState<string | null>(null);

  const targetUserId = userId || currentUser?.id;

  useEffect(() => {
    if (targetUserId) {
      fetchIntegrations();
      fetchAvailableTypes();
    }
  }, [targetUserId]);

  // Watch for refresh query parameter to trigger a refresh
  useEffect(() => {
    const refresh = searchParams.get('refresh');
    if (refresh === 'integrations' && targetUserId) {
      console.log('Refreshing integrations due to refresh query parameter');
      fetchIntegrations();
      fetchAvailableTypes();
    }
  }, [searchParams, targetUserId]);

  const fetchIntegrations = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('user_integrations')
        .select(`
          *,
          integration_type:integration_types(*)
        `)
        .eq('user_id', targetUserId!)
        .order('created_at', { ascending: false });

      if (error) throw error;

      console.log('User integrations:', data);
      setIntegrations((data || []) as UserIntegration[]);
    } catch (error) {
      console.error('Error fetching integrations:', error);
      toast({
        title: 'Error',
        description: 'Failed to load integrations',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const fetchAvailableTypes = async () => {
    try {
      const { data, error } = await supabase
        .from('integration_types')
        .select('*')
        .eq('enabled', true)
        .order('display_name', { ascending: true });

      if (error) throw error;

      console.log('Available integration types:', data);
      setAvailableTypes(data || []);
    } catch (error) {
      console.error('Error fetching integration types:', error);
    }
  };

  const handleConnect = async (integrationTypeId: string, integrationName: string) => {
    if (!currentUser?.id) {
      toast({
        title: 'Error',
        description: 'You must be logged in to connect integrations',
        variant: 'destructive',
      });
      return;
    }

    try {
      setIsConnecting(integrationTypeId);

      // Create pending integration record
      // Allow multiple pending records - Edge Functions will handle deduplication by authenticated_email
      const { error: insertError } = await supabase
        .from('user_integrations')
        .insert({
          user_id: currentUser.id,
          integration_type_id: integrationTypeId,
          status: 'pending',
        });

      if (insertError) {
        console.error('Failed to create pending integration:', insertError);
        throw insertError;
      }

      // For Google OAuth, redirect to OAuth flow
      if (integrationName === 'google') {
        console.log('Redirecting to Google OAuth...');
        
        // Get Google OAuth credentials from environment
        const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
        if (!clientId) {
          console.error('NEXT_PUBLIC_GOOGLE_CLIENT_ID is not set in environment variables');
          toast({
            title: 'Configuration Error',
            description: 'Google OAuth is not configured. Please add NEXT_PUBLIC_GOOGLE_CLIENT_ID to your .env.local file.',
            variant: 'destructive',
          });
          setIsConnecting(null);
          return;
        }

        // Construct redirect URI (must match Google Cloud Console)
        const redirectUri = getGoogleRedirectUri();
        const scope = 'https://www.googleapis.com/auth/gmail.compose https://www.googleapis.com/auth/gmail.readonly https://www.googleapis.com/auth/gmail.modify';

        // Build Google OAuth URL
        const authUrl = new URL('https://accounts.google.com/o/oauth2/v2/auth');
        authUrl.searchParams.set('client_id', clientId);
        authUrl.searchParams.set('redirect_uri', redirectUri);
        authUrl.searchParams.set('response_type', 'code');
        authUrl.searchParams.set('scope', scope);
        authUrl.searchParams.set('access_type', 'offline');
        authUrl.searchParams.set('prompt', 'consent');
        authUrl.searchParams.set('state', currentUser.id); // Pass user ID in state

        // Redirect to Google OAuth
        window.location.href = authUrl.toString();
        return;
      }

      // For Shopify OAuth, redirect to OAuth flow
      if (integrationName === 'shopify') {
        console.log('Redirecting to Shopify OAuth...');
        
        // Get Shopify OAuth credentials from environment
        const clientId = process.env.NEXT_PUBLIC_SHOPIFY_CLIENT_ID;
        if (!clientId) {
          console.error('NEXT_PUBLIC_SHOPIFY_CLIENT_ID is not set in environment variables');
          toast({
            title: 'Configuration Error',
            description: 'Shopify OAuth is not configured. Please add NEXT_PUBLIC_SHOPIFY_CLIENT_ID to your .env.local file.',
            variant: 'destructive',
          });
          setIsConnecting(null);
          return;
        }

        // Construct redirect URI (must match Shopify app settings)
        const redirectUri = getShopifyRedirectUri();
        
        // Shopify OAuth scopes (read_products, read_orders, read_customers are common)
        const scope = 'read_products,read_orders,read_customers,read_inventory,write_draft_orders';

        // Build Shopify OAuth URL
        // Shopify uses shop parameter - we'll prompt user for their shop domain
        const shopDomain = prompt('Enter your Shopify store domain (e.g., mystore.myshopify.com):');
        if (!shopDomain) {
          setIsConnecting(null);
          return;
        }

        // Normalize shop domain (remove https://, .myshopify.com if needed)
        let shop = shopDomain.trim().toLowerCase();
        if (shop.startsWith('http://') || shop.startsWith('https://')) {
          shop = shop.replace(/^https?:\/\//, '');
        }
        if (!shop.endsWith('.myshopify.com')) {
          shop = `${shop}.myshopify.com`;
        }

        const authUrl = new URL(`https://${shop}/admin/oauth/authorize`);
        authUrl.searchParams.set('client_id', clientId);
        authUrl.searchParams.set('scope', scope);
        authUrl.searchParams.set('redirect_uri', redirectUri);
        authUrl.searchParams.set('state', currentUser.id); // Pass user ID in state

        // Store shop domain in sessionStorage for callback
        sessionStorage.setItem('shopify_shop', shop);

        // Redirect to Shopify OAuth
        window.location.href = authUrl.toString();
        return;
      }

      // For Dropbox OAuth, redirect to OAuth flow
      if (integrationName === 'dropbox') {
        console.log('Redirecting to Dropbox OAuth...');
        
        // Get Dropbox OAuth credentials from environment
        const clientId = process.env.NEXT_PUBLIC_DROPBOX_CLIENT_ID;
        if (!clientId) {
          console.error('NEXT_PUBLIC_DROPBOX_CLIENT_ID is not set in environment variables');
          toast({
            title: 'Configuration Error',
            description: 'Dropbox OAuth is not configured. Please add NEXT_PUBLIC_DROPBOX_CLIENT_ID to your .env.local file.',
            variant: 'destructive',
          });
          setIsConnecting(null);
          return;
        }

        // Construct redirect URI (must match Dropbox app settings)
        const redirectUri = getDropboxRedirectUri();
        
        // Dropbox OAuth scopes (files.content.read, files.content.write, files.metadata.read, account_info.read)
        const scope = 'files.content.read files.content.write files.metadata.read account_info.read';

        // Build Dropbox OAuth URL
        // Include token_access_type=offline to get refresh tokens
        const authUrl = new URL('https://www.dropbox.com/oauth2/authorize');
        authUrl.searchParams.set('client_id', clientId);
        authUrl.searchParams.set('redirect_uri', redirectUri);
        authUrl.searchParams.set('response_type', 'code');
        authUrl.searchParams.set('scope', scope);
        authUrl.searchParams.set('token_access_type', 'offline'); // Request offline access for refresh token
        authUrl.searchParams.set('state', currentUser.id); // Pass user ID in state

        // Redirect to Dropbox OAuth
        window.location.href = authUrl.toString();
        return;
      }

      toast({
        title: 'Not implemented',
        description: `${integrationName} integration is not yet implemented`,
      });
    } catch (error) {
      console.error('Error connecting integration:', error);
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to connect integration',
        variant: 'destructive',
      });
    } finally {
      setIsConnecting(null);
    }
  };

  const handleDisconnect = async (integrationId: string) => {
    try {
      // Delete the integration record completely from the database
      const { error } = await supabase
        .from('user_integrations')
        .delete()
        .eq('id', integrationId);

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'Integration disconnected and removed successfully',
      });

      await fetchIntegrations();
    } catch (error) {
      console.error('Error disconnecting integration:', error);
      toast({
        title: 'Error',
        description: 'Failed to disconnect integration',
        variant: 'destructive',
      });
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'connected':
        return <Badge className="bg-green-500"><CheckCircle2 className="h-3 w-3 mr-1" />Connected</Badge>;
      case 'pending':
        return <Badge variant="secondary"><Loader2 className="h-3 w-3 mr-1 animate-spin" />Pending</Badge>;
      case 'disconnected':
        return <Badge variant="outline"><XCircle className="h-3 w-3 mr-1" />Disconnected</Badge>;
      case 'error':
        return <Badge variant="destructive"><AlertCircle className="h-3 w-3 mr-1" />Error</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  if (isLoading) {
    return (
      <Card className="bg-white/95 backdrop-blur-sm shadow-brand-lg border-[#1A2D63]/10">
        <CardHeader>
          <CardTitle className="text-[#1A2D63]">Integrations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin text-[#1A2D63]/50" />
          </div>
        </CardContent>
      </Card>
    );
  }

  // Group integrations by integration type
  const integrationsByType = integrations.reduce((acc, integration) => {
    const typeId = integration.integration_type_id;
    if (!acc[typeId]) {
      acc[typeId] = [];
    }
    acc[typeId].push(integration);
    return acc;
  }, {} as Record<string, UserIntegration[]>);

  // Get integration type info for each group
  const integrationGroups = Object.entries(integrationsByType).map(([typeId, groupIntegrations]) => {
    const integrationType = groupIntegrations[0].integration_type;
    return {
      typeId,
      integrationType,
      accounts: groupIntegrations,
    };
  });

  // Get connected integration type IDs (for showing available integrations)
  const connectedTypeIds = new Set(
    integrations
      .filter(i => i.status === 'connected')
      .map(i => i.integration_type_id)
  );

  return (
    <div className="space-y-4">
      {/* User Integrations - Grouped by Type */}
      {integrationGroups.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-[#1A2D63]">Your Integrations</h3>
          {integrationGroups.map((group) => (
            <Card key={group.typeId} className="bg-white/95 backdrop-blur-sm shadow-brand-lg border-[#1A2D63]/10">
              <CardContent className="pt-6">
                {/* Integration Type Header */}
                <div className="flex items-center justify-between mb-4 pb-4 border-b border-[#1A2D63]/10">
                  <div className="flex items-center gap-4">
                    <div className="rounded-lg bg-[#1A2D63]/10 p-3 flex items-center justify-center w-12 h-12">
                      {(group.integrationType.icon_url || INTEGRATION_ICONS[group.integrationType.name]) ? (
                        <Image
                          src={group.integrationType.icon_url || INTEGRATION_ICONS[group.integrationType.name] || ''}
                          alt={group.integrationType.display_name}
                          width={24}
                          height={24}
                          className="object-contain"
                          unoptimized
                          onError={(e) => {
                            console.error('Failed to load icon:', group.integrationType.icon_url || INTEGRATION_ICONS[group.integrationType.name]);
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                            const parent = target.parentElement;
                            if (parent && !parent.querySelector('.fallback-icon')) {
                              const fallback = document.createElement('div');
                              fallback.className = 'fallback-icon';
                              fallback.innerHTML = '<svg class="h-6 w-6 text-[#1A2D63]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>';
                              parent.appendChild(fallback);
                            }
                          }}
                        />
                      ) : (
                        <Plug className="h-6 w-6 text-[#1A2D63]" />
                      )}
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#1A2D63]">{group.integrationType.display_name}</h4>
                      {group.integrationType.description && (
                        <p className="text-sm text-[#1A2D63]/60">
                          {group.integrationType.description}
                        </p>
                      )}
                    </div>
                  </div>
                  {showConnectButton && (
                    <Button
                      onClick={() => handleConnect(group.typeId, group.integrationType.name)}
                      disabled={isConnecting === group.typeId}
                      size="sm"
                      variant="outline"
                      className="border-[#1A2D63]/20 text-[#1A2D63] hover:bg-[#1A2D63]/5 transition-premium"
                    >
                      {isConnecting === group.typeId ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Connecting...
                        </>
                      ) : (
                        <>
                          <Plus className="h-4 w-4 mr-2" />
                          Add Account
                        </>
                      )}
                    </Button>
                  )}
                </div>

                {/* Accounts for this Integration Type */}
                <div className="space-y-3">
                  {group.accounts.map((integration, accountIndex) => {
                    // Default display name: {type}-integration-{n} (e.g., google-integration-1)
                    const typeName = group.integrationType.name;
                    const displayName = `${typeName}-integration-${accountIndex + 1}`;
                    
                    return (
                    <div key={integration.id} className="flex items-center justify-between p-3 bg-[#1A2D63]/5 rounded-lg border border-[#1A2D63]/10">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-[#1A2D63]">
                            {displayName}
                          </span>
                          {getStatusBadge(integration.status)}
                        </div>
                        {integration.connected_at && (
                          <p className="text-xs text-[#1A2D63]/50">
                            Connected: {new Date(integration.connected_at).toLocaleDateString()}
                          </p>
                        )}
                        {integration.error_message && (
                          <p className="text-xs text-destructive mt-1">
                            {integration.error_message}
                          </p>
                        )}
                      </div>
                      <div className="flex gap-2">
                        {integration.status === 'connected' && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDisconnect(integration.id)}
                            className="border-[#1A2D63]/20 text-[#1A2D63] hover:bg-[#1A2D63]/5 transition-premium"
                          >
                            Disconnect
                          </Button>
                        )}
                        {(integration.status === 'error' || integration.status === 'pending') && (
                          <>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDisconnect(integration.id)}
                              className="border-[#1A2D63]/20 text-[#1A2D63] hover:bg-[#1A2D63]/5 transition-premium"
                            >
                              Remove
                            </Button>
                            <Button
                              size="sm"
                              onClick={() => {
                                const integrationName = integration.integration_type.name;
                                handleConnect(integration.integration_type_id, integrationName);
                              }}
                              className="bg-[#1A2D63] hover:bg-[#1A2D63]/90 text-white transition-premium"
                            >
                              Retry
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  );
                  })}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Available Integrations - Only show types with no connected accounts */}
      {showConnectButton && availableTypes.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-[#1A2D63]">
            {integrations.length > 0 ? 'Available Integrations' : 'Connect Integrations'}
          </h3>
          {availableTypes
            .filter(type => !connectedTypeIds.has(type.id))
            .map((type) => (
              <Card key={type.id} className="bg-white/95 backdrop-blur-sm shadow-brand-lg border-[#1A2D63]/10 hover:border-[#1A2D63]/20 transition-all duration-300">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="rounded-lg bg-[#1A2D63]/10 p-3 flex items-center justify-center w-12 h-12">
                        {(type.icon_url || INTEGRATION_ICONS[type.name]) ? (
                          <Image
                            src={type.icon_url || INTEGRATION_ICONS[type.name] || ''}
                            alt={type.display_name}
                            width={24}
                            height={24}
                            className="object-contain"
                            unoptimized
                            onError={(e) => {
                              console.error('Failed to load icon:', type.icon_url || INTEGRATION_ICONS[type.name], 'for integration:', type.display_name);
                              const target = e.target as HTMLImageElement;
                              target.style.display = 'none';
                              const parent = target.parentElement;
                              if (parent && !parent.querySelector('.fallback-icon')) {
                                const fallback = document.createElement('div');
                                fallback.className = 'fallback-icon';
                                fallback.innerHTML = '<svg class="h-6 w-6 text-[#1A2D63]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>';
                                parent.appendChild(fallback);
                              }
                            }}
                            onLoad={() => {
                              console.log('Successfully loaded icon:', type.icon_url || INTEGRATION_ICONS[type.name]);
                            }}
                          />
                        ) : (
                          <Plug className="h-6 w-6 text-[#1A2D63]" />
                        )}
                      </div>
                      <div>
                        <h4 className="font-semibold text-[#1A2D63]">{type.display_name}</h4>
                        {type.description && (
                          <p className="text-sm text-[#1A2D63]/60">
                            {type.description}
                          </p>
                        )}
                      </div>
                    </div>
                    <Button
                      onClick={() => handleConnect(type.id, type.name)}
                      disabled={isConnecting === type.id}
                      className="bg-[#1A2D63] hover:bg-[#1A2D63]/90 text-white transition-premium"
                    >
                      {isConnecting === type.id ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Connecting...
                        </>
                      ) : (
                        <>
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Connect
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
        </div>
      )}

      {integrations.length === 0 && availableTypes.length === 0 && (
        <Card className="bg-white/95 backdrop-blur-sm shadow-brand-lg border-[#1A2D63]/10">
          <CardContent className="pt-6">
            <div className="text-center py-8">
              <Plug className="h-12 w-12 text-[#1A2D63]/30 mx-auto mb-4" />
              <p className="text-[#1A2D63]/60">No integrations available</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

// Wrapper component with Suspense for useSearchParams
export function IntegrationsListWithSuspense(props: IntegrationsListProps) {
  return (
    <Suspense fallback={
      <Card className="bg-white/95 backdrop-blur-sm shadow-brand-lg border-[#1A2D63]/10">
        <CardContent className="pt-6">
          <div className="text-center py-8">
            <Loader2 className="h-8 w-8 text-[#1A2D63]/30 mx-auto mb-4 animate-spin" />
            <p className="text-[#1A2D63]/60">Loading integrations...</p>
          </div>
        </CardContent>
      </Card>
    }>
      <IntegrationsList {...props} />
    </Suspense>
  );
}
