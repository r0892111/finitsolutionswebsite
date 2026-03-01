"use client";

import React, { useState, useCallback, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { X } from "lucide-react";
import { pushEvent } from "@/lib/analytics";

// ============================================
// TYPES
// ============================================

interface ContactFormPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ContactFormData {
  naam: string;
  telefoonnummer: string;
  email: string;
}

// ============================================
// HOOK
// ============================================

export function useContactForm() {
  const [isOpen, setIsOpen] = useState(false);

  const openForm = useCallback(() => {
    setIsOpen(true);
    pushEvent("form_open", { location: window.location.pathname });
  }, []);
  const closeForm = useCallback(() => setIsOpen(false), []);

  return { isOpen, openForm, closeForm };
}

// ============================================
// FULL-SCREEN DOT LOADER OVERLAY
// ============================================

function DotLoaderOverlay() {
  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center">
      <div className="absolute inset-0 bg-[#FDFBF7]" />
      <div className="loader relative z-10" />
    </div>
  );
}

// ============================================
// SHARED FORM SUBMIT LOGIC
// ============================================

const WEBHOOK_URL = "https://alexfinit.app.n8n.cloud/webhook/website-contact-form";

function useFormSubmit() {
  const router = useRouter();
  const pathname = usePathname();
  const [showLoader, setShowLoader] = useState(false);

  const submitForm = useCallback(
    (formData: ContactFormData) => {
      const sourceUrl =
        pathname === "/"
          ? "https://finitsolutions.be"
          : `https://finitsolutions.be${pathname}`;

      // Track form submission
      pushEvent("form_submit", { location: sourceUrl });

      // Send to n8n webhook (fire-and-forget)
      fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          naam: formData.naam,
          telefoonnummer: formData.telefoonnummer,
          email: formData.email,
          bron: sourceUrl,
        }),
      }).catch(() => {
        // silently ignore - don't block the user flow
      });

      // Show full-screen dot loader
      setShowLoader(true);

      // Redirect to /bedankt/ after a brief delay
      setTimeout(() => {
        router.push("/bedankt");
      }, 800);
    },
    [router, pathname]
  );

  return { showLoader, submitForm };
}

// ============================================
// EMBEDDED CONTACT FORM (for direct-booking page)
// ============================================

export function EmbeddedContactForm() {
  const [formData, setFormData] = useState<ContactFormData>({
    naam: "",
    telefoonnummer: "",
    email: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { showLoader, submitForm } = useFormSubmit();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    submitForm(formData);
  };

  if (showLoader) {
    return <DotLoaderOverlay />;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      {/* Naam */}
      <div>
        <label
          htmlFor="embedded-naam"
          className="block font-instrument text-sm font-medium text-[#1A2D63] mb-1"
        >
          Naam <span className="text-red-500">*</span>
        </label>
        <input
          id="embedded-naam"
          type="text"
          required
          value={formData.naam}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, naam: e.target.value }))
          }
          className="w-full px-4 py-2.5 rounded-xl border border-[#1A2D63]/15 bg-white text-[#1A2D63] font-instrument text-base placeholder:text-[#475D8F]/40 focus:outline-none focus:ring-2 focus:ring-[#1A2D63]/20 focus:border-[#1A2D63]/30 transition-all"
          placeholder="Jan Janssen"
        />
      </div>

      {/* E-mailadres */}
      <div>
        <label
          htmlFor="embedded-email"
          className="block font-instrument text-sm font-medium text-[#1A2D63] mb-1"
        >
          E-mailadres <span className="text-red-500">*</span>
        </label>
        <input
          id="embedded-email"
          type="email"
          required
          value={formData.email}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, email: e.target.value }))
          }
          className="w-full px-4 py-2.5 rounded-xl border border-[#1A2D63]/15 bg-white text-[#1A2D63] font-instrument text-base placeholder:text-[#475D8F]/40 focus:outline-none focus:ring-2 focus:ring-[#1A2D63]/20 focus:border-[#1A2D63]/30 transition-all"
          placeholder="jan@bedrijf.be"
        />
      </div>

      {/* Telefoonnummer */}
      <div>
        <label
          htmlFor="embedded-telefoon"
          className="block font-instrument text-sm font-medium text-[#1A2D63] mb-1"
        >
          Telefoonnummer <span className="text-red-500">*</span>
        </label>
        <input
          id="embedded-telefoon"
          type="tel"
          required
          value={formData.telefoonnummer}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              telefoonnummer: e.target.value,
            }))
          }
          className="w-full px-4 py-2.5 rounded-xl border border-[#1A2D63]/15 bg-white text-[#1A2D63] font-instrument text-base placeholder:text-[#475D8F]/40 focus:outline-none focus:ring-2 focus:ring-[#1A2D63]/20 focus:border-[#1A2D63]/30 transition-all"
          placeholder="+32 495 123 456"
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-[#1A2D63] text-white py-2.5 rounded-full text-base font-medium hover:bg-[#2A4488] transition-all duration-200 shadow-lg shadow-[#1A2D63]/20 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isSubmitting ? (
          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        ) : (
          "Plan een gesprek"
        )}
      </button>
    </form>
  );
}

// ============================================
// POPUP COMPONENT
// ============================================

export function ContactFormPopup({ isOpen, onClose }: ContactFormPopupProps) {
  const [formData, setFormData] = useState<ContactFormData>({
    naam: "",
    telefoonnummer: "",
    email: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { showLoader, submitForm } = useFormSubmit();

  // Lock body scroll when open
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
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Reset form when opening
  useEffect(() => {
    if (isOpen) {
      setFormData({ naam: "", telefoonnummer: "", email: "" });
      setIsSubmitting(false);
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    submitForm(formData);
  };

  if (!isOpen) return null;

  // Show full-screen loader when submitted
  if (showLoader) {
    return <DotLoaderOverlay />;
  }

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[#1A2D63]/40 backdrop-blur-sm animate-[fadeIn_0.2s_ease-out]"
        onClick={onClose}
      />

      {/* Modal card */}
      <div className="relative w-full max-w-md bg-[#FDFBF7] rounded-2xl md:rounded-3xl shadow-2xl border border-[#1A2D63]/10 animate-[modalIn_0.3s_ease-out] overflow-hidden">

        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-[#1A2D63]/[0.06] hover:bg-[#1A2D63]/[0.12] flex items-center justify-center transition-colors z-10"
          aria-label="Sluiten"
        >
          <X className="w-4 h-4 text-[#1A2D63]" />
        </button>

        <div className="pt-12 px-6 pb-6 md:pt-12 md:px-8 md:pb-8">
          <div className="mb-6">
            <h2 className="font-newsreader text-2xl md:text-3xl text-[#1A2D63] mb-1.5">
              Plan een kennismakingsgesprek
            </h2>
            <p className="font-instrument text-[#475D8F] text-sm md:text-base">
              Vul je gegevens in en we nemen binnen 48 uur contact op om een moment in te plannen.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Naam */}
            <div>
              <label
                htmlFor="popup-naam"
                className="block font-instrument text-sm font-medium text-[#1A2D63] mb-2"
              >
                Naam <span className="text-red-500">*</span>
              </label>
              <input
                id="popup-naam"
                type="text"
                required
                value={formData.naam}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    naam: e.target.value,
                  }))
                }
                className="w-full px-4 py-3.5 rounded-xl border border-[#1A2D63]/15 bg-white text-[#1A2D63] font-instrument text-base placeholder:text-[#475D8F]/40 focus:outline-none focus:ring-2 focus:ring-[#1A2D63]/20 focus:border-[#1A2D63]/30 transition-all"
                placeholder="Jan Janssen"
              />
            </div>

            {/* E-mailadres */}
            <div>
              <label
                htmlFor="popup-email"
                className="block font-instrument text-sm font-medium text-[#1A2D63] mb-2"
              >
                E-mailadres <span className="text-red-500">*</span>
              </label>
              <input
                id="popup-email"
                type="email"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    email: e.target.value,
                  }))
                }
                className="w-full px-4 py-3.5 rounded-xl border border-[#1A2D63]/15 bg-white text-[#1A2D63] font-instrument text-base placeholder:text-[#475D8F]/40 focus:outline-none focus:ring-2 focus:ring-[#1A2D63]/20 focus:border-[#1A2D63]/30 transition-all"
                placeholder="jan@bedrijf.be"
              />
            </div>

            {/* Telefoonnummer */}
            <div>
              <label
                htmlFor="popup-telefoon"
                className="block font-instrument text-sm font-medium text-[#1A2D63] mb-2"
              >
                Telefoonnummer <span className="text-red-500">*</span>
              </label>
              <input
                id="popup-telefoon"
                type="tel"
                required
                value={formData.telefoonnummer}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    telefoonnummer: e.target.value,
                  }))
                }
                className="w-full px-4 py-3.5 rounded-xl border border-[#1A2D63]/15 bg-white text-[#1A2D63] font-instrument text-base placeholder:text-[#475D8F]/40 focus:outline-none focus:ring-2 focus:ring-[#1A2D63]/20 focus:border-[#1A2D63]/30 transition-all"
                placeholder="+32 495 123 456"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#1A2D63] text-white py-3.5 rounded-full text-base font-medium hover:bg-[#2A4488] transition-all duration-200 shadow-lg shadow-[#1A2D63]/20 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                "Plan een gesprek"
              )}
            </button>
          </form>

          <p className="mt-4 text-center text-sm text-[#475D8F]/60 font-instrument">
            Binnen 30 minuten weet je wat de mogelijkheden met AI zijn.
          </p>
        </div>
      </div>

      {/* Animations */}
      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes modalIn {
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
