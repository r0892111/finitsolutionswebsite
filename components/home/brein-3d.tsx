"use client";

import { useEffect, useRef } from "react";
import { BREIN_3D } from "./copy";

/**
 * Het beeld in de hero: het AI-brein van een fictief installatiebedrijf als
 * een doorzichtige bol. Elke stip is een stuk kennis over de zaak (offertes,
 * planning, klanten...), elke lijn een verband. Kleine stippen zijn de
 * onderliggende pagina's. Lichtpuntjes lopen over de lijnen: informatie die
 * van de ene pagina naar de andere stroomt.
 *
 * Geen library. Alles wordt per beeldje op een <canvas> getekend, dat is
 * veel goedkoper dan honderden SVG-elementen bijwerken. De lus staat stil
 * zodra de bol uit beeld is, halveert op aanraakschermen, en tekent één
 * stilstaand beeld voor wie "minder beweging" heeft ingesteld.
 */

type P3 = [number, number, number];
type Soort = "hub" | "pagina" | "persoon" | "sub";
type Knoop = { label: string; p: P3; soort: Soort; open?: boolean };

const NAVY = "26,45,99";
const ACCENT = "62,99,221";

// Punten gelijkmatig over een bol verdeeld (Fibonacci-spiraal). Deterministisch.
function opBol(i: number, n: number, straal: number): P3 {
  const y = 1 - (i / (n - 1)) * 2;
  const r = Math.sqrt(Math.max(0, 1 - y * y));
  const phi = i * Math.PI * (3 - Math.sqrt(5));
  return [Math.cos(phi) * r * straal, y * straal, Math.sin(phi) * r * straal];
}
function norm(v: P3): P3 {
  const l = Math.hypot(v[0], v[1], v[2]) || 1;
  return [v[0] / l, v[1] / l, v[2] / l];
}
function schaal(v: P3, s: number): P3 {
  return [v[0] * s, v[1] * s, v[2] * s];
}

const LABELS = [
  "Offertes", "Klanten", "Prijzen", "Planning", "Werkbonnen", "Facturatie", "Leveranciers", "Materiaal",
  "Klachten", "Nieuwbouw", "WhatsApp", "Mailbox", "Agenda", "Onderhoud", "Boekhouder", "Tom", "Els",
];

const KNOPEN: Knoop[] = [{ label: "Klantreis", p: [0, 0.02, 0], soort: "hub" }];
LABELS.forEach((label, i) => {
  KNOPEN.push({
    label,
    p: opBol(i, LABELS.length, 0.86),
    soort: label === "Tom" || label === "Els" ? "persoon" : "pagina",
    open: label === "Offertes",
  });
});
const idx = (label: string) => KNOPEN.findIndex((k) => k.label === label);

// Onderliggende pagina's: kleine stippen op het oppervlak, rond hun hoofdpagina.
const SUBS: [number, number][] = []; // [subindex, ouderindex]
LABELS.forEach((label, i) => {
  const ouder = idx(label);
  const aantal = i % 3 === 0 ? 2 : 1;
  for (let k = 0; k < aantal; k++) {
    const u = norm(KNOPEN[ouder].p);
    const a = (i * 2.399 + k * 2.1) % (Math.PI * 2);
    const w: P3 = Math.abs(u[1]) < 0.9 ? [0, 1, 0] : [1, 0, 0];
    const p1 = norm([u[1] * w[2] - u[2] * w[1], u[2] * w[0] - u[0] * w[2], u[0] * w[1] - u[1] * w[0]]);
    const p2: P3 = [u[1] * p1[2] - u[2] * p1[1], u[2] * p1[0] - u[0] * p1[2], u[0] * p1[1] - u[1] * p1[0]];
    const j = 0.3;
    const dir = norm([u[0] + j * (p1[0] * Math.cos(a) + p2[0] * Math.sin(a)), u[1] + j * (p1[1] * Math.cos(a) + p2[1] * Math.sin(a)), u[2] + j * (p1[2] * Math.cos(a) + p2[2] * Math.sin(a))]);
    KNOPEN.push({ label: "", p: schaal(dir, 1), soort: "sub" });
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
];
type Lijn = { a: number; b: number; sub: boolean };
const LIJNEN: Lijn[] = [
  ...HOOFDLIJNEN.map(([a, b]) => ({ a: idx(a), b: idx(b), sub: false })),
  ...SUBS.map(([s, o]) => ({ a: o, b: s, sub: true })),
];

// Tekenvlak in logische eenheden; wordt geschaald naar de breedte van het kader.
const W = 600;
const H = 560;
const CX = 300;
const CY = 270;
const R = 222;
const F = 720;
const TILT = -0.3;
// De rand van de bol zoals de camera hem ziet (perspectief maakt het silhouet iets groter dan R).
const RS = (R * F) / Math.sqrt(F * F - R * R);

// Startstand: "Offertes" vooraan.
const O = KNOPEN[idx("Offertes")].p;
const THETA0 = -Math.atan2(O[0], O[2]);

type Punt = { x: number; y: number; d: number; s: number; z: number };

function projecteer(p: P3, cT: number, sT: number, cX: number, sX: number): Punt {
  const [x, y, z] = p;
  const x1 = x * cT + z * sT;
  const z1 = -x * sT + z * cT;
  const y2 = y * cX - z1 * sX;
  const z2 = y * sX + z1 * cX;
  const s = F / (F - z2 * R);
  return { x: CX + x1 * R * s, y: CY - y2 * R * s, d: (z2 + 1) / 2, s, z: z2 };
}

function straal(k: Knoop, pt: Punt) {
  const basis = k.soort === "hub" ? 6.5 : k.soort === "sub" ? 2 : k.open ? 6 : 4.6;
  return basis * (0.72 + 0.5 * pt.d) * pt.s;
}

type Puls = { lijn: number; t: number; v: number };

export function Brein3D() {
  const wrap = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const placeholderRef = useRef<SVGSVGElement>(null);

  // Stilstaand beginbeeld voor de server (tot het canvas overneemt).
  const cT0 = Math.cos(THETA0), sT0 = Math.sin(THETA0), cX0 = Math.cos(TILT), sX0 = Math.sin(TILT);
  const eerste = KNOPEN.map((k) => projecteer(k.p, cT0, sT0, cX0, sX0));

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

    let theta = THETA0;
    let draai = 0, draaiDoel = 0;
    let tilt = TILT, tiltDoel = TILT;
    let slepen = false, laatsteX = 0, laatsteT = 0, spin = 0;
    let hover = -1, muisX = -1, muisY = -1;
    let vorige = 0, raf = 0, zichtbaar = true, frame = 0;
    let pulsen: Puls[] = [];
    let laatstePuls = 0;
    const pts: Punt[] = KNOPEN.map(() => ({ x: 0, y: 0, d: 0, s: 1, z: 0 }));

    const ringPunten = (n: number, f: (t: number) => P3) => {
      const r: P3[] = [];
      for (let i = 0; i <= n; i++) r.push(f((i / n) * Math.PI * 2));
      return r;
    };
    const breedtes = [-0.62, -0.32, 0, 0.32, 0.62].map((y) => {
      const rr = Math.sqrt(1 - y * y);
      return ringPunten(56, (t) => [Math.cos(t) * rr, y, Math.sin(t) * rr] as P3);
    });
    const meridianen = [0, 1, 2, 3, 4, 5].map((k) => {
      const phi = (k * Math.PI) / 6;
      return ringPunten(56, (t) => [Math.sin(t) * Math.cos(phi), Math.cos(t), Math.sin(t) * Math.sin(phi)] as P3);
    });
    const raster = [...breedtes, ...meridianen];

    const tekenRing = (punten: P3[], cT: number, sT: number, cX: number, sX: number, voor: boolean, alpha: number) => {
      let open = false;
      ctx.beginPath();
      let a = projecteer(punten[0], cT, sT, cX, sX);
      for (let i = 0; i < punten.length - 1; i++) {
        const b = projecteer(punten[i + 1], cT, sT, cX, sX);
        const vooraan = (a.z + b.z) * 0.5 >= 0;
        if (vooraan === voor) {
          if (!open) { ctx.moveTo(a.x, a.y); open = true; }
          ctx.lineTo(b.x, b.y);
        } else open = false;
        a = b;
      }
      ctx.strokeStyle = `rgba(${NAVY},${alpha})`;
      ctx.lineWidth = 0.8;
      ctx.stroke();
    };

    const teken = (t: number) => {
      const th = theta + draai;
      const cT = Math.cos(th), sT = Math.sin(th), cX = Math.cos(tilt), sX = Math.sin(tilt);
      for (let i = 0; i < KNOPEN.length; i++) pts[i] = projecteer(KNOPEN[i].p, cT, sT, cX, sX);

      ctx.setTransform(dpr * schaalF, 0, 0, dpr * schaalF, 0, 0);
      ctx.clearRect(0, 0, W, H);

      // Schaduw onder de bol.
      ctx.save();
      ctx.translate(CX, CY + RS + 22);
      ctx.scale(1, 0.18);
      const sch = ctx.createRadialGradient(0, 0, 0, 0, 0, R * 0.95);
      sch.addColorStop(0, `rgba(${NAVY},0.10)`);
      sch.addColorStop(1, `rgba(${NAVY},0)`);
      ctx.fillStyle = sch;
      ctx.beginPath(); ctx.arc(0, 0, R * 0.95, 0, Math.PI * 2); ctx.fill();
      ctx.restore();

      // Achterkant: raster, lijnen en stippen, daarna de doorschijnende bol erover.
      for (const ring of raster) tekenRing(ring, cT, sT, cX, sX, false, 0.08);
      const tekenLijnen = (voor: boolean) => {
        for (const l of LIJNEN) {
          const a = pts[l.a], b = pts[l.b];
          const z = (a.z + b.z) * 0.5;
          if ((z >= 0) !== voor) continue;
          const d = Math.min(a.d, b.d);
          const actief = hover >= 0 && (l.a === hover || l.b === hover);
          const alpha = actief ? 0.95 : (l.sub ? 0.08 : 0.14) + (l.sub ? 0.3 : 0.62) * d;
          ctx.strokeStyle = actief ? `rgba(${ACCENT},${alpha})` : `rgba(${NAVY},${alpha})`;
          ctx.lineWidth = (actief ? 1.8 : l.sub ? 0.7 : 0.9 + 0.7 * d) * (0.8 + 0.2 * a.s);
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
        }
      };
      const tekenStippen = (voor: boolean) => {
        for (let i = 0; i < KNOPEN.length; i++) {
          const pt = pts[i];
          if ((pt.z >= 0) !== voor) continue;
          const k = KNOPEN[i];
          const r = straal(k, pt);
          const actief = i === hover;
          const alpha = 0.3 + 0.7 * pt.d;
          if (k.soort === "persoon") {
            ctx.fillStyle = "#fff";
            ctx.beginPath(); ctx.arc(pt.x, pt.y, r, 0, Math.PI * 2); ctx.fill();
            ctx.strokeStyle = actief ? `rgba(${ACCENT},1)` : `rgba(${NAVY},${alpha})`;
            ctx.lineWidth = 1.6;
            ctx.stroke();
          } else {
            ctx.fillStyle = actief ? `rgba(${ACCENT},1)` : `rgba(${NAVY},${k.soort === "sub" ? alpha * 0.75 : alpha})`;
            ctx.beginPath(); ctx.arc(pt.x, pt.y, r, 0, Math.PI * 2); ctx.fill();
          }
          if (k.open || actief) {
            ctx.setLineDash([2.5, 3]);
            ctx.strokeStyle = actief ? `rgba(${ACCENT},0.9)` : `rgba(${NAVY},${alpha * 0.8})`;
            ctx.lineWidth = 1;
            ctx.beginPath(); ctx.arc(pt.x, pt.y, r + 5.5, 0, Math.PI * 2); ctx.stroke();
            ctx.setLineDash([]);
          }
        }
      };
      tekenLijnen(false);
      tekenStippen(false);

      // De bol zelf: glas met licht van linksboven.
      const glas = ctx.createRadialGradient(CX - RS * 0.38, CY - RS * 0.42, RS * 0.05, CX, CY, RS);
      glas.addColorStop(0, "rgba(255,255,255,0.78)");
      glas.addColorStop(0.55, "rgba(238,243,252,0.62)");
      glas.addColorStop(1, "rgba(214,224,246,0.72)");
      ctx.fillStyle = glas;
      ctx.beginPath(); ctx.arc(CX, CY, RS, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = `rgba(${NAVY},0.14)`;
      ctx.lineWidth = 1;
      ctx.stroke();

      // Voorkant.
      for (const ring of raster) tekenRing(ring, cT, sT, cX, sX, true, 0.17);
      tekenLijnen(true);
      tekenStippen(true);

      // Lichtpuntjes: informatie die over de lijnen loopt.
      if (!stil) {
        if (t - laatstePuls > 700 && pulsen.length < 7) {
          const kandidaten = LIJNEN.map((l, i) => i).filter((i) => !LIJNEN[i].sub && pts[LIJNEN[i].a].z > -0.1 && pts[LIJNEN[i].b].z > -0.1);
          if (kandidaten.length) {
            pulsen.push({ lijn: kandidaten[Math.floor(Math.random() * kandidaten.length)], t: 0, v: 0.0009 + Math.random() * 0.0007 });
            laatstePuls = t;
          }
        }
        for (const p of pulsen) {
          const l = LIJNEN[p.lijn];
          const a = pts[l.a], b = pts[l.b];
          const x = a.x + (b.x - a.x) * p.t, y = a.y + (b.y - a.y) * p.t;
          const fade = Math.min(1, p.t * 6, (1 - p.t) * 6);
          const diepte = a.z + (b.z - a.z) * p.t;
          const alpha = fade * (diepte >= 0 ? 1 : 0.35);
          const staart = Math.max(0, p.t - 0.12);
          ctx.strokeStyle = `rgba(${ACCENT},${alpha * 0.55})`;
          ctx.lineWidth = 1.6;
          ctx.beginPath(); ctx.moveTo(a.x + (b.x - a.x) * staart, a.y + (b.y - a.y) * staart); ctx.lineTo(x, y); ctx.stroke();
          ctx.fillStyle = `rgba(${ACCENT},${alpha})`;
          ctx.beginPath(); ctx.arc(x, y, 2.6, 0, Math.PI * 2); ctx.fill();
        }
      }

      // Labels: alleen vooraan, met een witte rand voor contrast.
      ctx.textBaseline = "middle";
      ctx.lineJoin = "round";
      for (let i = 0; i < KNOPEN.length; i++) {
        const k = KNOPEN[i];
        if (k.soort === "sub") continue;
        const pt = pts[i];
        const actief = i === hover;
        const grens = k.soort === "hub" || k.open ? 0.2 : 0.46;
        if (pt.d < grens && !actief) continue;
        const alpha = actief ? 1 : k.soort === "hub" || k.open ? Math.max(0.75, pt.d) : 0.3 + 0.7 * ((pt.d - grens) / (1 - grens));
        const r = straal(k, pt);
        const groot = k.soort === "hub" || k.open || actief;
        ctx.font = `${groot ? 700 : 500} ${groot ? 13.5 : 12.5}px ${font}`;
        const links = pt.x < CX;
        ctx.textAlign = links ? "right" : "left";
        const x = links ? pt.x - r - 7 : pt.x + r + 7;
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
        if (KNOPEN[i].soort === "sub" || pts[i].z < 0) continue;
        const dd = Math.hypot(pts[i].x - muisX, pts[i].y - muisY);
        if (dd < afstand) { afstand = dd; beste = i; }
      }
      hover = beste;
    };

    const stap = (t: number) => {
      raf = zichtbaar ? requestAnimationFrame(stap) : 0;
      frame++;
      if (aanraking && frame % 2) return; // 30 beelden per seconde op aanraakschermen
      const dt = vorige ? Math.min(t - vorige, 64) : 16;
      vorige = t;
      if (!slepen) {
        theta += dt * 0.00016 + spin * dt;
        spin *= 0.94;
      }
      draai += (draaiDoel - draai) * 0.06;
      tilt += (tiltDoel - tilt) * 0.06;
      for (const p of pulsen) p.t += p.v * dt;
      pulsen = pulsen.filter((p) => p.t < 1);
      zoekHover();
      teken(t);
    };

    const lokaal = (e: PointerEvent) => {
      const b = box.getBoundingClientRect();
      return { x: ((e.clientX - b.left) / b.width) * W, y: ((e.clientY - b.top) / b.width) * W };
    };
    const onMove = (e: PointerEvent) => {
      const { x, y } = lokaal(e);
      if (slepen) {
        const nu = performance.now();
        const dx = e.clientX - laatsteX;
        theta += dx * 0.006;
        spin = (dx * 0.006) / Math.max(8, nu - laatsteT);
        laatsteX = e.clientX;
        laatsteT = nu;
        return;
      }
      if (e.pointerType !== "mouse") return;
      muisX = x; muisY = y;
      draaiDoel = ((x / W) * 2 - 1) * 0.35;
      tiltDoel = TILT + ((y / H) * 2 - 1) * 0.14;
    };
    const onLeave = () => { draaiDoel = 0; tiltDoel = TILT; muisX = -1; muisY = -1; hover = -1; };
    const onDown = (e: PointerEvent) => { slepen = true; spin = 0; laatsteX = e.clientX; laatsteT = performance.now(); draaiDoel = 0; };
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
    const ro = new ResizeObserver(() => { meet(); teken(performance.now()); });
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
      <div ref={wrap} className="hp-rise relative select-none cursor-grab active:cursor-grabbing" style={{ touchAction: "pan-y", animationDelay: "120ms" }}>
        <canvas ref={canvasRef} hidden className="block w-full" role="img" aria-label={BREIN_3D.aria} />
        <svg ref={placeholderRef} viewBox={`0 0 ${W} ${H}`} className="block h-auto w-full" aria-hidden="true">
          <circle cx={CX} cy={CY} r={RS} fill="#EEF2FB" stroke="#1A2D63" strokeOpacity={0.14} />
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
