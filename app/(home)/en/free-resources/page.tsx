import { Metadata } from "next";
import { GratisPagina } from "@/components/homepage-amina/gratis-pagina";
import { EN } from "@/components/homepage-amina/copy.en";
import { HUB_EN } from "@/components/hub/copy.en";
import "@/components/homepage-amina/homepage.css";

// "Free resources": the free prompts and guides on their own page. Dutch: /gratis-materiaal/.
const beschrijving = HUB_EN.metaBeschrijvingResources;
export const metadata: Metadata = {
  title: { absolute: EN.gratis.metaTitel },
  description: beschrijving,
  alternates: { canonical: "/en/free-resources/", languages: { "nl-BE": "/gratis-materiaal/", en: "/en/free-resources/", "x-default": "/gratis-materiaal/" } },
  openGraph: { title: EN.gratis.metaTitel, description: beschrijving, url: "/en/free-resources/", siteName: "Finit Solutions", locale: "en_GB", type: "website", images: ["/og-image.png"] },
  twitter: { card: "summary_large_image", title: EN.gratis.metaTitel, description: beschrijving, images: ["/og-image.png"] },
};

export default function FreeResources() {
  return <GratisPagina taal="en" />;
}
