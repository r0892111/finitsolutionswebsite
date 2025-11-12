import { Metadata } from "next";
import EfficiencyScanLanding from "@/components/efficiency-scan-landing";

export const metadata: Metadata = {
  title: "QAIMO Efficiency Scan – Ontdek het automatiseringspotentieel van jouw KMO",
  description: "Beantwoord een paar korte vragen en krijg een gepersonaliseerd rapport over je efficiëntie, digitalisering en AI-kansen.",
  openGraph: {
    title: "QAIMO Efficiency Scan – Ontdek het automatiseringspotentieel van jouw KMO",
    description: "Beantwoord een paar korte vragen en krijg een gepersonaliseerd rapport over je efficiëntie, digitalisering en AI-kansen.",
    type: "website",
  },
};

export default function EfficiencyScanPage() {
  return <EfficiencyScanLanding />;
}
