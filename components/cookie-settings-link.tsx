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
      className="text-sm py-2 cursor-pointer underline text-inherit hover:text-white transition-colors"
      aria-label="Cookie-instellingen openen"
    >
      {t('footer.cookie.settings')}
    </button>
  );
}