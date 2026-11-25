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
    "Voor zaakvoerders/management van kmo's. Bekijk de video van Alex van Finit en plan een vrijblijvend gesprek. Plus gratis prompts en gidsen uit onze video's.",
  metaTitelResources: "Gratis prompts en gidsen",
  metaBeschrijvingResources:
    "Alle prompts en gidsen uit de video's en posts van Finit op één plek. Laat je e-mailadres achter en open ze meteen.",

  // De smalle strook helemaal bovenaan, naar de resources onderaan.
  strook: { tekst: "Gratis prompts en gidsen?", link: "Hier vind je ze" },
  // Dezelfde strook als iemand via ?reel=C03 komt en er een resource bij die post hoort.
  strookUitPost: { tekst: "De prompts uit de post?", link: "Hier vind je ze" },

  // Hero in vier treden: kop (met accent), haak, lopende tekst, video. Copy van Amina,
  // tab "for VSL page" in de doc Upwork scripts, vertaald 25/11/2026. Geen badge meer:
  // de grootste zin uit de doc is de kop (Alex 25/11), het logo erboven zegt Finit Solutions.
  kop: { voor: "De grootste bouwer van", accent: "company brains in België" },
  // De haak, twee zinnen; op een breed scherm elk op een eigen regel.
  haak: ["Deze video gaat niet echt over AI.", "Hij gaat over wat er in je hoofd zit."],
  sub: "Je prijzen, je uitzonderingen, hoe je omgaat met die ene moeilijke klant. We schrijven het allemaal uit in één week, en dat verandert wat AI voor je kan doen. Bekijk de video en beslis dan zelf of het iets voor jou is.",

  // Eén zin onder de video, boven de knop.
  onderVideo: "We plannen nieuwe projecten maand per maand in. Plan je startgesprek dus nu, dan kom je in aanmerking voor de volgende maand.",
  knop: "Plan een gratis startgesprek",
  knopNoot: "Een halfuur, gratis en vrijblijvend. We zeggen je eerlijk of we je kunnen helpen.",

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
    eindeKnop: "Plan een gratis startgesprek",
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
    titel: "Plan een vrijblijvend gesprek",
    // Boven de eerste vraag: wat er gebeurt. Je kiest zelf geen moment in een agenda;
    // na de laatste vraag nemen wij contact op om er samen een te kiezen.
    uitleg: "Eerst vijf korte vragen. Bij de laatste laat je je gegevens achter, en dan plannen we samen een moment in.",
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
  twijfels: {
    titel: { voor: "Twijfels die we", accent: "vaak horen" },
    intro: "Logisch dat je nog twijfelt. Dit zijn de vragen die we het vaakst krijgen.",
    lijst: [
      {
        vraag: "Ik heb AI al dingen zien verzinnen.",
        antwoord:
          "Een company brain helpt daar al veel bij. En we beginnen altijd met een controlestap: alles wat AI naar een klant stuurt, kijkt eerst een mens na. Stap voor stap krijgt AI meer vrijheid, naargelang jullie ermee comfortabel zijn.",
      },
      {
        vraag: "Ik wil niet dat AI met mijn klanten praat.",
        antwoord: "Helemaal oké, die keuze ligt bij jullie. Wij zetten alles klaar, jij verstuurt.",
      },
      {
        vraag: "Ik heb al software en wil die houden.",
        antwoord:
          "Wij bouwen bovenop jouw software. We koppelen wat nodig is en laten het manuele werk erin grotendeels verdwijnen.",
      },
      {
        vraag: "En wat met mijn gegevens?",
        antwoord:
          "Die staan afgeschermd. We volgen de globale standaarden voor cybersecurity en werken altijd met NDA's en verwerkersovereenkomsten.",
      },
      {
        vraag: "Wat als er een beter model uitkomt?",
        antwoord:
          "Dan heb je geluk. Een company brain is gewoon een map met tekstbestanden. Die steek je in eender welk model.",
      },
      {
        vraag: "Mijn team heeft hier schrik van.",
        antwoord: "Wij praten nooit over mensen ontslaan. Wel over groeien zonder extra mensen aan te werven.",
      },
      {
        vraag: "Ik ben niet technisch en heb geen tijd.",
        antwoord: "Dat hoeft ook niet. We hebben enkele uren van jou nodig en één dag met je medewerkers.",
      },
    ],
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
