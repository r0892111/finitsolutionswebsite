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
        {/* Primary depth shadow - enhanced for dramatic lift */}
        <div 
          className="absolute inset-0 rounded-3xl blur-3xl opacity-50"
          style={{
            background: 'radial-gradient(ellipse 85% 65% at 50% 75%, rgba(22,44,85,0.8) 0%, rgba(22,44,85,0.4) 35%, transparent 65%)',
            transform: 'translateY(25px) translateX(8px) scale(1.15)'
          }}
        />
        
        {/* Secondary depth shadow - medium spread with offset */}
        <div 
          className="absolute inset-0 rounded-2xl blur-2xl opacity-40"
          style={{
            background: 'radial-gradient(ellipse 75% 55% at 50% 70%, rgba(59,130,246,0.6) 0%, rgba(22,44,85,0.5) 30%, transparent 60%)',
            transform: 'translateY(18px) translateX(6px) scale(1.08)'
          }}
        />
        
        {/* Close contact shadow - sharp and defined */}
        <div 
          className="absolute inset-0 rounded-xl blur-xl opacity-60"
          style={{
            background: 'radial-gradient(ellipse 65% 45% at 50% 65%, rgba(22,44,85,0.9) 0%, rgba(22,44,85,0.6) 20%, transparent 45%)',
            transform: 'translateY(12px) translateX(4px)'
          }}
        />
        
        {/* New: Immediate drop shadow - very close to object */}
        <div 
          className="absolute inset-0 rounded-lg blur-lg opacity-35"
          style={{
            background: 'radial-gradient(ellipse 55% 35% at 50% 60%, rgba(22,44,85,0.7) 0%, rgba(22,44,85,0.4) 15%, transparent 35%)',
            transform: 'translateY(6px) translateX(2px) scale(0.98)'
          }}
        />
        
        {/* Enhanced accent glow shadow with more intensity */}
        <div 
          className="absolute inset-0 rounded-2xl blur-2xl opacity-30"
          style={{
            background: 'radial-gradient(ellipse 95% 75% at 50% 55%, rgba(247,230,155,0.7) 0%, rgba(247,230,155,0.4) 25%, transparent 55%)',
            transform: 'translateY(8px) translateX(3px) scale(0.96)'
          }}
        />
        
        {/* Enhanced rim lighting with stronger definition */}
        <div 
          className="absolute inset-0 rounded-3xl opacity-35"
          style={{
            background: 'conic-gradient(from 0deg at 50% 50%, rgba(147,197,253,0.5) 0deg, transparent 50deg, rgba(59,130,246,0.4) 110deg, transparent 170deg, rgba(22,44,85,0.5) 230deg, transparent 290deg, rgba(147,197,253,0.5) 360deg)',
            transform: 'translateY(15px) translateX(5px) scale(1.12)',
            filter: 'blur(25px)'
          }}
        />
        
        {/* New: Distant atmospheric shadow for extreme depth */}
        <div 
          className="absolute inset-0 rounded-3xl opacity-25"
          style={{
            background: 'radial-gradient(ellipse 100% 80% at 50% 80%, rgba(22,44,85,0.4) 0%, rgba(22,44,85,0.2) 50%, transparent 80%)',
            transform: 'translateY(35px) translateX(12px) scale(1.25)',
            filter: 'blur(40px)'
          }}
        />
      </div>
      
      {/* Elevated content container with subtle lift effect */}
      <div 
        className="relative z-10"
        style={{
          filter: 'drop-shadow(0 30px 60px rgba(22,44,85,0.25)) drop-shadow(0 15px 35px rgba(22,44,85,0.18)) drop-shadow(0 6px 15px rgba(22,44,85,0.12))',
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
