"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";
import { Calendar, ArrowRight } from "lucide-react";
import { useContactForm, ContactFormPopup } from "@/components/contact-form-popup";
import { pushEvent } from "@/lib/analytics";

export function LandingCTA() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const { isOpen, openForm, closeForm } = useContactForm();

  return (
    <>
      <section className="pt-6 md:pt-8 pb-12 md:pb-20 px-6 md:px-12 bg-[#FDFBF7] relative">
        <div className="max-w-[53.33rem] mx-auto">
          <div className="relative" ref={ref}>
            <div className="absolute inset-0 bg-[#B8C5E6] rounded-full blur-[120px] opacity-30"></div>
            <div className="relative bg-white p-8 md:p-12 rounded-3xl shadow-2xl border border-[#1A2D63]/10 text-center flex flex-col items-center gap-6">
              <h2 className="font-newsreader text-4xl md:text-5xl text-[#1A2D63]">
                Ontdek wat AI jouw bedrijf oplevert
              </h2>
              <p className="text-[#1A2D63]/60 text-lg md:text-xl max-w-xl mx-auto">
                In 30 minuten bespreken we je huidige situatie en maken we een inschatting van wat mogelijk is.
              </p>
              <button
                type="button"
                onClick={() => {
                  openForm();
                  pushEvent("cta_click", {
                    cta_label: "secondary_calendly",
                    location: "secondary_cta",
                  });
                }}
                className="inline-flex items-center gap-2 md:gap-3 bg-[#1A2D63] text-white px-6 py-3.5 md:px-10 md:py-5 rounded-full text-base md:text-lg font-medium hover:scale-105 transition-transform shadow-2xl shadow-[#1A2D63]/20"
              >
                <Calendar className="w-5 h-5 md:w-6 md:h-6" />
                Plan een kennismakingsgesprek
                <ArrowRight className="w-5 h-5 md:w-6 md:h-6" />
              </button>
              <p className="text-sm text-[#1A2D63]/40">
                We werken met een beperkt aantal bedrijven tegelijk.
              </p>
            </div>
          </div>
        </div>
      </section>
      <ContactFormPopup isOpen={isOpen} onClose={closeForm} />
    </>
  );
}
