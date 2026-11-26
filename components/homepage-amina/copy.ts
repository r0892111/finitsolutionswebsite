/**
 * De vorm van alle tekst op de homepage (branch homepage-amina, 25/11/2026).
 *
 * De tekst zelf staat in ./copy.nl.ts (standaard, finitsolutions.be/) en
 * ./copy.en.ts (finitsolutions.be/en/). Bron: de tab "Hub copy" van Amina in de
 * Google Doc "Upwork scripts" (stand 25/11/2026, na de comments van Alex: de secties
 * 2, 3 en 4 zijn door Amina ingekort en de stappen staan in de juiste volgorde). Het Engels is haar tekst; het
 * Nederlands is de vertaling in de stem van Alex (stemprofiel §13).
 *
 * Regel (Alex, 25/11): alleen de copy van Amina, zoals zij ze bedoelde. Niets
 * erbij schrijven: geen bijschriften, geen tussenkopjes, geen voorbeelden.
 * Wat er wel staat en niet van haar komt, is wat een pagina technisch nodig
 * heeft: de labels van het menu en de footer, de foutmeldingen en de bevestiging
 * van het formulier, de alt-tekst van de foto en de titel voor Google.
 *
 * Tekst aanpassen = alleen copy.nl.ts en copy.en.ts. De pagina volgt vanzelf.
 */

export type Taal = "nl" | "en";

export interface Getuigenis {
  quote: string;
  naam: string;
  bedrijf: string;
}

export interface Copy {
  meta: { titel: string; beschrijving: string };
  nav: {
    links: { id: string; label: string }[];
    /** De aparte pagina "Over ons" (wens Alex 25/11). */
    overOns: string;
    cta: string;
    menuOpenen: string;
    menuSluiten: string;
    taalLabel: string;
  };
  hero: {
    voorWie: string;
    h1: string;
    /** De laatste woorden van de h1: die krijgen de amberkleurige streep van de huisstijl. */
    h1Streep: string;
    h1Vervolg: string;
    sub: string;
    knop: string;
    tweedeLink: string;
    punten: string[];
    ondersteund: string;
  };
  herken: {
    kicker: string;
    h2: string;
    vraag: string;
    /** Alleen de vier titels (Alex, 26/11: met de tekstjes eronder werd het te lang). De tekstjes staan nog in het document van Amina. */
    punten: string[];
    slot: string;
    knop: string;
    kleineLink: string;
  };
  brein: {
    h2: string;
    sub: string;
    alineas: string[];
    verander: { titel: string; tekst: string }[];
    slot: string;
    knop: string;
  };
  werkwijze: {
    h2: string;
    sub: string;
    /** Het woord voor het pilletje op elke kaart: "Stap 1", "Stap 2". */
    stap: string;
    stappen: { titel: string; tekst: string }[];
    knop: string;
  };
  waarom: {
    h2: string;
    sub: string;
    intro: string;
    punten: { titel: string; tekst: string }[];
  };
  bouwen: {
    h2: string;
    sub: string;
    intro: string;
    praktijk: string;
    /** Wat we voor de klant doen. Geen stand van het project: dat hoort niet op een verkoopsite (Alex, 25/11). */
    cases: { sector: string; tekst: string }[];
    /** De logo's zelf staan in home-pagina.tsx (TOOLS): alleen beeld, geen namen ernaast (Alex, 25/11). */
    toolsTitel: string;
    toolsRest: string;
  };
  team: {
    h2: string;
    sub: string;
    intro: string;
    mensen: { naam: string; rol: string; tekst: string }[];
    bel: string;
    belUren: string;
    fotoAlt: string;
  };
  bewijs: {
    h2: string;
    sub: string;
    getuigenissenTitel: string;
    /** Leeg zolang er geen echte getuigenissen zijn die bij het profiel passen. Niets verzinnen. */
    getuigenissen: Getuigenis[];
    ondersteund: string;
    knop: string;
  };
  faq: {
    h2: string;
    sub: string;
    items: { q: string; a: string }[];
    knop: string;
  };
  voorWie: {
    h2: string;
    /** Woordelijk de kaarten van de hub (Alex, 25/11): eerst voor wie wel (groen), dan voor wie niet (rood). */
    wel: { titel: string; items: string[] };
    niet: { titel: string; items: string[] };
  };
  slot: {
    h2: string;
    sub: string;
    kort: string;
    tekst: string;
    formulier: {
      naam: string;
      email: string;
      telefoon: string;
      website: string;
      bericht: string;
      knop: string;
      bezig: string;
      bedankt: string;
      bedanktSub: string;
      fout: string;
    };
  };
  overOns: { metaTitel: string; metaBeschrijving: string };
  footer: {
    /** De link naar de video op /hub. Alleen in het Nederlands: de hub is nog niet vertaald. */
    video?: string;
    links: { label: string; href: string }[];
    cookies: string;
    btw: string;
  };
  plakbalk: string;
}
