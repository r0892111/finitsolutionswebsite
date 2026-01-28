"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Zap, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProjectRequestDialog } from "@/components/project-request-dialog";
import { useLanguage } from "@/contexts/language-context";


export function Hero() {
  const [mounted, setMounted] = useState(false);
  const { t } = useLanguage();

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <section className="relative md:min-h-screen overflow-hidden">
      <div className="max-w-[1500px] px-4 md:px-10 mx-auto flex items-center justify-center py-20 md:py-0 md:h-screen lg:px-8">
        <div className="absolute inset-0 bg-[url('/about-bg.png')] bg-cover z-[-1] bg-center"></div>

        {/* Centered Content */}
        <div className="w-full max-w-4xl space-y-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex justify-center"
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
              AI Workforces{" "}
              <br className="md:block hidden" />
              <span className="font-semibold">that automate </span>
              <br className="md:block hidden" />
              <span className="font-semibold">and scale your business.</span>
            </h1>
            <p className="text-xl font-semibold lg:text-2xl leading-relaxed max-w-2xl mx-auto" style={{ color: 'rgb(28, 44, 85)' }}>
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
            className="flex flex-col sm:flex-row gap-4 pt-4 justify-center"
          >
            <ProjectRequestDialog
              buttonText={t('hero.cta.primary')}
              buttonClassName="bg-gray-400 hover:bg-gray-500 text-white px-8 py-4 text-lg rounded-full font-medium"
            />
            <Button
              size="lg"
              variant="outline"
              className="border-gray-300 text-gray-700 hover:bg-blue-800 px-8 py-4 text-lg rounded-full font-medium"
            >
              <a 
                href="https://calendly.com/karel-finitsolutions/kennismaking-finit-solutions"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <Calendar className="h-5 w-5" />
                {t('hero.cta.meeting')}
              </a>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
