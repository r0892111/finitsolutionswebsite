"use client";

import React, { useState, useCallback, useEffect } from "react";
import { X } from "lucide-react";
import { pushEvent } from "@/lib/analytics";
import { INSTAGRAM_URL, WHATSAPP_LINK, WHATSAPP_NUMBER } from "@/lib/finit-links";

// ============================================
// CONSTANTS
// ============================================

const WEBHOOK_URL =
  "https://alexfinit.app.n8n.cloud/webhook/website-contact-form";

// ============================================
// TYPES
// ============================================

/** Which button opened the form. Only changes the heading + submit label. */
export type LeadIntent = "cursus" | "gesprek";

interface LeadFormData {
  voornaam: string;
  zaak: string;
  telefoonnummer: string;
  vraag: string;
}

const EMPTY_FORM: LeadFormData = {
  voornaam: "",
  zaak: "",
  telefoonnummer: "",
  vraag: "",
};

const COPY: Record<
  LeadIntent,
  { title: string; intro: string; submit: string }
> = {
  cursus: {
    title: "Start met de cursus",
    intro:
      "295 euro, online, op eigen tempo. Laat je gegevens achter, Karel belt je binnen de twee werkdagen om je op weg te zetten.",
    submit: "Start met de cursus",
  },
  gesprek: {
    title: "Plan 20 minuten",
    intro:
      "Vul dit in, Karel belt je binnen de twee werkdagen. Geen verkooppraatje, gewoon kijken of we iets voor je kunnen doen.",
    submit: "Plan een gesprek",
  },
};

// ============================================
// HOOK
// ============================================

export function useLeadForm() {
  const [intent, setIntent] = useState<LeadIntent | null>(null);

  const openForm = useCallback((next: LeadIntent = "gesprek") => {
    setIntent(next);
    pushEvent("form_open", {
      intent: next,
      location:
        typeof window !== "undefined" ? window.location.pathname : "unknown",
    });
  }, []);

  const closeForm = useCallback(() => setIntent(null), []);

  return { intent, isOpen: intent !== null, openForm, closeForm };
}

// ============================================
// FIELD
// ============================================

const inputClasses =
  "w-full px-4 py-3.5 rounded-xl border border-[#1A2D63]/15 bg-white text-[#1A2D63] font-instrument text-base placeholder:text-[#475D8F]/40 focus:outline-none focus:ring-2 focus:ring-[#1A2D63]/20 focus:border-[#1A2D63]/30 transition-all";

const labelClasses =
  "block font-instrument text-sm font-medium text-[#1A2D63] mb-2";

// ============================================
// POPUP
// ============================================

export function LeadFormPopup({
  intent,
  onClose,
}: {
  intent: LeadIntent | null;
  onClose: () => void;
}) {
  const [formData, setFormData] = useState<LeadFormData>(EMPTY_FORM);
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">(
    "idle"
  );

  const isOpen = intent !== null;

  // Lock body scroll while open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Reset on open
  useEffect(() => {
    if (isOpen) {
      setFormData(EMPTY_FORM);
      setStatus("idle");
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "sending") return;
    setStatus("sending");

    const sourceUrl =
      typeof window !== "undefined"
        ? `https://finitsolutions.be${
            window.location.pathname === "/" ? "" : window.location.pathname
          }`
        : "https://finitsolutions.be";

    try {
      const response = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          // `naam` + `telefoonnummer` keep the existing n8n field mapping intact.
          naam: formData.voornaam,
          telefoonnummer: formData.telefoonnummer,
          zaak: formData.zaak,
          vraag: formData.vraag,
          intent,
          bron: sourceUrl,
        }),
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      setStatus("done");
      pushEvent("form_submit", { intent: intent ?? "gesprek", location: sourceUrl });
    } catch {
      setStatus("error");
    }
  };

  if (!isOpen) return null;

  const copy = COPY[intent];

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="lead-form-title"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[#1A2D63]/40 backdrop-blur-sm animate-[leadFadeIn_0.2s_ease-out]"
        onClick={onClose}
      />

      {/* Card */}
      <div className="relative w-full max-w-md max-h-[90vh] overflow-y-auto bg-[#FDFBF7] rounded-2xl md:rounded-3xl shadow-2xl border border-[#1A2D63]/10 animate-[leadModalIn_0.3s_ease-out]">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-[#1A2D63]/[0.06] hover:bg-[#1A2D63]/[0.12] flex items-center justify-center transition-colors z-10"
          aria-label="Sluiten"
        >
          <X className="w-4 h-4 text-[#1A2D63]" />
        </button>

        <div className="pt-12 px-6 pb-6 md:pt-12 md:px-8 md:pb-8">
          {status === "done" ? (
            // Bevestiging na formulier
            <div className="py-6 text-center">
              <h2
                id="lead-form-title"
                className="font-newsreader text-3xl md:text-4xl text-[#1A2D63] mb-3"
              >
                Merci.
              </h2>
              <p className="font-instrument text-[#475D8F] text-base leading-relaxed mb-6">
                Karel belt je binnen de twee werkdagen. Kijk intussen gerust op
                Instagram wat een AI-brein doet.
              </p>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#1A2D63] text-white px-6 py-3 rounded-full text-base font-medium hover:bg-[#2A4488] transition-colors"
              >
                Naar Instagram
              </a>
              <button
                type="button"
                onClick={onClose}
                className="block w-full mt-4 text-sm text-[#475D8F]/70 hover:text-[#1A2D63] transition-colors"
              >
                Sluiten
              </button>
            </div>
          ) : (
            <>
              <div className="mb-6">
                <h2
                  id="lead-form-title"
                  className="font-newsreader text-2xl md:text-3xl text-[#1A2D63] mb-1.5"
                >
                  {copy.title}
                </h2>
                <p className="font-instrument text-[#475D8F] text-sm md:text-base">
                  {copy.intro}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="lead-voornaam" className={labelClasses}>
                    Voornaam
                  </label>
                  <input
                    id="lead-voornaam"
                    type="text"
                    required
                    autoComplete="given-name"
                    value={formData.voornaam}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        voornaam: e.target.value,
                      }))
                    }
                    className={inputClasses}
                    placeholder="Jan"
                  />
                </div>

                <div>
                  <label htmlFor="lead-zaak" className={labelClasses}>
                    Zaak
                  </label>
                  <input
                    id="lead-zaak"
                    type="text"
                    required
                    autoComplete="organization"
                    value={formData.zaak}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, zaak: e.target.value }))
                    }
                    className={inputClasses}
                    placeholder="Elektro Janssen"
                  />
                </div>

                <div>
                  <label htmlFor="lead-telefoon" className={labelClasses}>
                    Telefoonnummer
                  </label>
                  <input
                    id="lead-telefoon"
                    type="tel"
                    required
                    autoComplete="tel"
                    value={formData.telefoonnummer}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        telefoonnummer: e.target.value,
                      }))
                    }
                    className={inputClasses}
                    placeholder="+32 495 12 34 56"
                  />
                </div>

                <div>
                  <label htmlFor="lead-vraag" className={labelClasses}>
                    Wat kost jou nu het meeste tijd?
                  </label>
                  <textarea
                    id="lead-vraag"
                    rows={3}
                    value={formData.vraag}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, vraag: e.target.value }))
                    }
                    className={`${inputClasses} resize-none`}
                    placeholder="Offertes opmaken, klanten opvolgen, ..."
                  />
                </div>

                {status === "error" && (
                  <p className="font-instrument text-sm text-[#1A2D63] bg-[#1A2D63]/[0.06] border border-[#1A2D63]/10 rounded-xl px-4 py-3">
                    Er ging iets mis. Stuur ons gewoon een WhatsApp:{" "}
                    <a
                      href={WHATSAPP_LINK}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline underline-offset-2 font-medium"
                    >
                      {WHATSAPP_NUMBER}
                    </a>
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="w-full bg-[#1A2D63] text-white py-3.5 rounded-full text-base font-medium hover:bg-[#2A4488] transition-all duration-200 shadow-lg shadow-[#1A2D63]/20 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {status === "sending" ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    copy.submit
                  )}
                </button>
              </form>
            </>
          )}
        </div>
      </div>

      <style jsx global>{`
        @keyframes leadFadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes leadModalIn {
          from {
            opacity: 0;
            transform: scale(0.95) translateY(10px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
