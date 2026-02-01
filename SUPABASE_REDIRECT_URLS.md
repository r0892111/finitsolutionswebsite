# Supabase Redirect URLs Configuration

This document lists all the URLs that need to be added to your Supabase project's redirect URL configuration.

## Where to Configure

Go to your Supabase dashboard:
**Authentication** → **URL Configuration** → **Redirect URLs**

Add the following URLs:

## Required Redirect URLs

### For Development (localhost)

```
http://localhost:3000/portal/auth/callback
http://localhost:3000/portal/reset-password
```

### For Production

Replace `yourdomain.com` with your actual domain:

```
https://yourdomain.com/portal/auth/callback
https://yourdomain.com/portal/reset-password
```

## What Each URL Is Used For

### `/portal/auth/callback`

**Purpose**: Main authentication callback handler

**Used for**:
- Email confirmation after signup
- Invite acceptance
- Password reset confirmation
- OAuth callbacks (if you add OAuth providers later)

**Example flow**:
- User signs up → Receives confirmation email → Clicks link → Redirects here → Account activated

### `/portal/reset-password`

**Purpose**: Password reset page

**Used for**:
- Password recovery flow
- Users who forgot their password click reset link → Redirects here → Set new password

**Example flow**:
- User clicks "Forgot password" → Receives reset email → Clicks link → Redirects here → Sets new password

## Complete List (Copy-Paste Ready)

### Development

```
http://localhost:3000/portal/auth/callback
http://localhost:3000/portal/reset-password
```

### Production (Example)

```
https://finitsolutions.be/portal/auth/callback
https://finitsolutions.be/portal/reset-password
```

### If Using Multiple Domains

Add all variations:
```
http://localhost:3000/portal/auth/callback
http://localhost:3000/portal/reset-password
https://finitsolutions.be/portal/auth/callback
https://finitsolutions.be/portal/reset-password
https://www.finitsolutions.be/portal/auth/callback
https://www.finitsolutions.be/portal/reset-password
```

## Important Notes

### URL Format

- **Must match exactly** - including protocol (`http://` or `https://`)
- **Include port** for localhost (`:3000`)
- **No trailing slash** - Supabase may add query parameters
- **Case sensitive** - URLs are case-sensitive

### Wildcards

Supabase supports wildcards for subdomains:
```
https://*.yourdomain.com/portal/auth/callback
```

But for security, it's better to list specific domains.

### Site URL

Also set the **Site URL** in Supabase:
- Go to **Authentication** → **URL Configuration** → **Site URL**
- Set to: `http://localhost:3000` (dev) or `https://yourdomain.com` (production)

## Testing

After adding URLs:

1. **Test Signup**:
   - Sign up at `/portal/signup`
   - Check email for confirmation link
   - Click link - should redirect to `/portal/auth/callback` then to portal

2. **Test Password Reset**:
   - Click "Forgot password" at `/portal/login`
   - Check email for reset link
   - Click link - should redirect to `/portal/reset-password`

3. **Test Invite**:
   - Admin invites user from Supabase dashboard
   - User clicks invite link - should redirect to `/portal/auth/callback` then to signup

## Troubleshooting

### "Redirect URL not allowed" Error

**Cause**: URL not in redirect list or typo in URL

**Solution**:
- Check URL matches exactly (including protocol, port, path)
- Verify URL is added in Supabase dashboard
- Check for typos or extra spaces

### "Invalid redirect URL" Error

**Cause**: URL format incorrect or missing from list

**Solution**:
- Ensure URL starts with `http://` or `https://`
- No trailing slashes
- Include full path: `/portal/auth/callback` not just `/portal`

### Email Links Not Working

**Cause**: Redirect URLs not configured or Site URL incorrect

**Solution**:
- Verify all redirect URLs are added
- Check Site URL matches your domain
- Ensure URLs are saved in Supabase dashboard

## Quick Setup Checklist

- [ ] Add `http://localhost:3000/portal/auth/callback` to redirect URLs
- [ ] Add `http://localhost:3000/portal/reset-password` to redirect URLs
- [ ] Add production URLs (when deploying)
- [ ] Set Site URL to match your domain
- [ ] Test signup flow
- [ ] Test password reset flow
- [ ] Test invite flow
