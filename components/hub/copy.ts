/**
 * Alle tekst van de resource hub (de link in bio op alle socials, beslissing
 * van Alex op 28/10/2026). Tweede versie, zelfde dag: Alex wou bovenaan
 * duidelijke knoppen ("zoek je gidsen of prompts?"), tekst bijna in
 * kindertaal, en "Zelf bouwen" / "Laat het ons doen" als grote titels met
 * erbij voor wie het is.
 *
 * Volgorde: de vraag met drie knoppen, de video, de twee keuzes, de gratis
 * resources. De prijs van de analyse staat hier bewust niet: Karel noemt die
 * in de call. De resources zelf staan in content/resources.json.
 */

export const HUB = {
  metaTitel: "Gratis gidsen, prompts en de lesreeks",
  metaBeschrijving:
    "Alle gidsen en prompts uit de video's van Alex van Finit op één plek. Bouw het brein van je bedrijf zelf met de lesreeks, of laat het ons doen.",

  // Bovenaan: de vraag en drie knoppen die naar de juiste plek springen.
  titel: ["Waar ben je naar op", "zoek?"],
  intro: "Tik op wat bij jou past.",
  menu: [
    { doel: "resources", titel: "Gratis gidsen of prompts", tekst: "Alles uit mijn video's" },
    { doel: "zelf", titel: "Ik wil zelf een Company Brain bouwen", tekst: "Met onze lesreeks" },
    { doel: "laten", titel: "Ik wil professionele hulp om AI in mijn bedrijf te brengen", tekst: "Plan een call met Karel" },
  ],
  // Kleine regel onder de drie knoppen, voor wie via de vacaturevideo komt.
  vacatures: { tekst: "We zoeken mensen.", link: "Bekijk de vacatures" },

  videoTitel: ["Wat is een Company Brain en waarom heeft elk bedrijf het", "nodig?"],
  // Het middelste stuk is een link naar de twee keuzes eronder.
  videoIntro: ["Bekijk deze video om een", "keuze", "te kunnen maken."],
  vslTitel: "Video: waarom AI je bedrijf moet kennen",
  vslAfspelen: "Speel de video af",

  keuzeTitel: ["Zelf doen of laten", "doen?"],
  keuzeIntro: "Allebei brengen ze je naar hetzelfde doel: een AI die je bedrijf echt kent.",
  kiesDitAls: "Kies dit als",
  zelf: {
    titel: "Zelf bouwen",
    sub: "Met onze lesreeks op Skool",
    voorWie: [
      "je al een beetje technisch bent",
      "je al werkt met Claude Code of Codex",
      "je het brein van je bedrijf zelf wil bouwen",
    ],
    tekst: "Je krijgt korte lessen en onze startmap. Je AI stelt de vragen, jij vertelt. Reken op een paar avonden.",
    knop: "Start met de lesreeks",
    beeldAlt: "Alex naast een whiteboard met de stappen van de lesreeks: Leg jouw AI-fundament",
  },
  laten: {
    titel: "Laat het ons doen",
    sub: "Met een analyse van je bedrijf",
    voorWie: [
      "je geen tijd hebt om het zelf te leren",
      "je alles uit handen wil geven",
      "je wil weten wat AI in jouw bedrijf kan doen",
    ],
    tekst: "Wij bekijken hoe je bedrijf werkt en geven je een plan: wat AI kan overnemen, en in welke volgorde. Daarna bouwen we het voor je. Je begint met een call van een halfuur met Karel, vrijblijvend.",
    knop: "Plan een call met Karel",
    sluit: "Sluit het formulier",
  },

  resourcesTitel: ["Gratis gidsen en", "prompts"],
  resourcesIntro: "Alles wat ik in mijn video's beloof. Tik op een kaartje om het te openen. De nieuwste staat bovenaan.",
  resourcesLeeg: "Hier komen binnenkort de gidsen en prompts uit mijn video's.",
  filterLabel: "Toon",
  filterAlles: "Alles",
  openKnop: {
    gids: "Open de gids",
    prompt: "Open de prompt",
    pakket: "Open het pakket",
    standaard: "Bekijken",
  } as Record<string, string>,
};
