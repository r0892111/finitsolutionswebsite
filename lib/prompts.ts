/**
 * Promptpagina's op /prompts/<slug>/: één pagina per carrousel die prompts belooft.
 * Elke pagina staat als JSON in content/prompts/. Een nieuwe pagina = een JSON
 * erbij, een regel hieronder, en een kaartje in content/resources.json (met
 * dezelfde `reel`, zodat de hub het kaartje bovenaan zet bij ?reel=C03).
 *
 * Fase 1 (4/11/2026): de prompts komen letterlijk uit de bijlage van het
 * startpakket (public/startpakket-ai.md). Zodra Alex een carrousel kiest, komt
 * de definitieve tekst uit ~/code/reel-autopilot/carrousels/hub/. Zo staan
 * C01, C05 en C13 er al (6/11/2026).
 */

import bedrijf from '@/content/prompts/bedrijf-leren-kennen.json';
import werk from '@/content/prompts/werk-dat-blijft-liggen.json';
import verkoop from '@/content/prompts/verkoopgesprek.json';
import marketing from '@/content/prompts/marketing.json';
import cijfers from '@/content/prompts/cijfers.json';
import eerlijk from '@/content/prompts/eerlijk-advies.json';
import bedrijven from '@/content/prompts/bedrijven-zoeken.json';
import schrijfstijl from '@/content/prompts/schrijfstijl.json';
import ochtendmail from '@/content/prompts/ochtendmail.json';

export interface Prompt {
  titel: string;
  /** Optioneel: één of twee zinnen over wanneer of hoe je hem gebruikt. */
  uitleg?: string;
  tekst: string;
}

/**
 * Een blokje uitleg vóór of na de prompts ("Wat je nodig hebt", "Daarna").
 * In de tekst mag **vet** en [een link](/pad/).
 */
export interface Blok {
  titel: string;
  alineas?: string[];
  punten?: string[];
}

export interface PromptPagina {
  slug: string;
  /** De carrousel waar hij bij hoort, bv. "C03". */
  reel: string;
  /** Klein label boven de titel, zoals op de cover: "3 prompts · verkoop". */
  kicker: string;
  /** Dezelfde zin als op de cover van de post, zodat je hem herkent. */
  titel: string;
  intro: string;
  /** Optioneel: een tip die vóór de prompts komt. */
  tip?: string;
  /** Optioneel: blokjes boven de prompts, zoals "Wat je nodig hebt". */
  voor?: Blok[];
  prompts: Prompt[];
  /** Optioneel: blokjes onder de prompts, zoals "Daarna". */
  na?: Blok[];
}

export const PROMPT_PAGINAS: PromptPagina[] = [
  bedrijf,
  werk,
  verkoop,
  marketing,
  schrijfstijl,
  cijfers,
  eerlijk,
  bedrijven,
  ochtendmail,
];

export function vindPromptPagina(slug: string): PromptPagina | undefined {
  return PROMPT_PAGINAS.find((p) => p.slug === slug);
}
