"use client";

import { useEffect, useRef } from "react";
import { BREIN_3D } from "./copy";

/**
 * Het beeld in de hero: een AI-brein als ruimtelijke structuur. Pagina's over
 * de zaak van een fictieve installateur (bolletjes) die naar elkaar verwijzen
 * (lijnen), in 3D, traag draaiend. Inkt op papier: geen gloed, geen kleuren.
 *
 * Geen library. De punten liggen op een bol; per beeldje draaien we ze,
 * kantelen we ze licht, en projecteren we ze met perspectief naar het vlak.
 * Wat verder weg staat, wordt kleiner en lichter. De muis draait mee, slepen
 * draait harder, en bij "minder beweging" staat het beeld stil.
 */

type P3 = [number, number, number];
type Node = { id: string; label: string; p: P3; open?: boolean; persoon?: boolean; hub?: boolean };

// Punten gelijkmatig over een bol verdeeld (Fibonacci-spiraal). Deterministisch.
function opBol(i: number, n: number, straal: number): P3 {
  const y = 1 - (i / (n - 1)) * 2;
  const r = Math.sqrt(Math.max(0, 1 - y * y));
  const phi = i * Math.PI * (3 - Math.sqrt(5));
  return [Math.cos(phi) * r * straal, y * straal, Math.sin(phi) * r * straal];
}

const LABELS = [
  "Offertes", "Klanten", "Prijzen", "Planning", "Werkbonnen", "Facturatie", "Leveranciers", "Materiaal",
  "Klachten", "Nieuwbouw", "WhatsApp", "Mailbox", "Agenda", "Onderhoud", "Boekhouder", "Tom", "Els",
];
const STRALEN = [0.98, 0.9, 0.82, 0.95, 0.78, 0.88, 1.0, 0.8, 0.92, 0.86, 0.96, 0.84, 0.9, 0.76, 0.94, 0.82, 0.88];

const NODES: Node[] = [
  { id: "klantreis", label: "Klantreis", p: [0, 0.04, 0], hub: true },
  ...LABELS.map((label, i) => ({
    id: label.toLowerCase(),
    label,
    p: opBol(i, LABELS.length, STRALEN[i]),
    open: label === "Offertes",
    persoon: label === "Tom" || label === "Els",
  })),
];
const idx = (id: string) => NODES.findIndex((n) => n.id === id);

const EDGES: [number, number][] = (
  [
    ["klantreis", "offertes"], ["klantreis", "klanten"], ["klantreis", "planning"], ["klantreis", "werkbonnen"],
    ["klantreis", "facturatie"], ["klantreis", "klachten"],
    ["offertes", "prijzen"], ["offertes", "tom"], ["offertes", "els"], ["offertes", "whatsapp"],
    ["offertes", "nieuwbouw"], ["offertes", "materiaal"],
    ["klanten", "mailbox"], ["klanten", "whatsapp"],
    ["planning", "agenda"], ["planning", "tom"], ["planning", "leveranciers"],
    ["werkbonnen", "onderhoud"], ["facturatie", "boekhouder"],
    ["leveranciers", "materiaal"], ["klachten", "els"], ["onderhoud", "agenda"],
  ] as [string, string][]
).map(([a, b]) => [idx(a), idx(b)]);

const CX = 300;
const CY = 268;
const R = 218;
const F = 640;
const TILT = -0.32;

// Startstand: "Offertes" vooraan.
const O = NODES[idx("offertes")].p;
const THETA0 = -Math.atan2(O[0], O[2]);

type Punt = { x: number; y: number; d: number; s: number };

function projecteer(theta: number, tilt: number): Punt[] {
  const cT = Math.cos(theta), sT = Math.sin(theta);
  const cX = Math.cos(tilt), sX = Math.sin(tilt);
  return NODES.map(({ p: [x, y, z] }) => {
    const x1 = x * cT + z * sT;
    const z1 = -x * sT + z * cT;
    const y2 = y * cX - z1 * sX;
    const z2 = y * sX + z1 * cX;
    const s = F / (F - z2 * R);
    return { x: CX + x1 * R * s, y: CY - y2 * R * s, d: (z2 + 1) / 2, s };
  });
}

function straal(n: Node, pt: Punt) {
  const basis = n.open ? 6.5 : n.hub ? 5.5 : 4.2;
  return basis * (0.7 + 0.6 * pt.d);
}
const dotAlpha = (d: number) => 0.22 + 0.78 * d;
const labelAlpha = (d: number) => (d < 0.45 ? 0.07 : 0.18 + 0.82 * ((d - 0.45) / 0.55));
const lijnAlpha = (a: number, b: number) => 0.1 + 0.7 * Math.min(a, b);
const lijnDikte = (a: number, b: number) => 0.6 + 0.9 * Math.min(a, b);

export function Brein3D() {
  const wrap = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const eerste = projecteer(THETA0, TILT);

  useEffect(() => {
    const svg = svgRef.current;
    const box = wrap.current;
    if (!svg || !box) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lines = EDGES.map((_, i) => svg.querySelector<SVGLineElement>(`[data-e="${i}"]`)!);
    const dots = NODES.map((_, i) => svg.querySelector<SVGCircleElement>(`[data-d="${i}"]`)!);
    const rings = NODES.map((_, i) => svg.querySelector<SVGCircleElement>(`[data-r="${i}"]`));
    const labels = NODES.map((_, i) => svg.querySelector<SVGTextElement>(`[data-t="${i}"]`)!);

    let theta = THETA0;
    let draai = 0, draaiDoel = 0;      // extra draai door de muis
    let tilt = TILT, tiltDoel = TILT;  // kanteling door de muis
    let slepen = false, laatsteX = 0, laatsteSleep = 0;
    let vorige = 0, raf = 0, zichtbaar = true;

    const teken = () => {
      const pts = projecteer(theta + draai, tilt);
      EDGES.forEach(([a, b], i) => {
        const l = lines[i];
        l.setAttribute("x1", pts[a].x.toFixed(1)); l.setAttribute("y1", pts[a].y.toFixed(1));
        l.setAttribute("x2", pts[b].x.toFixed(1)); l.setAttribute("y2", pts[b].y.toFixed(1));
        l.setAttribute("opacity", lijnAlpha(pts[a].d, pts[b].d).toFixed(2));
        l.setAttribute("stroke-width", lijnDikte(pts[a].d, pts[b].d).toFixed(2));
      });
      NODES.forEach((n, i) => {
        const pt = pts[i];
        const r = straal(n, pt);
        dots[i].setAttribute("cx", pt.x.toFixed(1)); dots[i].setAttribute("cy", pt.y.toFixed(1));
        dots[i].setAttribute("r", r.toFixed(2)); dots[i].setAttribute("opacity", dotAlpha(pt.d).toFixed(2));
        const ring = rings[i];
        if (ring) {
          ring.setAttribute("cx", pt.x.toFixed(1)); ring.setAttribute("cy", pt.y.toFixed(1));
          ring.setAttribute("r", (r + 6).toFixed(2)); ring.setAttribute("opacity", dotAlpha(pt.d).toFixed(2));
        }
        const links = pt.x < CX;
        labels[i].setAttribute("x", (links ? pt.x - r - 6 : pt.x + r + 6).toFixed(1));
        labels[i].setAttribute("y", (pt.y + 4).toFixed(1));
        labels[i].setAttribute("text-anchor", links ? "end" : "start");
        labels[i].setAttribute("opacity", (n.hub || n.open ? Math.max(0.6, labelAlpha(pt.d)) : labelAlpha(pt.d)).toFixed(2));
      });
    };

    const stap = (t: number) => {
      const dt = vorige ? Math.min(t - vorige, 48) : 16;
      vorige = t;
      if (!slepen && t - laatsteSleep > 1600) theta += dt * 0.00022;
      draai += (draaiDoel - draai) * 0.05;
      tilt += (tiltDoel - tilt) * 0.05;
      teken();
      if (zichtbaar) raf = requestAnimationFrame(stap);
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const b = box.getBoundingClientRect();
      const mx = ((e.clientX - b.left) / b.width) * 2 - 1;
      const my = ((e.clientY - b.top) / b.height) * 2 - 1;
      if (slepen) {
        theta += (e.clientX - laatsteX) * 0.006;
        laatsteX = e.clientX;
        laatsteSleep = performance.now();
      } else {
        draaiDoel = mx * 0.4;
        tiltDoel = TILT + my * 0.16;
      }
    };
    const onLeave = () => { draaiDoel = 0; tiltDoel = TILT; slepen = false; };
    const onDown = (e: PointerEvent) => { if (e.pointerType !== "mouse") return; slepen = true; laatsteX = e.clientX; draaiDoel = 0; };
    const onUp = () => { slepen = false; laatsteSleep = performance.now(); };

    box.addEventListener("pointermove", onMove);
    box.addEventListener("pointerleave", onLeave);
    box.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);

    // Stilzetten als het beeld niet in beeld is.
    const io = new IntersectionObserver(([entry]) => {
      zichtbaar = entry.isIntersecting;
      if (zichtbaar) { vorige = 0; cancelAnimationFrame(raf); raf = requestAnimationFrame(stap); }
    }, { threshold: 0.05 });
    io.observe(box);
    raf = requestAnimationFrame(stap);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      box.removeEventListener("pointermove", onMove);
      box.removeEventListener("pointerleave", onLeave);
      box.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
    };
  }, []);

  return (
    <figure className="w-full">
      <div ref={wrap} className="fs-rise select-none cursor-grab active:cursor-grabbing" style={{ touchAction: "pan-y", animationDelay: "150ms" }}>
        <svg ref={svgRef} viewBox="0 0 600 520" className="block h-auto w-full overflow-visible" role="img" aria-label={BREIN_3D.aria}>
          {EDGES.map(([a, b], i) => (
            <line
              key={i}
              data-e={i}
              x1={eerste[a].x} y1={eerste[a].y} x2={eerste[b].x} y2={eerste[b].y}
              opacity={lijnAlpha(eerste[a].d, eerste[b].d)}
              stroke="#1A2D63" strokeWidth={lijnDikte(eerste[a].d, eerste[b].d)}
            />
          ))}
          {NODES.map((n, i) => {
            const pt = eerste[i];
            const r = straal(n, pt);
            const links = pt.x < CX;
            return (
              <g key={n.id}>
                {n.open && (
                  <circle data-r={i} cx={pt.x} cy={pt.y} r={r + 6} fill="none" stroke="#1A2D63" strokeWidth={1} strokeDasharray="2 3" opacity={dotAlpha(pt.d)} />
                )}
                <circle
                  data-d={i} cx={pt.x} cy={pt.y} r={r}
                  fill={n.persoon ? "#FDFBF7" : "#1A2D63"} stroke="#1A2D63" strokeWidth={n.persoon ? 1.5 : 0}
                  opacity={dotAlpha(pt.d)}
                />
                <text
                  data-t={i}
                  x={links ? pt.x - r - 6 : pt.x + r + 6} y={pt.y + 4}
                  textAnchor={links ? "end" : "start"}
                  opacity={labelAlpha(pt.d)}
                  fill="#2A2620"
                  fontSize={n.open || n.hub ? 13 : 12}
                  fontWeight={n.open ? 600 : 400}
                >
                  {n.label}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-[0.9rem] leading-[1.5] text-[#76706A] lg:text-left">{BREIN_3D.onderschrift}</figcaption>
    </figure>
  );
}
