/* eslint-disable react/no-unescaped-entities */
"use client";

import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

export default function CookieVerklaringPage() {
  return (
    <main className="pt-20">
      <section className="relative py-16 md:py-24 bg-background">
        <div className="container relative mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary mb-6"
            >
              <span>Cookieverklaring</span> <ChevronRight className="h-4 w-4 ml-1" />
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl font-bold mb-2"
            >
              COOKIEVERKLARING
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="text-muted-foreground mb-8"
            >
              Versie <strong>08.03.2026</strong>
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="prose prose-lg dark:prose-invert max-w-none"
            >
              {/* Intro */}
              <h2 className="text-2xl font-semibold mt-8 mb-4" id="intro">Inleiding</h2>
              <p>Dank u voor uw bezoek aan onze website!</p>
              <p>
                Wij, Finit Solutions, gevestigd te Guldensporenlaan 9, 3120 Tremelo en ingeschreven in de
                Kruispuntbank van Ondernemingen onder het nummer 1020.600.643 (RPR Leuven) (
                Hierna "Finit Solutions", "wij" of "we"), willen de bezoekers van onze website via deze
                cookieverklaring informeren over welke cookies en/of gelijkaardige technologieën op onze
                website gebruikt worden, waarom wij dat doen en hoe je cookies kan verwijderen of
                uitschakelen.
              </p>
              <p>
                Deze cookieverklaring kan door ons worden aangepast als nieuwe ontwikkelingen daartoe
                aanleiding geven. De meest actuele versie van de cookieverklaring kunt u steeds op onze
                website vinden.
              </p>

              {/* 1 */}
              <h2 className="text-2xl font-semibold mt-8 mb-4" id="wat-is-een-cookie">1. Wat is een cookie?</h2>
              <p>
                Een cookie is in het algemeen een klein tekst- en cijferbestand dat wij tijdens een bezoek
                aan onze website, versturen en opslaan in je webbrowser of op je mobiel apparaat. Wanneer
                je de volgende keer onze website bezoekt met dezelfde webbrowser of hetzelfde apparaat,
                wordt deze informatie terug naar onze website gestuurd. Cookies helpen ons zo om
                bijvoorbeeld jouw voorkeuren bij het gebruik van onze website onthouden (bv. je taalkeuze),
                tenzij je jouw browserinstellingen hebt aangepast zodat die cookies zal weigeren.
              </p>
              <p>
                Naast cookies maken wij ook gebruik van <strong>local storage</strong> — een soortgelijke
                browsertechnologie waarmee gegevens lokaal op uw apparaat worden opgeslagen (bv. uw
                cookie-voorkeuren). Deze werken vergelijkbaar met cookies, maar worden niet automatisch
                meegestuurd bij elk verzoek aan de server.
              </p>

              {/* 2 */}
              <h2 className="text-2xl font-semibold mt-8 mb-4" id="soorten-cookies">2. Soorten cookies</h2>
              <p>Er bestaan verschillende soorten cookies. Cookies kunnen worden onderverdeeld naar gelang hun oorsprong:</p>
              <p>● <strong>First party cookies</strong> zijn technische cookies die door ons worden geplaatst en die ervoor zorgen dat onze website goed functioneert. Dit verhoogt de kwaliteit van onze producten en diensten.</p>
              <p>● <strong>Third party cookies</strong> zijn cookies die geplaatst worden door een andere domeinnaam dan die van onze website. Als een gebruiker een website bezoekt en een derde partij een cookie plaatst via die website, dan is dat een third party cookie. Voor cookies geplaatst door derde partijen verwijzen wij je graag naar de verklaringen die deze partijen op hun respectievelijke websites daarover geven. Let wel: wij kunnen geen enkele invloed uitoefenen op de inhoud van die verklaringen noch op de inhoud van de cookies van deze derde partijen.</p>
              <p>Ook qua functie kunnen we cookies opdelen in o.a.:</p>
              <p>● <strong>Essentiële of strikt noodzakelijke cookies</strong> zijn (zoals hun naam aangeeft) noodzakelijk om de website naar behoren te laten functioneren of om een door u gevraagde dienst te verlenen, bv. door een bepaalde verbinding tot stand te brengen. Deze cookies mogen wij plaatsen zonder jouw voorgaande toestemming;</p>
              <p>● <strong>Niet-essentiële cookies</strong> zijn cookies die geplaatst kunnen worden voor analytische, marketing, personalisatie en commerciële doeleinden. Zij hebben niets te maken met de louter technische ondersteuning van de website. Niet-essentiële cookies kunnen first party of third party cookies zijn en kunnen enkel door ons geplaatst en gebruikt worden voor zover jij ons hiertoe jouw voorgaande toestemming hebt gegeven via de cookiebanner.</p>
              <p>Verschillende soorten niet-essentiële cookies kunnen worden onderscheiden:</p>
              <p>&emsp;○ <strong>Analytics cookies</strong> laten onder andere toe om na te gaan welke pagina's van de website u bezoekt, hoe de website presteert en hoe bezoekers met de site omgaan.</p>
              <p>&emsp;○ <strong>Marketing cookies</strong> laten toe dat op basis van uw surfgedrag een profiel wordt opgebouwd zodat de vertoonde advertenties worden afgestemd op uw interesses.</p>
              <p>&emsp;○ <strong>Personalisatie cookies</strong> stellen de website in staat om keuzes die u maakt (zoals taal of regio) te onthouden en bieden verbeterde, meer persoonlijke functies.</p>
              <p>Cookies kunnen ook worden opgedeeld naargelang hun levensduur:</p>
              <p>● <strong>Bepaalde duur cookies:</strong> Deze cookies blijven op het apparaat van de gebruiker aanwezig voor de duur bepaald in de cookie. Ze worden geactiveerd telkens de gebruiker de website bezoekt die deze cookie heeft geplaatst. De meeste niet-essentiële cookies zijn bepaalde duur cookies.</p>
              <p>● <strong>Sessie cookies:</strong> Deze cookies laten ons toe de handelingen van een gebruiker te vereenvoudigen en aan elkaar te linken tijdens een browsersessie. Een browser sessie begint wanneer een gebruiker het browserscherm opent en eindigt wanneer zij het browserscherm sluiten. Sessie cookies worden tijdelijk geplaatst. Zodra u de browser afsluit, worden alle sessie cookies verwijderd. De meeste functionele cookies zijn sessie cookies.</p>

              {/* 3 */}
              <h2 className="text-2xl font-semibold mt-8 mb-4" id="informatie-gebruik">3. Informatie over het gebruik van cookies op onze website</h2>
              <p>
                Wanneer je de website gebruikt, worden de volgende cookies en opslagtechnologieën
                gebruikt, ingedeeld per categorie zoals weergegeven in onze cookiebanner:
              </p>

              {/* --- Essentieel --- */}
              <h3 className="text-xl font-semibold mt-8 mb-3">Essentieel (altijd actief)</h3>
              <p>Deze items zijn nodig om de basisfunctionaliteit van de website mogelijk te maken. Ze worden geplaatst zonder toestemming.</p>
              <div className="overflow-x-auto mt-4">
                <table className="w-full text-sm border border-border">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="p-3 text-left">Naam</th>
                      <th className="p-3 text-left">Type</th>
                      <th className="p-3 text-left">Oorsprong</th>
                      <th className="p-3 text-left">Beschrijving</th>
                      <th className="p-3 text-left">Bewaartermijn</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t">
                      <td className="p-3 align-top font-mono text-xs">fs_cookie_consent_v1</td>
                      <td className="p-3 align-top">Local storage</td>
                      <td className="p-3 align-top">finitsolutions.be</td>
                      <td className="p-3 align-top">Slaat jouw cookie-voorkeuren op (welke categorieën je hebt geaccepteerd of geweigerd).</td>
                      <td className="p-3 align-top">6 maanden</td>
                    </tr>
                    <tr className="border-t">
                      <td className="p-3 align-top font-mono text-xs">fs_cookie_consent_log_v1</td>
                      <td className="p-3 align-top">Local storage</td>
                      <td className="p-3 align-top">finitsolutions.be</td>
                      <td className="p-3 align-top">Houdt een logboek bij van wijzigingen in je cookie-voorkeuren (voor auditdoeleinden).</td>
                      <td className="p-3 align-top">6 maanden</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* --- Analytics --- */}
              <h3 className="text-xl font-semibold mt-8 mb-3">Analytics</h3>
              <p>Deze items helpen de websitebeheerder te begrijpen hoe de website presteert, hoe bezoekers met de site omgaan en of er technische problemen kunnen zijn. Enkel actief na jouw toestemming.</p>
              <div className="overflow-x-auto mt-4">
                <table className="w-full text-sm border border-border">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="p-3 text-left">Naam</th>
                      <th className="p-3 text-left">Type</th>
                      <th className="p-3 text-left">Oorsprong</th>
                      <th className="p-3 text-left">Beschrijving</th>
                      <th className="p-3 text-left">Bewaartermijn</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t">
                      <td className="p-3 align-top font-mono text-xs">_ga</td>
                      <td className="p-3 align-top">Cookie (1st party)</td>
                      <td className="p-3 align-top">.finitsolutions.be</td>
                      <td className="p-3 align-top">Google Analytics — onderscheidt unieke bezoekers door een willekeurig gegenereerde ID toe te kennen.</td>
                      <td className="p-3 align-top">2 jaar</td>
                    </tr>
                    <tr className="border-t">
                      <td className="p-3 align-top font-mono text-xs">_ga_*</td>
                      <td className="p-3 align-top">Cookie (1st party)</td>
                      <td className="p-3 align-top">.finitsolutions.be</td>
                      <td className="p-3 align-top">Google Analytics 4 — bewaart de sessiestatus en het measurement-ID.</td>
                      <td className="p-3 align-top">2 jaar</td>
                    </tr>
                    <tr className="border-t">
                      <td className="p-3 align-top font-mono text-xs">_gid</td>
                      <td className="p-3 align-top">Cookie (1st party)</td>
                      <td className="p-3 align-top">.finitsolutions.be</td>
                      <td className="p-3 align-top">Google Analytics — onderscheidt unieke bezoekers gedurende 24 uur.</td>
                      <td className="p-3 align-top">24 uur</td>
                    </tr>
                    <tr className="border-t">
                      <td className="p-3 align-top font-mono text-xs">_gat</td>
                      <td className="p-3 align-top">Cookie (1st party)</td>
                      <td className="p-3 align-top">.finitsolutions.be</td>
                      <td className="p-3 align-top">Google Analytics — beperkt het aantal verzoeken om de server niet te overbelasten.</td>
                      <td className="p-3 align-top">1 minuut</td>
                    </tr>
                    <tr className="border-t">
                      <td className="p-3 align-top font-mono text-xs">Leadinfo</td>
                      <td className="p-3 align-top">Script (3rd party)</td>
                      <td className="p-3 align-top">cdn.leadinfo.net</td>
                      <td className="p-3 align-top">Leadinfo — herkent bedrijven die de website bezoeken (B2B lead-identificatie). Wordt enkel geladen na analytics-toestemming. Meer info: <a href="https://www.leadinfo.com" target="_blank" rel="noopener noreferrer" className="underline">leadinfo.com</a>. Opt-out: <a href="https://www.leadinfo.com/en/opt-out" target="_blank" rel="noopener noreferrer" className="underline">leadinfo.com/en/opt-out</a>.</td>
                      <td className="p-3 align-top">Sessie</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* --- Marketing --- */}
              <h3 className="text-xl font-semibold mt-8 mb-3">Marketing</h3>
              <p>Deze items worden gebruikt om advertenties te leveren die relevanter zijn voor jou en je interesses. Enkel actief na jouw toestemming.</p>
              <div className="overflow-x-auto mt-4">
                <table className="w-full text-sm border border-border">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="p-3 text-left">Naam</th>
                      <th className="p-3 text-left">Type</th>
                      <th className="p-3 text-left">Oorsprong</th>
                      <th className="p-3 text-left">Beschrijving</th>
                      <th className="p-3 text-left">Bewaartermijn</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t">
                      <td className="p-3 align-top font-mono text-xs">_fbp</td>
                      <td className="p-3 align-top">Cookie (1st party)</td>
                      <td className="p-3 align-top">.finitsolutions.be</td>
                      <td className="p-3 align-top">Meta (Facebook) Pixel — identificeert browsers om advertenties te tonen en de effectiviteit ervan te meten.</td>
                      <td className="p-3 align-top">3 maanden</td>
                    </tr>
                    <tr className="border-t">
                      <td className="p-3 align-top font-mono text-xs">_fbc</td>
                      <td className="p-3 align-top">Cookie (1st party)</td>
                      <td className="p-3 align-top">.finitsolutions.be</td>
                      <td className="p-3 align-top">Meta (Facebook) — slaat de click-identifier op wanneer een gebruiker via een Facebook-advertentie op de website terechtkomt.</td>
                      <td className="p-3 align-top">3 maanden</td>
                    </tr>
                    <tr className="border-t">
                      <td className="p-3 align-top font-mono text-xs">_gcl_au</td>
                      <td className="p-3 align-top">Cookie (1st party)</td>
                      <td className="p-3 align-top">.finitsolutions.be</td>
                      <td className="p-3 align-top">Google Ads — slaat conversie-informatie op om advertentiecampagnes te meten.</td>
                      <td className="p-3 align-top">3 maanden</td>
                    </tr>
                    <tr className="border-t">
                      <td className="p-3 align-top font-mono text-xs">IDE</td>
                      <td className="p-3 align-top">Cookie (3rd party)</td>
                      <td className="p-3 align-top">.doubleclick.net</td>
                      <td className="p-3 align-top">Google DoubleClick — wordt gebruikt voor retargeting, optimalisatie en rapportering van advertenties.</td>
                      <td className="p-3 align-top">1 jaar</td>
                    </tr>
                    <tr className="border-t">
                      <td className="p-3 align-top font-mono text-xs">test_cookie</td>
                      <td className="p-3 align-top">Cookie (3rd party)</td>
                      <td className="p-3 align-top">.doubleclick.net</td>
                      <td className="p-3 align-top">Google DoubleClick — controleert of de browser het plaatsen van cookies toestaat.</td>
                      <td className="p-3 align-top">15 minuten</td>
                    </tr>
                    <tr className="border-t">
                      <td className="p-3 align-top font-mono text-xs">fr</td>
                      <td className="p-3 align-top">Cookie (3rd party)</td>
                      <td className="p-3 align-top">.facebook.com</td>
                      <td className="p-3 align-top">Meta (Facebook) — wordt gebruikt voor advertentietargeting en het meten van advertentie-effectiviteit.</td>
                      <td className="p-3 align-top">3 maanden</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* --- Personalisatie --- */}
              <h3 className="text-xl font-semibold mt-8 mb-3">Personalisatie</h3>
              <p>Deze items stellen de website in staat om keuzes die je maakt (zoals je gebruikersnaam, taal of de regio waarin je je bevindt) te onthouden en bieden verbeterde, meer persoonlijke functies. Enkel actief na jouw toestemming.</p>
              <div className="overflow-x-auto mt-4">
                <table className="w-full text-sm border border-border">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="p-3 text-left">Naam</th>
                      <th className="p-3 text-left">Type</th>
                      <th className="p-3 text-left">Oorsprong</th>
                      <th className="p-3 text-left">Beschrijving</th>
                      <th className="p-3 text-left">Bewaartermijn</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t">
                      <td className="p-3 align-top font-mono text-xs">NID</td>
                      <td className="p-3 align-top">Cookie (3rd party)</td>
                      <td className="p-3 align-top">.google.com</td>
                      <td className="p-3 align-top">Google — slaat voorkeuren en informatie op die gebruikt worden wanneer Google-diensten op de website worden geladen (bv. Google Maps, reCAPTCHA).</td>
                      <td className="p-3 align-top">6 maanden</td>
                    </tr>
                    <tr className="border-t">
                      <td className="p-3 align-top font-mono text-xs">AEC</td>
                      <td className="p-3 align-top">Cookie (3rd party)</td>
                      <td className="p-3 align-top">.google.com</td>
                      <td className="p-3 align-top">Google — zorgt ervoor dat verzoeken binnen de browsersessie niet worden verstuurd door bots en beschermt tegen spam en misbruik.</td>
                      <td className="p-3 align-top">6 maanden</td>
                    </tr>
                    <tr className="border-t">
                      <td className="p-3 align-top font-mono text-xs">SOCS</td>
                      <td className="p-3 align-top">Cookie (3rd party)</td>
                      <td className="p-3 align-top">.google.com</td>
                      <td className="p-3 align-top">Google — slaat de toestemmingskeuzes van de gebruiker op voor Google-diensten.</td>
                      <td className="p-3 align-top">13 maanden</td>
                    </tr>
                    <tr className="border-t">
                      <td className="p-3 align-top font-mono text-xs">CONSENT</td>
                      <td className="p-3 align-top">Cookie (3rd party)</td>
                      <td className="p-3 align-top">.google.com</td>
                      <td className="p-3 align-top">Google — slaat de toestemmingsvoorkeur van de gebruiker op.</td>
                      <td className="p-3 align-top">2 jaar</td>
                    </tr>
                    <tr className="border-t">
                      <td className="p-3 align-top font-mono text-xs">__Secure-ENID</td>
                      <td className="p-3 align-top">Cookie (3rd party)</td>
                      <td className="p-3 align-top">.google.com</td>
                      <td className="p-3 align-top">Google — wordt gebruikt om voorkeuren en andere informatie op te slaan, in het bijzonder de voorkeurstaal en het aantal zoekresultaten per pagina.</td>
                      <td className="p-3 align-top">13 maanden</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p className="mt-6">
                Gelieve onze{" "}
                <a
                  href="/privacy"
                  className="underline"
                >
                  privacyverklaring
                </a>{" "} te lezen om kennis te nemen van de wijze
                waarop wij persoonsgegevens verwerken, beveiligen, hoe lang wij deze bewaren en over
                welke privacy-rechten je beschikt.
              </p>

              {/* 4 */}
              <h2 className="text-2xl font-semibold mt-8 mb-4" id="cookies-accepteren">4. Cookies accepteren</h2>
              <p>
                Bij je eerste bezoek aan onze website verschijnt er een cookiebanner. Aan de hand van deze
                cookiebanner informeren wij jou over welke cookies wij gebruiken, en vragen we jou of we
                bepaalde cookies mogen gebruiken. Je bent vrij om hiermee in te stemmen of niet.
              </p>
              <p>
                Via de knop "Voorkeuren" kan je zelf kiezen welke categorieën cookies je wilt toestaan:
              </p>
              <p>● <strong>Essentieel</strong> — altijd actief, nodig voor de basisfunctionaliteit van de website.</p>
              <p>● <strong>Marketing</strong> — voor het tonen van relevante advertenties.</p>
              <p>● <strong>Personalisatie</strong> — voor het onthouden van jouw keuzes en voorkeuren.</p>
              <p>● <strong>Analytics</strong> — om te begrijpen hoe de website wordt gebruikt.</p>
              <p>
                Je kan jouw keuzes op elk moment wijzigen via de link "Cookie-instellingen" onderaan elke pagina.
              </p>
              <p>
                Weet wel dat sommige functionaliteiten op onze website mogelijk niet of niet volledig werken
                indien niet alle cookies zouden worden aanvaard.
              </p>

              {/* 5 */}
              <h2 className="text-2xl font-semibold mt-8 mb-4" id="cookies-beheren">5. Cookies beheren (verwijderen of uitschakelen)</h2>
              <p>
                Als je niet wilt dat websites cookies op jouw computer plaatsen of je je cookies wilt
                verwijderen, dan kan je je cookie instellingen in je webbrowser wijzigen.
              </p>
              <p>
                Deze instellingen zijn meestal terug te vinden in het menu 'Opties' of 'Voorkeuren' van je
                webbrowser. Je kan je instellingen ook aanpassen zodat je browser alle cookies of alleen de
                cookies van derde partijen weigert.
              </p>
              <p>
                Om deze instellingen beter te begrijpen, kunnen de volgende links nuttig zijn. Zo niet dien je
                de 'Help' functie in je webbrowser te consulteren voor meer details.
              </p>
              <p>
                Nuttige informatie over cookies vind je op:{" "}
                <a href="https://www.allaboutcookies.org/" target="_blank" rel="noopener noreferrer" className="underline">allaboutcookies.org</a>{" "}
                en{" "}
                <a href="https://www.youronlinechoices.com/be-nl/" target="_blank" rel="noopener noreferrer" className="underline">youronlinechoices.com/be-nl</a>.
              </p>

              {/* 6 */}
              <h2 className="text-2xl font-semibold mt-8 mb-4" id="rechten">6. Uw rechten</h2>
              <p>
                Om u meer controle te geven over de verwerking van uw persoonsgegevens, beschikt u over
                heel wat rechten. Deze rechten zijn, onder andere, vastgelegd in artikelen 15-22 AVG.
              </p>
              <p>U beschikt over de volgende rechten:</p>
              <p>
                ● <strong>Het recht op inzage</strong> in de persoonsgegevens die wij van u verwerken (art. 15
                AVG):
              </p>
              <p>
                U heeft het recht om op ieder ogenblik van ons te vernemen of wij al dan niet uw
                persoonsgegevens verwerken. Als wij ze verwerken, dan heeft u het recht om deze
                persoonsgegevens in te zien en bijkomende informatie te ontvangen over:
              </p>
              <p>a) de verwerkingsdoeleinden;</p>
              <p>b) de betrokken categorieën van persoonsgegevens;</p>
              <p>c) de ontvangers of categorieën van ontvangers (met name ontvangers in derde landen);</p>
              <p>d) de bewaartermijn of, als dat niet mogelijk is, de criteria ter bepaling van die termijn;</p>
              <p>e) het bestaan van uw privacy rechten;</p>
              <p>f) het recht om een klacht in te dienen bij de toezichthoudende autoriteit;</p>
              <p>g) de bron van de persoonsgegevens indien wij persoonsgegevens via een derde verkrijgen;</p>
              <p>h) het bestaan van geautomatiseerde besluitvorming.</p>
              <p>
                Als wij u geen toegang kunnen geven tot uw persoonsgegevens (bijvoorbeeld omwille van
                wettelijke verplichtingen), laten wij u weten waarom dat niet mogelijk is.
              </p>
              <p>
                Ook kan u een kosteloze kopie verkrijgen van de verwerkte persoonsgegevens in een
                begrijpelijke vorm. Let wel, wij kunnen een redelijke vergoeding vragen om onze
                administratieve kosten te dekken voor elke bijkomende kopie die u opvraagt.
              </p>
              <p>● <strong>Recht op gegevenswissing</strong> ('recht op vergetelheid') (art. 17 AVG):</p>
              <p>
                U kan ons in bepaalde gevallen vragen om uw persoonsgegevens te wissen. Houd er ook
                rekening mee dat uw recht op vergetelheid niet absoluut is. Wij hebben het recht om uw
                persoonsgegevens te blijven bewaren wanneer dat nodig is voor, onder meer, de uitvoering
                van de overeenkomst, de naleving van een wettelijke verplichting of het instellen en
                uitoefenen of onderbouwen van een rechtsvordering. We zullen u daarover nader informeren
                in ons antwoord op uw verzoek.
              </p>
              <p>● <strong>Het recht op verbetering en aanvulling</strong> (art. 16 AVG):</p>
              <p>
                Wanneer uw persoonsgegevens onjuist, verouderd of onvolledig zijn, kan u ons vragen om
                deze onjuistheden of onvolledigheden te laten verbeteren.
              </p>
              <p>● <strong>Het recht op overdraagbaarheid</strong> van uw persoonsgegevens (art. 20 AVG):</p>
              <p>
                Ook heeft u het recht om, onder bepaalde voorwaarden, de persoonsgegevens die u aan ons
                heeft verstrekt voor de uitvoering van de overeenkomst of waarvoor u toestemming heeft
                gegeven, door ons te laten overdragen aan een andere verwerkingsverantwoordelijke. Voor
                zover het technisch mogelijk is, bezorgen wij uw persoonsgegevens rechtstreeks aan de
                nieuwe verwerkingsverantwoordelijke.
              </p>
              <p>● <strong>Het recht op beperking</strong> van de verwerking (art. 18 AVG):</p>
              <p>
                Indien één van de volgende elementen van toepassing is, kan u ons verzoeken om de
                verwerking van uw persoonsgegevens te beperken:
              </p>
              <p>a) u betwist de juistheid van die persoonsgegevens (in dit geval wordt het gebruik ervan beperkt gedurende een periode die ons in staat stelt om de juistheid van de persoonsgegevens te controleren);</p>
              <p>b) de verwerking van uw persoonsgegevens is onrechtmatig;</p>
              <p>c) wij hebben uw persoonsgegevens niet meer nodig voor de oorspronkelijke verwerkingsdoeleinden, maar u heeft ze nodig voor de instelling, uitoefening of onderbouwing van een rechtsvordering;</p>
              <p>d) zolang er geen beslissing is genomen over de uitoefening van uw recht op bezwaar tegen de verwerking, kan u verzoeken om het gebruik van uw persoonsgegevens te beperken.</p>
              <p>● <strong>Het recht van bezwaar</strong> (art. 21 AVG):</p>
              <p>
                U kan op grond van uw bijzondere situatie, bezwaar maken tegen de verwerking van uw
                persoonsgegevens, indien deze verwerking kadert in ons gerechtvaardigd belang of in de
                vervulling van een taak van algemeen belang. Wij staken in dat geval de verwerking van uw
                persoonsgegevens, tenzij we dwingende en legitieme gronden voor de verwerking kunnen
                aantonen die zwaarder wegen dan die van u, of wanneer de verwerking van de
                persoonsgegevens verband houdt met het instellen, uitoefenen of onderbouwen van een
                rechtsvordering.
              </p>
              <p>● <strong>Het recht om niet aan geautomatiseerde besluitvorming onderworpen te worden</strong> (artikel 22 AVG):</p>
              <p>
                U heeft het recht om niet onderworpen te worden aan een besluit dat is genomen uitsluitend
                op basis van geautomatiseerde gegevensverwerking en die u aanzienlijk treft of juridische
                gevolgen heeft en die zonder substantiële menselijke tussenkomst tot stand komt.
              </p>
              <p>In drie situaties kan u zich niet op dit recht beroepen:</p>
              <p>a) als een wet dit toelaat (bijvoorbeeld ter voorkoming van belastingfraude);</p>
              <p>b) als de besluitvorming berust op een uitdrukkelijke toestemming van de betrokkene; of</p>
              <p>c) als dit noodzakelijk is voor de totstandkoming, of de uitvoering van een overeenkomst (let wel, hierbij maken wij steeds geval per geval een afweging of er minder privacy invasieve methoden bestaan om de overeenkomst te sluiten of uit te voeren).</p>
              <p>● <strong>Het recht om uw toestemming in te trekken</strong> (art. 7 AVG):</p>
              <p>Wanneer uw persoonsgegevens worden verwerkt op basis van uw toestemming, kan u deze toestemming te allen tijde weer intrekken op eenvoudig verzoek.</p>
              <p>● <strong>Het recht om een klacht in te dienen</strong> bij de toezichthoudende autoriteit (art. 77, lid 1 AVG):</p>
              <p>
                We doen ons uiterste best om uw persoonsgegevens te beschermen. Indien u een klacht
                heeft over de wijze waarop wij uw persoonsgegevens verwerken, kan u dit aan ons melden
                via onze contactgegevens zoals vermeld onder de titel "Vragen?", zodat wij hier zo snel
                mogelijk aan kunnen tegemoetkomen.
              </p>
              <p>
                U kan ook een klacht indienen bij de toezichthoudende autoriteit voor gegevensbescherming.
                Een lijst van de toezichthoudende autoriteiten binnen de Europese Unie kan u raadplegen
                via volgende hyperlink:{" "}
                <a href="https://www.edpb.europa.eu/about-edpb/about-edpb/members_nl" target="_blank" rel="noopener noreferrer" className="underline">
                  edpb.europa.eu
                </a>.
              </p>

              <h3 className="text-xl font-semibold mt-8 mb-2" id="uitoefenen-van-uw-rechten">Uitoefenen van uw rechten</h3>
              <p>
                Om deze rechten uit te oefenen, kunt u contact met ons opnemen via de contactgegevens
                die onder de titel "Vragen?" zijn opgenomen. Om uw identiteit te kunnen nagaan, vragen wij
                u om een kopie van de voorzijde van uw identiteitskaart mee te sturen. Wij vragen u om
                daarbij uw rijksregisternummer en afbeelding op uw identiteitskaart onleesbaar te maken. In
                elk geval zullen wij uw identiteitskaartgegevens louter verwerken om uw identiteit te
                verifiëren en niet opslaan noch registreren in onze systemen.
              </p>
              <p>
                U kan al deze rechten kosteloos uitoefenen, tenzij uw verzoek kennelijk ongegrond of
                buitensporig is (bijvoorbeeld vanwege het repetitieve karakter). In dat geval hebben wij het
                recht om u een redelijke vergoeding aan te rekenen of te weigeren om gevolg te geven aan
                je verzoek.
              </p>

              {/* 7 */}
              <h2 className="text-2xl font-semibold mt-8 mb-4" id="vragen">7. Vragen?</h2>
              <p>Dan kan je ons steeds contacteren via de volgende contactgegevens:</p>
              <p>E-mail: <a href="mailto:contact@finitsolutions.be" className="underline">contact@finitsolutions.be</a></p>
              <p>Tel.: <a href="tel:+32495702314" className="underline">+32 (0)495 702 314</a></p>
              <p>&emsp;&emsp;&ensp;<a href="tel:+32468029945" className="underline">+32 (0)468 029 945</a></p>

            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
