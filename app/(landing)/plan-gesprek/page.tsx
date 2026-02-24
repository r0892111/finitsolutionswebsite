import { Metadata } from 'next';
import { DirectBookingLanding } from '@/components/landing/direct-booking-landing';

export const metadata: Metadata = {
  title: 'Plan Je Gratis Gesprek | Finit Solutions - AI Automatisering',
  description:
    '30 minuten die je bedrijf kunnen veranderen. Plan een vrijblijvend gesprek en ontdek hoe AI-automatisering jouw processen kan transformeren.',
  openGraph: {
    title: 'Plan Je Gratis Gesprek | Finit Solutions',
    description:
      'Plan een vrijblijvend gesprek van 30 minuten. Ontdek hoe AI jouw bedrijfsprocessen kan automatiseren.',
    url: 'https://finitsolutions.be/plan-gesprek',
    siteName: 'Finit Solutions',
    locale: 'nl_BE',
    type: 'website',
  },
};

export default function PlanGesprekPage() {
  return <DirectBookingLanding />;
}
