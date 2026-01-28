"use client";

import Link from "next/link";
import { Calendar, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { CookieSettingsLink } from "@/components/cookie-settings-link";
import { useLanguage } from "@/contexts/language-context";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const { t } = useLanguage();
  
  return (
    <footer className="bg-[#1A2D63] text-white pt-14 md:pt-16 pb-10 md:pb-12 px-6 relative overflow-visible">
      <div className="max-w-[1200px] mx-auto relative z-10">
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
              <a
                href="https://calendly.com/karel-finitsolutions/kennismaking-finit-solutions"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-[#1A2D63] px-5 py-2.5 rounded-full text-sm font-medium hover:scale-105 transition-transform flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                Plan een gesprek
              </a>
              <a
                href="mailto:contact@finitsolutions.be"
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
                <a href="mailto:contact@finitsolutions.be" className="hover:text-white transition-colors">
                  contact@finitsolutions.be
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Linkedin className="w-4 h-4 text-white/70" />
                <a
                  href="https://www.linkedin.com/company/finitsolutions/"
                  target="_blank"
                  rel="noopener noreferrer"
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
            <img
              src="/Finit Logo Blue@4x.png"
              alt="Finit Logo"
              className="h-7 w-auto object-contain brightness-0 invert"
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
            <div className="text-sm text-white/60 [&>button]:text-white/60 [&>button]:hover:text-white [&>button]:transition-colors">
              <CookieSettingsLink />
            </div>
          </div>
          <p className="text-sm text-white/40">© {currentYear} Finit Solutions</p>
        </div>
      </div>
    </footer>
  );
}
