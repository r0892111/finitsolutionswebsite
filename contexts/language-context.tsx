"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Language = 'nl' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

// Translation data
const translations = {
  nl: {
    // Navbar
    'nav.services': 'Tailored IT Solutions',
    'nav.marketplace': 'Marketplace',
    'nav.about': 'About Us',
    
    // Hero
    'hero.badge': 'Where the Future Begins',
    'hero.title.line1': 'AI Workforces',
    'hero.title.line2': 'that automate',
    'hero.title.line3': 'and scale your business.',
    'hero.subtitle': 'Wij bouwen AI-gestuurde software bovenop de systemen die je al gebruikt.\nOns doel is inefficiënties elimineren en krachtige hefbomen\nvoor de groei van je bedrijf ontgrendelen.',
    'hero.cta.primary': 'Aan de slag',
    'hero.cta.secondary': 'Meer weten',
    
    // About
    'about.badge': 'Diensten',
    'about.title': 'Zorg dat uw concurrent u niet voor is.',
    'about.description': 'Van AI Agents die automatisch rapporten genereren en uw planning optimaliseren tot spraaktechnologie die uw CRM up-to-date houdt - efficiëntie wordt vandaag de dag steeds belangrijker. Wij zorgen ervoor dat u de trein niet mist.',
    'about.spotlight.title': 'IN DE KIJKER',
    'about.spotlight.product': 'VoiceLink',
    'about.spotlight.description': 'Uw verkopers sturen een WhatsApp spraakbericht met hun klantbezoek - klantnaam, offertebedrag, vervolgafspraken - en alles staat automatisch op de juiste plaats in uw CRM. Deze plug & play tool integreert met elk CRM naar keuze en is in slechts 3 minuten geïnstalleerd. Meer tijd voor klanten, minder tijd aan administratie.',
    'about.tagline': 'Uw team verdient betere tools. Wij bouwen ze.',
    'about.cta': 'Leer ons kennen',
    'about.spotlight.cta': 'Probeer VoiceLink',
    'about.integrations.title': 'We integreren met:',
    'about.integrations.subtitle': 'Naadloze koppelingen met de tools die u al gebruikt',
    
    // Contact
    'contact.badge': 'Contact',
    'contact.title': 'Laten we samen bouwen aan uw toekomst',
    'contact.form.title': 'Stuur ons een bericht',
    'contact.form.description': 'Vertel ons over uw project en we nemen snel contact op voor een vrijblijvend gesprek.',
    'contact.form.name': 'Naam',
    'contact.form.email': 'E-mail',
    'contact.form.subject': 'Onderwerp',
    'contact.form.message': 'Bericht',
    'contact.form.name.placeholder': 'Jan Janssen',
    'contact.form.email.placeholder': 'jan@bedrijf.nl',
    'contact.form.subject.placeholder': 'Waar kunnen we je mee helpen?',
    'contact.form.message.placeholder': 'Vertel ons over uw project, uitdagingen of vragen...',
    'contact.form.submit': 'Verstuur Bericht',
    'contact.form.submitting': 'Versturen...',
    'contact.direct.title': 'Of geef ons gerust een seintje',
    'contact.direct.description': 'Liever direct contact? Bel ons voor een snelle chat over uw project of stuur een WhatsApp bericht.',
    'contact.phone.title': 'Bel ons direct',
    'contact.phone.availability': 'Ook bereikbaar buiten de kantooruren',
    'contact.whatsapp.title': 'WhatsApp',
    'contact.whatsapp.description': 'Stuur een bericht naar:',
    'contact.email.title': 'E-mail',
    'contact.email.response': 'We reageren binnen één werkdag',
    
    // CTA
    'cta.title': 'Klaar om tijd te besparen?',
    'cta.description': 'Plan een vrijblijvend gesprek en ontdek hoe we jouw bedrijf kunnen helpen.',
    'cta.button': 'Neem contact op',
    
    // Footer
    'footer.tagline': 'Slimme AI-oplossingen, op maat van jouw KMO.',
    'footer.menu': 'Menu',
    'footer.services': 'Diensten',
    'footer.contact': 'Contact',
    'footer.copyright': 'Alle rechten voorbehouden.',
    'footer.privacy': 'Privacybeleid',
    'footer.cookies': 'Cookieverklaring',
    'footer.disclaimer': 'Disclaimer',
    'footer.cookie.settings': 'Cookie-instellingen',
    
    // Services (Dutch content)
    'services.nav.title': 'Diensten',
    
    // Diensten Page
    'diensten.hero.title': 'Van Idee tot Impact',
    'diensten.hero.description': 'Ontdek hoe wij samen met u van uitdaging naar oplossing gaan — kort, duidelijk en resultaatgericht.',
    'diensten.hero.scroll': 'Ontdek het proces',
    'diensten.process.title': 'Ons Bewezen Proces',
    'diensten.process.subtitle': 'Een gestructureerde aanpak die zorgt voor resultaten',
    'diensten.benefits.title': 'Waarom ons proces werkt',
    'diensten.benefits.subtitle': 'Bewezen resultaten door een gestructureerde aanpak, continue samenwerking en focus op meetbare impact.',
    'diensten.benefits.collaboration.title': 'Echte samenwerking',
    'diensten.benefits.collaboration.description': 'We werken niet voor u, maar met u — uw expertise gecombineerd met onze technische kennis voor optimale resultaten.',
    'diensten.benefits.speed.title': 'Snelle resultaten',
    'diensten.benefits.speed.description': 'Door onze agile aanpak ziet u snel concrete vooruitgang en kunt u tijdig bijsturen voor maximale impact.',
    'diensten.benefits.impact.title': 'Meetbare impact',
    'diensten.benefits.impact.description': 'Elke oplossing wordt gebouwd met duidelijke KPI\'s en meetbare verbeteringen die uw ROI aantonen.',
    'diensten.cta.final.title': 'Klaar voor Excellentie?',
    'diensten.cta.final.description': 'Transformeer uw digitale visie in meetbare bedrijfsimpact. Uw ambitie verdient uitzonderlijke uitvoering.',
    'diensten.cta.final.button': 'Begin Uw Transformatie',
    
    // Process Steps
    'diensten.step1.title': 'Probleem Identificatie',
    'diensten.step1.subtitle': 'Ontdekken & Analyseren',
    'diensten.step1.description': 'We beginnen met een grondige analyse van uw huidige situatie en identificeren de kernuitdagingen.',
    'diensten.step1.detail1': 'Uitgebreide stakeholder interviews',
    'diensten.step1.detail2': 'Analyse van bestaande systemen en workflows',
    'diensten.step1.detail3': 'Identificatie van pijnpunten en inefficiënties',
    'diensten.step1.detail4': 'Documentatie van huidige processen',
    'diensten.step1.usecase': 'Een advocatenkantoor worstelt met het snel vinden van relevante juridische informatie verspreid over verschillende documenten en systemen.',
    
    'diensten.step2.title': 'Oplossing Ontwerp',
    'diensten.step2.subtitle': 'Strategisch Plannen',
    'diensten.step2.description': 'Op basis van onze bevindingen ontwerpen we een op maat gemaakte oplossing die perfect aansluit bij uw behoeften.',
    'diensten.step2.detail1': 'Technische architectuur en systeemontwerp',
    'diensten.step2.detail2': 'User experience en interface planning',
    'diensten.step2.detail3': 'Integratiestrategie met bestaande systemen',
    'diensten.step2.detail4': 'Projectplanning en milestone definitie',
    'diensten.step2.usecase': 'We stellen een AI-gedreven kennisbank voor die alle juridische documenten indexeert en doorzoekbaar maakt via natuurlijke taal.',
    
    'diensten.step3.title': 'Ontwikkeling',
    'diensten.step3.subtitle': 'Bouwen & Integreren',
    'diensten.step3.description': 'Ons ervaren team bouwt uw oplossing met de nieuwste technologieën en best practices.',
    'diensten.step3.detail1': 'Agile ontwikkeling met regelmatige updates',
    'diensten.step3.detail2': 'Moderne technologieën en frameworks',
    'diensten.step3.detail3': 'Veilige en schaalbare architectuur',
    'diensten.step3.detail4': 'Continue integratie en deployment',
    'diensten.step3.usecase': 'We ontwikkelen een RAG-systeem dat documenten ingesteert, indexeert en een intuïtieve chat-interface biedt voor juridische zoekopdrachten.',
    
    'diensten.step4.title': 'Testing & Validatie',
    'diensten.step4.subtitle': 'Kwaliteit Verzekeren',
    'diensten.step4.description': 'Uitgebreide tests zorgen ervoor dat uw oplossing perfect functioneert voordat we live gaan.',
    'diensten.step4.detail1': 'Geautomatiseerde en handmatige testing',
    'diensten.step4.detail2': 'Performance en security audits',
    'diensten.step4.detail3': 'User acceptance testing',
    'diensten.step4.detail4': 'Bug fixes en optimalisaties',
    'diensten.step4.usecase': 'We testen de zoeknauwkeurigheid, gebruikersinterface en beveiligingsprotocollen met echte juridische cases.',
    
    'diensten.step5.title': 'Lancering & Ondersteuning',
    'diensten.step5.subtitle': 'Live Gaan & Groeien',
    'diensten.step5.description': 'We lanceren uw oplossing en bieden continue ondersteuning voor optimale prestaties.',
    'diensten.step5.detail1': 'Geleidelijke uitrol en go-live ondersteuning',
    'diensten.step5.detail2': 'Training en documentatie voor gebruikers',
    'diensten.step5.detail3': 'Monitoring en performance optimalisatie',
    'diensten.step5.detail4': 'Continue ondersteuning en updates',
    'diensten.step5.usecase': 'Het systeem wordt gelanceerd met training voor alle advocaten, en we monitoren de prestaties om verder te optimaliseren.',
    
    'diensten.clientcase': 'Client Case'
  },
  en: {
    // Navbar
    'nav.services': 'Tailored IT Solutions',
    'nav.marketplace': 'Marketplace',
    'nav.about': 'About Us',
    
    // Hero
    'hero.badge': 'Where the Future Begins',
    'hero.title.line1': 'AI Workforces',
    'hero.title.line2': 'that automate',
    'hero.title.line3': 'and scale your business.',
    'hero.subtitle': 'We build AI-powered software on top of the systems you already use.\nOur goal is to eliminate inefficiencies and unlock powerful leverage\nfor your company\'s growth.',
    'hero.cta.primary': 'Get Started',
    'hero.cta.secondary': 'Learn More',
    
    // About
    'about.badge': 'Services',
    'about.title': 'Don\'t let your competitors get ahead.',
    'about.description': 'From AI Agents that automatically generate reports and optimize your planning to voice technology that keeps your CRM up-to-date - efficiency is becoming increasingly important today. We make sure you don\'t miss the train.',
    'about.spotlight.title': 'FEATURED',
    'about.spotlight.product': 'VoiceLink',
    'about.spotlight.description': 'Your salespeople send a WhatsApp voice message with their client visit details - client name, quote amount, follow-up appointments - and everything is automatically placed in the right place in your CRM of choice. This plug & play tool integrates with any CRM and takes only 3 minutes to install. More time for clients, less time on administration.',
    'about.tagline': 'Your team deserves better tools. We build them.',
    'about.cta': 'Get to know us',
    'about.spotlight.cta': 'Try VoiceLink',
    'about.integrations.title': 'We integrate with:',
    'about.integrations.subtitle': 'Seamless connections with the tools you already use',
    
    // Contact
    'contact.badge': 'Contact',
    'contact.title': 'Let\'s build your future together',
    'contact.form.title': 'Send us a message',
    'contact.form.description': 'Tell us about your project and we\'ll get in touch quickly for a no-obligation conversation.',
    'contact.form.name': 'Name',
    'contact.form.email': 'Email',
    'contact.form.subject': 'Subject',
    'contact.form.message': 'Message',
    'contact.form.name.placeholder': 'John Doe',
    'contact.form.email.placeholder': 'john@company.com',
    'contact.form.subject.placeholder': 'How can we help you?',
    'contact.form.message.placeholder': 'Tell us about your project, challenges or questions...',
    'contact.form.submit': 'Send Message',
    'contact.form.submitting': 'Sending...',
    'contact.direct.title': 'Or feel free to give us a call',
    'contact.direct.description': 'Prefer direct contact? Call us for a quick chat about your project or send a WhatsApp message.',
    'contact.phone.title': 'Call us directly',
    'contact.phone.availability': 'Also available outside office hours',
    'contact.whatsapp.title': 'WhatsApp',
    'contact.whatsapp.description': 'Send a message to:',
    'contact.email.title': 'Email',
    'contact.email.response': 'We respond within one business day',
    'contact.whatsapp.or': 'or',
    
    // CTA
    'cta.title': 'Ready to save time?',
    'cta.description': 'Schedule a no-obligation conversation and discover how we can help your business.',
    'cta.button': 'Get in touch',
    
    // Footer
    'footer.tagline': 'Smart AI solutions, tailored to your SME.',
    'footer.menu': 'Menu',
    'footer.services': 'Services',
    'footer.contact': 'Contact',
    'footer.copyright': 'All rights reserved.',
    'footer.privacy': 'Privacy Policy',
    'footer.cookies': 'Cookie Policy',
    'footer.disclaimer': 'Disclaimer',
    'footer.cookie.settings': 'Cookie Settings',
    
    // Services (English content)
    'services.nav.title': 'Services',
    
    // Diensten Page
    'diensten.hero.title': 'Strategic Excellence',
    'diensten.hero.subtitle': 'Transforming digital ambitions into measurable business outcomes through methodical excellence and innovative engineering.',
    'diensten.hero.explore': 'Explore Process',
    'diensten.phase': 'Phase',
    'diensten.step1.title': 'Discovery & Analysis',
    'diensten.step1.subtitle': 'Strategic Foundation',
    'diensten.step1.description': 'Comprehensive business process analysis to identify optimization opportunities and technical requirements.',
    'diensten.step1.insights.1': 'Stakeholder alignment workshops',
    'diensten.step1.insights.2': 'Technical infrastructure assessment',
    'diensten.step1.insights.3': 'Process bottleneck identification',
    'diensten.step1.insights.4': 'ROI potential calculation',
    'diensten.step1.case.company': 'Legal Technology Firm',
    'diensten.step1.case.challenge': 'Document retrieval across 15+ systems consuming 4 hours daily per attorney',
    'diensten.step1.case.solution': 'Unified knowledge architecture with intelligent search capabilities',
    'diensten.step1.case.outcome': '85% reduction in information retrieval time',
    'diensten.step2.title': 'Solution Architecture',
    'diensten.step2.subtitle': 'Technical Blueprint',
    'diensten.step2.description': 'Designing scalable, secure systems that integrate seamlessly with your existing infrastructure.',
    'diensten.step2.insights.1': 'Microservices architecture design',
    'diensten.step2.insights.2': 'AI/ML model selection strategy',
    'diensten.step2.insights.3': 'Integration ecosystem planning',
    'diensten.step2.insights.4': 'Security framework implementation',
    'diensten.step2.case.challenge': 'Complex legal terminology requiring natural language processing capabilities',
    'diensten.step2.case.solution': 'RAG architecture with vector embeddings for semantic search',
    'diensten.step2.case.outcome': '340% improvement in search relevance accuracy',
    'diensten.step3.title': 'Development & Integration',
    'diensten.step3.subtitle': 'Precision Engineering',
    'diensten.step3.description': 'Building robust, scalable solutions with enterprise-grade security and performance optimization.',
    'diensten.step3.insights.1': 'Test-driven development methodology',
    'diensten.step3.insights.2': 'Real-time performance monitoring',
    'diensten.step3.insights.3': 'Progressive deployment strategy',
    'diensten.step3.insights.4': 'Continuous integration pipeline',
    'diensten.step3.case.challenge': 'Processing 10TB of legal documents with sub-second query response requirements',
    'diensten.step3.case.solution': 'Distributed processing with intelligent caching and edge optimization',
    'diensten.step3.case.outcome': 'Response times under 200ms with 99.9% uptime',
    'diensten.step4.title': 'Quality Assurance',
    'diensten.step4.subtitle': 'Excellence Validation',
    'diensten.step4.description': 'Rigorous testing protocols ensuring flawless performance and user experience optimization.',
    'diensten.step4.insights.1': 'Automated regression testing',
    'diensten.step4.insights.2': 'Load testing and stress scenarios',
    'diensten.step4.insights.3': 'Security penetration testing',
    'diensten.step4.insights.4': 'User acceptance validation',
    'diensten.step4.case.challenge': 'Achieving 99.5%+ accuracy for legal document analysis in production environment',
    'diensten.step4.case.solution': 'Multi-layered validation with AI model fine-tuning and human oversight',
    'diensten.step4.case.outcome': '99.8% accuracy with 40% faster user adoption',
    'diensten.step5.title': 'Launch & Optimization',
    'diensten.step5.subtitle': 'Continuous Excellence',
    'diensten.step5.description': 'Strategic deployment with ongoing performance monitoring and continuous improvement cycles.',
    'diensten.step5.insights.1': 'Phased rollout strategy',
    'diensten.step5.insights.2': 'Real-time monitoring systems',
    'diensten.step5.insights.3': 'User training programs',
    'diensten.step5.insights.4': 'Performance optimization cycles',
    'diensten.step5.case.challenge': 'Seamless adoption across 120 attorneys without productivity disruption',
    'diensten.step5.case.solution': 'Champion-led rollout with comprehensive training and support systems',
    'diensten.step5.case.outcome': '95% adoption rate within 3 weeks, 45-minute to 3-minute query reduction',
    'diensten.cta.title': 'Ready for Excellence?',
    'diensten.cta.subtitle': 'Transform your digital vision into measurable business impact. Your ambition deserves exceptional execution.',
    'diensten.cta.button': 'Begin Your Transformation',
    
    // Diensten Page Content
    'diensten.hero.badge': 'Custom process',
    'diensten.hero.title': 'From Idea to Impact',
    'diensten.hero.description': 'Discover how we work together with you from challenge to solution — concise, clear and results-oriented.',
    'diensten.hero.scroll': 'Explore the process',
    'diensten.process.title': 'Our Proven Process',
    'diensten.process.subtitle': 'A structured approach that ensures results',
    'diensten.benefits.title': 'Why our process works',
    'diensten.benefits.subtitle': 'Proven results through a structured approach, continuous collaboration and focus on measurable impact.',
    'diensten.benefits.collaboration.title': 'True collaboration',
    'diensten.benefits.collaboration.description': 'We don\'t work for you, but with you — your expertise combined with our technical knowledge for optimal results.',
    'diensten.benefits.speed.title': 'Fast results',
    'diensten.benefits.speed.description': 'Through our agile approach you see concrete progress quickly and can adjust in time for maximum impact.',
    'diensten.benefits.impact.title': 'Measurable impact',
    'diensten.benefits.impact.description': 'Every solution is built with clear KPIs and measurable improvements that demonstrate your ROI.',
    'diensten.cta.final.title': 'Ready for Excellence?',
    'diensten.cta.final.description': 'Transform your digital vision into measurable business impact. Your ambition deserves exceptional execution.',
    'diensten.cta.final.button': 'Begin Your Transformation',
    
    // Process Steps
    'diensten.step1.title': 'Problem Identification',
    'diensten.step1.subtitle': 'Discover & Analyze',
    'diensten.step1.description': 'We start with a thorough analysis of your current situation and identify the core challenges.',
    'diensten.step1.detail1': 'Extensive stakeholder interviews',
    'diensten.step1.detail2': 'Analysis of existing systems and workflows',
    'diensten.step1.detail3': 'Identification of pain points and inefficiencies',
    'diensten.step1.detail4': 'Documentation of current processes',
    'diensten.step1.usecase': 'A law firm struggles with quickly finding relevant legal information scattered across different documents and systems.',
    
    'diensten.step2.title': 'Solution Design',
    'diensten.step2.subtitle': 'Strategic Planning',
    'diensten.step2.description': 'Based on our findings, we design a custom solution that perfectly fits your needs.',
    'diensten.step2.detail1': 'Technical architecture and system design',
    'diensten.step2.detail2': 'User experience and interface planning',
    'diensten.step2.detail3': 'Integration strategy with existing systems',
    'diensten.step2.detail4': 'Project planning and milestone definition',
    'diensten.step2.usecase': 'We propose an AI-driven knowledge base that indexes all legal documents and makes them searchable via natural language.',
    
    'diensten.step3.title': 'Development',
    'diensten.step3.subtitle': 'Build & Integrate',
    'diensten.step3.description': 'Our experienced team builds your solution with the latest technologies and best practices.',
    'diensten.step3.detail1': 'Agile development with regular updates',
    'diensten.step3.detail2': 'Modern technologies and frameworks',
    'diensten.step3.detail3': 'Secure and scalable architecture',
    'diensten.step3.detail4': 'Continuous integration and deployment',
    'diensten.step3.usecase': 'We develop a RAG system that ingests documents, indexes them and provides an intuitive chat interface for legal queries.',
    
    'diensten.step4.title': 'Testing & Validation',
    'diensten.step4.subtitle': 'Quality Assurance',
    'diensten.step4.description': 'Extensive testing ensures your solution works perfectly before we go live.',
    'diensten.step4.detail1': 'Automated and manual testing',
    'diensten.step4.detail2': 'Performance and security audits',
    'diensten.step4.detail3': 'User acceptance testing',
    'diensten.step4.detail4': 'Bug fixes and optimizations',
    'diensten.step4.usecase': 'We test search accuracy, user interface and security protocols with real legal cases.',
    
    'diensten.step5.title': 'Launch & Support',
    'diensten.step5.subtitle': 'Go Live & Grow',
    'diensten.step5.description': 'We launch your solution and provide continuous support for optimal performance.',
    'diensten.step5.detail1': 'Gradual rollout and go-live support',
    'diensten.step5.detail2': 'Training and documentation for users',
    'diensten.step5.detail3': 'Monitoring and performance optimization',
    'diensten.step5.detail4': 'Continuous support and updates',
    'diensten.step5.usecase': 'The system is launched with training for all lawyers, and we monitor performance to further optimize.',
    
    'diensten.clientcase': 'Client Case'
  }
};

interface LanguageProviderProps {
  children: ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    // Check for stored language preference
    const stored = localStorage.getItem('finit-language');
    if (stored && (stored === 'nl' || stored === 'en')) {
      setLanguage(stored as Language);
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('finit-language', lang);
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['nl']] || key;
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage: handleSetLanguage,
        t,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}