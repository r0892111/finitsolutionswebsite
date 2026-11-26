/**
 * De wacht voor de formulieren die een lead maken (contact-submit en cursus-aanvraag).
 * Alleen in functies in de nieuwe vorm (export default): de teller moet vers kunnen
 * lezen (Netlify Blobs, consistency "strong"), anders telt een vloed niet mee.
 *
 * Volgorde in `wacht()`:
 * 1. Origin: stuurt de browser een Origin mee die niet van onze site is, dan 403.
 * 2. Bot: de honeypot (`website` of `controle`) is ingevuld, of het formulier werd binnen
 *    3 s na het laden verstuurd. Dan doen we alsof het lukte (200) en doen we niets.
 * 3. Turnstile (Cloudflare): alleen als TURNSTILE_SECRET_KEY in Netlify staat.
 * 4. Dubbel: hetzelfde `aanvraag_id` binnen 24 uur = dezelfde aanvraag, opnieuw verstuurd
 *    na een foutmelding. Dan 200 zonder iets opnieuw te doen.
 * 5. Teller: hooguit MAX_PER_UUR aanvragen per IP per uur, voor alle formulieren samen.
 *
 * Wat in de store staat (store "formulier-wacht", hoort bij de site zelf):
 * - teller/<uur>/<hash>: het aantal aanvragen van één IP in dat uur. Het IP zelf bewaren
 *   we niet, alleen een hash met de dag erin, zodat die elke dag verandert.
 * - aanvraag/<id>: wanneer die aanvraag binnenkwam.
 * - papi/<dag>/<hash>: of er die dag al een PAPI-seintje vertrok voor dat e-mailadres.
 * Oude sleutels ruimen we af en toe op. Lukt de store niet, dan laten we de aanvraag
 * door: een lead verliezen is erger dan een bot doorlaten.
 */
import { getStore } from "@netlify/blobs";

const STORE = "formulier-wacht";
const MAX_PER_UUR = 5;
const MIN_INVULTIJD_MS = 3000;
const DAG_MS = 864e5;

// Onze site, de previews van Netlify (zesty-caramel-102bbb) en lokaal.
const ONZE_ORIGIN =
  /^(https:\/\/(www\.)?finitsolutions\.be|https:\/\/([a-z0-9-]+--)?zesty-caramel-102bbb\.netlify\.app|http:\/\/localhost(:\d+)?)$/;

const ID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

type Body = Record<string, unknown>;

function store() {
  return getStore({ name: STORE, consistency: "strong" });
}

async function hash(s: string): Promise<string> {
  const data = new TextEncoder().encode(s);
  const buf = await crypto.subtle.digest("SHA-256", data);
  return Buffer.from(buf).toString("hex").slice(0, 32);
}

function json(status: number, body: unknown): Response {
  return new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json" } });
}

/** Het aanvraag_id uit de browser, of null als het er niet (goed) in staat. */
export function aanvraagId(body: Body): string | null {
  return typeof body.aanvraag_id === "string" && ID_RE.test(body.aanvraag_id) ? body.aanvraag_id.toLowerCase() : null;
}

/** Ingevuld = bot. `website` is de oude honeypot (met `bedrijfswebsite` als echte website), `controle` de nieuwe (components/formulier-bescherming.tsx). */
function honingVol(body: Body): boolean {
  return [body.website, body.controle].some((v) => typeof v === "string" && v.trim() !== "");
}

/** Te snel = bot. Zonder het veld (een pagina die nog van voor deze versie open stond) laten we door. */
function teSnel(body: Body): boolean {
  const ms = body.ingevuld_ms;
  return typeof ms === "number" && Number.isFinite(ms) && ms >= 0 && ms < MIN_INVULTIJD_MS;
}

async function turnstileOk(body: Body, ip: string, wie: string): Promise<boolean> {
  const geheim = process.env.TURNSTILE_SECRET_KEY;
  if (!geheim) return true;
  const token = typeof body.turnstile === "string" ? body.turnstile : "";
  if (!token) return false;
  const timer = new AbortController();
  const t = setTimeout(() => timer.abort(), 3000);
  try {
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      signal: timer.signal,
      body: new URLSearchParams({ secret: geheim, response: token, remoteip: ip }),
    });
    const uit = (await res.json()) as { success?: boolean };
    return uit.success === true;
  } catch (err) {
    // Cloudflare onbereikbaar: liever een lead doorlaten dan verliezen.
    console.error(`${wie}: Turnstile niet bereikt`, err instanceof Error ? err.name : "onbekende fout");
    return true;
  } finally {
    clearTimeout(t);
  }
}

/** Telt deze aanvraag mee; true als dit IP er dit uur al MAX_PER_UUR had. */
async function teVeel(ip: string): Promise<boolean> {
  const nu = new Date().toISOString();
  const sleutel = `teller/${nu.slice(0, 13)}/${await hash(`${ip}|${nu.slice(0, 10)}`)}`;
  const s = store();
  const aantal = Number((await s.get(sleutel, { type: "text" })) ?? 0);
  if (aantal >= MAX_PER_UUR) return true;
  await s.set(sleutel, String(aantal + 1));
  return false;
}

/** Af en toe (±1 op 20 aanvragen) de tellers en ids van meer dan twee dagen oud weggooien. */
async function ruimOp(): Promise<void> {
  if (Math.random() > 0.05) return;
  const s = store();
  const grens = new Date(Date.now() - 2 * DAG_MS).toISOString();
  const { blobs } = await s.list();
  for (const b of blobs) {
    const [soort, tijd] = b.key.split("/");
    if (soort === "teller" || soort === "papi") {
      if (tijd < grens.slice(0, tijd.length)) await s.delete(b.key);
    } else if (soort === "aanvraag") {
      const op = (await s.get(b.key, { type: "text" })) ?? "";
      if (op < grens) await s.delete(b.key);
    }
  }
}

/**
 * Loopt de wacht voor een aanvraag. Geeft een Response terug om meteen te antwoorden,
 * of null als de aanvraag verder mag. Een doorgelaten aanvraag met een id is meteen
 * gemerkt; mislukt ze helemaal, roep dan `vergeet(id)` zodat opnieuw proberen kan.
 */
export async function wacht(req: Request, ip: string, body: Body, wie: string): Promise<Response | null> {
  const origin = req.headers.get("origin");
  if (origin && !ONZE_ORIGIN.test(origin)) return json(403, { error: "origin" });

  if (honingVol(body) || teSnel(body)) return json(200, { ok: true });

  if (!(await turnstileOk(body, ip, wie))) return json(400, { error: "turnstile" });

  const id = aanvraagId(body);
  try {
    const s = store();
    if (id && (await s.get(`aanvraag/${id}`, { type: "text" }))) return json(200, { ok: true, dubbel: true });
    if (await teVeel(ip)) return json(429, { error: "te_veel" });
    if (id) await s.set(`aanvraag/${id}`, new Date().toISOString());
    // Opruimen laat de bezoeker niet wachten; lukt het eens niet, dan de volgende keer.
    void ruimOp().catch(() => undefined);
  } catch (err) {
    console.error(`${wie}: wacht-store niet bereikt`, err instanceof Error ? err.name : "onbekende fout");
  }
  return null;
}

/** De aanvraag mislukte helemaal (geen Tuesday, geen mail): het id mag opnieuw. */
export async function vergeet(id: string | null): Promise<void> {
  if (!id) return;
  await store()
    .delete(`aanvraag/${id}`)
    .catch(() => undefined);
}

/** Hooguit één PAPI-seintje per e-mailadres per dag. true = mag; zet meteen het merkje. */
export async function papiMagVandaag(email: string): Promise<boolean> {
  try {
    const dag = new Date().toISOString().slice(0, 10);
    const sleutel = `papi/${dag}/${await hash(email.trim().toLowerCase())}`;
    const s = store();
    if (await s.get(sleutel, { type: "text" })) return false;
    await s.set(sleutel, new Date().toISOString());
    return true;
  } catch {
    return true;
  }
}

/** Een tekstveld zonder regeleinden of tabs (voor het mailonderwerp en de naam). */
export function eenRegel(s: string): string {
  return s.replace(/[\r\n\t]+/g, " ").trim();
}
