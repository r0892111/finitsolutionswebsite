/**
 * Alle tekst van de homepage staat hier, los van de opmaak.
 *
 * Basis: de copy en schrijfstijl van de vorige homepage (de versie waar de
 * digital marketeer op itereerde) en van de landingspagina's in
 * components/landing. Alleen aangepast wat het nieuwe model vereist:
 * de klant bouwt eerst zelf zijn AI-brein in een lesreeks (€95 → €295),
 * daarna bouwen wij voor een vaste prijs (€4.500), daarna onderhoud (€90/mnd).
 * Geen AI Audit van €3.500 meer, geen "cursus" (het heet een lesreeks).
 */

export const NAV = [
  { label: "Hoe het werkt", href: "#hoe-het-werkt" },
  { label: "Prijzen", href: "#prijzen" },
  { label: "Resultaten", href: "#resultaten" },
  { label: "Vragen", href: "#faq" },
];

export const CTA_LESREEKS = "Start de lesreeks";
export const CTA_GESPREK = "Plan een kennismakingsgesprek";

// 1. Hero (vorige homepage + bullets van de landingspagina's)
export const HERO = {
  h1: ["Minder administratie.", "Meer tijd voor je bedrijf."],
  sub: "Je bouwt eerst zelf een AI-brein dat jouw bedrijf kent. Daarop bouwen wij AI-oplossingen op maat die repetitieve processen automatiseren. Zo werkt je team sneller, maak je minder fouten en hou je meer tijd over voor klanten.",
  punten: [
    "Je leert de AI eerst jouw manier van werken kennen",
    "We bepalen samen waar AI het meeste tijd oplevert",
    "We bouwen en integreren het met de tools die je al gebruikt",
  ],
  ondersteund: "Ondersteund door",
};

/** Het beeld in de hero: het AI-brein als ruimtelijke structuur. */
export const BREIN_3D = {
  aria: "Het AI-brein van een installatiebedrijf als ruimtelijke structuur: pagina's zoals Offertes, Klanten, Prijzen en Planning die naar elkaar verwijzen.",
  onderschrift: "Het AI-brein: de kennisstructuur van jouw bedrijf, waarop elke automatisering verderbouwt.",
};

// 2. Herken jij dit? (vorige homepage + landingspagina's)
export const HERKEN = {
  h2: "Herken jij dit?",
  intro: "We spreken dagelijks ondernemers. Dit zijn de frustraties die we het vaakst horen.",
  items: [
    "Je weet dat AI interessant is, maar je weet niet waar je moet beginnen.",
    "Je hebt ChatGPT al geprobeerd, maar het kent jouw bedrijf niet. Dus doe je het uiteindelijk toch zelf.",
    "Je weet dat AI kansen biedt, maar je wil geen tienduizenden euro's verspillen aan iets dat niets oplevert.",
    "Je wil eerst weten waar AI vandaag écht tijd kan besparen binnen jouw bedrijf.",
    "Je zoekt geen AI-tool, maar iemand die meedenkt over hoe jouw bedrijf werkt.",
    "Je wil klein starten, snel resultaat zien en daarna verder bouwen.",
  ],
  overgang: "Het hoeft niet zo te zijn.",
};

// 3. Wij zorgen ervoor dat AI jouw werk overneemt (landingspagina's)
export const OPLOSSING = {
  h2: "Wij zorgen ervoor dat AI jouw werk overneemt",
  intro: "Op basis van onze ervaring is dit de gemiddelde besparing bij onze klanten.",
  zonder: { label: "Zonder AI", getal: "15+", eenheid: "uur administratie per week" },
  met: { label: "Met AI", getal: "2", eenheid: "uur administratie per week" },
  kaarten: [
    {
      titel: "Je offerte gaat de deur uit binnen de minuut",
      body: "Klant vraagt een prijs? Je AI-werknemer maakt de offerte op basis van jouw prijzen, stuurt hem door en plant de opvolging. Jij hoeft niks te doen.",
    },
    {
      titel: "Je agenda vult zichzelf aan",
      body: "Klanten sturen naar je WhatsApp-nummer. Je AI-werknemer reageert, plant de afspraak in en stuurt een bevestiging, herinnering en opvolging.",
    },
    {
      titel: "Je verliest geen potentiële klanten meer",
      body: "Elk prospect krijgt op het juiste moment de juiste mail, zonder dat jij eraan moet denken.",
    },
  ],
  breedteTitel: "En alles wat repetitief is in jouw bedrijf",
  breedteBody: "In de lesreeks breng je zelf in kaart wat je team dagelijks doet. Daaruit volgt wat er kan.",
  koppelingen: "We integreren met al je tools:",
};

export const LOGOS = [
  { naam: "Teamleader", src: "/Teamleader_Icon.svg" },
  { naam: "Outlook", src: "/Microsoft_Office_Outlook_(2018–2024).svg" },
  { naam: "Gmail", src: "/Gmail_icon_(2020).png" },
  { naam: "Excel", src: "/Microsoft_Office_Excel_(2019–2025).svg" },
  { naam: "Microsoft Teams", src: "/Microsoft_Office_Teams_(2019–2025).svg" },
  { naam: "Pipedrive", src: "/Pipedrive_id-7ejZnwv_0.svg" },
  { naam: "Shopify", src: "/shopify_icon.png" },
  { naam: "Stripe", src: "/Stripe_Logo,_revised_2016.svg.webp" },
];

export type Stap = {
  nummer: string;
  tijd: string;
  titel: string;
  punten: string[];
  prijs: string;
  prijsDetail: string;
  cta?: string;
  ctaNoot?: string;
};

// 4. Hoe wij AI voor jou laten werken (landingspagina's, met de prijzen van het nieuwe model)
export const HOE = {
  h2: "Hoe wij AI voor jou laten werken",
  intro: "In drie stappen. Je kent de prijs van elke stap op voorhand.",
  stappen: [
    {
      nummer: "1",
      tijd: "2 tot 3 weken · jij, met de AI",
      titel: "De lesreeks: bouw je AI-brein",
      punten: [
        "Je leert de AI jouw manier van werken kennen, door erover te praten",
        "Je ziet exact waar je vandaag tijd verliest",
        "Je krijgt een lijst van wat meteen automatiseerbaar is",
      ],
      prijs: "€ 95",
      prijsDetail: "excl. btw voor de eerste 20 deelnemers, daarna € 295. Plus je eigen Claude-abonnement (± € 20 per maand).",
      cta: CTA_LESREEKS,
      ctaNoot: "Online, in het Nederlands, op eigen tempo. Je betaalt via Skool, ons lesplatform.",
    },
    {
      nummer: "2",
      tijd: "Vaste prijs · wij",
      titel: "De bouw",
      punten: [
        "We automatiseren offertes, opvolging en/of administratie",
        "We koppelen je tools zodat alles samenwerkt",
        "Alles op maat van jouw manier van werken",
      ],
      prijs: "€ 4.500",
      prijsDetail: "excl. btw, vaste prijs. Wat we bouwen, leggen we vooraf op één A4 vast. Inclusief 30 dagen nazorg.",
    },
    {
      nummer: "3",
      tijd: "24/7 actief",
      titel: "Resultaat",
      punten: [
        "Offertes worden automatisch verstuurd en opgevolgd",
        "Minder manueel werk voor jou en je team",
        "Meer omzet zonder extra personeel",
      ],
      prijs: "€ 90",
      prijsDetail: "per maand, excl. btw, voor hosting, updates en opvolging. Maandelijks opzegbaar.",
    },
  ] as Stap[],
  aanpak: {
    h3: "Hoe pakken we dit aan?",
    p1: "We starten niet met AI-tools, maar met inzicht in hoe jouw bedrijf werkt. Daarom begint elk traject met jouw AI-brein: een centrale kennisstructuur waarin je processen, systemen, informatie en werkwijze samenkomen. Vroeger bouwden wij dat tijdens een audit van € 3.500. Nu bouw je het zelf, in de lesreeks, omdat jij je bedrijf beter kent dan wij.",
    p2: "Nieuwe automatiseringen bouwen verder op die kennis, waardoor ze sneller ontwikkeld worden, beter samenwerken en eenvoudiger uitbreidbaar zijn. Zo bouw je geen losse AI-tools, maar een fundament waarop toekomstige automatiseringen kunnen verderbouwen naarmate je bedrijf groeit. En omdat het grondwerk al gedaan is, kunnen wij de bouw voor een vaste prijs doen.",
    lijstTitel: "In de lesreeks breng je in kaart:",
    lijst: [
      "Hoe je team vandaag werkt",
      "Waar tijd verloren gaat",
      "Welke taken repetitief zijn",
      "Waar automatisering de grootste impact heeft",
      "Welke opportuniteiten snel resultaat kunnen opleveren",
    ],
  },
};

// 5. Resultaten uit de praktijk (vorige homepage) + quote (landingspagina's)
export const RESULTATEN = {
  h2: "Resultaten uit de praktijk",
  intro: "Minder administratie, snellere processen en meer tijd voor klanten.",
  cases: [
    {
      sector: "E-commerce",
      uitdaging: "Een webshop verwerkte dagelijks manueel orders, supportmails, trackingvragen en betalingsopvolging. De mailbox werd de bottleneck van het bedrijf.",
      aanpak: "We bouwden een intelligent mailsysteem dat inkomende mails automatisch categoriseert, standaardvragen verwerkt en bestellingen voorbereidt voor controle.",
      resultaat: [
        "Standaardorders verwerkt in 2 minuten i.p.v. 20",
        "60 tot 70% van supportvragen automatisch verwerkt",
        "Van 50 naar 5 mails per dag",
      ],
    },
    {
      sector: "Toerisme / gidsbedrijf",
      uitdaging: "Boekingen kwamen binnen via website, WhatsApp en mail, zonder centraal overzicht. Planning, opvolging en facturatie gebeurden volledig manueel.",
      aanpak: "We bouwden één centraal systeem dat aanvragen automatisch verwerkt, gidsen inplant, agenda's synchroniseert en opvolging automatiseert.",
      resultaat: [
        "Alle communicatie en planning gecentraliseerd",
        "Quasi geen manuele administratie meer",
        "Meer focus op ondernemen i.p.v. operationeel werk",
      ],
    },
  ],
  labels: { uitdaging: "Uitdaging", aanpak: "Aanpak", resultaat: "Resultaat" },
  quote: "Snelle oplevering, sympathieke gasten. Ik wist niet dat AI vandaag al zoveel werk kon overnemen!",
  naam: "Bas, PRS Rotselaar",
  foto: "/papa foto.jpg",
};

// 6. Waarom bedrijven voor Finit kiezen (vorige homepage, aangepast aan het model)
export const WAAROM = {
  h2: "Waarom bedrijven voor Finit kiezen",
  intro: "We vertrekken vanuit hoe jouw bedrijf werkt, zodat we automatiseringen bouwen die blijvende waarde opleveren.",
  pijlers: [
    {
      titel: "Eerst begrijpen, dan bouwen",
      body: "Je brengt eerst in kaart hoe je bedrijf vandaag werkt, voor er één oplossing gebouwd wordt.",
    },
    {
      titel: "Geen losse AI-tools",
      body: "We bouwen op jouw AI-brein: een fundament waarop toekomstige automatiseringen kunnen verderbouwen.",
    },
    {
      titel: "Vaste prijzen, op voorhand",
      body: "Van lesreeks tot werkende oplossing weet je vooraf wat het kost. Geen open offertes achteraf.",
    },
    {
      titel: "Jullie eigendom",
      body: "Je AI-brein is van jou, en wat we ontwikkelen blijft eigendom van jouw bedrijf.",
    },
  ],
};

export type FaqBlok = { t: "p"; tekst: string } | { t: "h"; tekst: string } | { t: "list"; items: string[] };
export type FaqItem = { q: string; a: FaqBlok[] };

// 7. Veelgestelde vragen (vorige homepage, aangepast waar het model verandert)
export const VRAGEN: { h2: string; items: FaqItem[] } = {
  h2: "Veelgestelde vragen",
  items: [
    {
      q: "Wat is een AI-brein precies?",
      a: [
        { t: "p", tekst: "Een centrale kennisstructuur van jouw bedrijf: hoe je werkt, wat je aanrekent, wie wat doet, welke systemen je gebruikt en waar tijd verloren gaat. Opgeschreven in gewone taal, zo opgebouwd dat een AI het kan lezen en gebruiken." },
        { t: "p", tekst: "Daardoor kent de AI jouw bedrijf bij elke vraag die je stelt, en bouwt elke automatisering die we daarna maken verder op dezelfde kennis. Je bouwt het zelf op in de lesreeks, door over je bedrijf te praten. De AI schrijft het op." },
      ],
    },
    {
      q: "Welke processen kunnen jullie automatiseren?",
      a: [
        { t: "p", tekst: "De vuistregel: doet je team het nu handmatig, en volgt het vaste stappen? Dan kunnen wij het overnemen." },
        { t: "h", tekst: "Enkele succesverhalen bij onze klanten:" },
        { t: "list", items: [
          "E-commerce: een webshop kreeg dagelijks 50 klantemails over bestellingen, leveringen en retouren, allemaal handmatig beantwoord. We koppelden zijn mailbox aan webshop en kennisbank. Resultaat: van 50 naar 5 mails per dag.",
          "Gidsbedrijf: een bedrijf met 20 gidsen verwerkte alle boekingen handmatig via website, WhatsApp en mail. We bouwden één AI-systeem dat boekingen verwerkt, de juiste gids inplant en bevestigingen en facturen automatisch opstelt. Resultaat: geen administratie meer.",
          "Recruitmentbureau: sollicitaties werden handmatig verwerkt. Het AI-systeem screent cv's, plant een kennismakingsgesprek in en houdt kandidaten op de hoogte. Resultaat: van dagen wachten naar opvolging op dezelfde dag, zonder extra personeel.",
        ] },
        { t: "p", tekst: "Jij kent je bedrijf, wij de technologie. In de lesreeks breng je zelf in kaart waar de opportuniteiten liggen. In het strategiegesprek daarna kiezen we samen wat we bouwen." },
      ],
    },
    {
      q: "Werkt dit samen met onze bestaande software?",
      a: [
        { t: "p", tekst: "Ja, juist daarom bouwen we automatiseringen: we verbinden je bestaande tools met elkaar." },
        { t: "h", tekst: "Types software waar we mee werken:" },
        { t: "list", items: [
          "CRM-systemen (Teamleader, HubSpot, Salesforce, ...)",
          "Boekhoudpakketten (Exact Online, Yuki, ...)",
          "E-mail en marketingplatformen (Gmail, Outlook, Mailchimp, ...)",
          "Cloud-opslag (Google Drive, OneDrive, Dropbox, ...)",
          "Betalingsplatformen (Stripe, Mollie, PayPal, ...)",
        ] },
        { t: "h", tekst: "Hoe we koppelen" },
        { t: "p", tekst: "Als je software een API heeft (vrijwel alle moderne systemen sinds 2015), kunnen we het koppelen. Geen API? Dan zoeken we een workaround via e-mail, geëxporteerde bestanden of webhooks. In 95% van de gevallen vinden we een oplossing." },
        { t: "p", tekst: "Je hoeft geen nieuwe software aan te schaffen. We werken met wat je al hebt en laten die systemen samenwerken. Onzeker of jouw tools compatibel zijn? Stuur ons de lijst, dan checken we het vooraf, gratis en zonder verplichtingen." },
      ],
    },
    {
      q: "Wat kost dit voor mijn bedrijf?",
      a: [
        { t: "p", tekst: "Je kent elke prijs op voorhand. Geen verrassingen achteraf." },
        { t: "list", items: [
          "De lesreeks: € 95 voor de eerste 20 deelnemers, daarna € 295. Eenmalig. Daar komt je eigen Claude-abonnement bij, ongeveer € 20 per maand.",
          "De bouw: € 4.500, vaste prijs, inclusief 30 dagen nazorg. Alleen als jij daarvoor kiest.",
          "Het onderhoud: € 90 per maand voor hosting, updates en opvolging. Maandelijks opzegbaar.",
        ] },
        { t: "p", tekst: "Concreet voorbeeld: als je team 10 uur per week kwijt is aan handmatige taken, kost dat je € 15.000 tot € 20.000 per jaar. Een bouw van € 4.500 verdient zichzelf terug in 3 tot 6 maanden. En daarna blijft het werken, jaar na jaar, met minimale extra kosten." },
        { t: "p", tekst: "Alle prijzen excl. btw." },
      ],
    },
    {
      q: "Is dit niet te duur voor een KMO van onze grootte?",
      a: [
        { t: "p", tekst: "Juist voor KMO's is dit interessant. Grote bedrijven hebben IT-afdelingen; jij betaalt voor repetitief werk dat een systeem kan overnemen." },
        { t: "p", tekst: "Te klein om te starten? Begin met de lesreeks. Voor € 95 weet je waar AI in jouw bedrijf loont, voor je één euro aan ontwikkeling uitgeeft. Daarna bouwen we gefaseerd: start met de grootste tijdvreter, breid later uit als je de waarde ziet." },
      ],
    },
    {
      q: "Hoeveel tijd besparen we hier realistisch mee?",
      a: [
        { t: "p", tekst: "Tussen de 80% en 100% van de tijd op dat specifieke proces." },
        { t: "h", tekst: "Waarom zo hoog?" },
        { t: "p", tekst: "Simpel: wij adviseren geen automatiseringen met lage opbrengst. Als een proces maar 30 tot 40% efficiëntiewinst oplevert, zeggen we eerlijk dat het de investering niet waard is. Daarom rolt er uit je lesreeks een lijst op volgorde van wat het meeste oplevert." },
        { t: "h", tekst: "Concrete voorbeelden" },
        { t: "list", items: [
          "Leadopvolging: nu 6 uur per week, na automatisering 0 uur.",
          "Offertes: van dagen wachten naar binnen de minuut verstuurd.",
          "Lead om 18u binnen? Binnen 2 minuten beantwoord, ook buiten kantooruren.",
        ] },
      ],
    },
    {
      q: "Hoe lang duurt het voor de automatisering live staat?",
      a: [
        { t: "list", items: [
          "Fase 1: de lesreeks (2 tot 3 weken). Je bouwt je AI-brein en ziet waar de winst zit. Geen maanden voorbereiding.",
          "Fase 2: de bouw (2 tot 6 weken). We bouwen en testen de automatisering. Je ziet tussentijds al resultaten.",
          "Fase 3: nazorg (30 dagen). Het systeem is live en jullie gebruiken het. Wij kijken intensief mee en lossen direct op als er iets niet perfect loopt.",
        ] },
        { t: "p", tekst: "Die nazorg is cruciaal: theorie en praktijk kunnen verschillen, en wij blijven erbij tot het écht werkt voor jouw team." },
      ],
    },
    {
      q: "Moet ik technisch zijn, of mijn team scholen?",
      a: [
        { t: "p", tekst: "Nee. In de lesreeks installeer je Claude (de AI waarmee we werken) met een stap-voor-stap video, en daarna praat je over je bedrijf. De map en de instructies voor de AI krijg je kant-en-klaar. Zit je vast, dan stel je je vraag in de community en helpen Alex en Karel je verder." },
        { t: "p", tekst: "Jouw team hoeft geen technische kennis te hebben. Wat ze wél moeten weten: wat de automatisering doet, en waar ze een mail of een offerte vinden die klaarstaat. We begeleiden dit met een praktische walkthrough tijdens de nazorg." },
      ],
    },
    {
      q: "Wat als er iets misloopt met de automatisering?",
      a: [
        { t: "p", tekst: "Elke oplossing heeft een test- en integratieperiode. Tijdens de nazorg kijken we aandachtig mee naar alle handelingen. Pas als alles perfect verloopt, ronden we af." },
        { t: "p", tekst: "Na oplevering laten we je niet in de steek. Elke oplossing bevat ingebouwde monitoring: wij worden onmiddellijk verwittigd als er iets hapert. Bug? Gratis. API veranderd? Gratis. Onze verantwoordelijkheid, niet de jouwe." },
        { t: "p", tekst: "En jij bepaalt per taak wat de AI zelf mag versturen en wat eerst langs jou passeert." },
      ],
    },
    {
      q: "Wat gebeurt er als we later willen uitbreiden?",
      a: [
        { t: "p", tekst: "Uitbreiden is makkelijk, en dat adviseren we vaak bewust. Start met één proces dat veel oplevert, en breid uit zodra dat draait. Kleiner risico per stap, en je ziet meteen wat het oplevert." },
        { t: "p", tekst: "Technisch bouwen we modulair op jouw AI-brein: een nieuwe automatisering sluit aan op de bestaande. Geen grote herbouw nodig." },
      ],
    },
    {
      q: "Wat gebeurt er met de gegevens van mijn klanten?",
      a: [
        { t: "p", tekst: "Je AI-brein staat op je eigen computer. Wij bewaren een afgeschermde kopie zodat we het kunnen nakijken voor we bouwen. Ruwe gegevens uit je mailbox of agenda blijven op je computer; alleen wat de AI eruit leert, komt in je brein." },
        { t: "p", tekst: "Wat je aan de AI vertelt, gaat net als bij ChatGPT langs de servers van de maker. In de lesreeks tonen we welke privacy-instelling je daar aanzet voor je ook maar één mail deelt." },
      ],
    },
  ],
};

// 8. Slot (vorige homepage)
export const SLOT = {
  h2: "Ontdek wat AI jouw bedrijf oplevert",
  p: "Start met de lesreeks en weet binnen drie weken waar AI in jouw bedrijf loont. Liever eerst praten? In 30 minuten bespreken we je huidige situatie en maken we een inschatting van wat mogelijk is.",
  micro: "We werken met een beperkt aantal bedrijven tegelijk.",
  gesprekKnop: CTA_GESPREK,
};

export const FORM = {
  titel: "Plan een kennismakingsgesprek",
  intro: "Vul je gegevens in en we nemen binnen 48 uur contact op om een geschikt moment te vinden.",
  velden: {
    naam: "Naam",
    zaak: "Bedrijf",
    email: "E-mailadres",
    telefoon: "Telefoonnummer",
  },
  submit: "Plan een gesprek",
  bezig: "Versturen...",
  onder: "Binnen 30 minuten weet je wat de mogelijkheden met AI zijn.",
  klaarTitel: "Bedankt!",
  klaar: "We nemen binnen 48 uur contact op om een geschikt moment te vinden.",
  fout: "Er ging iets mis. Stuur ons een WhatsApp:",
  sluiten: "Sluiten",
};

export const FOOTER = {
  bedrijf: "Finit Solutions BV",
  plaats: "Leuven, België",
  uren: "ma-za · 8u30-19u",
  links: [
    { label: "Privacybeleid", href: "/privacy" },
    { label: "Algemene voorwaarden", href: "/algemene-voorwaarden" },
    { label: "Cookieverklaring", href: "/cookieverklaring" },
    { label: "Disclaimer", href: "/disclaimer" },
  ],
};
