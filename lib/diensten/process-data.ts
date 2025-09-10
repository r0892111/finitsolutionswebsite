/**
 * Process step data and configuration
 * Contains all static data for the diensten process steps
 */

import { Search, Lightbulb, Code, TestTube, Rocket } from "lucide-react";
import type { ProcessStep, FloatingElement } from "@/types/diensten";

export const processSteps: ProcessStep[] = [
  {
    id: 1,
    title: "Probleem Identificatie",
    subtitle: "Ontdekken & Analyseren",
    description: "We beginnen met een grondige analyse van uw huidige situatie en identificeren de kernuitdagingen.",
    icon: Search,
    accent: "from-blue-500 to-blue-600",
    details: [
      "Uitgebreide stakeholder interviews",
      "Analyse van bestaande systemen en workflows",
      "Identificatie van pijnpunten en inefficiënties",
      "Documentatie van huidige processen"
    ],
    useCase: "Een advocatenkantoor worstelt met het snel vinden van relevante juridische informatie verspreid over verschillende documenten en systemen.",
    visual: "analysis"
  },
  {
    id: 2,
    title: "Oplossing Ontwerp",
    subtitle: "Strategisch Plannen",
    description: "Op basis van onze bevindingen ontwerpen we een op maat gemaakte oplossing die perfect aansluit bij uw behoeften.",
    icon: Lightbulb,
    accent: "from-amber-500 to-orange-500",
    details: [
      "Technische architectuur en systeemontwerp",
      "User experience en interface planning",
      "Integratiestrategie met bestaande systemen",
      "Projectplanning en milestone definitie"
    ],
    useCase: "We stellen een AI-gedreven kennisbank voor die alle juridische documenten indexeert en doorzoekbaar maakt via natuurlijke taal.",
    visual: "design"
  },
  {
    id: 3,
    title: "Ontwikkeling",
    subtitle: "Bouwen & Integreren",
    description: "Ons ervaren team bouwt uw oplossing met de nieuwste technologieën en best practices.",
    icon: Code,
    accent: "from-green-500 to-emerald-600",
    details: [
      "Agile ontwikkeling met regelmatige updates",
      "Moderne technologieën en frameworks",
      "Veilige en schaalbare architectuur",
      "Continue integratie en deployment"
    ],
    useCase: "We ontwikkelen een RAG-systeem dat documenten ingesteert, indexeert en een intuïtieve chat-interface biedt voor juridische zoekopdrachten.",
    visual: "development"
  },
  {
    id: 4,
    title: "Testing & Validatie",
    subtitle: "Kwaliteit Verzekeren",
    description: "Uitgebreide tests zorgen ervoor dat uw oplossing perfect functioneert voordat we live gaan.",
    icon: TestTube,
    accent: "from-purple-500 to-violet-600",
    details: [
      "Geautomatiseerde en handmatige testing",
      "Performance en security audits",
      "User acceptance testing",
      "Bug fixes en optimalisaties"
    ],
    useCase: "We testen de zoeknauwkeurigheid, gebruikersinterface en beveiligingsprotocollen met echte juridische cases.",
    visual: "testing"
  },
  {
    id: 5,
    title: "Lancering & Ondersteuning",
    subtitle: "Live Gaan & Groeien",
    description: "We lanceren uw oplossing en bieden continue ondersteuning voor optimale prestaties.",
    icon: Rocket,
    accent: "from-red-500 to-pink-600",
    details: [
      "Geleidelijke uitrol en go-live ondersteuning",
      "Training en documentatie voor gebruikers",
      "Monitoring en performance optimalisatie",
      "Continue ondersteuning en updates"
    ],
    useCase: "Het systeem wordt gelanceerd met training voor alle advocaten, en we monitoren de prestaties om verder te optimaliseren.",
    visual: "launch"
  }
];

export const floatingElements: FloatingElement[] = [
  {
    id: "element-1",
    size: "w-64 h-64",
    color: "bg-gradient-to-r from-primary/10 to-blue-500/10",
    position: { top: "10%", left: "5%" },
    animation: "animate-float-slow"
  },
  {
    id: "element-2",
    size: "w-96 h-96",
    color: "bg-gradient-to-r from-purple-500/8 to-pink-500/8",
    position: { top: "20%", left: "80%" },
    animation: "animate-float-medium"
  },
  {
    id: "element-3",
    size: "w-48 h-48",
    color: "bg-gradient-to-r from-green-500/12 to-emerald-500/12",
    position: { top: "60%", left: "10%" },
    animation: "animate-float-fast"
  },
  {
    id: "element-4",
    size: "w-80 h-80",
    color: "bg-gradient-to-r from-amber-500/8 to-orange-500/8",
    position: { top: "70%", left: "75%" },
    animation: "animate-float-slow"
  }
];