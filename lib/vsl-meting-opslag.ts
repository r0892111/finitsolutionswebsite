/**
 * Opslag van de VSL-kijkmeting in Netlify Blobs (hoort bij de site zelf: geen
 * extra account, gratis, weg te halen door de store te wissen). Alleen voor de
 * Netlify-functies vsl-meting, vsl-cijfers en contact-submit.
 *
 * Store "hub-vsl-kijkbeurten", één sleutel per kijkbeurt: "JJJJ-MM-DD/<id>"
 * (de dag waarop de kijkbeurt begon, in UTC), zodat we per periode kunnen lijsten.
 * De cijferpagina bewaart haar samengetelde resultaat even onder "cache/…".
 */
import { connectLambda, getStore } from "@netlify/blobs";

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
  formulier: boolean;
  /** Tijdstip van de eerste en de laatste hartslag (ISO). */
  start: string;
  laatst: string;
}

/** Wat de cijferpagina krijgt: de kijkbeurt plus de dag, zonder id. */
export type Kijkrij = Kijkbeurt & { dag: string };

/** De store, in een functie in Lambda-stijl (export const handler). */
export function kijkStore(event: unknown) {
  connectLambda(event as Parameters<typeof connectLambda>[0]);
  return getStore({ name: STORE, consistency: "strong" });
}

/** Nieuwe kijkbeurten mogen alleen op vandaag of gisteren (UTC) beginnen. */
export function dagMagNieuw(dag: string): boolean {
  if (!DAG.test(dag)) return false;
  const vandaag = new Date();
  const gisteren = new Date(vandaag.getTime() - 864e5);
  return dag === vandaag.toISOString().slice(0, 10) || dag === gisteren.toISOString().slice(0, 10);
}

/** Na een verstuurd formulier: die kijkbeurt leidde tot een aanvraag. Stil als ze niet bestaat. */
export async function markeerFormulier(event: unknown, id: string, dag: string): Promise<void> {
  if (!UUID.test(id) || !DAG.test(dag)) return;
  const store = kijkStore(event);
  const sleutel = `${dag}/${id.toLowerCase()}`;
  const oud = (await store.get(sleutel, { type: "json" })) as Kijkbeurt | null;
  if (!oud) return;
  await store.setJSON(sleutel, { ...oud, formulier: true, laatst: new Date().toISOString() });
}
