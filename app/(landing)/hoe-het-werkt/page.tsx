import { Metadata } from 'next';
import { ConsiderationLanding } from '@/components/landing/consideration-landing';

export const metadata: Metadata = {
  title: 'Hoe Het Werkt | Finit Solutions - AI Automatisering',
  description: 'AI in je bedrijf betekent niet ChatGPT. Ontdek hoe virtuele medewerkers jouw administratie, offertes en opvolging automatiseren.',
  openGraph: {
    title: 'Hoe Het Werkt | Finit Solutions',
    description: 'Virtuele medewerkers die 24/7 voor je werken. Geen technische kennis nodig. Resultaat in 2-4 weken.',
    url: 'https://finitsolutions.be/hoe-het-werkt',
    siteName: 'Finit Solutions',
    locale: 'nl_BE',
    type: 'website',
  },
};

export default function HoeHetWerktPage() {
  return <ConsiderationLanding />;
}
