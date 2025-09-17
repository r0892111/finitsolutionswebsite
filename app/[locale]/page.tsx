import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { Contact } from "@/components/contact";
import { CTA } from "@/components/cta";
import { Metadata } from "next";
import { getTranslations } from 'next-intl/server';

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'nl' }];
}

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations('meta');
  
  return {
    title: t('title'),
    description: t('description'),
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