import type { Metadata } from 'next';

import { HUB } from '@/components/hub/copy';

// Gedeeld door /hub/ en /hub/resources/. Shadowboys heeft geen titel, omschrijving
// of deelbeeld; wij wel, zodat een gedeelde link op WhatsApp of LinkedIn er goed uitziet.
const BEELD = { url: '/hub/og-hub.jpg', width: 1200, height: 630, alt: 'Alex van Finit Solutions' };

export function hubMetadata(titel: string, beschrijving: string, pad: string): Metadata {
  return {
    title: titel,
    description: beschrijving,
    alternates: { canonical: pad },
    openGraph: {
      title: `${titel} | Finit Solutions`,
      description: beschrijving,
      url: pad,
      siteName: 'Finit Solutions',
      locale: 'nl_BE',
      type: 'website',
      images: [BEELD],
    },
    twitter: { card: 'summary_large_image', title: `${titel} | Finit Solutions`, description: beschrijving, images: [BEELD.url] },
  };
}

export const HUB_META = {
  hub: hubMetadata(HUB.metaTitel, HUB.metaBeschrijving, '/hub/'),
  resources: hubMetadata(HUB.metaTitelResources, HUB.metaBeschrijvingResources, '/hub/resources/'),
};
