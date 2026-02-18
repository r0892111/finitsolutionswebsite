import { Metadata } from 'next';
import { ElektriciensLanding } from '@/components/landing/elektriciens-landing';

export const metadata: Metadata = {
  title: 'Voor Elektriciens | Finit Solutions - AI Automatisering',
  description:
    'Elektriciens: stop met administratie na werkuren. AI-systemen die je offertes automatiseren, klanten laten inplannen en opvolging regelen.',
  openGraph: {
    title: 'Voor Elektriciens | Finit Solutions',
    description:
      'Op locatie en klanten kwijt door trage opvolging? AI-automatisering regelt offertes, planning en opvolging terwijl jij aan het werk bent.',
    url: 'https://finitsolutions.be/voor-elektriciens',
    siteName: 'Finit Solutions',
    locale: 'nl_BE',
    type: 'website',
  },
};

export default function VoorElektriciensPage() {
  return <ElektriciensLanding />;
}
