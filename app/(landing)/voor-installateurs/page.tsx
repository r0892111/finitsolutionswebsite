import { Metadata } from 'next';
import { InstallateursLanding } from '@/components/landing/installateurs-landing';

export const metadata: Metadata = {
  title: 'Voor Installateurs | Finit Solutions - AI Automatisering',
  description:
    'Installateurs, loodgieters en elektriciens: stop met administratie na werkuren. AI-systemen die je offertes automatiseren, klanten laten inplannen en opvolging regelen.',
  openGraph: {
    title: 'Voor Installateurs | Finit Solutions',
    description:
      'Op locatie en klanten kwijt door trage opvolging? AI-automatisering regelt offertes, planning en opvolging terwijl jij aan het werk bent.',
    url: 'https://finitsolutions.be/voor-installateurs',
    siteName: 'Finit Solutions',
    locale: 'nl_BE',
    type: 'website',
  },
};

export default function VoorInstallateursPage() {
  return <InstallateursLanding />;
}
