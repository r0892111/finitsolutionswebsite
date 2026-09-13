# Homepage (rework 2026-09)

Overdracht, beslissingen, stijlregels en open punten: `HOMEPAGE_REWORK.md` in de root van het repo.

Eén idee: **de pagina volgt de schrijfstijl van de vorige homepage en de landingspagina's, en de uitleg die Alex in de lesreeks-video's geeft (hoofdstuk 1 en 2, transcripten in `~/Skool`).**

| Bestand | Wat |
|---|---|
| `copy.ts` | Alle tekst, als data. Copy aanpassen = alleen dit bestand. |
| `cases.ts` | De cases. Een nieuwe case = een object bovenaan `CASE_LIJST`. Hij staat dan vanzelf op de homepage (de eerste zes), op `/cases` en op een eigen pagina `/cases/<slug>`. `voorbeeld: true` = verzonnen opvulling, met een label "Voorbeeld" en geen indexering. |
| `home-page.tsx` | De pagina: navigatie en mobiel menu, de secties, footer. |
| `herken-sectie.tsx` | "Herken jij dit?" volgens de copy-logica van Liam (`vikingbeast-analyse.md`): zes korte punten die met "Je" beginnen, ernaast het contrast met een AI-werknemer, daaronder "Herkenbaar?" met de knop en de tool-logo's. Geen animatie. |
| `brein-3d.tsx` | Het beeld in de hero: het fundament als zwevende structuur van bolletjes en lijnen op een `<canvas>`. Wie over een bol gaat of erop tikt, ziet wat die pagina bevat (`BREIN_INFO` in `copy.ts`). Geen library. |
| `stap-details.tsx` | De drie stappen in detail. Op desktop in het paneel rechts van de kaarten (de kaarten blijven staan terwijl je scrolt, onderaan klik je door naar de volgende stap); op een telefoon klapt het open in de kaart zelf. |
| `case-kaart.tsx` | Een case-kaart, de catalogus met filter op sector, en de quote van Bas. |
| `case-pagina.tsx`, `cases-overzicht.tsx` | De pagina van één case (`app/(home)/cases/[slug]`) en het overzicht (`app/(home)/cases`). |
| `ui.tsx` | Maatvoering, koppen, de accentkleur (`ACCENT`, `#E9A13B`) en de knoppen. `LesreeksKnop` is de hoofd-CTA en staat standaard in de accentkleur. |
| `site-header.tsx`, `site-footer.tsx` | Kop en footer voor de pagina's buiten de homepage (`/bedankt`, `/cases`, de juridische pagina's). Het logo linkt naar de homepage; het btw-nummer komt uit `lib/finit-links.ts`. |
| `vraag-formulier.tsx` | Het korte vraagformulier naast de FAQ (naam, e-mail, vraag). Gaat naar dezelfde Netlify Function als de popup, met het veld `bericht` erbij. |

Het kennismakingsformulier is `components/contact-form-popup.tsx` (naar `netlify/functions/contact-submit.ts`, daarna `/bedankt`). De cookiebanner is `components/cookie-banner.tsx`. Links en contactgegevens staan in `lib/finit-links.ts`.

## De reviews van september 2026

- Eén accentkleur (`#E9A13B`), alleen voor de hoofd-CTA en wat erbij hoort. De lesreeks is die hoofd-CTA; de kennismaking is de tweede knop. De hero blijft zoals hij was, Calendly blijft, geen extra talen.
- De tekst is die van de oorspronkelijke homepage, met twee uitzonderingen op vraag: de stappen en hun panelen gebruiken de korte versie, en "Herken jij dit?" is herschreven volgens de copy-logica van Liam. Herschrijf of kort de copy verder niet in eigen woorden zonder dat erom gevraagd wordt.
- Geen sectie "Waarom bedrijven voor Finit kiezen" en geen "over ons". Hoe we werken zit verweven in de tekst: op de foto onder de hero, in de intro van de aanpak en de cases, in de kolom naast elke case.
- De tool-logo's staan in hun eigen kleur.

## De volgorde

1. **Hero** (`#hero`): "Leg jouw AI-fundament", twee knoppen, drie vinkjes, "Ondersteund door", het brein.
2. **De foto** op de naad onder de hero: de stand bij Start it @KBC, met een kaartje "Zo werken wij": de intro en de vier pijlers van de vroegere sectie "Waarom bedrijven voor Finit kiezen".
3. **Herken jij dit?** (`#recognition`): links "Vandaag" met zes korte herkenningspunten, rechts "Met een AI-werknemer" met de besparing en wat AI overneemt, daaronder "Herkenbaar?" met de knop en de tool-logo's.
4. **De lesreeks** op de naad: het Skool-blok.
5. **Hoe wij AI voor jou laten werken** (`#aanpak`): drie kaarten links (lesreeks € 95 met € 295 doorstreept, bouw € 4.500, onderhoud € 90 per maand), het paneel van de gekozen stap rechts.
6. **Resultaten uit de praktijk** (`#cases`): de catalogus op marineblauw, "Bekijk alle cases", de quote van Bas.
7. **Vragen en contact** (`#faq`, `#contact`): links de veelgestelde vragen, rechts de kennismaking en het vraagformulier.

## Regels voor de copy

- Duidelijk, rechtstreeks, simpel voor niet-technische mensen, resultaatgericht. Alles wat over het model gaat, klopt met de lesreeks (jij legt het fundament, wij bouwen daarna).
- Het heet een **lesreeks** (geen cursus) en een **AI-fundament** (in de lesreeks ook AI-brein). Claude of ChatGPT, allebei kunnen.
- Geen gedachtestreepjes, geen plaatsnaam.
- Prijzen altijd excl. btw, de Claude-abonnementskost erbij vermeld.
- Cijfers alleen als ze kloppen. De echte cases gebruiken alleen wat al gepubliceerd was.

## Opmaak

Wit en lichtblauwgrijze banden (`#F5F7FB`) voor ritme, marineblauw (`#1A2D63`) voor koppen, de tweede knop, de cases-band en de footer, amber (`#E9A13B`) alleen voor de hoofd-CTA. Pilvormige knoppen. Bricolage Grotesque voor koppen en prijzen, Schibsted Grotesk voor de rest (via `next/font`). De handgetekende streep onder het laatste woord van een kop komt van de vorige site. Stijlen staan in `app/globals.css` (prefix `hp-`).
