# AET Solutions – website (aet-solutions.nl)

Statische site op GitHub Pages. De pagina's worden gegenereerd; pas de HTML-bestanden niet met de hand aan.

## Iets wijzigen
1. **Gegevens** (telefoon, e-mail, naam, btw-id, regio, steden, reactietijd, garantie, formulieradres): `site.config.json`.
2. **Teksten**: `src/pages.js`.
3. **Reviews en projecten**: `content/` (zie `content/LEES-MIJ.md`).
4. Voer daarna uit: `node tools/build.js` en controleer met `node tools/check.js .`
5. Commit en push naar `main`; GitHub Pages zet de site live.

Een leeg veld in `site.config.json` betekent dat het onderdeel niet op de site verschijnt. Vul `telefoon` in en de belknop, WhatsApp-knop en mobiele balk verschijnen op elke pagina.

## Bewust weggelaten
- `telefoon` is leeg: op verzoek van de eigenaar staat er geen telefoonnummer op de site, alleen het e-mailadres. Vul het veld in en de belknop, WhatsApp en de mobiele belbalk verschijnen weer.
- `kvk` is leeg: het KvK-nummer staat niet op de site, omdat zoekmachines het koppelen aan het vestigingsadres in het Handelsregister. Het nummer hoort wel op offertes en facturen.

## Nog open
- `startTermijn`: antwoord op de vraag "Hoe snel kunnen jullie starten?"; de vraag verschijnt pas als dit is ingevuld.
- `partner`: naam van het merk en `tonen: true` zodra de leverancier akkoord is.
- Projectfoto's en reviews: zie `content/LEES-MIJ.md`.
- `eigenaar`, `portret`, `vestigingsplaats`, `btw`, `reactietijd`, `garantieArbeid`.
- `formulierEndpoint` (bijv. Formspree) en `formulierdienst` (naam, voor de privacyverklaring). Zolang dit leeg is, opent het formulier het e-mailprogramma.
- Volledige algemene voorwaarden aanleveren; nu staat er een samenvatting.
- Vestigingsadres en btw-id zijn wettelijk verplicht op een bedrijfswebsite (art. 3:15d BW).

## Daarna
- Google Search Console: sitemap `https://aet-solutions.nl/sitemap.xml` indienen.
- Google Bedrijfsprofiel aanmaken.
- Mailsjablonen staan in `docs/mailsjablonen.md`.
- Lettertype: Inter (`assets/inter.woff2`), SIL Open Font License 1.1.

## Niet mogelijk op GitHub Pages
Eigen redirects, security headers en cache-headers. GitHub Pages regelt https en www zelf; een tweede domein stuurt u door bij de domeinregistratie.
