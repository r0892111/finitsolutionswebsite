-- Add Dropbox integration type
INSERT INTO public.integration_types (name, display_name, description, icon_url, enabled) VALUES
  ('dropbox', 'Dropbox', 'Connect your Dropbox account for file access and management', '/icons/dropbox.svg', true)
ON CONFLICT (name) DO UPDATE
SET enabled = true,
    display_name = 'Dropbox',
    description = 'Connect your Dropbox account for file access and management';
