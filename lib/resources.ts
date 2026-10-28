/**
 * De gratis resources op de hub: gidsen, prompts en pakketten.
 *
 * De lijst staat in content/resources.json en gaat mee in de build. Staat
 * NEXT_PUBLIC_RESOURCES_URL ingesteld, dan haalt de pagina in de browser ook
 * die externe lijst op (later uit de reel-pipeline). Zo verschijnt een nieuwe
 * resource zonder nieuwe deploy. Die externe lijst moet CORS toelaten voor
 * finitsolutions.be. Lukt het ophalen niet, dan blijft het bestand staan.
 *
 * Samenvoegen gebeurt op `id`: de externe lijst wint, en `verborgen: true`
 * haalt een resource weg, ook een uit het bestand.
 */

export interface Resource {
  /** Uniek en blijvend, bv. "r001-kennis-centraliseren". */
  id: string;
  titel: string;
  /** Eén zin: wat je eraan hebt. */
  beschrijving: string;
  /** https://… of een pad op de site, zoals /startpakket */
  url: string;
  /** gids, prompt, pakket, … (vrij, wordt het label op het kaartje) */
  soort: string;
  /** JJJJ-MM-DD; de nieuwste staat bovenaan. */
  datum: string;
  /** Optioneel: de video waar hij bij hoort, bv. "R001". */
  reel?: string;
  verborgen?: boolean;
}

export const RESOURCES_URL = process.env.NEXT_PUBLIC_RESOURCES_URL ?? "";

const DATUM = /^\d{4}-\d{2}-\d{2}$/;

function tekst(v: unknown, max: number): string {
  return typeof v === "string" ? v.trim().slice(0, max) : "";
}

/** Eén item uit een (onbetrouwbare) lijst controleren. Ongeldig = null. */
function leesItem(v: unknown): Resource | null {
  if (!v || typeof v !== "object") return null;
  const o = v as Record<string, unknown>;
  const id = tekst(o.id, 80);
  const titel = tekst(o.titel, 120);
  const url = tekst(o.url, 500);
  if (!id || !titel) return null;
  // Alleen https of een eigen pad: geen javascript:- of http-links op de site.
  if (!url.startsWith("https://") && !(url.startsWith("/") && !url.startsWith("//"))) return null;
  const datum = tekst(o.datum, 10);
  return {
    id,
    titel,
    beschrijving: tekst(o.beschrijving, 240),
    url,
    soort: tekst(o.soort, 30).toLowerCase() || "gids",
    datum: DATUM.test(datum) ? datum : "1970-01-01",
    reel: tekst(o.reel, 12) || undefined,
    verborgen: o.verborgen === true,
  };
}

/** Een lijst (array, of { resources: [...] }) omzetten naar geldige items. */
export function leesLijst(data: unknown): Resource[] {
  const rij = Array.isArray(data)
    ? data
    : data && typeof data === "object" && Array.isArray((data as { resources?: unknown }).resources)
      ? (data as { resources: unknown[] }).resources
      : [];
  return rij.map(leesItem).filter((r): r is Resource => r !== null);
}

/** Lokaal + extern samenvoegen op id (extern wint), verborgen eruit, nieuwste eerst. */
export function voegSamen(lokaal: Resource[], extern: Resource[] = []): Resource[] {
  const perId = new Map<string, Resource>();
  for (const r of [...lokaal, ...extern]) perId.set(r.id, r);
  return Array.from(perId.values())
    .filter((r) => !r.verborgen)
    .sort((a, b) => b.datum.localeCompare(a.datum));
}

/** De externe lijst ophalen. Geeft [] terug bij elke fout, zodat het bestand blijft staan. */
export async function haalExterneLijst(url: string, timeoutMs = 5000): Promise<Resource[]> {
  if (!url) return [];
  const timer = new AbortController();
  const timeout = setTimeout(() => timer.abort(), timeoutMs);
  try {
    const res = await fetch(url, { signal: timer.signal, cache: "no-store" });
    if (!res.ok) return [];
    return leesLijst(await res.json());
  } catch {
    return [];
  } finally {
    clearTimeout(timeout);
  }
}

const LABELS: Record<string, string> = {
  gids: "Gids",
  prompt: "Prompt",
  pakket: "Startpakket",
  template: "Template",
  video: "Video",
};

const MEERVOUD: Record<string, string> = {
  gids: "Gidsen",
  prompt: "Prompts",
  pakket: "Pakketten",
  template: "Templates",
  video: "Video's",
};

export function soortLabel(soort: string): string {
  return LABELS[soort] ?? soort.charAt(0).toUpperCase() + soort.slice(1);
}

/** Voor de filterknoppen: "Gidsen", "Prompts", … */
export function soortMeervoud(soort: string): string {
  return MEERVOUD[soort] ?? soortLabel(soort);
}
