"use client";
import { useState, useEffect, useRef } from "react";
import {
  motion,
  useReducedMotion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProjectRequestDialog } from "@/components/project-request-dialog";

/**
 * MagicVisual is engineered to the bitmap used in the codebase:
 * /about-image.png with intrinsic size ~818x768 (w x h).
 * All overlays are drawn in the same coordinate system (viewBox 0 0 818 768)
 * so they sit exactly on top of the existing network lines and hubs.
 */
function MagicVisual() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  // Minimal, gentle parallax that won’t break alignment
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const px = useSpring(mx, { stiffness: 50, damping: 20, mass: 0.5 });
  const py = useSpring(my, { stiffness: 50, damping: 20, mass: 0.5 });
  const parallax = (depth: number) => ({
    x: useTransform(px, (v) => (reduce ? 0 : (v / 150) * depth)),
    y: useTransform(py, (v) => (reduce ? 0 : (v / 150) * depth)),
  });

  const handlePointerMove = (e: React.PointerEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set(e.clientX - rect.left - rect.width / 2);
    my.set(e.clientY - rect.top - rect.height / 2);
  };

  // Coordinates (roughly traced to match the PNG)
  // Center database stack (hub)
  const C = { x: 409, y: 384 };

  // Corner hub centers (the tall stacks)
  const TL = { x: 160, y: 150 };
  const TR = { x: 658, y: 150 };
  const BL = { x: 160, y: 618 };
  const BR = { x: 658, y: 618 };

  // Shorter platform nodes (mid edges) – optional highlights
  const ML = { x: 205, y: 384 };
  const MR = { x: 614, y: 384 };
  const MT = { x: 409, y: 230 };
  const MB = { x: 409, y: 538 };

  // Paths that follow the drawn network lines (eyeballed to match angles/segments)
  // Using polyline-like cubic curves to keep them smooth.
  const paths = [
    // Center to TL route
    `M ${C.x} ${C.y} 
     C 350 360, 300 320, 260 300
     C 230 285, 205 260, ${TL.x} ${TL.y}`,
    // Center to TR route
    `M ${C.x} ${C.y} 
     C 470 360, 520 320, 560 300
     C 590 285, 620 260, ${TR.x} ${TR.y}`,
    // Center to BL route
    `M ${C.x} ${C.y}
     C 350 410, 300 450, 260 470
     C 230 485, 205 510, ${BL.x} ${BL.y}`,
    // Center to BR route
    `M ${C.x} ${C.y}
     C 470 410, 520 450, 560 470
     C 590 485, 620 510, ${BR.x} ${BR.y}`,

    // Optional short runs to mid platforms to match the inner links
    `M ${C.x} ${C.y} C 380 384, 330 384, ${ML.x} ${ML.y}`,
    `M ${C.x} ${C.y} C 438 384, 488 384, ${MR.x} ${MR.y}`,
    `M ${C.x} ${C.y} C 409 350, 409 300, ${MT.x} ${MT.y}`,
    `M ${C.x} ${C.y} C 409 418, 409 468, ${MB.x} ${MB.y}`,
  ];

  // Node points to pulse
  const nodes = [C, TL, TR, BL, BR, ML, MR, MT, MB];

  const L1 = parallax(6); // background glow
  const L2 = parallax(10); // lines
  const L3 = parallax(14); // pulses

  return (
    <div
      ref={ref}
      onPointerMove={handlePointerMove}
      className="relative w-[320px] md:w-[640px] aspect-[818/768] select-none"
    >
      {/* Base image at exact aspect ratio */}
      <img
        src="/about-image.png"
        alt="Connected data infrastructure"
        className="absolute inset-0 w-full h-full object-contain z-10 pointer-events-none"
        draggable={false}
      />

      {/* Soft vignette & ambient glow (kept subtle to not fight the artwork) */}
      <motion.div
        style={L1}
        className="absolute inset-0 z-[5] pointer-events-none"
      >
        <div className="absolute inset-0 opacity-60">
          <div className="absolute left-[40%] top-[38%] -translate-x-1/2 -translate-y-1/2 w-[45%] h-[45%] rounded-full blur-3xl"
               style={{ background: "radial-gradient(circle at center, rgba(59,130,246,0.25), transparent 60%)" }}/>
        </div>
      </motion.div>

      {/* Animated network lines + data flow */}
      <motion.svg
        style={L2}
        className="absolute inset-0 z-20 pointer-events-none"
        viewBox="0 0 818 768"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          {/* Moving dash gradient that sits nicely on the existing light lines */}
          <linearGradient id="flow" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(59,130,246,0.0)" />
            <stop offset="50%" stopColor="rgba(59,130,246,0.85)" />
            <stop offset="100%" stopColor="rgba(34,211,238,0.0)" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="1.2" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {paths.map((d, i) => (
          <g key={i}>
            {/* Subtle base highlight exactly on top of the art's lines */}
            <path
              d={d}
              stroke="rgba(147,197,253,0.35)"
              strokeWidth={2}
              fill="none"
              filter="url(#glow)"
            />
            {/* Animated flow (dashes) */}
            <motion.path
              d={d}
              stroke="url(#flow)"
              strokeWidth={2}
              strokeDasharray="10 22"
              strokeLinecap="round"
              fill="none"
              animate={{
                strokeDashoffset: [0, -32],
                opacity: [0.9, 0.7, 0.9],
              }}
              transition={{
                duration: 2.6 + (i % 3) * 0.4,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          </g>
        ))}

        {/* Tiny traveling packets on the four main spokes */}
        {[0, 1, 2, 3].map((i) => (
          <motion.circle
            key={`pkt-${i}`}
            r={4}
            fill="rgba(251,191,36,0.95)"
            filter="url(#glow)"
          >
            <motion.animateMotion
              dur={`${2.8 + i * 0.3}s`}
              repeatCount="indefinite"
              rotate="auto"
              path={paths[i]}
            />
          </motion.circle>
        ))}
      </motion.svg>

      {/* Node pulses (center + 4 hubs + mid nodes) */}
      {nodes.map((n, i) => (
        <motion.div
          key={`node-${i}`}
          style={L3}
          className="absolute z-30 pointer-events-none"
          style={{
            ...L3,
            left: `${(n.x / 818) * 100}%`,
            top: `${(n.y / 768) * 100}%`,
          }}
        >
          {/* anchor at center of node */}
          <div
            className="relative"
            style={{
              transform: "translate(-50%, -50%)",
              width: 0,
              height: 0,
            }}
          >
            {/* inner glow */}
            <div
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{
                left: 0,
                top: 0,
                width: i === 0 ? 18 : 10,
                height: i === 0 ? 18 : 10,
                borderRadius: "9999px",
                boxShadow:
                  "0 0 14px rgba(147,197,253,0.9), 0 0 28px rgba(59,130,246,0.45)",
                background:
                  i === 0
                    ? "radial-gradient(circle, rgba(147,197,253,1), rgba(59,130,246,0.25))"
                    : "radial-gradient(circle, rgba(59,130,246,0.9), rgba(59,130,246,0.2))",
              }}
            />
            {/* ripple rings */}
            {[0, 1, 2].map((r) => (
              <motion.span
                key={r}
                className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border border-blue-400/40"
                style={{
                  left: 0,
                  top: 0,
                  width: i === 0 ? 36 : 22,
                  height: i === 0 ? 36 : 22,
                }}
                animate={{
                  scale: [1, 1.8, 1],
                  opacity: [0.5, 0, 0.5],
                }}
                transition={{
                  duration: 2.2 + r * 0.2,
                  delay: r * 0.25 + (i % 3) * 0.1,
                  repeat: Infinity,
                  ease: "easeOut",
                }}
              />
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export function Hero() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <section className="relative md:min-h-screen overflow-hidden">
      <div className="max-w-[1500px] gap-20 md:gap-0 px-4 md:px-10 mx-auto md:flex-row flex-col-reverse flex items-center justify-between py-20 md:py-0 md:h-screen lg:px-8">
        <div className="absolute inset-0 bg-[url('/about-bg.png')] bg-cover z-[-1] bg-center"></div>

        {/* Left Content */}
        <div className="w-full lg:w-1/2 space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center px-4 py-2 rounded-full text-[12px] font-semibold bg-white text-blue-700 border border-blue-200">
              <Zap className="h-4 w-4 mr-2" />
              <span>Where the Future Begins</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-4"
          >
            <h1 className="text-4xl lg:text-6xl xl:text-7xl font-bold leading-tight text-blue-900">
              AI Workforces
              <br className="md:block hidden" />
              <span className="font-semibold">to automate </span>
              <br className="md:block hidden" />
              <span className="font-semibold">and scale your business.</span>
            </h1>
            <p className="text-xl font-semibold lg:text-2xl text-blue-900 leading-relaxed max-w-2xl">
              We build AI-powered workforces that eliminate inefficiencies
              <br className="md:block hidden" /> and unlock powerful leverage
              for your company's growth.
            </p>
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 pt-4"
          >
            <ProjectRequestDialog
              buttonText="Get Started"
              buttonClassName="bg-gray-400 hover:bg-gray-500 text-white px-8 py-4 text-lg rounded-full font-medium"
            />
            <Button
              size="lg"
              variant="outline"
              className="border-gray-300 text-gray-700 hover:bg-blue-800 px-8 py-4 text-lg rounded-full font-medium"
              onClick={() => {
                const aboutSection = document.getElementById("about");
                if (aboutSection) aboutSection.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Learn More
            </Button>
          </motion.div>
        </div>

        {/* Right visual — now perfectly aligned to /about-image.png */}
        <div className="relative">
          <MagicVisual />
        </div>
      </div>
    </section>
  );
}
