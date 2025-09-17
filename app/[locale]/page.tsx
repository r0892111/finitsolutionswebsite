import { Hero } from '@/components/hero';
import { About } from '@/components/about';
import { Contact } from '@/components/contact';
import { CTA } from '@/components/cta';
import { locales } from '@/i18n';

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
export function generateStaticParams() {
  return locales.map((locale) => ({
    locale: locale,
  }));
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