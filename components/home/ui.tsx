"use client";

/**
 * De bouwstenen van de nieuwe huisstijl: maatvoering, koppen en knoppen.
 *
 * Stonden eerst alleen in home-page.tsx. Ze staan hier apart zodat andere
 * pagina's (zoals /bedankt) er exact hetzelfde uitzien in plaats van hun
 * eigen variant te krijgen.
 */

import { ArrowRight } from "lucide-react";
import { pushEvent } from "@/lib/analytics";
import { SKOOL_URL } from "@/lib/finit-links";
import { CTA_LESREEKS } from "./copy";

export const CONTAINER = "mx-auto w-full max-w-[74rem] px-5 sm:px-8";
export const H2 =
  "hp-display text-balance text-[2rem] font-bold leading-[1.06] text-[#1A2D63] sm:text-[2.5rem] lg:text-[2.9rem]";
export const H3 =
  "hp-display hp-display-sm text-[1.3rem] font-semibold leading-[1.2] text-[#1A2D63]";
export const LEAD =
  "text-[1.0625rem] leading-[1.65] text-[#3D4766] sm:text-[1.125rem]";
/** Gecentreerde sectiekop met intro. */
export const KOP = "mx-auto max-w-[44rem] text-center";

/** De handgetekende streep onder het laatste woord van een kop, zoals op de vorige site. */
export function Onder({ children }: { children: React.ReactNode }) {
  return (
    <span className="hp-onder">
      {children}
      <svg viewBox="0 0 200 20" preserveAspectRatio="none" fill="none" aria-hidden="true">
        <path d="M3 14 Q40 4 100 12 Q160 18 197 8" stroke="#1A2D63" strokeOpacity="0.15" strokeWidth="10" strokeLinecap="round" />
      </svg>
    </span>
  );
}

export function Vinkje({ donker = false, wit = false }: { donker?: boolean; wit?: boolean }) {
  return (
    <span className={`hp-check mt-0.5 ${donker ? "hp-check--donker" : ""} ${wit ? "hp-check--wit" : ""}`} aria-hidden="true">
      <svg width="11" height="9" viewBox="0 0 11 9">
        <path d="M1 4.5l3 3L10 1" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

export const trackLesreeks = (location: string) =>
  pushEvent("cta_click", { cta_label: "lesreeks", location });

export function LesreeksKnop({
  location,
  size = "lg",
  className = "",
  variant = "primary",
}: {
  location: string;
  size?: "lg" | "md";
  className?: string;
  variant?: "primary" | "light" | "secondary";
}) {
  return (
    <a
      href={SKOOL_URL}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackLesreeks(location)}
      className={`hp-btn hp-btn--${variant} hp-btn--${size} ${className}`}
    >
      {CTA_LESREEKS}
      <ArrowRight className="h-4 w-4" aria-hidden="true" />
    </a>
  );
}
