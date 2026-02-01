# Troubleshooting Admin Dashboard - List Users Not Working

## Common Issues and Solutions

### Issue: "Failed to fetch users" or Empty User List

#### 1. Edge Function Not Deployed

**Check**: Is the function deployed?

```bash
supabase functions list
```

**Solution**: Deploy the function:
```bash
supabase functions deploy list-users
```

#### 2. Service Role Key Not Set

**Check**: Is the service role key configured?

```bash
supabase secrets list
```

**Solution**: Set the service role key:
1. Go to Supabase dashboard → Settings → API
2. Copy your **service_role** key (keep it secret!)
3. Set it as a secret:
```bash
supabase secrets set SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

#### 3. Function URL Incorrect

**Check**: Open browser console and check the network request:
- URL should be: `https://dcmhmqhfuhynlysocvts.supabase.co/functions/v1/list-users`
- Check for CORS errors
- Check response status code

**Solution**: Verify the URL matches your Supabase project URL

#### 4. Authentication Issues

**Check**: 
- Are you logged in with an `@finitsolutions` email?
- Check browser console for auth errors
- Verify session token is valid

**Solution**: 
- Log out and log back in
- Check that your email ends with `@finitsolutions.be` or `@finitsolutions.com`

#### 5. CORS Errors

**Check**: Browser console shows CORS errors

**Solution**: The Edge Function should handle CORS, but verify:
- Function is deployed correctly
- CORS headers are included in response

## Quick Debug Steps

1. **Open Browser Console** (F12)
2. **Go to Network Tab**
3. **Refresh Admin Dashboard**
4. **Look for `list-users` request**
5. **Check**:
   - Request URL
   - Request headers (Authorization, apikey)
   - Response status
   - Response body

## Expected Request

```
GET https://dcmhmqhfuhynlysocvts.supabase.co/functions/v1/list-users
Headers:
  Authorization: Bearer <your-access-token>
  apikey: <your-anon-key>
  Content-Type: application/json
```

## Expected Response

```json
{
  "users": [
    {
      "id": "...",
      "email": "user@example.com",
      "created_at": "2024-01-01T00:00:00Z",
      "last_sign_in_at": "2024-01-01T00:00:00Z",
      "email_confirmed_at": "2024-01-01T00:00:00Z",
      "is_admin": false
    }
  ]
}
```

## Alternative: Direct Database Query (Temporary)

If Edge Function doesn't work, you can temporarily query users directly (not recommended for production):

```typescript
// This requires RLS policies to be set up
const { data, error } = await supabase
  .from('auth.users') // This won't work - auth.users is not accessible via client
  .select('*');
```

**Note**: This won't work because `auth.users` is not accessible via the client SDK. You MUST use the Edge Function with service role key.

## Verify Function is Working

Test the function directly:

```bash
# Get your access token (from browser console after login)
# Then test:
curl -X GET \
  'https://dcmhmqhfuhynlysocvts.supabase.co/functions/v1/list-users' \
  -H 'Authorization: Bearer YOUR_ACCESS_TOKEN' \
  -H 'apikey: YOUR_ANON_KEY'
```

## Still Not Working?

1. Check Supabase dashboard → Functions → list-users → Logs
2. Check browser console for detailed error messages
3. Verify you're logged in as admin
4. Try deploying the function again
