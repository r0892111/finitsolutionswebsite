# Homepage (rework 2026-09)

Overdracht, beslissingen, stijlregels en open punten: `HOMEPAGE_REWORK.md` in de root van het repo. De review van Karel en Alex van 13 september 2026 staat als transcript in `yap.md`.

Eén idee: **de pagina volgt de schrijfstijl van de vorige homepage en de landingspagina's, en de uitleg die Alex in de lesreeks-video's geeft (hoofdstuk 1 en 2, transcripten in `~/Skool`).** Sinds de review van 13 september volgt de pagina één lijn: probleem → oplossing → hoe → knop.

| Bestand | Wat |
|---|---|
| `copy.ts` | Alle tekst, als data. Copy aanpassen = alleen dit bestand. Wat nieuw is sinds de review staat er aangeduid met "nieuw (review 13/09)". |
| `cases.ts` | De oplossingen die we het vaakst bouwen (`OPLOSSING_LIJST`). Een oplossing = titel (het resultaat in een paar woorden), één zin, de tools, hoe het vandaag gaat, wat de AI-werknemer doet, wat jij nog doet. De homepage toont de eerste zes, `/cases` schrijft ze allemaal uit (anker `/cases#<slug>`). Geen cijfers, geen sectoren, geen aparte pagina per case. |
| `home-page.tsx` | De pagina: navigatie en mobiel menu, de secties, footer. |
| `brein-3d.tsx` | Het beeld in de hero: het fundament als zwevende structuur van bolletjes en lijnen op een `<canvas>`, rustig (geen pulsen, geen gloed) en scherp op elke pixeldichtheid. Wie over een bol gaat of erop tikt, opent die pagina als een tekstbestand (`BREIN_INFO` in `copy.ts`). Algemene woorden voor elk dienstenbedrijf. Geen library. |
| `herken-sectie.tsx` | "Herken jij dit?": drie punten die met "Je" beginnen, elk met een tekening, om en om links en rechts, daaronder "Herkenbaar?" met de knop. |
| `oplossing-sectie.tsx` | De oplossing, meteen onder de herkenning: de pitch in drie zinnen op een marineblauwe kaart met een tekening, daaronder de tool-logo's. |
| `illustraties.tsx` | De tekeningen bij de herkenning en de oplossing: vier scènes als inline SVG (3 op 2) met in elke tekening dezelfde zaakvoerder, zodat de hele zin in beeld staat. Eén amber accent per tekening, geen gezichten, geen tekst, geen beweging. Gemaakt voor een lichte ondergrond: bij de herkenning zonder kader op de lichte band, op de blauwe kaart van de oplossing op een wit vlak. |
| `stap-details.tsx` | De drie stappen (Opleiden, Bouwen, Onderhouden) in detail. Op desktop in het paneel rechts van de kaarten (de kaarten blijven staan terwijl je scrolt, onderaan klik je door naar de volgende stap); op een telefoon klapt het open in de kaart zelf. Geen prijzen in de panelen, geen voorbeelden. |
| `case-kaart.tsx` | Een oplossing als kaart, de catalogus, en de quote van Bas. |
| `cases-overzicht.tsx` | De pagina `/cases`: alle oplossingen volledig uitgeschreven onder elkaar. |
| `contact-kaart.tsx` | De contactkaart naast de FAQ en op `/contact`: de lesreeks, het vraagformulier (met telefoonnummer) en het telefoonnummer, zonder foto. Op de homepage even lang als de FAQ. |
| `contact-pagina.tsx` | De pagina `/contact`, waar "Neem contact met ons op" naartoe gaat. |
| `ui.tsx` | Maatvoering, koppen, de accentkleur (`ACCENT`, `#E9A13B`) en de knoppen. `LesreeksKnop` is de hoofd-CTA en staat standaard in de accentkleur; `ContactKnop` is de tweede knop en linkt naar `/contact`. |
| `site-header.tsx`, `site-footer.tsx` | Kop en footer voor de pagina's buiten de homepage (`/bedankt`, `/cases`, `/contact`, de juridische pagina's). Het logo linkt naar de homepage; het btw-nummer komt uit `lib/finit-links.ts`. |
| `vraag-formulier.tsx` | Het korte vraagformulier (naam, e-mail, telefoonnummer, website van het bedrijf, vraag), alles verplicht. Gaat naar de Netlify Function `/api/contact-submit` met de velden `bericht` en `bedrijfswebsite` (`website` is de honeypot). |

De popup `components/contact-form-popup.tsx` (naar `netlify/functions/contact-submit.ts`, daarna `/bedankt`) wordt niet meer geopend vanaf de homepage; hij blijft bestaan voor de landingspagina's. De cookiebanner is `components/cookie-banner.tsx`. Links en contactgegevens staan in `lib/finit-links.ts`.

## De reviews van september 2026

- Eén accentkleur (`#E9A13B`), alleen voor de hoofd-CTA en wat erbij hoort. De lesreeks is die hoofd-CTA; de tweede knop is "Neem contact met ons op" (`/contact`). Geen kennismaking meer inplannen, geen Calendly. Geen extra talen.
- De tekst is die van de oorspronkelijke homepage waar hij bleef staan. Nieuw na de review van 13 september: het statement en het YC-citaat op de foto, de pitch van de oplossing, de kop en intro van de stappen, de panelen van stap 2 en 3, de oplossingen, de ingekorte FAQ, de contactkaart en de tooltips van het brein. Herschrijf of kort de copy verder niet in eigen woorden zonder dat erom gevraagd wordt.
- Geen sectie "Waarom bedrijven voor Finit kiezen" en geen "over ons". Op de foto onder de hero staat één statement van hooguit acht woorden.
- Geen cijfers of voorbeelden buiten de oplossingen: de stappen leggen alleen uit hoe het gaat.
- De tool-logo's staan in hun eigen kleur.
- Elk blok past op één scherm van een 13/14-inch laptop (1440×900, 1280×800): de basisgrootte is 15 px, op laptops en groter `clamp(14px, 1vw, 16px)`.

## De volgorde

1. **Hero** (`#hero`): "Leg jouw AI-fundament", twee knoppen (lesreeks, contact), drie vinkjes, "Ondersteund door", het brein.
2. **De foto** op de naad onder de hero: de linkerhelft vervaagd, met het statement en het citaat van Y Combinator.
3. **Herken jij dit?** (`#recognition`): drie punten met een tekening, "Herkenbaar?" met de knop.
4. **De oplossing** (`#oplossing`): de pitch op een marineblauwe kaart, daaronder de tool-logo's.
5. **Hoe krijg jij jouw AI-werknemer?** (`#aanpak`): Stap 1 Opleiden (lesreeks € 95 met € 295 doorstreept), Stap 2 Bouwen (€ 4.500), Stap 3 Onderhouden (€ 90 per maand), het paneel van de gekozen stap rechts.
6. **De lesreeks** op de naad: het Skool-blok.
7. **Wat we het vaakst bouwen** (`#cases`): de oplossingen op marineblauw, "Bekijk alle oplossingen", de quote van Bas.
8. **Vragen en contact** (`#faq`, `#contact`): links de zeven veelgestelde vragen, rechts de contactkaart, allebei even lang.

## Regels voor de copy

- Duidelijk, rechtstreeks, simpel voor niet-technische mensen, resultaatgericht. Alles wat over het model gaat, klopt met de lesreeks (jij legt het fundament, wij bouwen daarna).
- Het heet een **lesreeks** (geen cursus) en een **AI-fundament** (in de lesreeks ook AI-brein). Claude of ChatGPT, allebei kunnen.
- Geen gedachtestreepjes, geen uitroeptekens, geen plaatsnaam.
- Prijzen altijd excl. btw, de Claude-abonnementskost erbij vermeld.
- Cijfers alleen als ze kloppen. Geen cijfers bij de oplossingen zolang er geen echte referenties zijn.

## Opmaak

Wit en lichtblauwgrijze banden (`#F5F7FB`) voor ritme, marineblauw (`#1A2D63`) voor koppen, de tweede knop, de oplossingen-band en de footer, amber (`#E9A13B`) alleen voor de hoofd-CTA en één accent per tekening. Pilvormige knoppen. Bricolage Grotesque voor koppen en prijzen, Schibsted Grotesk voor de rest (via `next/font`). De handgetekende streep onder het laatste woord van een kop komt van de vorige site. Stijlen staan in `app/globals.css` (prefix `hp-`).

## Controleren

`npx tsc --noEmit`, dan `npm run dev` en schermafbeeldingen met `node scripts/homepage/shot.mjs <url> <png> <breedte> <hoogte> [mobiel] [schaal] [klik-selector]` op 1440×900, 1280×800 en 390×844. Draai `npm run build` niet terwijl de dev-server loopt (gedeelde `.next`).
