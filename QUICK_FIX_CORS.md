# Quick Fix: CORS Error on Admin Dashboard

## The Problem

You're seeing this error:
```
Access to fetch at 'https://dcmhmqhfuhynlysocvts.supabase.co/functions/v1/list-users' 
from origin 'http://localhost:3000' has been blocked by CORS policy: 
Response to preflight request doesn't pass access control check: 
It does not have HTTP ok status.
```

## Root Cause

The Edge Function `list-users` is either:
1. **Not deployed** (most likely)
2. **Not handling CORS preflight correctly** (fixed in code, but needs redeployment)

## Solution: Deploy the Edge Function

### Option 1: Using Supabase CLI (Recommended)

1. **Install Supabase CLI** (if not installed):
```bash
npm install -g supabase
```

2. **Login to Supabase**:
```bash
supabase login
```

3. **Link your project**:
```bash
supabase link --project-ref dcmhmqhfuhynlysocvts
```

4. **Set Service Role Key**:
```bash
supabase secrets set SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```
Get your service role key from: https://supabase.com/dashboard/project/dcmhmqhfuhynlysocvts/settings/api

5. **Deploy the Function**:
```bash
supabase functions deploy list-users
```

6. **Verify**:
```bash
supabase functions list
```

### Option 2: Using Supabase Dashboard

1. Go to: https://supabase.com/dashboard/project/dcmhmqhfuhynlysocvts/functions
2. Click **"Create a new function"**
3. Name it: `list-users`
4. Copy the code from `supabase/functions/list-users/index.ts`
5. In **Settings** → **Secrets**, add:
   - Name: `SUPABASE_SERVICE_ROLE_KEY`
   - Value: Your service role key (from Settings → API)
6. Click **Deploy**

## After Deployment

1. Refresh your admin dashboard
2. The CORS error should be gone
3. Users should now be listed

## Verify It's Working

Check the browser console:
- Should see successful `list-users` request
- Response should contain `{ users: [...] }`
- No CORS errors

## Still Getting CORS Error?

1. **Check function is deployed**:
   - Go to: https://supabase.com/dashboard/project/dcmhmqhfuhynlysocvts/functions
   - Verify `list-users` appears in the list

2. **Check function logs**:
   ```bash
   supabase functions logs list-users
   ```

3. **Test the function directly**:
   ```bash
   curl -X OPTIONS \
     'https://dcmhmqhfuhynlysocvts.supabase.co/functions/v1/list-users' \
     -H 'Access-Control-Request-Method: GET' \
     -H 'Access-Control-Request-Headers: authorization,apikey'
   ```
   
   Should return status 204 with CORS headers.
