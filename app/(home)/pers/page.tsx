import type { Metadata } from "next";
import { PERS_PAGINA } from "@/components/pers/copy";
import { PersPagina } from "@/components/pers/pers-pagina";

export const metadata: Metadata = {
  title: PERS_PAGINA.metaTitel,
  description: PERS_PAGINA.metaBeschrijving,
  alternates: { canonical: "/pers" },
  openGraph: { title: `${PERS_PAGINA.metaTitel} | Finit Solutions`, description: PERS_PAGINA.metaBeschrijving, url: "/pers", siteName: "Finit Solutions", locale: "nl_BE", images: ["/og-image.png"] },
  twitter: { card: "summary_large_image", title: `${PERS_PAGINA.metaTitel} | Finit Solutions`, description: PERS_PAGINA.metaBeschrijving },
};

export default function PersPage() {
  return <PersPagina />;
}
