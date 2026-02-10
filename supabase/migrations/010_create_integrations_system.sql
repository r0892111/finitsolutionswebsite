-- Create integrations system
-- Stores integration connections for each account

-- Integration types table
CREATE TABLE IF NOT EXISTS public.integration_types (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE, -- e.g., 'google', 'microsoft', 'shopify'
  display_name TEXT NOT NULL,
  description TEXT,
  icon_url TEXT,
  auth_url TEXT, -- OAuth URL for this integration
  enabled BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- User integrations table (connections between accounts and integrations)
CREATE TABLE IF NOT EXISTS public.user_integrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  account_id TEXT, -- Denormalized from user_profiles for easier queries
  integration_type_id UUID NOT NULL REFERENCES public.integration_types(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'pending', -- 'pending', 'connected', 'disconnected', 'error'
  access_token TEXT, -- Encrypted OAuth token
  refresh_token TEXT, -- Encrypted refresh token
  token_expires_at TIMESTAMPTZ,
  metadata JSONB, -- Additional integration-specific data
  connected_at TIMESTAMPTZ,
  disconnected_at TIMESTAMPTZ,
  last_sync_at TIMESTAMPTZ,
  error_message TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, integration_type_id)
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_user_integrations_user_id ON public.user_integrations(user_id);
CREATE INDEX IF NOT EXISTS idx_user_integrations_account_id ON public.user_integrations(account_id);
CREATE INDEX IF NOT EXISTS idx_user_integrations_integration_type_id ON public.user_integrations(integration_type_id);
CREATE INDEX IF NOT EXISTS idx_user_integrations_status ON public.user_integrations(status);

-- Enable Row Level Security
ALTER TABLE public.integration_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_integrations ENABLE ROW LEVEL SECURITY;

-- RLS Policies for integration_types (read-only for authenticated users)
CREATE POLICY "Anyone can view integration types"
  ON public.integration_types FOR SELECT
  TO authenticated
  USING (enabled = true);

-- RLS Policies for user_integrations
-- Users can view their own integrations
CREATE POLICY "Users can view own integrations"
  ON public.user_integrations FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Admins can view all integrations
CREATE POLICY "Admins can view all integrations"
  ON public.user_integrations FOR SELECT
  TO authenticated
  USING (public.is_admin_user());

-- Users can insert their own integrations
CREATE POLICY "Users can create own integrations"
  ON public.user_integrations FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own integrations
CREATE POLICY "Users can update own integrations"
  ON public.user_integrations FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Admins can update any integration
CREATE POLICY "Admins can update any integration"
  ON public.user_integrations FOR UPDATE
  TO authenticated
  USING (public.is_admin_user())
  WITH CHECK (public.is_admin_user());

-- Users can delete their own integrations
CREATE POLICY "Users can delete own integrations"
  ON public.user_integrations FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Function to sync account_id when user_id changes
CREATE OR REPLACE FUNCTION sync_integration_account_id()
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

-- Trigger to sync account_id
CREATE TRIGGER sync_user_integrations_account_id
  BEFORE INSERT OR UPDATE OF user_id ON public.user_integrations
  FOR EACH ROW
  EXECUTE FUNCTION sync_integration_account_id();

-- Insert default integration types
INSERT INTO public.integration_types (name, display_name, description, icon_url, enabled) VALUES
  ('google', 'Google', 'Connect your Google account for email, calendar, and drive access', '/icons/google.svg', true),
  ('microsoft', 'Microsoft 365', 'Connect your Microsoft 365 account', '/icons/microsoft.svg', false),
  ('shopify', 'Shopify', 'Connect your Shopify store', '/icons/shopify.svg', false)
ON CONFLICT (name) DO NOTHING;

-- Add comments
COMMENT ON TABLE public.integration_types IS 'Available integration types (Google, Microsoft, etc.)';
COMMENT ON TABLE public.user_integrations IS 'User integration connections with OAuth tokens and status';
COMMENT ON COLUMN public.user_integrations.account_id IS 'Denormalized account_id from user_profiles for easier queries';
COMMENT ON COLUMN public.user_integrations.status IS 'Integration status: pending, connected, disconnected, error';
