/**
 * Tekst van /bronnen/: wie zegt dat elk bedrijf een company brain nodig heeft.
 * Op de hub staat er één kaartje naar (content/resources.json, soort "bronnen").
 *
 * Beslist door Alex op 4/11/2026. Alleen bronnen die we zelf bij de bron
 * nagekeken hebben komen hier. Wat we niet konden bevestigen, staat er niet.
 */

export interface Uitspraak {
  wie: string;
  /** Korte uitleg wie dat is, voor wie de naam niet kent. */
  rol?: string;
  tekst: string;
  url: string;
  /** Naam van de site, voor de link: "Bron: …". */
  site: string;
}

export interface Cijfer {
  cijfer: string;
  tekst: string;
  /** Wie het onderzoek deed, voluit (grijs onder de tekst). */
  bron: string;
  url: string;
  site: string;
}

export const BRONNEN = {
  metaTitel: "Waarom elk bedrijf een company brain nodig heeft",
  metaBeschrijving:
    "Y Combinator, Google, Microsoft en de cijfers erachter: wie zegt dat AI pas werkt als ze je bedrijf kent. Met een link naar elke bron.",

  label: "Bronnen · Finit Solutions",
  titel: "Waarom elk bedrijf een company brain nodig heeft",
  intro:
    "In mijn video's zeg ik het vaak: AI werkt pas goed als ze je bedrijf kent. Ik ben niet de enige die dat zegt. Hier staat wie het nog zegt, met de link erbij.",
  watIsHet:
    "Een company brain is één plek waar staat hoe je bedrijf werkt: je klanten, je werkwijze, je afspraken. Zo geschreven dat AI het kan lezen.",

  // Nagekeken op 4/11/2026 bij de bron zelf. YC: de tekst stond op ycombinator.com/rfs
  // (tab Summer 2026, nagekeken 28/10); die tab staat er niet meer, dus we linken de video.
  wieTitel: "Wie het zegt",
  wie: [
    {
      wie: "Y Combinator",
      rol: "het startupfonds achter Airbnb en Stripe",
      tekst:
        "Zette \"Company Brain\" op zijn lijst van startups die het zoekt (zomer 2026). De grootste rem op AI zijn niet meer de modellen, maar de kennis over hoe je bedrijf werkt.",
      url: "https://www.youtube.com/watch?v=IaWIazkWWog",
      site: "Y Combinator op YouTube",
    },
    {
      wie: "Andrej Karpathy",
      rol: "medeoprichter van OpenAI",
      tekst:
        "Laat AI zelf een wiki met je kennis bijhouden. De kennis wordt één keer samengesteld en daarna actueel gehouden, in plaats van bij elke vraag opnieuw gezocht.",
      url: "https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f",
      site: "GitHub",
    },
    {
      wie: "Google",
      tekst: "Bouwt één agent voor al je werk, die alle context van je bedrijf kent.",
      url: "https://blog.google/innovation-and-ai/infrastructure-and-cloud/google-cloud/gemini-at-work/",
      site: "de blog van Google",
    },
    {
      wie: "Google Cloud",
      tekst:
        "Werkt aan een open formaat om kennis op te slaan, zodat zowel mensen als AI-agents ze kunnen lezen: gewoon een map met tekstbestanden.",
      url: "https://github.com/GoogleCloudPlatform/open-knowledge-format",
      site: "GitHub",
    },
    {
      wie: "Satya Nadella",
      rol: "CEO van Microsoft",
      tekst:
        "Bedrijven die voor alles op één AI vertrouwen, overleven het misschien niet. Hou de context en het geheugen van je bedrijf los van het model.",
      url: "https://techcrunch.com/2026/07/27/satya-nadella-says-companies-that-trust-one-ai-for-everything-may-not-survive/",
      site: "TechCrunch",
    },
    {
      wie: "Notion",
      tekst:
        "Goede prompts zitten vaak in één hoofd, of verdwijnen in losse documenten en chats. Daarom bouwde Notion skills: vaste instructies die AI leren hoe je team werkt.",
      url: "https://www.notion.com/releases/2026-09-15",
      site: "Notion",
    },
    {
      wie: "Anthropic",
      rol: "de maker van Claude",
      tekst:
        "AI heeft een beperkt \"aandachtsbudget\": elk woord dat je erin stopt, kost daarvan. Geef AI dus zo weinig mogelijk, maar wel de kennis die ertoe doet.",
      url: "https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents",
      site: "Anthropic",
    },
  ] as Uitspraak[],

  cijfersTitel: "De cijfers",
  cijfers: [
    {
      cijfer: "34%",
      tekst:
        "Maar 34% van de AI-agentprojecten haalt de werkvloer. Ontbrekende kennis is een van de grote redenen.",
      bron: "Onderzoek van MIT Technology Review Insights, gesponsord door Neo4j (2026)",
      url: "https://www.technologyreview.com/2026/10/05/1145580/connecting-ai-agents-to-enterprise-knowledge/",
      site: "MIT Technology Review",
    },
    {
      cijfer: "72%",
      tekst:
        "72% van de techbeslissers zegt: als hun AI-projecten tekortschieten, ligt dat bijna altijd aan een slechte basis van data.",
      bron: "Enquête van The Harris Poll voor Collibra, bij 306 beslissers (directeur of hoger) in de VS (2026)",
      url: "https://www.collibra.com/company/newsroom/press-releases/new-survey-from-collibra-by-the-harris-poll-finds-72-of-tech-decision-makers-feel-ai-initiatives",
      site: "Collibra",
    },
    {
      cijfer: "18",
      tekst:
        "AI-modellen getest, waaronder GPT-4.1 en Claude 4. Bij elk model gingen de prestaties achteruit naarmate het meer tekst kreeg.",
      bron: "Onderzoek \"Context Rot\" van Chroma (juli 2025)",
      url: "https://www.trychroma.com/research/context-rot",
      site: "Chroma",
    },
  ] as Cijfer[],

  bron: "Bron:",

  ctaLabel: "Zelf beginnen?",
  ctaTekst: "Bouw het brein van je bedrijf zelf met onze lesreeks, of laat het ons doen.",
  ctaZelf: "Start met de lesreeks",
  ctaLaten: "Plan een call met Karel",
  terug: "Alle gidsen en prompts",
};
