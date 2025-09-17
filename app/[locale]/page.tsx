import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { Contact } from "@/components/contact";
import { CTA } from "@/components/cta";
import { Metadata } from "next";
import {getTranslations} from 'next-intl/server';

export async function generateStaticParams() {
  return [
    { locale: 'en' },
    { locale: 'nl' }
  ];
}

export async function generateMetadata({
  params: {locale}
}: {
  params: {locale: string};
}): Promise<Metadata> {
  const t = await getTranslations({locale, namespace: 'metadata'});
  
  return {
    title: t('home.title'),
    description: t('home.description'),
  };
}

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Contact />
      <CTA />
    </>
  );
}