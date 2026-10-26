import React from 'react';
import Link from 'next/link';
import { ArrowRight, Download, ExternalLink } from 'lucide-react';

import { KopieerBestandKnop } from '@/components/startpakket/kopieer-bestand-knop';

const BESTAND = '/startpakket-ai.md';

const STAPPEN = [
  {
    titel: 'Download het bestand',
    tekst: 'Of kopieer de volledige tekst als je op je gsm zit.',
  },
  {
    titel: 'Sleep het in Claude en zeg: "Volg dit."',
    tekst: 'Liefst in Claude Code (bij ChatGPT heet dat Codex). De gewone chat werkt ook.',
  },
  {
    titel: 'Laat je interviewen',
    tekst: 'De AI stelt je vragen, één per één. Antwoord door te praten: je vertelt dan vanzelf meer.',
  },
];

const INHOUD = [
  'Je profiel: de AI leert jou en je bedrijf één keer kennen',
  'Een eerlijke assistent die doorvraagt en je tegenspreekt',
  'Je schrijfstijl, zodat alles klinkt als jij',
  'Elke ochtend een opgeruimde inbox met antwoorden klaar',
  'Je bestanden opruimen, je brainstormmap, je eerste skill',
  'Alle prompts van de workshop, klaar om te kopiëren',
];

const TOOLS = [
  { naam: 'Wispr Flow', url: 'https://wisprflow.ai', tekst: 'Betalend, wat wij gebruiken. Mac, Windows, iPhone, Android.' },
  { naam: 'Handy', url: 'https://handy.computer', tekst: 'Gratis en open source. Draait volledig op je eigen computer.' },
  { naam: 'OpenWhispr', url: 'https://openwhispr.com', tekst: 'Gratis en open source.' },
];

export function StartpakketPagina() {
  return (
    <main className="min-h-screen bg-white text-[#3D4766]">
      <header className="bg-[#1A2D63] px-4 pb-12 pt-12 text-white sm:px-8">
        <div className="mx-auto max-w-[720px]">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-[#FBE286]">AI-workshop · Finit Solutions</p>
          <h1 className="hp-display text-[38px] font-semibold leading-[1.05] sm:text-5xl">Het startpakket</h1>
          <p className="mt-4 text-[17px] leading-relaxed text-white/80">
            Eén bestand dat je in je AI sleept. Hij neemt het over, interviewt je en zet alles voor je op. Reken op een
            halfuurtje.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={BESTAND} download="Startpakket-AI-Finit.md" className="hp-btn hp-btn--light hp-btn--lg">
              <Download className="h-4 w-4" aria-hidden />
              Download het startpakket
            </a>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-[720px] px-4 py-10 sm:px-8">
        <section className="mb-12">
          <h2 className="hp-display mb-6 text-[28px] font-semibold leading-tight text-[#1A2D63]">Zo werkt het</h2>
          <ol className="space-y-5">
            {STAPPEN.map((stap, i) => (
              <li key={stap.titel} className="flex gap-4">
                <span className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-[#FBE286] font-semibold text-[#1A2D63]">
                  {i + 1}
                </span>
                <div>
                  <p className="font-semibold text-[#1A2D63]">{stap.titel}</p>
                  <p className="mt-1 text-[16px] leading-relaxed">{stap.tekst}</p>
                </div>
              </li>
            ))}
          </ol>
          <KopieerBestandKnop pad={BESTAND} className="mt-8" />
        </section>

        <section className="mb-12">
          <h2 className="hp-display mb-6 text-[28px] font-semibold leading-tight text-[#1A2D63]">Wat zit erin?</h2>
          <ul className="space-y-3">
            {INHOUD.map((punt) => (
              <li key={punt} className="flex gap-3 text-[16px] leading-relaxed">
                <span className="mt-2.5 h-2 w-2 flex-none rounded-full bg-[#1A2D63]" aria-hidden />
                {punt}
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="hp-display mb-2 text-[28px] font-semibold leading-tight text-[#1A2D63]">Praten in plaats van typen</h2>
          <p className="mb-6 text-[16px] leading-relaxed">Je praat drie keer sneller dan je typt, en je geeft vanzelf meer context.</p>
          <ul className="space-y-3">
            {TOOLS.map((tool) => (
              <li key={tool.naam} className="hp-card p-4">
                <a
                  href={tool.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 font-semibold text-[#1A2D63] underline"
                >
                  {tool.naam} <ExternalLink className="h-3.5 w-3.5" aria-hidden />
                </a>
                <p className="mt-1 text-[15px]">{tool.tekst}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-3xl bg-[#1A2D63] p-6 text-white sm:p-8">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#FBE286]">Voor heel je bedrijf</p>
          <p className="text-[17px] leading-relaxed text-white/85">
            Dit startpakket leert jouw AI jou kennen. Wil je dat een AI heel je bedrijf kent, voor al je collega&apos;s? Dat
            is wat wij bij Finit Solutions doen.
          </p>
          <Link href="/contact/?bron=startpakket" className="hp-btn hp-btn--light hp-btn--lg mt-6">
            Kom eens praten <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
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
