import { Metadata } from "next";
import { GratisPagina } from "@/components/homepage-amina/gratis-pagina";
import { NL } from "@/components/homepage-amina/copy.nl";
import { HUB } from "@/components/hub/copy";
import "@/components/homepage-amina/homepage.css";

// "Gratis materiaal": de gratis prompts en gidsen op een eigen pagina. Engels: /en/free-resources/.
const beschrijving = HUB.metaBeschrijvingResources;
export const metadata: Metadata = {
  title: { absolute: NL.gratis.metaTitel },
  description: beschrijving,
  alternates: { canonical: "/gratis-materiaal/", languages: { "nl-BE": "/gratis-materiaal/", en: "/en/free-resources/", "x-default": "/gratis-materiaal/" } },
  openGraph: { title: NL.gratis.metaTitel, description: beschrijving, url: "/gratis-materiaal/", siteName: "Finit Solutions", locale: "nl_BE", type: "website", images: ["/og-image.png"] },
  twitter: { card: "summary_large_image", title: NL.gratis.metaTitel, description: beschrijving, images: ["/og-image.png"] },
};

export default function GratisMateriaal() {
  return <GratisPagina taal="nl" />;
}
