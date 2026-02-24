-- Backfill user_email for all existing user_integrations records
-- This ensures all records have the user's email populated from auth.users
-- Note: This migration assumes migration 017 has been run, but includes safety checks

-- Ensure the column exists (idempotent - safe to run even if migration 017 already added it)
ALTER TABLE public.user_integrations
ADD COLUMN IF NOT EXISTS user_email TEXT NULL;

-- Ensure the index exists (idempotent)
CREATE INDEX IF NOT EXISTS idx_user_integrations_user_email 
ON public.user_integrations USING btree (user_email) 
TABLESPACE pg_default;

-- Backfill existing records with user emails from auth.users
UPDATE public.user_integrations ui
SET user_email = au.email
FROM auth.users au
WHERE ui.user_id = au.id
  AND au.email IS NOT NULL
  AND (ui.user_email IS NULL OR ui.user_email != au.email);

-- Verify the update
SELECT 
  COUNT(*) as total_records,
  COUNT(user_email) as records_with_email,
  COUNT(*) - COUNT(user_email) as records_without_email
FROM public.user_integrations;
