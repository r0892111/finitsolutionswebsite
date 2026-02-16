# Email Templates for Client Portal Invitations

This directory contains email templates for inviting users to the Finit Solutions client portal.

## Files

- `client-portal-invitation.html` - Dutch HTML email template
- `client-portal-invitation.txt` - Dutch plain text email template
- `client-portal-invitation-en.html` - English HTML email template
- `client-portal-invitation-en.txt` - English plain text email template

## How to Use in Supabase

### Step 1: Access Email Templates

1. Go to your Supabase Dashboard
2. Navigate to **Authentication** → **Email Templates**
3. Select **Invite user** template

### Step 2: Copy Template Content

1. Open the appropriate HTML template file (`client-portal-invitation.html` for Dutch or `client-portal-invitation-en.html` for English)
2. Copy the entire HTML content
3. Paste it into the Supabase email template editor

### Step 3: Configure Placeholder

The template uses Supabase's standard placeholder:
- `{{ .ConfirmationURL }}` - This will be automatically replaced with the actual invitation link

**Important**: Make sure `{{ .ConfirmationURL }}` is included in your template. This is the link users will click to activate their account.

### Step 4: Set Subject Line

In Supabase, set the email subject line to:
- **Dutch**: "Uitnodiging voor Finit Solutions Portaal"
- **English**: "Invitation to Finit Solutions Portal"

### Step 5: Configure Plain Text Version (Optional)

1. Copy the content from `client-portal-invitation.txt` (or `-en.txt` for English)
2. Paste it into the "Plain text" section in Supabase (if available)

## Template Features

- **Branded Design**: Uses Finit Solutions colors (#1A2D63 navy blue)
- **Responsive**: Works on desktop and mobile email clients
- **Professional Layout**: Clean, modern design with clear call-to-action
- **Accessibility**: Proper HTML structure and alt text for images
- **Email Client Compatibility**: Uses table-based layout for maximum compatibility

## Customization

### Changing Colors

The template uses these brand colors:
- Primary: `#1A2D63` (navy blue)
- Secondary: `#2A3D73` (lighter navy for gradients)
- Text: `#4a5568` (dark gray)
- Background: `#f5f7fa` (light gray)

### Changing Logo

Update the logo URL in the template:
```html
<img src="https://finitsolutions.be/Finit%20Logo%20Blue@4x.png" ...>
```

### Modifying Content

Edit the text content directly in the HTML files. The structure is:
- Header with logo
- Welcome message
- Call-to-action button
- Alternative link
- Feature list
- Footer

## Testing

After updating the template in Supabase:

1. Go to **Authentication** → **Users**
2. Click **Invite user**
3. Enter a test email address
4. Check the email to verify:
   - Layout renders correctly
   - Button/link works
   - Colors display properly
   - Text is readable

## Notes

- The invitation link expires after 24 hours (configurable in Supabase settings)
- Make sure your redirect URLs are configured in Supabase (**Authentication** → **URL Configuration**)
- The template includes both HTML and plain text versions for maximum compatibility
