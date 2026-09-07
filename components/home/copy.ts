/**
 * Alle tekst van de homepage staat hier, los van de opmaak.
 *
 * Basis: de copy van de vorige homepage (de versie waar de digital marketeer
 * urenlang op itereerde) en van de landingspagina's in components/landing.
 * Die tekst is zin voor zin overgenomen. Alleen aangepast wat het nieuwe
 * model vereist: de klant bouwt eerst zelf zijn AI-brein in een lesreeks
 * (€ 95, daarna € 295), daarna bouwen wij voor een vaste prijs (€ 4.500),
 * daarna onderhoud (€ 90 per maand). Geen AI Audit van € 3.500 meer.
 * Het heet een lesreeks, geen cursus.
 */

// Navigatie: dezelfde opbouw en tekst als de vorige homepage.
export const NAV_DESKTOP = [
  { label: "Herken jij dit?", id: "recognition" },
  { label: "Onze aanpak", id: "aanpak" },
  { label: "Resultaten", id: "resultaten" },
  { label: "FAQ", id: "faq" },
  { label: "Contact", id: "contact" },
];

export const NAV_MOBIEL = [
  { label: "Home", id: "hero" },
  { label: "Wat AI kan", id: "use-cases" },
  { label: "Onze aanpak", id: "aanpak" },
  { label: "Resultaten", id: "resultaten" },
  { label: "Waarom Finit?", id: "waarom" },
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
export const CTA_KENNISMAKING = "Plan een kennismaking";
export const CTA_GESPREK_KORT = "Plan een gesprek";

// 1. Hero (vorige homepage; de laatste zin en de vinkjes komen van de landingspagina's)
export const HERO = {
  h1: ["Minder administratie.", "Meer tijd voor je bedrijf."],
  sub: "We bouwen maatwerk AI-oplossingen voor KMO's die repetitieve processen automatiseren. Zo werkt je team sneller, maak je minder fouten en hou je meer tijd over voor klanten. Je start met een lesreeks waarin je de AI zelf leert hoe jouw bedrijf werkt.",
  punten: [
    "Je leert de AI eerst jouw manier van werken kennen",
    "We bepalen samen waar AI het meeste tijd oplevert",
    "We bouwen en integreren het met de tools die je al gebruikt",
  ],
  ondersteund: "Ondersteund door",
};

/** Het beeld in de hero: het AI-brein als doorzichtige bol. */
export const BREIN_3D = {
  aria: "Het AI-brein van een installatiebedrijf als doorzichtige bol: pagina's zoals Offertes, Klanten, Prijzen en Planning die naar elkaar verwijzen.",
  onderschrift: "Het AI-brein: alle kennis over jouw bedrijf, met elkaar verbonden. Daarop bouwt elke automatisering verder.",
};

// 2. Herken jij dit? (vorige homepage; intro en slotzin van de landingspagina's)
export const HERKEN = {
  h2: "Herken jij dit?",
  intro: "We spreken dagelijks ondernemers. Dit zijn de frustraties die we het vaakst horen.",
  items: [
    "Je weet dat AI interessant is, maar je weet niet waar je moet beginnen.",
    "Je hebt al demo's gezien, maar niemand kon concreet tonen wat het jouw bedrijf oplevert.",
    "Je weet dat AI kansen biedt, maar je wil geen tienduizenden euro's verspillen aan iets dat niets oplevert.",
    "Je wil eerst weten waar AI vandaag écht tijd kan besparen binnen jouw bedrijf.",
    "Je zoekt geen AI-tool, maar iemand die meedenkt over hoe jouw bedrijf werkt.",
    "Je wil klein starten, snel resultaat zien en daarna verder bouwen.",
  ],
  overgang: "Het hoeft niet zo te zijn.",
};

// 3. Wij zorgen ervoor dat AI jouw werk overneemt (landingspagina's, letterlijk)
export const OPLOSSING = {
  h2: ["Wij zorgen ervoor dat AI jouw", "werk overneemt"],
  intro: "Op basis van onze ervaring is dit de gemiddelde besparing bij onze klanten.",
  zonder: { label: "Zonder AI", getal: "15+", eenheid: "uur administratie per week" },
  met: { label: "Met AI", getal: "2", eenheid: "uur administratie per week" },
  kaarten: [
    {
      titel: "Je offerte gaat de deur uit binnen de minuut",
      body: "Klant vraagt een prijs? Je AI-werknemer maakt de offerte, stuurt hem door en plant de opvolging. Jij hoeft niks te doen.",
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
  breedteBody: "Vertel ons wat je team dagelijks doet, wij laten zien wat er kan.",
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
  prijsLabel: string;
  prijs: string;
  prijsDetail: string;
  cta?: string;
  ctaNoot?: string;
};

// 4. Hoe wij AI voor jou laten werken (landingspagina's) + "Hoe pakken we dit aan?" (vorige homepage)
export const HOE = {
  h2: ["Hoe wij AI voor jou laten", "werken"],
  intro: "We starten niet met AI-tools, maar met inzicht in hoe jouw bedrijf werkt. Daarom begint elk traject met jouw AI-brein.",
  stappen: [
    {
      nummer: "01",
      tijd: "2 tot 3 weken",
      titel: "De lesreeks",
      punten: [
        "Je leert de AI jouw manier van werken kennen",
        "Je ziet exact waar je vandaag tijd verliest",
        "Je krijgt een lijst van wat meteen automatiseerbaar is",
      ],
      prijsLabel: "Lesreeks",
      prijs: "€ 95",
      prijsDetail: "excl. btw voor de eerste 20 deelnemers, daarna € 295. Plus je eigen Claude-abonnement, ± € 20 per maand.",
      cta: CTA_LESREEKS,
      ctaNoot: "Online, in het Nederlands, op eigen tempo.",
    },
    {
      nummer: "02",
      tijd: "2 tot 4 weken",
      titel: "Bouw",
      punten: [
        "We automatiseren offertes, opvolging en/of administratie",
        "We koppelen je tools zodat alles samenwerkt",
        "Alles op maat van jouw manier van werken",
      ],
      prijsLabel: "Vaste prijs",
      prijs: "€ 4.500",
      prijsDetail: "excl. btw. Inclusief 30 dagen nazorg.",
    },
    {
      nummer: "03",
      tijd: "24/7 actief",
      titel: "Resultaat",
      punten: [
        "Offertes worden automatisch verstuurd en opgevolgd",
        "Minder manueel werk voor jou en je team",
        "Meer omzet zonder extra personeel",
      ],
      prijsLabel: "Onderhoud",
      prijs: "€ 90",
      prijsDetail: "per maand, excl. btw, voor server, updates en opvolging. Maandelijks opzegbaar.",
    },
  ] as Stap[],
  brein: {
    h3: "Het AI-brein",
    p1: "Veel bedrijven experimenteren met AI zonder eerst te weten waar de grootste winst zit. Daardoor ontstaan losse oplossingen die weinig gebruikt worden of niet goed samenwerken. Daarom bouw je in de lesreeks eerst je AI-brein: een centrale kennisstructuur waarin processen, systemen, informatie en workflows samenkomen.",
    p2: "Nieuwe automatiseringen bouwen verder op die kennis, waardoor ze sneller ontwikkeld worden, beter samenwerken en eenvoudiger uitbreidbaar zijn. Zo bouw je geen losse AI-tools, maar een fundament waarop toekomstige automatiseringen kunnen verderbouwen naarmate je bedrijf groeit.",
    lijstTitel: "Zo breng je in kaart waar automatisering het meeste verschil kan maken:",
    lijst: [
      "Hoe je team vandaag werkt",
      "Waar tijd verloren gaat",
      "Welke taken repetitief zijn",
      "Waar automatisering de grootste impact heeft",
      "Welke opportuniteiten snel resultaat kunnen opleveren",
    ],
  },
};

// 5. Resultaten uit de praktijk (vorige homepage, letterlijk) + quote (landingspagina's)
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
        "Grote vermindering van repetitief mailwerk",
        "Meer tijd voor groei en klantopvolging",
      ],
    },
    {
      sector: "Toerisme / gidsbedrijf",
      uitdaging: "Boekingen kwamen binnen via website, WhatsApp en mail, zonder centraal overzicht. Planning, opvolging en facturatie gebeurden volledig manueel.",
      aanpak: "We bouwden één centraal systeem dat aanvragen automatisch verwerkt, gidsen inplant, agenda's synchroniseert en opvolging automatiseert.",
      resultaat: [
        "Alle communicatie en planning gecentraliseerd",
        "Quasi geen manuele administratie meer",
        "Sneller opvolgen van klanten en gidsen",
        "Meer focus op ondernemen i.p.v. operationeel werk",
      ],
    },
  ],
  labels: { uitdaging: "Uitdaging", aanpak: "Aanpak", resultaat: "Resultaat" },
  quote: "Snelle oplevering, sympathieke gasten. Ik wist niet dat AI vandaag al zoveel werk kon overnemen!",
  naam: "Bas, PRS Rotselaar",
  foto: "/papa foto.jpg",
};

// 6. Waarom bedrijven voor Finit kiezen (vorige homepage; alleen "AI Audit" is "lesreeks" geworden)
export const WAAROM = {
  h2: "Waarom bedrijven voor Finit kiezen",
  intro: "We vertrekken vanuit hoe jouw bedrijf werkt, zodat we automatiseringen bouwen die blijvende waarde opleveren.",
  pijlers: [
    { titel: "Eerst begrijpen, dan bouwen", body: "We analyseren hoe je bedrijf vandaag werkt voordat we oplossingen voorstellen." },
    { titel: "Geen losse AI-tools", body: "We bouwen een fundament waarop toekomstige automatiseringen kunnen verderbouwen." },
    { titel: "Van strategie tot implementatie", body: "Van lesreeks tot werkende oplossing: één partner voor het volledige traject." },
    { titel: "Jullie eigendom", body: "Alles wat we ontwikkelen blijft eigendom van jouw bedrijf." },
  ],
};

export type FaqBlok =
  | { t: "p"; tekst: string }
  | { t: "h"; tekst: string }
  | { t: "res"; tekst: string }
  | { t: "list"; items: string[] };
export type FaqItem = { q: string; a: FaqBlok[] };

// 7. Veelgestelde vragen (vorige homepage, letterlijk; drie nieuwe vragen voor de lesreeks en het brein)
export const VRAGEN: { h2: string; items: FaqItem[] } = {
  h2: "Veelgestelde vragen",
  items: [
    {
      q: "Wat is een AI-brein precies?",
      a: [
        { t: "p", tekst: "Een centrale kennisstructuur van jouw bedrijf: hoe je werkt, wat je aanrekent, wie wat doet, welke systemen je gebruikt en waar tijd verloren gaat. Opgeschreven in gewone taal, zo opgebouwd dat een AI het kan lezen en gebruiken." },
        { t: "p", tekst: "Je bouwt het zelf op in de lesreeks, door over je bedrijf te praten. De AI schrijft het op. Elke automatisering die we daarna bouwen, vertrekt van dezelfde kennis." },
      ],
    },
    {
      q: "Welke processen kunnen jullie automatiseren?",
      a: [
        { t: "p", tekst: "De vuistregel: doet je team het nu handmatig, en volgt het vaste stappen? Dan kunnen wij het overnemen." },
        { t: "h", tekst: "Enkele succesverhalen bij onze klanten:" },
        { t: "h", tekst: "1. E-commerce" },
        { t: "p", tekst: "Een webshop kreeg dagelijks 50 klantemails over bestellingen, leveringen en retouren, allemaal handmatig beantwoord. We koppelden zijn mailbox aan webshop en zijn kennisbank. Zijn AI-systeem beantwoordt klantemails automatisch, zet bestellingen klaar in de webshop en schakelt alleen een echte medewerker in als de vraag te complex is." },
        { t: "res", tekst: "Resultaat: van 50 naar 5 mails per dag." },
        { t: "h", tekst: "2. Gidsbedrijf" },
        { t: "p", tekst: "Een bedrijf met 20 gidsen verwerkte alle boekingen handmatig via website, WhatsApp en mail. We bouwden één AI-systeem: boekingen komen binnen, de juiste gids wordt gecontacteerd en ingepland, klant en gids krijgen automatisch een bevestiging en facturen worden automatisch opgesteld." },
        { t: "res", tekst: "Resultaat: geen administratie meer, volledige focus op ondernemen." },
        { t: "h", tekst: "3. Recruitmentbureau" },
        { t: "p", tekst: "Een recruitmentbureau verwerkte sollicitaties handmatig: cv's lezen, kandidaten mailen, plannen. Zijn AI-systeem screent binnenkomende cv's, plant automatisch een kennismakingsgesprek in en houdt kandidaten op de hoogte." },
        { t: "res", tekst: "Resultaat: van dagen wachten naar same-day opvolging, zonder extra personeel." },
        { t: "p", tekst: "Jij kent je bedrijf, wij de technologie. In het strategiegesprek na de lesreeks denken we actief met je mee om samen te kijken waar de opportuniteiten liggen." },
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
          "Projectmanagement tools (Monday, Asana, Trello, ...)",
          "Communicatie (Slack, Microsoft Teams, ...)",
          "En 500+ andere via standaard koppelingen",
        ] },
        { t: "h", tekst: "Hoe we koppelen" },
        { t: "p", tekst: "Als je software een API heeft (vrijwel alle moderne systemen sinds 2015), kunnen we het koppelen. Obscure of minder courante software? Zolang het een koppelingsmogelijkheid heeft, lukt het waarschijnlijk." },
        { t: "h", tekst: "Geen API?" },
        { t: "p", tekst: "Dan zoeken we een workaround via e-mail, geëxporteerde bestanden, of webhooks. In 95% van de gevallen vinden we een oplossing." },
        { t: "p", tekst: "Je hoeft geen nieuwe software aan te schaffen. We werken met wat je al hebt en laten die systemen samenwerken." },
        { t: "p", tekst: "Onzeker of jullie tools compatibel zijn? Stuur ons de lijst, dan checken we het vooraf, gratis en zonder verplichtingen." },
      ],
    },
    {
      q: "Wat kost AI-automatisering voor mijn bedrijf?",
      a: [
        { t: "p", tekst: "Minder dan een halftijdse medewerker inhuren, maar dan werkt het 24/7, maakt geen fouten en is nooit ziek." },
        { t: "p", tekst: "Concreet voorbeeld: als je team 10 uur per week kwijt is aan handmatige taken, kost dat je € 15.000 tot 20.000 per jaar. Een automatisering van € 4.500 verdient zichzelf terug in 3 tot 6 maanden." },
        { t: "p", tekst: "En daarna blijft het werken, jaar na jaar, met minimale extra kosten." },
        { t: "p", tekst: "De prijzen ken je op voorhand: € 95 voor de lesreeks (€ 295 na de eerste 20 deelnemers), € 4.500 vast voor de bouw en € 90 per maand voor het onderhoud, telkens excl. btw. Geen verrassingen achteraf." },
      ],
    },
    {
      q: "Is dit niet te duur voor een KMO van onze grootte?",
      a: [
        { t: "p", tekst: "Juist voor KMO's is dit interessant. Grote bedrijven hebben IT-afdelingen; jij betaalt voor repetitief werk dat een systeem kan overnemen." },
        { t: "p", tekst: "Te klein om te starten? We bouwen ook graag gefaseerd: start met één proces, breid later uit als je de waarde ziet." },
        { t: "p", tekst: "De investering is vergelijkbaar met professionele software, maar dan specifiek gebouwd voor jouw processen." },
      ],
    },
    {
      q: "Hoeveel tijd besparen we hier realistisch mee?",
      a: [
        { t: "p", tekst: "Tussen de 80% en 100% van de tijd op dat specifieke proces." },
        { t: "h", tekst: "Waarom zo hoog?" },
        { t: "p", tekst: "Simpel: wij adviseren geen automatiseringen met lage ROI. Als een proces maar 30 tot 40% efficiëntiewinst oplevert, zeggen we eerlijk dat het de investering niet waard is." },
        { t: "h", tekst: "Concrete voorbeelden" },
        { t: "list", items: [
          "Lead management: nu 6 uur per week, na automatisering 0 uur. Volledige besparing.",
          "Offerte-proces: nu 45 min per offerte (8x per week), na automatisering 10 min. Besparing: 4,5 uur per week.",
          "Data synchronisatie: nu 20 min per nieuwe klant, na automatisering 0 min, gebeurt direct.",
        ] },
        { t: "h", tekst: "Meer dan alleen uren" },
        { t: "list", items: [
          "Lead om 18:00u binnen? Binnen 2 minuten beantwoord, ook buiten kantooruren.",
          "Follow-ups: 0% gemist, alles gebeurt automatisch op tijd.",
          "Fouten: 0 typefouten, data altijd consistent.",
          "Teammoraal: minder frustratie over administratie, meer tijd voor klanten.",
        ] },
        { t: "p", tekst: "Twijfel of jouw proces geschikt is? Beschrijf het, dan zijn we eerlijk of de ROI er is." },
      ],
    },
    {
      q: "Hoe lang duurt het voor de automatisering live staat?",
      a: [
        { t: "p", tekst: "Totaal traject: 6 tot 12 weken, afhankelijk van complexiteit en je eigen tempo in de lesreeks." },
        { t: "h", tekst: "Fase 1: de lesreeks (2 tot 3 weken)" },
        { t: "p", tekst: "Je bouwt je AI-brein en ziet waar de winst zit. We starten snel op, geen maanden voorbereiding." },
        { t: "h", tekst: "Fase 2: bouw (2 tot 6 weken)" },
        { t: "p", tekst: "We bouwen en testen de automatisering. Je ziet tussentijds al resultaten." },
        { t: "h", tekst: "Fase 3: nazorg (30 dagen)" },
        { t: "p", tekst: "Het systeem is live en jullie gebruiken het. Wij monitoren intensief en lossen direct op als er iets niet perfect loopt. Pas als het 100% stabiel draait, ronden we af." },
        { t: "p", tekst: "Die nazorg is cruciaal: theorie vs. praktijk kan verschillen, en wij blijven erbij tot het écht werkt voor jouw team." },
      ],
    },
    {
      q: "Moet mijn team hiervoor geschoold worden?",
      a: [
        { t: "p", tekst: "Minimale onboarding, geen intensieve training." },
        { t: "p", tekst: "Jouw team hoeft geen technische kennis te hebben. Wat ze wél moeten weten:" },
        { t: "list", items: [
          "Hoe triggert de automatisering? (bijv. lead toevoegen in CRM)",
          "Wat gebeurt er automatisch? (zodat ze niet dubbel werk doen)",
          "Waar zien ze de output? (bijv. taken verschijnen in hun inbox)",
        ] },
        { t: "h", tekst: "We begeleiden dit met:" },
        { t: "list", items: [
          "Praktische walkthrough tijdens de nazorg",
          "Korte handleiding (geen 50-paginahandboeken)",
          "Support gedurende 30 dagen terwijl ze wennen",
        ] },
        { t: "p", tekst: "De grootste uitdaging? Niet zozeer \"leren gebruiken\", maar eerder \"vertrouwen dat het werkt en oude gewoontes loslaten\". Daar helpen we actief bij." },
      ],
    },
    {
      q: "Moet ik technisch zijn voor de lesreeks?",
      a: [
        { t: "p", tekst: "Nee. Je installeert Claude, het AI-programma waarmee we werken, met een stap-voor-stap video. Daarna praat je over je bedrijf en schrijft de AI het op. De map en de instructies krijg je kant-en-klaar." },
        { t: "p", tekst: "Zit je vast, dan stel je je vraag in de community en helpen we je verder." },
      ],
    },
    {
      q: "Wat gebeurt er met de gegevens van mijn bedrijf?",
      a: [
        { t: "p", tekst: "Je AI-brein staat op je eigen computer. Wat je aan de AI vertelt, gaat net als bij ChatGPT langs de servers van de maker. In de lesreeks tonen we welke privacy-instelling je daar aanzet voor je iets deelt." },
        { t: "p", tekst: "Voor de bouw kijken wij je brein samen met jou na. Verder komt niemand aan je gegevens." },
      ],
    },
    {
      q: "Wat als er iets misloopt met de automatisering?",
      a: [
        { t: "p", tekst: "Elke oplossing heeft een test- en integratieperiode. Tijdens de nazorg kijken we aandachtig mee naar alle handelingen. Pas als alles perfect verloopt, ronden we af." },
        { t: "p", tekst: "Na aflevering laten we je niet in de steek. Elke oplossing bevat ingebouwde monitoring. Wij worden onmiddellijk verwittigd als er iets hapert." },
        { t: "p", tekst: "Bug? Gratis. API veranderd? Gratis. Onze verantwoordelijkheid, niet de jouwe." },
      ],
    },
    {
      q: "Wat gebeurt er als we later willen uitbreiden?",
      a: [
        { t: "p", tekst: "Uitbreiden is makkelijk, en dat adviseren we vaak bewust." },
        { t: "h", tekst: "Typisch groeipad:" },
        { t: "list", items: [
          "Fase 1 (maand 1 tot 3): start met één high-impact proces, bijv. leadmanagement",
          "Fase 2 (maand 4 tot 9): volgend proces erbij, bijv. offerteproces",
          "Fase 3 (jaar 2): volledige workflow-automatisering, meerdere systemen praten met elkaar",
        ] },
        { t: "h", tekst: "Waarom gefaseerd werken slim is:" },
        { t: "list", items: [
          "Kleiner risico per stap",
          "Team went geleidelijk aan automatisering",
          "Je ziet ROI tussen elke fase",
          "Budget spreiding",
        ] },
        { t: "p", tekst: "Technisch bouwen we modulair: nieuwe automatisering sluit aan op bestaande. Geen grote herbouw nodig." },
      ],
    },
    {
      q: "Krijgen we ondersteuning na de lancering?",
      a: [
        { t: "p", tekst: "Na de nazorg zou alles perfect moeten werken, en daar investeren we samen in." },
        { t: "h", tekst: "Wat maakt onze nazorg anders?" },
        { t: "p", tekst: "We monitoren niet alleen passief. We werken actief samen met jouw team:" },
        { t: "list", items: [
          "Probeer het systeem eens te breken (we moedigen dit aan)",
          "Test alle edge cases en \"wat als...\"-scenario's",
          "Gebruik het in de echte drukte van je bedrijf",
          "Vind de kinderziektes vóór we weggaan",
        ] },
        { t: "h", tekst: "Resultaat na de nazorg:" },
        { t: "p", tekst: "Een systeem dat maandenlang draait zonder dat je aan ons hoeft te denken." },
        { t: "h", tekst: "Mocht er toch iets zijn:" },
        { t: "p", tekst: "We springen bij, gratis, vanzelfsprekend. Het onderhoud van je systeem (server, updates en opvolging) zit in de € 90 per maand. Je betaalt alleen extra voor nieuwe features die je later wilt toevoegen." },
      ],
    },
  ],
};

// 8. Contact (vorige homepage, letterlijk)
export const SLOT = {
  h2: "Ontdek wat AI jouw bedrijf oplevert",
  p: "In 30 minuten bespreken we je huidige situatie en maken we een inschatting van wat mogelijk is.",
  knop: CTA_KENNISMAKING,
  micro: "We werken met een beperkt aantal bedrijven tegelijk.",
  lesreeksLink: "Of start meteen met de lesreeks",
};

// Footer (vorige homepage, zonder plaatsnaam)
export const FOOTER = {
  contactTitel: "Contact",
  telefoons: [
    { nummer: "+32 495 70 23 14", link: "tel:+32495702314" },
    { nummer: "+32 468 02 99 45", link: "tel:+32468029945" },
  ],
  links: [
    { label: "Privacybeleid", href: "/privacy" },
    { label: "Algemene voorwaarden", href: "/algemene-voorwaarden" },
    { label: "Cookieverklaring", href: "/cookieverklaring" },
    { label: "Disclaimer", href: "/disclaimer" },
  ],
  cookies: "Cookie-instellingen",
};
