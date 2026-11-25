/**
 * De vorm van alle tekst op de homepage (branch homepage-amina, 25/11/2026).
 *
 * De tekst zelf staat in ./copy.nl.ts (standaard, finitsolutions.be/) en
 * ./copy.en.ts (finitsolutions.be/en/). Bron: de tab "Hub copy" van Amina in de
 * Google Doc "Upwork scripts" (24/11/2026). Het Engels is haar tekst; het
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

/** Waar een case staat. De volgorde is ook de volgorde van de vier streepjes op de pagina. */
export type CaseStatus = "voorstel" | "opbouw" | "piloot" | "opgeleverd";

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
    h1Vervolg: string;
    sub: string;
    knop: string;
    tweedeLink: string;
    punten: string[];
    ondersteund: string;
    gesproken: string;
  };
  herken: {
    kicker: string;
    h2: string;
    vraag: string;
    punten: { titel: string; tekst: string }[];
    slot: string;
    knop: string;
    kleineLink: string;
  };
  brein: {
    h2: string;
    sub: string;
    alineas: string[];
    veranderTitel: string;
    verander: { titel: string; tekst: string }[];
    slot: string;
    knop: string;
  };
  werkwijze: {
    h2: string;
    sub: string;
    intro: string;
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
    /** De vijf zinnen van Amina, van eenvoudig naar veel. Geen eigen tussenkopjes. */
    niveaus: string[];
    praktijk: string;
    statusLabel: string;
    statussen: Record<CaseStatus, string>;
    cases: { sector: string; tekst: string; status: CaseStatus; statusNoot?: string }[];
    toolsTitel: string;
    tools: string[];
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
    sub: string;
    niet: { titel: string; items: string[] };
    wel: { titel: string; items: string[] };
    slot: string;
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
    video: string;
    links: { label: string; href: string }[];
    cookies: string;
    btw: string;
  };
  plakbalk: string;
}
