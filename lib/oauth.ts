/**
 * OAuth utility functions for consistent redirect URI construction
 */

/**
 * Get the base URL for OAuth redirects
 * Uses window.location.origin in browser, falls back to environment variable if available
 */
export function getOAuthRedirectBaseUrl(): string {
  if (typeof window !== 'undefined') {
    return window.location.origin;
  }
  
  // Fallback for server-side (shouldn't happen in client components)
  // In production, this could be set via environment variable if needed
  return process.env.NEXT_PUBLIC_SITE_URL || '';
}

/**
 * Construct Dropbox OAuth redirect URI
 * This must match exactly what's configured in Dropbox App Console
 */
export function getDropboxRedirectUri(): string {
  const baseUrl = getOAuthRedirectBaseUrl();
  // OAuth redirect URIs should NOT have trailing slashes
  return `${baseUrl}/portal/integrations/dropbox/callback`;
}

/**
 * Construct Google OAuth redirect URI
 * This must match exactly what's configured in Google Cloud Console
 */
export function getGoogleRedirectUri(): string {
  const baseUrl = getOAuthRedirectBaseUrl();
  // OAuth redirect URIs should NOT have trailing slashes
  return `${baseUrl}/portal/integrations/google/callback`;
}

/**
 * Construct Shopify OAuth redirect URI
 * This must match exactly what's configured in Shopify App settings
 */
export function getShopifyRedirectUri(): string {
  const baseUrl = getOAuthRedirectBaseUrl();
  // OAuth redirect URIs should NOT have trailing slashes
  return `${baseUrl}/portal/integrations/shopify/callback`;
}
