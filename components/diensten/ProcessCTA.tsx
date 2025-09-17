// components/diensten/ProcessCTA.tsx
import React from 'react';
import Link from 'next/link';

export function ProcessCTA() {
  return (
    <section className="py-16 md:py-24 bg-slate-900">
      <div className="container mx-auto px-6 text-center">
        <h2 className="finit-h1 mb-8 text-white">Klaar voor Excellentie?</h2>
        <p className="finit-body text-white/80 mb-12">
          Transformeer uw digitale visie in meetbare bedrijfsimpact. Uw ambitie verdient
          uitzonderlijke uitvoering.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/nl/contact/"
            className="inline-flex items-center justify-center rounded-2xl px-6 py-3 bg-white text-slate-900 font-medium hover:opacity-90 transition"
          >
            Plan een gesprek
          </Link>
          <Link
            href="/nl/aanpak/"
            className="inline-flex items-center justify-center rounded-2xl px-6 py-3 border border-white/30 text-white hover:bg-white/10 transition"
          >
            Onze aanpak
          </Link>
        </div>
      </div>
    </section>
  );
}

export default ProcessCTA;
