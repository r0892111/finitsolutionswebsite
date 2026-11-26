import { Metadata } from 'next';
import { DirectBookingLanding } from '@/components/landing/direct-booking-landing';

export const metadata: Metadata = {
  title: 'Boek een conversatie',
  description:
    '30 minuten die je bedrijf kunnen veranderen. Boek een conversatie en ontdek hoe AI-automatisering jouw processen kan transformeren.',
  openGraph: {
    title: 'Boek een conversatie | Finit Solutions',
    description:
      'Boek een conversatie van 30 minuten. Ontdek hoe AI jouw bedrijfsprocessen kan automatiseren.',
    url: 'https://finitsolutions.be/plan-gesprek',
    siteName: 'Finit Solutions',
    locale: 'nl_BE',
    type: 'website',
  },
};

export default function PlanGesprekPage() {
  return <DirectBookingLanding />;
}
