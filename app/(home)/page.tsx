import { HomePage } from "@/components/home/home-page";
import { Metadata } from "next";

const TITLE = "Finit Solutions | Jouw bedrijf, klaar voor AI";
const DESCRIPTION =
  "In één week analyseren wij je bedrijf en leggen we alles vast in een brein. Daarop bouwen we modules die elke dag werk uit je handen nemen: je mailbox, je offertes, je documenten, je administratie en je kennis. Voor Vlaamse KMO's.";

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
