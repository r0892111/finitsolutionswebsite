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
    cta: "Plan een gratis startgesprek",
    menuOpenen: "Menu openen",
    menuSluiten: "Menu sluiten",
    taalLabel: "Taal",
  },

  // 1. Hero
  hero: {
    voorWie: "Voor zaakvoerders in Vlaanderen die hun administratie nog altijd zelf doen",
    h1: "Je bent al jaren het secretariaat van je eigen bedrijf.",
    h1Vervolg: "Wij schrijven in één week uit hoe je bedrijf werkt. Daarna doet AI het werk op jouw manier, in jouw plaats.",
    sub: "ChatGPT is slim, maar het weet niets over jouw bedrijf. Daarom beginnen we met een company brain: hierin staat hoe je werkt, je prijzen, je regels en je uitzonderingen, uitgeschreven in gewone tekst. Elke AI die we bouwen, leest dat eerst.",
    knop: "Plan een gratis startgesprek",
    tweedeLink: "Bekijk hoe het werkt",
    punten: [
      "Jij vertelt hoe je bedrijf draait. Wij doen het werk.",
      "Geen technische kennis nodig.",
      "Het gesprek is gratis en vrijblijvend.",
    ],
    ondersteund: "Ondersteund door",
    gesproken: "We spraken al met meer dan honderd Belgische kmo's.",
  },

  // 2. Herkenbaar?
  herken: {
    kicker: "Herkenbaar?",
    h2: "Je betaalt voor AI, je team gebruikt het elke dag, en toch herschrijf je uiteindelijk alles zelf.",
    vraag: "Wat heb je er dan precies mee bespaard?",
    punten: [
      {
        titel: "Alles passeert nog altijd langs jou.",
        tekst: "De offerte, de mail, de planning. Je team is goed, maar de laatste stap is altijd voor jou. Je avonden dus ook.",
      },
      {
        titel: "Je herschrijft wat AI je geeft.",
        tekst: "Je mensen gebruiken ChatGPT elke dag. Daarna verbeter jij de toon, de prijs en die ene uitzondering waar het nooit van wist. Je vraagt je af wie er tijd gewonnen heeft, want jij was het niet.",
      },
      {
        titel: "De kennis zit in één hoofd.",
        tekst: "Welke leverancier altijd te laat is. Welke klant de uitzondering krijgt. Hoe je praat met de klant die al kwaad is. Niemand heeft het opgeschreven, en je hoopt dat die ene persoon nooit vertrekt.",
      },
      {
        titel: "Je weet niet waar je moet beginnen.",
        tekst: "Je hebt AI al dingen zien verzinnen, dus je vertrouwt het niet helemaal. Je hoort andere zaakvoerders zeggen dat het alles verandert, en stilletjes vraag je je af of je achterop raakt.",
      },
    ],
    slot: "Herken je er ook maar één van? Dan ligt het probleem waarschijnlijk niet bij jou. En ook niet bij AI. Het is iets veel eenvoudigers, en net dat lossen wij op.",
    knop: "Toon me wat er ontbreekt",
    kleineLink: "Of plan een gratis startgesprek",
  },

  // 3. Wat is een company brain? (AI-fundament)
  brein: {
    h2: "AI blijft gokken naar hoe jouw bedrijf werkt. Dit is wat het niet kan zien.",
    sub: "Alles wat je elke dag beslist, zit in je hoofd. Stel je voor dat je AI dat kon lezen.",
    alineas: [
      "Denk eens aan wat je doet zonder erbij na te denken. Een klant die al jaren bij je koopt vraagt korting, en jij weet hoe ver je kan gaan. Er komt op vrijdagnamiddag nog een opdracht binnen, en jij weet wat tot maandag kan wachten. Een klant is al kwaad, en jij weet precies hoe je met die klant moet praten.",
      "Niets daarvan staat ergens opgeschreven. Daarom kan AI het niet, en daarom voelt het alsof je elke ochtend een nieuwe medewerker van nul moet opleiden.",
      "Bij Finit Solutions begint elk project met dat brein. Het is eigenlijk gewoon een map met tekstbestanden over je bedrijf. In elk bestand staat één stuk juiste informatie: een proces, een regel, een uitzondering, de manier waarop je naar je klanten schrijft. Elk proces is een reeks stappen, en elke stap is een reeks kleine beslissingen. Die beslissingen schrijven wij uit, één voor één, in gewone taal. We noemen het ook je AI-fundament.",
      "Elke AI die wij bouwen, leest eerst het brein voor hij iets doet. Zo werkt hij zoals jouw bedrijf werkt.",
    ],
    veranderTitel: "Er veranderen twee dingen:",
    verander: [
      {
        titel: "AI doet het werk op jouw manier.",
        tekst: "Dezelfde tool, maar de offerte, het antwoord en de planning zien eruit zoals jouw bedrijf ze maakt.",
      },
      {
        titel: "Je kennis hangt niet meer af van één persoon.",
        tekst: "Is er iemand ziek, of vertrekt er iemand, dan vertrekt de kennis niet mee.",
      },
    ],
    slot: "En het blijft van jou. Het is gewone tekst, dus elk AI-model kan het lezen, vandaag en later.",
    knop: "Toon me hoe het werkt",
  },

  // 4. Hoe we werken
  werkwijze: {
    h2: "Geen tijd voor een AI-project? Goed, want die heb je hiervoor niet nodig.",
    sub: "Je hoeft geen enkele pagina te schrijven. Je hoeft alleen te vertellen.",
    intro: "Je hebt het druk, en je hebt geen week over voor een AI-project. Daarom doen wij het anders: jij vertelt, wij doen het werk, en niemand hoeft iets te installeren.",
    stappen: [
      {
        titel: "Een gratis startgesprek.",
        tekst: "Een halfuur, vrijblijvend. Jij vertelt hoe je bedrijf draait en waar de tijd naartoe gaat. Wij luisteren vooral.",
      },
      {
        titel: "De breinweek.",
        tekst: "In één week brengen we je bedrijf in kaart. We zitten twee uur samen met jou als zaakvoerder. Daarna komen we een dag ter plaatse bij de mensen die het werk elke dag doen, want zij weten vaak het best hoe het er echt aan toegaat. Wij schrijven alles uit.",
      },
      {
        titel: "Je roadmap en je offerte.",
        tekst: "Je ziet wat AI als eerste kan overnemen, in volgorde van wat het meest opbrengt, met een offerte per onderdeel. Wat je niet nodig hebt, laat je weg.",
      },
      {
        titel: "We bouwen, stuk voor stuk.",
        tekst: "Gekoppeld aan de software die je al gebruikt. Alles begint in conceptmodus: AI bereidt het werk voor, een mens keurt het goed. Jij test elk stuk voor we verdergaan.",
      },
      {
        titel: "Het draait, en wij blijven.",
        tekst: "We houden het in de gaten, lossen problemen op en werken het bij. Om de drie maanden zitten we samen om te kijken wat er nog van je bord kan.",
      },
    ],
    knop: "Plan een gratis startgesprek",
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
    intro: "Alles wat Finit Solutions bouwt, vertrekt van hetzelfde brein.",
    niveaus: [
      "Het eenvoudigste dat we bouwen volgt een vaste regel: als dit gebeurt, doe dan dat.",
      "Daarna komen workflows, waarin AI iets leest en de volgende stap voorbereidt.",
      "Dan AI-werknemers, die beslissingen nemen over je software heen, zoals een medewerker die je mailbox in de gaten houdt en afhandelt wat er binnenkomt.",
      "Daarboven kan één AI-werknemer er meerdere aansturen.",
      "En als geen enkel bestaand pakket past, bouwen we software op maat rond wat je echt nodig hebt.",
    ],
    praktijk: "Zo ziet dat er in de praktijk uit. Alle voorbeelden zijn anoniem gemaakt.",
    statusLabel: "Status",
    statussen: {
      voorstel: "Voorstel",
      opbouw: "In opbouw",
      piloot: "Live als piloot, in gebruik",
      opgeleverd: "Opgeleverd",
    },
    cases: [
      {
        sector: "Installateurs en technische diensten (HVAC, elektriciteit, sanitair)",
        tekst: "Een elektro-installateur krijgt bijna elke werkdag een lastenboek binnen. Onze AI-werknemer leest het, zet de posten en hoeveelheden uit de meetstaat in zijn offertetool, kiest de juiste componenten voor de prijsaanvraag bij de groothandel en voegt de technische fiches toe.",
        status: "voorstel",
      },
      {
        sector: "Bouw, ramen en renovatie",
        tekst: "Een ramen- en deurenbedrijf bestelt voor elke werf bij veel leveranciers. Onze AI-werknemer legt elke bestelling naast de offerte en houdt per werf een checklist bij van wat besteld is en wat geleverd is.",
        status: "voorstel",
      },
      {
        sector: "Horeca en events",
        tekst: "Een eventlocatie krijgt elke aanvraag binnen in één info-mailbox. We bouwen een AI-werknemer die de mailbox sorteert en de antwoorden klaarzet, een offerte-AI die een richtprijs geeft voor bedrijven, automatische facturatie van het boekingssysteem naar de boekhouding, en een chatbot voor de website.",
        status: "opbouw",
        statusNoot: "De offerte-AI is klaar, de chatbot wordt nagekeken.",
      },
      {
        sector: "Vrije tijd en wellness",
        tekst: "Een wellnesscentrum krijgt een eigen boekingsplatform: online boeken en betalen, een scherm voor de receptie, de planning van de massages, en een AI die vragen van klanten beantwoordt.",
        status: "opbouw",
      },
      {
        sector: "Schoonmaak en facilitaire diensten",
        tekst: "Een schoonmaakbedrijf met een groot aantal locaties bij klanten. Een AI-werknemer haalt de klachten uit twee mailboxen, koppelt elke klacht aan de juiste klant en locatie in hun bedrijfssoftware, en houdt de opvolging bij.",
        status: "piloot",
      },
      {
        sector: "In elke sector",
        tekst: "Binnenkomende bestelmails worden conceptbestellingen in de webshop van een B2B-leverancier.",
        status: "opgeleverd",
      },
    ],
    toolsTitel: "Werkt met wat je al gebruikt:",
    tools: [
      "Teamleader",
      "Odoo",
      "Outlook",
      "Gmail",
      "Excel",
      "Teams",
      "WhatsApp",
      "Google Calendar",
      "Google Drive",
      "HubSpot",
      "Pipedrive",
      "Shopify",
      "WooCommerce",
      "Stripe",
      "Notion",
    ],
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
    knop: "Plan een gratis startgesprek",
  },

  // 9. Veelgestelde vragen
  faq: {
    h2: "Voor je een gesprek boekt, wil je waarschijnlijk eerlijke antwoorden.",
    sub: "Je hebt AI al de mist zien ingaan. Stel dus gerust de moeilijke vragen.",
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
        a: "Omdat het gebruiken en er iets uit halen twee verschillende dingen zijn. ChatGPT kent uit zichzelf je prijzen, je uitzonderingen en je stijl niet. Wij vragen altijd wat er vandaag echt automatisch loopt. Meestal is het antwoord: niets. Een brein geeft ChatGPT die kennis. Zo krijg je dezelfde tool, met een heel ander resultaat.",
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
        a: "Misschien. Is er geen echte nood, dan zeggen we je dat eerlijk, in plaats van je iets te verkopen. Na een halfuur weet je het.",
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
    knop: "Plan een gratis startgesprek",
  },

  // 10. Voor wie is dit
  voorWie: {
    h2: "We zeggen je liever nee dan je tijd te verspillen.",
    sub: "Dit is geen magische knop. Dit is voor wie het werkt, en voor wie niet.",
    niet: {
      titel: "Het is niets voor jou als:",
      items: [
        "Je wil een knop die alles vanzelf doet. Die bestaat niet.",
        "Je wil een snelle oplossing zonder dat het jou of je team tijd kost.",
        "Je wil dat AI je mensen vervangt in plaats van hen te helpen.",
        "Er is vandaag geen echte pijn. In dat geval zeggen we je dat eerlijk.",
      ],
    },
    wel: {
      titel: "Finit Solutions werkt het best voor jou als:",
      items: [
        "Je leidt een klein of middelgroot dienstenbedrijf.",
        "Je team verliest tijd aan mails, offertes, planning en het invullen van het CRM.",
        "Er hangt te veel af van jou of van één sleutelpersoon.",
        "Je wil beginnen delegeren, met een gerust hart.",
        "Je bent bereid om een paar uur uit te leggen hoe je bedrijf echt werkt.",
      ],
    },
    slot: "We gaan diep in op hoe je bedrijf werkt, en dat vraagt wat van je tijd. Net daarom werkt het daarna ook.",
  },

  // 11. Slot en formulier
  slot: {
    h2: "Geen contract, geen druk, gewoon een eerste gesprek.",
    sub: "Ontdek wat er in je hoofd vastzit, voor het je iets kost.",
    kort: "Een halfuur, gratis en vrijblijvend.",
    tekst: "We vragen hoe je bedrijf draait, welke software je gebruikt en waar de tijd naartoe gaat. Daarna zeggen we je eerlijk of we kunnen helpen. Geen contract, geen druk.",
    formulier: {
      naam: "Naam",
      email: "E-mailadres",
      telefoon: "Telefoonnummer",
      website: "Website van je bedrijf",
      bericht: "Waar verlies je de meeste tijd, of wat wil je vragen?",
      knop: "Plan een gratis startgesprek",
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

  footer: {
    video: "Video",
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

  plakbalk: "Plan een gratis startgesprek",
};
