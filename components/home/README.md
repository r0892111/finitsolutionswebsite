# Homepage (rework 2026-09)

Overdracht, beslissingen, stijlregels en open punten: `HOMEPAGE_REWORK.md` in de root van het repo.

Drie bestanden, één idee: **de pagina volgt de opbouw en schrijfstijl van de vorige homepage en de landingspagina's, en de uitleg die Alex in de lesreeks-video's geeft (hoofdstuk 1 en 2, transcripten in `~/Skool`).**

| Bestand | Wat |
|---|---|
| `copy.ts` | Alle tekst, als data. Copy aanpassen = alleen dit bestand. Bij elke sectie staat waar de tekst vandaan komt (vorige homepage of landingspagina). |
| `home-page.tsx` | De pagina: navigatie en mobiel menu (dezelfde opbouw en tekst als vroeger), acht secties, footer. |
| `brein-3d.tsx` | Het beeld in de hero: het fundament als zwevende structuur van bolletjes en lijnen op een `<canvas>`. Bij het laden vliegen de bolletjes op hun plaats, daarna tuimelt de structuur rond een as die zelf blijft verschuiven. Lichtpuntjes lopen over de lijnen, labels wijken voor elkaar. Geen library. Slepen tuimelt mee, de muis kantelt licht. Stopt buiten beeld, halveert op aanraakschermen, staat stil bij "minder beweging". |

Het formulier is het bestaande `components/contact-form-popup.tsx` (zelfde n8n-flow, zelfde velden `naam`, `telefoonnummer`, `email`, zelfde `/bedankt`-pagina). De cookiebanner is `components/cookie-banner.tsx` zoals vóór de rework.

Links en contactgegevens staan in `lib/finit-links.ts`. **`SKOOL_URL` moet nog ingevuld worden:** de knop "Start de lesreeks" gaat rechtstreeks naar Skool, niet naar een formulier.

## De volgorde (en de vraag die elke sectie beantwoordt)

1. **Hero** (`#hero`): "Leg jouw AI-fundament", met de uitleg uit les 1.2 en 1.3 (AI kan alleen wat je hem vertelt, dus eerst een fundament; het technische werk daarna doen wij). Twee knoppen: lesreeks (Skool) en kennismaking (formulier). Drie vinkjes, "Ondersteund door". Geen prijs in de hero.
2. **Herken jij dit?** (`#recognition`): drie knelpunten en drie wensen waarop de lezer knikt, dan "Herkenbaar? Dan zit je hier goed." en een knop. De kop staat op een gewoon laptopscherm al onder de hero in beeld, zonder scrollen.
3. **Wij zorgen ervoor dat AI jouw werk overneemt** (`#use-cases`): 15+ → 2 uur, drie voorbeelden, "En alles wat repetitief is", vijftien tool-chips plus een chip "zowat alles wat je al gebruikt".
4. **Hoe wij AI voor jou laten werken** (`#aanpak`): drie stappen met de prijs erbij (lesreeks € 95 → € 295, bouw € 4.500, onderhoud € 90 per maand), dan het blok "Waarom je het fundament zelf legt": de les van de eerste klanten, de vergelijking met de dure consultant, de eenmalige inspanning en wat je onderweg leert (les 1.1, 1.2 en 1.3), plus de eerlijke noot dat het geen snelle fix is. Zelf leggen is de regel, geen optie: "we bouwen alleen op een fundament dat jij gelegd hebt" staat in stap 2, in pijler 1 en in de FAQ.
5. **Resultaten uit de praktijk** (`#resultaten`): de twee cases en de quote van Bas, op marineblauw.
6. **Waarom bedrijven voor Finit kiezen** (`#waarom`): de vier pijlers.
7. **Veelgestelde vragen** (`#faq`): de tien vragen van vroeger plus drie nieuwe (wat is een AI-brein, moet ik technisch zijn, wat met mijn gegevens).
8. **Contact** (`#contact`): "Ontdek wat AI jouw bedrijf oplevert", knop naar het formulier, link naar de lesreeks. De footer heeft een eigen kop ("Klaar om je bedrijf te automatiseren?") met de lesreeks-knop, zodat dezelfde tekst niet twee keer na elkaar staat.

## Regels voor de copy

- Schrijven zoals de vorige homepage en de landingspagina's: duidelijk, rechtstreeks, simpel voor niet-technische mensen, resultaatgericht. Alles wat over het model gaat, klopt met de lesreeks (jij legt het fundament, wij bouwen daarna).
- Het heet een **lesreeks** (geen cursus) en een **AI-fundament** (in de lesreeks ook AI-brein). Claude of ChatGPT, allebei kunnen.
- Geen gedachtestreepjes, geen plaatsnaam.
- Prijzen altijd excl. btw, de Claude-abonnementskost erbij vermeld.

## Opmaak

Wit, met lichtblauwgrijze banden (`#F5F7FB`) voor ritme en marineblauw (`#1A2D63`) voor koppen, knoppen, de resultaten-band en de footer. Sectiekoppen en hun intro staan gecentreerd; geen scheidingslijn tussen hero en eerste sectie. De tool-logo's (`public/tool-*.svg`) komen van Simple Icons (CC0), in de merkkleur. Pilvormige knoppen zoals in de cookiebanner en op de vorige site. Bricolage Grotesque voor koppen en prijzen, Schibsted Grotesk voor de rest (via `next/font`, in `app/(home)/layout.tsx`). De handgetekende streep onder het laatste woord van een kop komt van de vorige site. Stijlen staan in `app/globals.css` onder "Homepage 2026-09" (prefix `hp-`).
