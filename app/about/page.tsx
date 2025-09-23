"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ChevronRight, Linkedin, X, MapPin, Mail, Phone, Award, Users, Target, Heart } from "lucide-react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { ProjectRequestDialog } from "@/components/project-request-dialog";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useLanguage } from "@/contexts/language-context";

const team = [
  {
    name: "Alex Otten",
    role: "Co-founder",
    image: "/alex.png",
    linkedin: "https://www.linkedin.com/in/alex-otten-b5066a350/",
    description: "Alex behaalde zijn bachelor industrieel ingenieur aan de KU Leuven. Gedreven door de snelle evolutie van AI-technologie besloot hij zijn masterstudie halverwege stop te zetten om zich volledig te engageren en actief mee te bouwen aan deze innovatieve sector. Als gepassioneerde ondernemer zet hij zich in voor het realiseren van kwaliteitsvolle en betrouwbare systemen.",
    expertise: ["AI & Machine Learning", "Bedrijfsstrategie", "Innovatie Management", "Systeem Architectuur"],
    achievements: ["Bachelor Industrieel Ingenieur KU Leuven", "AI Technology Pioneer", "Startup Entrepreneur"],
    quote: "Technologie moet mensen helpen, niet vervangen. Daarom bouwen we AI-oplossingen die menselijke creativiteit versterken."
  },
  {
    name: "Karel Van Ransbeeck",
    role: "Co-founder",
    image: "/karel.png",
    linkedin: "https://www.linkedin.com/in/karel-van-ransbeeck",
    description: "Met zijn natuurlijke talent voor klantencommunicatie en sterke sociale vaardigheden, vormt hij de brug tussen technologie en menselijke behoeften. Als medeoprichter legt hij de focus op het begrijpen van klantenwensen en het vertalen daarvan naar praktische oplossingen, waarbij klanttevredenheid en duurzame relaties centraal staan. Karel behaalde zijn diploma toegepaste informatica aan de UCLL in Keerbergen.",
    expertise: ["Client Relations", "Business Development", "Project Management", "Toegepaste Informatica"],
    achievements: ["Diploma Toegepaste Informatica UCLL", "Client Success Specialist", "Business Strategy Expert"],
    quote: "Elke klant heeft een uniek verhaal. Ons doel is om dat verhaal te begrijpen en technologie in te zetten om hun dromen waar te maken."
  },
  {
    name: "Jord Goossens",
    role: "Chief Technology Officer",
    image: "/jord.png",
    linkedin: "https://www.linkedin.com/in/jord-goossens/",
    description: "Als Chief Technology Officer brengt Jord een schat aan ervaring mee in enterprise-level softwarearchitectuur en AI-implementaties. Met zijn diepgaande kennis van cloud-infrastructuur en machine learning zorgt hij ervoor dat onze technische oplossingen schaalbaar, veilig en toekomstbestendig zijn. Jord's strategische visie op technologie-innovatie vormt de ruggengraat van onze technische excellentie.",
    expertise: ["Enterprise Architecture", "Cloud Infrastructure", "Machine Learning", "DevOps & Security"],
    achievements: ["Enterprise Software Architect", "Cloud Infrastructure Expert", "AI Implementation Specialist"],
    quote: "Schaalbare technologie begint met de juiste fundamenten. Ik zorg ervoor dat onze systemen groeien met onze ambities."
  },
];

export default function AboutPage() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [selectedMember, setSelectedMember] = useState<typeof team[0] | null>(null);
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

      {/* Team Section with Aurora Background */}
      <section className="py-16 md:py-20 px-4 md:px-8 lg:px-12 bg-finit-aurora">
        <div className="w-full">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-center mb-16"
          >
            <h2 className="finit-h1 text-gray-800 mb-6">
              {t('about.team.title')}
            </h2>
            <p className="finit-body text-gray-700 max-w-3xl mx-auto">
              {t('about.team.subtitle')}
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group cursor-pointer"
                onClick={() => setSelectedMember(member)}
              >
                <Card className="h-full bg-white/15 backdrop-blur-xl border border-white/25 shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden relative">
                  {/* Gradient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg"></div>
                  
                  <CardContent className="p-8 relative z-10">
                    {/* Profile Image */}
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                      className="relative mb-6"
                    >
                      <div className="relative w-32 h-32 mx-auto">
                        <div className="absolute inset-0 bg-gradient-to-r from-white/30 to-white/20 rounded-xl p-1 shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                          <div className="absolute inset-0 bg-gradient-to-r from-white/25 to-white/15 rounded-xl p-1 shadow-lg group-hover:shadow-lg transition-shadow duration-200">
                            <Image
                              src={member.image}
                              alt={member.name}
                              fill
                              className="object-cover rounded-lg"
                              sizes="128px"
                              priority={index === 0}
                            />
                          </div>
                        </div>
                      </div>
                    </motion.div>

                    {/* Name and Role */}
                    <div className="text-center mb-6">
                      <h3 className="finit-h2 text-gray-800 group-hover:text-gray-700 transition-colors duration-300 mb-2">
                        {member.name}
                      </h3>
                      <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/20 border border-white/30 backdrop-blur-sm">
                        <p className="text-gray-800 font-medium text-sm">
                          {t(`about.team.roles.${member.role.toLowerCase().replace(/\s+/g, '_')}`)}
                        </p>
                      </div>
                    </div>

                    {/* Brief Description */}
                    <p className="text-gray-700 text-sm leading-relaxed mb-6 line-clamp-3">
                      {t(`about.team.descriptions.${member.name.toLowerCase().replace(/\s+/g, '_')}`)}
                    </p>

                    {/* Expertise Tags */}
                    <div className="flex flex-wrap gap-2 mb-6 justify-center">
                      {member.expertise.slice(0, 2).map((skill, idx) => (
                        <span 
                          key={idx} 
                          className="px-3 py-1 bg-white/20 text-gray-800 rounded-full text-xs font-medium border border-white/30 backdrop-blur-sm"
                        >
                          {skill}
                        </span>
                      ))}
                      {member.expertise.length > 2 && (
                        <span className="px-3 py-1 bg-white/30 text-gray-800 rounded-full text-xs font-medium border border-white/40 backdrop-blur-sm">
                          +{member.expertise.length - 2} {t('about.team.more')}
                        </span>
                      )}
                    </div>

                    {/* Action Area */}
                    <div className="flex items-center justify-between">
                      <a 
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-800 hover:text-gray-700 transition-colors p-2 rounded-lg hover:bg-white/10 backdrop-blur-sm"
                        aria-label={`${member.name}'s LinkedIn profile`}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Linkedin className="h-5 w-5" />
                      </a>
                      
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="text-gray-800 hover:text-gray-700 hover:bg-white/10 font-medium backdrop-blur-sm"
                      >
                        {t('about.team.more_info')}
                        <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform duration-300" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

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

      {/* Team Member Detail Modal */}
      <Dialog open={!!selectedMember} onOpenChange={() => setSelectedMember(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-white/95 backdrop-blur-xl border border-white/30">
          {selectedMember && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <DialogHeader className="text-center pb-6">
                <div className="relative w-32 h-32 mx-auto mb-6">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary to-blue-600 rounded-full p-1 shadow-xl">
                    <div className="w-full h-full rounded-full overflow-hidden bg-white">
                      <Image
                        src={selectedMember.image}
                        alt={selectedMember.name}
                        fill
                        className="object-cover"
                        sizes="128px"
                      />
                    </div>
                  </div>
                </div>
                
                <DialogTitle className="finit-h2 text-slate-900 mb-2">
                  {selectedMember.name}
                </DialogTitle>
                
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-primary/10 to-blue-500/10 border border-primary/20">
                  <p className="text-primary font-semibold text-sm">
                    {t(`about.team.roles.${selectedMember.role.toLowerCase().replace(/\s+/g, '_')}`)}
                  </p>
                </div>
              </DialogHeader>

              <div className="space-y-8">
                {/* Quote */}
                <div className="bg-gradient-to-r from-primary/5 to-blue-500/5 rounded-2xl p-6 border-l-4 border-primary backdrop-blur-sm">
                  <p className="text-slate-700 italic finit-body">
                    &ldquo;{selectedMember.quote}&rdquo;
                  </p>
                </div>

                {/* Full Description */}
                <div>
                  <h4 className="finit-h2 text-slate-900 mb-4">
                    {t('about.modal.about')} {selectedMember.name.split(' ')[0]}
                  </h4>
                  <p className="text-slate-600 finit-body">
                    {t(`about.team.descriptions.${selectedMember.name.toLowerCase().replace(/\s+/g, '_')}`)}
                  </p>
                </div>

                {/* Expertise */}
                <div>
                  <h4 className="finit-h2 text-slate-900 mb-4">{t('about.modal.expertise')}</h4>
                  <div className="flex flex-wrap gap-3">
                    {selectedMember.expertise.map((skill, idx) => (
                      <span 
                        key={idx} 
                        className="px-4 py-2 bg-gradient-to-r from-primary/10 to-blue-500/10 text-primary rounded-full text-sm font-medium border border-primary/20 backdrop-blur-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Achievements */}
                <div>
                  <h4 className="finit-h2 text-slate-900 mb-4">{t('about.modal.achievements')}</h4>
                  <div className="space-y-3">
                    {selectedMember.achievements.map((achievement, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-blue-600 flex items-center justify-center shadow">
                          <Award className="h-4 w-4 text-white" />
                        </div>
                        <span className="text-slate-700 font-medium finit-body">{achievement}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* LinkedIn Link */}
                <div className="pt-6 border-t border-slate-200">
                  <motion.a 
                    href={selectedMember.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="inline-flex items-center gap-3 text-primary hover:text-primary/80 transition-colors font-medium finit-body"
                  >
                    <Linkedin className="h-5 w-5" />
                    {t('about.modal.linkedin')}
                  </motion.a>
                </div>
              </div>
            </motion.div>
          )}
        </DialogContent>
      </Dialog>
    </main>
  );
}