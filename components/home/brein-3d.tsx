"use client";

import { useEffect, useRef } from "react";
import { BREIN_3D, BREIN_INFO } from "./copy";

/**
 * Het beeld in de hero: het AI-fundament van een dienstenbedrijf als een
 * zwevende structuur van bolletjes en lijnen. In het midden het bedrijf, daar
 * rond de pagina's (offertes, klanten, planning...), elke lijn een verband, de
 * kleine bolletjes zijn onderliggende pagina's. Wat achteraan ligt is zachter
 * en vager (scherptediepte).
 *
 * Rustig, sinds de review van 13 september 2026: geen pulsen, geen gloed, geen
 * aanvliegende bolletjes. De structuur draait traag rond één licht gekantelde
 * as; slepen draait mee, de muis kantelt licht.
 *
 * Wie met de muis over een bol gaat (of erop tikt), opent die pagina: de bol
 * groeit, de pagina's die ermee verbonden zijn lichten op, de rest wordt
 * lichter, en ernaast verschijnt de pagina als een tekstbestand (bestandsnaam,
 * kop, een paar regels; BREIN_INFO). Het kaartje is een gewone <div> naast het
 * canvas die per beeldje meeschuift.
 *
 * Geen library. Alles wordt per beeldje op een <canvas> getekend, scherp op
 * elke pixeldichtheid (ook als het venster naar een ander scherm verhuist).
 * De lus staat stil zodra het beeld uit beeld is, halveert op aanraakschermen,
 * en tekent één stilstaand beeld voor wie "minder beweging" heeft ingesteld.
 */

type P3 = [number, number, number];
type Q = [number, number, number, number]; // w, x, y, z
type Soort = "hub" | "pagina" | "sub";
type Knoop = { label: string; p: P3; soort: Soort; open?: boolean };

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

// De pagina's: algemene woorden die voor elk dienstenbedrijf kloppen. De sleutels van BREIN_INFO.
const HUB = "Jouw bedrijf";
const LABELS = [
  "Sales", "Offertes", "Klanten", "Prijzen", "Planning", "Agenda", "Facturatie", "Boekhouding",
  "Service", "Klachten", "Mailbox", "WhatsApp", "Leveranciers", "Wie doet wat", "Werkwijze",
];

const KNOPEN: Knoop[] = [];
const voegToe = (label: string, p: P3, soort: Soort, open = false) => {
  KNOPEN.push({ label, p, soort, open });
};
voegToe(HUB, [0, 0.02, 0], "hub");
LABELS.forEach((label, i) => {
  const straal = 0.62 + rnd() * 0.36;
  voegToe(label, schaal(opBol(i, LABELS.length), straal), "pagina", label === "Offertes");
});
const idx = (label: string) => {
  const i = KNOPEN.findIndex((k) => k.label === label);
  if (i < 0) throw new Error(`brein-3d: onbekende pagina "${label}" (staat niet in LABELS)`);
  return i;
};

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
  [HUB, "Sales"], [HUB, "Klanten"], [HUB, "Offertes"], [HUB, "Planning"],
  [HUB, "Facturatie"], [HUB, "Service"], [HUB, "Wie doet wat"], [HUB, "Werkwijze"],
  ["Sales", "Offertes"], ["Sales", "Klanten"], ["Sales", "Mailbox"], ["Sales", "WhatsApp"],
  ["Offertes", "Prijzen"], ["Offertes", "Klanten"], ["Offertes", "Wie doet wat"], ["Offertes", "Leveranciers"],
  ["Klanten", "Mailbox"], ["Klanten", "WhatsApp"], ["Klanten", "Service"], ["Klanten", "Klachten"],
  ["Planning", "Agenda"], ["Planning", "Wie doet wat"], ["Planning", "Leveranciers"],
  ["Facturatie", "Boekhouding"], ["Facturatie", "Prijzen"], ["Facturatie", "Klanten"],
  ["Service", "Klachten"], ["Service", "Agenda"], ["Klachten", "Mailbox"], ["Klachten", "Wie doet wat"],
  ["Werkwijze", "Offertes"], ["Werkwijze", "Service"], ["Prijzen", "Leveranciers"], ["Mailbox", "Agenda"],
];
type Lijn = { a: number; b: number; sub: boolean };
const LIJNEN: Lijn[] = [
  ...HOOFDLIJNEN.map(([a, b]) => ({ a: idx(a), b: idx(b), sub: false })),
  ...SUBS.map(([s, o]) => ({ a: o, b: s, sub: true })),
];
// Welke knopen met elke knoop verbonden zijn, voor wat oplicht als je een pagina opent.
const BUREN: number[][] = KNOPEN.map(() => []);
LIJNEN.forEach((l) => { BUREN[l.a].push(l.b); BUREN[l.b].push(l.a); });

// Tekenvlak in logische eenheden; wordt geschaald naar de breedte van het kader.
const W = 600;
const H = 480;
const CX = 300;
const CY = 236;
const R = 200;
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

export function Brein3D() {
  const wrap = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const placeholderRef = useRef<SVGSVGElement>(null);
  const tipRef = useRef<HTMLDivElement>(null);
  const tipNaam = useRef<HTMLSpanElement>(null);
  const tipKop = useRef<HTMLElement>(null);
  const tipLijst = useRef<HTMLUListElement>(null);

  // Stilstaand beginbeeld voor de server (tot het canvas overneemt). Afgerond op twee
  // decimalen, anders verschilt de laatste decimaal soms tussen server en browser.
  const rond = (n: number) => Math.round(n * 100) / 100;
  const eerste = KNOPEN.map((k) => {
    const pt = projecteer(k.p, Q0);
    return { ...pt, x: rond(pt.x), y: rond(pt.y), d: rond(pt.d), s: rond(pt.s) };
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    const box = wrap.current;
    if (!canvas || !box) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const stil = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const aanraking = window.matchMedia("(pointer: coarse)").matches;
    let dpr = 1;
    let schaalF = 1;

    const fontFamilie = () => getComputedStyle(box).fontFamily || "sans-serif";
    let font = fontFamilie();

    // De pixeldichtheid wordt bij elke meting opnieuw gelezen: een venster dat naar een ander
    // scherm verhuist, blijft zo scherp.
    const meet = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
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
    let vast = -1, getoond = -1, tikX = 0, tikY = 0; // vast: de aangetikte bol (aanraakscherm of klik)
    let vorige = 0, raf = 0, zichtbaar = true, frame = 0;
    const pts: Punt[] = KNOPEN.map(() => ({ x: 0, y: 0, d: 0, s: 1, z: 0 }));
    // Hoe ver elke bol "open" staat (0..1): 1 voor de aangewezen pagina, een deel voor wat ermee verbonden is.
    const nadruk = new Float32Array(KNOPEN.length);
    const doelNadruk = (i: number, toon: number) => (i === toon ? 1 : toon >= 0 && BUREN[toon].includes(i) ? 0.375 : 0);
    const zetNadruk = (toon: number, k: number) => {
      for (let i = 0; i < nadruk.length; i++) {
        const doel = doelNadruk(i, toon);
        nadruk[i] += (doel - nadruk[i]) * k;
        if (Math.abs(nadruk[i] - doel) < 0.005) nadruk[i] = doel;
      }
    };

    const teken = () => {
      const toon = hover >= 0 ? hover : vast;
      const stand = qNorm(qMul(extra, q));
      for (let i = 0; i < KNOPEN.length; i++) pts[i] = projecteer(KNOPEN[i].p, stand);
      // Hoe ver de rest wegvalt terwijl een pagina open staat.
      let dim = 0;
      for (let i = 0; i < nadruk.length; i++) if (nadruk[i] > dim) dim = nadruk[i];

      ctx.setTransform(dpr * schaalF, 0, 0, dpr * schaalF, 0, 0);
      ctx.clearRect(0, 0, W, H);

      // Lijnen, van achter naar voor.
      const volgorde = LIJNEN.map((l, i) => ({ i, z: (pts[l.a].z + pts[l.b].z) * 0.5 })).sort((a, b) => a.z - b.z);
      for (const { i } of volgorde) {
        const l = LIJNEN[i];
        const a = pts[l.a], b = pts[l.b];
        const d = Math.min(a.d, b.d);
        const actief = toon >= 0 && (l.a === toon || l.b === toon);
        const diep = Math.pow(d, 1.5); // scherptediepte: wat achteraan ligt, vervaagt sneller
        const basis = (l.sub ? 0.05 : 0.09) + (l.sub ? 0.28 : 0.6) * diep;
        const alpha = actief ? basis + (0.95 - basis) * nadruk[toon] : basis * (1 - 0.6 * dim);
        ctx.strokeStyle = actief ? `rgba(${ACCENT},${alpha})` : `rgba(${NAVY},${alpha})`;
        ctx.lineWidth = ((l.sub ? 0.7 : 0.8 + 0.8 * diep) + (actief ? 1 * nadruk[toon] : 0)) * (0.8 + 0.2 * a.s);
        ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
      }

      // Bolletjes, van achter naar voor.
      const stippen = KNOPEN.map((_, i) => i).sort((a, b) => pts[a].z - pts[b].z);
      for (const i of stippen) {
        const k = KNOPEN[i];
        const pt = pts[i];
        const r = straal(k, pt) * (1 + 0.4 * nadruk[i]);
        const open = i === toon;
        const alpha = (0.2 + 0.8 * Math.pow(pt.d, 1.4)) * (nadruk[i] > 0 ? 1 : 1 - 0.45 * dim);
        // Scherptediepte: wat achteraan ligt krijgt een zachte, bredere schijf in plaats van een scherpe rand.
        if (pt.d < 0.42) {
          ctx.fillStyle = `rgba(${NAVY},${alpha * 0.22})`;
          ctx.beginPath(); ctx.arc(pt.x, pt.y, r * 2.1, 0, Math.PI * 2); ctx.fill();
        }
        const a2 = k.soort === "sub" ? alpha * 0.75 : alpha;
        ctx.fillStyle = open ? `rgba(${ACCENT},1)` : `rgba(${NAVY},${Math.min(1, a2)})`;
        ctx.beginPath(); ctx.arc(pt.x, pt.y, r, 0, Math.PI * 2); ctx.fill();
      }

      // Labels: alleen vooraan, met een witte rand voor contrast. Wat over een ander label
      // zou vallen, wordt overgeslagen (belangrijkste en voorste labels eerst).
      ctx.textBaseline = "middle";
      ctx.lineJoin = "round";
      const getekend: { x1: number; y1: number; x2: number; y2: number }[] = [];
      const labelVolgorde = [...stippen].reverse().sort((a, b) => {
        const pa = KNOPEN[a].soort === "hub" || KNOPEN[a].open || a === toon ? 0 : 1;
        const pb = KNOPEN[b].soort === "hub" || KNOPEN[b].open || b === toon ? 0 : 1;
        return pa - pb;
      });
      for (const i of labelVolgorde) {
        const k = KNOPEN[i];
        if (k.soort === "sub") continue;
        const pt = pts[i];
        const open = i === toon;
        const grens = k.soort === "hub" || k.open ? 0.2 : 0.5;
        if (pt.d < grens && !open) continue;
        const basis = open ? 1 : k.soort === "hub" || k.open ? Math.max(0.75, pt.d) : 0.3 + 0.7 * ((pt.d - grens) / (1 - grens));
        const alpha = nadruk[i] > 0 ? Math.max(basis, 0.85) : basis * (1 - 0.6 * dim);
        const r = straal(k, pt) * (1 + 0.4 * nadruk[i]);
        const groot = k.soort === "hub" || k.open || open;
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
        ctx.fillStyle = open ? `rgba(${ACCENT},1)` : `rgba(${NAVY},${alpha})`;
        ctx.fillText(k.label, x, pt.y);
      }
    };

    const dichtste = (x: number, y: number, bereik: number) => {
      let beste = -1, afstand = bereik;
      for (let i = 0; i < KNOPEN.length; i++) {
        if (KNOPEN[i].soort === "sub" || pts[i].z < -0.1) continue;
        const dd = Math.hypot(pts[i].x - x, pts[i].y - y);
        if (dd < afstand) { afstand = dd; beste = i; }
      }
      return beste;
    };
    const zoekHover = () => {
      hover = muisX < 0 ? -1 : dichtste(muisX, muisY, 20);
      box.style.cursor = hover >= 0 ? "pointer" : "";
    };

    // Het kaartje bij een bol: de tekst wisselt alleen als de bol wisselt, de plaats volgt elk beeldje.
    const bijwerkTip = () => {
      const tip = tipRef.current;
      if (!tip) return;
      const toon = hover >= 0 ? hover : vast;
      if (toon !== getoond) {
        getoond = toon;
        if (toon >= 0) {
          const k = KNOPEN[toon];
          const info = BREIN_INFO[k.label];
          if (tipNaam.current) tipNaam.current.textContent = info?.bestand ?? "";
          if (tipKop.current) tipKop.current.textContent = info?.kop ?? k.label;
          if (tipLijst.current) {
            tipLijst.current.replaceChildren(
              ...(info?.regels ?? []).map((regel) => {
                const li = document.createElement("li");
                li.textContent = regel;
                return li;
              }),
            );
          }
          tip.dataset.open = "true";
        } else {
          tip.dataset.open = "false";
        }
      }
      if (toon < 0) return;
      // In een smal kader (telefoon) past het kaartje niet naast een bol: dan dokt het onderaan.
      const smal = box.clientWidth < 480;
      tip.dataset.dock = smal ? "true" : "false";
      if (smal) { tip.style.transform = ""; return; }
      const pt = pts[toon];
      const r = straal(KNOPEN[toon], pt) * 1.4 * schaalF;
      const x = pt.x * schaalF, y = pt.y * schaalF;
      const breedte = tip.offsetWidth, hoogte = tip.offsetHeight;
      const naarRechts = pt.x < CX;
      const left = Math.max(0, Math.min(box.clientWidth - breedte, naarRechts ? x + r + 12 : x - r - 12 - breedte));
      const top = Math.max(0, Math.min(box.clientHeight - hoogte, y - hoogte / 2));
      tip.style.transform = `translate(${Math.round(left)}px, ${Math.round(top)}px)`;
    };
    // Zonder animatielus (minder beweging) tekenen we alleen opnieuw als de muis beweegt.
    const stilBijwerk = () => {
      if (!stil) return;
      zoekHover();
      zetNadruk(hover >= 0 ? hover : vast, 1);
      bijwerkTip();
      teken();
    };

    // Eén vaste, licht gekantelde draaias: een trage draaischijf, geen getuimel.
    const AS: P3 = norm([0.2, 1, 0.08]);

    const stap = (t: number) => {
      raf = zichtbaar ? requestAnimationFrame(stap) : 0;
      frame++;
      if (aanraking && frame % 2) return; // 30 beelden per seconde op aanraakschermen
      const dt = vorige ? Math.min(t - vorige, 64) : 16;
      vorige = t;
      if (!slepen) {
        q = qNorm(qMul(qDraai(AS, dt * 0.00005), q));
        if (Math.abs(spinX) + Math.abs(spinY) > 1e-5) {
          q = qNorm(qMul(qDraai([1, 0, 0], spinX * dt), qMul(qDraai([0, 1, 0], spinY * dt), q)));
          spinX *= 0.94; spinY *= 0.94;
        }
      }
      muisKX += (doelX - muisKX) * 0.06;
      muisKY += (doelY - muisKY) * 0.06;
      extra = qNorm(qMul(qDraai([1, 0, 0], muisKX), qDraai([0, 1, 0], muisKY)));
      zoekHover();
      zetNadruk(hover >= 0 ? hover : vast, 1 - Math.pow(0.5, dt / 60)); // in zo'n 120 ms open of dicht
      bijwerkTip();
      teken();
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
        stilBijwerk();
        return;
      }
      if (e.pointerType !== "mouse") return;
      muisX = x; muisY = y;
      doelY = ((x / W) * 2 - 1) * 0.18;
      doelX = ((y / H) * 2 - 1) * 0.09;
      stilBijwerk();
    };
    const onLeave = () => { doelX = 0; doelY = 0; muisX = -1; muisY = -1; hover = -1; stilBijwerk(); };
    const onDown = (e: PointerEvent) => { slepen = true; spinX = 0; spinY = 0; laatsteX = e.clientX; laatsteY = e.clientY; laatsteT = performance.now(); tikX = e.clientX; tikY = e.clientY; doelX = 0; doelY = 0; };
    // Een tik (geen sleep) op een bol zet het kaartje vast; een tik ernaast haalt het weg.
    const onUp = (e: PointerEvent) => {
      if (slepen && Math.hypot(e.clientX - tikX, e.clientY - tikY) < 6) {
        const { x, y } = lokaal(e);
        const geraakt = dichtste(x, y, e.pointerType === "mouse" ? 20 : 34);
        vast = geraakt === vast ? -1 : geraakt;
        stilBijwerk();
      }
      slepen = false;
    };

    box.addEventListener("pointermove", onMove);
    box.addEventListener("pointerleave", onLeave);
    box.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    if (stil) {
      document.fonts?.ready.then(() => { font = fontFamilie(); teken(); });
      teken();
    } else {
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

    // Opnieuw meten bij een andere breedte, een ander venster of een andere pixeldichtheid.
    const herMeet = () => { meet(); teken(); };
    const ro = new ResizeObserver(herMeet);
    ro.observe(box);
    window.addEventListener("resize", herMeet);
    let dprWacht: MediaQueryList | null = null;
    const opDprWissel = () => { herMeet(); bewaakDpr(); };
    const bewaakDpr = () => {
      dprWacht?.removeEventListener("change", opDprWissel);
      dprWacht = window.matchMedia(`(resolution: ${window.devicePixelRatio || 1}dppx)`);
      dprWacht.addEventListener("change", opDprWissel);
    };
    bewaakDpr();

    if (!stil) raf = requestAnimationFrame(stap);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      window.removeEventListener("resize", herMeet);
      dprWacht?.removeEventListener("change", opDprWissel);
      box.removeEventListener("pointermove", onMove);
      box.removeEventListener("pointerleave", onLeave);
      box.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
    };
  }, []);

  return (
    <div className="w-full">
      <div ref={wrap} className="relative select-none cursor-grab active:cursor-grabbing" style={{ touchAction: "pan-y" }}>
        <canvas ref={canvasRef} hidden className="block w-full" role="img" aria-label={BREIN_3D.aria} />
        <svg ref={placeholderRef} viewBox={`0 0 ${W} ${H}`} className="block h-auto w-full" aria-hidden="true">
          {LIJNEN.filter((l) => !l.sub).map((l, i) => (
            <line key={i} x1={eerste[l.a].x} y1={eerste[l.a].y} x2={eerste[l.b].x} y2={eerste[l.b].y} stroke="#1A2D63" strokeOpacity={rond(0.12 + 0.6 * Math.min(eerste[l.a].d, eerste[l.b].d))} strokeWidth={1} />
          ))}
          {KNOPEN.map((k, i) => (
            <circle key={i} cx={eerste[i].x} cy={eerste[i].y} r={rond(straal(k, eerste[i]))} fill="#1A2D63" fillOpacity={rond(0.3 + 0.7 * eerste[i].d)} />
          ))}
        </svg>
        {/* De pagina als tekstbestand: kopbalk met bestandsnaam, dan de kop en de regels. */}
        <div ref={tipRef} className="hp-tip" data-open="false" role="status" aria-live="polite">
          <div className="hp-tip-kop">
            <svg width="12" height="14" viewBox="0 0 12 14" fill="none" aria-hidden="true">
              <path d="M1.5 1.5h6l3 3v8h-9z M7.5 1.5v3h3" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
            </svg>
            <span ref={tipNaam} />
          </div>
          <div className="hp-tip-inhoud">
            <strong ref={tipKop} />
            <ul ref={tipLijst} />
          </div>
        </div>
      </div>
    </div>
  );
}
