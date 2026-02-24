-- Add authenticated_email column to user_integrations table
-- This stores the email address used to authenticate/connect the integration

-- Add the authenticated_email column
ALTER TABLE public.user_integrations
ADD COLUMN IF NOT EXISTS authenticated_email TEXT;

-- Create index for faster queries by email
CREATE INDEX IF NOT EXISTS idx_user_integrations_authenticated_email ON public.user_integrations(authenticated_email);

-- Add comment explaining the field
COMMENT ON COLUMN public.user_integrations.authenticated_email IS 'Email address used to authenticate/connect this integration (e.g., Google account email, Dropbox account email, or Shopify shop domain)';
