# Fix sent_at Field Population

If `sent_at` is empty in `email_thread_edits`, run these queries in order:

## Step 1: Diagnostic Query

Run this first to see if there's a data matching issue:

```sql
SELECT 
  ete.thread_id,
  ete.sent_at as current_sent_at,
  COUNT(e.id) as email_count,
  MIN(e.date) as earliest_email_date,
  CASE 
    WHEN COUNT(e.id) > 0 THEN 'Has matching emails'
    ELSE 'No matching emails found'
  END as status
FROM public.email_thread_edits ete
LEFT JOIN public.emails e ON e.x_gm_thrid = ete.thread_id
GROUP BY ete.thread_id, ete.sent_at
ORDER BY ete.thread_id
LIMIT 20;
```

This will show you:
- Which threads have matching emails
- What the earliest email date is
- Whether there's a mismatch

## Step 2: Fix sent_at Population

Run this UPDATE query to populate `sent_at`:

```sql
UPDATE public.email_thread_edits ete
SET sent_at = subquery.earliest_date,
    updated_at = NOW()
FROM (
  SELECT 
    e.x_gm_thrid as thread_id,
    MIN(e.date) as earliest_date
  FROM public.emails e
  WHERE e.x_gm_thrid IS NOT NULL
    AND e.date IS NOT NULL
  GROUP BY e.x_gm_thrid
) subquery
WHERE ete.thread_id = subquery.thread_id
  AND (ete.sent_at IS NULL OR ete.sent_at != subquery.earliest_date);
```

## Step 3: Verify

Check if it worked:

```sql
SELECT 
  COUNT(*) as total_threads,
  COUNT(sent_at) as threads_with_sent_at,
  COUNT(*) - COUNT(sent_at) as threads_without_sent_at
FROM public.email_thread_edits;
```

## Common Issues

1. **No matching emails**: If `thread_id` values don't match `x_gm_thrid` values, check the data format
2. **NULL dates**: If emails have NULL dates, they won't be included
3. **Migration not run**: Make sure the migration `002_add_sent_at_to_email_thread_edits.sql` was executed first

## Alternative: If thread_id format is different

If the thread_id format doesn't match x_gm_thrid exactly, you might need to adjust the matching:

```sql
-- Example: If you need to trim or transform the values
UPDATE public.email_thread_edits ete
SET sent_at = subquery.earliest_date,
    updated_at = NOW()
FROM (
  SELECT 
    TRIM(e.x_gm_thrid) as thread_id,  -- Adjust as needed
    MIN(e.date) as earliest_date
  FROM public.emails e
  WHERE e.x_gm_thrid IS NOT NULL
    AND e.date IS NOT NULL
  GROUP BY TRIM(e.x_gm_thrid)
) subquery
WHERE TRIM(ete.thread_id) = subquery.thread_id
  AND (ete.sent_at IS NULL OR ete.sent_at != subquery.earliest_date);
```
