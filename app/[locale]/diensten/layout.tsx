import { Metadata } from "next";
import {getTranslations} from 'next-intl/server';

export async function generateMetadata({
  params: {locale}
}: {
  params: {locale: string};
}): Promise<Metadata> {
  const t = await getTranslations({locale, namespace: 'metadata'});
  
  return {
    title: t('diensten.title'),
    description: t('diensten.description'),
    keywords: 'maatwerk, software ontwikkeling, proces, automatisering, digitale transformatie, Finit Solutions',
    openGraph: {
      title: t('diensten.title'),
      description: t('diensten.description'),
      type: 'website',
      images: [
        {
          url: '/logo-blue-yellow.png',
          width: 1200,
          height: 630,
          alt: 'Finit Solutions Diensten',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('diensten.title'),
      description: t('diensten.description'),
      images: ['/logo-blue-yellow.png'],
    },
  };
}

export default function DienstenLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}