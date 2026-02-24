-- Allow users to have multiple accounts for the same integration type
-- Remove the unique constraint on (user_id, integration_type_id)

-- Drop the unique constraint
ALTER TABLE public.user_integrations
DROP CONSTRAINT IF EXISTS user_integrations_user_id_integration_type_id_key;

-- Add a unique constraint on (user_id, integration_type_id, authenticated_email) instead
-- This prevents duplicate connections to the same account, but allows multiple different accounts
-- Note: authenticated_email can be NULL for some integrations, so we use a partial unique index
CREATE UNIQUE INDEX IF NOT EXISTS idx_user_integrations_unique_account 
ON public.user_integrations(user_id, integration_type_id, authenticated_email)
WHERE authenticated_email IS NOT NULL;

-- Add comment explaining the change
COMMENT ON TABLE public.user_integrations IS 'Stores integration connections. Users can now have multiple accounts for the same integration type (e.g., multiple Google accounts).';
