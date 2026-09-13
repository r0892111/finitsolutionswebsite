import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Disclaimer | Finit Solutions',
  description: 'Disclaimer van Finit Solutions. Lees onze voorwaarden over het gebruik van deze website en de aansprakelijkheid.',
};

export default function DisclaimerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
