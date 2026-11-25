# Homepage (branch `homepage-amina`, 25 november 2026)

De homepage van finitsolutions.be met de copy van Amina (Google Doc "Upwork scripts", tab "Hub copy"). Niet naar `main` zonder Alex.

## De regels van Alex (25/11)

1. **De huisstijl van de live site.** Na twee rondes met een eigen, strakker ontwerp zei Alex: terug naar de oude stijl, maar zonder de tekeningetjes. Dat is het `hp-`blok in `app/globals.css` met de bouwstenen uit `components/home/ui.tsx`. Deze pagina hoort er dus uit te zien als de rest van de site (`/cases`, `/contact`, `/hub`).
2. **Alleen de copy van Amina, zoals zij ze bedoelde.** Niets erbij schrijven: geen bijschriften, tussenkopjes, voorbeelden of labeltjes. Wat er wel staat en niet van haar komt: de labels van het menu en de footer, het woord "Stap", de foutmeldingen en de bevestiging van het formulier, "(optioneel)" bij het vraagveld, de alt-tekst van de foto en de titel voor Google. Eén zin komt uit een comment van Alex zelf (zie "Comments uit het document").
3. **Geen tekeningen.** Het enige beeld is de echte foto van de drie oprichters en de echte logo's. Het brein-netwerk uit de oude hero staat er ook niet.
4. **De knop voor een gesprek heet overal "Boek een conversatie"** (EN: "Book a conversation"). Het eerste gesprek duurt 60 minuten, dus nergens "een halfuur". Na het formulier nemen we binnen 24 uur contact op.
5. **Nooit één los woord op de laatste regel.**
6. **Niets intern of half af**: geen stand van projecten, geen lege blokken. `bewijs.getuigenissen` is bewust leeg, dus de sectie "Bewijs" blijft verborgen tot er een getuigenis in staat.

## Waar staat wat

| Bestand | Wat |
|---|---|
| `copy.nl.ts`, `copy.en.ts` | Alle tekst. Nederlands is de standaard (`/`), Engels staat op `/en/`. |
| `copy.ts` | De vorm van de tekst (types). |
| `home-pagina.tsx` | De homepage, in de volgorde van Amina. |
| `over-ons-pagina.tsx` | "Over ons" (`/over-ons/`, `/en/about/`): haar sectie 7 en 5, met de foto. |
| `kader.tsx` | Wat beide pagina's delen: menu, footer, de oprichters, "Waarom Finit", de logo's, en de hulpjes `Streep` en `vast`. |
| `start-formulier.tsx` | Het formulier onderaan. Naam, e-mail, telefoon en website verplicht. Zelfde Netlify Function als de andere formulieren. |
| `homepage.css` | Alleen wat de huisstijl nog niet had (prefix `nh-`): menu, taalkeuze, plakbalk op gsm, foutmelding. |

## De huisstijl in het kort

| Wat | Hoe |
|---|---|
| Kleuren | Marineblauw `#1A2D63` (koppen, panelen, footer), tekst `#3D4766`, grijs `#6C7590`, lijn `#E3E7EF`, lichte band `#F5F7FB`, zacht blauw `#E6ECF9`. Amber `#E9A13B` alleen voor de hoofdknop en wat erbij hoort. |
| Letters | Bricolage Grotesque voor koppen (`hp-display`), Schibsted Grotesk voor de rest. Maten uit `H2`, `H3`, `LEAD` in `components/home/ui.tsx`. |
| Knoppen | Pillen (`hp-btn`). Amber (`--accent`) = "Boek een conversatie", springt altijd naar het formulier. Marineblauw (`--primary`) en wit (`--light`, `--secondary`) voor Amina's andere knoppen, die naar de volgende sectie gaan. |
| Kaarten | Wit, hoek 20 px, zachte schaduw (`hp-card`). De kaart "werkt het best voor jou" heeft de amber rand (`hp-card--accent`). |
| Koppen | Gecentreerd, met de handgetekende streep onder het einde (`Streep` in `kader.tsx`, bouwt op `Onder`). Amber streep alleen in de hero. |
| Banden | Wit en lichtgrijs wisselen af; "Wat we bouwen" en de footer zijn marineblauw; het brein is een marineblauw paneel met ronde hoeken. |

## Opbouw

1. **Hero**: gecentreerd. Voor wie, kop met amber streep, de belofte, de uitleg, twee knoppen, drie vinkjes, wie ons steunt.
2. **Herkenbaar?**: vier kaarten, twee aan twee.
3. **Company brain**: marineblauw paneel, links de uitleg, rechts de twee dingen die veranderen.
4. **Hoe we werken**: vier kaarten met een pilletje "Stap 1" tot "Stap 4".
5. **Waarom Finit**: drie kaarten met een rond icoon.
6. **Wat we bouwen**: marineblauwe band. De zes voorbeelden klap je open (alleen de sector staat er, de tekst komt na een klik). Daaronder de tools als chips met hun logo.
7. **Wie zit er achter Finit**: de foto en de drie oprichters.
8. **Bewijs**: verborgen (zie regel 6).
9. **FAQ**: één kaart met uitklapbare vragen.
10. **Voor wie**: twee kaarten naast elkaar.
11. **Slot**: de tekst links, het formulier in een kaart rechts.

## Comments uit het document (verwerkt op 25/11)

| Sectie | Comment | Wat er gebeurde |
|---|---|---|
| 2. Herkenbaar | Alex: korter, liefst één lijn per punt. Amina kortte in. | Haar nieuwe tekst staat erin. |
| 3. Company brain | Alex: sterk, maar te lang om te lezen. Amina kortte in. | Haar nieuwe tekst: twee alinea's en twee punten. |
| 4. Hoe we werken | Alex: de volgorde klopte niet (eerst gesprekken en offerte, pas na het tekenen het brein). Amina herschreef. | Vier stappen in plaats van vijf. "Half an hour" werd "een uur" (regel 4). |
| 6. Wat we bouwen | Alex: te veel uitleg over de vijf soorten. | De vijf zinnen zijn weg. Er staat één zin in zijn woorden: we bouwen wat het best past, van een eenvoudige automatisering tot een team van AI-werknemers of software op maat. Amina heeft dit zelf nog niet herschreven. |
| 6. Voorbeelden | Alex: aanklikbaar maken. Amina: ja. | De voorbeelden klappen open. |
| 7. Team | Amina: een aparte pagina "about us". | Bestaat: `/over-ons/`. |

## Geen los woord op de laatste regel

Drie lagen: koppen krijgen `text-wrap: balance`, lopende tekst `text-wrap: pretty` (beide in `homepage.css`), en `vast()` plakt de laatste twee woorden van een alinea aan elkaar voor browsers die dat niet kennen. In een kop houdt `Streep` het woord voor de streep op dezelfde regel.

## Ankers

`#startgesprek` is het formulier (de server herkent het homepageformulier aan dat adres, dus niet hernoemen). Oude links blijven werken: `/#contact` komt uit bij het formulier, `/#aanpak` bij "Hoe we werken".

## Controleren

`npx tsc --noEmit`, dan `npm run dev` en schermafbeeldingen met `node scripts/homepage/shot.mjs <url> <png> <breedte> <hoogte> [mobiel] [schaal]` op 1440, 1024, 768 en 390. Draai `npm run build` niet terwijl de dev-server loopt (gedeelde map `.next`).
