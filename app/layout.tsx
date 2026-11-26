import './globals.css';
import type { Metadata, Viewport } from 'next';
import { bricolage, generalSans, inter, montserrat, schibsted } from '@/lib/fonts';

import { Toaster } from '@/components/ui/toaster';
import { ConsentProvider } from '@/contexts/consent-context';
import { CookieBanner } from '@/components/cookie-banner';
import { CookieSettingsModal } from '@/components/cookie-settings-modal';
import { LanguageProvider } from '@/contexts/language-context';
import { AuthProvider } from '@/contexts/auth-context';

const SITE_TITLE = 'Finit Solutions | Jouw bedrijf, klaar voor AI';
const SITE_DESCRIPTION =
  "In vier weken analyseren wij je bedrijf en leggen we alles vast in een brein. Daarna bouwen we AI-werknemers, koppelingen, software en websites die elke dag werk uit je handen nemen. Voor Vlaamse KMO's.";

export const metadata: Metadata = {
  title: {
    default: SITE_TITLE,
    template: '%s | Finit Solutions',
  },
  description: SITE_DESCRIPTION,
  metadataBase: new URL('https://finitsolutions.be'),
  applicationName: 'Finit Solutions',
  // Iconen: echte favicon.ico (16/32/48) + PNG's, Apple-icoon op marineblauw, manifest-iconen 192/512.
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '48x48' },
      { url: '/favicon-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16.png', sizes: '16x16', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
  },
  manifest: '/site.webmanifest',
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: 'https://finitsolutions.be',
    siteName: 'Finit Solutions',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Finit Solutions: leg jouw AI-fundament',
      },
    ],
    locale: 'nl_BE',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ['/og-image.png'],
    creator: '@finitsolutions',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="nl">
      <head>
        {/* Iconen en manifest komen uit `metadata.icons` / `metadata.manifest` hierboven. */}
        <meta name="theme-color" content="#1A2D63" />

        {/* JSON-LD Structured Data for Google Business Profile */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              "name": "Finit Solutions",
              "url": "https://finitsolutions.be",
              "logo": "https://finitsolutions.be/icon-512.png",
              "image": "https://finitsolutions.be/og-image.png",
              "description": SITE_DESCRIPTION,
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Leuven",
                "addressRegion": "Vlaams-Brabant",
                "postalCode": "3000",
                "addressCountry": "BE"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 50.8798,
                "longitude": 4.7005
              },
              "telephone": ["+32 495 702 314", "+32 468 029 945"],
              "email": "contact@finitsolutions.be",
              "vatID": "BE1036433716",
              "foundingDate": "2024",
              "numberOfEmployees": {
                "@type": "QuantitativeValue",
                "minValue": 2,
                "maxValue": 10
              },
              "areaServed": {
                "@type": "Country",
                "name": "Belgium"
              },
              "serviceType": ["Company Brain Setup", "AI-werknemers op maat", "AI-automatisering voor KMO's", "Software en websites op maat"],
              "sameAs": [
                "https://www.linkedin.com/company/finitsolutions/",
                "https://www.instagram.com/finitsolutions/"
              ],
              "openingHoursSpecification": [
                {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                  "opens": "08:30",
                  "closes": "19:00"
                }
              ],
              "priceRange": "€€",
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+32 495 702 314",
                "contactType": "sales",
                "email": "contact@finitsolutions.be",
                "availableLanguage": ["Dutch", "English", "French"]
              }
            }),
          }}
        />

        {/* Google Tag Manager en Leadinfo laden pas na toestemming: zie applyConsentMode in lib/consent.ts
            en ConsentProvider in contexts/consent-context.tsx. Hier staat bewust niets van tracking. */}
      </head>
      <body className={`${inter.className} ${montserrat.variable} ${generalSans.variable} ${schibsted.variable} ${bricolage.variable}`}>
        <LanguageProvider>
          <AuthProvider>
            <ConsentProvider>
              {children}
              <CookieBanner />
              <CookieSettingsModal />
              <Toaster />
            </ConsentProvider>
          </AuthProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}