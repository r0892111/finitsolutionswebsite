-- Standalone script to populate user_email in user_integrations table
-- Run this in Supabase SQL Editor to backfill all existing records

-- Step 1: Ensure the column exists (idempotent)
ALTER TABLE public.user_integrations
ADD COLUMN IF NOT EXISTS user_email TEXT NULL;

-- Step 2: Create index if it doesn't exist (idempotent, matches existing index style)
CREATE INDEX IF NOT EXISTS idx_user_integrations_user_email 
ON public.user_integrations USING btree (user_email) 
TABLESPACE pg_default;

-- Step 3: Populate user_email for all existing records from auth.users
UPDATE public.user_integrations ui
SET user_email = au.email
FROM auth.users au
WHERE ui.user_id = au.id
  AND au.email IS NOT NULL
  AND (ui.user_email IS NULL OR ui.user_email != au.email);

-- Step 4: Verify the results
SELECT 
  COUNT(*) as total_records,
  COUNT(user_email) as records_with_email,
  COUNT(*) - COUNT(user_email) as records_without_email,
  COUNT(DISTINCT user_id) as unique_users
FROM public.user_integrations;

-- Step 5: Show sample of populated records
SELECT 
  ui.id,
  ui.user_id,
  ui.user_email,
  au.email as auth_email,
  it.display_name as integration_name
FROM public.user_integrations ui
LEFT JOIN auth.users au ON ui.user_id = au.id
LEFT JOIN public.integration_types it ON ui.integration_type_id = it.id
ORDER BY ui.created_at DESC
LIMIT 10;
