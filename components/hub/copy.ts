/**
 * Alle tekst van de resource hub (de link in bio op alle socials, beslissing
 * van Alex op 28/10/2026). Van boven naar onder: de VSL, de keuze tussen zelf
 * bouwen en het laten doen, en de gratis resources.
 *
 * De prijs van de analyse staat hier bewust niet: Karel noemt die in de call
 * (nog te bevestigen door Karel). De resources zelf staan in content/resources.json.
 */

export const HUB = {
  metaTitel: "Gratis gidsen, prompts en de lesreeks",
  metaBeschrijving:
    "Alle gidsen en prompts uit de video's van Alex van Finit op één plek. Bouw het brein van je bedrijf zelf met de lesreeks, of laat het ons doen.",

  bovenschrift: "Alex van Finit",
  titel: "Leg het AI-fundament van je bedrijf",
  intro: "Bekijk eerst deze video van zes minuten. Daarna kies je: zelf bouwen, of het ons laten doen.",
  naarResources: "Kom je voor een gids of prompt? Ze staan onderaan",

  keuzeTitel: "Hoe wil je verder?",
  zelf: {
    label: "Zelf bouwen",
    titel: "De lesreeks",
    tekst: "Je bouwt het brein van je bedrijf zelf, met lessen in mensentaal en onze startmap. Op je eigen tempo, in onze community op Skool.",
    knop: "Bekijk de lesreeks",
  },
  laten: {
    label: "Laat het ons doen",
    titel: "Een gesprek met Karel",
    tekst: "Wij analyseren hoe je bedrijf werkt en leggen je een plan voor: wat AI kan overnemen, in welke volgorde, en wat het kost. Daarna bouwen we het ook.",
    knop: "Plan een call met Karel",
    sluit: "Toch niet",
  },

  resourcesTitel: "Gratis gidsen en prompts",
  resourcesIntro: "Alles wat ik in mijn video's beloof, op één plek. De nieuwste staat bovenaan.",
  resourcesLeeg: "Hier komen binnenkort de gidsen en prompts uit mijn video's.",
  openKnop: {
    gids: "Open de gids",
    prompt: "Open de prompt",
    pakket: "Open het pakket",
    standaard: "Bekijken",
  } as Record<string, string>,

  vslTitel: "Video: wat is de lesreeks?",
  vslAfspelen: "Speel de video af",
};
