"use client";

import { useConsent } from '@/contexts/consent-context';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import Link from 'next/link';

export function CookieBanner() {
  const { showBanner, acceptAll, rejectAll, openSettings, closeBanner } = useConsent();

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          {/* Content */}
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

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 lg:flex-shrink-0">
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
  );
}