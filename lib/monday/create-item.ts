/**
 * monday.com: een item aanmaken op het leadsbord vanuit het contactformulier.
 *
 * Praat rechtstreeks met de GraphQL-API (`https://api.monday.com/v2`), dus
 * zonder extra dependency. Per inzending: `create_item` op het bord, daarna
 * `create_update` met de vraag en de herkomst in de tijdlijn van het item.
 * De kolommen worden per type ingevuld; welk type een kolom heeft, halen we
 * één keer op en onthouden we zolang de function warm blijft.
 *
 * API-token: monday → profielfoto → Developers → My access tokens.
 * Kolom-id's: monday → bordmenu (⋯) → Developers → kolom-id's tonen,
 * of `node scripts/monday-test-item.mjs` zonder MONDAY_BOARD_ID.
 *
 * Env-variabelen (Netlify → Site settings → Environment variables):
 *   MONDAY_API_TOKEN    verplicht
 *   MONDAY_BOARD_ID     verplicht, het cijfer uit de URL van het bord
 *   MONDAY_GROUP_ID     optioneel, anders de bovenste groep
 *   MONDAY_COL_EMAIL    optioneel, id van de e-mailkolom
 *   MONDAY_COL_PHONE    optioneel, id van de telefoonkolom
 *   MONDAY_COL_WEBSITE  optioneel, id van de link- of tekstkolom voor de website
 *   MONDAY_COL_BERICHT  optioneel, id van de (lange-)tekstkolom voor de vraag
 *   MONDAY_COL_BRON     optioneel, id van de tekstkolom voor de pagina
 *   MONDAY_COL_STATUS   optioneel, id van de statuskolom
 *   MONDAY_STATUS_LABEL optioneel, label dat een nieuwe lead krijgt ("Nieuw")
 *
 * Zonder kolom-id's komt alles alleen in de update terecht; niets gaat
 * verloren, het is alleen minder handig om op te filteren.
 */

export interface MondayConfig {
  token: string;
  boardId: string;
  groupId?: string;
  columns: {
    email?: string;
    phone?: string;
    website?: string;
    bericht?: string;
    bron?: string;
    status?: string;
  };
  statusLabel?: string;
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

export interface MondayItemResult {
  id: string;
  /** Link naar het item op het bord, voor in de mail. */
  url: string;
}

const ENDPOINT = "https://api.monday.com/v2";

function optional(v: string | undefined): string | undefined {
  const s = (v ?? "").trim();
  return s || undefined;
}

export function mondayConfigFromEnv(
  env: Record<string, string | undefined> = process.env
): MondayConfig | null {
  const token = optional(env.MONDAY_API_TOKEN);
  const boardId = optional(env.MONDAY_BOARD_ID);
  if (!token || !boardId) return null;
  return {
    token,
    boardId,
    groupId: optional(env.MONDAY_GROUP_ID),
    columns: {
      email: optional(env.MONDAY_COL_EMAIL),
      phone: optional(env.MONDAY_COL_PHONE),
      website: optional(env.MONDAY_COL_WEBSITE),
      bericht: optional(env.MONDAY_COL_BERICHT),
      bron: optional(env.MONDAY_COL_BRON),
      status: optional(env.MONDAY_COL_STATUS),
    },
    statusLabel: optional(env.MONDAY_STATUS_LABEL),
  };
}

interface GraphQLError {
  message?: string;
  extensions?: { code?: string };
}

async function graphql<T>(
  token: string,
  query: string,
  variables: Record<string, unknown>,
  signal?: AbortSignal
): Promise<T> {
  const res = await fetch(ENDPOINT, {
    method: "POST",
    // Zonder API-Version gebruikt monday de huidige stabiele versie.
    headers: { Authorization: token, "Content-Type": "application/json" },
    signal,
    body: JSON.stringify({ query, variables }),
  });
  if (!res.ok) throw new Error(`monday antwoordde met HTTP ${res.status}`);

  const data = (await res.json()) as {
    data?: T;
    errors?: GraphQLError[];
    error_message?: string;
  };
  // Fouten in de query komen als `errors`, een geweigerd token als `error_message`.
  const fout = data.errors?.[0];
  if (fout) throw new Error(`monday: ${fout.message ?? fout.extensions?.code ?? "onbekende fout"}`);
  if (data.error_message) throw new Error(`monday: ${data.error_message}`);
  if (!data.data) throw new Error("monday: leeg antwoord");
  return data.data;
}

export interface BoardSummary {
  id: string;
  name: string;
  groups: Array<{ id: string; title: string }>;
  columns: Array<{ id: string; title: string; type: string }>;
}

/** Alle borden met hun groepen en kolommen, om id's op te zoeken. */
export async function listBoards(token: string, signal?: AbortSignal): Promise<BoardSummary[]> {
  const data = await graphql<{ boards: BoardSummary[] }>(
    token,
    `query { boards(limit: 100, order_by: used_at) {
       id name groups { id title } columns { id title type } } }`,
    {},
    signal
  );
  return data.boards;
}

// Kolomtypes per bord, zodat een warme function ze niet elke keer ophaalt.
const kolomTypeCache = new Map<string, Map<string, string>>();

async function kolomTypes(cfg: MondayConfig, signal?: AbortSignal): Promise<Map<string, string>> {
  const bekend = kolomTypeCache.get(cfg.boardId);
  if (bekend) return bekend;
  const data = await graphql<{ boards: Array<{ columns: Array<{ id: string; type: string }> }> }>(
    cfg.token,
    `query ($board: [ID!]) { boards(ids: $board) { columns { id type } } }`,
    { board: [cfg.boardId] },
    signal
  );
  const types = new Map((data.boards[0]?.columns ?? []).map((c) => [c.id, c.type]));
  kolomTypeCache.set(cfg.boardId, types);
  return types;
}

const LANDCODES: Record<string, string> = {
  "32": "BE",
  "31": "NL",
  "33": "FR",
  "49": "DE",
  "44": "GB",
  "352": "LU",
};

/**
 * De telefoonkolom wil een internationaal nummer zonder spaties plus de
 * landcode. Bezoekers typen "0495 70 23 14"; zonder landcode nemen we België.
 * Geen bruikbaar nummer of onbekend land: null, het nummer staat dan enkel
 * in de update.
 */
export function phoneColumnValue(raw: string): { phone: string; countryShortName: string } | null {
  let n = raw.replace(/[\s().\/-]/g, "");
  if (n.startsWith("00")) n = `+${n.slice(2)}`;
  else if (n.startsWith("0")) n = `+32${n.slice(1)}`;
  if (!/^\+\d{7,15}$/.test(n)) return null;
  const land = Object.keys(LANDCODES).find((code) => n.startsWith(`+${code}`));
  return land ? { phone: n, countryShortName: LANDCODES[land] } : null;
}

function alsUrl(site: string): string {
  return /^https?:\/\//i.test(site) ? site : `https://${site}`;
}

/** Eén kolomwaarde in het formaat dat bij het kolomtype hoort. */
function kolomWaarde(type: string, tekst: string): unknown {
  switch (type) {
    case "email":
      return { email: tekst, text: tekst };
    case "phone":
      return phoneColumnValue(tekst);
    case "link":
      return { url: alsUrl(tekst), text: tekst };
    case "long_text":
      return { text: tekst };
    case "status":
      return { label: tekst };
    default:
      return tekst;
  }
}

export function itemColumnValues(
  cfg: MondayConfig,
  types: Map<string, string>,
  lead: ContactLead
): Record<string, unknown> {
  const gewenst: Array<[string | undefined, string]> = [
    [cfg.columns.email, lead.email],
    [cfg.columns.phone, lead.telefoon],
    [cfg.columns.website, lead.bedrijfswebsite],
    [cfg.columns.bericht, lead.bericht],
    [cfg.columns.bron, lead.bron],
    [cfg.columns.status, cfg.statusLabel ?? ""],
  ];
  const values: Record<string, unknown> = {};
  for (const [kolomId, tekst] of gewenst) {
    if (!kolomId || !tekst) continue;
    const type = types.get(kolomId);
    if (!type) {
      console.warn(`monday: kolom ${kolomId} bestaat niet op bord ${cfg.boardId}, overgeslagen`);
      continue;
    }
    const waarde = kolomWaarde(type, tekst);
    if (waarde !== null) values[kolomId] = waarde;
  }
  return values;
}

function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** De update in de tijdlijn: alles wat de bezoeker invulde, ook zonder kolommen. */
export function updateBody(lead: ContactLead): string {
  const regels = [
    `<b>${lead.bericht ? "Vraag" : "Aanvraag"} via het contactformulier</b>`,
    `E-mail: ${esc(lead.email)}`,
    `Telefoon: ${esc(lead.telefoon || "—")}`,
    `Website: ${esc(lead.bedrijfswebsite || "—")}`,
    `Pagina: ${esc(lead.bron)}`,
  ];
  if (lead.bericht) regels.push("", esc(lead.bericht).replace(/\n/g, "<br>"));
  return regels.join("<br>");
}

export async function createMondayItem(
  cfg: MondayConfig,
  lead: ContactLead,
  signal?: AbortSignal
): Promise<MondayItemResult> {
  const types = await kolomTypes(cfg, signal);

  const { create_item: item } = await graphql<{ create_item: { id: string; url: string } }>(
    cfg.token,
    `mutation ($board: ID!, $group: String, $name: String!, $vals: JSON) {
       create_item(board_id: $board, group_id: $group, item_name: $name,
                   column_values: $vals, create_labels_if_missing: true) { id url } }`,
    {
      board: cfg.boardId,
      group: cfg.groupId ?? null,
      name: lead.naam,
      vals: JSON.stringify(itemColumnValues(cfg, types, lead)),
    },
    signal
  );

  // Het item staat er; mislukt de update, dan is dat geen reden om de
  // inzending als mislukt te melden. De mail bevat toch alles.
  try {
    await graphql(
      cfg.token,
      `mutation ($item: ID!, $body: String!) { create_update(item_id: $item, body: $body) { id } }`,
      { item: item.id, body: updateBody(lead) },
      signal
    );
  } catch (err) {
    console.error(`monday: update op item ${item.id} mislukt`, err);
  }

  return { id: item.id, url: item.url };
}
