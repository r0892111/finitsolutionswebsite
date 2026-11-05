/**
 * Persartikels over Finit, nieuwste eerst. Een nieuw artikel is één item bovenaan
 * deze lijst; de pagina /pers/ en het persblok op de homepage (het eerste item)
 * passen zich vanzelf aan.
 *
 * Auteursrecht: neem nooit het artikel over. Citeer hooguit twee zinnen letterlijk
 * en link altijd naar het origineel. Een foto uit een artikel alleen met de credit
 * erbij, en pas na toestemming van het medium of de fotograaf.
 */

export interface PersArtikel {
  medium: string;
  titel: string;
  /** yyyy-mm-dd */
  datum: string;
  auteur?: string;
  url: string;
  /** Hooguit twee zinnen, letterlijk uit het artikel. */
  citaat: string;
  citaatVan: string;
  foto?: { src: string; alt: string; credit: string };
}

export const PERS: PersArtikel[] = [
  {
    medium: "HLN",
    titel: "Jonge IT-ondernemers nemen intrek in Vleeshalle: “Bouwen AI-breinen voor bedrijven”",
    datum: "2026-11-05",
    auteur: "Wannes Vansina",
    url: "https://www.hln.be/mechelen/jonge-it-ondernemers-nemen-intrek-in-vleeshalle-bouwen-ai-breinen-voor-bedrijven~a59b8b6b2/",
    citaat:
      "AI kan heel veel repetitief werk overnemen, maar het probleem is dat bedrijfskennis verspreid zit in de hoofden van werknemers en zaakvoerders. Wij analyseren eerst grondig de werking om vervolgens een bedrijfsbrein te bouwen.",
    citaatVan: "Karel Van Ransbeeck en Alex Otten, oprichters",
    foto: {
      src: "/pers/hln-vleeshalle-800.jpg",
      alt: "Het team van Finit Solutions op een balkon in de Vleeshalle, met een Finit-vlag.",
      credit: "Foto: David Legreve / HLN",
    },
  },
];

const MAANDEN = ["januari", "februari", "maart", "april", "mei", "juni", "juli", "augustus", "september", "oktober", "november", "december"];

/** "2026-11-05" wordt "5 november 2026". Zonder Intl, zodat server en browser hetzelfde tonen. */
export function datumNL(iso: string): string {
  const [j, m, d] = iso.split("-").map(Number);
  return `${d} ${MAANDEN[m - 1]} ${j}`;
}
