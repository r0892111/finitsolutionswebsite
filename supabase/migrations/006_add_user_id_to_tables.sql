-- Add user_id column (assignable identifier) to email_thread_edits table
ALTER TABLE public.email_thread_edits 
ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL;

-- Add assignment tracking columns
ALTER TABLE public.email_thread_edits 
ADD COLUMN IF NOT EXISTS assigned_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
ADD COLUMN IF NOT EXISTS assigned_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();

-- Add user_id column (assignable identifier) to emails table
ALTER TABLE public.emails 
ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL;

-- Add assignment tracking columns
ALTER TABLE public.emails 
ADD COLUMN IF NOT EXISTS assigned_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
ADD COLUMN IF NOT EXISTS assigned_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_email_thread_edits_user_id 
ON public.email_thread_edits USING btree (user_id);

CREATE INDEX IF NOT EXISTS idx_email_thread_edits_assigned_by 
ON public.email_thread_edits USING btree (assigned_by);

CREATE INDEX IF NOT EXISTS idx_emails_user_id 
ON public.emails USING btree (user_id);

CREATE INDEX IF NOT EXISTS idx_emails_assigned_by 
ON public.emails USING btree (assigned_by);

-- Add comments
COMMENT ON COLUMN public.email_thread_edits.user_id IS 'The user assigned to this email thread analysis (assignable by admins)';
COMMENT ON COLUMN public.email_thread_edits.assigned_by IS 'The admin user who assigned this record';
COMMENT ON COLUMN public.email_thread_edits.assigned_at IS 'When this record was assigned to the user';
COMMENT ON COLUMN public.emails.user_id IS 'The user assigned to this email (assignable by admins)';
COMMENT ON COLUMN public.emails.assigned_by IS 'The admin user who assigned this record';
COMMENT ON COLUMN public.emails.assigned_at IS 'When this record was assigned to the user';
