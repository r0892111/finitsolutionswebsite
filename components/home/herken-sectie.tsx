"use client";

/**
 * "Herken jij dit?": vijf klusjes die elke zaakvoerder kent, elk met wat een
 * AI-werknemer ermee doet. Links kies je een klusje, rechts loopt de tijdlijn
 * van de AI-werknemer regel per regel in, onderaan staat wat het scheelt.
 *
 * Zonder klik wisselt het voorbeeld vanzelf; de balk bovenaan de kaart toont
 * wanneer. Die wissel pauzeert als de muis op de sectie staat of de sectie
 * buiten beeld is, stopt na een klik, en staat uit bij "minder beweging".
 *
 * Voegt de vroegere secties "Herken jij dit?" en "Wij zorgen ervoor dat AI
 * jouw werk overneemt" samen, met de tool-logo's eronder. Tekst in copy.ts.
 */

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ArrowLeftRight, ArrowRight, FileText, Globe, Mail, MessageCircle, Plus, Sparkles, User, UserCheck } from "lucide-react";
import { pushEvent } from "@/lib/analytics";
import { CTA_KENNISMAKING, HERKEN, LOGOS, type FeedRegel } from "./copy";
import { CONTAINER, H2, KOP, LEAD, LesreeksKnop, Onder } from "./ui";

/** Eén icoon per klusje, in de volgorde van HERKEN.scenarios. */
const TAB_ICONEN = [FileText, MessageCircle, Mail, UserCheck, ArrowLeftRight];

function Bolletje({ regel }: { regel: FeedRegel }) {
  const basis = "relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full";
  if (regel.wie === "ai")
    return (
      <span className={`${basis} bg-[#1A2D63]`} aria-hidden="true">
        <Sparkles className="h-4 w-4 text-white" />
      </span>
    );
  if (regel.wie === "jij")
    return (
      <span className={`${basis} border border-[#1A2D63]/15 bg-[#E6ECF9]`} aria-hidden="true">
        <User className="h-4 w-4 text-[#1A2D63]" />
      </span>
    );
  const logo = LOGOS.find((l) => l.naam === regel.tool);
  return (
    <span className={`${basis} border border-[#E3E7EF] bg-white`} aria-hidden="true">
      {logo ? <Image src={logo.src} alt="" width={32} height={32} className="h-4 w-4 object-contain" /> : <Globe className="h-4 w-4 text-[#6C7590]" />}
    </span>
  );
}

export function HerkenSectie({ onGesprek }: { onGesprek: () => void }) {
  const scenarios = HERKEN.scenarios;
  const aantal = scenarios.length;
  const [actief, setActief] = useState(0);
  /** Wisselt het voorbeeld nog vanzelf? Stopt zodra de bezoeker zelf kiest. */
  const [auto, setAuto] = useState(true);
  /** Pas na het laden weten we of de bezoeker "minder beweging" heeft ingesteld; tot dan niets automatisch. */
  const [beweging, setBeweging] = useState(false);
  const [pauze, setPauze] = useState(false);
  const [zichtbaar, setZichtbaar] = useState(false);
  const sectie = useRef<HTMLElement>(null);
  /** Per klusje twee knoppen: de lijst op desktop (index i * 2) en de chips op een telefoon (i * 2 + 1). */
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    setBeweging(!window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    const el = sectie.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setZichtbaar(e.isIntersecting), { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const kies = (i: number) => {
    setActief(i);
    setAuto(false);
    pushEvent("herken_kies", { scenario: scenarios[i].id });
  };
  const pijltjes = (e: React.KeyboardEvent, i: number) => {
    const richting = e.key === "ArrowDown" || e.key === "ArrowRight" ? 1 : e.key === "ArrowUp" || e.key === "ArrowLeft" ? -1 : 0;
    if (!richting) return;
    e.preventDefault();
    const volgende = (i + richting + aantal) % aantal;
    kies(volgende);
    tabs.current[volgende * 2]?.focus();
    tabs.current[volgende * 2 + 1]?.focus(); // de verborgen variant negeert focus
  };

  const s = scenarios[actief];
  const naamVan = (r: FeedRegel) => (r.wie === "ai" ? HERKEN.werknemer : r.wie === "jij" ? HERKEN.jij : r.tool);

  const Cta = ({ className = "" }: { className?: string }) => (
    <div className={className}>
      <p className="hp-display text-[1.45rem] font-semibold leading-tight text-[#1A2D63] sm:text-[1.6rem]">{HERKEN.overgang}</p>
      <div className="mt-4 flex flex-col items-center gap-3 sm:flex-row sm:flex-wrap lg:items-center lg:gap-x-5">
        <LesreeksKnop location="recognition" className="w-full sm:w-auto" />
        <button type="button" onClick={onGesprek} className="hp-link text-[0.9375rem] font-medium">
          {CTA_KENNISMAKING}
        </button>
      </div>
    </div>
  );

  return (
    <section ref={sectie} id="recognition" className="scroll-mt-20 bg-[#F5F7FB]">
      <div className={`${CONTAINER} pb-24 pt-16 sm:pb-28 sm:pt-20`}>
        <div className={KOP}>
          <h2 className={H2}>
            {HERKEN.h2[0]} <Onder>{HERKEN.h2[1]}</Onder>
          </h2>
          <p className={`mt-4 ${LEAD}`}>{HERKEN.intro}</p>
        </div>

        <div
          className="mt-10 grid gap-5 lg:mt-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:items-center lg:gap-10"
          onMouseEnter={() => setPauze(true)}
          onMouseLeave={() => setPauze(false)}
        >
          {/* Links: de klusjes. Op een telefoon een rij chips, op desktop een lijst met het citaat erbij. */}
          <div className="min-w-0">
            <div role="tablist" aria-label={HERKEN.tabLabel} className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1 [scrollbar-width:none] sm:-mx-8 sm:px-8 lg:hidden">
              {scenarios.map((sc, i) => {
                const Icoon = TAB_ICONEN[i] ?? FileText;
                const aan = i === actief;
                return (
                  <button
                    key={sc.id}
                    ref={(el) => { tabs.current[i * 2 + 1] = el; }}
                    type="button"
                    role="tab"
                    aria-selected={aan}
                    aria-controls="herken-paneel"
                    tabIndex={aan ? 0 : -1}
                    onClick={() => kies(i)}
                    onKeyDown={(e) => pijltjes(e, i)}
                    className={`inline-flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-[0.875rem] font-medium transition-colors ${aan ? "border-[#1A2D63] bg-[#1A2D63] text-white" : "border-[#1A2D63]/15 bg-white text-[#1A2D63]"}`}
                  >
                    <Icoon className="h-4 w-4" aria-hidden="true" />
                    {sc.label}
                  </button>
                );
              })}
            </div>

            <div role="tablist" aria-label={HERKEN.tabLabel} aria-orientation="vertical" className="hidden flex-col gap-2 lg:flex">
              {scenarios.map((sc, i) => {
                const Icoon = TAB_ICONEN[i] ?? FileText;
                const aan = i === actief;
                return (
                  <button
                    key={sc.id}
                    ref={(el) => { tabs.current[i * 2] = el; }}
                    type="button"
                    role="tab"
                    aria-selected={aan}
                    aria-controls="herken-paneel"
                    tabIndex={aan ? 0 : -1}
                    onClick={() => kies(i)}
                    onKeyDown={(e) => pijltjes(e, i)}
                    className={`flex w-full items-start gap-4 rounded-[16px] border p-4 text-left transition-[background-color,border-color,box-shadow] duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1A2D63] ${aan ? "border-[#1A2D63] bg-white shadow-[0_16px_36px_-24px_rgba(26,45,99,0.45)]" : "border-transparent hover:bg-white/70"}`}
                  >
                    <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-colors ${aan ? "bg-[#1A2D63] text-white" : "bg-[#E6ECF9] text-[#1A2D63]"}`} aria-hidden="true">
                      <Icoon className="h-[1.125rem] w-[1.125rem]" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[0.75rem] font-medium uppercase tracking-wide text-[#6C7590]">{sc.label}</span>
                      <span className={`mt-1 block text-[1.0625rem] leading-[1.45] ${aan ? "font-medium text-[#1A2D63]" : "text-[#3D4766]"}`}>&ldquo;{sc.pijn}&rdquo;</span>
                    </span>
                  </button>
                );
              })}
            </div>

            <Cta className="mt-9 hidden lg:block" />
          </div>

          {/* Rechts: wat de AI-werknemer doet, als tijdlijn. */}
          <div id="herken-paneel" role="tabpanel" aria-live="polite" className="hp-card relative overflow-hidden">
            {auto && beweging && (
              <span
                key={`balk-${actief}`}
                className="hp-voortgang"
                data-pauze={pauze || !zichtbaar}
                onAnimationEnd={() => setActief((a) => (a + 1) % aantal)}
                aria-hidden="true"
              />
            )}
            <div className="flex items-center justify-between gap-3 border-b border-[#E3E7EF] px-5 py-4 sm:px-6">
              <span className="flex min-w-0 items-center gap-2.5 text-[0.875rem] font-semibold text-[#1A2D63]">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#1A2D63]" aria-hidden="true">
                  <Sparkles className="h-3.5 w-3.5 text-white" />
                </span>
                <span className="truncate">{HERKEN.werknemer} · {s.label}</span>
              </span>
              <span className="flex shrink-0 items-center gap-2 text-[0.8125rem] text-[#6C7590]">
                <span className="hp-live" aria-hidden="true" />
                {HERKEN.live}
              </span>
            </div>

            <p className="hp-display hp-display-sm border-b border-[#E3E7EF] px-5 py-4 text-[1.125rem] font-medium leading-[1.4] text-[#1A2D63] sm:px-6 lg:hidden">&ldquo;{s.pijn}&rdquo;</p>

            <ol key={s.id} className="hp-feed relative min-h-[23rem] px-5 py-5 sm:min-h-[19.5rem] sm:px-6">
              <span className="absolute bottom-10 left-[calc(1.25rem+15.5px)] top-10 w-px bg-[#E3E7EF] sm:left-[calc(1.5rem+15.5px)]" aria-hidden="true" />
              {s.feed.map((r, i) => (
                <li key={`${s.id}-${i}`} className="relative flex gap-3.5 py-2.5" style={{ "--i": i } as React.CSSProperties}>
                  <Bolletje regel={r} />
                  <div className="min-w-0 pt-0.5">
                    <p className="text-[0.75rem] leading-none text-[#6C7590]">
                      {r.tijd} · {naamVan(r)}
                    </p>
                    <p className="mt-1.5 text-[0.9375rem] leading-[1.45] text-[#1A2D63]">{r.tekst}</p>
                  </div>
                </li>
              ))}
            </ol>

            <div className="grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-x-3 gap-y-2 border-t border-[#E3E7EF] bg-[#F5F7FB] px-5 py-4 sm:px-6">
              <div className="px-1">
                <p className="text-[0.75rem] font-medium uppercase tracking-wide text-[#6C7590]">{HERKEN.nu}</p>
                <p className="hp-display mt-1 text-[1.5rem] font-bold leading-none text-[#6C7590]">{s.winst.nu}</p>
              </div>
              <ArrowRight className="h-5 w-5 text-[#1A2D63]/40" aria-hidden="true" />
              <div className="rounded-[14px] bg-[#1A2D63] px-4 py-3 text-white">
                <p className="text-[0.75rem] font-medium uppercase tracking-wide text-white/70">{HERKEN.straks}</p>
                <p className="hp-display mt-1 text-[1.5rem] font-bold leading-none">{s.winst.straks}</p>
              </div>
              <p className="col-span-3 px-1 text-[0.8125rem] leading-[1.4] text-[#3D4766]">{s.winst.eenheid}</p>
            </div>
          </div>
        </div>

        <Cta className="mt-9 text-center lg:hidden" />

        <div className="mt-14 text-center sm:mt-16">
          <p className="text-[0.8125rem] font-medium uppercase tracking-wide text-[#6C7590]">{HERKEN.koppelingen}</p>
          <ul className="mx-auto mt-5 flex max-w-[58rem] flex-wrap justify-center gap-2.5">
            {LOGOS.map((l) => (
              <li key={l.naam} className="hp-chip">
                <Image src={l.src} alt={l.naam} width={48} height={48} className={l.woordmerk ? "h-5 w-auto" : "h-5 w-5 object-contain"} />
                {!l.woordmerk && <span>{l.naam}</span>}
              </li>
            ))}
            <li className="hp-chip hp-chip--plus">
              <Plus className="h-4 w-4" aria-hidden="true" />
              <span>{HERKEN.koppelingenPlus}</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
