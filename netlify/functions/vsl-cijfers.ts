/**
 * GET /api/vsl-cijfers?sleutel=…  (via de redirect in netlify.toml)
 *
 * De ruwe kijkbeurten voor de interne pagina /hub/cijfers/ (zonder id). De pagina
 * rekent zelf de retentie, de afhaakpunten en de filters uit.
 *
 * Afgeschermd met een geheime sleutel uit Netlify: HUB_CIJFERS_SLEUTEL. Zonder die
 * variabele is de functie dicht. Database: zie lib/vsl-meting-db.ts.
 */
import type { Handler, HandlerEvent } from "@netlify/functions";
import { timingSafeEqual } from "node:crypto";
import { KIJKRIJ_VELDEN, koppen, metingDb, type Kijkrij } from "../../lib/vsl-meting-db";

const JSON_HEADERS = { "Content-Type": "application/json", "Cache-Control": "no-store", "X-Robots-Tag": "noindex" };
const PER_KEER = 1000;
const MAX_RIJEN = 50000;

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
  const gegeven = event.queryStringParameters?.sleutel ?? "";
  if (!geheim) return json(503, { error: "niet_ingesteld" });
  if (!gegeven || !zelfde(gegeven, geheim)) return json(401, { error: "verkeerde_sleutel" });

  const db = metingDb();
  if (!db) return json(503, { error: "geen_database" });

  const rijen: Kijkrij[] = [];
  try {
    for (let vanaf = 0; vanaf < MAX_RIJEN; vanaf += PER_KEER) {
      const res = await fetch(
        `${db.url}/rest/v1/hub_vsl_kijkbeurten?select=${KIJKRIJ_VELDEN}&order=gestart_op.desc&offset=${vanaf}&limit=${PER_KEER}`,
        { headers: koppen(db) }
      );
      if (!res.ok) return json(502, { error: "database", status: res.status });
      const stuk = (await res.json()) as Kijkrij[];
      rijen.push(...stuk);
      if (stuk.length < PER_KEER) break;
    }
  } catch {
    return json(502, { error: "netwerk" });
  }
  return json(200, { rijen });
};
