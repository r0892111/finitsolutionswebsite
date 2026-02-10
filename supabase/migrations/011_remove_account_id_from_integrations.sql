-- Remove account_id dependency from user_integrations
-- Users should connect integrations directly, not via account_id

-- Drop the trigger that syncs account_id
DROP TRIGGER IF EXISTS sync_user_integrations_account_id ON public.user_integrations;

-- Drop the function that syncs account_id
DROP FUNCTION IF EXISTS sync_integration_account_id();

-- Remove the index on account_id since it's not used
DROP INDEX IF EXISTS idx_user_integrations_account_id;

-- Update comment to reflect that account_id is not used
COMMENT ON COLUMN public.user_integrations.account_id IS 'Deprecated - not used. Integrations are user-based only.';
