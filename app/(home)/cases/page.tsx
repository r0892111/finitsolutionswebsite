import type { Metadata } from "next";
import { CASES } from "@/components/home/copy";
import { CasesOverzicht } from "@/components/home/cases-overzicht";

const P = CASES.pagina;

export const metadata: Metadata = {
  title: P.metaTitel,
  description: P.metaBeschrijving,
  alternates: { canonical: "/cases" },
  openGraph: { title: `${P.metaTitel} | Finit Solutions`, description: P.metaBeschrijving, url: "/cases", siteName: "Finit Solutions", locale: "nl_BE", images: ["/og-image.png"] },
  twitter: { card: "summary_large_image", title: `${P.metaTitel} | Finit Solutions`, description: P.metaBeschrijving },
};

export default function CasesPage() {
  return <CasesOverzicht />;
}
