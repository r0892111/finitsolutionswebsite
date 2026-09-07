"use client";

import { useEffect, useRef } from "react";
import { BREIN_3D } from "./copy";

/**
 * Het beeld in de hero: het AI-brein van een fictief installatiebedrijf als
 * een zwevende structuur van bolletjes en lijnen. Elke bol is een stuk kennis
 * over de zaak (offertes, planning, klanten...), elke lijn een verband, de
 * kleine bolletjes zijn onderliggende pagina's. Af en toe komt er een vraag
 * binnen bij één pagina: die licht op, en het signaal loopt door naar de
 * pagina's die ermee verbonden zijn, en van daar nog een stap verder. Zo
 * werkt het fundament ook: van de index naar de pagina naar wat ermee
 * samenhangt. Wat achteraan ligt is zachter en vager (scherptediepte).
 *
 * Bij het laden komen de bolletjes van overal aangevlogen en vallen ze op
 * hun plaats: losse kennis die structuur krijgt. Daarna tuimelt de structuur
 * traag rond een as die zelf blijft verschuiven, zodat er geen vaste
 * draaias is. Slepen tuimelt mee, de muis kantelt licht.
 *
 * Geen library. Alles wordt per beeldje op een <canvas> getekend. De lus
 * staat stil zodra het beeld uit beeld is, halveert op aanraakschermen, en
 * tekent één stilstaand beeld voor wie "minder beweging" heeft ingesteld.
 */

type P3 = [number, number, number];
type Q = [number, number, number, number]; // w, x, y, z
type Soort = "hub" | "pagina" | "persoon" | "sub";
type Knoop = { label: string; p: P3; soort: Soort; open?: boolean; fase: number; start: P3; vertraging: number };

const NAVY = "26,45,99";
const ACCENT = "62,99,221";

// Vaste pseudo-toevalsreeks, zodat het beeld bij elke lading hetzelfde is.
function reeks(zaad: number) {
  let s = zaad;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}
const rnd = reeks(20260907);

function opBol(i: number, n: number): P3 {
  const y = 1 - (i / (n - 1)) * 2;
  const r = Math.sqrt(Math.max(0, 1 - y * y));
  const phi = i * Math.PI * (3 - Math.sqrt(5));
  return [Math.cos(phi) * r, y, Math.sin(phi) * r];
}
function norm(v: P3): P3 {
  const l = Math.hypot(v[0], v[1], v[2]) || 1;
  return [v[0] / l, v[1] / l, v[2] / l];
}
function schaal(v: P3, s: number): P3 {
  return [v[0] * s, v[1] * s, v[2] * s];
}

// Quaternions: de stand van de structuur, en kleine draaiingen rond een willekeurige as.
function qDraai(as: P3, hoek: number): Q {
  const h = hoek / 2, s = Math.sin(h);
  return [Math.cos(h), as[0] * s, as[1] * s, as[2] * s];
}
function qMul(a: Q, b: Q): Q {
  return [
    a[0] * b[0] - a[1] * b[1] - a[2] * b[2] - a[3] * b[3],
    a[0] * b[1] + a[1] * b[0] + a[2] * b[3] - a[3] * b[2],
    a[0] * b[2] - a[1] * b[3] + a[2] * b[0] + a[3] * b[1],
    a[0] * b[3] + a[1] * b[2] - a[2] * b[1] + a[3] * b[0],
  ];
}
function qNorm(q: Q): Q {
  const l = Math.hypot(q[0], q[1], q[2], q[3]) || 1;
  return [q[0] / l, q[1] / l, q[2] / l, q[3] / l];
}
function qRoteer(q: Q, v: P3): P3 {
  const [w, x, y, z] = q;
  const [vx, vy, vz] = v;
  // v' = v + 2w(u × v) + 2(u × (u × v)) met u = (x, y, z)
  const cx = y * vz - z * vy, cy = z * vx - x * vz, cz = x * vy - y * vx;
  const dx = y * cz - z * cy, dy = z * cx - x * cz, dz = x * cy - y * cx;
  return [vx + 2 * (w * cx + dx), vy + 2 * (w * cy + dy), vz + 2 * (w * cz + dz)];
}

const LABELS = [
  "Offertes", "Klanten", "Prijzen", "Planning", "Werkbonnen", "Facturatie", "Leveranciers", "Materiaal",
  "Klachten", "Nieuwbouw", "WhatsApp", "Mailbox", "Agenda", "Onderhoud", "Boekhouder", "Tom", "Els",
];

function verstrooid(p: P3): P3 {
  // Beginpositie bij het laden: ver weg en willekeurig, van daar vliegt de bol naar zijn plaats.
  const r = norm([rnd() * 2 - 1, rnd() * 2 - 1, rnd() * 2 - 1]);
  return [p[0] * 1.4 + r[0] * 1.6, p[1] * 1.4 + r[1] * 1.2, p[2] * 1.4 + r[2] * 1.6];
}

const KNOPEN: Knoop[] = [];
const voegToe = (label: string, p: P3, soort: Soort, open = false) => {
  KNOPEN.push({ label, p, soort, open, fase: rnd() * Math.PI * 2, start: verstrooid(p), vertraging: rnd() * 500 });
};
voegToe("Klantreis", [0, 0.02, 0], "hub");
LABELS.forEach((label, i) => {
  const straal = 0.62 + rnd() * 0.36;
  voegToe(label, schaal(opBol(i, LABELS.length), straal), label === "Tom" || label === "Els" ? "persoon" : "pagina", label === "Offertes");
});
const idx = (label: string) => KNOPEN.findIndex((k) => k.label === label);

// Onderliggende pagina's: kleine bolletjes iets buiten hun hoofdpagina.
const SUBS: [number, number][] = [];
LABELS.forEach((label, i) => {
  const ouder = idx(label);
  const aantal = i % 2 === 0 ? 3 : 2;
  for (let k = 0; k < aantal; k++) {
    const u = norm(KNOPEN[ouder].p);
    const a = rnd() * Math.PI * 2;
    const w: P3 = Math.abs(u[1]) < 0.9 ? [0, 1, 0] : [1, 0, 0];
    const p1 = norm([u[1] * w[2] - u[2] * w[1], u[2] * w[0] - u[0] * w[2], u[0] * w[1] - u[1] * w[0]]);
    const p2: P3 = [u[1] * p1[2] - u[2] * p1[1], u[2] * p1[0] - u[0] * p1[2], u[0] * p1[1] - u[1] * p1[0]];
    const j = 0.34;
    const dir = norm([u[0] + j * (p1[0] * Math.cos(a) + p2[0] * Math.sin(a)), u[1] + j * (p1[1] * Math.cos(a) + p2[1] * Math.sin(a)), u[2] + j * (p1[2] * Math.cos(a) + p2[2] * Math.sin(a))]);
    const r = Math.hypot(...KNOPEN[ouder].p) + 0.16 + rnd() * 0.12;
    voegToe("", schaal(dir, r), "sub");
    SUBS.push([KNOPEN.length - 1, ouder]);
  }
});

const HOOFDLIJNEN: [string, string][] = [
  ["Klantreis", "Offertes"], ["Klantreis", "Klanten"], ["Klantreis", "Planning"], ["Klantreis", "Werkbonnen"],
  ["Klantreis", "Facturatie"], ["Klantreis", "Klachten"],
  ["Offertes", "Prijzen"], ["Offertes", "Tom"], ["Offertes", "Els"], ["Offertes", "WhatsApp"],
  ["Offertes", "Nieuwbouw"], ["Offertes", "Materiaal"],
  ["Klanten", "Mailbox"], ["Klanten", "WhatsApp"],
  ["Planning", "Agenda"], ["Planning", "Tom"], ["Planning", "Leveranciers"],
  ["Werkbonnen", "Onderhoud"], ["Facturatie", "Boekhouder"],
  ["Leveranciers", "Materiaal"], ["Klachten", "Els"], ["Onderhoud", "Agenda"],
  ["Facturatie", "Werkbonnen"], ["Mailbox", "Agenda"], ["Klanten", "Klachten"], ["Prijzen", "Leveranciers"],
  ["Tom", "Werkbonnen"], ["Els", "Mailbox"], ["Nieuwbouw", "Planning"], ["Onderhoud", "Klanten"],
];
type Lijn = { a: number; b: number; sub: boolean };
const LIJNEN: Lijn[] = [
  ...HOOFDLIJNEN.map(([a, b]) => ({ a: idx(a), b: idx(b), sub: false })),
  ...SUBS.map(([s, o]) => ({ a: o, b: s, sub: true })),
];
// Welke lijnen aan elke knoop hangen, voor de golven die door de structuur lopen.
const BUREN: number[][] = KNOPEN.map(() => []);
LIJNEN.forEach((l, i) => { BUREN[l.a].push(i); BUREN[l.b].push(i); });
// Kleur tussen marineblauw (g = 0) en de accentkleur (g = 1), voor wat oplicht.
const meng = (g: number) => `${Math.round(26 + 36 * g)},${Math.round(45 + 54 * g)},${Math.round(99 + 122 * g)}`;

// Tekenvlak in logische eenheden; wordt geschaald naar de breedte van het kader.
const W = 600;
const H = 540;
const CX = 300;
const CY = 262;
const R = 215;
const F = 760;

// Beginstand: licht gekanteld, "Offertes" vooraan.
const Q0: Q = (() => {
  const o = norm(KNOPEN[idx("Offertes")].p);
  const naarVoor = qDraai([0, 1, 0], -Math.atan2(o[0], o[2]));
  return qNorm(qMul(qDraai([1, 0, 0], -0.28), naarVoor));
})();

type Punt = { x: number; y: number; d: number; s: number; z: number };

function projecteer(p: P3, q: Q): Punt {
  const [x, y, z] = qRoteer(q, p);
  const s = F / (F - z * R);
  return { x: CX + x * R * s, y: CY - y * R * s, d: Math.max(0, Math.min(1, (z + 1.1) / 2.2)), s, z };
}

function straal(k: Knoop, pt: Punt) {
  const basis = k.soort === "hub" ? 6.5 : k.soort === "sub" ? 2.1 : k.open ? 6 : 4.6;
  return basis * (0.7 + 0.5 * pt.d) * pt.s;
}

const uit = (t: number) => 1 - Math.pow(1 - Math.max(0, Math.min(1, t)), 3); // ease-out

/** Een lichtpuntje op een lijn, onderweg van knoop `van` naar de andere kant. `diepte` telt de stappen sinds de vraag binnenkwam. */
type Puls = { lijn: number; t: number; v: number; van: number; diepte: number; kracht: number };

export function Brein3D() {
  const wrap = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const placeholderRef = useRef<SVGSVGElement>(null);

  // Stilstaand beginbeeld voor de server (tot het canvas overneemt).
  const eerste = KNOPEN.map((k) => projecteer(k.p, Q0));

  useEffect(() => {
    const canvas = canvasRef.current;
    const box = wrap.current;
    if (!canvas || !box) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const stil = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const aanraking = window.matchMedia("(pointer: coarse)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let schaalF = 1;

    const fontFamilie = () => getComputedStyle(box).fontFamily || "sans-serif";
    let font = fontFamilie();

    const meet = () => {
      const breedte = box.clientWidth;
      schaalF = breedte / W;
      canvas.width = Math.round(breedte * dpr);
      canvas.height = Math.round(breedte * (H / W) * dpr);
      canvas.style.height = `${breedte * (H / W)}px`;
    };
    meet();

    let q: Q = Q0;                 // stand van de structuur
    let extra: Q = [1, 0, 0, 0];   // kanteling door de muis (veert terug)
    let doelX = 0, doelY = 0, muisKX = 0, muisKY = 0;
    let slepen = false, laatsteX = 0, laatsteY = 0, laatsteT = 0, spinX = 0, spinY = 0;
    let hover = -1, muisX = -1, muisY = -1;
    let vorige = 0, raf = 0, zichtbaar = true, frame = 0, tijd = 0, t0 = -1;
    let pulsen: Puls[] = [];
    let laatstePuls = 0;
    const gloed = new Float32Array(KNOPEN.length); // hoe fel elke knoop nu oplicht (0..1)
    const andereKant = (l: Lijn, van: number) => (l.a === van ? l.b : l.a);
    // Een golf: vanuit één knoop vertrekken lichtpuntjes over (een deel van) zijn lijnen.
    const golf = (van: number, diepte: number, kracht: number, max: number, behalve = -1) => {
      const lijnen = BUREN[van].filter((i) => i !== behalve && !pulsen.some((p) => p.lijn === i));
      for (let k = lijnen.length - 1; k > 0; k--) { const j = Math.floor(Math.random() * (k + 1)); [lijnen[k], lijnen[j]] = [lijnen[j], lijnen[k]]; }
      for (const i of lijnen.slice(0, max)) {
        if (pulsen.length >= 28) break;
        pulsen.push({ lijn: i, t: 0, v: 0.00034 + Math.random() * 0.00018, van, diepte, kracht: LIJNEN[i].sub ? kracht * 0.7 : kracht });
      }
    };
    const pts: Punt[] = KNOPEN.map(() => ({ x: 0, y: 0, d: 0, s: 1, z: 0 }));
    const VORM = 1500; // ms: de bolletjes vliegen naar hun plaats

    const positie = (k: Knoop, nu: number): P3 => {
      const adem = 1 + 0.018 * Math.sin(nu * 0.0011 + k.fase);
      if (stil || nu >= VORM + k.vertraging) return schaal(k.p, adem);
      const f = uit((nu - k.vertraging) / VORM);
      return [
        (k.start[0] + (k.p[0] - k.start[0]) * f) * adem,
        (k.start[1] + (k.p[1] - k.start[1]) * f) * adem,
        (k.start[2] + (k.p[2] - k.start[2]) * f) * adem,
      ];
    };

    const teken = (nu: number) => {
      const stand = qNorm(qMul(extra, q));
      const vorm = stil ? 1 : uit(nu / (VORM + 400));
      for (let i = 0; i < KNOPEN.length; i++) pts[i] = projecteer(positie(KNOPEN[i], nu), stand);

      ctx.setTransform(dpr * schaalF, 0, 0, dpr * schaalF, 0, 0);
      ctx.clearRect(0, 0, W, H);

      // Lijnen, van achter naar voor.
      const volgorde = LIJNEN.map((l, i) => ({ i, z: (pts[l.a].z + pts[l.b].z) * 0.5 })).sort((a, b) => a.z - b.z);
      for (const { i } of volgorde) {
        const l = LIJNEN[i];
        const a = pts[l.a], b = pts[l.b];
        const d = Math.min(a.d, b.d);
        const actief = hover >= 0 && (l.a === hover || l.b === hover);
        const g = actief ? 0 : Math.max(gloed[l.a], gloed[l.b]);
        const diep = Math.pow(d, 1.5); // scherptediepte: wat achteraan ligt, vervaagt sneller
        const alpha = (actief ? 0.95 : (l.sub ? 0.05 : 0.09) + (l.sub ? 0.28 : 0.6) * diep + g * 0.4) * vorm;
        ctx.strokeStyle = actief ? `rgba(${ACCENT},${alpha})` : `rgba(${meng(g)},${alpha})`;
        ctx.lineWidth = (actief ? 1.8 : (l.sub ? 0.7 : 0.8 + 0.8 * diep) + g * 0.6) * (0.8 + 0.2 * a.s);
        ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
      }

      // Golven: een vraag komt binnen bij één pagina, die licht op, en het signaal loopt door
      // naar wat ermee verbonden is, en van daar nog een stap verder.
      if (!stil && nu > VORM) {
        if (nu - laatstePuls > 2600 && pulsen.length < 6) {
          const kandidaten = KNOPEN.map((_, i) => i).filter((i) => KNOPEN[i].soort !== "sub" && pts[i].z > -0.1 && gloed[i] < 0.2);
          if (kandidaten.length) {
            const start = kandidaten[Math.floor(Math.random() * kandidaten.length)];
            gloed[start] = 1;
            golf(start, 0, 1, 4);
            laatstePuls = nu;
          }
        }
        for (const p of pulsen) {
          const l = LIJNEN[p.lijn];
          const van = pts[p.van], naar = pts[andereKant(l, p.van)];
          const x = van.x + (naar.x - van.x) * p.t, y = van.y + (naar.y - van.y) * p.t;
          const fade = Math.min(1, p.t * 6, (1 - p.t) * 4) * p.kracht;
          const staart = Math.max(0, p.t - 0.16);
          ctx.strokeStyle = `rgba(${ACCENT},${fade * 0.32})`;
          ctx.lineWidth = l.sub ? 0.9 : 1.3;
          ctx.beginPath(); ctx.moveTo(van.x + (naar.x - van.x) * staart, van.y + (naar.y - van.y) * staart); ctx.lineTo(x, y); ctx.stroke();
          ctx.fillStyle = `rgba(${ACCENT},${fade * 0.7})`;
          ctx.beginPath(); ctx.arc(x, y, l.sub ? 1.6 : 2.1, 0, Math.PI * 2); ctx.fill();
        }
      }

      // Bolletjes, van achter naar voor.
      const stippen = KNOPEN.map((_, i) => i).sort((a, b) => pts[a].z - pts[b].z);
      for (const i of stippen) {
        const k = KNOPEN[i];
        const pt = pts[i];
        const r = straal(k, pt);
        const actief = i === hover;
        const g = gloed[i];
        const alpha = 0.2 + 0.8 * Math.pow(pt.d, 1.4);
        // Scherptediepte: wat achteraan ligt krijgt een zachte, bredere schijf in plaats van een scherpe rand.
        if (pt.d < 0.42 && k.soort !== "persoon") {
          ctx.fillStyle = `rgba(${NAVY},${alpha * 0.22})`;
          ctx.beginPath(); ctx.arc(pt.x, pt.y, r * 2.1, 0, Math.PI * 2); ctx.fill();
        }
        // Gloed: een pagina die net een golf ontving, licht even op.
        if (g > 0.02) {
          const rr = r * (2.6 + 1.4 * g);
          const halo = ctx.createRadialGradient(pt.x, pt.y, r * 0.4, pt.x, pt.y, rr);
          halo.addColorStop(0, `rgba(${ACCENT},${0.5 * g})`);
          halo.addColorStop(1, `rgba(${ACCENT},0)`);
          ctx.fillStyle = halo;
          ctx.beginPath(); ctx.arc(pt.x, pt.y, rr, 0, Math.PI * 2); ctx.fill();
        }
        if (k.soort === "persoon") {
          ctx.fillStyle = "#fff";
          ctx.beginPath(); ctx.arc(pt.x, pt.y, r, 0, Math.PI * 2); ctx.fill();
          ctx.strokeStyle = actief ? `rgba(${ACCENT},1)` : `rgba(${meng(g)},${Math.min(1, alpha + g * 0.5)})`;
          ctx.lineWidth = 1.6;
          ctx.stroke();
        } else {
          const a2 = k.soort === "sub" ? alpha * 0.75 : alpha;
          ctx.fillStyle = actief ? `rgba(${ACCENT},1)` : `rgba(${meng(g)},${Math.min(1, a2 + g * 0.6)})`;
          ctx.beginPath(); ctx.arc(pt.x, pt.y, r * (1 + 0.25 * g), 0, Math.PI * 2); ctx.fill();
        }
      }

      // Labels: alleen vooraan, met een witte rand voor contrast. Wat over een ander label
      // zou vallen, wordt overgeslagen (belangrijkste en voorste labels eerst).
      ctx.textBaseline = "middle";
      ctx.lineJoin = "round";
      const getekend: { x1: number; y1: number; x2: number; y2: number }[] = [];
      const labelVolgorde = [...stippen].reverse().sort((a, b) => {
        const pa = KNOPEN[a].soort === "hub" || KNOPEN[a].open || a === hover ? 0 : 1;
        const pb = KNOPEN[b].soort === "hub" || KNOPEN[b].open || b === hover ? 0 : 1;
        return pa - pb;
      });
      for (const i of labelVolgorde) {
        const k = KNOPEN[i];
        if (k.soort === "sub") continue;
        const pt = pts[i];
        const actief = i === hover;
        const grens = k.soort === "hub" || k.open ? 0.2 : 0.5;
        if (pt.d < grens && !actief) continue;
        const alpha = (actief ? 1 : k.soort === "hub" || k.open ? Math.max(0.75, pt.d) : 0.3 + 0.7 * ((pt.d - grens) / (1 - grens))) * vorm;
        const r = straal(k, pt);
        const groot = k.soort === "hub" || k.open || actief;
        ctx.font = `${groot ? 700 : 500} ${groot ? 13.5 : 12.5}px ${font}`;
        const links = pt.x < CX;
        ctx.textAlign = links ? "right" : "left";
        const x = links ? pt.x - r - 7 : pt.x + r + 7;
        const breedte = ctx.measureText(k.label).width;
        const vak = { x1: links ? x - breedte : x, y1: pt.y - 8, x2: links ? x : x + breedte, y2: pt.y + 8 };
        if (getekend.some((g) => vak.x1 < g.x2 + 6 && vak.x2 > g.x1 - 6 && vak.y1 < g.y2 + 2 && vak.y2 > g.y1 - 2)) continue;
        getekend.push(vak);
        ctx.lineWidth = 4;
        ctx.strokeStyle = `rgba(255,255,255,${0.95 * alpha})`;
        ctx.strokeText(k.label, x, pt.y);
        ctx.fillStyle = actief ? `rgba(${ACCENT},1)` : `rgba(${NAVY},${alpha})`;
        ctx.fillText(k.label, x, pt.y);
      }
    };

    const zoekHover = () => {
      if (muisX < 0) { hover = -1; return; }
      let beste = -1, afstand = 20;
      for (let i = 0; i < KNOPEN.length; i++) {
        if (KNOPEN[i].soort === "sub" || pts[i].z < -0.1) continue;
        const dd = Math.hypot(pts[i].x - muisX, pts[i].y - muisY);
        if (dd < afstand) { afstand = dd; beste = i; }
      }
      hover = beste;
    };

    // De draaias verschuift zelf traag, zodat de structuur tuimelt in plaats van rond één as te draaien.
    const as = (nu: number): P3 =>
      norm([Math.sin(nu * 0.000041 + 1.1) * 0.9, 0.55 + 0.45 * Math.cos(nu * 0.000029), Math.cos(nu * 0.000053 + 0.4) * 0.8]);

    const stap = (t: number) => {
      raf = zichtbaar ? requestAnimationFrame(stap) : 0;
      frame++;
      if (aanraking && frame % 2) return; // 30 beelden per seconde op aanraakschermen
      if (t0 < 0) t0 = t;
      const dt = vorige ? Math.min(t - vorige, 64) : 16;
      vorige = t;
      tijd = t - t0;
      if (!slepen) {
        q = qNorm(qMul(qDraai(as(tijd), dt * 0.00008), q));
        if (Math.abs(spinX) + Math.abs(spinY) > 1e-5) {
          q = qNorm(qMul(qDraai([1, 0, 0], spinX * dt), qMul(qDraai([0, 1, 0], spinY * dt), q)));
          spinX *= 0.94; spinY *= 0.94;
        }
      }
      muisKX += (doelX - muisKX) * 0.06;
      muisKY += (doelY - muisKY) * 0.06;
      extra = qNorm(qMul(qDraai([1, 0, 0], muisKX), qDraai([0, 1, 0], muisKY)));
      const aangekomen = pulsen.filter((p) => p.t + p.v * dt >= 1);
      for (const p of pulsen) p.t += p.v * dt;
      pulsen = pulsen.filter((p) => p.t < 1);
      for (const p of aangekomen) {
        const doel = andereKant(LIJNEN[p.lijn], p.van);
        gloed[doel] = Math.max(gloed[doel], p.kracht);
        if (p.diepte < 2 && KNOPEN[doel].soort !== "sub") golf(doel, p.diepte + 1, p.kracht * 0.55, 3, p.lijn);
      }
      const verval = Math.pow(0.5, dt / 380);
      for (let i = 0; i < gloed.length; i++) gloed[i] = gloed[i] < 0.01 ? 0 : gloed[i] * verval;
      zoekHover();
      teken(tijd);
    };

    const lokaal = (e: PointerEvent) => {
      const b = box.getBoundingClientRect();
      return { x: ((e.clientX - b.left) / b.width) * W, y: ((e.clientY - b.top) / b.width) * W };
    };
    const onMove = (e: PointerEvent) => {
      const { x, y } = lokaal(e);
      if (slepen) {
        const nu = performance.now();
        const dx = e.clientX - laatsteX, dy = e.clientY - laatsteY;
        const dtS = Math.max(8, nu - laatsteT);
        q = qNorm(qMul(qDraai([1, 0, 0], -dy * 0.006), qMul(qDraai([0, 1, 0], dx * 0.006), q)));
        spinY = (dx * 0.006) / dtS;
        spinX = (-dy * 0.006) / dtS;
        laatsteX = e.clientX; laatsteY = e.clientY; laatsteT = nu;
        return;
      }
      if (e.pointerType !== "mouse") return;
      muisX = x; muisY = y;
      doelY = ((x / W) * 2 - 1) * 0.3;
      doelX = ((y / H) * 2 - 1) * 0.16;
    };
    const onLeave = () => { doelX = 0; doelY = 0; muisX = -1; muisY = -1; hover = -1; };
    const onDown = (e: PointerEvent) => { slepen = true; spinX = 0; spinY = 0; laatsteX = e.clientX; laatsteY = e.clientY; laatsteT = performance.now(); doelX = 0; doelY = 0; };
    const onUp = () => { slepen = false; };

    if (stil) {
      document.fonts?.ready.then(() => { font = fontFamilie(); teken(0); });
      teken(0);
    } else {
      box.addEventListener("pointermove", onMove);
      box.addEventListener("pointerleave", onLeave);
      box.addEventListener("pointerdown", onDown);
      window.addEventListener("pointerup", onUp);
      document.fonts?.ready.then(() => { font = fontFamilie(); });
    }
    if (placeholderRef.current) placeholderRef.current.style.display = "none";
    canvas.hidden = false;

    const io = new IntersectionObserver(([entry]) => {
      const was = zichtbaar;
      zichtbaar = entry.isIntersecting;
      if (zichtbaar && !was && !stil) { vorige = 0; raf = requestAnimationFrame(stap); }
    }, { threshold: 0.05 });
    io.observe(box);
    const ro = new ResizeObserver(() => { meet(); teken(stil ? 0 : tijd); });
    ro.observe(box);
    if (!stil) raf = requestAnimationFrame(stap);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      box.removeEventListener("pointermove", onMove);
      box.removeEventListener("pointerleave", onLeave);
      box.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
    };
  }, []);

  return (
    <figure className="w-full">
      <div ref={wrap} className="relative select-none cursor-grab active:cursor-grabbing" style={{ touchAction: "pan-y" }}>
        <canvas ref={canvasRef} hidden className="block w-full" role="img" aria-label={BREIN_3D.aria} />
        <svg ref={placeholderRef} viewBox={`0 0 ${W} ${H}`} className="block h-auto w-full" aria-hidden="true">
          {LIJNEN.filter((l) => !l.sub).map((l, i) => (
            <line key={i} x1={eerste[l.a].x} y1={eerste[l.a].y} x2={eerste[l.b].x} y2={eerste[l.b].y} stroke="#1A2D63" strokeOpacity={0.12 + 0.6 * Math.min(eerste[l.a].d, eerste[l.b].d)} strokeWidth={1} />
          ))}
          {KNOPEN.map((k, i) => (
            <circle key={i} cx={eerste[i].x} cy={eerste[i].y} r={straal(k, eerste[i])} fill="#1A2D63" fillOpacity={0.3 + 0.7 * eerste[i].d} />
          ))}
        </svg>
      </div>
      <figcaption className="mt-3 text-center text-[0.875rem] leading-[1.5] text-[#6C7590] lg:text-left">{BREIN_3D.onderschrift}</figcaption>
    </figure>
  );
}
