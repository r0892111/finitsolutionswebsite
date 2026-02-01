# Invite and Login Flow Guide

This guide explains exactly how invited users create accounts and log in.

## Complete Invite Flow

### Step 1: Admin Invites User

1. Admin goes to Supabase dashboard: https://supabase.com/dashboard/project/dcmhmqhfuhynlysocvts/auth/users
2. Clicks "Add user" → "Invite user"
3. Enters user's email address
4. Clicks "Send invitation"

### Step 2: User Receives Invite Email

User receives an email with an invite link that looks like:
```
https://yourdomain.com/portal/auth/callback?token_hash=abc123...&type=invite&code=xyz789...
```

### Step 3: User Clicks Invite Link

When user clicks the invite link:

1. **Redirects to Signup Page**:
   - URL: `/portal/signup?type=invite&token_hash=...&code=...`
   - Page shows: "You've been invited! Create your account to get started."

2. **User Fills Form**:
   - Email (should match invited email)
   - Password (minimum 8 characters)
   - Confirm password

3. **User Submits Form**:
   - System accepts the invite and sets the password
   - User is **automatically logged in**
   - Redirected to `/portal` dashboard

### Step 4: Future Logins

After accepting the invite, the user can log in normally:

1. Go to `/portal/login`
2. Enter email and password (the ones they set during invite acceptance)
3. Click "Login"
4. Redirected to `/portal` dashboard

## Important Points

### First Time (Accepting Invite)

- User **must** click the invite link from email
- User **must** set a password on the signup page
- User is **automatically logged in** after setting password
- No separate login step needed the first time

### Subsequent Logins

- User goes to `/portal/login`
- Uses the email and password they set during invite acceptance
- Normal login flow

### If User Loses Invite Link

If user loses the invite email:

1. **Option 1**: Admin resends invite from Supabase dashboard
2. **Option 2**: User can try to signup at `/portal/signup`
   - If email matches an existing invite, they'll get an error
   - They should contact admin for a new invite
3. **Option 3**: If account already exists, use "Forgot password" at `/portal/login`

## Flow Diagram

```
Admin → Supabase Dashboard → Invite User
  ↓
Email Sent → User Clicks Link
  ↓
/portal/auth/callback?token_hash=...&type=invite
  ↓
Redirects to → /portal/signup?type=invite&token_hash=...
  ↓
User Sets Password → Submit
  ↓
Invite Accepted → Auto Login → /portal
  ↓
Future: /portal/login → Email + Password → /portal
```

## Troubleshooting

### "Invite link expired"

**Cause**: Invite tokens expire after 24 hours (default)

**Solution**: Admin resends invite from Supabase dashboard

### "User already registered"

**Cause**: User tries to signup with email that already has an account

**Solution**: 
- If they forgot password: Use "Forgot password" at `/portal/login`
- If they remember password: Log in at `/portal/login`

### "Can't log in after accepting invite"

**Possible causes**:
1. Session expired (close browser, reopen)
2. Wrong password
3. Email not confirmed (if email confirmation is enabled)

**Solutions**:
1. Try logging in again at `/portal/login`
2. Use "Forgot password" to reset
3. Check email for confirmation link

### "Invite link redirects to wrong page"

**Check**:
1. Redirect URLs configured in Supabase:
   - `http://localhost:3000/portal/auth/callback`
   - `http://localhost:3000/portal/signup`
   - Production URLs too

2. Site URL configured correctly in Supabase settings

## Summary

**First Time (Accepting Invite)**:
1. Click invite link → Signup page
2. Set password → Auto login → Portal

**Every Time After**:
1. Go to `/portal/login`
2. Enter email + password
3. Login → Portal

The key difference: **First time uses invite link, subsequent times use normal login**.
