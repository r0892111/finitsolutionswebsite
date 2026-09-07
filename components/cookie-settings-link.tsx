"use client";

import { useConsent } from '@/contexts/consent-context';
import { useLanguage } from '@/contexts/language-context';

export function CookieSettingsLink() {
  const { openSettings } = useConsent();
  const { t } = useLanguage();

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        openSettings();
      }}
      type="button"
      className="text-sm cursor-pointer underline text-inherit hover:text-white transition-colors align-baseline"
      aria-label="Cookie-instellingen openen"
    >
      {t('footer.cookie.settings')}
    </button>
  );
}