/**
 * De database van de VSL-kijkmeting (tabel hub_vsl_kijkbeurten, zie
 * supabase/migrations/020_hub_vsl_kijkbeurten.sql). Alleen voor de Netlify-functies
 * vsl-meting en vsl-cijfers: de sleutel hier is de service-role-sleutel.
 *
 * Eigen env-namen, zodat er niets in een ander project belandt tot Alex kiest
 * welk Supabase-project dit wordt:
 *   HUB_METING_SUPABASE_URL  bv. https://xxxx.supabase.co
 *   HUB_METING_SUPABASE_KEY  de service-role-sleutel van dat project
 */

export interface MetingDb {
  url: string;
  sleutel: string;
}

export function metingDb(): MetingDb | null {
  const url = process.env.HUB_METING_SUPABASE_URL?.replace(/\/+$/, "");
  const sleutel = process.env.HUB_METING_SUPABASE_KEY;
  return url && sleutel ? { url, sleutel } : null;
}

export function koppen(db: MetingDb, extra: Record<string, string> = {}): Record<string, string> {
  return { apikey: db.sleutel, Authorization: `Bearer ${db.sleutel}`, "Content-Type": "application/json", ...extra };
}

/** Eén rij zoals de cijferpagina ze krijgt: geen id, niets dat naar iemand leidt. */
export interface Kijkrij {
  gestart_op: string;
  video: string;
  start_seconde: number;
  verste_seconde: number;
  duur: number | null;
  bron: string;
  reel: string | null;
  apparaat: "gsm" | "desktop";
  kwaliteit: string | null;
  hervat: boolean;
  formulier_verstuurd: boolean;
}

export const KIJKRIJ_VELDEN =
  "gestart_op,video,start_seconde,verste_seconde,duur,bron,reel,apparaat,kwaliteit,hervat,formulier_verstuurd";
