import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Algemene Voorwaarden | Finit Solutions',
  description: 'De algemene voorwaarden van Finit Solutions. Lees onze voorwaarden voor dienstverlening, aansprakelijkheid en samenwerking.',
};

export default function AlgemeneVoorwaardenLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
