import type { Metadata } from "next";
import { CONTACT } from "@/components/home/copy";
import { ContactPagina } from "@/components/home/contact-pagina";

export const metadata: Metadata = {
  title: CONTACT.metaTitel,
  description: CONTACT.metaBeschrijving,
  alternates: { canonical: "/contact" },
  openGraph: { title: `${CONTACT.metaTitel} | Finit Solutions`, description: CONTACT.metaBeschrijving, url: "/contact", siteName: "Finit Solutions", locale: "nl_BE", images: ["/og-image.png"] },
  twitter: { card: "summary_large_image", title: `${CONTACT.metaTitel} | Finit Solutions`, description: CONTACT.metaBeschrijving },
};

export default function ContactPage() {
  return <ContactPagina />;
}
