/**
 * Alle tekst van de homepage staat hier, los van de opmaak.
 *
 * Basis: de opbouw en schrijfstijl van de vorige homepage en de landingspagina's
 * (duidelijk, rechtstreeks, simpel voor niet-technische mensen, resultaatgericht).
 *
 * Model sinds 22 oktober 2026 (Alex), bijgesteld na de teammeeting van 26 oktober
 * 2026: de lesreeks is weg. Stap 1 is de Company Brain Setup: wij analyseren in
 * vier weken je bedrijf (week 1 twee uur met de zaakvoerder op locatie, week 2
 * een interviewdag met de medewerkers op locatie, week 3 verwerken en doorvragen,
 * week 4 adviesrapport, roadmap, offerte en eindpresentatie), voor € 3.000 excl.
 * btw. We zeggen "wij analyseren je bedrijf", niet "wij bouwen je brein". De klant
 * krijgt toegang tot het brein via Finit OS (raadplegen en beheren), niet de map
 * zelf. Het rapport met prijzen zit een week voor de eindpresentatie (op locatie,
 * een tot anderhalf uur) in zijn mailbox; de offerte ligt klaar om te tekenen.
 * Mailbox en agenda zijn optioneel; koppelingen zijn projectwerk na de analyse.
 * Nazorg: per opgeleverde oplossing twee weken feedback, daarna twee weken voor het
 * geheel. In de licentie: om de drie maanden een strategiegesprek. Finit is de
 * IT-partner: AI-werknemers, koppelingen, software op maat en websites.
 * Geen prijzen voor wat na de setup komt (dat staat in de offerte), alles draait
 * op onze eigen AI (geen abonnement nodig).
 * Het heet nooit onderhoud, altijd gebruikslicentie. Het brein heet ook je
 * AI-fundament.
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

// Naar de pagina /vacatures (geen sectie op de homepage, dus een gewone link). Nieuw 29/10.
export const NAV_VACATURES = { label: "Vacatures", href: "/vacatures" };

export const NAV_MOBIEL = [
  { label: "Home", id: "hero" },
  { label: "Herken jij dit?", id: "recognition" },
  { label: "Onze aanpak", id: "aanpak" },
  { label: "Oplossingen", id: "cases" },
  { label: "FAQ", id: "faq" },
  { label: "Contact", id: "contact" },
];

export const PRODUCTEN = {
  label: "Producten",
  voicelink: {
    naam: "VoiceLink",
    url: "https://voicelink.me",
    tekst: "Beheer je CRM via WhatsApp. Voeg klantnotities toe, maak taken aan en vraag CRM-informatie op met een spraakbericht.",
  },
};

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
  sub: "In vier weken analyseren wij je bedrijf en leggen we alles vast in een brein: alle kennis over hoe je werkt, zo gestructureerd dat AI ermee kan werken. Daarop bouwen we wat je nodig hebt: AI-werknemers, koppelingen, software en websites.",
  punten: [
    "Jij vertelt, wij doen het werk. Geen technische kennis nodig.",
    "Je weet daarna wat AI eerst kan overnemen, op volgorde van wat het meeste oplevert.",
    "Je eindigt met een adviesrapport, een roadmap en een offerte op maat, gepresenteerd bij jou op locatie.",
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

// Het blok na de stappen (22/10, was de lesreeks op Skool): Finit als IT-partner.
// Wat we bouwen nadat het brein er staat. Geen prijzen.
export type PartnerIcoon = "koppeling" | "automatisatie" | "maatwerk" | "website" | "agent";
export const PARTNER = {
  label: "Na de setup",
  titel: "Eén partner voor al je IT",
  body: "Omdat wij je bedrijf via het brein al kennen, hoef je niets twee keer uit te leggen. Eén aanspreekpunt in plaats van vijf leveranciers.",
  noot: "Wat we bouwen en wat het kost, staat in je offerte. Je zit nergens aan vast.",
  items: [
    { icoon: "koppeling", titel: "Integraties", tekst: "Je boekhouding, CRM, ERP en mail aan elkaar en aan het brein." },
    { icoon: "automatisatie", titel: "Kleine koppelingen", tekst: "Het klik- en overtypwerk dat elke dag terugkomt, weg." },
    { icoon: "maatwerk", titel: "Systemen op maat", tekst: "Een eigen portaal, planningstool of app als niets bestaands past." },
    { icoon: "website", titel: "Websites", tekst: "Een site die klanten binnenhaalt en meteen aan je systemen hangt." },
    { icoon: "agent", titel: "AI-werknemers", tekst: "Ze nemen zelfstandig taken van je team over." },
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
  { naam: "Shopify", src: "/shopify_icon.png" },
  { naam: "WooCommerce", src: "/tool-woocommerce.svg" },
  { naam: "Stripe", src: "/Stripe_Logo,_revised_2016.svg.webp", woordmerk: true },
  { naam: "Notion", src: "/tool-notion.svg" },
];

export type Stap = {
  /** "Stap 1", "Stap 2", "Stap 3": het is een traject, geen keuze. */
  stapLabel: string;
  tijd: string;
  wie: string;
  /** Een werkwoord: Opleiden, Bouwen, Gebruiken. */
  titel: string;
  intro: string;
  /** Kop boven de vinkjes. Het paneel van stap 1 leest zo als twee blokken: wat je krijgt, en waarom en hoe. */
  puntenTitel?: string;
  /** Wat je eruit haalt, als vinkjes bovenaan het paneel. Alleen bij stap 1. */
  punten?: string[];
  prijsLabel?: string;
  /** Klein woordje voor het bedrag, bv. "vanaf": het echte voorstel komt in het strategiegesprek. */
  prijsPrefix?: string;
  prijs?: string;
  /** Klein woordje na het bedrag, bv. "per maand". */
  prijsSub?: string;
  /** Doorstreepte prijs naast de actieprijs, bv. de prijs na de eerste 20 deelnemers. */
  prijsOud?: string;
  cta?: string;
  ctaNoot?: string;
};

// 4. Hoe werken we samen: de drie stappen van het model, in volgorde (22/10).
// Stap 1 is de Company Brain Setup (€ 3.000, vier weken, door ons). Stap 2 en 3 hebben geen prijs:
// wat we bouwen en wat het kost, staat in de offerte na de setup (beslissing Alex, 22/10).
// Geen voorbeelden hier: die staan bij de oplossingen. Alle software blijft van Finit.
export const HOE = {
  h2: ["Hoe werken we", "samen?"],
  meer: "Meer over deze stap",
  minder: "Sluiten",
  // Onderaan het paneel: door naar de volgende stap, of terug.
  paneel: { vorige: "Vorige", volgende: "Volgende" },
  intro: "Drie stappen, in deze volgorde. Eerst analyseren wij je bedrijf, daarna bouwen we alles wat je nodig hebt.",
  slotVraag: "Vragen over de aanpak?",
  stappen: [
    {
      stapLabel: "Stap 1",
      tijd: "4 weken",
      wie: "Wij, met jou",
      titel: "Je bedrijf analyseren",
      intro: "Jij vertelt hoe je bedrijf draait. Wij leggen alles vast en zoeken waar je tijd verliest.",
      puntenTitel: "Wat je krijgt",
      punten: [
        "Toegang tot het brein van je bedrijf via Finit OS, de basis voor alles wat we daarna bouwen",
        "Je knelpunten met een score, en een roadmap: wat eerst, wat later, wat niet",
        "Een adviesrapport met prijzen, een eindpresentatie bij jou op locatie en een offerte voor wat volgt",
      ],
      prijsLabel: "Company Brain Setup",
      prijs: "€ 3.000",
      prijsSub: "excl. btw",
      cta: CTA_START,
      ctaNoot: "Een halfuur, vrijblijvend.",
    },
    {
      stapLabel: "Stap 2",
      tijd: "volgens je roadmap",
      wie: "Wij",
      titel: "Bouwen",
      intro: "Wij bouwen wat jij kiest: AI-werknemers, koppelingen, software op maat of een website.",
    },
    {
      stapLabel: "Stap 3",
      tijd: "24/7 actief",
      wie: "Je AI-werknemer",
      titel: "Gebruiken",
      intro: "Alles draait op de achtergrond. Wij zorgen dat het blijft werken, veilig en up-to-date.",
    },
  ] as Stap[],
  // Stap 1: de vier weken van de setup, zoals in de pitch (Company Brain Pitch, 22/10).
  // `eerlijk` zegt wat het brein na de setup wel en niet is.
  setup: {
    h3: "Zo verlopen de vier weken",
    kort: "Jij vertelt, wij doen het werk. Je team hoeft niets te installeren.",
    weken: [
      { titel: "Week 1: vertellen", tekst: "Eén gesprek van twee uur met jou als zaakvoerder, bij jou op locatie: hoe je geld verdient, wie wat doet, en waar het knelt." },
      { titel: "Week 2: je team", tekst: "Een interviewdag bij jou op locatie met de mensen die het werk doen: wat ze doen, hoe ze het doen, en waar ze tijd verliezen." },
      { titel: "Week 3: verwerken", tekst: "We verwerken alles wat we hoorden en vragen gericht na wat ontbreekt. Elk knelpunt krijgt een score op tijd, geld en ergernis, en per knelpunt zoeken we de beste oplossing." },
      { titel: "Week 4: plannen", tekst: "Je krijgt het adviesrapport met roadmap en prijzen een week vooraf in je mailbox. Daarna presenteren we het bij jou op locatie, in een tot anderhalf uur, met de offerte klaar om te tekenen." },
    ],
    eerlijk: "Het brein is de basis waarop wij bouwen. Jij raadpleegt en beheert het via Finit OS, een omgeving rond je brein.",
  },
  // Stap 2: het technische werk, in volgorde. Geen prijzen (die staan in de offerte).
  bouw: {
    h3: "Daarna bouwen wij wat jij kiest",
    kort: "Je weet nu wat eerst komt. Vanaf hier nemen wij het technische werk over.",
    intro: "Je kunt klein beginnen, met één AI-werknemer die je mailbox sorteert en antwoorden klaarzet. Of groter: koppelingen tussen je systemen, een klantenportaal op maat of een nieuwe website. Alles vertrekt van hetzelfde brein.",
    volgorde: [
      { titel: "Eindpresentatie op locatie", tekst: "Een week vooraf zit het adviesrapport met prijzen in je mailbox. Dan komen we een tot anderhalf uur bij jou langs, overlopen we de roadmap en ligt de offerte klaar om te tekenen. De presentatie zit in de setup, en je zit nergens aan vast." },
      { titel: "Je offerte", tekst: "Per onderdeel zie je wat het bouwen eenmalig kost, en wat het gebruik per maand kost. Wat je niet nodig hebt, laat je weg." },
      { titel: "Bouwen, koppelen, testen", tekst: "Wij bouwen en koppelen alles aan de programma's die je al gebruikt. We testen tot het werk gebeurt zoals jij het zou doen." },
      { titel: "Veilig live", tekst: "Alles gaat aan de slag. Je gegevens blijven afgeschermd, en met één knop zet je alles stil. Per opgeleverde oplossing heb je twee weken om feedback te geven, daarna nog twee weken voor het geheel." },
    ],
  },
  // Wat je vanaf nu hebt. Geen prijs in het paneel; geen cijfers over backup-frequentie of uptime.
  // Finit OS (15/09) is op 18/09 van de site gehaald; "Voorrang bij vragen" (13/09) staat er daarom
  // terug. "Voorrang bij vragen" (13/09, Karel) is nog niet bevestigd in het model; het
  // strategiegesprek is sinds de teammeeting van 26/10 om de drie maanden. Het eigendom is zoals Alex het zei (15/09).
  onderhoud: {
    h3: "Wat je vanaf nu hebt",
    kort: "Je AI-werknemers werken nu voor je. Wij zorgen dat ze blijven werken.",
    punten: [
      { titel: "Live en aan het werk", body: "Je AI-werknemers draaien op onze servers. Jij hoeft niets te installeren of te beheren." },
      { titel: "Bewaakt", body: "Loopt er iets mis, dan zien wij dat meestal voor jij het merkt. Een fout herstellen of een koppeling aanpassen kost je niets." },
      { titel: "Elke maand gecheckt en bijgewerkt", body: "We maken backups en installeren beveiligingsupdates. Komt er een nieuwe AI-verbetering die jou helpt, dan voeren wij die door." },
      { titel: "Voorrang bij vragen", body: "Heb je een vraag of loop je ergens tegenaan, dan helpen we jou eerst." },
      { titel: "Om de drie maanden een strategiegesprek", body: "Om de drie maanden zitten we samen. We bekijken wat je nog kunt laten overnemen, en je krijgt ons advies." }
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
        { t: "p", tekst: "Vooral vertellen. Jij kent je bedrijf het allerbeste en weet waar je grootste frustraties en tijdvreters zitten. In de eerste week spreken we twee uur met jou, in de tweede week een dag met de mensen die het werk doen. Daarna vragen we alleen nog gericht na wat ontbreekt." },
        { t: "p", tekst: "Technisch hoef je niet te zijn. Documenten vragen we gericht op, je mailbox en agenda delen is optioneel, en koppelingen met je systemen maken wij pas als we bouwen. Je hebt geen abonnement van ChatGPT of Claude nodig: alles draait op onze eigen AI." },
        { t: "p", tekst: "En je doet het één keer: alles wat we daarna bouwen, vertrekt van hetzelfde brein." },
      ],
    },
    {
      q: "Wat kunnen jullie automatiseren, en werkt dat met onze software?",
      a: [
        { t: "p", tekst: "De vuistregel: doet je team het nu handmatig, en volgt het vaste stappen? Dan kunnen wij het overnemen. Bestaat de software nog niet, zoals een klantenportaal, een planningstool of een nieuwe website, dan bouwen we ze op maat. Zo heb je één partner voor al je IT." },
        { t: "link", tekst: "Bekijk de oplossingen die we het vaakst bouwen", href: "/cases" },
        { t: "p", tekst: "Als je software een API heeft (vrijwel alle moderne systemen sinds 2015), kunnen we het koppelen. Geen API? Dan zoeken we een workaround via e-mail, geëxporteerde bestanden of webhooks. In 95% van de gevallen vinden we een oplossing. Heeft je sectorpakket geen koppeling en geen export, dan zeggen we dat vooraf, voor er een prijs op staat." },
        { t: "p", tekst: "Je hoeft geen nieuwe software aan te schaffen. We werken met wat je al hebt en laten die systemen samenwerken. Onzeker of jullie tools compatibel zijn? Stuur ons de lijst, dan checken we het vooraf, gratis en zonder verplichtingen." },
      ],
    },
    {
      q: "Wat kost dit voor mijn bedrijf?",
      a: [
        { t: "p", tekst: "Je kent elke prijs op voorhand. Geen verrassingen achteraf." },
        { t: "p", tekst: "De Company Brain Setup kost € 3.000, eenmalig. Daarvoor analyseren we in vier weken je bedrijf. Je krijgt toegang tot het brein van je bedrijf via Finit OS, je knelpunten met een score, een roadmap, het adviesrapport met prijzen, een eindpresentatie bij jou op locatie en een offerte voor wat we daarna bouwen." },
        { t: "p", tekst: "Wat je daarna laat bouwen, kost wat je kiest. Per onderdeel zie je in je offerte een eenmalige opstartkost en een gebruikslicentie per maand. Wat je niet nodig hebt, laat je weg, en je zit nergens aan vast. Start met de grootste tijdvreter en breid later uit als je de waarde ziet." },
        { t: "p", tekst: "Alle prijzen excl. btw." },
      ],
    },
    {
      q: "Hoe lang duurt het voor de automatisering live staat?",
      a: [
        { t: "p", tekst: "De setup duurt vier weken. Daarna hangt het af van wat je kiest: een eerste AI-werknemer staat meestal binnen 2 tot 4 weken live, een systeem op maat of een website duurt langer. De planning staat in je offerte. Na elke oplevering heb je twee weken om feedback te geven, en daarna nog twee weken voor het geheel." },
        { t: "p", tekst: "Minimale onboarding, geen intensieve training. Jouw team hoeft geen technische kennis te hebben. Wat ze wél moeten weten: wat de automatisering doet, wat er automatisch gebeurt (zodat ze geen dubbel werk doen) en waar ze de output zien, bijvoorbeeld een offerte die klaarstaat." },
      ],
    },
    {
      q: "Wat gebeurt er met de gegevens van mijn bedrijf, en wat als er iets misloopt?",
      a: [
        { t: "p", tekst: "Het brein van je bedrijf staat afgeschermd per klant en draait op onze eigen AI, niet via een publieke chatbot. Alleen wat nodig is om je bedrijf te begrijpen, komt erin." },
        { t: "p", tekst: "Na oplevering laten we je niet in de steek. Elke oplossing bevat ingebouwde monitoring: wij worden onmiddellijk verwittigd als er iets hapert. Bug? Gratis. API veranderd? Gratis. Onze verantwoordelijkheid, niet de jouwe. Hosting, bewaking, backups en updates zitten in je gebruikslicentie; je betaalt alleen extra voor uitbreidingen die je later laat bouwen." },
      ],
    },
    {
      q: "Wat gebeurt er als we later willen uitbreiden?",
      a: [
        { t: "p", tekst: "Uitbreiden is makkelijk, en dat adviseren we vaak bewust. Start met één proces dat veel oplevert, breid uit zodra dat draait. Kleiner risico per stap, je team went geleidelijk, en je ziet de winst tussen elke fase." },
        { t: "p", tekst: "Technisch bouwen we modulair op je fundament: een nieuwe automatisering sluit aan op de bestaande. Geen grote herbouw nodig. En omdat je fundament er al ligt, hoeft niemand je bedrijf opnieuw te analyseren." },
        { t: "p", tekst: "Elke uitbreiding krijgt haar eigen offerte: een eenmalige opstartkost en een gebruikslicentie per maand. Dat geldt voor een extra AI-werknemer, maar ook voor een koppeling, een systeem op maat of een website. Zo weet je altijd vooraf wat het kost." },
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

// De band onderaan de homepage, boven de footer, naar /vacatures. Nieuw 29/10 (Alex).
export const VACATURES_BLOK = {
  h2: ["We zoeken", "mensen"],
  tekst: "Werk mee aan content en social media, IT-projectmanagement of software development. Voor stagiairs, jobstudenten, freelancers en agencies.",
  knop: "Bekijk de vacatures",
};

// De pagina /contact: waar "Neem contact met ons op" naartoe gaat. Nieuw (review 13/09).
export const CONTACT = {
  metaTitel: "Contact",
  metaBeschrijving: "Plan een startgesprek voor de Company Brain Setup, of stel je vraag over wat we bouwen. Bel, mail of laat je gegevens achter.",
  kruimel: "Contact",
  h1: ["Neem contact", "met ons op"],
  intro: "Plan een startgesprek voor de Company Brain Setup, of stel je vraag over wat we bouwen. Bel, mail of laat hieronder je gegevens achter. Je krijgt meestal binnen 24 uur antwoord.",
};

// De /bedankt-pagina na het formulier. De drie stappen volgen het model van 22/10:
// kennismaking → wij analyseren je bedrijf (Company Brain Setup) → wij bouwen wat je kiest.
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
      wie: "Wij, met jou",
      tijd: "4 weken",
      titel: "We analyseren je bedrijf",
      body: "In vier weken spreken we met jou en je team, leggen we alles vast in het brein van je bedrijf, en geven we elk knelpunt een score. Je eindigt met een roadmap: wat AI eerst kan overnemen, op volgorde van wat het meeste oplevert.",
    },
    {
      nummer: "03",
      wie: "Wij",
      tijd: "na de eindpresentatie",
      titel: "Wij bouwen wat jij kiest",
      body: "Bij de eindpresentatie krijg je ons advies en je offerte. Alles wordt gekoppeld aan de software die je al gebruikt, en getest voor het live gaat.",
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
    { label: "Vacatures", href: "/vacatures" },
    { label: "Privacybeleid", href: "/privacy" },
    { label: "Cookieverklaring", href: "/cookieverklaring" },
    { label: "Disclaimer", href: "/disclaimer" },
  ],
  cookies: "Cookie-instellingen",
};
