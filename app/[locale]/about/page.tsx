"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ChevronRight, Linkedin, X, MapPin, Mail, Phone, Award, Users, Target, Heart } from "lucide-react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { ProjectRequestDialog } from "@/components/project-request-dialog";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useTranslations } from 'next-intl';

const team = [
  {
    name: "Alex Otten",
    role: "Co-founder",
    image: "/alex.png",
    linkedin: "https://www.linkedin.com/in/alex-otten-b5066a350/",
    description: "Alex behaalde zijn bachelor industrieel ingenieur aan de KU Leuven. Gedreven door de snelle evolutie van AI-technologie besloot hij zijn masterstudie halverwege stop te zetten om zich volledig te engageren en actief mee te bouwen aan deze innovatieve sector. Als gepassioneerde ondernemer zet hij zich in voor het realiseren van kwaliteitsvolle en betrouwbare systemen.",
    expertise: ["AI & Machine Learning", "Bedrijfsstrategie", "Innovatie Management", "Systeem Architectuur"],
    achievements: ["Bachelor Industrieel Ingenieur KU Leuven", "AI Technology Pioneer", "Startup Entrepreneur"]
  },
  {
    name: "Karel Van Ransbeeck",
    role: "Co-founder",
    image: "/karel.png",
    linkedin: "https://www.linkedin.com/in/karel-van-ransbeeck",
    description: "Met zijn natuurlijke talent voor klantencommunicatie en sterke sociale vaardigheden, vormt hij de brug tussen technologie en menselijke behoeften. Als medeoprichter legt hij de focus op het begrijpen van klantenwensen en het vertalen daarvan naar praktische oplossingen, waarbij klanttevredenheid en duurzame relaties centraal staan. Karel behaalde zijn diploma toegepaste informatica aan de UCLL in Keerbergen.",
    expertise: ["Client Relations", "Business Development", "Project Management", "Toegepaste Informatica"],
    achievements: ["Diploma Toegepaste Informatica UCLL", "Client Success Specialist", "Business Strategy Expert"]
  },
  {
    name: "Jord Goossens",
    role: "Chief Technology Officer",
    image: "/jord.png",
    linkedin: "https://www.linkedin.com/in/jord-goossens/",
    description: "Als Chief Technology Officer brengt Jord een schat aan ervaring mee in enterprise-level softwarearchitectuur en AI-implementaties. Met zijn diepgaande kennis van cloud-infrastructuur en machine learning zorgt hij ervoor dat onze technische oplossingen schaalbaar, veilig en toekomstbestendig zijn. Jord's strategische visie op technologie-innovatie vormt de ruggengraat van onze technische excellentie.",
    expertise: ["Enterprise Architecture", "Cloud Infrastructure", "Machine Learning", "DevOps & Security"],
    achievements: ["Enterprise Software Architect", "Cloud Infrastructure Expert", "AI Implementation Specialist"]
  },
];

export default function AboutPage() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [selectedMember, setSelectedMember] = useState<typeof team[0] | null>(null);
  const t = useTranslations('about');

  const companyValues = [
    {
      icon: Target,
      title: t('values.resultOriented.title'),
      description: t('values.resultOriented.description')
    },
    {
      icon: Users,
      title: t('values.collaboration.title'),
      description: t('values.collaboration.description')
    },
    {
      icon: Award,
      title: t('values.quality.title'),
      description: t('values.quality.description')
    },
    {
      icon: Heart,
      title: t('values.passion.title'),
      description: t('values.passion.description')
    }
  ];

  return (
    <main className="pt-20 bg-gradient-to-br from-slate-50 via-white to-slate-50 min-h-screen">
      {/* Hero Section with Enhanced Design */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        {/* Sophisticated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-primary/8 to-blue-500/8 rounded-full blur-3xl animate-float-slow"></div>
          <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-r from-purple-500/6 to-primary/6 rounded-full blur-3xl animate-float-medium"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-amber-500/4 to-yellow-500/4 rounded-full blur-3xl animate-float-fast"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="mb-8"
            >
              <div className="inline-flex items-center px-6 py-3 rounded-full text-sm font-medium bg-gradient-to-r from-primary/10 to-blue-500/10 text-primary mb-8 border border-primary/20 shadow-lg backdrop-blur-sm">
                <Users className="h-4 w-4 mr-2" />
                <span>{t('hero.badge')}</span> 
                <ChevronRight className="h-4 w-4 ml-2" />
              </div>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="text-5xl md:text-6xl lg:text-7xl font-extralight mb-8 bg-gradient-to-r from-slate-900 via-primary to-slate-900 bg-clip-text text-transparent tracking-tight leading-tight"
            >
              {t('hero.title')}
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="text-xl md:text-2xl text-slate-600 font-light leading-relaxed tracking-wide"
            >
              {t('hero.subtitle')}
            </motion.p>
          </div>
        </div>
      </section>

      {/* Company Values Section */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-extralight mb-6 text-slate-900 tracking-tight">
              {t('values.title')}
            </h2>
            <p className="text-xl text-slate-600 font-light max-w-3xl mx-auto leading-relaxed">
              {t('values.subtitle')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {companyValues.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group"
              >
                <Card className="h-full bg-white/80 backdrop-blur-sm border-slate-200/50 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden">
                  <CardContent className="p-8 text-center">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.3 }}
                      className="w-16 h-16 rounded-2xl bg-gradient-to-r from-primary to-blue-600 flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl"
                    >
                      <value.icon className="h-8 w-8 text-white" />
                    </motion.div>
                    <h3 className="text-xl font-bold mb-4 text-slate-900 group-hover:text-primary transition-colors">
                      {value.title}
                    </h3>
                    <p className="text-slate-600 leading-relaxed font-light">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section with Enhanced Typography */}
      <section className="py-20 md:py-28 bg-gradient-to-r from-slate-900 via-primary to-slate-900 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-64 h-64 bg-white/5 rounded-full blur-3xl animate-float-slow"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-float-medium"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto">
            <motion.div
              ref={ref}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="text-center mb-16"
            >
              <h2 className="text-5xl md:text-6xl font-extralight mb-8 text-white tracking-tight">
                {t('story.title')}
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.3 }}
              className="bg-white/10 backdrop-blur-xl rounded-3xl p-12 md:p-16 border border-white/20 shadow-2xl"
            >
              <div className="space-y-8 text-lg md:text-xl leading-relaxed font-light text-white/90">
                {t.raw('story.content').map((paragraph: string, index: number) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 1 }}
                className="text-center mt-12"
              >
                <ProjectRequestDialog 
                  buttonText={t('cta.startProject')}
                  buttonClassName="bg-white text-primary hover:bg-slate-100 shadow-xl hover:shadow-2xl transition-all duration-300 text-lg px-10 py-4 rounded-full"
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team Section with Interactive Cards */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-extralight mb-8 text-slate-900 tracking-tight">
              {t('team.title')}
            </h2>
            <p className="text-xl text-slate-600 font-light max-w-3xl mx-auto leading-relaxed">
              {t('team.subtitle')}
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
                whileHover={{ y: -12, scale: 1.02 }}
                className="group cursor-pointer"
                onClick={() => setSelectedMember(member)}
              >
                <Card className="h-full bg-white/90 backdrop-blur-sm border-slate-200/50 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden relative">
                  {/* Gradient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg"></div>
                  
                  <CardContent className="p-8 relative z-10">
                    {/* Profile Image - Highlighted */}
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                      className="relative mb-6"
                    >
                      <div className="relative w-24 h-24 mx-auto">
                        <div className="absolute inset-0 bg-gradient-to-r from-primary to-blue-600 rounded-full p-1 shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                          <div className="w-full h-full rounded-full overflow-hidden bg-white">
                            <Image
                              src={member.image}
                              alt={member.name}
                              fill
                              className="object-cover"
                              sizes="96px"
                            />
                          </div>
                        </div>
                        {/* Pulsing ring effect */}
                        <div className="absolute inset-0 rounded-full border-2 border-primary/30 animate-ping opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>
                    </motion.div>

                    {/* Name and Role - Highlighted */}
                    <div className="text-center mb-6">
                      <h3 className="text-2xl font-bold text-slate-900 group-hover:text-primary transition-colors duration-300 mb-2">
                        {member.name}
                      </h3>
                      <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-primary/10 to-blue-500/10 border border-primary/20">
                        <p className="text-primary font-semibold text-sm tracking-wide">
                          {member.role}
                        </p>
                      </div>
                    </div>

                    {/* Brief Description */}
                    <p className="text-slate-600 text-sm leading-relaxed mb-6 line-clamp-3">
                      {member.description}
                    </p>

                    {/* Expertise Tags */}
                    <div className="flex flex-wrap gap-2 mb-6 justify-center">
                      {member.expertise.slice(0, 2).map((skill, idx) => (
                        <span 
                          key={idx} 
                          className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-xs font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                      {member.expertise.length > 2 && (
                        <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">
                          +{member.expertise.length - 2} meer
                        </span>
                      )}
                    </div>

                    {/* Action Area */}
                    <div className="flex items-center justify-between">
                      <a 
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:text-primary/80 transition-colors p-2 rounded-lg hover:bg-primary/5"
                        aria-label={`${member.name}'s LinkedIn profile`}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Linkedin className="h-5 w-5" />
                      </a>
                      
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="text-primary hover:text-primary/80 hover:bg-primary/5 font-medium"
                      >
                        {t('team.moreInfo')}
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

      {/* Contact CTA Section */}
      <section className="py-20 md:py-28 bg-gradient-to-br from-slate-100 to-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-10 right-10 w-72 h-72 bg-gradient-to-r from-primary/8 to-blue-500/8 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-center max-w-4xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-extralight mb-8 text-slate-900 tracking-tight">
              {t('cta.title')}
            </h2>
            <p className="text-xl text-slate-600 font-light mb-12 leading-relaxed">
              {t('cta.description')}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <ProjectRequestDialog 
                buttonText={t('cta.startProject')}
                buttonClassName="bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 text-white shadow-xl hover:shadow-2xl transition-all duration-300 text-lg px-10 py-4 rounded-full"
              />
              <Button 
                variant="outline" 
                size="lg"
                className="border-slate-300 text-slate-700 hover:bg-slate-100 shadow-lg hover:shadow-xl transition-all duration-300 text-lg px-10 py-4 rounded-full"
                onClick={() => window.location.href = 'mailto:contact@finitsolutions.be'}
              >
                <Mail className="h-5 w-5 mr-2" />
                {t('cta.directContact')}
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Team Member Detail Modal */}
      <Dialog open={!!selectedMember} onOpenChange={() => setSelectedMember(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
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
                
                <DialogTitle className="text-3xl font-bold text-slate-900 mb-2">
                  {selectedMember.name}
                </DialogTitle>
                
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-primary/10 to-blue-500/10 border border-primary/20">
                  <p className="text-primary font-semibold">
                    {selectedMember.role}
                  </p>
                </div>
              </DialogHeader>

              <div className="space-y-8">
                {/* Quote */}
                <div className="bg-slate-50 rounded-2xl p-6 border-l-4 border-primary">
                  <p className="text-slate-700 italic text-lg leading-relaxed">
                    &ldquo;{t(`team.members.${selectedMember.name.toLowerCase().split(' ')[0]}.quote`)}&rdquo;
                  </p>
                </div>

                {/* Full Description */}
                <div>
                  <h4 className="text-xl font-bold text-slate-900 mb-4">Over {selectedMember.name.split(' ')[0]}</h4>
                  <p className="text-slate-600 leading-relaxed">
                    {selectedMember.description}
                  </p>
                </div>

                {/* Expertise */}
                <div>
                  <h4 className="text-xl font-bold text-slate-900 mb-4">{t('team.expertise')}</h4>
                  <div className="flex flex-wrap gap-3">
                    {selectedMember.expertise.map((skill, idx) => (
                      <span 
                        key={idx} 
                        className="px-4 py-2 bg-gradient-to-r from-primary/10 to-blue-500/10 text-primary rounded-full text-sm font-medium border border-primary/20"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Achievements */}
                <div>
                  <h4 className="text-xl font-bold text-slate-900 mb-4">{t('team.achievements')}</h4>
                  <div className="space-y-3">
                    {selectedMember.achievements.map((achievement, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-blue-600 flex items-center justify-center shadow">
                          <Award className="h-4 w-4 text-white" />
                        </div>
                        <span className="text-slate-700 font-medium">{achievement}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* LinkedIn Link */}
                <div className="pt-6 border-t border-slate-200">
                  <a 
                    href={selectedMember.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 text-primary hover:text-primary/80 transition-colors font-medium"
                  >
                    <Linkedin className="h-5 w-5" />
                    {t('team.linkedinProfile')}
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </DialogContent>
      </Dialog>

      <style jsx>{`
        @keyframes float-slow {
          0%, 100% { 
            transform: translate3d(0, 0, 0) rotate(0deg) scale(1);
          }
          25% { 
            transform: translate3d(20px, -15px, 0) rotate(1deg) scale(1.02);
          }
          50% { 
            transform: translate3d(40px, 5px, 0) rotate(0deg) scale(1);
          }
          75% { 
            transform: translate3d(20px, 20px, 0) rotate(-1deg) scale(0.98);
          }
        }

        @keyframes float-medium {
          0%, 100% { 
            transform: translate3d(0, 0, 0) rotate(0deg) scale(1);
          }
          33% { 
            transform: translate3d(-25px, -10px, 0) rotate(-2deg) scale(1.03);
          }
          66% { 
            transform: translate3d(25px, 15px, 0) rotate(2deg) scale(0.97);
          }
        }

        @keyframes float-fast {
          0%, 100% { 
            transform: translate3d(0, 0, 0) rotate(0deg) scale(1);
          }
          20% { 
            transform: translate3d(15px, -20px, 0) rotate(3deg) scale(1.05);
          }
          40% { 
            transform: translate3d(-10px, 10px, 0) rotate(-1deg) scale(0.95);
          }
          60% { 
            transform: translate3d(20px, 5px, 0) rotate(2deg) scale(1.02);
          }
          80% { 
            transform: translate3d(-15px, -5px, 0) rotate(-2deg) scale(0.98);
          }
        }

        .animate-float-slow {
          animation: float-slow 20s ease-in-out infinite;
        }

        .animate-float-medium {
          animation: float-medium 15s ease-in-out infinite;
        }

        .animate-float-fast {
          animation: float-fast 12s ease-in-out infinite;
        }

        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </main>
  );
}