import { Metadata } from 'next';
import { ThankYouLanding } from '@/components/landing/thank-you-landing';

export const metadata: Metadata = {
  title: 'In orde! | Finit Solutions',
  description:
    'Bedankt voor je bericht. We nemen binnen 24 uur contact met je op.',
  openGraph: {
    title: 'In orde! | Finit Solutions',
    description:
      'Bedankt voor je bericht. We nemen binnen 24 uur contact met je op.',
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
