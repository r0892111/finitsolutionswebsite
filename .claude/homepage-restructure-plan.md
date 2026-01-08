# Homepage Restructure Plan - Finit Solutions

## Overview
Transform the homepage from a feature-showcase layout to a conversion-optimized structure following the proven 8-section landing page architecture.

**Primary Goal:** Book a Calendly consultation call
**Target Audience:** SME/KMO owners
**Main Message:** We build custom AI solutions for YOUR specific business

---

## Current vs. New Structure

| Current | New | Action |
|---------|-----|--------|
| Hero with curtain animation | Hero (refined) | Keep animation, refine copy, add trust logos |
| Kasparov quote card | - | Move to footer |
| Video/Voicelink spotlight | - | Replace with new sections |
| "Waarom Finit" (6 cards) | - | Remove (replaced by new sections) |
| Integrations carousel | - | Move to hero area |
| Testimonials | Testimonials (strengthened) | Enhance with context |
| Contact section | Secondary CTA (simplified) | Simplify |
| Footer | Footer + Kasparov quote | Add creative quote integration |

---

## New Section Architecture

### 1. HERO (Keep Animation, Refine Content)

**Changes:**
- Keep split/curtain animation exactly as-is
- Refine headline to emphasize CUSTOM AI solutions
- Add integration logos as trust signal below CTAs
- Simplify to single primary CTA (Book a call)

**Proposed Copy:**
```
Eyebrow: "AI Automation op maat"
Headline: "Automatiseer routine work"
Subheadline: "Wij bouwen custom AI-agents die integreren met je bestaande tools en repetitieve taken volledig overnemen."
CTA: "Plan een gratis consult" (primary)
Trust: Integration logos strip + "50+ ondernemers gingen je voor"
```

---

### 2. PROBLEM-AGITATE (NEW)

**Purpose:** Make the status quo painful before offering solution

**Layout:** 3-column grid with pain points + personal transition

**Content:**
```
Section Header: "Herken je dit?"

Pain 1: "Uren kwijt aan handmatige data-invoer"
- Icon: Clock
- Body: "Je typt dezelfde klantinfo in je CRM, Excel, en facturatie. Elke dag opnieuw."

Pain 2: "Leads die door de mazen glippen"
- Icon: UserMinus
- Body: "Geen tijd voor follow-ups? Die prospect van vorige week is nu klant bij je concurrent."

Pain 3: "Geen tijd voor wat er echt toe doet"
- Icon: TrendingDown
- Body: "Je bent ondernemer geworden om te groeien, niet om admin te doen tot middernacht."

Transition: "Wat als AI dit allemaal kon overnemen?"
```

**Styling:** Use existing color palette (Oxford Navy, Slate Blue on Porcelain white)

---

### 3. HOW IT WORKS (NEW)

**Purpose:** Make "custom AI" feel accessible, not scary

**Layout:** Horizontal 4-step process with connecting lines

**Content:**
```
Section Header: "Van idee naar werkende AI in 4 stappen"

Step 1: "Gratis Consult"
- "We analyseren je huidige processen en identificeren waar AI het meeste impact heeft."

Step 2: "Ontwerp op Maat"
- "We bouwen AI-agents specifiek voor jouw workflow, geen one-size-fits-all."

Step 3: "Naadloze Integratie"
- "Alles koppelt met tools die je al gebruikt: CRM, email, Excel, boekhouding."

Step 4: "Tijd Terug"
- "Jij focust op groei, de AI handelt de rest af. 24/7, zonder fouten."
```

---

### 4. TRANSFORMATION (NEW)

**Purpose:** Make the outcome tangible with before/after

**Layout:** Side-by-side comparison OR vertical timeline

**Content:**
```
Section Header: "Van overweldigd naar geautomatiseerd"

BEFORE Column:
- "3 systemen handmatig bijwerken"
- "Follow-ups vergeten of te laat"
- "Avonden en weekends aan admin"
- "Groei beperkt door tijd"

AFTER Column:
- "Eén voice memo, alles gesynchroniseerd"
- "Automatische opvolging op het juiste moment"
- "Processen draaien terwijl jij slaapt"
- "Schalen zonder extra personeel"

Visual: Consider using checkmarks (After) vs X marks (Before)
```

---

### 5. SOCIAL PROOF (Strengthen Existing)

**Purpose:** Let others convince them

**Changes to current testimonials:**
- Add company context (industry, size) to each testimonial
- Add qualitative outcome phrases
- Move "50+ klanten" stat from footer to here
- Consider adding company logos if available

**Enhanced Testimonial Format:**
```
Quote: "Finit Solutions heeft onze bedrijfsprocessen compleet getransformeerd..."
Author: Thomas Janssens
Position: CEO, TechVision BV
Context: "Software, 25 medewerkers"
Outcome badge: "Processen 3x sneller"
```

---

### 6. SECONDARY CTA (Simplify Contact Section)

**Purpose:** Clear conversion point

**Layout:** Single focused card, remove phone/email cards

**Content:**
```
Header: "Klaar om te ontdekken wat AI voor jou kan doen?"
Subhead: "30 minuten, gratis, geen verplichtingen"

What you get:
- Analyse van je huidige processen
- Identificatie van automatiseringskansen
- Concreet implementatieplan
- ROI inschatting

CTA Button: "Plan je gratis gesprek" → Calendly link

Small print: "Reactie binnen 24 uur"
```

---

### 7. PLUG & PLAY TEASER (NEW - Subtle)

**Purpose:** Secondary path for those not ready for custom

**Layout:** Small banner/card near bottom

**Content:**
```
"Geen tijd voor maatwerk?"

"Probeer onze kant-en-klare tools"

Link: "Bekijk de Marketplace →" or "Probeer Voicelink →"
```

**Styling:** Subtle, secondary visual treatment. Not competing with main CTA.

---

### 8. FOOTER (Enhanced with Kasparov Quote)

**Purpose:** Professional legitimacy + philosophical sign-off

**Changes:**
- Keep wave animation
- Add Kasparov quote in a creative card/box
- Integrate chess piece image subtly

**Quote Card Design:**
```
┌─────────────────────────────────────────────────────┐
│  [Chess piece image, subtle/faded]                  │
│                                                     │
│  "AI will not replace humans, but those who use    │
│   AI will replace those who don't."                │
│                                                     │
│  — Garry Kasparov, Schaakgrootmeester              │
└─────────────────────────────────────────────────────┘
```

**Placement:** Left side of footer, before the main CTA section, or as centered element above footer links.

---

## Technical Implementation

### Files to Modify:
1. `components/ai-design-landing.tsx` - Main restructure
2. `app/globals.css` - Any new animation classes

### Components to Add:
1. `ProblemAgitateSection` - New section
2. `HowItWorksSection` - New section
3. `TransformationSection` - New section
4. `PlugAndPlayTeaser` - New section
5. `FooterQuoteCard` - Quote integration

### Components to Remove:
1. Tab navigation (Bot/Zap/Play icons)
2. Voicelink spotlight card
3. "Waarom Finit" value props grid
4. Phone/WhatsApp/Email cards from contact

### Components to Move:
1. Integration logos carousel → Hero section (as static strip)
2. Kasparov quote → Footer

---

## Copy Requirements

All copy should be in Dutch with the following tone:
- Direct and confident
- Empathetic to pain points
- Results-focused
- Professional but approachable

---

## Next Steps

1. [ ] User approval of this plan
2. [ ] Implement new section components
3. [ ] Restructure ai-design-landing.tsx
4. [ ] Test responsive behavior
5. [ ] Review and refine copy
6. [ ] Final polish and animations
