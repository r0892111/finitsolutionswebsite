# Customer Portal Setup Guide

This guide explains how to set up and use the customer portal authentication system.

## Overview

The customer portal uses a secure code-based authentication system with:
- SHA-256 hashing for access codes
- Timing-safe comparison to prevent timing attacks
- Rate limiting (5 attempts per 15 minutes per IP)
- Session-based authentication

## Setup Instructions

### 1. Generate Access Code Hash

Use the provided script to generate a secure hash for your access code:

```bash
node scripts/generate-access-code.js YourSecureCode123!
```

This will output a SHA-256 hash that you'll use in your environment variables.

### 2. Configure Environment Variables

Create or update your `.env.local` file with the access code hash:

```env
CUSTOMER_PORTAL_CODES=<generated-hash>
```

**For multiple access codes**, separate them with commas:

```env
CUSTOMER_PORTAL_CODES=<hash1>,<hash2>,<hash3>
```

### 3. Important Security Notes

- **Never commit access codes or hashes to version control**
- Use strong, random access codes (at least 12 characters)
- Keep your `.env.local` file secure
- Rotate access codes periodically
- The original access codes are never stored - only their hashes

## Usage

### For Users

1. Navigate to `/portal/login` or click "Portal Login" in the navbar
2. Enter your access code
3. You'll be redirected to the portal dashboard upon successful authentication

### For Developers

#### Authentication Context

The portal uses React Context for authentication state management:

```typescript
import { useAuth } from '@/contexts/auth-context';

const { isAuthenticated, login, logout } = useAuth();
```

#### Protected Routes

The portal page automatically redirects unauthenticated users to the login page.

## API Endpoints

### POST `/api/auth/login`

Authenticates a user with an access code.

**Request:**
```json
{
  "code": "YourAccessCode"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Authentication successful"
}
```

**Error Responses:**
- `400`: Missing or invalid code format
- `401`: Invalid access code
- `429`: Too many login attempts (rate limited)
- `500`: Server error

## Static Export Limitation

⚠️ **Important**: This site uses `output: 'export'` for static generation, which means API routes (`/api/auth/login`) will **not work** in production static builds.

### Solutions:

1. **Use Supabase Edge Functions** (Recommended)
   - Move the authentication logic to a Supabase Edge Function
   - Update the login function in `contexts/auth-context.tsx` to call the Supabase function

2. **Use a separate backend service**
   - Deploy the authentication API to a separate service (Vercel Serverless, AWS Lambda, etc.)
   - Update the API endpoint URL in the auth context

3. **Switch to dynamic rendering**
   - Remove `output: 'export'` from `next.config.js`
   - Deploy to a platform that supports Next.js API routes (Vercel, Netlify, etc.)

## File Structure

```
app/
  (main)/
    portal/
      login/
        page.tsx          # Login page
      page.tsx             # Portal dashboard (protected)
      layout.tsx           # Portal layout
  api/
    auth/
      login/
        route.ts          # Authentication API route
contexts/
  auth-context.tsx        # Authentication context provider
lib/
  auth.ts                 # Authentication utilities (hashing, verification)
scripts/
  generate-access-code.js # Script to generate access code hashes
```

## Customization

### Adding Portal Features

The portal dashboard (`app/(main)/portal/page.tsx`) currently includes placeholder cards for:
- Documents
- Messages
- Settings

You can extend these with actual functionality as needed.

### Styling

The portal uses the existing Finit Solutions design system:
- Brand colors (primary navy blue)
- Finit typography classes (`.finit-h1`, `.finit-h2`, `.finit-body`)
- shadcn/ui components
- Aurora background (`bg-finit-aurora`)

## Troubleshooting

### Login not working

1. Check that `CUSTOMER_PORTAL_CODES` is set in `.env.local`
2. Verify the hash matches your access code (use the generate script)
3. Check browser console for errors
4. Ensure API route is accessible (won't work in static export)

### Rate limiting

If you're rate limited:
- Wait 15 minutes for the limit to reset
- Or restart the development server (clears in-memory rate limit)

### Session not persisting

- Sessions are stored in `sessionStorage` (cleared when browser tab closes)
- For longer sessions, consider implementing token-based auth with refresh tokens
