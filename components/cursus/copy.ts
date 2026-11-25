/**
 * ALLE tekst van /cursus/: de landingspagina van de cursus op Skool (nieuw
 * aanbod van 24/11/2026: zelfde lessen, plus een promptbibliotheek en een
 * supportcall). Zelfde opbouw als de hub (components/hub/copy.ts); de pagina
 * volgt vanzelf als je hier iets aanpast.
 *
 * Regels: niets verzinnen. Elke claim komt uit de VSL van de cursus, de
 * Skool-pagina of het aanbod van 24/11 (21 korte lessen, 2,5 uur, de startmap,
 * Claude Code en ChatGPT Codex, een tiental uur, een laptop en een abonnement
 * van minstens €20 per maand, meer dan 25 analysetrajecten). Geen
 * gedachtestreepjes, geen uitroeptekens, geen hype. Finit is een AI-bureau.
 *
 * Een woord tussen ** ** in een vraag van het formulier wordt vet.
 */

export const CURSUS = {
  metaTitel: "Bouw zelf het brein van jouw bedrijf",
  metaBeschrijving:
    "De cursus van Finit voor zaakvoerders: 21 korte lessen, je startmap, een promptbibliotheek en een supportcall. Bekijk de video en schrijf je in.",

  // De smalle strook helemaal bovenaan, naar "Wat je krijgt".
  strook: { tekst: "Nieuw: nu met een promptbibliotheek en een supportcall.", link: "Bekijk wat je krijgt" },

  badge: "Voor zaakvoerders die het zelf willen doen",
  kop: { voor: "Bouw zelf het brein van", accent: "jouw bedrijf" },
  sub: "In 21 korte lessen schrijf je uit hoe jouw bedrijf werkt, zodat elke AI dat eerst kan lezen. Jouw AI stelt de vragen, jij vertelt. Geen code.",

  pillen: ["Geen technische kennis nodig", "Een paar avonden van jouw tijd"],
  knop: "Inschrijven",
  knopNoot: "Vul dit formulier in om je in te schrijven. Duurt 60 seconden.",

  speler: {
    label: "Video: bouw zelf het brein van jouw bedrijf",
    afspelen: "Speel de video af",
    pauze: "Pauzeer de video",
    verder: "Speel verder",
    verderVraag: "Wil je verder kijken?",
    verderKnop: "Verder kijken",
    opnieuwKnop: "Opnieuw beginnen",
    eindeVraag: "Wil je dit voor jouw bedrijf?",
    eindeKnop: "Inschrijven",
    eindeOpnieuw: "Bekijk opnieuw",
    fout: "De video laadt niet. Herlaad de pagina of probeer het later opnieuw.",
    kwaliteit: "Kwaliteit van de video",
    kwaliteitAuto: "Auto",
    ondertitelsAan: "Ondertitels aanzetten",
    ondertitelsUit: "Ondertitels uitzetten",
    volScherm: "Volledig scherm",
    volSchermUit: "Volledig scherm sluiten",
  },

  // Het formulier, vraag per vraag. Verzendt naar /api/cursus-aanvraag (Tuesday, groep
  // "Cursus (Skool)" op het bord Leads › Socials, plus een mail naar contact@).
  formulier: {
    titel: "Inschrijven",
    uitleg: "Eerst vijf korte vragen. Bij de laatste laat je je gegevens achter.",
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
        id: "ai",
        soort: "keuze",
        vraag: "Gebruik je **ChatGPT of Claude** al?",
        label: "AI vandaag",
        opties: ["Ja, met een betaald abonnement", "Ja, de gratis versie", "Nog niet"],
      },
      {
        id: "bericht",
        soort: "tekst",
        vraag: "Wat wil je dat AI **als eerste** voor je doet?",
        label: "Als eerste",
        hint: "Eén of twee zinnen is genoeg.",
        placeholder: "Bijvoorbeeld: offertes maken met onze prijzen, of mails beantwoorden in onze stijl.",
      },
      {
        id: "gegevens",
        soort: "gegevens",
        vraag: "Waar mogen we je **bereiken?**",
        sub: "We bellen je om je inschrijving rond te maken.",
      },
    ],
    velden: {
      naam: "Naam",
      email: "E-mailadres",
      telefoon: "Telefoonnummer",
      website: "Website van je bedrijf",
      websiteHint: "jouwbedrijf.be",
    },
    // Alle vier verplicht (Alex, 25/11).
    meldingen: {
      naam: "Vul je naam in.",
      emailLeeg: "Vul je e-mailadres in.",
      email: "Dit e-mailadres klopt niet. Kijk het even na.",
      telefoonLeeg: "Vul je telefoonnummer in.",
      telefoon: "Dit telefoonnummer klopt niet. Bijvoorbeeld 0470 12 34 56 of +32 470 12 34 56.",
      websiteLeeg: "Vul de website van je bedrijf in.",
      website: "Deze website klopt niet. Bijvoorbeeld jouwbedrijf.be.",
    },
    verstuur: "Inschrijven",
    bezig: "Versturen…",
    privacy: "We gebruiken je gegevens alleen om je te contacteren.",
    privacyLink: "Privacyverklaring",
    fout: "Het versturen lukte niet. Probeer het opnieuw of mail ons op {email}.",
    bedankt: "Bedankt{naam}. We bellen je om je inschrijving rond te maken.",
    bedanktSub: "Is de cursus niets voor jou, dan zeggen we dat ook eerlijk.",
    // Gaat mee in de mail naar contact@.
    vslGekeken: "VSL bekeken tot {procent} %",
    vslNiet: "VSL niet bekeken in dit bezoek",
  },

  // Wat er in de cursus zit: de lessen zoals op Skool, plus wat er sinds 24/11 bij komt.
  inhoud: {
    titel: { voor: "Wat je", accent: "krijgt" },
    intro: "Dezelfde lessen als op Skool, met twee dingen erbij.",
    nieuw: "Nieuw",
    lijst: [
      {
        titel: "21 korte lessen",
        tekst: "In mensentaal, samen 2,5 uur. Je volgt ons framework stap voor stap, onderwerp per onderwerp.",
        nieuw: false,
      },
      {
        titel: "Je startmap",
        tekst: "De structuur, de instructies en de controles staan er al in. Jouw AI weet zelf hoe hij je brein bouwt. Werkt met Claude Code en ChatGPT Codex.",
        nieuw: false,
      },
      {
        titel: "De promptbibliotheek",
        tekst: "Je brein staat. En dan? Prompts voor wat je er daarna elke dag mee doet, met jouw prijzen, jouw processen en in jouw stijl.",
        nieuw: true,
      },
      {
        titel: "Een supportcall",
        tekst: "Loop je ergens vast, dan plan je een call met ons team en zoeken we het samen uit.",
        nieuw: true,
      },
    ],
    eindeTitel: "Op het einde heb je twee dingen",
    einde: [
      "Een inventaris van je hele bedrijf, met enkel correcte informatie. Elke AI kan die raadplegen om te werken als een echte werknemer, ook de modellen van over vijf jaar.",
      "Een lijst van wat AI in jouw bedrijf kan overnemen, op volgorde van prioriteit: welke AI-agents je eerst bouwt en hoeveel tijd en geld ze je besparen.",
    ],
  },

  // De twijfels die Alex in de video beantwoordt.
  twijfels: {
    titel: { voor: "Twijfels die we", accent: "vaak horen" },
    intro: "Logisch dat je nog twijfelt. Dit zijn de vragen die we het vaakst krijgen.",
    lijst: [
      {
        vraag: "Ik ben niet technisch.",
        antwoord:
          "Dat hoeft ook niet. Al het technische werk staat klaar in je startmap. Jij vertelt over je bedrijf, alsof je het aan een collega uitlegt, en jouw AI schrijft het uit.",
      },
      {
        vraag: "Hoeveel tijd kost het?",
        antwoord: "Reken op een tiental uur, gespreid over een paar avonden. De lessen zelf duren samen 2,5 uur.",
      },
      {
        vraag: "Wat heb ik nodig?",
        antwoord:
          "Een laptop, Mac of Windows, en een betaald abonnement op Claude of ChatGPT van minstens €20 per maand. Raak je soms je limiet, dan wacht je even of ga je tijdelijk een plan hoger.",
      },
      {
        vraag: "Waarom zou ik dat zelf doen?",
        antwoord:
          "Omdat jij je bedrijf het best kent. Een consultant die een week over de vloer komt, kost al snel duizenden euro's, en gaat er nooit zo diep in als jij.",
      },
      {
        vraag: "Is dit een snelle fix?",
        antwoord:
          "Nee. Je gaat in detail vertellen over je bedrijf: wat je verkoopt, hoe je werkt, welke software je gebruikt en hoe. Een knop die alles vanzelf doet, bestaat niet.",
      },
      {
        vraag: "Wat als er een beter model uitkomt?",
        antwoord: "Dan heb je geluk. Je brein is gewoon een map met tekstbestanden. Die steek je in eender welk model.",
      },
      {
        vraag: "En als ik klaar ben?",
        antwoord:
          "Dan werk je zelf verder met de promptbibliotheek. Of je geeft je brein en je plannen aan een programmeur, aan ons of aan iemand anders. Die kent jouw bedrijf dan meteen.",
      },
    ],
  },

  footer: { privacy: "Privacy" },
};
