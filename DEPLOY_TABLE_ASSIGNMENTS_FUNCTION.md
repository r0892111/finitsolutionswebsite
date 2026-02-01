# Deploy manage-table-assignments Edge Function

## Quick Deploy

The CORS error means the `manage-table-assignments` Edge Function isn't deployed yet.

### Deploy via Supabase CLI

```bash
# Make sure you're logged in and linked
supabase login
supabase link --project-ref dcmhmqhfuhynlysocvts

# Deploy the function
supabase functions deploy manage-table-assignments

# Verify it's deployed
supabase functions list
```

### Deploy via Supabase Dashboard

1. Go to: https://supabase.com/dashboard/project/dcmhmqhfuhynlysocvts/functions
2. Click **"Create a new function"**
3. Name it: `manage-table-assignments`
4. Copy the code from `supabase/functions/manage-table-assignments/index.ts`
5. In **Settings** → **Secrets**, make sure `SUPABASE_SERVICE_ROLE_KEY` is set
6. Click **Deploy**

## Verify Deployment

After deploying, test it:

```bash
# Get your access token from browser console after logging in
curl -X GET \
  'https://dcmhmqhfuhynlysocvts.supabase.co/functions/v1/manage-table-assignments' \
  -H 'Authorization: Bearer YOUR_ACCESS_TOKEN' \
  -H 'apikey: YOUR_ANON_KEY'
```

Should return: `{"tables": [...]}`

## After Deployment

1. Refresh your admin dashboard
2. The CORS error should be gone
3. Tables and users should load
4. You can assign tables to users
