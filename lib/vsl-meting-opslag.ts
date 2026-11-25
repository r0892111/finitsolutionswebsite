/**
 * Opslag van de VSL-kijkmeting in Netlify Blobs (hoort bij de site zelf: geen
 * extra account, gratis, weg te halen door de store te wissen). Alleen voor de
 * Netlify-functies vsl-meting, vsl-cijfers en contact-submit.
 *
 * Store "hub-vsl-kijkbeurten", één sleutel per kijkbeurt: "JJJJ-MM-DD/<id>"
 * (de dag waarop de kijkbeurt begon, in UTC), zodat we per periode kunnen lijsten.
 * Een verstuurd formulier krijgt een eigen merkje "formulier/JJJJ-MM-DD/<id>"
 * (zo kan een late hartslag het nooit overschrijven). De cijferpagina bewaart haar
 * samengetelde resultaat even onder "cache/…".
 *
 * Let op: "strong consistency" (altijd de verse waarde lezen) werkt alleen in
 * functies in de nieuwe vorm (export default). Alle functies die deze store
 * gebruiken, staan sinds 25/11 in die vorm.
 */
import { getStore } from "@netlify/blobs";

export const STORE = "hub-vsl-kijkbeurten";
export const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
export const DAG = /^\d{4}-\d{2}-\d{2}$/;

/** Eén kijkbeurt zoals ze in de store staat. Geen IP, geen user-agent. */
export interface Kijkbeurt {
  video: string;
  start_s: number;
  max_s: number;
  duur_s: number | null;
  bron: string;
  reel: string | null;
  apparaat: "gsm" | "desktop";
  kwaliteit: string | null;
  hervat: boolean;
  /** Tijdstip van de eerste en de laatste hartslag (ISO). */
  start: string;
  laatst: string;
}

/** Wat de cijferpagina krijgt: de kijkbeurt plus de dag en of er een formulier volgde, zonder id. */
export type Kijkrij = Kijkbeurt & { dag: string; formulier: boolean };

/** De store, in een functie in de nieuwe vorm (export default). */
export function kijkStore() {
  return getStore({ name: STORE, consistency: "strong" });
}

/** Nieuwe kijkbeurten mogen alleen op vandaag of gisteren (UTC) beginnen. */
export function dagMagNieuw(dag: string): boolean {
  if (!DAG.test(dag)) return false;
  const vandaag = new Date();
  const gisteren = new Date(vandaag.getTime() - 864e5);
  return dag === vandaag.toISOString().slice(0, 10) || dag === gisteren.toISOString().slice(0, 10);
}

/**
 * Na een verstuurd formulier (vanuit contact-submit en cursus-aanvraag, sinds 25/11 in de
 * nieuwe vorm): zet het merkje voor die kijkbeurt. Alleen schrijven, niets lezen.
 */
export async function markeerFormulier(id: string, dag: string): Promise<void> {
  if (!UUID.test(id) || !dagMagNieuw(dag)) return;
  await getStore({ name: STORE }).set(`formulier/${dag}/${id.toLowerCase()}`, new Date().toISOString());
}
