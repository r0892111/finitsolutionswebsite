"use client";
import { useState, useEffect, useRef, useMemo } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProjectRequestDialog } from "@/components/project-request-dialog";

function MagicVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  // Mouse-parallax
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const px = useSpring(mx, { stiffness: 60, damping: 20 });
  const py = useSpring(my, { stiffness: 60, damping: 20 });

  const layer = (depth: number) => ({
    x: useTransform(px, (v) => (reduce ? 0 : (v / 100) * depth)),
    y: useTransform(py, (v) => (reduce ? 0 : (v / 100) * depth)),
  });

  const onPointerMove = (e: React.PointerEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    mx.set(x);
    my.set(y);
  };

  // Seeded particles + comets
  const particles = useMemo(
    () =>
      Array.from({ length: 42 }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: 2 + Math.random() * 3,
        delay: Math.random() * 2,
        drift: 10 + Math.random() * 20,
        duration: 4 + Math.random() * 4,
        z: Math.floor(Math.random() * 3), // layer depth
      })),
    []
  );

  const comets = useMemo(
    () =>
      Array.from({ length: 6 }).map((_, i) => ({
        id: i,
        delay: i * 0.8,
        duration: 2.8 + (i % 3) * 0.6,
        startX: -20 - i * 10,
        startY: 10 + i * 12,
        endX: 120,
        endY: 60 + i * 6,
      })),
    []
  );

  const L1 = layer(10);
  const L2 = layer(20);
  const L3 = layer(35);

  return (
    <div
      ref={containerRef}
      onPointerMove={onPointerMove}
      className="relative w-[320px] md:w-[640px] aspect-[4/3] md:aspect-[16/12] select-none"
    >
      {/* Background image */}
      <img
        src="/about-image.png"
        alt="AI Reactor"
        className="absolute inset-0 w-full h-full object-contain z-10 pointer-events-none"
        draggable={false}
      />

      {/* Nebula glows */}
      <motion.div
        style={L1}
        className="absolute -inset-10 z-0 blur-3xl opacity-70"
      >
        <div className="absolute left-0 top-8 w-72 h-72 rounded-full bg-[radial-gradient(closest-side,rgba(59,130,246,0.35),transparent_65%)]" />
        <div className="absolute right-6 bottom-0 w-80 h-80 rounded-full bg-[radial-gradient(closest-side,rgba(56,189,248,0.3),transparent_65%)]" />
        <div className="absolute left-1/3 top-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-[radial-gradient(closest-side,rgba(147,197,253,0.25),transparent_65%)]" />
      </motion.div>

      {/* Aurora ribbons */}
      <motion.svg
        style={L2}
        className="absolute inset-0 z-20 pointer-events-none"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="aurora" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="rgba(59,130,246,0)" />
            <stop offset="30%" stopColor="rgba(59,130,246,0.6)" />
            <stop offset="70%" stopColor="rgba(34,211,238,0.6)" />
            <stop offset="100%" stopColor="rgba(34,211,238,0)" />
          </linearGradient>
          <filter id="softGlow">
            <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {[12, 36, 60].map((y, idx) => (
          <motion.path
            key={y}
            d={`M -10 ${y} C 20 ${y - 12} , 50 ${y + 12} , 110 ${y}`}
            stroke="url(#aurora)"
            strokeWidth={idx === 1 ? 1.8 : 1.2}
            fill="none"
            filter="url(#softGlow)"
            strokeDasharray="12 18"
            animate={{
              strokeDashoffset: [0, -60],
              pathLength: [0.9, 1, 0.9],
              opacity: [0.6, 0.8, 0.6],
            }}
            transition={{
              duration: 6 + idx * 1.5,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </motion.svg>

      {/* Particle field */}
      {particles.map((p) => {
        const depth = p.z === 0 ? L1 : p.z === 1 ? L2 : L3;
        return (
          <motion.div
            key={p.id}
            style={depth}
            className="absolute rounded-full"
            initial={{ x: 0, y: 0, opacity: 0 }}
            animate={{
              x: [0, 0, 0],
              y: [0, -p.drift, 0],
              opacity: [0, 0.9, 0],
              scale: [0.6, 1, 0.6],
              filter: [
                "drop-shadow(0 0 2px rgba(59,130,246,0.2))",
                "drop-shadow(0 0 8px rgba(59,130,246,0.8))",
                "drop-shadow(0 0 2px rgba(59,130,246,0.2))",
              ],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              delay: p.delay,
              ease: "easeInOut",
            }}
            style={{
              ...depth,
              left: `${p.left}%`,
              top: `${p.top}%`,
              width: p.size,
              height: p.size,
              background:
                p.z === 2
                  ? "radial-gradient(circle, rgba(251,191,36,0.95), rgba(251,191,36,0.2))"
                  : "radial-gradient(circle, rgba(59,130,246,0.95), rgba(59,130,246,0.25))",
            }}
          />
        );
      })}

      {/* Comets */}
      {comets.map((c, i) => (
        <motion.div
          key={c.id}
          className="absolute z-30"
          initial={{ x: `${c.startX}%`, y: `${c.startY}%`, opacity: 0 }}
          animate={{ x: `${c.endX}%`, y: `${c.endY}%`, opacity: [0, 1, 0] }}
          transition={{
            duration: c.duration,
            delay: c.delay,
            repeat: Infinity,
            repeatDelay: 1.5,
            ease: "easeOut",
          }}
          style={i % 2 === 0 ? L2 : L3}
        >
          <div className="relative">
            <div
              className="absolute -left-12 -top-1 w-14 h-[2px] blur-[1px]"
              style={{
                background:
                  "linear-gradient(90deg, rgba(59,130,246,0), rgba(59,130,246,0.85))",
              }}
            />
            <div
              className="w-2 h-2 rounded-full"
              style={{
                background:
                  "radial-gradient(circle, rgba(147,197,253,1), rgba(59,130,246,0.2))",
                boxShadow: "0 0 14px rgba(147,197,253,0.9)",
              }}
            />
          </div>
        </motion.div>
      ))}

      {/* Reactor core */}
      <motion.div
        style={L3}
        className="absolute left-1/2 top-1/2 z-40 -translate-x-1/2 -translate-y-1/2"
      >
        <motion.div
          className="relative w-16 h-16 rounded-full"
          animate={{
            rotate: reduce ? 0 : [0, 360],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            background:
              "conic-gradient(from 0deg, rgba(59,130,246,0.3), rgba(34,211,238,0.7), rgba(59,130,246,0.3))",
            boxShadow:
              "0 0 24px rgba(59,130,246,0.8), 0 0 48px rgba(34,211,238,0.5)",
          }}
        >
          <div className="absolute inset-2 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.9),rgba(59,130,246,0.4))]" />
        </motion.div>

        {/* Expanding Waves */}
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="absolute left-1/2 top-1/2 rounded-full border border-blue-400/40"
            style={{
              width: 32,
              height: 32,
              x: "-50%",
              y: "-50%",
            }}
            animate={{
              scale: [1, 2.4, 1],
              opacity: [0.7, 0, 0.7],
              borderColor: [
                "rgba(59,130,246,0.5)",
                "rgba(59,130,246,0.15)",
                "rgba(59,130,246,0.5)",
              ],
            }}
            transition={{
              duration: 3.2,
              delay: i * 0.4,
              repeat: Infinity,
              ease: "easeOut",
            }}
          />
        ))}
      </motion.div>
    </div>
  );
}

export function Hero() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
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

          {/* CTA Buttons */}
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
                if (aboutSection) {
                  aboutSection.scrollIntoView({ behavior: "smooth" });
                }
              }}
            >
              Learn More
            </Button>
          </motion.div>
        </div>

        {/* Right Visual */}
        <div className="relative">
          <MagicVisual />
        </div>
      </div>
    </section>
  );
}
