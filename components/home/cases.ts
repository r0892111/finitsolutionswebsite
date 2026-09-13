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
 * zijn namen uit LOGOS in copy.ts (de ronde iconen op de kaart).
 *
 * De teksten hergebruiken de zinnen van de vroegere cases waar dat kon; de
 * rest is nieuw en lezen de oprichters na.
 */

import { LOGOS, type Logo } from "./copy";

export type Oplossing = {
  slug: string;
  titel: string;
  kort: string;
  tools: string[];
  vandaag: string;
  metAI: string[];
  jij: string;
};

export const OPLOSSING_LIJST: Oplossing[] = [
  {
    slug: "offertes",
    titel: "Offertes automatisch opgesteld",
    kort: "Een aanvraag komt binnen, de offerte staat klaar met jouw prijzen.",
    tools: ["Outlook", "WhatsApp", "Teamleader"],
    vandaag: "Een aanvraag komt binnen in je mailbox. Je zoekt op wie het is, rekent de prijs uit, maakt de offerte op, zet ze in je CRM en mailt ze. 's Avonds, want overdag is er geen tijd.",
    metAI: [
      "Hij leest de aanvraag, uit mail of WhatsApp, en vraagt na wat ontbreekt.",
      "Hij maakt de offerte op met jouw prijzen en marges, in je huisstijl.",
      "Hij zet ze klaar in je CRM.",
      "Na drie dagen geen antwoord? Dan staat er een opvolgmail klaar.",
    ],
    jij: "Jij krijgt een melding dat de offerte klaarstaat, kijkt ze na en drukt op verzenden.",
  },
  {
    slug: "klantencontact",
    titel: "Mails en WhatsApp automatisch beantwoord",
    kort: "Standaardvragen krijgen meteen antwoord, de rest komt bij de juiste persoon.",
    tools: ["Gmail", "WhatsApp", "Microsoft Teams"],
    vandaag: "Elke dag dezelfde vragen: waar blijft mijn bestelling, wat kost dit, wanneer kunnen jullie komen. Wie ze beantwoordt, doet die dag niets anders.",
    metAI: [
      "Hij sorteert elke mail en elk bericht: vraag, bestelling, klacht of iets anders.",
      "Standaardvragen beantwoordt hij meteen, met de juiste gegevens uit je systemen.",
      "Wat hij niet zeker weet, zet hij klaar met een voorstel van antwoord.",
      "Is een vraag te complex, dan gaat ze naar een echte medewerker.",
    ],
    jij: "Jij ziet alleen nog wat een mens moet zien.",
  },
  {
    slug: "planning",
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
  },
  {
    slug: "werkbon-en-facturatie",
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
  },
  {
    slug: "bestellingen",
    titel: "Bestellingen automatisch verwerkt",
    kort: "Elke bestelling komt op één plek binnen en wordt klaargezet ter controle.",
    tools: ["Shopify", "WooCommerce", "Gmail"],
    vandaag: "Orders, supportmails en trackingvragen lopen met de hand door één mailbox. De mailbox wordt de flessenhals van het bedrijf.",
    metAI: [
      "Elke binnenkomende mail krijgt een categorie: bestelling, levering, retour of iets anders.",
      "Vragen zoals waar een pakje blijft, krijgen een antwoord op basis van de gegevens in de webshop.",
      "Bestellingen worden voorbereid in de webshop.",
      "Is een vraag te complex, dan gaat ze naar een echte medewerker.",
    ],
    jij: "Jij controleert alleen nog.",
  },
  {
    slug: "systemen-gekoppeld",
    titel: "Je systemen praten met elkaar",
    kort: "Wat je in het ene systeem invult, staat ook in het andere. Geen dubbel werk.",
    tools: ["HubSpot", "Excel", "Notion"],
    vandaag: "Een nieuwe klant staat in je mailbox, dan in je CRM, dan in je boekhouding, dan in een Excel. Vier keer overtypen, vier kansen op een fout.",
    metAI: [
      "Hij zet gegevens over tussen je CRM, je boekhouding, je agenda en je bestanden.",
      "Hij houdt ze gelijk: wijzigt er iets, dan wijzigt het overal.",
      "Hij verwittigt als iets niet klopt.",
    ],
    jij: "Jij vult alles nog één keer in.",
  },
  {
    slug: "klachten",
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
  },
  {
    slug: "team-en-kennis",
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
  },
];

export function logoVoor(naam: string): Logo | undefined {
  return LOGOS.find((l) => l.naam === naam);
}
