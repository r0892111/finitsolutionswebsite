import React from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';

import { SKOOL_URL } from '@/lib/finit-links';
import type { PromptPagina as Pagina } from '@/lib/prompts';
import { KopieerKnop } from './kopieer-knop';

const TIP_ALGEMEEN =
  'Ze werken in ChatGPT en Claude, en ook in Gemini of Copilot. Vul in wat tussen [haakjes] staat. Eindig een prompt met "Stel me eerst je vragen." Dan vraagt de AI eerst wat hij nog moet weten.';

/** Toont de prompt zoals hij gekopieerd wordt, met wat je zelf invult ([…]) in het geel. */
function PromptTekst({ tekst }: { tekst: string }) {
  const delen = tekst.split(/(\[[^\]]+\])/g);
  return (
    <p className="whitespace-pre-wrap break-words rounded-xl bg-[#F4F6FA] p-4 text-[15px] leading-relaxed text-[#1A2D63]">
      {delen.map((deel, i) =>
        deel.startsWith('[') && deel.endsWith(']') ? (
          <mark key={i} className="rounded bg-[#FBE286] px-0.5 text-[#1A2D63]">
            {deel}
          </mark>
        ) : (
          <React.Fragment key={i}>{deel}</React.Fragment>
        ),
      )}
    </p>
  );
}

export function PromptPagina({ pagina }: { pagina: Pagina }) {
  const herkomst = `bron=prompts&reel=${pagina.reel}`;

  return (
    <main className="min-h-screen bg-white text-[#3D4766]">
      <header className="bg-[#1A2D63] px-4 pb-12 pt-10 text-white sm:px-8">
        <div className="mx-auto max-w-[720px]">
          <Link href="/hub/#resources" className="mb-8 inline-flex items-center gap-1.5 text-sm text-white/75 hover:text-white">
            <ArrowLeft className="h-4 w-4" aria-hidden /> Alle gidsen en prompts
          </Link>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-[#FBE286]">{pagina.kicker}</p>
          <h1 className="hp-display text-balance text-[34px] font-semibold leading-[1.08] sm:text-5xl">{pagina.titel}</h1>
          <p className="mt-4 text-[17px] leading-relaxed text-white/80">{pagina.intro}</p>
        </div>
      </header>

      <div className="mx-auto max-w-[720px] px-4 py-10 sm:px-8">
        <div className="mb-10 space-y-2 rounded-2xl bg-[#E6ECF9] p-5 text-[16px] leading-relaxed text-[#1A2D63]">
          {pagina.tip && <p className="font-semibold">{pagina.tip}</p>}
          <p>{TIP_ALGEMEEN}</p>
        </div>

        <ol className="mb-12 space-y-6">
          {pagina.prompts.map((p, i) => (
            <li key={p.titel} className="hp-card p-5 sm:p-6">
              <div className="flex items-start gap-3">
                <span className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-[#FBE286] text-[15px] font-semibold text-[#1A2D63]">
                  {i + 1}
                </span>
                <div className="min-w-0 flex-1">
                  <h2 className="hp-display hp-display-sm text-[21px] font-semibold leading-tight text-[#1A2D63]">{p.titel}</h2>
                  {p.uitleg && <p className="mt-1.5 text-[15px] leading-relaxed">{p.uitleg}</p>}
                </div>
              </div>
              <div className="mt-4">
                <PromptTekst tekst={p.tekst} />
              </div>
              <div className="mt-4">
                <KopieerKnop tekst={p.tekst} id={`${pagina.reel}-${i + 1}`} />
              </div>
            </li>
          ))}
        </ol>

        <section className="rounded-3xl bg-[#1A2D63] p-6 text-white sm:p-8">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#FBE286]">Een stap verder?</p>
          <p className="text-[17px] leading-relaxed text-white/85">
            Deze prompts werken nog beter als je AI je bedrijf kent. Bouw dat brein zelf met onze lesreeks, of laat het ons doen.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={`${SKOOL_URL}/about?utm_source=prompts&utm_medium=promptpagina&utm_content=${pagina.reel}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hp-btn hp-btn--light hp-btn--lg"
            >
              Start met de lesreeks <ArrowRight className="h-4 w-4" aria-hidden />
            </a>
            <Link href={`/hub/?${herkomst}#karel`} className="hp-btn hp-btn--lg !border-white/50 text-white hover:bg-white/10">
              Plan een call met Karel
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
