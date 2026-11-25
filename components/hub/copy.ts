/**
 * ALLE tekst van de hub (finitsolutions.be/hub/), de enige link op al onze
 * reels en posts. Voorlopige copy van 20/11/2026, naar het model van de
 * applypagina van Shadowboys (zie docs/hub-analyse-shadowboys.md). Amina
 * herschrijft ze: alleen dit bestand aanpassen, de pagina volgt vanzelf.
 *
 * Regels: niets verzinnen. Elke claim komt uit Alex' VSL of staat al op de
 * site (meer dan 25 analysetrajecten, één week om je bedrijf in kaart te
 * brengen, enkele uren van jou en één dag met je team, vrijblijvend gesprek).
 * Geen gedachtestreepjes, geen uitroeptekens, geen hype.
 *
 * Een woord tussen ** ** in een vraag van het formulier wordt vet.
 */

export const HUB = {
  metaTitel: "Laat AI werken zoals jouw bedrijf werkt",
  metaBeschrijving:
    "Voor zaakvoerders/management van kmo's. Bekijk de video van Alex van Finit en boek een conversatie. Plus gratis prompts en gidsen uit onze video's.",
  metaTitelResources: "Gratis prompts en gidsen",
  metaBeschrijvingResources:
    "Alle prompts en gidsen uit de video's en posts van Finit op één plek. Laat je e-mailadres achter en open ze meteen.",

  // De smalle strook helemaal bovenaan, naar de resources onderaan.
  strook: { tekst: "Gratis prompts en gidsen?", link: "Hier vind je ze" },
  // Dezelfde strook als iemand via ?reel=C03 komt en er een resource bij die post hoort.
  strookUitPost: { tekst: "De prompts uit de post?", link: "Hier vind je ze" },

  // Hero (Alex 25/11, op basis van Amina's tab "for VSL page"): de grootste zin is de kop,
  // met "company brain" als accent (vaste spatie: blijft samen op één regel). Daaronder de
  // haak, de lopende tekst in twee regels en een losse zin die naar de video leidt.
  kop: { voor: "De eerste", accent: "company\u00A0brain", na: "bouwers in België" },
  haak: "Deze video gaat niet echt over AI, hij gaat over wat er in je hoofd zit.",
  // Twee regels; een woord tussen ** ** wordt vet (Alex' klemtoon op "bedrijf").
  sub: ["Je werkprocedures, regels, uitzonderingen, …", "We schrijven het allemaal uit in één week, en dat verandert wat AI voor je **bedrijf** kan doen."],
  naarVideo: "Bekijk deze video om te weten of het iets voor jou is.",

  // Vlak onder de video (Alex 25/11): wie ons steunt, met hun logo's uit /public.
  steun: {
    label: "Ondersteund door",
    logos: [
      { id: "vlaio", src: "/VLAIO_sponsorlogo-antraciet.png", alt: "VLAIO", breed: 911, hoog: 355 },
      { id: "kbc", src: "/SI @KBC Black (2).png", alt: "Start it @KBC", breed: 700, hoog: 142 },
      { id: "elevenlabs", src: "/elevenlabs-grants.webp", alt: "ElevenLabs Grants", breed: 1496, hoog: 132 },
    ],
  },

  // Eén zin onder de video, boven de knop.
  onderVideo: "We plannen nieuwe projecten per maand in. Wil je er volgende maand bij zijn? Boek dan nu een conversatie.",
  // De knop voor een gesprek heet overal op de site zo (Alex 25/11).
  knop: "Boek een conversatie",
  knopNoot: "60 minuten, gratis. Erna zeggen we je eerlijk of we je kunnen helpen.",

  // De speler.
  speler: {
    label: "Video: hoe AI werkt zoals jouw bedrijf werkt",
    afspelen: "Speel de video af",
    pauze: "Pauzeer de video",
    verder: "Speel verder",
    verderVraag: "Wil je verder kijken?",
    verderKnop: "Verder kijken",
    opnieuwKnop: "Opnieuw beginnen",
    eindeVraag: "Herken je je bedrijf hierin?",
    eindeKnop: "Boek een conversatie",
    eindeOpnieuw: "Bekijk opnieuw",
    fout: "De video laadt niet. Herlaad de pagina of probeer het later opnieuw.",
    kwaliteit: "Kwaliteit van de video",
    kwaliteitAuto: "Auto",
    ondertitelsAan: "Ondertitels aanzetten",
    ondertitelsUit: "Ondertitels uitzetten",
    volScherm: "Volledig scherm",
    volSchermUit: "Volledig scherm sluiten",
  },

  // Het formulier, vraag per vraag. Verzendt via het bestaande contactformulier
  // (/api/contact-submit); de antwoorden op de keuzevragen gaan mee in het bericht.
  formulier: {
    titel: "Boek een conversatie",
    // Boven de eerste vraag: wat er gebeurt. Je kiest zelf geen moment in een agenda;
    // na de laatste vraag nemen wij contact op om er samen een te kiezen.
    uitleg: "Eerst vijf korte vragen. Bij de laatste laat je je gegevens achter, en dan nemen we binnen de 24 uur contact met je op.",
    terug: "Terug",
    volgende: "Volgende",
    stapVan: "Vraag {nu} van {totaal}",
    vragen: [
      {
        id: "rol",
        soort: "keuze",
        vraag: "Wat is je **rol in het bedrijf?**",
        label: "Rol",
        opties: ["Zaakvoerder of eigenaar", "Management", "Medewerker", "Iets anders"],
      },
      {
        id: "grootte",
        soort: "keuze",
        vraag: "Met hoeveel mensen **werken jullie?**",
        label: "Aantal mensen",
        opties: ["1 tot 9", "10 tot 49", "50 tot 249", "250 of meer"],
      },
      {
        id: "tijd",
        soort: "keuze",
        vraag: "Waar gaat **de meeste tijd** naartoe?",
        label: "Meeste tijd",
        opties: [
          "Mails beantwoorden",
          "Offertes maken",
          "Gegevens overtypen tussen systemen",
          "Informatie opzoeken die maar één iemand weet",
          "Iets anders",
        ],
      },
      {
        id: "bericht",
        soort: "tekst",
        vraag: "Wat wil je **als eerste oplossen?**",
        hint: "Eén of twee zinnen is genoeg.",
        placeholder: "Bijvoorbeeld: we verliezen veel tijd aan offertes en werken met Teamleader.",
      },
      {
        id: "gegevens",
        soort: "gegevens",
        vraag: "Waar mogen we je **bereiken?**",
        sub: "We nemen contact met je op om een eerste gesprek in te plannen.",
      },
    ],
    velden: {
      naam: "Naam",
      email: "E-mailadres",
      telefoon: "Telefoonnummer",
      website: "Website van je bedrijf",
      websiteHint: "jouwbedrijf.be",
      optioneel: "(optioneel)",
    },
    // Meldingen bij de velden als er iets ontbreekt of niet klopt (naam, e-mail en telefoon zijn verplicht).
    meldingen: {
      naam: "Vul je naam in.",
      emailLeeg: "Vul je e-mailadres in.",
      email: "Dit e-mailadres klopt niet. Kijk het even na.",
      telefoonLeeg: "Vul je telefoonnummer in.",
      telefoon: "Dit telefoonnummer klopt niet. Bijvoorbeeld 0470 12 34 56 of +32 470 12 34 56.",
    },
    verstuur: "Vraag het gesprek aan",
    bezig: "Versturen…",
    privacy: "We gebruiken je gegevens alleen om je te contacteren.",
    privacyLink: "Privacyverklaring",
    fout: "Het versturen lukte niet. Probeer het opnieuw of mail ons op {email}.",
    bedankt: "Bedankt{naam}. We nemen contact met je op om een eerste gesprek in te plannen.",
    bedanktSub: "Kunnen we je niet helpen, dan zeggen we dat ook eerlijk.",
    // Kop boven de antwoorden in de mail en op monday.
    berichtKop: "Antwoorden uit het formulier op de hub:",
    // Gaat mee in het bericht naar contact@, monday en Tuesday (uit de kijkmeting van dit bezoek).
    vslGekeken: "VSL bekeken tot {procent} %",
    vslNiet: "VSL niet bekeken in dit bezoek",
  },

  // De twijfels die Alex in de video beantwoordt. Ze gaan uit de video en staan hier.
  // De veelgestelde vragen van de nieuwe homepage (copy van Amina, branch homepage-amina),
  // op de hub sinds 25/11 (Alex). De eerste `zichtbaar` staan er meteen; de rest komt na
  // de knop "Toon nog X vragen". "Na een halfuur" werd "na een uur": het gesprek duurt 60 minuten.
  twijfels: {
    titel: { voor: "Voor je een conversatie boekt, wil je waarschijnlijk", accent: "eerlijke antwoorden." },
    intro: "Je hebt AI al de mist zien ingaan. Dit zijn de vragen die we het vaakst horen.",
    zichtbaar: 5,
    meer: "Toon nog {aantal} vragen",
    lijst: [
      {
        vraag: "Wat kost het?",
        antwoord:
          "Elk onderdeel krijgt een eigen offerte. Zo zie je de kost voor je beslist, en laat je weg wat je niet nodig hebt. We brengen eerst in kaart wat je huidige manier van werken je kost, en daarna wat wij zouden veranderen. Het eerste gesprek is gratis, en dat geldt voor elk gesprek tot je iets tekent.",
      },
      {
        vraag: "Kan AI dit echt? Ik heb het al dingen zien verzinnen.",
        antwoord:
          "Wij ook, en een company brain lost dat probleem al grotendeels op. Maar voor de zekerheid begint alles in conceptmodus: AI bereidt het werk voor, een mens keurt het goed. Twijfelgevallen gaan naar een mens, en wat AI zelf mag doen, breiden we alleen stap voor stap uit. We tonen je eerst een demo, want het zelf zien is beter dan het geloven.",
      },
      {
        vraag: "We gebruiken ChatGPT al. Waarom hebben we dit dan nodig?",
        antwoord:
          "Omdat het gebruiken en er iets uit halen twee verschillende dingen zijn. ChatGPT kent uit zichzelf je prijzen, je uitzonderingen en je stijl niet. Wij vragen altijd wat er vandaag echt automatisch loopt. Meestal is het antwoord: niets. Een brein geeft ChatGPT die kennis. Zo krijg je dezelfde tool, met een heel ander resultaat.",
      },
      {
        vraag: "Is dit over twee maanden niet alweer verouderd?",
        antwoord:
          "Het brein is gewone tekst, en het is van jou. Elk model kan het lezen, vandaag en later. Komt er een beter model uit, dan sluit je dat gewoon aan. Je zit niet vast aan één tool.",
      },
      {
        vraag: "Het is een drukke periode. Kan dit wachten?",
        antwoord:
          "Dat kan. Maar AI negeren kost je misschien meer dan er iets aan doen. Een drukke periode is meestal net het teken dat je het het hardst nodig hebt. Wij beginnen liever voor de druk nog groter wordt.",
      },
      {
        vraag: "Wat met mijn medewerkers?",
        antwoord:
          "Wij praten over groeien zonder dat je evenveel extra mensen moet aanwerven, nooit over mensen ontslaan. We interviewen je team tijdens de breinweek, zodat hun kennis mee in het brein zit, en we leiden hen ter plaatse op.",
      },
      {
        vraag: "Wat met mijn gegevens?",
        antwoord:
          "Bij elk project horen een geheimhoudingsovereenkomst (NDA) en een verwerkersovereenkomst, en meestal komt er ook een serviceovereenkomst bij. Alles wordt in Europa gehost, en je gegevens blijven gescheiden van die van andere klanten. De AI-verwerking door Anthropic loopt via de Verenigde Staten, en daar kunnen we niet omheen. Daarom staat elke subverwerker in onze verwerkersovereenkomst.",
      },
      {
        vraag: "Gaat AI met mijn klanten praten?",
        antwoord:
          "Alleen als jij dat wil. Standaard bereidt AI het werk voor en verstuur jij. Alleen kleine, standaard dingen vertrekken automatisch. Een belangrijke offerte mag nooit de deur uit zonder dat er een mens naar gekeken heeft.",
      },
      {
        vraag: "We hebben al software die werkt. Moeten we die vervangen?",
        antwoord:
          "Nee. We bouwen bovenop wat je hebt en koppelen het aan elkaar. We stellen alleen voor om iets te vervangen als dat echt zinvol is, en dan leggen we uit waarom.",
      },
      {
        vraag: "Ik ben niet technisch.",
        antwoord:
          "Dat hoeft ook niet. Je hoeft alleen over je bedrijf te vertellen.",
      },
      {
        vraag: "We zijn hier te klein voor.",
        antwoord:
          "Misschien. Is er geen echte nood, dan zeggen we je dat eerlijk, in plaats van je iets te verkopen. Na een uur weet je het.",
      },
      {
        vraag: "Ik heb hier geen tijd voor.",
        antwoord:
          "We vragen twee uur van jou en één dag met je team. De rest van de breinweek is voor ons.",
      },
      {
        vraag: "Kan ik een bedrijf zoals jullie vertrouwen?",
        antwoord:
          "Je systemen draaien zelfstandig, en de overdracht staat in het contract. Vraag ons gerust naar referenties tijdens het gesprek.",
      },
      {
        vraag: "Wat als Finit stopt?",
        antwoord:
          "Je systemen blijven draaien. Mochten we ooit stoppen, dan laten we je dat ruim op voorhand weten en starten we een overdracht: alle toegangen, de hosting en de abonnementen gaan naar jou of naar een IT-partner van jouw keuze, zonder kosten.",
      },
    ],
  },

  // Voor wie wel en niet (Alex 25/11), boven de vragen; tekst van de nieuwe homepage, met
  // Alex' aanpassingen van 25/11 (geen intro en geen slotzin, twee punten herschreven).
  voorWie: {
    titel: { voor: "We zeggen je liever nee dan", accent: "je tijd te verspillen." },
    wel: {
      titel: "Dit is voor jou als:",
      items: [
        "Je leidt een klein of middelgroot dienstenbedrijf.",
        "Je wil groeien zonder extra mankracht te hoeven aanwerven.",
        "Je team verliest tijd aan mails, offertes, planning en het invullen van het CRM.",
        "Er hangt te veel af van jou of van één sleutelpersoon.",
        "Je wil beginnen delegeren aan AI, met een gerust hart.",
      ],
    },
    niet: {
      titel: "Dit is niet voor jou als:",
      items: [
        "Je wil een knop die alles vanzelf doet. Die bestaat niet.",
        "Je wil een snelle oplossing zonder dat het jou of je team tijd kost.",
        "Er is vandaag geen echte pijn. In dat geval zeggen we je dat eerlijk.",
      ],
    },
  },

  // De gratis resources onderaan, achter een e-mailadres.
  resources: {
    titel: { voor: "Gratis prompts en", accent: "gidsen" },
    intro: "Alles wat ik beloof in mijn video's en posts. De nieuwste staat bovenaan.",
    leeg: "Hier komen binnenkort de prompts en gidsen uit mijn video's.",
    filterLabel: "Toon",
    filterAlles: "Alles",
    uitPost: "Uit de post die je net zag",
    openKnop: {
      gids: "Open de gids",
      prompt: "Open de prompt",
      pakket: "Open het pakket",
      bronnen: "Bekijk de bronnen",
      standaard: "Bekijken",
    } as Record<string, string>,
  },

  // Het slot op de resources. Eerlijk zeggen wat je krijgt en wat we met je adres doen.
  // Ook op elke promptpagina (/prompts/…): daar met titelPrompt en tekstPrompt.
  slot: {
    titel: "Laat je e-mailadres achter en open alles",
    tekst: "Je krijgt meteen toegang tot alle {aantal} prompts en gidsen hieronder. Op dit toestel blijven ze daarna open.",
    titelPrompt: "Laat je e-mailadres achter en open de prompts",
    tekstPrompt:
      "Je krijgt meteen de prompts van deze pagina, plus alle andere prompts en gidsen op de hub. Op dit toestel blijven ze daarna open.",
    email: "E-mailadres",
    emailHint: "naam@bedrijf.be",
    // Het vinkje (standaard uit, beslissing 20/11: een vooraf aangevinkt vakje is geen geldige toestemming).
    // "Hooguit twee per maand" is een belofte: pas aan als het ritme anders wordt.
    mailsKop: "Ja, hou me op de hoogte.",
    mails: "Af en toe een mail met AI-nieuwtjes en tips waar je bedrijf echt iets aan heeft. Hooguit twee per maand. Afmelden kan altijd, met één klik.",
    knop: "Open de prompts en gidsen",
    bezig: "Even geduld…",
    privacy:
      "Zonder vinkje gebruiken we je adres alleen om de prompts en gidsen voor je te openen: je krijgt dan geen mails. We geven je adres aan niemand door.",
    privacyLink: "Privacyverklaring",
    fout: "Dat e-mailadres lijkt niet te kloppen. Kijk het even na.",
  },

  footer: { vacatures: "Vacatures", privacy: "Privacy" },
};

/** "Wat is je **rol**?" → stukken tekst met een vlag voor vet. */
export function vetStukken(zin: string): Array<{ tekst: string; vet: boolean }> {
  return zin.split("**").map((tekst, i) => ({ tekst, vet: i % 2 === 1 })).filter((s) => s.tekst);
}
