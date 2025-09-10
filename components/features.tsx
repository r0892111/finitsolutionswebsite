"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Code2, Cog, ChevronRight, Bot, Database, Cloud, Lock, CheckCircle2, Users, Repeat, Zap, LineChart, Calendar, UserCircle2, LayoutPanelLeft, UserPlus, BrainCircuit, Package, MessageSquare as MessageSquareMore, UserCog, BarChart3, Mic, PenTool, Clock, Briefcase, Shield } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useSearchParams } from "next/navigation";
import { ProjectRequestDialog } from "@/components/project-request-dialog";

const features = [
  {
    icon: Clock,
    title: "Direct Resultaat",
    description: "Binnen no-time aan de slag met onze gebruiksvriendelijke oplossingen"
  },
  {
    icon: Briefcase,
    title: "Maatwerk dat Werkt",
    description: "Oplossingen volledig afgestemd op uw unieke bedrijfsbehoeften"
  },
  {
    icon: Users,
    title: "Altijd Direct Contact",
    description: "Ons team staat altijd klaar om u te helpen"
  },
  {
    icon: Zap,
    title: "Meer Tijd voor Groei",
    description: "Automatiseer repetitieve taken en richt uw energie op de dingen die er echt toe doen"
  },
  {
    icon: Shield,
    title: "Maximale Veiligheid",
    description: "100% GDPR-compliant en volledige bescherming van uw data"
  },
  {
    icon: Bot,
    title: "Slimme Technologie",
    description: "AI-gestuurde oplossingen voor maximale efficiëntie en resultaten"
  }
];

export function Features() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return null;
}