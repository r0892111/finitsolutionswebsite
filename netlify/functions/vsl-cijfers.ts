/**
 * GET /api/vsl-cijfers?dagen=30  met header x-hub-sleutel  (via de redirect in netlify.toml)
 *
 * De kijkbeurten van de gekozen periode (zonder id) voor de interne pagina
 * /hub/cijfers/. De pagina rekent zelf de retentie, de afhaakpunten en de filters
 * uit. Het resultaat blijft 5 minuten bewaard onder "cache/<dagen>" (&vers=1 slaat
 * dat over), zodat herladen niet telkens alle kijkbeurten opnieuw leest.
 *
 * Afgeschermd met een geheime sleutel uit Netlify: HUB_CIJFERS_SLEUTEL, die de pagina
 * in de header x-hub-sleutel meestuurt (niet in de link: die komt in logs). Zonder
 * die variabele is de functie dicht.
 */
import type { Handler, HandlerEvent } from "@netlify/functions";
import { timingSafeEqual } from "node:crypto";
import { DAG, kijkStore, type Kijkbeurt, type Kijkrij } from "../../lib/vsl-meting-opslag";

const JSON_HEADERS = { "Content-Type": "application/json", "Cache-Control": "no-store", "X-Robots-Tag": "noindex" };
const CACHE_MS = 5 * 60 * 1000;
const TEGELIJK = 25;
const PERIODES = [7, 30, 90, 365];

function json(statusCode: number, body: unknown) {
  return { statusCode, headers: JSON_HEADERS, body: JSON.stringify(body) };
}

function zelfde(a: string, b: string): boolean {
  const x = Buffer.from(a);
  const y = Buffer.from(b);
  return x.length === y.length && timingSafeEqual(x, y);
}

export const handler: Handler = async (event: HandlerEvent) => {
  if (event.httpMethod !== "GET") return json(405, { error: "method_not_allowed" });

  const geheim = process.env.HUB_CIJFERS_SLEUTEL;
  const q = event.queryStringParameters ?? {};
  if (!geheim) return json(503, { error: "niet_ingesteld" });
  const gegeven = event.headers["x-hub-sleutel"] ?? "";
  if (!gegeven || !zelfde(gegeven, geheim)) return json(401, { error: "verkeerde_sleutel" });

  const dagen = PERIODES.includes(Number(q.dagen)) ? Number(q.dagen) : 30;
  const vanaf = new Date(Date.now() - (dagen - 1) * 864e5).toISOString().slice(0, 10);

  try {
    const store = kijkStore(event);
    const cacheSleutel = `cache/${dagen}`;
    if (q.vers !== "1") {
      const cache = (await store.get(cacheSleutel, { type: "json" })) as { t: number; rijen: Kijkrij[] } | null;
      if (cache && Date.now() - cache.t < CACHE_MS) return json(200, { rijen: cache.rijen, cache: true });
    }

    // Alle sleutels "JJJJ-MM-DD/<id>" vanaf de eerste dag van de periode.
    const sleutels: string[] = [];
    for await (const pagina of store.list({ paginate: true })) {
      for (const b of pagina.blobs) {
        const dag = b.key.slice(0, 10);
        if (DAG.test(dag) && b.key[10] === "/" && dag >= vanaf) sleutels.push(b.key);
      }
    }

    const rijen: Kijkrij[] = [];
    for (let i = 0; i < sleutels.length; i += TEGELIJK) {
      const stuk = await Promise.all(
        sleutels.slice(i, i + TEGELIJK).map(async (k) => {
          const w = (await store.get(k, { type: "json" })) as Kijkbeurt | null;
          return w ? { ...w, dag: k.slice(0, 10) } : null;
        })
      );
      stuk.forEach((r) => r && rijen.push(r));
    }

    await store.setJSON(cacheSleutel, { t: Date.now(), rijen });
    return json(200, { rijen, cache: false });
  } catch {
    console.error("vsl-cijfers: lezen mislukt");
    return json(502, { error: "opslag" });
  }
};
