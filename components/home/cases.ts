/**
 * De cases: één bestand, één lijst. Een nieuwe case toevoegen = een object
 * bovenaan CASE_LIJST zetten (nieuwste eerst). De homepage toont de eerste zes,
 * /cases toont alles, en elke case krijgt vanzelf een pagina op /cases/<slug>.
 * De leestijd wordt uitgerekend, die hoef je niet in te vullen.
 *
 * `voorbeeld: true` is een voorbeeldcase met verzonnen inhoud, als opvulling tot
 * er echte zijn. Die krijgt het label "Voorbeeld" op de kaart en de pagina, en
 * wordt niet geïndexeerd door zoekmachines. Vervang of verwijder ze voor de site
 * live gaat met echte cases.
 *
 * De drie cases zonder dat label (webshop, gidsbedrijf, recruitmentbureau)
 * gebruiken alleen wat al op de site stond, in de resultatensectie en de FAQ.
 * Daarom noemen ze geen merken van software en geen extra cijfers.
 *
 * `tools` zijn namen uit LOGOS in copy.ts (met logo); `koppelingen` is vrije
 * tekst, voor systemen zonder logo of waarvan we het merk niet noemen.
 */

import { LOGOS, type Logo } from "./copy";

export type Case = {
  slug: string;
  titel: string;
  sector: string;
  samenvatting: string;
  /** Het eerste cijfer staat groot op de kaart. */
  cijfers: { getal: string; label: string }[];
  tools?: string[];
  koppelingen?: string[];
  uitdaging: string[];
  aanpak: { intro: string; stappen: { titel: string; tekst: string }[] };
  resultaat: string[];
  quote?: { tekst: string; naam: string };
  voorbeeld?: boolean;
};

export const CASE_LIJST: Case[] = [
  {
    slug: "orderpipeline-webshop",
    titel: "Volledige orderpipeline geautomatiseerd bij een webshop",
    sector: "E-commerce",
    samenvatting: "Orders, supportmails en trackingvragen liepen met de hand door één mailbox. Nu sorteert een AI-werknemer alles en zet hij bestellingen klaar ter controle.",
    cijfers: [
      { getal: "20 → 2 min", label: "per standaardorder" },
      { getal: "60 tot 70%", label: "van de supportvragen automatisch beantwoord" },
    ],
    koppelingen: ["Mailbox", "Webshop", "Kennisbank"],
    uitdaging: [
      "Een webshop verwerkte elke dag orders, supportmails, trackingvragen en betalingsopvolging. Alles kwam binnen in één mailbox, en alles ging met de hand.",
      "Die mailbox werd de bottleneck van het bedrijf. Hoe meer bestellingen, hoe meer tijd er naar mails ging in plaats van naar groei.",
    ],
    aanpak: {
      intro: "We koppelden de mailbox aan de webshop en aan een kennisbank met de antwoorden op de vragen die altijd terugkomen.",
      stappen: [
        { titel: "Sorteren", tekst: "Elke binnenkomende mail krijgt een categorie: bestelling, levering, retour of iets anders." },
        { titel: "Beantwoorden", tekst: "Standaardvragen, zoals waar een pakje blijft, krijgen een antwoord op basis van de gegevens in de webshop." },
        { titel: "Klaarzetten", tekst: "Bestellingen worden voorbereid in de webshop, zodat een medewerker alleen nog controleert." },
        { titel: "Doorsturen", tekst: "Is een vraag te complex, dan gaat ze naar een echte medewerker." },
      ],
    },
    resultaat: [
      "Standaardorders verwerkt in 2 minuten in plaats van 20",
      "60 tot 70% van de supportvragen automatisch beantwoord",
      "Veel minder repetitief mailwerk",
      "Meer tijd voor groei en klantopvolging",
    ],
  },
  {
    slug: "offertes-installatiebedrijf",
    titel: "Offertes op dezelfde dag de deur uit bij een installatiebedrijf",
    sector: "Bouw & installatie",
    samenvatting: "Aanvragen voor warmtepompen en ketels bleven dagen liggen. Nu staat de offerte klaar voor de zaakvoerder ze nakijkt, met de echte prijzen en marges.",
    cijfers: [
      { getal: "45 → 10 min", label: "per offerte" },
      { getal: "Dezelfde dag", label: "antwoord op elke aanvraag" },
    ],
    tools: ["Gmail", "WhatsApp", "Teamleader"],
    uitdaging: [
      "Een installatiebedrijf kreeg elke week tientallen aanvragen voor warmtepompen, ketels en airco's, via mail en via WhatsApp.",
      "De zaakvoerder maakte elke offerte 's avonds zelf. Aanvragen bleven dagen liggen, en wie niet snel een prijs kreeg, vroeg er elders een.",
    ],
    aanpak: {
      intro: "Op het fundament van het bedrijf, met de prijzen, marges en standaardopstellingen, bouwden we een AI-werknemer voor offertes.",
      stappen: [
        { titel: "Aanvraag lezen", tekst: "Uit elke mail of WhatsApp haalt hij wat de klant wil, en hij vraagt na wat ontbreekt." },
        { titel: "Offerte opmaken", tekst: "Met de echte prijzen en marges, in de huisstijl, klaar in Teamleader." },
        { titel: "Nakijken", tekst: "De zaakvoerder kijkt de offerte na en drukt op verzenden." },
        { titel: "Opvolgen", tekst: "Na drie dagen geen antwoord? Dan staat er een opvolgmail klaar." },
      ],
    },
    resultaat: [
      "Een offerte in 10 minuten in plaats van 45",
      "Elke aanvraag op dezelfde dag beantwoord",
      "Geen enkele offerte meer zonder opvolging",
    ],
    voorbeeld: true,
  },
  {
    slug: "boekingen-planning-gidsbedrijf",
    titel: "Boekingen, planning en facturatie op één plek bij een gidsbedrijf",
    sector: "Toerisme",
    samenvatting: "Twintig gidsen, drie kanalen en alles met de hand. Nu komt elke boeking op één plek binnen en wordt de juiste gids automatisch ingepland.",
    cijfers: [
      { getal: "3 → 1", label: "kanalen in één overzicht" },
      { getal: "20", label: "gidsen automatisch ingepland" },
    ],
    koppelingen: ["Website", "WhatsApp", "Mailbox", "Agenda's", "Facturatie"],
    uitdaging: [
      "Een gidsbedrijf met twintig gidsen kreeg boekingen binnen via de website, via WhatsApp en via mail. Er was geen centraal overzicht.",
      "Planning, opvolging en facturatie gebeurden volledig met de hand. Elke boeking betekende heen en weer berichten met de klant en met de gids.",
    ],
    aanpak: {
      intro: "We bouwden één systeem dat alle aanvragen samenbrengt en de rest van het proces overneemt.",
      stappen: [
        { titel: "Binnenkomen", tekst: "Elke boeking, uit elk kanaal, komt op één plek binnen." },
        { titel: "Inplannen", tekst: "De juiste gids wordt gecontacteerd en ingepland, en de agenda's blijven gelijk." },
        { titel: "Bevestigen", tekst: "Klant en gids krijgen automatisch een bevestiging." },
        { titel: "Factureren", tekst: "De facturen worden automatisch opgesteld." },
      ],
    },
    resultaat: [
      "Alle communicatie en planning op één plek",
      "Quasi geen manuele administratie meer",
      "Sneller opvolgen van klanten en gidsen",
      "Volledige focus op ondernemen",
    ],
  },
  {
    slug: "werkbon-tot-factuur-elektriciteitsbedrijf",
    titel: "Van werkbon tot factuur zonder overtypen bij een elektriciteitsbedrijf",
    sector: "Bouw & installatie",
    samenvatting: "Werkbonnen kwamen als foto binnen op WhatsApp en werden op kantoor overgetypt. Nu wordt elke werkbon meteen een factuur ter controle.",
    cijfers: [
      { getal: "0 min", label: "overtypen per werkbon" },
      { getal: "Dezelfde dag", label: "gefactureerd" },
    ],
    tools: ["WhatsApp", "Odoo", "Google Drive"],
    uitdaging: [
      "Techniekers stuurden hun werkbonnen als foto via WhatsApp. Op kantoor typte iemand elke bon over in het boekhoudpakket.",
      "Facturen vertrokken daardoor pas dagen na de klus, en bij het overtypen slopen er fouten in de uren en het materiaal.",
    ],
    aanpak: {
      intro: "We koppelden WhatsApp aan het boekhoudpakket, met de materiaallijst en de tarieven uit het fundament.",
      stappen: [
        { titel: "Werkbon lezen", tekst: "Hij leest de foto van de bon: klant, uren en materiaal." },
        { titel: "Nakijken", tekst: "Klopt het materiaal met de lijst? Ontbreekt er iets, dan vraagt hij het na bij de technieker." },
        { titel: "Factuur klaarzetten", tekst: "In Odoo, met de juiste tarieven, ter controle." },
        { titel: "Archiveren", tekst: "De originele bon komt in de juiste map in Google Drive." },
      ],
    },
    resultaat: [
      "Geen werkbonnen meer overtypen",
      "Facturen op de dag van de klus",
      "Minder fouten in uren en materiaal",
    ],
    voorbeeld: true,
  },
  {
    slug: "sollicitaties-recruitmentbureau",
    titel: "Elke sollicitant dezelfde dag opgevolgd bij een recruitmentbureau",
    sector: "Recruitment",
    samenvatting: "Cv's lezen, kandidaten mailen en gesprekken plannen gebeurde met de hand. Nu screent een AI-werknemer elke sollicitatie en plant hij meteen een gesprek in.",
    cijfers: [
      { getal: "Dezelfde dag", label: "opvolging, in plaats van dagen wachten" },
      { getal: "0", label: "extra personeel nodig" },
    ],
    koppelingen: ["Mailbox", "Agenda", "Cv's"],
    uitdaging: [
      "Een recruitmentbureau verwerkte sollicitaties volledig met de hand: cv's lezen, kandidaten mailen, gesprekken plannen.",
      "Kandidaten wachtten daardoor dagen op een eerste reactie.",
    ],
    aanpak: {
      intro: "We bouwden een AI-werknemer die elke sollicitatie opvangt zodra ze binnenkomt.",
      stappen: [
        { titel: "Screenen", tekst: "Binnenkomende cv's worden gelezen en naast de vacature gelegd." },
        { titel: "Inplannen", tekst: "Past de kandidaat, dan wordt er automatisch een kennismakingsgesprek ingepland." },
        { titel: "Informeren", tekst: "Kandidaten worden op de hoogte gehouden van elke stap." },
      ],
    },
    resultaat: [
      "Van dagen wachten naar opvolging op dezelfde dag",
      "Geen extra personeel nodig",
      "Minder administratie voor het team",
    ],
  },
  {
    slug: "leadopvolging-vastgoedkantoor",
    titel: "Geen enkele lead meer vergeten bij een vastgoedkantoor",
    sector: "Vastgoed",
    samenvatting: "Aanvragen voor bezichtigingen kwamen 's avonds en in het weekend binnen en bleven liggen tot maandag. Nu krijgt elke lead binnen twee minuten antwoord.",
    cijfers: [
      { getal: "2 min", label: "tot het eerste antwoord, ook 's avonds" },
      { getal: "0", label: "vergeten leads" },
    ],
    tools: ["Outlook", "Google Agenda", "Pipedrive"],
    uitdaging: [
      "Een vastgoedkantoor kreeg de meeste aanvragen buiten de kantooruren, via de website en via de immoportalen.",
      "Tegen dat iemand maandag antwoordde, had de kandidaat al bij een ander kantoor een bezichtiging gepland.",
    ],
    aanpak: {
      intro: "Met de panden, de agenda's van de makelaars en de huistaal van het kantoor in het fundament bouwden we een AI-werknemer voor leads.",
      stappen: [
        { titel: "Antwoorden", tekst: "Binnen twee minuten een persoonlijk antwoord, met de info over het pand." },
        { titel: "Inplannen", tekst: "Vrije momenten uit de agenda van de makelaar, meteen voorgesteld." },
        { titel: "Opvolgen", tekst: "Na de bezichtiging een mail met de volgende stap." },
        { titel: "Overdragen", tekst: "Warme leads komen bovenaan in Pipedrive." },
      ],
    },
    resultaat: [
      "Elke lead binnen 2 minuten beantwoord, ook 's avonds",
      "Bezichtigingen ingepland zonder heen en weer te mailen",
      "Geen enkele lead meer vergeten",
    ],
    voorbeeld: true,
  },
];

/** De sectoren in de volgorde waarin ze voor het eerst voorkomen, voor de filter. */
export const SECTOREN = Array.from(new Set(CASE_LIJST.map((c) => c.sector)));

export function logoVoor(naam: string): Logo | undefined {
  return LOGOS.find((l) => l.naam === naam);
}

/** Leestijd in minuten, aan 200 woorden per minuut. */
export function leestijd(c: Case): number {
  const tekst = [
    c.titel,
    c.samenvatting,
    ...c.uitdaging,
    c.aanpak.intro,
    ...c.aanpak.stappen.flatMap((s) => [s.titel, s.tekst]),
    ...c.resultaat,
    c.quote?.tekst ?? "",
  ].join(" ");
  return Math.max(1, Math.round(tekst.split(/\s+/).length / 200));
}
