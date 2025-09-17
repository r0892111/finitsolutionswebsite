finitsolutionswebsite

## Internationalization (i18n)

This project uses `next-intl` for bilingual support (English/Dutch).

### Supported Languages
- **English (en)** - Default locale
- **Dutch (nl)** - Secondary locale

### URL Structure
- English: `/en/page`
- Dutch: `/nl/page`

### Adding Translations

1. **Add new keys** to both `messages/en.json` and `messages/nl.json`
2. **Use dot notation** for nested keys: `nav.home`, `auth.signIn.title`
3. **Use the `useTranslations()` hook** in components:

```tsx
import { useTranslations } from 'next-intl';

export function MyComponent() {
  const t = useTranslations();
  
  return <h1>{t('nav.home')}</h1>;
}
```

### Server Components
For server components, use `getTranslations`:

```tsx
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params: { locale } }) {
  const t = await getTranslations({ locale, namespace: 'metadata' });
  
  return {
    title: t('home.title')
  };
}
```

### Rich Text with HTML
For content with HTML/components, use the `Trans` component:

```tsx
import { Trans } from 'next-intl';

<Trans 
  i18nKey="hero.cta" 
  components={{ 
    strong: <strong className="font-bold" />,
    link: <Link href="/contact" />
  }} 
/>
```

### Language Detection
1. **URL path** (preferred): `/en/about`, `/nl/about`
2. **Cookie**: `NEXT_LOCALE` cookie
3. **Accept-Language header**: Browser preference

### Development

**Check for hardcoded strings:**
```bash
npm run check-i18n
```

**Add new namespace:**
1. Create `messages/en/namespace.json` and `messages/nl/namespace.json`
2. Use with: `const t = useTranslations('namespace');`

### File Structure
```
messages/
  en.json          # English translations
  nl.json          # Dutch translations
i18n.ts            # next-intl configuration
middleware.ts      # Locale routing middleware
```