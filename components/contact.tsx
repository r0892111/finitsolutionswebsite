"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ChevronRight, ArrowRight, Mail, Phone, MapPin, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactFormSchema, type ContactForm } from "@/lib/schema";

export function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const { toast } = useToast();

  const form = useForm<ContactForm>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: ""
    }
  });

  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = form;

  const onSubmit = async (data: ContactForm) => {
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Submission failed');
      }

      toast({
        title: "Bericht verstuurd",
        description: "We nemen binnen één werkdag contact met je op.",
      });

      reset();
    } catch (error) {
      console.error('Submission error:', error);
      toast({
        title: "Er is iets misgegaan",
        description: "Probeer het later opnieuw of neem direct contact met ons op.",
        variant: "destructive",
      });
    }
  };

  return (
    <section id="contact" className="relative py-12 md:py-16 bg-background">
      <div className="container mx-auto px-4 relative z-10">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary mb-6"
          >
            <span>Contact</span> <ChevronRight className="h-4 w-4 ml-1" />
          </motion.p>
          
          <motion.h2
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold mb-6"
          >
            Laten we samen bouwen aan{" "}
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              uw toekomst
            </span>
          </motion.h2>
          
          
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 max-w-6xl mx-auto">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold mb-4">Stuur ons een bericht</h3>
              <p className="text-muted-foreground mb-6">
                Vertel ons over uw project en we nemen snel contact op voor een vrijblijvend gesprek.
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Naam</Label>
                  <Input
                    id="name"
                    placeholder="Jan Janssen"
                    {...register("name")}
                  />
                  {errors.name && (
                    <p className="text-sm text-destructive">{errors.name.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">E-mail</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="jan@bedrijf.nl"
                    {...register("email")}
                  />
                  {errors.email && (
                    <p className="text-sm text-destructive">{errors.email.message}</p>
                  )}
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="subject">Onderwerp</Label>
                <Input
                  id="subject"
                  placeholder="Waar kunnen we je mee helpen?"
                  {...register("subject")}
                />
                {errors.subject && (
                  <p className="text-sm text-destructive">{errors.subject.message}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="message">Bericht</Label>
                <Textarea
                  id="message"
                  placeholder="Vertel ons over uw project, uitdagingen of vragen..."
                  className="min-h-[150px]"
                  {...register("message")}
                />
                {errors.message && (
                  <p className="text-sm text-destructive">{errors.message.message}</p>
                )}
              </div>
              
              <Button
                type="submit"
                className="w-full group"
                disabled={isSubmitting}
                size="lg"
              >
                {isSubmitting ? 'Versturen...' : 'Verstuur Bericht'}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </form>
          </motion.div>

          {/* Direct Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold mb-4">Of geef ons gerust een seintje</h3>
              <p className="text-muted-foreground mb-8">
                Liever direct contact? Bel ons voor een snelle chat over uw project of stuur een WhatsApp bericht.
              </p>
            </div>

            {/* Contact Cards */}
            <div className="space-y-6">
              {/* Phone Contact */}
              <div className="bg-card border border-border rounded-xl p-6 hover:shadow-md transition-all duration-300 group">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-lg mb-2">Bel ons direct</h4>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="text-muted-foreground text-sm">Karel:</span>
                        <a 
                          href="tel:+32468029945" 
                          className="text-primary hover:underline font-medium"
                        >
                          +32 (0)495 70 23 14
                        </a>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-muted-foreground text-sm">Alex:</span>
                        <a 
                          href="tel:+32495702314" 
                          className="text-primary hover:underline font-medium"
                        >
                          +32 (0)468 02 99 45
                        </a>
                      </div>
                    </div>
                    <p className="text-muted-foreground text-sm mt-2">
                      Ook bereikbaar buiten de kantooruren
                    </p>
                  </div>
                </div>
              </div>

              {/* WhatsApp Contact */}
              <div className="bg-card border border-border rounded-xl p-6 hover:shadow-md transition-all duration-300 group">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-green-500/10 flex items-center justify-center shrink-0 group-hover:bg-green-500/20 transition-colors">
                    <MessageCircle className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-lg mb-2">WhatsApp</h4>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="text-muted-foreground text-sm">Stuur een bericht naar:</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <a 
                          href="https://wa.me/32495702314" 
                          className="text-green-600 hover:underline font-medium"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Karel
                        </a>
                        <span className="text-muted-foreground">of</span>
                        <a 
                          href="https://wa.me/32468029945" 
                          className="text-green-600 hover:underline font-medium"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Alex
                        </a>
                      </div>
                    </div>
                    
                  </div>
                </div>
              </div>

              {/* Email Contact */}
              <div className="bg-card border border-border rounded-xl p-6 hover:shadow-md transition-all duration-300 group">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center shrink-0 group-hover:bg-blue-500/20 transition-colors">
                    <Mail className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-lg mb-2">E-mail</h4>
                    <a 
                      href="mailto:contact@finitsolutions.be" 
                      className="text-blue-600 hover:underline font-medium"
                    >
                      contact@finitsolutions.be
                    </a>
                    <p className="text-muted-foreground text-sm mt-2">
                      We reageren binnen één werkdag
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}