-- Add account_id columns to data tables for faster queries and filtering
-- This denormalizes account_id from user_profiles for performance

-- Add account_id to email_thread_edits
ALTER TABLE public.email_thread_edits 
ADD COLUMN IF NOT EXISTS account_id TEXT;

-- Add account_id to emails
ALTER TABLE public.emails 
ADD COLUMN IF NOT EXISTS account_id TEXT;

-- Create indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_email_thread_edits_account_id 
ON public.email_thread_edits(account_id);

CREATE INDEX IF NOT EXISTS idx_emails_account_id 
ON public.emails(account_id);

-- Create function to sync account_id from user_profiles
CREATE OR REPLACE FUNCTION sync_account_id_from_user()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.user_id IS NOT NULL THEN
    SELECT account_id INTO NEW.account_id
    FROM user_profiles
    WHERE id = NEW.user_id;
  ELSE
    NEW.account_id := NULL;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to auto-update account_id when user_id changes in email_thread_edits
CREATE TRIGGER sync_email_thread_edits_account_id
  BEFORE INSERT OR UPDATE OF user_id ON public.email_thread_edits
  FOR EACH ROW
  EXECUTE FUNCTION sync_account_id_from_user();

-- Create trigger to auto-update account_id when user_id changes in emails
CREATE TRIGGER sync_emails_account_id
  BEFORE INSERT OR UPDATE OF user_id ON public.emails
  FOR EACH ROW
  EXECUTE FUNCTION sync_account_id_from_user();

-- Create trigger to update account_id when user_profiles.account_id changes
CREATE OR REPLACE FUNCTION update_account_id_in_data_tables()
RETURNS TRIGGER AS $$
BEGIN
  -- Update email_thread_edits
  UPDATE public.email_thread_edits
  SET account_id = NEW.account_id
  WHERE user_id = NEW.id;
  
  -- Update emails
  UPDATE public.emails
  SET account_id = NEW.account_id
  WHERE user_id = NEW.id;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to sync when account_id changes in user_profiles
CREATE TRIGGER sync_data_tables_on_account_id_change
  AFTER UPDATE OF account_id ON public.user_profiles
  FOR EACH ROW
  WHEN (OLD.account_id IS DISTINCT FROM NEW.account_id)
  EXECUTE FUNCTION update_account_id_in_data_tables();

-- Backfill existing data
UPDATE public.email_thread_edits ete
SET account_id = up.account_id
FROM user_profiles up
WHERE ete.user_id = up.id 
  AND ete.account_id IS NULL
  AND up.account_id IS NOT NULL;

UPDATE public.emails e
SET account_id = up.account_id
FROM user_profiles up
WHERE e.user_id = up.id 
  AND e.account_id IS NULL
  AND up.account_id IS NOT NULL;

-- Add comments
COMMENT ON COLUMN public.email_thread_edits.account_id IS 'Denormalized account_id from user_profiles for faster queries (auto-synced via triggers)';
COMMENT ON COLUMN public.emails.account_id IS 'Denormalized account_id from user_profiles for faster queries (auto-synced via triggers)';
