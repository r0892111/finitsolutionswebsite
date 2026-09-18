/**
 * Odoo CRM: een lead aanmaken vanuit het contactformulier.
 *
 * Praat rechtstreeks met de externe API van Odoo via JSON-RPC (`/jsonrpc`),
 * dus zonder extra dependency. Werkt voor Odoo Online (odoo.com) en voor
 * een eigen server, vanaf Odoo 15. Twee calls per inzending: `common.login`
 * geeft de user-id, `object.execute_kw` doet `crm.lead.create`.
 *
 * Inloggen gebeurt met een API-sleutel, niet met het wachtwoord:
 * Odoo → gebruikersmenu → Mijn profiel → Accountbeveiliging → Nieuwe API-sleutel.
 *
 * Env-variabelen (Netlify → Site settings → Environment variables):
 *   ODOO_URL        https://<bedrijf>.odoo.com  (zonder slash op het einde)
 *   ODOO_DB         databasenaam (bij Odoo Online meestal <bedrijf>)
 *   ODOO_LOGIN      e-mailadres van de gebruiker die de leads aanmaakt
 *   ODOO_API_KEY    API-sleutel van die gebruiker
 *   ODOO_LEAD_TYPE  "opportunity" (standaard, komt meteen in de pipeline)
 *                   of "lead" (vereist de instelling "Leads" in CRM)
 *   ODOO_TEAM_ID    optioneel, id van het verkoopteam
 *   ODOO_TAG_ID     optioneel, id van een tag zoals "Website"
 *
 * Ontbreekt een van de vier verplichte variabelen, dan geeft
 * `odooConfigFromEnv` null terug en slaat de function Odoo over.
 */

export type OdooLeadType = "lead" | "opportunity";

export interface OdooConfig {
  url: string;
  db: string;
  login: string;
  apiKey: string;
  leadType: OdooLeadType;
  teamId?: number;
  tagId?: number;
}

/** De velden zoals ze uit het contactformulier komen (al getrimd). */
export interface ContactLead {
  naam: string;
  email: string;
  telefoon: string;
  bedrijfswebsite: string;
  bericht: string;
  bron: string;
}

export interface OdooLeadResult {
  id: number;
  /** Link naar het formulier van de lead in Odoo, voor in de mail. */
  url: string;
}

function optionalId(v: string | undefined): number | undefined {
  const n = Number.parseInt(v ?? "", 10);
  return Number.isFinite(n) && n > 0 ? n : undefined;
}

export function odooConfigFromEnv(
  env: Record<string, string | undefined> = process.env
): OdooConfig | null {
  const url = (env.ODOO_URL ?? "").trim().replace(/\/+$/, "");
  const db = (env.ODOO_DB ?? "").trim();
  const login = (env.ODOO_LOGIN ?? "").trim();
  const apiKey = (env.ODOO_API_KEY ?? "").trim();
  if (!url || !db || !login || !apiKey) return null;

  const leadType: OdooLeadType = env.ODOO_LEAD_TYPE === "lead" ? "lead" : "opportunity";
  return {
    url,
    db,
    login,
    apiKey,
    leadType,
    teamId: optionalId(env.ODOO_TEAM_ID),
    tagId: optionalId(env.ODOO_TAG_ID),
  };
}

interface RpcError {
  message?: string;
  data?: { message?: string; name?: string };
}

async function rpc<T>(
  cfg: OdooConfig,
  service: "common" | "object",
  method: string,
  args: unknown[],
  signal?: AbortSignal
): Promise<T> {
  const res = await fetch(`${cfg.url}/jsonrpc`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    signal,
    body: JSON.stringify({
      jsonrpc: "2.0",
      method: "call",
      id: Date.now(),
      params: { service, method, args },
    }),
  });
  if (!res.ok) throw new Error(`Odoo antwoordde met HTTP ${res.status}`);

  const data = (await res.json()) as { result?: T; error?: RpcError };
  if (data.error) {
    // Odoo zet de leesbare fout in data.message, de generieke in message.
    throw new Error(data.error.data?.message || data.error.message || "Odoo RPC-fout");
  }
  return data.result as T;
}

function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** `description` op crm.lead is een HTML-veld; regeleinden worden <br>. */
function descriptionHtml(lead: ContactLead): string {
  const delen: string[] = [];
  if (lead.bericht) delen.push(`<p>${esc(lead.bericht).replace(/\n/g, "<br>")}</p>`);
  delen.push(`<p>Ingezonden via het contactformulier op ${esc(lead.bron)}.</p>`);
  return delen.join("");
}

export function leadValues(cfg: OdooConfig, lead: ContactLead): Record<string, unknown> {
  const isVraag = lead.bericht.length > 0;
  const values: Record<string, unknown> = {
    name: `${isVraag ? "Vraag" : "Aanvraag"} via website: ${lead.naam}`,
    type: cfg.leadType,
    contact_name: lead.naam,
    email_from: lead.email,
    phone: lead.telefoon || false,
    website: lead.bedrijfswebsite || false,
    description: descriptionHtml(lead),
  };
  if (cfg.teamId) values.team_id = cfg.teamId;
  // (4, id) = bestaande tag koppelen zonder de andere tags aan te raken.
  if (cfg.tagId) values.tag_ids = [[4, cfg.tagId]];
  return values;
}

export async function createOdooLead(
  cfg: OdooConfig,
  lead: ContactLead,
  signal?: AbortSignal
): Promise<OdooLeadResult> {
  const uid = await rpc<number | false>(cfg, "common", "login", [cfg.db, cfg.login, cfg.apiKey], signal);
  if (!uid) throw new Error("Odoo weigerde de login: controleer ODOO_DB, ODOO_LOGIN en ODOO_API_KEY");

  const id = await rpc<number>(
    cfg,
    "object",
    "execute_kw",
    [cfg.db, uid, cfg.apiKey, "crm.lead", "create", [leadValues(cfg, lead)]],
    signal
  );

  // Deze oude URL-vorm werkt in elke Odoo-versie; nieuwe versies sturen door.
  return { id, url: `${cfg.url}/web#id=${id}&model=crm.lead&view_type=form` };
}
