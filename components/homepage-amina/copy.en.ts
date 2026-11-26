import type { Copy } from "./copy";

/**
 * The English text of the homepage (finitsolutions.be/en/).
 *
 * This is Amina's copy from the tab "Hub copy" in the Google Doc "Upwork
 * scripts" (24/11/2026), word for word, in sentence case.
 *
 * Only her copy (Alex, 25/11). Not hers, but technically needed: `meta` (title
 * and description for Google), `nav` (menu labels, using her section names),
 * the form messages (sending, thanks, error), `overOns.meta`, `footer` and the
 * alt text of the photo.
 */
export const EN: Copy = {
  meta: {
    titel: "Finit Solutions | AI that works the way your company works",
    beschrijving:
      "In one week we write down how your business works, in plain text. Then we build AI that does the work your way. For owners of Flemish SMEs. The first call is free.",
  },

  nav: {
    links: [
      { id: "werkwijze", label: "How we work" },
      { id: "bouwen", label: "What we build" },
      { id: "waarom", label: "Why Finit" },
      { id: "vragen", label: "FAQ" },
    ],
    overOns: "About us",
    cta: "Book a conversation",
    menuOpenen: "Open menu",
    menuSluiten: "Close menu",
    taalLabel: "Language",
  },

  // 1. Hero
  hero: {
    voorWie: "For business owners in Flanders who still do their own admin",
    h1: "You've been the company's secretary for years.",
    h1Streep: "for years.",
    h1Vervolg: "We can write your business down in just one week. Then AI can start doing the work your way, instead of you.",
    sub: "ChatGPT is smart, but it knows nothing about your company. We start with a company brain: how you work, your prices, your rules, your exceptions, written down in plain text. Every AI we build reads it first.",
    knop: "Book a conversation",
    tweedeLink: "See how it works",
    punten: [
      "You tell us how your company runs. We do the work.",
      "No technical knowledge needed.",
      "The call is free and without obligation.",
    ],
    ondersteund: "Backed by",
  },

  // The brain visual and the photo of the previous homepage (Alex, 26/11). The keys are the
  // Dutch names of the nodes in components/home/brein-3d.tsx.
  brein3d: {
    aria: "The brain of a service company: pages such as Quotes, Customers, Planning and Invoicing, with lines between them for the connections.",
    labels: {
      "Jouw bedrijf": "Your company", Sales: "Sales", Offertes: "Quotes", Klanten: "Customers", Prijzen: "Prices", Planning: "Planning",
      Agenda: "Calendar", Facturatie: "Invoicing", Boekhouding: "Accounting", Service: "Service", Klachten: "Complaints", Mailbox: "Mailbox",
      WhatsApp: "WhatsApp", Leveranciers: "Suppliers", "Wie doet wat": "Who does what", Werkwijze: "How you work",
    },
    info: {
      "Jouw bedrijf": { bestand: "your-company.md", kop: "The home page of your brain", regels: ["What you do and for whom", "How your company makes money", "What the other pages are about"] },
      Sales: { bestand: "sales.md", kop: "From first contact to yes", regels: ["Where new customers come from", "What you ask at a first contact", "When you follow up, and how"] },
      Offertes: { bestand: "quotes.md", kop: "How a quote comes together", regels: ["Which details you need first", "How you calculate the price", "Who checks it before it goes out", "When you follow up"] },
      Klanten: { bestand: "customers.md", kop: "Who your customers are", regels: ["What they had done before", "How you address them", "What you keep track of per customer"] },
      Prijzen: { bestand: "prices.md", kop: "Your rates and margins", regels: ["Your hourly rate and fixed prices", "Discount rules", "What the AI may never change by itself"] },
      Planning: { bestand: "planning.md", kop: "How you plan the work", regels: ["Who can go where, and when", "What gets priority", "How you confirm an appointment"] },
      Agenda: { bestand: "calendar.md", kop: "Your calendar and the rules", regels: ["Where your calendar lives", "When you can be reached", "Reminders and confirmations"] },
      Facturatie: { bestand: "invoicing.md", kop: "When and how you invoice", regels: ["Payment terms", "When a reminder goes out", "What goes on an invoice"] },
      Boekhouding: { bestand: "accounting.md", kop: "What your accountant needs", regels: ["Which documents, and when", "Where they are kept", "Who delivers them"] },
      Service: { bestand: "service.md", kop: "How you help customers after the sale", regels: ["Which questions keep coming back", "What you solve yourself and what you don't", "How fast you reply"] },
      Klachten: { bestand: "complaints.md", kop: "How you handle a complaint", regels: ["How you recognise a complaint", "Who gets involved", "What you promise the customer"] },
      Mailbox: { bestand: "mailbox.md", kop: "What comes into your mailbox", regels: ["Which kinds of emails you get", "What you answer right away", "What you forward, and to whom"] },
      WhatsApp: { bestand: "whatsapp.md", kop: "What customers send via WhatsApp", regels: ["Which questions you get", "How you reply", "When a message becomes an appointment"] },
      Leveranciers: { bestand: "suppliers.md", kop: "Who you order from", regels: ["Terms and delivery times", "Who your contact is", "What you check before you promise a date"] },
      "Wie doet wat": { bestand: "who-does-what.md", kop: "Your team and who decides", regels: ["Who does which task", "Who may decide what", "When the AI brings in a person"] },
      Werkwijze: { bestand: "how-you-work.md", kop: "How you work", regels: ["The fixed steps per task", "Your house style and tone", "What always passes by you"] },
    },
  },
  foto: {
    statement: "Finit gets Flemish SMEs ready for the AI era.",
    alt: "Karel and Jord of Finit Solutions behind their stand at a trade fair.",
  },

  // 2. Sound familiar? (shortened by Amina on 25/11, after Alex's comment)
  herken: {
    kicker: "Sound familiar?",
    h2: "You paid for AI, your team uses it daily, and you still end up rewriting everything yourself.",
    vraag: "So what exactly did it save you?",
    punten: [
      "Everything still passes through you.",
      "You rewrite what AI gives you.",
      "The knowledge sits in one head.",
      "You don't know where to start.",
    ],
    slot: "Recognise even one of these? Then the problem probably isn't you. It isn't the AI either. It's something much simpler, and it's what we fix.",
    knop: "Show me what's missing",
    kleineLink: "Or book a conversation",
  },

  // 3. What is a company brain? (AI fundament; shortened by Amina on 25/11)
  brein: {
    h2: "AI keeps guessing at your company. Here's what it can't see.",
    sub: "Everything you decide every day is sitting in your head. Imagine if your AI could read it.",
    alineas: [
      "A long-standing customer asks for a discount, and you know how far to go. An angry customer calls, and you know exactly what to say. None of it is written down, so AI can't do it.",
      "At Finit Solutions, every project starts with a company brain: plain text files that hold your processes, your rules, your exceptions and your tone, down to the small decisions. Every AI we build reads it first.",
    ],
    verander: [
      {
        titel: "AI works your way.",
        tekst: "The quote, the reply and the planning look like your company.",
      },
      {
        titel: "Your knowledge stops depending on one person.",
        tekst: "If someone leaves, it stays.",
      },
    ],
    slot: "And it stays yours. It's plain text, so any AI model can read it, today or in the future.",
    knop: "Show me how it works",
  },

  // 4. How we work (order corrected by Alex, 24/11: the conversations and the quote first,
  // the brain only after signing, then the build). The first conversation takes an hour (Alex, 25/11).
  werkwijze: {
    h2: "No time for an AI project? Good, because this one doesn't need it.",
    sub: "You don't have to write a single page. You just have to talk.",
    stap: "Step",
    stappen: [
      {
        titel: "A free intro conversation",
        // Alex, 25/11: no longer "we mostly listen". In those 60 minutes we already go through the processes in depth.
        tekst: "60 minutes in which we already go through your processes in depth: how your company runs, where the time goes and where it gets stuck. At the end we tell you honestly whether we're a fit.",
      },
      {
        titel: "A few more conversations, until we can give you a quote",
        tekst: "We keep talking, online or at your place, until we know enough to put a clear plan and price on paper. You explain how you work. Every call and consultation until now costs you nothing, and nothing starts until you've said yes.",
      },
      {
        titel: "We write your business down",
        tekst: "Once you sign, we spend one week with you and your team, because the people who do the work often know best how it really goes. We write down how your company runs, down to the small decisions. That's your company brain, and it belongs to you.",
      },
      {
        titel: "Then we build",
        // Alex, 25/11: not "connected to the software you already use"; sometimes we build software from scratch.
        tekst: "We build what you need, from a simple automation to a team of AI agents or fully custom software. Everything starts in review mode: the AI prepares, a person approves. We stay on to keep it running.",
      },
    ],
    knop: "Book a conversation",
  },

  // 5. Why Finit
  waarom: {
    h2: "Plenty of people can build you an AI. The question is what it's built on.",
    sub: "Before anyone builds anything for you, someone has to understand how your company really works.",
    intro: "Plenty of people can build you an AI. At Finit Solutions, we start by understanding how your company works. That's the part we start with, and it's the reason everything we build looks like your company.",
    punten: [
      {
        titel: "We start with your company, not a tool.",
        tekst: "We sit down with you and your team first. Everything we build afterwards is based on that, so the result feels like yours and not like a template.",
      },
      {
        titel: "We build fast, and only what you need.",
        tekst: "We use AI in our own development, so a custom system that would normally take many months can be ready in weeks. And we build one system around what you actually use, so you don't pay for the parts of big software you'd never touch.",
      },
      {
        titel: "We stay.",
        tekst: "We're your fixed AI partner, not a team that hands over a project and disappears. You get to know us, and we get to know you and your people.",
      },
    ],
  },

  // 6. What we build
  bouwen: {
    h2: "The emails, the quotes, the planning, the CRM input.",
    sub: "The work that fills your evenings is exactly what we build for.",
    // First sentence: Amina. The second replaces her five levels (Alex's comment, 25/11: too much
    // explaining; people only want to know we build what fits best, from a simple automation to a
    // team of AI agents or fully custom software). His words.
    intro: "Everything Finit Solutions builds starts from the same brain. We build what's best for you and most cost effective, whether that's a simple automation, a team of AI agents or fully custom software.",
    praktijk: "Here is what that looks like in practice. All examples are anonymised.",
    cases: [
      {
        sector: "Installers and technical services (HVAC, electrical, plumbing)",
        tekst: "An electrical installer receives a tender specification almost every working day. Our agent reads it, puts the items and quantities from the bill of quantities into his quoting tool, picks the right components for the wholesaler request and attaches the data sheets.",
      },
      {
        sector: "Construction, windows and renovation",
        tekst: "A window and door company orders from many suppliers on every job. Our agent checks each order against the quote and keeps a checklist per job of what's been ordered and what's been delivered.",
      },
      {
        sector: "Hospitality and events",
        tekst: "An events venue gets every request in one info mailbox. We built an agent that sorts it and drafts the replies, a quote agent that gives an indicative B2B price, automatic invoicing from the booking system to accounting, and a chatbot for the website.",
      },
      {
        sector: "Leisure and wellness",
        tekst: "A wellness centre got its own booking platform: online booking and payment, a reception screen, massage scheduling, and an AI that answers customer questions.",
      },
      {
        sector: "Cleaning and facility services",
        tekst: "A cleaning company with a large number of client sites. An agent picks up complaints from two mailboxes, links each to the right customer and site in their business software, and tracks the follow-up.",
      },
      {
        sector: "In any sector",
        tekst: "Incoming order emails turned into draft orders in the webshop of a B2B supplier.",
      },
    ],
    toolsTitel: "Works with what you already use:",
    toolsRest: "and most of the rest.",
  },

  // 7. Who is behind Finit
  team: {
    h2: "You're about to hand over how your company runs.",
    sub: "Behind every AI employee, there's a person you can call.",
    intro: "The three founders of Finit Solutions.",
    mensen: [
      {
        naam: "Alex Otten",
        rol: "Founder and Managing Director",
        tekst: "Alex looks after the growth and visibility of Finit. You might already know him from the videos.",
      },
      {
        naam: "Karel Van Ransbeeck",
        rol: "Founder and Managing Director",
        tekst: "Karel keeps Finit running day to day. He's your contact for client relationships and for the analysis of your business.",
      },
      {
        naam: "Jord Goossens",
        rol: "Founder and CTO",
        tekst: "Jord is responsible for the technology and the quality of everything we build.",
      },
    ],
    bel: "Prefer to talk first? Call us on",
    belUren: "Monday to Saturday, 8:30 to 19:00.",
    fotoAlt: "Karel, Jord and Alex of Finit Solutions at their stand at a trade fair.",
  },

  // 8. Proof
  bewijs: {
    h2: "Wondering if this works for a company like yours?",
    sub: "You're not the only one who had no idea how much AI could already take over.",
    getuigenissenTitel: "Look what clients say about Finit Solutions.",
    // Empty on purpose (Alex, 25/11): no testimonials until the first case that fits the profile is finished.
    getuigenissen: [],
    ondersteund: "Backed by",
    knop: "Book a conversation",
  },

  // 9. FAQ
  faq: {
    h2: "Before you book a conversation, you probably want straight answers.",
    sub: "You've seen AI get it wrong. These are the doubts we hear most.",
    items: [
      {
        q: "What does it cost?",
        a: "Every part has its own quote, so you see the cost before you decide, and you can leave out what you don't need. We first map what your current way of working costs you, then what we'd change. The first call is free, and so is every consultation until you sign something.",
      },
      {
        q: "Can AI really do this? I've seen it make things up.",
        a: "So have we. That's why everything starts in review mode: the AI prepares, a person approves. Doubtful cases go to a human, and we only widen what it does step by step. We'll show you a demo first, because seeing it is better than believing it.",
      },
      {
        q: "We already use ChatGPT. Why would we need this?",
        a: "Because using it and getting something from it are two different things. Out of the box, ChatGPT doesn't know your working procedures, your rules or your exceptions. We ask what actually runs automatically today. Usually the answer is nothing. A brain gives it that knowledge, so you get the same tool with a very different result.",
      },
      {
        q: "Won't this be outdated in two months?",
        a: "The brain is plain text, and it belongs to you. Any model can read it, today or later. When a better one comes out, you plug it in. You're not locked in to one tool.",
      },
      {
        q: "It's a busy period. Can this wait?",
        a: "It can. But the cost of ignoring AI may be higher than the cost of doing something about it. Busy periods are usually the sign you need it most. We'd rather start before the pressure gets worse.",
      },
      {
        q: "What about my employees?",
        a: "We talk about growing without needing as many extra hires, never about letting people go. Your team is interviewed during the brain week, so their knowledge goes in, and we train them on site.",
      },
      {
        q: "What about my data?",
        a: "An NDA and a data processing agreement come with every project, and we usually add a service agreement too. Everything is hosted in Europe, and your data is kept separate from other clients'. AI processing by Anthropic runs through the US, and there's no way around that, so we list every subprocessor in our data processing agreement.",
      },
      {
        q: "Will AI start talking to my customers?",
        a: "Only if you want it to. By default, the AI prepares and you send. Only small, standard things go out automatically. Nobody should send an important quote without a person looking at it.",
      },
      {
        q: "We already have software that works. Do we have to replace it?",
        a: "No. We build on top of what you have and connect it. We only suggest replacing something when it really makes sense, and we explain why.",
      },
      {
        q: "I'm not technical.",
        a: "You don't have to be. You only need to talk about your business.",
      },
      {
        q: "We're too small for this.",
        a: "Maybe. If there's no real need, we'll tell you honestly rather than sell you something. You can find out in an hour.",
      },
      {
        q: "I don't have time for this.",
        a: "We ask for two hours of yours and one day with your team. The rest of the brain week is ours.",
      },
      {
        q: "Can I trust a company like yours?",
        a: "Your systems run on their own, and the handover is in the contract. Ask us for references on the call.",
      },
      {
        q: "What if Finit stops?",
        a: "Your systems keep running. If we ever stop, we'll tell you well in advance and start a handover: all access, hosting and subscriptions move to you or to an IT partner of your choice, at no cost.",
      },
    ],
    knop: "Book a conversation",
  },

  // 10. Who this is for. Word for word the cards of the hub (Alex, 25/11), green and red.
  voorWie: {
    h2: "We'd rather tell you no than waste your time.",
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

  // 11. Final CTA and form
  slot: {
    h2: "No contract, no pressure, just a first conversation.",
    sub: "Find out what's stuck in your head, before it costs you.",
    kort: "An hour, free, no obligation.",
    tekst: "We ask how your company runs, what software you use and where the time goes. Then we tell you honestly whether we can help. No contract, no pressure.",
    formulier: {
      naam: "Name",
      email: "Email",
      telefoon: "Phone",
      website: "Company website",
      bericht: "Where do you lose the most time, or what do you want to ask?",
      knop: "Book a conversation",
      bezig: "Sending…",
      bedankt: "Your request has arrived.",
      bedanktSub: "We'll call you to pick a time. You usually hear from us within 24 hours.",
      fout: "Sending didn't work. Try again, or email us at {email}.",
    },
  },

  overOns: {
    metaTitel: "About us | Finit Solutions",
    metaBeschrijving: "The three founders of Finit Solutions: Alex Otten, Karel Van Ransbeeck and Jord Goossens. Behind every AI employee, there's a person you can call.",
  },

  gratis: {
    nav: "Free resources",
    metaTitel: "Free prompts and guides | Finit Solutions",
    videoKnop: "Watch the video",
  },

  footer: {
    links: [
      { label: "Privacy policy", href: "/privacy/" },
      { label: "Cookie statement", href: "/cookieverklaring/" },
      { label: "Disclaimer", href: "/disclaimer/" },
    ],
    cookies: "Cookie settings",
    btw: "VAT",
  },

  plakbalk: "Book a conversation",
};
