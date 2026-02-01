import './globals.css';
import type { Metadata } from 'next';
import { Inter, Montserrat } from 'next/font/google';
import { GADebug } from '@/components/ga-debug';
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
  title: 'Finit Solutions | Innovatieve Bedrijfsautomatisering',
  description: 'Finit Solutions helpt bedrijven groeien met slimme automatisering, software op maat en innovatieve SaaS-oplossingen. Ontdek hoe wij uw bedrijfsprocessen kunnen optimaliseren.',
  metadataBase: new URL('https://finitsolutions.be'),
  icons: {
    icon: '/Finit Logomark@4x.png',
    shortcut: '/Finit Logomark@4x.png',
    apple: '/Finit Logomark@4x.png'
  },
  openGraph: {
    title: 'Finit Solutions | Innovatieve Bedrijfsautomatisering',
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
    title: 'Finit Solutions | Innovatieve Bedrijfsautomatisering',
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
              })(window,document,'script','dataLayer','GTM-K7R8GGTT');
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
                'wait_for_update': 500
              });
            `,
          }}
        />
        
        {/* Google Analytics (keeping existing for compatibility) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-0ZT5ZRKWLV"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-0ZT5ZRKWLV', {
              page_title: document.title,
              page_location: window.location.href
            });
          `}
        </Script>

        {/* Leadinfo tracking code */}
        <Script
          id="leadinfo-tracking"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(l,e,a,d,i,n,f,o){if(!l[i]){l.GlobalLeadinfoNamespace=l.GlobalLeadinfoNamespace||[];
              l.GlobalLeadinfoNamespace.push(i);l[i]=function(){(l[i].q=l[i].q||[]).push(arguments)};l[i].t=l[i].t||n;
              l[i].q=l[i].q||[];o=e.createElement(a);f=e.getElementsByTagName(a)[0];o.async=1;o.src=d;f.parentNode.insertBefore(o,f);}
              }(window,document,'script','https://cdn.leadinfo.net/ping.js','leadinfo','LI-696FBC0B74395'));
            `,
          }}
        />
      </head>
      <body className={`${inter.className} ${montserrat.variable} ${generalSans.variable}`}>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe 
            src="https://www.googletagmanager.com/ns.html?id=GTM-K7R8GGTT"
            height="0" 
            width="0" 
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        
        <LanguageProvider>
          <AuthProvider>
            <ConsentProvider>
              <GADebug />
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