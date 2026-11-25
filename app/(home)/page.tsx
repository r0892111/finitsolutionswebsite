import { Metadata } from "next";
import { HomePagina } from "@/components/homepage-amina/home-pagina";
import { NL } from "@/components/homepage-amina/copy.nl";
import "@/components/homepage-amina/homepage.css";

// De homepage, Nederlands (standaard). De Engelse versie staat op /en/.
export const metadata: Metadata = {
  title: { absolute: NL.meta.titel },
  description: NL.meta.beschrijving,
  alternates: { canonical: "/", languages: { "nl-BE": "/", en: "/en/", "x-default": "/" } },
  openGraph: { title: NL.meta.titel, description: NL.meta.beschrijving, url: "/", siteName: "Finit Solutions", locale: "nl_BE", type: "website", images: ["/og-image.png"] },
  twitter: { card: "summary_large_image", title: NL.meta.titel, description: NL.meta.beschrijving, images: ["/og-image.png"] },
};

export default function Home() {
  return <HomePagina taal="nl" />;
}
