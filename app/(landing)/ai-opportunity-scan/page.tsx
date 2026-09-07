import { Metadata } from 'next';
import { AiOpportunityScanLanding } from '@/components/landing/ai-opportunity-scan-landing';

export const metadata: Metadata = {
  title: 'Gratis AI Opportunity Scan | Finit Solutions',
  description:
    'Ontdek in een gratis AI Opportunity Scan waar AI vandaag écht waarde kan creëren binnen jouw bedrijf. ±45 minuten, vrijblijvend en met eerlijk advies.',
  openGraph: {
    title: 'Gratis AI Opportunity Scan | Finit Solutions',
    description:
      'Ontdek waar AI vandaag écht waarde kan creëren binnen jouw bedrijf. Gratis, vrijblijvend en met eerlijk advies — ook als AI nog niet de juiste stap is.',
    url: 'https://finitsolutions.be/ai-opportunity-scan',
    siteName: 'Finit Solutions',
    locale: 'nl_BE',
    type: 'website',
  },
};

export default function AiOpportunityScanPage() {
  return <AiOpportunityScanLanding />;
}
