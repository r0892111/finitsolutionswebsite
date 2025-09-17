import type { Metadata } from 'next';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { GADebug } from '@/components/ga-debug';
import { Toaster } from '@/components/ui/toaster';
import { ConsentProvider } from '@/contexts/consent-context';
import { CookieBanner } from '@/components/cookie-banner';
import { CookieSettingsModal } from '@/components/cookie-settings-modal';
import {NextIntlClientProvider} from 'next-intl';
import {getMessages, getTranslations} from 'next-intl/server';
import {notFound} from 'next/navigation';

export async function generateMetadata({
  params: {locale}
}: {
  params: {locale: string};
}): Promise<Metadata> {
  const t = await getTranslations({locale, namespace: 'metadata'});
  
  return {
    title: t('home.title'),
    description: t('home.description'),
    openGraph: {
      title: t('home.title'),
      description: t('home.description'),
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
      locale: locale === 'nl' ? 'nl_BE' : 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: t('home.title'),
      description: t('home.description'),
      images: ['/Finit Logomark@4x.png'],
      creator: '@finitsolutions',
    },
  };
}

export default async function RootLayout({
  children,
  params: {locale}
}: {
  children: React.ReactNode;
  params: {locale: string};
}) {
  // Validate locale
  if (locale !== 'en' && locale !== 'nl') {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
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
  );
}