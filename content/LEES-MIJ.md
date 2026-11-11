# Reviews en projecten

De blokken op de homepage verschijnen alleen als hier minimaal één item staat. Voer daarna `node tools/build.js` uit.

`reviews.json` (alleen echte reviews, met toestemming):

    [{ "naam": "J. de Vries", "plaats": "Zeist", "klus": "Laadpaal", "tekst": "..." }]

`projecten.json` (een project zonder `"toestemming": true` wordt niet getoond):

    [{ "plaats": "Amersfoort", "klus": "Groepenkast vervangen", "beschrijving": "...",
       "toestemming": true,
       "fotos": [{ "src": "/assets/projecten/amersfoort-1.webp", "alt": "Nieuwe groepenkast met 3-fase hoofdschakelaar", "w": 1200, "h": 900 }] }]

Foto's: maximaal 200 kB per stuk, WebP, met een beschrijvende alt-tekst.
