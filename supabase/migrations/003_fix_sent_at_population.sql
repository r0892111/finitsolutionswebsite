-- Diagnostic query to check data matching
-- Run this first to see if there's a mismatch between thread_id and x_gm_thrid
-- Uncomment and run to debug:
/*
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
*/

-- Force update sent_at for all records, matching thread_id with x_gm_thrid
-- This uses a JOIN approach which is more reliable than a subquery
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

-- Verify the update worked
-- Uncomment to check:
/*
SELECT 
  COUNT(*) as total_threads,
  COUNT(sent_at) as threads_with_sent_at,
  COUNT(*) - COUNT(sent_at) as threads_without_sent_at
FROM public.email_thread_edits;
*/
