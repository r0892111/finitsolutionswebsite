import { HomePage } from "@/components/home/home-page";
import { Metadata } from "next";

const TITLE = "Finit Solutions | AI-systemen die 24/7 voor je werken";
const DESCRIPTION =
  "Minder administratie, meer tijd voor je bedrijf. Je leert de AI eerst hoe jouw bedrijf werkt, daarna bouwen wij AI-oplossingen op maat die repetitieve processen automatiseren. Vaste prijzen.";

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
