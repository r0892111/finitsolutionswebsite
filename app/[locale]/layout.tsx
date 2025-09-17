import '../globals.css';
import type { Metadata } from 'next';
import { Inter, Montserrat } from 'next/font/google';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { GADebug } from '@/components/ga-debug';
import { Toaster } from '@/components/ui/toaster';
import Script from 'next/script';
import { ConsentProvider } from '@/contexts/consent-context';
import { CookieBanner } from '@/components/cookie-banner';
import { CookieSettingsModal } from '@/components/cookie-settings-modal';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

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

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const messages = await getMessages();
  const t = (key: string) => {
    const keys = key.split('.');
    let value: any = messages;
    for (const k of keys) {
      value = value?.[k];
    }
    return value || key;
  };

  return {
    title: t('meta.title'),
    description: t('meta.description'),
    metadataBase: new URL('https://finitsolutions.be'),
    icons: {
      icon: '/Finit Logomark@4x.png',
      shortcut: '/Finit Logomark@4x.png',
      apple: '/Finit Logomark@4x.png'
    },
    openGraph: {
      title: t('meta.title'),
      description: t('meta.description'),
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
      locale: params.locale === 'nl' ? 'nl_BE' : 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: t('meta.title'),
      description: t('meta.description'),
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
}

export default async function LocaleLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const messages = await getMessages();

  return (
    <html lang={locale}>
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
          strategy="lazyOnload"
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
                'wait_for_update': 500
              });
            `,
          }}
        />
        
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-0ZT5ZRKWLV"
          strategy="lazyOnload"
        />
        <Script id="google-analytics" strategy="lazyOnload">
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
        
        <NextIntlClientProvider messages={messages}>
          <ConsentProvider>
            <GADebug />
            <Navbar />
            <main>{children}</main>
            <Footer />
            <CookieBanner />
            <CookieSettingsModal />
            <Toaster />
          </ConsentProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}