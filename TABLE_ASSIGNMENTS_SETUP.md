# Table Assignments Feature Setup

## Overview

Admins can now assign database tables to users, controlling which data each user has access to.

## Database Setup

### 1. Run the Migration

Execute the SQL migration to create the necessary tables:

```sql
-- Run this in Supabase SQL Editor
-- File: supabase/migrations/001_create_user_table_assignments.sql
```

Or use Supabase CLI:
```bash
supabase db push
```

### 2. Verify Tables Created

Check that these tables exist:
- `available_tables` - List of tables that can be assigned
- `user_table_assignments` - Assignments between users and tables

### 3. Default Tables

The migration includes these default tables:
- `customers` - Customer data and information
- `orders` - Order management and tracking
- `products` - Product catalog and inventory
- `invoices` - Invoice and billing information
- `projects` - Project management data

You can add more tables by inserting into `available_tables`:
```sql
INSERT INTO available_tables (name, display_name, description) 
VALUES ('new_table', 'New Table', 'Description here');
```

## Edge Function Setup

### 1. Deploy the Function

```bash
supabase functions deploy manage-table-assignments
```

### 2. Verify Service Role Key

Make sure `SUPABASE_SERVICE_ROLE_KEY` is set:
```bash
supabase secrets list
```

## Usage

### As an Admin

1. Go to `/portal/admin`
2. Click on any user to view their details
3. Scroll to "Table Assignments" section
4. Click "Assign Table" button
5. Select a table from the dropdown
6. Click "Assign"

### Features

- **View Assignments**: See all tables assigned to a user
- **Assign Tables**: Add new table assignments via dialog
- **Unassign Tables**: Remove assignments with the X button
- **Real-time Updates**: Changes reflect immediately

## API Endpoints

The Edge Function provides:

### GET `/functions/v1/manage-table-assignments`
- Without `userId`: Returns all available tables
- With `userId`: Returns assignments for that user

### POST `/functions/v1/manage-table-assignments`
- Body: `{ userId: string, tableId: string }`
- Assigns a table to a user

### DELETE `/functions/v1/manage-table-assignments?userId=...&tableId=...`
- Removes a table assignment

## Security

- Only admins (`@finitsolutions` emails) can assign/unassign tables
- Row Level Security (RLS) policies protect the data
- Users can view their own assignments
- Admins can view all assignments

## Customization

### Add More Tables

```sql
INSERT INTO available_tables (name, display_name, description) 
VALUES 
  ('your_table', 'Your Table Name', 'Description'),
  ('another_table', 'Another Table', 'Description');
```

### Modify Default Tables

Edit the migration file or run SQL directly:
```sql
UPDATE available_tables 
SET display_name = 'New Name', description = 'New Description' 
WHERE name = 'customers';
```

## Troubleshooting

### "Failed to fetch assignments"
- Check Edge Function is deployed
- Verify service role key is set
- Check browser console for errors

### "No tables available"
- Run the migration to create default tables
- Check `available_tables` table has data

### "Permission denied"
- Ensure you're logged in as admin
- Check RLS policies are correct
