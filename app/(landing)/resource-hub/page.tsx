import { Metadata } from 'next';
import { ResourceHubLanding } from '@/components/landing/resource-hub-landing';

export const metadata: Metadata = {
  title: 'Resource Hub – AI videoreeks | Finit Solutions',
  description:
    'Een korte videoreeks van ongeveer 15 minuten over hoe je AI doordacht inzet binnen je bedrijf, waar de grootste opportuniteiten liggen en wanneer een AI-traject écht de moeite waard is.',
  openGraph: {
    title: 'Resource Hub – AI videoreeks | Finit Solutions',
    description:
      'Korte videoreeks over AI bewust inzetten: waar de opportuniteiten liggen, waarom veel AI-initiatieven mislukken en wanneer een AI-traject de investering waard is.',
    url: 'https://finitsolutions.be/resource-hub',
    siteName: 'Finit Solutions',
    locale: 'nl_BE',
    type: 'website',
  },
};

export default function ResourceHubPage() {
  return <ResourceHubLanding />;
}
