# Beeldlijst (RONDE3 fase 2)

Licenties en bronnen staan in `content/beeldlicenties.md` (gegenereerd bij elke build).

## Geplaatst (17-11-2026)

| Foto | Waar |
|---|---|
| `groepenkast-abb` (Unsplash photo-1576446470246-499c738d1c8e) | Homepage-hero, kaart Meterkast, kop `/meterkast/` en `/meterkast/groepenkast-vervangen/` |
| `laadpaal-auto` (Unsplash photo-1704475336842-0ab3798abf0e) | Kaart Laadpaal & thuisbatterij, kop `/laadpaal/` en `/laadpaal/zakelijk-verrekenen/` |
| `elektra-lasdoos` (Unsplash photo-1581972327480-e3764d31e5e6) | Kaart Elektra aanleggen, kop `/elektra/` en `/elektra/renovatie/` |

Niet gebruikt: photo-1588616437819-7d30e6f76e66 (industriële kast, paars filter).

## Nog nodig (F2.2), in volgorde van belang

1. Thuisbatterij aan de wand (uitgelichte kaart op de homepage, kop `/thuisbatterij/`)
2. Keuken of inductiekookplaat (`/elektra/keukenvoorbereiding/`, `/elektra/inductiekookplaat/`)
3. Binnenverlichting, inbouwspots (`/elektra/verlichting/`)
4. Tuinverlichting (`/elektra/tuinverlichting/`)
5. Utiliteit / kabelgoten (`/zakelijk/`)
6. Meetapparatuur (`/keurmerk/`)

Eisen: alleen gratis Unsplash-foto's (bestandsnaam begint met `photo-`, niet `premium_photo-`; geen iStock-advertenties), Europese installaties, geen herkenbare gezichten, geen leesbaar merk behalve Hager, ABB of Schneider Electric.

Zoeken op Unsplash lukt niet vanuit de bouwomgeving. De eigenaar stuurt de `photo-…`-code of de link van de afbeelding; de foto wordt dan opgehaald met `node tools/fotos.js` na een regel in `content/fotos.json`.

## Foto toevoegen

1. Regel toevoegen in `content/fotos.json` (naam, id, alt, bron, licentie, datum, uitsneden met focuspunt).
2. `node tools/fotos.js` (haalt AVIF, WebP en JPG op in 480/960/1600 px).
3. Veld `foto` zetten bij de dienst in `src/diensten.js`.
4. `node tools/build.js && node tools/check.js .`
