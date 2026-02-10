-- Enable Shopify integration
UPDATE public.integration_types
SET enabled = true
WHERE name = 'shopify';
