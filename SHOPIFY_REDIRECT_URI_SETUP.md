# Shopify OAuth Redirect URI Setup Guide

This guide explains how to configure the Shopify OAuth redirect URI for your production environment on Netlify.

## Quick Reference

The redirect URI format is:
```
https://your-netlify-domain/portal/integrations/shopify/callback
```

**Important**: 
- ✅ Use `https://` (not `http://`)
- ✅ No trailing slash
- ✅ Exact path: `/portal/integrations/shopify/callback`

## Step-by-Step Setup

### 1. Find Your Netlify Domain

Your Netlify site has a default domain like:
- `https://your-site-name.netlify.app`

Or if you have a custom domain:
- `https://yourdomain.com`
- `https://www.yourdomain.com`

### 2. Construct the Redirect URI

Based on your domain, the redirect URI will be:

**For Netlify default domain:**
```
https://your-site-name.netlify.app/portal/integrations/shopify/callback
```

**For custom domain:**
```
https://yourdomain.com/portal/integrations/shopify/callback
```

### 3. Configure in Shopify Partner Dashboard

1. Go to [Shopify Partner Dashboard](https://partners.shopify.com/)
2. Sign in with your Shopify Partner account
3. Navigate to **Apps** → Select your app (or create a new one)
4. Go to **App setup** → **App URL**
5. Under **Allowed redirection URL(s)**, add your redirect URI:
   - Click **Add URL**
   - Enter: `https://your-site-name.netlify.app/portal/integrations/shopify/callback`
   - Replace `your-site-name` with your actual Netlify site name
6. Click **Save**

### 4. Alternative: Configure via shopify.app.toml

If you're using Shopify CLI, you can also configure redirect URLs in `shopify.app.toml`:

```toml
[auth]
redirect_urls = [
  "http://localhost:3000/portal/integrations/shopify/callback",
  "https://your-site-name.netlify.app/portal/integrations/shopify/callback",
  "https://yourdomain.com/portal/integrations/shopify/callback"
]
```

Then deploy using:
```bash
shopify app deploy
```

### 5. Add Multiple Environments (Recommended)

For both development and production, add:

**Development:**
```
http://localhost:3000/portal/integrations/shopify/callback
```

**Production (Netlify):**
```
https://your-site-name.netlify.app/portal/integrations/shopify/callback
```

**Production (Custom Domain - if applicable):**
```
https://yourdomain.com/portal/integrations/shopify/callback
```

## Current Configuration

Based on your `shopify.app.toml` file, you currently have:
- ✅ `http://localhost:3000/portal/integrations/shopify/callback` (development)
- ✅ `https://finitsolutions.be/portal/integrations/shopify/callback` (production)

**If deploying to Netlify**, you need to add your Netlify domain:
- `https://your-netlify-site.netlify.app/portal/integrations/shopify/callback`

## Common Issues

### Error: "redirect_uri_mismatch" or "Invalid redirect_uri"

**Cause**: The redirect URI in your code doesn't match what's configured in Shopify.

**Solution**:
1. Check your Netlify site URL (go to Netlify dashboard → Site overview)
2. Verify the redirect URI in Shopify Partner Dashboard matches exactly:
   - Protocol: `https://` (not `http://`)
   - Domain: Your exact Netlify domain
   - Path: `/portal/integrations/shopify/callback` (no trailing slash)
3. The code automatically uses `window.location.origin`, so it should match your site's domain

### OAuth Works Locally But Not in Production

**Cause**: Redirect URI is only configured for localhost.

**Solution**:
1. Add your production redirect URI to Shopify Partner Dashboard
2. Ensure `NEXT_PUBLIC_SHOPIFY_CLIENT_ID` is set in Netlify environment variables
3. Redeploy your site after adding the environment variable

### Shopify Store Domain Prompt

When connecting Shopify, users are prompted to enter their store domain. The redirect URI is automatically constructed based on your site's domain, not the Shopify store domain.

**Example flow**:
1. User clicks "Connect" on Shopify integration
2. User enters: `mystore` or `mystore.myshopify.com`
3. Code normalizes to: `mystore.myshopify.com`
4. OAuth URL: `https://mystore.myshopify.com/admin/oauth/authorize?redirect_uri=https://your-site.netlify.app/portal/integrations/shopify/callback`
5. After authorization, Shopify redirects back to your Netlify site

## Testing

After configuration:

1. **Deploy to Netlify** with `NEXT_PUBLIC_SHOPIFY_CLIENT_ID` environment variable set
2. **Visit your site** → Navigate to integrations page
3. **Click "Connect"** on Shopify integration
4. **Enter store domain** when prompted (e.g., `mystore.myshopify.com`)
5. **Verify redirect**: You should be redirected to Shopify OAuth page
6. **Authorize**: After authorizing, you should be redirected back to your site

## Code Reference

The redirect URI is constructed using a utility function in `lib/oauth.ts`:

```typescript
export function getShopifyRedirectUri(): string {
  const baseUrl = getOAuthRedirectBaseUrl();
  return `${baseUrl}/portal/integrations/shopify/callback`;
}
```

This automatically uses `window.location.origin`, so it will work for:
- `http://localhost:3000` (development)
- `https://your-site.netlify.app` (production)
- `https://yourdomain.com` (custom domain)

## Environment Variables Required

Make sure these are set in Netlify:
- `NEXT_PUBLIC_SHOPIFY_CLIENT_ID` - Your Shopify app's Client ID (API key)

## Additional Resources

- [Shopify OAuth Documentation](https://shopify.dev/docs/apps/auth/oauth)
- [Shopify Partner Dashboard](https://partners.shopify.com/)
- [Netlify Deployment Guide](./NETLIFY_DEPLOYMENT.md)
