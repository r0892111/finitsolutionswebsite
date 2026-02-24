import { Metadata } from 'next';
import { CaseStudiesLanding } from '@/components/landing/case-studies-landing';

export const metadata: Metadata = {
  title: 'Succesverhalen | Finit Solutions - AI Automatisering',
  description:
    'Ontdek hoe andere bedrijven tot 72% tijdsbesparing realiseren met AI-automatisering. Echte resultaten, echte bedrijven, echte besparingen.',
  openGraph: {
    title: 'Succesverhalen | Finit Solutions',
    description:
      'Echte resultaten van AI-automatisering: tot 72% minder administratietijd. Bekijk onze case studies.',
    url: 'https://finitsolutions.be/succesverhalen',
    siteName: 'Finit Solutions',
    locale: 'nl_BE',
    type: 'website',
  },
};

export default function SuccessverhalenPage() {
  return <CaseStudiesLanding />;
}
