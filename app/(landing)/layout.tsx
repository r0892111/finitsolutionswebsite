import { Metadata } from 'next';

// Alleen nog /bedankt (na het contactformulier): niet in Google. De oude landingspagina's zijn weg (18/11).
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
