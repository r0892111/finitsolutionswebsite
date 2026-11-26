# Homepage (branch `homepage-amina`, 25 november 2026)

De homepage van finitsolutions.be met de copy van Amina (Google Doc "Upwork scripts", tab "Hub copy"). Niet naar `main` zonder Alex.

## De regels van Alex (25/11)

1. **De huisstijl en de opbouw van de vorige homepage.** Na twee rondes met een eigen, strakker ontwerp zei Alex op 25/11: terug naar de oude stijl. Op 26/11 ging hij verder: "terug meer naar de styling van hoe het was, met de foto van Finit maakt kmo's klaar voor het AI-tijdperk met die link naar Y Combinator, en rechts op de hero de breinvisualisatie", met de nieuwe copy. De pagina volgt dus de vorige homepage (`components/home/home-page.tsx`, niet meer in gebruik maar wel de bron): het `hp-`blok in `app/globals.css`, de bouwstenen uit `components/home/ui.tsx`, het brein uit `components/home/brein-3d.tsx`.
2. **De copy van Amina, met de correcties van Alex.** Zelf niets erbij schrijven: geen bijschriften, tussenkopjes, voorbeelden of labeltjes. Wat er wel staat en niet van haar komt: de labels van het menu en de footer, het woord "Stap", de foutmeldingen en de bevestiging van het formulier, "(optioneel)" bij het vraagveld, de alt-tekst van de foto en de titel voor Google. Waar Alex haar tekst inhoudelijk rechtzette, staat dat in "Afwijkingen van Amina's document".
3. **Geen tekeningen.** De getekende figuurtjes van de vorige homepage blijven weg (Alex, 25/11). Wel terug sinds 26/11: de breinvisualisatie in de hero en de foto met het citaat van Y Combinator.
4. **De knop voor een gesprek heet overal "Boek een conversatie"** (EN: "Book a conversation"). Het eerste gesprek duurt 60 minuten, dus nergens "een halfuur". Na het formulier nemen we binnen 24 uur contact op.
5. **Nooit één los woord op de laatste regel.**
6. **Inhoud die klopt** (Alex, 25/11): zeg "werkprocedures, regels en uitzonderingen" als het gaat over wat AI niet weet, niet "prijzen, uitzonderingen en stijl". Het eerste gesprek is 60 minuten waarin we al grondig door de processen gaan, niet "wij luisteren vooral". Beloof niet dat de klant niets moet voorbereiden. Zeg niet dat we altijd koppelen aan bestaande software: we bouwen wat nodig is, soms van nul. Geen "we spraken al met meer dan honderd Belgische kmo's".
7. **Niets intern of half af**: geen stand van projecten, geen lege blokken. `bewijs.getuigenissen` is bewust leeg, dus de sectie "Bewijs" blijft verborgen tot er een getuigenis in staat.

## Waar staat wat

| Bestand | Wat |
|---|---|
| `copy.nl.ts`, `copy.en.ts` | Alle tekst. Nederlands is de standaard (`/`), Engels staat op `/en/`. |
| `copy.ts` | De vorm van de tekst (types). |
| `home-pagina.tsx` | De homepage, in de volgorde van Amina. |
| `over-ons-pagina.tsx` | "Over ons" (`/over-ons/`, `/en/about/`): haar sectie 7 en 5, met de foto. |
| `gratis-pagina.tsx` | "Gratis materiaal" (`/gratis-materiaal/`, `/en/free-resources/`, sinds 26/11, vraag van Amina): de prompts en gidsen van de hub achter het e-mailslot, met eronder een blok naar de video op `/hub/`. Geen eigen tekst: alles komt uit `components/hub/copy.ts` en `copy.en.ts`, alleen de menunaam en de knop "Bekijk de video" staan in `gratis` in de copy hier. Wie zich hier aanmeldt, krijgt in Brevo `UTM_MEDIUM = gratis-materiaal` (de hub geeft `hub`), zodat die groep later een eigen mailreeks kan krijgen. De prompt wordt nog niet gemaild: het slot opent alles meteen op de pagina. |
| `tools.ts` | De logo's onder "Werkt met wat je al gebruikt". |
| `components/home/brein-3d.tsx` | De breinvisualisatie. Krijgt voor het Engels `labels` en `info` mee uit `copy.en.ts`. |
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

1. **Hero**: zoals vroeger. Links voor wie, de kop met amber streep ("de secretaris", niet "het secretariaat"), de belofte, de uitleg, twee knoppen, drie vinkjes en wie ons steunt. Rechts de breinvisualisatie (alleen op een breed scherm). Het menu is doorzichtig zolang je bovenaan staat en wordt wit en wazig bij het scrollen.
   Daaronder, op de overgang van wit naar lichtgrijs: de foto van Karel en Jord met "Finit maakt Vlaamse KMO's klaar voor het AI-tijdperk." en het kaartje met het citaat van Y Combinator (link naar hun pagina). Die zin, het citaat en de teksten in het brein komen van de vorige homepage, niet van Amina.
2. **Herkenbaar?**: de korte kop met de streep, zoals "Herken jij dit?" vroeger; haar lange zin staat eronder als inleiding. Vier kaarten, twee aan twee, met alleen de titel (Alex, 26/11: met de tekstjes eronder werd het te lang).
3. **Company brain**: marineblauw paneel, links de uitleg, rechts de twee dingen die veranderen.
4. **Hoe we werken**: vier kaarten met een pilletje "Stap 1" tot "Stap 4".
5. **Waarom Finit**: in de vorm van de kaart "Eén partner voor al je IT" van vroeger: links de kop en de uitleg, rechts de drie punten als tegels met een rond icoon. De kaart ligt op de overgang van wit naar de marineblauwe band.
6. **Wat we bouwen**: marineblauwe band. De zes voorbeelden: op desktop de sectoren links en de tekst van de gekozen sector rechts in één wit paneel. Alle teksten liggen daar op elkaar, zodat het paneel altijd even hoog is en er niets verschuift bij een klik (Alex vond een uitklappende kaart die de band meetrekt onprofessioneel). Op gsm klapt de tekst open in de rij. Daaronder de tools: alleen de logo's, zonder naam (`tools.ts`).
7. **Wie zit er achter Finit**: de foto (dicht op de gezichten: `public/home/oprichters-dichtbij.jpg`) en de drie oprichters.
8. **Bewijs**: verborgen (zie regel 6).
9. **FAQ**: één kaart met uitklapbare vragen.
10. **Voor wie**: woordelijk de kaarten van de hub, groen voor wie wel en rood voor wie niet (`nh-wie-*`, overgenomen van `hub-wie-*` uit PR #39).
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

## Afwijkingen van Amina's document (doorgegeven aan Amina)

Op 26/11 staat deze lijst, in het Engels en met de reden erbij, in haar Google Doc als tab "Corrections (homepage)". De zeven comments op de tab "Hub copy" die verwerkt zijn, zijn daar afgesloten.

Alex zette op 25/11 een aantal dingen recht die in haar document nog anders staan. Zolang zij haar document niet aanpast, wijkt de site hier bewust van af. Wie haar tekst opnieuw overneemt, mag deze punten niet terugzetten.

| Waar | In haar document | Op de site | Waarom (Alex) |
|---|---|---|---|
| Hero, kop (NL) | vertaald als "het secretariaat" | "de secretaris van je eigen bedrijf" | Zijn woordkeuze. |
| Sectie 2, de vier punten | een vette lijn met een of twee zinnen eronder | alleen de vier vette lijnen | Met de zinnen erbij werd het te lang (haar eigen voorstel). |
| Hero, onderaan | "We've spoken with more than a hundred Belgian SMEs." | weg | Moet weg, overal. |
| Stap 1 | "Half an hour. … We mostly listen" | 60 minuten waarin we al grondig en diepgaand door de processen gaan | Het eerste gesprek is geen luistergesprek meer. |
| Stap 2 | "You don't prepare anything." | weg | Soms vragen we wel iets voor te bereiden. |
| Stap 4 | "On top of the brain and connected to the software you already use." | "We bouwen wat je nodig hebt, van een eenvoudige automatisering tot een team van AI-werknemers of software volledig op maat." | We koppelen niet altijd; soms bouwen we software van nul. |
| Sectie 6, intro | de vijf soorten (regel, workflow, AI-werknemer, …) | één zin: we bouwen wat het best past en het minst kost | Te veel uitleg. |
| Sectie 6, voorbeelden | "We build an agent…", "…gets its own booking platform" | verleden tijd: "We bouwden", "kreeg" | |
| Sectie 6, tools | lijst met namen | alleen logo's, plus meer Belgische bedrijfssoftware | |
| FAQ, subkop | "So ask the hard questions." | "Dit zijn de twijfels die we het vaakst horen." | |
| FAQ, ChatGPT | "your prices, your exceptions or your tone" | "je werkprocedures, regels en uitzonderingen" | Dat zegt meer; onthouden voor alle copy. |
| Voor wie | haar twee lijsten met slotzin | de kaarten van de hub, woordelijk, zonder slotzin | Zelfde tekst als op de pagina met de video. |
| Sectie 7, kop | weg sinds 26/11 (stond er als "You're about to hand over how your company runs.") | blijft staan: "Je gaat ons toevertrouwen hoe je bedrijf draait.", ook als titel van Over ons | Keuze van Alex, 26/11. Staat nog niet in de tab voor Amina. |
| Slot, kop | "just a first conversation" (NL was "gesprek") | "gewoon een eerste conversatie" | De naam van de knop. |
| Overal | "Plan a free start call", "half an hour" | "Boek een conversatie", een uur | Zie regel 4. |

Nog niet aangepast, maar het schuurt met stap 2: de subkop van "Hoe we werken" zegt "Je hoeft geen enkele pagina te schrijven. Je hoeft alleen te vertellen."

## Geen los woord op de laatste regel

Drie lagen: koppen krijgen `text-wrap: balance`, lopende tekst `text-wrap: pretty` (beide in `homepage.css`), en `vast()` plakt de laatste twee woorden van een alinea aan elkaar voor browsers die dat niet kennen. In een kop houdt `Streep` het woord voor de streep op dezelfde regel.

## Plakknop op gsm

Onderaan het scherm plakt op gsm de knop "Boek een conversatie". Ze verschijnt pas als de hele hero voorbij is en verdwijnt bij het formulier (Alex, 25/11: nooit twee dezelfde knoppen tegelijk in beeld). Op schermen vanaf 640 px staat de knop in het menu en is er geen plakknop.

## Ankers

`#startgesprek` is het formulier (de server herkent het homepageformulier aan dat adres, dus niet hernoemen). Oude links blijven werken: `/#contact` komt uit bij het formulier, `/#aanpak` bij "Hoe we werken".

## Controleren

`npx tsc --noEmit`, dan `npm run dev` en schermafbeeldingen met `node scripts/homepage/shot.mjs <url> <png> <breedte> <hoogte> [mobiel] [schaal]` op 1440, 1024, 768 en 390. Draai `npm run build` niet terwijl de dev-server loopt (gedeelde map `.next`).
