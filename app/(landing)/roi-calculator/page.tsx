import { Metadata } from 'next';
import { ROICalculatorLanding } from '@/components/landing/roi-calculator-landing';

export const metadata: Metadata = {
  title: 'ROI Calculator | Finit Solutions - Bereken Je Besparing',
  description: 'Bereken hoeveel tijd en geld AI-automatisering jouw bedrijf bespaart. Interactieve ROI calculator voor KMO-ondernemers.',
  openGraph: {
    title: 'ROI Calculator | Finit Solutions',
    description: 'Wat kost jouw administratie je echt? Bereken je besparing met onze gratis ROI calculator.',
    url: 'https://finitsolutions.be/roi-calculator',
    siteName: 'Finit Solutions',
    locale: 'nl_BE',
    type: 'website',
  },
};

export default function ROICalculatorPage() {
  return <ROICalculatorLanding />;
}
