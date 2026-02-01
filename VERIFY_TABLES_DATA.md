# Verify Tables Data Exists

## Check if Tables Have Data

The dropdown is empty, which means the `available_tables` table is empty or the query isn't working.

### Option 1: Check in Supabase Dashboard

1. Go to: https://supabase.com/dashboard/project/dcmhmqhfuhynlysocvts/editor
2. Click on `available_tables` table
3. Check if there are any rows
4. If empty, see "Insert Default Tables" below

### Option 2: Insert Default Tables Manually

If the migration didn't insert the default tables, run this SQL:

```sql
INSERT INTO available_tables (name, display_name, description) VALUES
  ('customers', 'Customers', 'Customer data and information'),
  ('orders', 'Orders', 'Order management and tracking'),
  ('products', 'Products', 'Product catalog and inventory'),
  ('invoices', 'Invoices', 'Invoice and billing information'),
  ('projects', 'Projects', 'Project management data')
ON CONFLICT (name) DO NOTHING;
```

### Option 3: Check Edge Function Response

Open browser console and check the network tab:
- Look for the `manage-table-assignments` request
- Check the response - does it return `{"tables": []}` or `{"tables": [...]}`?

### Option 4: Test the Function Directly

```bash
# Get your access token from browser console
curl -X GET \
  'https://dcmhmqhfuhynlysocvts.supabase.co/functions/v1/manage-table-assignments' \
  -H 'Authorization: Bearer YOUR_ACCESS_TOKEN' \
  -H 'apikey: YOUR_ANON_KEY'
```

Should return:
```json
{
  "tables": [
    {"id": "...", "name": "customers", "display_name": "Customers", ...},
    ...
  ]
}
```

## Quick Fix

Run this SQL in Supabase SQL Editor:

```sql
-- Check if table exists and has data
SELECT * FROM available_tables;

-- If empty, insert default tables
INSERT INTO available_tables (name, display_name, description) VALUES
  ('customers', 'Customers', 'Customer data and information'),
  ('orders', 'Orders', 'Order management and tracking'),
  ('products', 'Products', 'Product catalog and inventory'),
  ('invoices', 'Invoices', 'Invoice and billing information'),
  ('projects', 'Projects', 'Project management data')
ON CONFLICT (name) DO NOTHING;
```
