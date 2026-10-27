import React from 'react';
import Link from 'next/link';
import { ArrowRight, ExternalLink } from 'lucide-react';

import { KopieerKnop } from '@/components/lezing/kopieer-knop';
import { BREIN, DELEN, LEZING, SNELLE_RONDE, SPELREGELS, TOOLS, TRUCS, type Prompt } from '@/lib/lezing/content';

function PromptKaart({ prompt }: { prompt: Prompt }) {
  return (
    <div className="rounded-2xl border border-[#E3E7EF] bg-[#F5F7FB] p-4">
      <div className="mb-2 flex items-center justify-between gap-3">
        <p className="text-sm font-semibold text-[#1A2D63]">{prompt.label}</p>
        <KopieerKnop tekst={prompt.tekst} />
      </div>
      <p className="whitespace-pre-line text-[15px] leading-relaxed text-[#3D4766]">{prompt.tekst}</p>
    </div>
  );
}

export function LezingHandout() {
  return (
    <main className="min-h-screen bg-white text-[#3D4766]">
      <header className="bg-[#1A2D63] px-4 pb-10 pt-12 text-white sm:px-8">
        <div className="mx-auto max-w-[720px]">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-[#E9A13B]">Open Boek · 27 oktober 2026</p>
          <h1 className="hp-display text-[38px] font-semibold leading-[1.05] sm:text-5xl">{LEZING.titel}</h1>
          <p className="mt-4 text-[17px] leading-relaxed text-white/75">
            Bedankt om erbij te zijn. Hier staan alle prompts van vanavond, klaar om te kopiëren. Vul de stukken tussen
            [haakjes] aan met je eigen gegevens.
          </p>
          <nav className="mt-6 flex flex-wrap gap-2 text-sm">
            {([1, 2, 3] as const).map((d) => (
              <a key={d} href={`#deel-${d}`} className="rounded-full bg-white/10 px-3 py-1.5 hover:bg-white/20">
                {DELEN[d].titel}
              </a>
            ))}
            <a href="#snel" className="rounded-full bg-white/10 px-3 py-1.5 hover:bg-white/20">
              10 snelle trucs
            </a>
            <a href="#spelregels" className="rounded-full bg-white/10 px-3 py-1.5 hover:bg-white/20">
              Spelregels
            </a>
          </nav>
        </div>
      </header>

      <div className="mx-auto max-w-[720px] px-4 py-10 sm:px-8">
        {([1, 2, 3] as const).map((deel) => (
          <section key={deel} id={`deel-${deel}`} className="mb-14 scroll-mt-6">
            <p className="mb-1 text-xs font-semibold uppercase tracking-[0.14em] text-[#E9A13B]">Deel {deel}</p>
            <h2 className="hp-display mb-6 text-[30px] font-semibold leading-tight text-[#1A2D63]">{DELEN[deel].titel}</h2>
            <div className="space-y-10">
              {TRUCS.filter((t) => t.deel === deel).map((truc) => (
                <article key={truc.id}>
                  <h3 className="text-xl font-semibold text-[#1A2D63]">
                    <span className="mr-2 text-[#E9A13B]">{truc.nummer}.</span>
                    {truc.titel}
                  </h3>
                  <p className="mb-4 mt-1 text-[16px] leading-relaxed">{truc.kort}</p>
                  {truc.link && (
                    <a
                      href={truc.link.url}
                      target="_blank"
                      rel="noreferrer"
                      className="mb-4 inline-flex items-center gap-1.5 text-[15px] font-medium text-[#1A2D63] underline"
                    >
                      {truc.link.label} <ExternalLink className="h-3.5 w-3.5" aria-hidden />
                    </a>
                  )}
                  <div className="space-y-3">
                    {truc.prompts.map((p) => (
                      <PromptKaart key={p.label} prompt={p} />
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </section>
        ))}

        <section id="snel" className="mb-14 scroll-mt-6">
          <p className="mb-1 text-xs font-semibold uppercase tracking-[0.14em] text-[#E9A13B]">Snelle ronde</p>
          <h2 className="hp-display mb-6 text-[30px] font-semibold leading-tight text-[#1A2D63]">10 trucs voor elke dag</h2>
          <div className="space-y-3">
            {SNELLE_RONDE.map((t, i) => (
              <PromptKaart key={t.titel} prompt={{ label: `${i + 1}. ${t.titel}`, tekst: t.prompt }} />
            ))}
          </div>
        </section>

        <section id="spelregels" className="mb-14 scroll-mt-6">
          <h2 className="hp-display mb-6 text-[30px] font-semibold leading-tight text-[#1A2D63]">Spelregels</h2>
          <div className="space-y-4">
            {SPELREGELS.map((r) => (
              <div key={r.titel}>
                <h3 className="font-semibold text-[#1A2D63]">{r.titel}</h3>
                <p className="mt-1 text-[16px] leading-relaxed">{r.tekst}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-14">
          <h2 className="hp-display mb-6 text-[30px] font-semibold leading-tight text-[#1A2D63]">De tools van vanavond</h2>
          <ul className="space-y-3">
            {TOOLS.map((t) => (
              <li key={t.naam} className="hp-card p-4">
                <a href={t.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 font-semibold text-[#1A2D63] underline">
                  {t.naam} <ExternalLink className="h-3.5 w-3.5" aria-hidden />
                </a>
                <p className="mt-1 text-[15px]">{t.waarvoor}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-3xl bg-[#1A2D63] p-6 text-white sm:p-8">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#E9A13B]">Company brain</p>
          <p className="text-[17px] leading-relaxed text-white/80">{BREIN.probleem}</p>
          <p className="mt-3 text-[17px] leading-relaxed text-white">{BREIN.idee}</p>
          <p className="mt-3 text-[17px] leading-relaxed text-white/80">{BREIN.uitnodiging}</p>
          <Link href={`${LEZING.contactPad}?bron=lezing-open-boek`} className="hp-btn hp-btn--light hp-btn--lg mt-6">
            Plan een gesprek <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </section>

        <p className="mt-10 text-center text-sm text-[#6C7590]">
          {LEZING.spreker} ·{' '}
          <Link href="/" className="hp-link">
            finitsolutions.be
          </Link>
        </p>
      </div>
    </main>
  );
}
