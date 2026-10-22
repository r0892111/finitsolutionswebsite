import { HomePage } from "@/components/home/home-page";
import { Metadata } from "next";

const TITLE = "Finit Solutions | Jouw bedrijf, klaar voor AI";
const DESCRIPTION =
  "In vier weken bouwen wij het brein van je bedrijf. Daarna bouwen we AI-werknemers, koppelingen, software en websites die elke dag werk uit je handen nemen. Voor Vlaamse KMO's.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: { title: TITLE, description: DESCRIPTION, url: "/", siteName: "Finit Solutions", locale: "nl_BE", type: "website", images: ["/og-image.png"] },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION, images: ["/og-image.png"] },
};

export default function Home() {
  return <HomePage />;
}
