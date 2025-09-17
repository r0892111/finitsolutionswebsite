import type { Metadata } from 'next';
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
import { notFound } from 'next/navigation';
import { locales } from '@/i18n';

// Required for static export with dynamic routes
export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({
    locale: locale,
  }));
}

export async function generateMetadata({
  params
}: {
  params: { locale: string };
}): Promise<Metadata> {
  // Validate locale
  if (!locales.includes(params.locale as any)) {
    notFound();
  }

  const messages = await getMessages();
  const t = (key: string) => {
    const keys = key.split('.');
    let value: any = messages;
    for (const k of keys) value = value?.[k];
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  };

  return {
    title: t('meta.title'),
    description: t('meta.description'),
    metadataBase: new URL('https://finitsolutions.be'),
    icons: {
      icon: '/favicon.ico',
      shortcut: '/Finit Logomark@4x.png',
      apple: '/Finit Logomark@4x.png'
    },
    openGraph: {
      title: t('meta.title'),
      description: t('meta.description'),
      url: 'https://finitsolutions.be',
      siteName: 'Finit Solutions',
      images: [
        { url: '/Finit Logomark@4x.png', width: 1200, height: 1200, alt: 'Finit Solutions Logo' }
      ],
      locale: params.locale === 'nl' ? 'nl_BE' : 'en_US',
      type: 'website'
    }
  };
}

export default async function LocaleLayout({ 
  children, 
  params 
}: { 
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  
  // Validate locale
  if (!locales.includes(params.locale as any)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <>
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
          `
        }}
      />
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
    </>
  );
}