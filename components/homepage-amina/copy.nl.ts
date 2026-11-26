import type { Copy } from "./copy";

/**
 * De Nederlandse tekst van de homepage (standaard, finitsolutions.be/).
 *
 * Vertaling van Amina's Engelse copy (zie ./copy.en.ts), zin per zin, in de
 * stem van Alex: je/jij, zaakvoerder en kmo, korte zinnen, betekenis eerst en
 * dan het woord (stemprofiel §13). Geen gedachtestreepjes, geen uitroeptekens.
 *
 * Alleen haar copy (Alex, 25/11). Niet van haar, maar technisch nodig: `meta`
 * (titel en beschrijving voor Google), `nav` (de labels van het menu, met de
 * namen van haar secties), de meldingen van het formulier (bezig, bedankt,
 * fout), `overOns.meta`, `footer` en de alt-tekst van de foto.
 */
export const NL: Copy = {
  meta: {
    titel: "Finit Solutions | AI die werkt zoals jouw bedrijf werkt",
    beschrijving:
      "In één week schrijven we uit hoe je bedrijf werkt, in gewone tekst. Daarna bouwen we AI die het werk op jouw manier doet. Voor zaakvoerders van Vlaamse kmo's. Het eerste gesprek is gratis.",
  },

  nav: {
    links: [
      { id: "werkwijze", label: "Hoe we werken" },
      { id: "bouwen", label: "Wat we bouwen" },
      { id: "waarom", label: "Waarom Finit" },
      { id: "vragen", label: "FAQ" },
    ],
    overOns: "Over ons",
    cta: "Boek een conversatie",
    menuOpenen: "Menu openen",
    menuSluiten: "Menu sluiten",
    taalLabel: "Taal",
  },

  // 1. Hero
  hero: {
    voorWie: "Voor zaakvoerders in Vlaanderen die hun administratie nog altijd zelf doen",
    // "de secretaris", niet "het secretariaat" (Alex, 25/11).
    h1: "Je bent al jaren de secretaris van je eigen bedrijf.",
    h1Streep: "eigen bedrijf.",
    h1Vervolg: "Wij schrijven in één week uit hoe je bedrijf werkt. Daarna doet AI het werk op jouw manier, in jouw plaats.",
    sub: "ChatGPT is slim, maar het weet niets over jouw bedrijf. Daarom beginnen we met een company brain: hierin staat hoe je werkt, je prijzen, je regels en je uitzonderingen, uitgeschreven in gewone tekst. Elke AI die we bouwen, leest dat eerst.",
    knop: "Boek een conversatie",
    tweedeLink: "Bekijk hoe het werkt",
    punten: [
      "Jij vertelt hoe je bedrijf draait. Wij doen het werk.",
      "Geen technische kennis nodig.",
      "Het gesprek is gratis en vrijblijvend.",
    ],
    ondersteund: "Ondersteund door",
  },

  // De breinvisualisatie en de foto van de vorige homepage (Alex, 26/11). De labels en de
  // tekstbestanden van het brein staan in components/home/copy.ts (BREIN_INFO).
  brein3d: {
    aria: "Het brein van een dienstenbedrijf: pagina's zoals Offertes, Klanten, Planning en Facturatie, met lijnen ertussen voor de verbanden.",
  },
  foto: {
    statement: "Finit maakt Vlaamse KMO's klaar voor het AI-tijdperk.",
    alt: "Karel en Jord van Finit Solutions achter hun stand op een beurs.",
  },

  // 2. Herkenbaar? (door Amina ingekort op 25/11, na de comment van Alex)
  herken: {
    kicker: "Herkenbaar?",
    h2: "Je betaalt voor AI, je team gebruikt het elke dag, en toch herschrijf je uiteindelijk alles zelf.",
    vraag: "Wat heb je er dan precies mee bespaard?",
    punten: [
      "Alles passeert nog altijd langs jou.",
      "Je herschrijft wat AI je geeft.",
      "De kennis zit in één hoofd.",
      "Je weet niet waar je moet beginnen.",
    ],
    slot: "Herken je er ook maar één van? Dan ligt het probleem waarschijnlijk niet bij jou. En ook niet bij AI. Het is iets veel eenvoudigers, en net dat lossen wij op.",
    knop: "Toon me wat er ontbreekt",
    kleineLink: "Of boek een conversatie",
  },

  // 3. Wat is een company brain? (AI-fundament; door Amina ingekort op 25/11)
  brein: {
    h2: "AI blijft gokken naar hoe jouw bedrijf werkt. Dit is wat het niet kan zien.",
    sub: "Alles wat je elke dag beslist, zit in je hoofd. Stel je voor dat je AI dat kon lezen.",
    alineas: [
      "Een klant die al jaren bij je koopt vraagt korting, en jij weet hoe ver je kan gaan. Een kwade klant belt, en jij weet precies wat je moet zeggen. Niets daarvan staat opgeschreven, dus AI kan het niet.",
      "Bij Finit Solutions begint elk project met een company brain: gewone tekstbestanden waarin je processen, je regels, je uitzonderingen en je toon staan, tot in de kleine beslissingen. Elke AI die we bouwen, leest dat eerst.",
    ],
    verander: [
      {
        titel: "AI werkt op jouw manier.",
        tekst: "De offerte, het antwoord en de planning zien eruit zoals jouw bedrijf ze maakt.",
      },
      {
        titel: "Je kennis hangt niet meer af van één persoon.",
        tekst: "Vertrekt er iemand, dan blijft de kennis.",
      },
    ],
    slot: "En het blijft van jou. Het is gewone tekst, dus elk AI-model kan het lezen, vandaag en later.",
    knop: "Toon me hoe het werkt",
  },

  // 4. Hoe we werken (volgorde rechtgezet door Alex, 24/11: eerst de gesprekken en de
  // offerte, pas na het tekenen het brein, daarna bouwen). Het gesprek duurt een uur (Alex, 25/11).
  werkwijze: {
    h2: "Geen tijd voor een AI-project? Goed, want die heb je hiervoor niet nodig.",
    sub: "Je hoeft geen enkele pagina te schrijven. Je hoeft alleen te vertellen.",
    stap: "Stap",
    stappen: [
      {
        titel: "Een gratis eerste conversatie",
        // Alex, 25/11: niet meer "wij luisteren vooral". In die 60 minuten gaan we al grondig door de processen.
        tekst: "60 minuten waarin we al grondig en diepgaand door je processen gaan: hoe je bedrijf draait, waar de tijd naartoe gaat en waar het knelt. Aan het einde zeggen we je eerlijk of we bij elkaar passen.",
      },
      {
        titel: "Nog een paar gesprekken, tot we je een offerte kunnen geven",
        tekst: "We praten verder, online of bij jou, tot we genoeg weten om een duidelijk plan en een prijs op papier te zetten. Je legt uit hoe je werkt. Elk gesprek tot dan kost je niets, en er start niets voor jij ja hebt gezegd.",
      },
      {
        titel: "We schrijven je bedrijf uit",
        tekst: "Zodra je tekent, zitten we één week samen met jou en je team, want de mensen die het werk doen weten vaak het best hoe het er echt aan toegaat. We schrijven uit hoe je bedrijf draait, tot in de kleine beslissingen. Dat is je company brain, en het is van jou.",
      },
      {
        titel: "Daarna bouwen we",
        // Alex, 25/11: niet "gekoppeld aan de software die je al gebruikt"; soms bouwen we software van nul.
        tekst: "We bouwen wat je nodig hebt, van een eenvoudige automatisering tot een team van AI-werknemers of software volledig op maat. Alles begint in conceptmodus: AI bereidt het werk voor, een mens keurt het goed. We blijven erbij om het draaiende te houden.",
      },
    ],
    // Niet van Amina: Alex vroeg haar op 26/11 om hier naar de video te verwijzen, zij vond het een goed idee.
    video: {
      titel: "Liever eerst zien hoe het werkt?",
      tekst: "In een korte video legt Alex uit wat een company brain is en hoe we samen te werk gaan.",
      knop: "Bekijk de uitleg",
    },
    knop: "Boek een conversatie",
  },

  // 5. Waarom Finit
  waarom: {
    h2: "Een AI bouwen kunnen er genoeg. De vraag is waarop die gebouwd is.",
    sub: "Voor iemand iets voor je bouwt, moet er eerst iemand begrijpen hoe je bedrijf echt werkt.",
    intro: "Een AI bouwen kunnen er genoeg. Bij Finit Solutions beginnen we met begrijpen hoe jouw bedrijf werkt. Dat is het stuk waarmee we starten, en het is de reden waarom alles wat we bouwen op jouw bedrijf lijkt.",
    punten: [
      {
        titel: "We beginnen bij je bedrijf, niet bij een tool.",
        tekst: "We zitten eerst samen met jou en je team. Alles wat we daarna bouwen, vertrekt daarvan. Zo voelt het resultaat als iets van jou, en niet als een sjabloon.",
      },
      {
        titel: "We bouwen snel, en alleen wat je nodig hebt.",
        tekst: "We gebruiken zelf AI om te ontwikkelen. Daardoor kan een systeem op maat, dat normaal vele maanden vraagt, in enkele weken klaar zijn. En we bouwen één systeem rond wat jij echt gebruikt, zodat je niet betaalt voor de onderdelen van grote softwarepakketten die je toch nooit aanraakt.",
      },
      {
        titel: "We blijven.",
        tekst: "We zijn je vaste AI-partner, geen team dat een project oplevert en verdwijnt. Jij leert ons kennen, en wij leren jou en je mensen kennen.",
      },
    ],
  },

  // 6. Wat we bouwen
  bouwen: {
    h2: "De mails, de offertes, de planning, het invullen van het CRM.",
    sub: "Het werk dat je avonden vult, is precies waarvoor wij bouwen.",
    // De eerste zin is van Amina. De tweede vervangt haar uitleg van de vijf soorten (comment van
    // Alex, 25/11: te veel uitleg; men wil alleen weten dat we bouwen wat het best past, van een
    // eenvoudige automatisering tot een team van AI-agents of software op maat). Zijn woorden.
    intro: "Alles wat Finit Solutions bouwt, vertrekt van hetzelfde brein. We bouwen wat voor jou het best werkt en het minst kost: een eenvoudige automatisering, een team van AI-werknemers of software volledig op maat.",
    praktijk: "Zo ziet dat er in de praktijk uit. Alle voorbeelden zijn anoniem gemaakt.",
    cases: [
      {
        sector: "Installateurs en technische diensten (HVAC, elektriciteit, sanitair)",
        tekst: "Een elektro-installateur krijgt bijna elke werkdag een lastenboek binnen. Onze AI-werknemer leest het, zet de posten en hoeveelheden uit de meetstaat in zijn offertetool, kiest de juiste componenten voor de prijsaanvraag bij de groothandel en voegt de technische fiches toe.",
      },
      {
        sector: "Bouw, ramen en renovatie",
        tekst: "Een ramen- en deurenbedrijf bestelt voor elke werf bij veel leveranciers. Onze AI-werknemer legt elke bestelling naast de offerte en houdt per werf een checklist bij van wat besteld is en wat geleverd is.",
      },
      {
        sector: "Horeca en events",
        tekst: "Een eventlocatie krijgt elke aanvraag binnen in één info-mailbox. We bouwden een AI-werknemer die de mailbox sorteert en de antwoorden klaarzet, een offerte-AI die een richtprijs geeft voor bedrijven, automatische facturatie van het boekingssysteem naar de boekhouding, en een chatbot voor de website.",
      },
      {
        sector: "Vrije tijd en wellness",
        tekst: "Een wellnesscentrum kreeg een eigen boekingsplatform: online boeken en betalen, een scherm voor de receptie, de planning van de massages, en een AI die vragen van klanten beantwoordt.",
      },
      {
        sector: "Schoonmaak en facilitaire diensten",
        tekst: "Een schoonmaakbedrijf met een groot aantal locaties bij klanten. Een AI-werknemer haalt de klachten uit twee mailboxen, koppelt elke klacht aan de juiste klant en locatie in hun bedrijfssoftware, en houdt de opvolging bij.",
      },
      {
        sector: "In elke sector",
        tekst: "Binnenkomende bestelmails worden conceptbestellingen in de webshop van een B2B-leverancier.",
      },
    ],
    toolsTitel: "Werkt met wat je al gebruikt:",
    toolsRest: "en zowat al de rest.",
  },

  // 7. Wie zit er achter Finit
  team: {
    h2: "Je gaat ons toevertrouwen hoe je bedrijf draait.",
    sub: "Achter elke AI-werknemer staat een mens die je kan bellen.",
    intro: "De drie oprichters van Finit Solutions.",
    mensen: [
      {
        naam: "Alex Otten",
        rol: "Oprichter en zaakvoerder",
        tekst: "Alex zorgt voor de groei en de zichtbaarheid van Finit. Misschien ken je hem al van de video's.",
      },
      {
        naam: "Karel Van Ransbeeck",
        rol: "Oprichter en zaakvoerder",
        tekst: "Karel houdt Finit elke dag draaiende. Hij is je aanspreekpunt als klant en voor de analyse van je bedrijf.",
      },
      {
        naam: "Jord Goossens",
        rol: "Oprichter en CTO",
        tekst: "Jord is verantwoordelijk voor de technologie en de kwaliteit van alles wat we bouwen.",
      },
    ],
    bel: "Liever eerst even praten? Bel ons op",
    belUren: "van maandag tot zaterdag, van 8u30 tot 19u.",
    fotoAlt: "Karel, Jord en Alex van Finit Solutions aan hun stand op een beurs.",
  },

  // 8. Bewijs
  bewijs: {
    h2: "Vraag je je af of dit werkt voor een bedrijf zoals het jouwe?",
    sub: "Je bent niet de enige die geen idee had hoeveel AI vandaag al kan overnemen.",
    getuigenissenTitel: "Lees wat klanten over Finit Solutions zeggen.",
    // Bewust leeg (Alex, 25/11): geen getuigenissen tot de eerste case klaar is die bij het profiel past.
    // Een getuigenis toevoegen = hier een regel { quote, naam, bedrijf } zetten; het blok verschijnt vanzelf.
    getuigenissen: [],
    ondersteund: "Ondersteund door",
    knop: "Boek een conversatie",
  },

  // 9. Veelgestelde vragen
  faq: {
    h2: "Voor je een conversatie boekt, wil je waarschijnlijk eerlijke antwoorden.",
    sub: "Je hebt AI al de mist zien ingaan. Dit zijn de twijfels die we het vaakst horen.",
    items: [
      {
        q: "Wat kost het?",
        a: "Elk onderdeel krijgt een eigen offerte. Zo zie je de kost voor je beslist, en laat je weg wat je niet nodig hebt. We brengen eerst in kaart wat je huidige manier van werken je kost, en daarna wat wij zouden veranderen. Het eerste gesprek is gratis, en dat geldt voor elk gesprek tot je iets tekent.",
      },
      {
        q: "Kan AI dit echt? Ik heb het al dingen zien verzinnen.",
        a: "Wij ook. Daarom begint alles in conceptmodus: AI bereidt het werk voor, een mens keurt het goed. Twijfelgevallen gaan naar een mens, en wat AI zelf mag doen, breiden we alleen stap voor stap uit. We tonen je eerst een demo, want het zelf zien is beter dan het geloven.",
      },
      {
        q: "We gebruiken ChatGPT al. Waarom hebben we dit dan nodig?",
        a: "Omdat het gebruiken en er iets uit halen twee verschillende dingen zijn. ChatGPT kent uit zichzelf je werkprocedures, regels en uitzonderingen niet. Wij vragen altijd wat er vandaag echt automatisch loopt. Meestal is het antwoord: niets. Een brein geeft ChatGPT die kennis. Zo krijg je dezelfde tool, met een heel ander resultaat.",
      },
      {
        q: "Is dit over twee maanden niet alweer verouderd?",
        a: "Het brein is gewone tekst, en het is van jou. Elk model kan het lezen, vandaag en later. Komt er een beter model uit, dan sluit je dat gewoon aan. Je zit niet vast aan één tool.",
      },
      {
        q: "Het is een drukke periode. Kan dit wachten?",
        a: "Dat kan. Maar AI negeren kost je misschien meer dan er iets aan doen. Een drukke periode is meestal net het teken dat je het het hardst nodig hebt. Wij beginnen liever voor de druk nog groter wordt.",
      },
      {
        q: "Wat met mijn medewerkers?",
        a: "Wij praten over groeien zonder dat je evenveel extra mensen moet aanwerven, nooit over mensen ontslaan. We interviewen je team tijdens de breinweek, zodat hun kennis mee in het brein zit, en we leiden hen ter plaatse op.",
      },
      {
        q: "Wat met mijn gegevens?",
        a: "Bij elk project horen een geheimhoudingsovereenkomst (NDA) en een verwerkersovereenkomst, en meestal komt er ook een serviceovereenkomst bij. Alles wordt in Europa gehost, en je gegevens blijven gescheiden van die van andere klanten. De AI-verwerking door Anthropic loopt via de Verenigde Staten, en daar kunnen we niet omheen. Daarom staat elke subverwerker in onze verwerkersovereenkomst.",
      },
      {
        q: "Gaat AI met mijn klanten praten?",
        a: "Alleen als jij dat wil. Standaard bereidt AI het werk voor en verstuur jij. Alleen kleine, standaard dingen vertrekken automatisch. Een belangrijke offerte mag nooit de deur uit zonder dat er een mens naar gekeken heeft.",
      },
      {
        q: "We hebben al software die werkt. Moeten we die vervangen?",
        a: "Nee. We bouwen bovenop wat je hebt en koppelen het aan elkaar. We stellen alleen voor om iets te vervangen als dat echt zinvol is, en dan leggen we uit waarom.",
      },
      {
        q: "Ik ben niet technisch.",
        a: "Dat hoeft ook niet. Je hoeft alleen over je bedrijf te vertellen.",
      },
      {
        q: "We zijn hier te klein voor.",
        a: "Misschien. Is er geen echte nood, dan zeggen we je dat eerlijk, in plaats van je iets te verkopen. Na een uur weet je het.",
      },
      {
        q: "Ik heb hier geen tijd voor.",
        a: "We vragen twee uur van jou en één dag met je team. De rest van de breinweek is voor ons.",
      },
      {
        q: "Kan ik een bedrijf zoals jullie vertrouwen?",
        a: "Je systemen draaien zelfstandig, en de overdracht staat in het contract. Vraag ons gerust naar referenties tijdens het gesprek.",
      },
      {
        q: "Wat als Finit stopt?",
        a: "Je systemen blijven draaien. Mochten we ooit stoppen, dan laten we je dat ruim op voorhand weten en starten we een overdracht: alle toegangen, de hosting en de abonnementen gaan naar jou of naar een IT-partner van jouw keuze, zonder kosten.",
      },
    ],
    knop: "Boek een conversatie",
  },

  // 10. Voor wie is dit. Woordelijk de kaarten van de hub (Alex, 25/11), groen en rood.
  // Elk punt maakt de zin af na "... als:" (dus "je een knop wil", niet "je wil een knop").
  voorWie: {
    h2: "We zeggen je liever nee dan je tijd te verspillen.",
    wel: {
      titel: "Dit is voor jou als:",
      items: [
        "Je zaakvoerder bent of in het management van een kmo zit.",
        "Je wil groeien zonder extra mankracht te hoeven aanwerven.",
        "Je team tijd verliest aan mails, offertes, planning en het invullen van het CRM.",
        "Er te veel afhangt van jou of van één sleutelpersoon.",
        "Je wil beginnen delegeren aan AI, met een gerust hart.",
      ],
    },
    niet: {
      titel: "Dit is niet voor jou als:",
      items: [
        "Je een knop wil die alles vanzelf doet. Die bestaat niet.",
        "Je een snelle oplossing wil zonder dat het jou of je team tijd kost.",
        "Er vandaag geen echte pijn is. In dat geval zeggen we je dat eerlijk.",
      ],
    },
  },

  // 11. Slot en formulier
  slot: {
    h2: "Geen contract, geen druk, gewoon een eerste conversatie.",
    sub: "Ontdek wat er in je hoofd vastzit, voor het je iets kost.",
    kort: "Een uur, gratis en vrijblijvend.",
    tekst: "We vragen hoe je bedrijf draait, welke software je gebruikt en waar de tijd naartoe gaat. Daarna zeggen we je eerlijk of we kunnen helpen. Geen contract, geen druk.",
    formulier: {
      naam: "Naam",
      email: "E-mailadres",
      telefoon: "Telefoonnummer",
      website: "Website van je bedrijf",
      bericht: "Waar verlies je de meeste tijd, of wat wil je vragen?",
      knop: "Boek een conversatie",
      bezig: "Versturen…",
      bedankt: "Je aanvraag is aangekomen.",
      bedanktSub: "We bellen je om een moment te kiezen. Je hoort meestal binnen 24 uur van ons.",
      fout: "Het versturen lukte niet. Probeer het opnieuw, of mail ons op {email}.",
    },
  },

  overOns: {
    metaTitel: "Over ons | Finit Solutions",
    metaBeschrijving: "De drie oprichters van Finit Solutions: Alex Otten, Karel Van Ransbeeck en Jord Goossens. Achter elke AI-werknemer staat een mens die je kan bellen.",
  },

  gratis: {
    nav: "Gratis materiaal",
    metaTitel: "Gratis prompts en gidsen | Finit Solutions",
    videoKnop: "Bekijk de video",
    kop: { voor: "De prompts uit mijn video's,", accent: "gratis", na: "op één plek" },
    sub: "Laat je e-mailadres achter en alles gaat meteen open. Ook de BREIN-prompt.",
    kaart: {
      titel: "Krijg nu gratis toegang tot de BREIN-prompt",
      tekst: "Plus alle andere prompts en gidsen uit mijn video's. Vul je e-mailadres in en alles gaat meteen open.",
      voornaam: "Voornaam",
      voornaamHint: "Je voornaam",
      email: "E-mailadres",
      knop: "Geef me de gratis prompts",
    },
    krijg: [
      "De BREIN-prompt: AI leert hoe jouw bedrijf werkt",
      "Alle prompts en gidsen uit mijn video's, de nieuwste bovenaan",
      "Op dit toestel blijft alles daarna open",
    ],
    open: {
      titel: "Succes ermee{naam}!",
      intro: "Begin met de BREIN-prompt. Daaronder vind je alle andere prompts en gidsen.",
      rest: "Alle andere prompts en gidsen",
    },
    brein: {
      label: "BREIN-prompt",
      titel: "Leer AI hoe jouw bedrijf werkt",
      tekst: "Plak de prompt in Claude of ChatGPT en beantwoord de vragen. Je krijgt een set bestanden over je bedrijf: het brein waarmee AI daarna weet hoe jij werkt.",
      knop: "Open de BREIN-prompt",
      pdf: "https://drive.google.com/file/d/1q0XLe-yXxwqzWdsietBWXAs-895JVWYi/view",
      cover: "/gratis/brein-prompt-nl.jpg",
    },
  },

  footer: {
    video: "Bekijk de video",
    links: [
      { label: "Vacatures", href: "/vacatures/" },
      { label: "Contact", href: "/contact/" },
      { label: "Privacybeleid", href: "/privacy/" },
      { label: "Cookieverklaring", href: "/cookieverklaring/" },
      { label: "Disclaimer", href: "/disclaimer/" },
    ],
    cookies: "Cookie-instellingen",
    btw: "Btw",
  },

  plakbalk: "Boek een conversatie",
};
