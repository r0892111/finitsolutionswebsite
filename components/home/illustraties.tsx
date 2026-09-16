/**
 * De tekeningen bij "Herken jij dit?" en de oplossing: kleine scènes als inline SVG
 * (viewBox 480 op 320). In alle vier staat dezelfde zaakvoerder in de lichtblauwe trui,
 * zodat de reeks één verhaal is: overladen, gefrustreerd, in de war, geholpen. Elk deel
 * van de zin staat in beeld, en niets anders.
 *
 * Lijnen in marineblauw, vlakken wit en lichtblauw, per tekening één accent in amber: waar
 * het wringt of waar AI helpt. Figuren zonder gezicht, geen tekst in de tekening, geen
 * beweging.
 *
 * Gemaakt voor een lichte ondergrond, zonder kader: bij de herkenning staan ze rechtstreeks
 * op de lichte band. Op de marineblauwe kaart van de oplossing staat de tekening op een wit
 * vlak (oplossing-sectie.tsx).
 */

type Props = { className?: string };
type Haar = "kort" | "lang" | "knot";

const NAVY = "#1A2D63";
const LICHTBLAUW = "#E6ECF9";
const TRUI = "#C3D0EE";
const WIT = "#FFFFFF";
const AMBER = "#E9A13B";

const LIJN = { stroke: NAVY, strokeWidth: 2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
const LICHT = { stroke: NAVY, strokeOpacity: 0.32, strokeWidth: 1.6, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, fill: "none" };
const STIPPEL = { stroke: NAVY, strokeOpacity: 0.4, strokeWidth: 1.8, strokeDasharray: "2 6", strokeLinecap: "round" as const, fill: "none" };

function Scene({ className = "", label, children }: Props & { label?: string; children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 480 320"
      fill="none"
      preserveAspectRatio="xMidYMid meet"
      className={className}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      {children}
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Bouwstenen                                                          */
/* ------------------------------------------------------------------ */

const Vloer = () => <ellipse cx={240} cy={280} rx={222} ry={13} fill={LICHTBLAUW} />;

function Schaduw({ x, y, rx }: { x: number; y: number; rx: number }) {
  return <ellipse cx={x} cy={y} rx={rx} ry={4} fill={NAVY} fillOpacity={0.08} />;
}

/** Een arm of been: een dikke marineblauwe lijn met de kleur erin, zodat hij een omtrek heeft. */
function Lid({ d, kleur }: { d: string; kleur: string }) {
  return (
    <>
      <path d={d} stroke={NAVY} strokeWidth={12} strokeLinecap="round" strokeLinejoin="round" />
      <path d={d} stroke={kleur} strokeWidth={8} strokeLinecap="round" strokeLinejoin="round" />
    </>
  );
}

const Hand = ({ x, y }: { x: number; y: number }) => <circle cx={x} cy={y} r={5} fill={WIT} {...LIJN} />;

/** Een romp met ronde schouders en een kraagje; t is de schouderlijn, b de onderkant. */
function Romp({ x, t, b, kleur }: { x: number; t: number; b: number; kleur: string }) {
  return (
    <>
      <path d={`M${x - 18} ${b} L${x - 19} ${t + 12} Q${x - 19} ${t} ${x - 7} ${t} H${x + 7} Q${x + 19} ${t} ${x + 19} ${t + 12} L${x + 18} ${b} Z`} fill={kleur} {...LIJN} />
      <path d={`M${x - 6} ${t} L${x} ${t + 7} L${x + 6} ${t}`} {...LIJN} />
    </>
  );
}

function Hoofd({ x, y, haar = "kort" }: { x: number; y: number; haar?: Haar }) {
  const lok =
    haar === "lang"
      ? `M${x - 14} ${y + 2} C${x - 14} ${y - 14} ${x - 4} ${y - 18} ${x} ${y - 18} C${x + 10} ${y - 18} ${x + 15} ${y - 12} ${x + 14} ${y + 2} C${x + 8} ${y - 8} ${x - 6} ${y - 6} ${x - 14} ${y + 2} Z`
      : `M${x - 14} ${y + 1} C${x - 16} ${y - 15} ${x - 5} ${y - 19} ${x + 2} ${y - 18} C${x + 12} ${y - 17} ${x + 16} ${y - 9} ${x + 14} ${y + 2} C${x + 9} ${y - 6} ${x - 3} ${y - 9} ${x - 14} ${y + 1} Z`;
  return (
    <>
      {haar === "lang" && <path d={`M${x - 15} ${y + 16} C${x - 19} ${y - 2} ${x - 15} ${y - 19} ${x} ${y - 19} C${x + 15} ${y - 19} ${x + 19} ${y - 2} ${x + 15} ${y + 16} Z`} fill={NAVY} {...LIJN} />}
      {haar === "knot" && <circle cx={x + 1} cy={y - 20} r={6} fill={NAVY} {...LIJN} />}
      <circle cx={x} cy={y} r={14} fill={WIT} {...LIJN} />
      <path d={lok} fill={NAVY} {...LIJN} />
    </>
  );
}

/** Het AI-sterretje: vier punten. */
function Ster({ x, y, r, kleur }: { x: number; y: number; r: number; kleur: string }) {
  const k = r * 0.26;
  return (
    <path
      d={`M${x} ${y - r} Q${x + k} ${y - k} ${x + r} ${y} Q${x + k} ${y + k} ${x} ${y + r} Q${x - k} ${y + k} ${x - r} ${y} Q${x - k} ${y - k} ${x} ${y - r} Z`}
      fill={kleur}
      stroke={kleur}
      strokeWidth={1.4}
      strokeLinejoin="round"
    />
  );
}

/** Een staande figuur; (x, y) is het midden tussen de voeten. De children komen vóór de figuur (armen, wat hij vasthoudt). */
function Staand({ x, y, trui = TRUI, haar = "kort", children }: { x: number; y: number; trui?: string; haar?: Haar; children?: React.ReactNode }) {
  const t = y - 92;
  const b = y - 44;
  return (
    <g>
      <Schaduw x={x} y={y} rx={26} />
      <Lid d={`M${x - 8} ${b - 2} L${x - 9} ${y - 6}`} kleur={NAVY} />
      <Lid d={`M${x + 8} ${b - 2} L${x + 9} ${y - 6}`} kleur={NAVY} />
      <ellipse cx={x - 12} cy={y - 3} rx={9} ry={4.5} fill={NAVY} />
      <ellipse cx={x + 12} cy={y - 3} rx={9} ry={4.5} fill={NAVY} />
      <Romp x={x} t={t} b={b} kleur={trui} />
      <Hoofd x={x} y={y - 107} haar={haar} />
      {children}
    </g>
  );
}

/** Een hangende arm bij een staande figuur; kant 1 is rechts, -1 links. */
function HangArm({ x, y, kant, trui }: { x: number; y: number; kant: 1 | -1; trui: string }) {
  const t = y - 92;
  return (
    <>
      <Lid d={`M${x + 16 * kant} ${t + 10} Q${x + 25 * kant} ${t + 28} ${x + 23 * kant} ${t + 44}`} kleur={trui} />
      <Hand x={x + 23 * kant} y={t + 47} />
    </>
  );
}

/**
 * Een zittende figuur met de benen naar rechts; s is de hoogte van de zitting, de vloer ligt op s + 40.
 * `ai` tekent de AI-werknemer: een afgerond vierkant met het amber sterretje als hoofd.
 */
function Zittend({ x, s, trui = TRUI, haar = "kort", ai = false, children }: { x: number; s: number; trui?: string; haar?: Haar; ai?: boolean; children?: React.ReactNode }) {
  const t = s - 46;
  return (
    <g>
      <Lid d={`M${x - 4} ${s - 3} L${x + 24} ${s - 1} L${x + 22} ${s + 33}`} kleur={NAVY} />
      <ellipse cx={x + 27} cy={s + 37} rx={9} ry={4.5} fill={NAVY} />
      <Lid d={`M${x + 2} ${s - 5} L${x + 32} ${s - 5} L${x + 34} ${s + 33}`} kleur={NAVY} />
      <ellipse cx={x + 39} cy={s + 37} rx={9} ry={4.5} fill={NAVY} />
      <Romp x={x} t={t} b={s} kleur={trui} />
      {ai ? (
        <>
          <rect x={x - 15} y={t - 31} width={30} height={30} rx={10} fill={WIT} {...LIJN} />
          <Ster x={x} y={t - 16} r={9} kleur={AMBER} />
        </>
      ) : (
        <Hoofd x={x} y={t - 15} haar={haar} />
      )}
      {children}
    </g>
  );
}

function Stoel({ x, s }: { x: number; s: number }) {
  return (
    <g>
      <Schaduw x={x + 8} y={s + 41} rx={34} />
      <path d={`M${x - 24} ${s + 2} L${x - 28} ${s - 40}`} stroke={NAVY} strokeWidth={5} strokeLinecap="round" />
      <path d={`M${x - 18} ${s + 6} L${x - 20} ${s + 40} M${x + 18} ${s + 6} L${x + 20} ${s + 40}`} {...LIJN} />
      <rect x={x - 22} y={s - 1} width={46} height={7} rx={3} fill={WIT} {...LIJN} />
    </g>
  );
}

/** Een bureau van opzij met een laptop erop, het scherm naar links; voor wie links op een stoel zit. */
function BureauMetLaptop({ x }: { x: number }) {
  return (
    <>
      <path d={`M${x + 8} 217 V278 M${x + 88} 217 V278`} {...LIJN} />
      <rect x={x} y={210} width={96} height={7} rx={3} fill={WIT} {...LIJN} />
      <rect x={x + 26} y={204} width={48} height={6} rx={2} fill={WIT} {...LIJN} />
      <path d={`M${x + 72} 206 L${x + 83} 164 L${x + 89} 165 L${x + 78} 207 Z`} fill={NAVY} {...LIJN} />
    </>
  );
}

function Envelop({ x, y, w = 36, h = 26 }: { x: number; y: number; w?: number; h?: number }) {
  return (
    <>
      <rect x={x} y={y} width={w} height={h} rx={3} fill={WIT} {...LIJN} />
      <path d={`M${x + 2} ${y + 3} L${x + w / 2} ${y + h * 0.55} L${x + w - 2} ${y + 3}`} {...LIJN} />
    </>
  );
}

/** Een tekstballon met het staartje linksonder. */
function Ballon({ x, y, w, h, fill = WIT }: { x: number; y: number; w: number; h: number; fill?: string }) {
  return (
    <path
      d={`M${x + 6} ${y} H${x + w - 6} A6 6 0 0 1 ${x + w} ${y + 6} V${y + h - 6} A6 6 0 0 1 ${x + w - 6} ${y + h} H${x + 14} L${x + 8} ${y + h + 7} V${y + h} H${x + 6} A6 6 0 0 1 ${x} ${y + h - 6} V${y + 6} A6 6 0 0 1 ${x + 6} ${y} Z`}
      fill={fill}
      {...LIJN}
    />
  );
}

/** Een telefoon die rinkelt. */
function Telefoon({ x, y, w = 22, h = 36 }: { x: number; y: number; w?: number; h?: number }) {
  return (
    <>
      <rect x={x} y={y} width={w} height={h} rx={4} fill={WIT} {...LIJN} />
      <rect x={x + 4} y={y + 5} width={w - 8} height={h - 13} rx={1.5} fill={LICHTBLAUW} />
      <path d={`M${x + w + 5} ${y + 10} a9 9 0 0 1 0 12 M${x + w + 10} ${y + 5} a15 15 0 0 1 0 22`} {...LICHT} />
    </>
  );
}

/** Een document met een omgeslagen hoek en drie regels. */
function Doc({ x, y, w = 28, h = 36 }: { x: number; y: number; w?: number; h?: number }) {
  return (
    <>
      <path d={`M${x} ${y} H${x + w - 8} L${x + w} ${y + 8} V${y + h} H${x} Z`} fill={WIT} {...LIJN} />
      <path d={`M${x + w - 8} ${y} V${y + 8} H${x + w}`} {...LIJN} />
      <path d={`M${x + 5} ${y + h * 0.4} H${x + w - 6} M${x + 5} ${y + h * 0.58} H${x + w - 6} M${x + 5} ${y + h * 0.76} H${x + w - 11}`} {...LICHT} />
    </>
  );
}

/** Een kalenderblad met één geboekt vakje. */
function Kalender({ x, y, w = 34, h = 30 }: { x: number; y: number; w?: number; h?: number }) {
  const vakjes = [0, 1, 2].flatMap((i) => [0, 1].map((j) => ({ i, j })));
  return (
    <>
      <rect x={x} y={y} width={w} height={h} rx={3} fill={WIT} {...LIJN} />
      <path d={`M${x} ${y + 9} H${x + w} M${x + 9} ${y - 3} v6 M${x + w - 9} ${y - 3} v6`} {...LIJN} />
      {vakjes.map(({ i, j }) => (
        <rect key={`${i}-${j}`} x={x + 5 + i * 9} y={y + 13 + j * 8} width={6} height={5} rx={1} fill={i === 1 && j === 0 ? NAVY : LICHTBLAUW} />
      ))}
    </>
  );
}

function Vraagteken({ cx, cy, kleur = NAVY, schaal = 1 }: { cx: number; cy: number; kleur?: string; schaal?: number }) {
  return (
    <g transform={`translate(${cx} ${cy}) scale(${schaal})`}>
      <path d="M-4 -4 A4.5 4.5 0 1 1 1.5 0.8 C0 1.6 0 2.5 0 4" stroke={kleur} strokeWidth={2.4} strokeLinecap="round" />
      <circle cx={0} cy={8.5} r={1.6} fill={kleur} />
    </g>
  );
}

function Uitroep({ x, y }: { x: number; y: number }) {
  return (
    <>
      <path d={`M${x} ${y - 8} V${y + 1}`} stroke={NAVY} strokeWidth={2.4} strokeLinecap="round" />
      <circle cx={x} cy={y + 6} r={1.6} fill={NAVY} />
    </>
  );
}

function VinkBadge({ cx, cy }: { cx: number; cy: number }) {
  return (
    <>
      <circle cx={cx} cy={cy} r={9} fill={NAVY} />
      <path d={`M${cx - 4} ${cy} l3 3 l5.5 -6`} stroke={WIT} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </>
  );
}

/** Een venster van een app, 86 op 60, met een kopbalk. */
function Venster({ y }: { y: number }) {
  return (
    <>
      <rect x={380} y={y} width={86} height={60} rx={8} fill={WIT} {...LIJN} />
      <path d={`M380 ${y + 12} H466`} {...LIJN} />
    </>
  );
}

/* ------------------------------------------------------------------ */
/* De tekeningen                                                       */
/* ------------------------------------------------------------------ */

/**
 * Al het werk en controle passeert nog langs jou: de zaakvoerder achter zijn bureau houdt
 * met beide handen alles draaiende (een mail, de planning, een document in de lucht).
 * Op het bureau liggen de stapels, een telefoon en een bericht vliegen erop af, en twee
 * collega's komen er nog meer op leggen: links een dossier met een vraag, rechts een
 * document om na te kijken. In amber: de stressstreepjes boven het hoofd.
 */
export function FlessenhalsTekening({ className = "" }: Props) {
  const dossiers = [0, -3, 2, -2, 1];
  const papieren = [0, 3, -2, 2];
  return (
    <Scene className={className}>
      <Vloer />
      {/* Wat binnenkomt, recht op het bureau */}
      <g {...STIPPEL}>
        <path d="M66 70 C110 90 150 130 176 170" />
        <path d="M418 58 C380 80 334 122 304 182" />
      </g>
      <Telefoon x={40} y={38} />
      <Ballon x={416} y={30} w={38} h={26} fill={LICHTBLAUW} />
      <g fill={NAVY}>
        <circle cx={427} cy={43} r={2} />
        <circle cx={435} cy={43} r={2} />
        <circle cx={443} cy={43} r={2} />
      </g>

      {/* Alles draaiende houden: wat hij in de lucht houdt */}
      <path d="M200 152 C126 22 354 22 280 152" {...STIPPEL} />
      <path d="M156 104 l-7 3 M159 92 l-7 -1 M324 104 l7 3 M321 92 l7 -1" {...LICHT} />
      <Envelop x={169} y={77} />
      <Kalender x={223} y={39} />
      <Doc x={279} y={72} />

      {/* De zaakvoerder achter het bureau, de handen op schouderhoogte: jongleren, niet juichen */}
      <Staand x={240} y={276}>
        <Lid d="M224 194 Q194 192 198 166" kleur={TRUI} />
        <Hand x={198} y={163} />
        <Lid d="M256 194 Q286 192 282 166" kleur={TRUI} />
        <Hand x={282} y={163} />
        <path d="M223 146 L217 137 M257 146 L263 137 M240 143 V133" stroke={AMBER} strokeWidth={2.6} strokeLinecap="round" />
      </Staand>

      {/* Het bureau met de stapels */}
      <rect x={156} y={230} width={168} height={46} fill={WIT} {...LIJN} />
      <path d="M232 252 H248" {...LIJN} />
      <rect x={146} y={222} width={188} height={9} rx={3} fill={WIT} {...LIJN} />
      {dossiers.map((dx, k) => (
        <rect key={`d${k}`} x={150 + dx} y={222 - 10 * (k + 1)} width={42} height={10} rx={2} fill={k % 2 ? LICHTBLAUW : WIT} {...LIJN} />
      ))}
      {papieren.map((dx, k) => (
        <rect key={`p${k}`} x={284 + dx} y={222 - 8 * (k + 1)} width={40} height={8} rx={1.5} fill={WIT} {...LIJN} />
      ))}
      <rect x={286} y={180} width={38} height={8} rx={1.5} fill={WIT} transform="rotate(-8 305 184)" {...LIJN} />

      {/* Links: een collega die een dossier komt afgeven, met een vraag */}
      <Staand x={96} y={276} trui={LICHTBLAUW} haar="lang">
        <HangArm x={96} y={276} kant={-1} trui={LICHTBLAUW} />
        <rect x={136} y={198} width={32} height={22} rx={2} fill={LICHTBLAUW} {...LIJN} />
        <path d="M140 198 v-4 h10 l3 4" {...LIJN} />
        <Lid d="M112 194 Q126 214 146 212" kleur={LICHTBLAUW} />
        <Hand x={148} y={212} />
      </Staand>
      <Ballon x={70} y={104} w={36} h={30} />
      <Vraagteken cx={88} cy={117} />

      {/* Rechts: een collega met een document om na te kijken */}
      <Staand x={392} y={276} trui={LICHTBLAUW} haar="knot">
        <HangArm x={392} y={276} kant={1} trui={LICHTBLAUW} />
        <Doc x={318} y={186} w={26} h={34} />
        <rect x={322} y={200} width={7} height={7} rx={1.5} fill={LICHTBLAUW} stroke={NAVY} strokeWidth={1.6} />
        <Lid d="M376 194 Q360 214 342 212" kleur={LICHTBLAUW} />
        <Hand x={340} y={212} />
      </Staand>
      <Ballon x={378} y={104} w={36} h={30} />
      <rect x={389} y={111} width={14} height={14} rx={3} fill={LICHTBLAUW} {...LIJN} />
      <path d="M392 118 l3 3 l5 -6" stroke={NAVY} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </Scene>
  );
}

/**
 * AI kent je bedrijf niet goed genoeg: de zaakvoerder vroeg iets over zijn bedrijf (het
 * huisje in de blauwe vraag) en kreeg een lang, algemeen antwoord vol golfjes en sterretjes.
 * Hij zit met de hand tegen het voorhoofd en een kluwen boven het hoofd, en typt het zelf
 * opnieuw. In amber: de streep door het antwoord, het werk dat hij toch zelf herdoet.
 */
export function ChatgptTekening({ className = "" }: Props) {
  const golfjes = [19, 15, 18, 13, 17, 10];
  return (
    <Scene className={className}>
      <Vloer />
      {/* De frustratie boven het hoofd: een onweerswolk met een bliksem */}
      <path d="M40 130 C34 116 48 106 58 112 C62 96 88 96 92 112 C102 106 116 116 110 130 Z" fill={WIT} {...LIJN} />
      <path d="M56 122 l6 -5 l6 5 l6 -5 l6 5 l6 -5 l6 5" {...LIJN} />
      <path d="M78 132 l-6 10 h7 l-4 10 l11 -13 h-7 l4 -7 z" fill={NAVY} stroke={NAVY} strokeWidth={1} strokeLinejoin="round" />

      {/* Van het scherm naar het venster */}
      <path d="M188 164 L214 58 M183 207 L214 262" {...LICHT} />

      {/* De zaakvoerder aan de laptop, met de hand tegen het voorhoofd */}
      <Stoel x={78} s={238} />
      <Zittend x={78} s={238}>
        <Lid d="M62 202 Q42 190 62 173" kleur={TRUI} />
        <Hand x={64} y={171} />
      </Zittend>
      <BureauMetLaptop x={104} />
      <Lid d="M94 202 Q114 216 136 204" kleur={TRUI} />
      <Hand x={138} y={203} />

      {/* Het chatvenster */}
      <rect x={214} y={24} width={248} height={242} rx={14} fill={WIT} {...LIJN} />
      <path d="M214 50 H462" {...LIJN} />
      <g fill={NAVY} fillOpacity={0.3}>
        <circle cx={230} cy={37} r={3} />
        <circle cx={240} cy={37} r={3} />
        <circle cx={250} cy={37} r={3} />
      </g>
      {/* De vraag, over zijn eigen bedrijf */}
      <rect x={338} y={60} width={108} height={30} rx={11} fill={NAVY} />
      <path d="M350 84 V72 L358 66 L366 72 V84 Z" stroke={WIT} strokeWidth={1.8} strokeLinejoin="round" />
      <path d="M374 75 H432" stroke={WIT} strokeOpacity={0.9} strokeWidth={3} strokeLinecap="round" />
      {/* Het antwoord: lang, algemeen, vol opvulling */}
      <circle cx={240} cy={116} r={13} fill={LICHTBLAUW} {...LIJN} />
      <Ster x={240} y={116} r={7} kleur={NAVY} />
      <rect x={262} y={102} width={186} height={130} rx={12} fill={LICHTBLAUW} />
      <g stroke={NAVY} strokeOpacity={0.45} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        {golfjes.map((n, i) => (
          <path key={i} d={`M278 ${122 + i * 18} q4 -4 8 0${" t8 0".repeat(n - 1)}`} />
        ))}
      </g>
      <Ster x={410} y={140} r={5} kleur={NAVY} />
      <Ster x={394} y={176} r={4} kleur={NAVY} />
      {/* Er een streep door trekken en het zelf opnieuw typen */}
      <path d="M272 125 L438 118 M272 161 L430 155 M272 197 L422 191" stroke={AMBER} strokeWidth={2.6} strokeLinecap="round" />
      <rect x={230} y={242} width={216} height={16} rx={8} {...LICHT} />
      <path d="M242 250 H316" stroke={NAVY} strokeWidth={3} strokeLinecap="round" />
      <path d="M323 245 V255" stroke={NAVY} strokeWidth={2} strokeLinecap="round" />
    </Scene>
  );
}

const WEGEN = [
  "M124 272 C220 278 340 270 440 264",
  "M124 270 C220 262 340 232 434 200",
  "M124 268 C200 246 300 176 374 128",
  "M124 266 C168 232 222 124 266 80",
];

/**
 * Je weet niet waar te beginnen: de zaakvoerder staat voor vier wegen die elk een andere
 * kant op gaan. Aan het eind van elke weg staat een bordje dat iets anders roept (AI, een
 * chat, groei, automatisatie), met uitroeptekens en één vraagteken. Hij krabt in het haar,
 * de hand aan de kin, en het draait hem voor de ogen. In amber: het grote vraagteken.
 */
export function BeginnenTekening({ className = "" }: Props) {
  return (
    <Scene className={className}>
      <Vloer />
      {/* De vier wegen: rand, wegdek, middenstreep */}
      <g stroke={NAVY} strokeOpacity={0.35} strokeWidth={14} strokeLinecap="round">
        {WEGEN.map((d) => <path key={d} d={d} />)}
      </g>
      <g stroke={WIT} strokeWidth={11} strokeLinecap="round">
        {WEGEN.map((d) => <path key={d} d={d} />)}
      </g>
      <g {...STIPPEL}>
        {WEGEN.map((d) => <path key={d} d={d} />)}
      </g>

      {/* De bordjes die allemaal iets anders roepen */}
      <path d="M266 50 V80 M376 94 V128 M436 166 V200 M440 238 V264" stroke={NAVY} strokeWidth={4} strokeLinecap="round" />
      <path d="M226 18 l-7 -5 M224 32 h-8 M306 18 l7 -5 M416 62 l7 -5 M418 76 h8 M396 134 l-7 -4 M398 208 l-7 -4" {...LICHT} />
      <rect x={232} y={14} width={68} height={36} rx={8} fill={WIT} {...LIJN} />
      <Ster x={252} y={32} r={9} kleur={NAVY} />
      <Uitroep x={274} y={32} />
      <Uitroep x={284} y={32} />
      <rect x={342} y={58} width={68} height={36} rx={8} fill={WIT} {...LIJN} />
      <rect x={352} y={68} width={24} height={16} rx={4} fill={LICHTBLAUW} {...LIJN} />
      <Uitroep x={390} y={76} />
      <Uitroep x={400} y={76} />
      <rect x={402} y={130} width={68} height={36} rx={8} fill={WIT} {...LIJN} />
      <path d="M412 156 L424 146 L434 151 L448 138 M442 138 H448 V144" {...LIJN} />
      <Uitroep x={460} y={148} />
      <rect x={404} y={202} width={68} height={36} rx={8} fill={WIT} {...LIJN} />
      <circle cx={420} cy={220} r={6} fill={LICHTBLAUW} {...LIJN} />
      <path d="M420 210.5 v2.5 M420 227 v2.5 M410.5 220 h2.5 M427 220 h2.5" {...LIJN} />
      <Vraagteken cx={452} cy={216} />

      {/* De zaakvoerder: krabt in het haar, de hand aan de kin */}
      <Staand x={86} y={276}>
        <Lid d="M70 194 Q56 196 76 184" kleur={TRUI} />
        <Hand x={79} y={184} />
        <Lid d="M102 194 Q120 176 106 158" kleur={TRUI} />
        <Hand x={104} y={156} />
      </Staand>
      <ellipse cx={86} cy={150} rx={26} ry={6} {...STIPPEL} />
      <circle cx={61} cy={151} r={2.2} fill={NAVY} />
      <circle cx={110} cy={147} r={2.2} fill={NAVY} />
      <Vraagteken cx={86} cy={106} kleur={AMBER} schaal={2} />
      <Vraagteken cx={120} cy={120} />
    </Scene>
  );
}

/**
 * De oplossing: de AI-werknemer (het amber sterretje als hoofd) werkt aan een eigen bureau,
 * met lijnen naar de mailbox, de agenda en de boekhouding, elk met een vinkje. De stippellijn
 * loopt van de zaakvoerder naar de map op dat bureau: het fundament dat hij in de onboarding
 * legt. De zaakvoerder zelf zit achterover met een koffie.
 */
export function OplossingTekening({ className = "", label }: Props & { label?: string }) {
  const agenda = [0, 1, 2, 3].flatMap((i) => [0, 1].map((j) => ({ i, j })));
  return (
    <Scene className={className} label={label}>
      <Vloer />
      {/* Van de zaakvoerder naar het fundament */}
      <path d="M92 156 C130 88 230 80 268 164" {...STIPPEL} />
      <path d="M259.8 157.9 L268 164 L268.9 153.8" stroke={NAVY} strokeOpacity={0.5} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />

      {/* De zaakvoerder met koffie */}
      <Stoel x={70} s={238} />
      <Zittend x={70} s={238}>
        <path d="M104 190 c-3 -4 3 -6 0 -10 M110 190 c-3 -4 3 -6 0 -10" {...LICHT} />
        <rect x={99} y={195} width={15} height={17} rx={3} fill={WIT} {...LIJN} />
        <path d="M114 199 a4 4 0 0 1 0 9" {...LIJN} />
        <Lid d="M86 202 L96 226 L104 212" kleur={TRUI} />
        <Hand x={104} y={211} />
      </Zittend>

      {/* Van de laptop naar de drie vensters */}
      <g {...STIPPEL}>
        <path d="M340 168 C360 150 356 70 380 66" />
        <path d="M338 182 C358 176 360 142 380 142" />
        <path d="M334 198 C356 204 360 218 380 218" />
      </g>

      {/* De AI-werknemer aan het bureau, met de map van het fundament */}
      <Stoel x={232} s={238} />
      <Zittend x={232} s={238} trui={LICHTBLAUW} ai />
      <path d="M266 217 V278 M354 217 V278" {...LIJN} />
      <rect x={252} y={210} width={110} height={7} rx={3} fill={WIT} {...LIJN} />
      <rect x={262} y={170} width={16} height={40} rx={2} fill={NAVY} {...LIJN} />
      <rect x={265.5} y={178} width={9} height={9} rx={1} fill={WIT} />
      <circle cx={270} cy={199} r={2.2} fill={WIT} />
      <rect x={282} y={204} width={46} height={6} rx={2} fill={WIT} {...LIJN} />
      <path d="M326 206 L337 164 L343 165 L332 207 Z" fill={NAVY} {...LIJN} />
      <Lid d="M248 202 Q268 216 290 204" kleur={LICHTBLAUW} />
      <Hand x={292} y={203} />

      {/* De mailbox */}
      <Venster y={36} />
      <Envelop x={390} y={56} w={22} h={16} />
      <path d="M420 60 H452 M420 68 H444 M390 84 H440" {...LICHT} />
      <VinkBadge cx={466} cy={66} />
      {/* De agenda */}
      <Venster y={112} />
      {agenda.map(({ i, j }) => (
        <rect key={`${i}-${j}`} x={390 + i * 17} y={132 + j * 16} width={13} height={11} rx={2} fill={i === 2 && j === 0 ? NAVY : LICHTBLAUW} />
      ))}
      <VinkBadge cx={466} cy={142} />
      {/* De boekhouding */}
      <Venster y={188} />
      <Doc x={390} y={207} w={20} h={32} />
      <path d="M420 212 H452 M420 220 H446" {...LICHT} />
      <path d="M420 234 H454" stroke={NAVY} strokeWidth={3} strokeLinecap="round" />
      <VinkBadge cx={466} cy={218} />
    </Scene>
  );
}
