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
  aria: "Het AI-fundament van een installatiebedrijf: pagina's zoals Offertes, Klanten, Prijzen en Planning, met lijnen ertussen voor de verbanden.",
  onderschrift: "Elke bol is een pagina over jouw bedrijf, elke lijn een verband. Zo ziet het fundament eruit waar elke AI mee kan werken.",
};

// 2. Herken jij dit? (vorige homepage; de intro komt uit les 1.1)
export const HERKEN = {
  h2: "Herken jij dit?",
  intro: "We spraken al met meer dan honderd Belgische KMO's over hun processen, knelpunten en ambities met AI. Dit horen we het vaakst.",
  items: [
    "Je weet dat AI interessant is, maar je weet niet waar je moet beginnen.",
    "Je gebruikt ChatGPT al, maar het kent jouw bedrijf niet. Dus doe je het uiteindelijk toch zelf.",
    "Je hebt al demo's gezien, maar niemand kon concreet tonen wat het jouw bedrijf oplevert.",
    "Je wil geen tienduizenden euro's verspillen aan iets dat niets oplevert.",
    "Je zoekt geen AI-tool, maar iemand die meedenkt over hoe jouw bedrijf werkt.",
    "Je wil klein starten, snel resultaat zien en daarna verder bouwen.",
  ],
  overgang: "Herkenbaar? Dan zit je hier goed.",
};

// 3. Wat AI kan (landingspagina's)
export const OPLOSSING = {
  h2: ["Wij zorgen ervoor dat AI jouw", "werk overneemt"],
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
  koppelingen: "We integreren met al je tools",
  koppelingenPlus: "zowat alles wat je al gebruikt",
};

// Het blok onder de drie kaarten: de deur naar de lesreeks, met de cover van de community op Skool.
// Bewust de cover en niet een screenshot met ledental.
export const SKOOL = {
  label: "De lesreeks op",
  titel: "En alles wat repetitief is in jouw bedrijf",
  body: "In de lesreeks breng je in kaart wat je team dagelijks doet. Daaruit rolt een lijst van wat AI eerst kan overnemen. Die lijst bouwen wij.",
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
  nummer: string;
  tijd: string;
  wie: string;
  titel: string;
  intro: string;
  punten: string[];
  prijsLabel: string;
  prijs: string;
  prijsDetail: string;
  cta?: string;
  ctaNoot?: string;
};

// 4. Hoe wij AI voor jou laten werken (landingspagina's), met de stappen van het nieuwe model
export const HOE = {
  h2: ["Hoe wij AI voor jou laten", "werken"],
  meer: "Meer over deze stap",
  intro: "We starten niet met AI-tools, maar met inzicht in hoe jouw bedrijf werkt. Dat inzicht heb jij, niet wij. Daarom leg je eerst zelf je fundament. Pas daarna bouwen we, en alleen wat opbrengt.",
  stappen: [
    {
      nummer: "01",
      tijd: "2 tot 3 weken",
      wie: "Jij, met de AI",
      titel: "De lesreeks: leg je fundament",
      intro: "De AI stelt jou vragen over je bedrijf, je processen, je systemen en je klanten. Jij praat, hij schrijft.",
      punten: [
        "Een inventaris van je hele bedrijf, in gewone taal, op je eigen computer",
        "Een lijst van wat AI eerst kan overnemen, op volgorde van wat het meeste oplevert",
        "De plannen voor die automatiseringen, klaar om te bouwen",
      ],
      prijsLabel: "Lesreeks",
      prijs: "€ 95",
      prijsDetail: "excl. btw voor de eerste 20 deelnemers, daarna € 295. Plus een betalend abonnement van Claude of ChatGPT, ± € 20 per maand.",
      cta: CTA_LESREEKS,
      ctaNoot: "Online, in het Nederlands, op eigen tempo.",
    },
    {
      nummer: "02",
      tijd: "2 tot 4 weken",
      wie: "Wij",
      titel: "De bouw",
      intro: "Wij maken van jouw lijst AI-werknemers die bij jou draaien. We bouwen alleen op een fundament dat jij gelegd hebt: zo weten we vooraf wat het kost.",
      punten: [
        "Alles op je lijst dat op je fundament draait, hoeveel het er ook zijn",
        "Gekoppeld aan de software die je al gebruikt",
        "Getest voor hij live gaat: hij verstuurt niets zelf, en één knop zet alles stil",
      ],
      prijsLabel: "Vaste prijs",
      prijs: "€ 4.500",
      prijsDetail: "excl. btw. Eén prijs voor alle AI-werknemers uit je fundament, inclusief 30 dagen nazorg.",
    },
    {
      nummer: "03",
      tijd: "24/7 actief",
      wie: "Je AI-werknemer",
      titel: "Resultaat",
      intro: "Het werk gebeurt op de achtergrond. Wij houden het systeem draaiend, veilig en up-to-date.",
      punten: [
        "Offertes staan klaar en worden opgevolgd, zonder dat jij eraan denkt",
        "Minder manueel werk voor jou en je team",
        "Meer omzet zonder extra personeel",
      ],
      prijsLabel: "Onderhoud",
      prijs: "€ 90",
      prijsDetail: "per maand, excl. btw, voor hosting, bewaking, backups en updates. Maandelijks opzegbaar.",
    },
  ] as Stap[],
  // Waarom je het fundament zelf legt. Uit les 1.1, 1.2 en 1.3: de consultant-vergelijking,
  // "jij kent je bedrijf het allerbeste", de eenmalige inspanning, toekomstbestendig.
  // De drie blokken hieronder staan in één openklikbaar blok onder de prijskaarten; `kort` is de regel in de dichte rij.
  fundament: {
    h3: "Waarom je het fundament zelf legt",
    kort: "Jij kent je bedrijf het best. Daarom leg jij het, en bouwen wij alleen daarop.",
    alineas: [
      "Toen we bij onze eerste klanten AI implementeerden, leerden we het op de harde manier: je moet eerst weten waar AI nuttig is, anders is er geen return on investment. En hoe meer we documenteerden tijdens die analyse, hoe beter het resultaat bij de bouw. Gewoon omdat er meer context was.",
      "Andere bureaus sturen een dure consultant om die analyse voor jou te doen. Wij niet. Jij kent je bedrijf het allerbeste en je weet zelf waar je grootste frustraties en tijdvreters zitten. Daarom stelt de AI jou in de lesreeks dezelfde vragen die wij vroeger ter plaatse stelden, en schrijft hij alles op.",
      "Het is een eenmalige inspanning. Je bespaart de kost van zo'n analysetraject, alle kennis blijft in eigen huis, en je leert onderweg de belangrijkste concepten van AI. Geen opleiding tot AI-expert, wel wat een zaakvoerder vandaag moet weten om de juiste keuzes te maken. Zo maak je je bedrijf toekomstbestendig. Elke automatisering die we daarna bouwen, vertrekt van diezelfde kennis.",
    ],
    lijstTitel: "Je fundament is een map met tekstbestanden in gewone taal. Daarin komt:",
    lijst: [
      "Hoe je bedrijf geld verdient",
      "Wie wat doet en wie beslist",
      "Welke systemen je gebruikt",
      "Je processen en je klantencyclus van A tot Z",
      "Je prijzen, je partners en je huistaal",
      "Waar tijd verloren gaat en wat AI eerst kan overnemen",
    ],
    // Bewust een kwalificatie, geen geruststelling: wie een snelle fix zoekt, haakt hier af.
    eerlijk: [
      "Dit is geen snelle fix. Zoek je een tool die je installeert en die morgen je werk doet, dan ben je bij ons aan het verkeerde adres. Reken op een tiental uur, verspreid over een paar avonden.",
      "Elk softwarepakket en elke AI-consultant verkoopt je dat het in 1-2-3 gebeurt. Dat is niet zo. AI die echt in je processen zit, waar je op kunt rekenen en die je met rust kunt laten, vraagt inspanning. Van jou en van ons. Dat is precies waarom hij daarna blijft werken.",
    ],
  },
  // Wat je koopt voor € 4.500. De grens is die uit stap 7 van de lesreeks: eerst de schermtest
  // (moet er een scherm getekend worden dat er nog niet is? dan is het geen agent), dan de
  // breintest (draait het op het fundament? dan zit het erin). Geen plafond op het aantal.
  bouw: {
    h3: "Wat je koopt voor € 4.500",
    kort: "Eén vaste prijs, hoeveel AI-werknemers er ook uit je fundament komen. En wat er gebeurt voor één ervan live mag.",
    intro: "Eén vaste prijs voor alles wat er uit je fundament komt aan werk dat een AI-werknemer kan overnemen. Hoeveel het er ook zijn. De grens ligt niet bij het aantal, maar bij het soort werk.",
    welTitel: "Zit erin",
    wel: [
      "Elke AI-werknemer die op je fundament draait: mails sorteren en beantwoorden, offertes klaarzetten en opvolgen, documenten opmaken, gegevens van het ene systeem naar het andere brengen, een ochtendbriefing, een melding als er iets binnenkomt dat niet mag blijven liggen",
      "De koppelingen met de software die je al gebruikt",
      "De assistent waarmee je al je AI-werknemers aanstuurt",
      "30 dagen nazorg, tot het zeven dagen na elkaar zonder één bugmelding draait",
    ],
    nietTitel: "Zit er niet in",
    niet: [
      "Nieuwe software met een scherm dat er nog niet is: een website, een webshop, een klantenportaal, een boekingsmodule, een database die je nog niet hebt. Dat is een apart traject met een aparte prijs.",
      "Planning zelf, want dat is een roostersysteem. Wel het bericht naar de klant zodra er iets verzet wordt.",
    ],
    dicht: "Zit een systeem dicht, zoals sommige sectorpakketten of overheidsportalen, dan bouwen we tot aan de knop: alles verzameld en opgemaakt, het laatste klikken doe jij. Dat hoor je in de lesreeks, niet achteraf.",
    // De regels die op elke AI-werknemer getest worden voor hij live gaat.
    veiligTitel: "Wat er gebeurt voor hij bij jou mag draaien",
    veilig: [
      { titel: "Hij verstuurt niets zelf", body: "Standaard zet hij klaar en druk jij op verzenden. Wil je dat hij een taak wél zelf afwerkt, dan beslis jij dat, per taak, in de lesreeks. We testen het op elke AI-werknemer." },
      { titel: "Hij komt niet bij wat hij niet mag zien", body: "Wachtwoorden, sleutels en certificaten zijn afgeschermd. Ook dat testen we, elke keer." },
      { titel: "Hij antwoordt nooit uit het niets", body: "Elk antwoord moet aantoonbaar uit jouw fundament komen. Anders gaat hij niet live." },
      { titel: "Eén knop en alles staat stil", body: "Elke AI-werknemer heeft een kostenplafond en een pauzeknop. Die pauzeknop testen we vlak voor de oplevering." },
    ],
    proces: "Vóór een AI-werknemer bij jou draait, krijgt hij een geschreven opdracht met wat hij mag en niet mag, controleren we elke koppeling tegen de echte documentatie van dat pakket, en moet hij een testreeks halen. Bij de oplevering volgen tien controles. Eén rode vlag en hij gaat niet live.",
  },
  // Wat de € 90 per maand dekt. Geen cijfers over backup-frequentie of uptime: die liggen nog niet vast.
  onderhoud: {
    h3: "Wat de € 90 per maand dekt",
    kort: "Hosting, bewaking, backups en updates. En wat er van jou blijft als je stopt.",
    intro: "Een AI-systeem zonder onderhoud verschuift binnen zes maanden van werkend naar wankel. Modellen veranderen, koppelingen wijzigen, je bedrijf schuift op. Daarom houden wij het draaiend.",
    punten: [
      { titel: "Hosting bij ons", body: "Je AI-werknemers draaien op onze servers. Jij hoeft niets te installeren of te beheren." },
      { titel: "Bewaking en verwittiging", body: "Wij zien het als er iets hapert, meestal voor jij het merkt. Bug? Gratis. Koppeling veranderd? Gratis." },
      { titel: "Backups, beveiligingsupdates en nieuwe versies", body: "Je gegevens worden bewaard, het systeem blijft veilig, en nieuwe AI-ontwikkelingen die jij ook moet hebben, voeren wij door." },
      { titel: "Van jou, ook als je stopt", body: "Zolang wij het onderhouden, beheren wij de toegang: zo kan niemand er per ongeluk iets in breken. Stop je, dan krijg je alles mee: de code, je gegevens en een dag begeleiding om het over te nemen." },
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

// 6. Waarom bedrijven voor Finit kiezen (vorige homepage, herschreven naar het model)
export const WAAROM = {
  h2: "Waarom bedrijven voor Finit kiezen",
  intro: "We vertrekken vanuit hoe jouw bedrijf werkt, zodat we automatiseringen bouwen die blijvende waarde opleveren.",
  pijlers: [
    { titel: "Eerst begrijpen, dan bouwen", body: "Jij legt eerst zelf je fundament, want jij kent je bedrijf het best. Wij bouwen alleen daarop, en alleen wat opbrengt." },
    { titel: "Geen losse AI-tools", body: "Elke automatisering bouwt verder op je fundament. Geen losse tools die elkaar niet kennen." },
    { titel: "Prijs vooraf bekend", body: "Van lesreeks tot werkende oplossing: één partner, en je weet op voorhand wat elke stap kost." },
    { titel: "Jullie eigendom", body: "Je fundament staat op je eigen computer en is van jou. Wat we daarna bouwen ook: stop je met het onderhoud, dan krijg je de code en je gegevens mee." },
  ],
};

export type FaqBlok =
  | { t: "p"; tekst: string }
  | { t: "h"; tekst: string }
  | { t: "res"; tekst: string }
  | { t: "list"; items: string[] };
export type FaqItem = { q: string; a: FaqBlok[] };

// 7. Veelgestelde vragen: de vragen van vroeger, plus de vragen die het nieuwe model oproept (uit de video's)
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
      q: "Waarom bouw ik dat zelf en niet jullie?",
      a: [
        { t: "p", tekst: "Omdat jij je bedrijf het allerbeste kent en zelf weet waar je grootste frustraties en tijdvreters zitten. Andere bureaus sturen daar een dure consultant voor. Die kent na een week nog altijd minder van jouw bedrijf dan jij. Daarom stelt de AI jou nu dezelfde vragen die wij vroeger ter plaatse stelden, en schrijft hij alles op." },
        { t: "p", tekst: "Het is een eenmalige inspanning die je de kost van zo'n analysetraject bespaart. Onderweg leer je de belangrijkste concepten van AI, precies wat een zaakvoerder vandaag nodig heeft, en die kennis neem je mee in elke stap die je bedrijf daarna zet. Daarom bouwen we ook alleen op een fundament dat jij zelf gelegd hebt." },
      ],
    },
    {
      q: "Moet ik technisch zijn?",
      a: [
        { t: "p", tekst: "Nee. Je praat met je computer en de AI schrijft. Je hebt een betalend abonnement van Claude of ChatGPT nodig (± € 20 per maand); de rest hebben wij voor je klaargezet. We tonen stap voor stap, op Mac en Windows, hoe je alles installeert." },
        { t: "p", tekst: "Loop je toch vast? Stuur ons een bericht in de community, dan helpen we je verder." },
      ],
    },
    {
      q: "Hoeveel tijd kost de lesreeks?",
      a: [
        { t: "p", tekst: "Reken op een tiental uur, verspreid over een paar avonden of namiddagen. Op sommige momenten wacht je op de AI, bijvoorbeeld als hij een export van je mailbox verwerkt. Op de andere momenten praat je zo uitgebreid mogelijk over je bedrijf. Hoe meer je vertelt, hoe beter het resultaat." },
        { t: "p", tekst: "Beschouw het alsof je iemand opleidt om morgen jouw functie over te nemen. Dan leg je ook serieus wat uit. En je doet het één keer: elke automatisering die we daarna bouwen, vertrekt van hetzelfde fundament." },
      ],
    },
    {
      q: "Welke processen kunnen jullie automatiseren?",
      a: [
        { t: "p", tekst: "De vuistregel: doet je team het nu handmatig, en volgt het vaste stappen? Dan kunnen wij het overnemen. Wat we niet bouwen: nieuwe software met een scherm dat er nog niet is, zoals een website of een klantenportaal." },
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
        { t: "p", tekst: "Jij kent je bedrijf, wij de technologie. Uit je fundament rolt een lijst van wat AI eerst kan overnemen. In het strategiegesprek daarna kiezen we samen wat we bouwen." },
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
        { t: "p", tekst: "Concreet voorbeeld: als je team 10 uur per week kwijt is aan handmatige taken, kost dat je € 15.000 tot 20.000 per jaar. Een bouw van € 4.500 verdient zichzelf terug in 3 tot 6 maanden. En daarna blijft het werken, jaar na jaar, met minimale extra kosten." },
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
        { t: "p", tekst: "Simpel: wij adviseren geen automatiseringen met lage ROI. Als een proces maar 30 tot 40% efficiëntiewinst oplevert, zeggen we eerlijk dat het de investering niet waard is. Daarom staat de lijst uit je fundament op volgorde van wat het meeste oplevert." },
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
      ],
    },
    {
      q: "Hoe lang duurt het voor de automatisering live staat?",
      a: [
        { t: "p", tekst: "Reken op 4 tot 7 weken van de eerste les tot een automatisering die live staat, afhankelijk van de complexiteit en je eigen tempo in de lesreeks. Daarna volgen 30 dagen nazorg." },
        { t: "h", tekst: "Fase 1: de lesreeks (2 tot 3 weken)" },
        { t: "p", tekst: "Je legt je fundament en ziet waar de winst zit. Geen maanden voorbereiding." },
        { t: "h", tekst: "Fase 2: de bouw (2 tot 4 weken)" },
        { t: "p", tekst: "We bouwen en testen de automatisering. Je ziet tussentijds al resultaten." },
        { t: "h", tekst: "Fase 3: nazorg (30 dagen)" },
        { t: "p", tekst: "Het systeem is live en jullie gebruiken het. Wij kijken intensief mee en lossen direct op als er iets niet perfect loopt. Pas als het 100% stabiel draait, ronden we af. Theorie en praktijk kunnen verschillen, en wij blijven erbij tot het écht werkt voor jouw team." },
      ],
    },
    {
      q: "Moet mijn team hiervoor geschoold worden?",
      a: [
        { t: "p", tekst: "Minimale onboarding, geen intensieve training. Jouw team hoeft geen technische kennis te hebben. Wat ze wél moeten weten: wat de automatisering doet, wat er automatisch gebeurt (zodat ze geen dubbel werk doen) en waar ze de output zien, bijvoorbeeld een offerte die klaarstaat." },
        { t: "p", tekst: "We begeleiden dit met een praktische walkthrough tijdens de nazorg en een korte handleiding. De grootste uitdaging is meestal niet het leren gebruiken, maar vertrouwen dat het werkt en oude gewoontes loslaten. Daar helpen we actief bij." },
      ],
    },
    {
      q: "Wat gebeurt er met de gegevens van mijn bedrijf?",
      a: [
        { t: "p", tekst: "Je fundament staat op je eigen computer en is van jou. Ruwe exports van je mailbox of agenda blijven daar staan; alleen wat de AI eruit leert, komt in je fundament. Wat je aan de AI vertelt, gaat net als bij ChatGPT langs de servers van de maker. In de lesreeks tonen we welke privacy-instelling je daar aanzet voor je iets deelt." },
        { t: "p", tekst: "Er is ook een afgeschermde kopie waar wij bij kunnen. Zo kunnen we je snel helpen als je vastzit, ben je niets kwijt als je computer het begeeft, en kunnen we updates doorvoeren als er nieuwe AI-ontwikkelingen zijn die jij ook moet hebben." },
      ],
    },
    {
      q: "Wat als er iets misloopt met de automatisering?",
      a: [
        { t: "p", tekst: "Elke oplossing heeft een test- en integratieperiode. Tijdens de nazorg kijken we aandachtig mee naar alle handelingen. We moedigen je team aan om het systeem te proberen breken, in de echte drukte van je bedrijf, zodat we de kinderziektes vinden vóór we weggaan." },
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

// 8. Contact (vorige homepage)
export const SLOT = {
  h2: "Ontdek wat AI jouw bedrijf oplevert",
  p: "In 30 minuten bespreken we je huidige situatie en maken we een inschatting van wat mogelijk is.",
  knop: CTA_KENNISMAKING,
  micro: "Gratis en vrijblijvend. We werken met een beperkt aantal bedrijven tegelijk.",
  lesreeksLink: "Of leg meteen je fundament in de lesreeks",
};

// Footer (vorige homepage, zonder plaatsnaam)
export const FOOTER = {
  slotTitel: "Klaar om je bedrijf te automatiseren?",
  slotTekst: "Leg eerst je fundament in de lesreeks. Vragen vooraf? Mail ons gerust.",
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
