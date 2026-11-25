/**
 * Gedeeld door het formulier op /cursus/ (browser) en de functie
 * /api/cursus-aanvraag (server): de groep in Tuesday en de controle op de website.
 */

/** De groep op het bord Leads › Socials in Tuesday. Tuesday zoekt een groep ook op zijn titel. */
export const CURSUS_GROEP = "Cursus (Skool)";

/** "https://www.jouwbedrijf.be/x" → "jouwbedrijf.be"; ongeldig → "". */
export function domein(url: string): string {
  try {
    return new URL(/^https?:\/\//i.test(url) ? url : `https://${url}`).hostname.replace(/^www\./i, "").toLowerCase();
  } catch {
    return "";
  }
}

/** Goed als er een echte domeinnaam in staat: "jouwbedrijf.be", met of zonder https:// en www. */
export function websiteOk(s: string): boolean {
  const t = s.trim();
  if (!t || /\s/.test(t)) return false;
  return /^[a-z0-9-]+(\.[a-z0-9-]+)*\.[a-z]{2,}$/.test(domein(t));
}
