/**
 * Controles op contactgegevens, dezelfde in de browser (hubformulier) en op de
 * server (netlify/functions/contact-submit.ts).
 */

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Een telefoonnummer is goed als het alleen cijfers, spaties, +, -, ., /, ( en )
 * bevat en 9 tot 15 cijfers heeft: "03 123 45 67", "0470 12 34 56" en
 * "+32 470 12 34 56" mogen allemaal.
 */
export function telefoonOk(s: string): boolean {
  const t = s.trim();
  if (!/^\+?[\d\s().\/-]+$/.test(t)) return false;
  const cijfers = t.replace(/\D/g, "").length;
  return cijfers >= 9 && cijfers <= 15;
}

/**
 * Een website is goed als er een domeinnaam in staat: "jouwbedrijf.be",
 * "www.jouwbedrijf.be" en "https://jouwbedrijf.be/contact" mogen allemaal.
 * Verplicht op elk formulier behalve dat van de gratis resources (Alex, 25/11).
 */
export function websiteOk(s: string): boolean {
  const t = s.trim().replace(/^https?:\/\//i, "");
  return /^(?:[a-z0-9-]+\.)+[a-z]{2,}(?:[\/?#]\S*)?$/i.test(t);
}
