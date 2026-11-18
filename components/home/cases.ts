/**
 * De oplossingen die we het vaakst bouwen: één bestand, één lijst. Geen
 * klantcases met cijfers en sectoren (die referenties zijn er nog niet, review
 * van 13 september 2026), wel de generieke oplossingen die elk bedrijf herkent.
 * De homepage toont de eerste zes als kaart, /cases schrijft ze allemaal uit
 * onder elkaar (anker /cases#<slug>). Een oplossing toevoegen = een object
 * in OPLOSSING_LIJST; de volgorde hier is de volgorde op de site.
 *
 * Per oplossing: de titel is het resultaat in een paar woorden (dat is wat het
 * grootst staat), `kort` één zin voor op de kaart, `vandaag` hoe het nu gaat,
 * `metAI` wat de AI-werknemer doet, `jij` wat jij nog ziet of doet. `tools`
 * zijn namen uit LOGOS in copy.ts (de ronde iconen op de kaart). `module` is
 * de module van het aanbod waar de oplossing bij hoort, of "Maatwerk".
 *
 * Sinds 18/11 (Karel): elke module heeft minstens één case, de modules eerst
 * en het maatwerk achteraan, zodat de homepage de zes module-cases toont. Elke
 * case heeft een kleine demo op /cases (case-demo.tsx): `demo` is het verloop,
 * stap na stap, met verzonnen maar herkenbare namen. Geen bedragen in de demo's:
 * de enige prijs op de site is die van de Company Brain.
 *
 * De teksten hergebruiken de zinnen van de vroegere cases waar dat kon; de
 * rest is nieuw en lezen de oprichters na.
 */

import { LOGOS, type Logo } from "./copy";

export type Module = "Mailbox" | "Offertes" | "Documentatie" | "Administratie" | "Gecentraliseerde kennis" | "Maatwerk";

/** Eén stap in een demo. Ze verschijnen na elkaar, daarna begint de demo opnieuw. */
export type DemoStap =
  | { t: "bericht"; bron: "mail" | "whatsapp" | "vraag"; van: string; tekst: string }
  | { t: "label"; tekst: string; zacht?: boolean }
  | { t: "veld"; label: string; waarde: string }
  | { t: "typen"; tekst: string }
  | { t: "sync"; systemen: string[] }
  | { t: "klaar"; tekst: string };

export type Demo = {
  /** De naam in de titelbalk van het venstertje. */
  venster: string;
  stappen: DemoStap[];
};

export type Oplossing = {
  slug: string;
  /** De module waar de oplossing bij hoort: het label op /cases. */
  module: Module;
  titel: string;
  kort: string;
  tools: string[];
  vandaag: string;
  metAI: string[];
  jij: string;
  demo: Demo;
};

export const OPLOSSING_LIJST: Oplossing[] = [
  {
    slug: "klantencontact",
    module: "Mailbox",
    titel: "Mails automatisch beantwoord",
    kort: "Standaardvragen krijgen meteen antwoord, de rest komt bij de juiste persoon.",
    tools: ["Gmail", "Outlook"],
    vandaag: "Elke dag dezelfde vragen: waar blijft mijn bestelling, wat kost dit, wanneer kunnen jullie komen. Wie ze beantwoordt, doet die dag niets anders.",
    metAI: [
      "Hij sorteert elke mail: vraag, bestelling, klacht of iets anders.",
      "In de categorieën die jij goedkeurt, antwoordt hij meteen, in de stijl van wie de mailbox heeft.",
      "De rest zet hij klaar als concept, met een voorstel van antwoord.",
      "Is een vraag te complex, dan gaat ze naar een echte medewerker.",
    ],
    jij: "Jij ziet alleen nog wat een mens moet zien.",
    demo: {
      venster: "Inbox",
      stappen: [
        { t: "bericht", bron: "mail", van: "Sarah De Wit", tekst: "Wanneer wordt mijn bestelling geleverd?" },
        { t: "label", tekst: "Vraag over levering" },
        { t: "typen", tekst: "Dag Sarah, je bestelling vertrekt donderdag. Zodra ze onderweg is, krijg je de track-and-trace." },
        { t: "klaar", tekst: "Verstuurd, in de stijl van Tom" },
        { t: "bericht", bron: "mail", van: "Bouwbedrijf Claes", tekst: "Er klopt iets niet aan de laatste factuur." },
        { t: "label", tekst: "Klacht: concept klaar voor Tom", zacht: true },
      ],
    },
  },
  {
    slug: "offertes",
    module: "Offertes",
    titel: "Offertes automatisch opgesteld",
    kort: "Een aanvraag komt binnen, de offerte staat klaar met jouw prijzen.",
    tools: ["Outlook", "Teamleader"],
    vandaag: "Een aanvraag komt binnen in je mailbox. Je zoekt op wie het is, rekent de prijs uit, maakt de offerte op, zet ze in je CRM en mailt ze. 's Avonds, want overdag is er geen tijd.",
    metAI: [
      "Hij leest de aanvraag, uit een mail of een opdracht, en vraagt na wat ontbreekt.",
      "Hij maakt de offerte op met jouw prijzen en marges, in je huisstijl.",
      "Hij zet ze klaar in je offerteprogramma.",
      "Na drie dagen geen antwoord? Dan staat er een opvolgmail klaar.",
    ],
    jij: "Jij krijgt een melding dat de offerte klaarstaat, kijkt ze na en drukt op verzenden.",
    demo: {
      venster: "Offerte",
      stappen: [
        { t: "bericht", bron: "mail", van: "Jan Peeters", tekst: "Kunnen jullie een prijs geven voor de badkamer? Zo'n 8 m² tegelwerk." },
        { t: "label", tekst: "Offerteaanvraag" },
        { t: "veld", label: "Klant", waarde: "Jan Peeters, bestaande klant" },
        { t: "veld", label: "Tegelwerk 8 m²", waarde: "volgens je prijslijst" },
        { t: "veld", label: "Plaatsing", waarde: "2 dagen, 2 man" },
        { t: "klaar", tekst: "Offerte klaar in Teamleader, ter controle" },
      ],
    },
  },
  {
    slug: "documenten",
    module: "Documentatie",
    titel: "Documenten vanzelf op de juiste plek",
    kort: "Elk document krijgt de juiste naam en komt in de juiste map van je drive.",
    tools: ["Google Drive", "Outlook"],
    vandaag: "Contracten, plannen en attesten komen binnen als bijlage. Ze blijven in iemands mailbox hangen, of belanden in een map met een naam die niemand terugvindt.",
    metAI: [
      "Hij herkent elk document: contract, plan, attest of factuur, en bij welke klant of welk project het hoort.",
      "Hij geeft het een duidelijke naam en zet het in de juiste map, in SharePoint, OneDrive of Google Drive.",
      "Vaste documenten, zoals een verslag of een checklist, stelt hij op volgens jouw sjabloon.",
    ],
    jij: "Jij vindt elk document terug waar je het verwacht.",
    demo: {
      venster: "Drive",
      stappen: [
        { t: "bericht", bron: "mail", van: "Notariskantoor Van Damme", tekst: "Bijlage: compromis_def_v3.pdf" },
        { t: "label", tekst: "Contract, project Wouters" },
        { t: "veld", label: "Nieuwe naam", waarde: "Compromis Wouters.pdf" },
        { t: "veld", label: "Map", waarde: "Projecten › Wouters › Contracten" },
        { t: "klaar", tekst: "Opgeborgen in SharePoint" },
      ],
    },
  },
  {
    slug: "systemen-gekoppeld",
    module: "Administratie",
    titel: "Je systemen praten met elkaar",
    kort: "Wat je in het ene systeem invult, staat ook in het andere. Geen dubbel werk.",
    tools: ["HubSpot", "Excel", "Notion"],
    vandaag: "Een nieuwe klant staat in je mailbox, dan in je CRM, dan in je boekhouding, dan in een Excel. Vier keer overtypen, vier kansen op een fout.",
    metAI: [
      "Hij zet gegevens over tussen je mailbox, je drive, je CRM en je boekhouding.",
      "Hij houdt ze gelijk: wijzigt er iets, dan wijzigt het overal.",
      "Hij verwittigt als iets niet klopt.",
    ],
    jij: "Jij vult alles nog één keer in.",
    demo: {
      venster: "Administratie",
      stappen: [
        { t: "bericht", bron: "mail", van: "Lotte Maes", tekst: "Ons nieuwe btw-nummer is BE 0712 345 678." },
        { t: "label", tekst: "Gewijzigde klantgegevens" },
        { t: "sync", systemen: ["CRM", "Boekhouding", "Drive", "Mailbox"] },
        { t: "klaar", tekst: "Overal aangepast, niemand typte iets over" },
      ],
    },
  },
  {
    slug: "werkbon-en-facturatie",
    module: "Administratie",
    titel: "Van werkbon tot factuur, zonder overtypen",
    kort: "Een werkbon komt binnen, de factuur staat klaar in je boekhoudpakket.",
    tools: ["WhatsApp", "Odoo", "Google Drive"],
    vandaag: "Techniekers sturen hun werkbonnen als foto via WhatsApp. Op kantoor typt iemand elke bon over in het boekhoudpakket. Facturen vertrekken pas dagen na de klus.",
    metAI: [
      "Hij leest de foto van de bon: klant, uren en materiaal.",
      "Klopt het materiaal met de lijst? Ontbreekt er iets, dan vraagt hij het na bij de technieker.",
      "Hij zet de factuur klaar in je boekhoudpakket, met de juiste tarieven.",
      "De originele bon komt in de juiste map.",
    ],
    jij: "Jij kijkt de factuur na en verstuurt ze op de dag van de klus.",
    demo: {
      venster: "Werkbon",
      stappen: [
        { t: "bericht", bron: "whatsapp", van: "Kevin, technieker", tekst: "Foto: werkbon_0412.jpg" },
        { t: "veld", label: "Klant", waarde: "Familie Janssens" },
        { t: "veld", label: "Uren", waarde: "3,5 u" },
        { t: "veld", label: "Materiaal", waarde: "2 kranen, 1 sifon" },
        { t: "label", tekst: "Klopt met de materiaallijst" },
        { t: "klaar", tekst: "Factuur klaar in Odoo, bon in de map" },
      ],
    },
  },
  {
    slug: "team-en-kennis",
    module: "Gecentraliseerde kennis",
    titel: "Je kennis altijd vindbaar",
    kort: "Wat alleen in jouw hoofd zat, kan je hele team opvragen.",
    tools: ["Microsoft Teams", "Google Drive", "Notion"],
    vandaag: "Hoe doen we dat ook alweer? Elke nieuwe collega vraagt het aan jou. Elke procedure zit in een hoofd, een mail of een map die niemand vindt.",
    metAI: [
      "Hij kent je fundament: je procedures, je prijzen, je afspraken.",
      "Je team stelt hem vragen in gewone taal en krijgt het juiste antwoord, met de bron erbij.",
      "Nieuwe collega's zijn sneller ingewerkt.",
    ],
    jij: "Jij wordt minder onderbroken.",
    demo: {
      venster: "Vraag het brein",
      stappen: [
        { t: "bericht", bron: "vraag", van: "Ruben, nieuwe collega", tekst: "Wie mag een korting goedkeuren voor een vaste klant?" },
        { t: "typen", tekst: "Tot 5% beslist de projectleider zelf. Daarboven gaat het langs de zaakvoerder." },
        { t: "label", tekst: "Bron: prijzen.md, kortingsregels", zacht: true },
        { t: "klaar", tekst: "Antwoord met bron, zonder jou te storen" },
      ],
    },
  },
  {
    slug: "planning",
    module: "Maatwerk",
    titel: "Planning die zichzelf vult",
    kort: "Afspraken en werk worden ingepland op de vrije momenten van je team.",
    tools: ["Google Agenda", "Outlook", "Teamleader"],
    vandaag: "Een klant wil een afspraak. Je kijkt in twee agenda's, belt een collega, mailt drie voorstellen en wacht.",
    metAI: [
      "Hij kent de agenda's van je team en de regels van je planning.",
      "Hij stelt de klant meteen vrije momenten voor en legt de afspraak vast.",
      "Hij stuurt de bevestiging en de herinnering.",
      "Verschuift er iets, dan past hij de rest aan.",
    ],
    jij: "Jij opent je agenda en ze staat vol.",
    demo: {
      venster: "Agenda",
      stappen: [
        { t: "bericht", bron: "mail", van: "Ward Claes", tekst: "Kunnen jullie volgende week eens langskomen?" },
        { t: "veld", label: "Vrij bij Pieter", waarde: "di 14u · wo 9u · vr 10u30" },
        { t: "label", tekst: "Ward kiest woensdag 9u" },
        { t: "klaar", tekst: "In de agenda, bevestiging verstuurd" },
      ],
    },
  },
  {
    slug: "klachten",
    module: "Maatwerk",
    titel: "Klachten meteen bij de juiste persoon",
    kort: "Een klacht wordt herkend, geregistreerd en opgevolgd voor ze escaleert.",
    tools: ["Outlook", "WhatsApp", "Teamleader"],
    vandaag: "Een klacht zit tussen honderd andere mails. Ze wordt te laat gezien, en tegen dan is de klant kwaad.",
    metAI: [
      "Hij herkent een klacht in je mailbox of op WhatsApp, ook als het woord niet valt.",
      "Hij registreert ze en legt ze bij wie ze moet behandelen, volgens jouw regels.",
      "Hij stuurt de klant meteen een eerste antwoord.",
      "Hij volgt op tot ze is afgehandeld.",
    ],
    jij: "Jij ziet elke klacht op tijd.",
    demo: {
      venster: "Klachten",
      stappen: [
        { t: "bericht", bron: "whatsapp", van: "Mevrouw Hermans", tekst: "Al twee keer gebeld en nog altijd geen technieker gezien." },
        { t: "label", tekst: "Klacht, dringend" },
        { t: "veld", label: "Bij", waarde: "Els, klantendienst" },
        { t: "typen", tekst: "Dag mevrouw Hermans, dat spijt ons. Els belt u vandaag nog terug." },
        { t: "klaar", tekst: "Opgevolgd tot ze is afgehandeld" },
      ],
    },
  },
];

export function logoVoor(naam: string): Logo | undefined {
  return LOGOS.find((l) => l.naam === naam);
}
