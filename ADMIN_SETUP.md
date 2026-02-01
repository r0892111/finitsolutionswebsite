# Admin Dashboard Setup Guide

This guide explains how to set up and use the admin dashboard for @finitsolutions accounts.

## Overview

The admin dashboard allows users with `@finitsolutions.be` or `@finitsolutions.com` email addresses to:
- View all registered users
- See user statistics
- Access individual user dashboards (custom dashboards coming soon)
- Search and filter users

## Admin Access

### Who Can Access?

Users with email addresses ending in:
- `@finitsolutions.be`
- `@finitsolutions.com`

Are automatically granted admin access when they log in.

### Automatic Redirect

When an admin user logs in, they are automatically redirected to `/portal/admin` instead of the regular portal dashboard.

## Setup Requirements

### 1. Deploy Supabase Edge Function

The admin dashboard requires a Supabase Edge Function to list users securely.

#### Deploy the Function

1. Install Supabase CLI (if not already installed):
   ```bash
   npm install -g supabase
   ```

2. Login to Supabase:
   ```bash
   supabase login
   ```

3. Link your project:
   ```bash
   supabase link --project-ref dcmhmqhfuhynlysocvts
   ```

4. Deploy the function:
   ```bash
   supabase functions deploy list-users
   ```

#### Configure Environment Variables

The Edge Function needs access to your Supabase service role key:

1. Go to your Supabase dashboard: https://supabase.com/dashboard/project/dcmhmqhfuhynlysocvts/settings/api
2. Copy your **service_role** key (keep this secret!)
3. Set it as a secret for the Edge Function:
   ```bash
   supabase secrets set SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
   ```

The function will automatically use:
- `SUPABASE_URL` - Your project URL (set automatically)
- `SUPABASE_SERVICE_ROLE_KEY` - Your service role key (set via secrets)

### 2. Verify Function Deployment

After deploying, verify the function is accessible:
- Go to: https://supabase.com/dashboard/project/dcmhmqhfuhynlysocvts/functions
- You should see `list-users` function listed

## Usage

### Accessing Admin Dashboard

1. Log in with an `@finitsolutions` email address
2. You'll be automatically redirected to `/portal/admin`
3. Or navigate directly to `/portal/admin` after logging in

### Features

#### User Overview
- **Total Users**: Count of all registered users
- **Active Users**: Users who have logged in at least once
- **Admin Users**: Count of admin accounts

#### User List
- View all registered users
- See user email, creation date, and last login
- Search users by email or user ID
- Click on any user to view their detail page

#### User Detail Page
- View complete user information
- See user creation and login timestamps
- Access custom dashboard (coming soon)

## Security

### Admin Verification

The system checks admin status in two places:

1. **Client-side**: Checks email domain on login
2. **Server-side**: Edge Function verifies admin status before returning user list

### Edge Function Security

The `list-users` Edge Function:
- Requires authentication (valid session token)
- Verifies the requesting user is an admin
- Uses service role key for secure user listing
- Returns only non-sensitive user data

## Custom Dashboards

Each user account will eventually have a custom dashboard accessible from:
- `/portal/admin/users/[userId]`

The custom dashboard section is currently a placeholder and will be implemented based on your requirements.

## Troubleshooting

### "Failed to fetch users" Error

1. **Check Edge Function Deployment**:
   - Verify the function is deployed: `supabase functions list`
   - Check function logs: `supabase functions logs list-users`

2. **Verify Service Role Key**:
   - Ensure `SUPABASE_SERVICE_ROLE_KEY` is set as a secret
   - Check it matches your project's service role key

3. **Check Authentication**:
   - Ensure you're logged in with an `@finitsolutions` email
   - Verify your session is valid

### Admin Not Redirecting

- Check that your email ends with `@finitsolutions.be` or `@finitsolutions.com`
- Clear browser cache and cookies
- Verify the `isAdmin` check in `lib/admin.ts`

### Edge Function Not Found

- Ensure the function is deployed: `supabase functions deploy list-users`
- Check the function name matches exactly: `list-users`
- Verify your project is linked correctly

## File Structure

```
app/(main)/portal/
  admin/
    page.tsx                    # Admin dashboard (user overview)
    users/
      [userId]/
        page.tsx                # User detail page with custom dashboard placeholder
lib/
  admin.ts                      # Admin utility functions
supabase/functions/
  list-users/
    index.ts                    # Edge Function to list users securely
```

## Next Steps

1. Deploy the Edge Function (see above)
2. Create an admin user account in Supabase
3. Log in and test the admin dashboard
4. Customize user dashboards as needed

## Additional Resources

- [Supabase Edge Functions Docs](https://supabase.com/docs/guides/functions)
- [Supabase Auth Admin API](https://supabase.com/docs/reference/javascript/auth-admin-listusers)
