-- Add name column to user_integrations table
-- This denormalizes the integration type name for easier querying without joins

-- Add the name column
ALTER TABLE public.user_integrations
ADD COLUMN IF NOT EXISTS name TEXT;

-- Create index for faster queries by name
CREATE INDEX IF NOT EXISTS idx_user_integrations_name ON public.user_integrations(name);

-- Update the sync function to also populate the name from integration_types
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
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Update the trigger to also sync name when integration_type_id changes
DROP TRIGGER IF EXISTS sync_user_integrations_account_id ON public.user_integrations;

CREATE TRIGGER sync_user_integrations_account_id
  BEFORE INSERT OR UPDATE OF user_id, integration_type_id ON public.user_integrations
  FOR EACH ROW
  EXECUTE FUNCTION sync_integration_account_id();

-- Backfill existing records with their integration type names
UPDATE public.user_integrations ui
SET name = it.name
FROM public.integration_types it
WHERE ui.integration_type_id = it.id
  AND ui.name IS NULL;

-- Add comment explaining the denormalized field
COMMENT ON COLUMN public.user_integrations.name IS 'Denormalized integration type name (e.g., "google", "microsoft", "shopify", "dropbox") for easier querying without joins';
