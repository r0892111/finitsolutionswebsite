import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Privacybeleid | Finit Solutions',
  description: 'Het privacybeleid van Finit Solutions. Hoe wij omgaan met jouw persoonsgegevens conform de AVG/GDPR-wetgeving.',
};

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
