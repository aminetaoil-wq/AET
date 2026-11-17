# Reviews en projecten

De blokken op de homepage verschijnen alleen als hier minimaal één item staat. Voer daarna `node tools/build.js` uit.

`reviews.json` (alleen echte reviews, met toestemming):

    [{ "naam": "J. de Vries", "plaats": "Zeist", "klus": "Laadpaal", "tekst": "..." }]

`projecten.json` (een project zonder `"toestemming": true` wordt niet getoond; bij het eerste project verschijnen het blok op de homepage en de pagina /projecten/):

    [{ "plaats": "Amersfoort", "klus": "Groepenkast vervangen",
       "opdracht": "Verouderde stoppenkast vervangen door een groepenkast met ruimte voor een laadpaal.",
       "werkzaamheden": ["Groepenkast vervangen", "Extra groep voor laadpaal", "Installatie doorgemeten"],
       "bijzonderheden": "Aansluiting tegelijk verzwaard naar 3-fase.",
       "resultaat": "Veilige installatie met ruimte voor uitbreiding.",
       "toestemming": true,
       "fotos": [{ "src": "/assets/projecten/amersfoort-1.webp", "alt": "Nieuwe groepenkast met 3-fase hoofdschakelaar", "w": 1200, "h": 900 }] }]

Foto's: maximaal 200 kB per stuk, WebP, met een beschrijvende alt-tekst.

# Diensten (menu, dienstpagina's, formulieropties)

Alles komt uit `src/diensten.js`. Een dienst toevoegen: kopieer een bestaand blok, geef het een eigen `key`, `url`, `menu`, `formOptie`, `title`, `desc`, `h1` en eigen tekst (500-800 woorden, niet kopiëren van een andere dienst). Menu, formulier, sitemap en verwante diensten volgen vanzelf. Daarna `node tools/build.js` en `node tools/check.js .`.

Een oude URL laten doorverwijzen: voeg hem toe aan `redirects` in `tools/build.js`.

# Open gegevens (RONDE3 sectie 2)

Zolang deze leeg zijn in `site.config.json`, staat er niets over op de site:

- `vanafPrijs` (meterkast, laadpaal, thuisbatterij)
- `garantieArbeid`
- `verzekerd` (aansprakelijkheidsverzekering)
- `partner` (merk thuisbatterij)
- `googleProfiel`
- `reactietijd`, `startTermijn`
- `formulierEndpoint` + `formulierdienst` (nu opent elke aanvraag het e-mailprogramma van de bezoeker)
- Verrekensysteem voor de laadpaal: nog geen veld; tekst op `/laadpaal/zakelijk-verrekenen/` noemt bewust geen systeem.

# Logo's van merken en normen (RONDE3 3a)

Bestanden horen in `assets/merken/` (`hager-logo.png`, `abb-logo.png`, `schneider-electric-logo.png`) en `assets/normen/` (`nen-logo-transparant.png`). PNG met transparante achtergrond of SVG. Zolang een bestand ontbreekt of `tonen` in `content/logos.json` op `false` staat, toont de site de naam als tekst (merk) of het eigen icoon (norm). Een logo verwijderen: `"tonen": false` en opnieuw bouwen.
