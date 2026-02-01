# Verify Supabase Edge Function Secrets

## Current Secrets Status

Based on your Supabase dashboard, you have these secrets set:
- ✅ `SUPABASE_URL` (automatically provided by Supabase)
- ✅ `SUPABASE_ANON_KEY` (automatically provided by Supabase)
- ✅ `SUPABASE_SERVICE_ROLE_KEY` (set as secret)
- ✅ `SUPABASE_DB_URL` (set as secret)

## Important Notes

### Automatic Environment Variables

Supabase Edge Functions **automatically provide**:
- `SUPABASE_URL` - Your project URL (e.g., `https://dcmhmqhfuhynlysocvts.supabase.co`)
- `SUPABASE_ANON_KEY` - Your anon/public key

These don't need to be set as secrets - they're provided automatically.

### Required Secret

You **must set** as a secret:
- `SUPABASE_SERVICE_ROLE_KEY` - Your service role key (for admin operations)

## Verify Secrets Are Set Correctly

### Check Secrets List

```bash
supabase secrets list
```

Should show:
```
SUPABASE_SERVICE_ROLE_KEY
SUPABASE_DB_URL
```

### Set Service Role Key (if missing)

```bash
supabase secrets set SUPABASE_SERVICE_ROLE_KEY=your-actual-service-role-key
```

**Important**: Use the actual service role key value, not a hash!

To get your service role key:
1. Go to: https://supabase.com/dashboard/project/dcmhmqhfuhynlysocvts/settings/api
2. Copy the **service_role** key (under "Project API keys")
3. Set it as a secret

## Test the Function

After verifying secrets, test:

```bash
# Get your access token from browser console after logging in
# Then test:
curl -X GET \
  'https://dcmhmqhfuhynlysocvts.supabase.co/functions/v1/list-users' \
  -H 'Authorization: Bearer YOUR_ACCESS_TOKEN' \
  -H 'apikey: YOUR_ANON_KEY'
```

## Common Issues

### "Missing service role key"

**Cause**: `SUPABASE_SERVICE_ROLE_KEY` not set or wrong value

**Solution**:
1. Get service role key from Supabase dashboard
2. Set it: `supabase secrets set SUPABASE_SERVICE_ROLE_KEY=your-key`
3. Redeploy: `supabase functions deploy list-users`

### "Invalid JWT"

**Cause**: Token expired or wrong Supabase URL

**Solution**:
- Log out and log back in to get fresh token
- Edge Function now uses automatic `SUPABASE_URL`
- Check function logs: `supabase functions logs list-users`

### Secrets Show as Hashes

**Note**: Supabase dashboard shows secrets as hashes for security. This is normal - the actual values are stored securely and used by the Edge Function.

## Next Steps

1. ✅ Verify `SUPABASE_SERVICE_ROLE_KEY` is set correctly
2. ✅ Redeploy the function: `supabase functions deploy list-users`
3. ✅ Log out and log back in
4. ✅ Test the admin dashboard
