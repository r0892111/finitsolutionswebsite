import './globals.css';
import type { Metadata, Viewport } from 'next';
import { Inter, Montserrat } from 'next/font/google';

import { Toaster } from '@/components/ui/toaster';
import Script from 'next/script';
import { ConsentProvider } from '@/contexts/consent-context';
import { CookieBanner } from '@/components/cookie-banner';
import { CookieSettingsModal } from '@/components/cookie-settings-modal';
import { LanguageProvider } from '@/contexts/language-context';
import { AuthProvider } from '@/contexts/auth-context';

const inter = Inter({ subsets: ['latin'] });
const montserrat = Montserrat({ 
  subsets: ['latin'],
  weight: ['700'],
  variable: '--font-montserrat',
});

// General Sans font configuration for Finit brand
const generalSans = Inter({ 
  subsets: ['latin'],
  weight: ['400', '500', '700'], // Regular, Medium, Bold
  variable: '--font-general-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Finit Solutions | AI voor KMO's",
  description: 'Finit Solutions helpt bedrijven groeien met slimme automatisering, software op maat en innovatieve SaaS-oplossingen. Ontdek hoe wij uw bedrijfsprocessen kunnen optimaliseren.',
  metadataBase: new URL('https://finitsolutions.be'),
  icons: {
    icon: '/Finit Logomark@4x.png',
    shortcut: '/Finit Logomark@4x.png',
    apple: '/Finit Logomark@4x.png'
  },
  openGraph: {
    title: "Finit Solutions | AI voor KMO's",
    description: 'Finit Solutions helpt bedrijven groeien met slimme automatisering, software op maat en innovatieve SaaS-oplossingen. Ontdek hoe wij uw bedrijfsprocessen kunnen optimaliseren.',
    url: 'https://finitsolutions.be',
    siteName: 'Finit Solutions',
    images: [
      {
        url: '/Finit Logomark@4x.png',
        width: 1200,
        height: 1200,
        alt: 'Finit Solutions Logo',
      },
    ],
    locale: 'nl_BE',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Finit Solutions | AI voor KMO's",
    description: 'Finit Solutions helpt bedrijven groeien met slimme automatisering, software op maat en innovatieve SaaS-oplossingen.',
    images: ['/Finit Logomark@4x.png'],
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
        {/* Comprehensive favicon configuration */}
        <link rel="icon" type="image/png" sizes="32x32" href="/Finit Logomark@4x.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/Finit Logomark@4x.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/Finit Logomark@4x.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#395686" />
        
        {/* Google Tag Manager */}
        <Script
          id="google-tag-manager"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-MQNHSC66');
            `,
          }}
        />
        
        {/* Initialize Consent Mode before GTM */}
        <Script
          id="consent-mode-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('consent', 'default', {
                'ad_storage': 'denied',
                'analytics_storage': 'denied',
                'ad_user_data': 'denied',
                'ad_personalization': 'denied',
                'personalization_storage': 'denied',
                'functionality_storage': 'denied',
                'wait_for_update': 500
              });
              gtag('set', 'url_passthrough', true);
              gtag('set', 'ads_data_redaction', true);
            `,
          }}
        />

        {/* Restore stored consent BEFORE GTM loads - prevents race condition
            where returning visitors are tracked with denied consent while
            React is still hydrating. Content is static trusted strings only. */}
        <Script
          id="consent-restore"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(){
                try {
                  var s = localStorage.getItem('fs_cookie_consent_v1');
                  if (!s) return;
                  var d = JSON.parse(s);
                  if (new Date() > new Date(d.expiry)) return;
                  var c = d.choices;
                  gtag('consent', 'update', {
                    'analytics_storage': c.statistics ? 'granted' : 'denied',
                    'ad_storage': c.marketing ? 'granted' : 'denied',
                    'ad_user_data': c.marketing ? 'granted' : 'denied',
                    'ad_personalization': c.marketing ? 'granted' : 'denied',
                    'personalization_storage': c.social ? 'granted' : 'denied',
                    'functionality_storage': c.social ? 'granted' : 'denied'
                  });
                } catch(e){}
              })();
            `,
          }}
        />
        
        {/* Leadinfo is loaded conditionally by ConsentProvider when analytics consent is granted */}
      </head>
      <body className={`${inter.className} ${montserrat.variable} ${generalSans.variable}`}>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe 
            src="https://www.googletagmanager.com/ns.html?id=GTM-MQNHSC66"
            height="0" 
            width="0" 
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        
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