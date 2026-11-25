import { Metadata } from "next";
import { HomePagina } from "@/components/homepage-amina/home-pagina";
import { EN } from "@/components/homepage-amina/copy.en";
import "@/components/homepage-amina/homepage.css";

// De homepage in het Engels. Nederlands (standaard) staat op /.
export const metadata: Metadata = {
  title: { absolute: EN.meta.titel },
  description: EN.meta.beschrijving,
  alternates: { canonical: "/en/", languages: { "nl-BE": "/", en: "/en/", "x-default": "/" } },
  openGraph: { title: EN.meta.titel, description: EN.meta.beschrijving, url: "/en/", siteName: "Finit Solutions", locale: "en_GB", type: "website", images: ["/og-image.png"] },
  twitter: { card: "summary_large_image", title: EN.meta.titel, description: EN.meta.beschrijving, images: ["/og-image.png"] },
};

export default function HomeEn() {
  return <HomePagina taal="en" />;
}
