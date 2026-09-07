import { HomePage } from "@/components/home/home-page";
import { Metadata } from "next";

const TITLE = "Finit Solutions | Leg jouw AI-fundament";
const DESCRIPTION =
  "AI kan alleen maar wat je hem vertelt. Leg eerst een fundament: alle kennis over jouw bedrijf, zo opgeschreven dat een AI ermee kan werken. Daarna bouwen wij de systemen die het werk overnemen. Prijzen vooraf bekend.";

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
