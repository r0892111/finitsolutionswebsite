/**
 * De twee lettertypes van de nieuwe huisstijl: Bricolage Grotesque voor koppen
 * en prijzen (karakter), Schibsted Grotesk voor lopende tekst en knoppen
 * (rustig, goed leesbaar). De bestanden staan in app/fonts/ en worden met
 * next/font/local geladen: geen verzoek naar Google, niet in de browser en ook niet
 * tijdens de build (tot 26/11/2026 haalde next/font/google ze bij elke build op, en
 * mislukte de build als Google even niet antwoordde).
 *
 * Ze stonden eerst alleen in app/(home)/layout.tsx, waardoor pagina's in een
 * andere route-groep — zoals /bedankt — de variabelen niet kregen en op een
 * systeemfont terugvielen. De variabelen worden nu in de root-layout gezet;
 * de `hp`-klasse bepaalt nog steeds wáár ze ook echt gebruikt worden.
 */
import localFont from 'next/font/local';

// Variabel lettertype met de as voor optische maat (opsz), zoals voorheen bij Google aangevraagd.
export const bricolage = localFont({
  src: '../app/fonts/bricolage-grotesque-latin.woff2',
  weight: '200 800',
  style: 'normal',
  display: 'swap',
  variable: '--font-bricolage',
  declarations: [{ prop: 'font-stretch', value: '100%' }],
});

export const schibsted = localFont({
  src: '../app/fonts/schibsted-grotesk-latin.woff2',
  weight: '400 900',
  style: 'normal',
  display: 'swap',
  variable: '--font-schibsted',
});

// De oudere pagina's: Inter als basisletter, Montserrat 700 voor koppen.
export const inter = localFont({
  src: '../app/fonts/inter-latin.woff2',
  weight: '100 900',
  style: 'normal',
  display: 'swap',
});

export const montserrat = localFont({
  src: '../app/fonts/montserrat-700-latin.woff2',
  weight: '700',
  style: 'normal',
  display: 'swap',
  variable: '--font-montserrat',
});

// "General Sans" van de oudere pagina's is in werkelijkheid Inter in drie gewichten (400, 500, 700).
// Drie aparte gewichten, zoals voorheen: zo kiest de browser voor 600 nog altijd 700.
export const generalSans = localFont({
  src: [
    { path: '../app/fonts/inter-latin.woff2', weight: '400', style: 'normal' },
    { path: '../app/fonts/inter-latin.woff2', weight: '500', style: 'normal' },
    { path: '../app/fonts/inter-latin.woff2', weight: '700', style: 'normal' },
  ],
  display: 'swap',
  variable: '--font-general-sans',
});
