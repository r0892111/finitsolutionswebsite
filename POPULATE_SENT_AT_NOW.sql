-- DIRECT FIX: Populate sent_at field immediately
-- Run this in Supabase SQL Editor

-- First, let's see what we're working with
SELECT 
  'Diagnostic: Checking data match' as step,
  (SELECT COUNT(DISTINCT thread_id) FROM public.email_thread_edits) as total_threads,
  (SELECT COUNT(DISTINCT x_gm_thrid) FROM public.emails WHERE x_gm_thrid IS NOT NULL) as total_email_threads,
  (SELECT COUNT(DISTINCT ete.thread_id) 
   FROM public.email_thread_edits ete
   INNER JOIN public.emails e ON e.x_gm_thrid = ete.thread_id) as matching_threads;

-- Method 1: Direct JOIN update (most reliable)
UPDATE public.email_thread_edits ete
SET sent_at = email_agg.earliest_date,
    updated_at = NOW()
FROM (
  SELECT 
    x_gm_thrid,
    MIN(date) as earliest_date
  FROM public.emails
  WHERE x_gm_thrid IS NOT NULL
    AND date IS NOT NULL
  GROUP BY x_gm_thrid
) email_agg
WHERE ete.thread_id = email_agg.x_gm_thrid
  AND (ete.sent_at IS NULL OR ete.sent_at != email_agg.earliest_date);

-- Check how many were updated
SELECT 
  COUNT(*) as total_records,
  COUNT(sent_at) as records_with_sent_at,
  COUNT(*) - COUNT(sent_at) as records_without_sent_at
FROM public.email_thread_edits;

-- Show some examples
SELECT 
  ete.thread_id,
  ete.sent_at,
  COUNT(e.id) as email_count,
  MIN(e.date) as earliest_email_date
FROM public.email_thread_edits ete
LEFT JOIN public.emails e ON e.x_gm_thrid = ete.thread_id
GROUP BY ete.thread_id, ete.sent_at
ORDER BY ete.sent_at DESC NULLS LAST
LIMIT 10;
