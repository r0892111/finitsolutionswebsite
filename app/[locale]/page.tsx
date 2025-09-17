// app/[locale]/page.tsx
import { Hero } from '@/components/hero';
import { About } from '@/components/about';
import { Contact } from '@/components/contact';
import { CTA } from '@/components/cta';

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
