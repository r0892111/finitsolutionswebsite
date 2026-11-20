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

**Wat we overnemen:** dezelfde volgorde, dezelfde verhoudingen (kop ongeveer 2,3 × de subzin, subzin grijzer dan de kop), het formulier vlak onder de video, `text-wrap: balance`, alles in één kolom. **Wat we niet overnemen:** het zwarte scherm met gloed (wij blijven wit en marineblauw), de knop in hoofdletters (te schreeuwerig voor ons publiek), de kop van 70 px op desktop (wij gaan tot ±60 px, zoals de hero op de homepage).

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
| 4K | ja, eenmalig ±$1,20 (premium encoding) | ja, ±$0,07/maand opslag; op het gratis plan niet bevestigd | **nee, max 1080p** | ja, maar zelf coderen |
| Eigen speler (hls.js) | ja, gewone .m3u8-link | ja, gewone .m3u8-link | ja | ja (zelf gemaakt) |
| Snelheid in België | servers in o.a. Brussel en Amsterdam | meerdere CDN's | servers in Brussel en Amsterdam | Cloudflare-CDN |
| Bedrijf / GDPR | **EU (Slovenië), opslag in Frankfurt** | VS (verwerkersovereenkomst tekenen) | VS | VS (EU-regio kiesbaar) |
| Werk om op te zetten | klein: upload, link kopiëren | klein | klein | groot: zelf coderen, ±500 bestanden uploaden |

**Aanbeveling: Bunny Stream.** Tussen ±$1 en ±$16 per maand, Europees bedrijf (eenvoudigste GDPR-verhaal), echte 4K voor ±$1,20 eenmalig, en een gewone HLS-link die we met één regel in de speler zetten. **Mux** is een goede tweede: gratis tot 100.000 bekeken minuten per maand en goede kijkcijfers (waar haken mensen af), maar Amerikaans, en 4K op het gratis plan is niet bevestigd. Cloudflare stopt bij 1080p; Supabase is het meeste werk en het duurst.

Nodig van Alex: een ja om een Bunny-account te maken (14 dagen gratis, daarna betalen met kaart, minimum $1/maand) en de video daar op te laden. Ik maak niets aan en upload niets zonder dat ja.

Bronnen: bunny.net/pricing/stream, bunny.net/docs/stream/premium-encoding, mux.com/pricing, mux.com/docs/guides/stream-videos-in-4k, developers.cloudflare.com/stream/pricing, supabase.com/pricing.

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
| De pagina | `components/hub/hub-pagina.tsx`, `app/hub/page.tsx`, `app/hub/resources/page.tsx` |
| Ondertitels opnieuw maken | `node scripts/hub/ondertitels.mjs <transcript.json>` |

**De echte video inpluggen:** in `components/hub/video.ts` de regel `bron` vervangen door de HLS-link (bv. `https://vz-….b-cdn.net/<id>/playlist.m3u8`), of in Netlify de variabele `NEXT_PUBLIC_HUB_VSL_BRON` zetten. Daarna de ondertitels opnieuw maken met het transcript van de nieuwe versie (de huidige zijn van de lange versie van 9:28). Nu staat er een voorlopige video van 7:44 met een klok in beeld.

**De speler:** alleen pauze en verder (knop linksonder of klikken op het beeld), spoelen wordt teruggezet, balk `1 − (1 − p)²` zoals Shadowboys, positie om de 5 s in localStorage, "Wil je verder kijken?" vanaf 15 s, op het einde "Herken je je bedrijf hierin?" met een knop naar het formulier. Ondertitels woord voor woord met het actieve woord gemarkeerd. Events in Google Tag Manager: `vsl_start`, `vsl_verder`, `vsl_voortgang` (25/50/75/100 %, echte voortgang).

**Het formulier:** rol, aantal mensen, waar de tijd naartoe gaat (A/B/C, ook met het toetsenbord), wat je eerst wil oplossen, dan naam, e-mail, telefoon en website. Verstuurt via het bestaande `/api/contact-submit`: de antwoorden staan bovenaan het bericht in de mail en op monday. **Aan de verzendkant is niets veranderd.**

**Het e-mailslot:** het adres gaat als contact naar Brevo (UTM_SOURCE = kanaal, UTM_MEDIUM = hub, UTM_CONTENT = post, OPT_IN = vinkje). Een bestaand contact wordt niet overschreven. Mails krijgt alleen wie het vinkje aanzet (standaard uit). Toegang blijft open via localStorage + een functioneel cookie van een jaar: na herladen, na een omweg langs een andere pagina van de site en bij een volgend bezoek. Op een ander toestel vraagt hij het één keer opnieuw (zonder login kan dat niet anders); hetzelfde adres opnieuw ingeven maakt in Brevo geen dubbel contact. Lukt Brevo even niet, dan gaat het slot toch open en sturen we het adres bij het volgende bezoek opnieuw.

## Beslissingen van Alex (20/11, tweede ronde) en wat er veranderde

| Punt | Beslissing | Wat er nu staat |
|---|---|---|
| Losse promptpagina's (`/prompts/…`) | Ook achter het slot | De prompts zitten achter hetzelfde slot (`components/prompts/prompt-slot.tsx`). Titel en uitleg van de pagina blijven zichtbaar. Wie het slot al opende (hub of andere promptpagina) ziet ze meteen; wie via een rechtstreekse link komt, ziet eerst het slot en na invullen meteen de prompts van díe pagina. Een zacht slot: de site is statisch, dus wie de broncode leest, vindt de tekst. |
| Doel van de mails | Af en toe AI-nieuwtjes en dingen waar je iets aan hebt | Tekst bij het vinkje: **"Ja, hou me op de hoogte.** Af en toe een mail met AI-nieuwtjes en tips waar je bedrijf echt iets aan heeft. Hooguit twee per maand. Afmelden kan altijd, met één klik." |
| Het vinkje | Optioneel, voorlopig standaard **uit** | Ongewijzigd uit: een vooraf aangevinkt vakje is geen geldige toestemming (AVG, arrest Planet49, WER art. XII.13). Het vinkje staat nu in een eigen kadertje, zodat het opvalt. |
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

1. **Hosting:** ja of nee voor Bunny Stream (zie hierboven).
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
