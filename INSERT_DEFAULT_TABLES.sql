-- Insert default tables into available_tables
-- Run this in Supabase SQL Editor if the dropdown is empty

INSERT INTO available_tables (name, display_name, description) VALUES
  ('customers', 'Customers', 'Customer data and information'),
  ('orders', 'Orders', 'Order management and tracking'),
  ('products', 'Products', 'Product catalog and inventory'),
  ('invoices', 'Invoices', 'Invoice and billing information'),
  ('projects', 'Projects', 'Project management data')
ON CONFLICT (name) DO NOTHING;

-- Verify the data was inserted
SELECT * FROM available_tables ORDER BY display_name;
