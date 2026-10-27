/**
 * Lezing Open Boek, 27 oktober 2026 (Karel, voor Mattice Libbrecht).
 *
 * Eén bron voor alles: de slides (/lezing/presenteren), het sprekersscherm
 * (/lezing/spreker) en de handout achter de QR-code (/lezing). Pas je een
 * prompt hier aan, dan verandert hij overal tegelijk.
 */

export const LEZING = {
  titel: 'AI die je morgen al gebruikt',
  ondertitel: 'Open Boek · AA Gent, Planet Group Arena · 27 oktober 2026',
  spreker: 'Karel · Finit Solutions',
  starttijd: '19:15',
  handoutUrl: 'https://finitsolutions.be/lezing/',
  handoutLabel: 'finitsolutions.be/lezing',
  contactPad: '/contact/',
} as const;

/** Het fictieve demobedrijf waarmee Karel de demo's doet. */
export const DEMOBEDRIJF = {
  naam: 'Atelier Nova',
  omschrijving:
    'Interieurschrijnwerk op maat (keukens, kasten, dressings) in Gent en omstreken. Opgericht in 2024, drie mensen.',
} as const;

export interface Prompt {
  label: string;
  tekst: string;
}

export interface DemoBestand {
  naam: string;
  /** Pad onder /public. Leeg = moet Karel nog maken (bv. foto's). */
  pad?: string;
}

export interface Truc {
  id: string;
  nummer: number;
  deel: 1 | 2 | 3;
  titel: string;
  /** Het kader in één zin: komt op de slide en in de handout. */
  kort: string;
  /** Twee à drie korte punten op de slide. */
  punten: string[];
  prompts: Prompt[];
  link?: { label: string; url: string };
  bron?: string;
  demo?: {
    domein: string;
    bestanden?: DemoBestand[];
    /** Beste output na de test, als back-up bij slechte wifi. */
    backup?: string;
  };
}

export const DELEN: Record<1 | 2 | 3, { titel: string; ondertitel: string }> = {
  1: { titel: 'Beter vragen, betere antwoorden', ondertitel: 'Zes trucs die je morgen al gebruikt' },
  2: { titel: 'Leg het één keer vast', ondertitel: 'Stop met jezelf telkens opnieuw voor te stellen' },
  3: { titel: 'Leuk om mee te experimenteren', ondertitel: 'Voor wie zin heeft in meer' },
};

export const TRUCS: Truc[] = [
  {
    id: 'collega',
    nummer: 1,
    deel: 1,
    titel: 'Brief AI als een nieuwe collega',
    kort: 'Rol, context, voorbeeld en formaat: hoe meer hij weet, hoe minder gemiddeld het antwoord.',
    punten: [
      'Rol: wie moet hij zijn?',
      'Context: wie ben je, voor wie, waarom?',
      'Voorbeeld: wat vind je goed?',
      'Formaat: hoe lang, hoeveel versies, welke toon?',
    ],
    prompts: [
      { label: 'Zo doet iedereen het', tekst: 'Schrijf een LinkedIn-post over ons bedrijf.' },
      {
        label: 'Zo doe je het (sjabloon)',
        tekst:
          'Je bent een ervaren marketeer voor kleine Vlaamse bedrijven.\n\nContext: [bedrijf] maakt/verkoopt [wat] voor [klanten] in [regio]. Met deze post willen we [doel, bv. meer aanvragen voor ...]. Onze klanten zijn vooral [doelgroep].\n\nVoorbeeld: zo klinken we: [plak een post of mail die je goed vindt].\n\nFormaat: geef 3 versies van maximaal 120 woorden. Spreektaal, geen dialect, geen emoji-regen, en eindig met één duidelijke oproep.',
      },
      {
        label: 'Ingevuld (Atelier Nova)',
        tekst:
          'Je bent een ervaren marketeer voor kleine Vlaamse bedrijven.\n\nContext: Atelier Nova maakt keukens, kasten en dressings op maat voor gezinnen in Gent en omstreken. We zijn drie mensen en bestaan sinds 2024. Met deze post willen we meer aanvragen voor dressings op maat. Onze klanten zijn vooral jonge gezinnen die net een huis gekocht of verbouwd hebben.\n\nVoorbeeld: zo klinken we: "Vorige week een dressing geplaatst onder een schuin dak in Mariakerke. Elke centimeter benut, en de klant hoeft nooit meer te zoeken naar haar sjaals."\n\nFormaat: geef 3 versies van maximaal 120 woorden. Spreektaal, geen dialect, geen emoji-regen, en eindig met één duidelijke oproep.',
      },
    ],
    bron: 'Utley: "Echte voorbeelden zeggen meer dan bijvoeglijke naamwoorden."',
    demo: { domein: 'Marketing' },
  },
  {
    id: 'praten',
    nummer: 2,
    deel: 1,
    titel: 'Praat in plaats van typen',
    kort: 'Wie praat, geeft vanzelf meer context. En meer context geeft betere antwoorden.',
    punten: [
      'Praten gaat drie à vier keer sneller dan typen',
      'Laat je gedachten lopen zoals tegen een collega',
      'Werkt in elke app: AI, mail, WhatsApp, Word',
    ],
    prompts: [
      {
        label: 'Zet dit voor je gesproken uitleg',
        tekst:
          'Ik ga je nu vertellen wat ik nodig heb, een beetje rommelig. Haal er zelf de structuur uit en vat mijn vraag eerst in drie zinnen samen voor je begint.',
      },
    ],
    link: { label: 'Wispr Flow (Mac, Windows, iPhone, Android)', url: 'https://wisprflow.ai' },
    demo: { domein: 'Alle domeinen' },
  },
  {
    id: 'interview',
    nummer: 3,
    deel: 1,
    titel: 'Laat AI jou interviewen',
    kort: 'Weet je niet wat je moet meegeven? Draai het om en laat hem de vragen stellen.',
    punten: [
      '"Stel me eerst je vragen, één per één"',
      'Bij een grote opdracht: "Geef eerst een plan"',
      'Je hoeft de goede vraag niet te kennen',
    ],
    prompts: [
      {
        label: 'Laat hem eerst vragen stellen',
        tekst:
          'Ik wil een offerte opmaken voor een nieuwe klant. Stel me eerst de vragen die je nodig hebt om dat goed te doen, één per één. Begin pas te schrijven als je genoeg weet.',
      },
      {
        label: 'Vraag eerst een plan',
        tekst:
          'Voor je begint: geef me eerst een kort plan van aanpak in vijf punten, zodat ik kan bijsturen. Wacht op mijn "ok".',
      },
    ],
    bron: 'Utley noemt dit "reverse prompting"',
    demo: { domein: 'Sales' },
  },
  {
    id: 'voorbeeld',
    nummer: 4,
    deel: 1,
    titel: 'Toon hoe jij het doet, en hoe niet',
    kort: 'Een voorbeeld zegt meer dan elke beschrijving. Een slecht voorbeeld erbij zegt wat je níet wil.',
    punten: [
      'Plak 2 à 3 voorbeelden die je goed vindt',
      'Voeg één slecht voorbeeld toe: "doe dit niet"',
      'Zonder voorbeeld imiteert hij het internet',
    ],
    prompts: [
      {
        label: 'Schrijf in mijn stijl',
        tekst:
          'Hieronder staan drie berichten die ik zelf schreef en goed vind. Daaronder één voorbeeld van hoe het niet moet.\nSchrijf een nieuwe post over [onderwerp] in dezelfde stijl als de goede voorbeelden. Vermijd alles wat op het slechte voorbeeld lijkt.\n\nGOEDE VOORBEELDEN:\n[plak 3 voorbeelden]\n\nSLECHT VOORBEELD:\n[plak 1 voorbeeld]',
      },
      {
        label: 'Betalingsherinneringen',
        tekst:
          'Hier is een betalingsherinnering die ik ooit zelf schreef. Maak in dezelfde toon drie herinneringen: een vriendelijke na 7 dagen, een duidelijke na 21 dagen en een laatste na 35 dagen. Hou ze kort.\n\n[plak je herinnering]',
      },
    ],
    bron: 'Utley: "If you don\'t give an example, it imitates the internet."',
    demo: {
      domein: 'Marketing en administratie',
      bestanden: [
        { naam: 'Voorbeeldposts Atelier Nova (3 goed, 1 slecht)', pad: '/lezing/demo/voorbeeldposts.txt' },
        { naam: 'Eigen betalingsherinnering', pad: '/lezing/demo/betalingsherinnering.txt' },
      ],
    },
  },
  {
    id: 'foto',
    nummer: 5,
    deel: 1,
    titel: 'Van foto naar Excel',
    kort: 'Vraag een vaste vorm terug en knip grote opdrachten in stappen.',
    punten: [
      'Een foto is ook een vraag: tickets, leveringsbon, whiteboard',
      'Vraag een tabel, kolommen of een Excel-bestand',
      'Grote vraag? Stap per stap, wacht na elke stap',
    ],
    prompts: [
      {
        label: 'Kasticketjes naar Excel',
        tekst:
          'Op de foto\'s staan kasticketjes. Maak een tabel met deze kolommen: datum, leverancier, omschrijving, bedrag excl. btw, btw-percentage, btw-bedrag, totaal. Zet onderaan de totalen. Twijfel je over een cijfer, zet er dan een vraagteken bij. Geef het resultaat als Excel-bestand.',
      },
      {
        label: 'Je cijfers in drie stappen',
        tekst:
          'Hier is mijn resultatenrekening van dit jaar en vorig jaar.\nStap 1: vat in vijf zinnen samen hoe het gaat, in gewone taal.\nStap 2: waar lekt er geld weg?\nStap 3: geef drie vragen die ik aan mijn boekhouder kan stellen.\nDoe de stappen na elkaar en wacht na elke stap op mijn "ok".',
      },
    ],
    demo: {
      domein: 'Boekhouding',
      bestanden: [
        { naam: "5 foto's van kasticketjes (nog te maken)" },
        { naam: 'Resultatenrekening Atelier Nova', pad: '/lezing/demo/resultatenrekening.csv' },
      ],
    },
  },
  {
    id: 'tegenspreken',
    nummer: 6,
    deel: 1,
    titel: 'Laat AI je tegenspreken',
    kort: 'Het eerste antwoord is een eerste versie. Vraag opties, laat ze afbreken en oefen het echte gesprek.',
    punten: [
      '"Geef drie opties en zeg wat er mis is met elk"',
      'Vaste instructie: "Wees direct, spreek me tegen"',
      'Een flight simulator voor een moeilijk gesprek',
    ],
    prompts: [
      {
        label: 'Opties en kritiek',
        tekst: 'Geef me drie opties voor [je vraag]. Zeg daarna bij elke optie eerlijk wat er mis mee is.',
      },
      {
        label: 'Vaste instructie (in je instellingen)',
        tekst:
          'Wees direct. Spreek me tegen als ik iets over het hoofd zie of als mijn idee niet goed is. Geen complimentjes, wel argumenten. Stel een vraag als iets onduidelijk is.',
      },
      {
        label: 'Rollenspel: "te duur"',
        tekst:
          'We oefenen een verkoopgesprek. Jij speelt de zaakvoerder van een bakkerij die mijn offerte van € 4.500 te duur vindt. Blijf in je rol, wees kritisch maar realistisch, en geef me niet te snel gelijk. Als ik "stop" zeg, stap je uit je rol en geef je me feedback: wat deed ik goed, wat kon beter, en welke zin had ik beter anders gezegd?',
      },
      {
        label: 'Notities naar follow-up',
        tekst:
          'Hier zijn mijn rommelige notities van een klantgesprek. Maak er een follow-up mail van en een lijst met to-do\'s voor mij.\n\n[plak je notities]',
      },
    ],
    bron: 'Utley: "een flight simulator voor een moeilijk gesprek"',
    demo: {
      domein: 'Sales',
      bestanden: [{ naam: 'Rommelige gespreksnotities', pad: '/lezing/demo/gespreksnotities.txt' }],
    },
  },
  {
    id: 'onboarding',
    nummer: 7,
    deel: 2,
    titel: 'Laat AI je onboarden',
    kort: 'Laat hem jou interviewen tot hij je bedrijf kent, en bewaar wat eruit komt.',
    punten: [
      'Eén vraag per keer, nog niets maken',
      '"Verzin niets"',
      'Antwoord met je stem: je vertelt meer dan je typt',
    ],
    prompts: [
      {
        label: 'Het onboarding-interview',
        tekst:
          'Interview me over mijn bedrijf, zodat je straks kan werken als een collega die alles weet. Stel één vraag per keer en wacht op mijn antwoord. Maak nog niets.\nVraag naar: wie we zijn en wat we verkopen, onze klanten, onze prijzen, hoe we klinken, wat we nooit willen, en wanneer je me moet tegenspreken.\nVerzin niets. Als je genoeg weet, schrijf je een briefing van maximaal één pagina die ik kan bewaren.',
      },
    ],
    bron: 'Utley, "Stop reintroducing yourself to AI" (mei 2026)',
    demo: { domein: 'Alle domeinen' },
  },
  {
    id: 'lezen',
    nummer: 8,
    deel: 2,
    titel: 'Laat hem eerst lezen, dan pas schrijven',
    kort: 'Je hebt de antwoorden al: in je mails, offertes en notities. Laat AI ze eerst lezen.',
    punten: [
      'Plak 20 klantmails met jouw antwoorden',
      'Vraag de tien vaakst gestelde vragen',
      'Een FAQ in jouw woorden, in drie minuten',
    ],
    prompts: [
      {
        label: 'FAQ uit je eigen mails',
        tekst:
          'Hieronder staan mails van klanten met mijn antwoorden. Lees ze eerst allemaal. Zoek daarna de tien vragen die het vaakst terugkomen en schrijf per vraag een kort antwoord, op basis van wat ik zelf antwoordde en in mijn woorden. Verzin niets dat niet in de mails staat.\n\n[plak de mails]',
      },
    ],
    bron: 'Utley: "Before asking AI to invent, ask it to read."',
    demo: {
      domein: 'Sales en klantendienst',
      bestanden: [{ naam: '20 klantmails Atelier Nova', pad: '/lezing/demo/klantmails.txt' }],
    },
  },
  {
    id: 'assistent',
    nummer: 9,
    deel: 2,
    titel: 'Maak er een vaste assistent van',
    kort: 'Zet de briefing, je voorbeelden en je documenten in een Project. Elk gesprek begint dan bij jou.',
    punten: [
      'Claude of ChatGPT: een Project, met instructies en documenten',
      'Erin: de briefing, voorbeelden, prijslijst, je FAQ',
      'Daarna: korte vragen, juiste antwoorden',
    ],
    prompts: [
      {
        label: 'Projectinstructies',
        tekst:
          'Je werkt voor [bedrijf].\n[plak de briefing uit het onboarding-interview]\n\nToon: [hoe we klinken].\nFormaat: [wat ik meestal terug wil].\nStel eerst vragen als iets onduidelijk is. Spreek me tegen als iets niet klopt. Verzin geen prijzen of feiten: gebruik alleen de documenten in dit project.',
      },
      { label: 'Demovraag 1', tekst: 'Schrijf een LinkedIn-post over de dressing die we deze week plaatsten in Merelbeke.' },
      {
        label: 'Demovraag 2',
        tekst: 'Een klant vraagt hoe lang het duurt voor een keuken geplaatst is. Schrijf een antwoord.',
      },
      {
        label: 'Demovraag 3',
        tekst: 'Schrijf de begeleidende tekst bij een offerte voor een maatkast onder de trap.',
      },
    ],
    demo: {
      domein: 'Alle domeinen',
      bestanden: [{ naam: 'Briefing Atelier Nova (voor het Project)', pad: '/lezing/demo/briefing-atelier-nova.md' }],
    },
  },
  {
    id: 'podcast',
    nummer: 10,
    deel: 3,
    titel: 'Maak een podcast van je brochure',
    kort: 'NotebookLM maakt van je eigen documenten een gesprek om naar te luisteren. Gratis.',
    punten: [
      'Upload je brochure, website of prijslijst',
      'Klik op "Audio-overzicht"',
      'Handig om je eigen verhaal eens van buitenaf te horen',
    ],
    prompts: [
      {
        label: 'Bijsturen van het gesprek',
        tekst:
          'Maak een gesprek van ongeveer vijf minuten in het Nederlands, voor een klant die ons bedrijf nog niet kent. Leg uit wat we doen, voor wie, en waarom mensen voor ons kiezen.',
      },
    ],
    link: { label: 'NotebookLM', url: 'https://notebooklm.google.com' },
    bron: 'Karpathy, "How I use LLMs"',
    demo: {
      domein: 'Marketing',
      bestanden: [{ naam: 'Brochure of website van een bedrijf uit de zaal, of Atelier Nova' }],
    },
  },
];

export interface SnelleTruc {
  titel: string;
  prompt: string;
}

export const SNELLE_RONDE: SnelleTruc[] = [
  {
    titel: 'Foto van het whiteboard → to-do\'s',
    prompt:
      'Op deze foto staat ons whiteboard na de vergadering. Zet het om in beslissingen en een to-do-lijst per persoon, met een deadline als die erop staat.',
  },
  {
    titel: 'Mail naar een Franstalige klant',
    prompt:
      'Schrijf deze mail in het Frans voor een Waalse klant. Formeel maar warm, zoals een Belg dat zou schrijven.\n\n[plak je mail]',
  },
  {
    titel: 'Antwoord op een slechte Google-review',
    prompt:
      'Een klant liet deze negatieve review achter. Schrijf een kort, rustig antwoord: erken het probleem, geen holle excuses, en bied een concrete oplossing.\n\n[plak de review]',
  },
  {
    titel: 'De Excel-formule die je zoekt',
    prompt:
      'In Excel staan in kolom A datums en in kolom B bedragen. Schrijf een formule die het totaal per maand berekent, en leg in één zin uit hoe ik ze gebruik.',
  },
  {
    titel: 'Lange mailthread samenvatten',
    prompt:
      'Hieronder staat een lange mailthread. Wat wordt er van mij verwacht, en tegen wanneer? Antwoord in maximaal vijf punten.\n\n[plak de thread]',
  },
  {
    titel: 'Vacature voor een knelpuntberoep',
    prompt:
      'Schrijf een vacature voor een [beroep] in [regio]. Geen clichés zoals "dynamisch team". Schrijf wat iemand echt bij ons krijgt en hoe een gewone werkdag eruitziet. Maximaal 250 woorden.',
  },
  {
    titel: 'Je marge laten narekenen',
    prompt:
      'Ik verkoop [product] aan € [prijs] excl. btw. Mijn aankoop kost € [x] en ik reken [y] uur werk aan € [z] per uur. Wat is mijn marge? Reken het stap voor stap uit en toon de berekening.',
  },
  {
    titel: 'Contract in gewone taal',
    prompt:
      'Vat dit contract samen in tien punten in gewone taal, met bij elk punt het artikelnummer. Waar zit voor mij het grootste risico? Citeer dat artikel letterlijk.\n\n[plak het contract]',
  },
  {
    titel: 'Een gesprek voorbereiden',
    prompt:
      'Ik heb morgen een gesprek met [wie] over [onderwerp]. Welke vijf vragen of bezwaren ga ik waarschijnlijk krijgen, en wat is telkens een sterk, kort antwoord?',
  },
  {
    titel: 'Foto van een etiket of handleiding',
    prompt:
      'Leg uit wat er op deze foto staat, in gewone taal, alsof ik er niets van ken. Wat moet ik doen, en waar moet ik op letten?',
  },
];

export const SPELREGELS: { titel: string; tekst: string }[] = [
  {
    titel: 'Let op wat je erin plakt',
    tekst:
      'Gratis accounts kunnen je gesprekken gebruiken om te leren. Zet dat uit: in Claude via Instellingen → Privacy → "Help improve Claude", in ChatGPT via Instellingen → Gegevensbeheer → "Het model verbeteren voor iedereen". Geen klantgegevens of personeelsdossiers in een gratis versie.',
  },
  {
    titel: 'Jij tekent af',
    tekst:
      'AI klinkt altijd zeker, ook als hij fout zit. Cijfers, wetten, namen en prijzen kijk je altijd zelf na. Vraag: "Op welke passage baseer je dat? Citeer letterlijk."',
  },
  {
    titel: 'De AI Act geldt ook voor KMO\'s',
    tekst:
      'Wie AI inzet, moet zorgen dat zijn mensen er voldoende over weten (AI-geletterdheid, sinds februari 2025). Deze trucs zijn daar een goed begin van.',
  },
];

export const TOOLS: { naam: string; url: string; waarvoor: string }[] = [
  { naam: 'Wispr Flow', url: 'https://wisprflow.ai', waarvoor: 'Praten in plaats van typen, in elke app. Installeer dit eerst.' },
  { naam: 'Claude', url: 'https://claude.ai', waarvoor: 'Schrijven, documenten lezen, Projects. Gratis versie beschikbaar.' },
  { naam: 'ChatGPT', url: 'https://chatgpt.com', waarvoor: 'Hetzelfde, met Projects en Custom GPT\'s. Gratis versie beschikbaar.' },
  { naam: 'NotebookLM', url: 'https://notebooklm.google.com', waarvoor: 'Je eigen documenten bevragen en er een podcast van maken. Gratis.' },
];

export const BREIN = {
  probleem:
    'Met een vaste assistent kent AI jou. Maar je collega\'s beginnen elk met hun eigen assistent, en de kennis in je mails, documenten en hoofden blijft verspreid.',
  idee: 'Een company brain: alle kennis van je bedrijf op één plek, zodat elke AI-collega meteen weet hoe jouw bedrijf werkt.',
  voorbeelden: [
    'Een collega die offertes voorbereidt met je eigen prijzen',
    'Een collega die klantvragen beantwoordt zoals jij dat zou doen',
  ],
  collegas: ['Marketing', 'Sales', 'Offertes', 'Klantvragen', 'Administratie', 'Planning'],
  uitnodiging: 'Benieuwd wat dat voor jouw bedrijf kan betekenen? Plan een gesprek met Karel.',
} as const;

/* ------------------------------------------------------------------ */
/* Slides                                                              */
/* ------------------------------------------------------------------ */

interface SlideBasis {
  id: string;
  /** Geplande minuten voor deze slide (voor de timing op het sprekersscherm). */
  minuten: number;
  notities: string[];
}

export type Slide = SlideBasis &
  (
    | { soort: 'titel' }
    | { soort: 'statement'; tekst: string; bron?: string }
    | { soort: 'lijst'; label?: string; kop: string; items: string[]; stapsgewijs?: boolean }
    | { soort: 'sectie'; deel: 1 | 2 | 3 }
    | { soort: 'stagiair' }
    | { soort: 'truc'; trucId: string }
    | { soort: 'snel' }
    | { soort: 'overzicht' }
    | { soort: 'qr'; kop: string; tekst: string }
    | { soort: 'brein'; stap: 'probleem' | 'idee' | 'uitnodiging' }
  );

export const STAGIAIR: { is: string; dus: string }[] = [
  { is: 'Heeft alles gelezen, maar kent jouw bedrijf niet', dus: 'Geef context' },
  { is: 'Durft niet terug te vragen', dus: 'Laat hem jou interviewen' },
  { is: 'Leert het snelst door na te doen', dus: 'Toon een voorbeeld' },
  { is: 'Raakt het overzicht kwijt bij een grote opdracht', dus: 'Vraag een vorm, werk in stappen' },
  { is: 'Klinkt altijd zeker, ook als hij fout zit', dus: 'Laat hem tegenspreken, jij tekent af' },
  { is: 'Vergeet alles bij een nieuw gesprek', dus: 'Leg het één keer vast' },
];

export const SLIDES: Slide[] = [
  {
    id: 'titel',
    soort: 'titel',
    minuten: 1,
    notities: [
      'Korte intro: Karel, co-founder van Finit Solutions. We bouwen AI-collega\'s voor Vlaamse KMO\'s.',
      '"Geen technisch verhaal vanavond."',
    ],
  },
  {
    id: 'handen',
    soort: 'lijst',
    label: 'Even peilen',
    kop: 'Handen omhoog',
    items: [
      'Wie heeft ChatGPT, Claude of Copilot al gebruikt?',
      'Wie gebruikt het elke week voor zijn werk?',
      'Wie betaalt er al voor?',
      'Wie kreeg al eens een antwoord waar hij niets mee kon?',
    ],
    stapsgewijs: true,
    minuten: 3,
    notities: [
      'Weinig handen bij vraag 2? Neem meer tijd voor de stagiair.',
      'Veel handen? Stagiair sneller, meer tijd voor de demo\'s.',
      'Vraag 4 lokt herkenning en een lach uit: "Vanavond gaan we dat oplossen."',
    ],
  },
  {
    id: 'utley',
    soort: 'statement',
    tekst: 'Ik gebruik geen AI.\nIk werk mét AI.',
    bron: 'Jeremy Utley, Stanford',
    minuten: 1,
    notities: [
      'Belofte: "Je krijgt een rist trucs die je morgen kan gebruiken. Alle prompts krijg je op het einde via een QR-code, je hoeft niets over te schrijven."',
      'AI is geen IT-project. Het is een nieuwe collega die je moet leren aansturen.',
    ],
  },
  {
    id: 'stagiair',
    soort: 'stagiair',
    minuten: 3,
    notities: [
      '"Een LLM voorspelt het meest waarschijnlijke antwoord op wat jij hem geeft. Geef je weinig, dan krijg je het gemiddelde van het internet. Geef je veel, dan krijg je iets op maat."',
      'Elke truc van vanavond antwoordt op één regel van deze tabel.',
    ],
  },
  {
    id: 'tips',
    soort: 'lijst',
    label: 'Twee gewoontes',
    kop: 'Voor je begint',
    items: [
      'Nieuw onderwerp? Nieuw gesprek. Anders haalt hij alles door elkaar.',
      'Moeilijke vraag? Kies het "denk"-model. Trager, maar veel beter.',
    ],
    minuten: 1,
    notities: ['Toon kort waar je het model kiest in Claude en ChatGPT.'],
  },
  {
    id: 'spelregels',
    soort: 'lijst',
    label: 'Spelregels',
    kop: 'Twee dingen om op te letten',
    items: [
      'Let op wat je erin plakt. Zet "trainen op je gesprekken" uit, en geen klantgegevens in een gratis account.',
      'De AI Act geldt ook voor KMO\'s: zorg dat je mensen weten hoe ze AI goed gebruiken.',
    ],
    minuten: 1,
    notities: [
      'Toon LIVE waar de knop zit: Claude → Instellingen → Privacy → "Help improve Claude". ChatGPT → Instellingen → Gegevensbeheer.',
      'AI-geletterdheid: geldt sinds februari 2025.',
    ],
  },
  { id: 'deel-1', soort: 'sectie', deel: 1, minuten: 0, notities: ['Zes trucs, telkens met een demo.'] },
  {
    id: 'truc-collega',
    soort: 'truc',
    trucId: 'collega',
    minuten: 7,
    notities: [
      'Eerst de slechte vraag. Toon het generieke resultaat en lach erom met de zaal.',
      'Dan dezelfde vraag met RCVF voor het bedrijf van een vrijwilliger uit de zaal. Back-up: de ingevulde versie voor Atelier Nova.',
      '"Het verschil zit niet in de tool, maar in hoe je het vraagt. Praat ertegen zoals je een nieuwe collega briefen zou."',
    ],
  },
  {
    id: 'truc-praten',
    soort: 'truc',
    trucId: 'praten',
    minuten: 5,
    notities: [
      'De enige tool die Karel vanavond aanraadt.',
      'Demo: typ eerst een korte vraag. Dicteer daarna een minuut rommelig in het Vlaams: wie je bent, voor wie, wat je wil. Toon het verschil.',
      'Kort: een mail dicteren in Gmail of Outlook.',
      '"Als je vanavond één ding installeert, is het dit."',
      'Privacy: je stem wordt in de cloud verwerkt. Geen vertrouwelijke gegevens zonder de instellingen te checken.',
    ],
  },
  {
    id: 'truc-interview',
    soort: 'truc',
    trucId: 'interview',
    minuten: 6,
    notities: [
      'Demo: de eerste offerte van een starter. Karel antwoordt live, met zijn stem (Wispr Flow).',
      '"Je hoeft niet te weten wat de goede vraag is. Je moet enkel weten dat je hem mag laten vragen."',
      'Loopt het uit? Noem de truc kort, zonder demo.',
    ],
  },
  {
    id: 'truc-voorbeeld',
    soort: 'truc',
    trucId: 'voorbeeld',
    minuten: 6,
    notities: [
      'Plak de drie goede posts en de slechte uit voorbeeldposts.txt. Vergelijk met de post van truc 1.',
      'Kort: de betalingsherinneringen in drie stappen.',
      '"AI schrijft niet slechter dan jij. Hij schrijft generiek als je hem niet toont hoe jij schrijft."',
    ],
  },
  {
    id: 'truc-foto',
    soort: 'truc',
    trucId: 'foto',
    minuten: 7,
    notities: [
      "Upload de 5 foto's van kasticketjes. Download het Excel-bestand en open het.",
      'Daarna de resultatenrekening in drie stappen (te schrappen als het uitloopt).',
      '"Je boekhouder blijft nodig. Maar het voorbereidende werk en het begrijpen van je eigen cijfers kan je nu zelf."',
    ],
  },
  {
    id: 'truc-tegenspreken',
    soort: 'truc',
    trucId: 'tegenspreken',
    minuten: 8,
    notities: [
      'Eerst: drie opties met kritiek. Toon de vaste instructie in de instellingen.',
      'Dan het rollenspel "te duur". Karel speelt de verkoper, zegt "stop" en toont de feedback.',
      'Utley: de AI speelt drie rollen: hij analyseert de klant, speelt de klant en coacht jou.',
      '"AI klinkt altijd zeker. Gebruik hem als een slimme stagiair: hij verzet veel werk, maar jij tekent af."',
    ],
  },
  {
    id: 'snel',
    soort: 'snel',
    minuten: 5,
    notities: [
      'Tempo! Dertig seconden per truc, geen demo.',
      'Alle tien de prompts staan in de handout.',
    ],
  },
  { id: 'deel-2', soort: 'sectie', deel: 2, minuten: 0, notities: ['Van losse vragen naar een collega die je kent.'] },
  {
    id: 'regel-van-twee',
    soort: 'statement',
    tekst: 'Doe je iets meer dan twee keer?\nLeg het vast.',
    bron: 'De regel van twee',
    minuten: 1,
    notities: ['Wat je elke keer opnieuw uitlegt, leg je één keer vast. Dan begint elk gesprek bij jou.'],
  },
  {
    id: 'truc-onboarding',
    soort: 'truc',
    trucId: 'onboarding',
    minuten: 4,
    notities: [
      'Start het interview en beantwoord twee of drie vragen met Wispr Flow. Toon dat hij één vraag per keer stelt.',
      'Toon daarna de briefing die eruit kwam (back-up: briefing-atelier-nova.md).',
      '"Wat zou deze AI moeten weten als hij morgen bij je team begon?"',
    ],
  },
  {
    id: 'truc-lezen',
    soort: 'truc',
    trucId: 'lezen',
    minuten: 3,
    notities: [
      'Plak klantmails.txt. Toon de FAQ die eruit komt.',
      'Utley deed dit met 50 transcripten van klantgesprekken: drie minuten.',
    ],
  },
  {
    id: 'truc-assistent',
    soort: 'truc',
    trucId: 'assistent',
    minuten: 2,
    notities: [
      'Toon het vooraf ingestelde Project voor Atelier Nova.',
      'Drie korte vragen na elkaar, zonder uitleg. Alles klopt meteen met het bedrijf.',
      '"Dit is het moment waarop AI geen speeltje meer is, maar een collega."',
    ],
  },
  { id: 'deel-3', soort: 'sectie', deel: 3, minuten: 0, notities: ['Kort en leuk.'] },
  {
    id: 'truc-podcast',
    soort: 'truc',
    trucId: 'podcast',
    minuten: 3,
    notities: [
      'Maak het audio-overzicht VOORAF (duurt een paar minuten). Speel live 30 seconden af.',
      'Leuk als het van een bedrijf uit de zaal is: vraag Mattice vooraf om een brochure.',
    ],
  },
  {
    id: 'vooruit',
    soort: 'statement',
    tekst: 'Elke maandag om 7 uur:\n"Zoek nieuws over mijn tien grootste klanten."',
    bron: 'AI die zelf op een vast moment aan de slag gaat',
    minuten: 1,
    notities: [
      'Kijkje vooruit, één minuut, geen demo.',
      'Dit kan al (bv. geplande taken in Claude). Het is de brug naar het company brain op het einde.',
    ],
  },
  {
    id: 'aftekenen',
    soort: 'statement',
    tekst: 'Hij klinkt altijd zeker.\nJij tekent af.',
    minuten: 1,
    notities: ['Bij een demo met een AI-agent werd een video verzonnen die niet bestond. Altijd nakijken.'],
  },
  {
    id: 'overzicht',
    soort: 'overzicht',
    minuten: 2,
    notities: ['Alle trucs op één slide. Laat de QR-code staan terwijl je praat.'],
  },
  {
    id: 'huiswerk',
    soort: 'lijst',
    label: 'Morgen',
    kop: 'Je huiswerk',
    items: [
      'Kies één taak die je haat en probeer er drie trucs op.',
      'Installeer Wispr Flow.',
      'Vraag je team: "Heb je het al met AI geprobeerd?" En vier de goede voorbeelden.',
    ],
    stapsgewijs: true,
    minuten: 1.5,
    notities: ['Utley: leiders bepalen wat telt door wat ze in de verf zetten.'],
  },
  {
    id: 'qr',
    soort: 'qr',
    kop: 'Alle prompts van vanavond',
    tekst: 'Scan en kopieer ze meteen op je gsm.',
    minuten: 1.5,
    notities: ['"Scan nu even." Laat dit minstens een minuut staan.'],
  },
  {
    id: 'brein-probleem',
    soort: 'brein',
    stap: 'probleem',
    minuten: 2,
    notities: ['Een verhaal, geen verkoop. Geen prijzen, geen klantnamen.'],
  },
  {
    id: 'brein-idee',
    soort: 'brein',
    stap: 'idee',
    minuten: 3,
    notities: [
      'Twee herkenbare voorbeelden: offertes met je eigen prijzen, klantvragen beantwoorden zoals jij.',
      'Hoe Finit het doet: eerst je bedrijf in kaart brengen, dan het brein bouwen, dan de AI-collega\'s die het meeste tijd besparen.',
    ],
  },
  {
    id: 'brein-uitnodiging',
    soort: 'brein',
    stap: 'uitnodiging',
    minuten: 2,
    notities: ['"Via dezelfde QR-code kan je een gesprek met mij plannen." Laat deze slide staan tijdens de Q&A.'],
  },
];

export function trucVoorId(id: string): Truc {
  const truc = TRUCS.find((t) => t.id === id);
  if (!truc) throw new Error(`Onbekende truc: ${id}`);
  return truc;
}

/** Aantal klikken binnen een slide (items die één voor één verschijnen). */
export function stappenVoor(slide: Slide): number {
  if (slide.soort === 'lijst' && slide.stapsgewijs) return slide.items.length;
  if (slide.soort === 'snel') return SNELLE_RONDE.length;
  return 0;
}

/** Geplande kloktijd (bv. "19:42") per slide, vanaf de starttijd. */
export function geplandeTijden(): string[] {
  const [uur, min] = LEZING.starttijd.split(':').map(Number);
  let totaal = uur * 60 + min;
  return SLIDES.map((slide) => {
    const h = Math.floor(totaal / 60);
    const m = Math.round(totaal % 60);
    totaal += slide.minuten;
    return `${h}:${String(m).padStart(2, '0')}`;
  });
}
