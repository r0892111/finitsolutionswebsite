import { Metadata } from 'next';
import { AwarenessLanding } from '@/components/landing/awareness-landing';

export const metadata: Metadata = {
  title: 'Herken Jij Dit? | Finit Solutions - AI Automatisering',
  description:
    'De gemiddelde KMO-ondernemer verliest 15 uur per week aan administratie. Ontdek hoe AI-automatisering jouw bedrijf tijd en geld bespaart.',
  openGraph: {
    title: 'Herken Jij Dit? | Finit Solutions',
    description:
      'Verlies je te veel tijd aan administratie? AI-automatisering neemt het over. Plan een gratis gesprek.',
    url: 'https://finitsolutions.be/herken-jij-dit',
    siteName: 'Finit Solutions',
    locale: 'nl_BE',
    type: 'website',
  },
};

export default function HerkenJijDitPage() {
  return <AwarenessLanding />;
}
