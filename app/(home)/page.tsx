import { FinitHome } from "@/components/finit-home";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Finit Solutions | Wij bouwen het AI-brein dat je administratie doet',
  description:
    'Offertes, klachten, planning en facturen die zichzelf afhandelen. Zet je eigen AI-brein op vanaf 295 euro, of laat ons het bouwen. Voor zelfstandigen en KMO\'s in België.',
};

export default function Home() {
  return <FinitHome />;
}
