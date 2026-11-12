// Alle paginateksten. Contactgegevens, regio en kwalificaties komen uit site.config.json.
// Na een wijziging: node tools/build.js
module.exports = function (c) {
  const { cfg, esc, mail, tel, wa, reviews, projecten, stedenTekst, stedenOmg, ico } = c;
  const regio = esc(cfg.regio);
  const naam = esc(cfg.handelsnaam);
  const kwal = cfg.kwalificaties.map(esc).concat(cfg.erkendLeerbedrijf ? ["Erkend leerbedrijf (SBB)"] : []);

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
${knop ? `<div class="cta"><a class="btn" href="#offerte">Offerte aanvragen</a>${tel ? `<a class="btn ghost" href="${tel.href}">Bel ${esc(tel.label)}</a>` : ""}</div>` : ""}
</div></div>`;
  const diensten = {
    meterkast: ["meterkast", "Meterkast / verdeelinrichting", "/meterkast/", "Vervangen of uitbreiden"],
    laadpaal: ["laadpaal", "Laadpaal", "/laadpaal/", "Thuis of op de zaak laden"],
    overige: ["elektra", "Elektra en storingen", "/overige-elektrotechniek/", "Extra groepen, verbouwing, storing"],
    thuisbatterij: ["batterij", "Thuisbatterij", "/thuisbatterij/", "Zonnestroom zelf gebruiken"]
  };
  const related = key => `<div class="related"><div class="wrap">
<h2>Andere diensten</h2>
<div class="grid">${Object.keys(diensten).filter(k => k !== key).map(k => { const d = diensten[k]; return `<a class="rel" href="${d[2]}"><span class="ic">${ico(d[0])}</span>${d[1]}<span class="arr">${ico("arrow")}</span></a>`; }).join("")}</div>
</div></div>`;
  const side = kort => `<aside class="side" aria-label="In het kort">
<h2>In het kort</h2>
<ul class="checks">${kort.map(k => `<li>${k}</li>`).join("")}</ul>
<a class="btn" href="#offerte">Offerte aanvragen</a>
<div class="sidec">${tel ? `<a href="${tel.href}">${ico("phone")}${esc(tel.label)}</a>` : ""}${wa ? `<a href="${wa}">${ico("chat")}WhatsApp</a>` : ""}<a href="mailto:${esc(cfg.email)}">${ico("mail")}${esc(cfg.email)}</a></div>
</aside>`;
  const svc = o => `${phead(o, true)}
<div class="wrap layout"><div class="prose">
${o.body}
</div>
${side(o.kort)}</div>
${related(o.key)}`;
  const tekst = o => `${phead(o, false)}
<div class="wrap solo prose">
${o.body}
</div>`;

  const partner = cfg.partner.tonen && cfg.partner.naam
    ? `<p>Wij leveren en installeren batterijen van ${esc(cfg.partner.naam)}. Heeft u zelf al een batterij gekocht? Geef dat aan bij uw aanvraag.</p>`
    : `<p>Heeft u zelf al een batterij gekocht of op het oog? Geef het merk en type door bij uw aanvraag. Wij beoordelen of uw installatie erop is voorbereid en sluiten de batterij aan volgens de voorschriften van de fabrikant.</p>`;
  const docs = ["KvK-uittreksel", "Diploma en NEN 3140 VP-certificaat"]
    .concat(cfg.vca ? ["VCA-certificaat (" + esc(cfg.vca) + ")"] : [])
    .concat(cfg.verzekerd ? ["Polis aansprakelijkheidsverzekering"] : []);

  /* ---------- Homepage ---------- */
  const trust = [
    cfg.erkendLeerbedrijf ? ["user", "Erkend leerbedrijf", "Erkend door SBB"] : ["doc", "KvK-ingeschreven", "Nummer " + esc(cfg.kvk)],
    ["cap", "Gediplomeerd technicus", "Opgeleid en ervaren"],
    ["shield", "NEN 3140 VP", "Vakbekwaam Persoon"],
    ["tag", "Prijs vooraf", "In een offerte per post"]
  ];

  const kaart = (key, tekstje, punten, link) => { const d = diensten[key]; return `<a class="svc" href="${d[2]}"><span class="ic">${ico(d[0])}</span><h3>${d[1]}</h3><p>${tekstje}</p><ul>${punten.map(p => `<li>${ico("check")}${p}</li>`).join("")}</ul><span class="more">${link}${ico("arrow")}</span></a>`; };

  const over = cfg.eigenaar
    ? `<h2>${esc(cfg.eigenaar)}, uw elektricien</h2>
<p class="sub">Ik ben ${esc(cfg.eigenaar)}, eigenaar van ${naam}. Ik behandel uw aanvraag, maak de offerte en voer het werk zelf uit. U legt niets twee keer uit en u weet wie er bij u over de vloer komt.</p>`
    : `<h2>Eén vakman, één aanspreekpunt</h2>
<p class="sub">${naam} is een zelfstandig elektrotechnisch installatiebedrijf. Wie uw aanvraag behandelt, maakt ook de offerte en voert het werk zelf uit. U legt niets twee keer uit en u weet wie er bij u over de vloer komt.</p>`;

  const homeFaq = [
    ["Kan mijn meterkast een laadpaal, inductieplaat of warmtepomp aan?", `Dat hangt af van uw aansluiting (1-fase of 3-fase), de waarde van uw hoofdzekering en de vrije ruimte in uw groepenkast. Zware apparaten krijgen elk een eigen groep. Stuur een foto van uw meterkast mee, dan krijgt u een eerste inschatting. Meer uitleg staat op de pagina over de <a href="/meterkast/">meterkast</a>.`],
    ["Wat kost een elektricien?", `Dat hangt af van het werk. De prijs bestaat uit materiaal, arbeid en eventuele reiskosten. Het aantal groepen of aansluitpunten, de lengte van de kabels en eventuele aanpassingen aan uw meterkast maken het grootste verschil. U ontvangt vooraf een vrijblijvende offerte waarin deze posten apart staan.`],
    ["Met wie heb ik contact?", `Met de vakman zelf. Wie uw aanvraag behandelt, maakt de offerte, voert het werk uit en levert het op. U heeft dus van begin tot eind één aanspreekpunt.`],
    ["In welke plaatsen werkt u?", `Als elektricien werken wij voor particulieren in ${cfg.steden.map(esc).join(", ")} en omliggende plaatsen. Zakelijke opdrachten voeren wij in heel Nederland uit.`],
    ["Welke kwalificaties heeft u?", `Wij zijn gediplomeerd elektrotechnicus en hebben een certificaat Vakbekwaam Persoon (VP) volgens NEN 3140. Wij werken volgens NEN 1010.${cfg.erkendLeerbedrijf ? " " + naam + " is daarnaast een erkend leerbedrijf: wij mogen studenten elektrotechniek in de praktijk opleiden." : ""}`],
    ["Sluit u ook een laadpaal aan die ik zelf heb gekocht?", `Ja. Geef het merk en type door, dan beoordelen wij welke beveiliging en bekabeling erbij horen. Lees meer over de <a href="/laadpaal/">laadpaal</a>.`],
    ["Werkt u ook voor bedrijven?", `Ja. ${naam} werkt als elektricien voor bedrijven en als onderaannemer voor installatiebedrijven en leveranciers, per klus of per project. Op de pagina <a href="/zakelijk/">Zakelijk</a> leest u waarvoor u ons kunt inzetten en welke documenten u kunt opvragen.`]
  ].concat(cfg.garantieArbeid ? [["Welke garantie krijg ik?", `Op ons installatiewerk geldt ${esc(cfg.garantieArbeid)} garantie. Op materialen geldt de garantie van de fabrikant. De volledige regeling staat in de algemene voorwaarden die u bij de offerte ontvangt.`]] : []);

  const reviewsBlok = reviews.length ? `<section id="reviews"><div class="wrap">
<div class="shead"><span class="kicker">Ervaringen</span><h2>Wat klanten zeggen</h2></div>
<div class="grid">${reviews.map(r => `<article class="card"><p>“${esc(r.tekst)}”</p><p class="small"><strong>${esc(r.naam)}</strong>${r.plaats ? ", " + esc(r.plaats) : ""}${r.klus ? " · " + esc(r.klus) : ""}</p></article>`).join("")}</div>
</div></section>\n\n` : "";
  const projectenBlok = projecten.length ? `<section class="alt" id="projecten"><div class="wrap">
<div class="shead"><span class="kicker">Projecten</span><h2>Uitgevoerd werk</h2></div>
<div class="grid">${projecten.map(p => `<article class="card">${p.fotos && p.fotos[0] ? `<img src="${esc(p.fotos[0].src)}" alt="${esc(p.fotos[0].alt)}" width="${p.fotos[0].w}" height="${p.fotos[0].h}" loading="lazy">` : ""}<h3>${esc(p.klus)} in ${esc(p.plaats)}</h3><p>${esc(p.beschrijving)}</p></article>`).join("")}</div>
</div></section>\n\n` : "";

  const home = `
<div class="hero" id="top"><div class="wrap">
<div>
<div class="eyebrow">Elektrotechniek · Utrecht · Amsterdam · Omgeving</div>
<h1>Elektrotechniek, goed geregeld.<br><em>Van meterkast tot laadpaal.</em></h1>
<p class="lead">Van een nieuwe groepenkast of laadpaal tot elektrotechnische uitbreidingen en storingen. Bij ${naam} heeft u één vast aanspreekpunt. Wij leveren vakkundig werk, maken duidelijke afspraken en geven vooraf inzicht in de kosten.${cfg.reactietijd ? " U krijgt " + esc(cfg.reactietijd) + " een reactie." : ""}</p>
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
<p class="sub">Van één extra groep tot een complete verdeelinrichting. Per dienst leest u wat wij doen, hoe het werk verloopt en waar de prijs van afhangt.</p></div>
<div class="grid two">
${kaart("meterkast", "Uw groepenkast of verdeelinrichting vervangen of uitbreiden, zodat uw installatie veilig is en ruimte biedt voor wat u wilt aansluiten.", ["Groepenkast vervangen", "Extra groepen bijplaatsen", "Voorbereiden op 3-fase"], "Meterkast of verdeelinrichting vervangen")}
${kaart("laadpaal", "Laden bij uw woning of bedrijf, aangelegd op een eigen groep met de beveiliging die daarbij hoort.", ["Eigen groep en aardlekbeveiliging", "Load balancing", "Ook voor uw zelf gekochte laadpaal"], "Laadpaal laten installeren")}
${kaart("overige", "Elektrotechnische werkzaamheden in en om uw woning of bedrijfspand, van een storing tot de elektra bij een verbouwing.", ["Storing opsporen en verhelpen", "Wandcontactdozen en extra groepen", "Elektra bij een verbouwing"], "Elektra en storingen")}
${kaart("thuisbatterij", "Zonnestroom opslaan en later zelf gebruiken. U hoort eerst of dat bij uw verbruik past.", ["Controle van meterkast en omvormer", "Installatie en instellen", "Advies op basis van uw verbruik"], "Thuisbatterij laten installeren")}
</div>
</div></section>

<section class="alt" id="werkwijze"><div class="wrap">
<div class="shead"><span class="kicker">Werkwijze</span><h2>Van aanvraag tot oplevering</h2>
<p class="sub">Vier stappen, één aanspreekpunt. U weet vooraf wat er gebeurt, wat het kost en wanneer wij komen.</p></div>
<ol class="steps">
<li><b>U doet een aanvraag</b><span>Via het formulier, met foto's van uw meterkast. Daarmee beoordelen wij veel al op afstand.</span></li>
<li><b>U ontvangt een offerte</b><span>Met de werkzaamheden, de materialen, de prijs en de planning. Vrijblijvend.</span></li>
<li><b>Wij voeren het werk uit</b><span>Volgens NEN 1010, op de afgesproken dag. Meerwerk alleen na uw akkoord.</span></li>
<li><b>Wij leveren op</b><span>Wij meten en testen de installatie en lopen de werking met u door.</span></li>
</ol></div></section>

<section id="over"><div class="wrap two">
<div><span class="kicker">Over ons</span>
${over}
<ul class="tags">${kwal.concat(["Werkzaamheden volgens NEN 1010"]).map(k => `<li>${ico("check")}${k}</li>`).join("")}</ul>
${cfg.portret ? `<img class="portret" src="${esc(cfg.portret)}" alt="${esc(cfg.eigenaar || naam)}" width="480" height="480" loading="lazy">` : ""}</div>
<ul class="points">
<li><span class="ic">${ico("home")}</span><div><b>Voor particulieren</b><p>U krijgt uitleg in begrijpelijke taal, een offerte waarin werk en materiaal apart staan en een vaste afspraak voor de uitvoering.</p></div></li>
<li><span class="ic">${ico("grid")}</span><div><b>Voor zakelijke opdrachtgevers</b><p>Elektrotechnische ondersteuning en onderaanneming, per klus of per project. <a href="/zakelijk/">Bekijk de zakelijke dienstverlening</a>.</p></div></li>
<li><span class="ic">${ico("tag")}</span><div><b>Duidelijkheid vooraf</b><p>U weet vooraf wat wij doen, welke materialen nodig zijn en wat het kost. Eventuele reiskosten staan in de offerte.</p></div></li>
<li><span class="ic">${ico("chat")}</span><div><b>Geen verrassingen achteraf</b><p>Komt er tijdens het werk iets onverwachts naar voren, dan overleggen wij eerst met u. Meerwerk voeren wij alleen uit na uw akkoord.</p></div></li>
</ul></div></section>

<section class="alt" id="werkgebied"><div class="wrap">
<div class="shead"><span class="kicker">Werkgebied</span><h2>Elektricien in ${regio} en regio Amsterdam</h2>
<p class="sub">${naam} werkt voor particulieren in de provincie Utrecht, het Gooi en de regio Amsterdam. Ligt uw adres net buiten dit gebied? Neem contact op, dan hoort u of wij ook bij u komen. Zakelijke opdrachten voeren wij in heel Nederland uit.</p></div>
<ul class="tags">${cfg.steden.map(s => `<li>${ico("pin")}${esc(s)}</li>`).join("")}<li>En omliggende plaatsen</li></ul>
</div></section>

${reviewsBlok}${projectenBlok}<section id="faq"><div class="wrap narrow">
<div class="shead"><span class="kicker">Veelgestelde vragen</span><h2>Goed om vooraf te weten</h2></div>
${faq(homeFaq)}
</div></section>
`;

  /* ---------- Meterkast ---------- */
  const meterkast = svc({ key: "meterkast", crumb: "Meterkast / verdeelinrichting",
    h1: `Meterkast of verdeelinrichting vervangen: veilig en klaar voor uitbreiding`,
    lead: `Een laadpaal, inductieplaat of warmtepomp heeft een eigen groep nodig. Is uw meterkast vol of verouderd, dan lukt dat niet zonder aanpassing. ${naam} vervangt en breidt groepenkasten in woningen en verdeelinrichtingen in bedrijfspanden uit. U weet vooraf wat er gebeurt en wat het kost. Wij werken in ${regio}: ${stedenOmg(4)}.`,
    kort: ["Groepenkast of verdeelinrichting vervangen of uitbreiden", "Opgebouwd en getest volgens NEN 1010", "Meestal binnen één werkdag klaar", "Offerte met werk en materiaal apart"],
    body: `<h2>Wat wij voor u doen</h2>
${icards([
      ["meterkast", "Groepenkast vervangen", "Een nieuwe kast met installatieautomaten en aardlekschakelaars, opgebouwd volgens NEN 1010."],
      ["grid", "Groepen bijplaatsen", "Extra groepen voor bijvoorbeeld een laadpaal, inductieplaat, warmtepomp of schuur."],
      ["elektra", "Voorbereiden op 3-fase", "Uw kast geschikt maken voor een 3-fase aansluiting, afgestemd op de netbeheerder."],
      ["gauge", "Doormeten en testen", "Na afloop meten wij de installatie door en testen wij de aardlekschakelaars."]
    ])}

<h2>Meterkast, groepenkast of verdeelinrichting?</h2>
<p>In een woning spreken de meeste mensen van de meterkast of groepenkast. In een bedrijfspand heet hetzelfde onderdeel meestal de verdeelinrichting of verdeler: groter, vaak 3-fase en met meer eindgroepen. Wij vervangen en breiden beide uit.</p>

<h2>Vervangen of uitbreiden?</h2>
<p><strong>Uitbreiden</strong> kan als uw kast in goede staat is en er ruimte is voor extra groepen. Dat is het minste werk.</p>
<p><strong>Vervangen</strong> is nodig als de kast te klein is, als onderdelen verouderd zijn of als de opbouw niet meer voldoet. In één keer vervangen is dan verstandiger dan een oude kast oplappen.</p>

<h2>Hieraan herkent u een verouderde meterkast</h2>
<ul class="checks">
<li>Er zitten nog smeltpatronen (schroefstoppen) in plaats van automaten.</li>
<li>Er is geen aardlekschakelaar, of er hangen meer dan vier groepen aan één aardlekschakelaar.</li>
<li>Een groep valt regelmatig uit.</li>
<li>Er is geen vrije plek meer voor een extra groep.</li>
</ul>
${callout("<strong>Worden onderdelen warm, zijn ze verkleurd of ruikt u een brandlucht?</strong> Schakel de groep uit en neem direct contact op.")}

<h2>Wat doet de netbeheerder en wat doen wij?</h2>
<p>De <strong>netbeheerder</strong> is eigenaar van de aansluitkabel, de hoofdzekering en de meter. Wilt u van 1-fase naar 3-fase of een zwaardere hoofdzekering, dan vraagt u dat aan via mijnaansluiting.nl. De netbeheerder voert dat uit en rekent daarvoor een eenmalig tarief dat per netbeheerder verschilt.</p>
<p><strong>Wij</strong> doen alles achter de meter: de hoofdschakelaar, de aardlekschakelaars, de groepen en de bedrading naar uw apparaten. Gaat uw aansluiting naar 3-fase, dan stemmen wij de planning af op de afspraak met de netbeheerder.</p>

<h2>Hoe lang zit u zonder stroom?</h2>
<p>Een groepenkast in een woning vervangen is meestal binnen één werkdag klaar. Tijdens het werk heeft u geen stroom. Een enkele groep bijplaatsen gaat sneller. De planning staat in uw offerte.</p>

<h2>Waar hangt de prijs van af?</h2>
${tiles([["grid", "Het aantal groepen en aardlekschakelaars"], ["elektra", "1-fase of 3-fase"], ["cable", "De staat van de bestaande bedrading en aarding"], ["plug", "Extra groepen voor laadpaal, inductie of batterij"], ["truck", "Eventuele reiskosten"]])}
${vanaf("meterkast")}<p>In uw offerte staan deze posten apart. Zo ziet u waar het bedrag uit bestaat voordat u beslist.</p>

<h2>Veelgestelde vragen over de meterkast</h2>
${faq([
      ["Hoe weet ik of ik 1-fase of 3-fase heb?", "Dat staat op uw meter (bijvoorbeeld 1x35 A of 3x25 A) en is te zien aan de hoofdschakelaar. Stuur een foto mee met uw aanvraag, dan zien wij het direct."],
      ["Heb ik 3-fase nodig voor inductie, een laadpaal of een warmtepomp?", "Niet altijd. Het hangt af van het vermogen van de apparaten en wat er tegelijk aanstaat. Veel inductieplaten werken op twee groepen van één fase. Voor <a href=\"/laadpaal/\">laden op 11 kW</a> is 3-fase wel nodig."],
      ["Kost een 3-fase aansluiting meer vastrecht?", "Tot en met 3x25 A valt u in dezelfde tariefgroep als de gangbare 1-fase aansluiting. De netbeheerder rekent wel eenmalige kosten voor het ombouwen. De actuele bedragen staan op de website van uw netbeheerder."],
      ["Moet de hele kast eruit als ik één groep extra wil?", "Nee, als er ruimte is en de kast in orde is, plaatsen wij alleen een groep bij."]
    ])}

<h2>Uw meterkast laten beoordelen</h2>
<p>Met een foto is veel al op afstand te beoordelen. Stuur bij uw aanvraag het volgende mee:</p>
<ul class="checks"><li>Een foto van uw meterkast, met de deur open.</li><li>Wat u wilt gaan aansluiten, nu of later.</li><li>Uw postcode, zodat wij de planning kunnen inschatten.</li></ul>
<p>U hoort wat er nodig is en ontvangt een vrijblijvende offerte. <a href="#offerte">Vraag uw offerte aan</a>.</p>` });

  /* ---------- Laadpaal ---------- */
  const laadpaal = svc({ key: "laadpaal", crumb: "Laadpaal",
    h1: `Laadpaal laten installeren, veilig aangesloten op uw meterkast`,
    lead: `Thuis of op de zaak laden vraagt meer van uw installatie dan een stopcontact aankan. ${naam} legt uw laadpaal aan op een eigen groep, met de juiste beveiliging en zo nodig load balancing. U heeft één aanspreekpunt, van de eerste beoordeling tot de uitleg bij oplevering. Wij werken in ${regio}: ${stedenOmg(4)}.`,
    kort: ["Aangelegd op een eigen groep met de juiste beveiliging", "1-fase of 3-fase, afgestemd op uw auto en aansluiting", "Load balancing voorkomt een overbelaste hoofdzekering", "Ook voor een laadpaal die u zelf heeft gekocht"],
    body: `<h2>Van beoordeling tot eerste laadbeurt</h2>
<ol class="steps v">
<li><b>Beoordelen</b><span>Wij bekijken uw aansluiting en de vrije ruimte in uw groepenkast.</span></li>
<li><b>Groep en kabel aanleggen</b><span>Een eigen groep met de beveiliging die bij de laadpaal hoort, en de kabel naar de laadplek.</span></li>
<li><b>Monteren en instellen</b><span>Wij monteren de laadpaal, stellen hem in en testen hem met een meting.</span></li>
<li><b>Uitleg</b><span>U hoort hoe u laadt en hoe u de paal bedient.</span></li>
</ol>

<h2>Waarom een laadpaal een eigen groep krijgt</h2>
<p>Een laadpaal hoort niet op een bestaande groep bij andere apparaten. Hij krijgt een eigen groep met een installatieautomaat en een aardlekbeveiliging die ook gelijkstroomlekken afschakelt. Bij sommige laadpalen zit die detectie ingebouwd; anders plaatsen wij het juiste type aardlekschakelaar in uw meterkast. Is daar geen ruimte voor, dan breiden wij eerst de <a href="/meterkast/">groepenkast</a> uit.</p>

<h2>1-fase of 3-fase: hoe snel laadt u?</h2>
<ul class="spec">
<li><b>1-fase, 16 A</b><span>ca. 3,7 kW</span></li>
<li><b>1-fase, 32 A</b><span>ca. 7,4 kW</span></li>
<li><b>3-fase, 16 A</b><span>ca. 11 kW</span></li>
</ul>
<p>Laden op 11 kW is bij woningen de meest gekozen uitvoering. Uw auto bepaalt mee hoe snel het gaat: de ingebouwde lader van de auto heeft een eigen maximum, en 7,4 kW op 1-fase kan alleen als uw aansluiting dat toelaat. Heeft u 1-fase en wilt u op 3-fase laden, dan vraagt u een verzwaring aan bij uw netbeheerder via mijnaansluiting.nl.</p>

<h2>Load balancing</h2>
<p>Als de auto laadt terwijl de oven, de wasdroger en de warmtepomp aanstaan, kan de hoofdzekering uitvallen. Load balancing voorkomt dat. Een meter in de meterkast meet het totale verbruik van uw huis en de laadpaal verlaagt de laadstroom zodra het te veel wordt. Bij de meeste woningen raden wij dit aan.</p>

<h2>Van meterkast naar laadplek</h2>
<p>De route van de kabel bepaalt een groot deel van het werk. Wij bekijken de afstand, of de kabel door een muur of kruipruimte kan, en of er in de tuin of oprit moet worden gegraven. Buiten gaat de kabel in de grond op voldoende diepte en in een mantelbuis waar dat nodig is.</p>

<h2>Woont u in een appartement of huurt u?</h2>
<p>Dan is toestemming nodig van de VvE of de verhuurder. Regel dat vooraf, dan loopt de installatie geen vertraging op.</p>

<h2>Wat kost een laadpaal laten installeren?</h2>
<p>Dat verschilt per situatie. Deze onderdelen bepalen de prijs:</p>
${tiles([["laadpaal", "De laadpaal zelf, als u die via ons afneemt"], ["cable", "De lengte en route van de kabel, inclusief graafwerk"], ["meterkast", "Aanpassingen aan de meterkast"], ["gauge", "Load balancing"], ["truck", "Eventuele reiskosten"]])}
${vanaf("laadpaal")}<p>U ontvangt een offerte waarin elk onderdeel apart staat.</p>

<h2>Veelgestelde vragen over laadpalen</h2>
${faq([
      ["Kan ik niet gewoon aan een stopcontact laden?", "Incidenteel kan dat met de mobiele lader van uw auto, op ongeveer 2,3 kW. Een gewone wandcontactdoos en de groep erachter zijn niet bedoeld voor urenlange volle belasting, dag na dag. Voor dagelijks laden is een laadpaal op een eigen groep de veilige oplossing."],
      ["Ik heb zelf al een laadpaal gekocht. Sluit u die aan?", "Ja. Geef het merk en type door bij uw aanvraag, dan beoordelen wij welke beveiliging en bekabeling daarbij horen."],
      ["Heb ik 3-fase nodig?", "Niet altijd. Op 1-fase kunt u ook laden, alleen langzamer. Voor wie 's nachts laadt en geen grote afstanden rijdt, is dat vaak genoeg. Wij rekenen het met u door."],
      ["Kan de laadpaal samenwerken met mijn zonnepanelen?", "Veel laadpalen kunnen laden op het overschot van uw zonnepanelen. Of dat kan, hangt af van het model en de meting in uw meterkast."]
    ])}

<h2>Offerte aanvragen voor uw laadpaal</h2>
<p>Met deze gegevens maken wij een offerte die klopt met uw situatie:</p>
<ul class="checks"><li>Een foto van uw meterkast, met de deur open.</li><li>De afstand tussen de meterkast en de laadplek.</li><li>Of u zelf een laadpaal heeft of advies wilt.</li><li>Het merk en type van uw auto.</li></ul>
<p><a href="#offerte">Vul het formulier in</a>, dan hoort u wat er bij u mogelijk is.</p>` });

  /* ---------- Elektra en storingen ---------- */
  const overige = svc({ key: "overige", crumb: "Elektra en storingen",
    h1: `Elektrotechnische werkzaamheden: storingen, uitbreidingen en verbouwingen`,
    lead: `Een groep die steeds uitvalt, te weinig wandcontactdozen of een verbouwing waarbij de elektra opnieuw moet. ${naam} spoort de oorzaak op, legt aan wat u nodig heeft en levert het werk getest op. De prijs hoort u vooraf. Wij werken als elektricien in ${regio}: ${stedenOmg(4)}.`,
    kort: ["Storingen opsporen en verhelpen", "Extra groepen en aansluitpunten", "Apparaten veilig op een eigen groep", "Elektra bij verbouwing, afgestemd met uw aannemer"],
    body: `<h2>Waarvoor kunt u ons inschakelen?</h2>
${icards([
      ["alert", "Storing opsporen", "Een groep of aardlekschakelaar die steeds uitvalt, of een deel van het huis zonder stroom."],
      ["plug", "Extra aansluitpunten", "Wandcontactdozen, lichtpunten en schakelaars erbij, in huis, in de schuur of in de tuin."],
      ["grid", "Apparaat op eigen groep", "Inductieplaat, oven, boiler, wasmachine, droger of warmtepomp veilig aangesloten."],
      ["tool", "Elektra bij verbouwing", "Nieuwe leidingen en aansluitpunten bij een keuken, badkamer, aanbouw of zolder."]
    ])}

<h2>Storing? Eerst de oorzaak, dan de oplossing</h2>
<p>Slaat de aardlekschakelaar af of valt steeds dezelfde groep uit, dan zit er een fout in een apparaat of in de bedrading. Wij meten de groepen door, zoeken de oorzaak op en verhelpen die. U hoort vooraf wat het herstel kost als het meer is dan een kleine ingreep.</p>
${callout("<strong>Ruikt u een brandlucht of ziet u verkleurde of gesmolten onderdelen?</strong> Schakel de hoofdschakelaar uit en neem direct contact op.")}

<h2>Extra groepen en wandcontactdozen</h2>
<p>Een thuiswerkplek, een nieuwe keuken of gereedschap in de schuur vraagt al snel meer dan de bestaande groepen aankunnen. Wij leggen extra groepen en aansluitpunten aan en kijken daarbij of uw <a href="/meterkast/">groepenkast</a> nog ruimte heeft. Buiten gebruiken wij kabel en materiaal dat geschikt is voor vocht en grond.</p>

<h2>Een apparaat op een eigen groep</h2>
<p>Apparaten met een hoog vermogen horen op een eigen groep. Dat geldt voor een inductieplaat (vaak twee groepen), oven, boiler, wasmachine en droger. Wij leggen de groep aan, sluiten het apparaat aan en testen de beveiliging. Voor een <a href="/laadpaal/">laadpaal</a> geldt hetzelfde, met een extra eis aan de aardlekbeveiliging.</p>

<h2>Elektra bij een verbouwing</h2>
<p>Bij een verbouwing leggen wij de leidingen en dozen aan voordat er wordt gestuct of betegeld, en monteren wij het schakelmateriaal af als de wanden klaar zijn. De planning stemmen wij af met u en uw aannemer. In een badkamer houden wij rekening met de zones waarin aansluitpunten wel en niet zijn toegestaan.</p>

<h2>Zo is de prijs opgebouwd</h2>
${tiles([["plug", "Het aantal aansluitpunten en groepen"], ["cable", "De lengte van de leidingen en of er gefreesd of geboord moet worden"], ["meterkast", "Of de groepenkast moet worden uitgebreid"], ["clock", "Bij storingen: de tijd die het zoeken kost"], ["truck", "Eventuele reiskosten"]])}
<p>Bij aanleg en uitbreiding ontvangt u vooraf een offerte met deze posten apart.</p>

<h2>Veelgestelde vragen over elektra en storingen</h2>
${faq([
      ["Mijn aardlekschakelaar slaat steeds af. Wat kan ik zelf doen?", "Haal alle stekkers uit de groepen die achter die aardlekschakelaar zitten en schakel hem weer in. Blijft hij aan, steek dan de apparaten één voor één terug: het apparaat waarbij hij afslaat is de oorzaak. Slaat hij ook af zonder apparaten, dan zit de fout in de installatie en is meten nodig."],
      ["Moet mijn meterkast worden aangepast voor een inductieplaat?", "Meestal wel: een inductieplaat heeft één of twee eigen groepen nodig. Is daar ruimte voor, dan plaatsen wij die bij. Zo niet, dan is uitbreiden of vervangen van de groepenkast nodig."],
      ["Werkt u samen met mijn aannemer?", "Ja. Wij stemmen de planning af, zodat de leidingen erin liggen voordat de wanden worden afgewerkt."]
    ])}

<h2>Uw klus doorgeven</h2>
<p>Hoe concreter uw omschrijving, hoe sneller u een passend antwoord heeft:</p>
<ul class="checks"><li>Bij een storing: wat er gebeurt en sinds wanneer.</li><li>Een foto van uw meterkast, met de deur open.</li><li>Bij een verbouwing: de tekening of een schets met de gewenste aansluitpunten.</li></ul>
<p><a href="#offerte">Beschrijf uw klus in het formulier</a>.</p>` });

  /* ---------- Thuisbatterij ---------- */
  const thuisbatterij = svc({ key: "thuisbatterij", crumb: "Thuisbatterij",
    h1: `Thuisbatterij laten installeren? Eerst weten of het bij u past.`,
    lead: `Een thuisbatterij slaat zonnestroom op die u overdag niet gebruikt, zodat u die 's avonds zelf verbruikt. ${naam} rekent eerst met uw eigen verbruikscijfers door of dat zinvol is. Past het, dan installeren wij de batterij en stellen wij hem in. Wij werken in ${regio}: ${stedenOmg(4)}.`,
    kort: ["Advies op basis van uw eigen verbruik", "Controle van meterkast en omvormer", "Installatie, instellen en uitleg", "Geen beloftes over terugverdientijd"],
    body: `<h2>Wat verandert er op 1 januari 2027?</h2>
<p>Tot die datum mag u de stroom die u teruglevert wegstrepen tegen de stroom die u afneemt. Dat heet salderen. Vanaf 1 januari 2027 vervalt die regeling. U betaalt dan de volle prijs voor de stroom die u van het net afneemt en u krijgt voor uw teruggeleverde stroom een terugleververgoeding van uw energieleverancier.</p>
<p>Die vergoeding is tot 2030 wettelijk minimaal de helft van het kale leveringstarief. Leveranciers mogen daarnaast terugleverkosten rekenen. Per saldo is zelf gebruiken van uw zonnestroom daardoor meer waard dan terugleveren. Een batterij verschuift uw overschot van de middag naar de avond.</p>

<h2>Voor wie past een thuisbatterij, en voor wie niet?</h2>
<p>Een batterij past bij u als:</p>
<ul class="checks">
<li>uw zonnepanelen overdag duidelijk meer opwekken dan u op dat moment verbruikt;</li>
<li>u het grootste deel van uw stroom 's avonds en 's ochtends gebruikt;</li>
<li>u een dynamisch energiecontract heeft of overweegt, zodat de batterij ook kan laden op goedkope uren.</li>
</ul>
<p>Een batterij levert weinig op als u weinig panelen heeft, als u overdag al veel zelf verbruikt (bijvoorbeeld door thuiswerken, een warmtepomp of een auto die overdag laadt), of als uw jaarverbruik laag is. Wij rekenen het door met uw eigen verbruikscijfers. Blijkt daaruit dat een batterij bij u niet uit kan, dan hoort u dat ook. Wij doen geen beloftes over terugverdientijd: die hangt af van energieprijzen die niemand kan voorspellen.</p>

<h2>Dit beoordelen wij vooraf</h2>
${icards([
      ["elektra", "Uw aansluiting", "1-fase of 3-fase en de hoofdzekering bepalen welk vermogen de batterij mag leveren en opnemen."],
      ["meterkast", "Uw groepenkast", "Een batterij krijgt een eigen groep. Is daar geen ruimte voor, dan moet de <a href=\"/meterkast/\">meterkast eerst worden uitgebreid</a>."],
      ["sun", "Uw omvormer", "Merk en type bepalen of de batterij aan de bestaande omvormer kan of een eigen omvormer nodig heeft."],
      ["home", "De plek", "Droog, vorstvrij, bereikbaar en niet in een vluchtroute, volgens de voorschriften van de fabrikant."],
      ["gauge", "De meting", "Een energiemeter of koppeling met de slimme meter, zodat de batterij weet wat uw huis verbruikt."]
    ])}

<h2>1-fase of 3-fase</h2>
<p>Kleinere batterijen werken op één fase. Voor grotere vermogens is een 3-fase aansluiting nodig. Heeft u die niet, dan vraagt u een verzwaring aan bij uw netbeheerder via mijnaansluiting.nl. De netbeheerder past de aansluiting en de meter aan; wij passen daarna uw groepenkast aan. Weet u niet wat u heeft? Op een foto van uw meterkast is het meestal te zien.</p>

<h2>Van advies tot werkende batterij</h2>
<ol class="steps v">
<li><b>Aanvraag</b><span>U stuurt foto's van meterkast en omvormer en uw jaarverbruik.</span></li>
<li><b>Advies en offerte</b><span>U hoort of een batterij past, welke aanpassingen nodig zijn en wat het kost.</span></li>
<li><b>Installatie</b><span>Wij monteren de batterij, leggen de eigen groep aan en plaatsen de meting.</span></li>
<li><b>Oplevering</b><span>Wij testen de werking, stellen de app in en lopen alles met u door.</span></li>
</ol>

<h2>Batterij aanmelden</h2>
<p>Een thuisbatterij moet worden aangemeld op energieleveren.nl, net als zonnepanelen. Zo weet de netbeheerder wat er op het net is aangesloten. Aanmelden is gratis. Bij de oplevering krijgt u van ons de gegevens die u daarvoor nodig heeft.</p>

<h2>Merk en type</h2>
${partner}

<h2>Wat bepaalt de prijs?</h2>
${tiles([["batterij", "De batterij zelf: capaciteit, vermogen en merk"], ["meterkast", "Aanpassingen aan uw meterkast"], ["cable", "De afstand tussen meterkast en batterij"], ["gauge", "De meting en de koppeling met uw omvormer"], ["truck", "Eventuele reiskosten"]])}
${vanaf("thuisbatterij")}<p>In de offerte staan deze posten apart, zodat u ziet waar het bedrag uit bestaat.</p>

<h2>Veelgestelde vragen over thuisbatterijen</h2>
${faq([
      ["Kan een thuisbatterij ook zonder zonnepanelen?", "Technisch wel. De batterij laadt dan op uren waarop stroom goedkoop is en ontlaadt op dure uren. Dat heeft alleen zin met een dynamisch energiecontract. Of het uit kan, hangt af van de prijsverschillen op de markt."],
      ["Moet mijn meterkast worden aangepast?", "Vaak wel in beperkte mate: de batterij krijgt een eigen groep. Is uw kast vol of verouderd, dan is uitbreiden of vervangen nodig. Dat ziet u terug in de offerte."],
      ["Waar mag een thuisbatterij staan?", "Op een droge, vorstvrije plek die bereikbaar blijft, zoals een garage, bijkeuken of technische ruimte. Niet in een vluchtroute. De fabrikant schrijft voor welke afstanden en ondergrond nodig zijn."],
      ["Moet ik de batterij zelf aanmelden?", "Ja, u meldt de batterij aan op energieleveren.nl. Dat kost een paar minuten. De gegevens van de installatie krijgt u bij de oplevering."],
      ["Kan ik later meer capaciteit bijplaatsen?", "Bij veel systemen kan dat met extra modules. Het hangt af van merk en type. Wilt u die mogelijkheid openhouden, geef dat dan aan bij uw aanvraag."]
    ])}

<h2>Laat uw situatie beoordelen</h2>
<p>Met deze gegevens rekenen wij door of een batterij bij u past:</p>
<ul class="checks"><li>Een foto van uw meterkast, met de deur open.</li><li>Het merk en type van uw omvormer en het aantal zonnepanelen.</li><li>Uw jaarlijkse verbruik en teruglevering, uit uw energie-app of jaarafrekening.</li><li>De plek waar de batterij kan komen.</li></ul>
<p><a href="#offerte">Vraag een beoordeling en offerte aan</a>. Past een batterij niet bij uw verbruik, dan hoort u dat ook.</p>` });

  /* ---------- Zakelijk ---------- */
  const zakelijk = svc({ key: "zakelijk", crumb: "Zakelijk",
    h1: "Elektromonteur als onderaannemer, per klus of per project",
    lead: `${naam} ondersteunt installatiebedrijven, leveranciers en andere zakelijke opdrachtgevers met elektrotechnisch werk. U zet een zelfstandige, gediplomeerde vakman in die volgens afspraak werkt en zelf communiceert over voortgang en meerwerk. Inzetbaar in heel Nederland.`,
    kort: ["Inzet per klus of per project", "Inzetbaar in heel Nederland", "Gediplomeerd en NEN 3140 VP", "Eén contactpersoon: de monteur zelf"],
    body: `<h2>Waarvoor u ons inzet</h2>
${icards([
      ["meterkast", "Groepenkasten en verdeelinrichtingen", "Vervangen en uitbreiden in woningen en bedrijfspanden."],
      ["laadpaal", "Laadpalen", "Montage en aansluiting, inclusief load balancing."],
      ["tool", "Elektrotechnisch werk", "Ondersteuning bij installatiewerk in woningbouw en utiliteit."],
      ["batterij", "Thuisbatterijen", "Installatie en aansluiting van batterijsystemen."]
    ])}
<h2>Werkgebied en beschikbaarheid</h2>
<p>Opdrachten voeren wij uit in heel Nederland, per klus of per project.${cfg.beschikbaarheidZakelijk ? " Beschikbaarheid: " + esc(cfg.beschikbaarheidZakelijk) + "." : " Vraag de beschikbaarheid op voor de periode die u nodig heeft."}</p>
<h2>Aantoonbare vakbekwaamheid</h2>
<ul class="checks">${kwal.map(k => `<li>${k}</li>`).join("")}<li>Werk volgens NEN 1010</li></ul>
<h2>Documenten op aanvraag</h2>
<ul class="checks">${docs.map(d => `<li>${d}</li>`).join("")}</ul>
<h2>Heldere afspraken</h2>
<p>Vooraf leggen wij de opdracht, de materiaallevering, het tarief en de melding van meerwerk vast. Tijdens het werk heeft u één contactpersoon: de monteur zelf. U hoort het direct als iets afwijkt van de opdracht.</p>` });

  /* ---------- Privacy ---------- */
  const privacy = tekst({ crumb: "Privacyverklaring", h1: "Privacyverklaring",
    lead: `Laatst bijgewerkt: november 2026. Hier leest u hoe ${naam} met uw gegevens omgaat.`,
    body: `<h2>Wie is verantwoordelijk?</h2>
<p>${naam} (KvK ${esc(cfg.kvk)})${cfg.vestigingsplaats ? ", gevestigd in " + esc(cfg.vestigingsplaats) + "," : ""} is verantwoordelijk voor de verwerking van uw gegevens. U bereikt ons via ${mail}.</p>
<h2>Welke gegevens verwerken wij?</h2>
<ul class="checks"><li>Uw naam, e-mailadres, telefoonnummer en postcode.</li><li>Bij zakelijke aanvragen uw bedrijfsnaam.</li><li>Gegevens over uw installatie: uw type aansluiting, of u zonnepanelen heeft en wat u in de toelichting vermeldt.</li><li>Foto's die u ons stuurt, zoals van uw meterkast.</li></ul>
<h2>Waarvoor en op welke grondslag?</h2>
<ul class="checks">
<li><strong>Reageren op uw aanvraag en een offerte maken.</strong> Grondslag: stappen op uw verzoek vóór het sluiten van een overeenkomst.</li>
<li><strong>De werkzaamheden uitvoeren.</strong> Grondslag: uitvoering van de overeenkomst.</li>
<li><strong>Factureren en de administratie voeren.</strong> Grondslag: wettelijke verplichting.</li>
</ul>
<h2>Hoe lang bewaren wij ze?</h2>
<ul class="checks"><li>Aanvragen zonder opdracht, inclusief meegestuurde foto's: ${esc(cfg.bewaartermijn)} na ons laatste contact.</li><li>Gegevens en foto's van uitgevoerde opdrachten: zolang dat nodig is voor garantie en nazorg.</li><li>Facturen en administratie: 7 jaar, volgens de fiscale bewaarplicht.</li></ul>
<h2>Met wie delen wij ze?</h2>
<p>Wij verkopen uw gegevens niet. Wij gebruiken deze dienstverleners:</p>
<ul class="checks">${/hotmail|outlook|live\./i.test(cfg.email) ? "<li><strong>Microsoft (Outlook):</strong> onze e-mail. Aanvragen en foto's die u mailt, staan in deze mailbox.</li>" : "<li><strong>Onze e-mailprovider:</strong> aanvragen en foto's die u mailt, staan in onze mailbox.</li>"}<li><strong>GitHub (GitHub Pages):</strong> de hosting van deze website. GitHub legt bij elk bezoek technische gegevens vast, zoals uw IP-adres, voor beveiliging.</li>${cfg.formulierEndpoint && cfg.formulierdienst ? `<li><strong>${esc(cfg.formulierdienst)}:</strong> verstuurt de inhoud van het contactformulier naar onze mailbox.</li>` : ""}<li><strong>Onze boekhouder:</strong> voor de administratie.</li></ul>
<p>GitHub en Microsoft zijn Amerikaanse bedrijven; gegevens kunnen buiten de Europese Unie worden verwerkt. Verder delen wij gegevens alleen als de wet dat vereist.</p>
<h2>Cookies</h2>
<p>Deze website plaatst geen cookies en gebruikt geen tracking of statistieken.</p>
<h2>Uw rechten</h2>
<p>U kunt ons vragen om inzage, correctie of verwijdering van uw gegevens, of bezwaar maken tegen de verwerking. Stuur daarvoor een e-mail. Wij reageren binnen een maand. Komt u er met ons niet uit, dan kunt u een klacht indienen bij de Autoriteit Persoonsgegevens.</p>` });

  /* ---------- Algemene voorwaarden ---------- */
  const voorwaarden = tekst({ crumb: "Algemene voorwaarden", h1: "Algemene voorwaarden",
    lead: `Op onze offertes en werkzaamheden zijn de algemene voorwaarden van ${naam} van toepassing.`,
    body: `<h2>Ontvangst</h2>
<ul class="checks"><li>U ontvangt de volledige voorwaarden vóór het sluiten van de overeenkomst, als bijlage bij de offerte.</li><li>Wilt u ze eerder lezen? Stuur een e-mail naar ${mail}, dan ontvangt u ze kosteloos.</li></ul>
<h2>Bedenktijd voor particulieren</h2>
<p>Bij een overeenkomst op afstand of bij u thuis heeft u als particulier in veel gevallen 14 dagen bedenktijd. Bij een spoedreparatie op uw eigen verzoek geldt dit niet. De details staan in de voorwaarden en in de offerte.</p>
${cfg.garantieArbeid ? `<h2>Garantie</h2><p>Op ons installatiewerk geldt ${esc(cfg.garantieArbeid)} garantie. Op materialen geldt de garantie van de fabrikant.</p>\n` : ""}<h2>Bedrijfsgegevens</h2>
<ul class="checks"><li>${naam}, eenmanszaak${cfg.vestigingsplaats ? " in " + esc(cfg.vestigingsplaats) : ""}</li><li>KvK-nummer: ${esc(cfg.kvk)}</li>${cfg.btw ? `<li>Btw-id: ${esc(cfg.btw)}</li>` : ""}<li>E-mail: ${mail}</li></ul>` });

  const kaal = (h1, lead, extra, knop) => `<div class="phead" id="top"><div class="wrap"><h1>${h1}</h1><p class="lead">${lead}</p>${extra ? `<p class="lead">${extra}</p>` : ""}<div class="cta"><a class="btn" href="/">${knop}</a></div></div></div>
${related("")}`;
  const bedankt = kaal("Bedankt voor uw aanvraag", `Wij hebben uw bericht ontvangen. ${c.reactie}`, c.fotoRoute, "Terug naar de homepage");
  const nietGevonden = kaal("Deze pagina bestaat niet", "De pagina die u zoekt is verplaatst of bestaat niet meer.", "", "Naar de homepage");

  const H = cfg.handelsnaam;
  return [
    { path: "", form: true, body: home,
      title: `Elektricien Utrecht, Amersfoort en Amsterdam | ${H}`,
      desc: `Elektricien in Utrecht, Amersfoort, Amsterdam en omgeving. Meterkast, laadpaal, uitbreidingen en storingen. Eén vast aanspreekpunt en de prijs vooraf.` },
    { path: "meterkast/", form: true, dienst: "Meterkast / verdeelinrichting", service: "Meterkast, groepenkast of verdeelinrichting vervangen of uitbreiden", crumb: "Meterkast / verdeelinrichting", body: meterkast,
      title: `Meterkast vervangen Utrecht en Amersfoort | ${H}`,
      desc: `Meterkast, groepenkast of verdeelinrichting vervangen of uitbreiden in Utrecht, Amersfoort en Amsterdam. Lees wat de prijs bepaalt.` },
    { path: "laadpaal/", form: true, dienst: "Laadpaal", service: "Laadpaal installeren", crumb: "Laadpaal", body: laadpaal,
      title: `Laadpaal installateur Utrecht en Amersfoort | ${H}`,
      desc: `Laadpaal laten installeren in Utrecht, Amersfoort of omgeving? Eigen groep, juiste beveiliging en load balancing. Lees wat de prijs bepaalt.` },
    { path: "overige-elektrotechniek/", form: true, dienst: "Overige elektrotechniek", service: "Storingen, extra groepen en elektra bij verbouwing", crumb: "Elektra en storingen", body: overige,
      title: `Storing of extra groepen in regio Utrecht | ${H}`,
      desc: `Storing in huis, extra groepen, wandcontactdozen of elektra bij een verbouwing in Utrecht, Amersfoort en omgeving. Prijs vooraf in een offerte.` },
    { path: "thuisbatterij/", form: true, dienst: "Thuisbatterij", service: "Thuisbatterij installeren", crumb: "Thuisbatterij", body: thuisbatterij,
      title: `Thuisbatterij installeren Utrecht e.o. | ${H}`,
      desc: `Thuisbatterij laten installeren in Utrecht, Amersfoort of omgeving? Lees wat er na 1 januari 2027 verandert, voor wie het past en wat de prijs bepaalt.` },
    { path: "zakelijk/", form: true, dienst: "Zakelijke inhuur", type: "Bedrijf", service: "Elektromonteur inhuren als onderaannemer", crumb: "Zakelijk", body: zakelijk,
      title: `Elektromonteur inhuren als onderaannemer | ${H}`,
      desc: `Elektromonteur als onderaannemer en elektricien voor bedrijven. Gediplomeerd technicus met NEN 3140 VP. Per klus of project, in heel Nederland.` },
    { path: "privacyverklaring/", crumb: "Privacyverklaring", body: privacy,
      title: `Privacyverklaring | ${H}`,
      desc: `Privacyverklaring van ${H}: welke gegevens wij verwerken, waarvoor, hoe lang wij ze bewaren en wat uw rechten zijn.` },
    { path: "algemene-voorwaarden/", crumb: "Algemene voorwaarden", body: voorwaarden,
      title: `Algemene voorwaarden | ${H}`,
      desc: `Algemene voorwaarden van ${H}: hoe u ze ontvangt, bedenktijd voor particulieren en onze bedrijfsgegevens.` },
    { path: "bedankt/", noindex: true, body: bedankt, title: `Bedankt voor uw aanvraag | ${H}`, desc: "Uw aanvraag is ontvangen." },
    { path: "", file: "404.html", noindex: true, body: nietGevonden, title: `Pagina niet gevonden | ${H}`, desc: "Deze pagina bestaat niet." }
  ];
};
