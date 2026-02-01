-- Comprehensive diagnostic and fix for sent_at field
-- Run this entire script in Supabase SQL Editor

-- ============================================
-- STEP 1: DIAGNOSTIC QUERIES
-- ============================================

-- Check if column exists
SELECT 
  column_name, 
  data_type, 
  is_nullable
FROM information_schema.columns 
WHERE table_name = 'email_thread_edits' 
  AND column_name = 'sent_at';

-- Check sample data from both tables to see format
SELECT 
  'email_thread_edits' as source_table,
  thread_id,
  sent_at,
  created_at
FROM public.email_thread_edits
LIMIT 5;

SELECT 
  'emails' as source_table,
  x_gm_thrid,
  date,
  id
FROM public.emails
WHERE x_gm_thrid IS NOT NULL
LIMIT 5;

-- Check for matching records
SELECT 
  ete.thread_id,
  ete.sent_at as current_sent_at,
  COUNT(DISTINCT e.id) as matching_email_count,
  MIN(e.date) as earliest_email_date,
  MAX(e.date) as latest_email_date,
  CASE 
    WHEN COUNT(DISTINCT e.id) > 0 THEN 'HAS MATCHING EMAILS'
    ELSE 'NO MATCHING EMAILS'
  END as match_status
FROM public.email_thread_edits ete
LEFT JOIN public.emails e ON e.x_gm_thrid = ete.thread_id
GROUP BY ete.thread_id, ete.sent_at
ORDER BY match_status DESC, ete.thread_id
LIMIT 20;

-- Check for potential format mismatches (whitespace, case, etc.)
SELECT 
  'Potential format issues' as check_type,
  COUNT(*) FILTER (WHERE ete.thread_id != TRIM(ete.thread_id)) as threads_with_whitespace,
  (SELECT COUNT(*) FILTER (WHERE e.x_gm_thrid != TRIM(e.x_gm_thrid)) FROM public.emails e WHERE e.x_gm_thrid IS NOT NULL) as emails_with_whitespace
FROM public.email_thread_edits ete;

-- ============================================
-- STEP 2: FIX QUERIES (Run after diagnostics)
-- ============================================

-- Method 1: Standard update with exact match
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

-- Method 2: Update with trimmed values (in case of whitespace issues)
UPDATE public.email_thread_edits ete
SET sent_at = subquery.earliest_date,
    updated_at = NOW()
FROM (
  SELECT 
    TRIM(e.x_gm_thrid) as thread_id,
    MIN(e.date) as earliest_date
  FROM public.emails e
  WHERE e.x_gm_thrid IS NOT NULL
    AND TRIM(e.x_gm_thrid) != ''
    AND e.date IS NOT NULL
  GROUP BY TRIM(e.x_gm_thrid)
) subquery
WHERE TRIM(ete.thread_id) = subquery.thread_id
  AND (ete.sent_at IS NULL OR ete.sent_at != subquery.earliest_date);

-- Method 3: Update using JOIN (most reliable)
UPDATE public.email_thread_edits ete
SET sent_at = email_data.earliest_date,
    updated_at = NOW()
FROM (
  SELECT 
    e.x_gm_thrid,
    MIN(e.date) as earliest_date
  FROM public.emails e
  WHERE e.x_gm_thrid IS NOT NULL
    AND e.date IS NOT NULL
  GROUP BY e.x_gm_thrid
) email_data
WHERE ete.thread_id = email_data.x_gm_thrid
  AND (ete.sent_at IS NULL OR ete.sent_at != email_data.earliest_date);

-- ============================================
-- STEP 3: VERIFICATION
-- ============================================

-- Check results
SELECT 
  COUNT(*) as total_threads,
  COUNT(sent_at) as threads_with_sent_at,
  COUNT(*) - COUNT(sent_at) as threads_without_sent_at,
  ROUND(100.0 * COUNT(sent_at) / COUNT(*), 2) as percentage_populated
FROM public.email_thread_edits;

-- Show sample of populated records
SELECT 
  thread_id,
  sent_at,
  created_at,
  updated_at
FROM public.email_thread_edits
WHERE sent_at IS NOT NULL
ORDER BY sent_at DESC
LIMIT 10;

-- Show threads that still don't have sent_at
SELECT 
  ete.thread_id,
  ete.created_at,
  COUNT(e.id) as email_count,
  MIN(e.date) as earliest_email_date
FROM public.email_thread_edits ete
LEFT JOIN public.emails e ON e.x_gm_thrid = ete.thread_id
WHERE ete.sent_at IS NULL
GROUP BY ete.thread_id, ete.created_at
ORDER BY email_count DESC
LIMIT 10;
