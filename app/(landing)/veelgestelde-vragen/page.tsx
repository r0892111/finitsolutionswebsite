import { Metadata } from 'next';
import { FAQLanding } from '@/components/landing/faq-landing';

export const metadata: Metadata = {
  title: 'Veelgestelde Vragen | Finit Solutions - AI Automatisering',
  description:
    'Alles wat je wilt weten over AI-automatisering voor je bedrijf. Antwoorden over kosten, implementatie, privacy en meer.',
  openGraph: {
    title: 'Veelgestelde Vragen | Finit Solutions',
    description:
      'Antwoorden op al je vragen over AI-automatisering. Over kosten, ROI, implementatie en privacy.',
    url: 'https://finitsolutions.be/veelgestelde-vragen',
    siteName: 'Finit Solutions',
    locale: 'nl_BE',
    type: 'website',
  },
};

export default function VeelgesteldeVragenPage() {
  return <FAQLanding />;
}
