import { Schibsted_Grotesk } from 'next/font/google';

// Eén lettertype voor de hele homepage: koppen, lopende tekst en knoppen.
// next/font slaat het bij de build lokaal op, dus geen extern font-verzoek in de browser.
const schibsted = Schibsted_Grotesk({
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
  variable: '--font-schibsted',
});

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Geen Navbar/Footer van de rest van de site: de homepage brengt zijn eigen mee.
  return <div className={`${schibsted.variable} fs-home`}>{children}</div>;
}
