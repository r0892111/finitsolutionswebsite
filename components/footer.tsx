"use client";

import Link from "next/link";
import Image from "next/image";
import { Calendar, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { CookieSettingsLink } from "@/components/cookie-settings-link";
import { useLanguage } from "@/contexts/language-context";
import { useContactForm, ContactFormPopup } from "@/components/contact-form-popup";
import { pushEvent } from "@/lib/analytics";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const { t } = useLanguage();
  const { isOpen, openForm, closeForm } = useContactForm();
  
  return (
    <footer className="bg-[#1A2D63] text-white pt-14 md:pt-16 pb-10 md:pb-12 px-6 relative overflow-visible">
      <div className="max-w-[80rem] mx-auto relative z-10">
        <div className="grid gap-8 lg:gap-10 lg:grid-cols-[1.3fr_1fr] items-start">
          {/* Footer CTA */}
          <div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-newsreader leading-tight mb-3 text-center lg:text-left">
              Klaar om uw bedrijf te automatiseren?
            </h2>
            <p className="text-white/70 text-base mb-5 max-w-md text-center lg:text-left mx-auto lg:mx-0">
              Ontdek hoe AI uw bedrijfsprocessen kan transformeren.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              <button
                type="button"
                onClick={() => {
                  openForm();
                  pushEvent("cta_click", { cta_label: "footer_calendly", location: "main_footer" });
                }}
                className="bg-white text-[#1A2D63] px-5 py-2.5 rounded-full text-sm font-medium hover:scale-105 transition-transform flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                Plan een gesprek
              </button>
              <a
                href="mailto:contact@finitsolutions.be"
                onClick={() => pushEvent("contact_click", { method: "email", location: "main_footer" })}
                className="border border-white/20 px-5 py-2.5 rounded-full text-sm font-medium hover:bg-white/5 transition-colors flex items-center justify-center gap-2"
              >
                <Mail className="w-4 h-4" />
                contact@finitsolutions.be
              </a>
            </div>
          </div>

          {/* Contact */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-5 md:p-6">
            <h3 className="text-base font-semibold mb-4">{t('footer.contact')}</h3>
            <ul className="space-y-4 text-sm text-white/70">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-white/70 mt-0.5" />
                <span>Keerbergen, België</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-white/70 mt-0.5" />
                <div className="flex flex-col">
                  <span>+32 (0)495 702 314</span>
                  <span>+32 (0)468 029 945</span>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-white/70" />
                <a
                  href="mailto:contact@finitsolutions.be"
                  onClick={() => pushEvent("contact_click", { method: "email", location: "main_footer_contact" })}
                  className="hover:text-white transition-colors"
                >
                  contact@finitsolutions.be
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Linkedin className="w-4 h-4 text-white/70" />
                <a
                  href="https://www.linkedin.com/company/finitsolutions/"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => pushEvent("contact_click", { method: "linkedin", location: "main_footer" })}
                  className="hover:text-white transition-colors"
                >
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-8 pt-5 border-t border-white/10 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3 text-sm text-white/60">
            <Image
              src="/Finit Logo Blue@4x.png"
              alt="Finit Logo"
              width={120}
              height={28}
              className="h-7 w-auto object-contain brightness-0 invert"
              unoptimized
            />
            <span>BTW: BE1020600643</span>
          </div>
          <div className="flex flex-wrap justify-center gap-5 text-sm text-white/60">
            <Link href="/privacy" className="hover:text-white transition-colors">
              {t('footer.privacy')}
            </Link>
            <Link href="/cookieverklaring" className="hover:text-white transition-colors">
              {t('footer.cookies')}
            </Link>
            <Link href="/disclaimer" className="hover:text-white transition-colors">
              {t('footer.disclaimer')}
            </Link>
            <CookieSettingsLink />
          </div>
          <p className="text-sm text-white/40">© {currentYear} Finit Solutions</p>
        </div>
      </div>
      <ContactFormPopup isOpen={isOpen} onClose={closeForm} />
    </footer>
  );
}
