"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ChevronRight, Linkedin } from "lucide-react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { ProjectRequestDialog } from "@/components/project-request-dialog";
import { useTheme } from "next-themes";

const team = [
  {
    name: "Alex Otten",
    role: "Co-founder",
    image: "/alex.png",
    linkedin: "https://www.linkedin.com/in/alex-otten-b5066a350/",
    description: "Alex behaalde zijn bachelor industrieel ingenieur aan de KU Leuven. Gedreven door de snelle evolutie van AI-technologie besloot hij zijn masterstudie halverwege stop te zetten om zich volledig te engageren en actief mee te bouwen aan deze innovatieve sector. Als gepassioneerde ondernemer zet hij zich in voor het realiseren van kwaliteitsvolle en betrouwbare systemen."
  },
  {
    name: "Karel Van Ransbeeck",
    role: "Co-founder",
    image: "/karel.png",
    linkedin: "https://www.linkedin.com/in/karel-van-ransbeeck",
    description: "Met zijn natuurlijke talent voor klantencommunicatie en sterke sociale vaardigheden, vormt hij de brug tussen technologie en menselijke behoeften. Als medeoprichter legt hij de focus op het begrijpen van klantenwensen en het vertalen daarvan naar praktische oplossingen, waarbij klanttevredenheid en duurzame relaties centraal staan. Karel behaalde zijn diploma toegepaste informatica aan de UCLL in Keerbergen."
  },
  {
    name: "Jord Goossens",
    role: "Chief Technology Officer",
    image: "/jord.png",
    linkedin: "https://www.linkedin.com/in/jord-goossens/",
    description: "Als Chief Technology Officer brengt Jord een schat aan ervaring mee in enterprise-level softwarearchitectuur en AI-implementaties. Met zijn diepgaande kennis van cloud-infrastructuur en machine learning zorgt hij ervoor dat onze technische oplossingen schaalbaar, veilig en toekomstbestendig zijn. Jord's strategische visie op technologie-innovatie vormt de ruggengraat van onze technische excellentie."
  },
];

export default function AboutPage() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const { theme } = useTheme();

  return (
    <main className="pt-20">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 bg-muted overflow-hidden">
        {/* Floating Particles */}
        <div className="absolute inset-0">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1.5 h-1.5 bg-primary/20 rounded-full"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animation: `float${i % 4} ${3 + i}s infinite ease-in-out`
              }}
            />
          ))}
        </div>

        <div className="container relative mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary mb-6"
            >
              <span>Over Ons</span> <ChevronRight className="h-4 w-4 ml-1" />
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl md:text-5xl font-bold mb-6"
            >
              Jonge ondernemers met een missie
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg text-muted-foreground"
            >
              We zijn meer dan een bedrijf – we zijn een team van gepassioneerde techneuten die geloven in de kracht van innovatie.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              ref={ref}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="prose prose-lg dark:prose-invert max-w-none"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-8">Ons Verhaal</h2>
              
              <div className="space-y-6 text-lg">
                <p className="text-muted-foreground">
                  Wat begon als een droom van twee beste vrienden, is vandaag uitgegroeid tot een gedreven team. Gedurende onze studies hebben we onszelf bijgespijkerd in de avonden, weekenden en elke vrije minuut daartussen. Nu zetten we die kennis om in échte resultaten.
                </p>

                <p className="text-muted-foreground">
                  We zijn techneuten, probleemoplossers en ondernemers in hart en nieren. Wat ons bindt? Een gedeelde passie voor digitale innovatie en de ambitie om bedrijven te helpen efficiënter, slimmer en sneller te werken.
                </p>

                <p className="text-muted-foreground">
                  Kwaliteit staat bij ons voorop. Geen loze beloftes of wazige praat – maar transparantie, heldere communicatie en volledige verantwoordelijkheid voor alles wat we opleveren. Of het nu gaat om een bestaand systeem dat gepersonaliseerd moet worden, of een volledig maatwerkoplossing vanaf nul: we denken mee, bouwen, testen en leveren pas op als het écht goed zit.
                </p>

                <p className="text-muted-foreground">
                  De digitale wereld verandert razendsnel. Wij groeien mee – en helpen jou om dat ook te doen.
                </p>

                <p className="text-xl font-semibold">
                  Groei je met ons mee?
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-8"
            >
              <ProjectRequestDialog buttonText="Neem contact op" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 md:py-32 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-4xl font-bold mb-4"
            >
              Ons Team
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-muted-foreground"
            >
              Maak kennis met de experts die Finit Solutions maken tot wat het is
            </motion.p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-md transition-shadow duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="relative w-20 h-20 shrink-0">
                        <Image
                          src={member.image}
                          alt={member.name}
                          fill
                          className="object-cover rounded-lg"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <h3 className="text-lg font-semibold truncate">{member.name}</h3>
                          <a 
                            href={member.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:text-primary/80 transition-colors shrink-0"
                            aria-label={`${member.name}'s LinkedIn profile`}
                          >
                            <Linkedin className="h-5 w-5" />
                          </a>
                        </div>
                        <p className="text-primary font-medium text-sm">{member.role}</p>
                      </div>
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed">{member.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes float0 {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          25% { transform: translate(10px, -10px) rotate(5deg); }
          50% { transform: translate(20px, 0) rotate(0deg); }
          75% { transform: translate(10px, 10px) rotate(-5deg); }
        }
        @keyframes float1 {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          25% { transform: translate(-15px, -5px) rotate(-5deg); }
          50% { transform: translate(-25px, 5px) rotate(0deg); }
          75% { transform: translate(-15px, 15px) rotate(5deg); }
        }
        @keyframes float2 {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          25% { transform: translate(15px, 15px) rotate(5deg); }
          50% { transform: translate(25px, 5px) rotate(0deg); }
          75% { transform: translate(15px, -5px) rotate(-5deg); }
        }
        @keyframes float3 {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          25% { transform: translate(-10px, 10px) rotate(-5deg); }
          50% { transform: translate(-20px, 0) rotate(0deg); }
          75% { transform: translate(-10px, -10px) rotate(5deg); }
        }
      `}</style>
    </main>
  );
}