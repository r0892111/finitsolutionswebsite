import { Hero } from '@/components/hero';
import { About } from '@/components/about';
import { Contact } from '@/components/contact';
import { CTA } from '@/components/cta';
import { locales } from '@/i18n';

// Required for static export with dynamic routes
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