/**
 * Seintje aan de PAPI-automaat (GitHub Actions in Finit-Solutions-BV/papi-automaat):
 * er staat een nieuwe lead in Tuesday. GitHub leest de lead zelf uit Tuesday, dus hier
 * gaat geen naam, mail of telefoon mee. Alleen sturen NA een geslaagde schrijfactie in Tuesday.
 *
 * Zonder Netlify-variabele PAPI_GITHUB_TOKEN doet dit niets. Hooguit 3 s, fouten alleen loggen:
 * de bezoeker merkt er nooit iets van. Mist het seintje, dan kijkt de automaat zelf nog periodiek.
 */
export async function papiSeintje(wie: string): Promise<void> {
  const sleutel = process.env.PAPI_GITHUB_TOKEN;
  if (!sleutel) return;
  const timer = new AbortController();
  const t = setTimeout(() => timer.abort(), 3000);
  try {
    const res = await fetch("https://api.github.com/repos/Finit-Solutions-BV/papi-automaat/dispatches", {
      method: "POST",
      signal: timer.signal,
      headers: {
        Authorization: `Bearer ${sleutel}`,
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ event_type: "nieuwe-lead" }),
    });
    if (res.status !== 204) console.error(`${wie}: PAPI-seintje gaf status`, res.status);
  } catch (err) {
    console.error(`${wie}: PAPI-seintje niet verstuurd`, err instanceof Error ? err.name : "onbekende fout");
  } finally {
    clearTimeout(t);
  }
}
