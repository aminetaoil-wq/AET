# AET Solutions — Ronde 4: formulier live, Google, voorwaarden en techniek

Versie 1.0 · 18 november 2026 · bouwt voort op RONDE3.md (v1.3), FIX.md (v1.1) en de Engelse versie (PR #25/#26)

**Gebruik:** zet dit bestand als `RONDE4.md` in de root van de website-map en typ in Claude Code:
`Voer RONDE4.md uit. Begin met stap 0 en laat me het rapport zien voordat je iets wijzigt.`

---

## 1. Besluiten van de eigenaar (vast)

| Onderwerp | Besluit |
|---|---|
| Formulierdienst | Formspree, endpoint `https://formspree.io/f/mppddnbl` |
| Foto-upload in formulier | {{TODO: alleen als het Formspree-abonnement bestanden ondersteunt (gratis plan doet dat niet — controleren in het Formspree-account). Bij nee: upload uit, foto's per e-mail}} |
| Google Bedrijfsprofiel | Bestaat. Link: {{TODO: deel-link van het profiel, bijv. https://g.page/r/…}} |
| Algemene voorwaarden | Eigen pagina, alleen bereikbaar via de footer (niet in menu, niet in de hero). Tekst: {{TODO: bestand aanleveren als `content/algemene-voorwaarden.md` of .pdf}} |
| Btw-id | {{TODO: NL…B..}} — tot invulling niets tonen |
| Telefoon / WhatsApp | Blijven weg (besluit 12, 15 en 16 november) |
| KvK | 42153046, in footer en JSON-LD (FIX.md) |
| Adres | Nergens, ook niet in JSON-LD |

## 2. Harde regels (blijven gelden)

1. Verzin niets: geen prijzen, garantie, verzekering, reviews of juridische tekst die niet is aangeleverd.
2. Elke wijziging in beide talen (`src/` en `src/en/`); `node tools/build.js` stopt bij een ontbrekend tegenstuk.
3. Geen "gecertificeerd"/"certified"; kwalificaties volgens FIX.md.
4. Eén commit per stap, één PR, samenvoegen pas als alle controles groen zijn.

---

## 3. Stappen

### Stap 0 — Inventaris (niets wijzigen)
- Huidige formulierroute (mailto), `site.config.json` (`formulierEndpoint`, `formulierdienst`, `googleProfiel`), privacyverklaring NL/EN, footerlinks, sitemap.
- Netwerktest vanuit de omgeving: is `formspree.io` bereikbaar? Is `aet-solutions.nl` bereikbaar (voor stap 5)? Zo niet: melden en de eigenaar laten testen.
- Rapport: wat er per stap verandert, welke `{{TODO}}`'s nog open zijn.

### Stap 1 — Formulieren via Formspree
| Taak | Klaar als |
|---|---|
| `formulierEndpoint` = het endpoint, `formulierdienst` = "Formspree" in `site.config.json`. | Formulier verstuurt via `fetch` met `Accept: application/json`, geen mailto meer. |
| Nieuwe config-sleutel `formulierUpload` (true/false), los van het endpoint. Uploadveld alleen tonen bij `true`. Standaard `false`. | Geen uploadveld zolang het abonnement geen bestanden ondersteunt. |
| Velden `_replyto` (= e-mailadres bezoeker) en `_subject` meesturen, zodat de eigenaar direct kan antwoorden. Onderwerpregels NL/EN blijven zoals nu. | Antwoorden in de mailbox gaan naar de klant. |
| Terugbelformulier op `/contact/` en `/en/contact/` ook via Formspree. | Idem. |
| Na succes: `/bedankt/` resp. `/en/thank-you/` (noindex). Bij fout: melding met het e-mailadres; mailto alleen als laatste terugval. | Foutpad getest (endpoint tijdelijk ongeldig gemaakt in een testbuild). |
| Honeypot `_gotcha` blijft. | Spam-veld aanwezig, onzichtbaar. |
| Privacyverklaring NL/EN: Formspree als verwerker bij naam, Amerikaans bedrijf, doel: formulier doorsturen. | Tekst in beide talen. |
| Eén echte testinzending pas na akkoord eigenaar (eerste inzending activeert het formulier via een bevestigingsmail van Formspree). | Eigenaar bevestigt ontvangst. |

### Stap 2 — Google Bedrijfsprofiel
| Taak | Klaar als |
|---|---|
| `googleProfiel` vullen met de aangeleverde link. | JSON-LD `sameAs` bevat de link; `/over/` en `/en/about/` tonen "Lees de reviews op Google" / "Read our reviews on Google". |
| Reviewverzoek-sjabloon in `docs/mailsjablonen.md` voorzien van de directe reviewlink. | Link klikbaar in het sjabloon. |
| Reviewblok op de homepage blijft verborgen tot er een echte review in `content/reviews.json` staat. | Geen nep- of voorbeeldreviews. |

### Stap 3 — Sitemap voor Search Console
| Taak | Klaar als |
|---|---|
| Sitemap bestaat al op `https://aet-solutions.nl/sitemap.xml` (56 url's). Aanvullen met `xhtml:link`-alternates (nl/en/x-default) per url. | Valideert als XML; elke url heeft zijn tegenstuk. |
| `robots.txt` verwijst naar de sitemap. | Aanwezig. |
| Instructie voor de eigenaar in het eindrapport (zie sectie 5). | — |

### Stap 4 — Algemene voorwaarden op een eigen pagina
| Taak | Klaar als |
|---|---|
| `/algemene-voorwaarden/` wordt de volledige tekst (artikelen met ankers, inhoudsopgave), versiedatum bovenaan, pdf-download als die is aangeleverd. Alleen gelinkt vanuit de footer en vanuit formulier/FAQ waar al naar verwezen wordt. | Niet in het hoofdmenu. |
| Tekst komt **letterlijk** uit het aangeleverde bestand. Artikel 9 = garantie (12 maanden op werk, fabrieksgarantie op materiaal) moet overeenkomen met de FAQ. | Steekproef: garantie-FAQ en artikel 9 zeggen hetzelfde. |
| **Geen bestand aangeleverd?** Dan geen juridische tekst publiceren. Claude Code mag een concept opstellen in `content/algemene-voorwaarden-concept.md` (op basis van consumentenrecht, Boek 7 BW, met artikel 9 garantie) ter beoordeling door eigenaar/jurist; de huidige samenvattingspagina blijft dan live. | Geen ongetoetste voorwaarden online. |
| Engelse versie `/en/terms-and-conditions/` met de regel "This is a translation. In the event of any discrepancy, the Dutch version shall prevail." | Taalknop koppelt beide. |

### Stap 5 — Technische punten
| Taak | Klaar als |
|---|---|
| **HTTPS en www.** Testen met `curl -I` op `http://aet-solutions.nl`, `http://www.aet-solutions.nl`, `https://www.aet-solutions.nl`, `https://aet-solutions.nl`. Verwacht: alles 301 naar `https://aet-solutions.nl/`. Kan de omgeving het domein niet bereiken: eigenaar laat het zien of geeft netwerktoegang. | Vier regels uitkomst in het rapport, of een concrete instructie voor de eigenaar (GitHub → Settings → Pages: "Enforce HTTPS" aan; DNS: `www` als CNAME naar `aminetaoil-wq.github.io`). |
| **Beveiliging via meta-tags** (GitHub Pages staat geen eigen headers toe): `Content-Security-Policy` met `default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:; font-src 'self'; connect-src 'self' https://formspree.io; form-action 'self' https://formspree.io mailto:; base-uri 'self'; object-src 'none'` en `<meta name="referrer" content="strict-origin-when-cross-origin">`. Eerst controleren op inline scripts/styles die dit breken (JSON-LD mag; favicon-animatie gebruikt `data:`-afbeeldingen). | 0 CSP-fouten in de console op alle pagina's, formulier werkt. |
| In het rapport benoemen wat **niet** kan op GitHub Pages: HSTS-instellingen, `frame-ancestors`, Permissions-Policy-header. Alternatief noemen (Cloudflare voor de site) met kosten/baten, niet uitvoeren. | Eerlijk overzicht. |
| `rel="noopener"` op alle externe links met `target="_blank"` (indien aanwezig). | Lighthouse Best Practices 100. |
| `check.js` uitbreiden: endpoint aanwezig in `data-endpoint`, geen `mailto:` als formulieractie, CSP-meta op elke pagina. | Controle faalt bij regressie. |

---

## 4. Verificatie (alles moet groen zijn voor samenvoegen)
- `node tools/build.js` en `node tools/check.js .`: 0 fouten.
- Playwright: alle formulieren NL/EN (afspraak, zakelijk, stage, terugbellen) met onderschepte `fetch` naar Formspree — juiste velden, `_replyto`, `_subject`, doorsturen naar bedanktpagina; foutpad toont melding.
- Console: 0 CSP-fouten en 0 JS-fouten op alle 56+ pagina's, 7 breedtes, licht/donker.
- Taalknop heen en terug op alle paren.
- Lighthouse mobiel op `/`, `/en/`, `/contact/`, `/algemene-voorwaarden/`: ≥ 95 op alle vier categorieën.
- Na publicatie: GitHub Pages-run geslaagd; eigenaar doet één echte testinzending.

## 5. Wat de eigenaar zelf doet
| Wanneer | Actie |
|---|---|
| Nu | Google Search Console: eigendom `aet-solutions.nl` toevoegen (Domein-eigendom via DNS of URL-voorvoegsel `https://aet-solutions.nl/`), bij **Sitemaps** invullen: `sitemap.xml` → Indienen. Daarna URL-inspectie op `/` en `/en/` → "Indexering aanvragen". |
| Nu | Link van het Google Bedrijfsprofiel sturen (Profiel → Delen). |
| Nu | In Formspree: plan controleren (bestanden ja/nee), na de eerste testinzending het formulier bevestigen via de mail. |
| Nu | Tekst of pdf van de algemene voorwaarden aanleveren. |
| Na elke klus | Reviewverzoek sturen met de directe Google-link. |

## 6. Eindrapport
Gewijzigde bestanden, testresultaten met uitkomsten, curl-uitkomsten (of instructie), wat technisch niet kan op GitHub Pages, openstaande `{{TODO}}`'s.
