"use client";

import { useConsent } from '@/contexts/consent-context';
import Link from 'next/link';

export function CookieBanner() {
  const { showBanner, acceptAll, openSettings } = useConsent();

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 sm:bottom-6 sm:left-auto sm:right-6 sm:max-w-sm">
      <div className="bg-white rounded-2xl shadow-xl p-6">
        <h3 className="text-xl font-bold text-[#1C2C55] font-montserrat mb-3">
          Wij gebruiken cookies
        </h3>
        <p className="text-sm text-gray-600 leading-relaxed mb-5">
          Voor een optimale ervaring gebruiken we cookies om onze site en services te verbeteren. Meer
          informatie vind je in onze{' '}
          <Link href="/cookieverklaring" className="underline text-gray-600 hover:text-gray-900">
            Cookie Policy
          </Link>
          .
        </p>
        <div className="flex items-center gap-5">
          <button
            onClick={acceptAll}
            className="px-6 py-2.5 rounded-full border-2 border-[#1C2C55] text-[#1C2C55] font-semibold text-sm hover:bg-[#1C2C55] hover:text-white transition-colors"
          >
            Accepteren
          </button>
          <button
            onClick={openSettings}
            className="text-sm text-gray-400 hover:text-gray-600 transition-colors"
          >
            Voorkeuren
          </button>
        </div>
      </div>
    </div>
  );
}
