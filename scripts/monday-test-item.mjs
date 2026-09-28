#!/usr/bin/env node
/**
 * Test de monday-koppeling van het contactformulier zonder te deployen.
 * Gebruikt exact dezelfde code als netlify/functions/contact-submit.ts
 * (lib/monday/create-item.ts, gebundeld met esbuild).
 *
 * Leest MONDAY_* uit .env.local als die bestaat (env-variabelen die al
 * gezet zijn winnen). Gebruik, vanuit de repo-root:
 *
 *   node scripts/monday-test-item.mjs
 *     zonder MONDAY_BOARD_ID: toont alle borden met hun groepen en
 *     kolommen (id + type), om de MONDAY_*-variabelen in te vullen
 *   node scripts/monday-test-item.mjs --maak
 *     met MONDAY_BOARD_ID: maakt één testitem aan en print de link.
 *     Verwijder het item daarna op het bord.
 */
import { readFileSync, mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { pathToFileURL } from "node:url";
import { build } from "esbuild";

// .env.local inlezen zonder dependency: KEY=waarde per regel, # is commentaar.
try {
  for (const regel of readFileSync(".env.local", "utf8").split("\n")) {
    const m = regel.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*?)\s*$/);
    if (m && !(m[1] in process.env)) process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
  }
} catch {
  /* geen .env.local, dan enkel echte env-variabelen */
}

const outfile = join(mkdtempSync(join(tmpdir(), "monday-")), "create-item.mjs");
await build({
  entryPoints: ["lib/monday/create-item.ts"],
  bundle: true,
  platform: "node",
  format: "esm",
  outfile,
  logLevel: "warning",
});
const { listBoards, mondayConfigFromEnv, createMondayItem } = await import(pathToFileURL(outfile));

const token = process.env.MONDAY_API_TOKEN;
if (!token) {
  console.error("Zet MONDAY_API_TOKEN (monday → profielfoto → Developers → My access tokens).");
  process.exit(1);
}

const cfg = mondayConfigFromEnv();
if (!cfg || !process.argv.includes("--maak")) {
  if (!cfg) console.log("Geen MONDAY_BOARD_ID: hieronder alle borden om er een te kiezen.\n");
  for (const bord of await listBoards(token)) {
    console.log(`Bord ${bord.id}: ${bord.name}`);
    for (const g of bord.groups) console.log(`  groep  ${g.id.padEnd(22)} ${g.title}`);
    for (const c of bord.columns) console.log(`  kolom  ${c.id.padEnd(22)} ${c.type.padEnd(12)} ${c.title}`);
    console.log();
  }
  if (cfg) console.log("Voeg --maak toe om een testitem aan te maken op bord", cfg.boardId);
  process.exit(0);
}

const item = await createMondayItem(cfg, {
  naam: "TEST via website: contactformulier",
  email: "test@example.com",
  telefoon: "0495 70 23 14",
  bedrijfswebsite: "example.com",
  bericht: "Testitem vanuit scripts/monday-test-item.mjs.\nMag weg.",
  bron: "https://finitsolutions.be/",
});
console.log(`Item aangemaakt: ${item.url}`);
