"use client";

import { useConsent } from '@/contexts/consent-context';

export function CookieSettingsLink() {
  const { openSettings } = useConsent();

  return (
    <button
      onClick={openSettings}
      className="text-xs text-muted-foreground hover:text-primary transition-colors underline"
      aria-label="Cookie-instellingen openen"
    >
      Cookie-instellingen
    </button>
  );
}