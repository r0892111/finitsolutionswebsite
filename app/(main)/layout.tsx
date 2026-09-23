import { Metadata } from 'next';
import { Footer } from '@/components/footer';

// Oude pagina's (blog, KMO-quiz, voice-to-crm, portal): bereikbaar via link, maar niet in Google.
// oauth-info zet zelf index: true.
export const metadata: Metadata = {
  robots: {
    index: false,
    follow: true,
  },
};

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <main>{children}</main>
      <Footer />
    </>
  );
}

