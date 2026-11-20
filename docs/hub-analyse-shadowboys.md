# Analyse: de applypagina van Shadowboys (20/11/2026)

Bron: https://shadowsociety.shadowboys.com/apply-page, bekeken op 1440, 1024, 768 en 390 px breed, met de code en de netwerkverzoeken erbij. Alleen gelezen; niets ingestuurd.

## Wat het is

- Een funnelpagina in **GoHighLevel** (LeadConnector), met daarin één blok eigen HTML, CSS en JavaScript (`.ss-optin`). De afbeeldingen komen van een eigen Cloudflare Pages-site.
- Zwart, met blauw licht en een raster op de achtergrond. Twee lettertypes: **Poppins 700** voor koppen en knoppen, de systeemletter (SF Pro) voor lopende tekst.
- Eén doel: het formulier invullen. Geen menu, geen andere links behalve de footer.

## De blokken, van boven naar onder

| # | Blok | Wat erin staat |
|---|---|---|
| 1 | Logo | Klein beeldmerk, gecentreerd |
| 2 | Badge (voor wie) | "For creators ready to sell high ticket offers." in een pil met een glazen rand |
| 3 | Kop (h1) | "Learn to build a digital product, and make your first **sales in 90 days.**" Het laatste stuk in blauw verloop |
| 4 | Subzin | Bewijs in één zin: "Copy my exact blueprint that took me from 0 to 100,000 followers and over $100,000 generated from social media." In grijs (wit op 43 %) |
| 5 | De video | Grote speler met afgeronde hoeken, blauwe gloed eromheen |
| 6 | Twee pillen | "No audience needed." / "No tech skills required." (bezwaren weg) |
| 7 | Grote knop | "APPLY TO SHADOW SOCIETY", springt naar het formulier eronder |
| 8 | Notitie onder de knop | "Takes 60 seconds, no card required." |
| 9 | Formulier | Tally, vraag per vraag, in een witte kaart |
| 10 | Dit is voor jou als / niet als | Vier ✅ en drie ❌, elk in een eigen rij |
| 11 | Tweede knop | Dezelfde knop nog eens |
| 12 | Footer | © + logo + Privacy · Terms · Contact |

Het formulier staat **meteen onder de video**, niet onderaan. Wie na de video wil, hoeft niet te zoeken.

## Tekstgroottes en maten

| Element | 1440 px | 1024 px | 768 px | 390 px |
|---|---|---|---|---|
| Badge | 30 px, 54 px hoog, max 632 px breed | 27,6 px | 20,7 px | 13 px, 40 px hoog |
| Kop (h1) | 70 px, regelafstand 1,1, letterafstand −0,06em, max 1209 px | 63,5 px | 48 px | 41,7 px (clamp 36–52), regelafstand 1,03 |
| Subzin | 30 px, regelafstand 1,27, max 979 px | 27,6 px | 21 px | 17 px, regelafstand 1,4 |
| Video | 1192 × 674 (16:9), hoek 50 px | 961 breed | 705 breed | 362 × 205, hoek 20 px |
| Knop | 887 × 101, tekst 47,5 px, hoofdletters | 887 × 96, 34 px | 705 × 96, 30 px | 362 × 58, 20 px |
| Notitie onder knop | 30 px | 22 px | 22 px | 13 px |
| Formulierkaart | 1011 breed, hoek 45 px | 961 | 705 | 362, hoek 24 px |
| "Dit is voor jou"-kop | 50 px | 50 px | 50 px | 35 px |
| Rijen ✅/❌ | tekst 36 px | 32 px | 25 px | 17 px |

- **Breedte:** inhoud max 1244 px, zijmarge 24 px (gsm 14 px, onder 380 px 10 px).
- **Ruimte:** logo → badge 27 px, badge → kop 25 px, kop → subzin 6 px, subzin → video 47 px (gsm 17 en 30 px), video → pillen ±100 px, knop → formulier ±55 px.
- **Breekpunten:** 1100 px (alles schaalt met `clamp()` op de schermbreedte), 767 px (gsm-opmaak), 600 px (speler), 380 px (kleinste telefoons).
- Koppen met `text-wrap: balance`, zodat er geen los woord op de laatste regel staat.
- Op een gsm van 390 × 844 zie je zonder scrollen: badge, kop, subzin, de hele video, de twee pillen en de bovenkant van de knop.

**Wat we overnemen:** dezelfde volgorde, dezelfde maten en witruimte (zie de tabel hieronder), het formulier vlak onder de video, `text-wrap: balance`, alles in één kolom. **Wat we niet overnemen:** het zwarte scherm met gloed (wij blijven wit en marineblauw), Poppins en de knop in hoofdletters (wij houden onze lettertypes).

## Maten gelijkgetrokken (20/11, wens van Alex)

Alex: de tekst en de knoppen moeten groter, met dezelfde verhoudingen als bij Shadowboys. Opnieuw gemeten in Chrome op 1440, 1024 en ±500 px (gsm-opmaak). Hun CSS gelezen: boven 1100 px vaste maten, daaronder schaalt alles mee met de schermbreedte, en vanaf 767 px de gsm-opmaak. Die formules staan nu ook in onze CSS (`.hub-…` in `app/globals.css`), in px, dus het klopt op elke breedte en niet alleen op deze drie.

Lettergrootte in px; SB = Shadowboys, vóór = onze hub vóór deze ronde.

| Element | 1440: SB / vóór / **nu** | 1024: SB / vóór / **nu** | 390: SB / vóór / **nu** |
|---|---|---|---|
| Badge | 30 / 14,4 / **30** (54 hoog) | 27,6 / 14 / **27,6** | 13 / 12,2 / **13** (40 hoog) |
| Kop (h1) | 70 / 61,9 / **70**, twee regels | 63,5 / 60,2 / **63,5** | 41,7 / 35,3 / **41,7** |
| Subzin | 30 / 20,7 / **30** | 27,6 / 20,1 / **27,6** | 17 / 15,9 / **17** |
| Video, breedte | 1192 / 1066 / **1192** | 976 / 953 / **961**¹ | 362 / 360 / **362** |
| Pillen | 30 / 14,4 / **30** (54 hoog) | 25,6 / 14 / **25,6** | 13 / 12,2 / **13** (40 hoog) |
| Knop onder de video | 887×101, 47,5 / 346×58, 17,1 / **887×100, 47,5** | 887×96, 33,8 / 336×56, 16,6 / **887×96, 33,8** | 362×58, 20,3 / 360×53, 15,9 / **362×58, 20,3** |
| Notitie onder de knop | 30 / 13,5 / **30** | 22 / 13,1 / **22** | 13 / 13,1 / **13** |
| Formulierkaart, breedte | 1011 / 576 / **1011** | 976 / 560 / **961**¹ | 362 / 360 / **362** |
| Sectietitels (twijfels, resources) ↔ hun "This is for you" | 50 / 36 / **50** | 50 / 35 / **50** | 35 / 30 / **35** |
| Twijfelvraag ↔ hun ✅/❌-rijen | 36 / 16,2 / **36** | 31,7 / 15,8 / **31,7** | 16,8 / 15,9 / **16,8** |
| Knop onder de twijfels ↔ hun tweede knop | 1002×108, 53,7 / 265×47, 14,4 / **1002×108, 53,7** | 38,2 / 14 / **38,2** | 362×60, 20,3 / 360×49, 15 / **362×60, 20,3** |
| Afspeelknop in de video | 76 tot 124 / 86 / **76 tot 124** | | |
| "Wil je verder kijken?" | 28 / 23 / **28** | | 15 / 15,8 / **15** |

¹ Zelfde regel als bij hen (scherm min 48 px); onze meetbrowser trekt er nog een schuifbalk van 15 px af.

Witruimte (desktop | gsm), gelijk aan Shadowboys:

| Van → naar | SB | vóór | **nu** |
|---|---|---|---|
| logo → badge | 27 \| 20 | 34 \| 28 | **27 \| 20** |
| badge → kop | 25 \| 20 | 18 \| 15 | **25 \| 20** |
| kop → subzin | 6 \| 17 | 18 \| 15 | **6 \| 17** |
| subzin → video | 47 \| 30 | 36 \| 26 | **47 \| 30** |
| video → pillen | 99 \| 58 | 29 \| 22 | **99 \| 58** |
| pillen → knop | 53 \| 26 | 28 \| 22 | **53 \| 26** |
| knop → notitie | 8 \| 7 | 9 \| 9 | **8 \| 7** |
| notitie → formulier | 39 \| 58 | 51 \| 37 | **39 \| 58** |

Inhoudskolom: max 1244 px met 24 px zijmarge (gsm 14 px, onder 380 px 10 px), zoals bij hen. Video max 1192 px, formulier max 1011 px, twijfels max 1022 px breed.

**Eigen keuzes waar Shadowboys niets heeft:** de antwoorden in de twijfels op ±0,8 × de vraag (29 px desktop, 16 px gsm), de uitleg onder een sectietitel even groot als de subzin. De tekst in het formulier zelf blijft: die is al iets groter dan bij hen (hun vraag 20 px, de onze ±22 px). Het logo en de resourcekaarten zijn ongewijzigd.

**Uitzondering, de gespreksknop (Alex, 20/11 namiddag):** op Shadowboys-maat was hij te groot en te opdringerig. Hij is nu een maat kleiner en rustiger: 28 px (1024 px breed: 26 px, gsm 16 tot 19 px), 80 px hoog (gsm 56 px), en zo breed als de tekst in plaats van de hele kolom. Het gewicht is 500, net als alle andere knoppen op de site (het lettertype was al het standaardlettertype, Schibsted Grotesk; het vette gewicht 600 maakte het verschil). De knop onder de video en die na de twijfels zijn nu even groot. De tabel hierboven geldt dus nog voor alles behalve deze knop.

**Uitzondering, kop → subzin (Alex, 20/11):** Shadowboys laat op desktop maar 6 px tussen kop en subzin (0,09 × hun kop van 70 px); op gsm 17 px (±0,4 × hun kop). Bij ons kwam daar nog de streep onder "jouw bedrijf werkt" bij, waardoor het nog krapper oogde. Nu overal ±0,4 × de kopgrootte: 28 px op desktop, 19 tot 26 px tot 1100 px breed, 20 px op gsm.

**Badge:** "Voor zaakvoerders/management van kmo's" (tekst van Alex, was "Voor zaakvoerders van Vlaamse kmo's"). Ook in de metabeschrijving (Google, delen op sociale media). Daarna een maat kleiner (Alex: "nog iets te groot"): 22 px op desktop (was 30, zoals Shadowboys), 15 tot 21 px tot 1100 px breed, gsm blijft 13 px. Dat is overal ±0,31 × de kop, de verhouding die Shadowboys en wij al op gsm hadden.

**Achtergrond met stippen (Alex, 20/11):** het stippenpatroon dat al in de case-kaarten op de homepage zit (`.hp-stippen`: marineblauw op 10 %, 1 px om de 14 px) ligt nu over de hele hubpagina en over de grijsblauwe twijfelband. De lichtblauwe gloed bovenaan loopt uit in transparant, zodat de stippen eronder zichtbaar worden. Het formulier en de kaarten blijven effen wit.

**Formulier, wat je te wachten staat:** bovenaan de kaart staat nu zichtbaar "Plan een vrijblijvend gesprek" met de uitleg "Eerst vijf korte vragen. Bij de laatste laat je je gegevens achter, en dan plannen we samen een moment in." De teller "Vraag X van 5" is vetter en marineblauw, en de laatste knop heet "Vraag het gesprek aan" (was "Verstuur"). De noot onder de knop zegt nu "Vul dit formulier in om een gesprek in te plannen. Duurt 60 seconden." (woorden van Alex, voorlopig). Een klik op de knop scrolt zacht tot het formulier midden in beeld staat; is het hoger dan het scherm (gsm), dan staat de bovenkant in beeld met 24 px ruimte erboven. Laatste stap (Alex, 20/11): naam, e-mailadres en telefoonnummer verplicht, "Website van je bedrijf (optioneel)". Geen browserballonnen maar een eigen melding onder het veld (rode rand); de knop blijft klikbaar en springt naar het eerste foute veld. Telefoon: 9 tot 15 cijfers, +32, spaties, punten en streepjes mogen. Dezelfde regels staan in `lib/contact-velden.ts` en gelden ook op de server (`contact-submit`), alleen voor inzendingen van /hub/: de popup en het vraagformulier elders op de site houden hun eigen regels. Flikkering onder de stappenbalk (Alex, 20/11): elke nieuwe vraag kwam binnen met `hp-wissel` (van onzichtbaar naar zichtbaar in 360 ms), zodat de inhoud onder de balk bij elke klik even helemaal wegviel. Nu `hub-stap-in`: de tekst blijft zichtbaar en zakt enkel 4 px op haar plaats (180 ms). De voortgangsbalk van de video flikkerde in Chrome niet (desktop en 390 px breed nagekeken) Bewust níet "kies zelf een moment": er is geen agenda, wij nemen contact op. Voorlopige tekst, Amina mag hem herschrijven (`components/hub/copy.ts`).

## Ritme: één schaal voor alle verticale ruimte (Alex, 20/11)

De maten van Shadowboys gaven willekeurige gaten (99 px onder de video, 8 px onder de knop, 91 px boven de laatste knop). Nu één schaal, als tokens op `.hub-ritme` in `app/globals.css`:

| Token | Desktop | Gsm | Waarvoor |
|---|---|---|---|
| `--hub-r2` | 16 | 12 | hoort bij elkaar: noot bij de knop, intro bij de sectietitel |
| `--hub-r3` | 24 | 20 | binnen een blok: logo, badge, kop, subzin; pillen naar knop; kaarten in een lijst |
| `--hub-r4` | 40 | 28 | tussen groepen in een blok: tekst naar video, video naar pillen, intro naar lijst, lijst naar knop |
| `--hub-r5` | 64 | 40 | een los blok: de noot naar het formulier |
| `--hub-r6` | 96 | 64 | tussen secties (boven- en onderkant van elke sectie) |

Nagemeten op de preview (1440 en 360 px): alle afstanden vallen exact op deze waarden. Nieuwe blokken op de hub gebruiken deze tokens (`mt-[var(--hub-r4)]` enz.), geen losse pixels.

## Eigen kijkmeting (Alex, 20/11)

Zonder cookies en zonder toestemming nodig: per kijkbeurt een willekeurig id in het geheugen van de pagina (`components/hub/kijkmeting.ts`). Om de 5 s, bij pauze, op het einde en bij het verlaten van de pagina gaat een hartslag naar `/api/vsl-meting` (`netlify/functions/vsl-meting.ts`): id, dag, video, start- en verste seconde, duur, bron, reel, gsm/desktop, kwaliteit, hervat. Geen IP-adres, geen user-agent.

- **Opslag:** Netlify Blobs, store `hub-vsl-kijkbeurten` (`lib/vsl-meting-opslag.ts`), één sleutel per kijkbeurt `JJJJ-MM-DD/<id>` met `max_s` (alleen omhoog), `duur_s`, `start_s`, `bron`, `reel`, `apparaat`, `kwaliteit`, `hervat`, `formulier`, `start`, `laatst`. Hoort bij de site zelf: geen extra account, gratis, weg te halen door de store te wissen. Geen Supabase (keuze hoofdchat/Alex: geen enkel bestaand project hoort bij de website).
- **Cijfers:** `/hub/cijfers/` (noindex, niet in de sitemap). De sleutel (Netlify `HUB_CIJFERS_SLEUTEL`) typ je in of zet je na het hekje: `/hub/cijfers/#sleutel=…`. Zo komt hij nooit in een link die gelogd wordt; de pagina stuurt hem in de header `x-hub-sleutel` en onthoudt hem alleen in dat tabblad. Periode 7/30/90/365 dagen, resultaat 5 min in cache. Retentie per seconde, kijkbeurten, gemiddelde kijktijd, % tot het einde, de vijf vensters van 10 s met de meeste afhakers (met wat Alex daar zegt), formulieren; filters per bron, apparaat en video. `?demo=1` toont verzonnen voorbeelddata.
- **Formulier:** "VSL bekeken tot X %" (verste plek van het hele bezoek) gaat mee in het bericht naar contact@ en monday, en als `vsl_procent` naar Tuesday. Het kijkbeurt-id gaat mee; contact-submit zet `formulier: true` op die kijkbeurt.
- **Privacy:** een alinea in de privacyverklaring (sectie 7).

## Tuesday: hubformulier naar het bord Leads › Socials (Alex, 20/11)

`contact-submit` maakt voor aanvragen van /hub/ ook een item op Tuesday (`POST https://crm.finitsolutions.be/api/boards/90000000549/items`, sleutel `CRM_SOCIALS_TOKEN` in Netlify, enkel dat bord). Naam van het item: het websitedomein zonder www, anders het maildomein (niet bij gmail, hotmail, telenet en co), anders de naam. Velden: status "New lead 0%", bron (TikTok, Instagram, YouTube, LinkedIn, Facebook, X, Threads; geen bron = Website; onbekend = Other), reel, vsl_procent, contact_name, contact_role, email, phone, website (met https://, alleen als ingevuld), grootte, meeste_tijd, message (wat ze eerst willen oplossen), pagina (de volledige URL).

- De eerste bron en reel van het bezoek blijven in sessionStorage (`finit_hub_herkomst`), zodat ze niet verloren gaan als iemand eerst rondklikt.
- Tuesday loopt parallel met monday, max 5 s. Mislukt het, dan vertrekken mail en monday gewoon, de bezoeker ziet "gelukt", de mail meldt "Tuesday: item aanmaken mislukt", en de log bevat alleen de status (geen persoonsgegevens, geen sleutel). Monday blijft parallel lopen tot de overstap.
- Geen dubbele items: de knop staat uit tijdens het versturen, en een tweede klik in dezelfde milliseconden wordt genegeerd.
- Zonder `CRM_SOCIALS_TOKEN` slaat de functie Tuesday over (`tuesday: "off"` in het antwoord).

## Cookiebanner (Alex, 20/11)

Google Tag Manager (en dus GA4 en pixels) laadt pas na "Accepteren" of een eerder bewaarde ja (`applyConsentMode` in `lib/consent.ts`). Daarvoor: geen script, geen aanvraag naar Google, geen "advanced consent mode" meer. De banner is een smalle balk onderaan die pas verschijnt na de eerste scroll of na 10 s; Weigeren en Accepteren zijn even groot; Instellingen opent de bestaande instellingen. Intrekken herlaadt de pagina zodat GTM en Leadinfo stoppen. Dit geldt voor de hele site.

## De videospeler

Ze hadden eerst **Vturb** (een betaalde VSL-speler, `converteai.net`). In november 2026 vervangen door een eigen speler. De code staat leesbaar in de pagina:

- Gewone `<video>` met een **mp4-bestand** (`shadow-society-vsl.mp4`) uit de bestandsopslag van GoHighLevel. **Geen HLS, geen adaptieve kwaliteit:** iedereen laadt hetzelfde bestand.
- `preload="metadata"`, `playsinline`, en alles wat ze kunnen uitzetten staat uit: geen native bediening, geen beeld-in-beeld, geen casten, geen download, geen volledig scherm, geen snelheid. Rechtsklik op de speler is geblokkeerd.
- **Starten:** een grote blauwe ronde knop (76–124 px) op een donkere laag. Klik = afspelen met geluid.
- **Geen pauze:** pauzeert de video toch (bv. via de koptelefoon), dan speelt de code hem meteen verder. Ook de knoppen op het vergrendelscherm (mediaSession) doen niets.
- **De voortgangsbalk "liegt":** 6 px hoog (gsm 4 px) onderaan, blauw. De breedte is **`1 − (1 − p)²`**, met p het echte deel dat al bekeken is. Op 25 % van de video staat de balk op 44 %, halverwege op 75 %, op 75 % al op 94 %. De eerste helft lijkt dus snel te gaan; de video lijkt korter dan hij is. Overgang van 0,25 s, zodat hij vloeiend loopt.
- **Verder kijken:** elke 5 seconden wordt de positie bewaard in localStorage (`ss_vsl_position_v1`), met try/catch. Kom je terug en was je verder dan 15 seconden, dan staat er in plaats van de afspeelknop: "Do you want to continue watching this video?" met **Continue watching** (blauw) en **Start from the beginning**. Op het einde wordt de positie gewist.
- **Ondertitels:** in de video gebrand, niet door de speler. Woord voor woord, het actieve woord in een lichtblauw vakje ("If you are **watching** this video").

**Wat wij anders doen:** HLS met hls.js (een gsm op 4G krijgt 720p, een groot scherm 4K), en wél een pauzeknop (Alex' wens). Dezelfde curve voor de balk (we maken de sterkte instelbaar), dezelfde vraag na herladen. De ondertitels komen uit het transcript als laag boven het beeld, zodat ze aan of uit kunnen en de video zelf zonder blijft.

## Het formulier

- **Tally** (`tally.so/embed/OQlY67`), ingeladen als iframe zodra het formulier bijna in beeld komt, met een tracking-id in een verborgen veld. Een witte kaart met 45 px hoeken.
- **Voortgangsbalk bovenaan:** zes losse streepjes naast elkaar, één per stap. Het streepje van de huidige stap kleurt.
- **Eén vraag per scherm**, met een vet stuk in de vraag ("Have you ever tried **selling digital products before?**"). Keuzes als knoppen met een letter ervoor (**A** Yes, **B** No), die je ook met de toets A of B kiest. Daaronder een zwarte knop "Next →". Vanaf stap 2 een terugknop.
- **De volgorde:**
  1. Ooit al digitale producten verkocht? (ja/nee)
  2. Leeftijd (5 keuzes)
  3. Instagram-naam (tekst)
  4. Waar heb je het meeste hulp bij nodig? (4 keuzes)
  5. Naam, e-mail, telefoon, met "If approved, I'll also send you a free resource I don't share publicly."
  6. Budget dat je kan investeren (5 keuzes, met voorwaardelijke logica)
  7. Bedankt: "my team will be in contact with you soon!"
- Slim: de makkelijke vragen eerst (ja/nee, leeftijd). Pas als je al vier stappen geïnvesteerd hebt, vragen ze je gegevens. Budget als laatste.

**Wat wij overnemen:** de streepjes bovenaan, één vraag per scherm, A/B/C-keuzes (ook met het toetsenbord), terug-knop, makkelijke vragen eerst en contactgegevens later. **Wat wij houden:** onze eigen velden en onze eigen verzending (`/api/contact-submit` → monday + mail naar contact@). Geen Tally, geen extra dienst. De keuzevragen gaan als tekst mee in het veld "bericht", dus aan de verzendkant verandert niets.

## Metadata

| | Shadowboys | Wat wij doen |
|---|---|---|
| `<title>` | **leeg** | Eigen titel |
| Description | geen | Eigen omschrijving |
| OG/Twitter-beeld | geen (alleen `og:type`) | Eigen beeld van 1200 × 630 (de thumbnail van de video) |
| Favicon | het standaardicoon van GoHighLevel | Ons eigen favicon (staat al op de site) |
| theme-color | geen | `#1A2D63` (staat al site-breed) |
| Taal | `en` | `nl-BE` |

Hier doen ze het slecht: een gedeelde link op WhatsApp of LinkedIn toont bij hen geen titel en geen beeld. Dat nemen we dus niet over.

## Overige dingen die opvallen

- **Tracking:** eigen id (`shadow_trakyo_id`) in localStorage én in een cookie van 90 dagen, met de utm-parameters van het eerste en laatste bezoek. Na 2 seconden halen ze de utm's uit de adresbalk. Wij houden ons eigen systeem (`?bron=`, `?reel=`, events in Google Tag Manager).
- **Verschijnen bij scrollen:** blokken schuiven zacht in beeld (IntersectionObserver), uit bij "verminderde beweging".
- **Toegankelijkheid:** een verborgen "Skip to content"-link en een verborgen kop boven het formulier. Goed idee, nemen we over.

---

# Hosting van de video: advies (20/11/2026)

De master is 7 GB (4K, 50 beelden per seconde, 9:28; na het inkorten ±7:44). Zo groot zet je niet als één bestand op een website. Je laat hem opdelen in kleine stukjes in verschillende kwaliteiten (**HLS**, adaptieve streaming): een gsm op 4G krijgt 720p, een groot scherm 1080p of 4K, en de speler schakelt vanzelf. Onze speler doet dat met **hls.js**; Safari en iPhone kunnen het zelf.

Prijzen van de officiële prijspagina's op 20/11/2026, in dollar, zonder btw. Rekenvoorbeeld: elke kijker kijkt gemiddeld 3 minuten (bij de aanbieders die per GB rekenen: ±26 MB per minuut, gemengd 720p/1080p).

| | **Bunny Stream** | **Mux** | Cloudflare Stream | Supabase Storage |
|---|---|---|---|---|
| Hoe ze rekenen | per GB opslag en per GB verkeer | per minuut opslag en per minuut bekeken | per 1.000 minuten opslag en bekeken | vast abonnement + per GB verkeer |
| 500 kijkers/maand | **$1** (minimum) | **$0** | $6,50 | $25 |
| 3.000 kijkers/maand | **±$2,40** | **$0** | $14 | $25 |
| 20.000 kijkers/maand | **±$16** | **$0** (gratis tot 100.000 minuten) | $65 | ±$64 |
| 4K | ja: 2160p aanvinken, premium encoding eenmalig ±$1,20 | ja, ±$0,07/maand opslag; op het gratis plan niet bevestigd | **nee, max 1080p** | ja, maar zelf coderen |
| Eigen speler (hls.js) | ja, gewone .m3u8-link | ja, gewone .m3u8-link | ja | ja (zelf gemaakt) |
| Snelheid in België | servers in o.a. Brussel en Amsterdam | meerdere CDN's | servers in Brussel en Amsterdam | Cloudflare-CDN |
| Bedrijf / GDPR | **EU (Slovenië), opslag in Frankfurt** | VS (verwerkersovereenkomst tekenen) | VS | VS (EU-regio kiesbaar) |
| Werk om op te zetten | klein: upload, link kopiëren | klein | klein | groot: zelf coderen, ±500 bestanden uploaden |

**Aanbeveling: Bunny Stream.** Tussen ±$1 en ±$16 per maand, Europees bedrijf (eenvoudigste GDPR-verhaal), echte 4K voor ±$1,20 eenmalig, en een gewone HLS-link die we met één regel in de speler zetten. **Mux** is een goede tweede: gratis tot 100.000 bekeken minuten per maand en goede kijkcijfers (waar haken mensen af), maar Amerikaans, en 4K op het gratis plan is niet bevestigd. Cloudflare stopt bij 1080p; Supabase is het meeste werk en het duurst.

## 4K (wens van Alex, 20/11)

Kijkers moeten de video echt in 4K kunnen zien. Wat daarvoor nodig is:

**Bij Bunny Stream** (bij het opzetten; er is nog niets aangemaakt): in de videobibliotheek › Encoding › Enabled resolutions **2160p aanvinken**, samen met 1080p, 720p en 480p (zie de stappen hieronder). Bunny codeert gratis tot 1080p; 1440p en 2160p vragen premium encoding, eenmalig ±$1,20 voor deze video. Best aanzetten vóór het opladen, anders moet de video opnieuw gecodeerd worden.

**Wat een kijkbeurt kost aan verkeer.** Gemeten op de echte VSL v3 bij Bunny (20/11): 2160p gemiddeld 12,4 Mbit/s (pieken tot 20), 1080p 3,1, 720p 1,8, 480p 1,1. Verkeer in Europa kost $0,01 per GB.

| Eén volledige kijkbeurt (7:44) | Data | Kost |
|---|---|---|
| 4K (2160p) | ±0,72 GB | ±$0,007 |
| 1080p | ±0,18 GB | ±$0,002 |

Dus 1.000 volledige kijkbeurten in 4K kosten ±$7 (op Bunny's goedkopere Volume-netwerk ongeveer de helft). Eén 4K-kijker kost zoveel als vier 1080p-kijkers. De maandbedragen in de tabel hierboven gaan uit van gemengd 720p/1080p; kijken veel mensen in 4K, dan stijgen ze mee. Alleen wie een groot scherm én een snelle verbinding heeft, krijgt 4K: op een gsm blijft het 720p of 1080p, en niet iedereen kijkt tot het einde.

**In de speler:**
- Geen plafond op de kwaliteit. hls.js mag tot de hoogste kwaliteit gaan, ook als de speler op het scherm kleiner is dan 4K (`capLevelToPlayerSize` staat uit).
- Op een groot scherm (vanaf ±2560 pixels, retina meegerekend) met een snelle verbinding begint de speler meteen in 4K: hij slaat de snelheidstest van hls.js over (die laadt eerst een stukje in de laagste kwaliteit). Daarna meet hls.js de echte snelheid en zakt hij alleen als het zou haperen. Op kleinere schermen doet hls.js wel eerst die test.
- Een klein kwaliteitsmenu rechtsonder in de video: Auto / 4K / 1080p / 720p, alleen zichtbaar tijdens het afspelen of op pauze. **Spoelen blijft onmogelijk:** het menu wisselt alleen de kwaliteit, de video loopt verder vanaf dezelfde seconde.
- Chrome, Edge, Firefox, Safari op de Mac en Android gebruiken hls.js. iPhone en iPad spelen HLS zelf af en kiezen zelf de kwaliteit; daar staat geen menu.
- De voorlopige video heeft nu vier kwaliteiten (360p, 720p, 1080p, 4K) en toont in beeld welke er speelt ("Kwaliteit: 4K (2160p)").

## Bunny opzetten zonder verrassingen (Bunny goedgekeurd door Alex, 20/11)

Voorwaarde van Alex: nooit een onverwacht hoge kost. Eerst eerlijk hoe Bunny rekent:

- Je laadt vooraf tegoed op, en het verbruik gaat er telkens af.
- **Bunny stopt niet hard bij $0.** Het verbruik wordt achteraf in korte stappen afgerekend, dus het saldo kan negatief gaan; dat bedrag blijf je verschuldigd. Bunny mailt dan elke dag en zet het account binnen 4 dagen uit (bij een nieuw account of een groot bedrag sneller).
- Zonder automatisch bijladen haalt Bunny nooit zelf geld van je kaart.
- Daarom is het **maandplafond op het verkeer** (stap 3) de echte harde grens.

**Zo staat het nu (20/11, ingesteld door de hoofdchat):** bibliotheek `finit-vsl`; toegelaten sites finitsolutions.be, www.finitsolutions.be, `*.netlify.app` en localhost; "block direct URL file access" uit; maandplafond **1 TB** (dus hooguit ±$10 verkeer per maand); prepaid zonder automatisch bijladen. **Token-authenticatie staat bewust uit.** De code ervoor staat klaar maar doet niets zolang `NEXT_PUBLIC_HUB_VSL_TOKEN` niet op `1` staat; aanzetten kan later met stap 4 hieronder.

Wat het dan hooguit kost:

| | Kost |
|---|---|
| Verkeer | hooguit ±$5 per maand (plafond 500 GB × $0,01 per GB) |
| Opslag van de video (alle kwaliteiten + het origineel) | enkele tientallen cent per maand |
| 4K-codering (premium encoding, alleen x264) | eenmalig ±$1,16 (7:44 × $0,15 per minuut) |
| Minimum | $1 per maand, ook als je minder verbruikt |

**1. Account en tegoed**
1. Account maken op bunny.net en tweestapsverificatie aanzetten.
2. Billing › Recharge Account › **$10** (het kleinste vaste bedrag), met kaart of PayPal. Dat dekt minstens twee maanden, ook als het plafond vol raakt.
3. **Auto-Recharge niet aanzetten.** Het staat standaard uit; Bunny haalt alleen automatisch geld van je kaart als je dat zelf aanzet.
4. Account Settings › Notification settings › **Notification emails aan**. Dat zijn de mails over je saldo: als het laag staat, en elke dag zolang het negatief is. Een eigen drempel kiezen kan niet.

**2. Videobibliotheek (alles vóór het opladen: de instellingen gelden alleen voor video's die je daarna oplaadt)**
1. Stream › Add Video Library. Opslag in Europa (Frankfurt), geen extra replicatieregio's.
2. Encoding › Enabled resolutions: **2160p, 1080p, 720p en 480p** aan, de rest uit.
3. Premium encoding aan (nodig voor 2160p), met als enige codec **x264**: elke extra codec kost opnieuw.
4. MP4 fallback uit (niet nodig). Keep original files mag aan blijven: dat kost enkele cent per maand, en zonder origineel kan Bunny de video later niet opnieuw coderen.

**3. Maandplafond op het verkeer (de harde grens)**
1. Stream › bibliotheek › API › Pull Zone › Manage › Limits › **Monthly bandwidth limit: 500** (GB).
2. 500 GB is ±690 volledige kijkbeurten in 4K of ±2.700 in 1080p; het ingestelde plafond van 1 TB het dubbele.
3. Let op: is het plafond vol, dan speelt de video niet meer tot de volgende maand; de speler toont dan "De video laadt niet". Kijk de eerste weken naar het verbruik (Stream › Statistics) en trek het plafond op als de hub goed loopt (1.000 GB ≈ $10).

**4. Alleen onze site (tegen leeching)**
1. Stream › bibliotheek › Security › **Allowed domains**: `finitsolutions.be`, `www.finitsolutions.be` en, zolang we op de previews testen, `*.netlify.app` (na de livegang weghalen).
2. "Block direct URL file access" **niet** aanzetten. Sommige toestellen en apps melden niet altijd van welke site een video-aanvraag komt, en dan speelt de video daar niet. Het token hieronder houdt directe links toch al tegen.
3. **Token-authenticatie** (de sterkste bescherming): in de pull zone van de bibliotheek (Stream › bibliotheek › API › Pull Zone › Manage) › Security › Token Authentication aan, en de **URL Token Authentication Key** kopiëren. Elke kijker krijgt dan een link die 12 uur geldig is en alleen voor deze video werkt. Wie de link kopieert, heeft er na 12 uur niets meer aan.
4. In Netlify (Site configuration › Environment variables), daarna opnieuw deployen:
   - `NEXT_PUBLIC_HUB_VSL_BRON` = de HLS-link van de video (`https://vz-….b-cdn.net/<video-id>/playlist.m3u8`)
   - `NEXT_PUBLIC_HUB_VSL_TOKEN` = `1`
   - `BUNNY_TOKEN_SLEUTEL` = de sleutel uit stap 3 (geheim: alleen in Netlify, nooit in de code of in een chat)

   Doe dit vóór de hub live gaat: tussen het aanzetten bij Bunny en de nieuwe deploy speelt de video even niet.

**5. Opladen en testen (pas na Alex' ja)**
1. De video opladen, wachten tot alle kwaliteiten klaar zijn, en de HLS-link kopiëren (bij de video: "HLS Playlist URL").
2. Op de preview: de video speelt en het menu toont Auto / 4K / 1080p / 720p.
3. De HLS-link rechtstreeks in een nieuw tabblad openen: dat moet een fout geven (403). Dan werkt de bescherming.
4. Na een dag: Stream › Statistics toont het verkeer, Billing wat er van het tegoed afging.

**Wat er in de code klaarstaat:** `netlify/functions/vsl-bron.ts` (`/api/vsl-bron`) maakt de tijdelijke link met dezelfde berekening als Bunny's eigen voorbeeld (gecontroleerd tegen hun testwaarde) en ondertekent alleen Bunny-videolinks. Zonder `NEXT_PUBLIC_HUB_VSL_TOKEN=1` werkt de speler zoals voorheen. Lukt het ondertekenen niet, of weigert Bunny de video (plafond vol, token verlopen), dan toont de speler "De video laadt niet" in plaats van eindeloos te laden.

Bronnen: bunny.net/pricing/stream, bunny.net/docs/stream/premium-encoding, bunny.net/docs (stream/encoding, billing/negative-balance, billing/auto-recharge, cdn/performance/network-limits, stream/security-options, cdn/security/token-authentication/advanced), mux.com/pricing, mux.com/docs/guides/stream-videos-in-4k, developers.cloudflare.com/stream/pricing, supabase.com/pricing.

---

# Wat er gebouwd is (tak `claude/hub-vsl-9cfac9`)

| Wat | Waar |
|---|---|
| Alle tekst (Amina vervangt alleen dit bestand) | `components/hub/copy.ts` |
| De video: bron, affiche, ondertitels, sterkte van de balk | `components/hub/video.ts` |
| De speler | `components/hub/vsl-speler.tsx` |
| Formulier vraag per vraag | `components/hub/stap-formulier.tsx` |
| Resources + e-mailslot | `components/hub/resource-sectie.tsx`, `components/hub/slot-formulier.tsx`, `lib/hub-toegang.ts` |
| Slot op de promptpagina's | `components/prompts/prompt-slot.tsx` |
| Adres bewaren in Brevo | `netlify/functions/hub-toegang.ts` (`/api/hub-toegang`) |
| Tijdelijke videolink (token-authenticatie bij Bunny) | `netlify/functions/vsl-bron.ts` (`/api/vsl-bron`) |
| De pagina | `components/hub/hub-pagina.tsx`, `app/hub/page.tsx`, `app/hub/resources/page.tsx` |
| Ondertitels opnieuw maken | `node scripts/hub/ondertitels.mjs <transcript.json>` |

**De echte video inpluggen:** in `components/hub/video.ts` de regel `bron` vervangen door de HLS-link (bv. `https://vz-….b-cdn.net/<id>/playlist.m3u8`), of in Netlify de variabele `NEXT_PUBLIC_HUB_VSL_BRON` zetten. Ondertitels en affiche zijn al van v3 (7:43,8; transcript uit de motion-studio). Verandert de montage nog, maak de ondertitels dan opnieuw. Tot de link er staat, speelt een voorlopige video van 7:44 met een klok in beeld.

**De speler:** alleen pauze en verder (knop linksonder of klikken op het beeld), spoelen wordt teruggezet, balk `1 − (1 − p)²` zoals Shadowboys, positie om de 5 s in localStorage, "Wil je verder kijken?" vanaf 15 s, op het einde "Herken je je bedrijf hierin?" met een knop naar het formulier. Ondertitels staan standaard uit (Alex, 20/11): de kijker zet ze aan met de knop rechtsonder, naast het kwaliteitsmenu, en die keuze wordt onthouden (localStorage `finit_hub_vsl_ondertitels`). Stijl zoals bij reels: korte stukjes (max. 5 woorden), witte vette Schibsted met een dunne donkere rand en een zachte schaduw, zonder vak en zonder markering per woord, ±3 % van de videobreedte (min. 15 px op gsm). Kwaliteitsmenu rechtsonder (Auto / 4K / 1080p / 720p, zie "4K" hierboven). Events in Google Tag Manager: `vsl_start`, `vsl_verder`, `vsl_voortgang` (25/50/75/100 %, echte voortgang), `vsl_kwaliteit`, `vsl_ondertitels` (aan/uit).

**Het formulier:** rol, aantal mensen, waar de tijd naartoe gaat (A/B/C, ook met het toetsenbord), wat je eerst wil oplossen, dan naam, e-mail, telefoon en website. Verstuurt via het bestaande `/api/contact-submit`: de antwoorden staan bovenaan het bericht in de mail en op monday. **Aan de verzendkant is niets veranderd.**

**Het e-mailslot:** het adres gaat als contact naar Brevo (UTM_SOURCE = kanaal, UTM_MEDIUM = hub, UTM_CONTENT = post, OPT_IN = vinkje). Een bestaand contact wordt niet overschreven. Mails krijgt alleen wie het vinkje aanzet (standaard uit). Toegang blijft open via localStorage + een functioneel cookie van een jaar: na herladen, na een omweg langs een andere pagina van de site en bij een volgend bezoek. Op een ander toestel vraagt hij het één keer opnieuw (zonder login kan dat niet anders); hetzelfde adres opnieuw ingeven maakt in Brevo geen dubbel contact. Lukt Brevo even niet, dan gaat het slot toch open en sturen we het adres bij het volgende bezoek opnieuw.

## Beslissingen van Alex (20/11, tweede ronde) en wat er veranderde

| Punt | Beslissing | Wat er nu staat |
|---|---|---|
| Losse promptpagina's (`/prompts/…`) | Ook achter het slot | De prompts zitten achter hetzelfde slot (`components/prompts/prompt-slot.tsx`). Titel en uitleg van de pagina blijven zichtbaar. Wie het slot al opende (hub of andere promptpagina) ziet ze meteen; wie via een rechtstreekse link komt, ziet eerst het slot en na invullen meteen de prompts van díe pagina. Een zacht slot: de site is statisch, dus wie de broncode leest, vindt de tekst. |
| Doel van de mails | Af en toe AI-nieuwtjes en dingen waar je iets aan hebt | Tekst bij het vinkje: **"Ja, hou me op de hoogte.** Af en toe een mail met AI-nieuwtjes en tips waar je bedrijf echt iets aan heeft. Hooguit twee per maand. Afmelden kan altijd, met één klik." |
| Het vinkje | Optioneel en standaard **uit** (definitief, Alex 20/11) | Ongewijzigd uit: een vooraf aangevinkt vakje is geen geldige toestemming (AVG, arrest Planet49, WER art. XII.13). Het vinkje staat nu in een eigen kadertje, zodat het opvalt. |
| Zonder vinkje | Adres dient alleen om het slot te openen | Onder het formulier: "Zonder vinkje gebruiken we je adres alleen om de prompts en gidsen voor je te openen: je krijgt dan geen mails. We geven je adres aan niemand door." In Brevo: OPT_IN = nee, op geen enkele lijst. |
| Brevo-lijst | Komt van Alex | Zet het nummer in Netlify als `BREVO_HUB_LIJST_ID`; wie aanvinkt, komt er dan vanzelf op. |
| Tuesday | Later automatisch, nu nog niet bouwen | Voorstel hieronder. |

Ook aangepast: de knop "Plan een call met Karel" onderaan de promptpagina's ging naar `/hub/#karel`, dat bestaat niet meer. Die gaat nu naar `#gesprek` (het formulier), en de hub stuurt de oude ankers `#karel`, `#laten` en `#keuze` ook naar het formulier, voor oude links in DM's en posts.

**Let op: "hooguit twee per maand"** is een belofte die ik zelf invulde, omdat de tekst concreet moest zijn. Klopt dat ritme niet, pas het dan aan in `components/hub/copy.ts` (en in de privacytekst hieronder).

### Voorgestelde privacytekst (voor de privacyverklaring)

In de tabel "waarvoor gebruiken we uw gegevens", twee regels:

1. *E-mailadres. Om de gratis prompts en gidsen op finitsolutions.be/hub voor u te openen. Rechtsgrond: uitvoering van uw vraag. Bewaard tot u vraagt het te wissen. Zonder uw toestemming sturen we u geen mails.*
2. *E-mailadres, als u het vakje aanvinkt. Om u af en toe (hooguit twee keer per maand) te mailen met AI-nieuwtjes en tips waar uw bedrijf iets aan heeft. Rechtsgrond: toestemming. Afmelden kan altijd via de link onderaan elke mail. Bewaard tot u zich afmeldt.*

En in de cookieverklaring: *`finit_hub_toegang`, functioneel, 1 jaar: onthoudt dat u de prompts en gidsen al opende, zodat we het niet opnieuw vragen.*

## Nog open voor Alex

1. **Hosting:** Bunny Stream is goedgekeurd (20/11). Account en tegoed maakt Alex zelf (of een sessie in zijn browser), volgens "Bunny opzetten zonder verrassingen" hierboven. De video opladen pas na zijn ja.
2. **Privacy- en cookieverklaring:** de teksten hierboven toevoegen (of laten nakijken). Het slot staat online vanaf de merge, dus best samen.
3. **Brevo-lijst:** het nummer van de lijst (`BREVO_HUB_LIJST_ID`).
4. **De lesreeks/Skool en de vacatures:** Skool is van de hub (zoals gevraagd), maar staat nog onderaan elke promptpagina. De vacatures staan als kleine link in de footer van de hub.

## Voorstel: hubformulier en aanmeldingen naar Tuesday (finit-crm)

Bekeken op `origin/main` van Finit-Solutions-BV/finit-crm (20/11), niets gebouwd.

**Wat Tuesday al heeft:** een route voor websiteleads, `POST https://crm.finitsolutions.be/api/intake/website-lead` (ticket T-33, staat op main).
- Je meldt je aan met een API-sleutel van een aparte gebruiker die alleen het bord Leads › Content mag zien. Die sleutel staat op de server, nooit in de browser.
- Body: `{ name, email, phone?, website?, page?, message }`; `name`, `email` en `message` zijn verplicht.
- Het item komt op Leads › Content met status `New lead 0%`. De itemnaam is de website zonder `www.` (anders het maildomein, anders de naam). Hetzelfde adres binnen 10 minuten maakt geen tweede item.
- Voor aanmeldingen zonder vraag (het e-mailslot) is er nog niets.

**Voorstel, in twee stappen:**
1. **Het contactformulier (ook dat van de hub)** → Tuesday. In `netlify/functions/contact-submit.ts`, naast (later in plaats van) monday: dezelfde velden posten naar de route hierboven. Velden: `naam`→`name`, `telefoonnummer`→`phone`, `bedrijfswebsite`→`website`, `bron`→`page`, `bericht`→`message` (met de antwoorden van de keuzevragen erin). Twee Netlify-variabelen: `TUESDAY_URL` en `TUESDAY_TOKEN`. Ongeveer 20 regels, zelfde vangnet als monday: mislukt Tuesday, dan vertrekt de mail toch met een melding. Een tijd monday én Tuesday laten lopen, daarna monday uitzetten.
   - Nodig: Jord maakt in Tuesday de gebruiker met alleen toegang tot Content en een sleutel (`POST /api/users/:id/tokens`). Daarna Alex' ja om de code te wijzigen, want dat raakt de verzendkant van het formulier.
2. **Aanmeldingen via het e-mailslot** horen niet op het leadsbord: dat zijn geen aanvragen, en het zouden er veel worden. Brevo blijft de bron voor wie mails wil (daar zit ook het afmelden). Wil Alex ze toch in Tuesday, dan vraagt dat Jord om een eigen route (bv. `POST /api/intake/website-signup` naar een bord "Hub-aanmeldingen" met e-mail, bron, post en vinkje ja/nee). Onze functie `hub-toegang` stuurt ze dan door, op dezelfde manier als stap 1.
