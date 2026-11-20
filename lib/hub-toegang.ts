/**
 * Toegang tot de gratis resources op de hub: open zodra iemand één keer zijn
 * e-mailadres achterliet. We onthouden dat op twee plaatsen, zodat het ook
 * open blijft als één van de twee gewist of geblokkeerd is:
 *
 * - localStorage `finit_hub_toegang` (sinds wanneer, en of de server het adres al heeft);
 * - een cookie `finit_hub_toegang=1` voor heel finitsolutions.be, een jaar geldig.
 *
 * Dat cookie is functioneel (het onthoudt iets wat de bezoeker zelf vroeg),
 * geen tracking. Het adres zelf blijft alleen in de browser staan zolang het
 * nog niet bij de server raakte; daarna wissen we het hier.
 */

const SLEUTEL = "finit_hub_toegang";
const COOKIE = "finit_hub_toegang";
const JAAR = 60 * 60 * 24 * 365;

interface Bewaard {
  sinds: string;
  /** Alleen zolang de server het adres nog niet heeft: dan proberen we het later opnieuw. */
  wacht?: { email: string; mails: boolean; bron: string; reel: string };
}

function lees(): Bewaard | null {
  try {
    const ruw = window.localStorage.getItem(SLEUTEL);
    return ruw ? (JSON.parse(ruw) as Bewaard) : null;
  } catch {
    return null;
  }
}

function schrijf(b: Bewaard) {
  try {
    window.localStorage.setItem(SLEUTEL, JSON.stringify(b));
  } catch {
    /* privévenster: het cookie houdt het dan bij */
  }
}

function zetCookie() {
  const veilig = window.location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${COOKIE}=1; Max-Age=${JAAR}; Path=/; SameSite=Lax${veilig}`;
}

export function heeftToegang(): boolean {
  if (lees()) return true;
  try {
    return document.cookie.split("; ").some((c) => c === `${COOKIE}=1`);
  } catch {
    return false;
  }
}

export interface Aanvraag {
  email: string;
  mails: boolean;
  bron: string;
  reel: string;
  /** Honeypot. */
  website?: string;
}

async function stuur(a: Aanvraag): Promise<"ok" | "ongeldig" | "mislukt"> {
  try {
    const res = await fetch("/api/hub-toegang", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(a),
    });
    if (res.ok) return "ok";
    if (res.status === 400) return "ongeldig";
    return "mislukt";
  } catch {
    return "mislukt";
  }
}

/**
 * Adres doorsturen en de toegang openzetten. Alleen een ongeldig adres houdt
 * het slot dicht; lukt de server even niet, dan gaat het toch open en sturen
 * we het adres bij het volgende bezoek opnieuw.
 */
export async function vraagToegang(a: Aanvraag): Promise<"ok" | "ongeldig"> {
  const uitkomst = await stuur(a);
  if (uitkomst === "ongeldig") return "ongeldig";
  const sinds = new Date().toISOString();
  schrijf(uitkomst === "ok" ? { sinds } : { sinds, wacht: { email: a.email, mails: a.mails, bron: a.bron, reel: a.reel } });
  zetCookie();
  return "ok";
}

/**
 * Bij elk bezoek van iemand met toegang: beide plaatsen weer aanvullen (en het
 * cookie verlengen), en een adres dat de vorige keer niet doorkwam opnieuw sturen.
 */
export async function bijBezoek() {
  if (!heeftToegang()) return;
  zetCookie();
  const b = lees();
  if (!b) {
    schrijf({ sinds: new Date().toISOString() });
    return;
  }
  if (!b.wacht) return;
  const uitkomst = await stuur(b.wacht);
  if (uitkomst !== "mislukt") schrijf({ sinds: b.sinds });
}
