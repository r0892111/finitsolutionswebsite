/**
 * Maakt de ondertitels van de VSL op de hub uit een transcript met woordtijden.
 *
 *   node scripts/hub/ondertitels.mjs [transcript.json] [uit.json]
 *
 * In:  [{ "text": "Ben", "start": 0.14, "end": 0.26 }, ...] (zoals de transcripts
 *      van de motion-studio, ~/Skool/motion-studio/projects/vslfinit/transcript.json).
 * Uit: public/hub/vsl/ondertitels.json, korte regels van een paar woorden:
 *      [[start, eind, [["Ben", 0.14, 0.26], ...]], ...]
 *
 * Een nieuwe regel begint na een punt, vraag- of uitroepteken, na een pauze,
 * of als de regel te lang wordt. Draai dit opnieuw zodra de video verandert.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { homedir } from "node:os";

const IN = process.argv[2] ?? `${homedir()}/Skool/motion-studio/projects/vslfinit/transcript.json`;
const UIT = process.argv[3] ?? "public/hub/vsl/ondertitels.json";
const MAX_WOORDEN = 5;
const MAX_TEKENS = 30;
const PAUZE = 0.6;

const r2 = (n) => Math.round(n * 100) / 100;
const woorden = JSON.parse(readFileSync(IN, "utf8")).filter((w) => w && typeof w.text === "string" && w.text.trim());

// Wat de transcriptie verkeerd verstaat. "Finish Solutions" moet "Finit Solutions" zijn.
woorden.forEach((w, i) => {
  if (w.text.trim() === "Finish" && woorden[i + 1]?.text.trim().startsWith("Solutions")) w.text = "Finit";
});

const regels = [];
let regel = [];
const sluit = () => {
  if (regel.length) regels.push([r2(regel[0][1]), r2(regel[regel.length - 1][2]), regel]);
  regel = [];
};

for (const w of woorden) {
  const tekst = w.text.trim();
  const vorige = regel[regel.length - 1];
  const lengte = regel.reduce((n, [t]) => n + t.length + 1, 0) + tekst.length;
  if (vorige && (w.start - vorige[2] > PAUZE || regel.length >= MAX_WOORDEN || lengte > MAX_TEKENS)) sluit();
  regel.push([tekst, r2(w.start), r2(w.end)]);
  if (/[.?!]$/.test(tekst)) sluit();
}
sluit();

writeFileSync(UIT, JSON.stringify(regels));
console.log(`${woorden.length} woorden → ${regels.length} regels → ${UIT}`);
