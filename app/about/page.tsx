"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ChevronRight, Users, Mail } from "lucide-react";
import Image from "next/image";
import { ProjectRequestDialog } from "@/components/project-request-dialog";
import { Button } from "@/components/ui/button";
import { TeamSection } from "@/components/team-section";
import { useLanguage } from "@/contexts/language-context";


export default function AboutPage() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const { t } = useLanguage();

  return (
    <main className="pt-20 bg-finit-aurora min-h-screen font-general-sans">
      {/* Hero Section with Aurora Background */}
      <section className="relative py-16 md:py-20 px-4 md:px-8 lg:px-12 bg-finit-aurora overflow-hidden">
        <div className="w-full">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="mb-6 mt-12"
            >
              <div className="inline-flex items-center px-6 py-3 rounded-full text-sm font-medium bg-white/20 text-white mb-8 border border-white/30 shadow-lg backdrop-blur-sm">
                <Users className="h-4 w-4 mr-2" />
                <span>{t('about.page.badge')}</span> 
                <ChevronRight className="h-4 w-4 ml-2" />
              </div>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="finit-h1 text-white mb-6"
            >
              {t('about.page.title.line1')}
              <br />
              <span className="finit-highlight mt-4 inline-block">{t('about.page.title.highlight')}</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="finit-body text-white/90 max-w-3xl mx-auto"
            >
              {t('about.page.subtitle')}
            </motion.p>
          </div>
        </div>
      </section>

      {/* Story Section with Aurora Background */}
      <section className="py-16 md:py-20 px-4 md:px-8 lg:px-12 bg-finit-aurora relative overflow-hidden">
        <div className="w-full">
          <div className="max-w-5xl mx-auto">
            <motion.div
              ref={ref}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="text-center mb-16"
            >
              <h2 className="finit-h1 text-white">
                {t('about.story.title')}
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.3 }}
              className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-white/25 shadow-2xl"
            >
              <div className="space-y-6 finit-body text-gray-800">
                <p>
                  {t('about.story.paragraph1')}
                </p>

                <p>
                  {t('about.story.paragraph2')}
                </p>

                <p>
                  {t('about.story.paragraph3')}
                </p>

                <p>
                  {t('about.story.paragraph4')}
                </p>

                <motion.p
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.8, delay: 0.8 }}
                  className="finit-h2 text-center pt-6 text-gray-800"
                >
                  {t('about.story.cta')}
                </motion.p>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 1 }}
                className="text-center mt-8"
              >
                <ProjectRequestDialog 
                  buttonText={t('about.story.button')}
                  buttonClassName="bg-white/90 backdrop-blur-xl text-primary hover:bg-white border border-white/50 shadow-xl hover:shadow-2xl transition-all duration-300 finit-body px-8 py-4 rounded-full font-medium"
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <TeamSection />

      {/* Contact CTA Section with Aurora Background */}
      <section className="py-16 md:py-20 px-4 md:px-8 lg:px-12 bg-finit-aurora relative overflow-hidden">
        <div className="w-full">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-center max-w-4xl mx-auto"
          >
            <h2 className="finit-h1 text-gray-800 mb-6">
              {t('about.cta.title')}
            </h2>
            <p className="finit-body text-gray-700 mb-12">
              {t('about.cta.description')}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <ProjectRequestDialog 
                buttonText={t('about.cta.primary')}
                buttonClassName="bg-white/90 backdrop-blur-xl text-primary hover:bg-white border border-white/50 shadow-xl hover:shadow-2xl transition-all duration-300 finit-body px-8 py-4 rounded-full font-medium"
              />
              <Button 
                variant="outline" 
                size="lg"
                className="border-gray-300 text-gray-800 hover:bg-white/10 shadow-lg hover:shadow-xl transition-all duration-300 finit-body px-8 py-4 rounded-full backdrop-blur-sm"
                onClick={() => window.location.href = 'mailto:contact@finitsolutions.be'}
              >
                <Mail className="h-5 w-5 mr-2" />
                {t('about.cta.secondary')}
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}