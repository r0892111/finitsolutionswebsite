/**
 * Seintje aan de PAPI-automaat: start de workflow papi.yml in Finit-Solutions-BV/papi-automaat
 * (de sleutel mag alleen workflows starten, geen code wijzigen):
 * er staat een nieuwe lead in Tuesday. GitHub leest de lead zelf uit Tuesday, dus hier
 * gaat geen naam, mail of telefoon mee. Alleen sturen NA een geslaagde schrijfactie in Tuesday.
 *
 * Zonder Netlify-variabele PAPI_GITHUB_TOKEN doet dit niets ("off"). Elke poging duurt
 * hooguit 2,5 s; mislukt de eerste, dan nog één keer. Fouten worden alleen gelogd en
 * komen als regel in de mail naar contact@ ("failed"): de bezoeker merkt er nooit iets van.
 */
export type PapiStatus = "off" | "ok" | "failed";

async function poging(sleutel: string): Promise<number | string> {
  const timer = new AbortController();
  const t = setTimeout(() => timer.abort(), 2500);
  try {
    const res = await fetch("https://api.github.com/repos/Finit-Solutions-BV/papi-automaat/actions/workflows/papi.yml/dispatches", {
      method: "POST",
      signal: timer.signal,
      headers: {
        Authorization: `Bearer ${sleutel}`,
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ref: "main" }),
    });
    return res.status;
  } catch (err) {
    return err instanceof Error ? err.name : "onbekende fout";
  } finally {
    clearTimeout(t);
  }
}

export async function papiSeintje(wie: string): Promise<PapiStatus> {
  const sleutel = process.env.PAPI_GITHUB_TOKEN;
  if (!sleutel) return "off";
  for (let i = 1; i <= 2; i++) {
    const uit = await poging(sleutel);
    if (uit === 204) return "ok";
    console.error(`${wie}: PAPI-seintje poging ${i} gaf`, uit);
  }
  return "failed";
}
