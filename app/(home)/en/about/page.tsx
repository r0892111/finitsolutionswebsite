import { Metadata } from "next";
import { OverOnsPagina } from "@/components/homepage-amina/over-ons-pagina";
import { EN } from "@/components/homepage-amina/copy.en";
import "@/components/homepage-amina/homepage.css";

// "About us" in het Engels. Nederlands staat op /over-ons/.
export const metadata: Metadata = {
  title: { absolute: EN.overOns.metaTitel },
  description: EN.overOns.metaBeschrijving,
  alternates: { canonical: "/en/about/", languages: { "nl-BE": "/over-ons/", en: "/en/about/", "x-default": "/over-ons/" } },
  openGraph: { title: EN.overOns.metaTitel, description: EN.overOns.metaBeschrijving, url: "/en/about/", siteName: "Finit Solutions", locale: "en_GB", type: "website", images: ["/og-image.png"] },
};

export default function AboutEn() {
  return <OverOnsPagina taal="en" />;
}
