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
              Versie <strong>20.08.2025</strong>
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
                Hierna “Finit Solutions”, “wij” of “we”), willen de bezoekers van onze website via deze
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

              {/* 2 */}
              <h2 className="text-2xl font-semibold mt-8 mb-4" id="soorten-cookies">2. Soorten cookies</h2>
              <p>Er bestaan verschillende soorten cookies. Cookies kunnen worden onderverdeeld naar gelang hun oorsprong:</p>
              <p>● First party cookies zijn technische cookies die door ons worden geplaatst en die ervoor zorgen dat onze website goed functioneert. Dit verhoogt de kwaliteit van onze producten en diensten.</p>
              <p>● Third party cookies zijn cookies die geplaatst worden door een andere domeinnaam dan die van onze website. Als een gebruiker een website bezoekt en een derde partij een cookie plaatst via die website, dan is dat een third party cookie. Voor cookies geplaatst door derde partijen verwijzen wij je graag naar de verklaringen die deze partijen op hun respectievelijke websites daarover geven. Let wel: wij kunnen geen enkele invloed uitoefenen op de inhoud van die verklaringen noch op de inhoud van de cookies van deze derde partijen.</p>
              <p>Ook qua functie kunnen we cookies opdelen in o.a.:</p>
              <p>● Essentiële of strikt noodzakelijke cookies zijn (zoals hun naam aangeeft) noodzakelijk om de website naar behoren te laten functioneren of om een door u gevraagde dienst te verlenen, bv. door een bepaalde verbinding tot stand te brengen. Deze cookies mogen wij plaatsen zonder jouw voorgaande toestemming;</p>
              <p>● Niet-essentiële cookies zijn cookies die geplaatst kunnen worden voor statistische, sociale, targeting en commerciële doeleinden. Zij hebben niets te maken met de louter technische ondersteuning van de website. Niet-essentiële cookies kunnen first party of third party cookies zijn en kunnen enkel door ons geplaatst en gebruikt worden voor zover jij ons hiertoe jouw voorgaande toestemming hebt gegeven via de cookiebanner.</p>
              <p>Verschillende soorten niet-essentiële cookies kunnen worden onderscheiden:</p>
              <p>o Functionele cookies zorgen ervoor dat bepaalde niet-essentiële functionaliteiten van de website naar behoren werken.</p>
              <p>o Cookies met statistische doeleinden laten onder andere toe om na te gaan welke pagina’s van de website u bezoekt, waar uw computer gelokaliseerd is, etc.</p>
              <p>o Cookies met sociale doeleinden maken het de gebruiker mogelijk om de inhoud van de bezochte website via sociale media rechtstreeks te delen met anderen.</p>
              <p>o Cookies met targeting doeleinden laten toe dat op basis van uw surfgedrag een profiel wordt opgebouwd zodat de vertoonde advertenties worden afgestemd op uw interesses.</p>
              <p>o Cookies met tracking doeleinden laten toe om uw internetgedrag door de tijd heen te volgen.</p>
              <p>Cookies kunnen ook worden opgedeeld naargelang hun levensduur:</p>
              <p>● Bepaalde duur cookies: Deze cookies blijven op het apparaat van de gebruiker aanwezig voor de duur bepaald in de cookie. Ze worden geactiveerd telkens de gebruiker de website bezoekt die deze cookie heeft geplaatst. De meeste niet-essentiële cookies zijn bepaalde duur cookies.</p>
              <p>● Sessie cookies: Deze cookies laten ons toe de handelingen van een gebruiker te vereenvoudigen en aan elkaar te linken tijdens een browsersessie. Een browser sessie begint wanneer een gebruiker het browserscherm opent en eindigt wanneer zij het browserscherm sluiten. Sessie cookies worden tijdelijk geplaatst. Zodra u de browser afsluit, worden alle sessie cookies verwijderd. De meeste functionele cookies zijn sessie cookies.</p>

              {/* 3 */}
              <h2 className="text-2xl font-semibold mt-8 mb-4" id="informatie-gebruik">3. Informatie over het gebruik van cookies op onze website</h2>
              <p>Wanneer je de website gebruikt, worden zo de volgende cookies gebruikt:</p>

              {/* ---------- VERVANGBLOK: ECHTE TABEL I.P.V. <pre> ---------- */}
              <div className="overflow-x-auto mt-6">
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
                      <td className="p-3 align-top">__cf_bm</td>
                      <td className="p-3 align-top"></td>
                      <td className="p-3 align-top">.chatgpt.com</td>
                      <td className="p-3 align-top"></td>
                      <td className="p-3 align-top">Sessie</td>
                    </tr>
                    <tr className="border-t">
                      <td className="p-3 align-top">__cf_bm</td>
                      <td className="p-3 align-top"></td>
                      <td className="p-3 align-top">.pexels.com</td>
                      <td className="p-3 align-top"></td>
                      <td className="p-3 align-top">Sessie</td>
                    </tr>
                    <tr className="border-t">
                      <td className="p-3 align-top">__cflb</td>
                      <td className="p-3 align-top"></td>
                      <td className="p-3 align-top">chatgpt.com</td>
                      <td className="p-3 align-top"></td>
                      <td className="p-3 align-top">Sessie</td>
                    </tr>
                    <tr className="border-t">
                      <td className="p-3 align-top">_gcl_au</td>
                      <td className="p-3 align-top"></td>
                      <td className="p-3 align-top"><span className="whitespace-pre-line">.finitsolutions.{'\n'}be</span></td>
                      <td className="p-3 align-top"></td>
                      <td className="p-3 align-top">2 maanden</td>
                    </tr>
                    <tr className="border-t">
                      <td className="p-3 align-top">_fbp</td>
                      <td className="p-3 align-top"></td>
                      <td className="p-3 align-top"><span className="whitespace-pre-line">.finitsolutions.{'\n'}be</span></td>
                      <td className="p-3 align-top"></td>
                      <td className="p-3 align-top">2 maanden</td>
                    </tr>
                    <tr className="border-t">
                      <td className="p-3 align-top">AEC</td>
                      <td className="p-3 align-top"></td>
                      <td className="p-3 align-top">.google.com</td>
                      <td className="p-3 align-top"></td>
                      <td className="p-3 align-top">6 maanden</td>
                    </tr>
                    <tr className="border-t">
                      <td className="p-3 align-top">NID</td>
                      <td className="p-3 align-top"></td>
                      <td className="p-3 align-top">.google.com</td>
                      <td className="p-3 align-top"></td>
                      <td className="p-3 align-top">6 maanden</td>
                    </tr>
                    <tr className="border-t">
                      <td className="p-3 align-top">oai-did</td>
                      <td className="p-3 align-top"></td>
                      <td className="p-3 align-top">.chatgpt.com</td>
                      <td className="p-3 align-top"></td>
                      <td className="p-3 align-top">1 jaar</td>
                    </tr>
                    <tr className="border-t">
                      <td className="p-3 align-top"><span className="whitespace-pre-line">__Secure-ENI{'\n'}D</span></td>
                      <td className="p-3 align-top"></td>
                      <td className="p-3 align-top">.google.com</td>
                      <td className="p-3 align-top"></td>
                      <td className="p-3 align-top"><span className="whitespace-pre-line">1 jaar en 1{'\n'}maand</span></td>
                    </tr>
                    <tr className="border-t">
                      <td className="p-3 align-top">SOCS</td>
                      <td className="p-3 align-top"></td>
                      <td className="p-3 align-top">.google.com</td>
                      <td className="p-3 align-top"></td>
                      <td className="p-3 align-top"><span className="whitespace-pre-line">1 jaar en 1{'\n'}maand</span></td>
                    </tr>
                    <tr className="border-t">
                      <td className="p-3 align-top">_ga</td>
                      <td className="p-3 align-top"></td>
                      <td className="p-3 align-top"><span className="whitespace-pre-line">.finitsolutions.{'\n'}be</span></td>
                      <td className="p-3 align-top"></td>
                      <td className="p-3 align-top"><span className="whitespace-pre-line">1 jaar en 1{'\n'}maand</span></td>
                    </tr>
                    <tr className="border-t">
                      <td className="p-3 align-top"><span className="whitespace-pre-line">_ga_58Y7QE{'\n'}TP6R</span></td>
                      <td className="p-3 align-top"></td>
                      <td className="p-3 align-top"><span className="whitespace-pre-line">.finitsolutions.{'\n'}be</span></td>
                      <td className="p-3 align-top"></td>
                      <td className="p-3 align-top"><span className="whitespace-pre-line">1 jaar en 1{'\n'}maand</span></td>
                    </tr>
                    <tr className="border-t">
                      <td className="p-3 align-top"><span className="whitespace-pre-line">_ga_0ZT5ZR{'\n'}KWLV</span></td>
                      <td className="p-3 align-top"></td>
                      <td className="p-3 align-top"><span className="whitespace-pre-line">.finitsolutions.{'\n'}be</span></td>
                      <td className="p-3 align-top"></td>
                      <td className="p-3 align-top"><span className="whitespace-pre-line">1 jaar en 1{'\n'}maand</span></td>
                    </tr>
                    <tr className="border-t">
                      <td className="p-3 align-top"><span className="whitespace-pre-line">__Host-next-a{'\n'}uth.csrf-token</span></td>
                      <td className="p-3 align-top"></td>
                      <td className="p-3 align-top">chatgpt.com</td>
                      <td className="p-3 align-top"></td>
                      <td className="p-3 align-top">Sessie</td>
                    </tr>
                    <tr className="border-t">
                      <td className="p-3 align-top"><span className="whitespace-pre-line">__Secure-nex{'\n'}t-auth.callbac{'\n'}k-url</span></td>
                      <td className="p-3 align-top"></td>
                      <td className="p-3 align-top">chatgpt.com</td>
                      <td className="p-3 align-top"></td>
                      <td className="p-3 align-top">Sessie</td>
                    </tr>
                    <tr className="border-t">
                      <td className="p-3 align-top">_cfuvid</td>
                      <td className="p-3 align-top"></td>
                      <td className="p-3 align-top">.pexels.com</td>
                      <td className="p-3 align-top"></td>
                      <td className="p-3 align-top">Sessie</td>
                    </tr>
                    <tr className="border-t">
                      <td className="p-3 align-top">_cfuvid</td>
                      <td className="p-3 align-top"></td>
                      <td className="p-3 align-top">chatgpt.com</td>
                      <td className="p-3 align-top"></td>
                      <td className="p-3 align-top">Sessie</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              {/* ---------- EINDE VERVANGBLOK ---------- */}

              <p>
                Gelieve onze{" "}
<a
  href="https://finitsolutions.be/privacy"
  target="_blank"
  rel="noopener noreferrer"
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
                Deze instellingen zijn meestal terug te vinden in het menu ‘Opties’ of ‘Voorkeuren’ van je
                webbrowser. Je kan je instellingen ook aanpassen zodat je browser alle cookies of alleen de
                cookies van derde partijen weigert.
              </p>
              <p>
                Om deze instellingen beter te begrijpen, kunnen de volgende links nuttig zijn. Zo niet dien je
                de ‘Help’ functie in je webbrowser te consulteren voor meer details.
              </p>
              <p>Nuttige informatie over cookies vind je op: http://www.allaboutcookies.org/ en http://www.youronlinechoices.com/be-nl/.</p>

              {/* 6 */}
              <h2 className="text-2xl font-semibold mt-8 mb-4" id="rechten">6. Uw rechten</h2>
              <p>
                Om u meer controle te geven over de verwerking van uw persoonsgegevens, beschikt u over
                heel wat rechten. Deze rechten zijn, onder andere, vastgelegd in artikelen 15-22 AVG.
              </p>
              <p>U beschikt over de volgende rechten:</p>
              <p>
                ● Het recht op inzage in de persoonsgegevens die wij van u verwerken (art. 15
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
              <p>● Recht op gegevenswissing (‘recht op vergetelheid’) (art. 17 AVG):</p>
              <p>
                U kan ons in bepaalde gevallen vragen om uw persoonsgegevens te wissen. Houd er ook
                rekening mee dat uw recht op vergetelheid niet absoluut is. Wij hebben het recht om uw
                persoonsgegevens te blijven bewaren wanneer dat nodig is voor, onder meer, de uitvoering
                van de overeenkomst, de naleving van een wettelijke verplichting of het instellen en
                uitoefenen of onderbouwen van een rechtsvordering. We zullen u daarover nader informeren
                in ons antwoord op uw verzoek.
              </p>
              <p>● Het recht op verbetering en aanvulling (art. 16 AVG):</p>
              <p>
                Wanneer uw persoonsgegevens onjuist, verouderd of onvolledig zijn, kan u ons vragen om
                deze onjuistheden of onvolledigheden te laten verbeteren.
              </p>
              <p>● Het recht op overdraagbaarheid van uw persoonsgegevens (art. 20 AVG):</p>
              <p>
                Ook heeft u het recht om, onder bepaalde voorwaarden, de persoonsgegevens die u aan ons
                heeft verstrekt voor de uitvoering van de overeenkomst of waarvoor u toestemming heeft
                gegeven, door ons te laten overdragen aan een andere verwerkingsverantwoordelijke. Voor
                zover het technisch mogelijk is, bezorgen wij uw persoonsgegevens rechtstreeks aan de
                nieuwe verwerkingsverantwoordelijke.
              </p>
              <p>● Het recht op beperking van de verwerking (art. 18 AVG):</p>
              <p>
                Indien één van de volgende elementen van toepassing is, kan u ons verzoeken om de
                verwerking van uw persoonsgegevens te beperken:
              </p>
              <p>a) u betwist de juistheid van die persoonsgegevens (in dit geval wordt het gebruik ervan beperkt gedurende een periode die ons in staat stelt om de juistheid van de persoonsgegevens te controleren);</p>
              <p>b) de verwerking van uw persoonsgegevens is onrechtmatig;</p>
              <p>c) wij hebben uw persoonsgegevens niet meer nodig voor de oorspronkelijke verwerkingsdoeleinden, maar u heeft ze nodig voor de instelling, uitoefening of onderbouwing van een rechtsvordering;</p>
              <p>d) zolang er geen beslissing is genomen over de uitoefening van uw recht op bezwaar tegen de verwerking, kan u verzoeken om het gebruik van uw persoonsgegevens te beperken.</p>
              <p>● Het recht van bezwaar (art. 21 AVG):</p>
              <p>
                U kan op grond van uw bijzondere situatie, bezwaar maken tegen de verwerking van uw
                persoonsgegevens, indien deze verwerking kadert in ons gerechtvaardigd belang of in de
                vervulling van een taak van algemeen belang. Wij staken in dat geval de verwerking van uw
                persoonsgegevens, tenzij we dwingende en legitieme gronden voor de verwerking kunnen
                aantonen die zwaarder wegen dan die van u, of wanneer de verwerking van de
                persoonsgegevens verband houdt met het instellen, uitoefenen of onderbouwen van een
                rechtsvordering.
              </p>
              <p>● Het recht om niet aan geautomatiseerde besluitvorming onderworpen te worden (artikel 22 AVG):</p>
              <p>
                U heeft het recht om niet onderworpen te worden aan een besluit dat is genomen uitsluitend
                op basis van geautomatiseerde gegevensverwerking en die u aanzienlijk treft of juridische
                gevolgen heeft en die zonder substantiële menselijke tussenkomst tot stand komt.
              </p>
              <p>In drie situaties kan u zich niet op dit recht beroepen:</p>
              <p>a) als een wet dit toelaat (bijvoorbeeld ter voorkoming van belastingfraude);</p>
              <p>b) als de besluitvorming berust op een uitdrukkelijke toestemming van de betrokkene; of</p>
              <p>c) als dit noodzakelijk is voor de totstandkoming, of de uitvoering van een overeenkomst (let wel, hierbij maken wij steeds geval per geval een afweging of er minder privacy invasieve methoden bestaan om de overeenkomst te sluiten of uit te voeren).</p>
              <p>● Het recht om uw toestemming in te trekken (art. 7 AVG):</p>
              <p>Wanneer uw persoonsgegevens worden verwerkt op basis van uw toestemming, kan u deze toestemming te allen tijde weer intrekken op eenvoudig verzoek.</p>
              <p>● Het recht om een klacht in te dienen bij de toezichthoudende autoriteit (art. 77, lid 1 AVG):</p>
              <p>
                We doen ons uiterste best om uw persoonsgegevens te beschermen. Indien u een klacht
                heeft over de wijze waarop wij uw persoonsgegevens verwerken, kan u dit aan ons melden
                via onze contactgegevens zoals vermeld onder de titel “Vragen?”, zodat wij hier zo snel
                mogelijk aan kunnen tegemoetkomen.
              </p>
              <p>
                U kan ook een klacht indienen bij de toezichthoudende autoriteit voor gegevensbescherming.
                Een lijst van de toezichthoudende autoriteiten binnen de Europese Unie kan u raadplegen
                via volgende hyperlink: https://www.edpb.europa.eu/about-edpb/about-edpb/members_nl.
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
              <p>E-mail:  contact@finitsolutions.be</p>
              <p>Tel.:   +32 (0)495 702 314</p>
              <p>  +32 (0)468 029 945</p>

              
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
