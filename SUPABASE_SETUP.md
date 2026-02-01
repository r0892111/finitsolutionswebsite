# Supabase Authentication Setup Guide

This guide explains how to set up Supabase authentication for the customer portal.

## Prerequisites

1. A Supabase account (sign up at https://supabase.com)
2. A Supabase project created

## Setup Steps

### 1. Create a Supabase Project

1. Go to https://supabase.com and sign in
2. Click "New Project"
3. Fill in your project details:
   - Name: `finit-solutions-portal` (or your preferred name)
   - Database Password: Choose a strong password
   - Region: Choose the closest region to your users
4. Wait for the project to be created (takes ~2 minutes)

### 2. Get Your Supabase Credentials

1. In your Supabase project dashboard, go to **Settings** → **API**
2. Copy the following values:
   - **Project URL** (under "Project URL")
   - **anon/public key** (under "Project API keys")

### 3. Configure Environment Variables

Create or update your `.env.local` file with your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

**Important**: 
- Never commit `.env.local` to version control
- These are public keys and safe to expose in client-side code
- The `NEXT_PUBLIC_` prefix makes them available in the browser

### 4. Configure Supabase Authentication

#### Enable Email Authentication

1. In your Supabase dashboard, go to **Authentication** → **Providers**
2. Ensure **Email** provider is enabled
3. Configure email settings:
   - **Enable email confirmations**: Recommended for production
   - **Secure email change**: Enable this
   - **Double confirm email changes**: Enable this

#### Configure Email Templates (Optional)

1. Go to **Authentication** → **Email Templates**
2. Customize the following templates:
   - **Confirm signup**: Email sent when users sign up
   - **Reset password**: Email sent for password recovery
   - **Magic Link**: If using magic link authentication

#### Set Up Redirect URLs

1. Go to **Authentication** → **URL Configuration**
2. Add the following **Redirect URLs**:
   ```
   http://localhost:3000/portal/auth/callback
   https://yourdomain.com/portal/auth/callback
   http://localhost:3000/portal/reset-password
   https://yourdomain.com/portal/reset-password
   ```

### 5. Configure Password Requirements (Optional)

1. Go to **Authentication** → **Policies**
2. You can set password requirements:
   - Minimum length (default: 6, recommended: 8)
   - Require uppercase, lowercase, numbers, special characters

### 6. Test the Setup

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Navigate to `http://localhost:3000/portal/login`

3. Try creating a test account:
   - Click "Sign Up" (if you add that feature)
   - Or create a user manually in Supabase dashboard:
     - Go to **Authentication** → **Users**
     - Click "Add user" → "Create new user"
     - Enter email and password
     - Click "Create user"

4. Test login with the test account

5. Test password recovery:
   - Click "Forgot password?"
   - Enter your email
   - Check your email for the reset link
   - Click the link and reset your password

## User Management

### Creating Users Manually

1. Go to **Authentication** → **Users** in Supabase dashboard
2. Click "Add user" → "Create new user"
3. Enter:
   - Email address
   - Password (or let Supabase generate one)
   - Auto Confirm: Enable this to skip email verification
4. Click "Create user"

### Managing Users

- View all users in **Authentication** → **Users**
- Edit user details, reset passwords, or delete users
- View user activity and sessions

## Security Best Practices

1. **Enable Row Level Security (RLS)**: If you add database tables, enable RLS policies
2. **Use Environment Variables**: Never hardcode credentials
3. **Enable Email Confirmations**: In production, require email verification
4. **Set Strong Password Requirements**: Minimum 8 characters, mixed case, numbers
5. **Monitor Authentication Logs**: Check **Authentication** → **Logs** regularly
6. **Use HTTPS**: Always use HTTPS in production

## Troubleshooting

### "Invalid API key" error

- Check that `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are correct
- Ensure there are no extra spaces or quotes in `.env.local`
- Restart your development server after changing `.env.local`

### Email not sending

- Check **Authentication** → **Settings** → **SMTP Settings**
- Configure custom SMTP or use Supabase's default (limited)
- Check spam folder
- Verify redirect URLs are configured correctly

### Password reset link not working

- Ensure redirect URLs are added in Supabase dashboard
- Check that the link hasn't expired (default: 1 hour)
- Verify the URL format matches exactly

### "User already registered" error

- User exists but may not be confirmed
- Check **Authentication** → **Users** to see user status
- Resend confirmation email or manually confirm user

## Production Deployment

### Environment Variables

Set these in your hosting platform (Vercel, Netlify, etc.):

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

### Redirect URLs

Add your production domain to Supabase redirect URLs:
- `https://yourdomain.com/portal/auth/callback`
- `https://yourdomain.com/portal/reset-password`

### Email Configuration

For production, configure custom SMTP:
1. Go to **Authentication** → **Settings** → **SMTP Settings**
2. Enter your SMTP credentials (SendGrid, Mailgun, etc.)
3. Test email delivery

## Additional Resources

- [Supabase Auth Documentation](https://supabase.com/docs/guides/auth)
- [Next.js + Supabase Guide](https://supabase.com/docs/guides/auth/auth-helpers/nextjs)
- [Supabase Dashboard](https://app.supabase.com)
