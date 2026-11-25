import type { Copy } from "./copy";

/**
 * The English text of the homepage (finitsolutions.be/en/).
 *
 * This is Amina's copy from the tab "Hub copy" in the Google Doc "Upwork
 * scripts" (24/11/2026), in sentence case. One sentence was left out: the
 * intro of "Why Finit" repeated the heading word for word.
 *
 * Not from Amina, but needed for the page (so to be checked): the title and
 * description for Google, the menu labels, the duration on each step, the photo
 * captions, the form messages and the example files of the brain (written from
 * her own examples: the discount, the Friday afternoon job, the angry customer,
 * the late supplier).
 */
export const EN: Copy = {
  meta: {
    titel: "Finit Solutions | AI that works the way your company works",
    beschrijving:
      "In one week we write down how your business works, in plain text. Then we build AI that does the work your way. For owners of Flemish SMEs. The first call is free.",
  },

  nav: {
    links: [
      { id: "brein", label: "The brain" },
      { id: "werkwijze", label: "How we work" },
      { id: "bouwen", label: "What we build" },
      { id: "vragen", label: "Questions" },
    ],
    overOns: "About us",
    cta: "Plan a free start call",
    menuOpenen: "Open menu",
    menuSluiten: "Close menu",
    bel: "Or just call us",
    uren: "Monday to Saturday, 8:30 to 19:00",
    taalLabel: "Language",
  },

  // 1. Hero
  hero: {
    voorWie: "For business owners in Flanders who still do their own admin",
    h1: "You've been the company's secretary for years.",
    h1Vervolg: "We can write your business down in just one week. Then AI can start doing the work your way, instead of you.",
    sub: "ChatGPT is smart, but it knows nothing about your company. We start with a company brain: how you work, your prices, your rules, your exceptions, written down in plain text. Every AI we build reads it first.",
    knop: "Plan a free start call",
    tweedeLink: "See how it works",
    punten: [
      "You tell us how your company runs. We do the work.",
      "No technical knowledge needed.",
      "The call is free and without obligation.",
    ],
    ondersteund: "Backed by",
    gesproken: "We've spoken with more than a hundred Belgian SMEs.",
    bestandBijschrift: "One file from a brain. Plain text that any AI can read.",
  },

  // 2. Sound familiar?
  herken: {
    kicker: "Sound familiar?",
    h2: "You paid for AI, your team uses it daily, and you still end up rewriting everything yourself.",
    vraag: "So what exactly did it save you?",
    punten: [
      {
        titel: "Everything still passes through you.",
        tekst: "The quote, the email, the planning. Your team is good, but the last step is always yours. So the evenings are too.",
      },
      {
        titel: "You rewrite what AI gives you.",
        tekst: "Your people use ChatGPT every day. Then you fix the tone, the price and the exception it never knew about. You wonder who saved time, because it wasn't you.",
      },
      {
        titel: "The knowledge sits in one head.",
        tekst: "Which supplier is always late. Which customer gets the exception. How to talk to the one who's already angry. Nobody wrote it down, and you hope that person never leaves.",
      },
      {
        titel: "You don't know where to start.",
        tekst: "You've seen AI make things up, so you don't fully trust it. You hear other owners say it's changing everything, and you quietly wonder if you're falling behind.",
      },
    ],
    slot: "Recognise even one of these? Then the problem probably isn't you. It isn't the AI either. It's something much simpler, and it's what we fix.",
    knop: "Show me what's missing",
    kleineLink: "Or plan a free start call",
  },

  // 3. What is a company brain? (AI fundament)
  brein: {
    h2: "AI keeps guessing at your company. Here's what it can't see.",
    sub: "Everything you decide every day is sitting in your head. Imagine if your AI could read it.",
    alineas: [
      "Think about what you do without thinking. A long-standing customer asks for a discount, and you know how far you can go. A job comes in on a Friday afternoon, and you know what can wait until Monday. A customer is already angry, and you know exactly how to talk to them.",
      "None of that is written down anywhere. That's why AI can't do it, and why it feels like you're teaching a new person from scratch every morning.",
      "At Finit Solutions, every project starts with this brain. It's a folder of plain text files about your business, and each file holds one piece of correct information: a process, a rule, an exception, the way you write to your customers. Every process is a series of steps, and every step is a series of small decisions. We write those decisions down, one by one, in plain language. We also call it your AI fundament.",
      "Before an AI we build does anything, it reads the brain. So it works the way your company works.",
    ],
    veranderTitel: "Two things change:",
    verander: [
      {
        titel: "AI does the work your way.",
        tekst: "Same tool, but the quote, the reply and the planning look like your company.",
      },
      {
        titel: "Your knowledge stops depending on one person.",
        tekst: "If someone is sick, or leaves, it doesn't leave with them.",
      },
    ],
    slot: "And it stays yours. It's plain text, so any AI model can read it, today or in the future.",
    knop: "Show me how it works",
    verkenner: {
      titel: "This is what a brain looks like",
      uitleg: "Click a file to open it.",
      voorbeeld: "Example",
      wortel: "brain",
      bestanden: [
        {
          map: "rules",
          naam: "discount.txt",
          regels: [
            "Giving a discount",
            "",
            "Customer for more than three years:",
            "up to 5% discount, no need to check.",
            "",
            "More than 5%:",
            "always ask the owner first.",
            "",
            "Exception:",
            "we never give a discount on transport.",
          ],
          markeer: 9,
        },
        {
          map: "processes",
          naam: "friday.txt",
          regels: [
            "A job on Friday afternoon",
            "",
            "Urgent, like a leak or a power cut:",
            "call and schedule it today.",
            "",
            "Not urgent:",
            "confirm before 10 on Monday, with a date.",
            "",
            "In doubt:",
            "call the customer and ask.",
          ],
          markeer: 9,
        },
        {
          map: "exceptions",
          naam: "suppliers.txt",
          regels: [
            "Suppliers",
            "",
            "Supplier A:",
            "nearly always delivers a week late.",
            "Count that week into the planning.",
            "",
            "Supplier B:",
            "on time, if we order before Wednesday.",
            "",
            "Never promise the customer a date",
            "before the supplier has confirmed.",
          ],
          markeer: 4,
        },
        {
          map: "tone",
          naam: "angry-customer.txt",
          regels: [
            "A customer who is already angry",
            "",
            "Call first, don't email.",
            "Don't explain who made the mistake.",
            "Do say what we're doing now, and by when.",
            "Confirm what was agreed the same day.",
          ],
          markeer: 2,
        },
        {
          map: "tone",
          naam: "emails.txt",
          regels: [
            "How we write to customers",
            "",
            "First names, never formal.",
            "Short sentences.",
            "No jargon without an explanation.",
            "Always end with the next step and a date.",
            "Prices exclude VAT. Always say so.",
          ],
          markeer: 5,
        },
      ],
    },
  },

  // 4. How we work
  werkwijze: {
    h2: "No time for an AI project? Good, because this one doesn't need it.",
    sub: "You don't have to write a single page. You just have to talk.",
    intro: "You're busy, and you don't have a week to spare for an AI project. So we do it differently: you talk, we do the work, and nobody installs a thing.",
    stappen: [
      {
        titel: "A free start call.",
        tekst: "Half an hour, no obligation. You tell us how your company runs and where the time goes. We mostly listen.",
        duur: "Half an hour",
      },
      {
        titel: "The brain week.",
        tekst: "In one week we map your business. We spend two hours with you as owner, then a day on site with the people who actually do the work, because they often know best how it really goes. We write it all down.",
        duur: "One week",
      },
      {
        titel: "Your roadmap and quote.",
        tekst: "You see what AI can take over first, in order of what pays back most, with a quote for each part. What you don't need, you leave out.",
        duur: "You choose",
      },
      {
        titel: "We build, one piece at a time.",
        tekst: "Connected to the software you already use. Everything starts in review mode: the AI prepares, a person approves. You test each piece before we move on.",
        duur: "Piece by piece",
      },
      {
        titel: "It runs, and we stay.",
        tekst: "We monitor it, fix it and update it. Every three months we sit down to see what else can be taken off your plate.",
        duur: "Ongoing",
      },
    ],
    knop: "Plan a free start call",
  },

  // 5. Why Finit
  waarom: {
    h2: "Plenty of people can build you an AI. The question is what it's built on.",
    sub: "Before anyone builds anything for you, someone has to understand how your company really works.",
    intro: "At Finit Solutions, we start by understanding how your company works. That's the part we start with, and it's the reason everything we build looks like your company.",
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
    intro: "Everything Finit Solutions builds starts from the same brain.",
    niveaus: [
      { titel: "A fixed rule", tekst: "The simplest builds follow a fixed rule: when this happens, do that." },
      { titel: "Workflows", tekst: "Next come workflows, where AI reads something and prepares the next step." },
      {
        titel: "AI employees",
        tekst: "Then AI employees, which make decisions across your software, like a person who watches your mailbox and handles what comes in.",
      },
      { titel: "One that manages the others", tekst: "Above that, one agent can manage several of them." },
      { titel: "Custom software", tekst: "And when nothing off the shelf fits, we build custom software around what you really need." },
    ],
    praktijk: "Here is what that looks like in practice. All examples are anonymised.",
    statusLabel: "Status",
    statussen: {
      voorstel: "Proposal stage",
      opbouw: "Being built",
      piloot: "Live pilot, in use",
      opgeleverd: "Delivered",
    },
    cases: [
      {
        sector: "Installers and technical services (HVAC, electrical, plumbing)",
        tekst: "An electrical installer receives a tender specification almost every working day. Our agent reads it, puts the items and quantities from the bill of quantities into his quoting tool, picks the right components for the wholesaler request and attaches the data sheets.",
        status: "voorstel",
      },
      {
        sector: "Construction, windows and renovation",
        tekst: "A window and door company orders from many suppliers on every job. Our agent checks each order against the quote and keeps a checklist per job of what's been ordered and what's been delivered.",
        status: "voorstel",
      },
      {
        sector: "Hospitality and events",
        tekst: "An events venue gets every request in one info mailbox. We build an agent that sorts it and drafts the replies, a quote agent that gives an indicative B2B price, automatic invoicing from the booking system to accounting, and a chatbot for the website.",
        status: "opbouw",
        statusNoot: "The quote agent is ready, the chatbot is in review.",
      },
      {
        sector: "Leisure and wellness",
        tekst: "A wellness centre gets its own booking platform: online booking and payment, a reception screen, massage scheduling, and an AI that answers customer questions.",
        status: "opbouw",
      },
      {
        sector: "Cleaning and facility services",
        tekst: "A cleaning company with a large number of client sites. An agent picks up complaints from two mailboxes, links each to the right customer and site in their business software, and tracks the follow-up.",
        status: "piloot",
      },
      {
        sector: "In any sector",
        tekst: "Incoming order emails turned into draft orders in the webshop of a B2B supplier.",
        status: "opgeleverd",
      },
    ],
    toolsTitel: "Works with what you already use:",
    tools: [
      "Teamleader",
      "Odoo",
      "Outlook",
      "Gmail",
      "Excel",
      "Teams",
      "WhatsApp",
      "Google Calendar",
      "Google Drive",
      "HubSpot",
      "Pipedrive",
      "Shopify",
      "WooCommerce",
      "Stripe",
      "Notion",
    ],
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
    fotoBijschrift: "From left to right: Karel, Jord and Alex.",
  },

  // 8. Proof
  bewijs: {
    h2: "Wondering if this works for a company like yours?",
    sub: "You're not the only one who had no idea how much AI could already take over.",
    getuigenissenTitel: "Look what clients say about Finit Solutions.",
    // Empty on purpose (Alex, 25/11): no testimonials until the first case that fits the profile is finished.
    getuigenissen: [],
    ondersteund: "Backed by",
    knop: "Plan a free start call",
  },

  // 9. FAQ
  faq: {
    h2: "Before you book a call, you probably want straight answers.",
    sub: "You've seen AI get it wrong. So ask the hard questions.",
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
        a: "Because using it and getting something from it are two different things. Out of the box, ChatGPT doesn't know your prices, your exceptions or your tone. We ask what actually runs automatically today. Usually the answer is nothing. A brain gives it that knowledge, so you get the same tool with a very different result.",
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
        a: "Maybe. If there's no real need, we'll tell you honestly rather than sell you something. You can find out in half an hour.",
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
    toonAlle: "Show all {aantal} questions",
    knop: "Plan a free start call",
  },

  // 10. Who this is for
  voorWie: {
    h2: "We'd rather tell you no than waste your time.",
    sub: "This isn't a magic button. Here's who it works for, and who it doesn't.",
    niet: {
      titel: "It's not for you if",
      items: [
        "you want a button that does everything by itself. That doesn't exist.",
        "you want a quick fix without any of your time or your team's.",
        "you want AI to replace your people instead of helping them.",
        "there's no real pain at the moment. In that case we'll tell you honestly.",
      ],
    },
    wel: {
      titel: "Finit Solutions works best if",
      items: [
        "you run a small or mid-sized service company.",
        "your team loses time on emails, quotes, planning and CRM input.",
        "too much depends on you or on one key person.",
        "you want to start delegating, with peace of mind.",
        "you're willing to spend a few hours explaining how your business really works.",
      ],
    },
    slot: "We go deep into how your company works, and that takes some of your time. That's exactly why it works afterwards.",
  },

  // 11. Final CTA and form
  slot: {
    h2: "No contract, no pressure, just a first conversation.",
    sub: "Find out what's stuck in your head, before it costs you.",
    kort: "Half an hour, free, no obligation.",
    tekst: "We ask how your company runs, what software you use and where the time goes. Then we tell you honestly whether we can help. No contract, no pressure.",
    formulier: {
      naam: "Name",
      email: "Email",
      telefoon: "Phone",
      website: "Company website",
      websiteHint: "yourcompany.be",
      bericht: "Where do you lose the most time, or what do you want to ask?",
      knop: "Plan a free start call",
      bezig: "Sending…",
      bedankt: "Your request has arrived.",
      bedanktSub: "We'll call you to pick a time. You usually hear from us within 24 hours.",
      fout: "Sending didn't work. Try again, or email us at {email}.",
      privacy: "We only use your details to call you back.",
    },
  },

  overOns: {
    metaTitel: "About us | Finit Solutions",
    metaBeschrijving: "The three founders of Finit Solutions: Alex Otten, Karel Van Ransbeeck and Jord Goossens. Behind every AI employee, there's a person you can call.",
  },

  footer: {
    video: "Watch Alex's video (in Dutch)",
    links: [
      { label: "Jobs (in Dutch)", href: "/vacatures/" },
      { label: "Contact (in Dutch)", href: "/contact/" },
      { label: "Privacy policy", href: "/privacy/" },
      { label: "Cookie statement", href: "/cookieverklaring/" },
      { label: "Disclaimer", href: "/disclaimer/" },
    ],
    cookies: "Cookie settings",
    btw: "VAT",
  },

  plakbalk: "Plan a free start call",
};
