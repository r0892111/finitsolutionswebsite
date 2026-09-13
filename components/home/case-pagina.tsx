"use client";

/**
 * De pagina van één case: /cases/<slug>. Zelfde kop, kaarten, knoppen en
 * footer als de homepage. Opbouw zoals een blogartikel: titel en cijfers,
 * dan uitdaging, aanpak (als tijdlijn) en resultaat, met rechts een vaste
 * kolom met de feiten en de weg naar de lesreeks. Onderaan meer cases.
 * De inhoud komt uit cases.ts, de vaste teksten uit copy.ts (CASES.detail).
 */

import Image from "next/image";
import { ArrowRight, Calendar, ChevronRight } from "lucide-react";
import { ContactFormPopup, useContactForm } from "@/components/contact-form-popup";
import { pushEvent } from "@/lib/analytics";
import { CASES, CTA_KENNISMAKING, HOE } from "./copy";
import { CASE_LIJST, leestijd, logoVoor, type Case } from "./cases";
import { CaseKaart } from "./case-kaart";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";
import { CONTAINER, H3, LEAD, LesreeksKnop, Vinkje } from "./ui";

const KOP2 = "hp-display hp-display-sm text-[1.5rem] font-semibold leading-[1.2] text-[#1A2D63] sm:text-[1.75rem]";
const ALINEA = "text-[1.0625rem] leading-[1.7] text-[#3D4766]";

export function CasePagina({ c }: { c: Case }) {
  const D = CASES.detail;
  const meer = CASE_LIJST.filter((x) => x.slug !== c.slug).slice(0, 3);
  const logos = (c.tools ?? []).flatMap((naam) => {
    const l = logoVoor(naam);
    return l ? [l] : [];
  });
  const { isOpen, openForm, closeForm } = useContactForm();
  const gesprek = () => {
    openForm();
    pushEvent("cta_click", { cta_label: "case_calendly", location: `case_${c.slug}` });
  };

  return (
    <div className="hp min-h-screen bg-white text-[#3D4766]">
      <SiteHeader location={`case_${c.slug}`} />

      <main>
        {/* Titel, samenvatting en de cijfers */}
        <section className={`${CONTAINER} pb-12 pt-10 sm:pb-16 sm:pt-14`}>
          <nav aria-label="Kruimelpad" className="flex flex-wrap items-center gap-1.5 text-[0.8125rem] text-[#6C7590]">
            <a href="/" className="transition-colors hover:text-[#1A2D63]">Home</a>
            <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
            <a href="/cases" className="transition-colors hover:text-[#1A2D63]">{D.kruimel}</a>
            <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
            <span className="text-[#1A2D63]">{c.sector}</span>
          </nav>

          <div className="mt-7 flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-[#E6ECF9] px-3 py-1 text-[0.75rem] font-medium text-[#1A2D63]">{c.sector}</span>
            {c.voorbeeld && (
              <span className="rounded-full border border-[#1A2D63]/15 px-2.5 py-1 text-[0.6875rem] font-medium uppercase tracking-wide text-[#6C7590]">{CASES.voorbeeld}</span>
            )}
            <span className="rounded-full border border-[#E3E7EF] px-3 py-1 text-[0.75rem] font-medium text-[#6C7590]">
              {leestijd(c)} {CASES.minLezen}
            </span>
          </div>
          <h1 className="hp-display mt-5 max-w-[52rem] text-balance text-[2rem] font-bold leading-[1.08] text-[#1A2D63] sm:text-[2.6rem] lg:text-[3rem]">{c.titel}</h1>
          <p className={`mt-5 max-w-[44rem] ${LEAD}`}>{c.samenvatting}</p>

          <ul className="mt-9 grid gap-4 sm:grid-cols-2 lg:max-w-[52rem]">
            {c.cijfers.map((f, i) => (
              <li key={f.label} className={`rounded-[18px] p-5 sm:p-6 ${i === 0 ? "bg-[#1A2D63] text-white" : "border border-[#E3E7EF] bg-white"}`}>
                <p className={`hp-display text-[2.1rem] font-bold leading-none sm:text-[2.4rem] ${i === 0 ? "text-white" : "text-[#1A2D63]"}`}>{f.getal}</p>
                <p className={`mt-2 text-[0.9375rem] leading-[1.45] ${i === 0 ? "text-white/80" : "text-[#3D4766]"}`}>{f.label}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* Het verhaal, met rechts de feiten en de volgende stap */}
        <section className="bg-[#F5F7FB]">
          <div className={`${CONTAINER} grid gap-10 py-14 sm:py-20 lg:grid-cols-[minmax(0,7fr)_minmax(0,4fr)] lg:gap-14`}>
            <article className="min-w-0 max-w-[44rem]">
              <h2 className={KOP2}>{D.uitdaging}</h2>
              <div className="mt-4 space-y-4">
                {c.uitdaging.map((a) => (
                  <p key={a} className={ALINEA}>{a}</p>
                ))}
              </div>

              <h2 className={`mt-12 ${KOP2}`}>{D.aanpak}</h2>
              <p className={`mt-4 ${ALINEA}`}>{c.aanpak.intro}</p>
              <ol className="mt-7">
                {c.aanpak.stappen.map((st, i) => (
                  <li key={st.titel} className="relative flex gap-4 pb-7 last:pb-0">
                    {i < c.aanpak.stappen.length - 1 && <span className="absolute bottom-0 left-[15.5px] top-9 w-px bg-[#1A2D63]/15" aria-hidden="true" />}
                    <span className="hp-display relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#1A2D63] text-[0.875rem] font-bold text-white">{i + 1}</span>
                    <div className="pt-1">
                      <p className="text-[1.0625rem] font-semibold text-[#1A2D63]">{st.titel}</p>
                      <p className="mt-1 text-[1rem] leading-[1.65] text-[#3D4766]">{st.tekst}</p>
                    </div>
                  </li>
                ))}
              </ol>

              <h2 className={`mt-12 ${KOP2}`}>{D.resultaat}</h2>
              <ul className="hp-card mt-5 space-y-3 p-6 sm:p-7">
                {c.resultaat.map((r) => (
                  <li key={r} className="flex items-start gap-3 text-[1rem] font-medium leading-[1.5] text-[#1A2D63]">
                    <Vinkje />
                    <span>{r}</span>
                  </li>
                ))}
              </ul>

              {c.quote && (
                <figure className="mt-12 border-l-2 border-[#1A2D63] pl-6">
                  <blockquote className="hp-display hp-display-sm text-[1.35rem] font-medium leading-[1.4] text-[#1A2D63]">&ldquo;{c.quote.tekst}&rdquo;</blockquote>
                  <figcaption className="mt-3 text-[0.9375rem] text-[#6C7590]">{c.quote.naam}</figcaption>
                </figure>
              )}
            </article>

            <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start">
              <div className="hp-card p-6">
                <p className="text-[0.8125rem] font-semibold uppercase tracking-wide text-[#1A2D63]">{D.kort}</p>
                <dl className="mt-4 space-y-4 text-[0.9375rem]">
                  <div>
                    <dt className="text-[0.8125rem] text-[#6C7590]">{D.sector}</dt>
                    <dd className="mt-0.5 font-medium text-[#1A2D63]">{c.sector}</dd>
                  </div>
                  <div>
                    <dt className="text-[0.8125rem] text-[#6C7590]">{D.gekoppeld}</dt>
                    <dd className="mt-2 flex flex-wrap gap-2">
                      {logos.map((l) => (
                        <span key={l.naam} className="hp-chip hp-chip--klein">
                          <Image src={l.src} alt="" width={32} height={32} className={l.woordmerk ? "h-3.5 w-auto" : "h-4 w-4 object-contain"} />
                          {!l.woordmerk && l.naam}
                        </span>
                      ))}
                      {(c.koppelingen ?? []).map((k) => (
                        <span key={k} className="hp-chip hp-chip--klein">{k}</span>
                      ))}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-[0.8125rem] text-[#6C7590]">{D.leestijd}</dt>
                    <dd className="mt-0.5 font-medium text-[#1A2D63]">
                      {leestijd(c)} {CASES.minLezen}
                    </dd>
                  </div>
                </dl>
              </div>

              <div className="rounded-[20px] bg-[#1A2D63] p-6 text-white">
                <p className="hp-display hp-display-sm text-[1.3rem] font-semibold leading-[1.25]">{D.ookTitel}</p>
                <p className="mt-2 text-[0.9375rem] leading-[1.55] text-white/80">{D.ookTekst}</p>
                <ol className="mt-5 space-y-2.5 border-t border-white/15 pt-5">
                  {HOE.stappen.map((st) => (
                    <li key={st.nummer} className="flex items-baseline justify-between gap-3 text-[0.875rem]">
                      <span className="text-white/85">
                        <span className="hp-display mr-2 font-bold text-white/50">{st.nummer}</span>
                        {st.titel}
                      </span>
                      <span className="hp-display shrink-0 font-semibold text-white">{st.prijs}</span>
                    </li>
                  ))}
                </ol>
                <LesreeksKnop location={`case_${c.slug}`} size="md" className="mt-6 w-full" />
                <button type="button" onClick={gesprek} className="mt-3 flex w-full items-center justify-center gap-2 text-[0.9375rem] font-medium text-white/85 underline decoration-white/30 underline-offset-4 transition-colors hover:text-white">
                  <Calendar className="h-4 w-4" aria-hidden="true" />
                  {CTA_KENNISMAKING}
                </button>
              </div>
            </aside>
          </div>
        </section>

        {/* Meer cases */}
        <section className={`${CONTAINER} py-14 sm:py-20`}>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className={`${H3} text-[1.6rem] sm:text-[1.9rem]`}>{D.meer}</h2>
            <a href="/cases" className="hp-link inline-flex items-center gap-1.5 text-[0.9375rem] font-medium">
              {CASES.allesBekijken}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
          <ul className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {meer.map((m) => (
              <li key={m.slug}>
                <CaseKaart c={m} />
              </li>
            ))}
          </ul>
        </section>
      </main>

      <SiteFooter />
      <ContactFormPopup isOpen={isOpen} onClose={closeForm} />
    </div>
  );
}
