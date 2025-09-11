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
    'contact.form.name.placeholder': 'John Doe',
    'contact.form.email.placeholder': 'john@company.com',
    'contact.form.subject.placeholder': 'How can we help you?',
    'contact.form.message.placeholder': 'Tell us about your project, challenges or questions...',
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
    'diensten.hero.title': 'Strategische Excellentie',
    'diensten.hero.subtitle': 'Digitale ambities omzetten in meetbare bedrijfsresultaten door methodische excellentie en innovatieve engineering.',
    'diensten.hero.explore': 'Ontdek Proces',
    'diensten.phase': 'Fase',
    'diensten.step1.title': 'Discovery & Analysis',
    'diensten.step1.subtitle': 'Strategische Basis',
    'diensten.step1.description': 'Uitgebreide analyse van bedrijfsprocessen om optimalisatiekansen en technische vereisten te identificeren.',
    'diensten.step1.insights.1': 'Stakeholder alignment workshops',
    'diensten.step1.insights.2': 'Technische infrastructuur beoordeling',
    'diensten.step1.insights.3': 'Proces knelpunten identificatie',
    'diensten.step1.insights.4': 'ROI potentieel berekening',
    'diensten.step1.case.company': 'Juridisch Technologie Bedrijf',
    'diensten.step1.case.challenge': 'Document opvraging over 15+ systemen kostte 4 uur per dag per advocaat',
    'diensten.step1.case.solution': 'Geünificeerde kennisarchitectuur met intelligente zoekmogelijkheden',
    'diensten.step1.case.outcome': '85% reductie in informatie opvraging tijd',
    'diensten.step2.title': 'Solution Architecture',
    'diensten.step2.subtitle': 'Technische Blauwdruk',
    'diensten.step2.description': 'Ontwerpen van schaalbare, veilige systemen die naadloos integreren met uw bestaande infrastructuur.',
    'diensten.step2.insights.1': 'Microservices architectuur ontwerp',
    'diensten.step2.insights.2': 'AI/ML model selectie strategie',
    'diensten.step2.insights.3': 'Integratie ecosysteem planning',
    'diensten.step2.insights.4': 'Security framework implementatie',
    'diensten.step2.case.challenge': 'Complexe juridische terminologie vereiste natuurlijke taalverwerking mogelijkheden',
    'diensten.step2.case.solution': 'RAG architectuur met vector embeddings voor semantisch zoeken',
    'diensten.step2.case.outcome': '340% verbetering in zoek relevantie nauwkeurigheid',
    'diensten.step3.title': 'Development & Integration',
    'diensten.step3.subtitle': 'Precisie Engineering',
    'diensten.step3.description': 'Bouwen van robuuste, schaalbare oplossingen met enterprise-grade beveiliging en prestatie optimalisatie.',
    'diensten.step3.insights.1': 'Test-driven development methodologie',
    'diensten.step3.insights.2': 'Real-time prestatie monitoring',
    'diensten.step3.insights.3': 'Progressieve deployment strategie',
    'diensten.step3.insights.4': 'Continue integratie pipeline',
    'diensten.step3.case.challenge': 'Verwerking van 10TB juridische documenten met sub-seconde query response vereisten',
    'diensten.step3.case.solution': 'Gedistribueerde verwerking met intelligente caching en edge optimalisatie',
    'diensten.step3.case.outcome': 'Response tijden onder 200ms met 99.9% uptime',
    'diensten.step4.title': 'Quality Assurance',
    'diensten.step4.subtitle': 'Excellentie Validatie',
    'diensten.step4.description': 'Rigoureuze test protocollen die foutloze prestaties en gebruikerservaring optimalisatie garanderen.',
    'diensten.step4.insights.1': 'Geautomatiseerde regressie testing',
    'diensten.step4.insights.2': 'Load testing en stress scenario\'s',
    'diensten.step4.insights.3': 'Security penetratie testing',
    'diensten.step4.insights.4': 'Gebruiker acceptatie validatie',
    'diensten.step4.case.challenge': 'Bereiken van 99.5%+ nauwkeurigheid voor juridische document analyse in productie omgeving',
    'diensten.step4.case.solution': 'Multi-laagse validatie met AI model fine-tuning en menselijk toezicht',
    'diensten.step4.case.outcome': '99.8% nauwkeurigheid met 40% snellere gebruiker adoptie',
    'diensten.step5.title': 'Launch & Optimization',
    'diensten.step5.subtitle': 'Continue Excellentie',
    'diensten.step5.description': 'Strategische deployment met doorlopende prestatie monitoring en continue verbeteringscycli.',
    'diensten.step5.insights.1': 'Gefaseerde uitrol strategie',
    'diensten.step5.insights.2': 'Real-time monitoring systemen',
    'diensten.step5.insights.3': 'Gebruiker training programma\'s',
    'diensten.step5.insights.4': 'Prestatie optimalisatie cycli',
    'diensten.step5.case.challenge': 'Naadloze adoptie over 120 advocaten zonder productiviteit verstoring',
    'diensten.step5.case.solution': 'Champion-geleide uitrol met uitgebreide training en ondersteuning systemen',
    'diensten.step5.case.outcome': '95% adoptie rate binnen 3 weken, 45-minuut naar 3-minuut query reductie',
    'diensten.cta.title': 'Klaar voor Excellentie?',
    'diensten.cta.subtitle': 'Transformeer uw digitale visie in meetbare bedrijfsimpact. Uw ambitie verdient uitzonderlijke uitvoering.',
    'diensten.cta.button': 'Begin Uw Transformatie'
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
    'contact.form.title': 'Send us a message',
    'contact.form.description': 'Tell us about your project and we\'ll get in touch quickly for a no-obligation conversation.',
    'contact.form.name': 'Name',
    'contact.form.email': 'Email',
    'contact.form.subject': 'Subject',
    'contact.form.message': 'Message',
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
    'diensten.cta.button': 'Begin Your Transformation'
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