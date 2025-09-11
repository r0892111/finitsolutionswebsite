"use client";

import { useConsent } from '@/contexts/consent-context';
import { useLanguage } from '@/contexts/language-context';

export function CookieSettingsLink() {
  const { openSettings } = useConsent();
  const { t } = useLanguage();

  return (
    <button
      onClick={openSettings}
      className="text-xs text-muted-foreground hover:text-primary transition-colors underline"
      aria-label="Cookie-instellingen openen"
    >
      {t('footer.cookie.settings')}
    </button>
  );
}