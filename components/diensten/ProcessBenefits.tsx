// components/diensten/ProcessBenefits.tsx
import React from 'react';

export function ProcessBenefits() {
  // Simpele, statische content om de build weer groen te krijgen.
  // Pas teksten later gerust aan of hang er vertalingen aan.
  const items = [
    { title: 'Snellere doorlooptijd', desc: 'Gestroomlijnde processen en minder handwerk.' },
    { title: 'Hogere kwaliteit', desc: 'Consistente output met ingebouwde checks.' },
    { title: 'Betere zichtbaarheid', desc: 'Realtime inzicht in status en bottlenecks.' },
    { title: 'Lagere kosten', desc: 'Automatisering waar het loont.' }
  ];

  return (
    <section className="py-16 md:py-24 bg-slate-900 text-white">
      <div className="container mx-auto px-6">
        <h2 className="finit-h1 mb-8">Waarom je proces beter wordt</h2>
        <p className="text-slate-300 mb-10 max-w-2xl">
          Concreet resultaat door standaarden, automatisering en duidelijke ownership.
        </p>

        <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {items.map((it, i) => (
            <li key={i} className="rounded-2xl border border-slate-700/50 p-6 bg-slate-800/40">
              <h3 className="text-lg font-semibold mb-2">{it.title}</h3>
              <p className="text-slate-300">{it.desc}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default ProcessBenefits;
