# Fix: Invalid JWT Error (401)

## Problem

Getting `{code: 401, message: "Invalid JWT"}` when calling the `list-users` Edge Function.

## Root Causes

1. **Expired or stale access token** - The session token has expired
2. **Token not refreshed** - Need to refresh the session before using it
3. **Wrong Supabase URL in Edge Function** - Edge Function can't verify the JWT

## Solutions Applied

### 1. Refresh Session Before Use

Updated `app/(main)/portal/admin/page.tsx` to:
- Refresh the session before making the request
- Fall back to current session if refresh fails
- Better error handling

### 2. Improved Edge Function Error Handling

Updated `supabase/functions/list-users/index.ts` to:
- Better error messages showing the actual JWT error
- Proper Supabase URL handling
- Better logging for debugging

## Steps to Fix

### 1. Redeploy the Edge Function

After making changes, redeploy:

```bash
supabase functions deploy list-users
```

### 2. Verify Service Role Key is Set

```bash
supabase secrets list
```

Should show `SUPABASE_SERVICE_ROLE_KEY` is set.

If not set:
```bash
supabase secrets set SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

### 3. Test the Fix

1. **Log out** and **log back in** to get a fresh session
2. Go to `/portal/admin`
3. Check browser console for any errors
4. Users should now be listed

## Debugging

### Check Browser Console

Look for:
- Session refresh errors
- Token expiration
- Edge Function response

### Check Edge Function Logs

```bash
supabase functions logs list-users
```

Look for:
- JWT verification errors
- Missing configuration errors
- Auth errors

### Verify Token is Valid

In browser console after logging in:
```javascript
const { createClient } = await import('@/lib/supabase/client');
const supabase = createClient();
const { data: { session } } = await supabase.auth.getSession();
console.log('Access token:', session?.access_token);
console.log('Expires at:', new Date(session?.expires_at * 1000));
```

## Common Issues

### "Invalid JWT" After Login

**Cause**: Token expired or session not refreshed

**Solution**: 
- Log out and log back in
- The code now auto-refreshes the session

### "Missing service role key"

**Cause**: Edge Function secret not set

**Solution**:
```bash
supabase secrets set SUPABASE_SERVICE_ROLE_KEY=your-key
```

### "Server configuration error"

**Cause**: Edge Function can't find Supabase URL

**Solution**: 
- Edge Functions automatically provide SUPABASE_URL
- If still failing, check function logs
- Redeploy the function

## Still Not Working?

1. **Check you're logged in** with an `@finitsolutions` email
2. **Check browser console** for detailed errors
3. **Check Edge Function logs**: `supabase functions logs list-users`
4. **Try logging out and back in** to get a fresh token
5. **Verify Edge Function is deployed**: `supabase functions list`
