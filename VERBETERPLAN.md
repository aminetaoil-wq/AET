# Verbeterplan aet-solutions.nl — alle audits samengevoegd

> **Status 15-11-2026.** Uitgevoerd met deze besluiten van de eigenaar: telefoon en WhatsApp blijven weg (V1.1 vervalt); KvK en btw-id blijven weg (V1.2 vervalt); SBB-erkenning gecontroleerd en NEN 3140 VP-certificaat aanwezig (V1.3: "certificaat op aanvraag"); UPS overal weggehaald. Bij controle bleken V1.7 (twee routes), V3.1 (formulier per onderwerp) en het anker #werkgebied al live sinds 14-11.


## 1. Conclusie

- **De audits zijn het in de kern eens.** Basis goed (inhoud en SEO ±7/10), bewijs en vertrouwen zwak (±5/10). Wat ontbreekt: telefoonnummer, bedrijfsgegevens, foto's, projecten, reviews.
- **Belangrijkste bevinding vandaag:** vrijwel niets uit Ronde 2 (14-11) staat live. Telefoonnummer, KvK in de footer, de claim "gecertificeerd", het zichtbare honeypot-label, het kapotte anker `#werkgebied` en de e-mailinstructie voor foto's staan er nog precies zo. Het knelpunt is uitvoering, niet analyse. Een vijfde audit levert niets op.
- **Advies:** geen nieuwe strategie. Deze week Ronde 2 Fase 0+1 uitvoeren, aangevuld met de punten uit de nieuwe audits hieronder. Daarna alle energie op bewijs: foto's, projecten, reviews.
- **Tijdsdruk (FEIT):** de salderingsregeling stopt op 1 januari 2027. De vraag naar thuisbatterijen piekt de komende 6 weken. Elke week zonder telefoonnummer op de site kost aanvragen.

## 2. Bronnen en hoe ze zich verhouden

| Bron | Datum | Kern | Status |
|---|---|---|---|
| Superplan (`PLAN.md`) | 13-11 | Technische basis, inhoud dienstpagina's, kennisbank, logo/favicon | Grotendeels uitgevoerd of vervangen door Ronde 2 |
| Ronde 2 (`RONDE2.md`) | 14-11 | 15 concrete fouten, fasen voor Claude Code | **Niet uitgevoerd.** Blijft het uitvoeringsdocument |
| Strategisch verbeterplan (tekst) | — | Positionering zakelijk + particulier, navigatie, portfolio, KPI's | Richting bruikbaar, uitwerking te zwaar voor je huidige capaciteit |
| Kritische audit (PDF) | 15-11 | Scores, bewijs, contact, doelgroepsplitsing, prijsscenario's, merkverwarring | Sluit aan; levert 5 nieuwe punten |
| Eigen controle live site | 15-11 | Verificatie van alle bevindingen | Zie §3 |

## 3. Stand van zaken live site (15-11-2026)

**Al opgelost:** eigen e-mailadres (info@aet-solutions.nl), correcte canonical, zakelijke pagina, kennisbank, werkgebied met plaatsnamen, inhoudelijke dienstpagina's, robots.txt en sitemap, JSON-LD aanwezig (validatie nog niet gedaan).
**Nog open:**

| # | Bevinding | Bron(nen) | Ernst |
|---|---|---|---|
| 1 | Geen telefoonnummer of WhatsApp op welke pagina dan ook | Alle audits | Kritiek |
| 2 | KvK, btw-id en vestigingsplaats ontbreken in de footer | Ronde 2, PDF | Kritiek (wettelijk) |
| 3 | Geen enkele foto van eigen werk, geen project, geen review | Alle audits | Hoog |
| 4 | "Gecertificeerd als Vakbekwaam Persoon (VP) volgens NEN 3140" en "Erkend door SBB" zonder bron | Ronde 2, PDF | Hoog |
| 5 | Formulier heeft geen upload; tekst zegt "Foto's van uw meterkast stuurt u per e-mail" | Ronde 2, PDF | Hoog |
| 6 | Footer noemt "installatiebedrijf", `/zakelijk/` noemt "zelfstandige (zzp) elektromonteur" | Ronde 2, strategisch plan | Middel |
| 7 | Werkgebied wisselt: hero "Utrecht · Amsterdam", lijst ook Amersfoort e.a., `/zakelijk/` "heel Nederland", zonder uitleg | Ronde 2, live | Middel |
| 8 | Formulier vraagt aansluiting en zonnepanelen bij elk onderwerp, ook op `/zakelijk/` | Ronde 2 | Middel |
| 9 | Honeypot-label "Laat dit veld leeg" leesbaar | Ronde 2 | Middel |
| 10 | Menu/footer verwijzen naar `#werkgebied`, sectie met dat id bestaat niet | Ronde 2, live | Middel |
| 11 | Geen aantoonbare succesmelding, bevestigingsmail of verwachting na verzenden | PDF | Middel |
| 12 | Geen twee routes boven de vouw (particulier / zakelijk) | PDF, strategisch plan | Middel |
| 13 | `/zakelijk/`: geen beschikbaarheid, verzekering of referenties; UPS alleen als losse specialisatie | Ronde 2, PDF | Middel |
| 14 | Geen prijsindicatie of voorbeeldscenario | PDF | Middel |
| 15 | Merkverwarring met andere "AET Solutions" in Google; woonadres zichtbaar in zoekresultaten | PDF, eigen wens | Middel |
| 16 | Dienstkaart "Elektra en storingen" heeft dubbele titel; "Ruime en brede ervaring" zegt niets | Live, Ronde 2 | Laag |
| 17 | Mobiele weergave, Core Web Vitals en JSON-LD-validatie niet gemeten | PDF | Te meten |

## 4. Waar de audits elkaar tegenspreken — besluit

| Onderwerp | Wat de bronnen zeggen | Besluit | Waarom |
|---|---|---|---|
| Presentatie | Superplan: ik-vorm met naam en portret. Strategisch plan en Ronde 2: bedrijf, wij-vorm | Wij-vorm, "AET Solutions" als bedrijf. Geen team, monteurs of capaciteit die er niet is | Sluit aan bij je wens zakelijk over te komen; superplan-advies over ik-vorm vervalt |
| Voorrang zakelijk of particulier | Strategisch plan: zakelijk eerst | Op de site: particulier eerst voor conversie; zakelijk krijgt één sterke pagina | INSCHATTING: zakelijke opdrachten komen via netwerk en directe benadering, niet via Google. Voor zakelijk moet de site vooral bewijzen na een eerste contact; voor particulieren moet hij zelf aanvragen opleveren |
| Zakelijke navigatie | Strategisch plan: submenu met 4 zakelijke pagina's | Eén pagina `/zakelijk/` met duidelijke secties | Vier dunne pagina's zonder projecten verzwakken eerder dan dat ze helpen |
| Lokale pagina's | Strategisch plan: 4-5. PDF: 1 sterke. Ronde 2: geen tot er projecten zijn | Eén pagina voor de kernregio, pas als daar 2 echte projecten zijn | Zonder lokale case is het een dunne pagina die Google negeert |
| Losse pagina's werkwijze/FAQ/over | PDF: zelfstandige pagina's | Alleen `/over/` wordt een eigen pagina | Daar vormt vertrouwen zich en het lost ankerproblemen op; werkwijze en FAQ apart levert weinig op |
| Prijzen | PDF: scenario's met bandbreedte. Superplan: pas na prijsstrategie | Drie scenario's met bandbreedte, pas nadat jij de bedragen vaststelt | Claude Code mag geen prijzen verzinnen; verkeerde bandbreedte is erger dan geen |
| Reviews | PDF: 5 reviews en 2 cases binnen 30 dagen | Ja, maar het doel volgt uit je aantal klussen | 5 reviews vraagt ±8-10 afgeronde klussen; haalbaarheid hangt af van je volume |
| Zakelijk spoednummer | PDF: apart nummer voor zakelijke spoed | Niet doen | Spoed belooft beschikbaarheid die je naast je baan niet kunt garanderen |
| Inspecties als specialisatie | Strategisch plan: optie | Niet op de site | Superplan-regel: bewust weggehaald; bouwkundige inspectie naast elektrotechniek vertroebelt het profiel |
| KPI's | Strategisch plan: 4-8 zakelijk + 5-10 particulier per maand | Eerst 4 weken nulmeting, dan doelen | Er wordt nu niets gemeten, en je capaciteit naast je baan en weekendklussen is beperkt. 15 aanvragen per maand kun je mogelijk niet eens uitvoeren |

## 5. Het verbeterplan

### Fase 1 — Basis op orde (deze week, ±1 avond Claude Code)

Ronde 2 Fase 0 en 1, aangevuld met de nieuwe punten.

| ID | Taak | Wie | Klaar als |
|---|---|---|---|
| V1.1 | Telefoonnummer klikbaar in header, mobiele actiebalk (Bel · WhatsApp · Offerte), contactblok, footer, `/zakelijk/` en naast elk formulier | Claude Code | `tel:` werkt op elke pagina, getest op 360 en 390 px |
| V1.2 | Footer elke pagina: AET Solutions, KvK 42153046, btw-id, e-mail, telefoon. Plaats alleen als jij dat kiest. Nooit het woonadres | Claude Code; jij levert btw-id | Bevinding 2 opgelost |
| V1.3 | Kwalificaties herschrijven: "NEN 3140-opleiding Vakbekwaam Persoon afgerond (certificaat op aanvraag)", "werkt volgens NEN 1010". SBB alleen na registercheck | Claude Code; jij checkt SBB-register | Nergens "gecertificeerd" zonder bron |
| V1.4 | Eén bedrijfsbeeld: footer en `/zakelijk/` gelijk, bijv. "AET Solutions verzorgt elektrotechnische installaties voor particulieren en levert capaciteit in onderaanneming" | Claude Code | Geen "zzp-elektromonteur" en geen "installatiebedrijf" met suggestie van personeel |
| V1.5 | Werkgebied in één zin overal gelijk: particulier Utrecht, Amersfoort, Amsterdam en omgeving; zakelijk landelijk op projectbasis. Hero-kicker gelijktrekken | Claude Code | Geen tegenstrijdigheid |
| V1.6 | Kleine fouten: honeypot verbergen, anker `#werkgebied`, ankers op subpagina's naar `/#…`, dubbele titel dienstkaart, "Ruime en brede ervaring" vervangen door iets concreets of schrappen | Claude Code | Linkcheck 0 fouten |
| V1.7 | **Nieuw (PDF):** direct onder de hero twee routes: "Particulier — installatie of storing" en "Zakelijk — elektromonteur voor uw project" | Claude Code | Beide routes boven de vouw op mobiel |
| V1.8 | **Nieuw (PDF):** werkwijze-beloftes als vertrouwensregel onder de hero: vaste prijs vooraf · meerwerk alleen na akkoord · doorgemeten opgeleverd · reactietijd | Claude Code | Alleen feiten die jij bevestigt |
| V1.9 | **Nieuw (PDF):** meten: Lighthouse mobiel, JSON-LD in de Rich Results Test, telefoon en areaServed in JSON-LD gelijk aan zichtbare info | Claude Code | Scores in het rapport |

### Fase 2 — Bewijs (week 2-5, daarna doorlopend) — grootste hefboom

| ID | Taak | Wie | Klaar als |
|---|---|---|---|
| V2.1 | `/projecten/` met datamodel (Ronde 2 F2.1-F2.2). Eén vast format per case: situatie → wat is gedaan → oplevering (gemeten en getest) → 3-5 foto's | Claude Code | Menu-item pas bij ≥ 1 project |
| V2.2 | Homepage: 3 recentste projecten + 2 reviews zodra beschikbaar (PDF) | Claude Code | Automatisch uit datamodel; lege staat toont niets |
| V2.3 | `/over/` als eigen pagina: hoe AET Solutions werkt en oplevert, opleiding en ervaring zonder werkgevers- of klantnamen, foto van werk in uitvoering en van je meetapparatuur | Claude Code; jij levert foto's | Pagina live, menu-anker vervangen |
| V2.4 | **Nieuw (PDF):** wat de klant bij oplevering ontvangt, alleen wat je echt levert: meetrapport, foto's, aangepast groepenschema | Claude Code; jij bevestigt | Op dienstpagina's en `/over/` |
| V2.5 | Kwalificatieblok en reviews-datamodel (Ronde 2 F2.4-F2.5), link naar Google Bedrijfsprofiel | Claude Code | Elke regel herleidbaar |
| V2.6 | Bewijs verzamelen: eerste publicatie bij 3 projecten, doel 6 (3 zakelijk, 3 particulier). Telefoonfoto's met goed licht volstaan | Jij | 3 cases binnen 4 weken |
| V2.7 | Reviewverzoek binnen 24 uur na elke klus met directe link naar het Google Bedrijfsprofiel | Jij (sjabloon door Claude Code) | Doel: review bij ≥ 50% van de klussen |

**Let op bij batterijklussen via een partner:** vraag eerst na of je die klanten om foto-toestemming en een review mag vragen, en of je het merk mag noemen. De klant is formeel mogelijk van de partner.

### Fase 3 — Conversie (week 3-6)

| ID | Taak | Wie | Klaar als |
|---|---|---|---|
| V3.1 | Formulier dynamisch per onderwerp (Ronde 2 F3.1) | Claude Code | Alleen relevante velden |
| V3.2 | Foto-upload + WhatsApp-route, e-mailinstructie weg, privacyverklaring aanvullen (Ronde 2 F3.2) | Claude Code; jij kiest formulierdienst | Getest met iPhone (HEIC) en Android |
| V3.3 | **Nieuw (PDF):** `/bedankt/` + automatische bevestigingsmail met reactietijd en vervolgstappen. Foutpaden testen op mobiel: onjuiste invoer, afgebroken verzending | Claude Code | End-to-end getest |
| V3.4 | `/zakelijk/` uitbreiden: diensten als H3, wat u kunt inhuren, beschikbaarheid, welke projectinformatie je minimaal nodig hebt, verloop van een inzet (intake → planning → uitvoering → oplevering met meetrapport), documenten op aanvraag, verzekering alleen bij ja, knop "Project bespreken" | Claude Code; jij levert beschikbaarheid | Bevinding 13 opgelost |
| V3.5 | **Nieuw (PDF):** drie prijsscenario's per hoofddienst, bijv. "groep bijplaatsen in bestaande kast" / "laadpaal met korte kabelroute" / "laadpaal met kastaanpassing en lange route", met bandbreedte en de zin "indicatie; definitieve prijs na foto's of opname" | Jij bedragen, Claude Code plaatsen | Pas live als jij de bedragen hebt bepaald |

### Fase 4 — Vindbaarheid (week 5-9)

| ID | Taak | Wie | Klaar als |
|---|---|---|---|
| V4.1 | JSON-LD compleet: Electrician, Service, BreadcrumbList, Article. Geen FAQPage of aggregateRating | Claude Code | Valideert zonder fouten |
| V4.2 | **Nieuw (PDF) — merkverwarring:** titles met dienst + regio ("AET Solutions · Elektricien Utrecht en Amersfoort"); naam, telefoon en servicegebied identiek op site, Google Bedrijfsprofiel en LinkedIn; `sameAs` naar die profielen | Claude Code + jij | Bij zoeken op "AET Solutions elektricien" sta jij bovenaan |
| V4.3 | Interne links dienst ↔ kennisbank ↔ projecten | Claude Code | ≥ 2 contextuele links per pagina |
| V4.4 | Eén lokale landingspagina voor de kernregio zodra daar 2 projecten zijn | Claude Code | Unieke inhoud, echte cases |
| V4.5 | Search Console: sitemap indienen, indexatie en zoektermen volgen | Jij | Gekoppeld |
| V4.6 | Cookieloze meting: `offerte_verzonden`, `tel_klik`, `whatsapp_klik`, `zakelijk_verzonden` | Claude Code | Events zichtbaar |

### Fase 5 — Meten en zakelijke acquisitie (vanaf week 6)

- Maandelijks 30 minuten: aanvragen per kanaal (telefoon, WhatsApp, formulier, Google Bedrijfsprofiel), offerte → opdracht, reviews per klus.
- Zakelijk actief benaderen pas zodra er ≥ 3 projecten live staan: 10 installatiebedrijven en leveranciers in je regio met een korte mail en link naar `/zakelijk/` en `/projecten/`. Dit levert waarschijnlijk meer zakelijk werk op dan welke SEO-pagina ook.

## 6. Beslissingen die alleen jij kunt nemen

| Beslissing | Mijn advies | Blokkeert |
|---|---|---|
| Telefoonnummer | Het bestaande 06-nummer volstaat. Overweeg een apart zakelijk nummer (eSIM of VoIP) als je privé en zakelijk wilt scheiden; dan dat nummer overal gebruiken | V1.1 |
| WhatsApp | Ja, via WhatsApp Business. Een foto van de meterkast is je beste intake | V1.1, V3.2 |
| Btw-id | Opzoeken (staat op je btw-brief of in Mijn Belastingdienst Zakelijk) | V1.2 |
| Vestigingsplaats en adres | Alleen plaatsnaam. ONZEKER: of je als dienstverlener een vestigingsadres op de site moet tonen; laat dat nagaan. Een zakelijk postadres lost dat op zonder je woonadres | V1.2 |
| SBB-erkenning | Alleen tonen als je in het SBB-register staat | V1.3 |
| AVB-verzekering | Als je die hebt: vermelden op `/zakelijk/`. Zakelijke opdrachtgevers vragen ernaar | V3.4 |
| UPS op `/zakelijk/` | Weghalen, tenzij je het actief wilt verkopen en er geen concurrentiebeding meer loopt. Een specialisatie zonder bijbehorende dienst verwart | V1.4 |
| Beschikbaarheid zakelijk | Realistisch naast je baan, bijv. "avonden en weekenden, of op aanvraag per project" | V3.4 |
| Reactietijd | "Binnen 1 werkdag" alleen als je dat naast je baan haalt; anders "binnen 2 werkdagen" | V1.8, V3.3 |
| Prijsbandbreedtes | Op basis van je kostprijs en je laatste offertes | V3.5 |
| Formulierdienst met upload | Laat Claude Code in Fase 0 opties met kosten geven | V3.2 |

## 7. KPI's

Week 1-4: nulmeting. Daarna doelen vaststellen. Voorlopige richtwaarden (illustratief, geen voorspelling):

| KPI | Richtwaarde na 3 maanden |
|---|---|
| Projecten op de site | ≥ 6 |
| Google-reviews | ≥ 5 |
| Aanvragen met foto's | ≥ 60% van de particuliere aanvragen |
| Offerte → opdracht | Meten; onder 30% betekent prijs of verwachting klopt niet |
| Zakelijke gesprekken uit actieve benadering | 2-4 na de eerste benaderingsronde |

Stuur op aantal **passende** aanvragen in verhouding tot je capaciteit, niet op bezoekers.

## 8. Wat ik bewust niet overneem

- Een nieuwe navigatie met zakelijke submenu's (strategisch plan): huidige structuur is goed genoeg.
- 4-5 regiopagina's of meerdere zakelijke subpagina's zonder projecten.
- Een apart zakelijk spoednummer.
- Een professionele fotograaf: eigen foto's van echt werk overtuigen meer.
- Inspecties, bouwkunde of UPS als dienst.
- Teksten uit het strategisch plan zoals "afspraken nakomt", "kwaliteit centraal stelt", "ontzorging": vage beloftes die elke concurrent ook schrijft. Vervangen door feiten (meetrapport, vaste prijs, meerwerk na akkoord).

## 9. Opdracht voor Claude Code

`RONDE2.md` blijft het uitvoeringsdocument. Exporteer dit plan als Markdown naar `VERBETERPLAN.md` in de root van de website-map en typ:

```

```

## 10. Deze week

- Btw-id opzoeken
- Beslissingen uit §6 invullen in `RONDE2.md` sectie 2
- SBB-register controleren
- Claude Code: Fase 0 en Fase 1
- Google Bedrijfsprofiel aanmaken (categorie Elektricien, adres verborgen, servicegebied)
- Bij de batterijpartner navragen: foto's, reviews en merknaam
- Vanaf nu bij elke klus: foto's vooraf, tijdens en na + toestemming
