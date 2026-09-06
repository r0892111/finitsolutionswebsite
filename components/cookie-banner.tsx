"use client";

import { useConsent } from '@/contexts/consent-context';
import Link from 'next/link';

export function CookieBanner() {
  const { showBanner, rejectAll, updateChoices } = useConsent();

  if (!showBanner) return null;

  // De banner belooft "geen advertenties, geen doorverkoop", dus zet [Ok]
  // enkel statistieken aan. Marketing- en social-cookies blijven uit tenzij
  // iemand ze zelf aanvinkt via Cookievoorkeuren in de footer.
  const accepteerStatistieken = () =>
    updateChoices(
      { essential: true, statistics: true, marketing: false, social: false },
      'banner'
    );

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 sm:bottom-6 sm:left-auto sm:right-6 sm:max-w-sm">
      <div className="bg-white rounded-2xl shadow-xl border border-[#1A2D63]/10 p-6">
        <p className="font-instrument text-[15px] leading-relaxed text-[#1A2D63] mb-5">
          We gebruiken enkel cookies om te zien welke pagina&apos;s mensen
          lezen. Geen advertenties, geen doorverkoop.
        </p>
        <div className="flex items-center gap-3">
          <button
            onClick={accepteerStatistieken}
            className="px-6 py-2.5 rounded-full bg-[#1A2D63] text-white font-instrument font-medium text-sm hover:bg-[#2A4488] transition-colors"
          >
            Ok
          </button>
          <button
            onClick={rejectAll}
            className="px-6 py-2.5 rounded-full border border-[#1A2D63]/20 text-[#1A2D63] font-instrument font-medium text-sm hover:bg-[#1A2D63]/[0.04] transition-colors"
          >
            Liever niet
          </button>
        </div>
        <Link
          href="/cookieverklaring"
          className="inline-block mt-4 font-instrument text-xs text-[#475D8F]/70 underline underline-offset-2 hover:text-[#1A2D63] transition-colors"
        >
          Cookiebeleid
        </Link>
      </div>
    </div>
  );
}
