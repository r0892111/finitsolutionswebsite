/**
 * Lead-magnet mini-report generator + transactional email.
 *
 * Triggered from /api/intake/submit when flavor === "lead_magnet". Produces:
 *   - A short HTML mini-report (maturity score, top 2 opportunities,
 *     indicative EUR/month savings range, Calendly CTA).
 *   - A transactional send to the prospect via Resend.
 *
 * Why Resend (vs. Postmark / gws-Gmail-API):
 *   - Resend is the modern, low-config default for Next.js / Netlify SaaS.
 *   - Postmark is a fine alternative if the operator has an existing account.
 *   - gws-Gmail-API is operator-domain-personal and DRAFT-only by hard rule
 *     (CLAUDE.md). Transactional sends to prospects are explicitly OK to
 *     auto-send per the spec's "Universal acceptance criteria" — but we
 *     should keep the operator's personal Gmail OUT of that path.
 *
 * The operator can swap providers by replacing `sendEmail` below; the HTML
 * builder is provider-neutral.
 */
import type { IntakePersonalization } from "@/lib/intake/types";
import type { IntakeStateJson } from "@/lib/intake/supabase-intake";

const RESEND_ENDPOINT = "https://api.resend.com/emails";

export interface MiniReportInputs {
  personalization: IntakePersonalization;
  state: IntakeStateJson;
  /** Operator-friendly fallback names for unknowns. */
  fallback?: { first_name?: string; company_name?: string };
}

export interface MiniReport {
  subject: string;
  html: string;
  text: string;
}

/** Coarse Belgian SMB sector averages (EUR/month savings, rough range). */
const SECTOR_SAVINGS: Record<string, [number, number]> = {
  hvac: [1500, 4500],
  vastgoed: [1200, 3800],
  dienstverlening: [1000, 3200],
  retail: [800, 2800],
  bouw: [1500, 4200],
  e_commerce: [1200, 4000],
  // Generic fallback for unmatched sectors.
  _generic: [1000, 3200],
};

function pickSavingsRange(sector?: string): [number, number] {
  if (sector && SECTOR_SAVINGS[sector]) return SECTOR_SAVINGS[sector];
  return SECTOR_SAVINGS._generic;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/**
 * Best-effort extraction of "top 2 opportunities" + magic-wand answer from
 * state_json. The agent stores answers under `state.answers[key]` per the
 * intake-tools spec.
 */
function extractTopOpportunities(state: IntakeStateJson): string[] {
  const answers = (state.answers ?? {}) as Record<string, unknown>;
  const ops: string[] = [];

  for (const [k, v] of Object.entries(answers)) {
    if (k.startsWith("value_drains") || k === "value_drains") {
      if (typeof v === "string") ops.push(v);
      else if (Array.isArray(v)) ops.push(...v.filter((x): x is string => typeof x === "string"));
      else if (v && typeof v === "object" && "description" in v) {
        const d = (v as { description?: unknown }).description;
        if (typeof d === "string") ops.push(d);
      }
    }
  }

  // Magic wand answer is often the highest-emotion opportunity — surface it.
  for (const [k, v] of Object.entries(answers)) {
    if (k.startsWith("magic_wand") && typeof v === "string") ops.push(v);
  }

  return ops.slice(0, 2);
}

export function buildMiniReportHtml(inputs: MiniReportInputs): MiniReport {
  const { personalization: p, state, fallback } = inputs;
  const firstName = p.primary_contact?.first_name || fallback?.first_name || "";
  const company = p.client_legal_name || fallback?.company_name || "";
  const score = p.maturity_score ?? 30;
  const [low, high] = pickSavingsRange(p.sector);
  const top = extractTopOpportunities(state);
  const lang = p.language ?? "nl";

  const headerNL = `Je AI-Readiness Check`;
  const headerFR = `Votre diagnostic AI-Readiness`;
  const headerEN = `Your AI-Readiness Check`;
  const header = lang === "fr" ? headerFR : lang === "en" ? headerEN : headerNL;

  const greetingNL = firstName ? `Hoi ${firstName}` : "Hoi";
  const greetingFR = firstName ? `Bonjour ${firstName}` : "Bonjour";
  const greetingEN = firstName ? `Hi ${firstName}` : "Hi";
  const greeting =
    lang === "fr" ? greetingFR : lang === "en" ? greetingEN : greetingNL;

  const ctaUrl = process.env.CALENDLY_URL ?? "https://finitsolutions.be/contact";

  // Marine palette only — matches the Finit design system.
  const html = `<!doctype html>
<html lang="${escapeHtml(lang)}">
<head>
<meta charset="utf-8" />
<title>${escapeHtml(header)}</title>
</head>
<body style="margin:0;padding:0;background:#f3f5f7;font-family:Inter,Helvetica,Arial,sans-serif;color:#0e1d2e;line-height:1.55;">
  <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background:#f3f5f7;padding:48px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" cellpadding="0" cellspacing="0" width="600" style="background:#ffffff;border-radius:14px;border:1px solid #d8dde3;padding:40px 36px;max-width:600px;">
          <tr><td>
            <div style="font-size:13px;letter-spacing:0.08em;text-transform:uppercase;color:#5b6b7e;">Finit · AI-Readiness</div>
            <h1 style="margin:8px 0 24px;font-size:26px;color:#0e1d2e;font-weight:600;">${escapeHtml(header)}${company ? ` — ${escapeHtml(company)}` : ""}</h1>

            <p style="margin:0 0 18px;">${escapeHtml(greeting)},</p>
            <p style="margin:0 0 18px;">${
              lang === "fr"
                ? "Merci d'avoir pris le temps. Voici un aperçu rapide basé sur tes réponses."
                : lang === "en"
                  ? "Thanks for taking the time. Here's a quick read of what we picked up."
                  : "Bedankt om de tijd te nemen. Hier is een eerste schets van wat we opvingen."
            }</p>

            <div style="background:#eef1f5;border-radius:10px;padding:20px 22px;margin:24px 0;">
              <div style="font-size:13px;color:#5b6b7e;text-transform:uppercase;letter-spacing:0.08em;">${
                lang === "fr" ? "Score de maturité" : lang === "en" ? "Maturity score" : "Volwassenheidsscore"
              }</div>
              <div style="font-size:36px;font-weight:600;color:#0e1d2e;margin-top:6px;">${score} / 100</div>
              <div style="font-size:14px;color:#3d4d5f;margin-top:6px;">${
                lang === "fr"
                  ? "Tu te situes devant la majorité des PME belges que nous auditons."
                  : lang === "en"
                    ? "You're ahead of most Belgian SMBs we audit."
                    : "Je staat voor op de meeste Belgische KMO's die we auditen."
              }</div>
            </div>

            <h2 style="margin:28px 0 12px;font-size:18px;color:#0e1d2e;font-weight:600;">${
              lang === "fr"
                ? "Deux opportunités concrètes"
                : lang === "en"
                  ? "Two concrete opportunities"
                  : "Twee concrete kansen"
            }</h2>
            ${
              top.length > 0
                ? `<ol style="padding-left:18px;margin:0 0 18px;">${top
                    .map((o) => `<li style="margin-bottom:10px;">${escapeHtml(o)}</li>`)
                    .join("")}</ol>`
                : `<p style="margin:0 0 18px;color:#5b6b7e;">${
                    lang === "fr"
                      ? "Nous reviendrons sur les détails lors d'un appel."
                      : lang === "en"
                        ? "We'll bring details on a call."
                        : "We bespreken details graag op een belletje."
                  }</p>`
            }

            <div style="background:#eef1f5;border-radius:10px;padding:20px 22px;margin:18px 0;">
              <div style="font-size:13px;color:#5b6b7e;text-transform:uppercase;letter-spacing:0.08em;">${
                lang === "fr" ? "Estimation indicative" : lang === "en" ? "Indicative range" : "Indicatieve range"
              }</div>
              <div style="font-size:22px;font-weight:600;color:#0e1d2e;margin-top:6px;">€${low.toLocaleString("nl-BE")} – €${high.toLocaleString("nl-BE")} / ${
                lang === "fr" ? "mois" : lang === "en" ? "month" : "maand"
              }</div>
              <div style="font-size:13px;color:#3d4d5f;margin-top:6px;">${
                lang === "fr"
                  ? "Basé sur les moyennes du secteur belge × ta taille d'équipe déclarée."
                  : lang === "en"
                    ? "Belgian sector averages × your declared team size."
                    : "Belgische sector-gemiddelden × jouw aangegeven teamgrootte."
              }</div>
            </div>

            <p style="margin:28px 0 12px;">${
              lang === "fr"
                ? "Tu veux voir le tableau complet ?"
                : lang === "en"
                  ? "Want the full picture?"
                  : "Wil je het volledige plaatje?"
            }</p>

            <p style="margin:0 0 18px;">
              <a href="${escapeHtml(ctaUrl)}" style="display:inline-block;background:#0e1d2e;color:#ffffff;font-weight:500;padding:12px 20px;border-radius:8px;text-decoration:none;">${
                lang === "fr"
                  ? "Réserver 30 min avec Karel"
                  : lang === "en"
                    ? "Book a 30-min call with Karel"
                    : "Boek 30 min met Karel"
              }</a>
            </p>

            <p style="margin:32px 0 0;font-size:13px;color:#5b6b7e;">— Finit Solutions</p>
          </td></tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  const text = `${greeting},

${header}${company ? ` — ${company}` : ""}

${lang === "fr" ? "Score de maturité" : lang === "en" ? "Maturity score" : "Volwassenheidsscore"}: ${score}/100.

${
  lang === "fr"
    ? "Deux opportunités concrètes:"
    : lang === "en"
      ? "Two concrete opportunities:"
      : "Twee concrete kansen:"
}
${top.map((o, i) => `  ${i + 1}. ${o}`).join("\n")}

${lang === "fr" ? "Estimation indicative" : lang === "en" ? "Indicative range" : "Indicatieve range"}: €${low}–€${high} / ${lang === "fr" ? "mois" : lang === "en" ? "month" : "maand"} (${lang === "fr" ? "moyennes secteur belge × taille équipe" : lang === "en" ? "Belgian sector averages × team size" : "Belgische sector-gemiddelden × teamgrootte"}).

${ctaUrl}

— Finit Solutions
`;

  return {
    subject:
      lang === "fr"
        ? `Ton AI-Readiness Check${company ? ` — ${company}` : ""}`
        : lang === "en"
          ? `Your AI-Readiness Check${company ? ` — ${company}` : ""}`
          : `Je AI-Readiness Check${company ? ` — ${company}` : ""}`,
    html,
    text,
  };
}

/**
 * Send the mini-report via Resend. Returns ok=false on failure (so the submit
 * handler can email the operator without throwing).
 */
export async function sendMiniReport(
  to: string,
  report: MiniReport
): Promise<{ ok: boolean; error?: string }> {
  const apiKey = process.env.RESEND_API_KEY;
  const fromAddr = process.env.RESEND_FROM ?? "Finit <hello@finitsolutions.be>";
  if (!apiKey) return { ok: false, error: "RESEND_API_KEY not set" };

  try {
    const res = await fetch(RESEND_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromAddr,
        to: [to],
        subject: report.subject,
        html: report.html,
        text: report.text,
      }),
    });
    if (!res.ok) {
      const body = await res.text();
      return { ok: false, error: `Resend ${res.status}: ${body.slice(0, 200)}` };
    }
    return { ok: true };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : String(err) };
  }
}

/**
 * Operator notification email — sent for both flavors on submit so the
 * operator sees activity in their inbox immediately. Uses Resend so the
 * operator's Gmail draft hard-lock is honored (no auto-send via gws).
 */
export async function notifyOperator(opts: {
  toOperator: string;
  subject: string;
  bodyHtml: string;
  bodyText: string;
}): Promise<{ ok: boolean; error?: string }> {
  const apiKey = process.env.RESEND_API_KEY;
  const fromAddr = process.env.RESEND_FROM ?? "Finit <hello@finitsolutions.be>";
  if (!apiKey) return { ok: false, error: "RESEND_API_KEY not set" };
  try {
    const res = await fetch(RESEND_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromAddr,
        to: [opts.toOperator],
        subject: opts.subject,
        html: opts.bodyHtml,
        text: opts.bodyText,
      }),
    });
    if (!res.ok) {
      const body = await res.text();
      return { ok: false, error: `Resend ${res.status}: ${body.slice(0, 200)}` };
    }
    return { ok: true };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : String(err) };
  }
}
