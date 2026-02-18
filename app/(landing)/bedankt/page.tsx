import { Metadata } from 'next';
import { ThankYouLanding } from '@/components/landing/thank-you-landing';

export const metadata: Metadata = {
  title: 'Bedankt! Je gesprek is ingepland | Finit Solutions',
  description:
    'Je gesprek met Finit Solutions is ingepland. Check je inbox voor de bevestiging en bereid je voor op het gesprek.',
  openGraph: {
    title: 'Bedankt! Je gesprek is ingepland | Finit Solutions',
    description:
      'Je gesprek met Finit Solutions is ingepland. Check je inbox voor de bevestiging.',
    url: 'https://finitsolutions.be/bedankt',
    siteName: 'Finit Solutions',
    locale: 'nl_BE',
    type: 'website',
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function BedanktPage() {
  return <ThankYouLanding />;
}
