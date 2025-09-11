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

      {/* Particle flow EXACTLY on the white lines using the image as a luminance mask */}
      <svg
        className="absolute inset-0 z-20 pointer-events-none"
        viewBox="0 0 818 768"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          {/* Bring the image into SVG space */}
          <image
            id="netArt"
            href="/about-image.png"
            x="0"
            y="0"
            width="818"
            height="768"
            preserveAspectRatio="none"
          />

          {/* Convert to luminance then hard-threshold near white so only the connectors remain opaque */}
          <filter id="whiteOnly">
            <feColorMatrix
              type="matrix"
              values="
                0.2126 0.7152 0.0722 0 0
                0.2126 0.7152 0.0722 0 0
                0.2126 0.7152 0.0722 0 0
                0       0       0       1 0"
              result="lum"
            />
            {/* Increase slope / adjust intercept to tighten/loosen selection of bright pixels */}
            <feComponentTransfer>
              <feFuncA type="linear" slope="7" intercept="-6" />
              <feFuncR type="linear" slope="7" intercept="-6" />
              <feFuncG type="linear" slope="7" intercept="-6" />
              <feFuncB type="linear" slope="7" intercept="-6" />
            </feComponentTransfer>
          </filter>

          {/* Use filtered image as luminance mask */}
          <mask id="wireMask" x="0" y="0" width="818" height="768" maskUnits="userSpaceOnUse">
            <use href="#netArt" filter="url(#whiteOnly)" />
          </mask>

          {/* Soft glow so wires feel lit */}
          <filter id="glow">
            <feGaussianBlur stdDeviation="1.1" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Dot textures as SVG patterns (cleaner than CSS for viewBox control) */}
          <pattern id="dotsX" width="12" height="12" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="6" r="1.6" fill="rgba(147,197,253,0.95)" />
          </pattern>
          <pattern id="dotsY" width="12" height="12" patternUnits="userSpaceOnUse">
            <circle cx="6" cy="2" r="1.6" fill="rgba(59,130,246,0.9)" />
          </pattern>
          <pattern id="dotsD" width="14" height="14" patternUnits="userSpaceOnUse">
            <circle cx="3" cy="3" r="1.5" fill="rgba(34,211,238,0.9)" />
          </pattern>
        </defs>

        {/* Because we paint under a mask built from the exact PNG, dots are visible ONLY on white pixels = pixel perfect */}
        <g mask="url(#wireMask)" filter="url(#glow)" opacity="0.95">
          {/* Layer 1: horizontal flow (slides along X) */}
          <g>
            <rect id="layerX" x="-818" y="0" width="1636" height="768" fill="url(#dotsX)">
              {!reduce && (
                <animate attributeName="x" from="-818" to="0" dur="2.2s" repeatCount="indefinite" />
              )}
            </rect>
          </g>

          {/* Layer 2: vertical flow (slides along Y) */}
          <g opacity="0.8">
            <rect id="layerY" x="0" y="-768" width="818" height="1536" fill="url(#dotsY)">
              {!reduce && (
                <animate attributeName="y" from="-768" to="0" dur="2.8s" repeatCount="indefinite" />
              )}
            </rect>
          </g>

          {/* Layer 3: diagonal flow (~45°). We move a big rect diagonally by animating x and y together */}
          <g opacity="0.7" transform="rotate(45 409 384)">
            <rect id="layerD" x="-1156" y="-1086" width="2312" height="2172" fill="url(#dotsD)">
              {!reduce && (
                <>
                  <animate attributeName="x" from="-1156" to="0" dur="3s" repeatCount="indefinite" />
                  <animate attributeName="y" from="-1086" to="0" dur="3s" repeatCount="indefinite" />
                </>
              )}
            </rect>
          </g>
        </g>
      </svg>

      {/* Optional: subtle central pulse so the hub feels alive */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none"
        animate={reduce ? {} : { scale: [1, 1.08, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        style={{
          width: 28,
          height: 28,
          borderRadius: "9999px",
          boxShadow:
            "0 0 18px rgba(147,197,253,0.9), 0 0 34px rgba(59,130,246,0.45)",
          background:
            "radial-gradient(circle, rgba(255,255,255,0.9), rgba(59,130,246,0.35))",
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
