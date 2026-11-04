import React from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react';

import { SKOOL_URL } from '@/lib/finit-links';
import { BRONNEN } from './copy';

// Herkomst "bronnen", zodat Skool en het formulier van Karel tonen waar iemand vandaan komt.
const SKOOL_HREF = `${SKOOL_URL}/about?utm_source=bronnen&utm_medium=bronnenpagina`;
const KAREL_HREF = '/hub/?bron=bronnen#karel';

function BronLink({ url, site }: { url: string; site: string }) {
  return (
    <p className="mt-3 text-[15px] text-[#6C7590]">
      {BRONNEN.bron}{' '}
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 font-semibold text-[#1A2D63] underline decoration-[#1A2D63]/30 underline-offset-4 hover:decoration-[#1A2D63]"
      >
        {site} <ExternalLink className="h-3.5 w-3.5" aria-hidden />
      </a>
    </p>
  );
}

export function BronnenPagina() {
  return (
    <main className="min-h-screen bg-white text-[#3D4766]">
      <header className="bg-[#1A2D63] px-4 pb-12 pt-10 text-white sm:px-8">
        <div className="mx-auto max-w-[720px]">
          <Link href="/hub/#resources" className="mb-8 inline-flex items-center gap-1.5 text-sm text-white/75 hover:text-white">
            <ArrowLeft className="h-4 w-4" aria-hidden /> {BRONNEN.terug}
          </Link>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-[#FBE286]">{BRONNEN.label}</p>
          <h1 className="hp-display text-balance text-[34px] font-semibold leading-[1.08] sm:text-5xl">{BRONNEN.titel}</h1>
          <p className="mt-4 text-[17px] leading-relaxed text-white/80">{BRONNEN.intro}</p>
        </div>
      </header>

      <div className="mx-auto max-w-[720px] px-4 py-10 sm:px-8">
        <p className="mb-12 rounded-2xl bg-[#E6ECF9] p-5 text-[16px] leading-relaxed text-[#1A2D63]">{BRONNEN.watIsHet}</p>

        <section className="mb-12">
          <h2 className="hp-display mb-6 text-[28px] font-semibold leading-tight text-[#1A2D63]">{BRONNEN.wieTitel}</h2>
          <ul className="space-y-4">
            {BRONNEN.wie.map((u) => (
              <li key={u.wie} className="hp-card p-5">
                <p className="font-semibold text-[#1A2D63]">
                  {u.wie}
                  {u.rol && <span className="font-normal text-[#6C7590]"> · {u.rol}</span>}
                </p>
                <p className="mt-2 text-[16px] leading-relaxed">{u.tekst}</p>
                <BronLink url={u.url} site={u.site} />
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="hp-display mb-6 text-[28px] font-semibold leading-tight text-[#1A2D63]">{BRONNEN.cijfersTitel}</h2>
          <ul className="space-y-4">
            {BRONNEN.cijfers.map((c) => (
              <li key={c.bron} className="hp-card flex flex-col gap-3 p-5 sm:flex-row sm:gap-5">
                <span className="hp-display flex-none text-[36px] font-bold leading-none text-[#1A2D63] sm:w-24">
                  {c.cijfer}
                </span>
                <div>
                  <p className="text-[16px] leading-relaxed">{c.tekst}</p>
                  <p className="mt-1 text-[14px] text-[#6C7590]">{c.bron}</p>
                  <BronLink url={c.url} site={c.site} />
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-3xl bg-[#1A2D63] p-6 text-white sm:p-8">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#FBE286]">{BRONNEN.ctaLabel}</p>
          <p className="text-[17px] leading-relaxed text-white/85">{BRONNEN.ctaTekst}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href={SKOOL_HREF} target="_blank" rel="noopener noreferrer" className="hp-btn hp-btn--light hp-btn--lg">
              {BRONNEN.ctaZelf} <ArrowRight className="h-4 w-4" aria-hidden />
            </a>
            <Link href={KAREL_HREF} className="hp-btn hp-btn--lg !border-white/50 text-white hover:bg-white/10">
              {BRONNEN.ctaLaten}
            </Link>
          </div>
        </section>

        <p className="mt-10 text-center text-sm text-[#6C7590]">
          Finit Solutions ·{' '}
          <Link href="/" className="hp-link">
            finitsolutions.be
          </Link>
        </p>
      </div>
    </main>
  );
}
