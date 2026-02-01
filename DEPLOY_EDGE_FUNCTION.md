# Deploy Supabase Edge Function - Quick Guide

## Prerequisites

1. Install Supabase CLI:
```bash
npm install -g supabase
```

2. Login to Supabase:
```bash
supabase login
```

3. Link your project:
```bash
supabase link --project-ref dcmhmqhfuhynlysocvts
```

## Deploy the Function

1. **Set Service Role Key** (REQUIRED):
```bash
supabase secrets set SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
```

To get your service role key:
- Go to: https://supabase.com/dashboard/project/dcmhmqhfuhynlysocvts/settings/api
- Copy the **service_role** key (keep it secret!)

2. **Deploy the Function**:
```bash
supabase functions deploy list-users
```

3. **Verify Deployment**:
```bash
supabase functions list
```

You should see `list-users` in the list.

## Test the Function

After deployment, test it:

```bash
# Get your access token from browser console after logging in
# Then test:
curl -X GET \
  'https://dcmhmqhfuhynlysocvts.supabase.co/functions/v1/list-users' \
  -H 'Authorization: Bearer YOUR_ACCESS_TOKEN' \
  -H 'apikey: YOUR_ANON_KEY'
```

## Troubleshooting

### "Function not found"
- Make sure you're in the project root directory
- Verify the function exists at: `supabase/functions/list-users/index.ts`

### "Service role key not set"
- Run: `supabase secrets set SUPABASE_SERVICE_ROLE_KEY=your-key`
- Verify: `supabase secrets list`

### "Unauthorized" error
- Make sure you're logged in with an `@finitsolutions` email
- Check that your access token is valid

## Alternative: Deploy via Supabase Dashboard

1. Go to: https://supabase.com/dashboard/project/dcmhmqhfuhynlysocvts/functions
2. Click "Create a new function"
3. Name it: `list-users`
4. Copy the code from `supabase/functions/list-users/index.ts`
5. Set environment variable: `SUPABASE_SERVICE_ROLE_KEY`
6. Deploy
