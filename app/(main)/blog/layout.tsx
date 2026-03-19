import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Blog | Finit Solutions - AI & Automatisering Inzichten',
  description: 'Ontdek artikelen over AI-automatisering, slimme bedrijfsprocessen en digitale transformatie voor KMO\'s. Tips, inzichten en succesverhalen.',
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
