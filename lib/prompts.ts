/**
 * Promptpagina's op /prompts/<slug>/: één pagina per carrousel die prompts belooft.
 * Elke pagina staat als JSON in content/prompts/. Een nieuwe pagina = een JSON
 * erbij, een regel hieronder, en een kaartje in content/resources.json (met
 * dezelfde `reel`, zodat de hub het kaartje bovenaan zet bij ?reel=C03).
 *
 * Fase 1 (4/11/2026): de prompts komen letterlijk uit de bijlage van het
 * startpakket (public/startpakket-ai.md). Zodra Alex een carrousel kiest, komt
 * de definitieve tekst uit ~/code/reel-autopilot/carrousels/hub/.
 */

import werk from '@/content/prompts/werk-dat-blijft-liggen.json';
import verkoop from '@/content/prompts/verkoopgesprek.json';
import marketing from '@/content/prompts/marketing.json';
import cijfers from '@/content/prompts/cijfers.json';
import eerlijk from '@/content/prompts/eerlijk-advies.json';
import bedrijven from '@/content/prompts/bedrijven-zoeken.json';

export interface Prompt {
  titel: string;
  /** Optioneel: één of twee zinnen over wanneer of hoe je hem gebruikt. */
  uitleg?: string;
  tekst: string;
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
  prompts: Prompt[];
}

export const PROMPT_PAGINAS: PromptPagina[] = [werk, verkoop, marketing, cijfers, eerlijk, bedrijven];

export function vindPromptPagina(slug: string): PromptPagina | undefined {
  return PROMPT_PAGINAS.find((p) => p.slug === slug);
}
