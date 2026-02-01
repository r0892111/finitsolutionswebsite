# Using LEGACY_JWT Environment Variable

## Setup

To use a legacy JWT token from your environment file instead of the session token:

### 1. Add to `.env.local`

```env
NEXT_PUBLIC_LEGACY_JWT=your-jwt-token-here
```

**Important**: The `NEXT_PUBLIC_` prefix is required for client-side access in Next.js.

### 2. How It Works

The admin dashboard will:
1. **First check** for `NEXT_PUBLIC_LEGACY_JWT` in environment
2. **If found**: Use that JWT token for Edge Function calls
3. **If not found**: Fall back to using the session token from logged-in user

### 3. Usage

Once set, the admin dashboard will automatically use the `LEGACY_JWT` token when making requests to the `list-users` Edge Function.

## Security Notes

⚠️ **Warning**: 
- `NEXT_PUBLIC_` variables are exposed to the browser
- Anyone can see this token in the browser's developer tools
- Only use this for development/testing
- **Never commit** `.env.local` to version control

## When to Use

- **Development**: Testing with a specific service account token
- **Legacy systems**: Integrating with existing authentication
- **Service accounts**: Using a long-lived token for admin operations

## When NOT to Use

- **Production**: Use session-based authentication instead
- **Public repos**: Never expose JWT tokens
- **User-facing features**: Always use user session tokens

## Alternative: Server-Side Only

If you want to keep the JWT secret (not expose it to browser):

1. Create an API route: `app/api/admin/users/route.ts`
2. Use the JWT there (server-side only)
3. Call that API route from the admin page

This keeps the token secure on the server.

## Current Implementation

The code checks for `NEXT_PUBLIC_LEGACY_JWT` first, then falls back to session token. This allows you to:
- Use legacy JWT when needed
- Still work with normal user sessions
- Switch between them easily
