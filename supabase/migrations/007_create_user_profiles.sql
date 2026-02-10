-- Create user_profiles table to extend auth.users with custom fields
CREATE TABLE IF NOT EXISTS public.user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  account_id TEXT UNIQUE, -- Assignable identifier for the account
  display_name TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  updated_by UUID REFERENCES auth.users(id)
);

-- Create index on account_id for faster lookups
CREATE INDEX IF NOT EXISTS idx_user_profiles_account_id ON public.user_profiles(account_id);

-- Create index on id for faster joins
CREATE INDEX IF NOT EXISTS idx_user_profiles_id ON public.user_profiles(id);

-- Enable Row Level Security
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;

-- Policy: Users can view their own profile
CREATE POLICY "Users can view own profile"
  ON public.user_profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

-- Policy: Admins can view all profiles
CREATE POLICY "Admins can view all profiles"
  ON public.user_profiles FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND (
        auth.users.email LIKE '%@finitsolutions.be'
        OR auth.users.email LIKE '%@finitsolutions.com'
      )
    )
  );

-- Policy: Admins can insert profiles
CREATE POLICY "Admins can insert profiles"
  ON public.user_profiles FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND (
        auth.users.email LIKE '%@finitsolutions.be'
        OR auth.users.email LIKE '%@finitsolutions.com'
      )
    )
  );

-- Policy: Admins can update profiles
CREATE POLICY "Admins can update profiles"
  ON public.user_profiles FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND (
        auth.users.email LIKE '%@finitsolutions.be'
        OR auth.users.email LIKE '%@finitsolutions.com'
      )
    )
  );

-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_user_profiles_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update updated_at on profile updates
CREATE TRIGGER trigger_update_user_profiles_updated_at
  BEFORE UPDATE ON public.user_profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_user_profiles_updated_at();

-- Add comments
COMMENT ON TABLE public.user_profiles IS 'Extended user profiles with assignable account IDs and custom fields';
COMMENT ON COLUMN public.user_profiles.account_id IS 'Assignable identifier for the account (e.g., employee ID, customer ID)';
COMMENT ON COLUMN public.user_profiles.display_name IS 'Optional display name for the user';
COMMENT ON COLUMN public.user_profiles.notes IS 'Admin notes about the user';
COMMENT ON COLUMN public.user_profiles.updated_by IS 'Admin user who last updated this profile';
