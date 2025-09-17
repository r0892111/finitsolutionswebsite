'use client';

import React, {createContext, useContext} from 'react';
import {useTranslations, useLocale} from 'next-intl';
import {usePathname, useRouter} from 'next/navigation';

export type Language = 'en' | 'nl';

// Leid het juiste values-type af uit next-intl zelf
type TFunc = ReturnType<typeof useTranslations>;
type TValues = Parameters<TFunc>[1];

interface LanguageContextType {
  locale: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, values?: TValues) => string;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

function withTrailingSlash(p: string) {
  return p.endsWith('/') ? p : p + '/';
}

export function LanguageProvider({children}: {children: React.ReactNode}) {
  const tAll = useTranslations();
  const locale = useLocale() as Language;
  const pathname = usePathname();
  const router = useRouter();

  const setLanguage = (lang: Language) => {
    // Onthoud keuze in cookie (optioneel)
    try {
      document.cookie = `NEXT_LOCALE=${lang}; Path=/; Max-Age=31536000`;
    } catch {}

    const current = pathname || '/';
    const parts = current.split('/');
    if (parts[1] === 'en' || parts[1] === 'nl') {
      parts[1] = lang;
      router.push(withTrailingSlash(parts.join('/')));
    } else {
      router.push(withTrailingSlash(`/${lang}${current}`));
    }
  };

  const t = (key: string, values?: TValues) => tAll(key, values);

  return (
    <LanguageContext.Provider value={{locale, setLanguage, t}}>
      {children}
    </LanguageContext.Provider>
  );
}

// Werkt ook zonder Provider; valt dan terug op next-intl hooks
export function useLanguage(): LanguageContextType {
  const ctx = useContext(LanguageContext);
  if (ctx) return ctx;

  const tAll = useTranslations();
  const locale = useLocale() as Language;
  const pathname = usePathname();
  const router = useRouter();

  const setLanguage = (lang: Language) => {
    try {
      document.cookie = `NEXT_LOCALE=${lang}; Path=/; Max-Age=31536000`;
    } catch {}

    const current = pathname || '/';
    const parts = current.split('/');
    if (parts[1] === 'en' || parts[1] === 'nl') {
      parts[1] = lang;
      router.push(withTrailingSlash(parts.join('/')));
    } else {
      router.push(withTrailingSlash(`/${lang}${current}`));
    }
  };

  const t = (key: string, values?: TValues) => tAll(key, values);
  return {locale, setLanguage, t};
}

export default LanguageProvider;
