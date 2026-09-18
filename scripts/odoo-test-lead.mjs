#!/usr/bin/env node
/**
 * Test de Odoo-koppeling van het contactformulier zonder te deployen.
 * Maakt één testlead aan met dezelfde JSON-RPC-calls als
 * netlify/functions/contact-submit.ts en print de link.
 *
 * Gebruik (vanuit de repo-root, Node 18 of hoger):
 *   ODOO_URL=https://bedrijf.odoo.com ODOO_DB=bedrijf \
 *   ODOO_LOGIN=alex@finitsolutions.be ODOO_API_KEY=... \
 *   node scripts/odoo-test-lead.mjs
 *
 * Verwijder de testlead daarna in Odoo.
 */

const url = (process.env.ODOO_URL ?? "").replace(/\/+$/, "");
const db = process.env.ODOO_DB ?? "";
const login = process.env.ODOO_LOGIN ?? "";
const apiKey = process.env.ODOO_API_KEY ?? "";
const leadType = process.env.ODOO_LEAD_TYPE === "lead" ? "lead" : "opportunity";

if (!url || !db || !login || !apiKey) {
  console.error("Zet ODOO_URL, ODOO_DB, ODOO_LOGIN en ODOO_API_KEY als env-variabelen.");
  process.exit(1);
}

async function rpc(service, method, args) {
  const res = await fetch(`${url}/jsonrpc`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ jsonrpc: "2.0", method: "call", id: 1, params: { service, method, args } }),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data = await res.json();
  if (data.error) throw new Error(data.error.data?.message || data.error.message);
  return data.result;
}

const uid = await rpc("common", "login", [db, login, apiKey]);
if (!uid) {
  console.error("Login geweigerd: controleer db, login en API-sleutel.");
  process.exit(1);
}
console.log(`Ingelogd als uid ${uid}`);

const id = await rpc("object", "execute_kw", [
  db,
  uid,
  apiKey,
  "crm.lead",
  "create",
  [
    {
      name: "TEST via website: contactformulier",
      type: leadType,
      contact_name: "Testpersoon",
      email_from: "test@example.com",
      phone: "+32 400 00 00 00",
      website: "https://example.com",
      description: "<p>Testlead vanuit scripts/odoo-test-lead.mjs. Mag weg.</p>",
    },
  ],
]);

console.log(`Lead aangemaakt: ${url}/web#id=${id}&model=crm.lead&view_type=form`);
