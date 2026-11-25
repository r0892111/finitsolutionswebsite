# Homepage (branch `homepage-amina`, 25 november 2026)

De nieuwe homepage van finitsolutions.be, met de copy van Amina (Google Doc "Upwork scripts", tab "Hub copy", 24/11) en een nieuw design. Alex gaf carte blanche: alleen de lettertypes blijven, de tekeningen moeten weg. Niet naar `main` zonder Alex.

## Waar staat wat

| Bestand | Wat |
|---|---|
| `copy.nl.ts`, `copy.en.ts` | Alle tekst. Nederlands is de standaard (`/`), Engels staat op `/en/`. Tekst aanpassen = alleen deze twee. |
| `copy.ts` | De vorm van de tekst (types). |
| `home-pagina.tsx` | De homepage: elf secties, in de volgorde van Amina's copy. |
| `over-ons-pagina.tsx` | "Over ons" (`/over-ons/`, `/en/about/`): de oprichters en "Waarom Finit". Geen eigen tekst, hergebruikt sectie 7 en 5. |
| `kader.tsx` | Wat beide pagina's delen: menu, footer, het blok met de oprichters, "Waarom Finit", de logo's. |
| `brein.tsx` | Het brein als tekstbestand: één bestand in de hero, de map met vijf bestanden in sectie 3. |
| `start-formulier.tsx` | Het formulier onderaan. Zelfde Netlify Function als de andere formulieren (`/api/contact-submit`). |
| `homepage.css` | Alle opmaak, prefix `nh-`. Wordt geladen door de vier pagina's in `app/(home)/`. |

## Het idee

Finit schrijft uit hoe een bedrijf werkt. De pagina ziet er dus uit als werk op papier: inkt, balpenblauw en één markeerstift. Het enige "beeld" naast de foto is het brein zelf, als gewoon tekstbestand (zoals een .txt in Kladblok). Dat maakt het abstracte woord "company brain" meteen concreet.

## Kleuren

| Naam | Waarde | Waarvoor |
|---|---|---|
| Inkt | `#0F1B3D` | Koppen, de twee donkere banden (Herkenbaar? en het slot), tekst in het brein |
| Tekst | `#2A334D` | Lopende tekst (12:1 op wit) |
| Grijs | `#5A6478` | Bijschriften en kleine tekst (6:1 op wit) |
| Balpenblauw | `#2246DC`, hover `#1936B0` | De ene gevulde knop, links, cijfers van de stappen, focusrand |
| Markeerstift | `#FFE873` | Alleen om een regel aan te duiden. Nooit als vlak of knop. |
| Vel | `#F3F5F8` | De afwisselende band |
| Lijn | `#DDE2EA` | Scheidingslijnen en randen |
| Groen | `#17804A` | Alleen het statusbalkje van een case die live of opgeleverd is |

Geen kleurverlopen, geen amber knop meer, geen handgetekende streep onder koppen.

## Letters

- Koppen: Bricolage Grotesque, gewicht 650 (niet vetter), strak gespatieerd. H1 38 tot 68 px, H2 30 tot 48 px.
- Tekst: Schibsted Grotesk, 17 px op gsm en 18 px vanaf tablet, regelafstand 1,65, kolom hooguit 36em.
- Het brein: de vaste-breedteletter van het toestel, omdat het echte tekstbestanden zijn. Nergens anders.
- Koppen in gewone zinsbouw (geen Hoofdletters Per Woord, geen kapitalen).

## Regels

1. **Eén gevulde knop**: "Plan een gratis startgesprek", overal woordelijk dezelfde (menu, hero, hoe we werken, bewijs, vragen, formulier, en op gsm onderaan het scherm). Springt altijd naar het formulier (`#startgesprek`). Al de rest is een link met een streep.
2. **Maten** uit 4/8/12/16/24/32/48/64/96/128. Secties 112 px boven en onder op desktop, 72 px op gsm. Pagina hooguit 1248 px breed.
3. **Lijnen in plaats van kaarten** waar het kan. Kaarten alleen voor de zes cases, de twee vakken "voor wie" en het formulier. Nooit een kaart in een kaart.
4. **Nummers alleen waar het een volgorde is**: de vijf stappen. De vijf bouwniveaus en de status van een case krijgen een balkje dat toont hoe ver.
5. **Beweging**: één moment, bij het laden: het bestand in de hero wordt regel na regel geschreven en de stift gaat over de uitzondering. Verder alleen wat reageert op een klik. Alles staat stil bij "minder beweging".
6. **Niets verzinnen**: geen getuigenissen (`bewijs.getuigenissen` is leeg, het blok verschijnt vanzelf als er een in staat), geen cijfers die niet in de copy staan.
7. **Toegankelijk**: tekstcontrast minstens 7:1, knoppen en links minstens 44 px hoog, labels boven de velden, foutmelding onder het veld, een link "Naar de inhoud", zichtbare focusrand.

## Wat van waar komt

Uit de vijf skills van de reel van Nick Saraev (Taste Skill, Vercel Web Design Guidelines, Awesome DESIGN.md, Image to Code, Playwright CLI) en uit de analyse van Stripe, Linear, Anthropic, Mercury, Ramp, Attio, Intercom en McKinsey. De volledige verslagen staan in de gedeelde notitiemap van de sessies (`homepage-reel-5-skills.md`, `homepage-grote-sites-analyse.md`).

## Nog open

Zie het verslag aan Alex van 25/11: de keuze "secretariaat" of "secretaresse", de tekst die niet van Amina komt (zie bovenaan `copy.nl.ts`), de quote van Bas, het persblok van HLN op de branch `pers/hln`, en de oudere pagina's (`/contact`, `/cases`, `/vacatures`) die nog het vorige design hebben.

## Controleren

`npx tsc --noEmit`, dan `npm run dev` en schermafbeeldingen met `node scripts/homepage/shot.mjs <url> <png> <breedte> <hoogte> [mobiel] [schaal]` op 1440, 1024, 768, 390 en 320. Draai `npm run build` niet terwijl de dev-server loopt (gedeelde map `.next`).
