/**
 * De Engelse hub (finitsolutions.be/hub/en/), Alex 25/11: dezelfde pagina als /hub/, met
 * een taalknop bovenaan. Standaard blijft Nederlands.
 *
 * Bronnen: Amina's Engelse teksten (Google Doc "Upwork scripts", tab "for VSL page", en de
 * Engelse homepage op tak homepage-amina: FAQ en "voor wie"), met Alex' Nederlandse
 * aanpassingen van 25/11 mee vertaald. Wat Amina niet in het Engels schreef (formulier,
 * speler, resources), is vertaald uit ./copy.ts.
 *
 * Bewust in het Nederlands gelaten: de labels en de kop boven de antwoorden die naar de
 * mail, monday en Tuesday gaan (die leest Luka), en de keuzes die de bezoeker aanklikt
 * gaan ook in het Nederlands mee (stap-formulier.tsx zoekt ze op in ./copy.ts).
 *
 * De homepage heeft een Engelse versie (/en/, live samen met deze hub): de knoppen naar "hoe we
 * werken", het logo en de footer gaan daarheen. De privacyverklaring, de vacatures, de gidsen
 * en de nieuwsbrief zijn er nog alleen in het Nederlands; dat staat er eerlijk bij.
 */

import { HUB, type HubTekst } from "./copy";

export const HUB_EN: HubTekst = {
  metaTitel: "Let AI work the way your company works",
  metaBeschrijving:
    "For owners and managers of SMEs. Watch the video from Alex at Finit and book a conversation. Plus free prompts and guides from our videos.",
  metaTitelResources: "Free prompts and guides",
  metaBeschrijvingResources:
    "All prompts and guides from Finit's videos and posts in one place. Leave your email address and open them straight away.",

  taal: { label: "Choose your language", logo: "Finit Solutions, to the homepage", home: "/en/" },

  strook: { tekst: "Free prompts and guides?", link: "Find them here" },
  strookUitPost: { tekst: "The prompts from the post?", link: "Find them here" },

  kop: { voor: "The first", accent: "company brain", na: "builders in Belgium" },
  haak: "This video isn't really about AI. It's about what's in your head.",
  sub: ["Your procedures, rules, exceptions, …", "We write it all down in **ONE WEEK**,", "and that changes what AI", "can do for your **business**."],
  naarVideo: "Watch it, then decide if it's for you.",

  naarWebsite: { vraag: "Still unsure?", tekst: "Read how we work", href: "/en/#aanpak" },

  steun: { label: "Backed by", logos: HUB.steun.logos },

  onderVideo: ["We plan new projects month by month.", "Want to be included next month?"],
  knop: "Book a conversation",
  knopNoot: "One hour, no strings attached. Afterwards you know where AI saves time in your business.",

  speler: {
    label: "Video: how AI works the way your company works",
    afspelen: "Play the video",
    pauze: "Pause the video",
    verder: "Resume",
    verderVraag: "Want to keep watching?",
    verderKnop: "Keep watching",
    opnieuwKnop: "Start over",
    eindeVraag: "Do you recognise your company in this?",
    eindeKnop: "Book a conversation",
    eindeOpnieuw: "Watch again",
    fout: "The video won't load. Reload the page or try again later.",
    kwaliteit: "Video quality",
    kwaliteitAuto: "Auto",
    ondertitelsAan: "Turn on subtitles",
    ondertitelsUit: "Turn off subtitles",
    volScherm: "Full screen",
    volSchermUit: "Exit full screen",
  },

  formulier: {
    titel: "Book a conversation",
    uitleg: "First, five short questions. In the last one you leave your details, and we'll get in touch within 24 hours.",
    terug: "Back",
    volgende: "Next",
    stapVan: "Question {nu} of {totaal}",
    vragen: [
      {
        id: "rol",
        soort: "keuze",
        vraag: "What is your **role in the company?**",
        label: "Rol",
        opties: ["Owner or managing director", "Management", "Employee", "Something else"],
      },
      {
        id: "grootte",
        soort: "keuze",
        vraag: "How many people **work at your company?**",
        label: "Aantal mensen",
        opties: ["1 to 9", "10 to 49", "50 to 249", "250 or more"],
      },
      {
        id: "tijd",
        soort: "keuze",
        vraag: "Where does **most of the time** go?",
        label: "Meeste tijd",
        opties: [
          "Answering emails",
          "Making quotes",
          "Retyping data between systems",
          "Looking up information only one person knows",
          "Something else",
        ],
      },
      {
        id: "bericht",
        soort: "tekst",
        vraag: "What do you want to **solve first?**",
        hint: "One or two sentences is enough.",
        placeholder: "For example: we lose a lot of time on quotes and we use Teamleader.",
      },
      {
        id: "gegevens",
        soort: "gegevens",
        vraag: "Where can we **reach you?**",
        sub: "We'll get in touch to schedule a first conversation.",
      },
    ],
    velden: {
      naam: "Name",
      email: "Email address",
      telefoon: "Phone number",
      website: "Your company's website",
      websiteHint: "yourcompany.com",
    },
    meldingen: {
      naam: "Please enter your name.",
      emailLeeg: "Please enter your email address.",
      email: "This email address doesn't look right. Please check it.",
      telefoonLeeg: "Please enter your phone number.",
      telefoon: "This phone number doesn't look right. For example +32 470 12 34 56.",
      websiteLeeg: "Please enter your company's website.",
      website: "This website doesn't look right. For example yourcompany.be.",
    },
    verstuur: "Book a conversation",
    bezig: "Sending…",
    privacy: "We only use your details to contact you.",
    privacyLink: "Privacy policy (in Dutch)",
    fout: "Sending didn't work. Try again or email us at {email}.",
    bedankt: "Thank you{naam}. We'll get in touch within 24 hours to schedule your conversation.",
    venster: {
      titel: "Thank you{naam}, we've received your request.",
      sub: "We'll get in touch within 24 hours to schedule your conversation.",
      urgentie:
        "We plan new projects month by month. Keep your phone close: the sooner we talk, the better your chance of being included next month.",
      meer: "Read how we work",
      meerHref: "/en/#aanpak",
      terug: "Back to the page",
      sluiten: "Close",
    },
    // In het Nederlands: dit leest Luka in de mail, op monday en in Tuesday.
    berichtKop: "Antwoorden uit het formulier op de Engelse hub (/hub/en/), de bezoeker spreekt Engels:",
    vslGekeken: HUB.formulier.vslGekeken,
    vslNiet: HUB.formulier.vslNiet,
  },

  twijfels: {
    titel: { voor: "Before you book a conversation, you probably want", accent: "straight answers." },
    intro: "You've seen AI get it wrong. These are the questions we hear most.",
    lijst: [
      {
        vraag: "What does it cost?",
        antwoord:
          "Every part has its own quote, so you see the cost before you decide, and you can leave out what you don't need. We first map what your current way of working costs you, then what we'd change. The first call is free, and so is every consultation until you sign something.",
      },
      {
        vraag: "Can AI really do this? I've seen it make things up.",
        antwoord:
          "So have we, and a company brain already solves most of that problem. But to be safe, everything starts in review mode: the AI prepares, a person approves. Doubtful cases go to a human, and we only widen what it does step by step. We'll show you a demo first, because seeing it is better than believing it.",
      },
      {
        vraag: "We already use ChatGPT. Why would we need this?",
        antwoord:
          "Because using it and getting something from it are two different things. Out of the box, ChatGPT doesn't know your prices, your exceptions or your tone. We ask what actually runs automatically today. Usually the answer is nothing. A brain gives it that knowledge, so you get the same tool with a very different result.",
      },
      {
        vraag: "Won't this be outdated in two months?",
        antwoord:
          "The brain is plain text, and it belongs to you. Any model can read it, today or later. When a better one comes out, you plug it in. You're not locked in to one tool.",
      },
      {
        vraag: "It's a busy period. Can this wait?",
        antwoord:
          "It can. But the cost of ignoring AI may be higher than the cost of doing something about it. Busy periods are usually the sign you need it most. We'd rather start before the pressure gets worse.",
      },
      {
        vraag: "What about my employees?",
        antwoord:
          "We talk about growing without needing as many extra hires, never about letting people go. Your team is interviewed during the brain week, so their knowledge goes in, and we train them on site.",
      },
      {
        vraag: "What about my data?",
        antwoord:
          "An NDA and a data processing agreement come with every project, and we usually add a service agreement too. Everything is hosted in Europe, and your data is kept separate from other clients'. AI processing by Anthropic runs through the US, and there's no way around that, so we list every subprocessor in our data processing agreement.",
      },
      {
        vraag: "Will AI start talking to my customers?",
        antwoord:
          "Only if you want it to. By default, the AI prepares and you send. Only small, standard things go out automatically. Nobody should send an important quote without a person looking at it.",
      },
      {
        vraag: "We already have software that works. Do we have to replace it?",
        antwoord:
          "No. We build on top of what you have and connect it. We only suggest replacing something when it really makes sense, and we explain why.",
      },
      {
        vraag: "I'm not technical.",
        antwoord: "You don't have to be. You only need to talk about your business.",
      },
      {
        vraag: "We're too small for this.",
        antwoord: "Maybe. If there's no real need, we'll tell you honestly rather than sell you something. You can find out in an hour.",
      },
      {
        vraag: "I don't have time for this.",
        antwoord: "We ask for two hours of yours and one day with your team. The rest of the brain week is ours.",
      },
      {
        vraag: "Can I trust a company like yours?",
        antwoord: "Your systems run on their own, and the handover is in the contract. Ask us for references on the call.",
      },
      {
        vraag: "What if Finit stops?",
        antwoord:
          "Your systems keep running. If we ever stop, we'll tell you well in advance and start a handover: all access, hosting and subscriptions move to you or to an IT partner of your choice, at no cost.",
      },
    ],
  },

  // Elk punt maakt de zin "This is (not) for you if …" af.
  voorWie: {
    titel: { voor: "We'd rather tell you no than", accent: "waste your time." },
    wel: {
      titel: "This is for you if:",
      items: [
        "You own an SME or are part of its management.",
        "You want to grow without having to hire extra people.",
        "Your team loses time on emails, quotes, planning and CRM input.",
        "Too much depends on you or on one key person.",
        "You want to start delegating to AI, with peace of mind.",
      ],
    },
    niet: {
      titel: "This is not for you if:",
      items: [
        "You want a button that does everything by itself. That doesn't exist.",
        "You want a quick fix that takes none of your time or your team's.",
        "There's no real pain at the moment. In that case we'll tell you honestly.",
      ],
    },
  },

  resources: {
    titel: { voor: "Free prompts and", accent: "guides" },
    intro: "Everything I promise in my videos and posts, newest first. For now they're in Dutch.",
    leeg: "The prompts and guides from my videos will appear here soon.",
    filterLabel: "Show",
    filterAlles: "All",
    uitPost: "From the post you just saw",
    openKnop: {
      gids: "Open the guide",
      prompt: "Open the prompt",
      pakket: "Open the pack",
      bronnen: "See the sources",
      standaard: "View",
    },
    soort: { gids: "Guide", prompt: "Prompt", pakket: "Starter pack", template: "Template", video: "Video" },
    soortMeervoud: { gids: "Guides", prompt: "Prompts", pakket: "Packs", template: "Templates", video: "Videos" },
  },

  slot: {
    titel: "Leave your email address and open everything",
    tekst: "You get instant access to all {aantal} prompts and guides below. They stay open on this device afterwards.",
    titelPrompt: "Leave your email address and open the prompts",
    tekstPrompt:
      "You get the prompts on this page straight away, plus all the other prompts and guides on the hub. They stay open on this device afterwards.",
    email: "Email address",
    emailHint: "name@company.com",
    mailsKop: "Yes, keep me posted.",
    mails: "Now and then an email (in Dutch) with AI news and tips your business can actually use. At most two a month. Unsubscribe anytime, with one click.",
    knop: "Open the prompts and guides",
    bezig: "One moment…",
    privacy:
      "Without the tick, we only use your address to open the prompts and guides for you: you won't get any emails. We don't share your address with anyone.",
    privacyLink: "Privacy policy (in Dutch)",
    fout: "That email address doesn't look right. Please check it.",
  },

  footer: { vacatures: "Jobs (in Dutch)", privacy: "Privacy" },
};
