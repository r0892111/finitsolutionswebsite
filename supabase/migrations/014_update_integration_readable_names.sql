-- Update integration types with clear, readable names and descriptions
-- This migration ensures each integration type has descriptive display names
-- that clearly indicate what service it represents

-- Google Integration
UPDATE public.integration_types
SET 
  display_name = 'Google Workspace',
  description = 'Connect your Google Workspace account to access Gmail, Google Calendar, and Google Drive. Sync emails, manage calendar events, and access files seamlessly.',
  icon_url = '/google_icon.png'
WHERE name = 'google';

-- Microsoft 365 Integration
UPDATE public.integration_types
SET 
  display_name = 'Microsoft 365',
  description = 'Connect your Microsoft 365 account to access Outlook email, Microsoft Calendar, OneDrive, and other Office 365 services. Manage your emails, calendar, and cloud storage.',
  icon_url = '/microsoft_icon.png'
WHERE name = 'microsoft';

-- Shopify Integration
UPDATE public.integration_types
SET 
  display_name = 'Shopify Store',
  description = 'Connect your Shopify store to sync orders, products, and customer data. Automate workflows and manage your e-commerce operations efficiently.',
  icon_url = '/shopify_icon.png'
WHERE name = 'shopify';

-- Dropbox Integration
UPDATE public.integration_types
SET 
  display_name = 'Dropbox Cloud Storage',
  description = 'Connect your Dropbox account to access and manage files stored in the cloud. Sync documents, share files, and collaborate on projects.',
  icon_url = '/dropbox_icon.png'
WHERE name = 'dropbox';

-- Add comments for clarity
COMMENT ON COLUMN public.integration_types.display_name IS 'Human-readable name for the integration (e.g., "Google Workspace", "Microsoft 365")';
COMMENT ON COLUMN public.integration_types.description IS 'Detailed description of what the integration does and which services it connects to';
COMMENT ON COLUMN public.integration_types.name IS 'Internal identifier for the integration (lowercase, e.g., "google", "microsoft", "shopify", "dropbox")';
