/**
 * Alle tekst van /vacatures. Bron: Alex' eigen woorden van 29/10/2026
 * (finit-brein: raw/opnames/2026-10-29-aanwerving-verduidelijkingen-alex.md).
 * Bewust geen loon, uren, voordelen of startdatum: die zijn nog niet beslist.
 * Huisregels: geen gedachtestreepjes, geen uitroeptekens.
 */

export const VAC = {
  metaTitel: "Vacatures",
  metaBeschrijving:
    "Werk mee bij Finit Solutions in Mechelen: content en social media, een stage IT-projectmanagement, of een stage of studentenjob in software development.",
  kruimel: "Vacatures",

  h1: ["Kom bij ons", "werken"],
  intro:
    "Finit Solutions is een start-up met een kantoor in Mechelen. We geven bedrijven een AI-brein: een AI die weet hoe hun bedrijf werkt, en daardoor echt werk kan overnemen. Wij noemen dat een Company Brain.",
  introTwee: "We zoeken drie soorten mensen. Kies wat bij jou past en solliciteer onderaan de pagina.",

  voorWie: "Voor",
  watJeDoet: "Wat je doet",
  pastBijJou: "Dit past bij jou als",
  solliciteer: "Solliciteer",

  vacatures: {
    content: {
      watJeDoet: [
        "Je denkt mee over hoe we ons laten zien op sociale media en over onze marketing.",
        "Je werkt mee aan socialmediacampagnes en korte video's.",
      ],
      pastBijJou: [
        "je graag werkt in een start-up waar veel beweegt",
        "je graag video's maakt met een hoge productiekwaliteit en ervaring hebt met filmmaking",
        "je graag meedenkt over nieuwe videoformats. Dat vinden we het belangrijkst.",
      ],
    },
    projectmanagement: {
      watJeDoet: [
        "Je loopt stage in een start-up.",
        "Je werkt mee aan echte IT-projecten voor klanten, vooral rond AI. De grootste focus ligt op Company Brains.",
      ],
      pastBijJou: [
        "je je stage wil doen in een start-up",
        "je wil meewerken aan echte projecten voor klanten",
      ],
    },
    software: {
      watJeDoet: [
        "Je doet het eigenlijke bouwwerk van onze projecten: jij zet de software in elkaar.",
        "Je werkt aan projecten rond AI, vooral Company Brains.",
      ],
      pastBijJou: [
        "je stagiair of jobstudent bent",
        "je graag software bouwt",
      ],
    },
  } as Record<string, { watJeDoet: string[]; pastBijJou: string[] }>,

  form: {
    titel: ["Stuur je", "sollicitatie"],
    intro: "Vul het formulier in. We lezen elke sollicitatie zelf.",
    vacature: "Voor welke vacature solliciteer je?",
    profiel: "Ik ben een…",
    naam: "Naam",
    email: "E-mailadres",
    telefoon: "Telefoonnummer",
    studierichting: "Wat studeer je?",
    studierichtingHint: "Bijvoorbeeld: Toegepaste informatica",
    studiejaar: "In welk jaar zit je?",
    studiejaarHint: "Bijvoorbeeld: 2de bachelor",
    motivatie: "Waarom wil je bij ons werken?",
    motivatieHint: "Een paar zinnen is genoeg. Heb je eerder werk, zoals video's of een portfolio? Zet de link er gerust bij.",
    toestemming: "Ik ga akkoord dat Finit Solutions mijn gegevens gebruikt om mijn sollicitatie te bekijken. Lees meer in de",
    privacyLink: "privacyverklaring",
    kiesEerst: "Kies eerst voor welke vacature je solliciteert en wat je bent.",
    knop: "Verstuur mijn sollicitatie",
    bezig: "Versturen…",
    bedankt: "Bedankt, je sollicitatie is aangekomen.",
    bedanktSub: "We lezen ze zo snel mogelijk.",
    fout: "Het versturen lukte niet. Probeer het opnieuw of mail ons op {email}.",
  },
};
