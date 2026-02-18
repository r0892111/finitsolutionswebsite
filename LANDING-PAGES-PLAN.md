# Landing Pages Plan - Finit Solutions Advertentiecampagne

> Dit document bevat geoptimaliseerde plannen voor alle landing pages, afgestemd op de advertentiescripts en gebouwd op bewezen marketingprincipes. Elke page behoudt de bestaande Finit-stijl: typewriter-animatie, logo carousel, kleurenpalet (#1A2D63 navy, #F7E69B goud, #FDFBF7 achtergrond), Newsreader + Instrument Sans fonts, en GSAP/Framer Motion animaties.

---

## Inhoudsopgave

1. [Overkoepelende Architectuur & Stijlgids](#1-overkoepelende-architectuur--stijlgids)
2. [LP1: Awareness - "Herken Jij Dit?"](#2-lp1-awareness---herken-jij-dit)
3. [LP2: Consideration - "Hoe Het Werkt"](#3-lp2-consideration---hoe-het-werkt)
4. [LP3: Conversion - "ROI Calculator"](#4-lp3-conversion---roi-calculator)
5. [LP4: Direct Booking - "Plan Je Gesprek"](#5-lp4-direct-booking---plan-je-gesprek)
6. [LP5: Niche - "Voor Installateurs"](#6-lp5-niche---voor-installateurs)
7. [LP6: AI Readiness Scan Info](#7-lp6-ai-readiness-scan-info)
8. [LP7: Case Studies / Succesverhalen](#8-lp7-case-studies--succesverhalen)
9. [LP8: Thank You Page](#9-lp8-thank-you-page)
10. [LP9: FAQ / Veelgestelde Vragen](#10-lp9-faq--veelgestelde-vragen)
11. [Script-naar-Page Routeringsmatrix](#11-script-naar-page-routeringsmatrix)

---

## 1. Overkoepelende Architectuur & Stijlgids

### Technische Setup
- **Route structuur**: Elke LP wordt een route onder `app/(landing)/[slug]/page.tsx`
- **Gedeeld layout**: `app/(landing)/layout.tsx` - apart van `(home)` en `(main)`, zonder standaard navbar/footer, maar met een eigen lichtgewicht navigatie
- **Herbruikbare componenten**: Nieuwe gedeelde componenten in `components/landing/`
- **Data-driven**: Elke LP haalt hero-teksten, typewriter-phrases en CTA-teksten uit een config-object, zodat A/B-testen makkelijk is

### Design Systeem (behouden van huidige site)

```
Kleuren:
  Navy Primary:     #1A2D63
  Navy Hover:       #2A4488
  Slate Blue:       #475D8F
  Gold Accent:      #F7E69B
  Background:       #FDFBF7
  White Card:       #FFFFFF
  Border subtle:    rgba(26, 45, 99, 0.1)

Fonts:
  Headings:         font-newsreader (serif, elegant)
  Body:             font-instrument (Instrument Sans)
  Highlights/UI:    font-general-sans

Componenten (hergebruik):
  CTA Button:       bg-[#1A2D63] text-white rounded-full px-6 py-3 shadow-lg
  Card:             bg-white rounded-3xl shadow-2xl border border-[#1A2D63]/10
  Section bg:       bg-[#FDFBF7]
  Glow effect:      bg-[#B8C5E6] rounded-full blur-[120px] opacity-30
```

### Gedeelde Landing Page Componenten

Elk te bouwen als herbruikbaar component:

1. **`LandingHero`** - Hero met typewriter, logo carousel, aangepaste copy
2. **`LandingNav`** - Lichtgewicht nav (logo + CTA button alleen)
3. **`SocialProof`** - Testimonials / cijfers strip
4. **`CalendlyEmbed`** - Calendly widget of directe link-knop
5. **`PainPoints`** - Herkenbare pijnpunten lijst met iconen
6. **`BenefitCards`** - Oplossings-kaarten met animatie
7. **`UrgencyBanner`** - Aftellende of schaars-voelende banner
8. **`TrustSignals`** - Logo's, cijfers, badges

### Marketing Principes per Page Type

| Fase | Emotie | Strategie | Focus |
|------|--------|-----------|-------|
| Awareness | Herkenning, frustratie | PAS (Problem-Agitate-Solution) | Pijn benoemen, oplossing teasen |
| Consideration | Nieuwsgierigheid, hoop | Educatie + bezwaar-handling | Uitleg, vertrouwen bouwen |
| Conversion | Urgentie, FOMO | Concrete ROI + schaarste | Cijfers, competitieve druk |
| Booking | Besluitvaardigheid | Minimale frictie | Niets dat afleidt van boeken |

---

## 2. LP1: Awareness - "Herken Jij Dit?"

### Meta
- **URL**: `/herken-jij-dit`
- **Doel**: Cold traffic uit Script 1, 2, 5 converteren naar Calendly-booking
- **Traffic bron**: Script 1 (Admin Tijdvreter), Script 2 (Groeien Zonder Personeel), Script 5 (Partnership)
- **KPI**: Calendly-bookings (click-through rate op CTA)

### Marketing Optimalisatie

**Cruciaal principe: Message Match.**
De bezoeker komt van een video die zegt "Hoeveel uur administratie doe jij per week?" - de landing page MOET datzelfde gevoel direct spiegelen. Geen generieke "welkom"-tekst.

**Framework: PAS (Problem - Agitate - Solution)**

### Sectie-voor-sectie Plan

#### Sectie 1: Hero (100vh)
```
Layout: Identiek aan huidige hero - full viewport, gecentreerd
Achtergrond: Logo carousel (zelfde GSAP curved path, zelfde logos)

Typewriter phrases (aangepast aan scripts):
  - "administratie"
  - "handmatige opvolging"
  - "offerte-chaos"
  - "factuurwerk"
  - "planningsproblemen"
  - "inbox-overload"
  - "personeelsdruk"

Headline structuur:
  "Verlies je [typewriter] aan tijdvreters?"

  OF (variant voor Script 2 traffic):
  "Groei zonder extra [typewriter]"
  met typewriter: "personeel" / "management" / "chaos" / "overhead"

Subtekst (font-instrument, #475D8F):
  "De gemiddelde KMO-ondernemer verliest 15 uur per week aan taken
   die een AI-systeem beter en sneller kan doen."

CTA (enkele knop, prominent):
  [Calendar icon] "Ontdek hoeveel tijd jij terugwint" [Arrow]
  Link: Calendly

Micro-bewijs onder CTA:
  "Meer dan 30 bedrijven geholpen | Resultaat binnen 4 weken"
```

**Waarom deze aanpak werkt:**
- De typewriter spiegelt exact de pijnpunten uit Script 1/2/5
- De headline is een vraag (creert engagement - bezoeker knikt mee)
- Het getal "15 uur" komt direct uit Script 1 (consistentie = vertrouwen)
- Enkele CTA voorkomt keuzestress (Hick's Law)

#### Sectie 2: Pijnpunten - "Herken je dit?" (scroll reveal)
```
Layout: 2x3 grid op desktop, gestapeld op mobiel
Achtergrond: #FDFBF7

Heading (font-newsreader, #1A2D63):
  "Klinkt dit bekend?"

6 pijnpunt-kaarten (witte cards, subtiele border):
  1. [Clock icon] "Offertes die dagen blijven liggen"
  2. [Mail icon] "E-mails die je vergeet op te volgen"
  3. [Receipt icon] "Facturen die te laat de deur uit gaan"
  4. [Users icon] "Groeien = altijd meer personeel zoeken"
  5. [Calendar icon] "Planning die elke week chaotischer wordt"
  6. [TrendingDown icon] "Omzet mislopen door trage reactietijd"

Elke kaart:
  - Icon in navy cirkel (#1A2D63/10 bg)
  - Korte tekst (1 zin)
  - Fade-in animatie bij scroll (Framer Motion, staggered)
```

**Waarom:** Script 1 en 5 benoemen exact deze pijnen. De bezoeker moet op minstens 3 van de 6 "ja" denken. Dat creert het "dit gaat over mij"-gevoel.

#### Sectie 3: Oplossing - "Wat als..." (contrast met pijn)
```
Layout: Grote tekst links, visueel rechts (of gestapeld mobiel)
Achtergrond: Subtiel gradient naar wit

Heading:
  "Wat als die taken zichzelf deden?"

3 oplossings-blokken (met animatie):
  1. "Offertes automatisch verstuurd - binnen minuten, niet dagen"
  2. "Klanten plannen zelf in - geen heen-en-weer gebel"
  3. "Opvolging die vanzelf gaat - geen leads meer vergeten"

Visueel element:
  Hergebruik van de SVG illustratie-stijl uit UseCasesSection
  (de geanimeerde SVG die CRM sync of scheduling laat zien)

Toon subtiele before/after:
  "Zonder AI: 15 uur admin per week"
  "Met AI: 2 uur per week"
  (progressiebalk of simpele vergelijking)
```

**Waarom:** PAS-framework - na Problem en Agitate komt de Solution. De "wat als" framing creert verlangen zonder pushy te zijn. Exact in lijn met Script 1: "Wij bouwen AI-systemen die dat overnemen."

#### Sectie 4: Social Proof
```
Layout: Donkerdere band (bg-[#1A2D63]/5)

Elementen:
  - 3 cijferblokken: "30+ bedrijven" | "15+ uur bespaard/week" | "4 weken tot resultaat"
  - 1-2 testimonials (als beschikbaar) met foto, naam, bedrijf
  - Scroll-animatie: tellers die optellen bij scroll-in-view

Quote stijl:
  Groot aanhalingsteken in #F7E69B (goud)
  Tekst in font-newsreader italic
  Naam + functie in font-instrument small caps
```

#### Sectie 5: Hoe werkt het? (verkort)
```
Layout: 3 stappen horizontaal (hergebruik HowItWorksSection stijl)

Stap 1: "Gratis Gesprek" - "We analyseren waar jouw grootste kansen liggen"
Stap 2: "Op Maat Gebouwd" - "AI-systemen die naadloos integreren in je workflow"
Stap 3: "Resultaat" - "Meer tijd, minder stress, snellere groei"

Verbindingslijnen: Zelfde SVG-lijn stijl als huidige HowItWorks
```

**Waarom:** Script 5 benadrukt "partnership" - de 3 stappen tonen dat het een samenwerking is, geen productverkoop.

#### Sectie 6: CTA Blok (finaal)
```
Layout: Gecentreerde card (hergebruik secondaryCTA stijl)
Glow effect achter card

Heading (font-newsreader):
  "Klaar om je administratie te automatiseren?"

Subtekst:
  "Plan een vrijblijvend gesprek van 30 minuten.
   Wij laten je zien waar de grootste kansen liggen."

CTA: [Calendar] "Plan je gratis gesprek" [Arrow]

Vertrouwenssignalen onder CTA:
  [Check] Vrijblijvend  [Check] Geen technische kennis nodig  [Check] Resultaat binnen 4 weken
```

#### Sectie 7: Sticky Mobile CTA
```
Op mobiel: Vaste balk onderaan met CTA-knop
Verschijnt na 30% scroll
Semi-transparante achtergrond met backdrop-blur
"Plan je gesprek" - link naar Calendly
```

---

## 3. LP2: Consideration - "Hoe Het Werkt"

### Meta
- **URL**: `/hoe-het-werkt`
- **Doel**: Warm traffic educeren en bezwaren wegnemen
- **Traffic bron**: Script 3 (AI Is Niet Wat Je Denkt), Script 4 (niet meegegeven maar gereferenceerd)
- **KPI**: Calendly-bookings, scroll depth

### Marketing Optimalisatie

**Cruciaal: Dit publiek is nieuwsgierig maar sceptisch.** Ze hebben de video gezien die zegt "AI in je bedrijf betekent niet ChatGPT." Ze willen begrijpen WAT het dan wel is. Deze page moet educeren zonder te overweldigen.

**Framework: Educatie + Bezwaar-preemptie**

### Sectie-voor-sectie Plan

#### Sectie 1: Hero (100vh)
```
Typewriter phrases (aangepast aan Script 3):
  - "virtuele medewerkers"
  - "automatische offertes"
  - "slimme opvolging"
  - "24/7 klantenservice"
  - "zelf-verstuurde facturen"
  - "intelligente planning"

Headline:
  "AI is niet ChatGPT. Het zijn [typewriter]"

  OF: "Vergeet ChatGPT. Ontdek [typewriter]"

Subtekst:
  "Virtuele medewerkers die nooit ziek zijn, nooit vakantie nemen,
   en 24/7 voor je werken. Voor een fractie van de kosten."

CTA: [Calendar] "Plan je gratis AI Readiness Scan" [Arrow]

Logo carousel: Zelfde als hoofdsite (laat integraties zien = geloofwaardigheid)
```

**Waarom:** Directe echo van Script 3: "AI betekent niet ChatGPT... het betekent virtuele medewerkers." De typewriter laat concrete voorbeelden zien van wat die "virtuele medewerkers" doen.

#### Sectie 2: "Wat AI echt betekent" - Misconceptie-breaker
```
Layout: Twee kolommen - "Wat je denkt" vs "Wat het echt is"

Links (doorgestreept, lichtgrijs):
  X "ChatGPT gebruiken voor e-mails"
  X "Complexe technologie leren"
  X "Je hele bedrijf omgooien"
  X "Dure IT-consultants inhuren"

Rechts (groen vinkje, navy):
  V "Systemen die automatisch offertes maken"
  V "Klanten die zelf afspraken inplannen"
  V "Facturen die zichzelf versturen"
  V "Opvolging die vanzelf gebeurt"

Animatie: Items verschijnen staggered van boven naar beneden
Stijl: Subtiele rode/groene accenten bij de X/V, rest in navy
```

**Waarom:** Script 3 zegt letterlijk "AI in je bedrijf betekent niet dat je ChatGPT gebruikt." Deze sectie breekt exact die misconceptie visueel.

#### Sectie 3: "Hoe het werkt" - 3-Stappen Deep Dive
```
Layout: Verticaal scrollend, elke stap een volledige sectie
Hergebruik van de card-stijl + verbindingslijnen uit HowItWorksSection

Stap 1: "Gesprek & Analyse" (30 min)
  Icon: Handshake of Discovery
  "We brengen jouw processen in kaart. Waar verlies je tijd?
   Waar lopen leads weg? Waar zitten de bottlenecks?"

  Uitklapbaar detail (zoals huidige howItWorksDetails):
    - Grondige analyse van je huidige werkflow
    - Identificatie van de 3 grootste automatiseringskansen
    - Concrete voorbeelden uit jouw sector
    - Duidelijke ROI-schatting vooraf
    - Vrijblijvend, geen verplichtingen

Stap 2: "Bouw & Integratie" (2-4 weken)
  Icon: Gear/Build
  "We bouwen AI-systemen op maat. Ze integreren naadloos met je
   bestaande tools - CRM, e-mail, agenda, facturatie."

  Uitklapbaar:
    - AI-agents die 24/7 op de achtergrond werken
    - Koppeling met je bestaande software (geen nieuw systeem)
    - Je workflow blijft ongewijzigd - alles werkt like magic
    - Feedback-momenten zodat je altijd controle houdt

Stap 3: "Resultaat & Optimalisatie" (doorlopend)
  Icon: TrendingUp/Chart
  "Je systeem draait. Wij monitoren, optimaliseren, en schalen
   mee naarmate je bedrijf groeit."

  Uitklapbaar:
    - Human-in-the-loop waar nodig
    - Real-time dashboard van je processen
    - Continue optimalisatie op basis van data
    - Schaal op zonder extra personeel
    - GDPR-compliant & veilige verbindingen

Elke stap: Geanimeerde SVG illustratie (stijl van UseCasesSection)
```

#### Sectie 4: Bezwaar-handling - "Maar..."
```
Layout: Accordion of FAQ-stijl (hergebruik Radix Accordion)
Achtergrond: Licht verschil (#FDFBF7 naar wit)

Heading: "Je twijfelt misschien over..."

Items:
  "Is dit niet te complex voor mijn bedrijf?"
  -> "Wij doen het technische werk. Jij blijft ondernemer."

  "Wat als mijn team er niet mee kan werken?"
  -> "Je workflow verandert niet. De AI werkt op de achtergrond."

  "Kost dit niet een fortuin?"
  -> "Een AI-systeem kost een fractie van een extra medewerker.
      En het werkt 24/7."

  "Hoe lang duurt het voordat ik resultaat zie?"
  -> "Gemiddeld 2-4 weken van gesprek tot werkend systeem."

  "Wat als het niet werkt voor mijn sector?"
  -> "We beginnen altijd met een analyse. Geen resultaat = geen kosten."
```

**Waarom:** Script 3 zegt "Geen technische kennis nodig." Bezwaar-handling op de page voorkomt dat twijfelaars afhaken. Elke bezwaar-respons herhaalt kernboodschappen uit de scripts.

#### Sectie 5: Vergelijking - Medewerker vs AI
```
Layout: Vergelijkingstabel (visueel, niet saaie tabel)

"Een extra medewerker" vs "Een AI-systeem"
  Kosten: ~EUR50.000/jaar vs ~EUR500/maand
  Beschikbaarheid: 8u/dag, 5d/week vs 24/7, 365 dagen
  Vakantie: 4 weken/jaar vs Nooit
  Ziekteverzuim: Gemiddeld 10 dagen vs Nooit
  Opstarttijd: 3-6 maanden vs 2-4 weken
  Schaalbaar: Nieuwe vacature nodig vs Knop omzetten

Stijl: Twee kolommen, links subtiel rood/grijs, rechts navy/goud accent
Animatie: Rijen verschijnen staggered bij scroll
```

**Waarom:** Script 3 benoemt dit exact: "nooit ziek, nooit vakantie, 24/7, fractie van de kosten." De vergelijkingstabel maakt dit visueel en concreet.

#### Sectie 6: CTA
```
Zelfde stijl als LP1 finale CTA, maar met aangepaste tekst:

  Heading: "Benieuwd wat AI echt voor jouw bedrijf kan doen?"
  CTA: "Plan je gratis AI Readiness Scan"
  Vertrouwenssignalen: Vrijblijvend | 30 minuten | Concrete aanbevelingen
```

---

## 4. LP3: Conversion - "ROI Calculator"

### Meta
- **URL**: `/roi-calculator`
- **Doel**: Hot traffic converteren met concrete cijfers en urgentie
- **Traffic bron**: Script 10 (Jouw Concurrent Automatiseert Al), Laatste Script (schaarste)
- **KPI**: Calculator completions, Calendly-bookings

### Marketing Optimalisatie

**Cruciaal: Dit publiek voelt al urgentie.** Ze hebben Script 10 gezien ("Je concurrent antwoordt sneller") of het Laatste Script ("nog 3 spots over"). Ze moeten NU boeken. Geen educatie meer - pure conversie.

**Framework: Urgentie + Concrete ROI + Schaarste**

### Sectie-voor-sectie Plan

#### Sectie 1: Hero (korter dan andere pages - 70vh)
```
GEEN typewriter hier - directe impact

Headline (font-newsreader, groot):
  "Wat kost jouw administratie je echt?"

Subtekst:
  "De gemiddelde KMO-ondernemer verliest EUR 45.000 per jaar aan
   taken die geautomatiseerd kunnen worden. Bereken jouw cijfer."

Visueel: Pijl naar beneden of scroll-indicator naar calculator
Achtergrond: Donkerder dan andere pages - meer contrast/urgentie
Logo carousel: Versneld (snellere animatie = meer energie/urgentie)
```

**Waarom:** Hot traffic wil geen verhaal. Ze willen cijfers en actie. Directe headline, geen typewriter (te langzaam voor dit publiek).

#### Sectie 2: Interactieve ROI Calculator
```
Layout: Grote gecentreerde card, premium feel
Stijl: Witte card met glow-effect, rounded-3xl

INPUTS (met defaults uit Script):

  Slider 1: "Uren administratie per week"
    Range: 5 - 40 uur
    Default: 10 uur
    Stijl: Custom slider met navy track, goud thumb

  Slider 2: "Jouw uurwaarde (of die van je team)"
    Range: EUR 30 - EUR 150
    Default: EUR 60

  Slider 3: "Aantal teamleden dat admin doet"
    Range: 1 - 10
    Default: 2

OUTPUTS (real-time, geanimeerd):

  Groot cijfer met teller-animatie:

  "Jouw administratie kost je:"
  EUR [berekend] per maand     -> bijv. EUR 5.200
  EUR [berekend] per jaar      -> bijv. EUR 62.400

  "Met AI-automatisering bespaar je:"
  EUR [70% van jaarlijks] per jaar  -> bijv. EUR 43.680
  [berekend] uur per week            -> bijv. 14 uur

  "Return on Investment:"
  [maanden tot ROI] maanden          -> bijv. "< 2 maanden"

  Visueel: Circulaire voortgangsbalk of barchart die meebeweegt met sliders
  Kleuren: Kosten in rood/oranje, besparing in navy/goud

CTA onder calculator:
  "Wil je deze besparing realiseren?"
  [Calendar] "Plan je gratis gesprek" [Arrow]

  Micro-tekst: "Gemiddeld boeken bezoekers van deze pagina binnen 24 uur"
```

**Waarom:** Interactiviteit verhoogt engagement. Personalisatie ("jouw cijfer") creert ownership. Default waardes komen uit de scripts (10u/week, EUR 60/u). Real-time output creert een "wow"-moment.

#### Sectie 3: Competitieve Druk - "Je concurrent automatiseert al"
```
Layout: Donkere sectie (navy achtergrond of donker gradient)
Contrast met rest van de pagina

Heading (wit):
  "Terwijl jij twijfelt, automatiseert je concurrent"

3 punten (iconen + tekst):
  1. [Zap icon] "De snelste offerte wint. Niet de beste. De snelste."
  2. [TrendingUp] "60% van de KMO's automatiseert in 2025. Waar sta jij?"
  3. [UserMinus] "Die concurrent die altijd sneller offreert? Hij werkt niet harder."

Stijl: Wit tekst op navy, goud accenten op iconen
```

**Waarom:** Directe echo van Script 10: "Je concurrent antwoordt sneller... hij werkt slimmer." FOMO is de sterkste conversie-driver voor dit publiek.

#### Sectie 4: "De kost van niks doen"
```
Layout: Simpele vergelijking, visueel impactvol

Links: "Als je niets doet"
  - EUR [jaarkosten] per jaar aan admin
  - [uren] uur per week verloren
  - Leads die weglopen door trage opvolging
  - Concurrent die marktaandeel pakt

Rechts: "Als je vandaag start"
  - EUR [besparing] besparing in jaar 1
  - [uren teruggewonnen] extra uren per week
  - Automatische opvolging = geen gemiste leads
  - Voorsprong op concurrentie

Visueel: Rode/grijze tint links, navy/goud rechts
Animatie: Slide-in van beide kanten bij scroll
```

#### Sectie 5: Urgentie + CTA
```
Achtergrond: Subtiele urgentie-indicatoren

Als schaarste-boodschap (van Laatste Script):
  Banner: "We nemen per maand maximaal 5 nieuwe projecten aan"
  Of: "Nog [X] spots beschikbaar deze maand"

  Stijl: Goud achtergrond (#F7E69B), navy tekst, subtiele puls-animatie

CTA Card (zelfde stijl als LP1):
  Heading: "Klaar om je besparing te realiseren?"
  Subtekst: "Plan vandaag nog je gesprek. Hoe eerder je start,
             hoe eerder je profiteert."
  CTA: [Calendar] "Book je gesprek NU" [Arrow]

  Trust: Vrijblijvend | Concrete ROI-berekening | Resultaat in 4 weken
```

---

## 5. LP4: Direct Booking - "Plan Je Gesprek"

### Meta
- **URL**: `/plan-gesprek`
- **Doel**: Minimale frictie booking voor alle retargeting en warme traffic
- **Traffic bron**: Script 11 (60 Seconden), retargeting, alle CTA's van andere pages
- **KPI**: Booking completion rate

### Marketing Optimalisatie

**Cruciaal: NIKS dat afleidt.** Dit is de final conversion page. Elke pixel die niet bijdraagt aan het boeken van een gesprek moet weg. Think: checkout page van een webshop.

**Framework: Minimale frictie + vertrouwenssignalen**

### Sectie-voor-sectie Plan

#### Volledige Page (geen scroll nodig)
```
Layout: Simpel, single-screen, alles zichtbaar
GEEN hero carousel (te afleidend)
GEEN typewriter (te langzaam)

Achtergrond: Schone #FDFBF7

Navigatie: Alleen Finit logo (clickable naar homepage) + geen menu

Inhoud (gecentreerd):

  Heading (font-newsreader, groot):
    "Plan je gratis gesprek"

  Subtekst:
    "30 minuten die je bedrijf kunnen veranderen"

  Calendly Embed Widget:
    - Inline Calendly widget (niet popup, niet link)
    - Embedded direct op de pagina
    - Stijl: Rond de widget een subtiele card met border
    - Calendly URL: https://calendly.com/karel-finitsolutions/kennismaking-finit-solutions

  Onder de widget - "Wat je krijgt in dit gesprek":
    [Check] Analyse van je huidige processen
    [Check] Identificatie van automatiseringskansen
    [Check] Concrete ROI-schatting
    [Check] Geen verplichtingen, geen verkooppraatje

  Vertrouwenssignalen (klein, onderaan):
    "30+ bedrijven geholpen | Gemiddeld 15 uur/week bespaard | 4.9/5 klanttevredenheid"
```

**Waarom:** Script 11 is 15 seconden. Die kijkers zijn al geprimed. Ze hoeven alleen nog te boeken. Elke extra sectie is een risico dat ze afhaken. Embedded Calendly (niet een link die een nieuw tabblad opent) minimaliseert frictie.

---

## 6. LP5: Niche - "Voor Installateurs"

### Meta
- **URL**: `/voor-installateurs`
- **Doel**: Specifieke targeting van trades/installatie-sector
- **Traffic bron**: Script 6 (Oproep Aan Installateurs)
- **KPI**: Calendly-bookings
- **Repliceerbaar voor**: `/voor-elektriciens`, `/voor-loodgieters`, `/voor-energiebedrijven`

### Marketing Optimalisatie

**Cruciaal: Ultra-specifiek.** Als een installateur op deze pagina landt en het gevoel heeft "dit is gemaakt voor MIJ", is de conversie veel hoger dan een generieke page. Script 6 is al ultra-niche - de page moet dat matchen.

**Framework: Niche Identification + Sector-specifieke PAS**

### Sectie-voor-sectie Plan

#### Sectie 1: Hero (100vh)
```
Typewriter phrases (niche-specifiek):
  - "gemiste oproepen"
  - "offerte-achterstand"
  - "planningschaos"
  - "klantopvolging"
  - "administratie na werkuren"
  - "heen-en-weer gebel"

Headline:
  "Installateurs, stop met [typewriter]"

  OF: "Op klus. Telefoon gaat. Klant kwijt."
  (Directe echo van Script 6 hook)

Subtekst:
  "AI-systemen die je offertes automatiseren, klanten laten
   inplannen en opvolging regelen. Terwijl jij op locatie bent."

CTA: [Calendar] "Check wat mogelijk is voor jouw bedrijf" [Arrow]

Logo carousel: Behouden, maar met focus op relevante integraties
(agenda-tools, facturatiesoftware, CRM's die installateurs gebruiken)
```

**Waarom:** Script 6 opent met "Oproep aan alle installateurs, loodgieters en elektriciens." De hero moet dat EXACT spiegelen. De typewriter-phrases zijn allemaal sector-specifiek.

#### Sectie 2: "Herken je dit?" - Sector-specifieke pijnen
```
Layout: Storytelling format (niet grid, maar flow)

"Je bent op locatie bij een klant.
 Je telefoon blijft rinkelen.
 Mails blijven binnenkomen.
 Je reageert te laat.

 De klant die je niet kon helpen?
 Die stapt naar je concurrent."

Visueel: Tekst die regel voor regel verschijnt bij scrollen
(GSAP ScrollTrigger, zelfde stijl als site)
Elk zinnetje: fade + slide-up animatie

Na de story, overgang naar:
"Het hoeft niet zo te zijn."
```

**Waarom:** Dit is een directe copy van Script 6. Het storytelling-format (in plaats van bullet points) werkt beter voor een ambachtelijk publiek. Ze herkennen hun dagelijks leven, niet een abstract probleem.

#### Sectie 3: Sector-specifieke Oplossingen
```
Layout: 3 cards horizontaal (hergebruik card-stijl)

Card 1: "Automatische Offertes"
  Icon: FileText/Document
  "Klant vraagt een offerte? Het systeem maakt hem direct aan
   op basis van je standaardprijzen. Verstuurd binnen minuten."

Card 2: "Klanten Plannen Zelf In"
  Icon: CalendarCheck
  "Geen heen-en-weer gebel meer. Klanten kiezen zelf een
   beschikbaar tijdslot. Je agenda wordt automatisch bijgewerkt."

Card 3: "Opvolging Op Autopilot"
  Icon: RefreshCw/Repeat
  "Na elke klus: automatische feedback-vraag, factuur, en
   herinnering voor onderhoud. Zonder dat jij er aan denkt."

Animatie: Cards schuiven in van links (staggered)
Verbindingslijnen tussen cards (zelfde stijl als HowItWorks)
```

#### Sectie 4: Case Study (sector-specifiek)
```
Layout: Donkere card (navy achtergrond)
Of: Goud-accent card (#F7E69B/10 achtergrond)

"[Naam], installateur in [regio]"

Before:
  "25 uur admin per week"
  "Gemiddeld 3 dagen voor een offerte"
  "30% van leads viel weg door trage opvolging"

After:
  "8 uur admin per week"
  "Offertes binnen 2 uur"
  "Geen leads meer verloren"

Quote: "Ik ben installateur geworden om te installeren.
        Niet om achter een bureau te zitten."

Als er geen echte case study is: gebruik realistische maar
duidelijk gemarkeerde voorbeeldcijfers ("Voorbeeld op basis van
gemiddelde klantresultaten")
```

#### Sectie 5: Concurrentie-angle
```
Heading: "Die concurrent die altijd sneller offreert?"

Tekst: "Hij werkt niet harder. Hij werkt slimmer.
        AI doet zijn opvolging, zijn planning en zijn administratie.
        Terwijl hij gewoon aan het werk is."

Dit is een directe kopie van Script 6 en 10.
```

#### Sectie 6: CTA
```
Heading: "Wil je weten wat mogelijk is voor jouw installatiebedrijf?"
CTA: [Calendar] "Plan een gratis kennismaking" [Arrow]
Trust: Vrijblijvend | Specifiek voor installateurs | Resultaat in 4 weken

Extra: "Of bel direct: [telefoonnummer]"
(Installateurs bellen liever dan online formulieren invullen)
```

### Replicatie-strategie
```
De page wordt gebouwd als template met variabelen:
  - sectorNaam: "installateurs" / "elektriciens" / "loodgieters"
  - typewriterPhrases: sector-specifieke array
  - pijnpunten: sector-specifieke items
  - caseStudy: sector-specifieke data

Technisch: Eén component met props, meerdere routes die
dezelfde component renderen met andere data.
```

---

## 7. LP6: AI Readiness Scan Info

### Meta
- **URL**: `/ai-readiness-scan`
- **Doel**: Drempel verlagen voor twijfelaars - uitleggen wat de scan inhoudt
- **Traffic bron**: CTA's van LP2 (Consideration), organisch verkeer
- **KPI**: Doorkliks naar Calendly

### Sectie-voor-sectie Plan

#### Sectie 1: Hero (70vh - korter)
```
GEEN typewriter (dit is een info-page, niet emotioneel)

Heading: "Gratis AI Readiness Scan"
Subtekst: "In 30 minuten weet je precies waar AI jouw bedrijf kan versterken"

Visueel: Subtiele checklist-illustratie of scan-icoon
Logo carousel: Behouden (laat zien met welke tools het integreert)
```

#### Sectie 2: "Wat is de AI Readiness Scan?"
```
Layout: Tekst + visueel naast elkaar

"Een vrijblijvend gesprek van 30 minuten waarin we jouw
bedrijfsprocessen doorlichten. We identificeren waar AI
het meeste impact kan hebben en geven je een concreet
actieplan mee."

Geen technische kennis nodig. Geen verplichtingen.
```

#### Sectie 3: "Wat je krijgt" - 5 Deliverables
```
Layout: 5 items verticaal met nummering (stijl: HowItWorks cards)

1. Procesanalyse
   "Overzicht van je huidige workflows en waar tijd verloren gaat"

2. Automatiseringskansen
   "Top 3 processen die het meest opleveren om te automatiseren"

3. ROI-schatting
   "Concrete berekening van de potentiele besparing in uren en euro's"

4. Implementatieplan
   "Stappenplan met tijdlijn en prioriteiten"

5. Tool-advies
   "Welke tools en integraties het beste passen bij jouw situatie"

Elk item: Icon links, tekst rechts, subtiele divider ertussen
```

#### Sectie 4: "Hoe het werkt"
```
Tijdlijn (verticaal):

  [Vandaag] Je plant een gesprek in (2 minuten)
  [Dag van gesprek] We lichten je processen door (30 min)
  [Binnen 48 uur] Je ontvangt je persoonlijke scan-rapport
  [Jouw keuze] Ga door met implementatie, of niet - geen druk

Stijl: Verticale lijn met dots (navy), tekst ernaast
Animatie: Dots vullen zich bij scroll
```

#### Sectie 5: Bezwaar-preemptie + CTA
```
3 veelgestelde vragen (inline, niet accordion):

  "Moet ik iets voorbereiden?"
  -> "Nee. Een open gesprek is voldoende."

  "Wordt er iets verkocht?"
  -> "Nee. De scan is 100% vrijblijvend."

  "Hoe snel zie ik resultaat als ik doorga?"
  -> "Gemiddeld 2-4 weken van start tot werkend systeem."

CTA:
  Heading: "Plan je gratis AI Readiness Scan"
  [Calendar] "Kies een moment" [Arrow]
```

---

## 8. LP7: Case Studies / Succesverhalen

### Meta
- **URL**: `/succesverhalen`
- **Doel**: Social proof voor twijfelaars in consideration-fase
- **Traffic bron**: Links vanuit andere LP's, organisch
- **KPI**: Doorkliks naar Calendly vanuit case studies

### Sectie-voor-sectie Plan

#### Sectie 1: Hero (50vh - compact)
```
Heading: "Wat AI voor anderen heeft gedaan"
Subtekst: "Echte resultaten. Echte bedrijven. Echte besparingen."
GEEN carousel (focus op de verhalen, niet op animaties)
```

#### Sectie 2: Case Study Cards
```
Layout: Gestapelde cards (max 3-5)
Per case study:

Card layout:
  [Sector badge] bijv. "Installatie" / "Bouw" / "Dienstverlening"

  Heading: Bedrijfsnaam of "[Type bedrijf] in [regio]"

  3-kolom stats:
    Before: "25u admin/week"
    After: "8u admin/week"
    Resultaat: "68% tijdsbesparing"

  Korte beschrijving (2-3 zinnen):
    "Dit installatiebedrijf uit Antwerpen verloor dagelijks
     klanten door trage opvolging. Na implementatie van
     AI-gestuurde offerte-automatisering..."

  Quote (font-newsreader, italic):
    "Ik heb nu eindelijk tijd om te doen waarvoor ik
     ondernemer ben geworden."

  Foto (als beschikbaar)

  CTA per card: "Vergelijkbare resultaten? Plan een gesprek"

Stijl: Witte cards, navy accenten, goud highlights op key cijfers
```

#### Sectie 3: Samenvatting + CTA
```
"Gemiddelde resultaten van onze klanten:"
  [Counter] 70% minder administratietijd
  [Counter] 3x snellere offerte-doorlooptijd
  [Counter] < 2 maanden ROI

CTA: "Jouw bedrijf kan dit ook"
[Calendar] "Plan je gratis gesprek" [Arrow]
```

---

## 9. LP8: Thank You Page

### Meta
- **URL**: `/bedankt`
- **Doel**: Bevestiging na booking + verwachtingsmanagement
- **Traffic bron**: Redirect na Calendly-booking
- **KPI**: No-show rate (lager = beter)

### Sectie-voor-sectie Plan

#### Volledige Page (single screen)
```
Layout: Gecentreerd, clean, positieve energie

[Animated checkmark] (SVG animatie, draw-in stijl)

Heading: "Top! Je gesprek is ingepland"

Subtekst:
  "Je ontvangt een bevestiging per e-mail met alle details."

Sectie: "Wat nu?"
  Tijdlijn (3 stappen):

  1. [Mail icon] "Check je inbox"
     "Je krijgt een bevestigingsmail met de link voor het gesprek"

  2. [Brain icon] "Denk alvast na over..."
     "Welke taken kosten jou en je team de meeste tijd?
      Waar lopen dingen vast of gaan ze te traag?
      Welke tools gebruik je al (CRM, e-mail, facturatie)?"

  3. [Video icon] "We zien je bij het gesprek"
     "30 minuten, vrijblijvend. We doen het zware denkwerk."

Onderaan:
  "Moet je je afspraak wijzigen?"
  Link: [Calendly reschedule link]

  "Vragen in de tussentijd?"
  Link: [Email of WhatsApp]

TRACKING:
  - Conversion pixel fires hier (Meta, Google Ads)
  - Custom event: "booking_completed"
  - Retargeting: uitsluiten uit "nog niet gebooked" audiences
  - Toevoegen aan "gebooked maar nog niet geweest" audience
```

---

## 10. LP9: FAQ / Veelgestelde Vragen

### Meta
- **URL**: `/veelgestelde-vragen`
- **Doel**: Bezwaren wegnemen voor twijfelaars
- **Traffic bron**: Links vanuit andere pages, organisch
- **KPI**: Scroll depth, doorkliks naar Calendly

### Sectie-voor-sectie Plan

#### Sectie 1: Hero (40vh - compact)
```
Heading: "Veelgestelde Vragen"
Subtekst: "Alles wat je wilt weten over AI-automatisering voor je bedrijf"
```

#### Sectie 2: FAQ Accordion
```
Hergebruik: Radix Accordion stijl van huidige FAQSection
Stijl: Identiek aan bestaande site

Categorieeen met vragen:

--- OVER AI AUTOMATISERING ---

Q: "Is dit geschikt voor mijn sector?"
A: "We werken met bedrijven in uiteenlopende sectoren: installatie,
    bouw, dienstverlening, retail, en meer. De principes van
    automatisering zijn universeel - de implementatie passen we aan
    op jouw specifieke processen."

Q: "Moet ik technisch zijn?"
A: "Absoluut niet. Wij doen al het technische werk. Jij vertelt
    ons wat je nodig hebt, wij bouwen het. Je hoeft geen enkele
    regel code te begrijpen."

Q: "Is dit hetzelfde als ChatGPT gebruiken?"
A: "Nee. ChatGPT is een chatbot. Wij bouwen geautomatiseerde
    systemen die specifieke taken in je bedrijf overnemen -
    offertes maken, afspraken plannen, facturen versturen,
    leads opvolgen. Volledig op maat, volledig geintegreerd."

--- OVER KOSTEN & ROI ---

Q: "Wat kost het?"
A: "De investering hangt af van de complexiteit en het aantal
    processen. Gemiddeld ligt het tussen EUR 500-2000/maand - een
    fractie van wat een extra medewerker kost. We geven altijd
    vooraf een duidelijke ROI-berekening."

Q: "Hoe snel verdien ik het terug?"
A: "De meeste klanten zien ROI binnen 2 maanden. Dat komt omdat
    de besparing in tijd (en dus geld) direct merkbaar is vanaf
    dag een."

Q: "Wat als het niet werkt?"
A: "We beginnen altijd met een gratis analyse. Als wij niet
    overtuigd zijn dat AI waarde toevoegt voor jouw bedrijf,
    zeggen we dat eerlijk. Geen resultaat = geen kosten."

--- OVER IMPLEMENTATIE ---

Q: "Hoe lang duurt de implementatie?"
A: "Gemiddeld 2-4 weken van eerste gesprek tot werkend systeem.
    Voor complexere projecten kan het langer duren, maar je ziet
    altijd snel de eerste resultaten."

Q: "Moet ik mijn huidige tools vervangen?"
A: "Nee. Onze systemen integreren naadloos met je bestaande
    software - CRM, e-mail, agenda, facturatie. Je workflow
    verandert niet, het wordt alleen slimmer."

Q: "Wat als ik wil opschalen?"
A: "Dat is precies het voordeel van AI: opschalen kost geen
    extra personeel. Meer klanten? Het systeem groeit mee.
    Zonder extra kosten, zonder extra management."

--- OVER PRIVACY & VEILIGHEID ---

Q: "Is mijn data veilig?"
A: "Absoluut. Alle systemen zijn GDPR-compliant met beveiligde
    verbindingen. Je data wordt nooit gedeeld met derden."

Q: "Wie heeft toegang tot mijn bedrijfsdata?"
A: "Alleen jij en je team. Wij hebben tijdens de implementatie
    toegang waar nodig, maar na oplevering is alles van jou."

Elke 3-4 vragen: Inline CTA
  "Vraag niet beantwoord? Plan een gesprek en we leggen het uit."
  [Calendar] "Stel je vraag persoonlijk" [Arrow]
```

#### Sectie 3: CTA (onderaan)
```
Heading: "Nog vragen? Of klaar om te starten?"
Subtekst: "Plan een vrijblijvend gesprek. We beantwoorden al je vragen."
CTA: [Calendar] "Plan je gratis gesprek" [Arrow]
```

---

## 11. Script-naar-Page Routeringsmatrix

### Primaire Routes (directe traffic van ads)

| Script | Hook Thema | Landing Page | Waarom |
|--------|-----------|--------------|--------|
| Script 1: Admin Tijdvreter | "Hoeveel uur admin per week?" | LP1: `/herken-jij-dit` | Pijn → herkenning → actie |
| Script 2: Groeien Zonder Personeel | "Meer klanten = meer personeel?" | LP1: `/herken-jij-dit` | Zelfde funnel, andere ingang |
| Script 3: AI Is Niet Wat Je Denkt | "AI ≠ ChatGPT" | LP2: `/hoe-het-werkt` | Educatie nodig, sceptisch publiek |
| Script 5: Partnership Frame | "Elke dag dezelfde strijd" | LP1: `/herken-jij-dit` | Pijn-herkenning + partnership |
| Script 6: Oproep Installateurs | "Op locatie, telefoon rinkelt" | LP5: `/voor-installateurs` | Niche-specifieke boodschap |
| Script 10: Concurrent Automatiseert | "Je concurrent is sneller" | LP3: `/roi-calculator` | Urgentie + concrete cijfers |
| Script 11: 60 Seconden | "Stop met copy-pasten" | LP4: `/plan-gesprek` | Snelle actie, minimale frictie |
| Laatste Script: Schaarste | "Nog 3 spots over" | LP3: `/roi-calculator` | Urgentie + schaarste |

### Secundaire Routes (intern verkeer)

| Van | Naar | Trigger |
|-----|------|---------|
| LP1 (Awareness) | LP2 (How it works) | "Meer weten over hoe het werkt?" link |
| LP1 (Awareness) | LP4 (Booking) | Hoofd-CTA |
| LP2 (Consideration) | LP6 (AI Scan) | CTA: "Plan je AI Readiness Scan" |
| LP2 (Consideration) | LP4 (Booking) | Hoofd-CTA |
| LP3 (ROI Calculator) | LP4 (Booking) | CTA na calculator |
| LP5 (Installateurs) | LP4 (Booking) | Hoofd-CTA |
| LP7 (Case Studies) | LP4 (Booking) | CTA per case study |
| LP9 (FAQ) | LP4 (Booking) | CTA's inline en onderaan |
| LP4 (Booking) | LP8 (Thank You) | Na Calendly-booking |

### UTM Tracking Structuur

```
Elke ad-link moet UTM parameters bevatten:

Script 1 → LP1:
  ?utm_source=meta&utm_medium=video&utm_campaign=admin-tijdvreter&utm_content=script1

Script 6 → LP5:
  ?utm_source=meta&utm_medium=video&utm_campaign=installateurs&utm_content=script6

Script 10 → LP3:
  ?utm_source=meta&utm_medium=video&utm_campaign=concurrent-automatiseert&utm_content=script10

Dit maakt het mogelijk om in analytics exact te zien:
  - Welk script het beste converteert
  - Welke LP het beste presteert
  - Waar bezoekers afhaken in de funnel
```

---

## Implementatie Volgorde

### Fase 1 - Core (Week 1-2)
1. **LP4: Direct Booking** (`/plan-gesprek`) - Simpelst, hoogste directe impact
2. **LP1: Awareness** (`/herken-jij-dit`) - Meeste traffic bron
3. **LP8: Thank You** (`/bedankt`) - Nodig voor conversie-tracking

### Fase 2 - Conversion (Week 2-3)
4. **LP3: ROI Calculator** (`/roi-calculator`) - Hoogste conversie-potentieel
5. **LP2: Consideration** (`/hoe-het-werkt`) - Belangrijk voor warm traffic

### Fase 3 - Niche & Social Proof (Week 3-4)
6. **LP5: Installateurs** (`/voor-installateurs`) - Niche targeting
7. **LP7: Case Studies** (`/succesverhalen`) - Social proof

### Fase 4 - Completion (Week 4+)
8. **LP6: AI Readiness Scan** (`/ai-readiness-scan`) - Supporting content
9. **LP9: FAQ** (`/veelgestelde-vragen`) - Bezwaar-handling

---

## Technische Notities

### Gedeelde Component Library (`components/landing/`)
```
components/landing/
  LandingLayout.tsx       - Wrapper met lichtgewicht nav
  LandingHero.tsx         - Hero met typewriter + carousel (configureerbaar)
  LandingNav.tsx          - Alleen logo + CTA
  SocialProofStrip.tsx    - Cijfers + testimonials
  PainPointGrid.tsx       - Herkenbare pijnen grid
  BenefitCards.tsx        - Oplossingskaarten
  ComparisonSection.tsx   - Before/After of vergelijking
  ROICalculator.tsx       - Interactieve calculator
  CTASection.tsx          - Herbruikbare CTA-blok
  StickyMobileCTA.tsx     - Vaste mobiele CTA-balk
  FAQAccordion.tsx        - Hergebruik Radix accordion
  ThankYouContent.tsx     - Bedankt-pagina inhoud
```

### Analytics & Tracking
```
Elke LP moet volgende events tracken (via bestaande pushDataLayerEvent):
  - page_view (met LP identifier)
  - scroll_depth (25%, 50%, 75%, 100%)
  - cta_click (met positie: hero, mid, footer)
  - calculator_interaction (alleen LP3)
  - calendly_booking_started
  - calendly_booking_completed (via thank you page)
```

### A/B Test Mogelijkheden
```
Per LP kunnen we testen:
  - Typewriter phrases (welke woorden converteren het best?)
  - Headline varianten (vraag vs statement)
  - CTA tekst ("Plan een gesprek" vs "Ontdek je besparing")
  - Hero met/zonder calculator-preview
  - Social proof positie (boven of onder fold)
```
