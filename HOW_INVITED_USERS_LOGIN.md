# How Invited Users Log In - Complete Guide

## Quick Answer

**First Time (Accepting Invite)**:
1. Click invite link from email → Signup page
2. Set password → Automatically logged in → Portal

**Every Time After**:
1. Go to `/portal/login`
2. Enter email + password
3. Click Login → Portal

---

## Detailed Flow

### Step 1: Admin Invites User

Admin goes to Supabase dashboard and invites a user by email.

### Step 2: User Receives Invite Email

User receives an email with a link like:
```
https://yourdomain.com/portal/auth/callback?token_hash=abc123&type=invite&code=xyz789
```

### Step 3: User Clicks Invite Link (First Time Only)

**What happens:**
1. Link redirects to `/portal/auth/callback` with invite parameters
2. Callback detects it's an invite and redirects to `/portal/signup?type=invite&token_hash=...&code=...`
3. Signup page shows: "You've been invited! Create your account to get started."

**User actions:**
1. Enters their email (should match invited email)
2. Sets a password (minimum 8 characters)
3. Confirms password
4. Clicks "Create Account"

**What happens behind the scenes:**
1. System exchanges the invite code for a session
2. User is automatically logged in
3. Password is set
4. User is redirected to `/portal` dashboard

**Result:** User is now logged in and can use the portal!

### Step 4: Future Logins (Every Time After)

Once the user has accepted the invite and set their password, they log in normally:

1. **Go to Login Page**: Navigate to `/portal/login` or click "Portal Login" in navbar
2. **Enter Credentials**:
   - Email: The email they were invited with
   - Password: The password they set during invite acceptance
3. **Click Login**: They're redirected to `/portal` dashboard

---

## Visual Flow Diagram

```
┌─────────────────────────────────────────────────────────┐
│ FIRST TIME (Accepting Invite)                           │
└─────────────────────────────────────────────────────────┘

Admin → Invite Email → User Clicks Link
  ↓
/portal/auth/callback?token_hash=...&type=invite&code=...
  ↓
Redirects to → /portal/signup?type=invite&token_hash=...&code=...
  ↓
User Sets Password → Submit
  ↓
Code Exchanged → Password Set → Auto Login
  ↓
Redirected to → /portal ✅

┌─────────────────────────────────────────────────────────┐
│ EVERY TIME AFTER (Normal Login)                         │
└─────────────────────────────────────────────────────────┘

User → /portal/login
  ↓
Enter Email + Password
  ↓
Click Login
  ↓
Authenticated → /portal ✅
```

---

## Important Points

### ✅ What Works

- **Invite link** → Automatically redirects to signup page
- **Setting password** → User is automatically logged in after setting password
- **Normal login** → Works immediately after accepting invite
- **Password reset** → Works if user forgets password

### ⚠️ Common Issues

**"I clicked invite link but nothing happened"**
- Check if redirect URLs are configured in Supabase
- Verify the link hasn't expired (24 hours default)

**"I set my password but can't log in"**
- Try logging in at `/portal/login` with the email and password you set
- If it doesn't work, use "Forgot password" to reset

**"I lost the invite email"**
- Ask admin to resend invite from Supabase dashboard
- Or try signing up at `/portal/signup` (if email matches invite, you'll get an error - contact admin)

---

## Summary

**The key point**: Invited users don't need to "log in" the first time - they're automatically logged in after setting their password. After that, they use the normal login page just like any other user.

**Login URL**: `/portal/login`  
**Signup URL**: `/portal/signup` (only needed for invite acceptance or self-registration)
