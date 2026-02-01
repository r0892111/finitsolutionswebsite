# User Signup and Invite Flow Guide

This guide explains how users can create accounts and how the invite system works.

## User Signup Flow

### Self-Registration

Users can create accounts themselves by:

1. **Navigate to Signup Page**:
   - Go to `/portal/signup`
   - Or click "Create one" link on the login page

2. **Fill in Registration Form**:
   - Email address
   - Password (minimum 8 characters)
   - Confirm password

3. **Email Confirmation**:
   - After signup, user receives a confirmation email
   - Click the link in the email to verify their account
   - They'll be redirected to `/portal/auth/callback` and then to the portal

4. **Login**:
   - Once email is confirmed, user can log in at `/portal/login`

## Invite Flow

### How to Invite Users (Admin)

Admins can invite users through Supabase dashboard:

1. **Go to Supabase Dashboard**:
   - Navigate to: https://supabase.com/dashboard/project/dcmhmqhfuhynlysocvts/auth/users
   - Click "Add user" → "Invite user"

2. **Enter User Email**:
   - Enter the email address of the user you want to invite
   - Click "Send invitation"

3. **User Receives Invite Email**:
   - User receives an email with an invite link
   - Link format: `https://yourdomain.com/portal/auth/callback?token_hash=...&type=invite`

### How Invited Users Create Account

When a user clicks the invite link:

1. **Automatic Redirect**:
   - If not logged in, they're redirected to `/portal/signup?type=invite&token_hash=...`
   - The signup page detects it's an invite and shows appropriate messaging

2. **Create Account**:
   - User enters their email (should match the invited email)
   - Sets a password
   - Confirms password
   - Clicks "Create Account"

3. **Account Activation**:
   - Supabase automatically verifies the invite token
   - User account is created and activated
   - User is redirected to the portal

## Important Notes

### Email Confirmation Settings

In Supabase dashboard (**Authentication** → **Settings**):

- **Enable email confirmations**: 
  - If **enabled**: Users must click email link to activate account
  - If **disabled**: Accounts are activated immediately (useful for testing)

- **For Invites**:
  - Invited users don't need email confirmation if invite token is valid
  - The invite token serves as verification

### Redirect URLs

Make sure these URLs are added in Supabase (**Authentication** → **URL Configuration**):

```
http://localhost:3000/portal/auth/callback
http://localhost:3000/portal/signup
https://yourdomain.com/portal/auth/callback
https://yourdomain.com/portal/signup
```

### Password Requirements

- Minimum 8 characters
- Can be configured in Supabase dashboard (**Authentication** → **Policies**)

## Troubleshooting

### "User already registered" Error

**Cause**: User tries to signup with an email that already exists.

**Solution**: 
- User should use "Forgot password" if they forgot their password
- Or log in with existing credentials

### Invite Link Not Working

**Causes**:
- Invite token expired (default: 24 hours)
- Wrong redirect URL configured
- Email confirmation required but not completed

**Solutions**:
- Resend invite from Supabase dashboard
- Check redirect URLs are configured correctly
- Verify email confirmation settings

### Email Not Received

**Causes**:
- Email in spam folder
- SMTP not configured (using default Supabase email)
- Email address typo

**Solutions**:
- Check spam folder
- Configure custom SMTP in Supabase (**Authentication** → **Settings** → **SMTP Settings**)
- Verify email address in Supabase dashboard

### Account Created But Can't Login

**Causes**:
- Email not confirmed (if email confirmation is enabled)
- Wrong password

**Solutions**:
- Check email for confirmation link
- Use "Forgot password" to reset password
- Verify email confirmation status in Supabase dashboard

## Flow Diagrams

### Self-Registration Flow

```
User → /portal/signup → Fill Form → Submit
  ↓
Email Sent → User Clicks Link → /portal/auth/callback
  ↓
Account Activated → Redirect to /portal
```

### Invite Flow

```
Admin → Supabase Dashboard → Invite User → Email Sent
  ↓
User → Clicks Invite Link → /portal/signup?type=invite&token_hash=...
  ↓
Fill Form → Submit → Account Created → Redirect to /portal
```

## Testing

### Test Self-Registration

1. Go to `/portal/signup`
2. Enter test email and password
3. Submit form
4. Check email for confirmation link
5. Click link to activate
6. Log in at `/portal/login`

### Test Invite Flow

1. In Supabase dashboard, invite a test user
2. Check email for invite link
3. Click invite link
4. Should redirect to signup page with invite message
5. Create account
6. Should automatically log in and redirect to portal

## Security Considerations

1. **Email Verification**: Always enable in production
2. **Password Strength**: Enforce strong passwords (8+ chars, mixed case, numbers)
3. **Invite Expiration**: Invite tokens expire after 24 hours (configurable)
4. **Rate Limiting**: Supabase has built-in rate limiting for signups
5. **HTTPS**: Always use HTTPS in production for secure token transmission
