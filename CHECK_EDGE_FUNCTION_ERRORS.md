# Troubleshooting 500 Error on manage-table-assignments

## The Problem

Getting `500 Internal Server Error` when calling the Edge Function. This means:
- ✅ Function is deployed (no CORS error)
- ❌ Function is crashing at runtime

## Most Likely Causes

### 1. Database Tables Don't Exist (Most Common)

The Edge Function is trying to query `available_tables` and `user_table_assignments` tables, but they don't exist yet.

**Solution**: Run the database migration:

1. Go to Supabase Dashboard → SQL Editor
2. Copy and paste the SQL from `supabase/migrations/001_create_user_table_assignments.sql`
3. Click "Run"
4. Verify tables were created:
   - Go to Table Editor
   - You should see `available_tables` and `user_table_assignments`

### 2. Service Role Key Not Set

**Check**: 
```bash
supabase secrets list
```

Should show `SUPABASE_SERVICE_ROLE_KEY`

**Fix**:
```bash
supabase secrets set SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

### 3. Check Function Logs

View the actual error:

```bash
supabase functions logs manage-table-assignments
```

Or in Supabase Dashboard:
- Go to Functions → manage-table-assignments → Logs
- Look for error messages

## Quick Fix Steps

1. **Run the migration** (most likely fix):
   - SQL Editor → Run migration SQL
   
2. **Verify secrets**:
   ```bash
   supabase secrets list
   ```

3. **Check logs**:
   ```bash
   supabase functions logs manage-table-assignments
   ```

4. **Redeploy if needed**:
   ```bash
   supabase functions deploy manage-table-assignments
   ```

## Expected Error Messages

If tables don't exist, you'll see errors like:
- `relation "available_tables" does not exist`
- `relation "user_table_assignments" does not exist`

If service role key is missing:
- `Server configuration error: Missing service role key`
