# Homepage (branch `homepage-amina`, 25 november 2026)

De homepage van finitsolutions.be met de copy van Amina (Google Doc "Upwork scripts", tab "Hub copy", 24/11). Niet naar `main` zonder Alex.

## Drie regels van Alex (25/11)

1. **Alleen de copy van Amina, zoals zij ze bedoelde.** Niets erbij schrijven: geen bijschriften, tussenkopjes, voorbeelden of labeltjes. Wat er wel staat en niet van haar komt, is wat een pagina technisch nodig heeft: de labels van het menu en de footer (met de namen van haar secties), de foutmeldingen en de bevestiging van het formulier, "(optioneel)" bij het vraagveld, de alt-tekst van de foto en de titel voor Google.
2. **In de stijl van Finit**: marineblauw, geen fel blauw of tweede kleur. De lettertypes blijven.
3. **Geen tekeningen.** Het enige beeld is de echte foto van de drie oprichters en de echte logo's.

## Waar staat wat

| Bestand | Wat |
|---|---|
| `copy.nl.ts`, `copy.en.ts` | Alle tekst. Nederlands is de standaard (`/`), Engels staat op `/en/`. |
| `copy.ts` | De vorm van de tekst (types). |
| `home-pagina.tsx` | De homepage: elf secties, in de volgorde van Amina. |
| `over-ons-pagina.tsx` | "Over ons" (`/over-ons/`, `/en/about/`): haar sectie 7 en 5, met de foto. |
| `kader.tsx` | Wat beide pagina's delen: menu, footer, de oprichters, "Waarom Finit", de logo's. |
| `start-formulier.tsx` | Het formulier onderaan. Naam, e-mail, telefoon en website verplicht. Zelfde Netlify Function als de andere formulieren. |
| `homepage.css` | Alle opmaak, prefix `nh-`. |

## Kleuren

| Naam | Waarde | Waarvoor |
|---|---|---|
| Grond | `#F5F7FB` | De hele pagina. Geen afwisselende banden. |
| Marineblauw | `#1A2D63` | Koppen, de ene gevulde knop, links, de twee donkere banden |
| Donker marineblauw | `#14234F` | De knop bij hover, de footer |
| Tekst | `#3D4766` | Lopende tekst (9:1 op de grond) |
| Grijs | `#626B86` | Kleine tekst, de tweede helft van de kop (5:1) |
| Lijn | `#DCE2EE` | Scheidingslijnen en randen |
| Wit | `#FFFFFF` | Bladen: de voorbeelden, de trap, het formulier |

## Letters

- Koppen: Bricolage Grotesque, gewicht 650. H1 40 tot 84 px, H2 30 tot 48 px.
- Tekst: Schibsted Grotesk, 17 px op gsm en 18 px vanaf tablet, regelafstand 1,65, kolom hooguit 36em.
- `nh-groot` (22 tot 30 px) voor een zin die mag opvallen: de vraag, het slot van een sectie.
- Gewone zinsbouw, geen kapitalen, niets onder 13 px.

## Opbouw

- **Hero**: alleen letters, alleen op het eerste scherm. De kop over de volle breedte; eronder links de belofte met de knop, rechts de uitleg; onderaan wie ons steunt en het ene harde feit.
- **Twee marineblauwe banden**: "Herkenbaar?" en het slot met het formulier. Al de rest ligt op dezelfde grond.
- **Elke lijst een eigen vorm**, omdat de inhoud anders is: de vier pijnpunten als raster, de vijf stappen als tijdlijn met cijfers (het is een volgorde), de vijf bouwniveaus als trap (elke zin bouwt op de vorige), de zes voorbeelden als één blad met rijen, voor wie als twee kolommen.

## Regels

1. **Eén gevulde knop**: "Plan een gratis startgesprek", overal woordelijk dezelfde, op de plaatsen waar Amina ze zette: hero, na de vijf stappen, na de FAQ, in het formulier (en bij het bewijs zodra die sectie getoond wordt). Plus het menu en de plakbalk op gsm. Ze springt altijd naar het formulier.
2. **De andere knoppen zijn links** met een streep en een pijl: "Bekijk hoe het werkt", "Toon me wat er ontbreekt", "Toon me hoe het werkt". Altijd links uitgelijnd, onder de tekst waar ze bij horen.
3. **Vlak**: geen schaduw of kleurverloop op knoppen, geen markeerstift achter woorden, geen metertjes of sierlabels.
4. **Maten** uit 4/8/12/16/24/32/48/64/96/128. Hoeken 8 (knop, veld) en 12 (blad, foto).
5. **Beweging**: één keer, bij het laden, komt de hero rustig binnen. Verder alleen wat reageert op een klik. Stil bij "minder beweging".
6. **Niets verzinnen, en niets intern** (Alex, 25/11): geen stand van projecten ("voorstel", "in opbouw"), geen lege of halve blokken, geen labels die als een dashboard lezen. `bewijs.getuigenissen` is leeg, dus de hele sectie "Bewijs" blijft verborgen tot er een echte getuigenis in staat.
7. **Toegankelijk**: knoppen en links minstens 44 px hoog, labels boven de velden, foutmelding onder het veld, "Naar de inhoud", zichtbare focusrand.

## Bronnen

De vijf skills uit de reel van Nick Saraev (Taste Skill, Vercel Web Design Guidelines, Awesome DESIGN.md, Image to Code, Playwright CLI) en de analyse van acht grote sites staan in de gedeelde notitiemap van de sessies (`homepage-reel-5-skills.md`, `homepage-grote-sites-analyse.md`).

## Controleren

`npx tsc --noEmit`, dan `npm run dev` en schermafbeeldingen met `node scripts/homepage/shot.mjs <url> <png> <breedte> <hoogte> [mobiel] [schaal]` op 1440, 1024, 768, 390 en 320. Draai `npm run build` niet terwijl de dev-server loopt (gedeelde map `.next`).
