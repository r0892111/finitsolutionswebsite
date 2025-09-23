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
    
    // About Page
    'about.page.badge': 'Over Ons',
    'about.page.title.line1': 'Jonge ondernemers',
    'about.page.title.highlight': 'met een missie',
    'about.page.title.line2': '',
    'about.page.subtitle': 'We zijn meer dan een bedrijf – we zijn een team van gepassioneerde techneuten die geloven in de kracht van innovatie.',
    'about.story.title': 'Ons Verhaal',
    'about.story.paragraph1': 'Wat begon als een droom van twee beste vrienden, is vandaag uitgegroeid tot een gedreven team. Gedurende onze studies hebben we onszelf bijgespijkerd in de avonden, weekenden en elke vrije minuut daartussen. Nu zetten we die kennis om in échte resultaten.',
    'about.story.paragraph2': 'We zijn techneuten, probleemoplossers en ondernemers in hart en nieren. Wat ons bindt? Een gedeelde passie voor digitale innovatie en de ambitie om bedrijven te helpen efficiënter, slimmer en sneller te werken.',
    'about.story.paragraph3': 'Kwaliteit staat bij ons voorop. Geen loze beloftes of wazige praat – maar transparantie, heldere communicatie en volledige verantwoordelijkheid voor alles wat we opleveren. Of het nu gaat om een bestaand systeem dat gepersonaliseerd moet worden, of een volledig maatwerkoplossing vanaf nul: we denken mee, bouwen, testen en leveren pas op als het écht goed zit.',
    'about.story.paragraph4': 'De digitale wereld verandert razendsnel. Wij groeien mee – en helpen jou om dat ook te doen.',
    'about.story.cta': 'Groei je met ons mee?',
    'about.story.button': 'Neem contact op',
    'about.team.title': 'Ons Team',
    'about.team.subtitle': 'Maak kennis met de experts die Finit Solutions maken tot wat het is',
    'about.team.more': 'meer',
    'about.team.more_info': 'Meer info',
    'about.team.roles.co-founder': 'Medeoprichter',
    'about.team.roles.chief_technology_officer': 'Chief Technology Officer',
    'about.team.descriptions.alex_otten': 'Alex behaalde zijn bachelor industrieel ingenieur aan de KU Leuven. Gedreven door de snelle evolutie van AI-technologie besloot hij zijn masterstudie halverwege stop te zetten om zich volledig te engageren en actief mee te bouwen aan deze innovatieve sector.',
    'about.team.descriptions.karel_van_ransbeeck': 'Met zijn natuurlijke talent voor klantencommunicatie en sterke sociale vaardigheden, vormt hij de brug tussen technologie en menselijke behoeften. Als medeoprichter legt hij de focus op het begrijpen van klantenwensen.',
    'about.team.descriptions.jord_goossens': 'Als Chief Technology Officer brengt Jord een schat aan ervaring mee in enterprise-level softwarearchitectuur en AI-implementaties. Met zijn diepgaande kennis zorgt hij ervoor dat onze oplossingen schaalbaar en veilig zijn.',
    'about.cta.title': 'Klaar om samen te werken?',
    'about.cta.description': 'Laten we kennismaken en ontdekken hoe we uw bedrijf kunnen helpen groeien',
    'about.cta.primary': 'Start een project',
    'about.cta.secondary': 'Plan een online meeting',
    'about.modal.about': 'Over',
    'about.modal.expertise': 'Expertise',
    'about.modal.achievements': 'Prestaties',
    'about.modal.linkedin': 'Bekijk LinkedIn profiel',
    'marketplace.book.meeting': 'Plan meeting'
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
    
    // About Page
    'about.page.badge': 'About Us',
    'about.page.title.line1': 'Young entrepreneurs',
    'about.page.title.highlight': 'with a mission',
    'about.page.title.line2': '',
    'about.page.subtitle': 'We are more than a company – we are a team of passionate technologists who believe in the power of innovation.',
    'about.story.title': 'Our Story',
    'about.story.paragraph1': 'What started as a dream of two best friends has grown into a driven team today. During our studies, we taught ourselves in the evenings, weekends and every free minute in between. Now we turn that knowledge into real results.',
    'about.story.paragraph2': 'We are technologists, problem solvers and entrepreneurs at heart. What binds us? A shared passion for digital innovation and the ambition to help businesses work more efficiently, smarter and faster.',
    'about.story.paragraph3': 'Quality comes first with us. No empty promises or vague talk – but transparency, clear communication and full responsibility for everything we deliver. Whether it\'s an existing system that needs to be personalized, or a completely custom solution from scratch: we think along, build, test and only deliver when it\'s really good.',
    'about.story.paragraph4': 'The digital world is changing rapidly. We grow with it – and help you do the same.',
    'about.story.cta': 'Will you grow with us?',
    'about.story.button': 'Get in touch',
    'about.team.title': 'Our Team',
    'about.team.subtitle': 'Meet the experts who make Finit Solutions what it is',
    'about.team.more': 'more',
    'about.team.more_info': 'More info',
    'about.team.roles.co-founder': 'Co-founder',
    'about.team.roles.chief_technology_officer': 'Chief Technology Officer',
    'about.team.descriptions.alex_otten': 'Alex obtained his bachelor\'s degree in industrial engineering at KU Leuven. Driven by the rapid evolution of AI technology, he decided to stop his master\'s studies halfway to fully engage and actively help build this innovative sector.',
    'about.team.descriptions.karel_van_ransbeeck': 'With his natural talent for client communication and strong social skills, he forms the bridge between technology and human needs. As co-founder, he focuses on understanding customer needs.',
    'about.team.descriptions.jord_goossens': 'As Chief Technology Officer, Jord brings a wealth of experience in enterprise-level software architecture and AI implementations. With his deep knowledge, he ensures our solutions are scalable and secure.',
    'about.cta.title': 'Ready to work together?',
    'about.cta.description': 'Let\'s get to know each other and discover how we can help your business grow',
    'about.cta.primary': 'Start a project',
    'about.cta.secondary': 'Book an online meeting',
    'about.modal.about': 'About',
    'about.modal.expertise': 'Expertise',
    'about.modal.achievements': 'Achievements',
    'about.modal.linkedin': 'View LinkedIn profile',
    'marketplace.book.meeting': 'Book meeting'
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