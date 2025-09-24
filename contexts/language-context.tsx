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
    'hero.cta.meeting': 'Plan online meeting',
    
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
    'marketplace.book.meeting': 'Plan meeting',
    'marketplace.book.online.meeting': 'Plan online meeting',
    
    // Marketplace Page
    'marketplace.hero.badge': 'AI Marketplace',
    'marketplace.hero.title': 'Plug & play AI oplossingen',
    'marketplace.hero.subtitle': 'Enterprise-grade AI tools die direct integreren met uw bestaande systemen',
    'marketplace.featured.badge': 'Live & beschikbaar',
    'marketplace.featured.title': 'Meest populaire oplossing',
    'marketplace.featured.price': 'Vanaf €29,90/maand',
    'marketplace.featured.volume': 'Volume kortingen beschikbaar',
    'marketplace.featured.features': 'Belangrijkste features:',
    'marketplace.featured.discover': 'Ontdek VoiceLink',
    'marketplace.featured.more_info': 'Meer info',
    'marketplace.coming_soon.badge': 'Binnenkort beschikbaar',
    'marketplace.coming_soon.title': 'Nieuwe oplossingen in ontwikkeling',
    'marketplace.coming_soon.subtitle': 'Innovatieve AI-tools die binnenkort uw workflow zullen transformeren',
    'marketplace.why.title': 'Waarom Finit Marketplace',
    'marketplace.why.subtitle': 'Curated AI-oplossingen met enterprise-grade beveiliging en support',
    'marketplace.why.plug_play.title': 'Plug & Play',
    'marketplace.why.plug_play.description': 'Alle oplossingen zijn plug & play - geen complexe implementatie nodig',
    'marketplace.why.security.title': 'Enterprise Security',
    'marketplace.why.security.description': 'Alle tools voldoen aan de hoogste beveiligingsstandaarden',
    'marketplace.why.support.title': 'Expert Support',
    'marketplace.why.support.description': 'Dedicated support van AI-specialisten voor elke oplossing',
    'marketplace.cta.title': 'Interesse in een specifieke oplossing?',
    'marketplace.cta.subtitle': 'Vertel ons wat u nodig heeft en we houden u op de hoogte van nieuwe releases',
    'marketplace.cta.contact': 'Neem contact op',
    'marketplace.cta.try_voicelink': 'Probeer VoiceLink',
    'marketplace.products.filepilot.name': 'FilePilot',
    'marketplace.products.filepilot.tagline': 'Intelligente documentverwerking',
    'marketplace.products.filepilot.description': 'Automatische verwerking en analyse van documenten met AI-gedreven data-extractie',
    'marketplace.products.filepilot.category': 'Document Management',
    'marketplace.products.meetingmind.name': 'MeetingMind',
    'marketplace.products.meetingmind.tagline': 'AI vergaderassistent',
    'marketplace.products.meetingmind.description': 'Automatische notities, actiepunten en follow-ups voor al uw vergaderingen',
    'marketplace.products.meetingmind.category': 'Productiviteit',
    'marketplace.voicelink.name': 'VoiceLink',
    'marketplace.voicelink.tagline': 'Voice-to-CRM automatisering',
    'marketplace.voicelink.description': 'WhatsApp spraakberichten worden automatisch omgezet naar CRM-data. Klantnaam, offertebedrag, vervolgafspraken - alles op de juiste plaats.',
    'marketplace.voicelink.category': 'Sales & CRM',
    'marketplace.voicelink.features.whatsapp': 'WhatsApp integratie',
    'marketplace.voicelink.features.sync': 'Automatische CRM-sync',
    'marketplace.voicelink.features.install': '3 min installatie',
    'marketplace.voicelink.features.support': 'Alle CRM\'s ondersteund'
,

    // Diensten Page
    'diensten.hero.title': 'Maatwerk IT Oplossingen',
    'diensten.hero.highlight': 'Gebouwd voor Impact',
    'diensten.hero.description': 'Snel, direct en gebouwd voor de volgende generatie automatisering. Wij specialiseren ons in AI-automatisering en moderne CRM-systemen die transformeren hoe uw bedrijf opereert.',
    'diensten.why.title': 'Waarom Kiezen voor Finit Solutions',
    'diensten.why.subtitle': 'Ontdek wat ons anders maakt en hoe wij uitzonderlijke resultaten leveren voor onze klanten.',
    'diensten.benefits.title': 'De Voordelen voor Onze Klanten',
    'diensten.benefits.subtitle': 'Directe verbeteringen die zich in de tijd opstapelen tot duurzame concurrentievoordelen.',
    'diensten.cta.title': 'Klaar om Uw Bedrijf te Transformeren?',
    'diensten.cta.description': 'Wij zijn geen traditioneel IT-bedrijf. Wij zijn modern, snel en gespecialiseerd in AI-automatisering en CRM. Met Finit Solutions heeft u een partner die volledig toegewijd is aan uw succes—vandaag en in de toekomst.',
    'diensten.cta.button': 'Start Uw Transformatie',
    
    // Expandable Sections
    'diensten.sections.who_we_are.title': 'Wie Wij Zijn',
    'diensten.sections.who_we_are.preview': 'Jong, ambitieus en gedreven bedrijf gericht op automatiseringstechnologieën van de volgende generatie.',
    'diensten.sections.who_we_are.content': 'Finit Solutions is een jong, ambitieus en gedreven bedrijf gericht op de volgende generatie automatiseringstechnologieën. In tegenstelling tot traditionele IT-providers die belemmerd worden door bureaucratie, zijn wij snel, direct en gebouwd voor impact. Onze expertise ligt in AI-automatisering en moderne CRM-systemen, ontworpen voor een nieuwe manier van werken: cloud-ready, workflow-gericht en modulair.',
    
    'diensten.sections.how_we_work.title': 'Hoe Wij Werken',
    'diensten.sections.how_we_work.preview': 'Wij lossen problemen stap voor stap op, bouwen in modules in plaats van massieve "alles of niets" projecten.',
    'diensten.sections.how_we_work.content': 'Wij geloven in het stap voor stap oplossen van problemen. In plaats van één massief "alles of niets" project aan te pakken, bouwen wij in modules—kleine, geteste componenten die samen verbinden tot een web van efficiëntie. Deze aanpak geeft onze klanten vroege snelle overwinningen, lager risico door bewezen stappen, en flexibiliteit om zich aan te passen aan nieuwe behoeften wanneer deze verschijnen. Elke fase levert meetbare waarde, zodat klanten direct impact zien.',
    
    'diensten.sections.innovation.title': 'Innovatie & Bewijs van Expertise',
    'diensten.sections.innovation.preview': 'Innovatie door slimme combinaties van bewezen technologieën, geïllustreerd door VoiceLink.me.',
    'diensten.sections.innovation.content': 'Bij Finit laten we u niet van tools wisselen. Wij zorgen ervoor dat uw bestaande stack harder werkt. VoiceLink laat vertegenwoordigers snelle updates spreken in WhatsApp, en die notities synchroniseren automatisch naar uw CRM: Teamleader, Pipedrive, Salesforce, Odoo, HubSpot, en meer. Geen nieuwe inboxen. Geen extra apps. Geen gewoontewijzigingen. Wij verwijderen knelpunten door bewezen systemen te verbinden en verspreide gesprekken om te zetten in schone, bruikbare data. Dezelfde aanpak stuurt elk project: vind de wrijving, automatiseer binnen uw stack, en lever resultaten die blijven. Als een systeem een API heeft, kunnen wij het integreren.',
    
    'diensten.sections.what_sets_apart.title': 'Wat Ons Onderscheidt',
    'diensten.sections.what_sets_apart.preview': 'Diepe CRM-kennis, AI-automatisering expertise, en cloud-ready oplossingen zonder bureaucratie.',
    'diensten.sections.what_sets_apart.content': 'Diepe CRM-kennis – Wij weten hoe we het volledige potentieel van CRM-systemen kunnen ontgrendelen. AI-automatisering pioniers – Wij passen AI toe in echte processen, en zetten geavanceerde technologie om in dagelijkse efficiëntie. Cloud-ready & workflow-gericht – Onze systemen zijn ontworpen voor de omgeving van vandaag en de groei van morgen. Efficiëntie ontgrendelingen – Wij detecteren knelpunten die anderen missen en ontwerpen langetermijnoplossingen. Snelle levering – Zonder de bureaucratie van grote bedrijven, leveren wij sneller en directer.',
    
    'diensten.sections.philosophy.title': 'Onze Filosofie',
    'diensten.sections.philosophy.preview': 'Wij maken werk soepeler zonder te veranderen hoe teams opereren, automatiseren achtergrondtaken.',
    'diensten.sections.philosophy.content': 'Wij vinden niet opnieuw uit hoe teams werken—wij maken hun werk soepeler. De tools die mensen al kennen blijven hetzelfde, maar wij automatiseren repetitieve, lage-waarde taken op de achtergrond. Dit betekent minder energie verspild aan administratie, en meer tijd voor betekenisvolle interacties.',
    
    'diensten.sections.commitment.title': 'Toewijding aan Klanten',
    'diensten.sections.commitment.preview': 'Toegewijde partners met directe communicatie en langetermijnrelatie focus.',
    'diensten.sections.commitment.content': 'Wij zijn toegewijde partners, beschikbaar wanneer nodig. Wij communiceren direct, nemen snelle beslissingen, en streven naar langetermijnrelaties die continu nieuwe efficiënties ontgrendelen naarmate behoeften evolueren.',
    
    // Benefits
    'diensten.benefits.quick_wins.title': 'Snelle Overwinningen Vroeg',
    'diensten.benefits.quick_wins.description': 'Zie directe verbeteringen met onze modulaire aanpak die waarde levert vanaf dag één.',
    'diensten.benefits.lower_risk.title': 'Lager Risico',
    'diensten.benefits.lower_risk.description': 'Bewezen stappen en geteste componenten verminderen implementatierisico aanzienlijk.',
    'diensten.benefits.flexible_adaptation.title': 'Flexibele Aanpassing',
    'diensten.benefits.flexible_adaptation.description': 'Pas gemakkelijk aan nieuwe behoeften aan wanneer deze verschijnen met onze modulaire architectuur.',
    'diensten.benefits.measurable_value.title': 'Meetbare Waarde',
    'diensten.benefits.measurable_value.description': 'Elke fase levert concrete, meetbare verbeteringen aan uw operaties.',
    'diensten.benefits.fast_delivery.title': 'Snelle Levering',
    'diensten.benefits.fast_delivery.description': 'Zonder bureaucratie leveren wij oplossingen sneller en directer.',
    'diensten.benefits.ai_automation.title': 'AI Automatisering',
    'diensten.benefits.ai_automation.description': 'Zet geavanceerde technologie om in dagelijkse efficiëntie met praktische AI-implementaties.',
    
    // Trust Indicators
    'diensten.trust.gdpr': 'GDPR Conform',
    'diensten.trust.uptime': '99,9% Uptime',
    'diensten.trust.support': '24/7 Ondersteuning',
    
    // Project Request Button
    'project.start': 'Start je project',
    
    // Knowledge Copilot Use Case
    'knowledge_copilot.badge': 'Use Case',
    'knowledge_copilot.title': 'Kennis & E-mail Co-Pilot',
    'knowledge_copilot.description': 'Eén plek waar uw team antwoorden kan vinden en geweldige e-mails kan opstellen met de tools en data die u al heeft—SharePoint documenten, e-mailgeschiedenis, CRM en interne systemen.',
    'knowledge_copilot.how_it_works': 'Hoe het werkt',
    'knowledge_copilot.what_you_get': 'Wat u krijgt',
    'knowledge_copilot.simple_web_apps': 'Eenvoudige web apps & interfaces',
    'knowledge_copilot.simple_web_apps_description': 'We bouwen snel lichtgewicht web apps en UI\'s zodat uw gebruikers op een eenvoudige, gerichte manier kunnen interageren met de assistent en uw data—denk aan dashboards, inboxen, checklists, formulieren, klantportalen.',
    'knowledge_copilot.simple_web_apps_note': 'Dankzij AI-ondersteunde ontwikkeling worden deze interfaces sneller en tegen lagere kosten geleverd dan traditionele builds, zonder kwaliteit of veiligheid op te offeren.',
    'knowledge_copilot.where_expand': 'Waar dit kan uitbreiden',
    'knowledge_copilot.expand_description': 'Dit is slechts één voorbeeld. We kunnen deze oplossing aanpassen om te werken met uw specifieke tools en processen.',
    'knowledge_copilot.connect_more_tools': 'Verbind Meer Tools',
    'knowledge_copilot.connect_more_tools_description': 'Koppel met uw boekhoudsoftware, projectmanagementtools, of elk systeem met een API.',
    'knowledge_copilot.add_more_channels': 'Voeg Meer Kanalen Toe',
    'knowledge_copilot.add_more_channels_description': 'Schakel website chat, WhatsApp integratie, of spraakberichten in die automatisch uw systemen bijwerken.',
    'knowledge_copilot.automate_more_tasks': 'Automatiseer Meer Taken',
    'knowledge_copilot.automate_more_tasks_description': 'Stel automatische case sortering, taakcreatie, onboarding processen en klantenservice workflows in.',
    'knowledge_copilot.marketplace_cta_title': 'Op zoek naar een plug-and-play, online aankoopbare oplossing?',
    'knowledge_copilot.marketplace_cta_description': 'Bekijk onze marketplace voor kant-en-klare AI tools die direct integreren met uw bestaande systemen.',
    'knowledge_copilot.visit_marketplace': 'Bezoek Marketplace',
    'knowledge_copilot.features.connects_tools': 'Verbindt met uw tools',
    'knowledge_copilot.features.connects_tools_description': 'Als een systeem een API heeft, kunnen we het aansluiten.',
    'knowledge_copilot.features.understands_content': 'Begrijpt uw content',
    'knowledge_copilot.features.understands_content_description': 'AI leest uw documenten en eerdere e-mails zodat u vragen kunt stellen in normale taal en precieze, brongestuurde antwoorden krijgt.',
    'knowledge_copilot.features.writes_context': 'Schrijft met context',
    'knowledge_copilot.features.writes_context_description': 'Binnen een schone inbox stelt de assistent antwoordconcepten voor die u kunt bewerken en verzenden.',
    'knowledge_copilot.features.sends_data': 'Stuurt data naar de juiste plaats',
    'knowledge_copilot.features.sends_data_description': 'De AI reinigt, labelt en routeert informatie naar uw CRM of andere systemen—automatisch.',
    'knowledge_copilot.features.stay_control': 'U blijft in controle',
    'knowledge_copilot.features.stay_control_description': 'Duidelijke rolgebaseerde machtigingen, human-in-the-loop voor gevoelige gevallen, plus logging en audit trails.',
    'knowledge_copilot.benefits.faster_replies': 'Snellere antwoorden, minder tabbladen, consistente kwaliteit',
    'knowledge_copilot.benefits.less_searching': 'Minder zoeken; kennis hergebruikt binnen het team',
    'knowledge_copilot.benefits.security_design': 'Veiligheid by design (alleen de juiste mensen zien de juiste data)',
    'knowledge_copilot.benefits.practical_frontends': 'Praktische, betaalbare front-ends die uw team daadwerkelijk gebruikt'
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
    'hero.cta.meeting': 'Book online meeting',
    
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
    'marketplace.book.meeting': 'Book meeting',
    'marketplace.book.online.meeting': 'Book online meeting',
    
    // Marketplace Page
    'marketplace.hero.badge': 'AI Marketplace',
    'marketplace.hero.title': 'Plug & play AI solutions',
    'marketplace.hero.subtitle': 'Enterprise-grade AI tools that integrate directly with your existing systems',
    'marketplace.featured.badge': 'Live & Available',
    'marketplace.featured.title': 'Most popular solution',
    'marketplace.featured.price': 'From €29.90/month',
    'marketplace.featured.volume': 'Volume discounts available',
    'marketplace.featured.features': 'Key features:',
    'marketplace.featured.discover': 'Discover VoiceLink',
    'marketplace.featured.more_info': 'More info',
    'marketplace.coming_soon.badge': 'Coming Soon',
    'marketplace.coming_soon.title': 'New solutions in development',
    'marketplace.coming_soon.subtitle': 'Innovative AI tools that will transform your workflow soon',
    'marketplace.why.title': 'Why Finit Marketplace',
    'marketplace.why.subtitle': 'Curated AI solutions with enterprise-grade security and support',
    'marketplace.why.plug_play.title': 'Plug & Play',
    'marketplace.why.plug_play.description': 'All solutions are plug & play - no complex implementation needed',
    'marketplace.why.security.title': 'Enterprise Security',
    'marketplace.why.security.description': 'All tools meet the highest security standards',
    'marketplace.why.support.title': 'Expert Support',
    'marketplace.why.support.description': 'Dedicated support from AI specialists for every solution',
    'marketplace.cta.title': 'Interested in a specific solution?',
    'marketplace.cta.subtitle': 'Tell us what you need and we\'ll keep you updated on new releases',
    'marketplace.cta.contact': 'Get in touch',
    'marketplace.cta.try_voicelink': 'Try VoiceLink',
    'marketplace.products.filepilot.name': 'FilePilot',
    'marketplace.products.filepilot.tagline': 'Intelligent document processing',
    'marketplace.products.filepilot.description': 'Automatic processing and analysis of documents with AI-driven data extraction',
    'marketplace.products.filepilot.category': 'Document Management',
    'marketplace.products.meetingmind.name': 'MeetingMind',
    'marketplace.products.meetingmind.tagline': 'AI meeting assistant',
    'marketplace.products.meetingmind.description': 'Automatic notes, action items and follow-ups for all your meetings',
    'marketplace.products.meetingmind.category': 'Productivity',
    'marketplace.voicelink.name': 'VoiceLink',
    'marketplace.voicelink.tagline': 'Voice-to-CRM automation',
    'marketplace.voicelink.description': 'WhatsApp voice messages are automatically converted to CRM data. Client name, quote amount, follow-up appointments - everything in the right place.',
    'marketplace.voicelink.category': 'Sales & CRM',
    'marketplace.voicelink.features.whatsapp': 'WhatsApp integration',
    'marketplace.voicelink.features.sync': 'Automatic CRM sync',
    'marketplace.voicelink.features.install': '3 min installation',
    'marketplace.voicelink.features.support': 'All CRMs supported',
    
    // Diensten Page
    'diensten.hero.title': 'Tailored IT Solutions',
    'diensten.hero.highlight': 'Built for Impact',
    'diensten.hero.description': 'Fast, direct, and built for the next generation of automation. We specialize in AI automation and modern CRM systems that transform how your business operates.',
    'diensten.why.title': 'Why Choose Finit Solutions',
    'diensten.why.subtitle': 'Discover what makes us different and how we deliver exceptional results for our clients.',
    'diensten.benefits.title': 'The Benefits for Our Clients',
    'diensten.benefits.subtitle': 'Immediate improvements that compound over time into sustainable competitive advantages.',
    'diensten.cta.title': 'Ready to Transform Your Business?',
    'diensten.cta.description': 'We are not a traditional IT firm. We are modern, fast, and specialized in AI automation and CRM. With Finit Solutions, you have a partner fully committed to your success—today and in the future.',
    'diensten.cta.button': 'Start Your Transformation',
    
    // Expandable Sections
    'diensten.sections.who_we_are.title': 'Who We Are',
    'diensten.sections.who_we_are.preview': 'Young, ambitious, and driven company focused on next-generation automation technologies.',
    'diensten.sections.who_we_are.content': 'Finit Solutions is a young, ambitious, and driven company focused on the next generation of automation technologies. Unlike traditional IT providers weighed down by bureaucracy, we are fast, direct, and built for impact. Our expertise lies in AI automation and modern CRM systems, designed for a new way of working: cloud-ready, workflow-focused, and modular.',
    
    'diensten.sections.how_we_work.title': 'How We Work',
    'diensten.sections.how_we_work.preview': 'We solve problems step by step, building in modules rather than massive "all or nothing" projects.',
    'diensten.sections.how_we_work.content': 'We believe in solving problems step by step. Instead of tackling one massive "all or nothing" project, we build in modules—small, tested components that connect together into a web of efficiency. This approach gives our clients quick wins early on, lower risk through proven steps, and flexibility to adapt to new needs as they appear. Each phase delivers measurable value, so clients see impact right away.',
    
    'diensten.sections.innovation.title': 'Innovation & Proof of Expertise',
    'diensten.sections.innovation.preview': 'Innovation through smart combinations of proven technologies, exemplified by VoiceLink.me.',
    'diensten.sections.innovation.content': 'At Finit, we don\'t make you switch tools. We make your existing stack work harder. VoiceLink lets reps speak quick updates in WhatsApp, and those notes sync automatically to your CRM: Teamleader, Pipedrive, Salesforce, Odoo, HubSpot, and more. No new inboxes. No extra apps. No habit changes. We remove bottlenecks by connecting proven systems and turning scattered conversations into clean, actionable data. The same approach guides every project: find the friction, automate within your stack, and deliver results that last. If a system has an API, we can integrate it.',
    
    'diensten.sections.what_sets_apart.title': 'What Sets Us Apart',
    'diensten.sections.what_sets_apart.preview': 'Deep CRM knowledge, AI automation expertise, and cloud-ready solutions without bureaucracy.',
    'diensten.sections.what_sets_apart.content': 'Deep CRM knowledge – We know how to unlock the full potential of CRM systems. AI automation pioneers – We apply AI in real processes, turning advanced tech into daily efficiency. Cloud-ready & workflow-focused – Our systems are designed for today\'s environment and tomorrow\'s growth. Efficiency unlocks – We detect bottlenecks others miss and design long-term solutions. Fast delivery – Without the bureaucracy of big firms, we deliver quicker and more directly.',
    
    'diensten.sections.philosophy.title': 'Our Philosophy',
    'diensten.sections.philosophy.preview': 'We make work smoother without changing how teams operate, automating background tasks.',
    'diensten.sections.philosophy.content': 'We don\'t reinvent how teams work—we make their work smoother. The tools people already know stay the same, but we automate repetitive, low-value tasks in the background. This means less energy wasted on admin, and more time for meaningful interactions.',
    
    'diensten.sections.commitment.title': 'Commitment to Clients',
    'diensten.sections.commitment.preview': 'Dedicated partners with direct communication and long-term relationship focus.',
    'diensten.sections.commitment.content': 'We are dedicated partners, available whenever needed. We communicate directly, make fast decisions, and aim for long-term relationships that continuously unlock new efficiencies as needs evolve.',
    
    // Benefits
    'diensten.benefits.quick_wins.title': 'Quick Wins Early On',
    'diensten.benefits.quick_wins.description': 'See immediate improvements with our modular approach that delivers value from day one.',
    'diensten.benefits.lower_risk.title': 'Lower Risk',
    'diensten.benefits.lower_risk.description': 'Proven steps and tested components reduce implementation risk significantly.',
    'diensten.benefits.flexible_adaptation.title': 'Flexible Adaptation',
    'diensten.benefits.flexible_adaptation.description': 'Easily adapt to new needs as they appear with our modular architecture.',
    'diensten.benefits.measurable_value.title': 'Measurable Value',
    'diensten.benefits.measurable_value.description': 'Each phase delivers concrete, measurable improvements to your operations.',
    'diensten.benefits.fast_delivery.title': 'Fast Delivery',
    'diensten.benefits.fast_delivery.description': 'Without bureaucracy, we deliver solutions quicker and more directly.',
    'diensten.benefits.ai_automation.title': 'AI Automation',
    'diensten.benefits.ai_automation.description': 'Turn advanced technology into daily efficiency with practical AI implementations.',
    
    // Trust Indicators
    'diensten.trust.gdpr': 'GDPR Compliant',
    'diensten.trust.uptime': '99.9% Uptime',
    'diensten.trust.support': '24/7 Support',
    
    // Project Request Button
    'project.start': 'Start Your Project',
    
    // Knowledge Copilot Use Case
    'knowledge_copilot.badge': 'Use Case',
    'knowledge_copilot.title': 'Knowledge & Email Co-Pilot',
    'knowledge_copilot.description': 'One place where your team can find answers and draft great emails using the tools and data you already have—SharePoint documents, email history, CRM, and internal systems.',
    'knowledge_copilot.how_it_works': 'How it works',
    'knowledge_copilot.what_you_get': 'What you get',
    'knowledge_copilot.simple_web_apps': 'Simple web apps & interfaces',
    'knowledge_copilot.simple_web_apps_description': 'We quickly build lightweight web apps and UIs so your users can interact with the assistant and your data in a simple, focused way—think dashboards, inboxes, checklists, forms, customer portals.',
    'knowledge_copilot.simple_web_apps_note': 'Thanks to AI-assisted development, these interfaces are delivered faster and at a lower cost than traditional builds, without sacrificing quality or security.',
    'knowledge_copilot.where_expand': 'Where this can expand',
    'knowledge_copilot.expand_description': 'This is just one example. We can adapt this solution to work with your specific tools and processes.',
    'knowledge_copilot.connect_more_tools': 'Connect More Tools',
    'knowledge_copilot.connect_more_tools_description': 'Link with your accounting software, project management tools, or any system with an API.',
    'knowledge_copilot.add_more_channels': 'Add More Channels',
    'knowledge_copilot.add_more_channels_description': 'Enable website chat, WhatsApp integration, or voice messages that automatically update your systems.',
    'knowledge_copilot.automate_more_tasks': 'Automate More Tasks',
    'knowledge_copilot.automate_more_tasks_description': 'Set up automatic case sorting, task creation, onboarding processes, and customer support workflows.',
    'knowledge_copilot.marketplace_cta_title': 'Looking for a plug-and-play, online-purchasable solution instead?',
    'knowledge_copilot.marketplace_cta_description': 'Check out our marketplace for ready-to-use AI tools that integrate instantly with your existing systems.',
    'knowledge_copilot.visit_marketplace': 'Visit Marketplace',
    'knowledge_copilot.features.connects_tools': 'Connects to your tools',
    'knowledge_copilot.features.connects_tools_description': 'If a system has an API, we can plug it in.',
    'knowledge_copilot.features.understands_content': 'Understands your content',
    'knowledge_copilot.features.understands_content_description': 'AI reads your docs and past emails so you can ask questions in normal language and get precise, source-backed answers.',
    'knowledge_copilot.features.writes_context': 'Writes with context',
    'knowledge_copilot.features.writes_context_description': 'Inside a clean inbox, the assistant suggests reply drafts you can edit and send.',
    'knowledge_copilot.features.sends_data': 'Sends data to the right place',
    'knowledge_copilot.features.sends_data_description': 'The AI cleans, labels, and routes information to your CRM or other systems—automatically.',
    'knowledge_copilot.features.stay_control': 'You stay in control',
    'knowledge_copilot.features.stay_control_description': 'Clear role-based permissions, human-in-the-loop for sensitive cases, plus logging and audit trails.',
    'knowledge_copilot.benefits.faster_replies': 'Faster replies, fewer tabs, consistent quality',
    'knowledge_copilot.benefits.less_searching': 'Less searching; knowledge reused across the team',
    'knowledge_copilot.benefits.security_design': 'Security by design (only the right people see the right data)',
    'knowledge_copilot.benefits.practical_frontends': 'Practical, affordable front-ends your team actually uses'
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