"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronRight, Linkedin, Award } from "lucide-react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
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

export function TeamSection() {
  const [selectedMember, setSelectedMember] = useState<typeof team[0] | null>(null);
  const { t } = useLanguage();

  return (
    <>
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
                          <div className="w-full h-full rounded-lg overflow-hidden bg-white">
                            <Image
                              src={member.image}
                              alt={member.name}
                              fill
                              className="object-cover rounded-lg"
                              sizes="128px"
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

      {/* Team Member Detail Modal */}
      <Dialog open={!!selectedMember} onOpenChange={() => setSelectedMember(null)}>
        <DialogContent className="max-w-2xl bg-finit-aurora border border-white/30 fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] max-h-[85vh] overflow-y-auto">
          {selectedMember && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              <DialogHeader className="text-center pb-6">
                <div className="relative w-32 h-32 mx-auto mb-6">
                  <div className="absolute inset-0 bg-gradient-to-r from-white/30 to-white/20 rounded-full p-1 shadow-xl">
                    <div className="w-full h-full rounded-full overflow-hidden bg-white">
                      <Image
                        src={selectedMember.image}
                        alt={selectedMember.name}
                        fill
                        className="object-cover"
                        sizes="128px"
                        priority
                      />
                    </div>
                  </div>
                </div>
                
                <DialogTitle className="finit-h2 text-white mb-2">
                  {selectedMember.name}
                </DialogTitle>
                
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/20 border border-white/30">
                  <p className="text-white font-semibold text-sm">
                    {t(`about.team.roles.${selectedMember.role.toLowerCase().replace(/\s+/g, '_')}`)}
                  </p>
                </div>
              </DialogHeader>

              <div className="space-y-8">
                {/* Quote */}
                <div className="bg-white/10 rounded-2xl p-6 border-l-4 border-white/50 backdrop-blur-sm">
                  <p className="text-white/90 italic finit-body">
                    &ldquo;{selectedMember.quote}&rdquo;
                  </p>
                </div>

                {/* Full Description */}
                <div>
                  <h4 className="finit-h2 text-white mb-4">
                    {t('about.modal.about')} {selectedMember.name.split(' ')[0]}
                  </h4>
                  <p className="text-white/80 finit-body">
                    {t(`about.team.descriptions.${selectedMember.name.toLowerCase().replace(/\s+/g, '_')}`)}
                  </p>
                </div>

                {/* Expertise */}
                <div>
                  <h4 className="finit-h2 text-white mb-4">{t('about.modal.expertise')}</h4>
                  <div className="flex flex-wrap gap-3">
                    {selectedMember.expertise.map((skill, idx) => (
                      <span 
                        key={idx} 
                        className="px-4 py-2 bg-white/10 text-white rounded-full text-sm font-medium border border-white/20 backdrop-blur-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Achievements */}
                <div>
                  <h4 className="finit-h2 text-white mb-4">{t('about.modal.achievements')}</h4>
                  <div className="space-y-3">
                    {selectedMember.achievements.map((achievement, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center shadow">
                          <Award className="h-4 w-4 text-white" />
                        </div>
                        <span className="text-white/90 font-medium finit-body">{achievement}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* LinkedIn Link */}
                <div className="pt-6 border-t border-white/20">
                  <a 
                    href={selectedMember.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 text-white hover:text-white/80 transition-colors font-medium finit-body"
                  >
                    <Linkedin className="h-5 w-5" />
                    {t('about.modal.linkedin')}
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}