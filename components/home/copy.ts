/**
 * Alle tekst van de homepage staat hier, los van de opmaak.
 *
 * Basis: de opbouw en schrijfstijl van de vorige homepage en de landingspagina's
 * (duidelijk, rechtstreeks, simpel voor niet-technische mensen, resultaatgericht),
 * en de uitleg die Alex geeft in de video's van de lesreeks (hoofdstuk 1 en 2):
 * waarom je eerst een fundament legt, wat je bouwt, wat het oplevert, en dat
 * het technische werk daarna nog door ons gebeurt. Prijzen volgens het model:
 * lesreeks € 95 (daarna € 295), bouw € 4.500 vast, onderhoud € 90 per maand.
 * Het heet een lesreeks, geen cursus. Het fundament heet ook je AI-brein.
 *
 * Review van 13 september 2026 (Karel en Alex, transcript in yap.md): één lijn
 * probleem → oplossing → hoe → knop. Drie herkenpunten met een tekening, dan
 * de pitch van de oplossing, dan de drie stappen als werkwoorden (Opleiden,
 * Bouwen, Onderhouden), geen voorbeelden of cijfers buiten de oplossingen, de
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

export const CTA_LESREEKS = "Start de lesreeks";
// De tweede knop. Geen kennismaking meer inplannen: de lesreeks is de weg, de contactpagina is voor vragen.
export const CTA_CONTACT = "Neem contact met ons op";

// De lichte kop op de juridische pagina's en de cases.
export const HEADER = {
  terug: "Terug naar de homepage",
};

// 1. Hero. Titel van Alex; de sub is een belofte, geen disclaimer: wat jij legt, wat wij daarop bouwen.
export const HERO = {
  h1: ["Leg jouw", "AI-fundament"],
  sub: "In de lesreeks leg je zelf je AI-fundament: alle kennis over jouw bedrijf, zo opgeschreven dat AI ermee kan werken. Jij praat, de AI schrijft. Wij bouwen daarop de AI-werknemers die elke dag werk uit je handen nemen.",
  punten: [
    "Geen programmeerkennis nodig. We tonen stap voor stap hoe je alles installeert.",
    "Je eindigt met een lijst van wat AI eerst kan overnemen, op volgorde van wat het meeste oplevert.",
    "Alles op die lijst bouwen wij, voor één vaste prijs.",
  ],
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
    { tekst: "Je bent de flessenhals: alles passeert nog langs jou.", beeld: "flessenhals" },
    { tekst: "Je gebruikt ChatGPT, maar het kent jouw bedrijf niet.", beeld: "chatgpt" },
    { tekst: "Je weet dat AI kan helpen, maar niet waar te beginnen.", beeld: "beginnen" },
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
    "Dat is je AI-werknemer. In de lesreeks leid je hem op, daarna bouwen wij hem.",
  ],
  illustratieAria: "Eén AI-werknemer, gevoed door je fundament, verbonden met je mailbox, je agenda, je boekhouding en je andere systemen.",
  koppelingen: "We integreren met al je tools",
  koppelingenPlus: "zowat alles wat je al gebruikt",
};

// Het blok na de stappen: de deur naar de lesreeks, met de cover van de community op Skool.
// Bewust de cover en niet een screenshot met ledental.
export const SKOOL = {
  label: "De lesreeks op",
  titel: "Leg je AI-fundament",
  body: "In de lesreeks draag je alles wat je over je bedrijf weet over aan een AI-brein: je processen, je klanten, je prijzen, je manier van werken. Daarna weet AI wat jij weet.",
  knop: "Start zelf met je AI-fundament",
  noot: "Online, in het Nederlands, op eigen tempo. € 95 voor de eerste 20 deelnemers.",
  coverAlt: "De cover van de lesreeks op Skool: een whiteboard met de negen stappen naar je AI-fundament.",
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
  /** Een werkwoord: Opleiden, Bouwen, Onderhouden. */
  titel: string;
  intro: string;
  /** Wat je eruit haalt, als vinkjes bovenaan het paneel. Alleen bij stap 1. */
  punten?: string[];
  prijsLabel: string;
  prijs: string;
  /** Doorstreepte prijs naast de actieprijs, bv. de prijs na de eerste 20 deelnemers. */
  prijsOud?: string;
  cta?: string;
  ctaNoot?: string;
};

// 4. Hoe krijg jij jouw AI-werknemer: de drie stappen van het model, in volgorde.
// De prijzen staan op de kaarten en nergens in de panelen. Geen voorbeelden hier: die staan
// bij de oplossingen. Kop, intro, paneel 2 en paneel 3 zijn nieuw (review 13/09).
export const HOE = {
  h2: ["Hoe krijg jij jouw", "AI-werknemer?"],
  meer: "Meer over deze stap",
  minder: "Sluiten",
  // Onderaan het paneel: door naar de volgende stap, of terug.
  paneel: { vorige: "Vorige", volgende: "Volgende" },
  intro: "In drie stappen, in deze volgorde. Jij legt eerst zelf je fundament, want dat inzicht heb jij, niet wij. Daarna doen wij het technische werk.",
  slotVraag: "Vragen over de aanpak?",
  stappen: [
    {
      stapLabel: "Stap 1",
      tijd: "2 tot 3 weken",
      wie: "Jij, met de AI",
      titel: "Opleiden",
      intro: "De AI stelt jou vragen over je bedrijf. Jij praat, hij schrijft.",
      punten: [
        "Een inventaris van je bedrijf, in gewone taal, op je eigen computer",
        "Een lijst van wat AI eerst kan overnemen, op volgorde van opbrengst",
        "De plannen voor die automatiseringen, klaar om te bouwen",
      ],
      prijsLabel: "Lesreeks",
      prijs: "€ 95",
      prijsOud: "€ 295",
      cta: CTA_LESREEKS,
      ctaNoot: "Online, in het Nederlands, op eigen tempo.",
    },
    {
      stapLabel: "Stap 2",
      tijd: "2 tot 4 weken",
      wie: "Wij",
      titel: "Bouwen",
      intro: "Op jouw fundament bouwen wij de AI-werknemers die je dagelijkse processen overnemen.",
      prijsLabel: "Vaste prijs",
      prijs: "€ 4.500",
    },
    {
      stapLabel: "Stap 3",
      tijd: "24/7 actief",
      wie: "Je AI-werknemer",
      titel: "Onderhouden",
      intro: "Het werk gebeurt op de achtergrond. Wij houden het systeem draaiend, veilig en up-to-date.",
      prijsLabel: "Onderhoud",
      prijs: "€ 90",
    },
  ] as Stap[],
  // Waarom je het fundament zelf legt. Uit les 1.1, 1.2 en 1.3, ingekort tot wat je in één blik leest.
  // De tweede alinea is nieuw (review 13/09): de lesreeks is ons eigen stappenplan uit de analysetrajecten.
  // De drie blokken hieronder zijn de inhoud van het paneel per stap (stap-details.tsx); `kort` is de inleidende regel.
  fundament: {
    h3: "Waarom je het fundament zelf legt",
    kort: "Jij kent je bedrijf het best. Daarom leg jij het, en bouwen wij daarop.",
    alineas: [
      { kop: "Jij weet waar het wringt", tekst: "Een consultant kent je bedrijf na een week nog altijd minder dan jij. Daarom stelt de AI jou de vragen die wij vroeger ter plaatse stelden." },
      { kop: "Ons stappenplan, jouw bedrijf", tekst: "De lesreeks is ons eigen stappenplan, gegroeid uit meer dan tien analysetrajecten van meerdere weken bij KMO's. Alles wat wij daar vroegen en opschreven, doet de AI nu met jou, stap voor stap." },
    ],
    lijstTitel: "In je fundament komt:",
    lijst: [
      "Hoe je bedrijf geld verdient",
      "Wie wat doet en wie beslist",
      "Je processen, systemen en prijzen",
      "Wat AI eerst kan overnemen",
    ],
    // Bewust een kwalificatie, geen geruststelling: wie een snelle fix zoekt, haakt hier af.
    eerlijk: "Geen snelle fix. AI die echt in je processen zit, vraagt een paar avonden werk. Daarom blijft hij daarna werken.",
    // De video van anderhalve minuut waarin Alex of Karel dit uitlegt. Komt later; leeg = niets tonen.
    video: null as null | { src: string; poster: string },
  },
  // Nu het technische werk: wat er gebeurt nadat jij je fundament legde, in volgorde.
  // Geen prijs, geen "zit erin / zit er niet in" (de grens staat in de FAQ). Nieuw (review 13/09).
  bouw: {
    h3: "Nu het technische werk",
    kort: "Goed gedaan: je hebt ons de analyse bespaard. Vanaf hier nemen wij het over, want dit vraagt technische expertise.",
    volgorde: [
      { titel: "Strategiegesprek", tekst: "Met je fundament in de hand bespreken we samen wat we bouwen. Gratis en vrijblijvend." },
      { titel: "Bouwklaar maken", tekst: "We kijken de scope na en zetten alles klaar om te bouwen." },
      { titel: "Bouwen, koppelen, testen", tekst: "Wij ontwikkelen je AI-werknemers, koppelen ze aan de software die je al gebruikt en testen ze tot ze doen wat jij zou doen." },
      { titel: "Veilig live", tekst: "Je gegevens blijven afgeschermd en één knop zet alles stil. Daarna 30 dagen nazorg." },
    ],
  },
  // Wat je vanaf nu hebt. Geen prijs in het paneel; geen cijfers over backup-frequentie of uptime.
  // "Voorrang bij vragen" en "Elke maand een uur strategie" zijn nieuwe beloftes uit de review
  // van 13/09 (Karel), nog niet in het businessmodel: de oprichters bevestigen ze.
  onderhoud: {
    h3: "Wat je vanaf nu hebt",
    kort: "Je AI-werknemer staat live en werkt voor je. Wij houden hem draaiend.",
    punten: [
      { titel: "Live en aan het werk", body: "Je AI-werknemers draaien op onze servers. Jij hoeft niets te installeren of te beheren." },
      { titel: "Bewaakt", body: "Wij zien het als er iets hapert, meestal voor jij het merkt. Bug? Gratis. Koppeling veranderd? Gratis." },
      { titel: "Elke maand gecheckt en bijgewerkt", body: "Backups, beveiligingsupdates en nieuwe versies: nieuwe AI-ontwikkelingen die jij ook moet hebben, voeren wij door." },
      { titel: "Voorrang bij vragen", body: "Loop je ergens tegenaan, dan sta je vooraan in de rij." },
      { titel: "Elke maand een uur strategie", body: "Eén uur per maand zitten we samen over uitbreidingen en advies." },
      { titel: "Van jou, ook als je stopt", body: "Zolang wij het onderhouden, beheren wij de toegang: zo kan niemand er per ongeluk iets in breken. Stop je, dan krijg je alles mee: de code, je gegevens en een dag begeleiding om het over te nemen." },
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
      q: "Wat is een AI-fundament precies?",
      a: [
        { t: "p", tekst: "Een map met tekstbestanden over jouw bedrijf, in gewone taal. Elk bestand is één stuk correcte informatie: je processen, welke systemen je gebruikt, wie Dirk is en wat hij doet, wat je aanrekent, je huistaal. Samen vormen ze een zorgvuldig opgebouwde inventaris van je hele bedrijf. In de lesreeks noemen we het je AI-brein." },
        { t: "p", tekst: "Waarom zo? Stop je alles in één chat, dan raakt het geheugen van de AI vol en begint hij dingen te vergeten of te verzinnen. Met een fundament zoekt hij, net als in Wikipedia, alleen de pagina op die hij nodig heeft. Zo geeft hij het juiste antwoord, ook als een klant straks vraagt wat een warmtepomp kost." },
      ],
    },
    {
      q: "Waarom leg ik het fundament zelf, en moet ik daar technisch voor zijn?",
      a: [
        { t: "p", tekst: "Omdat jij je bedrijf het allerbeste kent en zelf weet waar je grootste frustraties en tijdvreters zitten. Andere bureaus sturen daar een dure consultant voor. Die kent na een week nog altijd minder van jouw bedrijf dan jij. Daarom stelt de AI jou nu dezelfde vragen die wij vroeger ter plaatse stelden, en schrijft hij alles op." },
        { t: "p", tekst: "Technisch hoef je niet te zijn. Je praat met je computer en de AI schrijft. Je hebt een betalend abonnement van Claude of ChatGPT nodig (± € 20 per maand); de rest hebben wij voor je klaargezet. We tonen stap voor stap, op Mac en Windows, hoe je alles installeert." },
        { t: "p", tekst: "Reken op een tiental uur, verspreid over een paar avonden of namiddagen. Hoe meer je vertelt, hoe beter het resultaat. En je doet het één keer: elke automatisering die we daarna bouwen, vertrekt van hetzelfde fundament." },
      ],
    },
    {
      q: "Wat kunnen jullie automatiseren, en werkt dat met onze software?",
      a: [
        { t: "p", tekst: "De vuistregel: doet je team het nu handmatig, en volgt het vaste stappen? Dan kunnen wij het overnemen. Wat we niet bouwen: nieuwe software met een scherm dat er nog niet is, zoals een website of een klantenportaal." },
        { t: "link", tekst: "Bekijk de oplossingen die we het vaakst bouwen", href: "/cases" },
        { t: "p", tekst: "Als je software een API heeft (vrijwel alle moderne systemen sinds 2015), kunnen we het koppelen. Geen API? Dan zoeken we een workaround via e-mail, geëxporteerde bestanden of webhooks. In 95% van de gevallen vinden we een oplossing. Heeft je sectorpakket geen koppeling en geen export, dan zeggen we dat vooraf, voor er een prijs op staat." },
        { t: "p", tekst: "Je hoeft geen nieuwe software aan te schaffen. We werken met wat je al hebt en laten die systemen samenwerken. Onzeker of jullie tools compatibel zijn? Stuur ons de lijst, dan checken we het vooraf, gratis en zonder verplichtingen." },
      ],
    },
    {
      q: "Wat kost dit voor mijn bedrijf?",
      a: [
        { t: "p", tekst: "Je kent elke prijs op voorhand. Geen verrassingen achteraf." },
        { t: "list", items: [
          "De lesreeks: € 95 voor de eerste 20 deelnemers, daarna € 295. Eenmalig. Plus je eigen abonnement van Claude of ChatGPT, ± € 20 per maand.",
          "De bouw: € 4.500, vaste prijs, voor alle AI-werknemers uit je fundament, inclusief 30 dagen nazorg. Alleen als jij daarvoor kiest.",
          "Het onderhoud: € 90 per maand voor hosting, bewaking, backups en updates. Maandelijks opzegbaar.",
        ] },
        { t: "p", tekst: "Te klein om te starten? Begin met de lesreeks. Voor € 95 weet je waar AI in jouw bedrijf loont, voor je één euro aan ontwikkeling uitgeeft. Daarna bouwen we gefaseerd: start met de grootste tijdvreter, breid later uit als je de waarde ziet." },
        { t: "p", tekst: "Alle prijzen excl. btw." },
      ],
    },
    {
      q: "Hoe lang duurt het voor de automatisering live staat?",
      a: [
        { t: "p", tekst: "Reken op 4 tot 7 weken van de eerste les tot een automatisering die live staat, afhankelijk van de complexiteit en je eigen tempo in de lesreeks. Daarna volgen 30 dagen nazorg." },
        { t: "p", tekst: "Minimale onboarding, geen intensieve training. Jouw team hoeft geen technische kennis te hebben. Wat ze wél moeten weten: wat de automatisering doet, wat er automatisch gebeurt (zodat ze geen dubbel werk doen) en waar ze de output zien, bijvoorbeeld een offerte die klaarstaat." },
      ],
    },
    {
      q: "Wat gebeurt er met de gegevens van mijn bedrijf, en wat als er iets misloopt?",
      a: [
        { t: "p", tekst: "Je fundament staat op je eigen computer en is van jou. Ruwe exports van je mailbox of agenda blijven daar staan; alleen wat de AI eruit leert, komt in je fundament. Wat je aan de AI vertelt, gaat net als bij ChatGPT langs de servers van de maker. In de lesreeks tonen we welke privacy-instelling je daar aanzet voor je iets deelt." },
        { t: "p", tekst: "Na oplevering laten we je niet in de steek. Elke oplossing bevat ingebouwde monitoring: wij worden onmiddellijk verwittigd als er iets hapert. Bug? Gratis. API veranderd? Gratis. Onze verantwoordelijkheid, niet de jouwe. Het onderhoud (hosting, bewaking, backups en updates) zit in de € 90 per maand; je betaalt alleen extra voor nieuwe features die je later wilt toevoegen." },
      ],
    },
    {
      q: "Wat gebeurt er als we later willen uitbreiden?",
      a: [
        { t: "p", tekst: "Uitbreiden is makkelijk, en dat adviseren we vaak bewust. Start met één proces dat veel oplevert, breid uit zodra dat draait. Kleiner risico per stap, je team went geleidelijk, en je ziet de winst tussen elke fase." },
        { t: "p", tekst: "Technisch bouwen we modulair op je fundament: een nieuwe automatisering sluit aan op de bestaande. Geen grote herbouw nodig. En omdat je fundament er al ligt, hoeft niemand je bedrijf opnieuw te analyseren." },
      ],
    },
  ],
};

// 8. De contactkaart naast de FAQ en op /contact: eerst de lesreeks, dan het vraagformulier,
// dan het nummer van Karel met zijn foto. Geen kennismaking meer inplannen. Nieuw (review 13/09).
export const SLOT = {
  lesreeksTitel: "Start vandaag met de lesreeks",
  bel: "Even sparren over AI in jouw bedrijf? Bel gerust.",
  belNaam: "Karel",
  foto: "/karel.png",
  mailLabel: "Of mail naar",
};

// Het korte vraagformulier: lager op de drempel dan een gesprek. Gaat naar de Netlify Function
// met het veld `bericht` erbij, en op de contactkaart ook een telefoonnummer.
export const VRAAG = {
  titel: "Liever eerst een vraag stellen?",
  sub: "Stel ze hier. Je krijgt een persoonlijk antwoord, meestal binnen 24 uur.",
  naam: "Naam",
  email: "E-mailadres",
  telefoon: "Telefoonnummer (optioneel)",
  bericht: "Je vraag",
  berichtHint: "Bijvoorbeeld: werkt dit met ons boekhoudpakket?",
  knop: "Verstuur je vraag",
  bezig: "Versturen…",
  bedankt: "Bedankt, je vraag is aangekomen.",
  bedanktSub: "Je krijgt meestal binnen 24 uur antwoord.",
  fout: "Het versturen lukte niet. Probeer het opnieuw of mail ons op {email}.",
  privacy: "We gebruiken je gegevens alleen om te antwoorden.",
};

// De pagina /contact: waar "Neem contact met ons op" naartoe gaat. Nieuw (review 13/09).
export const CONTACT = {
  metaTitel: "Contact",
  metaBeschrijving: "Vragen over de lesreeks, de bouw of je eigen situatie? Bel, mail of stuur je vraag.",
  kruimel: "Contact",
  h1: ["Neem contact", "met ons op"],
  intro: "Vragen over de lesreeks, de bouw of je eigen situatie? Bel, mail of stuur je vraag hieronder. Je krijgt meestal binnen 24 uur antwoord.",
};

// De /bedankt-pagina na het formulier. De drie stappen volgen het nieuwe model
// (kennismaking → jij legt je fundament in de lesreeks → wij bouwen), zodat de
// pagina hetzelfde verhaal vertelt als de homepage in plaats van het oude
// "wij komen langs met een voorstel".
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
      wie: "Jij, met de AI",
      tijd: "2 tot 3 weken",
      titel: "Je legt je fundament",
      body: "In de lesreeks stelt de AI jou vragen over je processen, je klanten en je prijzen. Jij praat, hij schrijft. Je eindigt met een lijst van wat AI eerst kan overnemen, op volgorde van wat het meeste oplevert.",
    },
    {
      nummer: "03",
      wie: "Wij",
      tijd: "2 tot 4 weken",
      titel: "Wij bouwen wat op die lijst staat",
      body: "Alles op je lijst dat op je fundament draait, voor één vaste prijs van € 4.500. Gekoppeld aan de software die je al gebruikt, en getest voor het live gaat.",
    },
  ],
  // De lesreeks is de stap die de bezoeker vandaag al zelf kan zetten.
  nu: {
    titel: "Je hoeft niet op ons te wachten",
    body: "Stap 02 kan je vandaag al starten. Hoe verder je fundament staat wanneer we bellen, hoe concreter het gesprek.",
    noot: "Online, in het Nederlands, op eigen tempo. € 95 voor de eerste 20 deelnemers.",
  },
  vragenTitel: "Vragen in de tussentijd?",
  belLabel: "Bel gerust op",
  terug: "Terug naar de homepage",
};

// Footer (vorige homepage, zonder plaatsnaam). Eén telefoonnummer (Karel), zoals in het mobiele menu.
export const FOOTER = {
  slotTitel: "Klaar om je bedrijf te automatiseren?",
  slotTekst: "Leg eerst je fundament in de lesreeks. Vragen vooraf? Mail ons gerust.",
  contactTitel: "Contact",
  telefoons: [
    { nummer: "+32 495 70 23 14", link: "tel:+32495702314" },
  ],
  links: [
    { label: "Privacybeleid", href: "/privacy" },
    { label: "Algemene voorwaarden", href: "/algemene-voorwaarden" },
    { label: "Cookieverklaring", href: "/cookieverklaring" },
    { label: "Disclaimer", href: "/disclaimer" },
  ],
  cookies: "Cookie-instellingen",
};
