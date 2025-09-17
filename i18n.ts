import {getRequestConfig} from 'next-intl/server';

const SUPPORTED = ['en', 'nl'] as const;
type SupportedLocale = (typeof SUPPORTED)[number];

export const locales = SUPPORTED;
export const defaultLocale: SupportedLocale = 'en';

export default getRequestConfig(async ({locale}) => {
  // Fallback voor veiligheid als er ooit iets anders wordt doorgegeven
  const active: SupportedLocale = SUPPORTED.includes(locale as SupportedLocale)
    ? (locale as SupportedLocale)
    : defaultLocale;

  const messages = (await import(`./locales/${active}/common.json`)).default;

  return {
    locale: active,
    messages
  };
});
