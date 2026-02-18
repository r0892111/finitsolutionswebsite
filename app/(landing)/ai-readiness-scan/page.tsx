import { Metadata } from 'next';
import { AIReadinessScanLanding } from '@/components/landing/ai-readiness-scan-landing';

export const metadata: Metadata = {
  title: 'Gratis AI Readiness Scan | Finit Solutions - AI Automatisering',
  description:
    'In 30 minuten weet je precies waar AI jouw bedrijf kan versterken. Gratis, vrijblijvend en zonder technische kennis nodig.',
  openGraph: {
    title: 'Gratis AI Readiness Scan | Finit Solutions',
    description:
      'In 30 minuten weet je precies waar AI jouw bedrijf kan versterken. Plan je gratis AI Readiness Scan.',
    url: 'https://finitsolutions.be/ai-readiness-scan',
    siteName: 'Finit Solutions',
    locale: 'nl_BE',
    type: 'website',
  },
};

export default function AIReadinessScanPage() {
  return <AIReadinessScanLanding />;
}
