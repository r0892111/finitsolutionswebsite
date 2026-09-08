"use client";

/**
 * De footer van de site. Stond eerst inline in home-page.tsx; staat hier apart
 * zodat /bedankt en de homepage dezelfde footer tonen en er maar één plek is
 * om hem aan te passen.
 */

import Image from "next/image";
import { Linkedin, Mail, Phone } from "lucide-react";
import { pushEvent } from "@/lib/analytics";
import { useConsent } from "@/contexts/consent-context";
import { CONTACT_EMAIL, INSTAGRAM_URL, LINKEDIN_URL, VAT_NUMBER } from "@/lib/finit-links";
import { FOOTER } from "./copy";
import { CONTAINER, LesreeksKnop } from "./ui";

export function SiteFooter() {
  const { openSettings } = useConsent();

  return (
    <footer className="bg-[#1A2D63] text-white/75">
      <div className={`${CONTAINER} py-14 sm:py-16`}>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,7fr)_minmax(0,4fr)] lg:gap-16">
          <div>
            <h2 className="hp-display text-balance text-[1.75rem] font-bold leading-[1.1] text-white sm:text-[2.1rem]">{FOOTER.slotTitel}</h2>
            <p className="mt-3 max-w-[32rem] text-[1rem] leading-[1.65] text-white/70">{FOOTER.slotTekst}</p>
            <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center">
              <LesreeksKnop location="footer_cta" variant="light" className="w-full sm:w-auto" />
              <a href={`mailto:${CONTACT_EMAIL}`} onClick={() => pushEvent("contact_click", { method: "email", location: "footer_cta" })} className="inline-flex items-center gap-2 text-[0.9375rem] text-white/80 transition-colors hover:text-white">
                <Mail className="h-4 w-4" aria-hidden="true" />
                {CONTACT_EMAIL}
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-[0.8125rem] font-medium uppercase tracking-[0.08em] text-white/65">{FOOTER.contactTitel}</h3>
            <ul className="mt-4 space-y-3 text-[0.9375rem]">
              <li className="flex items-start gap-3">
                <Phone className="mt-1 h-4 w-4 shrink-0 text-white/65" aria-hidden="true" />
                <div className="flex flex-col">
                  {FOOTER.telefoons.map((t) => (
                    <a key={t.link} href={t.link} onClick={() => pushEvent("contact_click", { method: "phone", location: "footer" })} className="transition-colors hover:text-white">{t.nummer}</a>
                  ))}
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 shrink-0 text-white/65" aria-hidden="true" />
                <a href={`mailto:${CONTACT_EMAIL}`} onClick={() => pushEvent("contact_click", { method: "email", location: "footer_contact" })} className="transition-colors hover:text-white">{CONTACT_EMAIL}</a>
              </li>
              <li className="flex items-center gap-3">
                <Linkedin className="h-4 w-4 shrink-0 text-white/65" aria-hidden="true" />
                <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" onClick={() => pushEvent("contact_click", { method: "linkedin", location: "footer_contact" })} className="transition-colors hover:text-white">LinkedIn</a>
                <span className="text-white/30" aria-hidden="true">·</span>
                <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" onClick={() => pushEvent("contact_click", { method: "instagram", location: "footer_contact" })} className="transition-colors hover:text-white">Instagram</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start gap-5 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <Image src="/finit-logo-white.svg" alt="Finit Solutions" width={424} height={120} className="h-6 w-auto" />
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[0.8125rem] text-white/60">
            <span>BTW: {VAT_NUMBER}</span>
            {FOOTER.links.map((l) => (
              <a key={l.href} href={l.href} className="transition-colors hover:text-white">{l.label}</a>
            ))}
            <button type="button" onClick={openSettings} className="underline underline-offset-2 transition-colors hover:text-white">{FOOTER.cookies}</button>
          </div>
        </div>
        <p className="mt-6 text-[0.8125rem] text-white/55">© {new Date().getFullYear()} Finit Solutions</p>
      </div>
    </footer>
  );
}
