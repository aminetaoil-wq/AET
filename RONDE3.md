# AET Solutions — Ronde 3: overhaul naar het model van een sterke installateursite

Versie 1.1 · 16 november 2026 (diensten vastgesteld, storingen eruit, NEN-blokken uitgewerkt) · referentie: koba-elektro.nl (structuur en aanpak, niet de inhoud)

**Gebruik:** zet dit bestand als `RONDE3.md` in de root van de website-map, vul sectie 2 in en typ in Claude Code:
`Lees RONDE3.md volledig en voer Fase 0 uit. Wijzig niets voordat ik je rapport heb goedgekeurd.`

Deze ronde bouwt voort op `RONDE2.md`. De harde regels en de open gegevens (telefoon, KvK, btw-id, kwalificaties) uit ronde 2 blijven gelden. Fase 1 van ronde 2 moet af zijn voordat deze ronde start.

---

## 1. Doel

De site krijgt de opbouw van een volwassen installateursite: een breed dienstenmenu met een eigen pagina per dienst, een keurmerkpagina, storingspagina's, prijsindicaties, merken, reviews, foto's op elke pagina en bellen/WhatsApp/terugbelverzoek als hoofdroutes.

**We nemen over:** structuur, paginatypen, opbouw van de homepage, toon (u-vorm, korte zinnen, vakwoorden kort uitgelegd), contactroutes.

**We nemen niet over:** teksten, zinnen, koppen, FAQ-antwoorden, afbeeldingen, prijzen, merken, reviews of beloftes van de referentiesite. Alles wordt opnieuw geschreven voor AET Solutions. Open de referentiesite niet om tekst te kopiëren of te parafraseren per zin.

---

## 2. Beslissingen van de eigenaar (invullen vóór de start)

Een dienst komt alleen op de site als hier "ja" staat. Bij "nee" of leeg: geen pagina, geen menu-item.

| Dienst / belofte | Aanbieden? | Opmerking |
|---|---|---|
| Groepenkast installatie (vervangen) | ja | |
| Groepenkast uitbreiding | ja | |
| Extra groep aanleggen | ja | |
| 3-fase voorbereiding | ja | Voor inductie, laadpaal en thuisbatterij; warmtepomp niet als dienst noemen |
| Laadpaal installatie | ja | |
| Zakelijk verrekenen laadpaal | ja | {{TODO: welk systeem/abonnement voor kWh-registratie en verrekening?}} |
| Complete thuisbatterij-installatie | ja | Hoofddienst: advies, meterkastcheck, plaatsing, aansluiting, inbedrijfstelling, uitleg, hulp bij registratie. Merk alleen noemen bij toestemming |
| Inductiekookplaat aansluiten | ja | |
| Keukenvoorbereiding | ja | |
| Elektra renovatie | ja | |
| Verlichting | ja | |
| Tuinverlichting aanleggen | ja | |
| Utiliteitsbouw / zakelijk | ja | Bestaande `/zakelijk/` blijft en wordt hieraan gekoppeld |
| Voorbereiding warmtepomp | **nee** | Geen pagina, geen menu-item; ook uit bestaande FAQ en teksten halen |
| Storingen en storingsdienst | **nee** | Geen menu, geen pagina's, geen 24/7- of spoedbelofte. Zie F1.5 |
| Vanaf-prijzen tonen | {{TODO}} | Per dienst een eigen bedrag incl. btw, of "nee" |
| Garantie | {{TODO}} | Termijn volgens de algemene voorwaarden |
| Verzekerd (AVB) | {{TODO}} | |
| Merken waarmee gewerkt wordt | {{TODO}} | Alleen merken die echt gebruikt worden; logo's alleen als het merk dat toestaat |
| Google Bedrijfsprofiel-link | {{TODO}} | Nodig voor de reviewsectie |
| Engelse versie | {{TODO}} | Advies: nee in deze ronde |

---

## 3. Harde regels (aanvulling op ronde 2)

1. **Geen overname van tekst of beeld van de referentiesite of van welke andere site dan ook.**
2. **Geen dienst, belofte, prijs, merk, review of keurmerk zonder "ja" of waarde in sectie 2.**
3. **Foto's alleen met aantoonbare licentie** (zie Fase 2). Niet: afbeeldingen uit Google Afbeeldingen, van concurrenten, fabrikanten of webshops zonder toestemming, of met een watermerk.
4. **Stockfoto's zijn sfeerbeeld.** Nooit presenteren als eigen werk: niet op `/projecten/`, niet bij reviews, geen bijschrift als "onze installatie". Zodra er een eigen foto is, vervangt die de stockfoto.
5. **Geen "team"-foto's uit stock** en geen gegenereerde gezichten.
6. **Keurmerkpagina:** NEN 1010 is een norm waarnaar gewerkt wordt; NEN 3140 volgens de formulering uit ronde 2. Geen logo's van NEN, InstallQ of andere instanties zonder recht daarop.
7. **Eén dienst = één pagina met unieke inhoud.** Geen pagina's die alleen in titel verschillen.

---

## 4. Fasen

### Fase 0 — Inspectie (niets wijzigen)

| ID | Taak |
|---|---|
| F0.1 | Huidige pagina's, URL's en interne links in kaart brengen. |
| F0.2 | Vaststellen wat uit ronde 2 al gedaan is (telefoon, KvK/btw, ankers, formulier, JSON-LD). |
| F0.3 | Voorstel voor de nieuwe sitestructuur op basis van sectie 2, met per bestaande URL: blijft / wordt 301 naar … |
| F0.4 | Lighthouse mobiel op home en twee dienstpagina's; scores noteren. |

### Fase 1 — Structuur en navigatie

| ID | Taak | Klaar als |
|---|---|---|
| F1.1 | Hoofdmenu met dropdowns: **Keurmerk** · **Elektra aanleggen** (elektra renovatie, keukenvoorbereiding, inductiekookplaat aansluiten, verlichting, tuinverlichting, utiliteitsbouw) · **Meterkast** (3-fase voorbereiding, extra groep, groepenkast installatie, groepenkast uitbreiding) · **Laadpaal & thuisbatterij** (laadpaal installatie, zakelijk verrekenen laadpaal, complete thuisbatterij-installatie) · **Zakelijk** · **Kennisbank** · **Contact**. Geen Storingen-menu. Toetsenbord- en touch-toegankelijk; op mobiel een uitklapmenu. | Elk item bereikbaar in max. 2 tikken. |
| F1.2 | Header: logo, klikbaar telefoonnummer, knop "Maak een afspraak". Mobiele onderbalk: Bel · WhatsApp · Afspraak. | Zichtbaar op elke pagina. |
| F1.3 | 301-redirects voor gewijzigde URL's; sitemap en interne links bijgewerkt. | Linkcheck 0 fouten. |
| F1.5 | **Storingen verwijderen.** De bestaande dienst "Elektra en storingen" (`/overige-elektrotechniek/`) wordt "Elektra aanleggen en renovatie" zonder storingswerk; URL 301 naar de nieuwe pagina. Storing uit hero, meta descriptions, FAQ, formulieropties, footer en JSON-LD. Kennisbankartikelen over storingen mogen blijven als uitleg, maar eindigen met "AET Solutions voert geen storingsdienst uit" en een verwijzing naar de dienst die wel past (bijv. groepenkast vervangen). | Zoekopdracht op "storing" geeft alleen nog treffers in de kennisbank. |
| F1.4 | Aparte `/contact/` met afspraakformulier, terugbelverzoek ("Bel mij terug": naam, nummer, voorkeurstijd), WhatsApp, e-mail, werkgebied. Foto-upload volgens ronde 2 F3.2. | Alle routes end-to-end getest. |

### Fase 2 — Beeld

| ID | Taak | Klaar als |
|---|---|---|
| F2.1 | Beeldlijst opstellen: per pagina welk beeld nodig is (hero, dienstkaart, sectiebeeld) met gewenste inhoud en verhouding. | Lijst in `content/beeldlijst.md`. |
| F2.2 | Per beeld 3 kandidaten voorstellen van **Unsplash of Pexels** (vrije commerciële licentie), met link. De eigenaar kiest. Onderwerpen: moderne groepenkast, installatieautomaten in detail, laadpaal aan woning, laadkabel in auto, thuisbatterij aan de wand, meetapparatuur, inductiekookplaat, binnen- en tuinverlichting, bedrading en kabelgoten, gereedschap. Voorkeur voor Europese installaties: geen Amerikaanse stopcontacten of breaker panels. | Keuze vastgelegd. |
| F2.3 | Gekozen beelden opslaan in `assets/img/`, omzetten naar AVIF/WebP met JPG-fallback, 3 formaten (480/960/1600 px), ≤ 200 kB voor het grootste formaat onder de vouw, vaste width/height, lazy loading behalve de hero. | Geen layout shift. |
| F2.4 | `content/beeldlicenties.md`: per bestand bron-URL, fotograaf, licentie, downloaddatum. | Elk beeld op de site staat in dit bestand. |
| F2.5 | Beschrijvende Nederlandse alt-teksten die zeggen wat er te zien is, zonder te suggereren dat het eigen werk is. | Gecontroleerd per beeld. |
| F2.6 | Eén consistente beeldstijl: zelfde uitsnede per kaarttype, lichte kleurcorrectie richting de merkkleur, geen filters die het beeld onherkenbaar maken. | Homepage oogt als één geheel. |

### Fase 3 — Homepage

Opbouw, van boven naar beneden:

1. Hero met foto: wat, waar, één hoofdactie (afspraak) en bellen.
2. Kernwaardenbalk met 4 feiten uit sectie 2 (bijv. vaste prijs vooraf, werkt volgens NEN 1010, verzekerd, reactietijd). Geen item zonder bron.
3. Korte introductie + terugbelknop.
4. Keurmerkblok in dezelfde opzet als de referentie: sectiekop over veilig en volgens de norm werken, daaronder twee kaarten naast elkaar met eigen kop, "**NEN 3140**" en "**NEN 1010**", elk met 2-3 zinnen eigen tekst en samen één knop "Meer lezen" naar `/keurmerk/`. Inhoud: NEN 3140-kaart = opleiding Vakbekwaam Persoon afgerond, veilig werken aan installaties, certificaat op aanvraag. NEN 1010-kaart = elke installatie wordt volgens deze norm aangelegd, gemeten en getest opgeleverd. Zelfde twee koppen terug in de kernwaardenbalk, de FAQ ("Welke kwalificaties heeft AET Solutions?") en op elke dienstpagina in het blok veiligheid.
5. Dienstenoverzicht: kaarten met foto, per menugroep.
6. Reviews: alleen echte, met link naar het Google Bedrijfsprofiel. Leeg = sectie verborgen.
7. Projecten (ronde 2): alleen bij ≥ 1 project.
8. Merken: alleen bij "ja" in sectie 2.
9. Veelgestelde vragen: reactietijd, kwalificaties, prijs, garantie, avond/weekend. Elk antwoord concreet, uit sectie 2.
10. Werkgebied met plaatsnamen.
11. Footer met volledige bedrijfsgegevens.

### Fase 4 — Dienstpagina's

Eén sjabloon, per dienst uniek ingevuld (500-800 woorden):

- H1 met dienst + regio · hero-foto · 3 kernpunten
- Wanneer heeft u dit nodig (herkenbare situaties)
- Wat wij doen, in stappen
- Wat is inbegrepen · vanaf-prijs of prijsopbouw (sectie 2)
- Veiligheid en normen in gewone taal
- 4-5 eigen vragen en antwoorden
- Verwante diensten en 2 kennisbankartikelen
- CTA-blok: bellen, WhatsApp, afspraak
- JSON-LD `Service` + `BreadcrumbList`

Geen storingspagina's (sectie 2).

`/keurmerk/`: eigen pagina met de koppen "NEN 3140" en "NEN 1010" als H2, per norm: wat de norm inhoudt in gewone taal, wat dat voor de klant betekent, hoe AET Solutions dit toepast (meten, testen, opleverrapport). Daarna opleiding en kwalificaties met "bewijs op aanvraag". Formulering volgens ronde 2, regel 3.2: werken volgens NEN 1010, opleiding NEN 3140 VP afgerond. Het woord "keurmerk" alleen als menu- en paginatitel; in de tekst niet beweren dat AET Solutions een NEN-keurmerk bezit en geen NEN-logo's gebruiken.

**Complete thuisbatterij-installatie** wordt de meest uitgewerkte dienstpagina (800-1000 woorden): voor wie het loont en voor wie niet, wat er na 1 januari 2027 verandert (feitelijk, geen besparingsbeloftes), het complete traject in stappen (advies → meterkastcheck → plaatsing → aansluiting → inbedrijfstelling en app → uitleg → hulp bij registratie), 1-fase of 3-fase, veilige plaatsing, wat inbegrepen is. Ook als eigen kaart op de homepage en in de hero-subregel. Samen met zakelijk is dit het onderscheid ten opzichte van algemene elektriciens.

### Fase 5 — Afronding

| ID | Taak |
|---|---|
| F5.1 | Titles/descriptions per pagina (dienst + regio), canonical, sitemap. |
| F5.2 | Footer: Over ons, FAQ, Algemene voorwaarden, Privacy, Kennisbank, Stage (indien ja). |
| F5.3 | Volledige test: links, formulieren, 360/390/768/1440 px, axe, Lighthouse. |

---

## 5. Acceptatiecriteria

- Geen zin van 8 of meer woorden die letterlijk op de referentiesite staat (steekproef op home en 3 dienstpagina's).
- Elk beeld staat in `content/beeldlicenties.md`.
- Geen dienst, prijs, merk of belofte zonder "ja" in sectie 2.
- Lighthouse mobiel op home en 3 dienstpagina's: Performance ≥ 90, Accessibility ≥ 95, SEO 100; LCP < 2,5 s ondanks de hero-foto.
- Telefoon, WhatsApp en afspraak bereikbaar vanaf elke pagina.
- Eindrapport: nieuwe sitestructuur, redirects, beeldlicenties, open `{{TODO}}`'s.

---

## 6. Wat de eigenaar zelf doet

| Wanneer | Actie |
|---|---|
| Nu | Rest van sectie 2 invullen: prijzen, merken, garantie, verzekering, verrekensysteem laadpaal |
| Nu | Open punten uit ronde 2: telefoonnummer, btw-id, kwalificaties |
| Deze week | Google Bedrijfsprofiel aanmaken en eerste reviews vragen; zonder dat blijft de reviewsectie leeg |
| Doorlopend | Eigen foto's maken bij elke klus en de stockfoto's daarmee vervangen |
