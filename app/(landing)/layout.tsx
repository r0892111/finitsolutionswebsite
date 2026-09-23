import { Metadata } from 'next';

// Oude landingspagina's met het vorige aanbod: bereikbaar via link (advertenties), maar niet in Google.
export const metadata: Metadata = {
  robots: {
    index: false,
    follow: true,
  },
};

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
