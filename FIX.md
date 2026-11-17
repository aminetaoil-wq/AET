# AET Solutions — Kleine fix: kwalificaties, garantie en bedrijfsgegevens

Versie 1.1 · 17 november 2026 (bedrijfstaal in plaats van cv-gegevens) · los uit te voeren, vóór of na ronde 3

> **Uitgevoerd 17-11-2026.** Besluiten eigenaar bij uitvoering: KvK 42153046 wel tonen (footer en JSON-LD); telefoon **niet** tonen (geen nummer in header, onderbalk, footer of JSON-LD; terugbelverzoek blijft de route); WhatsApp **nee**; SBB-erkenning gecontroleerd (15-11), blijft als "Erkend leerbedrijf (SBB)". Btw-id nog open.

**Gebruik:** zet dit bestand als `FIX.md` in de root van de website-map en typ in Claude Code:
`Voer FIX.md uit. Begin met stap 0 en laat me de lijst zien voordat je iets wijzigt.`

---

## Regels
- Verzin niets. Alleen de gegevens uit deze opdracht.
- U-vorm en huisstijl blijven gelijk.
- Eén commit per stap.

---

## Stap 0 — Inventaris (niets wijzigen)
Zoek in alle bestanden (HTML, JS, JSON-LD, meta descriptions, alt-teksten) naar:
`gecertificeerd`, `certificaat`, `NEN 1010`, `NEN 3140`, `Vakbekwaam`, `VP`, `SBB`, `erkend`, `garantie`, `KvK`, `btw`, `tel:`.
Lever per treffer: bestand, regel, huidige tekst, voorgestelde nieuwe tekst.

## Stap 1 — "Gecertificeerd" eruit, "gediplomeerd" erin

**Regel:** NEN 1010 is een norm, geen certificaat. Het woord "gecertificeerd" verdwijnt overal in combinatie met NEN 1010 of met AET Solutions als bedrijf.

| Waar | Nieuwe tekst |
|---|---|
| NEN 1010 (kernwaardenbalk, keurmerkblok, `/keurmerk/`, dienstpagina's) | "Werkt volgens NEN 1010" / "Elke installatie wordt aangelegd volgens NEN 1010 en doorgemeten opgeleverd." |
| Toon | Bedrijfstaal, geen cv. Geen namen van opleiders, jaartallen, crebonummers of opleidingsnamen op de site. Wel: wat de klant eraan heeft |
| Vaste formulering | "Gediplomeerd, ervaren NEN 3140 Vakbekwaam Persoon" — gebruiken in FAQ, keurmerkblok, `/keurmerk/` en `/zakelijk/`. Niet: "AET Solutions is gecertificeerd" |
| Kernwaardenbalk | Vier items: Vaste prijs vooraf · Gediplomeerd, ervaren NEN 3140 Vakbekwaam Persoon · Werkt volgens NEN 1010 · Doorgemeten opgeleverd. "Gemeten en getest" als dubbel item weghalen |
| `/keurmerk/` | Per norm wat het voor de klant betekent en hoe AET Solutions ermee werkt. Afsluiten met één zin: "Diploma's en certificaten zijn op aanvraag in te zien." |
| SBB | Alleen laten staan als `{{TODO: SBB-erkenning staat in het SBB-register, ja/nee}}` = ja; dan als "Erkend leerbedrijf (SBB)", los van de vakbekwaamheidsitems. Bij nee of leeg: verwijderen |
| JSON-LD | Geen `hasCredential` of vergelijkbare claim voor NEN 1010. Diploma alleen als `{{TODO}}` is ingevuld |

**Klaar als:** zoekopdracht `gecertificeerd` geeft 0 treffers op de site; nergens staat dat het bedrijf VP of gecertificeerd is.

## Stap 2 — FAQ aanpassen en aanvullen

Bron voor garantie: algemene voorwaarden AET Solutions, artikel 9 (12 maanden op het werk; op materiaal de garantie van fabrikant of leverancier).

**Herschrijven:**

**Welke kwalificaties heeft AET Solutions?**
De werkzaamheden van AET Solutions worden uitgevoerd door een gediplomeerd, ervaren NEN 3140 Vakbekwaam Persoon. Elke installatie wordt aangelegd volgens NEN 1010, de norm voor elektrische installaties in Nederland. Bij oplevering meten en testen wij alles door. Diploma's en certificaten zijn op aanvraag in te zien.

**Toevoegen (na de vraag over kosten):**

**Geeft u garantie?**
Ja. Op het uitgevoerde werk geeft AET Solutions 12 maanden garantie na oplevering: gebreken die door de uitvoering komen, lossen wij kosteloos op. Op materiaal zoals groepenkasten, automaten, laadpalen en thuisbatterijen geldt de garantie van de fabrikant; wij regelen die voor u als er iets mis is. De volledige voorwaarden staan in onze algemene voorwaarden.

Link "algemene voorwaarden" naar `/algemene-voorwaarden/`.

**Klaar als:** FAQ heeft 8 vragen; de garantietekst wijkt niet af van artikel 9 van de algemene voorwaarden.

## Stap 3 — Bedrijfsgegevens

| Gegeven | Waarde |
|---|---|
| Handelsnaam | AET Solutions |
| KvK | 42153046 |
| Btw-id | `{{TODO: NL…B..}}` — tot invulling niets tonen, geen lege regel |
| Telefoon | 06 38 43 58 49 (`tel:+31638435849`) — **besluit eigenaar 17-11: niet tonen** |
| WhatsApp | `{{TODO: ja/nee}}` — **besluit eigenaar 17-11: nee** |
| E-mail | info@aet-solutions.nl |
| Adres | Niet tonen |

**Plaatsen:**
- Footer op elke pagina: handelsnaam, KvK, btw-id (zodra ingevuld), telefoon, e-mail.
- Header: klikbaar telefoonnummer naast "Maak een afspraak".
- Mobiele onderbalk: Bel · (WhatsApp) · Afspraak.
- `/contact/` en `/zakelijk/`: telefoon en e-mail bovenaan.
- JSON-LD `Electrician`: `telephone`, `email`, `taxID` (alleen btw-id), `identifier` KvK. Geen adres.

**Klaar als:** KvK en telefoon zichtbaar op elke pagina; `tel:` werkt op mobiel; geen adres op de site of in JSON-LD.

## Stap 4 — Controle
- Linkcheck 0 fouten.
- Mobiel getest op 360 en 390 px: onderbalk bedekt de verzendknop niet.
- Rapport: gewijzigde bestanden en openstaande `{{TODO}}`'s.
