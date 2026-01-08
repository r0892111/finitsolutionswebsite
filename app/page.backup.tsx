import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { Contact } from "@/components/contact";
import { CTA } from "@/components/cta";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Finit Solutions | Innovatieve Bedrijfsautomatisering',
  description: 'Finit Solutions helpt bedrijven groeien met slimme automatisering, software op maat en innovatieve SaaS-oplossingen. Ontdek hoe wij uw bedrijfsprocessen kunnen optimaliseren.',
};

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