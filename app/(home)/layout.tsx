import { Bricolage_Grotesque, Schibsted_Grotesk } from 'next/font/google';

// Twee lettertypes: Bricolage Grotesque voor koppen en prijzen (karakter),
// Schibsted Grotesk voor lopende tekst en knoppen (rustig, goed leesbaar).
// next/font slaat ze bij de build lokaal op, dus geen extern font-verzoek in de browser.
const bricolage = Bricolage_Grotesque({
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
  axes: ['opsz'],
  variable: '--font-bricolage',
});

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
  return <div className={`${schibsted.variable} ${bricolage.variable} hp`}>{children}</div>;
}
