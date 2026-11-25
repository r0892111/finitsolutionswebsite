"use client";

/**
 * Wat de homepage en "Over ons" delen: de navigatie, de footer, het blok met de
 * drie oprichters, "Waarom Finit" en de logo's van wie ons steunt.
 *
 * Op de homepage zelf (`thuis`) springen de links zacht naar een sectie; op een
 * andere pagina gaan dezelfde links naar de homepage met het anker erbij.
 */

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { pushEvent } from "@/lib/analytics";
import { useConsent } from "@/contexts/consent-context";
import { CONTACT_EMAIL, INSTAGRAM_URL, LINKEDIN_URL, PHONE_LINK, PHONE_NUMBER, VAT_NUMBER } from "@/lib/finit-links";
import type { Copy, Taal } from "./copy";
import { EN } from "./copy.en";
import { NL } from "./copy.nl";

export const COPY: Record<Taal, Copy> = { nl: NL, en: EN };
export const HOME: Record<Taal, string> = { nl: "/", en: "/en/" };
export const OVER_ONS: Record<Taal, string> = { nl: "/over-ons/", en: "/en/about/" };

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
 * Het startgesprek (#startgesprek) telt als de ene knop en krijgt zijn eigen event.
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

export function Steun({ label }: { label: string }) {
  return (
    <div className="nh-steun">
      <p className="nh-klein">{label}</p>
      <Image src="/VLAIO_sponsorlogo-antraciet.png" alt="VLAIO" width={400} height={120} />
      <Image src="/SI @KBC Black (2).png" alt="Start it @KBC" width={400} height={120} />
      <Image src="/elevenlabs-grants.webp" alt="ElevenLabs Grants" width={1496} height={132} className="nh-steun-smal" />
    </div>
  );
}

/** Navigatie: vast, wit, één lijn, de ene gevulde knop rechts. */
export function Kop({ taal, thuis, taalPaden, actief }: { taal: Taal; thuis: boolean; taalPaden: Record<Taal, string>; actief?: "over-ons" }) {
  const t = COPY[taal];
  const [menuOpen, setMenuOpen] = useState(false);
  const sluit = useCallback(() => setMenuOpen(false), []);
  const { href, klik } = useSecties(taal, thuis, sluit);

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
      <nav className="nh-nav" aria-label={taal === "nl" ? "Hoofdmenu" : "Main menu"}>
        <div className="nh-wrap nh-nav-rij">
          <a href={HOME[taal]} aria-label="Finit Solutions" className="flex shrink-0 items-center">
            <Image src="/Finit Logo Blue@4x.png" alt="Finit Solutions" width={424} height={120} className="h-7 w-auto lg:h-8" priority />
          </a>
          <div className="nh-nav-links">
            {t.nav.links.map((l) => (
              <a key={l.id} href={href(l.id)} onClick={klik(l.id, "nav")} className="nh-nav-link">{l.label}</a>
            ))}
            <a href={OVER_ONS[taal]} className="nh-nav-link" aria-current={actief === "over-ons" ? "page" : undefined}>{t.nav.overOns}</a>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
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
            <a href={href("startgesprek")} onClick={klik("startgesprek", "nav")} className="nh-knop nh-knop--klein nh-nav-knop">{t.nav.cta}</a>
            <button type="button" className="nh-menuknop" onClick={() => setMenuOpen((v) => !v)} aria-expanded={menuOpen} aria-controls="nh-menu" aria-label={menuOpen ? t.nav.menuSluiten : t.nav.menuOpenen}>
              {menuOpen ? <X className="h-7 w-7" strokeWidth={1.75} aria-hidden="true" /> : <Menu className="h-7 w-7" strokeWidth={1.75} aria-hidden="true" />}
            </button>
          </div>
        </div>
      </nav>

      {menuOpen && (
        <div id="nh-menu" className="nh-menu">
          {t.nav.links.map((l) => (
            <a key={l.id} href={href(l.id)} onClick={klik(l.id, "menu")} className="nh-menu-link">{l.label}</a>
          ))}
          <a href={OVER_ONS[taal]} className="nh-menu-link">{t.nav.overOns}</a>
          <a href={href("startgesprek")} onClick={klik("startgesprek", "menu")} className="nh-knop mt-8 w-full">{t.nav.cta}</a>
          {/* Amina's zin uit "Wie zit er achter Finit". */}
          <p className="mt-8">
            {t.team.bel}{" "}
            <a href={PHONE_LINK} onClick={() => pushEvent("contact_click", { method: "phone", location: "menu" })} className="nh-link whitespace-nowrap" translate="no">{PHONE_NUMBER}</a>
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
      <div className="nh-team">
        <figure>
          <div className="nh-foto">
            <Image src="/home/oprichters-beurs.jpg" alt={t.fotoAlt} width={2000} height={1506} sizes="(min-width: 1024px) 660px, 100vw" priority={voorrang} />
          </div>
        </figure>
        <div>
          <p className="nh-klein mb-4 font-semibold">{t.intro}</p>
          <ul>
            {t.mensen.map((m) => (
              <li key={m.naam} className="nh-mens">
                <h3 className="nh-h3">{m.naam}</h3>
                <p className="nh-klein mt-1 font-semibold">{m.rol}</p>
                <p className="mt-2 text-[1rem] leading-[1.6]">{m.tekst}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <p className="nh-sub mt-12 !max-w-none">
        {t.bel}{" "}
        <a href={PHONE_LINK} onClick={() => pushEvent("contact_click", { method: "phone", location })} className="nh-link whitespace-nowrap" translate="no">{PHONE_NUMBER}</a>
        , {t.belUren}
      </p>
    </>
  );
}

/** Waarom Finit: de drie punten, kop links en uitleg rechts. */
export function WaaromBlok({ taal }: { taal: Taal }) {
  const t = COPY[taal].waarom;
  return (
    <>
      <h2 className="nh-h2 max-w-[20em]">{t.h2}</h2>
      <p className="nh-sub mt-5">{t.sub}</p>
      <p className="nh-tekst mt-5">{t.intro}</p>
      <ul className="nh-rijen mt-12 lg:mt-16">
        {t.punten.map((p) => (
          <li key={p.titel} className="nh-paar">
            <h3 className="nh-h3">{p.titel}</h3>
            <p className="max-w-[36em]">{p.tekst}</p>
          </li>
        ))}
      </ul>
    </>
  );
}

/** `los`: met ruimte erboven, voor een pagina die niet op een gekleurde band eindigt. */
export function Voet({ taal, los = false }: { taal: Taal; los?: boolean }) {
  const t = COPY[taal];
  const { openSettings } = useConsent();
  return (
    <footer className={`nh-footer ${los ? "nh-footer--los" : ""}`}>
      <div className="nh-wrap py-12">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <a href={HOME[taal]} aria-label="Finit Solutions" className="inline-flex">
              <Image src="/finit-logo-white.svg" alt="Finit Solutions" width={424} height={120} className="h-7 w-auto" />
            </a>
            <ul className="mt-6 space-y-1">
              <li><a href={PHONE_LINK} className="inline-flex min-h-[40px] items-center">{PHONE_NUMBER}</a></li>
              <li><a href={`mailto:${CONTACT_EMAIL}`} className="inline-flex min-h-[40px] items-center">{CONTACT_EMAIL}</a></li>
            </ul>
          </div>
          <ul className="grid gap-x-12 gap-y-1 sm:grid-cols-2">
            <li><a href="/hub/" className="inline-flex min-h-[40px] items-center text-white">{t.footer.video}</a></li>
            <li><a href={OVER_ONS[taal]} className="inline-flex min-h-[40px] items-center">{t.nav.overOns}</a></li>
            {t.footer.links.map((l) => (
              <li key={l.href}><a href={l.href} className="inline-flex min-h-[40px] items-center">{l.label}</a></li>
            ))}
            <li><a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-[40px] items-center">LinkedIn</a></li>
            <li><a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-[40px] items-center">Instagram</a></li>
            <li><a href="https://voicelink.me" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-[40px] items-center">VoiceLink</a></li>
            <li><button type="button" onClick={openSettings} className="inline-flex min-h-[40px] items-center text-left">{t.footer.cookies}</button></li>
          </ul>
        </div>
        <p className="mt-10 border-t border-white/10 pt-6 text-[0.9375rem] text-white/60">
          © {new Date().getFullYear()} Finit Solutions, {t.footer.btw} {VAT_NUMBER}
        </p>
      </div>
    </footer>
  );
}
