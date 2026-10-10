# AET Solutions – website (aetsolutions.nl)

Statische site: geen build-stap, geen CMS. Upload de **inhoud** van deze map (niet de map zelf) naar uw hosting.

## Vóór livegang
1. **Telefoonnummer**: `assets/site.js`, regel `PHONE=""`. Vul in als `31612345678`. Dan verschijnen bellen/WhatsApp automatisch.
2. **Formulier**: maak een formulier aan bij uw formulierdienst (bijv. Formspree) en zet het adres in `assets/site.js`, regel `ENDPOINT=""`. Test daarna een aanvraag. Zolang ENDPOINT leeg is, opent het formulier het e-mailprogramma.
3. **E-mailadres**: zoek op `AET-Works@hotmail.com` en vervang door uw adres op het eigen domein (in alle .html-bestanden en `assets/site.js`).
4. **Privacyverklaring**: pas de bewaartermijn `[12 maanden]` aan en haal de gele markering weg (`class="ph"`). Laat de tekst tegenlezen.
5. **Algemene voorwaarden**: de volledige voorwaarden stuurt u als PDF mee met elke offerte.
6. **Domein**: de site gaat uit van `https://aetsolutions.nl` (zonder www). Zet in uw hosting een redirect van www naar deze naam en zet https aan.

## Daarna
- Meld de site aan bij Google Search Console en dien `sitemap.xml` in.
- Maak een Google Bedrijfsprofiel aan.
- Voeg een eigen foto, werkfoto's en reviews toe zodra u die heeft.

## Bestanden
`index.html` (home), `thuisbatterij/`, `laadpaal/`, `meterkast/`, `overige-elektrotechniek/`, `privacyverklaring/`, `algemene-voorwaarden/`, `bedankt/` (na verzenden), `404.html`, `assets/`, `robots.txt`, `sitemap.xml`.
