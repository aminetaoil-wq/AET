// Alle paginateksten. Contactgegevens, regio en kwalificaties komen uit site.config.json.
// Na een wijziging: node tools/build.js
module.exports = function (c) {
  const { cfg, esc, mail, reviews, projecten, stedenTekst, stedenOmg } = c;
  const regio = esc(cfg.regio);
  const naam = esc(cfg.handelsnaam);
  const kwal = cfg.kwalificaties.map(esc);
  const crumb = `<a class="crumb" href="/">← Terug naar de homepage</a>`;
  const cta = d => `<div class="cta"><a class="btn" href="#offerte" data-dienst="${d}">Offerte aanvragen</a></div>`;
  const faq = items => items.map(([q, a]) => `<details><summary>${q}</summary><p>${a}</p></details>`).join("\n");
  const vanaf = k => cfg.vanafPrijs[k] ? `<p><strong>Richtprijs:</strong> vanaf ${esc(cfg.vanafPrijs[k])}. De exacte prijs staat in uw offerte.</p>` : "";
  const partner = cfg.partner.tonen && cfg.partner.naam
    ? `<p>Wij leveren en installeren batterijen van ${esc(cfg.partner.naam)}. Heeft u zelf al een batterij gekocht? Geef dat aan bij uw aanvraag.</p>`
    : `<p>Heeft u zelf al een batterij gekocht of op het oog? Geef het merk en type door bij uw aanvraag. Wij beoordelen of uw installatie erop is voorbereid en sluiten de batterij aan volgens de voorschriften van de fabrikant.</p>`;
  const docs = ["KvK-uittreksel", "Diploma en NEN 3140 VP-certificaat"]
    .concat(cfg.vca ? ["VCA-certificaat (" + esc(cfg.vca) + ")"] : [])
    .concat(cfg.verzekerd ? ["Polis aansprakelijkheidsverzekering"] : []);

  /* ---------- Homepage ---------- */
  const facts = ["Ingeschreven bij de KvK", "Mbo niveau 4 elektrotechniek", "NEN 3140 Vakbekwaam Persoon (VP)", "Werk volgens NEN 1010", "Prijs vooraf in de offerte"]
    .concat(cfg.verzekerd ? ["Verzekerd voor bedrijfsaansprakelijkheid"] : [])
    .concat(cfg.partner.tonen && cfg.partner.naam ? ["Partner van " + esc(cfg.partner.naam)] : [])
    .concat(cfg.reactietijd ? ["Reactie " + esc(cfg.reactietijd)] : []);

  const over = cfg.eigenaar
    ? `<h2>${esc(cfg.eigenaar)}, uw elektricien</h2>
<p>Ik ben ${esc(cfg.eigenaar)}, eigenaar van ${naam}. Ik beantwoord uw aanvraag, maak de offerte en voer het werk zelf uit. U heeft dus met één persoon te maken.</p>`
    : `<h2>Eén vakman, één aanspreekpunt</h2>
<p>${naam} is een eenmanszaak in elektrotechniek. Wie uw aanvraag beantwoordt, maakt ook de offerte en voert het werk uit. U heeft dus met één persoon te maken.</p>`;

  const homeFaq = [
    ["Kan mijn meterkast een thuisbatterij of laadpaal aan?", `Dat hangt af van uw aansluiting (1-fase of 3-fase), de waarde van uw hoofdzekering en de vrije ruimte in uw groepenkast. Een batterij en een laadpaal krijgen elk een eigen groep. Stuur een foto van uw meterkast mee, dan krijgt u een eerste inschatting. Meer uitleg staat op de pagina over de <a href="/meterkast/">meterkast</a>.`],
    ["Wat kost het?", `De prijs bestaat uit materiaal, arbeid en eventuele reiskosten. Wat het meeste verschil maakt: het toestel zelf (batterij of laadpaal), de lengte van de kabel, en of uw meterkast moet worden aangepast. U krijgt vooraf een offerte waarin deze posten apart staan. De offerte is vrijblijvend.`],
    ["In welke regio werkt u?", `Voor particulieren in ${regio}: ${cfg.steden.map(esc).join(", ")} en omliggende plaatsen. Voor bedrijven werken wij op projectbasis ook daarbuiten.`],
    ["Welke opleiding en certificering heeft u?", `Een afgeronde mbo-opleiding elektrotechniek op niveau 4 (crebo 25309) en een certificaat Vakbekwaam Persoon (VP) volgens NEN 3140. Wij werken volgens NEN 1010.`],
    ["Werkt u ook voor bedrijven en installatiebedrijven?", `Ja. U kunt ons inhuren als onderaannemer of op projectbasis. Op de pagina <a href="/zakelijk/">Zakelijk</a> staat wat u kunt inhuren en welke documenten u kunt opvragen.`]
  ].concat(cfg.garantieArbeid ? [["Welke garantie krijg ik?", `Op ons installatiewerk geldt ${esc(cfg.garantieArbeid)} garantie. Op materialen geldt de garantie van de fabrikant. De volledige regeling staat in de algemene voorwaarden die u bij de offerte ontvangt.`]] : []);

  const reviewsBlok = reviews.length ? `<section id="reviews"><div class="wrap">
<h2>Wat klanten zeggen</h2>
<div class="grid">${reviews.map(r => `<article class="card"><p>“${esc(r.tekst)}”</p><p class="small"><strong>${esc(r.naam)}</strong>${r.plaats ? ", " + esc(r.plaats) : ""}${r.klus ? " · " + esc(r.klus) : ""}</p></article>`).join("")}</div>
</div></section>\n\n` : "";
  const projectenBlok = projecten.length ? `<section id="projecten"><div class="wrap">
<h2>Uitgevoerd werk</h2>
<div class="grid">${projecten.map(p => `<article class="card">${p.fotos && p.fotos[0] ? `<img src="${esc(p.fotos[0].src)}" alt="${esc(p.fotos[0].alt)}" width="${p.fotos[0].w}" height="${p.fotos[0].h}" loading="lazy">` : ""}<h3>${esc(p.klus)} in ${esc(p.plaats)}</h3><p>${esc(p.beschrijving)}</p></article>`).join("")}</div>
</div></section>\n\n` : "";

  const home = `
<div class="hero" id="top"><div class="wrap">
<div class="eyebrow">Elektricien in ${stedenOmg(2)}</div>
<h1>Thuisbatterij, laadpaal of meterkast laten installeren in <em>${regio}</em></h1>
<p class="lead">Eén vakman uit de regio beoordeelt uw meterkast, maakt de offerte en voert het werk uit. U weet de prijs vooraf.${cfg.reactietijd ? " U krijgt " + esc(cfg.reactietijd) + " een reactie." : ""}</p>
<div class="cta"><a class="btn" href="#offerte">Offerte aanvragen</a><a class="btn ghost" href="#diensten">Bekijk de diensten</a></div>
<ul class="facts">${facts.map(f => `<li>${f}</li>`).join("")}</ul>
</div></div>

<section id="diensten"><div class="wrap">
<h2>Waar kunnen wij u mee helpen?</h2>
<p class="sub">Op elke pagina leest u wat wij controleren, hoe de klus verloopt en wat de prijs bepaalt.</p>
<div class="grid">
<article class="card"><div class="ico"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="7" width="16" height="10" rx="2"></rect><path d="M21 10v4M8 12h4M10 10v4"></path></svg></div><h3>Thuisbatterij</h3><p>Meer van uw eigen zonnestroom zelf gebruiken. Wij beoordelen of het bij uw verbruik past en installeren de batterij.</p><a class="more" href="/thuisbatterij/">Thuisbatterij laten installeren →</a></article>
<article class="card"><div class="ico"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 20V6a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v14M3 20h14M15 9h2a2 2 0 0 1 2 2v4a1.5 1.5 0 0 0 3 0V8l-3-3"></path><path d="M9 8l-2 4h4l-2 4"></path></svg></div><h3>Laadpaal</h3><p>Thuis of op uw bedrijfsterrein laden, op een eigen groep met de juiste beveiliging en zo nodig load balancing.</p><a class="more" href="/laadpaal/">Laadpaal laten installeren →</a></article>
<article class="card"><div class="ico"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="3" width="16" height="18" rx="2"></rect><path d="M8 8h3M8 12h3M8 16h3M14 8h2M14 12h2M14 16h2"></path></svg></div><h3>Meterkast</h3><p>Groepenkast vervangen of uitbreiden, zodat er ruimte is voor een laadpaal, batterij, inductie of warmtepomp.</p><a class="more" href="/meterkast/">Meterkast vernieuwen →</a></article>
<article class="card"><div class="ico"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.5 2.5-2.5-.5-.5-2.5z"></path></svg></div><h3>Overige elektrotechniek</h3><p>Een storing, extra groepen of elektra bij een verbouwing.</p><a class="more" href="/overige-elektrotechniek/">Overige werkzaamheden →</a></article>
</div>
<div class="notice"><strong>De salderingsregeling eindigt op 1 januari 2027.</strong> Vanaf die datum verrekent u teruggeleverde zonnestroom niet meer met uw eigen verbruik. U ontvangt er alleen nog een terugleververgoeding van uw energieleverancier voor. Met een thuisbatterij gebruikt u meer van uw eigen stroom zelf. Of dat bij u loont, hangt af van uw verbruik en installatie. <a href="/thuisbatterij/">Lees wat er verandert en voor wie een batterij past</a>.</div>
</div></section>

<section class="alt" id="werkwijze"><div class="wrap">
<h2>Zo werkt het</h2>
<p class="sub">U weet vooraf wat er gebeurt, wat het kost en wanneer wij komen.</p>
<ol class="steps">
<li><b>U vraagt een offerte aan</b><span>Vul het formulier in en stuur foto's van uw meterkast mee. Daarmee kunnen wij veel al op afstand beoordelen.</span></li>
<li><b>U krijgt een offerte</b><span>Met de werkzaamheden, het materiaal, de prijs en de planning. Vrijblijvend.</span></li>
<li><b>Wij installeren</b><span>Volgens NEN 1010, op een afgesproken dag. Meerwerk voeren wij alleen uit na uw akkoord.</span></li>
<li><b>Wij leveren op</b><span>Wij meten en testen de installatie en leggen uit hoe u alles gebruikt.</span></li>
</ol></div></section>

<section id="over"><div class="wrap two">
<div>${over}
<p>Kwalificaties:</p>
<ul class="checks">${kwal.map(k => `<li>${k}</li>`).join("")}<li>Ingeschreven bij de KvK onder nummer ${esc(cfg.kvk)}</li></ul>
${cfg.portret ? `<img class="portret" src="${esc(cfg.portret)}" alt="${esc(cfg.eigenaar || naam)}" width="480" height="480" loading="lazy">` : ""}</div>
<div><ul class="checks">
<li><b>Bent u particulier?</b> U krijgt uitleg in gewone taal, een offerte met prijs vooraf en vaste afspraken over de planning.</li>
<li><b>Bent u installateur of bedrijf?</b> U kunt ons inhuren als onderaannemer of op projectbasis. <a href="/zakelijk/">Bekijk de zakelijke pagina</a>.</li>
<li><b>Waar werken wij?</b> In ${regio}, rond ${stedenTekst(2)}. Eventuele reiskosten staan vooraf in de offerte.</li>
<li><b>Meerwerk.</b> Komt er tijdens het werk iets onverwachts naar voren, dan bespreken wij dat eerst met u.</li>
</ul></div></div></section>

<section class="alt" id="werkgebied"><div class="wrap">
<h2>Werkgebied: ${regio}</h2>
<p class="sub">Voor particulieren werken wij in de provincie Utrecht en de directe omgeving. Woont u net buiten deze regio? Neem contact op, dan bekijken wij of het past. Zakelijke projecten voeren wij ook elders in Nederland uit.</p>
<ul class="checks cols">${cfg.steden.map(s => `<li>${esc(s)}</li>`).join("")}<li>En omliggende plaatsen</li></ul>
</div></section>

${reviewsBlok}${projectenBlok}<section id="faq"><div class="wrap narrow">
<h2>Veelgestelde vragen</h2><p class="sub">Wat u vooraf waarschijnlijk wilt weten.</p>
${faq(homeFaq)}
</div></section>
`;

  /* ---------- Thuisbatterij ---------- */
  const thuisbatterij = `
<div class="page" id="top"><div class="wrap">${crumb}
<h1>Thuisbatterij laten installeren in ${regio}</h1>
<p class="lead2">Met een thuisbatterij slaat u zonnestroom op die u overdag niet gebruikt, en verbruikt u die 's avonds zelf. ${naam} beoordeelt of dat bij uw woning past en installeert de batterij in ${stedenOmg(4)}.</p>

<h2>Wat verandert er op 1 januari 2027?</h2>
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

<h2>Wat controleren wij aan uw installatie?</h2>
<ul class="checks">
<li><strong>Uw aansluiting.</strong> Heeft u 1-fase of 3-fase, en welke hoofdzekering? Dat bepaalt welk vermogen de batterij mag leveren en opnemen.</li>
<li><strong>Uw groepenkast.</strong> Een batterij krijgt een eigen groep met eigen beveiliging. Is daar geen ruimte voor, dan moet de <a href="/meterkast/">meterkast eerst worden uitgebreid</a>.</li>
<li><strong>Uw omvormer.</strong> Merk en type bepalen of de batterij aan de bestaande omvormer kan worden gekoppeld of een eigen omvormer nodig heeft.</li>
<li><strong>De plek.</strong> Droog, vorstvrij, goed bereikbaar en niet in een vluchtroute. Wij volgen de plaatsingsvoorschriften van de fabrikant.</li>
<li><strong>De meting.</strong> De batterij moet weten hoeveel stroom uw huis op elk moment gebruikt of teruglevert. Daarvoor plaatsen wij een energiemeter of koppelen wij de slimme meter.</li>
</ul>

<h2>1-fase of 3-fase</h2>
<p>Kleinere batterijen werken op één fase. Voor grotere vermogens is een 3-fase aansluiting nodig. Heeft u die niet, dan vraagt u een verzwaring aan bij uw netbeheerder via mijnaansluiting.nl. De netbeheerder past de aansluiting en de meter aan; wij passen daarna uw groepenkast aan. Weet u niet wat u heeft? Op een foto van uw meterkast is het meestal te zien.</p>

<h2>Zo verloopt de installatie</h2>
<ol class="steps">
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
<ul class="checks">
<li>De batterij zelf: capaciteit, vermogen en merk.</li>
<li>Aanpassingen aan uw meterkast, zoals een extra groep of een nieuwe groepenkast.</li>
<li>De afstand tussen meterkast en batterij, en hoe de kabel moet lopen.</li>
<li>De meting en de koppeling met uw omvormer.</li>
<li>Eventuele reiskosten.</li>
</ul>
${vanaf("thuisbatterij")}<p>In de offerte staan deze posten apart, zodat u ziet waar het bedrag uit bestaat.</p>

<h2>Veelgestelde vragen over thuisbatterijen</h2>
${faq([
    ["Kan een thuisbatterij ook zonder zonnepanelen?", "Technisch wel. De batterij laadt dan op uren waarop stroom goedkoop is en ontlaadt op dure uren. Dat heeft alleen zin met een dynamisch energiecontract. Of het uit kan, hangt af van de prijsverschillen op de markt."],
    ["Moet mijn meterkast worden aangepast?", "Vaak wel in beperkte mate: de batterij krijgt een eigen groep. Is uw kast vol of verouderd, dan is uitbreiden of vervangen nodig. Dat ziet u terug in de offerte."],
    ["Waar mag een thuisbatterij staan?", "Op een droge, vorstvrije plek die bereikbaar blijft, zoals een garage, bijkeuken of technische ruimte. Niet in een vluchtroute. De fabrikant schrijft voor welke afstanden en ondergrond nodig zijn."],
    ["Moet ik de batterij zelf aanmelden?", "Ja, u meldt de batterij aan op energieleveren.nl. Dat kost een paar minuten. De gegevens van de installatie krijgt u bij de oplevering."],
    ["Kan ik later meer capaciteit bijplaatsen?", "Bij veel systemen kan dat met extra modules. Het hangt af van merk en type. Wilt u die mogelijkheid openhouden, geef dat dan aan bij uw aanvraag."]
  ])}

<h2>Wat kunt u vooraf voorbereiden?</h2>
<ul class="checks"><li>Maak een foto van uw meterkast, met de deur open.</li><li>Noteer het merk en type van uw omvormer en het aantal zonnepanelen.</li><li>Zoek uw jaarlijkse verbruik en teruglevering op in uw energie-app of jaarafrekening.</li><li>Bedenk waar de batterij kan komen.</li></ul>
<p>Gaat u ook elektrisch rijden? Lees dan ook over de <a href="/laadpaal/">laadpaal</a>: laadpaal en batterij belasten dezelfde aansluiting.</p>
${cta("Thuisbatterij")}</div></div>`;

  /* ---------- Laadpaal ---------- */
  const laadpaal = `
<div class="page" id="top"><div class="wrap">${crumb}
<h1>Laadpaal laten installeren in ${regio}</h1>
<p class="lead2">Een laadpaal vraagt urenlang een hoog vermogen van uw installatie. ${naam} legt hem aan op een eigen groep met de juiste beveiliging, in ${cfg.steden.slice(0, 2).concat(cfg.steden.slice(4, 6)).map(esc).join(", ")} en omgeving.</p>

<h2>Wat doen wij?</h2>
<ul class="checks"><li>Wij beoordelen uw aansluiting en de vrije ruimte in uw groepenkast.</li><li>Wij leggen een eigen groep aan met de beveiliging die bij de laadpaal hoort.</li><li>Wij leggen de kabel van de meterkast naar de laadplek.</li><li>Wij monteren de laadpaal, stellen hem in en testen hem met een meting.</li><li>Wij leggen uit hoe u laadt en hoe u de paal bedient.</li></ul>

<h2>Eigen groep en beveiliging</h2>
<p>Een laadpaal hoort niet op een bestaande groep bij andere apparaten. Hij krijgt een eigen groep met een installatieautomaat en een aardlekbeveiliging die ook gelijkstroomlekken afschakelt. Bij sommige laadpalen zit die detectie ingebouwd; anders plaatsen wij het juiste type aardlekschakelaar in uw meterkast. Is daar geen ruimte voor, dan breiden wij eerst de <a href="/meterkast/">groepenkast</a> uit.</p>

<h2>1-fase of 3-fase: hoe snel laadt u?</h2>
<ul class="checks">
<li><strong>1-fase, 16 A:</strong> ongeveer 3,7 kW.</li>
<li><strong>1-fase, 32 A:</strong> ongeveer 7,4 kW, als uw aansluiting en uw auto dat toelaten.</li>
<li><strong>3-fase, 16 A:</strong> ongeveer 11 kW. Dit is bij woningen de meest gekozen uitvoering.</li>
</ul>
<p>Uw auto bepaalt mee hoe snel het gaat: de ingebouwde lader van de auto heeft een eigen maximum. Heeft u 1-fase en wilt u op 3-fase laden, dan vraagt u een verzwaring aan bij uw netbeheerder via mijnaansluiting.nl.</p>

<h2>Load balancing</h2>
<p>Als de auto laadt terwijl de oven, de wasdroger en de warmtepomp aanstaan, kan de hoofdzekering uitvallen. Load balancing voorkomt dat. Een meter in de meterkast meet het totale verbruik van uw huis en de laadpaal verlaagt de laadstroom zodra het te veel wordt. Bij de meeste woningen raden wij dit aan.</p>

<h2>De kabel naar de laadplek</h2>
<p>De route van de kabel bepaalt een groot deel van het werk. Wij bekijken de afstand, of de kabel door een muur of kruipruimte kan, en of er in de tuin of oprit moet worden gegraven. Buiten gaat de kabel in de grond op voldoende diepte en in een mantelbuis waar dat nodig is.</p>

<h2>Woont u in een appartement of huurt u?</h2>
<p>Dan is toestemming nodig van de VvE of de verhuurder. Regel dat vooraf, dan loopt de installatie geen vertraging op.</p>

<h2>Wat bepaalt de prijs?</h2>
<ul class="checks"><li>De laadpaal zelf, als u die via ons afneemt.</li><li>De lengte en de route van de kabel, inclusief eventueel graafwerk.</li><li>Aanpassingen aan de meterkast.</li><li>Load balancing.</li><li>Eventuele reiskosten.</li></ul>
${vanaf("laadpaal")}<p>Deze posten staan apart in uw offerte.</p>

<h2>Veelgestelde vragen over laadpalen</h2>
${faq([
    ["Kan ik niet gewoon aan een stopcontact laden?", "Incidenteel kan dat met de mobiele lader van uw auto, op ongeveer 2,3 kW. Een gewone wandcontactdoos en de groep erachter zijn niet bedoeld voor urenlange volle belasting, dag na dag. Voor dagelijks laden is een laadpaal op een eigen groep de veilige oplossing."],
    ["Ik heb zelf al een laadpaal gekocht. Sluit u die aan?", "Ja. Geef het merk en type door bij uw aanvraag, dan beoordelen wij welke beveiliging en bekabeling daarbij horen."],
    ["Heb ik 3-fase nodig?", "Niet altijd. Op 1-fase kunt u ook laden, alleen langzamer. Voor wie 's nachts laadt en geen grote afstanden rijdt, is dat vaak genoeg. Wij rekenen het met u door."],
    ["Kan de laadpaal samenwerken met mijn zonnepanelen?", "Veel laadpalen kunnen laden op het overschot van uw zonnepanelen. Of dat kan, hangt af van het model en de meting in uw meterkast. Meer over zelf gebruiken van zonnestroom leest u bij de <a href=\"/thuisbatterij/\">thuisbatterij</a>."]
  ])}

<h2>Wat kunt u vooraf voorbereiden?</h2>
<ul class="checks"><li>Maak een foto van uw meterkast, met de deur open.</li><li>Meet de afstand tussen de meterkast en de laadplek.</li><li>Geef aan of u zelf een laadpaal heeft of advies wilt.</li><li>Noteer het merk en type van uw auto.</li></ul>
${cta("Laadpaal")}</div></div>`;

  /* ---------- Meterkast ---------- */
  const meterkast = `
<div class="page" id="top"><div class="wrap">${crumb}
<h1>Meterkast vernieuwen of uitbreiden in ${regio}</h1>
<p class="lead2">Een laadpaal, thuisbatterij, inductieplaat of warmtepomp vraagt om een eigen groep. Is uw meterkast vol of verouderd, dan past dat er niet bij. ${naam} vervangt en breidt groepenkasten uit in ${cfg.steden.slice(0, 2).concat(cfg.steden.slice(6, 8)).map(esc).join(", ")} en omgeving.</p>

<h2>Wat doen wij?</h2>
<ul class="checks"><li>Wij vervangen uw groepenkast of breiden hem uit met extra groepen.</li><li>Wij plaatsen aardlekschakelaars en installatieautomaten volgens NEN 1010.</li><li>Wij maken uw kast geschikt voor 3-fase, als uw aansluiting dat is of wordt.</li><li>Wij meten de installatie na afloop door en testen de aardlekschakelaars.</li></ul>

<h2>Vervangen of uitbreiden?</h2>
<p><strong>Uitbreiden</strong> kan als uw kast in goede staat is en er ruimte is voor extra groepen. Dat is het minste werk.</p>
<p><strong>Vervangen</strong> is nodig als de kast te klein is, als onderdelen verouderd zijn of als de opbouw niet meer voldoet. In één keer vervangen is dan verstandiger dan een oude kast oplappen.</p>

<h2>Signalen dat uw meterkast aan vervanging toe is</h2>
<ul class="checks">
<li>Er zitten nog smeltpatronen (schroefstoppen) in plaats van automaten.</li>
<li>Er is geen aardlekschakelaar, of er hangen meer dan vier groepen aan één aardlekschakelaar.</li>
<li>Een groep valt regelmatig uit.</li>
<li>Er is geen vrije plek meer voor een extra groep.</li>
<li>Onderdelen worden warm, zijn verkleurd of u ruikt een brandlucht. Schakel in dat geval de groep uit en neem direct contact op.</li>
</ul>

<h2>Wat doet de netbeheerder en wat doen wij?</h2>
<p>De <strong>netbeheerder</strong> is eigenaar van de aansluitkabel, de hoofdzekering en de meter. Wilt u van 1-fase naar 3-fase of een zwaardere hoofdzekering, dan vraagt u dat aan via mijnaansluiting.nl. De netbeheerder voert dat uit en rekent daarvoor een eenmalig tarief dat per netbeheerder verschilt.</p>
<p><strong>Wij</strong> doen alles achter de meter: de hoofdschakelaar, de aardlekschakelaars, de groepen en de bedrading naar uw apparaten. Gaat uw aansluiting naar 3-fase, dan stemmen wij de planning af op de afspraak met de netbeheerder.</p>

<h2>Hoe lang duurt het?</h2>
<p>Een groepenkast in een woning vervangen is meestal binnen één werkdag klaar. Tijdens het werk heeft u geen stroom. Een enkele groep bijplaatsen gaat sneller. De planning staat in uw offerte.</p>

<h2>Wat bepaalt de prijs?</h2>
<ul class="checks"><li>Het aantal groepen en aardlekschakelaars.</li><li>1-fase of 3-fase.</li><li>De staat van de bestaande bedrading en aarding.</li><li>Extra groepen voor bijvoorbeeld een <a href="/laadpaal/">laadpaal</a> of <a href="/thuisbatterij/">thuisbatterij</a>.</li><li>Eventuele reiskosten.</li></ul>
${vanaf("meterkast")}<p>Deze posten staan apart in uw offerte.</p>

<h2>Veelgestelde vragen over de meterkast</h2>
${faq([
    ["Hoe weet ik of ik 1-fase of 3-fase heb?", "Dat staat op uw meter (bijvoorbeeld 1x35 A of 3x25 A) en is te zien aan de hoofdschakelaar. Stuur een foto mee met uw aanvraag, dan zien wij het direct."],
    ["Heb ik 3-fase nodig voor inductie, een laadpaal of een warmtepomp?", "Niet altijd. Het hangt af van het vermogen van de apparaten en wat er tegelijk aanstaat. Veel inductieplaten werken op twee groepen van één fase. Voor laden op 11 kW is 3-fase wel nodig."],
    ["Kost een 3-fase aansluiting meer vastrecht?", "Tot en met 3x25 A valt u in dezelfde tariefgroep als de gangbare 1-fase aansluiting. De netbeheerder rekent wel eenmalige kosten voor het ombouwen. De actuele bedragen staan op de website van uw netbeheerder."],
    ["Moet de hele kast eruit als ik één groep extra wil?", "Nee, als er ruimte is en de kast in orde is, plaatsen wij alleen een groep bij."]
  ])}

<h2>Wat kunt u vooraf voorbereiden?</h2>
<ul class="checks"><li>Maak een foto van uw meterkast, met de deur open.</li><li>Noteer wat u wilt gaan aansluiten.</li><li>Zorg dat de meterkast vrij bereikbaar is.</li></ul>
${cta("Meterkast")}</div></div>`;

  /* ---------- Overige ---------- */
  const overige = `
<div class="page" id="top"><div class="wrap">${crumb}
<h1>Elektricien in ${stedenOmg(2)}</h1>
<p class="lead2">Naast thuisbatterijen, laadpalen en meterkasten kunt u ${naam} inschakelen voor ander elektrotechnisch werk in ${regio}.</p>
<h2>Waarvoor kunt u ons inschakelen?</h2>
<ul class="checks"><li>Storingen in uw installatie opsporen en verhelpen.</li><li>Extra groepen, wandcontactdozen en aansluitpunten aanleggen.</li><li>Elektra bij een verbouwing of uitbreiding.</li><li>Aansluiten van een inductieplaat, boiler of ander apparaat op een eigen groep.</li></ul>
<h2>Meer over de hoofddiensten</h2>
<ul class="checks"><li><a href="/thuisbatterij/">Thuisbatterij laten installeren</a></li><li><a href="/laadpaal/">Laadpaal laten installeren</a></li><li><a href="/meterkast/">Meterkast vernieuwen of uitbreiden</a></li></ul>
<h2>Wat kunt u vooraf voorbereiden?</h2>
<ul class="checks"><li>Beschrijf wat er gebeurt en sinds wanneer.</li><li>Maak een foto van uw meterkast.</li><li>Noteer wat u zelf al heeft geprobeerd.</li></ul>
${cta("Overige elektrotechniek")}</div></div>`;

  /* ---------- Zakelijk ---------- */
  const zakelijk = `
<div class="page" id="top"><div class="wrap">${crumb}
<h1>Elektromonteur inhuren als onderaannemer</h1>
<p class="lead2">Voor installatiebedrijven en leveranciers van laadpalen, thuisbatterijen en zonnestroomsystemen. U huurt een zelfstandige vakman in die de elektrotechnische installatie afmaakt, per klus of per project.</p>
<h2>Wat kunt u inhuren?</h2>
<ul class="checks"><li>Installatie en aansluiting van thuisbatterijen.</li><li>Montage en aansluiting van laadpalen, inclusief load balancing.</li><li>Groepenkasten vervangen en uitbreiden.</li><li>Ondersteuning bij elektrotechnisch werk in woningbouw en utiliteit.</li></ul>
<h2>Werkgebied en beschikbaarheid</h2>
<p>Zakelijke opdrachten voeren wij uit in heel Nederland, op projectbasis.${cfg.beschikbaarheidZakelijk ? " Beschikbaarheid: " + esc(cfg.beschikbaarheidZakelijk) + "." : " Vraag naar de beschikbaarheid in de periode die u nodig heeft."}</p>
<h2>Kwalificaties</h2>
<ul class="checks">${kwal.map(k => `<li>${k}</li>`).join("")}<li>Werk volgens NEN 1010</li></ul>
<h2>Documenten op aanvraag</h2>
<ul class="checks">${docs.map(d => `<li>${d}</li>`).join("")}</ul>
<h2>Afspraken</h2>
<p>Vooraf leggen wij vast wat de opdracht is, wie het materiaal levert, het tarief en hoe meerwerk wordt gemeld.</p>
${cta("Zakelijke inhuur")}</div></div>`;

  /* ---------- Privacy ---------- */
  const privacy = `
<div class="page" id="top"><div class="wrap">${crumb}
<h1>Privacyverklaring</h1>
<p class="lead2">Laatst bijgewerkt: november 2026. Hier leest u hoe ${naam} met uw gegevens omgaat.</p>
<h2>Wie is verantwoordelijk?</h2>
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
<p>U kunt ons vragen om inzage, correctie of verwijdering van uw gegevens, of bezwaar maken tegen de verwerking. Stuur daarvoor een e-mail. Wij reageren binnen een maand. Komt u er met ons niet uit, dan kunt u een klacht indienen bij de Autoriteit Persoonsgegevens.</p>
</div></div>`;

  /* ---------- Algemene voorwaarden ---------- */
  const voorwaarden = `
<div class="page" id="top"><div class="wrap">${crumb}
<h1>Algemene voorwaarden</h1>
<p class="lead2">Op onze offertes en werkzaamheden zijn de algemene voorwaarden van ${naam} van toepassing.</p>
<h2>Ontvangst</h2>
<ul class="checks"><li>U ontvangt de volledige voorwaarden vóór het sluiten van de overeenkomst, als bijlage bij de offerte.</li><li>Wilt u ze eerder lezen? Stuur een e-mail naar ${mail}, dan ontvangt u ze kosteloos.</li></ul>
<h2>Bedenktijd voor particulieren</h2>
<p>Bij een overeenkomst op afstand of bij u thuis heeft u als particulier in veel gevallen 14 dagen bedenktijd. Bij een spoedreparatie op uw eigen verzoek geldt dit niet. De details staan in de voorwaarden en in de offerte.</p>
${cfg.garantieArbeid ? `<h2>Garantie</h2><p>Op ons installatiewerk geldt ${esc(cfg.garantieArbeid)} garantie. Op materialen geldt de garantie van de fabrikant.</p>\n` : ""}<h2>Bedrijfsgegevens</h2>
<ul class="checks"><li>${naam}, eenmanszaak${cfg.vestigingsplaats ? " in " + esc(cfg.vestigingsplaats) : ""}</li><li>KvK-nummer: ${esc(cfg.kvk)}</li>${cfg.btw ? `<li>Btw-id: ${esc(cfg.btw)}</li>` : ""}<li>E-mail: ${mail}</li></ul>
</div></div>`;

  const bedankt = `
<div class="page" id="top"><div class="wrap"><h1>Bedankt voor uw aanvraag</h1><p class="lead2">Wij hebben uw bericht ontvangen. ${c.reactie}</p><p>${c.fotoRoute}</p><div class="cta"><a class="btn" href="/">Terug naar de homepage</a></div></div></div>`;
  const nietGevonden = `
<div class="page" id="top"><div class="wrap"><h1>Deze pagina bestaat niet</h1><p class="lead2">De pagina die u zoekt is verplaatst of bestaat niet meer.</p><div class="cta"><a class="btn" href="/">Naar de homepage</a></div></div></div>`;

  return [
    { path: "", form: true, body: home,
      title: `Thuisbatterij, laadpaal, meterkast Utrecht | ${cfg.handelsnaam}`,
      desc: `${cfg.handelsnaam} installeert thuisbatterijen, laadpalen en meterkasten in Utrecht, Amersfoort en omgeving. Eén vakman, prijs vooraf. Vraag een offerte aan.` },
    { path: "thuisbatterij/", form: true, dienst: "Thuisbatterij", service: "Thuisbatterij installeren", crumb: "Thuisbatterij", body: thuisbatterij,
      title: `Thuisbatterij installeren Utrecht e.o. | ${cfg.handelsnaam}`,
      desc: `Thuisbatterij laten installeren in Utrecht, Amersfoort of omgeving? Lees wat er na 1 januari 2027 verandert, voor wie het past en wat de prijs bepaalt.` },
    { path: "laadpaal/", form: true, dienst: "Laadpaal", service: "Laadpaal installeren", crumb: "Laadpaal", body: laadpaal,
      title: `Laadpaal installeren Utrecht en Amersfoort | ${cfg.handelsnaam}`,
      desc: `Laadpaal laten installeren in Utrecht, Amersfoort of omgeving? Eigen groep, juiste beveiliging en load balancing. Lees wat de prijs bepaalt.` },
    { path: "meterkast/", form: true, dienst: "Meterkast", service: "Meterkast vernieuwen en uitbreiden", crumb: "Meterkast", body: meterkast,
      title: `Meterkast vernieuwen Utrecht en Amersfoort | ${cfg.handelsnaam}`,
      desc: `Meterkast vernieuwen of uitbreiden in Utrecht, Amersfoort of omgeving? Lees wanneer vervangen nodig is en wat de netbeheerder doet.` },
    { path: "overige-elektrotechniek/", form: true, dienst: "Overige elektrotechniek", service: "Elektrotechnische werkzaamheden", crumb: "Overige elektrotechniek", body: overige,
      title: `Elektricien Utrecht en Amersfoort | ${cfg.handelsnaam}`,
      desc: `Elektricien nodig in Utrecht, Amersfoort of omgeving? ${cfg.handelsnaam} lost storingen op, legt extra groepen aan en verzorgt elektra bij verbouwingen.` },
    { path: "zakelijk/", form: true, dienst: "Zakelijke inhuur", type: "Bedrijf", service: "Elektromonteur inhuren als onderaannemer", crumb: "Zakelijk", body: zakelijk,
      title: `Elektromonteur inhuren als onderaannemer | ${cfg.handelsnaam}`,
      desc: `Onderaannemer voor laadpalen, thuisbatterijen en groepenkasten. Mbo 4 elektrotechniek en NEN 3140 VP. In heel Nederland op projectbasis.` },
    { path: "privacyverklaring/", crumb: "Privacyverklaring", body: privacy,
      title: `Privacyverklaring | ${cfg.handelsnaam}`,
      desc: `Privacyverklaring van ${cfg.handelsnaam}: welke gegevens wij verwerken, waarvoor, hoe lang wij ze bewaren en wat uw rechten zijn.` },
    { path: "algemene-voorwaarden/", crumb: "Algemene voorwaarden", body: voorwaarden,
      title: `Algemene voorwaarden | ${cfg.handelsnaam}`,
      desc: `Algemene voorwaarden van ${cfg.handelsnaam}: hoe u ze ontvangt, bedenktijd voor particulieren en onze bedrijfsgegevens.` },
    { path: "bedankt/", noindex: true, body: bedankt, title: `Bedankt voor uw aanvraag | ${cfg.handelsnaam}`, desc: "Uw aanvraag is ontvangen." },
    { path: "", file: "404.html", noindex: true, body: nietGevonden, title: `Pagina niet gevonden | ${cfg.handelsnaam}`, desc: "Deze pagina bestaat niet." }
  ];
};
