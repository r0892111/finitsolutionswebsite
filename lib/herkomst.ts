/**
 * De herkomst van een bezoek: via welk kanaal en welke post of advertentie iemand binnenkwam.
 * Eén plek voor de hele site (26/11, voor de advertenties op Meta), zodat elke lead zijn bron
 * houdt, ook als die eerst op de homepage landt en pas later een formulier invult.
 *
 * Wat we lezen, alleen uit de eerste link van het bezoek:
 * - `bron`: ?bron= (onze eigen links), anders utm_source, anders "meta" bij een fbclid,
 *   "google" bij een gclid, anders het kanaal van de vorige site (Instagram, LinkedIn, …),
 *   anders "direct";
 * - `reel`: ?reel=, anders utm_content als dat op een postcode lijkt (R012, C03);
 * - de volledige eerste URL (`landing`) en de utm-velden, voor Tuesday en de mail.
 *
 * De eerste herkomst van het bezoek blijft gelden (zoals de hub het al deed). Alleen wie
 * eerst rechtstreeks binnenkwam en daarna via een link met een bron, krijgt die bron.
 *
 * Bewaard in sessionStorage (`finit_herkomst`): weg zodra het tabblad sluit. Geen cookie,
 * geen localStorage. Alleen in de browser gebruiken: in een useEffect of bij het versturen.
 */
import { getStoredConsent } from "./consent";

export interface Herkomst {
  /** Het kanaal als korte slug: instagram, meta, google, direct, … */
  bron: string;
  /** De code van de post of advertentie (R012), of leeg. */
  reel: string;
  /** De eerste URL van dit bezoek, met alle parameters. */
  landing: string;
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_content: string;
  utm_term: string;
  /** De klik-id van Meta, om _fbc te maken als die cookie er nog niet is. */
  fbclid: string;
  /** Wanneer we dit bezoek voor het eerst zagen (ms). */
  sinds: number;
}

const OPSLAG = "finit_herkomst";
// Van voor 26/11: de hub bewaarde zijn eigen herkomst. Wie de hub nog open had, verliest ze niet.
const OUDE_HUB_OPSLAG = "finit_hub_herkomst";
const BEDANKT_OPSLAG = "finit_lead_event";

/** De vorige site naar ons kanaal. */
const VERWIJZERS: Array<[RegExp, string]> = [
  [/(^|\.)instagram\.com$/, "instagram"],
  [/(^|\.)(facebook\.com|fb\.com|fb\.me)$/, "facebook"],
  [/(^|\.)(linkedin\.com|lnkd\.in)$/, "linkedin"],
  [/(^|\.)tiktok\.com$/, "tiktok"],
  [/(^|\.)(youtube\.com|youtu\.be)$/, "youtube"],
  [/(^|\.)google\.[a-z.]+$/, "google"],
  [/(^|\.)(x\.com|twitter\.com|t\.co)$/, "x"],
  [/(^|\.)threads\.(net|com)$/, "threads"],
];

/** Alleen kleine letters, cijfers, - en _: zo kan er niets vreemds in een link of mail belanden. */
function slug(v: unknown, max: number): string {
  return typeof v === "string" ? v.toLowerCase().replace(/[^a-z0-9_-]/g, "").slice(0, max) : "";
}

/** Een utm-veld: één regel, zonder tekens die in HTML iets betekenen. */
function utm(v: unknown): string {
  return typeof v === "string" ? v.replace(/[\u0000-\u001f\u007f<>"'`]/g, "").replace(/\s+/g, " ").trim().slice(0, 100) : "";
}

/** Maakt een herkomst (uit de link of uit de opslag) netjes en kort. */
function opgekuist(r: Record<string, unknown>): Herkomst {
  const landing = typeof r.landing === "string" && /^https?:\/\//i.test(r.landing) ? r.landing.slice(0, 500) : "";
  return {
    bron: slug(r.bron, 40) || "direct",
    reel: slug(r.reel, 12).toUpperCase(),
    landing,
    utm_source: utm(r.utm_source),
    utm_medium: utm(r.utm_medium),
    utm_campaign: utm(r.utm_campaign),
    utm_content: utm(r.utm_content),
    utm_term: utm(r.utm_term),
    fbclid: typeof r.fbclid === "string" ? r.fbclid.replace(/[^A-Za-z0-9_-]/g, "").slice(0, 500) : "",
    sinds: typeof r.sinds === "number" && Number.isFinite(r.sinds) ? r.sinds : Date.now(),
  };
}

function uitVerwijzer(): string {
  try {
    const host = new URL(document.referrer).hostname.toLowerCase();
    if (host === window.location.hostname) return "";
    return VERWIJZERS.find(([re]) => re.test(host))?.[1] ?? "";
  } catch {
    return ""; // geen vorige site
  }
}

/** De herkomst zoals de huidige link ze geeft. */
function uitDezeLink(): Herkomst {
  const p = new URLSearchParams(window.location.search);
  const fbclid = p.get("fbclid") ?? "";
  const inhoud = p.get("utm_content") ?? "";
  return opgekuist({
    bron:
      slug(p.get("bron"), 40) ||
      slug(p.get("utm_source"), 40) ||
      (fbclid ? "meta" : "") ||
      (p.get("gclid") ? "google" : "") ||
      uitVerwijzer(),
    reel: slug(p.get("reel"), 12) || (/^[a-z][0-9]{1,11}$/i.test(inhoud) ? inhoud : ""),
    landing: window.location.href,
    utm_source: p.get("utm_source"),
    utm_medium: p.get("utm_medium"),
    utm_campaign: p.get("utm_campaign"),
    utm_content: inhoud,
    utm_term: p.get("utm_term"),
    fbclid,
    sinds: Date.now(),
  });
}

function uitOpslag(): Herkomst | null {
  try {
    const bewaard = JSON.parse(sessionStorage.getItem(OPSLAG) ?? "null") as Record<string, unknown> | null;
    if (bewaard && typeof bewaard === "object") return opgekuist(bewaard);
    const oud = JSON.parse(sessionStorage.getItem(OUDE_HUB_OPSLAG) ?? "null") as Record<string, unknown> | null;
    if (oud && typeof oud === "object" && slug(oud.bron, 40)) return opgekuist({ bron: oud.bron, reel: oud.reel });
  } catch {
    /* geen opslag (privévenster, geblokkeerd): dan geldt het geheugen hieronder */
  }
  return null;
}

// Voor als sessionStorage niet werkt: dan onthouden we het zolang de pagina open is.
let geheugen: Herkomst | null = null;

/** De herkomst van dit bezoek. De eerste keer wordt ze vastgelegd, daarna komt telkens dezelfde terug. */
export function leesHerkomst(): Herkomst {
  const nu = uitDezeLink();
  let eerste = geheugen ?? uitOpslag();
  if (!eerste || (eerste.bron === "direct" && nu.bron !== "direct")) {
    eerste = nu;
    try {
      sessionStorage.setItem(OPSLAG, JSON.stringify(nu));
    } catch {
      /* geen opslag */
    }
  }
  geheugen = eerste;
  return eerste;
}

/** Eén cookie uitlezen, of leeg. */
function cookie(naam: string): string {
  const m = document.cookie.match(new RegExp(`(?:^|; )${naam}=([^;]*)`));
  return m ? m[1].slice(0, 500) : "";
}

/**
 * Wat elk leadformulier meestuurt naast zijn eigen velden: de eerste URL als `pagina`, de
 * herkomst, en de signalen voor Meta (zie lib/meta-capi.ts). `eventId` is het aanvraag_id
 * van het formulier: hetzelfde bij opnieuw proberen, zodat Meta een aanvraag nooit dubbel telt.
 * Het formulier zet hetzelfde id in `form_submitted`, zodat de pixel en de server samenvallen.
 */
export function leadVelden(eventId: string) {
  const h = leesHerkomst();
  const marketing = getStoredConsent()?.choices.marketing === true;
  // De cookies van Meta gaan alleen mee met toestemming voor marketing.
  const fbp = marketing ? cookie("_fbp") : "";
  // Nog geen _fbc (de pixel laadde nog niet), wel een klik op een advertentie: zelf maken zoals Meta het voorschrijft.
  const fbc = marketing ? cookie("_fbc") || (h.fbclid ? `fb.1.${h.sinds}.${h.fbclid}` : "") : "";
  return {
    pagina: h.landing || window.location.href.slice(0, 500),
    herkomst: {
      bron: h.bron,
      reel: h.reel,
      utm_source: h.utm_source,
      utm_medium: h.utm_medium,
      utm_campaign: h.utm_campaign,
      utm_content: h.utm_content,
    },
    event_id: eventId,
    toestemming_marketing: marketing,
    ...(fbp ? { fbp } : {}),
    ...(fbc ? { fbc } : {}),
  };
}

/**
 * De popup stuurt na het versturen door naar /bedankt, en pas daar vertrekt `form_submitted`.
 * Zo krijgt die hetzelfde event_id mee. Eén keer te lezen.
 */
export function geefLeadDoor(eventId: string): void {
  try {
    sessionStorage.setItem(BEDANKT_OPSLAG, eventId);
  } catch {
    /* geen opslag: dan gaat form_submitted zonder event_id */
  }
}

export function neemLeadOver(): string {
  try {
    const id = sessionStorage.getItem(BEDANKT_OPSLAG) ?? "";
    sessionStorage.removeItem(BEDANKT_OPSLAG);
    return id.replace(/[^A-Za-z0-9-]/g, "").slice(0, 64);
  } catch {
    return "";
  }
}
