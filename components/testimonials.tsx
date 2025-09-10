"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ChevronRight, Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const testimonials = [
  {
    quote: "Finit Solutions heeft onze bedrijfsprocessen compleet getransformeerd. Hun platform is intuïtief en krachtig, waardoor complexe processen eenvoudig en toegankelijk worden.",
    author: "Thomas Janssens",
    position: "CEO, TechVision BV",
    avatar: "TJ"
  },
  {
    quote: "Als ondernemer was ik altijd op zoek naar manieren om tijd te besparen. Finit heeft dit mogelijk gemaakt met hun slimme automatiseringsoplossingen. De resultaten zijn indrukwekkend.",
    author: "Lisa van den Berg",
    position: "Eigenaar, Digital Solutions",
    avatar: "LB"
  },
  {
    quote: "De persoonlijke aanpak en technische expertise van Finit Solutions hebben ons overtuigd. Ze denken echt mee over de beste oplossing voor onze specifieke situatie.",
    author: "Mark de Vries",
    position: "Directeur, InnovateNow",
    avatar: "MV"
  }
];

export function Testimonials() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section id="testimonials" className="relative py-20 md:py-32 bg-muted">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary mb-4"
          >
            <span>Testimonials</span> <ChevronRight className="h-4 w-4 ml-1" />
          </motion.p>
          
          <motion.h2
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            Wat Onze Klanten Zeggen
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-muted-foreground"
          >
            Ontdek hoe Finit Solutions bedrijven helpt hun doelen te bereiken met innovatieve oplossingen
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
            >
              <Card className="h-full bg-card hover:shadow-md transition-all duration-300">
                <CardContent className="p-6 md:p-8">
                  <Quote className="h-10 w-10 text-primary/20 mb-4" />
                  <p className="text-foreground/90 mb-6 italic">
                    &quot;{testimonial.quote}&quot;
                  </p>
                  <div className="flex items-center">
                    <Avatar className="h-10 w-10 mr-3">
                      <AvatarImage src="" alt={testimonial.author} />
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {testimonial.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-medium">{testimonial.author}</h4>
                      <p className="text-sm text-muted-foreground">{testimonial.position}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}