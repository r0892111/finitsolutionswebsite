"use client";

import { useConsent } from '@/contexts/consent-context';
import { useTranslations } from 'next-intl';

export function CookieSettingsLink() {
  const { openSettings } = useConsent();
  const t = useTranslations();

  return (
    <button
      onClick={openSettings}
      className="text-xs text-muted-foreground hover:text-primary transition-colors underline"
      aria-label="Cookie-instellingen openen"
    >
      {t('footer.cookieSettings')}
    </button>
  );
}