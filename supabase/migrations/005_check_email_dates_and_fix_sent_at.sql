-- ============================================
-- DIAGNOSTIC: Check what date fields are available
-- ============================================

-- Check if emails have date field populated
SELECT 
  'Date field analysis' as check_type,
  COUNT(*) as total_emails,
  COUNT(date) as emails_with_date,
  COUNT(*) - COUNT(date) as emails_without_date,
  COUNT(created_at) as emails_with_created_at
FROM public.emails
WHERE x_gm_thrid IS NOT NULL;

-- Check specific threads from the diagnostic output
SELECT 
  ete.thread_id,
  COUNT(e.id) as total_emails,
  COUNT(e.date) as emails_with_date,
  COUNT(e.created_at) as emails_with_created_at,
  MIN(e.date) as earliest_date,
  MIN(e.created_at) as earliest_created_at
FROM public.email_thread_edits ete
LEFT JOIN public.emails e ON e.x_gm_thrid = ete.thread_id
WHERE ete.thread_id IN (
  '1632418505230567227',
  '1631723949107432308',
  '1631698263892846825',
  '1632856068624562849',
  '1632690288533390312'
)
GROUP BY ete.thread_id
ORDER BY ete.thread_id;

-- ============================================
-- FIX: Use created_at since date field is always null
-- ============================================

-- Update sent_at using created_at (since date is always null)
UPDATE public.email_thread_edits ete
SET sent_at = subquery.earliest_date,
    updated_at = NOW()
FROM (
  SELECT 
    e.x_gm_thrid as thread_id,
    MIN(e.created_at) as earliest_date
  FROM public.emails e
  WHERE e.x_gm_thrid IS NOT NULL
    AND e.created_at IS NOT NULL
  GROUP BY e.x_gm_thrid
) subquery
WHERE ete.thread_id = subquery.thread_id
  AND (ete.sent_at IS NULL OR ete.sent_at != subquery.earliest_date);

-- ============================================
-- VERIFICATION: Check results
-- ============================================

SELECT 
  COUNT(*) as total_threads,
  COUNT(sent_at) as threads_with_sent_at,
  COUNT(*) - COUNT(sent_at) as threads_without_sent_at
FROM public.email_thread_edits;

-- Show some examples
SELECT 
  ete.thread_id,
  ete.sent_at,
  COUNT(e.id) as email_count,
  MIN(e.date) as earliest_email_date,
  MIN(e.created_at) as earliest_created_at
FROM public.email_thread_edits ete
LEFT JOIN public.emails e ON e.x_gm_thrid = ete.thread_id
GROUP BY ete.thread_id, ete.sent_at
ORDER BY ete.sent_at DESC NULLS LAST
LIMIT 10;
