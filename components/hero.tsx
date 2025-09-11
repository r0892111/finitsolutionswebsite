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

  return (
    <div className="relative w-[320px] md:w-[640px] aspect-[818/768] select-none">
      {/* Base artwork */}
      <img
        src="/about-image.png"
        alt="Connected data infrastructure"
        className="absolute inset-0 w-full h-full object-contain z-10 pointer-events-none"
        draggable={false}
      />

      {/* SVG overlay for inward pulsing system */}
      <svg
        className="absolute inset-0 z-20 pointer-events-none"
        viewBox="0 0 818 768"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          {/* Glow for animated elements */}
          <filter id="glow">
            <feGaussianBlur stdDeviation="1.3" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Simple gradient for moving pulses */}
          <linearGradient id="pulseGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(59,130,246,0)" />
            <stop offset="50%" stopColor="rgba(59,130,246,0.9)" />
            <stop offset="100%" stopColor="rgba(34,211,238,0)" />
          </linearGradient>
        </defs>

        {/* Main hub coordinates */}
        <circle cx="409" cy="384" r="0" fill="none" id="hub" />

        {/* Paths from corners → center (approximate to artwork lines) */}
        {[
          // TL → center
          "M 160 150 C 205 260, 230 285, 260 300 C 300 320, 350 360, 409 384",
          // TR → center
          "M 658 150 C 620 260, 590 285, 560 300 C 520 320, 470 360, 409 384",
          // BL → center
          "M 160 618 C 205 510, 230 485, 260 470 C 300 450, 350 410, 409 384",
          // BR → center
          "M 658 618 C 620 510, 590 485, 560 470 C 520 450, 470 410, 409 384",
          // Mid top
          "M 409 230 C 409 300, 409 350, 409 384",
          // Mid bottom
          "M 409 538 C 409 468, 409 418, 409 384",
          // Mid left
          "M 205 384 C 330 384, 380 384, 409 384",
          // Mid right
          "M 614 384 C 488 384, 438 384, 409 384",
        ].map((d, i) => (
          <g key={i}>
            {/* Subtle base line glow */}
            <path
              d={d}
              stroke="rgba(147,197,253,0.25)"
              strokeWidth={2}
              fill="none"
              filter="url(#glow)"
            />
            {/* Animated pulse moving inward */}
            {!reduce && (
              <circle r="5" fill="url(#pulseGrad)" filter="url(#glow)">
                <animateMotion
                  dur="2.4s"
                  repeatCount="indefinite"
                  rotate="auto"
                  keyPoints="0;1"
                  keyTimes="0;1"
                >
                  <mpath xlinkHref={`#p${i}`} />
                </animateMotion>
              </circle>
            )}
            {/* Invisible path ref */}
            <path id={`p${i}`} d={d} fill="none" stroke="none" />
          </g>
        ))}
      </svg>

      {/* Central hub pulse */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none"
        animate={
          reduce
            ? {}
            : {
                scale: [1, 1.2, 1],
                opacity: [0.7, 1, 0.7],
              }
        }
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        style={{
          width: 40,
          height: 40,
          borderRadius: "9999px",
          boxShadow:
            "0 0 22px rgba(147,197,253,0.9), 0 0 44px rgba(59,130,246,0.5)",
          background:
            "radial-gradient(circle, rgba(255,255,255,0.95), rgba(59,130,246,0.4))",
        }}
      />
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
            <h1 className="text-4xl lg:text-6xl xl:text-7xl font-bold leading-tight" style={{ color: 'rgb(28, 44, 85)' }}>
              AI Workforces
              <br className="md:block hidden" />
              <span className="font-semibold">that automate </span>
              <br className="md:block hidden" />
              <span className="font-semibold">and scale your business.</span>
            </h1>
            <p className="text-xl font-semibold lg:text-2xl leading-relaxed max-w-2xl" style={{ color: 'rgb(28, 44, 85)' }}>
              We build AI-powered software on top of your current systems
              <br className="md:block hidden" />
              which unlocks powerful leverage for your company&apos;s growth.
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
