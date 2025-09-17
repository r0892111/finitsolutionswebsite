import {getRequestConfig} from 'next-intl/server';

export const locales = ['en', 'nl'] as const;
export const defaultLocale = 'en' as const;

export default getRequestConfig(async ({locale}) => {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as any)) {
    throw new Error(`Invalid locale: ${locale}`);
  }

  return {
    messages: (await import(`./locales/${locale}/common.json`)).default
  };
});