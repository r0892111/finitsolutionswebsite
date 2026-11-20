"use client";

import Link from 'next/link';
import { useConsent } from '@/contexts/consent-context';
import { cn } from '@/lib/utils';

// Weigeren en Accepteren: zelfde maat, zelfde gewicht, één klik.
const CHOICE_BUTTON = 'hp-btn hp-btn--sm flex-1 sm:w-[7.5rem] sm:flex-none';

/**
 * Smalle balk onderaan, geen cookiemuur: de pagina blijft bruikbaar.
 * Verschijnt pas na de eerste scroll of na 10 seconden (zie ConsentProvider).
 */
export function CookieBanner() {
  const { showBanner, acceptAll, rejectAll, openSettings } = useConsent();

  if (!showBanner) return null;

  return (
    <div
      data-cookie-banner
      role="region"
      aria-label="Cookievoorkeuren"
      className={cn(
        'hp fixed inset-x-0 bottom-0 z-50',
        'sm:bottom-5 sm:left-5 sm:right-5 sm:max-w-[720px]',
        'motion-safe:animate-in motion-safe:fade-in-0 motion-safe:slide-in-from-bottom-4 motion-safe:duration-300'
      )}
    >
      <div
        className={cn(
          'border-t border-[#E3E7EF] bg-white px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] shadow-[0_-6px_20px_-12px_rgba(26,45,99,0.25)]',
          'sm:flex sm:items-center sm:gap-5 sm:rounded-2xl sm:border sm:px-5 sm:py-3.5 sm:shadow-[0_14px_36px_-14px_rgba(26,45,99,0.3)]'
        )}
      >
        <p className="text-[0.8125rem] leading-[1.5] text-[#3D4766] sm:flex-1 sm:text-sm">
          We gebruiken cookies voor statistieken en om de site te verbeteren, alleen als je dat goed vindt.{' '}
          <Link
            href="/privacy/"
            className="whitespace-nowrap text-[#1A2D63] underline underline-offset-2 hover:text-[#2A4488]"
          >
            Meer info
          </Link>
        </p>
        <div className="mt-2.5 flex flex-wrap items-center gap-x-2 gap-y-1 sm:mt-0 sm:shrink-0 sm:flex-nowrap">
          <button
            type="button"
            onClick={rejectAll}
            className={cn(CHOICE_BUTTON, 'hp-btn--secondary !border-[#1A2D63]')}
          >
            Weigeren
          </button>
          <button type="button" onClick={acceptAll} className={cn(CHOICE_BUTTON, 'hp-btn--primary')}>
            Accepteren
          </button>
          <button
            type="button"
            onClick={openSettings}
            className="whitespace-nowrap px-1 py-2 text-[0.8125rem] text-[#3D4766] underline underline-offset-2 transition-colors hover:text-[#1A2D63]"
          >
            Instellingen
          </button>
        </div>
      </div>
    </div>
  );
}
