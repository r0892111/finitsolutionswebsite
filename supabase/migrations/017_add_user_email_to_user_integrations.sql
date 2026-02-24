-- Add user_email column to user_integrations table
-- This denormalizes the user's email from auth.users for easier querying without joins

-- Add the user_email column (matches the style of name and authenticated_email)
ALTER TABLE public.user_integrations
ADD COLUMN IF NOT EXISTS user_email TEXT NULL;

-- Create index for faster queries by user email (matches existing index style)
CREATE INDEX IF NOT EXISTS idx_user_integrations_user_email 
ON public.user_integrations USING btree (user_email) 
TABLESPACE pg_default;

-- Update the sync function to also populate the user_email from auth.users
CREATE OR REPLACE FUNCTION sync_integration_account_id()
RETURNS TRIGGER AS $$
BEGIN
  -- Sync account_id from user_profiles
  IF NEW.user_id IS NOT NULL THEN
    SELECT account_id INTO NEW.account_id
    FROM user_profiles
    WHERE id = NEW.user_id;
  ELSE
    NEW.account_id := NULL;
  END IF;
  
  -- Sync name from integration_types
  IF NEW.integration_type_id IS NOT NULL THEN
    SELECT name INTO NEW.name
    FROM public.integration_types
    WHERE id = NEW.integration_type_id;
  ELSE
    NEW.name := NULL;
  END IF;
  
  -- Sync user_email from auth.users
  IF NEW.user_id IS NOT NULL THEN
    SELECT email INTO NEW.user_email
    FROM auth.users
    WHERE id = NEW.user_id;
  ELSE
    NEW.user_email := NULL;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Update the trigger to also sync user_email when user_id changes
DROP TRIGGER IF EXISTS sync_user_integrations_account_id ON public.user_integrations;

CREATE TRIGGER sync_user_integrations_account_id 
BEFORE INSERT
OR UPDATE OF user_id, integration_type_id 
ON public.user_integrations 
FOR EACH ROW
EXECUTE FUNCTION sync_integration_account_id();

-- Backfill existing records with user emails from auth.users
-- Update all records to ensure consistency, even if user_email was already set
UPDATE public.user_integrations ui
SET user_email = au.email
FROM auth.users au
WHERE ui.user_id = au.id
  AND au.email IS NOT NULL;

-- Add comment explaining the denormalized field
COMMENT ON COLUMN public.user_integrations.user_email IS 'Denormalized user email from auth.users for easier querying without joins';
