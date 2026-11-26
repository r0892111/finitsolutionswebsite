/**
 * Tuesday (crm.finitsolutions.be), het eigen CRM van Finit. De formulieren van de
 * site sturen hier hun inzendingen naartoe, naast de mail en monday.
 *
 * Eén sleutel voor alle borden van de website (gebruiker "Website (formulieren)":
 * Socials, Content en Applications). In Netlify heet hij CRM_API_TOKEN, of nog
 * CRM_SOCIALS_TOKEN (de eerste naam). Nooit loggen, nooit naar de browser.
 *
 * Mislukt Tuesday, dan merkt de bezoeker niets: de functies loggen alleen de
 * status of de soort fout, zonder persoonsgegevens en zonder sleutel.
 */
const BASIS = "https://crm.finitsolutions.be/api";
// De browser wacht maximaal 10 s, en mail en monday moeten nog kunnen.
const TIMEOUT_MS = 5000;

export type TuesdayStatus = "off" | "ok" | "failed";

/** De borden en routes die de website gebruikt. */
export const TUESDAY = {
  socials: "/boards/90000000549/items",
  applications: "/boards/90000000018/items",
  /** Jords route voor websiteleads: schrijft naar Content, regelt status en dubbels (10 min). */
  websiteLead: "/intake/website-lead",
} as const;

// ?bron= uit de link naar het label van de keuzelijst "Source" op Socials.
const KANALEN: Record<string, string> = {
  tiktok: "TikTok",
  instagram: "Instagram",
  ig: "Instagram",
  youtube: "YouTube",
  yt: "YouTube",
  linkedin: "LinkedIn",
  facebook: "Facebook",
  fb: "Facebook",
  x: "X",
  twitter: "X",
  threads: "Threads",
};

export function kanaalLabel(slug: string): string {
  if (!slug || slug === "direct") return "Website";
  return KANALEN[slug] ?? "Other";
}

export function tuesdaySleutel(): string | undefined {
  return process.env.CRM_API_TOKEN ?? process.env.CRM_SOCIALS_TOKEN;
}

/** POST naar Tuesday. "off" zonder sleutel; nooit een uitzondering. `wie` staat in de log. */
export async function naarTuesday(pad: string, body: unknown, wie: string): Promise<TuesdayStatus> {
  const sleutel = tuesdaySleutel();
  if (!sleutel) return "off";
  const timer = new AbortController();
  const timeout = setTimeout(() => timer.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(`${BASIS}${pad}`, {
      method: "POST",
      headers: { Authorization: `Bearer ${sleutel}`, "Content-Type": "application/json" },
      body: JSON.stringify(body),
      signal: timer.signal,
    });
    if (!res.ok) {
      console.error(`${wie}: Tuesday gaf status`, res.status);
      return "failed";
    }
    return "ok";
  } catch (err) {
    console.error(`${wie}: Tuesday niet bereikt`, err instanceof Error ? err.name : "onbekende fout");
    return "failed";
  } finally {
    clearTimeout(timeout);
  }
}
