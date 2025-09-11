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

  // Native image dimensions: 818 x 768 (keep overlays in same space)
  return (
    <div className="relative w-[320px] md:w-[640px] aspect-[818/768] select-none">
      {/* Base artwork */}
      <img
        src="/about-image.png"
        alt="Connected data infrastructure"
        className="absolute inset-0 w-full h-full object-contain z-10 pointer-events-none"
        draggable={false}
      />

      {/* ===== Flow-on-lines layer (masked to the white wires in the PNG) ===== */}
      <svg
        className="absolute inset-0 z-20 pointer-events-none"
        viewBox="0 0 818 768"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          {/* Load the same image into SVG for masking */}
          <image id="art" href="/about-image.png" x="0" y="0" width="818" height="768" preserveAspectRatio="none" />

          {/* Convert image to grayscale, then threshold so only very bright pixels (the white connectors)
              become opaque in the mask. Adjust the slope/intercept for your asset if needed. */}
          <filter id="toWhiteLines">
            <feColorMatrix
              type="matrix"
              values="
                0.2126 0.7152 0.0722 0 0
                0.2126 0.7152 0.0722 0 0
                0.2126 0.7152 0.0722 0 0
                0       0       0       1 0"
              result="lum"
            />
            {/* Hard-ish threshold near white; tweak slope/intercept to include/exclude bits */}
            <feComponentTransfer>
              <feFuncR type="linear" slope="6" intercept="-5" />
              <feFuncG type="linear" slope="6" intercept="-5" />
              <feFuncB type="linear" slope="6" intercept="-5" />
              <feFuncA type="linear" slope="6" intercept="-5" />
            </feComponentTransfer>
          </filter>

          {/* Use the filtered image as a luminance mask */}
          <mask id="lineMask" maskUnits="userSpaceOnUse" x="0" y="0" width="818" height="768">
            <use href="#art" filter="url(#toWhiteLines)" />
          </mask>

          {/* Flow textures: diagonal and orthogonal stripe gradients */}
          <linearGradient id="stripeGradX" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(59,130,246,0)" />
            <stop offset="40%" stopColor="rgba(59,130,246,0.85)" />
            <stop offset="60%" stopColor="rgba(34,211,238,0.85)" />
            <stop offset="100%" stopColor="rgba(34,211,238,0)" />
          </linearGradient>
          <linearGradient id="stripeGradY" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(147,197,253,0)" />
            <stop offset="45%" stopColor="rgba(147,197,253,0.9)" />
            <stop offset="55%" stopColor="rgba(59,130,246,0.9)" />
            <stop offset="100%" stopColor="rgba(59,130,246,0)" />
          </linearGradient>

          {/* Slight outer glow so the “wires” feel lit */}
          <filter id="glow">
            <feGaussianBlur stdDeviation="1.2" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Two moving layers (different directions/speeds) clipped to the white lines.
            Because they are masked, they ride *exactly* on the lines in your PNG. */}
        <g mask="url(#lineMask)" filter="url(#glow)" opacity="0.95">
          {/* Horizontal flow */}
          <g>
            <rect id="flowX" x="-818" y="0" width="1636" height="768" fill="url(#stripeGradX)">
              {!reduce && (
                <animate
                  attributeName="x"
                  from="-818"
                  to="0"
                  dur="2.8s"
                  repeatCount="indefinite"
                />
              )}
            </rect>
          </g>

          {/* Vertical flow */}
          <g>
            <rect id="flowY" x="0" y="-768" width="818" height="1536" fill="url(#stripeGradY)" opacity="0.6">
              {!reduce && (
                <animate
                  attributeName="y"
                  from="-768"
                  to="0"
                  dur="3.6s"
                  repeatCount="indefinite"
                />
              )}
            </rect>
          </g>
        </g>
      </svg>

      {/* ===== Optional: precise traveling packets on the four main spokes for extra depth ===== */}
      <svg
        className="absolute inset-0 z-30 pointer-events-none"
        viewBox="0 0 818 768"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <filter id="pktGlow">
            <feGaussianBlur stdDeviation="1.3" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Handful of motion paths (approximate but aligned) */}
        {[
          // Center → TL
          "M 409 384 C 350 360 300 320 260 300 C 230 285 205 260 160 150",
          // Center → TR
          "M 409 384 C 470 360 520 320 560 300 C 590 285 620 260 658 150",
          // Center → BL
          "M 409 384 C 350 410 300 450 260 470 C 230 485 205 510 160 618",
          // Center → BR
          "M 409 384 C 470 410 520 450 560 470 C 590 485 620 510 658 618",
        ].map((d, i) => (
          <g key={i}>
            {!reduce && (
              <circle r="4" fill="rgba(251,191,36,0.95)" filter="url(#pktGlow)">
                <animateMotion dur={`${2.7 + i * 0.3}s`} repeatCount="indefinite" rotate="auto">
                  <mpath xlinkHref={`#p${i}`} />
                </animateMotion>
              </circle>
            )}
            {/* invisible path holder */}
            <path id={`p${i}`} d={d} fill="none" stroke="none" />
          </g>
        ))}
      </svg>
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
