// Alle paginateksten. Contactgegevens, regio en kwalificaties komen uit site.config.json.
// Na een wijziging: node tools/build.js
module.exports = function (c) {
  const { cfg, esc, mail, tel, wa, reviews, projecten, stedenTekst, stedenOmg, ico, foto, logo, logos } = c;
  const regio = esc(cfg.regio);
  const naam = esc(cfg.handelsnaam);
  const kwal = cfg.kwalificaties.map(esc).concat(cfg.erkendLeerbedrijf ? ["Erkend leerbedrijf (SBB)"] : []);
  const werkgebied = `Wij werken in ${regio}: ${stedenOmg(4)}.`;
  const kb = require("./kennisbank.js")(c);

  /* ---------- Bouwstenen ---------- */
  const faq = items => items.map(([q, a]) => `<details><summary>${q}</summary><p>${a}</p></details>`).join("\n");
  const tiles = items => `<ul class="tiles">${items.map(([i, t]) => `<li>${ico(i)}<span>${t}</span></li>`).join("")}</ul>`;
  const icards = items => `<ul class="icards">${items.map(([i, t, d]) => `<li><span class="ic">${ico(i)}</span><b>${t}</b><p>${d}</p></li>`).join("")}</ul>`;
  const callout = t => `<div class="callout">${ico("alert")}<p>${t}</p></div>`;
  const vanaf = k => cfg.vanafPrijs[k] ? `<p><strong>Richtprijs:</strong> vanaf ${esc(cfg.vanafPrijs[k])}. De exacte prijs staat in uw offerte.</p>` : "";
  const phead = (o, knop) => `<div class="phead${o.foto ? " has-foto" : ""}" id="top">${o.foto ? foto(o.foto, "hero", { cls: "bg", eager: true }) : ""}<div class="wrap">
<ol class="crumbs"><li><a href="/">Home</a></li>${(o.crumbs || [[o.crumb]]).map(k => k[1] ? `<li><a href="${k[1]}">${k[0]}</a></li>` : `<li>${k[0]}</li>`).join("")}</ol>
<h1>${o.h1}</h1>
<p class="lead">${o.lead}</p>
${knop ? `<div class="cta"><a class="btn" href="#offerte">${o.knop || "Maak een afspraak"}</a>${o.geenTerug ? "" : `<a class="btn ghost" href="/contact/#terugbellen">Bel mij terug</a>`}</div>` : ""}
</div></div>`;
  const { groepen, diensten: DL, byKey } = c.dd;
  const rel = d => `<a class="rel" href="${d.url}"><span class="ic">${ico(d.icon)}</span>${d.menu}<span class="arr">${ico("arrow")}</span></a>`;
  const related = (keys, titel) => `<div class="related"><div class="wrap">
<h2>${titel || "Verwante diensten"}</h2>
<div class="grid">${keys.map(k => rel(byKey[k])).join("")}</div>
</div></div>`;
  const groepRelated = `<div class="related"><div class="wrap">
<h2>Onze diensten</h2>
<div class="grid">${groepen.map(g => `<a class="rel" href="${g.url}"><span class="ic">${ico(g.icon)}</span>${g.label}<span class="arr">${ico("arrow")}</span></a>`).join("")}<a class="rel" href="/thuisbatterij/"><span class="ic">${ico("batterij")}</span>Thuisbatterij<span class="arr">${ico("arrow")}</span></a></div>
</div></div>`;
  const side = (kort, knop) => `<aside class="side" aria-label="In het kort">
<h2>In het kort</h2>
<ul class="checks">${kort.map(k => `<li>${k}</li>`).join("")}</ul>
<a class="btn" href="#offerte">${knop || "Maak een afspraak"}</a>
<a class="btn line" href="/contact/#terugbellen">Bel mij terug</a>
<div class="sidec"><a href="mailto:${esc(cfg.email)}">${ico("mail")}${esc(cfg.email)}</a></div>
</aside>`;
  const meerLezen = slugs => `\n<h2>Meer lezen in de kennisbank</h2>\n<ul class="checks">${slugs.map(x => `<li><a href="${kb.bySlug[x].url}">${kb.bySlug[x].h1}</a></li>`).join("")}</ul>`;
  const svc = o => `${phead(o, true)}
<div class="wrap layout"><div class="prose">
${o.body}${o.lezen ? meerLezen(o.lezen) : ""}
</div>
${side(o.kort, o.knop)}</div>
${o.geenRelated ? "" : groepRelated}`;
  const tekst = o => `${phead(o, false)}
<div class="wrap solo prose">
${o.body}
</div>`;
  const normen = `<p>Elke installatie wordt aangelegd volgens NEN 1010 en doorgemeten opgeleverd. De werkzaamheden worden uitgevoerd door een gediplomeerd, ervaren NEN 3140 Vakbekwaam Persoon. <a href="/keurmerk/">Meer over onze normen en werkwijze</a>.</p>`;
  // Merkenblok volgens RONDE3 3a: alleen "Wij werken met", geen relatie met het merk suggereren.
  const merkenBlok = `<section class="merken" aria-labelledby="merken-h"><div class="wrap">
<h2 id="merken-h">Wij werken met</h2>
<ul class="merkrij">${["Hager", "ABB", "Schneider Electric"].map(m => `<li>${logo(m, 40)}</li>`).join("")}</ul>
<p class="small">${naam} is een onafhankelijk installatiebedrijf. Merknamen en logo's zijn eigendom van de betreffende fabrikanten.</p>
</div></section>`;
  const normLogo = (n, h) => logo(n, h, false);
  const docs = ["KvK-uittreksel", "Diploma en NEN 3140 VP-certificaat"]
    .concat(cfg.vca ? ["VCA-certificaat (" + esc(cfg.vca) + ")"] : [])
    .concat(cfg.verzekerd ? ["Polis aansprakelijkheidsverzekering"] : []);

  /* ---------- Dienstpagina's (data in src/diensten.js) ---------- */
  const dienstPagina = d => {
    const g = groepen.find(x => x.key === d.groep);
    const ouder = d.key === "zakelijk-verrekenen" ? ["Laadpaal installatie", "/laadpaal/"] : g.overzicht ? [g.label, g.url] : null;
    const body = `${phead({ crumbs: (ouder ? [ouder] : []).concat([[d.menu]]), h1: d.h1, lead: d.lead, foto: d.foto }, true)}
<div class="wrap layout"><div class="prose">
<h2>Wanneer is dit nodig?</h2>
<ul class="checks">${d.wanneer.map(x => `<li>${x}</li>`).join("")}</ul>

<h2>Zo pakken wij het aan</h2>
<ol class="steps v">${d.stappen.map(([t, x]) => `<li><b>${t}</b><span>${x}</span></li>`).join("")}</ol>

${d.secties.map(([t, x]) => `<h2>${t}</h2>\n${x}`).join("\n\n")}

<h2>Wat is inbegrepen?</h2>
<ul class="checks">${d.inbegrepen.map(x => `<li>${x}</li>`).join("")}</ul>

<h2>Waar hangt de prijs van af?</h2>
${tiles(d.prijs)}
${d.prijsKey ? vanaf(d.prijsKey) : ""}<p>U ontvangt vooraf een vrijblijvende offerte met een vaste prijs, waarin deze onderdelen apart staan. Meerwerk alleen na uw akkoord.</p>

<h2>Veiligheid en normen</h2>
<p>${d.veilig}</p>
${normen}

<h2>Veelgestelde vragen</h2>
${faq(d.vragen)}
${meerLezen(d.lezen)}
</div>
${side(d.kort)}</div>
${d.groep === "meterkast" ? merkenBlok + "\n" : ""}${related(d.verwant)}`;
    return { path: d.url.slice(1), form: true, preload: d.foto, dienst: d.formOptie, service: d.service, crumb: d.menu, trail: ouder ? [ouder] : [], body, title: `${d.title} | ${cfg.handelsnaam}`, desc: d.desc };
  };

  const groepKaart = d => `<a class="svc" href="${d.url}"><span class="ic">${ico(d.icon)}</span><h3>${d.menu}</h3><p>${d.kaart}</p><span class="more">Meer over ${d.menu.toLowerCase()}${ico("arrow")}</span></a>`;

  /* ---------- Overzicht: elektra ---------- */
  const gE = groepen.find(g => g.key === "elektra"), gM = groepen.find(g => g.key === "meterkast"), gL = groepen.find(g => g.key === "laden");
  const elektraOverzicht = svc({ crumb: "Elektra aanleggen", foto: "elektra-lasdoos",
    h1: "Elektra aanleggen in Utrecht, Amersfoort en Amsterdam",
    lead: `Nieuwe leidingen bij een verbouwing, een keuken die klaar moet voor inductie of verlichting binnen en in de tuin. ${naam} legt de elektra aan, monteert alles netjes af en levert het werk doorgemeten op. U weet vooraf wat het kost.`,
    kort: ["Renovatie, keuken, verlichting en tuin", "Afgestemd met uw aannemer", "Doorgemeten opgeleverd", "Prijs vooraf, meerwerk alleen na akkoord"],
    body: `<h2>Waarmee wij u helpen</h2>
<div class="grid two">${gE.items.map(groepKaart).join("")}</div>

<h2>Elektra in bedrijfspanden</h2>
<p>Ook in kantoren, winkels en bedrijfsruimtes leggen wij elektra aan, van extra groepen tot verlichting. Voor projecten in de utiliteitsbouw en voor installatiebedrijven die capaciteit zoeken, zie <a href="/zakelijk/#utiliteitsbouw">utiliteitsbouw</a>.</p>

<h2>Eén keer goed aanleggen</h2>
<p>Elektra leg je het liefst aan op het moment dat wanden en vloeren toch open zijn. Achteraf frezen, boren en opnieuw stucen kost meer tijd en geld. Daarom denken wij vooraf mee: waar komen stopcontacten en schakelaars, welke apparaten krijgen een eigen groep en is er in de meterkast ruimte voor wat u later nog wilt, zoals een laadpaal of thuisbatterij.</p>

<h2>Hoe het werk verloopt</h2>
<ol class="steps v"><li><b>Aanvraag</b><span>U beschrijft wat u wilt en stuurt een tekening, schets of foto's mee.</span></li><li><b>Offerte</b><span>U ontvangt een vrijblijvende offerte met de werkzaamheden, de materialen en een vaste prijs.</span></li><li><b>Aanleg</b><span>Wij leggen de elektra aan op de afgesproken momenten, afgestemd met uw aannemer.</span></li><li><b>Oplevering</b><span>Wij meten de installatie door en lopen het resultaat met u door.</span></li></ol>

<h2>Veiligheid en normen</h2>
${normen}` });

  /* ---------- Overzicht: meterkast ---------- */
  const meterkastOverzicht = svc({ crumb: "Meterkast", foto: "groepenkast-abb", lezen: ["wat-zit-er-in-mijn-meterkast", "meterkast-geschikt-laadpaal-thuisbatterij", "1-fase-of-3-fase"],
    h1: "Meterkast en groepenkast in Utrecht, Amersfoort en Amsterdam",
    lead: `Wilt u een laadpaal, inductiekookplaat of thuisbatterij aansluiten? Dan heeft elk van die apparaten een eigen groep nodig. In een volle of verouderde meterkast is daar geen ruimte voor. ${naam} vervangt, breidt uit en bereidt voor op 3-fase, in woningen en bedrijfspanden.`,
    kort: ["Vervangen, uitbreiden of een groep erbij", "3-fase voorbereiding", "Opgebouwd en getest volgens NEN 1010", "Meestal binnen één werkdag klaar"],
    body: `<h2>Waarmee wij u helpen</h2>
<div class="grid two">${gM.items.map(groepKaart).join("")}</div>

<h2>Meterkast, groepenkast of verdeelinrichting?</h2>
<p>Het gaat om hetzelfde onderdeel. In een woning heet het meestal de meterkast of groepenkast. In een bedrijfspand spreekt men van een verdeelinrichting: die is groter, vaak 3-fase en telt meer groepen. Wij werken aan beide.</p>

<h2>Hieraan herkent u een verouderde meterkast</h2>
<ul class="checks"><li>U heeft nog smeltzekeringen (stoppen) in plaats van automaten.</li><li>Er ontbreekt een aardlekschakelaar, of er hangen meer dan vier groepen aan één aardlekschakelaar.</li><li>Dezelfde groep valt regelmatig uit.</li><li>Er is geen plek meer voor een extra groep.</li></ul>
${callout("<strong>Worden onderdelen warm, zijn ze verkleurd of ruikt u een brandlucht?</strong> Schakel de groep dan uit en laat de kast controleren.")}

<h2>Wat doet de netbeheerder en wat doen wij?</h2>
<p>De netbeheerder is eigenaar van de aansluitkabel, de hoofdzekering en de meter. Een zwaardere aansluiting of 3-fase vraagt u aan via mijnaansluiting.nl. Alles achter de meter is ons werk: hoofdschakelaar, aardlekschakelaars, groepen en bedrading.</p>

<h2>Uw meterkast laten beoordelen</h2>
<p>Met een foto is veel al op afstand te beoordelen. Stuur bij uw aanvraag een foto van de kast met de deur open, wat u wilt aansluiten en uw postcode.</p>
${normen}` });

  /* ---------- Homepage ---------- */
  // Kernwaardenbalk (FIX.md stap 1): vier feiten, geen dubbele subregels; SBB staat los hiervan.
  const kern = [["tag", "Vaste prijs vooraf", ""], ["shield", "Gediplomeerd, ervaren NEN 3140 Vakbekwaam Persoon", "", "NEN 3140"], ["doc", "Werkt volgens NEN 1010", "", "NEN 1010"], ["gauge", "Doorgemeten opgeleverd", ""]]
    .concat(cfg.reactietijd ? [["clock", "Reactie " + esc(cfg.reactietijd), "Op elke aanvraag"]] : []);

  const homeFaq = [
    ["Is mijn meterkast geschikt voor een laadpaal, inductiekookplaat of thuisbatterij?", `Dat hangt af van uw aansluiting (1-fase of 3-fase), de waarde van uw hoofdzekering en de vrije ruimte in uw groepenkast. Apparaten met een hoog vermogen krijgen elk een eigen groep. Stuurt u een foto van uw meterkast mee, dan ontvangt u een eerste inschatting. Meer op de pagina <a href="/meterkast/">meterkast</a>.`],
    ["Wat kost een elektricien?", `Dat verschilt per opdracht. De prijs bestaat uit materiaal, arbeid en eventuele reiskosten. Het aantal groepen of aansluitpunten, de lengte van de leidingen en aanpassingen aan uw meterkast bepalen het grootste deel. U ontvangt vooraf een vrijblijvende offerte met een vaste prijs.`],
    ["Geeft u garantie?", `Ja. Op het uitgevoerde werk geeft ${naam} 12 maanden garantie na oplevering: gebreken die door de uitvoering komen, lossen wij kosteloos op. Op materiaal zoals groepenkasten, automaten, laadpalen en thuisbatterijen geldt de garantie van de fabrikant; wij regelen die voor u als er iets mis is. De volledige voorwaarden staan in onze <a href="/algemene-voorwaarden/">algemene voorwaarden</a>.`],
    ["Wat gebeurt er als er meerwerk nodig is?", `Komt er tijdens het werk iets onverwachts naar voren, dan bespreken wij dat eerst met u. Meerwerk voeren wij alleen uit na uw akkoord.`],
    ["Kan ik gebeld worden in plaats van zelf te bellen?", `Ja. Laat via een <a href="/contact/#terugbellen">terugbelverzoek</a> uw naam, telefoonnummer en voorkeurstijd achter, dan bellen wij u terug.`],
    ["In welk gebied zijn jullie actief?", `Voor particulieren in ${cfg.steden.map(esc).join(", ")} en omliggende plaatsen. Zakelijk: landelijk op projectbasis.`],
    [`Welke kwalificaties heeft ${naam}?`, `De werkzaamheden van ${naam} worden uitgevoerd door een gediplomeerd, ervaren NEN 3140 Vakbekwaam Persoon. Elke installatie wordt aangelegd volgens NEN 1010, de norm voor elektrische installaties in Nederland. Bij oplevering meten en testen wij alles door. Diploma's en certificaten zijn op aanvraag in te zien.`],
    ["Werken jullie ook als onderaannemer?", `Ja, voor installatiebedrijven en voor leveranciers van thuisbatterijen en laadpalen, per klus of per project. Zie <a href="/zakelijk/">Zakelijk</a>.`]
  ].concat(cfg.startTermijn ? [["Hoe snel kunnen jullie starten?", esc(cfg.startTermijn)]] : []);

  const reviewsBlok = reviews.length ? `<section id="reviews"><div class="wrap">
<div class="shead"><span class="kicker">Ervaringen</span><h2>Wat klanten zeggen</h2></div>
<div class="grid">${reviews.slice(0, 2).map(r => `<article class="card"><p>“${esc(r.tekst)}”</p><p class="small"><strong>${esc(r.naam)}</strong>${r.plaats ? ", " + esc(r.plaats) : ""}${r.klus ? " · " + esc(r.klus) : ""}</p></article>`).join("")}</div>
</div></section>\n\n` : "";
  const projectKaart = p => `<article class="card">${p.fotos && p.fotos[0] ? `<img src="${esc(p.fotos[0].src)}" alt="${esc(p.fotos[0].alt)}" width="${p.fotos[0].w}" height="${p.fotos[0].h}" loading="lazy">` : ""}<h3>${esc(p.klus)} in ${esc(p.plaats)}</h3><p>${esc(p.opdracht || p.beschrijving || "")}</p>${p.werkzaamheden && p.werkzaamheden.length ? `<ul class="checks">${p.werkzaamheden.map(w => `<li>${esc(w)}</li>`).join("")}</ul>` : ""}${p.bijzonderheden ? `<p>${esc(p.bijzonderheden)}</p>` : ""}${p.resultaat ? `<p><strong>Resultaat:</strong> ${esc(p.resultaat)}</p>` : ""}</article>`;
  const projectenBlok = projecten.length ? `<section id="projecten"><div class="wrap">
<div class="shead"><span class="kicker">Projecten</span><h2>Uitgevoerd werk</h2></div>
<div class="grid">${projecten.slice(0, 3).map(projectKaart).join("")}</div>
${projecten.length > 3 ? `<div class="cta"><a class="btn line" href="/projecten/">Alle projecten</a></div>` : ""}
</div></section>\n\n` : "";

  const groepBlok = g => `<article class="card groep">${g.foto ? `<div class="kfoto">${foto(g.foto, "kaart")}</div>` : `<span class="ic">${ico(g.icon)}</span>`}<h3><a href="${g.url}">${g.label}</a></h3><p>${g.intro}</p>
<ul class="links">${g.items.filter(d => !d.uitgelicht).map(d => `<li><a href="${d.url}">${d.menu}${ico("arrow")}</a></li>`).join("")}${g.key === "elektra" ? `<li><a href="/zakelijk/#utiliteitsbouw">Utiliteitsbouw${ico("arrow")}</a></li>` : ""}</ul></article>`;
  const tb = byKey.thuisbatterij;

  const home = `
<div class="hero has-foto" id="top">${foto("groepenkast-abb", "hero", { cls: "bg", eager: true })}<div class="wrap">
<div>
<div class="eyebrow">Elektrotechniek · Utrecht · Amersfoort · Amsterdam</div>
<h1>Elektrotechniek, goed geregeld.<br><em>Van meterkast tot thuisbatterij.</em></h1>
<p class="lead"><strong>Vakkundige installatie. Duidelijke afspraken. Eén aanspreekpunt.</strong> Elektra aanleggen, groepenkasten, laadpalen en complete thuisbatterij-installaties, voor particulieren en zakelijke opdrachtgevers.${cfg.reactietijd ? " U krijgt " + esc(cfg.reactietijd) + " een reactie." : ""}</p>
<div class="cta"><a class="btn" href="#offerte">Maak een afspraak</a><a class="btn ghost" href="/contact/#terugbellen">Bel mij terug</a></div>
</div>
</div></div>

<div class="trust"><div class="wrap"><ul>
${kern.map(t => `<li>${(t[3] && normLogo(t[3], 40)) || `<span class="ic">${ico(t[0])}</span>`}<span><b>${t[1]}</b>${t[2] ? `<span>${t[2]}</span>` : ""}</span></li>`).join("\n")}
</ul></div></div>

<section id="over"><div class="wrap two">
<div><span class="kicker">Over ${naam}</span>
<h2>Een elektricien die vooraf zegt wat het kost</h2>
<p class="sub">${naam} verzorgt elektrotechnische installaties voor particulieren en levert capaciteit in onderaanneming. Wij leggen elektra aan, vervangen en breiden groepenkasten uit en installeren laadpalen en thuisbatterijen. U krijgt vooraf een vaste prijs, één vast aanspreekpunt en een installatie die bij de oplevering is doorgemeten.</p>
<div class="cta"><a class="btn" href="/contact/#terugbellen">Bel mij terug</a><a class="btn line" href="/over/">Meer over ${naam}</a></div>
</div>
<div class="card"><h3>Waarom ${naam}</h3>
<ul class="checks"><li>Gediplomeerd, ervaren NEN 3140 Vakbekwaam Persoon</li><li>Werkt volgens NEN 1010</li>${cfg.erkendLeerbedrijf ? `<li>Erkend leerbedrijf (SBB), <a href="/stage/">stage lopen</a></li>` : ""}<li>Meerwerk alleen na uw akkoord</li></ul></div>
</div></section>

<section class="alt" id="keurmerk"><div class="wrap">
<div class="shead"><span class="kicker">Keurmerk en normen</span><h2>Veilig werk volgens de geldende normen</h2>
<p class="sub">Twee normen bepalen hoe wij werken: hoe een installatie moet worden aangelegd, en hoe je er veilig aan werkt.</p></div>
<div class="grid two">
<article class="card">${normLogo("NEN 3140", 64) || `<span class="ic">${ico("shield")}</span>`}<h3>NEN 3140</h3><p>De norm voor het veilig werken aan en het beheer van elektrische installaties. De werkzaamheden van ${naam} worden uitgevoerd door een gediplomeerd, ervaren NEN 3140 Vakbekwaam Persoon. Diploma's en certificaten zijn op aanvraag in te zien.</p></article>
<article class="card">${normLogo("NEN 1010", 64) || `<span class="ic">${ico("doc")}</span>`}<h3>NEN 1010</h3><p>De norm met de veiligheidseisen voor het ontwerpen en aanleggen van laagspanningsinstallaties, zoals de elektra in uw woning of bedrijfspand. Elke installatie wordt aangelegd volgens NEN 1010 en doorgemeten opgeleverd.</p></article>
</div>
<div class="cta"><a class="btn line" href="/keurmerk/">Meer lezen</a></div>
</div></section>

<section id="diensten"><div class="wrap">
<div class="shead"><span class="kicker">Diensten</span><h2>Elektrotechnisch werk voor woning en bedrijf</h2>
<p class="sub">Bij elke dienst leest u wat wij doen, hoe het werk verloopt en waar de prijs van afhangt.</p></div>
<a class="uitgelicht" href="${tb.url}"><span class="ic">${ico("batterij")}</span><span><span class="kicker">Uitgelicht</span><b>${tb.menu}</b><span>${tb.kaart} Eerst rekenen wij door of een batterij bij uw verbruik past.</span></span><span class="more">Lees hoe het werkt${ico("arrow")}</span></a>
<div class="grid three">
${groepen.map(groepBlok).join("\n")}
</div>
</div></section>

<section class="alt" id="werkwijze"><div class="wrap">
<div class="shead"><span class="kicker">Werkwijze</span><h2>Van aanvraag tot oplevering</h2>
<p class="sub">Vier stappen, met vooraf duidelijkheid over werkzaamheden, prijs en planning.</p></div>
<ol class="steps">
<li><b>Aanvraag</b><span>U maakt een afspraak of vraagt een terugbelverzoek aan en stuurt foto's van uw meterkast mee.</span></li>
<li><b>Offerte met vaste prijs</b><span>U ontvangt een vrijblijvende offerte met de werkzaamheden, de materialen, de prijs en de planning.</span></li>
<li><b>Installatie</b><span>Wij voeren het werk uit op de afgesproken datum. Meerwerk alleen na uw akkoord.</span></li>
<li><b>Meting en oplevering</b><span>Wij meten en testen de installatie en leveren op met uitleg over het gebruik.</span></li>
</ol></div></section>

<section id="voor-wie"><div class="wrap">
<div class="shead"><span class="kicker">Zakelijk</span><h2>Ook voor installatiebedrijven en leveranciers</h2></div>
<div class="grid two">
<article class="card"><span class="ic">${ico("grid")}</span><h3>Onderaanneming en utiliteitsbouw</h3><p>Voor installatiebedrijven, projectorganisaties en leveranciers van laadpalen en thuisbatterijen. Per klus of per project, landelijk.</p>
<div class="cta"><a class="btn" href="/zakelijk/#offerte">Project bespreken</a><a class="btn line" href="/zakelijk/">Zakelijke dienstverlening</a></div></article>
<article class="card"><span class="ic">${ico("tag")}</span><h3>Laadpaal met zakelijke verrekening</h3><p>Rijdt u een auto van de zaak? Een laadpaal thuis die elke laadbeurt registreert, zodat uw werkgever de stroom kan vergoeden.</p>
<div class="cta"><a class="btn line" href="/laadpaal/zakelijk-verrekenen/">Zakelijk verrekenen</a></div></article>
</div></div></section>

${reviewsBlok}${projectenBlok}${merkenBlok}

<section class="alt" id="faq"><div class="wrap narrow">
<div class="shead"><span class="kicker">Veelgestelde vragen</span><h2>Goed om vooraf te weten</h2></div>
${faq(homeFaq)}
</div></section>

<section id="werkgebied"><div class="wrap narrow">
<div class="shead"><span class="kicker">Werkgebied</span><h2>Utrecht, Amersfoort, Amsterdam en omgeving</h2>
<p class="sub">Particulier: ${stedenOmg(3)}. Zakelijk: landelijk op projectbasis.</p></div>
<ul class="tags">${cfg.steden.map(s => `<li>${ico("pin")}${esc(s)}</li>`).join("")}<li>En omliggende plaatsen</li></ul>
</div></section>
`;

  /* ---------- Keurmerk ---------- */
  const keurmerk = tekst({ crumb: "Keurmerk", h1: "Keurmerk en normen: NEN 3140 en NEN 1010",
    lead: `Een elektrische installatie moet veilig zijn, nu en over twintig jaar. Op deze pagina leest u welke normen ${naam} volgt, wat ze betekenen en wat u daarvan terugziet bij de oplevering.`,
    body: `<h2 class="metlogo">${normLogo("NEN 3140", 64)}<span>NEN 3140: veilig werken aan elektrische installaties</span></h2>
<p>NEN 3140 is de norm voor de bedrijfsvoering van elektrische installaties: hoe je veilig aan een installatie werkt, hoe je hem beheert en wie welk werk mag doen. De norm onderscheidt onder meer de Vakbekwaam Persoon (VP): iemand met de opleiding, kennis en ervaring om zelfstandig en veilig aan elektrische installaties te werken.</p>
<p><strong>Wat dit voor u betekent:</strong> aan uw installatie werkt iemand die weet hoe dat veilig moet, voor u en voor uw woning of bedrijfspand.</p>
<ul class="checks"><li>De werkzaamheden worden uitgevoerd door een gediplomeerd, ervaren NEN 3140 Vakbekwaam Persoon.</li><li>Wij werken spanningsloos waar dat kan, en beveiligen tegen onbedoeld herinschakelen.</li></ul>

<h2 class="metlogo">${normLogo("NEN 1010", 64)}<span>NEN 1010: eisen aan de aanleg van een installatie</span></h2>
<p>NEN 1010 bevat de veiligheidseisen voor het ontwerpen en aanleggen van laagspanningsinstallaties: de elektra in woningen, bedrijfspanden en utiliteitsgebouwen. De norm beschrijft onder meer hoe groepen worden beveiligd, welke aardlekbeveiliging nodig is, hoe kabels worden gedimensioneerd en welke eisen gelden in badkamers en buiten.</p>
<p><strong>Wat dit voor u betekent:</strong> uw installatie voldoet aan de geldende veiligheidseisen, en dat is bij de oplevering gemeten.</p>
<ul class="checks"><li>Elke installatie wordt aangelegd volgens NEN 1010 en doorgemeten opgeleverd, van groepenkast tot laatste stopcontact.</li><li>Kabeldikte en beveiliging kiezen wij op elkaar afgestemd.</li></ul>

<h2>Wat u terugziet bij de oplevering</h2>
<ul class="checks"><li>De installatie is doorgemeten en elke aardlekschakelaar is getest.</li><li>Een bijgewerkt groepenoverzicht in de meterkast.</li><li>Uitleg over het gebruik van wat er is aangelegd.</li></ul>

<h2>Wat dit niet is</h2>
<p>NEN 3140 en NEN 1010 zijn normen, geen keurmerk voor een bedrijf. NEN 3140 VP is een persoonlijke vakbekwaamheid, NEN 1010 is de norm waarnaar wij werken. Wij noemen ze zodat u weet waaraan ons werk moet voldoen.</p>
${cfg.erkendLeerbedrijf ? `
<h2>Erkend leerbedrijf (SBB)</h2>
<p>${naam} is door SBB erkend als leerbedrijf. Wij leiden studenten elektrotechniek op in de praktijk. <a href="/stage/">Meer over stage lopen</a>.</p>` : ""}
<p>Diploma's en certificaten zijn op aanvraag in te zien.</p>
<div class="cta"><a class="btn" href="/contact/">Maak een afspraak</a><a class="btn line" href="/contact/#terugbellen">Bel mij terug</a></div>` });

  /* ---------- Contact ---------- */
  const contact = `${phead({ crumb: "Contact", h1: "Contact: afspraak maken of teruggebeld worden", lead: `Maak een afspraak of vraag een offerte aan via het formulier. Liever eerst even overleggen? Laat uw telefoonnummer achter, dan bellen wij u terug.` }, false)}
<div class="wrap solo"><div class="grid two">
<form id="tb" class="card" novalidate>
<h2 id="terugbellen">Bel mij terug</h2>
<p>Laat uw naam, telefoonnummer en voorkeurstijd achter. Wij bellen u terug.</p>
<div class="hp" aria-hidden="true"><input name="_gotcha" tabindex="-1" autocomplete="off" aria-hidden="true"></div>
<label>Uw naam<input id="tbnaam" autocomplete="name" required><span class="err" id="e-tbnaam" role="alert"></span></label>
<label>Uw telefoonnummer<input id="tbtel" type="tel" autocomplete="tel" required><span class="err" id="e-tbtel" role="alert"></span></label>
<label>Voorkeurstijd<select id="tbtijd"><option>Geen voorkeur</option><option>Ochtend</option><option>Middag</option><option>Einde van de middag</option></select></label>
<label>Waar gaat het over? (optioneel)<input id="tbwaar" placeholder="Bijvoorbeeld: groepenkast vervangen"></label>
<button class="btn" type="submit">Terugbelverzoek versturen</button>
<p class="small">Wij gebruiken uw gegevens alleen om u terug te bellen. Meer in de <a href="/privacyverklaring/">privacyverklaring</a>.</p>
<p class="ok" id="tbok" role="status"></p><p class="err" id="tbfail" role="alert"></p>
</form>
<div class="card"><h2>Contactgegevens</h2>
<ul class="contact-list plain"><li><span class="ic">${ico("mail")}</span>${mail}</li></ul>
<h3>Werkgebied</h3>
<p>Particulier: ${stedenOmg(3)}. Zakelijk: landelijk op projectbasis.</p>
<ul class="tags">${cfg.steden.map(s => `<li>${ico("pin")}${esc(s)}</li>`).join("")}</ul>
<h3>Zakelijke aanvraag?</h3>
<p>Voor onderaanneming en projecten gebruikt u het <a href="/zakelijk/#offerte">zakelijke formulier</a>.</p>
</div>
</div></div>`;

  /* ---------- Zakelijk ---------- */
  const zakelijk = svc({ key: "zakelijk", crumb: "Zakelijk", knop: "Project bespreken",
    h1: "Onderaanneming elektrotechniek, per klus of per project",
    lead: `Elektrotechnische ondersteuning wanneer u extra vakbekwame capaciteit nodig heeft. ${naam} verzorgt elektrotechnische installaties voor particulieren en levert capaciteit in onderaanneming. Wij werken voor installatiebedrijven, projectorganisaties en leveranciers van laadpalen, zonnestroomsystemen en thuisbatterijen: zelfstandig, volgens afspraak en met meet- en opleverdocumentatie.`,
    kort: ["Elektromonteur inhuren per klus of per project", "Landelijk op projectbasis", "Zelfstandige uitvoering volgens afspraak", "Meetrapport bij oplevering"],
    body: `<h2>Wat u kunt inhuren</h2>
<h3>Groepenkasten en verdeelinrichtingen</h3>
<p>Vervangen en uitbreiden van groepenkasten en verdeelinrichtingen, in woningen en bedrijfspanden.</p>
<h3>Laadpalen</h3>
<p>Installatiemonteur voor laadpalen: kabeltracé, eigen groep met beveiliging, montage, load balancing en inbedrijfstelling.</p>
<h3>Thuisbatterijen</h3>
<p>Installatie en aansluiting van batterijsystemen, inclusief eigen groep en meting.</p>
<h3>Elektrotechnisch installatiewerk</h3>
<p>Projectmatige ondersteuning bij nieuwbouw, renovatie en verbouwing in de woningbouw.</p>

<h2 id="utiliteitsbouw">Utiliteitsbouw</h2>
<p>In kantoren, winkels, scholen en bedrijfshallen is de installatie groter en zwaarder dan in een woning: 3-fase verdeelinrichtingen, onderverdelers per verdieping of ruimte, verlichting op meerdere groepen en laadpunten op het eigen terrein. Wij verzorgen de aanleg, uitbreiding en vervanging daarvan, zelfstandig of als onderaannemer binnen uw project.</p>
<ul class="checks"><li>Verdeelinrichtingen en onderverdelers vervangen of uitbreiden.</li><li>Groepen, aansluitpunten en verlichting bij een verbouwing of nieuwe inrichting.</li><li>Laadpunten op eigen terrein, met load balancing.</li><li>Meting en opleverdocumentatie volgens afspraak.</li></ul>

<h2>Ervaring</h2>
<p>Ervaring met verdeelinrichtingen, laadpaalinstallaties, thuisbatterijen, verlichting en schakelmateriaal.</p>

<h2>Type projecten</h2>
<ul class="checks"><li>Uitrol van laadpalen en thuisbatterijen voor leveranciers.</li><li>Vervanging en uitbreiding van verdeelinrichtingen.</li><li>Installatiewerk bij nieuwbouw, renovatie en verbouwing.</li><li>Tijdelijke versterking van uw eigen montageploeg.</li></ul>

<h2>Verloop van een inzet</h2>
<ol class="steps v">
<li><b>Intake</b><span>U deelt de opdracht, de locatie, tekeningen en de gewenste periode. Wij stemmen af wat er moet gebeuren en wie het materiaal levert.</span></li>
<li><b>Planning</b><span>U ontvangt een voorstel met inzet, planning en tarief. Meerwerk en afwijkingen melden wij altijd vooraf.</span></li>
<li><b>Uitvoering</b><span>Zelfstandige uitvoering volgens afspraak en volgens NEN 1010, met één vast aanspreekpunt.</span></li>
<li><b>Oplevering</b><span>De installatie wordt doorgemeten en getest. U ontvangt het meetrapport en de afgesproken opleverdocumentatie.</span></li>
</ol>

<h2>Welke informatie wij minimaal nodig hebben</h2>
<ul class="checks"><li>Het type werkzaamheden en de aantallen.</li><li>De projectlocatie.</li><li>De gewenste periode en inzet.</li><li>Tekeningen of een omschrijving van de installatie.</li><li>Wie het materiaal levert.</li></ul>

<h2>Beschikbaarheid en werkgebied</h2>
<p>Landelijk op projectbasis. ${cfg.beschikbaarheidZakelijk ? "Beschikbaarheid: " + esc(cfg.beschikbaarheidZakelijk) + "." : "Beschikbaarheid op aanvraag per project."}${cfg.verzekerd ? " Verzekerd voor bedrijfsaansprakelijkheid." : ""}${cfg.eigenGereedschap ? " Wij werken met eigen gereedschap en eigen meetapparatuur." : ""}</p>

<h2>Kwalificaties</h2>
<ul class="checks"><li>Gediplomeerd, ervaren NEN 3140 Vakbekwaam Persoon</li><li>Werkt volgens NEN 1010</li>${cfg.erkendLeerbedrijf ? "<li>Erkend leerbedrijf (SBB)</li>" : ""}</ul>

<h2>Documenten op aanvraag</h2>
<ul class="checks">${docs.map(d => `<li>${d}</li>`).join("")}</ul>
<p><a href="#offerte">Bespreek uw project</a>, dan hoort u of wij in uw planning passen.</p>` });

  /* ---------- Over ---------- */
  const over = tekst({ crumb: "Over ons", h1: `Over ${naam}`,
    lead: `${naam} verzorgt elektrotechnische installaties voor particulieren en levert capaciteit in onderaanneming. Hieronder leest u hoe wij werken, wat u bij de oplevering mag verwachten en welke kwalificaties wij hebben.`,
    body: `<h2>Wat wij doen</h2>
<p>Elektra aanleggen, meterkasten en verdeelinrichtingen, laadpalen en complete thuisbatterij-installaties. Onze specialisatie ligt bij installaties die meer van de aansluiting vragen: laadinfrastructuur, energieopslag en de uitbreiding van verdeelinrichtingen.</p>
<p>Voor particulieren verzorgen wij de installatie van advies tot oplevering. Voor installatiebedrijven en leveranciers leveren wij capaciteit in onderaanneming. Meer daarover op de pagina <a href="/zakelijk/">Zakelijk</a>.</p>

<h2>Hoe wij werken</h2>
<ul class="checks"><li>Vooraf een offerte met een vaste scope en een vaste prijs.</li><li>Meerwerk alleen na overleg en uw akkoord.</li><li>Eén vast aanspreekpunt van aanvraag tot oplevering.</li><li>Werkzaamheden volgens NEN 1010.</li><li>Elke installatie wordt bij de oplevering doorgemeten en getest, met uitleg over het gebruik.</li></ul>

<h2>Kwalificaties</h2>
<ul class="checks"><li>Gediplomeerd, ervaren NEN 3140 Vakbekwaam Persoon.</li><li>Werkt volgens NEN 1010.</li>${cfg.erkendLeerbedrijf ? `<li>Erkend leerbedrijf (SBB). Wij leiden studenten elektrotechniek op in de praktijk. <a href="/stage/">Meer over stage lopen</a>.</li>` : ""}</ul>
<p>Diploma's en certificaten zijn op aanvraag in te zien.</p>

<h2>Ervaring</h2>
<p>Ervaring met verdeelinrichtingen, laadpaalinstallaties, thuisbatterijen, verlichting en schakelmateriaal.</p>

<h2>Werkgebied</h2>
<p>Particulier: ${stedenOmg(3)}. Zakelijk: landelijk op projectbasis.</p>
${cfg.googleProfiel ? `<h2>Reviews</h2>\n<p><a href="${esc(cfg.googleProfiel)}" rel="noopener">Lees de reviews op Google</a>.</p>` : ""}
<div class="cta"><a class="btn" href="/contact/">Maak een afspraak</a><a class="btn line" href="/zakelijk/#offerte">Zakelijke aanvraag</a></div>` });

  /* ---------- Stage ---------- */
  const stage = svc({ key: "stage", crumb: "Stage", knop: "Aanmelden voor een stage", geenRelated: true, geenTerug: true,
    h1: "Stage lopen bij een erkend leerbedrijf in de elektrotechniek",
    lead: `${naam} is erkend leerbedrijf (SBB). Volg je een opleiding elektrotechniek en zoek je een stageplek waar je echt meewerkt? Bij ons werk je mee aan echte opdrachten en leer je het vak in de praktijk, in de regio ${stedenTekst(3)}.`,
    kort: ["Erkend leerbedrijf (SBB)", "Je werkt mee aan echte opdrachten", "Vaste begeleiding", "Aanmelden via het formulier"],
    body: `<h2>Wat je bij ons leert</h2>
${icards([
      ["meterkast", "Meterkasten en verdeelinrichtingen", "Groepenkasten vervangen en uitbreiden, in woningen en bedrijfspanden."],
      ["laadpaal", "Laadpalen", "Een eigen groep aanleggen, de kabel trekken, de laadpaal monteren en instellen."],
      ["gauge", "Meten en opleveren", "Een installatie doormeten, aardlekschakelaars testen en het werk opleveren."],
      ["tool", "Elektra bij verbouwingen", "Leidingen en aansluitpunten aanleggen en afmonteren."]
    ])}

<h2>Zo ziet je stage eruit</h2>
<p>Je loopt mee op de opdrachten die wij uitvoeren. Zo zie je een opdracht van begin tot eind: de beoordeling, de voorbereiding, de uitvoering en het meten en testen bij de oplevering. Je werkt volgens NEN 1010 en leert veilig werken volgens NEN 3140. Wat je zelfstandig doet, bouwen we stap voor stap op.</p>

<h2>Wat we van je vragen</h2>
<ul class="checks"><li>Je volgt een mbo-opleiding in de elektrotechniek.</li><li>Je bent gemotiveerd en komt je afspraken na.</li><li>Je werkt netjes en neemt veiligheid serieus.</li></ul>

<h2>Aanmelden</h2>
<p>Stuur ons via het formulier deze gegevens:</p>
<ul class="checks"><li>Je opleiding, niveau en leerjaar.</li><li>Of je BOL of BBL volgt.</li><li>De periode en het aantal dagen per week.</li><li>In een paar zinnen waarom je bij ons stage wilt lopen.</li></ul>
<p>Je cv stuur je per e-mail naar ${mail}. Wij reageren op je aanmelding. Of er op dat moment een stageplek vrij is, hoor je na je aanmelding. <a href="#offerte">Meld je aan</a>.</p>` });


  /* ---------- Kennisbank ---------- */
  const maanden = ["januari", "februari", "maart", "april", "mei", "juni", "juli", "augustus", "september", "oktober", "november", "december"];
  const nlDatum = d => { const [j, m, dag] = d.split("-").map(Number); return `${dag} ${maanden[m - 1]} ${j}`; };
  const fotoMail = `mailto:${esc(cfg.email)}?subject=${encodeURIComponent("Foto van mijn meterkast")}`;
  const artikel = a => `${phead({ crumbs: [["Kennisbank", "/kennisbank/"], [a.kort_titel]], h1: a.h1, lead: a.lead }, false)}
<div class="wrap layout"><div class="prose">
<div class="kort"><h2>In het kort</h2><ul class="checks">${a.kort.map(k => `<li>${k}</li>`).join("")}</ul></div>
<p class="meta">${naam} · Bijgewerkt op <time datetime="${a.datum}">${nlDatum(a.datum)}</time></p>
<div class="toc" role="navigation" aria-label="Inhoud"><b>Op deze pagina</b><ol>${a.secties.map(x => `<li><a href="#${x[0]}">${x[1]}</a></li>`).join("")}</ol></div>
${a.secties.map(x => `<h2 id="${x[0]}">${x[1]}</h2>\n${x[2]}`).join("\n\n")}

<div class="bel"><h2 id="bellen">Wanneer een elektricien inschakelen?</h2><ul>${a.bellen.map(b => `<li>${b}</li>`).join("")}</ul></div>${a.geenStoring ? `
<p class="small"><strong>Let op:</strong> ${naam} voert geen storingsdienst uit. Bij een acute storing schakelt u een storingsdienst in. Komt een storing steeds terug door een verouderde of volle groepenkast, dan kunnen wij de kast <a href="/meterkast/groepenkast-vervangen/">vervangen</a>.</p>` : ""}
</div>
<aside class="side" aria-label="Hulp nodig">
<h2>Hulp nodig?</h2>
<p>${a.zin}</p>
<a class="btn" href="${a.dienst.href}">${a.dienst.label}</a>
<a class="btn line" href="${fotoMail}">Mail een foto van uw meterkast</a>
${a.dienst2 ? `<div class="sidec"><a href="${a.dienst2.href}">${ico("arrow")}${a.dienst2.label}</a></div>` : ""}
</aside></div>
<div class="related"><div class="wrap">
<h2>Verwante artikelen</h2>
<div class="grid">${a.verwant.map(x => `<a class="rel" href="${kb.bySlug[x].url}"><span class="ic">${ico("doc")}</span>${kb.bySlug[x].kort_titel}<span class="arr">${ico("arrow")}</span></a>`).join("")}</div>
</div></div>`;

  const kbOverzicht = `${phead({ crumb: "Kennisbank", h1: "Kennisbank: uw meterkast en installatie uitgelegd", lead: "Antwoorden op vragen over de meterkast, de aardlekschakelaar, inductie, laadpalen en thuisbatterijen. Geschreven voor wie geen elektricien is en wil weten wat er aan de hand is." }, false)}
<div class="wrap solo kbover">
${kb.clusters.map(([key, titel]) => { const lijst = kb.artikelen.filter(a => a.cluster === key); return lijst.length ? `<h2>${titel}</h2>\n<div class="grid two">${lijst.map(a => `<a class="svc" href="${a.url}"><h3>${a.h1}</h3><p>${a.desc}</p><span class="more">Lees het artikel${ico("arrow")}</span></a>`).join("")}</div>` : ""; }).join("\n")}
</div>`;

  const projectenPagina = `${phead({ crumb: "Projecten", h1: "Projecten: uitgevoerd werk", lead: "Een selectie van opdrachten die " + naam + " heeft uitgevoerd, met de werkzaamheden en het resultaat." }, false)}
<div class="wrap solo"><div class="grid two">${projecten.map(projectKaart).join("")}</div></div>`;

  /* ---------- Privacy ---------- */
  const privacy = tekst({ crumb: "Privacyverklaring", h1: "Privacyverklaring",
    lead: `Laatst bijgewerkt: november 2026. Hier leest u hoe ${naam} met uw gegevens omgaat.`,
    body: `<h2>Wie is verantwoordelijk?</h2>
<p>${naam}${cfg.kvk ? " (KvK " + esc(cfg.kvk) + ")" : ""}${cfg.vestigingsplaats ? ", gevestigd in " + esc(cfg.vestigingsplaats) + "," : ""} is verantwoordelijk voor de verwerking van uw gegevens. U bereikt ons via ${mail}.</p>
<h2>Welke gegevens verwerken wij?</h2>
<ul class="checks"><li>Uw naam, e-mailadres, telefoonnummer en postcode.</li><li>Bij zakelijke aanvragen uw bedrijfsnaam.</li><li>Gegevens over uw installatie: het type aansluiting, of u zonnepanelen heeft en wat u in de toelichting vermeldt.</li><li>Foto's die u ons stuurt, bijvoorbeeld van uw meterkast.</li></ul>
<h2>Waarvoor en op welke grondslag?</h2>
<ul class="checks">
<li><strong>Reageren op uw aanvraag en een offerte maken.</strong> Grondslag: stappen op uw verzoek vóór het sluiten van een overeenkomst.</li>
<li><strong>De werkzaamheden uitvoeren.</strong> Grondslag: uitvoering van de overeenkomst.</li>
<li><strong>Factureren en de administratie voeren.</strong> Grondslag: wettelijke verplichting.</li>
</ul>
<h2>Hoe lang bewaren wij uw gegevens?</h2>
<ul class="checks"><li>Aanvragen zonder opdracht, inclusief meegestuurde foto's: ${esc(cfg.bewaartermijn)} na ons laatste contact.</li><li>Gegevens en foto's van uitgevoerde opdrachten: zolang dat nodig is voor garantie en nazorg.</li><li>Facturen en administratie: 7 jaar, volgens de fiscale bewaarplicht.</li></ul>
<h2>Met wie delen wij uw gegevens?</h2>
<p>Wij verkopen uw gegevens niet. Wij maken gebruik van deze dienstverleners:</p>
<ul class="checks">${/hotmail|outlook|live\./i.test(cfg.email) ? "<li><strong>Microsoft (Outlook):</strong> onze e-mail. Aanvragen en foto's die u mailt, staan in deze mailbox.</li>" : "<li><strong>Onze e-mailprovider:</strong> aanvragen en foto's die u mailt, staan in onze mailbox.</li>"}<li><strong>GitHub (GitHub Pages):</strong> de hosting van deze website. GitHub legt bij elk bezoek technische gegevens vast, zoals uw IP-adres, voor de beveiliging.</li>${cfg.formulierEndpoint && cfg.formulierdienst ? `<li><strong>${esc(cfg.formulierdienst)}:</strong> verstuurt de inhoud van het contactformulier naar onze mailbox.</li>` : ""}<li><strong>Onze boekhouder:</strong> voor de administratie.</li></ul>
<p>GitHub en Microsoft zijn Amerikaanse bedrijven; uw gegevens kunnen daardoor buiten de Europese Unie worden verwerkt. Verder delen wij gegevens alleen als de wet dat vereist.</p>
<h2>Cookies</h2>
<p>Deze website plaatst geen cookies en gebruikt geen tracking of statistieken.</p>
<h2>Uw rechten</h2>
<p>U kunt ons vragen om inzage, correctie of verwijdering van uw gegevens, of bezwaar maken tegen de verwerking. Stuur daarvoor een e-mail. Wij reageren binnen een maand. Komt u er met ons niet uit, dan kunt u een klacht indienen bij de Autoriteit Persoonsgegevens.</p>` });

  /* ---------- Algemene voorwaarden ---------- */
  const voorwaarden = tekst({ crumb: "Algemene voorwaarden", h1: "Algemene voorwaarden",
    lead: `Op al onze offertes en werkzaamheden zijn de algemene voorwaarden van ${naam} van toepassing.`,
    body: `<h2>Zo ontvangt u de voorwaarden</h2>
<ul class="checks"><li>U ontvangt de volledige voorwaarden als bijlage bij de offerte, dus vóórdat u een overeenkomst met ons sluit.</li><li>Wilt u ze eerder inzien? Stuur een e-mail naar ${mail}, dan sturen wij ze kosteloos toe.</li></ul>
<h2>Bedenktijd voor particulieren</h2>
<p>Sluit u als particulier een overeenkomst op afstand of bij u thuis, dan heeft u in veel gevallen 14 dagen bedenktijd. Bij een spoedreparatie op uw eigen verzoek geldt dit niet. De details staan in de voorwaarden en in de offerte.</p>
${cfg.garantieArbeid ? `<h2>Garantie</h2><p>Op het uitgevoerde werk geeft ${naam} ${esc(cfg.garantieArbeid)} garantie na oplevering. Op materiaal geldt de garantie van de fabrikant of leverancier. De volledige regeling staat in artikel 9 van de algemene voorwaarden.</p>\n` : ""}<h2>Bedrijfsgegevens</h2>
<ul class="checks"><li>${naam}, eenmanszaak${cfg.vestigingsplaats ? " in " + esc(cfg.vestigingsplaats) : ""}</li>${cfg.kvk ? `<li>KvK-nummer: ${esc(cfg.kvk)}</li>` : `<li>Ingeschreven in het Handelsregister; het KvK-nummer staat op uw offerte en factuur</li>`}${cfg.btw ? `<li>Btw-id: ${esc(cfg.btw)}</li>` : ""}<li>E-mail: ${mail}</li></ul>` });

  const kaal = (h1, lead, extra, knop) => `<div class="phead" id="top"><div class="wrap"><h1>${h1}</h1><p class="lead">${lead}</p>${extra ? `<p class="lead">${extra}</p>` : ""}<div class="cta"><a class="btn" href="/">${knop}</a></div></div></div>
${groepRelated}`;
  const bedankt = kaal("Bedankt voor uw aanvraag", `Uw aanvraag is goed aangekomen. Wij bekijken uw bericht${cfg.reactietijd ? " en reageren " + esc(cfg.reactietijd) : " en nemen contact met u op"}.`, c.fotoRoute, "Terug naar de homepage");
  const nietGevonden = kaal("Deze pagina bestaat niet", "De pagina die u zoekt, is verplaatst of bestaat niet meer.", "", "Naar de homepage");

  const H = cfg.handelsnaam;
  return [
    { path: "", form: true, preload: "groepenkast-abb", body: home,
      title: `Elektricien Utrecht, Amersfoort en Amsterdam | ${H}`,
      desc: `Elektricien in Utrecht, Amersfoort, Amsterdam en omgeving. Elektra aanleggen, groepenkast, laadpaal en thuisbatterij. Vaste prijs vooraf, NEN 1010.` },
    { path: "elektra/", form: true, preload: "elektra-lasdoos", dienst: "Elektra renovatie", crumb: "Elektra aanleggen", body: elektraOverzicht,
      title: `Elektra aanleggen Utrecht en Amersfoort | ${H}`,
      desc: `Elektra laten aanleggen in Utrecht, Amersfoort of Amsterdam: renovatie, keukenvoorbereiding, inductie, verlichting en tuinverlichting. Prijs vooraf.` },
    { path: "meterkast/", form: true, preload: "groepenkast-abb", dienst: "Groepenkast vervangen", crumb: "Meterkast", body: meterkastOverzicht,
      title: `Meterkast en groepenkast Utrecht e.o. | ${H}`,
      desc: `Meterkast of groepenkast vervangen, uitbreiden of voorbereiden op 3-fase in Utrecht, Amersfoort of Amsterdam. Volgens NEN 1010, prijs vooraf.` }
  ].concat(DL.map(dienstPagina)).concat([
    { path: "keurmerk/", crumb: "Keurmerk", body: keurmerk,
      title: `Keurmerk en normen: NEN 3140 en NEN 1010 | ${H}`,
      desc: `Elke installatie volgens NEN 1010, uitgevoerd door een gediplomeerd, ervaren NEN 3140 Vakbekwaam Persoon. Wat dat voor u betekent.` },
    { path: "contact/", form: true, crumb: "Contact", body: contact,
      title: `Contact: afspraak of terugbelverzoek | ${H}`,
      desc: `Maak een afspraak, vraag een offerte aan of laat u terugbellen door ${H}. Particulier in Utrecht, Amersfoort en Amsterdam, zakelijk landelijk.` },
    { path: "zakelijk/", form: true, zakelijk: true, dienst: "Zakelijke inhuur", type: "Bedrijf", service: "Elektromonteur inhuren als onderaannemer", crumb: "Zakelijk", body: zakelijk,
      title: `Elektromonteur inhuren en utiliteitsbouw | ${H}`,
      desc: `Elektromonteur inhuren of elektra in de utiliteitsbouw? Onderaanneming voor installatiebedrijven en leveranciers, per klus of project, landelijk.` },
  ].concat(cfg.erkendLeerbedrijf ? [
    { path: "stage/", form: true, stage: true, dienst: "Stage", crumb: "Stage", body: stage,
      title: `Stage elektrotechniek regio Utrecht | ${H}`,
      desc: `Stage lopen in de elektrotechniek? ${H} is erkend leerbedrijf (SBB) in de regio Utrecht, Amersfoort en Amsterdam. Meld je aan via het formulier.` }
  ] : []).concat([
    { path: "kennisbank/", crumb: "Kennisbank", body: kbOverzicht,
      title: `Kennisbank meterkast en elektra | ${H}`,
      desc: `Uitleg over de meterkast, 1-fase en 3-fase, de aardlekschakelaar, inductie, laadpalen en thuisbatterijen. Voor wie geen elektricien is.` }
  ]).concat(projecten.length ? [
    { path: "projecten/", crumb: "Projecten", body: projectenPagina,
      title: `Projecten | ${H}`,
      desc: `Uitgevoerde projecten van ${H}: groepenkasten, laadpalen, thuisbatterijen en elektrotechnische installaties.` }
  ] : []).concat(kb.artikelen.map(a => ({ path: `kennisbank/${a.slug}/`, crumb: a.kort_titel, kb: true, article: a, body: artikel(a), title: a.title, desc: a.desc }))).concat([
    { path: "over/", crumb: "Over ons", body: over,
      title: `Over ons | ${H}`,
      desc: `${H} verzorgt elektrotechnische installaties voor particulieren en levert capaciteit in onderaanneming. Werkwijze, kwalificaties en werkgebied.` },
    { path: "privacyverklaring/", crumb: "Privacyverklaring", body: privacy,
      title: `Privacyverklaring | ${H}`,
      desc: `Privacyverklaring van ${H}: welke gegevens wij verwerken, waarvoor, hoe lang wij ze bewaren en wat uw rechten zijn.` },
    { path: "algemene-voorwaarden/", crumb: "Algemene voorwaarden", body: voorwaarden,
      title: `Algemene voorwaarden | ${H}`,
      desc: `Algemene voorwaarden van ${H}: hoe u ze ontvangt, bedenktijd voor particulieren en onze bedrijfsgegevens.` },
    { path: "bedankt/", noindex: true, body: bedankt, title: `Bedankt voor uw aanvraag | ${H}`, desc: "Uw aanvraag is ontvangen." },
    { path: "", file: "404.html", noindex: true, body: nietGevonden, title: `Pagina niet gevonden | ${H}`, desc: "Deze pagina bestaat niet." }
  ]));
};
