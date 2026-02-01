-- Create table to store available tables that can be assigned
CREATE TABLE IF NOT EXISTS available_tables (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  display_name TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create table to store user-table assignments
CREATE TABLE IF NOT EXISTS user_table_assignments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  table_id UUID NOT NULL REFERENCES available_tables(id) ON DELETE CASCADE,
  assigned_at TIMESTAMPTZ DEFAULT NOW(),
  assigned_by UUID REFERENCES auth.users(id),
  UNIQUE(user_id, table_id)
);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_user_table_assignments_user_id ON user_table_assignments(user_id);
CREATE INDEX IF NOT EXISTS idx_user_table_assignments_table_id ON user_table_assignments(table_id);

-- Enable Row Level Security
ALTER TABLE available_tables ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_table_assignments ENABLE ROW LEVEL SECURITY;

-- RLS Policies for available_tables (read-only for authenticated users)
CREATE POLICY "Anyone can view available tables"
  ON available_tables FOR SELECT
  TO authenticated
  USING (true);

-- RLS Policies for user_table_assignments
-- Users can view their own assignments
CREATE POLICY "Users can view their own table assignments"
  ON user_table_assignments FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Admins can view all assignments
CREATE POLICY "Admins can view all table assignments"
  ON user_table_assignments FOR SELECT
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

-- Admins can insert assignments
CREATE POLICY "Admins can assign tables"
  ON user_table_assignments FOR INSERT
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

-- Admins can delete assignments
CREATE POLICY "Admins can unassign tables"
  ON user_table_assignments FOR DELETE
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

-- Insert some default tables (you can modify these)
INSERT INTO available_tables (name, display_name, description) VALUES
  ('customers', 'Customers', 'Customer data and information'),
  ('orders', 'Orders', 'Order management and tracking'),
  ('products', 'Products', 'Product catalog and inventory'),
  ('invoices', 'Invoices', 'Invoice and billing information'),
  ('projects', 'Projects', 'Project management data')
ON CONFLICT (name) DO NOTHING;
