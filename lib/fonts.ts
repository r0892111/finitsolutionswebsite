/**
 * De twee lettertypes van de nieuwe huisstijl: Bricolage Grotesque voor koppen
 * en prijzen (karakter), Schibsted Grotesk voor lopende tekst en knoppen
 * (rustig, goed leesbaar). next/font slaat ze bij de build lokaal op, dus geen
 * extern font-verzoek in de browser.
 *
 * Ze stonden eerst alleen in app/(home)/layout.tsx, waardoor pagina's in een
 * andere route-groep — zoals /bedankt — de variabelen niet kregen en op een
 * systeemfont terugvielen. De variabelen worden nu in de root-layout gezet;
 * de `hp`-klasse bepaalt nog steeds wáár ze ook echt gebruikt worden.
 */
import { Bricolage_Grotesque, Schibsted_Grotesk } from 'next/font/google';

export const bricolage = Bricolage_Grotesque({
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
  axes: ['opsz'],
  variable: '--font-bricolage',
});

export const schibsted = Schibsted_Grotesk({
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
  variable: '--font-schibsted',
});
