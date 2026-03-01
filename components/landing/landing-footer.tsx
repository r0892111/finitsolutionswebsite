"use client";

import { Calendar, Mail, Phone, Linkedin } from "lucide-react";
import { CookieSettingsLink } from "@/components/cookie-settings-link";
import { useContactForm, ContactFormPopup } from "@/components/contact-form-popup";
import { pushEvent } from "@/lib/analytics";

export function LandingFooter() {
  const currentYear = new Date().getFullYear();
  const { isOpen, openForm, closeForm } = useContactForm();

  return (
    <>
      <footer className="bg-[#1A2D63] text-white pt-0 md:pt-0 pb-6 md:pb-8 px-6 relative overflow-visible mt-16 md:mt-20 lg:mt-24">
        {/* SVG Wave */}
        <div className="absolute top-0 left-0 w-full" style={{ transform: "translateY(-99%)" }}>
          <svg
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 2278 683"
            className="w-full h-16 md:h-20 lg:h-24 block"
            style={{ overflow: "visible" }}
          >
            <path
              fill="#1A2D63"
              d="M0-0.3C0-0.3,464,120,1139,120S2278-0.3,2278-0.3V683H0V-0.3z"
            />
          </svg>
        </div>

        <div className="max-w-[93.33rem] mx-auto relative z-10">
          <div className="grid gap-10 lg:gap-12 lg:grid-cols-[1.3fr_1fr] items-start">
            {/* Footer CTA */}
            <div>
              <h2 className="text-4xl md:text-5xl font-newsreader leading-tight mb-4 text-center lg:text-left">
                Ontdek wat AI jouw bedrijf oplevert
              </h2>
              <p className="text-white/70 text-base md:text-lg mb-6 max-w-md text-center lg:text-left mx-auto lg:mx-0">
                In 30 minuten bespreken we je huidige situatie en maken we een inschatting van wat mogelijk is.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                <button
                  type="button"
                  onClick={() => {
                    openForm();
                    pushEvent("cta_click", {
                      cta_label: "footer_calendly",
                      location: "footer_cta",
                    });
                  }}
                  className="bg-white text-[#1A2D63] px-6 py-3 rounded-full text-base font-medium hover:scale-105 transition-transform flex items-center justify-center gap-2"
                >
                  <Calendar className="w-4 h-4" />
                  Plan een kennismakingsgesprek
                </button>
                <a
                  href="mailto:contact@finitsolutions.be"
                  onClick={() =>
                    pushEvent("contact_click", {
                      method: "email",
                      location: "footer_cta",
                    })
                  }
                  className="border border-white/20 px-6 py-3 rounded-full text-base font-medium hover:bg-white/5 transition-colors flex items-center justify-center gap-2"
                >
                  <Mail className="w-4 h-4" />
                  contact@finitsolutions.be
                </a>
              </div>
            </div>

            {/* Contact */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-7">
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <ul className="space-y-4 text-sm text-white/70">
                <li className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-white/70 mt-0.5" />
                  <div className="flex flex-col">
                    <a
                      href="tel:+32495702314"
                      className="hover:text-white transition-colors"
                      onClick={() => pushEvent("contact_click", { method: "phone", location: "footer" })}
                    >
                      +32 495 70 23 14
                    </a>
                    <a
                      href="tel:+32468029945"
                      className="hover:text-white transition-colors"
                      onClick={() => pushEvent("contact_click", { method: "phone", location: "footer" })}
                    >
                      +32 468 02 99 45
                    </a>
                  </div>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-white/70" />
                  <a
                    href="mailto:contact@finitsolutions.be"
                    onClick={() =>
                      pushEvent("contact_click", {
                        method: "email",
                        location: "footer_contact",
                      })
                    }
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
                    onClick={() =>
                      pushEvent("contact_click", {
                        method: "linkedin",
                        location: "footer_contact",
                      })
                    }
                    className="hover:text-white transition-colors"
                  >
                    LinkedIn
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="mt-8 pt-4 border-t border-white/10 flex flex-col items-center gap-4 text-center md:flex-row md:items-center md:justify-between md:text-left">
            <div className="flex flex-col sm:flex-row items-center gap-3 text-sm text-white/60">
              <img
                src="/Finit Logo Blue@4x.png"
                alt="Finit Logo"
                className="h-8 w-auto object-contain brightness-0 invert"
              />
            </div>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-white/60 md:gap-6">
              <span>BTW: BE1020600643</span>
              <a href="/privacy" className="hover:text-white transition-colors">
                Privacybeleid
              </a>
              <a href="/cookieverklaring" className="hover:text-white transition-colors">
                Cookieverklaring
              </a>
              <a href="/disclaimer" className="hover:text-white transition-colors">
                Disclaimer
              </a>
              <div className="text-sm text-white/60 [&>button]:text-white/60 [&>button]:hover:text-white [&>button]:transition-colors">
                <CookieSettingsLink />
              </div>
            </div>
            <p className="text-sm text-white/40">© {currentYear} Finit Solutions</p>
          </div>
        </div>
      </footer>
      <ContactFormPopup isOpen={isOpen} onClose={closeForm} />
    </>
  );
}
