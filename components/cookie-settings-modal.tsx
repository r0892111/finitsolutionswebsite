"use client";

import { useState, useEffect } from 'react';
import { useConsent } from '@/contexts/consent-context';
import { ConsentChoices, pushDataLayerEvent } from '@/lib/consent';
import { Switch } from '@/components/ui/switch';
import { X } from 'lucide-react';
import Link from 'next/link';

interface CategoryInfo {
  key: keyof ConsentChoices;
  title: string;
  description: string;
  required: boolean;
}

const categories: CategoryInfo[] = [
  {
    key: 'essential',
    title: 'Essentieel',
    description: 'Deze items zijn nodig om de basisfunctionaliteit van de website mogelijk te maken.',
    required: true,
  },
  {
    key: 'marketing',
    title: 'Marketing',
    description: 'Deze items worden gebruikt om advertenties te leveren die relevanter zijn voor jou en je interesses.',
    required: false,
  },
  {
    key: 'social',
    title: 'Personalisatie',
    description: 'Deze items stellen de website in staat om keuzes die je maakt (zoals je gebruikersnaam, taal of de regio waarin je je bevindt) te onthouden en bieden verbeterde, meer persoonlijke functies.',
    required: false,
  },
  {
    key: 'statistics',
    title: 'Analytics',
    description: 'Deze items helpen de websitebeheerder te begrijpen hoe zijn website presteert, hoe bezoekers met de site omgaan en of er technische problemen kunnen zijn.',
    required: false,
  },
];

export function CookieSettingsModal() {
  const { showSettings, choices, updateChoices, closeSettings } = useConsent();
  const [localChoices, setLocalChoices] = useState<ConsentChoices>(choices);

  useEffect(() => {
    setLocalChoices(choices);
  }, [choices, showSettings]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (showSettings) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [showSettings]);

  const handleToggle = (category: keyof ConsentChoices, value: boolean) => {
    setLocalChoices(prev => ({
      ...prev,
      [category]: value
    }));
  };

  const handleSave = () => {
    updateChoices(localChoices, 'settings');
    pushDataLayerEvent('consent_save_settings', localChoices, 'settings');
  };

  const handleAcceptAll = () => {
    const allAccepted: ConsentChoices = {
      essential: true,
      statistics: true,
      marketing: true,
      social: true,
    };
    setLocalChoices(allAccepted);
    updateChoices(allAccepted, 'settings');
    pushDataLayerEvent('consent_accept_all', allAccepted, 'settings');
  };

  const handleRejectAll = () => {
    const allRejected: ConsentChoices = {
      essential: true,
      statistics: false,
      marketing: false,
      social: false,
    };
    setLocalChoices(allRejected);
    updateChoices(allRejected, 'settings');
    pushDataLayerEvent('consent_reject_all', allRejected, 'settings');
  };

  if (!showSettings) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40"
        onClick={closeSettings}
      />

      {/* Panel — centered card, fits in one mobile viewport */}
      <div className="relative bg-white w-full max-w-md rounded-2xl max-h-[90vh] flex flex-col overflow-hidden">
        <div className="overflow-y-auto flex-1 px-5 pt-5 pb-3 sm:px-6 sm:pt-6 sm:pb-4">
          {/* Header */}
          <div className="flex items-start justify-between mb-3">
            <h2 className="text-xl sm:text-2xl font-bold text-[#1C2C55] font-montserrat">
              Voorkeuren
            </h2>
            <button
              onClick={closeSettings}
              className="text-red-500 hover:text-red-600 transition-colors p-1 -mt-1 -mr-1"
              aria-label="Sluiten"
            >
              <X className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={2.5} />
            </button>
          </div>

          {/* Intro text */}
          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-4">
            Net zoals we jouw bedrijfsprocessen slim automatiseren, gaan we ook zorgvuldig om met jouw gegevens. Bekijk onze{' '}
            <Link href="/privacy" className="underline text-gray-600 hover:text-gray-900">
              Privacy Policy
            </Link>
            {' '}voor meer informatie.
          </p>

          {/* Accept all button */}
          <button
            onClick={handleAcceptAll}
            className="px-5 py-2 rounded-full border-2 border-[#1C2C55] text-[#1C2C55] font-semibold text-sm hover:bg-[#1C2C55] hover:text-white transition-colors mb-4"
          >
            Accepteer alle cookies
          </button>

          {/* Categories */}
          <div className="divide-y divide-gray-200">
            {categories.map((category) => (
              <div key={category.key} className="py-3.5 first:pt-0">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base sm:text-lg font-bold text-[#1C2C55] font-montserrat mb-0.5">
                      {category.title}
                    </h3>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      {category.description}
                    </p>
                  </div>
                  <div className="flex-shrink-0 mt-0.5">
                    {category.required ? (
                      <span className="text-xs sm:text-sm text-gray-500 font-medium whitespace-nowrap">
                        Altijd actief
                      </span>
                    ) : (
                      <Switch
                        checked={localChoices[category.key]}
                        onCheckedChange={(checked) => handleToggle(category.key, checked)}
                        aria-label={`${category.title} toestaan`}
                      />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom buttons - sticky */}
        <div className="flex gap-3 px-5 pb-5 pt-3 sm:px-6 sm:pb-6 border-t border-gray-100">
          <button
            onClick={handleRejectAll}
            className="flex-1 py-2.5 rounded-full border-2 border-gray-300 text-[#1C2C55] font-semibold text-sm hover:bg-gray-50 transition-colors"
          >
            Alles afwijzen
          </button>
          <button
            onClick={handleSave}
            className="flex-1 py-2.5 rounded-full bg-[#1C2C55] text-white font-semibold text-sm hover:bg-[#1C2C55]/90 transition-colors"
          >
            Bevestigen
          </button>
        </div>
      </div>
    </div>
  );
}
