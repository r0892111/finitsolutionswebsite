import { BEATS } from "./copy";

/**
 * Drie stilstaande beelden van hoe een brein ontstaat en wat het doet:
 * jij praat (spraakmemo) → de AI schrijft (pagina's) → jij vraagt (antwoord).
 * Echte volgorde, dus de nummers zijn verdiend.
 */

const GOLF = [6, 10, 16, 22, 14, 26, 20, 12, 24, 18, 8, 14, 22, 26, 16, 10, 20, 24, 12, 18, 26, 14, 8, 16, 22, 12, 6, 10];

export function DrieBeats() {
  return (
    <ol className="grid gap-6 md:grid-cols-3 md:gap-5 lg:gap-6">
      {/* 1. Jij praat */}
      <li>
        <p className="text-[0.8125rem] font-medium text-[#76706A]">{BEATS.een.label}</p>
        <div className="fs-paper mt-3 rounded-[10px] border border-[#E8E6DC] bg-[#FFFEFA] p-5">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#1A2D63]" aria-hidden="true">
              <svg width="12" height="14" viewBox="0 0 12 14">
                <path d="M1 1.5v11l10-5.5z" fill="#FDFBF7" />
              </svg>
            </span>
            <div className="fs-wave flex-1" aria-hidden="true">
              {GOLF.map((h, i) => (
                <span key={i} style={{ height: `${h}px`, opacity: i < 17 ? 0.85 : 0.3 }} />
              ))}
            </div>
            <span className="text-[0.8125rem] text-[#76706A]">{BEATS.een.duur}</span>
          </div>
          <p className="mt-4 text-[0.875rem] leading-[1.5] text-[#57514A]">{BEATS.een.titel}</p>
        </div>
        <p className="mt-3 text-[0.9375rem] leading-[1.55] text-[#57514A]">{BEATS.een.uitleg}</p>
      </li>

      {/* 2. De AI schrijft */}
      <li>
        <p className="text-[0.8125rem] font-medium text-[#76706A]">{BEATS.twee.label}</p>
        <div className="fs-paper mt-3 rounded-[10px] border border-[#E8E6DC] bg-[#FFFEFA] p-5">
          <div className="flex items-baseline justify-between text-[0.75rem] text-[#76706A]">
            <span>{BEATS.twee.map}</span>
            <span>{BEATS.twee.aantal}</span>
          </div>
          <ul className="mt-2 divide-y divide-[#EFEDE3]">
            {BEATS.twee.paginas.map((pg) => (
              <li key={pg.naam} className="flex items-baseline justify-between gap-3 py-2 text-[0.875rem]">
                <span className="text-[#2A2620]">{pg.naam}</span>
                <span className="shrink-0 text-[0.75rem] text-[#94908A]">{pg.wanneer}</span>
              </li>
            ))}
          </ul>
        </div>
        <p className="mt-3 text-[0.9375rem] leading-[1.55] text-[#57514A]">{BEATS.twee.uitleg}</p>
      </li>

      {/* 3. Jij vraagt */}
      <li>
        <p className="text-[0.8125rem] font-medium text-[#76706A]">{BEATS.drie.label}</p>
        <div className="fs-paper mt-3 rounded-[10px] border border-[#E8E6DC] bg-[#FFFEFA] p-5">
          <div className="grid grid-cols-[2.25rem_1fr] gap-x-2 gap-y-3 text-[0.875rem] leading-[1.5]">
            <span className="font-medium text-[#76706A]">Jij</span>
            <p className="text-[#57514A]">{BEATS.drie.vraag}</p>
            <span className="font-medium text-[#1A2D63]">AI</span>
            <p className="text-[#2A2620]">{BEATS.drie.antwoord}</p>
          </div>
        </div>
        <p className="mt-3 text-[0.9375rem] leading-[1.55] text-[#57514A]">{BEATS.drie.uitleg}</p>
      </li>
    </ol>
  );
}
