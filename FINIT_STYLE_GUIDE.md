# Finit Solutions — Landing Page Style, Copy & Conversion Guide

Use this document as the single source of truth when building or redesigning any Finit Solutions landing page. It captures every design decision from the homepage (`components/ai-design-landing.tsx`) plus the copywriting principles from `vikingbeast-analyse.md`.

---

## QUICK REFERENCE

| Property | Value |
|---|---|
| **Primary Color** | `#1A2D63` (Oxford Navy) |
| **Background** | `#FDFBF7` (Porcelain White) |
| **Secondary Text** | `#475D8F` (Slate Blue) |
| **Hover State** | `#2A4488` (Navy Hover) |
| **Glow/Selection** | `#B8C5E6` (Soft Blue) |
| **Divider Accent** | `#7B8DB5` (Slate) |
| **Heading Font** | Newsreader (serif) |
| **Body Font** | Instrument Sans (sans-serif) |
| **Card Radius** | `rounded-3xl` (large), `rounded-2xl` (small) |
| **Button Radius** | `rounded-full` (always) |
| **Card Shadow** | Custom multi-layer navy (see Section 4) |
| **Max Content Width** | `max-w-[800px]` text, `max-w-[1100px]` cards, `max-w-[1400px]` nav/footer |
| **Primary CTA Pattern** | Calendar icon + text + ArrowRight, navy pill |
| **Animation** | GSAP + IntersectionObserver entrance animations |
| **Selection Color** | `selection:bg-[#B8C5E6] selection:text-[#1A2D63]` |

---

## 1. COLOR PALETTE

### 1.1 Core Colors

| Name | Hex | RGB | Usage |
|---|---|---|---|
| Oxford Navy | `#1A2D63` | 26, 45, 99 | Primary text, headings, CTAs, footer bg |
| Porcelain White | `#FDFBF7` | 253, 251, 247 | Page background, section backgrounds |
| Pure White | `#FFFFFF` | 255, 255, 255 | Cards, CTA text on navy |
| Slate Blue | `#475D8F` | 71, 93, 143 | Hero subtitle, secondary text |
| Navy Hover | `#2A4488` | 42, 68, 136 | Button hover states |
| Soft Blue | `#B8C5E6` | 184, 197, 230 | Selection highlight, glow effects |
| Slate | `#7B8DB5` | 123, 141, 181 | Section divider accent |

### 1.2 Opacity Scale (Oxford Navy `#1A2D63`)

```
/[0.06]  — Ultra-subtle card borders
/[0.07]  — Pill tag backgrounds (company type carousel)
/[0.08]  — Divider lines, subtle borders
/10      — Card borders, nav border on scroll, hover backgrounds
/15      — Decorative SVG underline strokes
/[0.18]  — Watermark numbers (step 01)
/[0.22]  — Watermark numbers (step 02)
/[0.28]  — Watermark numbers (step 03)
/25      — Icon container borders
/30      — Chevron arrows in mobile menu
/40      — Muted icon fills, footer copyright text
/50      — Labels, captions, subtitle text, icon colors
/60      — Section subtitles, inactive nav links, body subtext
/65      — Card description text, company type labels
/70      — Hero value bullets, footer body text
/75      — Card list item text
/85      — FAQ sub-headings inside answers
/100%    — Headings, primary buttons, active nav links
```

### 1.3 Footer Colors (on navy background)

```
text-white          — Headings
text-white/70       — Body text, contact info
text-white/60       — Footer bottom links, meta
text-white/40       — Copyright
border-white/10     — Divider lines, card borders
border-white/20     — Ghost button borders
bg-white/5          — Contact card background
hover:bg-white/5    — Ghost button hover
```

---

## 2. TYPOGRAPHY

### 2.1 Font Families

```css
@import url('https://fonts.googleapis.com/css2?family=Instrument+Sans:ital,wght@0,400;0,500;0,600;1,400&family=Newsreader:ital,opsz,wght@0,6..72,200;0,6..72,300;0,6..72,400;0,6..72,500;1,6..72,300;1,6..72,400&display=swap');

.font-newsreader { font-family: 'Newsreader', serif; }
.font-instrument { font-family: 'Instrument Sans', sans-serif; }
```

**Usage rules:**
- **Newsreader (serif)** — ALL headings (h1, h2, h3), watermark step numbers
- **Instrument Sans (sans-serif)** — Everything else: body, buttons, labels, nav, FAQ text. Applied via `font-instrument` on root `<div>`

### 2.2 Heading Sizes (responsive)

| Element | Default (mobile) | sm (640px) | md (768px) | lg (1024px) | xl (1280px) |
|---|---|---|---|---|---|
| **H1 (hero desktop)** | — | — | `text-5xl` (3rem) | `text-6xl` (3.75rem) | `text-[4.25rem]` |
| **H1 (hero mobile)** | `text-[2.5rem]` | `text-5xl` (3rem) | — | — | — |
| **H2 (section titles)** | `text-3xl` (1.875rem) | `text-4xl` (2.25rem) | `text-5xl` (3rem) | — | — |
| **H3 (card titles)** | `text-2xl` (1.5rem) | — | `text-3xl` (1.875rem) | — | — |
| **H3 (footer)** | `text-lg` (1.125rem) | — | — | — | — |

### 2.3 Body Text Sizes (responsive)

| Element | Default (mobile) | sm (640px) | md (768px) |
|---|---|---|---|
| Hero subtitle (desktop) | — | — | `text-lg` → lg:`text-xl` |
| Hero subtitle (mobile) | `text-base` | `text-[17px]` | — |
| Section subtitle | `text-lg` | — | `text-xl` |
| Card body / descriptions | `text-base` | — | `text-lg` |
| List items in process cards | `text-base` | — | `text-lg` |
| FAQ question (trigger) | `text-base` | `text-lg` | `text-xl` |
| FAQ answer content | `text-[15px]` | `text-base` | `text-[17px]` |
| FAQ sub-headings | `text-[15px]` | `text-base` | `text-[17px]` |
| Recognition items | `text-base` | — | `text-lg` |
| Hero value bullets (desktop) | — | — | `text-[15px]` |
| Hero value bullets (mobile) | `text-sm` | — | — |
| Nav links (desktop) | `text-base` | — | — |
| Nav CTA button | `text-sm` | — | — |
| Mobile nav CTA (inline) | `text-xs` | — | — |
| Mobile menu nav links | `text-lg` | — | — |
| Micro labels / category tags | `text-[11px]` – `text-[13px]` | — | — |
| Footer body text | `text-sm` | — | `text-base` – `text-lg` |
| Footer bottom links | `text-sm` | — | — |

### 2.4 Line Heights & Tracking

| Token | Value | Used On |
|---|---|---|
| `leading-[1.1]` | 1.1 | H1 (hero headings) |
| `leading-[1.15]` | 1.15 | H2 (section titles) |
| `leading-tight` | 1.25 | Footer heading |
| `leading-snug` | 1.375 | Recognition items |
| `leading-relaxed` | 1.625 | Hero subtitle, body text |
| `leading-[1.7]` | 1.7 | FAQ answer content |
| `tracking-tight` | -0.025em | H1 headings |
| `tracking-wider` | 0.05em | Uppercase labels |
| `tracking-[0.18em]` | 0.18em | Logo carousel label |

### 2.5 Font Weights

| Weight | Class | Usage |
|---|---|---|
| 200 (light) | `font-light` | Watermark step numbers (01, 02, 03) |
| 400 (regular) | default | Body text, headings (Newsreader default) |
| 500 (medium) | `font-medium` | Buttons, nav links, mobile menu items, labels, FAQ questions |
| 600 (semibold) | `font-semibold` | Process card H3 titles, FAQ sub-headings, footer card heading |

---

## 3. SPACING & LAYOUT

### 3.1 Page Root

```html
<div class="min-h-screen bg-[#FDFBF7] text-[#1A2D63] font-instrument
            selection:bg-[#B8C5E6] selection:text-[#1A2D63] overflow-x-hidden">
```

### 3.2 Section Padding (vertical)

| Section | Mobile (pt / pb) | Desktop md+ (pt / pb) |
|---|---|---|
| **Hero** | `pt-28 pb-6` | `pt-28 lg:pt-32 pb-8` |
| **Recognition** | `pt-0 pb-8` | `md:pt-2 md:pb-12` |
| **Company Carousel** | `pt-4 pb-6` | `md:pt-6 md:pb-8` |
| **Process** | `pt-8 pb-0` | `md:pt-12 md:pb-0` |
| **Use Cases** | `pt-8 pb-4` | `md:pt-12 md:pb-6` |
| **FAQ** | `pt-8 pb-8` | `md:pt-12 md:pb-10` |
| **Contact CTA** | `pt-6 pb-12` | `md:pt-8 md:pb-20` |
| **Footer** | `pt-0 pb-6` | `md:pt-0 md:pb-8` |

### 3.3 Section Padding (horizontal)

| Context | Mobile | Desktop |
|---|---|---|
| Most sections | `px-6` | `md:px-12` |
| Hero (desktop) | — | `px-4 sm:px-6 md:px-10 lg:px-12 xl:px-16` |
| Hero (mobile) | `px-4 sm:px-6` | — |
| FAQ | `px-4 sm:px-6` | `md:px-12` |
| Footer | `px-6` | `px-6` |
| Nav bar | `px-4 sm:px-6` | `px-4 sm:px-6` |

### 3.4 Content Max-Widths

| Token | Usage |
|---|---|
| `max-w-[800px]` | Recognition, FAQ, Contact CTA — text-heavy narrow sections |
| `max-w-[1100px]` | Process section (3-column card grid) |
| `max-w-[1400px]` | Nav bar, footer |
| `max-w-3xl` (48rem) | Hero desktop text block |
| `max-w-2xl` (42rem) | Hero subtitle |
| `max-w-xl` (36rem) | Section subtitles, CTA subtitles |
| `max-w-md` (28rem) | Footer subtitle |
| `max-w-4xl` (56rem) | Company carousel divider lines |
| `max-w-[22rem]` / `sm:max-w-[28rem]` | Hero mobile text block |

### 3.5 Grid Systems

```
Process cards:     grid grid-cols-1 md:grid-cols-3 gap-8
Footer:            grid gap-10 lg:gap-12 lg:grid-cols-[1.3fr_1fr]
Use case carousel: flex gap-6 overflow-x-auto (horizontal scroll, snap)
Recognition:       space-y-5 md:space-y-6 (vertical stack)
```

### 3.6 Common Gap & Spacing Tokens

| Token | Usage |
|---|---|
| `gap-2` – `gap-3` | Inside buttons, inline icon+text |
| `gap-4` – `gap-5` | Recognition items, icon-to-text |
| `gap-6` – `gap-8` | Between cards, section inner spacing |
| `gap-10` – `gap-12` | Footer grid, major layout spacing |
| `mb-4` – `mb-6` | After headings before body text |
| `mb-8` – `mb-10` | After heading blocks before content |
| `mt-8` – `mt-12` | CTA buttons below content |
| `space-y-3` – `space-y-6` | Vertical lists |

### 3.7 Section Dividers

Organic SVG wave dividers with three layers (fill, navy accent `#1A2D63`, slate accent `#7B8DB5`):
```
Height: h-[50px] md:h-[75px] lg:h-[100px]
```

Footer has a separate arch-shaped wave:
```
Height: h-16 md:h-20 lg:h-24
Footer top margin: mt-16 md:mt-20 lg:mt-24
```

---

## 4. CARDS

### 4.1 Standard Card Shadow (ALWAYS use this, never default Tailwind shadows)

```
shadow-[0_1px_0_0_rgba(26,45,99,0.1),0_4px_6px_-1px_rgba(26,45,99,0.15),0_10px_20px_-3px_rgba(26,45,99,0.2),0_20px_40px_-8px_rgba(26,45,99,0.15)]
```

This multi-layer navy shadow is used on: process cards, recognition items, use case carousel cards.

### 4.2 Process / Step Cards

```
rounded-3xl p-8 md:p-10 bg-white
+ standard card shadow (4.1)
```

Internal structure:
- Watermark number: `absolute -top-4 -left-2 md:-top-5 md:-left-3`, `font-newsreader text-6xl md:text-7xl font-light text-[#1A2D63]/[0.18-0.28]`
- Icon container: `w-10 h-10 rounded-2xl` with varying border/bg styles per step
- Step label: `text-xs md:text-sm font-medium text-[#1A2D63]/50 uppercase tracking-wider`
- H3: `text-2xl md:text-3xl font-semibold text-[#1A2D63] mb-4`
- List items: `flex items-start gap-2 text-base md:text-lg text-[#1A2D63]/75` with `Check` icons

### 4.3 Recognition Items

```
flex items-center gap-4 md:gap-5 bg-white rounded-2xl p-5 md:p-6
border border-[#1A2D63]/[0.06]
+ standard card shadow (4.1)
```

- Icon: `w-12 h-12 md:w-14 md:h-14`
- Text: `font-instrument text-base md:text-lg text-[#1A2D63] leading-snug`

### 4.4 Use Case Carousel Cards

```
flex-shrink-0 w-[72vw] sm:w-[52vw] md:w-[34vw] lg:w-[28vw]
snap-start rounded-3xl bg-white overflow-hidden
+ standard card shadow (4.1)
```

- Illustration area: `h-[220px] sm:h-[240px] md:h-[270px] bg-white p-5 md:p-6`
- Text area: `p-6 md:p-8`
- Category tag: `inline-block px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-wider text-[#1A2D63]/50 border border-[#1A2D63]/10 rounded-full mb-3`
- Title: `font-newsreader text-2xl md:text-3xl text-[#1A2D63] mb-2`
- Description: `text-[#1A2D63]/65 text-base md:text-lg leading-relaxed mb-5`

### 4.5 Contact CTA Card

```
bg-white p-8 md:p-12 rounded-3xl shadow-2xl border border-[#1A2D63]/10 text-center
```

Has a blurred glow behind it:
```
<div class="absolute inset-0 bg-[#B8C5E6] rounded-full blur-[120px] opacity-30" />
```

### 4.6 Footer Contact Card

```
bg-white/5 border border-white/10 rounded-2xl p-6 md:p-7
```

### 4.7 Company Type Pill (carousel)

```
flex items-center gap-2 shrink-0 bg-[#1A2D63]/[0.07] border border-[#1A2D63]/[0.08] rounded-full px-3 py-1
Icon: w-4 h-4 text-[#1A2D63]/40
Text: text-[13px] font-medium text-[#1A2D63]/65
```

### 4.8 Logo Card (integration carousel)

```
rounded-xl bg-white shadow-lg border border-[#1A2D63]/5 p-2.5
Desktop: 64px × 64px
Mobile: 48px × 48px
```

---

## 5. BUTTONS & CTAs

### 5.1 Primary CTA (hero, process, recognition sections)

```
group inline-flex items-center gap-2.5 bg-[#1A2D63] text-white
px-7 py-3.5 rounded-full text-base font-medium
hover:bg-[#2A4488] transition-colors shadow-lg shadow-[#1A2D63]/10
```

**Always** includes this icon pattern:
```jsx
<Calendar className="w-4 h-4" />
<span>Plan een kennismakingsgesprek</span>
<ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
```

### 5.2 Large CTA (contact section)

```
inline-flex items-center gap-2 md:gap-3 bg-[#1A2D63] text-white
px-6 py-3.5 md:px-10 md:py-5 rounded-full text-base md:text-lg font-medium
hover:scale-105 transition-transform shadow-2xl shadow-[#1A2D63]/20
```

### 5.3 Process Section CTA

```
group inline-flex items-center gap-3 bg-[#1A2D63] text-white
px-8 py-4 rounded-full text-[15px] font-medium
hover:bg-[#2A4488] transition-all duration-200
shadow-[0_4px_20px_-4px_rgba(26,45,99,0.4)]
```

### 5.4 Nav CTA (desktop)

```
hidden md:flex items-center gap-2 bg-[#1A2D63] text-white
rounded-full text-sm font-medium hover:scale-105 transition-all
shadow-lg shadow-[#1A2D63]/20
```

Padding is dynamic based on scroll progress:
```js
paddingLeft: `${20 + (1 - navScrollProgress) * 4}px`
paddingTop: `${10 + (1 - navScrollProgress) * 2}px`
```

### 5.5 Mobile Hero CTA (full-width)

```
group w-full bg-[#1A2D63] text-white px-6 py-3.5 rounded-full
text-[15px] font-medium flex items-center justify-center gap-2.5
hover:bg-[#2A4488] transition-colors shadow-lg shadow-[#1A2D63]/10
```

### 5.6 Footer CTA (inverted, on navy)

```
bg-white text-[#1A2D63] px-6 py-3 rounded-full text-base font-medium
hover:scale-105 transition-transform flex items-center justify-center gap-2
```

### 5.7 Ghost Button (footer email, on navy)

```
border border-white/20 px-6 py-3 rounded-full text-base font-medium
hover:bg-white/5 transition-colors flex items-center justify-center gap-2
```

### Button Rules Summary

- **Shape:** ALWAYS `rounded-full` (never rounded-lg or rounded-xl for buttons)
- **Icons:** Every CTA has `Calendar` (left) + `ArrowRight` (right)
- **Hover:** Either `hover:bg-[#2A4488]` (color change) OR `hover:scale-105` (scale up)
- **Shadow:** Always present, navy-tinted
- **Arrow animation:** `group-hover:translate-x-1 transition-transform`

---

## 6. NAVIGATION

### 6.1 Desktop Nav

```
Fixed top, z-40
Background: transparent → frosted glass on scroll
  rgba(253, 251, 247, ${0.82 * scrollProgress})
  backdropFilter: blur(${14 * scrollProgress}px)
  borderBottom: 1px solid rgba(26, 45, 99, ${0.1 * scrollProgress})
  transition: all 0.3s

Logo height: dynamic ${32 + (1-progress) * 14}px (desktop), ${24 + (1-progress) * 6}px (mobile)
Nav links: centered absolute left-1/2 -translate-x-1/2, text-base font-medium
Active link: text-[#1A2D63], Inactive: text-[#1A2D63]/60
```

### 6.2 Mobile Menu

```
Full-screen overlay: fixed inset-0 z-30, bg-[#FDFBF7]/95 backdrop-blur-xl
Hamburger: w-11 h-11, icon w-7 h-7

Structure (top to bottom):
  1. CTA button (full-width, same as primary CTA)
  2. Phone number: clickable tel: link, text-lg font-medium
     + "Bel ons op elk moment, ook buiten werkuren en in het weekend"
  3. Nav links: border-separated list with ChevronRight arrows
     text-lg font-medium, border-b border-[#1A2D63]/10
     Includes "Home" as first item (mobile only)
  4. Email: contact@finitsolutions.be at bottom
```

---

## 7. EFFECTS & TRANSITIONS

### 7.1 Noise Overlay

Fixed full-screen SVG fractal noise at `opacity-[0.08]`, `mix-blend-multiply`, `z-50`:
```jsx
<NoiseOverlay /> // First child inside root div
```

### 7.2 Shadows

- **Card standard:** Multi-layer navy shadow (see Section 4.1) — ALWAYS use this, never plain Tailwind
- **Button standard:** `shadow-lg shadow-[#1A2D63]/10`
- **Button emphasized:** `shadow-lg shadow-[#1A2D63]/20`
- **Large CTA:** `shadow-[0_4px_20px_-4px_rgba(26,45,99,0.4)]`
- **CTA card:** `shadow-2xl` + `shadow-[#1A2D63]/20`
- **Glow orb:** `bg-[#B8C5E6] rounded-full blur-[120px] opacity-30`

### 7.3 Decorative Elements

- **SVG hand-drawn underline:** Under key phrases in headings, `strokeOpacity="0.15"`, `strokeWidth="10"`, rounded caps
- **Watermark numbers:** `font-newsreader text-6xl md:text-7xl font-light`, opacity increasing per step (0.18 → 0.22 → 0.28)
- **Section dividers:** 3-layer SVG waves (fill + `#1A2D63` + `#7B8DB5`)
- **Hand-drawn checkmarks:** SVG component for hero value bullets

### 7.4 Scroll Animations (GSAP)

```
Entrance pattern: y: 25-40, opacity: 0 → y: 0, opacity: 1
Stagger: 0.08 – 0.1 between items
Duration: 0.4 – 0.6s
Easing: power3.out
```

**IMPORTANT:** Triggered via `IntersectionObserver` (threshold 0.1 – 0.15), NOT ScrollTrigger. This prevents stale position calculations from layout shifts.

### 7.5 Hover Transitions

```
Buttons:     hover:bg-[#2A4488] transition-colors   OR   hover:scale-105 transition-transform
Nav links:   hover:text-[#1A2D63] transition-colors  (from /60 opacity)
Footer links: hover:text-white transition-colors
Arrow icon:  group-hover:translate-x-1 transition-transform
Mobile menu: hover:text-[#475D8F] transition-colors
```

---

## 8. SECTION STRUCTURE TEMPLATE

Every section follows this pattern:

```jsx
<section id="section-id" className="pt-8 md:pt-12 pb-8 md:pb-10 px-6 md:px-12 bg-[#FDFBF7]">
  <div className="max-w-[800px] mx-auto">           {/* or 1100px for wider */}
    <div className="text-center mb-8 md:mb-10">      {/* heading block */}
      <h2 className="font-newsreader text-3xl sm:text-4xl md:text-5xl text-[#1A2D63] leading-[1.15] mb-4">
        Section Title
      </h2>
      <p className="text-[#1A2D63]/60 text-lg md:text-xl max-w-xl mx-auto">
        Subtitle text
      </p>
    </div>
    {/* content */}
  </div>
</section>
```

### Homepage Section Order

1. **Nav** (fixed, z-40)
2. **Hero** — `<header>`, centered text, CTA, value bullets, logo carousel
3. **Recognition** — "Herken jij dit?", icon + text cards, CTA
4. **Section Divider** (wave SVG, variant 0)
5. **Process** — "Hoe wij AI voor jou laten werken", 3 numbered cards, connecting lines, CTA
6. **Section Divider** (wave SVG, variant 0)
7. **Use Cases** — "Hoe wij AI inzetten voor klanten", horizontal carousel cards
8. **Section Divider** (wave SVG, variant 1)
9. **FAQ** — Accordion, max-w-800
10. **Contact CTA** — White card with glow, centered
11. **Footer** — Navy bg, wave top, 2-col grid (CTA left + contact card right), bottom bar

---

## 9. RESPONSIVE BREAKPOINTS

| Breakpoint | Width | Key Changes |
|---|---|---|
| **Default** | < 640px | Single column, smallest text, mobile nav, full-width CTAs |
| **sm** (640px) | >= 640px | Slightly larger text, wider max-widths, button rows |
| **md** (768px) | >= 768px | Desktop nav appears, grids activate, larger padding/text, hero switches layout |
| **lg** (1024px) | >= 1024px | Hero text max size, desktop logo carousel, footer 2-col grid |
| **xl** (1280px) | >= 1280px | H1 reaches `text-[4.25rem]`, widest horizontal padding |

### Key breakpoint patterns

```
md:hidden             — Hide on desktop (mobile-only elements)
hidden md:flex        — Show on desktop (desktop nav, desktop hero)
hidden lg:block       — Desktop-only (logo carousel)
block lg:hidden       — Mobile-only (mobile logo carousel)
flex-col sm:flex-row  — Stack → row at sm
grid-cols-1 md:grid-cols-3  — Single col → 3 col at md
text-center lg:text-left    — Center on mobile → left-align on desktop (footer)
```

---

## 10. FAQ STYLING DETAILS

The FAQ uses shadcn/ui `Accordion` components with custom styling:

```jsx
// Outer container (mobile has card-like wrapper)
className="bg-white/40 md:bg-transparent rounded-2xl md:rounded-none
           border border-[#1A2D63]/[0.06] md:border-0 px-4 sm:px-5 md:px-0"

// Accordion item
className="border-b border-[#1A2D63]/[0.08] last:border-b-0 md:last:border-b md:border-[#1A2D63]/10"

// Trigger (question)
className="py-4 sm:py-5 md:py-6 text-left text-[#1A2D63] font-instrument
           text-base sm:text-lg md:text-xl font-medium hover:no-underline
           hover:text-[#475D8F] transition-colors
           [&>svg]:h-4 [&>svg]:w-4 sm:[&>svg]:h-5 sm:[&>svg]:w-5
           [&>svg]:text-[#475D8F] [&>svg]:shrink-0 [&>svg]:ml-3 gap-2"

// Content (answer)
className="text-[#1A2D63]/65 text-[15px] sm:text-base md:text-[17px]
           leading-[1.7] pb-5 sm:pb-6 md:pb-7 space-y-3.5"

// Answer sub-heading
className="font-semibold text-[#1A2D63]/85 mt-5 first:mt-0 text-[15px] sm:text-base md:text-[17px]"

// Answer bullet list
className="space-y-2 pl-1"
// Bullet dot: mt-[9px] h-1.5 w-1.5 rounded-full bg-[#1A2D63]/30
```

---

## 11. VIKING BEAST PRINCIPLES — HOW WE APPLIED THEM

The homepage redesign was directly informed by `vikingbeast-analyse.md`. Below are the key principles and what we did with each one. **Apply these same principles to every new landing page.**

### 11.1 Psychological Journey (AIDA model)

**Principle:** Every section serves exactly one psychological purpose. Follow Attention → Interest → Desire → Action.

| # | VB Principle | Our Homepage Section | Reader Psychology |
|---|---|---|---|
| 1 | Hero = eindresultaat | "AI-werknemers die 24/7 voor je werken." | "Dit klinkt als wat ik nodig heb" |
| 2 | Herkenning = self-identification | "Herken jij dit?" (5 pijnpunten) | "Ja, dit ben ik!" |
| 3 | Proces = cognitive ease | "Hoe wij AI voor jou laten werken" (3 stappen) | "Oké, dit is simpel" |
| 4 | Bewijs = scope & credibility | "Hoe wij AI inzetten voor klanten" (6 use cases) | "Ze doen dit al voor anderen" |
| 5 | FAQ = bezwaren wegnemen | "Veelgestelde vragen" (8 vragen) | "Mijn twijfels zijn beantwoord" |
| 6 | Slot-CTA = zachte push | "Benieuwd hoe wij AI kunnen inzetten?" | "Ik ga contact opnemen" |

**Rule for new pages:** Map out which psychological purpose each section serves BEFORE writing any copy. If a section doesn't have a clear purpose, remove it.

### 11.2 Copy Rules — Write for a 10-Year-Old

**Principle:** Short sentences, active voice, "je/jij" address, no jargon, one idea per sentence.

**What we did on the homepage:**

| Rule | Homepage Example |
|---|---|
| Max ~15 words per sentence | "Nooit ziek. Nooit op vakantie. Altijd aan het werk." |
| Active voice | "Wij bouwen virtuele medewerkers die het werk doen..." |
| "Je/jij" address (NEVER "u") | "Je besteedt uren per week aan administratie" |
| No jargon | "Virtuele medewerkers" (not "AI agents" or "automation workflows") |
| One idea per sentence | "Geen dubbel werk meer." |
| Conversational tone | "Twijfel je of jouw proces geschikt is? Vertel ons wat je doet." |

### 11.3 Recognition Section ("Ik voel me gezien")

**Principle:** 4-6 bullets starting with "Je...", mix of pain points and desires, close with question + CTA.

**Our implementation:**
```
- Je besteedt uren per week aan administratie          (pijnpunt)
- Je zoekt een team dat je écht begrijpt en meedenkt.  (verlangen)
- Je doet hetzelfde werk steeds opnieuw.               (frustratie)
- Je wil AI inzetten maar weet niet hoe.               (onzekerheid)
- Je wil snel schakelen zonder lange contracten.        (verlangen)
→ CTA: "Plan een kennismakingsgesprek"
```

We used icons instead of checkmarks for visual variation, but the psychological pattern is identical.

### 11.4 CTA = Promise, Not Action

**Principle:** Never use "Contact", "Meer info", "Verzenden". Every CTA should be result/invitation-oriented.

**Our implementation:**
- Primary CTA everywhere: **"Plan een kennismakingsgesprek"** (invitation, not command)
- Contact section opening: **"Benieuwd hoe wij AI kunnen inzetten in jouw bedrijf?"** (curiosity)
- Scarcity: **"We nemen maximaal 5 projecten tegelijk aan."** (exclusivity)
- The word "gratis" is implied through "kennismakingsgesprek" (no-risk meeting)

**Rule for new pages:** Never use generic CTA text. Frame every button as either an invitation or a promise.

### 11.5 FAQ = Hidden Sales Arguments

**Principle:** Every FAQ answer is a sales objection in disguise. Use radical honesty as a trust-building tool.

**Our implementation:**

| Question (hidden objection) | Answer Strategy |
|---|---|
| "Hoeveel tijd bespaart dit?" | Concrete: "80-100%" + honesty: "Als iets maar 30-40% sneller zou gaan, zeggen we eerlijk dat het de investering niet waard is" |
| "Wat kost dit?" | Comparison: "Minder dan een parttime medewerker" + concrete: "€5k-8k verdient zichzelf terug in 3-6 maanden" |
| "Wat als er iets misloopt?" | Trust: "Bug? Gratis. Onze verantwoordelijkheid, niet de jouwe." |
| "Werkt dit met mijn software?" | Reassurance: "Je hoeft niets nieuws aan te schaffen" + "500+ tools" |
| "Wat als medewerkers er niet mee kunnen werken?" | Transparency: "Grootste uitdaging? Niet leren gebruiken, maar vertrouwen dat het werkt" |

### 11.6 Radical Honesty

**Principle:** Saying when you WON'T do something builds credibility for when you say you WILL.

**Our examples:**
- "Als iets maar 30-40% sneller zou gaan, zeggen we eerlijk dat het de investering niet waard is."
- "Twijfel je of jouw proces geschikt is? Vertel ons wat je doet — wij zijn eerlijk of het zin heeft."
- "Bug? Gratis. Iets werkt niet zoals afgesproken? Onze verantwoordelijkheid, niet de jouwe."

**Rule for new pages:** Include at least 2-3 moments of radical honesty. The willingness to say no makes the yes believable.

### 11.7 Repeat the Core Keyword

**Principle:** One keyword repeated throughout becomes the psychological anchor. VB used "winst" 15+ times.

**Our anchors:**
- **"Virtuele medewerkers"** — hero, subtitle, FAQ, CTA sections
- **"24/7"** — hero headline, process card label, value bullets
- **"Tijd besparen"** — recognition, FAQ answers, use case stats

**Rule for new pages:** Identify ONE core keyword/phrase for the page and weave it into every section. The reader should remember "[Finit] = [core keyword]".

### 11.8 Scannable Headings Tell the Story

**Principle:** A visitor who only reads the H2s should understand the full value proposition.

**Our H2 flow (just the headings):**
1. "AI-werknemers die 24/7 voor je werken." (what we offer)
2. "Herken jij dit?" (your problems)
3. "Hoe wij AI voor jou laten werken" (our process)
4. "Hoe wij AI inzetten voor klanten" (proof it works)
5. "Veelgestelde vragen" (your concerns addressed)
6. "Benieuwd hoe wij AI kunnen inzetten in jouw bedrijf?" (next step)

**Rule for new pages:** Write all H2s first. Read them top-to-bottom. If they don't tell a complete story by themselves, rewrite them.

---

## 12. DO'S & DON'TS FOR NEW LANDING PAGES

### DO's

**Design:**
- Use the exact color palette (never introduce new colors)
- Use `font-newsreader` for ALL headings, `font-instrument` for everything else
- Follow the font size hierarchy exactly per breakpoint
- Use the custom multi-layer navy shadow on cards (Section 4.1)
- Keep all CTAs as `rounded-full` pills with Calendar + text + ArrowRight pattern
- Use `max-w-[800px]` for text sections, `max-w-[1100px]` for card grids
- Add NoiseOverlay and selection colors for brand consistency
- Use section dividers between major content blocks
- Trigger entrance animations via IntersectionObserver (not ScrollTrigger)

**Copy:**
- Write in short Dutch sentences (max ~15 words)
- Use "je/jij" address, conversational tone
- Each section = one psychological purpose
- Repeat the page's core keyword/phrase throughout
- Include 2-3 moments of radical honesty
- Use FAQ as hidden sales arguments
- Make all headings scannable (they should tell the story alone)

### DON'TS

**Design:**
- Don't use default Tailwind shadows — always the custom navy multi-layer
- Don't use `text-black` or `text-gray-*` — always Oxford Navy with opacity
- Don't use buttons without icons
- Don't use `shadow-sm/md/lg/xl/2xl` alone on cards
- Don't skip section breathing room (always pt/pb)
- Don't add unnecessary nav complexity

**Copy:**
- Don't use "u" — always "je/jij"
- Don't use jargon ("AI agents", "automation workflows", "ROI optimization")
- Don't write paragraphs longer than 3-4 lines
- Don't use generic CTAs ("Contact", "Meer info", "Verzenden")
- Don't claim "wij zijn de beste" or "marktleider" — prove it with specifics
- Don't use passive voice ("er wordt gedaan") — always active ("wij doen")
- Don't mix psychological purposes within one section
