import { Metadata } from 'next';
import { LoodgietersLanding } from '@/components/landing/loodgieters-landing';

export const metadata: Metadata = {
  title: 'Voor Loodgieters | Finit Solutions - AI Automatisering',
  description:
    'Loodgieters: stop met administratie na werkuren. AI-systemen die je offertes automatiseren, klanten laten inplannen en opvolging regelen.',
  openGraph: {
    title: 'Voor Loodgieters | Finit Solutions',
    description:
      'Op locatie en klanten kwijt door trage opvolging? AI-automatisering regelt offertes, planning en opvolging terwijl jij aan het werk bent.',
    url: 'https://finitsolutions.be/voor-loodgieters',
    siteName: 'Finit Solutions',
    locale: 'nl_BE',
    type: 'website',
  },
};

export default function VoorLoodgietersPage() {
  return <LoodgietersLanding />;
}
