-- Add sent_at column to email_thread_edits table
ALTER TABLE public.email_thread_edits 
ADD COLUMN IF NOT EXISTS sent_at timestamp without time zone null;

-- Create index on sent_at for better query performance
CREATE INDEX IF NOT EXISTS idx_email_thread_edits_sent_at 
ON public.email_thread_edits USING btree (sent_at) 
TABLESPACE pg_default;

-- Populate sent_at with the earliest created_at from emails table for each thread
-- (using created_at since date field is always null)
-- First, let's ensure we're matching correctly - thread_id in email_thread_edits should match x_gm_thrid in emails
UPDATE public.email_thread_edits ete
SET sent_at = (
  SELECT MIN(e.created_at)
  FROM public.emails e
  WHERE e.x_gm_thrid = ete.thread_id
    AND e.created_at IS NOT NULL
)
WHERE sent_at IS NULL
  AND EXISTS (
    SELECT 1 
    FROM public.emails e 
    WHERE e.x_gm_thrid = ete.thread_id 
    AND e.created_at IS NOT NULL
  );

-- Also update any existing records that might have been missed
UPDATE public.email_thread_edits ete
SET sent_at = (
  SELECT MIN(e.created_at)
  FROM public.emails e
  WHERE e.x_gm_thrid = ete.thread_id
    AND e.created_at IS NOT NULL
)
WHERE sent_at IS NULL
  OR sent_at > (
    SELECT MIN(e.created_at)
    FROM public.emails e
    WHERE e.x_gm_thrid = ete.thread_id
      AND e.created_at IS NOT NULL
  );

-- Create a function to update sent_at when emails are inserted/updated
CREATE OR REPLACE FUNCTION update_email_thread_edits_sent_at()
RETURNS TRIGGER AS $$
BEGIN
  -- Update sent_at for the thread if this email's created_at is earlier than current sent_at
  -- (using created_at since date field is always null)
  UPDATE public.email_thread_edits
  SET sent_at = LEAST(
    COALESCE(sent_at, NEW.created_at),
    NEW.created_at
  ),
  updated_at = NOW()
  WHERE thread_id = NEW.x_gm_thrid
    AND NEW.created_at IS NOT NULL
    AND (sent_at IS NULL OR NEW.created_at < sent_at);
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update sent_at when emails are inserted
CREATE TRIGGER trigger_update_thread_sent_at_on_insert
AFTER INSERT ON public.emails
FOR EACH ROW
WHEN (NEW.x_gm_thrid IS NOT NULL AND NEW.created_at IS NOT NULL)
EXECUTE FUNCTION update_email_thread_edits_sent_at();

-- Create trigger to update sent_at when emails are updated (in case created_at changes)
CREATE TRIGGER trigger_update_thread_sent_at_on_update
AFTER UPDATE ON public.emails
FOR EACH ROW
WHEN (
  NEW.x_gm_thrid IS NOT NULL 
  AND NEW.created_at IS NOT NULL
  AND (OLD.created_at IS DISTINCT FROM NEW.created_at OR OLD.x_gm_thrid IS DISTINCT FROM NEW.x_gm_thrid)
)
EXECUTE FUNCTION update_email_thread_edits_sent_at();

-- Add comment to the column
COMMENT ON COLUMN public.email_thread_edits.sent_at IS 'Date of the first email sent in the thread, populated from the earliest created_at in the emails table for this thread_id';
