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
import { useLanguage } from "@/contexts/language-context";

/**
 * MagicVisual is engineered to the bitmap used in the codebase:
 * /about-image.png with intrinsic size ~818x768 (w x h).
 * All overlays are drawn in the same coordinate system (viewBox 0 0 818 768)
 * so they sit exactly on top of the existing network lines and hubs.
 */
function MagicVisual() {

  return (
    <div className="relative w-[320px] md:w-[640px] aspect-[818/768] select-none">
      {/* Multi-layered 3D shadow system */}
      <div className="absolute inset-0 z-0">
        {/* Primary depth shadow - large and soft */}
        <div 
          className="absolute inset-0 rounded-3xl blur-3xl opacity-40"
          style={{
            background: 'radial-gradient(ellipse 80% 60% at 50% 70%, rgba(22,44,85,0.6) 0%, rgba(22,44,85,0.3) 40%, transparent 70%)',
            transform: 'translateY(20px) scale(1.1)'
          }}
        />
        
        {/* Secondary ambient shadow - medium spread */}
        <div 
          className="absolute inset-0 rounded-2xl blur-2xl opacity-30"
          style={{
            background: 'radial-gradient(ellipse 70% 50% at 50% 65%, rgba(59,130,246,0.5) 0%, rgba(22,44,85,0.4) 35%, transparent 65%)',
            transform: 'translateY(15px) scale(1.05)'
          }}
        />
        
        {/* Tertiary contact shadow - sharp and close */}
        <div 
          className="absolute inset-0 rounded-xl blur-xl opacity-50"
          style={{
            background: 'radial-gradient(ellipse 60% 40% at 50% 60%, rgba(22,44,85,0.8) 0%, rgba(22,44,85,0.5) 25%, transparent 50%)',
            transform: 'translateY(8px)'
          }}
        />
        
        {/* Accent glow shadow using brand accent color */}
        <div 
          className="absolute inset-0 rounded-2xl blur-2xl opacity-20"
          style={{
            background: 'radial-gradient(ellipse 90% 70% at 50% 50%, rgba(247,230,155,0.6) 0%, rgba(247,230,155,0.3) 30%, transparent 60%)',
            transform: 'translateY(5px) scale(0.95)'
          }}
        />
        
        {/* Subtle rim lighting effect */}
        <div 
          className="absolute inset-0 rounded-3xl opacity-25"
          style={{
            background: 'conic-gradient(from 0deg at 50% 50%, rgba(147,197,253,0.4) 0deg, transparent 60deg, rgba(59,130,246,0.3) 120deg, transparent 180deg, rgba(22,44,85,0.4) 240deg, transparent 300deg, rgba(147,197,253,0.4) 360deg)',
            transform: 'translateY(12px) scale(1.08)',
            filter: 'blur(20px)'
          }}
        />
      </div>
      
      {/* Elevated content container with subtle lift effect */}
      <div 
        className="relative z-10"
        style={{
          filter: 'drop-shadow(0 25px 50px rgba(22,44,85,0.15)) drop-shadow(0 10px 25px rgba(22,44,85,0.1))',
          transform: 'translateZ(0)' // Force hardware acceleration
        }}
      >
      {/* Base artwork */}
      <img
        src="/about-image.png"
        alt="Connected data infrastructure"
        className="w-full h-full object-contain pointer-events-none"
        draggable={false}
      />
        
        {/* Animated overlay elements for subtle pulsing */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none z-20"
          viewBox="0 0 818 768"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            {/* Subtle glow filter */}
            <filter id="subtleGlow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge> 
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
            
            {/* Radial gradient for pulsing elements */}
            <radialGradient id="pulseGradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(59,130,246,0.4)" />
              <stop offset="70%" stopColor="rgba(22,44,85,0.2)" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
            
            {/* Accent glow gradient */}
            <radialGradient id="accentGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(247,230,155,0.3)" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
          </defs>

          {/* Central database pulsing glow */}
          <circle 
            cx="409" 
            cy="384" 
            r="25" 
            fill="url(#pulseGradient)" 
            filter="url(#subtleGlow)"
            opacity="0.6"
          >
            <animate 
              attributeName="r" 
              values="20;35;20" 
              dur="6s" 
              repeatCount="indefinite"
            />
            <animate 
              attributeName="opacity" 
              values="0.3;0.8;0.3" 
              dur="6s" 
              repeatCount="indefinite"
            />
          </circle>

          {/* Server nodes pulsing - positioned at approximate server locations */}
          {[
            { cx: 160, cy: 150, delay: "0s" },    // Top-left server
            { cx: 658, cy: 150, delay: "2s" },    // Top-right server
            { cx: 160, cy: 618, delay: "4s" },    // Bottom-left server
            { cx: 658, cy: 618, delay: "1s" },    // Bottom-right server
            { cx: 409, cy: 230, delay: "3s" },    // Top-center server
            { cx: 409, cy: 538, delay: "5s" },    // Bottom-center server
          ].map((node, index) => (
            <circle
              key={index}
              cx={node.cx}
              cy={node.cy}
              r="8"
              fill="url(#accentGlow)"
              filter="url(#subtleGlow)"
              opacity="0.4"
            >
              <animate 
                attributeName="r" 
                values="6;12;6" 
                dur="8s" 
                begin={node.delay}
                repeatCount="indefinite"
              />
              <animate 
                attributeName="opacity" 
                values="0.2;0.6;0.2" 
                dur="8s" 
                begin={node.delay}
                repeatCount="indefinite"
              />
            </circle>
          ))}

          {/* Connection line pulses - subtle data flow indication */}
          {[
            "M 160 150 C 205 260, 230 285, 260 300 C 300 320, 350 360, 409 384",
            "M 658 150 C 620 260, 590 285, 560 300 C 520 320, 470 360, 409 384",
            "M 160 618 C 205 510, 230 485, 260 470 C 300 450, 350 410, 409 384",
            "M 658 618 C 620 510, 590 485, 560 470 C 520 450, 470 410, 409 384",
          ].map((path, index) => (
            <g key={index}>
              {/* Subtle pulsing line overlay */}
              <path
                d={path}
                stroke="rgba(59,130,246,0.3)"
                strokeWidth="1"
                fill="none"
                filter="url(#subtleGlow)"
                opacity="0.5"
              >
                <animate 
                  attributeName="opacity" 
                  values="0.2;0.7;0.2" 
                  dur="10s" 
                  begin={`${index * 2.5}s`}
                  repeatCount="indefinite"
                />
              </path>
            </g>
          ))}

          {/* Ambient data particles - very subtle */}
          {[
            { cx: 300, cy: 200, delay: "0s" },
            { cx: 518, cy: 200, delay: "3s" },
            { cx: 300, cy: 568, delay: "6s" },
            { cx: 518, cy: 568, delay: "1.5s" },
          ].map((particle, index) => (
            <circle
              key={index}
              cx={particle.cx}
              cy={particle.cy}
              r="2"
              fill="rgba(247,230,155,0.6)"
              opacity="0.3"
            >
              <animate 
                attributeName="r" 
                values="1;4;1" 
                dur="12s" 
                begin={particle.delay}
                repeatCount="indefinite"
              />
              <animate 
                attributeName="opacity" 
                values="0.1;0.6;0.1" 
                dur="12s" 
                begin={particle.delay}
                repeatCount="indefinite"
              />
            </circle>
          ))}
        </svg>
      </div>
      
      {/* Subtle ambient light reflection on top */}
      <div 
        className="absolute top-0 left-1/2 transform -translate-x-1/2 w-3/4 h-1/3 z-5 pointer-events-none opacity-20"
        style={{
          background: 'radial-gradient(ellipse 80% 100% at 50% 0%, rgba(247,230,155,0.4) 0%, transparent 70%)',
          filter: 'blur(15px)'
        }}
      />

    </div>
  );
}


export function Hero() {
  const [mounted, setMounted] = useState(false);
  const { t } = useLanguage();

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
            <div className="inline-flex items-center px-4 py-2 rounded-full text-[12px] font-semibold bg-white border border-blue-200" style={{ color: 'rgb(28, 44, 85)' }}>
              <Zap className="h-4 w-4 mr-2" />
              <span>{t('hero.badge')}</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-4"
          >
            <h1 className="text-4xl lg:text-6xl xl:text-7xl font-bold leading-tight" style={{ color: 'rgb(28, 44, 85)' }}>
              {t('hero.title.line1')}
              <br className="md:block hidden" />
              <span className="font-semibold">{t('hero.title.line2')} </span>
              <br className="md:block hidden" />
              <span className="font-semibold">{t('hero.title.line3')}</span>
            </h1>
            <p className="text-xl font-semibold lg:text-2xl leading-relaxed max-w-2xl" style={{ color: 'rgb(28, 44, 85)' }}>
              {t('hero.subtitle').split('\n').map((line, index) => (
                <span key={index}>
                  {line}
                  {index < t('hero.subtitle').split('\n').length - 1 && <br className="md:block hidden" />}
                </span>
              ))}
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
              buttonText={t('hero.cta.primary')}
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
              {t('hero.cta.secondary')}
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
