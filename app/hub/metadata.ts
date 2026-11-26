import type { Metadata } from 'next';

import { HUB } from '@/components/hub/copy';
import { HUB_EN } from '@/components/hub/copy.en';

// Gedeeld door /hub/ en /hub/resources/. Shadowboys heeft geen titel, omschrijving
// of deelbeeld; wij wel, zodat een gedeelde link op WhatsApp of LinkedIn er goed uitziet.
const BEELD = { url: '/hub/og-hub.jpg', width: 1200, height: 630, alt: 'Alex van Finit Solutions' };

// /hub/ en /hub/en/ verwijzen naar elkaar, zodat Google de juiste taal toont.
const TALEN = { 'nl-BE': '/hub/', en: '/hub/en/', 'x-default': '/hub/' };

export function hubMetadata(titel: string, beschrijving: string, pad: string, taal: 'nl' | 'en' = 'nl', metTalen = false): Metadata {
  return {
    title: titel,
    description: beschrijving,
    alternates: { canonical: pad, ...(metTalen ? { languages: TALEN } : {}) },
    openGraph: {
      title: `${titel} | Finit Solutions`,
      description: beschrijving,
      url: pad,
      siteName: 'Finit Solutions',
      locale: taal === 'en' ? 'en_GB' : 'nl_BE',
      type: 'website',
      images: [BEELD],
    },
    twitter: { card: 'summary_large_image', title: `${titel} | Finit Solutions`, description: beschrijving, images: [BEELD.url] },
  };
}

export const HUB_META = {
  hub: hubMetadata(HUB.metaTitel, HUB.metaBeschrijving, '/hub/', 'nl', true),
  hubEn: hubMetadata(HUB_EN.metaTitel, HUB_EN.metaBeschrijving, '/hub/en/', 'en', true),
  resources: hubMetadata(HUB.metaTitelResources, HUB.metaBeschrijvingResources, '/hub/resources/'),
};
