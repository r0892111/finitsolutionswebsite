# Dropbox OAuth Setup Guide

This guide walks you through setting up a new Dropbox OAuth app and configuring it in your application.

## Step 1: Create a New Dropbox App

1. Go to [Dropbox App Console](https://www.dropbox.com/developers/apps)
2. Click **"Create app"**
3. Choose:
   - **API**: Dropbox API
   - **Type**: Full Dropbox
   - **Name**: Your app name (e.g., "Finit Solutions Customer Portal")
4. Click **"Create app"**

## Step 2: Configure OAuth Settings

1. In your app settings, go to the **"Permissions"** tab
2. Enable the following scopes:
   - `files.content.read` - Read file contents
   - `files.content.write` - Write file contents
   - `files.metadata.read` - Read file metadata
   - `account_info.read` - Read account information

3. Go to the **"Settings"** tab
4. Under **"OAuth 2"**, add your redirect URI:
   ```
   https://finitsolutions.be/portal/integrations/dropbox/callback
   ```
   **Important**: 
   - For local development, also add:
     ```
     http://localhost:3000/portal/integrations/dropbox/callback
     ```
   - The redirect URI must match **exactly** (no trailing slashes, correct protocol)
   - If your production URL is different, update accordingly

## Step 3: Get Your App Credentials

1. In the **"Settings"** tab, find:
   - **App key** (this is your `DROPBOX_CLIENT_ID`)
   - **App secret** (this is your `DROPBOX_CLIENT_SECRET`)

2. Copy both values (you'll need them in the next steps)

## Step 4: Update Environment Variables

### Local Development (.env.local)

Add or update these variables in your `.env.local` file:

```env
# Dropbox OAuth - Frontend (public)
NEXT_PUBLIC_DROPBOX_CLIENT_ID=your_app_key_here

# Optional: Set your site URL if different from window.location.origin
NEXT_PUBLIC_SITE_URL=https://finitsolutions.be
```

### Supabase Edge Function Environment Variables

1. Go to your [Supabase Dashboard](https://supabase.com/dashboard)
2. Navigate to **Project Settings** → **Edge Functions** → **Secrets**
3. Add or update these secrets:
   - `DROPBOX_CLIENT_ID` = Your Dropbox App key
   - `DROPBOX_CLIENT_SECRET` = Your Dropbox App secret

**Note**: These are server-side secrets and should NOT be exposed in your frontend code.

## Step 5: Verify Configuration

### Check Redirect URI

The redirect URI is automatically constructed from:
- `window.location.origin` (in browser)
- Or `NEXT_PUBLIC_SITE_URL` (fallback)

Make sure your Dropbox app's redirect URI matches:
- Production: `https://finitsolutions.be/portal/integrations/dropbox/callback`
- Development: `http://localhost:3000/portal/integrations/dropbox/callback`

### Test the Integration

1. Start your development server: `npm run dev`
2. Go to `/portal` and navigate to Integrations
3. Click **"Connect"** on Dropbox
4. You should be redirected to Dropbox OAuth consent screen
5. After authorizing, you should be redirected back to your app

## Step 6: Update Existing Connections (If Needed)

If you're switching from an old Dropbox app to a new one:

1. **Existing connections will stop working** - Users will need to reconnect
2. You may want to:
   - Notify users to reconnect their Dropbox integration
   - Or disconnect all existing Dropbox integrations:
     ```sql
     UPDATE user_integrations 
     SET status = 'disconnected', disconnected_at = NOW()
     WHERE integration_type_id IN (
       SELECT id FROM integration_types WHERE name = 'dropbox'
     );
     ```

## Troubleshooting

### "redirect_uri_mismatch" Error

- Check that the redirect URI in Dropbox App Console matches exactly
- Ensure there are no trailing slashes
- Verify the protocol (http vs https) matches your environment

### "invalid_client" Error

- Verify `DROPBOX_CLIENT_ID` and `DROPBOX_CLIENT_SECRET` are correct
- Check that the secrets are set in Supabase Edge Functions
- Ensure the app key/secret match the app you're using

### Token Refresh Issues

- Make sure `token_access_type=offline` is included in the OAuth request
- Verify the app has the correct scopes enabled
- Check that refresh tokens are being saved correctly

## Current OAuth Scopes Used

The application requests these scopes:
- `files.content.read` - Read file contents
- `files.content.write` - Write file contents  
- `files.metadata.read` - Read file metadata
- `account_info.read` - Read account information (for email)

## Files That Reference Dropbox OAuth

- `components/integrations-list.tsx` - Frontend OAuth initiation
- `app/(main)/portal/integrations/dropbox/callback/page.tsx` - OAuth callback handler
- `supabase/functions/exchange-dropbox-token/index.ts` - Token exchange Edge Function
- `supabase/functions/refresh-integration-tokens/index.ts` - Token refresh logic
- `lib/oauth.ts` - Redirect URI construction

## Security Notes

- Never commit `.env.local` or Supabase secrets to version control
- Keep your `DROPBOX_CLIENT_SECRET` secure and rotate it if compromised
- Use different apps for development and production if possible
- Regularly review OAuth scopes and remove unused permissions
