"use client";

/**
 * Wat de homepage en "Over ons" delen: de navigatie, de footer, het blok met de
 * drie oprichters, "Waarom Finit" en de logo's van wie ons steunt.
 *
 * Huisstijl: die van de live site (het hp-blok in app/globals.css en de
 * bouwstenen uit components/home/ui.tsx). Geen tekeningen.
 *
 * Op de homepage zelf (`thuis`) springen de links zacht naar een sectie; op een
 * andere pagina gaan dezelfde links naar de homepage met het anker erbij.
 */

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { ArrowRight, Building2, HeartHandshake, Mail, Menu, Phone, X, Zap } from "lucide-react";
import { CONTAINER, H3, LEAD, Onder } from "@/components/home/ui";
import { pushEvent } from "@/lib/analytics";
import { useConsent } from "@/contexts/consent-context";
import { CONTACT_EMAIL, INSTAGRAM_URL, LINKEDIN_URL, PHONE_LINK, PHONE_NUMBER, VAT_NUMBER } from "@/lib/finit-links";
import type { Copy, Taal } from "./copy";
import { EN } from "./copy.en";
import { NL } from "./copy.nl";

export const COPY: Record<Taal, Copy> = { nl: NL, en: EN };
export const HOME: Record<Taal, string> = { nl: "/", en: "/en/" };
export const OVER_ONS: Record<Taal, string> = { nl: "/over-ons/", en: "/en/about/" };
export const GRATIS: Record<Taal, string> = { nl: "/gratis-materiaal/", en: "/en/free-resources/" };
export const HUB: Record<Taal, string> = { nl: "/hub/", en: "/hub/en/" };

/** Lopende tekst in kaarten en lijsten. */
export const TEKST = "text-[1rem] leading-[1.6] text-[#3D4766]";

/**
 * Nooit één los woord op de laatste regel (Alex, 25/11): de laatste twee woorden
 * blijven samen. De browser doet dit zelf waar hij `text-wrap: pretty` kent; dit
 * is het vangnet voor de andere.
 */
export function vast(tekst: string) {
  const woorden = tekst.split(" ");
  if (woorden.length < 4) return tekst;
  const laatste = woorden.pop() as string;
  const voorlaatste = woorden[woorden.length - 1];
  if (voorlaatste.length + laatste.length > 24) return tekst; // twee lange woorden passen niet altijd naast elkaar
  return `${woorden.join(" ")} ${laatste}`;
}

/**
 * Een kop met de handgetekende streep van de huisstijl onder het einde. Standaard
 * onder het laatste woord (onder de laatste twee als dat woord heel kort is);
 * `streep` kiest zelf welk einde. Het woord ervoor blijft op dezelfde regel als
 * het past, zodat het onderstreepte stuk nooit alleen staat.
 */
export function Streep({ tekst, streep, accent = false, wit = false }: { tekst: string; streep?: string; accent?: boolean; wit?: boolean }) {
  const woorden = tekst.split(" ");
  let aantal = 1;
  if (streep && tekst.endsWith(streep)) aantal = streep.split(" ").length;
  else if (woorden.length > 2 && woorden[woorden.length - 1].length < 6) aantal = 2;
  const einde = woorden.slice(-aantal).join(" ");
  const rest = woorden.slice(0, -aantal);
  const anker = rest.length > 1 && rest[rest.length - 1].length + einde.length <= 17 ? rest.pop() : undefined;
  const onder = <Onder accent={accent} wit={wit}>{einde}</Onder>;
  return (
    <>
      {rest.join(" ")}{" "}
      {anker ? <span className="whitespace-nowrap">{anker} {onder}</span> : onder}
    </>
  );
}

/** Het plusje van een uitklapbare rij (draait naar een kruisje via hp-details). */
export function Plusje() {
  return (
    <span className="hp-plus mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#E6ECF9] text-[#1A2D63]" aria-hidden="true">
      <svg width="12" height="12" viewBox="0 0 12 12">
        <path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    </span>
  );
}

/** Zacht naar een sectie springen, behalve als de bezoeker minder beweging vroeg. */
export function naar(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const zacht = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  el.scrollIntoView({ behavior: zacht ? "smooth" : "auto", block: "start" });
  history.replaceState(null, "", `#${id}`);
}

/**
 * De links naar een sectie van de homepage. `href(id)` is het adres, `klik(id, waar)`
 * de handler: op de homepage zacht springen, elders gewoon de link volgen.
 * Het formulier (#startgesprek) telt als de ene hoofdknop en krijgt zijn eigen event.
 */
export function useSecties(taal: Taal, thuis: boolean, naKlik?: () => void) {
  const href = useCallback((id: string) => (thuis ? `#${id}` : `${HOME[taal]}#${id}`), [taal, thuis]);
  const klik = useCallback(
    (id: string, location: string) => (e: React.MouseEvent) => {
      naKlik?.();
      if (id === "startgesprek") pushEvent("cta_click", { cta_label: "startgesprek", location, taal });
      else pushEvent("nav_click", { doel: id, location, taal });
      if (!thuis) return;
      e.preventDefault();
      naar(id);
    },
    [taal, thuis, naKlik]
  );
  return { href, klik };
}

/** Wie ons steunt: het label met de drie logo's, zoals in de hero van de live site. */
export function Steun({ label, midden = false }: { label: string; midden?: boolean }) {
  return (
    <div className={midden ? "text-center" : ""}>
      <span className="text-[0.8125rem] font-medium text-[#6C7590] lg:text-[0.875rem]">{label}</span>
      <div className={`mt-2.5 flex flex-wrap items-center gap-x-7 gap-y-3 ${midden ? "justify-center" : ""}`}>
        <Image src="/VLAIO_sponsorlogo-antraciet.png" alt="VLAIO" width={400} height={120} className="hp-logo h-7 w-auto" />
        <Image src="/SI @KBC Black (2).png" alt="Start it @KBC" width={400} height={120} className="hp-logo h-7 w-auto" />
        <Image src="/elevenlabs-grants.webp" alt="ElevenLabs Grants" width={1496} height={132} className="hp-logo h-4 w-auto translate-y-[5px]" />
      </div>
    </div>
  );
}

/**
 * Navigatie zoals op de vorige homepage: vast bovenaan, doorzichtig zolang je bovenaan staat,
 * wit met een wazige rand zodra je scrolt. Logo links, de secties in het midden, de taal en de
 * amber hoofdknop rechts.
 */
export function Kop({ taal, thuis, taalPaden, actief }: { taal: Taal; thuis: boolean; taalPaden: Record<Taal, string>; actief?: "over-ons" | "gratis" }) {
  const t = COPY[taal];
  const [menuOpen, setMenuOpen] = useState(false);
  const sluit = useCallback(() => setMenuOpen(false), []);
  const { href, klik } = useSecties(taal, thuis, sluit);
  const [gescrold, setGescrold] = useState(false);

  useEffect(() => {
    const onScroll = () => setGescrold(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Het mobiele menu: de pagina erachter scrolt niet mee, Escape sluit.
  useEffect(() => {
    if (!menuOpen) return;
    document.body.style.overflow = "hidden";
    const toets = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", toets);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", toets);
    };
  }, [menuOpen]);

  return (
    <>
      <a href="#inhoud" className="nh-skip">{taal === "nl" ? "Naar de inhoud" : "Skip to content"}</a>
      <nav className="nh-nav" data-vast={gescrold || menuOpen} aria-label={taal === "nl" ? "Hoofdmenu" : "Main menu"}>
        <div className="nh-nav-rij mx-auto flex max-w-[93.33rem] items-center justify-between gap-4 px-4 sm:px-6 xl:grid xl:grid-cols-[1fr_auto_1fr]">
          <a href={HOME[taal]} aria-label="Finit Solutions" className="flex shrink-0 items-center xl:justify-self-start">
            <Image src="/Finit Logo Blue@4x.png" alt="Finit Solutions" width={424} height={120} className="nh-nav-logo w-auto" priority />
          </a>
          {/* Vanaf 1160 px: met "Company brain" erbij (26/11) past de rij niet meer op 1024 px, daaronder de menuknop. */}
          <div className="hidden items-center gap-5 whitespace-nowrap min-[1160px]:flex xl:gap-7">
            {t.nav.links.map((l) => (
              <a key={l.id} href={href(l.id)} onClick={klik(l.id, "nav")} className="nh-nav-link">{l.label}</a>
            ))}
            <a href={OVER_ONS[taal]} className="nh-nav-link" aria-current={actief === "over-ons" ? "page" : undefined}>{t.nav.overOns}</a>
            <a href={HUB[taal]} className="nh-nav-link">{t.nav.brein}</a>
            <a href={GRATIS[taal]} className="nh-nav-link" aria-current={actief === "gratis" ? "page" : undefined}>{t.gratis.nav}</a>
          </div>
          <div className="flex items-center gap-2 sm:gap-4 xl:justify-self-end">
            <div className="nh-taal" role="group" aria-label={t.nav.taalLabel}>
              {(["nl", "en"] as const).map((l) =>
                l === taal ? (
                  <span key={l} aria-current="true">{l.toUpperCase()}</span>
                ) : (
                  <a key={l} href={taalPaden[l]} hrefLang={l} lang={l} onClick={() => pushEvent("taal_wissel", { naar: l })}>
                    {l.toUpperCase()}
                  </a>
                )
              )}
            </div>
            {/* Op een telefoon staat de knop in de plakbalk onderaan en in het menu. Het uitroepteken moet: hp-btn zet zelf display. */}
            <a href={href("startgesprek")} onClick={klik("startgesprek", "nav")} className="hp-btn hp-btn--accent hp-btn--md !hidden sm:!inline-flex">
              {t.nav.cta}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
            <button
              type="button"
              className="flex h-11 w-11 items-center justify-center rounded-full text-[#1A2D63] transition-colors hover:bg-[#1A2D63]/5 min-[1160px]:hidden"
              onClick={() => setMenuOpen((v) => !v)}
              aria-expanded={menuOpen}
              aria-controls="nh-menu"
              aria-label={menuOpen ? t.nav.menuSluiten : t.nav.menuOpenen}
            >
              {menuOpen ? <X className="h-7 w-7" strokeWidth={1.75} aria-hidden="true" /> : <Menu className="h-7 w-7" strokeWidth={1.75} aria-hidden="true" />}
            </button>
          </div>
        </div>
      </nav>

      {menuOpen && (
        <div id="nh-menu" className="nh-menu min-[1160px]:hidden">
          {t.nav.links.map((l) => (
            <a key={l.id} href={href(l.id)} onClick={klik(l.id, "menu")} className="nh-menu-link">{l.label}</a>
          ))}
          <a href={OVER_ONS[taal]} className="nh-menu-link">{t.nav.overOns}</a>
          <a href={HUB[taal]} className="nh-menu-link">{t.nav.brein}</a>
          <a href={GRATIS[taal]} className="nh-menu-link">{t.gratis.nav}</a>
          <a href={href("startgesprek")} onClick={klik("startgesprek", "menu")} className="hp-btn hp-btn--accent hp-btn--lg mt-8 w-full">
            {t.nav.cta}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>
          {/* Amina's zin uit "Wie zit er achter Finit". */}
          <p className={`mt-7 ${TEKST}`}>
            {t.team.bel}{" "}
            <a href={PHONE_LINK} onClick={() => pushEvent("contact_click", { method: "phone", location: "menu" })} className="hp-link whitespace-nowrap font-semibold" translate="no">{PHONE_NUMBER}</a>
            , {t.team.belUren}
          </p>
        </div>
      )}
    </>
  );
}

/** De drie oprichters: de foto van de drie samen, wie wat doet, en het telefoonnummer. */
export function TeamBlok({ taal, location, voorrang = false }: { taal: Taal; location: string; voorrang?: boolean }) {
  const t = COPY[taal].team;
  return (
    <>
      <div className="grid gap-8 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:items-center lg:gap-12">
        <div className="hp-card overflow-hidden">
          <Image src="/home/oprichters-dichtbij.jpg" alt={t.fotoAlt} width={1360} height={935} sizes="(min-width: 1024px) 660px, 100vw" priority={voorrang} className="h-auto w-full" />
        </div>
        <div>
          <p className="text-[0.9375rem] font-semibold text-[#6C7590]">{t.intro}</p>
          <ul className="mt-2 divide-y divide-[#E3E7EF]">
            {t.mensen.map((m) => (
              <li key={m.naam} className="py-5">
                <h3 className={H3}>{m.naam}</h3>
                <p className="mt-1 text-[0.875rem] font-medium text-[#6C7590]">{m.rol}</p>
                <p className={`mt-2 ${TEKST}`}>{vast(m.tekst)}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <p className={`mx-auto mt-10 max-w-[44rem] text-center ${LEAD}`}>
        {t.bel}{" "}
        <a href={PHONE_LINK} onClick={() => pushEvent("contact_click", { method: "phone", location })} className="hp-link whitespace-nowrap font-semibold" translate="no">{PHONE_NUMBER}</a>
        , {t.belUren}
      </p>
    </>
  );
}

const WAAROM_ICOON = [Building2, Zap, HeartHandshake];

/**
 * Waarom Finit, in de vorm van de kaart "Eén partner voor al je IT" van de vorige homepage:
 * links de kop met de uitleg, rechts de drie punten als tegels met een rond icoon.
 */
export function WaaromBlok({ taal }: { taal: Taal }) {
  const t = COPY[taal].waarom;
  return (
    <div className="hp-card grid gap-8 p-6 sm:p-7 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-10 lg:p-9">
      <div className="flex flex-col justify-center">
        <h2 className={`${H3} text-[1.65rem] lg:text-[1.9rem]`}>{t.h2}</h2>
        <p className="mt-3 text-[1.0625rem] font-medium leading-[1.5] text-[#1A2D63]">{vast(t.sub)}</p>
        <p className="mt-2 text-[1rem] leading-[1.6] text-[#3D4766] lg:text-[1.0625rem]">{vast(t.intro)}</p>
      </div>
      <ul className="grid content-center gap-3">
        {t.punten.map((p, i) => {
          const Icoon = WAAROM_ICOON[i] ?? Building2;
          return (
            <li key={p.titel} className="flex items-start gap-3.5 rounded-[16px] bg-[#F5F7FB] p-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#1A2D63] text-[#E9A13B]">
                <Icoon className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <h3 className="text-[1rem] font-semibold leading-[1.35] text-[#1A2D63]">{p.titel}</h3>
                <p className="mt-0.5 text-[0.9375rem] leading-[1.5] text-[#3D4766]">{vast(p.tekst)}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/** De footer van de live site, zonder het blok met de knop: de pagina eindigt al op het formulier. */
export function Voet({ taal }: { taal: Taal }) {
  const t = COPY[taal];
  const { openSettings } = useConsent();
  return (
    <footer className="bg-[#1A2D63] text-white/75">
      <div className={`${CONTAINER} py-12 sm:py-14`}>
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <a href={HOME[taal]} aria-label="Finit Solutions" className="inline-flex">
              <Image src="/finit-logo-white.svg" alt="Finit Solutions" width={424} height={120} className="h-7 w-auto" />
            </a>
            <ul className="mt-6 space-y-3 text-[0.9375rem]">
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 shrink-0 text-white/65" aria-hidden="true" />
                <a href={PHONE_LINK} onClick={() => pushEvent("contact_click", { method: "phone", location: "footer" })} className="transition-colors hover:text-white" translate="no">{PHONE_NUMBER}</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 shrink-0 text-white/65" aria-hidden="true" />
                <a href={`mailto:${CONTACT_EMAIL}`} onClick={() => pushEvent("contact_click", { method: "email", location: "footer" })} className="transition-colors hover:text-white">{CONTACT_EMAIL}</a>
              </li>
            </ul>
          </div>
          <ul className="grid gap-x-12 gap-y-3 text-[0.9375rem] sm:grid-cols-2">
            {t.footer.video && <li><a href="/hub/" className="text-white transition-colors hover:text-white">{t.footer.video}</a></li>}
            <li><a href={OVER_ONS[taal]} className="transition-colors hover:text-white">{t.nav.overOns}</a></li>
            <li><a href={GRATIS[taal]} className="transition-colors hover:text-white">{t.gratis.nav}</a></li>
            {t.footer.links.filter((l) => !/privacy|cookie|disclaimer/.test(l.href)).map((l) => (
              <li key={l.href}><a href={l.href} className="transition-colors hover:text-white">{l.label}</a></li>
            ))}
            <li><a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-white">LinkedIn</a></li>
            <li><a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-white">Instagram</a></li>
            <li><a href="https://voicelink.me" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-white">VoiceLink</a></li>
          </ul>
        </div>

        <div className="mt-10 flex flex-col items-start gap-4 border-t border-white/10 pt-7 text-[0.8125rem] text-white/60 sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} Finit Solutions, {t.footer.btw} {VAT_NUMBER}</span>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {t.footer.links.filter((l) => /privacy|cookie|disclaimer/.test(l.href)).map((l) => (
              <a key={l.href} href={l.href} className="transition-colors hover:text-white">{l.label}</a>
            ))}
            <button type="button" onClick={openSettings} className="underline underline-offset-2 transition-colors hover:text-white">{t.footer.cookies}</button>
          </div>
        </div>
      </div>
    </footer>
  );
}
