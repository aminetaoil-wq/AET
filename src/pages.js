// Alle paginateksten. Contactgegevens, regio en kwalificaties komen uit site.config.json.
// Na een wijziging: node tools/build.js
module.exports = function (c) {
  const { cfg, esc, mail, tel, wa, reviews, projecten, stedenTekst, stedenOmg, ico } = c;
  const regio = esc(cfg.regio);
  const naam = esc(cfg.handelsnaam);
  const kwal = cfg.kwalificaties.map(esc).concat(cfg.erkendLeerbedrijf ? ["Erkend leerbedrijf (SBB)"] : []);
  const werkgebied = `Wij werken in ${regio}: ${stedenOmg(4)}.`;

  /* ---------- Bouwstenen ---------- */
  const faq = items => items.map(([q, a]) => `<details><summary>${q}</summary><p>${a}</p></details>`).join("\n");
  const tiles = items => `<ul class="tiles">${items.map(([i, t]) => `<li>${ico(i)}<span>${t}</span></li>`).join("")}</ul>`;
  const icards = items => `<ul class="icards">${items.map(([i, t, d]) => `<li><span class="ic">${ico(i)}</span><b>${t}</b><p>${d}</p></li>`).join("")}</ul>`;
  const callout = t => `<div class="callout">${ico("alert")}<p>${t}</p></div>`;
  const vanaf = k => cfg.vanafPrijs[k] ? `<p><strong>Richtprijs:</strong> vanaf ${esc(cfg.vanafPrijs[k])}. De exacte prijs staat in uw offerte.</p>` : "";
  const phead = (o, knop) => `<div class="phead" id="top"><div class="wrap">
<ol class="crumbs"><li><a href="/">Home</a></li><li>${o.crumb}</li></ol>
<h1>${o.h1}</h1>
<p class="lead">${o.lead}</p>
${knop ? `<div class="cta"><a class="btn" href="#offerte">${o.knop || "Offerte aanvragen"}</a>${tel ? `<a class="btn ghost" href="${tel.href}">Bel ${esc(tel.label)}</a>` : ""}</div>` : ""}
</div></div>`;
  const diensten = {
    meterkast: ["meterkast", "Meterkast / verdeelinrichting", "/meterkast/", "Vervangen of uitbreiden"],
    laadpaal: ["laadpaal", "Laadpaal", "/laadpaal/", "Laden thuis of op de zaak"],
    overige: ["elektra", "Elektra en storingen", "/overige-elektrotechniek/", "Uitbreiding, verbouwing of storing"],
    thuisbatterij: ["batterij", "Thuisbatterij", "/thuisbatterij/", "Uw zonnestroom zelf gebruiken"]
  };
  const related = key => `<div class="related"><div class="wrap">
<h2>Andere diensten</h2>
<div class="grid">${Object.keys(diensten).filter(k => k !== key).map(k => { const d = diensten[k]; return `<a class="rel" href="${d[2]}"><span class="ic">${ico(d[0])}</span>${d[1]}<span class="arr">${ico("arrow")}</span></a>`; }).join("")}</div>
</div></div>`;
  const side = (kort, knop) => `<aside class="side" aria-label="In het kort">
<h2>In het kort</h2>
<ul class="checks">${kort.map(k => `<li>${k}</li>`).join("")}</ul>
<a class="btn" href="#offerte">${knop || "Offerte aanvragen"}</a>
<div class="sidec">${tel ? `<a href="${tel.href}">${ico("phone")}${esc(tel.label)}</a>` : ""}${wa ? `<a href="${wa}">${ico("chat")}WhatsApp</a>` : ""}<a href="mailto:${esc(cfg.email)}">${ico("mail")}${esc(cfg.email)}</a></div>
</aside>`;
  const svc = o => `${phead(o, true)}
<div class="wrap layout"><div class="prose">
${o.body}
</div>
${side(o.kort, o.knop)}</div>
${o.geenRelated ? "" : related(o.key)}`;
  const tekst = o => `${phead(o, false)}
<div class="wrap solo prose">
${o.body}
</div>`;

  const partner = cfg.partner.tonen && cfg.partner.naam
    ? `<p>Wij leveren en installeren batterijen van ${esc(cfg.partner.naam)}. Heeft u zelf al een batterij gekocht? Laat het ons weten bij uw aanvraag.</p>`
    : `<p>Heeft u al een batterij gekocht of een model op het oog? Geef dan het merk en type door bij uw aanvraag. Wij beoordelen of uw installatie er geschikt voor is en sluiten de batterij aan volgens de voorschriften van de fabrikant.</p>`;
  const docs = ["KvK-uittreksel", "Diploma en NEN 3140 VP-certificaat"]
    .concat(cfg.vca ? ["VCA-certificaat (" + esc(cfg.vca) + ")"] : [])
    .concat(cfg.verzekerd ? ["Polis aansprakelijkheidsverzekering"] : []);

  /* ---------- Homepage ---------- */
  const trust = [
    ["doc", "Werk volgens NEN 1010", "Norm voor elektrische installaties"],
    ["shield", "NEN 3140 VP", "Gecertificeerd Vakbekwaam Persoon"],
    cfg.erkendLeerbedrijf ? ["cap", "Erkend leerbedrijf", "Erkend door SBB"] : ["cap", "Gediplomeerd", "Elektrotechniek"],
    ["tag", "Vaste prijs vooraf", "Duidelijke, vrijblijvende offerte"]
  ];

  const kaart = (key, tekstje, punten, link) => { const d = diensten[key]; return `<a class="svc" href="${d[2]}"><span class="ic">${ico(d[0])}</span><h3>${d[1]}</h3><p>${tekstje}</p><ul>${punten.map(p => `<li>${ico("check")}${p}</li>`).join("")}</ul><span class="more">${link}${ico("arrow")}</span></a>`; };

  const homeFaq = [
    ["Is mijn meterkast geschikt voor een laadpaal, inductieplaat of warmtepomp?", `Dat hangt af van drie dingen: uw aansluiting (1-fase of 3-fase), de waarde van uw hoofdzekering en de vrije ruimte in uw groepenkast. Apparaten met een hoog vermogen krijgen elk een eigen groep. Stuurt u een foto van uw meterkast mee, dan ontvangt u een eerste inschatting. Meer leest u op de pagina over de <a href="/meterkast/">meterkast</a>.`],
    ["Wat kost een elektricien?", `Dat verschilt per opdracht. De prijs bestaat uit materiaal, arbeid en eventuele reiskosten. Het aantal groepen of aansluitpunten, de lengte van de kabels en eventuele aanpassingen aan uw meterkast bepalen het grootste deel. U ontvangt vooraf een vrijblijvende offerte met een vaste scope en een vaste prijs.`],
    ["Wat gebeurt er als er meerwerk nodig is?", `Komt er tijdens het werk iets onverwachts naar voren, dan bespreken wij dat eerst met u. Meerwerk voeren wij alleen uit na uw akkoord.`],
    ["In welk gebied zijn jullie actief?", `Voor particulieren in ${cfg.steden.map(esc).join(", ")} en omliggende plaatsen. Zakelijke projecten voeren wij in heel Nederland uit.`],
    ["Werken jullie ook als onderaannemer?", `Ja. ${naam} werkt als onderaannemer voor installatiebedrijven en voor leveranciers van thuisbatterijen en laadpalen, per klus of per project. Op de pagina <a href="/zakelijk/">Zakelijk</a> leest u waarvoor u ons kunt inschakelen.`],
    ["Welke kwalificaties heeft ${naam}?", `Wij werken volgens NEN 1010, de norm voor elektrische installaties, en zijn gecertificeerd als Vakbekwaam Persoon (VP) volgens NEN 3140.${cfg.erkendLeerbedrijf ? " " + naam + " is daarnaast erkend leerbedrijf (SBB). <a href=\"/stage/\">Meer over stage lopen</a>." : ""}`],
    ["Sluiten jullie ook een laadpaal aan die ik zelf heb gekocht?", `Ja. Geeft u het merk en type door, dan bepalen wij welke beveiliging en bekabeling daarbij horen. Meer leest u op de pagina over de <a href="/laadpaal/">laadpaal</a>.`]
  ].concat(cfg.startTermijn ? [["Hoe snel kunnen jullie starten?", esc(cfg.startTermijn)]] : [])
   .concat(cfg.garantieArbeid ? [["Welke garantie krijg ik?", `Op ons installatiewerk krijgt u ${esc(cfg.garantieArbeid)} garantie. Voor materialen geldt de garantie van de fabrikant. De volledige regeling staat in de algemene voorwaarden, die u bij de offerte ontvangt.`]] : []);

  const reviewsBlok = reviews.length ? `<section id="reviews"><div class="wrap">
<div class="shead"><span class="kicker">Ervaringen</span><h2>Wat klanten zeggen</h2></div>
<div class="grid">${reviews.map(r => `<article class="card"><p>“${esc(r.tekst)}”</p><p class="small"><strong>${esc(r.naam)}</strong>${r.plaats ? ", " + esc(r.plaats) : ""}${r.klus ? " · " + esc(r.klus) : ""}</p></article>`).join("")}</div>
</div></section>\n\n` : "";
  const projectenBlok = projecten.length ? `<section class="alt" id="projecten"><div class="wrap">
<div class="shead"><span class="kicker">Projecten</span><h2>Uitgevoerd werk</h2></div>
<div class="grid">${projecten.map(p => `<article class="card">${p.fotos && p.fotos[0] ? `<img src="${esc(p.fotos[0].src)}" alt="${esc(p.fotos[0].alt)}" width="${p.fotos[0].w}" height="${p.fotos[0].h}" loading="lazy">` : ""}<h3>${esc(p.klus)} in ${esc(p.plaats)}</h3><p>${esc(p.beschrijving)}</p></article>`).join("")}</div>
</div></section>\n\n` : "";

  const waarom = [
    ["doc", "Werk volgens de norm", "Wij werken volgens NEN 1010 en zijn gecertificeerd als Vakbekwaam Persoon (VP) volgens NEN 3140."],
    ["batterij", "Ervaring met kritische stroomvoorziening", "Achtergrond in UPS-systemen, batterijsystemen en noodstroomvoorzieningen, onder meer in zorginstellingen en bij energiebedrijven."]
  ].concat(cfg.partner.tonen && cfg.partner.naam ? [["shield", "Installatiepartner", "Officieel installatiepartner van " + esc(cfg.partner.naam) + "."]] : [])
   .concat([["tag", "Vaste prijs vooraf", "U ontvangt een offerte met een vaste scope en een vaste prijs. Meerwerk voeren wij alleen uit na overleg en akkoord."]])
   .concat(cfg.erkendLeerbedrijf ? [["cap", "Erkend leerbedrijf", "Erkend door SBB. Wij leiden studenten elektrotechniek op in de praktijk. <a href=\"/stage/\">Meer over stage lopen</a>."]] : []);

  const home = `
<div class="hero" id="top"><div class="wrap">
<div>
<div class="eyebrow">Elektrotechniek · Utrecht · Amsterdam · Omgeving</div>
<h1>Elektrotechniek, goed geregeld.<br><em>Van meterkast tot laadpaal.</em></h1>
<p class="lead">${naam} is een elektrotechnisch installatiebedrijf voor particulieren en zakelijke opdrachtgevers. Wij installeren en vervangen meterkasten, laadpalen en thuisbatterijen en verhelpen storingen. U ontvangt vooraf een offerte met een vaste scope en een vaste prijs.${cfg.reactietijd ? " U krijgt " + esc(cfg.reactietijd) + " een reactie." : ""}</p>
<div class="cta"><a class="btn" href="#offerte">Offerte aanvragen</a>${tel ? `<a class="btn ghost" href="${tel.href}">Bel ${esc(tel.label)}</a>` : `<a class="btn ghost" href="#diensten">Bekijk onze diensten</a>`}</div>
</div>
<div class="quick"><p class="quick-t">Direct naar</p>
${Object.values(diensten).map(d => `<a href="${d[2]}"><span class="ic">${ico(d[0])}</span><span><b>${d[1]}</b><span>${d[3]}</span></span><span class="arr">${ico("arrow")}</span></a>`).join("\n")}
</div>
</div></div>

<div class="trust"><div class="wrap"><ul>
${trust.map(t => `<li><span class="ic">${ico(t[0])}</span><span><b>${t[1]}</b><span>${t[2]}</span></span></li>`).join("\n")}
</ul></div></div>

<section id="diensten"><div class="wrap">
<div class="shead"><span class="kicker">Diensten</span><h2>Elektrotechnisch werk voor woning en bedrijf</h2>
<p class="sub">Van één extra groep tot een complete verdeelinrichting. Bij elke dienst leest u wat wij doen, hoe het werk verloopt en waar de prijs van afhangt.</p></div>
<div class="grid two">
${kaart("meterkast", "Een veilige, overzichtelijke meterkast met ruimte voor alles wat u nu en later wilt aansluiten.", ["Groepenkast vervangen", "Extra groepen bijplaatsen", "Voorbereiden op 3-fase"], "Meterkast laten vervangen")}
${kaart("laadpaal", "Veilig laden bij uw woning of bedrijf, op een eigen groep met de juiste beveiliging.", ["Eigen groep met aardlekbeveiliging", "Load balancing", "Ook voor uw eigen laadpaal"], "Laadpaal laten installeren")}
${kaart("overige", "Van een hardnekkige storing tot de complete elektra bij een verbouwing.", ["Storingen opsporen en verhelpen", "Extra groepen en wandcontactdozen", "Elektra bij een verbouwing"], "Elektra en storingen")}
${kaart("thuisbatterij", "Zonnestroom opslaan en later zelf gebruiken. U hoort eerst of dat bij uw verbruik past.", ["Beoordeling van meterkast en omvormer", "Installatie en instellen", "Advies op basis van uw verbruik"], "Thuisbatterij laten installeren")}
</div>
</div></section>

<section class="alt" id="voor-wie"><div class="wrap">
<div class="shead"><span class="kicker">Voor wie</span><h2>Voor particulieren en zakelijke opdrachtgevers</h2></div>
<div class="grid two">
<article class="card"><span class="ic">${ico("home")}</span><h3>Particulieren</h3><p>Installatie, advies en oplevering met uitleg, in ${stedenOmg(3)}.</p>
<ul class="checks"><li>Advies op basis van uw aansluiting en uw wensen</li><li>Offerte met een vaste scope en een vaste prijs</li><li>Installatie volgens NEN 1010</li><li>Oplevering met meting en uitleg over het gebruik</li></ul>
<p><a href="#diensten">Bekijk de diensten</a></p></article>
<article class="card"><span class="ic">${ico("grid")}</span><h3>Zakelijk</h3><p>Onderaanneming voor installatiebedrijven en voor leveranciers van thuisbatterijen en laadpalen, in heel Nederland.</p>
<ul class="checks"><li>Inzet per klus of op projectbasis</li><li>Zelfstandige uitvoering volgens afspraak</li><li>Oplevering volgens NEN 1010</li><li>Opleverdocumentatie bij elke oplevering</li></ul>
<p><a href="/zakelijk/">Bekijk de zakelijke dienstverlening</a></p></article>
</div></div></section>

<section id="werkwijze"><div class="wrap">
<div class="shead"><span class="kicker">Werkwijze</span><h2>Van aanvraag tot oplevering</h2>
<p class="sub">Vier stappen, met vooraf duidelijkheid over werkzaamheden, prijs en planning.</p></div>
<ol class="steps">
<li><b>Aanvraag</b><span>U vult het formulier in en stuurt foto's van uw meterkast mee. Daarmee beoordelen wij de situatie grotendeels op afstand.</span></li>
<li><b>Offerte met vaste scope</b><span>U ontvangt een vrijblijvende offerte met de werkzaamheden, de materialen, de prijs en de planning.</span></li>
<li><b>Installatie</b><span>Wij voeren het werk uit op de afgesproken datum, volgens NEN 1010. Meerwerk alleen na uw akkoord.</span></li>
<li><b>Meting en oplevering</b><span>Wij meten en testen de installatie en leveren op met uitleg over het gebruik.</span></li>
</ol></div></section>

<section class="alt" id="waarom"><div class="wrap">
<div class="shead"><span class="kicker">Waarom ${naam}</span><h2>Aantoonbaar vakwerk, duidelijke afspraken</h2></div>
<div class="grid">
${waarom.map(w => `<article class="card"><span class="ic">${ico(w[0])}</span><h3>${w[1]}</h3><p>${w[2]}</p></article>`).join("\n")}
</div></div></section>

<section id="over"><div class="wrap two">
<div><span class="kicker">Over ons</span>
<h2>Over ${naam}</h2>
<p class="sub">${naam} is een elektrotechnisch installatiebedrijf. Wij verzorgen meterkasten en verdeelinrichtingen, laadpalen, thuisbatterijen en overige elektrotechnische werkzaamheden, voor particulieren en zakelijke opdrachtgevers.</p>
<p class="sub">Onze specialisatie ligt bij installaties die meer van de aansluiting vragen: laadinfrastructuur, energieopslag en de uitbreiding van verdeelinrichtingen.</p>
<ul class="tags">${["Werk volgens NEN 1010", "NEN 3140 Vakbekwaam Persoon (VP)"].concat(cfg.erkendLeerbedrijf ? ["Erkend leerbedrijf (SBB)"] : []).map(k => `<li>${ico("check")}${k}</li>`).join("")}</ul></div>
<div class="card" id="werkgebied"><h3>Elektricien in ${regio} en regio Amsterdam</h3>
<p>Werkgebied voor particulieren: ${stedenOmg(3)}. Zakelijke projecten voeren wij in heel Nederland uit.</p>
<ul class="tags">${cfg.steden.map(s => `<li>${ico("pin")}${esc(s)}</li>`).join("")}<li>En omliggende plaatsen</li></ul></div>
</div></section>

${reviewsBlok}${projectenBlok}<section class="alt" id="faq"><div class="wrap narrow">
<div class="shead"><span class="kicker">Veelgestelde vragen</span><h2>Goed om vooraf te weten</h2></div>
${faq(homeFaq)}
</div></section>
`;

  /* ---------- Meterkast ---------- */
  const meterkast = svc({ key: "meterkast", crumb: "Meterkast / verdeelinrichting",
    h1: `Meterkast of verdeelinrichting vervangen: veilig en klaar voor uitbreiding`,
    lead: `Wilt u een laadpaal, inductieplaat of warmtepomp aansluiten? Dan heeft elk van die apparaten een eigen groep nodig. In een volle of verouderde meterkast is daar geen ruimte voor. ${naam} vervangt uw groepenkast of breidt hem uit, in woningen en in bedrijfspanden. U weet vooraf wat er gebeurt en wat het kost. ${werkgebied}`,
    kort: ["Groepenkast of verdeelinrichting vervangen of uitbreiden", "Opgebouwd en getest volgens NEN 1010", "Meestal binnen één werkdag klaar", "Offerte met arbeid en materiaal apart"],
    body: `<h2>Voor wie?</h2>
<p>Voor woningeigenaren met een volle of verouderde meterkast, en voor bedrijven en installateurs die een verdeelinrichting willen laten vervangen of uitbreiden.</p>

<h2>Wat wij voor u doen</h2>
${icards([
      ["meterkast", "Groepenkast vervangen", "U krijgt een nieuwe kast met moderne automaten en aardlekschakelaars, opgebouwd volgens NEN 1010."],
      ["grid", "Groepen bijplaatsen", "Extra groepen voor bijvoorbeeld een laadpaal, inductieplaat, warmtepomp of schuur."],
      ["elektra", "Voorbereiden op 3-fase", "Wij maken uw kast geschikt voor een 3-fase aansluiting en stemmen de planning af op uw netbeheerder."],
      ["gauge", "Meten en testen", "Na afloop meten wij de installatie door en testen wij elke aardlekschakelaar."]
    ])}

<h2>Meterkast, groepenkast of verdeelinrichting?</h2>
<p>Het gaat om hetzelfde onderdeel. In een woning heet het meestal de meterkast of groepenkast. In een bedrijfspand spreekt men van een verdeelinrichting of verdeler: die is groter, vaak 3-fase en telt meer groepen. Wij vervangen beide en breiden beide uit.</p>

<h2>Vervangen of uitbreiden?</h2>
<p><strong>Uitbreiden</strong> volstaat als uw kast in goede staat is en er nog ruimte is voor extra groepen. Dat is de eenvoudigste oplossing.</p>
<p><strong>Vervangen</strong> is nodig als de kast te klein is, onderdelen verouderd zijn of de opbouw niet meer aan de eisen voldoet. Eén keer goed vervangen is dan verstandiger dan blijven aanpassen.</p>

<h2>Hieraan herkent u een verouderde meterkast</h2>
<ul class="checks">
<li>U heeft nog smeltzekeringen (stoppen) in plaats van automaten.</li>
<li>Er ontbreekt een aardlekschakelaar, of er zijn meer dan vier groepen op één aardlekschakelaar aangesloten.</li>
<li>Dezelfde groep valt regelmatig uit.</li>
<li>Er is geen plek meer voor een extra groep.</li>
</ul>
${callout("<strong>Worden onderdelen warm, zijn ze verkleurd of ruikt u een brandlucht?</strong> Schakel de groep dan uit en neem direct contact met ons op.")}

<h2>Wat doet de netbeheerder en wat doen wij?</h2>
<p>De <strong>netbeheerder</strong> is eigenaar van de aansluitkabel, de hoofdzekering en de meter. Wilt u overstappen van 1-fase naar 3-fase of heeft u een zwaardere hoofdzekering nodig? Dan vraagt u dat aan via mijnaansluiting.nl. De netbeheerder voert de aanpassing uit en brengt daarvoor eenmalige kosten in rekening, die per netbeheerder verschillen.</p>
<p>Alles achter de meter is <strong>ons werk</strong>: de hoofdschakelaar, de aardlekschakelaars, de groepen en de bedrading naar uw apparaten. Gaat uw aansluiting naar 3-fase, dan stemmen wij onze planning af op de afspraak met de netbeheerder.</p>

<h2>Hoe lang zit u zonder stroom?</h2>
<p>Het vervangen van een groepenkast in een woning duurt meestal één werkdag. Tijdens het werk is de stroom uitgeschakeld. Een enkele groep bijplaatsen gaat sneller. De planning vindt u in uw offerte.</p>

<h2>Waar hangt de prijs van af?</h2>
${tiles([["grid", "Het aantal groepen en aardlekschakelaars"], ["elektra", "1-fase of 3-fase"], ["cable", "De staat van de bestaande bedrading en aarding"], ["plug", "Extra groepen voor een laadpaal, inductieplaat of batterij"], ["truck", "Eventuele reiskosten"]])}
${vanaf("meterkast")}<p>In uw offerte staan deze onderdelen apart. Zo ziet u precies waaruit het bedrag bestaat voordat u beslist.</p>

<h2>Veelgestelde vragen over de meterkast</h2>
${faq([
      ["Hoe weet ik of ik 1-fase of 3-fase heb?", "Dat staat op uw meter, bijvoorbeeld als 1x35 A of 3x25 A, en u ziet het aan de hoofdschakelaar. Stuurt u een foto mee met uw aanvraag, dan zien wij het direct."],
      ["Heb ik 3-fase nodig voor inductie, een laadpaal of een warmtepomp?", "Niet altijd. Het hangt af van het vermogen van de apparaten en van wat er tegelijk aanstaat. Veel inductieplaten werken op twee groepen van één fase. Voor <a href=\"/laadpaal/\">laden op 11 kW</a> heeft u wel 3-fase nodig."],
      ["Betaal ik meer vastrecht voor een 3-fase aansluiting?", "Tot en met 3x25 A valt u in dezelfde tariefgroep als bij de gangbare 1-fase aansluiting. Voor het ombouwen brengt de netbeheerder wel eenmalige kosten in rekening. De actuele bedragen vindt u op de website van uw netbeheerder."],
      ["Moet de hele kast worden vervangen als ik één groep extra wil?", "Nee. Is er ruimte en is de kast in goede staat, dan plaatsen wij alleen een groep bij."]
    ])}

<h2>Uw meterkast laten beoordelen</h2>
<p>Met een foto kunnen wij veel al op afstand beoordelen. Stuur bij uw aanvraag het volgende mee:</p>
<ul class="checks"><li>Een foto van uw meterkast, met de deur open.</li><li>Wat u wilt aansluiten, nu of later.</li><li>Uw postcode, zodat wij de planning kunnen inschatten.</li></ul>
<p>U hoort wat er nodig is en ontvangt een vrijblijvende offerte. <a href="#offerte">Vraag uw offerte aan</a>.</p>` });

  /* ---------- Laadpaal ---------- */
  const laadpaal = svc({ key: "laadpaal", crumb: "Laadpaal",
    h1: `Laadpaal laten installeren, veilig aangesloten op uw meterkast`,
    lead: `Een laadpaal belast uw elektrische installatie urenlang achter elkaar. Daarom sluiten wij hem aan op een eigen groep met de juiste beveiliging, en waar nodig met load balancing. U ontvangt vooraf een offerte met een vaste scope en een vaste prijs. ${werkgebied}`,
    kort: ["Aangesloten op een eigen groep met de juiste beveiliging", "1-fase of 3-fase, afgestemd op uw auto en aansluiting", "Load balancing voorkomt een overbelaste hoofdzekering", "Ook voor een laadpaal die u zelf heeft gekocht"],
    body: `<h2>Voor wie?</h2>
<p>Voor particulieren met een eigen oprit of parkeerplaats, voor bedrijven die op eigen terrein willen laden en voor leveranciers van laadpalen die de installatie willen uitbesteden.</p>

<h2>Van beoordeling tot eerste laadbeurt</h2>
<ol class="steps v">
<li><b>Beoordelen</b><span>Wij bekijken uw aansluiting en de ruimte in uw groepenkast.</span></li>
<li><b>Groep en kabel aanleggen</b><span>Wij leggen een eigen groep aan met de bijbehorende beveiliging en trekken de kabel naar de laadplek.</span></li>
<li><b>Monteren en instellen</b><span>Wij monteren de laadpaal, stellen hem in en controleren de aansluiting met een meting.</span></li>
<li><b>Uitleg</b><span>U krijgt uitleg over het laden en de bediening.</span></li>
</ol>

<h2>Waarom een laadpaal een eigen groep krijgt</h2>
<p>Een laadpaal sluit u niet aan op een groep waar al andere apparaten op zitten. Hij krijgt een eigen groep met een installatieautomaat en een aardlekbeveiliging die ook gelijkstroomlekken afschakelt. Sommige laadpalen hebben die beveiliging ingebouwd. Is dat niet zo, dan plaatsen wij het juiste type aardlekschakelaar in uw meterkast. Is daar geen ruimte voor, dan breiden wij eerst uw <a href="/meterkast/">groepenkast</a> uit.</p>

<h2>1-fase of 3-fase: hoe snel laadt u?</h2>
<ul class="spec">
<li><b>1-fase, 16 A</b><span>ca. 3,7 kW</span></li>
<li><b>1-fase, 32 A</b><span>ca. 7,4 kW</span></li>
<li><b>3-fase, 16 A</b><span>ca. 11 kW</span></li>
</ul>
<p>Bij woningen wordt laden op 11 kW het meest gekozen. De werkelijke laadsnelheid hangt ook af van uw auto: de ingebouwde lader heeft een eigen maximum. Laden op 7,4 kW via 1-fase kan alleen als uw aansluiting dat toelaat. Heeft u 1-fase en wilt u op 3-fase laden? Dan vraagt u een verzwaring aan bij uw netbeheerder via mijnaansluiting.nl.</p>

<h2>Load balancing</h2>
<p>Laadt uw auto terwijl ook de oven, de wasdroger en de warmtepomp aanstaan, dan kan de hoofdzekering uitvallen. Load balancing voorkomt dat. Een meter in uw meterkast houdt het totale verbruik van uw woning bij. Wordt het te veel, dan verlaagt de laadpaal automatisch de laadstroom. Voor de meeste woningen raden wij dit aan.</p>

<h2>Van meterkast naar laadplek</h2>
<p>De route van de kabel bepaalt een groot deel van het werk. Wij kijken naar de afstand, naar de mogelijkheid om door een muur of kruipruimte te gaan en naar eventueel graafwerk in de tuin of oprit. Buiten leggen wij de kabel op voldoende diepte in de grond, waar nodig in een mantelbuis.</p>

<h2>Woont u in een appartement of huurt u?</h2>
<p>Dan heeft u toestemming nodig van de VvE of de verhuurder. Regelt u dat vooraf, dan loopt de installatie geen vertraging op.</p>

<h2>Wat kost een laadpaal laten installeren?</h2>
<p>Dat verschilt per situatie. De prijs hangt af van:</p>
${tiles([["laadpaal", "De laadpaal zelf, als u die via ons afneemt"], ["cable", "De lengte en route van de kabel, inclusief graafwerk"], ["meterkast", "Aanpassingen aan uw meterkast"], ["gauge", "Load balancing"], ["truck", "Eventuele reiskosten"]])}
${vanaf("laadpaal")}<p>U ontvangt een offerte waarin elk onderdeel apart staat.</p>

<h2>Veelgestelde vragen over laadpalen</h2>
${faq([
      ["Kan ik niet gewoon via een stopcontact laden?", "Af en toe kan dat, met de mobiele lader van uw auto en op ongeveer 2,3 kW. Een gewoon stopcontact en de groep erachter zijn alleen niet gemaakt om dag in, dag uit urenlang vol belast te worden. Voor dagelijks laden is een laadpaal op een eigen groep de veilige keuze."],
      ["Ik heb zelf al een laadpaal gekocht. Sluit u die aan?", "Ja. Geeft u het merk en type door bij uw aanvraag, dan bepalen wij welke beveiliging en bekabeling daarbij horen."],
      ["Heb ik 3-fase nodig?", "Niet altijd. Op 1-fase laadt u ook, alleen langzamer. Laadt u vooral 's nachts en rijdt u geen grote afstanden, dan is dat vaak voldoende. Wij rekenen het graag met u door."],
      ["Kan de laadpaal samenwerken met mijn zonnepanelen?", "Veel laadpalen kunnen laden op het overschot van uw zonnepanelen. Of dat bij u kan, hangt af van het model en van de meting in uw meterkast."]
    ])}

<h2>Offerte aanvragen voor uw laadpaal</h2>
<p>Met deze gegevens maken wij een offerte die aansluit op uw situatie:</p>
<ul class="checks"><li>Een foto van uw meterkast, met de deur open.</li><li>De afstand tussen de meterkast en de laadplek.</li><li>Of u zelf een laadpaal heeft of advies wilt.</li><li>Het merk en type van uw auto.</li></ul>
<p><a href="#offerte">Vul het formulier in</a>, dan hoort u wat er bij u mogelijk is.</p>` });

  /* ---------- Elektra en storingen ---------- */
  const overige = svc({ key: "overige", crumb: "Elektra en storingen",
    h1: `Elektrotechnische werkzaamheden: storingen, uitbreidingen en verbouwingen`,
    lead: `Een groep die steeds uitvalt, te weinig stopcontacten of een verbouwing waarbij de elektra opnieuw moet worden aangelegd. ${naam} spoort de oorzaak op, legt aan wat u nodig heeft en levert het werk getest op. De prijs hoort u vooraf. Wij werken als elektricien in ${regio}: ${stedenOmg(4)}.`,
    kort: ["Storingen opsporen en verhelpen", "Extra groepen en aansluitpunten", "Apparaten veilig op een eigen groep", "Elektra bij een verbouwing, afgestemd met uw aannemer"],
    body: `<h2>Voor wie?</h2>
<p>Voor woningeigenaren, verhuurders en bedrijven met een storing, een uitbreiding of een verbouwing.</p>

<h2>Waarvoor kunt u ons inschakelen?</h2>
${icards([
      ["alert", "Storing opsporen", "Een groep of aardlekschakelaar die steeds uitvalt, of een deel van uw woning zonder stroom."],
      ["plug", "Extra aansluitpunten", "Meer wandcontactdozen, lichtpunten en schakelaars, in huis, in de schuur of in de tuin."],
      ["grid", "Apparaat op een eigen groep", "Uw inductieplaat, oven, boiler, wasmachine, droger of warmtepomp veilig aangesloten."],
      ["tool", "Elektra bij een verbouwing", "Nieuwe leidingen en aansluitpunten voor uw keuken, badkamer, aanbouw of zolder."]
    ])}

<h2>Storing? Eerst de oorzaak, dan de oplossing</h2>
<p>Slaat de aardlekschakelaar af of valt steeds dezelfde groep uit? Dan zit de fout in een apparaat of in de bedrading. Wij meten de groepen door, zoeken de oorzaak op en verhelpen die. Is er meer nodig dan een kleine ingreep, dan hoort u eerst wat het herstel kost.</p>
${callout("<strong>Ruikt u een brandlucht of ziet u verkleurde of gesmolten onderdelen?</strong> Schakel dan de hoofdschakelaar uit en neem direct contact met ons op.")}

<h2>Extra groepen en wandcontactdozen</h2>
<p>Een thuiswerkplek, een nieuwe keuken of gereedschap in de schuur: al snel vraagt u meer van uw installatie dan de bestaande groepen aankunnen. Wij leggen extra groepen en aansluitpunten aan en controleren of uw <a href="/meterkast/">groepenkast</a> daar ruimte voor heeft. Buiten gebruiken wij kabels en materialen die bestand zijn tegen vocht en geschikt zijn voor in de grond.</p>

<h2>Een apparaat op een eigen groep</h2>
<p>Apparaten met een hoog vermogen horen op een eigen groep. Denk aan een inductieplaat (vaak twee groepen), oven, boiler, wasmachine of droger. Wij leggen de groep aan, sluiten het apparaat aan en testen de beveiliging. Voor een <a href="/laadpaal/">laadpaal</a> geldt hetzelfde, met een extra eis aan de aardlekbeveiliging.</p>

<h2>Elektra bij een verbouwing</h2>
<p>Bij een verbouwing leggen wij de leidingen en inbouwdozen aan voordat er wordt gestuct of betegeld. Zijn de wanden klaar, dan monteren wij het schakelmateriaal. De planning stemmen wij af met u en uw aannemer. In een badkamer houden wij rekening met de zones waarin aansluitpunten wel en niet zijn toegestaan.</p>

<h2>Zo is de prijs opgebouwd</h2>
${tiles([["plug", "Het aantal aansluitpunten en groepen"], ["cable", "De lengte van de leidingen en eventueel frees- of boorwerk"], ["meterkast", "Een eventuele uitbreiding van de groepenkast"], ["clock", "Bij storingen: de tijd die het opsporen kost"], ["truck", "Eventuele reiskosten"]])}
<p>Bij aanleg en uitbreiding ontvangt u vooraf een offerte waarin deze onderdelen apart staan.</p>

<h2>Veelgestelde vragen over elektra en storingen</h2>
${faq([
      ["Mijn aardlekschakelaar slaat steeds af. Wat kan ik zelf doen?", "Haal alle stekkers uit de groepen achter die aardlekschakelaar en schakel hem weer in. Blijft hij aan, steek de apparaten dan één voor één terug: het apparaat waarbij hij afslaat, is de oorzaak. Slaat hij ook zonder apparaten af, dan zit de fout in de installatie en moet er gemeten worden."],
      ["Moet mijn meterkast worden aangepast voor een inductieplaat?", "Meestal wel. Een inductieplaat heeft één of twee eigen groepen nodig. Is daar ruimte voor, dan plaatsen wij die bij. Zo niet, dan moet de groepenkast worden uitgebreid of vervangen."],
      ["Werkt u samen met mijn aannemer?", "Ja. Wij stemmen de planning met uw aannemer af, zodat de leidingen zijn aangelegd voordat de wanden worden afgewerkt."]
    ])}

<h2>Uw klus doorgeven</h2>
<p>Hoe concreter uw omschrijving, hoe sneller u een passend antwoord krijgt:</p>
<ul class="checks"><li>Bij een storing: wat er gebeurt en sinds wanneer.</li><li>Een foto van uw meterkast, met de deur open.</li><li>Bij een verbouwing: de tekening of een schets met de gewenste aansluitpunten.</li></ul>
<p><a href="#offerte">Beschrijf uw klus in het formulier</a>.</p>` });

  /* ---------- Thuisbatterij ---------- */
  const thuisbatterij = svc({ key: "thuisbatterij", crumb: "Thuisbatterij",
    h1: `Thuisbatterij laten installeren? Eerst weten of het bij u past.`,
    lead: `Een thuisbatterij slaat de zonnestroom op die u overdag niet gebruikt, zodat u die 's avonds zelf kunt verbruiken. ${naam} rekent eerst met uw eigen verbruikscijfers door of dat voor u zinvol is. Is dat zo, dan installeren wij de batterij en stellen wij hem voor u in. ${werkgebied}`,
    kort: ["Advies op basis van uw eigen verbruik", "Beoordeling van meterkast en omvormer", "Installatie, instellen en uitleg", "Geen beloftes over terugverdientijd"],
    body: `<h2>Voor wie?</h2>
<p>Voor woningeigenaren met zonnepanelen die meer van hun eigen stroom willen gebruiken, en voor leveranciers van thuisbatterijen die de installatie willen uitbesteden.</p>

<h2>Wat verandert er op 1 januari 2027?</h2>
<p>Tot die datum mag u de stroom die u teruglevert wegstrepen tegen de stroom die u afneemt. Dat heet salderen. Op 1 januari 2027 vervalt die regeling. Vanaf dat moment betaalt u de volle prijs voor alle stroom die u van het net afneemt. Voor de stroom die u teruglevert, ontvangt u een terugleververgoeding van uw energieleverancier.</p>
<p>Tot 2030 is die vergoeding wettelijk minimaal de helft van het kale leveringstarief. Leveranciers mogen daarnaast terugleverkosten rekenen. Per saldo levert zelf gebruiken van uw zonnestroom daardoor meer op dan terugleveren. Met een batterij verschuift u uw overschot van de middag naar de avond.</p>

<h2>Voor wie past een thuisbatterij, en voor wie niet?</h2>
<p>Een batterij past bij u als:</p>
<ul class="checks">
<li>uw zonnepanelen overdag duidelijk meer opwekken dan u op dat moment verbruikt;</li>
<li>u de meeste stroom 's avonds en 's ochtends gebruikt;</li>
<li>u een dynamisch energiecontract heeft of overweegt, zodat de batterij ook op goedkope uren kan laden.</li>
</ul>
<p>Een batterij levert weinig op als u weinig panelen heeft, als u overdag al veel zelf verbruikt (bijvoorbeeld door thuiswerken, een warmtepomp of een auto die overdag laadt) of als uw jaarverbruik laag is. Wij rekenen het door met uw eigen verbruikscijfers. Blijkt daaruit dat een batterij voor u niet loont, dan zeggen wij dat ook. Beloftes over de terugverdientijd doen wij niet: die hangt af van energieprijzen die niemand kan voorspellen.</p>

<h2>Dit beoordelen wij vooraf</h2>
${icards([
      ["elektra", "Uw aansluiting", "1-fase of 3-fase en de waarde van uw hoofdzekering bepalen hoeveel vermogen de batterij mag leveren en opnemen."],
      ["meterkast", "Uw groepenkast", "Een batterij krijgt een eigen groep. Is daar geen ruimte voor, dan moet eerst de <a href=\"/meterkast/\">meterkast worden uitgebreid</a>."],
      ["sun", "Uw omvormer", "Merk en type bepalen of de batterij op uw bestaande omvormer kan worden aangesloten of een eigen omvormer nodig heeft."],
      ["home", "De plek", "Droog, vorstvrij, goed bereikbaar en niet in een vluchtroute, volgens de voorschriften van de fabrikant."],
      ["gauge", "De meting", "Een energiemeter of een koppeling met de slimme meter, zodat de batterij weet hoeveel stroom uw woning verbruikt."]
    ])}

<h2>1-fase of 3-fase</h2>
<p>Kleinere batterijen werken op één fase. Voor grotere vermogens heeft u een 3-fase aansluiting nodig. Heeft u die niet, dan vraagt u een verzwaring aan bij uw netbeheerder via mijnaansluiting.nl. De netbeheerder past de aansluiting en de meter aan, daarna passen wij uw groepenkast aan. Weet u niet welke aansluiting u heeft? Op een foto van uw meterkast is dat meestal te zien.</p>

<h2>Van advies tot werkende batterij</h2>
<ol class="steps v">
<li><b>Aanvraag</b><span>U stuurt foto's van uw meterkast en omvormer en geeft uw jaarverbruik door.</span></li>
<li><b>Advies en offerte</b><span>U hoort of een batterij bij u past, welke aanpassingen nodig zijn en wat het kost.</span></li>
<li><b>Installatie</b><span>Wij monteren de batterij, leggen de eigen groep aan en plaatsen de meting.</span></li>
<li><b>Oplevering</b><span>Wij testen de werking, stellen de app in en lopen alles met u door.</span></li>
</ol>

<h2>Batterij aanmelden</h2>
<p>Een thuisbatterij moet u aanmelden op energieleveren.nl, net als zonnepanelen. Zo weet de netbeheerder wat er op het net is aangesloten. Aanmelden is gratis. Bij de oplevering krijgt u van ons de gegevens die u daarvoor nodig heeft.</p>

<h2>Merk en type</h2>
${partner}

<h2>Wat bepaalt de prijs?</h2>
${tiles([["batterij", "De batterij zelf: capaciteit, vermogen en merk"], ["meterkast", "Aanpassingen aan uw meterkast"], ["cable", "De afstand tussen meterkast en batterij"], ["gauge", "De meting en de koppeling met uw omvormer"], ["truck", "Eventuele reiskosten"]])}
${vanaf("thuisbatterij")}<p>In de offerte staan deze onderdelen apart, zodat u ziet waaruit het bedrag bestaat.</p>

<h2>Veelgestelde vragen over thuisbatterijen</h2>
${faq([
      ["Kan een thuisbatterij ook zonder zonnepanelen?", "Technisch kan dat. De batterij laadt dan op uren waarop stroom goedkoop is en ontlaadt op dure uren. Dat heeft alleen zin met een dynamisch energiecontract. Of het loont, hangt af van de prijsverschillen op de markt."],
      ["Moet mijn meterkast worden aangepast?", "Vaak wel, in beperkte mate: de batterij krijgt een eigen groep. Is uw kast vol of verouderd, dan moet hij worden uitgebreid of vervangen. Dat ziet u terug in de offerte."],
      ["Waar mag een thuisbatterij staan?", "Op een droge, vorstvrije plek die bereikbaar blijft, zoals een garage, bijkeuken of technische ruimte. Niet in een vluchtroute. De fabrikant schrijft voor welke afstanden en welke ondergrond nodig zijn."],
      ["Moet ik de batterij zelf aanmelden?", "Ja, u meldt de batterij aan op energieleveren.nl. Dat kost een paar minuten. De gegevens van de installatie krijgt u bij de oplevering."],
      ["Kan ik later capaciteit bijplaatsen?", "Bij veel systemen kan dat met extra modules. Het hangt af van merk en type. Wilt u die mogelijkheid openhouden, geef dat dan aan bij uw aanvraag."]
    ])}

<h2>Laat uw situatie beoordelen</h2>
<p>Met deze gegevens rekenen wij door of een batterij bij u past:</p>
<ul class="checks"><li>Een foto van uw meterkast, met de deur open.</li><li>Het merk en type van uw omvormer en het aantal zonnepanelen.</li><li>Uw jaarlijkse verbruik en teruglevering, uit uw energie-app of jaarafrekening.</li><li>De plek waar de batterij kan komen.</li></ul>
<p><a href="#offerte">Vraag een beoordeling en offerte aan</a>. Past een batterij niet bij uw verbruik, dan hoort u dat ook.</p>` });

  /* ---------- Zakelijk ---------- */
  const zakelijk = svc({ key: "zakelijk", crumb: "Zakelijk",
    h1: "Onderaanneming elektrotechniek, per klus of per project",
    lead: `${naam} werkt als onderaannemer voor installatiebedrijven en voor leveranciers van laadpalen, zonnestroomsystemen en thuisbatterijen. Zoekt u een elektromonteur voor de installatie en aansluiting? Wij voeren het werk zelfstandig uit, volgens afspraak en volgens NEN 1010, en leveren op met opleverdocumentatie. Inzetbaar in heel Nederland.`,
    kort: ["Inzet per klus of per project", "Inzetbaar in heel Nederland", "Gecertificeerd volgens NEN 3140 (VP)", "Oplevering met opleverdocumentatie"],
    body: `<h2>Waarvoor u ons inschakelt</h2>
${icards([
      ["meterkast", "Groepenkasten en verdeelinrichtingen", "Vervangen en uitbreiden, in woningen en bedrijfspanden."],
      ["laadpaal", "Laadpalen", "Montage en aansluiting, inclusief load balancing."],
      ["tool", "Elektrotechnisch installatiewerk", "Ondersteuning bij projecten in woningbouw en utiliteit."],
      ["batterij", "Thuisbatterijen", "Installatie en aansluiting van batterijsystemen."]
    ])}
<h2>Zelfstandig en volgens afspraak</h2>
<p>U geeft de opdracht, wij voeren die zelfstandig uit. Vooraf leggen wij de werkzaamheden, de levering van materiaal, het tarief en de melding van meerwerk vast. Tijdens het project heeft u een vast contactpersoon. Wijkt iets af van de opdracht, dan hoort u dat direct. Elke oplevering gaat vergezeld van opleverdocumentatie.</p>
<h2>Inzetbaar in heel Nederland</h2>
<p>Wij werken per klus of per project, door heel Nederland.${cfg.beschikbaarheidZakelijk ? " Beschikbaarheid: " + esc(cfg.beschikbaarheidZakelijk) + "." : " Vraag de beschikbaarheid op voor de periode waarin u capaciteit nodig heeft."}</p>
<h2>Aantoonbare vakbekwaamheid</h2>
<ul class="checks">${kwal.map(k => `<li>${k}</li>`).join("")}<li>Werkzaamheden volgens NEN 1010</li></ul>
<h2>Documenten op aanvraag</h2>
<ul class="checks">${docs.map(d => `<li>${d}</li>`).join("")}</ul>
<p><a href="#offerte">Leg uw opdracht voor</a>, dan hoort u of wij in uw planning passen.</p>` });


  /* ---------- Stage ---------- */
  const stage = svc({ key: "stage", crumb: "Stage", knop: "Aanmelden voor een stage", geenRelated: true,
    h1: "Stage lopen bij een erkend leerbedrijf in de elektrotechniek",
    lead: `${naam} is erkend leerbedrijf (SBB). Volg je een opleiding elektrotechniek en zoek je een stageplek waar je echt meewerkt? Bij ons werk je mee aan echte opdrachten en leer je het vak in de praktijk, in de regio ${stedenTekst(3)}.`,
    kort: ["Erkend leerbedrijf (SBB)", "Je werkt mee aan echte opdrachten", "Vaste begeleiding", "Aanmelden via het formulier"],
    body: `<h2>Wat je bij ons leert</h2>
${icards([
      ["meterkast", "Meterkasten en verdeelinrichtingen", "Groepenkasten vervangen en uitbreiden, in woningen en bedrijfspanden."],
      ["laadpaal", "Laadpalen", "Een eigen groep aanleggen, de kabel trekken, de laadpaal monteren en instellen."],
      ["alert", "Storingen", "Meten, de oorzaak opsporen en de storing verhelpen."],
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
${cfg.garantieArbeid ? `<h2>Garantie</h2><p>Op ons installatiewerk krijgt u ${esc(cfg.garantieArbeid)} garantie. Voor materialen geldt de garantie van de fabrikant.</p>\n` : ""}<h2>Bedrijfsgegevens</h2>
<ul class="checks"><li>${naam}, eenmanszaak${cfg.vestigingsplaats ? " in " + esc(cfg.vestigingsplaats) : ""}</li>${cfg.kvk ? `<li>KvK-nummer: ${esc(cfg.kvk)}</li>` : `<li>Ingeschreven in het Handelsregister; het KvK-nummer staat op uw offerte en factuur</li>`}${cfg.btw ? `<li>Btw-id: ${esc(cfg.btw)}</li>` : ""}<li>E-mail: ${mail}</li></ul>` });

  const kaal = (h1, lead, extra, knop) => `<div class="phead" id="top"><div class="wrap"><h1>${h1}</h1><p class="lead">${lead}</p>${extra ? `<p class="lead">${extra}</p>` : ""}<div class="cta"><a class="btn" href="/">${knop}</a></div></div></div>
${related("")}`;
  const bedankt = kaal("Bedankt voor uw aanvraag", `Uw aanvraag is goed aangekomen. Wij bekijken uw bericht${cfg.reactietijd ? " en reageren " + esc(cfg.reactietijd) : " en nemen contact met u op"}.`, c.fotoRoute, "Terug naar de homepage");
  const nietGevonden = kaal("Deze pagina bestaat niet", "De pagina die u zoekt, is verplaatst of bestaat niet meer.", "", "Naar de homepage");

  const H = cfg.handelsnaam;
  return [
    { path: "", form: true, body: home,
      title: `Elektricien Utrecht, Amersfoort en Amsterdam | ${H}`,
      desc: `Elektrotechnisch installatiebedrijf in Utrecht, Amersfoort, Amsterdam en omgeving. Meterkast, laadpaal, thuisbatterij en storingen. Vaste prijs vooraf.` },
    { path: "meterkast/", form: true, dienst: "Meterkast / verdeelinrichting", service: "Meterkast, groepenkast of verdeelinrichting vervangen of uitbreiden", crumb: "Meterkast / verdeelinrichting", body: meterkast,
      title: `Meterkast vervangen Utrecht en Amersfoort | ${H}`,
      desc: `Meterkast of groepenkast vervangen in Utrecht, Amersfoort of Amsterdam? Lees wanneer vervangen nodig is, hoe lang het duurt en wat de prijs bepaalt.` },
    { path: "laadpaal/", form: true, dienst: "Laadpaal", service: "Laadpaal installeren", crumb: "Laadpaal", body: laadpaal,
      title: `Laadpaal installateur Utrecht en Amersfoort | ${H}`,
      desc: `Laadpaal laten installeren in Utrecht, Amersfoort of Amsterdam? Op een eigen groep, met de juiste beveiliging en load balancing. Prijs vooraf.` },
    { path: "overige-elektrotechniek/", form: true, dienst: "Overige elektrotechniek", service: "Storingen, extra groepen en elektra bij verbouwing", crumb: "Elektra en storingen", body: overige,
      title: `Storing of extra groepen in regio Utrecht | ${H}`,
      desc: `Elektrotechnische werkzaamheden in Utrecht, Amersfoort en Amsterdam: storingen, extra groepen, wandcontactdozen en elektra bij verbouwing.` },
    { path: "thuisbatterij/", form: true, dienst: "Thuisbatterij", service: "Thuisbatterij installeren", crumb: "Thuisbatterij", body: thuisbatterij,
      title: `Thuisbatterij installeren Utrecht e.o. | ${H}`,
      desc: `Thuisbatterij laten installeren in Utrecht, Amersfoort of omgeving? Lees wat er na 1 januari 2027 verandert, voor wie het past en wat de prijs bepaalt.` },
    { path: "zakelijk/", form: true, dienst: "Zakelijke inhuur", type: "Bedrijf", service: "Elektromonteur inhuren als onderaannemer", crumb: "Zakelijk", body: zakelijk,
      title: `Elektromonteur inhuren als onderaannemer | ${H}`,
      desc: `Elektromonteur als onderaannemer en elektricien voor bedrijven. Werk volgens NEN 1010, NEN 3140 VP. Per klus of project, in heel Nederland.` },
  ].concat(cfg.erkendLeerbedrijf ? [
    { path: "stage/", form: true, stage: true, dienst: "Stage", crumb: "Stage", body: stage,
      title: `Stage elektrotechniek regio Utrecht | ${H}`,
      desc: `Stage lopen in de elektrotechniek? ${H} is erkend leerbedrijf (SBB) in de regio Utrecht, Amersfoort en Amsterdam. Meld je aan via het formulier.` }
  ] : []).concat([
    { path: "privacyverklaring/", crumb: "Privacyverklaring", body: privacy,
      title: `Privacyverklaring | ${H}`,
      desc: `Privacyverklaring van ${H}: welke gegevens wij verwerken, waarvoor, hoe lang wij ze bewaren en wat uw rechten zijn.` },
    { path: "algemene-voorwaarden/", crumb: "Algemene voorwaarden", body: voorwaarden,
      title: `Algemene voorwaarden | ${H}`,
      desc: `Algemene voorwaarden van ${H}: hoe u ze ontvangt, bedenktijd voor particulieren en onze bedrijfsgegevens.` },
    { path: "bedankt/", noindex: true, body: bedankt, title: `Bedankt voor uw aanvraag | ${H}`, desc: "Uw aanvraag is ontvangen." },
    { path: "", file: "404.html", noindex: true, body: nietGevonden, title: `Pagina niet gevonden | ${H}`, desc: "Deze pagina bestaat niet." }
  ]);
};
