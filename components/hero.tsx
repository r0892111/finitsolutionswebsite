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
import Image from "next/image";
import dynamic from "next/dynamic";

// Lazy load heavy components
const MagicVisual = dynamic(() => import("./magic-visual"), {
  loading: () => <div className="w-[320px] md:w-[640px] aspect-[818/768] bg-gray-100 animate-pulse rounded-lg" />,
  ssr: false
});

/**
export function Hero() {
  const [mounted, setMounted] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const { t } = useLanguage();

  useEffect(() => setMounted(true), []);
  
  // Show loading state while mounting
  if (!mounted) {
    return (
      <section className="relative md:min-h-screen overflow-hidden">
        <div className="max-w-[1500px] gap-20 md:gap-0 px-4 md:px-10 mx-auto md:flex-row flex-col-reverse flex items-center justify-between py-20 md:py-0 md:h-screen lg:px-8">
          <div className="absolute inset-0 bg-[url('/about-bg.png')] bg-cover z-[-1] bg-center"></div>
          <div className="w-full lg:w-1/2 space-y-8">
            <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-32 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-16 bg-gray-200 rounded animate-pulse"></div>
          </div>
          <div className="w-[320px] md:w-[640px] aspect-[818/768] bg-gray-200 animate-pulse rounded-lg"></div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative md:min-h-screen overflow-hidden">
      <div className="max-w-[1500px] gap-20 md:gap-0 px-4 md:px-10 mx-auto md:flex-row flex-col-reverse flex items-center justify-between py-20 md:py-0 md:h-screen lg:px-8">
        <div className="absolute inset-0 bg-[url('/about-bg.png')] bg-cover z-[-1] bg-center"></div>

        {/* Left Content */}
        <div className="w-full lg:w-1/2 space-y-8">
          <motion.div
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
            animate={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
            transition={shouldReduceMotion ? {} : { duration: 0.6 }}
          >
            <div className="inline-flex items-center px-4 py-2 rounded-full text-[12px] font-semibold bg-white border border-blue-200" style={{ color: 'rgb(28, 44, 85)' }}>
              <Zap className="h-4 w-4 mr-2" />
              <span>{t('hero.badge')}</span>
            </div>
          </motion.div>

          <motion.div
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 30 }}
            animate={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
            transition={shouldReduceMotion ? {} : { duration: 0.8, delay: 0.2 }}
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
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
            animate={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
            transition={shouldReduceMotion ? {} : { duration: 0.6, delay: 0.4 }}
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
          {mounted && <MagicVisual />}
        </div>
      </div>
    </section>
  );
}
