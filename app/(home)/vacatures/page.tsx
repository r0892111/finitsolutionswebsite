import type { Metadata } from "next";
import { VAC } from "@/components/vacatures/copy";
import { VacaturesPagina } from "@/components/vacatures/vacatures-pagina";

export const metadata: Metadata = {
  title: VAC.metaTitel,
  description: VAC.metaBeschrijving,
  alternates: { canonical: "/vacatures" },
  openGraph: { title: `${VAC.metaTitel} | Finit Solutions`, description: VAC.metaBeschrijving, url: "/vacatures", siteName: "Finit Solutions", locale: "nl_BE", images: ["/og-image.png"] },
  twitter: { card: "summary_large_image", title: `${VAC.metaTitel} | Finit Solutions`, description: VAC.metaBeschrijving },
};

export default function VacaturesPage() {
  return <VacaturesPagina />;
}
