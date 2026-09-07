/**
 * Alle tekst van de homepage staat hier, los van de opmaak.
 * Volgorde = de vragen die een niet-technische zaakvoerder zich stelt,
 * in de volgorde waarin hij ze zich stelt. Elke sectie beantwoordt er één.
 *
 * Naamgeving: het is een lesreeks (geen cursus), een praatsessie (geen yap),
 * een AI-brein (wat de klant maakt) en Claude (het programma waarmee hij werkt).
 */

export const NAV = [
  { label: "Hoe het werkt", href: "#hoe-het-werkt" },
  { label: "Prijzen", href: "#prijzen" },
  { label: "Over ons", href: "#over-ons" },
  { label: "Vragen", href: "#vragen" },
];

export const CTA_LESREEKS = "Start de lesreeks";
export const CTA_GESPREK = "Vraag een gesprek aan";

// 1. Hero: "wat is dit, en is dit voor mij?"
export const HERO = {
  h1: ["ChatGPT kent je zaak niet.", "Wij leren je een AI opzetten die jouw zaak wél kent."],
  sub: "Jij vertelt hoe je zaak draait en de AI schrijft het op: wat je aanrekent, hoe je werkt, wie wat beslist. Twee tot drie weken, een paar avonden per week, geen IT-kennis nodig. Daarna bouwen wij daarop wat werk uit je handen neemt, zoals offertes die klaarstaan en herinneringen die vanzelf vertrekken.",
  secundair: "Bekijk hoe het werkt",
  meta: "Voor bedrijven tot 15 medewerkers. Alle prijzen staan op deze pagina.",
};

/** Het beeld in de hero: één pagina uit het AI-brein van een fictieve installateur, en wat de AI ermee doet. */
export const BREIN_PAGINA = {
  bedrijf: "Elektro Janssen · brein",
  pagina: "pagina 14 van 41",
  titel: "Offertes",
  rijen: [
    { k: "Wie", v: "Tom maakt ze. Els kijkt na boven 5.000 euro." },
    { k: "Wanneer", v: "Binnen 24 uur na het plaatsbezoek." },
    { k: "Prijzen", v: "Stopcontact 49 euro per stuk, geplaatst en incl. materiaal. Voorrijkost 45 euro." },
    { k: "Uitzondering", v: "Nieuwbouw altijd op plan, nooit op foto." },
    { k: "Loopt vaak mis", v: "Offertes blijven liggen tot vrijdagavond." },
  ],
  voet: "Bijgewerkt door Tom, 3 dagen geleden",
  gesprek: {
    jij: "Offerte voor 6 stopcontacten bij Peeters, plaatsbezoek was gisteren.",
    ai: "6 × 49 euro + 45 euro voorrijkost = 339 euro excl. btw. Onder de 5.000, dus Els hoeft niet na te kijken. Ze staat klaar in je map Offertes.",
  },
  onderschrift: "Boven: één pagina uit een AI-brein. Onder: wat de AI ermee doet.",
};

// 2. "Waarom lukt dat niet met ChatGPT? Wat is zo'n brein dan?"
export const WAAROM = {
  h2: "Zo leert een AI jouw zaak kennen",
  p1: "ChatGPT weet niet wat jij aanrekent of hoe je een klacht afhandelt. Je krijgt een algemeen antwoord en doet het toch zelf. Je prijslijst elke keer opnieuw inplakken helpt even, maar de rest van je zaak zit nog altijd in jouw hoofd.",
  p2: "Een AI-brein is jouw zaak, één keer opgeschreven: een map met pagina's in gewone taal, zoals de pagina hierboven. De AI leest die map zelf, bij elke vraag die je stelt in een venster op je computer, zoals bij ChatGPT. Jij hoeft niets meer uit te leggen of in te plakken.",
  p3: "Een paar uur vertellen, gespreid over een paar avonden, levert tientallen pagina's op. Verandert er later iets, dan zeg je het en past de AI de pagina aan.",
  lijstTitel: "Dit komt in je brein",
  lijst: [
    "Wat je verkoopt en wat je aanrekent",
    "Wie wat doet, en wie beslist bij twijfel",
    "Welke programma's je gebruikt, en wat je mailbox toont over hoe het echt loopt",
    "Je klanten: van eerste contact tot factuur, en daarna",
    "Wat vaak misloopt, en wat het je kost",
  ],
};

// 3. "En wat heb ik daar dan aan?" (dit zijn resultaten van stap 2)
export const VERANDERT = {
  h2: "Wat wij daarna voor je bouwen",
  intro: "Voorbeelden van wat wij na de lesreeks bouwen, bovenop jouw brein. Jij bepaalt per taak of de AI zelf mag versturen of eerst langs jou passeert.",
  kolomNu: "Nu",
  kolomStraks: "Straks",
  rijen: [
    {
      nu: "Een klant appt om 21u met een prijsvraag. Jij antwoordt om 23u.",
      straks: "Hij krijgt binnen de minuut een antwoord met jouw prijzen. Jij leest het morgen.",
    },
    {
      nu: "Offertes tik je 's avonds in.",
      straks: "Je stuurt een foto van de meterkast en een spraakbericht. De AI maakt de offerte, jij keurt goed en ze vertrekt.",
    },
    {
      nu: "Facturen opvolgen doe je als je eraan denkt.",
      straks: "Herinneringen vertrekken op dag 7, 14 en 30, beleefd en in jouw naam.",
    },
    {
      nu: "Elke ochtend eerst een uur mails sorteren.",
      straks: "Om 7u staat een overzicht in je WhatsApp of mail: wat dringend is, en wat de AI al klaargezet heeft.",
    },
  ],
  noot: "In het begin zet je dat strak, en je lost het als je vertrouwen hebt. Wat het bij jou wordt, volgt uit de lijst met knelpunten die je in de lesreeks opstelt.",
};

export type Stap = {
  label: string;
  titel: string;
  rol: string;
  body: string;
  resultaat: string;
  prijs: string;
  prijsDetail: string;
  cta?: string;
  ctaNoot?: string;
};

// 4. "Hoe gaat dat concreet, en wat kost het?"
export const HOE = {
  h2: "Hoe het werkt",
  intro: "In drie stappen. Je kent de prijs van elke stap voor je begint.",
  stappen: [
    {
      label: "Stap 1 · De lesreeks",
      titel: "Jij leert de AI je zaak kennen",
      rol: "Zelf, in twee tot drie weken",
      body: "Negen hoofdstukken, samen zo'n drie uur video, gespreid over twee tot drie weken. Je installeert Claude, een AI zoals ChatGPT die in een map op jouw computer kan werken, en je vertelt hoe je zaak draait. De AI zet dat om in pagina's. Je volgt de lessen in onze online community, waar je ook je vragen stelt.",
      resultaat: "Daarna heb je een AI die je zaak kent, en een lijst met waar je tijd en geld verliest, op volgorde van hoe erg het is.",
      prijs: "€ 95",
      prijsDetail: "voor de eerste 20 deelnemers, daarna € 295. Eenmalig. Plus je eigen Claude-abonnement, zo'n 20 tot 25 euro per maand.",
      cta: CTA_LESREEKS,
      ctaNoot: "Je betaalt via Skool, ons lesplatform, en begint meteen aan hoofdstuk 1. De lessen zijn in het Nederlands.",
    },
    {
      label: "Stap 2 · De bouw",
      titel: "Wij zetten het aan het werk",
      rol: "Door ons, voor een vaste prijs",
      body: "We lezen eerst je brein na en kiezen samen, in één gesprek, wat we bouwen: de grootste knelpunten uit jouw lijst. Meestal twee tot vijf oplossingen; een grote vraagt meer werk dan een kleine. Bij een installateur bijvoorbeeld: prijsvragen via WhatsApp beantwoord, offertes uit een foto en een spraakbericht, en herinneringen die vanzelf vertrekken. Wat we bouwen, leggen we vooraf op één A4 vast. Pas als jij die goedkeurt, betaal je en beginnen we.",
      resultaat: "Daarna draait het in je zaak: in je mail, je WhatsApp, je agenda of je facturatie. Dertig dagen nazorg inbegrepen.",
      prijs: "€ 4.500",
      prijsDetail: "Eenmalig, vaste prijs.",
    },
    {
      label: "Stap 3 · Het onderhoud",
      titel: "Het blijft draaien",
      rol: "Maandelijks opzegbaar",
      body: "Wat we bouwden, draait dag en nacht op een server van ons. Dit vaste bedrag dekt die server, beveiligingsupdates en om de twee weken een controle of alles nog loopt.",
      resultaat: "Je eigen Claude-abonnement blijft apart: dat is voor jou, om met je brein te werken.",
      prijs: "€ 90",
      prijsDetail: "per maand.",
    },
  ] as Stap[],
  btwNoot: "Alle prijzen excl. btw.",
  waarom: {
    h3: "De reden dat jij begint en wij verder doen",
    p: "Jij kent je zaak beter dan wij. Wat jij in de lesreeks vastlegt, hoeven wij niet meer te komen uitzoeken. Daardoor is de lesreeks goedkoop en kan stap 2 een vaste prijs hebben. En jij snapt wat er straks in je zaak draait.",
  },
};

// 5. "Wie zijn jullie, kan ik dit vertrouwen?"
export const OVER = {
  h2: "Drie mensen, in Leuven",
  team: [
    {
      naam: "Alex",
      rol: "Legt AI uit in mensentaal, op Instagram en in de lesreeks. Paste de brein-methode toe bij vier Belgische bedrijven voor ze een lesreeks werd.",
      foto: "/alex.png",
      alt: "Alex Otten, medeoprichter van Finit Solutions",
    },
    {
      naam: "Jord",
      rol: "Bouwt en test alles wat bij een klant draait.",
      foto: "/jord.png",
      alt: "Jord, technisch verantwoordelijke bij Finit Solutions",
    },
    {
      naam: "Karel",
      rol: "Voert de kennismakingsgesprekken en houdt de planning in handen.",
      foto: "/karel.png",
      alt: "Karel, verantwoordelijke gesprekken en planning bij Finit Solutions",
    },
  ],
  p: "Wat we eerder bouwden: een webshop ging van 50 klantmails per dag naar 5. Een gidsbedrijf met 20 gidsen kreeg boekingen, planning en facturen automatisch afgehandeld. Een recruitmentkantoor volgt sollicitaties nu dezelfde dag op. Breinen maakten we al met een verhuisbedrijf, een feestzaal, een saunacentrum en een schoonmaakbedrijf.",
  logosLabel: "Ondersteund door",
};

// 6. "Ja maar..."
export const VRAGEN = {
  h2: "Vragen die we vaak krijgen",
  items: [
    {
      q: "Moet ik iets van techniek kennen?",
      a: "Nee. Je installeert Claude met een stap-voor-stap video en daarna praat je. De map en de instructies voor de AI krijg je kant-en-klaar.",
    },
    {
      q: "Hoeveel tijd kost de lesreeks?",
      a: "Twee tot drie weken, een paar avonden per week. De video's duren samen zo'n drie uur; de rest van je tijd gaat naar vertellen over je zaak. Daarna volstaat een kwartier per week om te vertellen wat er veranderd is. De AI werkt de pagina's zelf bij.",
    },
    {
      q: "Wat heb ik nodig?",
      a: "Een laptop met Windows of Mac en een abonnement op Claude, de AI van het bedrijf Anthropic. Dat sluit je zelf af; reken op 20 tot 25 euro per maand terwijl je de lesreeks doet. Welk abonnement en welke instellingen, tonen we in hoofdstuk 2.",
    },
    {
      q: "Wat gebeurt er met mijn gegevens?",
      a: "Je brein staat op je eigen computer en de AI leest en schrijft daarin. Wij bewaren een afgeschermde kopie zodat we je brein kunnen nakijken voor we bouwen. De ruwe gegevens uit je mailbox of agenda blijven op je computer; alleen wat de AI eruit leert, komt in je brein. Je tekst gaat, net als bij ChatGPT, langs de servers van de maker. Welke privacy-instelling je daar aanzet, tonen we voor je ook maar één mail deelt.",
    },
    {
      q: "Wie helpt me als ik vastzit?",
      a: "In de community stel je je vraag. Alex en Karel antwoorden, en je ziet waar anderen vastzaten. De lessen zijn in het Nederlands. Claude verstaat en schrijft Nederlands; de knoppen van het programma zijn in het Engels.",
    },
    {
      q: "Moet ik daarna stap 2 kopen?",
      a: "Nee. Na de lesreeks beslis je zelf. Je brein blijft van jou en je kan het elke dag gebruiken, ook zonder ons. Stop je later met het onderhoud, dan stopt wat op onze server draait; je brein en je lijst hou je.",
    },
    {
      q: "Werkt dit met mijn huidige software?",
      a: "Wij bouwen op de programma's die je al gebruikt, zolang die gegevens kunnen delen (een koppeling) of als bestand kunnen uitvoeren (een export). De meeste bekende pakketten kunnen dat, zoals Teamleader, Exact, Gmail en Outlook. Kan het jouwe dat niet, dan zeggen we het voor er een prijs op staat. Heb je een scherm nodig dat er nog niet is, zoals een klantenportaal, dan is dat een apart voorstel.",
    },
    {
      q: "Is dit iets voor mijn bedrijf?",
      a: "Ja, als je tot 15 medewerkers hebt en wil begrijpen wat er in je zaak draait. Heb je meer medewerkers, vraag dan een gesprek met Karel aan: dan past de vaste prijs niet en bekijken we wat wel past.",
    },
  ],
};

// 7. "Oké, en nu?"
export const SLOT = {
  h2: "Begin vanavond met je eigen AI\u2011brein.",
  p: "Ook als je daarna niets laat bouwen, heb je een AI die je zaak kent en een lijst met wat er misloopt. Voor de eerste 20 deelnemers € 95, daarna € 295.",
  secundair: "Eerst praten? Vraag een gesprek met Karel aan.",
  gesprekKnop: CTA_GESPREK,
};

export const FORM = {
  titel: "Vraag een gesprek met Karel aan",
  intro: "Laat je gegevens achter. Karel belt je binnen de twee werkdagen en zegt je of dit iets voor jou is, ook als het antwoord nee is.",
  velden: {
    naam: "Naam",
    zaak: "Zaak",
    email: "E-mail",
    telefoon: "Telefoonnummer",
    vraag: "Waar wil je het over hebben? (optioneel)",
  },
  submit: "Vraag het gesprek aan",
  bezig: "Versturen...",
  klaarTitel: "Bedankt.",
  klaar: "Karel belt je binnen de twee werkdagen.",
  fout: "Er ging iets mis. Stuur ons een WhatsApp:",
  sluiten: "Sluiten",
};

export const FOOTER = {
  bedrijf: "Finit Solutions BV",
  plaats: "Leuven, België",
  links: [
    { label: "Privacy", href: "/privacy" },
    { label: "Algemene voorwaarden", href: "/algemene-voorwaarden" },
    { label: "Cookieverklaring", href: "/cookieverklaring" },
  ],
};
