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

  // Uitgebreid op 29/10 op vraag van Alex. Wat een project inhoudt komt uit de processen in
  // finit-brein (analyse, bouw) en het bedrijfsoverzicht van 28/10. Teamleden zonder naam,
  // behalve Alex: hij staat zelf in de video's.
  vacatures: {
    content: {
      pitch:
        "We laten op sociale media zien wat AI doet voor gewone bedrijven. Jij helpt die verhalen in beeld brengen, met video's waar mensen voor blijven kijken.",
      watJeDoet: [
        "Je werkt mee aan onze korte video's voor TikTok, Instagram, YouTube en LinkedIn.",
        "Je denkt mee over nieuwe videoformats en over hoe we ons laten zien op sociale media.",
        "Je werkt mee aan campagnes rond onze gratis gidsen en prompts en onze lesreeks.",
        "Je werkt rechtstreeks samen met Alex, die onze marketing doet en zelf in de video's staat.",
      ],
      pastBijJou: [
        "je graag werkt in een start-up waar veel beweegt",
        "je graag video's maakt met een hoge productiekwaliteit en ervaring hebt met filmmaking",
        "je graag meedenkt over nieuwe videoformats. Dat vinden we het belangrijkst.",
      ],
    },
    projectmanagement: {
      pitch:
        "Je ziet van dichtbij hoe een bedrijf zijn eigen AI-brein krijgt: van het eerste gesprek bij de klant tot de oplossing die er elke dag draait.",
      watJeDoet: [
        "Je werkt mee aan echte IT-projecten voor klanten, vooral rond AI. De grootste focus ligt op Company Brains.",
        "Je helpt bij de analyse van een bedrijf: gesprekken met de zaakvoerder en interviews met het team, bij de klant zelf.",
        "Je helpt het advies uitwerken: welke taken AI kan overnemen, in welke volgorde, en wat dat oplevert.",
        "Tijdens de bouw zet je de taken voor de ontwikkelaar klaar en test je elke oplossing alsof je zelf de klant bent.",
        "Je werkt samen met onze projectmanager, die de klanten begeleidt, en met onze CTO, die de oplossingen bouwt.",
      ],
      pastBijJou: [
        "je je stage wil doen in een start-up",
        "je wil meewerken aan echte projecten voor klanten",
      ],
    },
    software: {
      pitch:
        "Jij bouwt mee wat onze klanten elke dag gebruiken: AI die mails sorteert, offertes voorbereidt of vragen van klanten beantwoordt.",
      watJeDoet: [
        "Je doet het eigenlijke bouwwerk van onze projecten: jij zet de software in elkaar.",
        "Je bouwt agents en workflows bovenop het Company Brain van een klant.",
        "Je werkt met Claude Code en de API van Anthropic, net als de rest van het team. Elke klant krijgt een eigen server.",
        "Je werkt samen met onze CTO, die de technische kant leidt.",
      ],
      pastBijJou: [
        "je stagiair of jobstudent bent",
        "je graag software bouwt",
      ],
    },
  } as Record<string, { pitch: string; watJeDoet: string[]; pastBijJou: string[] }>,

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
    // Vervangt "Waarom wil je bij ons werken?" (Alex, 30/10): wat we willen horen om iemand
    // uit te nodigen voor de eerste interviewronde. {instagram} en {tiktok} worden links.
    vertel: {
      titel: "Vertel ons over jezelf",
      intro: "Om in aanmerking te komen voor de eerste interviewronde, horen we graag:",
      ervaring: "wat je ervaring is: je opleiding, jobs, projecten of dingen die je zelf maakte",
      perVacature: {
        content: [
          "wat je vindt van onze huidige video's op {instagram} en {tiktok}. Wat zou jij veranderen of toevoegen? Heb je ideeën voor nieuwe formats?",
        ],
        projectmanagement: [
          "iets dat jij organiseerde of in goede banen leidde, op school, in een job of in een vereniging, en hoe je dat aanpakte",
          "wat je tijdens je stage wil leren",
        ],
        software: [
          "wat je al bouwde, en met welke talen of tools",
          "of je al met AI werkte, bijvoorbeeld met Claude, ChatGPT of een API, en wat je ermee deed",
        ],
      } as Record<string, string[]>,
      portfolio: "of je een portfolio of eerder werk hebt om te tonen. Sleep het in het vak hieronder of plak een link.",
      start: "wanneer je kan starten en hoeveel tijd je per week hebt",
      kiesEerst: "Kies hierboven een vacature, dan zie je wat we voor die job graag horen.",
      hint: "Neem gerust de tijd. Hoe meer we over je weten, hoe beter we je kunnen inschatten.",
    },
    bestanden: {
      titel: "Portfolio of eerder werk",
      nietVerplicht: "niet verplicht",
      vak: "Sleep je bestanden hierheen of klik om ze te kiezen",
      regels: "Pdf, Word, PowerPoint, afbeeldingen of korte video's. Samen maximaal 4 MB.",
      verwijder: "Verwijder",
      teGroot: "Samen mag het maximaal 4 MB zijn. Zet grote video's op YouTube, Google Drive of WeTransfer en plak de link hieronder.",
      teVeel: "Je kan maximaal 5 bestanden toevoegen.",
      verkeerdType: "Dit soort bestand kunnen we niet ontvangen: {naam}",
      link: "Of plak een link naar je werk",
      linkHint: "Bijvoorbeeld Instagram, YouTube, GitHub, Google Drive of WeTransfer",
    },
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
