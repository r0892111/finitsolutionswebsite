"use client";

import { useConsent } from '@/contexts/consent-context';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import Link from 'next/link';

export function CookieBanner() {
  const { showBanner, acceptAll, rejectAll, openSettings, closeBanner } = useConsent();

  if (!showBanner) return null;

  return (
    <>
      {/* Mobile: centered pop-up modal with backdrop */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 lg:hidden">
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/50" />
        {/* Modal */}
        <div className="relative bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Cookies op deze website
          </h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            We gebruiken cookies om onze site goed te laten werken (essentieel) en – mits jouw toestemming – voor statistieken en marketing. Je kan je keuzes later altijd wijzigen.
          </p>
          <Link
            href="/cookieverklaring"
            className="text-sm text-primary hover:underline mt-2 inline-block"
          >
            Lees onze cookieverklaring
          </Link>
          <div className="flex flex-col gap-3 mt-4">
            <Button
              onClick={acceptAll}
              className="bg-primary hover:bg-primary/90 text-white w-full"
            >
              Alles accepteren
            </Button>
            <Button
              variant="outline"
              onClick={openSettings}
              className="border-primary text-primary hover:bg-primary/5 w-full"
            >
              Instellingen
            </Button>
            <Button
              variant="ghost"
              onClick={rejectAll}
              className="text-gray-700 hover:text-gray-900 hover:bg-gray-100 border border-gray-300 w-full"
            >
              Alles weigeren
            </Button>
          </div>
        </div>
      </div>

      {/* Desktop: bottom bar (unchanged) */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg hidden lg:block">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-row items-center justify-between gap-4">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Cookies op deze website
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                We gebruiken cookies om onze site goed te laten werken (essentieel) en – mits jouw toestemming – voor statistieken en marketing. Je kan je keuzes later altijd wijzigen.
              </p>
              <Link
                href="/cookieverklaring"
                className="text-sm text-primary hover:underline mt-2 inline-block"
              >
                Lees onze cookieverklaring
              </Link>
            </div>
            <div className="flex flex-row gap-3 flex-shrink-0">
              <Button
                variant="ghost"
                onClick={rejectAll}
                className="text-gray-700 hover:text-gray-900 hover:bg-gray-100 border border-gray-300"
              >
                Alles weigeren
              </Button>
              <Button
                variant="outline"
                onClick={openSettings}
                className="border-primary text-primary hover:bg-primary/5"
              >
                Instellingen
              </Button>
              <Button
                onClick={acceptAll}
                className="bg-primary hover:bg-primary/90 text-white"
              >
                Alles accepteren
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}