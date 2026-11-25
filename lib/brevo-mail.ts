/**
 * Eén mail naar contact@ via de Brevo API, voor de formulierfuncties. Hooguit 4 s:
 * de bezoeker mag nooit wachten op een trage mailserver. Geeft true als Brevo de mail
 * aannam; fouten worden gelogd zonder persoonsgegevens en zonder sleutel.
 *
 * Env: BREVO_API_KEY (verplicht), CONTACT_TO_EMAIL en CONTACT_FROM_EMAIL (optioneel).
 */
const BREVO_ENDPOINT = "https://api.brevo.com/v3/smtp/email";
const TIMEOUT_MS = 4000;

export const TO_EMAIL = process.env.CONTACT_TO_EMAIL || "contact@finitsolutions.be";
const FROM_EMAIL = process.env.CONTACT_FROM_EMAIL || "alex@finitsolutions.be";

export async function mailNaarContact(
  m: { onderwerp: string; html: string; antwoordAan?: { email: string; naam: string } },
  wie: string
): Promise<boolean> {
  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) {
    console.error(`${wie}: BREVO_API_KEY ontbreekt`);
    return false;
  }
  const timer = new AbortController();
  const t = setTimeout(() => timer.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(BREVO_ENDPOINT, {
      method: "POST",
      signal: timer.signal,
      headers: { "api-key": apiKey, "Content-Type": "application/json", accept: "application/json" },
      body: JSON.stringify({
        sender: { name: "Finit website", email: FROM_EMAIL },
        to: [{ email: TO_EMAIL }],
        // Antwoorden gaat rechtstreeks naar de lead.
        ...(m.antwoordAan ? { replyTo: { email: m.antwoordAan.email, name: m.antwoordAan.naam } } : {}),
        subject: m.onderwerp,
        htmlContent: m.html,
      }),
    });
    if (!res.ok) {
      console.error(`${wie}: Brevo gaf`, res.status);
      return false;
    }
    return true;
  } catch (err) {
    console.error(`${wie}: Brevo niet bereikt`, err instanceof Error ? err.name : "onbekende fout");
    return false;
  } finally {
    clearTimeout(t);
  }
}

/** Alles wat de bezoeker intypt komt in de mail: escapen houdt de HTML heel. */
export function esc(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

/** De regel over de PAPI onderaan de mail. */
export function papiRegel(status: "off" | "ok" | "failed" | "overgeslagen"): string {
  if (status === "failed")
    return `<p style="margin:8px 0 0;font-size:14px;color:#b45309">PAPI: het seintje aan GitHub mislukte (twee keer). Start de PAPI voor deze lead manueel.</p>`;
  if (status === "overgeslagen")
    return `<p style="margin:8px 0 0;font-size:14px;color:#6C7590">PAPI: geen nieuw seintje, er vertrok vandaag al een voor dit e-mailadres.</p>`;
  return "";
}
