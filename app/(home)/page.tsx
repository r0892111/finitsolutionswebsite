import { HomePage } from "@/components/home/home-page";
import { Metadata } from "next";

const TITLE = "Finit Solutions | Leer een AI hoe jouw zaak werkt";
const DESCRIPTION =
  "Bouw in een paar avonden zelf een AI die jouw zaak kent. Daarna bouwen wij er systemen op die werk uit je handen nemen. Vaste prijzen, geen IT-kennis nodig.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: { title: TITLE, description: DESCRIPTION, url: "/" },
  twitter: { title: TITLE, description: DESCRIPTION },
};

export default function Home() {
  return <HomePage />;
}
