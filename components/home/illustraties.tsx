/**
 * De tekeningen bij "Herken jij dit?" en de oplossing: eenvoudige lijntekeningen
 * als inline SVG, in de stijl van de streep onder de koppen (ui.tsx). Lijnen in
 * marineblauw (1.5 voor wat telt, 1 en lichter voor de rest), vlakken licht
 * getint, per tekening één ding in amber. Geen tekst in de tekening en geen
 * beweging: de pagina houdt één beweging bij het laden.
 *
 * De tekening bij de oplossing tekent met `currentColor`, want die staat op een
 * marineblauwe kaart in het wit.
 */

type Props = { className?: string };

const NAVY = "#1A2D63";
const AMBER = "#E9A13B";

const LIJN = { stroke: NAVY, strokeWidth: 1.5, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
const LICHT = { stroke: NAVY, strokeWidth: 1, strokeOpacity: 0.35, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
const VLAK = { fill: NAVY, fillOpacity: 0.08 };

/** Een envelop van 14 op 10, met de linkerbovenhoek op (x, y). */
function Envelop({ x, y }: { x: number; y: number }) {
  return (
    <g {...LIJN}>
      <rect x={x} y={y} width="14" height="10" rx="1.5" {...VLAK} />
      <path d={`M${x} ${y + 1.5} l7 5 l7 -5`} />
    </g>
  );
}

/** Een document van 11 op 14 met drie regels. */
function Document({ x, y }: { x: number; y: number }) {
  return (
    <g {...LIJN}>
      <rect x={x} y={y} width="11" height="14" rx="1.5" {...VLAK} />
      <path d={`M${x + 3} ${y + 4.5} h5 M${x + 3} ${y + 7.5} h5 M${x + 3} ${y + 10.5} h3`} {...LICHT} />
    </g>
  );
}

/** Een telefoon van 8 op 14. */
function Telefoon({ x, y }: { x: number; y: number }) {
  return (
    <g {...LIJN}>
      <rect x={x} y={y} width="8" height="14" rx="2" {...VLAK} />
      <path d={`M${x + 2.5} ${y + 11.5} h3`} />
    </g>
  );
}

/** Een tekstballon van 14 op 10. */
function Ballon({ x, y }: { x: number; y: number }) {
  return (
    <g {...LIJN}>
      <path d={`M${x + 2} ${y} h10 a2 2 0 0 1 2 2 v5 a2 2 0 0 1 -2 2 h-6 l-3 2.5 v-2.5 h-1 a2 2 0 0 1 -2 -2 v-5 a2 2 0 0 1 2 -2 z`} {...VLAK} />
    </g>
  );
}

/**
 * Je bent de flessenhals: mails, telefoontjes en documenten komen van alle
 * kanten samen in een trechter met één persoon in de hals, en er komt één dun
 * pijltje uit.
 */
export function FlessenhalsTekening({ className = "" }: Props) {
  return (
    <svg viewBox="0 0 240 120" fill="none" preserveAspectRatio="xMidYMid meet" className={className} aria-hidden="true">
      {/* Wat binnenkomt, links */}
      <Envelop x={14} y={12} />
      <Document x={16} y={38} />
      <Ballon x={14} y={68} />
      <Envelop x={14} y={94} />
      <Telefoon x={46} y={22} />
      <Document x={44} y={52} />
      <Envelop x={44} y={82} />
      {/* De lijnen naar de mond van de trechter */}
      <g {...LICHT}>
        <path d="M30 17 L100 20" />
        <path d="M29 45 L104 28" />
        <path d="M30 74 L106 34" />
        <path d="M30 99 L110 40" />
        <path d="M56 29 L118 24" />
        <path d="M57 59 L120 32" />
        <path d="M60 87 L124 40" />
      </g>
      {/* De trechter */}
      <path d="M96 14 H156 L132 62 V96 H120 V62 Z" {...VLAK} {...LIJN} />
      {/* De ene persoon in de hals, in amber */}
      <g stroke={AMBER} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="126" cy="66" r="4.5" />
        <path d="M119 82 a7 7 0 0 1 14 0" />
      </g>
      {/* Wat eruit komt: één dun pijltje */}
      <g {...LIJN}>
        <path d="M126 96 V106 H206" />
        <path d="M200 101 L206 106 L200 111" />
      </g>
    </svg>
  );
}

/**
 * ChatGPT kent je bedrijf niet: een chatvenster met een vaag antwoord naast een
 * gebouwtje met een gesloten map, ertussen een stippellijn die niet doorloopt.
 */
export function ChatgptTekening({ className = "" }: Props) {
  return (
    <svg viewBox="0 0 240 120" fill="none" preserveAspectRatio="xMidYMid meet" className={className} aria-hidden="true">
      {/* Het chatvenster */}
      <g {...LIJN}>
        <rect x="14" y="16" width="102" height="88" rx="8" />
        <path d="M14 32 H116" {...LICHT} />
        <circle cx="24" cy="24" r="1.6" fill={NAVY} fillOpacity="0.35" stroke="none" />
        <circle cx="31" cy="24" r="1.6" fill={NAVY} fillOpacity="0.35" stroke="none" />
        <circle cx="38" cy="24" r="1.6" fill={NAVY} fillOpacity="0.35" stroke="none" />
        {/* De vraag, rechts */}
        <rect x="58" y="40" width="48" height="14" rx="7" {...VLAK} />
        <path d="M67 47 h30" {...LICHT} />
        {/* Het vage antwoord, links: regels die wegsterven */}
        <rect x="24" y="62" width="66" height="30" rx="7" />
        <path d="M32 71 h48" {...LICHT} />
        <path d="M32 77 h36" stroke={NAVY} strokeOpacity="0.22" strokeWidth="1" />
        <path d="M32 83 h20" stroke={NAVY} strokeOpacity="0.12" strokeWidth="1" />
      </g>
      {/* De verbinding die er niet is */}
      <path d="M118 60 H162" stroke={NAVY} strokeOpacity="0.4" strokeWidth="1.5" strokeDasharray="3 4" strokeLinecap="round" />
      <g stroke={AMBER} strokeWidth="2" strokeLinecap="round">
        <path d="M134 54 L146 66 M146 54 L134 66" />
      </g>
      {/* Het bedrijf: een gebouwtje met een gesloten map */}
      <g {...LIJN}>
        <path d="M166 104 V44 H222 V104" {...VLAK} />
        <path d="M160 104 H228" />
        <path d="M162 44 L194 26 L226 44" />
        <rect x="176" y="54" width="9" height="9" rx="1" {...LICHT} />
        <rect x="203" y="54" width="9" height="9" rx="1" {...LICHT} />
        <rect x="176" y="70" width="9" height="9" rx="1" {...LICHT} />
        <path d="M200 80 h4 a3 3 0 0 1 3 3 v13 h-20 v-13 a3 3 0 0 1 3 -3 h6 l2 2 z" fill="#fff" />
        <path d="M187 88 H207" {...LICHT} />
      </g>
    </svg>
  );
}

/**
 * Je weet niet waar te beginnen: een wegwijzer met vier bordjes en een figuurtje
 * ervoor. Eén bordje is amber en wijst vooruit, naar wat volgt op de pagina.
 */
export function BeginnenTekening({ className = "" }: Props) {
  return (
    <svg viewBox="0 0 240 120" fill="none" preserveAspectRatio="xMidYMid meet" className={className} aria-hidden="true">
      {/* De grond en het stippelpad */}
      <path d="M20 108 H220" {...LICHT} />
      <path d="M76 104 Q112 96 146 106" stroke={NAVY} strokeOpacity="0.35" strokeWidth="1.5" strokeDasharray="3 4" strokeLinecap="round" />
      {/* Het figuurtje */}
      <g {...LIJN}>
        <circle cx="58" cy="44" r="7" {...VLAK} />
        <path d="M58 51 V80" />
        <path d="M58 60 L45 72" />
        <path d="M58 60 L71 66" />
        <path d="M58 80 L48 104" />
        <path d="M58 80 L68 104" />
      </g>
      {/* De paal */}
      <g {...LIJN}>
        <path d="M156 108 V14" />
        <path d="M148 108 H164" />
      </g>
      {/* De bordjes: drie in marineblauw, één in amber, vooruit */}
      <path d="M154 20 H116 L106 28 L116 36 H154 Z" {...VLAK} {...LIJN} />
      <path d="M158 40 H196 L206 48 L196 56 H158 Z" fill={AMBER} fillOpacity="0.9" stroke={AMBER} strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M154 60 H120 L110 68 L120 76 H154 Z" {...VLAK} {...LIJN} />
      <path d="M158 80 H190 L200 88 L190 96 H158 Z" {...VLAK} {...LIJN} />
      <g {...LICHT}>
        <path d="M122 28 h22" />
        <path d="M126 68 h18" />
        <path d="M164 88 h16" />
      </g>
    </svg>
  );
}

/** Een rond icoon van straal 16 op (cx, cy), met het icoontje erin getekend rond het middelpunt. */
function Knoop({ cx, cy, children }: { cx: number; cy: number; children: React.ReactNode }) {
  return (
    <g transform={`translate(${cx} ${cy})`}>
      <circle r="16" fill="currentColor" fillOpacity="0.12" stroke="currentColor" strokeWidth="1.5" />
      <g stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none">
        {children}
      </g>
    </g>
  );
}

/**
 * De oplossing: in het midden de map met de pagina's van je fundament, daarrond
 * je systemen (mail, agenda, factuur, chat, betalingen, instellingen) met een
 * lijn naar de map, links de persoon die de map vulde, en in amber wat eruit
 * komt: een afgevinkt document. Tekent met currentColor, voor op de blauwe kaart.
 */
export function OplossingTekening({ className = "", label }: Props & { label?: string }) {
  return (
    <svg viewBox="0 0 320 240" fill="none" preserveAspectRatio="xMidYMid meet" className={className} role={label ? "img" : undefined} aria-label={label} aria-hidden={label ? undefined : true}>
      {/* De lijnen van de systemen naar de map */}
      <g stroke="currentColor" strokeOpacity="0.45" strokeWidth="1.5" strokeLinecap="round">
        <path d="M160 60 V92" />
        <path d="M216 96 L202 108" />
        <path d="M216 160 L202 148" />
        <path d="M160 196 V162" />
        <path d="M104 160 L118 148" />
        <path d="M104 96 L118 108" />
      </g>
      {/* De persoon die de map vulde, links, met een stippellijn */}
      <g stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="36" cy="118" r="7" fill="currentColor" fillOpacity="0.12" />
        <path d="M25 140 a11 11 0 0 1 22 0" />
        <path d="M50 128 H116" strokeOpacity="0.5" strokeDasharray="3 4" />
      </g>
      {/* De map met drie pagina's */}
      <g stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="148" y="66" width="44" height="30" rx="3" fill="currentColor" fillOpacity="0.1" />
        <rect x="142" y="72" width="44" height="30" rx="3" fill="currentColor" fillOpacity="0.1" />
        <rect x="136" y="78" width="44" height="30" rx="3" fill="currentColor" fillOpacity="0.1" />
        <path d="M144 88 h20 M144 94 h14" strokeOpacity="0.5" />
        <path d="M118 104 V98 a6 6 0 0 1 6 -6 h26 l8 8 h36 a6 6 0 0 1 6 6 v46 a6 6 0 0 1 -6 6 h-70 a6 6 0 0 1 -6 -6 z" fill="currentColor" fillOpacity="0.16" />
        <path d="M118 116 H202" strokeOpacity="0.5" />
      </g>
      {/* De systemen */}
      <Knoop cx={160} cy={44}>
        <rect x="-8" y="-5.5" width="16" height="11" rx="1.5" />
        <path d="M-8 -4 l8 5.5 l8 -5.5" />
      </Knoop>
      <Knoop cx={228} cy={86}>
        <rect x="-7.5" y="-6" width="15" height="13" rx="1.5" />
        <path d="M-7.5 -2 H7.5 M-4 -8.5 v3 M4 -8.5 v3" />
      </Knoop>
      <Knoop cx={228} cy={170}>
        <path d="M-6 -8 h9 l3 3 v13 h-12 z" />
        <path d="M-3 0 h6 M-3 4 h4" />
      </Knoop>
      <Knoop cx={160} cy={212}>
        <path d="M-6 -6 h12 a2 2 0 0 1 2 2 v6 a2 2 0 0 1 -2 2 h-6 l-4 3.5 v-3.5 h-2 a2 2 0 0 1 -2 -2 v-6 a2 2 0 0 1 2 -2 z" />
      </Knoop>
      <Knoop cx={92} cy={170}>
        <circle r="7" />
        <circle r="3" />
      </Knoop>
      <Knoop cx={92} cy={86}>
        <circle r="3" />
        <path d="M0 -8 v3 M0 5 v3 M-8 0 h3 M5 0 h3 M-5.7 -5.7 l2.1 2.1 M3.6 3.6 l2.1 2.1 M5.7 -5.7 l-2.1 2.1 M-3.6 3.6 l-2.1 2.1" />
      </Knoop>
      {/* Wat eruit komt: een afgevinkt document, in amber */}
      <g stroke={AMBER} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M204 128 H248" />
        <path d="M243 123 L248 128 L243 133" />
        <path d="M258 108 h20 l8 8 v34 h-28 z" fill={AMBER} fillOpacity="0.16" />
        <path d="M266 134 l5 5 l10 -11" />
      </g>
    </svg>
  );
}
