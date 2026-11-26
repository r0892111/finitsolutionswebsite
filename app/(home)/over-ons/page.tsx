import { Metadata } from "next";
import { OverOnsPagina } from "@/components/homepage-amina/over-ons-pagina";
import { NL } from "@/components/homepage-amina/copy.nl";
import "@/components/homepage-amina/homepage.css";

// "Over ons": de drie oprichters. De Engelse versie staat op /en/about/.
export const metadata: Metadata = {
  title: { absolute: NL.overOns.metaTitel },
  description: NL.overOns.metaBeschrijving,
  alternates: { canonical: "/over-ons/", languages: { "nl-BE": "/over-ons/", en: "/en/about/", "x-default": "/over-ons/" } },
  openGraph: { title: NL.overOns.metaTitel, description: NL.overOns.metaBeschrijving, url: "/over-ons/", siteName: "Finit Solutions", locale: "nl_BE", type: "website", images: ["/og-image.png"] },
};

export default function OverOns() {
  return <OverOnsPagina taal="nl" />;
}
