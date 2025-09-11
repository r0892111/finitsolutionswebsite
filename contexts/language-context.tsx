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
    'hero.title.line1': 'Artificiële Arbeidskrachten',
    'hero.title.line2': 'die je bedrijf automatiseren',
    'hero.title.line3': 'en opschalen.',
    'hero.subtitle': 'Wij bouwen AI-gestuurde software bovenop de systemen die je al gebruikt.\nOns doel is inefficiënties te elimineren en een krachtige hefboom\nvoor de groei van je bedrijf te creëren.',
    'hero.cta.primary': 'Get Started',
    'hero.cta.secondary': 'Learn More',
    
    // About
    'about.badge': 'Diensten',
    'about.title': 'Zorg dat uw concurrent u niet voor is.',
    'about.description': 'Van AI Agents die automatisch rapporten genereren en uw planning optimaliseren tot spraaktechnologie die uw CRM up-to-date houdt - efficiëntie wordt vandaag de dag steeds belangrijker. Wij zorgen ervoor dat u de trein niet mist.',
    'about.spotlight.title': 'IN DE KIJKER',
    'about.spotlight.product': 'VoiceLink',
    'about.spotlight.description': 'Uw verkopers spreken tijdens de autorit hun klantbezoek in - klantnaam, offertebedrag, vervolgafspraken - en alles staat automatisch op de juiste plaats in het CRM. Meer tijd voor klanten, minder tijd aan administratie. Uw salesteam kan een extra klantbezoek per dag doen, terwijl u als manager het complete overzicht heeft.',
    'about.tagline': 'Uw team verdient betere tools. Wij bouwen ze.',
    'about.cta': 'Leer ons kennen',
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
    'services.nav.title': 'Diensten'
  },
  en: {
    // Navbar
    'nav.services': 'Tailored IT Solutions',
    'nav.marketplace': 'Marketplace',
    'nav.about': 'About Us',
    
    // Hero
    'hero.badge': 'Where the Future Begins',
    'hero.title.line1': 'Artificial Workforces',
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
    'about.spotlight.description': 'Your salespeople speak their client visits during the drive - client name, quote amount, follow-up appointments - and everything is automatically placed in the right place in the CRM. More time for clients, less time on administration. Your sales team can make an extra client visit per day, while you as a manager have the complete overview.',
    'about.tagline': 'Your team deserves better tools. We build them.',
    'about.cta': 'Get to know us',
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
    'services.nav.title': 'Services'
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