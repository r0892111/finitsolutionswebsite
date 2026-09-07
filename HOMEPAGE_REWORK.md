# Homepage-rework: branch `rework/homepage-lesreeks`

> **Update 7 september 2026, namiddag.** Alex heeft op basis van deze branch een tweede ronde gedaan op `copy/homepage-optimalisatie` (zie [§ Tweede ronde](#tweede-ronde-copy-optimalisaties-van-alex) onderaan). Tag `homepage-rework-v1` bevriest de oplevering hieronder; `rework/homepage-lesreeks` zelf is niet aangeraakt.

Overdracht voor Karel. Dit is de herwerkte homepage voor het lesreeks-model, gebouwd op 7 september 2026 op een aparte branch. **Niet gemerged naar `main`.** Alex beslist wanneer en of dat gebeurt. Werk verder op deze branch, of maak er een nieuwe branch van.

Alles wat hieronder staat is samen met Alex beslist en getest. De korte versie: de copy en de opmaak op deze branch zijn het vertrekpunt, niet de versie van 6 september op `main`.

## Zo haal je het binnen

```bash
git fetch origin
git checkout rework/homepage-lesreeks
npm install
npm run dev
```

Open http://localhost:3000. De homepage is `app/(home)/page.tsx` en rendert `components/home/home-page.tsx`.

Een testversie online zetten zonder productie te raken (Netlify-login nodig):

```bash
npm run build
npx netlify deploy --dir=out --no-build
```

Dat geeft een `--zesty-caramel-102bbb.netlify.app`-link. Zonder `--prod` verandert er niets aan finitsolutions.be. Laatste draft van deze branch: https://6a9e81f20f99db177f404861--zesty-caramel-102bbb.netlify.app

**Valkuil:** `npm run build` en `npm run dev` delen de map `.next`. Draai je een build terwijl de dev-server loopt, dan laadt de pagina op localhost daarna nog wel, maar zonder werkende JavaScript (geen hydratatie: geen cookiebanner, geen menu, het brein blijft het stilstaande plaatje). Oplossing: de dev-server stoppen en opnieuw `npm run dev` starten.

## Wat er op de branch staat

Zeven commits bovenop `main` (`2c3c7ad`, "nieuwe website NU"):

| Commit | Wat |
|---|---|
| `44a1645` | Eerste herwerking voor het lesreeks-model, mobiel, zonder AI-slop |
| `be4058f` | Tweede ontwerpronde, creatiever |
| `0cdcc0d` | Opbouw van de landingspagina's overgenomen, oude copy aangepast aan het model, 3D-brein |
| `6647c1c` | Oude copy en oud menu terug, cookiebanner hersteld, designsysteem losgelaten, brein op canvas |
| `7a0ef54` | Copy uit de lesreeks-video's, hero "Leg jouw AI-fundament", brein zonder bol met vrije draaiing |
| `5d98057` | Brein trager, zachtere lichtpuntjes, geen stippellijnen |
| `07c3fc9` | Gecentreerde koppen, "Herken jij dit?" boven de vouw, zelf leggen als regel, tool-chips, contrast |

## Waar alles staat

| Bestand | Wat |
|---|---|
| `components/home/copy.ts` | Alle tekst van de homepage, als data. Copy aanpassen = alleen dit bestand. Bij elke sectie staat waar de tekst vandaan komt. |
| `components/home/home-page.tsx` | De pagina: navigatie, mobiel menu, acht secties, footer. |
| `components/home/brein-3d.tsx` | De animatie in de hero (canvas, geen library). |
| `components/home/README.md` | De opbouw per sectie en de copy-regels. |
| `app/globals.css` | Onderaan het blok "Homepage 2026-09": alle `hp-`-klassen (knoppen, kaarten, chips, onderstreping). |
| `app/(home)/layout.tsx` | Laadt de twee lettertypes via `next/font` en zet de wrapper-klasse `hp`. |
| `app/(home)/page.tsx`, `app/layout.tsx` | Titel, omschrijving, OG-beeld. |
| `components/cookie-banner.tsx` | Letterlijk de versie van vóór 6 september (commit `9e7e899`). |
| `components/contact-form-popup.tsx` | Het bestaande formulier (n8n-flow). Ongewijzigd, wordt door de homepage gebruikt. |
| `lib/finit-links.ts` | Links en contactgegevens, waaronder `SKOOL_URL`. |
| `public/tool-*.svg` | Zeven tool-logo's van Simple Icons (CC0), in de merkkleur. |
| `public/skool-cover.webp`, `public/skool-wordmark.svg` | Cover van de community op Skool (720 px, 32 kB) en het Skool-woordmerk in de eigen merkkleuren, voor het Skool-blok. |
| `public/og-image.png`, `public/favicon.ico`, `public/phone-mock-menu.webp` | OG-beeld, favicon-set, kleine telefoon-mockup voor het Producten-menu. |
| `scripts/homepage/shot.mjs`, `perf.mjs` | Screenshot op een gekozen schermmaat, en tekentijd van het brein meten. |

## Beslissingen die vastliggen

Deze zijn met Alex genomen tijdens de rework. Niet opnieuw bediscussiëren zonder hem.

1. **Het businessmodel is de bron.** Lesreeks € 95 voor de eerste 20 deelnemers, daarna € 295. Bouw € 4.500 vaste prijs, inclusief 30 dagen nazorg. Onderhoud € 90 per maand, maandelijks opzegbaar. Het Claude- of ChatGPT-abonnement (± € 20 per maand) staat er apart bij. Alle prijzen excl. btw. Het oude model met de audit van € 3.500 bestaat niet meer.
2. **Woorden.** Het heet een **lesreeks**, nooit een cursus. Het resultaat heet een **AI-fundament** (in de lesreeks ook AI-brein). De knoppen heten "Start de lesreeks" en "Plan een kennismaking". Claude of ChatGPT, allebei kunnen.
3. **Zelf leggen is de regel, geen optie.** Wij analyseren niet meer. De klant legt zelf het fundament in de lesreeks, omdat hij zijn bedrijf het allerbeste kent. Finit bouwt alleen op een fundament dat de klant zelf gelegd heeft. Dat staat in stap 2, in de eerste pijler en in de FAQ. Geen "liever alles uitbesteden? kan ook".
4. **De volgorde is die van de oude landingspagina's.** Hero, Herken jij dit?, Wat AI kan, Hoe wij werken (met de drie prijzen), Resultaten, Waarom Finit, FAQ, Contact. Elke sectie beantwoordt de vraag die na de vorige opkomt en haalt een bezwaar weg. Karels volgorde van 6 september is losgelaten.
5. **De copy komt van mensen.** Basis: de vorige homepage en de landingspagina's (uren handmatig geschreven), plus wat Alex zelf zegt in de video's van hoofdstuk 1 en 2 van de lesreeks. Alleen aangepast waar het model dat vraagt. Stijl: duidelijk, rechtstreeks, simpel voor iemand zonder technische kennis, resultaatgericht.
6. **Copy-regels.** Geen gedachtestreepjes. Geen jargon zonder uitleg. Eén idee per zin. Geen AI-slop: geen "naadloos", "krachtig", "ontgrendel", "transformeer", geen uitroeptekens, geen zinnen die niets zeggen. Geen plaatsnaam (Leuven). Elk getal klopt met het model en met de rest van de pagina (de FAQ zegt hetzelfde als de stappen). Bij elke zin: klopt dit logisch na de zin ervoor?
7. **Knoppen en formulier.** "Start de lesreeks" gaat rechtstreeks naar Skool in een nieuw tabblad, nooit naar een formulier. "Plan een kennismaking" opent het bestaande `ContactFormPopup` met dezelfde n8n-webhook, dezelfde velden (`naam`, `telefoonnummer`, `email`, `bron`) en dezelfde `/bedankt`-pagina. Aan die flow verandert niets.
8. **Cookiebanner en hamburgermenu** staan exact zoals vóór 6 september: zelfde tekst, zelfde structuur. Het lettertype mag anders, de opbouw niet.
9. **Het designsysteem geldt hier niet.** `FINIT_STYLE_GUIDE.md` (warm papier, Newsreader, Instrument Sans) en de warm-cream tokens zijn voor de homepage bewust losgelaten. De homepage is een schone, witte, professionele site met de regels hieronder.
10. **De hero blijft het brein-concept**, licht en zonder open pagina-kaart of chatbot-animatie. Kop "Leg jouw AI-fundament", de subtitel is de uitleg uit les 1.2 en 1.3.
11. **Mobiel eerst.** Gecontroleerd op 360 en 390 px breed. Kop mag nooit buiten het scherm lopen.

## Stijlregels zoals nu gebouwd

**Kleuren**

| Rol | Waarde |
|---|---|
| Achtergrond | `#FFFFFF`, om en om met banden `#F5F7FB` |
| Merkkleur (koppen, knoppen, resultaten-band, footer) | `#1A2D63`, hover `#2A4488`, actief `#14234F` |
| Lopende tekst | `#3D4766` |
| Gedempte tekst (labels, bijschriften) | `#6C7590` |
| Randen | `#E3E7EF` |
| Lichtblauwe achtergrond (vinkjes, chips, iconen) | `#E6ECF9` |
| Tekst op marineblauw | wit, met `white/90` voor tekst, `white/65` voor labels, `white/75` voor namen. Nooit lichter dan `white/55`. |

Ritme van de secties: wit (hero + Herken jij dit?), band (Wat AI kan), wit (Hoe wij werken), marineblauw (Resultaten), wit (Waarom Finit), band (FAQ), wit (Contact), marineblauw (footer). Geen scheidingslijn tussen hero en eerste sectie.

**Letters**

- Koppen en prijzen: Bricolage Grotesque (`--font-bricolage`, klasse `hp-display`, optische maat 96, `hp-display-sm` voor kleinere koppen).
- Rest: Schibsted Grotesk (`--font-schibsted`).
- Sectiekoppen (`H2` in `home-page.tsx`): 2rem mobiel, 2.5rem vanaf `sm`, 2.9rem vanaf `lg`, gecentreerd, met de intro eronder in een kolom van maximaal 44rem (`KOP`).
- Het laatste woord van een kop krijgt de handgetekende streep (`<Onder>`), overgenomen van de vorige site.
- Hero-kop: 2.15rem op de kleinste telefoons, tot 3.6rem op grote schermen. "Herken jij dit?" staat op 1440×900 en 1536×864 boven de vouw; de hero-padding onderaan (`lg:pb-10`) en de bovenrand van de eerste sectie (`lg:pt-10`) zijn daarop afgesteld.

**Onderdelen** (alle in `app/globals.css`, prefix `hp-`)

- Knoppen: pilvorm. `hp-btn--primary` (marineblauw), `hp-btn--secondary` (wit met rand), `hp-btn--light` (wit op marineblauw), maten `--sm`, `--md`, `--lg`. Zelfde vorm als de cookiebanner en de vorige site.
- Kaarten: `hp-card` (wit, rand, 20px hoek, zachte schaduw). `hp-card--accent` voor de uitgelichte stap 1.
- Chips: `hp-chip` voor de tool-logo's, `hp-chip--plus` (gestippeld) voor "zowat alles wat je al gebruikt".
- Vinkjes: `hp-check` (lichtblauw rondje), `hp-check--donker` op marineblauw.
- FAQ: native `<details>` met eigen plusje (`hp-details`, `hp-plus`).
- Openklikbare rijen onder de prijskaarten: `hp-vouw` (grid-rows van 0fr naar 1fr, de inhoud blijft in de DOM; `aria-expanded` op de knop).
- Iconen (lucide) alleen waar ze iets betekenen: de vier pijlers hebben een icoon omdat ze geen volgorde zijn; de drie stappen en de zes herkenzinnen hebben nummers omdat je ze telt of doorloopt.

**Contrast en uitlijning**

- Decoratieve nummers en tekens minstens `#1A2D63/45`, niet lichter.
- Getallen naast tekst op de basislijn uitlijnen (`items-baseline`), niet bovenaan.
- Logo's van VLAIO en Start it @KBC op 90% dekking.
- Lopende tekst minimaal 1rem met regelafstand 1.65; bijschriften 0.8125rem in `#6C7590`.

**Beweging**

- Eén keer bij het laden: de hero-tekst schuift 12px op (`hp-rise`). Verder geen scroll-animaties.
- Alles staat stil bij `prefers-reduced-motion`.

## Het brein in de hero

`components/home/brein-3d.tsx`. Zeventien pagina's van een fictief installatiebedrijf (Offertes, Klanten, Prijzen, Planning, ...) als bolletjes met lijnen ertussen, plus twee tot drie subpagina's per pagina. Bij het laden vliegen ze in 1,5 s op hun plaats, daarna tuimelt de structuur traag rond een as die zelf verschuift (geen vaste draaias, quaternions). Labels wijken voor elkaar, hover licht een bolletje en zijn lijnen op, slepen tuimelt mee.

**Golven** (sinds de tweede ronde): af en toe komt er een vraag binnen bij één pagina. Die licht op, en lichtpuntjes lopen over haar lijnen naar de verbonden pagina's, die op hun beurt oplichten en het signaal nog één stap doorgeven. Dat is hoe het fundament werkt (index → pagina → verwante pagina's) en het geeft het neurale gevoel zonder het beeld oneerlijk te maken. **Scherptediepte:** wat achteraan ligt vervaagt sneller en krijgt een zachte, bredere schijf.

Draaiknoppen, allemaal bovenaan of in `stap()` en `teken()`:

- Tuimelsnelheid: `dt * 0.00008` in de `qDraai`-aanroep. Hoger is sneller.
- Golven: nieuwe golf elke 2600 ms zolang er minder dan 6 puntjes onderweg zijn; start met 4 lijnen, elke volgende stap 3, tot diepte 2; kracht per stap `× 0.55`; nooit meer dan 28 puntjes. Snelheid `0.00034 + Math.random() * 0.00018`.
- Gloed van een pagina: halfwaardetijd 380 ms (`verval`); halo tot `r × (2.6 + 1.4 × g)`; kleur mengt van marineblauw naar accent via `meng(g)`.
- Scherptediepte: lijnen `d^1.5`, bolletjes `d^1.4`, zachte schijf onder `d < 0.42`.
- Startpositie: `Q0` (kanteling en welk bolletje vooraan staat).
- Pagina's en lijnen: de lijst met labels, `SUBS` (aantal per pagina: `i % 2 === 0 ? 3 : 2`) en `HOOFDLIJNEN`.

Prestaties: in dev-modus gemeten 0,5 ms per beeldje gemiddeld, 1 ms maximaal (retina, 1440 px), op een budget van 16,7 ms per beeldje. De productiebuild is lichter. Stopt buiten beeld (IntersectionObserver), 30 fps op aanraakschermen, stilstaand beeld bij "minder beweging". Meten kan met `node scripts/homepage/perf.mjs http://localhost:3000/`.

## Wat er gecontroleerd is

- `npx tsc --noEmit` schoon, `npm run build` slaagt (45 statische pagina's).
- Screenshots op 1440×900, 1536×864 (vouw), 390×844 en 360 px (mobiel), volledige pagina.
- Cookiebanner staat in de DOM van de draft met de oude tekst.
- Formulier post naar dezelfde n8n-webhook als vroeger.
- Copy nagelezen met de checklists uit https://github.com/aitytech/agentkits-marketing (`skills/page-cro` en `skills/copy-editing`): waardepropositie in 5 seconden, één primaire knop boven de vouw, elke claim met bewijs, elk bezwaar beantwoord in de FAQ, risico weggenomen bij de knoppen.

Screenshot maken op een gekozen maat (Chrome nodig, pad instelbaar via `CHROME=`):

```bash
node scripts/homepage/shot.mjs http://localhost:3000/ fold.png 1440 900 0 1 body   # alleen de vouw
node scripts/homepage/shot.mjs http://localhost:3000/ mobiel.png 390 844 1 2       # hele pagina, telefoon
```

## Open punten, voor Alex

1. ~~`SKOOL_URL` in `lib/finit-links.ts` staat nog op `https://www.skool.com/`.~~ Ingevuld op 7 september: `https://www.skool.com/finit-solutions-3358`.
2. De structured data in `app/layout.tsx` (regel 117) bevat nog Leuven als adres. Site-breed, bewust niet aangeraakt.
3. De oude landingspagina's (`/hoe-het-werkt`, `/plan-gesprek`, `/succesverhalen`, ...) beschrijven nog het € 3.500-model en zijn niet gelinkt vanaf de homepage.
4. De vier nieuwe transcripten van de lesreeks (les 1.3, 2.1, 2.2, 2.3) staan bij Alex in `~/Skool` en zijn nog niet nagelezen. Ze staan niet in dit repo.
5. De e-commerce-case zegt in de resultatensectie "60 tot 70% van supportvragen automatisch" en in de FAQ "van 50 naar 5 mails per dag". Dat meet iets anders; Alex kiest of er één cijfer komt.
6. `business_model.md` zegt dat tokens in de € 90 zitten, les 8.6 zegt "eigen abonnement". De site claimt daarom alleen server, updates en opvolging.
7. `HomepageNewPlan.md` (maart 2026) is een ouder plan en is door deze branch ingehaald.
8. Stap 02 zegt nog "2 tot 4 weken", terwijl de bouw nu een onbeperkt aantal AI-werknemers dekt. Alex bevestigt of dat blijft staan.
9. Backup-frequentie, uptime en security-baselines liggen nog niet vast (playbook §8, bij Jord). Daarom staan er op de site alleen categorieën (hosting, bewaking, backups, updates), geen cijfers. Niet toevoegen zonder Jord.
10. De community op Skool heeft op 7 september 5 leden. Daarom toont het Skool-blok de cover en geen screenshot met ledental.
11. De herschreven prompt van stap 7 van de lesreeks ("Oplossingen": schermtest eerst, breintest tweede, geen plafond, mapping bakjes → secties, twee extra scopingvragen) staat nog in geen enkel repo. Alex zet hem in de lesreeks en, als hij wil, in finit-company.

## Werken met Claude Code op deze branch

- Tekst wijzigen: alleen `components/home/copy.ts`. Lees eerst de regels hierboven en in `components/home/README.md`.
- Blijf op deze branch (of een branch daarvan). Nooit naar `main` pushen zonder Alex.
- Na elke wijziging: `npx tsc --noEmit`, dan `npm run dev` en op 390 px kijken, dan een draft-deploy voor Alex.
- Niets veranderen aan `components/contact-form-popup.tsx`, `components/cookie-banner.tsx` en de n8n-flow.


## Tweede ronde: copy-optimalisaties van Alex

Branch `copy/homepage-optimalisatie`, 7 september 2026, bovenop tag `homepage-rework-v1`. Eén commit per punt, zodat elk punt apart terug te draaien is (`git revert <commit>`). Niets gepusht, niets gemerged; Alex beslist wanneer.

| Commit | Punt |
|---|---|
| `links: echte Skool-URL` | `SKOOL_URL` ingevuld. |
| `copy: hero-sub als belofte` | Hero-sub: wat jij legt, wat wij daarop bouwen. De verontschuldigende zin "voorlopig nog een ontwikkelaar nodig" is weg. |
| `copy: 'geen snelle fix' als kwalificatie` | Twee alinea's die bewust afschrikken wie een snelle fix zoekt. |
| `copy: stap 02 en 03 verantwoord` | Nieuwe detailblokken "Stap 02: wat je koopt voor € 4.500" en "Stap 03: wat de € 90 per maand dekt" onder de prijskaarten. Pijler "Jullie eigendom" en drie FAQ-antwoorden op dezelfde lijn. |
| `homepage: Skool-blok als echte deur` | Knop "Start zelf met je AI-fundament", Skool-woordmerk, cover van de community. |
| `brein: golven, scherptediepte, dichter` | Zie [§ Het brein in de hero](#het-brein-in-de-hero). |
| `homepage: stappen in detail als één openklikbaar blok` | Op feedback van Alex: de drie detailblokken onder de prijskaarten zijn één blok met drie openklikbare rijen geworden (`STAP_DETAILS` in `home-page.tsx`, stap 01 standaard open, één tegelijk). Elke prijskaart linkt onderaan met "Meer over deze stap" naar de juiste rij. |

### Beslissingen die erbij kwamen (van Alex)

12. **De bouw is € 4.500 vast, ongeacht de omvang.** Het is een loss leader; de marge zit in de € 90 per maand hosting. De scope moet streng zijn in soort, ruim in aantal.
13. **De grens uit stap 7 van de lesreeks is de grens op de site.** Twee tests, in deze volgorde: moet er een scherm getekend worden dat er nog niet is? Dan buiten (website, webshop, klantenportaal, boekingsmodule, nieuwe database), ook als het het brein zou gebruiken. Draait het op het brein? Dan binnen. Geen plafond. De assistent boven de AI-werknemers zit erin. **Gesloten of maatwerksoftware zonder koppeling of export valt buiten de implementatie** (Alex, 7 september, avond). Let op: de herwerkte stap-7-prompt zegt bij bakje 2 nog "tot aan de knop = binnen"; die moet hierop afgestemd worden (open punt 11).
14. **Het veiligheidsverhaal staat op de site.** De vier regels die op elke AI-werknemer getest worden (niets zelf versturen tenzij de klant dat per taak kiest, afgeschermde sleutels, aantoonbaar uit het fundament, pauzeknop en kostenplafond) komen uit `finit-company/finit/skills/11.2-agent-smoke-test` en `12.1-dev-go-live`. Daarom is "verstuurd" overal "staat klaar" geworden waar het botste.
15. **Het eigendomsverhaal wordt volledig verteld.** Tijdens het onderhoud beheert Finit de toegang (playbook §9); bij vertrek krijgt de klant code, gegevens en een dag begeleiding (exit-protocol). "Maandelijks opzegbaar" blijft staan.
16. **Twee labels voor dezelfde knop.** "Start de lesreeks" in nav en hero, "Start zelf met je AI-fundament" op het Skool-blok. Bewust: kort waar het een knop is, met resultaat waar het een deur is.
17. **Het brein blijft letterlijk waar.** Geen neuraal netwerk als cliché; wel golven die de werking van het fundament tonen, en scherptediepte. Het onderschrift blijft kloppen.

### Gecontroleerd

- `npx tsc --noEmit` schoon, `npm run build` slaagt.
- Screenshots op 1440×900 (vouw), 1440 volledige pagina en 390 volledige pagina, via `scripts/homepage/shot.mjs` op de statische `out/`-map. "Herken jij dit?" staat nog boven de vouw.
