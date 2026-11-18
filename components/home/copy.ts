/**
 * Alle tekst van de homepage staat hier, los van de opmaak.
 *
 * Basis: de opbouw en schrijfstijl van de vorige homepage en de landingspagina's
 * (duidelijk, rechtstreeks, simpel voor niet-technische mensen, resultaatgericht).
 *
 * Aanbod sinds 17 november 2026: de basis is de Company Brain, € 3.250 eenmalig +
 * € 130 per maand excl. btw, nooit los verkocht (altijd minstens één module). Hij
 * begint met een analyseweek bij de klant, na de getekende offerte: dag 1 met de
 * zaakvoerder, dag 2 met de medewerkers, klaar tegen vrijdag. Daarop vaste
 * modules (Mailbox, Offertes, Documentatie, Administratie, en sinds 18/11 ook
 * Gecentraliseerde kennis), te combineren in bundels; de rest is maatwerk met een vooraf bepaalde scope. Elke module plugt in
 * op het brein zonder herwerk. Traject: startgesprek → voorstel en offerte op maat
 * → analyseweek → bouw van de modules → gebruik met maandlicentie.
 * Prijsregel: de Company Brain is de enige prijs op de site, altijd met "minstens
 * één module erbij". Voor de rest: eenmalige kost per module plus een
 * maandlicentie, op maat in de offerte. Geen bedragen voor modules, bundels of
 * maatwerk.
 * De klant heeft een eigen Claude-abonnement en praat vanuit zijn eigen Claude met
 * zijn brein. Finit OS noemen we niet. De klant past het brein niet zelf aan: dat
 * vraagt hij aan ons. Wat de licentie dekt, ligt nog niet vast: we zeggen alleen
 * dat wij het onderhoud en de opvolging doen. Geen VoiceLink (stopgezet), geen
 * webshops. Het brein heet ook je AI-fundament.
 *
 * Review van 13 september 2026 (Karel en Alex, transcript in yap.md): één lijn
 * probleem → oplossing → hoe → knop. Drie herkenpunten met een tekening, dan
 * de pitch van de oplossing, dan de drie stappen als werkwoorden (Opleiden,
 * Bouwen, Gebruiken), geen voorbeelden of cijfers buiten de oplossingen, de
 * cases zijn de meest voorkomende oplossingen (cases.ts), de tweede knop is
 * "Neem contact met ons op" (/contact). De tekst is die van de oorspronkelijke
 * homepage waar hij bleef staan; wat nieuw is, staat hieronder aangeduid met
 * "nieuw (review 13/09)" en lezen de oprichters na. Verder niet in eigen
 * woorden herschrijven.
 */

// Navigatie: dezelfde opbouw en tekst als de vorige homepage.
export const NAV_DESKTOP = [
  { label: "Herken jij dit?", id: "recognition" },
  { label: "Onze aanpak", id: "aanpak" },
  { label: "Oplossingen", id: "cases" },
  { label: "FAQ", id: "faq" },
  { label: "Contact", id: "contact" },
];

export const NAV_MOBIEL = [
  { label: "Home", id: "hero" },
  { label: "Herken jij dit?", id: "recognition" },
  { label: "Onze aanpak", id: "aanpak" },
  { label: "Oplossingen", id: "cases" },
  { label: "FAQ", id: "faq" },
  { label: "Contact", id: "contact" },
];

export const MENU = {
  belTitel: "Bel gerust op",
  uren: "ma-za · 8u30-19u",
  sluiten: "Menu sluiten",
  openen: "Menu openen",
};

// De hoofdknop; gaat naar het formulier op /contact (22/10: was de lesreeks op Skool).
export const CTA_START = "Plan een startgesprek";
// De tweede knop: de contactpagina, voor wie eerst een vraag heeft.
export const CTA_CONTACT = "Neem contact met ons op";

// De lichte kop op de juridische pagina's en de cases.
export const HEADER = {
  terug: "Terug naar de homepage",
};

// 1. Hero (22/10): de belofte van de pitch. Eerst het brein, daarna wat je nodig hebt.
export const HERO = {
  h1: ["Jouw bedrijf,", "klaar voor AI"],
  sub: "In één week analyseren wij je bedrijf en leggen we alles vast in een brein: alle kennis over hoe je werkt, zo gestructureerd dat AI ermee kan werken. Daarop bouwen we de modules die het werk overnemen: je mailbox, je offertes, je documenten, je administratie en je kennis.",
  punten: [
    "Jij vertelt, wij doen het werk. Geen technische kennis nodig.",
    "Eén analyseweek bij jou: dag 1 met jou, dag 2 met je team, klaar tegen vrijdag.",
    "Elke module plugt in op je brein zonder herwerk. Later uitbreiden verandert niets aan wat al draait.",
  ],
  // De tweede knop in de hero: naar de drie stappen.
  tweedeKnop: "Zo werkt het",
  ondersteund: "Ondersteund door",
};

/** Het beeld in de hero: het fundament als structuur van bolletjes en lijnen (les 2.1). */
export const BREIN_3D = {
  aria: "Het AI-fundament van een dienstenbedrijf: pagina's zoals Offertes, Klanten, Planning en Facturatie, met lijnen ertussen voor de verbanden.",
};

export type BreinPagina = { bestand: string; kop: string; regels: string[] };

/**
 * Wat er in elke pagina van het fundament zit. Verschijnt als een tekstbestand
 * als je over een bol in het brein gaat: bestandsnaam, kop, drie of vier regels.
 * De sleutels zijn de labels in brein-3d.tsx. Algemene woorden die voor elk
 * dienstenbedrijf kloppen, geen bouwbedrijf. Nieuw (review 13/09).
 */
export const BREIN_INFO: Record<string, BreinPagina> = {
  "Jouw bedrijf": { bestand: "jouw-bedrijf.md", kop: "De startpagina van je fundament", regels: ["Wat je doet en voor wie", "Hoe je bedrijf geld verdient", "Waar de andere pagina's over gaan"] },
  Sales: { bestand: "sales.md", kop: "Van eerste contact tot ja", regels: ["Waar nieuwe klanten vandaan komen", "Wat je vraagt bij een eerste contact", "Wanneer je opvolgt en hoe"] },
  Offertes: { bestand: "offertes.md", kop: "Hoe een offerte tot stand komt", regels: ["Welke gegevens je eerst nodig hebt", "Hoe je de prijs berekent", "Wie nakijkt voor ze vertrekt", "Wanneer je opvolgt"] },
  Klanten: { bestand: "klanten.md", kop: "Wie je klanten zijn", regels: ["Wat ze al lieten doen", "Hoe je ze aanspreekt", "Wat je over elke klant bijhoudt"] },
  Prijzen: { bestand: "prijzen.md", kop: "Je tarieven en marges", regels: ["Je uurtarief en vaste prijzen", "Kortingsregels", "Wat de AI nooit zelf mag wijzigen"] },
  Planning: { bestand: "planning.md", kop: "Hoe je werk inplant", regels: ["Wie waar kan en wanneer", "Wat voorrang krijgt", "Hoe je een afspraak bevestigt"] },
  Agenda: { bestand: "agenda.md", kop: "Je agenda en de regels", regels: ["Waar je agenda staat", "Wanneer je bereikbaar bent", "Herinneringen en bevestigingen"] },
  Facturatie: { bestand: "facturatie.md", kop: "Wanneer en hoe je factureert", regels: ["Betaaltermijnen", "Wanneer een herinnering vertrekt", "Wat er op een factuur staat"] },
  Boekhouding: { bestand: "boekhouding.md", kop: "Wat je boekhouder nodig heeft", regels: ["Welke stukken, wanneer", "Waar ze staan", "Wie ze aanlevert"] },
  Service: { bestand: "service.md", kop: "Hoe je klanten helpt na de verkoop", regels: ["Welke vragen vaak terugkomen", "Wat je zelf oplost en wat niet", "Hoe snel je antwoordt"] },
  Klachten: { bestand: "klachten.md", kop: "Hoe je een klacht behandelt", regels: ["Hoe je een klacht herkent", "Wie erbij komt", "Wat je de klant belooft"] },
  Mailbox: { bestand: "mailbox.md", kop: "Wat er in je mailbox binnenkomt", regels: ["Welke soorten mails je krijgt", "Wat je meteen beantwoordt", "Wat je doorstuurt en naar wie"] },
  WhatsApp: { bestand: "whatsapp.md", kop: "Wat klanten via WhatsApp sturen", regels: ["Welke vragen je krijgt", "Hoe je antwoordt", "Wanneer een bericht een afspraak wordt"] },
  Leveranciers: { bestand: "leveranciers.md", kop: "Bij wie je bestelt", regels: ["Voorwaarden en levertijden", "Wie je contactpersoon is", "Wat je checkt voor je een datum belooft"] },
  "Wie doet wat": { bestand: "wie-doet-wat.md", kop: "Je team en wie beslist", regels: ["Wie welke taak doet", "Wie wat mag beslissen", "Wanneer de AI iemand inschakelt"] },
  Werkwijze: { bestand: "werkwijze.md", kop: "Hoe jullie werken", regels: ["De vaste stappen per taak", "Je huistaal en toon", "Wat altijd langs jou gaat"] },
};

// De teamfoto op de naad onder de hero. Geen sectiekop en geen "over ons": één statement
// van hooguit acht woorden op de vervaagde linkerhelft, en het citaat van Y Combinator
// over het "company brain" als steun. Nieuw (review 13/09), Karel koos het statement.
//
// Andere kandidaten voor het statement:
//   Straks werkt elk bedrijf met AI. Jij eerst.
//   Elk bedrijf krijgt een AI-brein. Het jouwe ook?
//   Wie nu geen AI-fundament legt, loopt straks achter.
//   Jouw bedrijf, klaar voor AI. In drie stappen.
//   Wij bouwen het AI-brein van jouw bedrijf.
//   Elke KMO krijgt een AI-werknemer. Wanneer de jouwe?
//   Vandaag een AI-fundament, morgen een voorsprong.
//   AI blijft. Wij maken je bedrijf er klaar voor.
//   De grootste verandering sinds internet. Doe je mee?
export const AANPAK_FOTO = {
  statement: "Finit maakt Vlaamse KMO's klaar voor het AI-tijdperk.",
  // Uit "Company Brain", Request for Startups van Y Combinator (zomer 2026, Tom Blomfield).
  // Vóór publicatie letterlijk nakijken op de pagina zelf (de zomerbatch staat achter een tab).
  citaat: {
    tekst: "If we want every company to run on AI automation, we need a new primitive: a company brain.",
    bron: "Tom Blomfield, Y Combinator, Request for Startups 2026",
    url: "https://www.ycombinator.com/rfs#company-brain",
    // Het logo op het kaartje, voor de geloofwaardigheid (14/09).
    logo: "/yc-logo.svg",
    logoNaam: "Y Combinator",
  },
  foto: "/team-start-it-kbc.jpg",
  fotoAlt: "Karel en Jort van Finit Solutions achter hun stand op een beurs.",
};

export type HerkenBeeld = "flessenhals" | "chatgpt" | "beginnen";

// 2. Herken jij dit? Drie punten uit de zes van de copy-logica van Liam (vikingbeast-analyse.md,
// §4.1): elk begint met "Je" en telt een tiental woorden. Elk punt krijgt een tekening
// (illustraties.tsx), om en om links en rechts, daaronder de vraag "Herkenbaar?" met de knop.
// Karel's alternatief voor een vierde: "Je werkt elke dag in je bedrijf, nooit aan je bedrijf."
export const HERKEN = {
  h2: ["Herken jij", "dit?"],
  intro: "We spraken al met meer dan honderd Belgische KMO's. Dit horen we het vaakst.",
  items: [
    { tekst: "Het dagelijkse werk passeert nog steeds langs jou.", beeld: "flessenhals" },
    { tekst: "Je gebruikt AI zoals ChatGPT of Claude, maar het kent jouw bedrijf niet goed genoeg.", beeld: "chatgpt" },
    { tekst: "Je weet dat AI meer werk kan overnemen, maar je weet niet waar te beginnen.", beeld: "beginnen" },
  ] as { tekst: string; beeld: HerkenBeeld }[],
  overgang: "Herkenbaar? Dan zit je hier goed.",
};

// 3. De oplossing, meteen na de herkenning: de pitch in drie zinnen voor wie niet technisch is.
// De titel is die van de vroegere kaart; de pitch is nieuw (review 13/09, Karel en Alex).
export const OPLOSSING = {
  label: "De oplossing",
  titel: "Wij zorgen ervoor dat AI jouw werk overneemt",
  pitch: [
    "Stel je een medewerker voor die je bedrijf even goed kent als jij: je klanten, je prijzen, je manier van werken, tot in detail.",
    "Hij zit in je mailbox, je agenda en je boekhouding, en doet de computertaken die jij vandaag zelf doet, precies zoals jij ze doet.",
    "Dat is je AI-werknemer. Eerst analyseren wij je bedrijf en leggen we alles vast in het brein, daarna bouwen we hem.",
  ],
  illustratieAria: "Eén AI-werknemer, gevoed door je fundament, verbonden met je mailbox, je agenda, je boekhouding en je andere systemen.",
  koppelingen: "We integreren met al je tools",
  koppelingenPlus: "zowat alles wat je al gebruikt",
};

// Het blok na de stappen (17/11, was "Eén partner voor al je IT"): de modules op het brein,
// en maatwerk als laatste. Gecentraliseerde kennis is een module sinds 18/11 (Karel). Geen prijzen.
export type PartnerIcoon = "mailbox" | "offertes" | "documentatie" | "administratie" | "kennis" | "maatwerk";
export const PARTNER = {
  label: "Op je brein",
  titel: "Vijf modules, en maatwerk",
  body: "Elke module plugt in op je brein zonder herwerk. Begin met één en breid later uit: wat al draait, verandert niet.",
  noot: "Modules zijn te combineren in bundels. Per module een eenmalige kost plus een maandlicentie: de details bespreken we in het startgesprek, je krijgt ze op maat in je offerte.",
  items: [
    { icoon: "mailbox", titel: "Mailbox", tekst: "Leest, sorteert en beantwoordt je bedrijfsmail in ieders eigen stijl, en wat niet vanzelf mag vertrekken, blijft een concept." },
    { icoon: "offertes", titel: "Offertes", tekst: "Maakt van een offerteaanvraag een offerte, uit een mail of een opdracht, in je offerteprogramma." },
    { icoon: "documentatie", titel: "Documentatie", tekst: "Houdt je documenten geordend, opgeborgen en opgesteld in één drive: SharePoint, OneDrive of Google Drive." },
    { icoon: "administratie", titel: "Administratie", tekst: "Houdt je mailbox, drive, CRM en boekhouding in sync, zodat niemand nog overtypt." },
    { icoon: "kennis", titel: "Gecentraliseerde kennis", tekst: "Je team vraagt in gewone taal wat er in het brein staat, en krijgt het juiste antwoord met de bron erbij." },
    { icoon: "maatwerk", titel: "Maatwerk", tekst: "Wat geen module dekt, bouwen we op maat, met een scope die we vooraf vastleggen." },
  ] as { icoon: PartnerIcoon; titel: string; tekst: string }[],
};

export type Logo = { naam: string; src: string; woordmerk?: boolean };
// Bekende tools van Belgische KMO's. De tool-*.svg's komen van Simple Icons (CC0), in de kleur van het merk.
export const LOGOS: Logo[] = [
  { naam: "Teamleader", src: "/Teamleader_Icon.svg" },
  { naam: "Odoo", src: "/tool-odoo.svg" },
  { naam: "Outlook", src: "/Microsoft_Office_Outlook_(2018–2024).svg" },
  { naam: "Gmail", src: "/Gmail_icon_(2020).png" },
  { naam: "Excel", src: "/Microsoft_Office_Excel_(2019–2025).svg" },
  { naam: "Microsoft Teams", src: "/Microsoft_Office_Teams_(2019–2025).svg" },
  { naam: "WhatsApp", src: "/tool-whatsapp.svg" },
  { naam: "Google Agenda", src: "/tool-googlecalendar.svg" },
  { naam: "Google Drive", src: "/tool-googledrive.svg" },
  { naam: "HubSpot", src: "/tool-hubspot.svg" },
  { naam: "Pipedrive", src: "/Pipedrive_id-7ejZnwv_0.svg" },
  { naam: "Stripe", src: "/Stripe_Logo,_revised_2016.svg.webp", woordmerk: true },
  { naam: "Notion", src: "/tool-notion.svg" },
];

export type Stap = {
  /** "Stap 1", "Stap 2", "Stap 3": het is een traject, geen keuze. */
  stapLabel: string;
  tijd: string;
  wie: string;
  /** Company Brain, Bouwen, Gebruiken. */
  titel: string;
  intro: string;
  /** Kop boven de vinkjes. Het paneel van stap 1 leest zo als twee blokken: wat je krijgt, en waarom en hoe. */
  puntenTitel?: string;
  /** Wat je eruit haalt, als vinkjes bovenaan het paneel. Alleen bij stap 1. */
  punten?: string[];
  prijsLabel?: string;
  /** Klein woordje voor het bedrag, bv. "vanaf". */
  prijsPrefix?: string;
  prijs?: string;
  /** Klein woordje na het bedrag, bv. "per maand". */
  prijsSub?: string;
  /** Doorstreepte prijs naast de actieprijs, bv. de prijs na de eerste 20 deelnemers. */
  prijsOud?: string;
  cta?: string;
  ctaNoot?: string;
};

// 4. Hoe werken we samen: de drie stappen van het traject, in volgorde (17/11). Het traject is
// startgesprek → voorstel en offerte op maat → analyseweek → bouw van de modules → gebruik met
// maandlicentie; de eerste drie staan in stap 1. Stap 1 is de Company Brain, de enige prijs op de
// site, altijd met minstens één module erbij. Stap 2 en 3 hebben geen bedrag: eenmalige kost per
// module plus een maandlicentie, op maat in de offerte. Geen voorbeelden hier: die staan bij de
// oplossingen.
export const HOE = {
  h2: ["Hoe werken we", "samen?"],
  meer: "Meer over deze stap",
  minder: "Sluiten",
  // Onderaan het paneel: door naar de volgende stap, of terug.
  paneel: { vorige: "Vorige", volgende: "Volgende" },
  intro: "Drie stappen, in deze volgorde. Eerst analyseren wij je bedrijf, daarna bouwen we de modules die je kiest.",
  slotVraag: "Vragen over de aanpak?",
  stappen: [
    {
      stapLabel: "Stap 1",
      tijd: "1 week",
      wie: "Wij, met jou",
      titel: "Company Brain",
      intro: "Jij vertelt hoe je bedrijf draait. Wij leggen alles vast in één brein, waar elke AI-werknemer uit put.",
      puntenTitel: "Wat je krijgt",
      punten: [
        "Het brein van je bedrijf, de basis voor elke module die we daarna bouwen",
        "Een analyseweek bij jou: dag 1 met jou, dag 2 met je team, klaar tegen vrijdag",
        "Altijd samen met minstens één module",
      ],
      prijsLabel: "Prijs",
      prijs: "€ 3.250",
      prijsSub: "eenmalig + € 130 per maand, excl. btw",
      cta: CTA_START,
      ctaNoot: "Een halfuur, vrijblijvend.",
    },
    {
      stapLabel: "Stap 2",
      tijd: "module per module",
      wie: "Wij",
      titel: "Bouwen",
      intro: "Wij bouwen de modules uit je offerte: Mailbox, Offertes, Documentatie, Administratie of Gecentraliseerde kennis, en maatwerk waar geen module past.",
    },
    {
      stapLabel: "Stap 3",
      tijd: "24/7 actief",
      wie: "Je AI-werknemer",
      titel: "Gebruiken",
      intro: "Alles draait op de achtergrond, met een maandlicentie. Wij doen het onderhoud en de opvolging.",
    },
  ] as Stap[],
  // Stap 1: van startgesprek tot je brein, met de analyseweek (17/11). De analyse start pas na de
  // getekende offerte. `eerlijk` zegt hoe je met het brein werkt.
  setup: {
    h3: "Zo verloopt de analyseweek",
    kort: "Jij vertelt, wij doen het werk. Je team hoeft niets te installeren.",
    weken: [
      { titel: "Vooraf: startgesprek en offerte", tekst: "In het startgesprek bekijken we hoe je bedrijf werkt. Daarna krijg je een voorstel en een offerte op maat. De analyseweek start zodra je offerte getekend is." },
      { titel: "Dag 1: vertellen", tekst: "Een dag met jou als zaakvoerder, bij jou: hoe je geld verdient, wie wat doet, en waar het knelt." },
      { titel: "Dag 2: je team", tekst: "Een dag met de mensen die het werk doen: wat ze doen, hoe ze het doen, en waar ze tijd verliezen." },
      { titel: "Vrijdag: je brein staat klaar", tekst: "We verwerken alles wat we hoorden en leggen het vast in het brein van je bedrijf. Tegen vrijdag is het klaar, en kunnen we de modules erop bouwen." },
    ],
    eerlijk: "Het brein is de basis waarop elke module draait. Vanuit je eigen Claude praat je ermee; daarvoor heb je een eigen Claude-abonnement nodig. Wil je iets aanpassen, dan vraag je het ons.",
  },
  // Stap 2: het technische werk, in volgorde. Geen bedragen: de details bespreken we in het startgesprek.
  bouw: {
    h3: "Daarna bouwen wij je modules",
    kort: "Je brein staat er. Vanaf hier nemen wij het technische werk over.",
    intro: "Je kunt klein beginnen, met één module die het meeste tijd vrijmaakt. Of groter: modules gecombineerd in een bundel, en maatwerk waar geen module past. Elke module plugt in op hetzelfde brein, zonder herwerk.",
    volgorde: [
      { titel: "Bouwen, koppelen, testen", tekst: "Wij bouwen en koppelen alles aan de programma's die je al gebruikt. We testen tot het werk gebeurt zoals jij het zou doen." },
      { titel: "Veilig live", tekst: "Alles gaat aan de slag. Je gegevens blijven afgeschermd, en met één knop zet je alles stil." },
    ],
  },
  // Wat je vanaf nu hebt (17/11). Wat de licentie precies dekt, ligt nog niet vast: alleen dat wij
  // het onderhoud en de opvolging doen. Backups, voorrang, het strategiegesprek en de nazorgweken zijn weg (18/11).
  onderhoud: {
    h3: "Wat je vanaf nu hebt",
    kort: "Je modules werken nu voor je. Wij zorgen dat ze blijven werken.",
    punten: [
      { titel: "Live en aan het werk", body: "Je modules doen hun werk op de achtergrond, in de programma's die je al gebruikt." },
      { titel: "Onderhoud en opvolging", body: "Die doen wij. Loopt er iets mis, dan zien wij dat meestal voor jij het merkt." },
      { titel: "Aanpassen via ons", body: "Wil je iets anders aan je brein of je modules, dan vraag je het ons en passen wij het aan." },
      { titel: "Uitbreiden zonder herwerk", body: "Een nieuwe module plugt in op hetzelfde brein. Wat al draait, verandert niet." },
    ],
  },
};

// 5. De oplossingen die we het vaakst bouwen: geen klantcases met cijfers (die referenties zijn er
// nog niet), wel de generieke oplossingen die elk bedrijf herkent. De data staat in cases.ts,
// elke oplossing is uitgeschreven op /cases#<slug>. De quote van Bas komt van de landingspagina's.
// Nieuw (review 13/09).
export const CASES = {
  h2: ["Wat we het vaakst", "bouwen"],
  lees: "Lees hoe het werkt",
  allesBekijken: "Bekijk alle oplossingen",
  quote: "Snelle oplevering, sympathieke gasten. Ik wist niet dat AI vandaag al zoveel werk kon overnemen!",
  naam: "Bas, PRS Rotselaar",
  foto: "/papa foto.jpg",
  // De pagina /cases: alle oplossingen onder elkaar, volledig uitgeschreven.
  pagina: {
    metaTitel: "De oplossingen die we het vaakst bouwen",
    metaBeschrijving: "De oplossingen die vandaag het vaakst gebouwd worden in KMO's, met de systemen die je al gebruikt: offertes, klantencontact, planning, facturatie en meer. Per oplossing hoe het vandaag gaat en wat je AI-werknemer overneemt.",
    h1: ["Wat we het vaakst", "bouwen"],
    intro: "Dit zijn de oplossingen die vandaag het vaakst gebouwd worden in KMO's, met de systemen die je al gebruikt.",
  },
  detail: {
    kruimel: "Oplossingen",
    vandaag: "Vandaag",
    metAI: "Met je AI-werknemer",
    jij: "Wat jij nog doet",
    gekoppeld: "Gekoppeld aan",
    module: "Module",
    // Bij de demo per oplossing op /cases (case-demo.tsx).
    demo: "Aan het werk",
  },
};

export type FaqBlok =
  | { t: "p"; tekst: string }
  | { t: "h"; tekst: string }
  | { t: "res"; tekst: string }
  | { t: "list"; items: string[] }
  | { t: "link"; tekst: string; href: string };
export type FaqItem = { q: string; a: FaqBlok[] };

// 7. Veelgestelde vragen: van veertien naar zeven (review 13/09). De alinea's zijn die van vroeger,
// alleen samengevoegd en zonder cijfers; de vraag over processen verwijst naar de oplossingen.
export const VRAGEN: { h2: string; items: FaqItem[] } = {
  h2: "Veelgestelde vragen",
  items: [
    {
      q: "Wat is het brein van je bedrijf precies?",
      a: [
        { t: "p", tekst: "Een map met tekstbestanden over jouw bedrijf, in gewone taal. Elk bestand is één stuk correcte informatie: je processen, welke systemen je gebruikt, wie Dirk is en wat hij doet, wat je aanrekent, je huistaal. Samen vormen ze een zorgvuldig opgebouwde inventaris van je hele bedrijf. We noemen het ook je AI-fundament." },
        { t: "p", tekst: "Waarom zo? Stop je alles in één chat, dan raakt het geheugen van de AI vol en begint hij dingen te vergeten of te verzinnen. Met een fundament zoekt hij, net als in Wikipedia, alleen de pagina op die hij nodig heeft. Zo geeft hij het juiste antwoord, ook als een klant straks vraagt wat een warmtepomp kost." },
      ],
    },
    {
      q: "Wat moet ik zelf doen, en moet ik daar technisch voor zijn?",
      a: [
        { t: "p", tekst: "Vooral vertellen. Jij kent je bedrijf het allerbeste en weet waar je grootste frustraties en tijdvreters zitten. In de analyseweek spreken we op dag 1 met jou en op dag 2 met de mensen die het werk doen. Tegen vrijdag staat je brein klaar." },
        { t: "p", tekst: "Technisch hoef je niet te zijn. Documenten vragen we gericht op, en koppelingen met je systemen maken wij als we de modules bouwen. Wel heb je een eigen Claude-abonnement nodig: vanuit je eigen Claude praat je met je brein. Wil je er iets aan veranderen, dan vraag je het ons en passen wij het aan." },
        { t: "p", tekst: "En je doet het één keer: elke module die we daarna bouwen, plugt in op hetzelfde brein." },
      ],
    },
    {
      q: "Wat kunnen jullie automatiseren, en werkt dat met onze software?",
      a: [
        { t: "p", tekst: "De vuistregel: doet je team het nu handmatig, en volgt het vaste stappen? Dan kunnen wij het overnemen. Bestaat de software nog niet, zoals een klantenportaal of een planningstool, dan bouwen we ze op maat. Zo heb je één partner voor al je IT." },
        { t: "link", tekst: "Bekijk de oplossingen die we het vaakst bouwen", href: "/cases" },
        { t: "p", tekst: "Als je software een API heeft (vrijwel alle moderne systemen sinds 2015), kunnen we het koppelen. Geen API? Dan zoeken we een workaround via e-mail, geëxporteerde bestanden of webhooks. In 95% van de gevallen vinden we een oplossing. Heeft je sectorpakket geen koppeling en geen export, dan zeggen we dat vooraf, voor er een prijs op staat." },
        { t: "p", tekst: "Je hoeft geen nieuwe software aan te schaffen. We werken met wat je al hebt en laten die systemen samenwerken. Onzeker of jullie tools compatibel zijn? Stuur ons de lijst, dan checken we het vooraf, gratis en zonder verplichtingen." },
      ],
    },
    {
      q: "Wat kost dit voor mijn bedrijf?",
      a: [
        { t: "p", tekst: "Je kent elke prijs op voorhand. Geen verrassingen achteraf." },
        { t: "p", tekst: "De Company Brain kost € 3.250 eenmalig en € 130 per maand. Daarvoor analyseren we je bedrijf in één week en leggen we alles vast in het brein. Het brein komt nooit alleen: er komt altijd minstens één module bij." },
        { t: "p", tekst: "Elke module heeft een eenmalige kost en een maandlicentie. De details bespreken we samen in het startgesprek, en je krijgt ze op maat in je offerte. Modules kun je combineren in een bundel. Wat geen module dekt, bouwen we op maat, met een scope die we vooraf vastleggen. Start met de grootste tijdvreter en breid later uit als je de waarde ziet." },
        { t: "p", tekst: "Alle prijzen excl. btw." },
      ],
    },
    {
      q: "Hoe lang duurt het voor de automatisering live staat?",
      a: [
        { t: "p", tekst: "De analyse duurt één week en start zodra je offerte getekend is: dag 1 met jou, dag 2 met je team, en tegen vrijdag staat je brein klaar. Hoe lang het bouwen van je modules duurt, staat in je offerte." },
        { t: "p", tekst: "Minimale onboarding, geen intensieve training. Jouw team hoeft geen technische kennis te hebben. Wat ze wél moeten weten: wat de automatisering doet, wat er automatisch gebeurt (zodat ze geen dubbel werk doen) en waar ze de output zien, bijvoorbeeld een offerte die klaarstaat." },
      ],
    },
    {
      q: "Wat gebeurt er met de gegevens van mijn bedrijf, en wat als er iets misloopt?",
      a: [
        { t: "p", tekst: "Het brein van je bedrijf staat afgeschermd per klant. Alleen wat nodig is om je bedrijf te begrijpen, komt erin." },
        { t: "p", tekst: "Na oplevering laten we je niet in de steek. Elke oplossing bevat ingebouwde monitoring: wij worden onmiddellijk verwittigd als er iets hapert. Het onderhoud en de opvolging doen wij." },
      ],
    },
    {
      q: "Wat gebeurt er als we later willen uitbreiden?",
      a: [
        { t: "p", tekst: "Uitbreiden is makkelijk, en dat adviseren we vaak bewust. Start met één proces dat veel oplevert, breid uit zodra dat draait. Kleiner risico per stap, je team went geleidelijk, en je ziet de winst tussen elke fase." },
        { t: "p", tekst: "Technisch plugt elke module in op je brein zonder herwerk: later uitbreiden verandert niets aan wat al draait. En omdat je brein er al ligt, hoeft niemand je bedrijf opnieuw te analyseren." },
        { t: "p", tekst: "Elke uitbreiding krijgt haar eigen offerte: een eenmalige kost per module plus een maandlicentie. Dat geldt voor een extra module, maar ook voor maatwerk, met een scope die we vooraf vastleggen. Zo weet je altijd vooraf wat het kost." },
      ],
    },
  ],
};

// 8. De contactkaart naast de FAQ en op /contact (22/10): het startgesprek als formulier,
// dan het telefoonnummer. Geen kennismaking meer inplannen. Nieuw (review 13/09); de foto van
// Karel is weg sinds 14/09.
export const SLOT = {
  startTitel: "Plan je startgesprek",
  startTekst: "Een halfuur, vrijblijvend. We bekijken hoe je bedrijf vandaag werkt, met wie we spreken en welke systemen je gebruikt.",
  bel: "Even sparren over AI in jouw bedrijf? Bel gerust.",
  mailLabel: "Of mail naar",
};

// Het korte vraagformulier: lager op de drempel dan een gesprek. Gaat naar de Netlify Function
// met het veld `bericht` erbij, en op de contactkaart ook een telefoonnummer. Alle velden zijn
// verplicht (14/09).
export const VRAAG = {
  titel: "Laat je gegevens achter",
  sub: "We bellen je om een moment te kiezen. Heb je eerst een vraag? Stel ze hier, je krijgt een persoonlijk antwoord.",
  naam: "Naam",
  email: "E-mailadres",
  telefoon: "Telefoonnummer",
  website: "Website van je bedrijf",
  websiteHint: "jouwbedrijf.be",
  bericht: "Waar verlies je tijd, of wat wil je vragen?",
  berichtHint: "Bijvoorbeeld: we verliezen veel tijd aan offertes en werken met Teamleader.",
  knop: "Verstuur",
  bezig: "Versturen…",
  bedankt: "Bedankt, je bericht is aangekomen.",
  bedanktSub: "Je krijgt meestal binnen 24 uur antwoord.",
  fout: "Het versturen lukte niet. Probeer het opnieuw of mail ons op {email}.",
  privacy: "We gebruiken je gegevens alleen om te antwoorden.",
};

// De pagina /contact: waar "Neem contact met ons op" naartoe gaat. Nieuw (review 13/09).
export const CONTACT = {
  metaTitel: "Contact",
  metaBeschrijving: "Plan een startgesprek voor de Company Brain, of stel je vraag over wat we bouwen. Bel, mail of laat je gegevens achter.",
  kruimel: "Contact",
  h1: ["Neem contact", "met ons op"],
  intro: "Plan een startgesprek voor de Company Brain, of stel je vraag over wat we bouwen. Bel, mail of laat hieronder je gegevens achter. Je krijgt meestal binnen 24 uur antwoord.",
};

// De /bedankt-pagina na het formulier. De drie stappen volgen het traject van 17/11:
// startgesprek → voorstel en offerte op maat → analyseweek (Company Brain).
export const BEDANKT = {
  h1: ["Bedankt voor je", "aanvraag"],
  sub: "Je gegevens zijn goed aangekomen. We nemen zo snel mogelijk contact met je op, meestal binnen 24 uur.",
  h2: ["Wat gebeurt er", "nu?"],
  stappen: [
    {
      nummer: "01",
      wie: "Wij",
      tijd: "binnen 24 uur",
      titel: "We nemen contact op",
      body: "Een kort gesprek van een halfuur over hoe je bedrijf vandaag werkt en waar je tijd verliest. Geen verkooppraatje, wel een eerlijke inschatting of wij iets voor je kunnen betekenen.",
    },
    {
      nummer: "02",
      wie: "Wij",
      tijd: "na het gesprek",
      titel: "Je voorstel en offerte",
      body: "Je krijgt een voorstel en een offerte op maat: de Company Brain, met minstens één module erbij.",
    },
    {
      nummer: "03",
      wie: "Wij, met jou",
      tijd: "1 week",
      titel: "We analyseren je bedrijf",
      body: "Na de getekende offerte komen we een week bij je langs: dag 1 met jou, dag 2 met je team. Tegen vrijdag staat het brein van je bedrijf klaar, en bouwen we je modules erop.",
    },
  ],
  // Wat de bezoeker al kan doen terwijl hij wacht (22/10: was de lesreeks starten).
  nu: {
    titel: "Alvast voorbereiden?",
    body: "Maak een lijstje van de programma's die je elke dag gebruikt, en van de taken die het meeste tijd kosten. Dan wordt het eerste gesprek meteen concreet.",
  },
  vragenTitel: "Vragen in de tussentijd?",
  belLabel: "Bel gerust op",
  terug: "Terug naar de homepage",
};

// Footer (vorige homepage, zonder plaatsnaam). Eén telefoonnummer (Karel), zoals in het mobiele menu.
export const FOOTER = {
  slotTitel: "Klaar om je bedrijf te automatiseren?",
  slotTekst: "Begin met de analyse van je bedrijf. Vragen vooraf? Mail of bel ons gerust.",
  contactTitel: "Contact",
  telefoons: [
    { nummer: "+32 495 70 23 14", link: "tel:+32495702314" },
  ],
  links: [
    { label: "Privacybeleid", href: "/privacy" },
    { label: "Cookieverklaring", href: "/cookieverklaring" },
    { label: "Disclaimer", href: "/disclaimer" },
  ],
  cookies: "Cookie-instellingen",
};
