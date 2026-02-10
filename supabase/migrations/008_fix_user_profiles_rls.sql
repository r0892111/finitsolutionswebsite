-- Fix RLS policies for user_profiles table
-- The issue is that auth.users table might not be accessible in RLS context via REST API

-- Drop existing policies
DROP POLICY IF EXISTS "Users can view own profile" ON public.user_profiles;
DROP POLICY IF EXISTS "Admins can view all profiles" ON public.user_profiles;
DROP POLICY IF EXISTS "Admins can insert profiles" ON public.user_profiles;
DROP POLICY IF EXISTS "Admins can update profiles" ON public.user_profiles;

-- Create a function to check if current user is admin
CREATE OR REPLACE FUNCTION public.is_admin_user()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 
    FROM auth.users 
    WHERE auth.users.id = auth.uid()
    AND (
      auth.users.email LIKE '%@finitsolutions.be'
      OR auth.users.email LIKE '%@finitsolutions.com'
    )
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permission to authenticated users
GRANT EXECUTE ON FUNCTION public.is_admin_user() TO authenticated;

-- Policy: Users can view their own profile
CREATE POLICY "Users can view own profile"
  ON public.user_profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

-- Policy: Admins can view all profiles
CREATE POLICY "Admins can view all profiles"
  ON public.user_profiles FOR SELECT
  TO authenticated
  USING (public.is_admin_user());

-- Policy: Admins can insert profiles
CREATE POLICY "Admins can insert profiles"
  ON public.user_profiles FOR INSERT
  TO authenticated
  WITH CHECK (public.is_admin_user());

-- Policy: Admins can update profiles
CREATE POLICY "Admins can update profiles"
  ON public.user_profiles FOR UPDATE
  TO authenticated
  USING (public.is_admin_user())
  WITH CHECK (public.is_admin_user());

-- Add comment
COMMENT ON FUNCTION public.is_admin_user() IS 'Checks if the current authenticated user is an admin (@finitsolutions email domain)';
