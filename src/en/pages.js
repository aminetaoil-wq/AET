// English page texts. Mirrors src/pages.js (Dutch); every page has id = the Dutch path so the language switch and hreflang link the pair.
// After a change: node tools/build.js
module.exports = function (c) {
  const { cfg, esc, mail, tel, wa, reviews, projecten, stedenTekst, stedenOmg, ico, foto, logo, logos } = c;
  const naam = esc(cfg.handelsnaam);
  const kb = require("./kennisbank.js")(c);
  const nlKey = k => c.nl.dd.byKey[k].url.slice(1); // Dutch path of a service = its id

  /* ---------- Building blocks ---------- */
  const faq = items => items.map(([q, a]) => `<details><summary>${q}</summary><p>${a}</p></details>`).join("\n");
  const tiles = items => `<ul class="tiles">${items.map(([i, t]) => `<li>${ico(i)}<span>${t}</span></li>`).join("")}</ul>`;
  const icards = items => `<ul class="icards">${items.map(([i, t, d]) => `<li><span class="ic">${ico(i)}</span><b>${t}</b><p>${d}</p></li>`).join("")}</ul>`;
  const callout = t => `<div class="callout">${ico("alert")}<p>${t}</p></div>`;
  const vanaf = k => cfg.vanafPrijs[k] ? `<p><strong>Guide price:</strong> from ${esc(cfg.vanafPrijs[k])}. The exact price is in your quote.</p>` : "";
  const phead = (o, knop) => `<div class="phead${o.foto ? " has-foto" : ""}" id="top">${o.foto ? foto(o.foto, "hero", { cls: "bg", eager: true }) : ""}<div class="wrap">
<ol class="crumbs"><li><a href="/en/">Home</a></li>${(o.crumbs || [[o.crumb]]).map(k => k[1] ? `<li><a href="${k[1]}">${k[0]}</a></li>` : `<li>${k[0]}</li>`).join("")}</ol>
<h1>${o.h1}</h1>
<p class="lead">${o.lead}</p>
${knop ? `<div class="cta"><a class="btn" href="#offerte">${o.knop || "Book an appointment"}</a>${o.geenTerug ? "" : `<a class="btn ghost" href="/en/contact/#callback">Call me back</a>`}</div>` : ""}
</div></div>`;
  const { groepen, diensten: DL, byKey } = c.dd;
  const rel = d => `<a class="rel" href="${d.url}"><span class="ic">${ico(d.icon)}</span>${d.menu}<span class="arr">${ico("arrow")}</span></a>`;
  const related = (keys, titel) => `<div class="related"><div class="wrap">
<h2>${titel || "Related services"}</h2>
<div class="grid">${keys.map(k => rel(byKey[k])).join("")}</div>
</div></div>`;
  const groepRelated = `<div class="related"><div class="wrap">
<h2>Our services</h2>
<div class="grid">${groepen.map(g => `<a class="rel" href="${g.url}"><span class="ic">${ico(g.icon)}</span>${g.label}<span class="arr">${ico("arrow")}</span></a>`).join("")}<a class="rel" href="/en/home-battery/"><span class="ic">${ico("batterij")}</span>Home battery<span class="arr">${ico("arrow")}</span></a></div>
</div></div>`;
  const side = (kort, knop) => `<aside class="side" aria-label="In brief">
<h2>In brief</h2>
<ul class="checks">${kort.map(k => `<li>${k}</li>`).join("")}</ul>
<a class="btn" href="#offerte">${knop || "Book an appointment"}</a>
<a class="btn line" href="/en/contact/#callback">Call me back</a>
<div class="sidec"><a href="mailto:${esc(cfg.email)}">${ico("mail")}${esc(cfg.email)}</a></div>
</aside>`;
  const meerLezen = slugs => `\n<h2>Read more in the knowledge base</h2>\n<ul class="checks">${slugs.map(x => `<li><a href="${kb.bySlug[x].url}">${kb.bySlug[x].h1}</a></li>`).join("")}</ul>`;
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
  const normen = `<p>Every installation is carried out to NEN 1010 and tested before handover. The work is carried out by a qualified and experienced NEN 3140 Qualified Person (Vakbekwaam Persoon). <a href="/en/standards/">More about our standards and how we work</a>.</p>`;
  // Brand block per RONDE3 3a: only "We work with", never suggesting a relationship with the brand.
  const merkenBlok = `<section class="merken" aria-labelledby="merken-h"><div class="wrap">
<h2 id="merken-h">We work with</h2>
<ul class="merkrij">${["Hager", "ABB", "Schneider Electric"].map(m => `<li>${logo(m, 40)}</li>`).join("")}</ul>
<p class="small">${naam} is an independent installation company. Brand names and logos are the property of their respective manufacturers.</p>
</div></section>`;
  const normLogo = (n, h) => logo(n, h, false);
  const docs = ["Chamber of Commerce (KvK) extract", "Diploma and NEN 3140 VP certificate"]
    .concat(cfg.vca ? ["VCA certificate (" + esc(cfg.vca) + ")"] : [])
    .concat(cfg.verzekerd ? ["Liability insurance policy"] : []);

  /* ---------- Service pages (data in src/en/diensten.js) ---------- */
  const dienstPagina = d => {
    const g = groepen.find(x => x.key === d.groep);
    const ouder = d.key === "zakelijk-verrekenen" ? ["EV charger installation", "/en/ev-charger/"] : g.overzicht ? [g.label, g.url] : null;
    const body = `${phead({ crumbs: (ouder ? [ouder] : []).concat([[d.menu]]), h1: d.h1, lead: d.lead, foto: d.foto }, true)}
<div class="wrap layout"><div class="prose">
<h2>When do you need this?</h2>
<ul class="checks">${d.wanneer.map(x => `<li>${x}</li>`).join("")}</ul>

<h2>How we go about it</h2>
<ol class="steps v">${d.stappen.map(([t, x]) => `<li><b>${t}</b><span>${x}</span></li>`).join("")}</ol>

${d.secties.map(([t, x]) => `<h2>${t}</h2>\n${x}`).join("\n\n")}

<h2>What is included?</h2>
<ul class="checks">${d.inbegrepen.map(x => `<li>${x}</li>`).join("")}</ul>

<h2>What does the price depend on?</h2>
${tiles(d.prijs)}
${d.prijsKey ? vanaf(d.prijsKey) : ""}<p>You receive a no-obligation quote with a fixed price in advance, with these items listed separately. Extra work only with your approval.</p>

<h2>Safety and standards</h2>
<p>${d.veilig}</p>
${normen}

<h2>Frequently asked questions</h2>
${faq(d.vragen)}
${meerLezen(d.lezen)}
</div>
${side(d.kort)}</div>
${d.groep === "meterkast" ? merkenBlok + "\n" : ""}${related(d.verwant)}`;
    return { id: nlKey(d.key), path: d.url.slice(1), form: true, preload: d.foto, dienst: d.formOptie, service: d.service, crumb: d.menu, trail: ouder ? [ouder] : [], body, title: `${d.title} | ${cfg.handelsnaam}`, desc: d.desc };
  };

  const groepKaart = d => `<a class="svc" href="${d.url}"><span class="ic">${ico(d.icon)}</span><h3>${d.menu}</h3><p>${d.kaart}</p><span class="more">More about ${d.menu.toLowerCase()}${ico("arrow")}</span></a>`;

  /* ---------- Overview: electrical work ---------- */
  const gE = groepen.find(g => g.key === "elektra"), gM = groepen.find(g => g.key === "meterkast");
  const elektraOverzicht = svc({ crumb: "Electrical work", foto: "elektra-lasdoos",
    h1: "Electrical work in Utrecht, Amersfoort and Amsterdam",
    lead: `New wiring during a renovation, a kitchen that needs to be ready for induction, or lighting indoors and in the garden. ${naam} installs the wiring, finishes everything neatly and hands over the work tested. You know the cost in advance.`,
    kort: ["Renovation, kitchen, lighting and garden", "Coordinated with your contractor", "Tested at handover", "Price in advance, extra work only with approval"],
    body: `<h2>How we can help</h2>
<div class="grid two">${gE.items.map(groepKaart).join("")}</div>

<h2>Electrical work in commercial buildings</h2>
<p>We also install wiring in offices, shops and business premises, from extra circuits to lighting. For projects in commercial buildings and for installation companies looking for capacity, see <a href="/en/business/#commercial-buildings">commercial buildings</a>.</p>

<h2>Do it right the first time</h2>
<p>Wiring is best installed while walls and floors are open anyway. Chasing, drilling and re-plastering afterwards costs more time and money. That is why we think ahead: where the sockets and switches go, which appliances get their own circuit, and whether the fuse box has room for what you may want later, such as an EV charger or home battery.</p>

<h2>How the work goes</h2>
<ol class="steps v"><li><b>Request</b><span>You describe what you want and send a drawing, sketch or photos.</span></li><li><b>Quote</b><span>You receive a no-obligation quote with the work, the materials and a fixed price.</span></li><li><b>Installation</b><span>We install the wiring at the agreed times, coordinated with your contractor.</span></li><li><b>Handover</b><span>We test the installation and go through the result with you.</span></li></ol>

<h2>Safety and standards</h2>
${normen}` });

  /* ---------- Overview: fuse box ---------- */
  const meterkastOverzicht = svc({ crumb: "Fuse box", foto: "groepenkast-abb", lezen: ["wat-zit-er-in-mijn-meterkast", "meterkast-geschikt-laadpaal-thuisbatterij", "1-fase-of-3-fase"],
    h1: "Meter cupboard and fuse box in Utrecht, Amersfoort and Amsterdam",
    lead: `Want to connect an EV charger, induction hob or home battery? Then each of those appliances needs its own circuit. A full or outdated meter cupboard (meterkast) has no room for that. ${naam} replaces, extends and prepares for three-phase, in homes and commercial buildings.`,
    kort: ["Replacement, extension or an extra circuit", "Three-phase preparation", "Built and tested to NEN 1010", "Usually finished within one working day"],
    body: `<h2>How we can help</h2>
<div class="grid two">${gM.items.map(groepKaart).join("")}</div>

<h2>Meter cupboard, fuse box or distribution board?</h2>
<p>It is the same part. In a home it is usually called the meter cupboard (meterkast) or fuse box (groepenkast). In a commercial building it is a distribution board: larger, often three-phase and with more circuits. We work on both.</p>

<h2>How to recognise an outdated meter cupboard</h2>
<ul class="checks"><li>You still have screw-in fuses instead of circuit breakers.</li><li>There is no residual current device (RCD), or more than four circuits are connected to one RCD.</li><li>The same circuit trips regularly.</li><li>There is no room left for an extra circuit.</li></ul>
${callout("<strong>Are parts getting warm, discoloured, or do you smell burning?</strong> Then switch the circuit off and have the fuse box checked.")}

<h2>What does the grid operator do, and what do we do?</h2>
<p>The grid operator owns the service cable, the main fuse and the meter. You apply for a heavier connection or three-phase via mijnaansluiting.nl. Everything behind the meter is our work: main switch, RCDs, circuits and wiring.</p>

<h2>Having your meter cupboard assessed</h2>
<p>A lot can be assessed remotely from a photo. Send a photo of the fuse box with the door open, what you want to connect and your postcode with your request.</p>
${normen}` });

  /* ---------- Homepage ---------- */
  const kern = [["tag", "Fixed price in advance", ""], ["shield", "Qualified and experienced NEN&nbsp;3140 Qualified Person", "", "NEN 3140"], ["doc", "Works to NEN&nbsp;1010", "", "NEN 1010"], ["gauge", "Tested at handover", ""]]
    .concat(cfg.reactietijd ? [["clock", "Response " + esc(cfg.reactietijd), "To every request"]] : []);

  const homeFaq = [
    ["Is my meter cupboard ready for an EV charger, induction hob or home battery?", `That depends on your connection (single-phase or three-phase), the rating of your main fuse and the free space in your fuse box. Appliances with a high power rating each get their own circuit. Send a photo of your meter cupboard and you will receive a first assessment. More on the <a href="/en/fuse-box/">fuse box</a> page.`],
    ["What does an electrician cost?", `That differs per job. The price consists of materials, labour and any travel costs. The number of circuits or connection points, the length of the cables and changes to your fuse box make up most of it. You receive a no-obligation quote with a fixed price in advance.`],
    ["Do you give a guarantee?", `Yes. ${naam} gives a 12-month guarantee on the work carried out, from handover: defects caused by the workmanship are put right free of charge. On materials such as fuse boxes, circuit breakers, EV chargers and home batteries, the manufacturer's guarantee applies; we arrange it for you if something is wrong. The full conditions are in our <a href="/en/terms-and-conditions/">terms and conditions</a>.`],
    ["What happens if extra work is needed?", `If something unexpected comes up during the work, we discuss it with you first. We only carry out extra work with your approval.`],
    ["Can you call me instead of me calling you?", `Yes. Leave your name, phone number and preferred time via a <a href="/en/contact/#callback">callback request</a>, and we will call you back.`],
    ["Which area do you cover?", `For private customers: ${cfg.steden.map(esc).join(", ")} and surrounding towns. Business: nationwide, per project.`],
    [`What qualifications does ${naam} have?`, `The work of ${naam} is carried out by a qualified and experienced NEN 3140 Qualified Person (Vakbekwaam Persoon). Every installation is carried out to NEN 1010, the standard for electrical installations in the Netherlands. At handover we measure and test everything.`],
    ["Do you also work as a subcontractor?", `Yes, for installation companies and for suppliers of home batteries and EV chargers, per job or per project. See <a href="/en/business/">Business</a>.`]
  ].concat(cfg.startTermijn ? [["How soon can you start?", esc(cfg.startTermijn)]] : []);

  const reviewsBlok = reviews.length ? `<section id="reviews"><div class="wrap">
<div class="shead"><span class="kicker">Experiences</span><h2>What customers say</h2></div>
<div class="grid">${reviews.slice(0, 2).map(r => `<article class="card"><p>“${esc(r.tekst)}”</p><p class="small"><strong>${esc(r.naam)}</strong>${r.plaats ? ", " + esc(r.plaats) : ""}${r.klus ? " · " + esc(r.klus) : ""}</p></article>`).join("")}</div>
</div></section>\n\n` : "";
  const projectKaart = p => `<article class="card">${p.fotos && p.fotos[0] ? `<img src="${esc(p.fotos[0].src)}" alt="${esc(p.fotos[0].alt_en || p.fotos[0].alt)}" width="${p.fotos[0].w}" height="${p.fotos[0].h}" loading="lazy">` : ""}<h3>${esc(p.klus_en || p.klus)} in ${esc(p.plaats)}</h3><p>${esc(p.opdracht_en || p.opdracht || p.beschrijving || "")}</p>${p.werkzaamheden && p.werkzaamheden.length ? `<ul class="checks">${(p.werkzaamheden_en || p.werkzaamheden).map(w => `<li>${esc(w)}</li>`).join("")}</ul>` : ""}${p.bijzonderheden ? `<p>${esc(p.bijzonderheden_en || p.bijzonderheden)}</p>` : ""}${p.resultaat ? `<p><strong>Result:</strong> ${esc(p.resultaat_en || p.resultaat)}</p>` : ""}</article>`;
  const projectenBlok = projecten.length ? `<section id="projects"><div class="wrap">
<div class="shead"><span class="kicker">Projects</span><h2>Completed work</h2></div>
<div class="grid">${projecten.slice(0, 3).map(projectKaart).join("")}</div>
${projecten.length > 3 ? `<div class="cta"><a class="btn line" href="/en/projects/">All projects</a></div>` : ""}
</div></section>\n\n` : "";

  const groepBlok = g => `<article class="card groep">${g.foto ? `<div class="kfoto">${foto(g.foto, "kaart")}</div>` : `<span class="ic">${ico(g.icon)}</span>`}<h3><a href="${g.url}">${g.label}</a></h3><p>${g.intro}</p>
<ul class="links">${g.items.filter(d => !d.uitgelicht).map(d => `<li><a href="${d.url}">${d.menu}${ico("arrow")}</a></li>`).join("")}${g.key === "elektra" ? `<li><a href="/en/business/#commercial-buildings">Commercial buildings${ico("arrow")}</a></li>` : ""}</ul></article>`;
  const tb = byKey.thuisbatterij;

  const home = `
<div class="hero has-foto" id="top">${foto("groepenkast-abb", "hero", { cls: "bg", eager: true })}<div class="wrap">
<div>
<div class="eyebrow">Electrical installations · Utrecht · Amersfoort · Amsterdam</div>
<h1>Electrical work, properly arranged.<br><em>From fuse box to home battery.</em></h1>
<p class="lead"><strong>Skilled installation. Clear agreements. One point of contact.</strong> Electrical installation work, fuse boxes, EV chargers and complete home battery installations, for private and business customers.${cfg.reactietijd ? " You will hear from us " + esc(cfg.reactietijd) + "." : ""}</p>
<div class="cta"><a class="btn" href="#offerte">Book an appointment</a><a class="btn ghost" href="/en/contact/#callback">Call me back</a></div>
</div>
</div></div>

<div class="trust"><div class="wrap"><ul class="k${kern.length}">
${kern.map(t => `<li>${(t[3] && normLogo(t[3], 40)) || `<span class="ic">${ico(t[0])}</span>`}<span><b>${t[1]}</b>${t[2] ? `<span>${t[2]}</span>` : ""}</span></li>`).join("\n")}
</ul></div></div>

<section id="over"><div class="wrap two">
<div><span class="kicker">About ${naam}</span>
<h2>An electrician who tells you the price in advance</h2>
<p class="sub">${naam} carries out electrical installations for private customers and provides capacity as a subcontractor. We install wiring, replace and extend fuse boxes, and install EV chargers and home batteries. You get a fixed price in advance, one point of contact and an installation that is tested at handover.</p>
<div class="cta"><a class="btn" href="/en/contact/#callback">Call me back</a><a class="btn line" href="/en/about/">More about ${naam}</a></div>
</div>
<div class="card"><h3>Why ${naam}</h3>
<ul class="checks"><li>Qualified and experienced NEN 3140 Qualified Person</li><li>Works to NEN 1010</li>${cfg.erkendLeerbedrijf ? `<li>SBB-accredited training company, <a href="/en/internship/">internships</a></li>` : ""}<li>Extra work only with your approval</li></ul></div>
</div></section>

<section class="alt" id="keurmerk"><div class="wrap">
<div class="shead"><span class="kicker">Standards</span><h2>Safe work to the applicable standards</h2>
<p class="sub">Two standards determine how we work: how an installation must be built, and how to work on it safely.</p></div>
<div class="grid two">
<article class="card">${normLogo("NEN 3140", 64) || `<span class="ic">${ico("shield")}</span>`}<h3>NEN 3140</h3><p>The standard for working safely on and managing electrical installations. The work of ${naam} is carried out by a qualified and experienced NEN 3140 Qualified Person (Vakbekwaam Persoon).</p></article>
<article class="card">${normLogo("NEN 1010", 64) || `<span class="ic">${ico("doc")}</span>`}<h3>NEN 1010</h3><p>The standard with the safety requirements for designing and installing low-voltage installations, such as the wiring in your home or commercial building. Every installation is carried out to NEN 1010 and tested before handover.</p></article>
</div>
<div class="cta"><a class="btn line" href="/en/standards/">Read more about our standards</a></div>
</div></section>

<section id="diensten"><div class="wrap">
<div class="shead"><span class="kicker">Services</span><h2>Electrical work for homes and businesses</h2>
<p class="sub">For every service you can read what we do, how the work goes and what the price depends on.</p></div>
<a class="uitgelicht" href="${tb.url}"><span class="ic">${ico("batterij")}</span><span><span class="kicker">Featured</span><b>${tb.menu}</b><span>${tb.kaart} First we work out whether a battery suits your consumption.</span></span><span class="more">See how it works${ico("arrow")}</span></a>
<div class="grid three">
${groepen.map(groepBlok).join("\n")}
</div>
</div></section>

<section class="alt" id="how-we-work"><div class="wrap">
<div class="shead"><span class="kicker">How we work</span><h2>From request to handover</h2>
<p class="sub">Four steps, with clarity about the work, price and planning in advance.</p></div>
<ol class="steps">
<li><b>Request</b><span>You book an appointment or request a callback and send photos of your meter cupboard.</span></li>
<li><b>Quote with a fixed price</b><span>You receive a no-obligation quote with the work, the materials, the price and the planning.</span></li>
<li><b>Installation</b><span>We carry out the work on the agreed date. Extra work only with your approval.</span></li>
<li><b>Testing and handover</b><span>We measure and test the installation and hand it over with an explanation of how to use it.</span></li>
</ol></div></section>

<section id="voor-wie"><div class="wrap">
<div class="shead"><span class="kicker">Business</span><h2>Also for installation companies and suppliers</h2></div>
<div class="grid two">
<article class="card"><span class="ic">${ico("grid")}</span><h3>Subcontracting and commercial buildings</h3><p>For installation companies, project organisations and suppliers of EV chargers and home batteries. Per job or per project, nationwide.</p>
<div class="cta"><a class="btn" href="/en/business/#offerte">Discuss a project</a><a class="btn line" href="/en/business/">Business services</a></div></article>
<article class="card"><span class="ic">${ico("tag")}</span><h3>EV charger with business reimbursement</h3><p>Driving a company car? A home charger that records every charging session, so your employer can reimburse the electricity.</p>
<div class="cta"><a class="btn line" href="/en/ev-charger/business-reimbursement/">Business reimbursement</a></div></article>
</div></div></section>

${reviewsBlok}${projectenBlok}${merkenBlok}

<section class="alt" id="faq"><div class="wrap narrow">
<div class="shead"><span class="kicker">Frequently asked questions</span><h2>Good to know in advance</h2></div>
${faq(homeFaq)}
</div></section>

<section id="service-area"><div class="wrap narrow">
<div class="shead"><span class="kicker">Service area</span><h2>Utrecht, Amersfoort, Amsterdam and the surrounding area</h2>
<p class="sub">Private customers: ${stedenOmg(3)}. Business: nationwide, per project.</p></div>
<ul class="tags">${cfg.steden.map(s => `<li>${ico("pin")}${esc(s)}</li>`).join("")}<li>And surrounding towns</li></ul>
</div></section>
`;

  /* ---------- Standards ---------- */
  const keurmerk = tekst({ crumb: "Standards", h1: "Standards: NEN 3140 and NEN 1010",
    lead: `An electrical installation must be safe, now and in twenty years' time. On this page you can read which standards ${naam} follows, what they mean and what you see of them at handover.`,
    body: `<h2 class="metlogo">${normLogo("NEN 3140", 64)}<span>NEN 3140: working safely on electrical installations</span></h2>
<p>NEN 3140 is the Dutch standard for the operation of electrical installations: how to work safely on an installation, how to manage it and who may do which work. Among other things, the standard defines the Qualified Person (Vakbekwaam Persoon, VP): someone with the training, knowledge and experience to work independently and safely on electrical installations.</p>
<p><strong>What this means for you:</strong> the person working on your installation knows how to do it safely, for you and for your home or commercial building.</p>
<ul class="checks"><li>The work is carried out by a qualified and experienced NEN 3140 Qualified Person.</li><li>We work dead wherever possible, and secure against accidental switching on.</li></ul>

<h2 class="metlogo">${normLogo("NEN 1010", 64)}<span>NEN 1010: requirements for installing electrics</span></h2>
<p>NEN 1010 contains the safety requirements for designing and installing low-voltage installations: the wiring in homes, commercial premises and non-residential buildings. Among other things, the standard describes how circuits are protected, which RCD protection is needed, how cables are sized and which requirements apply in bathrooms and outdoors.</p>
<p><strong>What this means for you:</strong> your installation meets the applicable safety requirements, and this has been measured at handover.</p>
<ul class="checks"><li>Every installation is carried out to NEN 1010 and tested before handover, from fuse box to the last socket.</li><li>We choose cable size and protection to match each other.</li></ul>

<h2>What you see at handover</h2>
<ul class="checks"><li>The installation has been measured and every RCD has been tested.</li><li>An updated circuit chart in the meter cupboard.</li><li>An explanation of how to use what has been installed.</li></ul>

${cfg.erkendLeerbedrijf ? `
<h2>SBB-accredited training company</h2>
<p>${naam} is accredited by SBB as a training company. We train electrical engineering students in practice. <a href="/en/internship/">More about internships</a>.</p>` : ""}
<div class="cta"><a class="btn" href="/en/contact/">Book an appointment</a><a class="btn line" href="/en/contact/#callback">Call me back</a></div>` });

  /* ---------- Contact ---------- */
  const contact = `${phead({ crumb: "Contact", h1: "Contact: book an appointment or get a call back", lead: `Book an appointment or request a quote via the form. Prefer to talk first? Leave your phone number and we will call you back.` }, false)}
<div class="wrap solo"><div class="grid two">
<form id="tb" class="card" novalidate>
<h2 id="callback">Call me back</h2>
<p>Leave your name, phone number and preferred time. We will call you back.</p>
<div class="hp" aria-hidden="true"><input name="_gotcha" tabindex="-1" autocomplete="off" aria-hidden="true"></div>
<label>Your name<input id="tbnaam" autocomplete="name" required><span class="err" id="e-tbnaam" role="alert"></span></label>
<label>Your phone number<input id="tbtel" type="tel" autocomplete="tel" required><span class="err" id="e-tbtel" role="alert"></span></label>
<label>Preferred time<select id="tbtijd"><option>No preference</option><option>Morning</option><option>Afternoon</option><option>Late afternoon</option></select></label>
<label>What is it about? (optional)<input id="tbwaar" placeholder="For example: fuse box replacement"></label>
<button class="btn" type="submit">Send callback request</button>
<p class="small">We only use your details to call you back. Read more in our <a href="/en/privacy-statement/">privacy statement</a>.</p>
<p class="ok" id="tbok" role="status"></p><p class="err" id="tbfail" role="alert"></p>
</form>
<div class="card"><h2>Contact details</h2>
<ul class="contact-list plain"><li><span class="ic">${ico("mail")}</span>${mail}</li></ul>
<h3>Service area</h3>
<p>Private customers: ${stedenOmg(3)}. Business: nationwide, per project.</p>
<ul class="tags">${cfg.steden.map(s => `<li>${ico("pin")}${esc(s)}</li>`).join("")}</ul>
<h3>Business enquiry?</h3>
<p>For subcontracting and projects, please use the <a href="/en/business/#offerte">business form</a>.</p>
</div>
</div></div>`;

  /* ---------- Business ---------- */
  const zakelijk = svc({ key: "zakelijk", crumb: "Business", knop: "Discuss a project",
    h1: "Electrical subcontracting, per job or per project",
    lead: `Electrical support when you need extra skilled capacity. ${naam} carries out electrical installations for private customers and provides capacity as a subcontractor. We work for installation companies, project organisations and suppliers of EV chargers, solar power systems and home batteries: independently, as agreed and with test and completion records. Email: ${mail}.`,
    kort: ["Hire an electrician per job or per project", "Nationwide, per project", "Independent work as agreed", "Test report at handover"],
    body: `<h2>What you can hire us for</h2>
<h3>Fuse boxes and distribution boards</h3>
<p>Replacing and extending fuse boxes and distribution boards, in homes and commercial buildings.</p>
<h3>EV chargers</h3>
<p>Installation electrician for EV chargers: cable route, dedicated circuit with protection, mounting, load balancing and commissioning.</p>
<h3>Home batteries</h3>
<p>Installation and connection of battery systems, including a dedicated circuit and metering.</p>
<h3>Electrical installation work</h3>
<p>Project support for new builds, renovations and alterations in housing.</p>

<h2 id="commercial-buildings">Commercial buildings</h2>
<p>In offices, shops, schools and business units, the installation is larger and heavier than in a home: three-phase distribution boards, sub-distribution boards per floor or area, lighting on several circuits and charging points on your own premises. We take care of installing, extending and replacing them, independently or as a subcontractor within your project.</p>
<ul class="checks"><li>Replacing or extending distribution boards and sub-distribution boards.</li><li>Circuits, connection points and lighting for a refurbishment or new fit-out.</li><li>Charging points on your own premises, with load balancing.</li><li>Testing and completion records as agreed.</li></ul>

<h2>Experience</h2>
<p>Experience with distribution boards, EV charger installations, home batteries, lighting and switchgear.</p>

<h2>Types of project</h2>
<ul class="checks"><li>Roll-out of EV chargers and home batteries for suppliers.</li><li>Replacement and extension of distribution boards.</li><li>Installation work for new builds, renovations and alterations.</li><li>Temporary reinforcement of your own installation team.</li></ul>

<h2>How an assignment works</h2>
<ol class="steps v">
<li><b>Intake</b><span>You share the job, the location, drawings and the preferred period. We agree what needs to be done and who supplies the materials.</span></li>
<li><b>Planning</b><span>You receive a proposal with capacity, planning and rate. We always report extra work and deviations in advance.</span></li>
<li><b>Execution</b><span>Independent work as agreed and to NEN 1010, with one fixed point of contact.</span></li>
<li><b>Handover</b><span>The installation is measured and tested. You receive the test report and the agreed completion records.</span></li>
</ol>

<h2>The minimum information we need</h2>
<ul class="checks"><li>The type of work and the quantities.</li><li>The project location.</li><li>The preferred period and capacity.</li><li>Drawings or a description of the installation.</li><li>Who supplies the materials.</li></ul>

<h2>Availability and area</h2>
<p>Nationwide, per project. ${cfg.beschikbaarheidZakelijk ? "Availability: " + esc(cfg.beschikbaarheidZakelijk) + "." : "Availability on request per project."}${cfg.verzekerd ? " Insured for business liability." : ""}${cfg.eigenGereedschap ? " We work with our own tools and test equipment." : ""}</p>

<h2>Qualifications</h2>
<ul class="checks"><li>Qualified and experienced NEN 3140 Qualified Person</li><li>Works to NEN 1010</li>${cfg.erkendLeerbedrijf ? "<li>SBB-accredited training company</li>" : ""}</ul>

<h2>Documents on request</h2>
<ul class="checks">${docs.map(d => `<li>${d}</li>`).join("")}</ul>
<p><a href="#offerte">Discuss your project</a> and we will tell you whether we fit into your planning.</p>` });

  /* ---------- About ---------- */
  const over = tekst({ crumb: "About us", h1: `About ${naam}`,
    lead: `${naam} carries out electrical installations for private customers and provides capacity as a subcontractor. Below you can read how we work, what you can expect at handover and what qualifications we have.`,
    body: `<h2>What we do</h2>
<p>Electrical installation work, meter cupboards and distribution boards, EV chargers and complete home battery installations. We specialise in installations that ask more of the connection: charging infrastructure, energy storage and extending distribution boards.</p>
<p>For private customers we take care of the installation from advice to handover. For installation companies and suppliers we provide capacity as a subcontractor. More on the <a href="/en/business/">Business</a> page.</p>

<h2>How we work</h2>
<ul class="checks"><li>A quote with a fixed scope and a fixed price in advance.</li><li>Extra work only after consultation and with your approval.</li><li>One fixed point of contact from request to handover.</li><li>Work carried out to NEN 1010.</li><li>Every installation is measured and tested at handover, with an explanation of how to use it.</li></ul>

<h2>Qualifications</h2>
<ul class="checks"><li>Qualified and experienced NEN 3140 Qualified Person.</li><li>Works to NEN 1010.</li>${cfg.erkendLeerbedrijf ? `<li>SBB-accredited training company. We train electrical engineering students in practice. <a href="/en/internship/">More about internships</a>.</li>` : ""}</ul>

<h2>Experience</h2>
<p>Experience with distribution boards, EV charger installations, home batteries, lighting and switchgear.</p>

<h2>Service area</h2>
<p>Private customers: ${stedenOmg(3)}. Business: nationwide, per project.</p>
${cfg.googleProfiel ? `<h2>Reviews</h2>\n<p><a href="${esc(cfg.googleProfiel)}" rel="noopener">Read the reviews on Google</a>.</p>` : ""}
<div class="cta"><a class="btn" href="/en/contact/">Book an appointment</a><a class="btn line" href="/en/business/#offerte">Business enquiry</a></div>` });

  /* ---------- Internship ---------- */
  const stage = svc({ key: "stage", crumb: "Internship", knop: "Apply for an internship", geenRelated: true, geenTerug: true,
    h1: "An internship at an accredited training company in electrical engineering",
    lead: `${naam} is an SBB-accredited training company. Are you following a course in electrical engineering and looking for an internship where you really take part in the work? With us you work on real jobs and learn the trade in practice, in the ${stedenTekst(3)} region.`,
    kort: ["SBB-accredited training company", "You work on real jobs", "Fixed supervision", "Apply via the form"],
    body: `<h2>What you learn with us</h2>
${icards([
      ["meterkast", "Meter cupboards and distribution boards", "Replacing and extending fuse boxes, in homes and commercial buildings."],
      ["laadpaal", "EV chargers", "Installing a dedicated circuit, running the cable, mounting and configuring the charger."],
      ["gauge", "Testing and handover", "Testing an installation, testing RCDs and handing over the work."],
      ["tool", "Electrics during renovations", "Installing cables and connection points and finishing them."]
    ])}

<h2>What your internship looks like</h2>
<p>You join us on the jobs we carry out. That way you see a job from start to finish: the assessment, the preparation, the execution and the measuring and testing at handover. You work to NEN 1010 and learn to work safely according to NEN 3140. What you do independently, we build up step by step.</p>

<h2>What we ask of you</h2>
<ul class="checks"><li>You are following a vocational (mbo) course in electrical engineering.</li><li>You are motivated and keep to your agreements.</li><li>You work neatly and take safety seriously.</li></ul>

<h2>How to apply</h2>
<p>Send us these details via the form:</p>
<ul class="checks"><li>Your course, level and year.</li><li>Whether you follow BOL (school-based) or BBL (work-based).</li><li>The period and the number of days per week.</li><li>A few sentences on why you would like to do your internship with us.</li></ul>
<p>Email your CV to ${mail}. We will respond to your application. Whether an internship place is available at that time, you will hear after you apply. <a href="#offerte">Apply now</a>.</p>` });

  /* ---------- Knowledge base ---------- */
  const maanden = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const enDatum = d => { const [j, m, dag] = d.split("-").map(Number); return `${dag} ${maanden[m - 1]} ${j}`; };
  const fotoMail = `mailto:${esc(cfg.email)}?subject=${encodeURIComponent("Photo of my meter cupboard")}`;
  const artikel = a => `${phead({ crumbs: [["Knowledge base", "/en/knowledge-base/"], [a.kort_titel]], h1: a.h1, lead: a.lead }, false)}
<div class="wrap layout"><div class="prose">
<div class="kort"><h2>In brief</h2><ul class="checks">${a.kort.map(k => `<li>${k}</li>`).join("")}</ul></div>
<p class="meta">${naam} · Updated on <time datetime="${a.datum}">${enDatum(a.datum)}</time></p>
<div class="toc" role="navigation" aria-label="Contents"><b>On this page</b><ol>${a.secties.map(x => `<li><a href="#${x[0]}">${x[1]}</a></li>`).join("")}</ol></div>
${a.secties.map(x => `<h2 id="${x[0]}">${x[1]}</h2>\n${x[2]}`).join("\n\n")}

<div class="bel"><h2 id="call">When to call in an electrician?</h2><ul>${a.bellen.map(b => `<li>${b}</li>`).join("")}</ul></div>${a.geenStoring ? `
<p class="small"><strong>Please note:</strong> ${naam} does not provide a breakdown service. For an acute fault, call in a breakdown service. If a fault keeps coming back because of an outdated or full fuse box, we can <a href="/en/fuse-box/replacement/">replace</a> the fuse box.</p>` : ""}
</div>
<aside class="side" aria-label="Need help?">
<h2>Need help?</h2>
<p>${a.zin}</p>
<a class="btn" href="${a.dienst.href}">${a.dienst.label}</a>
<a class="btn line" href="${fotoMail}">Email a photo of your meter cupboard</a>
${a.dienst2 ? `<div class="sidec"><a href="${a.dienst2.href}">${ico("arrow")}${a.dienst2.label}</a></div>` : ""}
</aside></div>
<div class="related"><div class="wrap">
<h2>Related articles</h2>
<div class="grid">${a.verwant.map(x => `<a class="rel" href="${kb.bySlug[x].url}"><span class="ic">${ico("doc")}</span>${kb.bySlug[x].kort_titel}<span class="arr">${ico("arrow")}</span></a>`).join("")}</div>
</div></div>`;

  const kbOverzicht = `${phead({ crumb: "Knowledge base", h1: "Knowledge base: your meter cupboard and installation explained", lead: "Answers to questions about the meter cupboard, the RCD, induction, EV chargers and home batteries. Written for people who are not electricians and want to know what is going on." }, false)}
<div class="wrap solo kbover">
${kb.clusters.map(([key, titel]) => { const lijst = kb.artikelen.filter(a => a.cluster === key); return lijst.length ? `<h2>${titel}</h2>\n<div class="grid two">${lijst.map(a => `<a class="svc" href="${a.url}"><h3>${a.h1}</h3><p>${a.desc}</p><span class="more">Read the article${ico("arrow")}</span></a>`).join("")}</div>` : ""; }).join("\n")}
</div>`;

  const projectenPagina = `${phead({ crumb: "Projects", h1: "Projects: completed work", lead: "A selection of jobs " + naam + " has carried out, with the work done and the result." }, false)}
<div class="wrap solo"><div class="grid two">${projecten.map(projectKaart).join("")}</div></div>`;

  const vertaling = `<p class="callout-note"><strong>This is a translation.</strong> In case of any difference, the Dutch version prevails.</p>`;

  /* ---------- Privacy ---------- */
  const privacy = tekst({ crumb: "Privacy statement", h1: "Privacy statement",
    lead: `Last updated: November 2026. This page explains how ${naam} handles your personal data.`,
    body: `${vertaling}
<h2>Who is responsible?</h2>
<p>${naam}${cfg.kvk ? " (Chamber of Commerce/KvK " + esc(cfg.kvk) + ")" : ""}${cfg.vestigingsplaats ? ", based in " + esc(cfg.vestigingsplaats) + "," : ""} is responsible for processing your data. You can reach us at ${mail}.</p>
<h2>What data do we process?</h2>
<ul class="checks"><li>Your name, email address, phone number and postcode.</li><li>For business enquiries, your company name.</li><li>Details about your installation: the type of connection, whether you have solar panels and what you mention in your message.</li><li>Photos you send us, for example of your meter cupboard.</li></ul>
<h2>For what purpose and on what legal basis?</h2>
<ul class="checks">
<li><strong>Responding to your request and preparing a quote.</strong> Legal basis: steps taken at your request before entering into a contract.</li>
<li><strong>Carrying out the work.</strong> Legal basis: performance of the contract.</li>
<li><strong>Invoicing and keeping our accounts.</strong> Legal basis: legal obligation.</li>
</ul>
<h2>How long do we keep your data?</h2>
<ul class="checks"><li>Requests that did not lead to a job, including photos sent: ${esc(cfg.bewaartermijn).replace("maanden", "months")} after our last contact.</li><li>Data and photos of completed jobs: as long as needed for the guarantee and aftercare.</li><li>Invoices and accounts: 7 years, in line with the Dutch tax retention obligation.</li></ul>
<h2>With whom do we share your data?</h2>
<p>We do not sell your data. We use these service providers:</p>
<ul class="checks">${/hotmail|outlook|live\./i.test(cfg.email) ? "<li><strong>Microsoft (Outlook):</strong> our email. Requests and photos you email are stored in this mailbox.</li>" : "<li><strong>Our email provider:</strong> requests and photos you email are stored in our mailbox.</li>"}<li><strong>GitHub (GitHub Pages):</strong> the hosting of this website. GitHub records technical data on every visit, such as your IP address, for security purposes.</li>${cfg.formulierEndpoint && cfg.formulierdienst ? `<li><strong>${esc(cfg.formulierdienst)}:</strong> sends the content of the contact form to our mailbox.</li>` : ""}<li><strong>Our accountant:</strong> for our accounts.</li></ul>
<p>GitHub and Microsoft are American companies; your data may therefore be processed outside the European Union. Otherwise we only share data if the law requires it.</p>
<h2>Cookies</h2>
<p>This website does not place cookies and does not use tracking or statistics.</p>
<h2>Your rights</h2>
<p>You can ask us for access to, correction or deletion of your data, or object to its processing. To do so, send us an email. We respond within one month. If we cannot resolve it together, you can file a complaint with the Dutch Data Protection Authority (Autoriteit Persoonsgegevens).</p>` });

  /* ---------- Terms and conditions ---------- */
  const voorwaarden = tekst({ crumb: "Terms and conditions", h1: "Terms and conditions",
    lead: `The general terms and conditions of ${naam} apply to all our quotes and work.`,
    body: `${vertaling}
<h2>How you receive the terms and conditions</h2>
<ul class="checks"><li>You receive the full terms and conditions as an attachment to the quote, so before you enter into a contract with us.</li><li>Would you like to see them earlier? Send an email to ${mail} and we will send them to you free of charge.</li></ul>
<h2>Cooling-off period for consumers</h2>
<p>If you, as a consumer, enter into a contract at a distance or at your home, in many cases you have a 14-day cooling-off period. This does not apply to an urgent repair at your own request. The details are in the terms and conditions and in the quote.</p>
${cfg.garantieArbeid ? `<h2>Guarantee</h2><p>On the work carried out, ${naam} gives a ${esc(cfg.garantieArbeid).replace("maanden", "month").replace(/^(\d+) month$/, "$1-month")} guarantee from handover. On materials, the guarantee of the manufacturer or supplier applies. The full arrangement is in article 9 of the terms and conditions.</p>\n` : ""}<h2>Company details</h2>
<ul class="checks"><li>${naam}, sole proprietorship (eenmanszaak)${cfg.vestigingsplaats ? " in " + esc(cfg.vestigingsplaats) : ""}</li>${cfg.kvk ? `<li>Chamber of Commerce (KvK) number: ${esc(cfg.kvk)}</li>` : `<li>Registered in the Dutch Trade Register; the KvK number is on your quote and invoice</li>`}${cfg.btw ? `<li>VAT number: ${esc(cfg.btw)}</li>` : ""}<li>Email: ${mail}</li></ul>` });

  const kaal = (h1, lead, extra, knop) => `<div class="phead" id="top"><div class="wrap"><h1>${h1}</h1><p class="lead">${lead}</p>${extra ? `<p class="lead">${extra}</p>` : ""}<div class="cta"><a class="btn" href="/en/">${knop}</a></div></div></div>
${groepRelated}`;
  const bedankt = kaal("Thank you for your request", `Your request has been received. We will look at your message${cfg.reactietijd ? " and respond " + esc(cfg.reactietijd) : " and contact you"}.`, c.fotoRoute, "Back to the homepage");

  const H = cfg.handelsnaam;
  return [
    { id: "", path: "en/", form: true, preload: "groepenkast-abb", body: home,
      title: `Electrician Utrecht, Amersfoort, Amsterdam | ${H}`,
      desc: `Electrician in Utrecht, Amersfoort, Amsterdam and the surrounding area. Wiring, fuse boxes, EV chargers and home batteries. Fixed price, NEN 1010.` },
    { id: "elektra/", path: "en/electrical-work/", form: true, preload: "elektra-lasdoos", dienst: "Electrical renovation", crumb: "Electrical work", body: elektraOverzicht,
      title: `Electrical work Utrecht & Amersfoort | ${H}`,
      desc: `Electrical work in Utrecht, Amersfoort or Amsterdam: renovation, kitchen preparation, induction, lighting and garden lighting. Price in advance.` },
    { id: "meterkast/", path: "en/fuse-box/", form: true, preload: "groepenkast-abb", dienst: "Replace fuse box", crumb: "Fuse box", body: meterkastOverzicht,
      title: `Meter cupboard and fuse box Utrecht | ${H}`,
      desc: `Fuse box replacement, extension or three-phase preparation in Utrecht, Amersfoort or Amsterdam. To NEN 1010, fixed price in advance.` }
  ].concat(DL.map(dienstPagina)).concat([
    { id: "keurmerk/", path: "en/standards/", crumb: "Standards", body: keurmerk,
      title: `Standards: NEN 3140 and NEN 1010 | ${H}`,
      desc: `Every installation to NEN 1010, carried out by a qualified and experienced NEN 3140 Qualified Person. What that means for you.` },
    { id: "contact/", path: "en/contact/", form: true, crumb: "Contact", body: contact,
      title: `Contact: appointment or callback | ${H}`,
      desc: `Book an appointment, request a quote or ask ${H} to call you back. Private customers in Utrecht, Amersfoort and Amsterdam, business nationwide.` },
    { id: "zakelijk/", path: "en/business/", form: true, zakelijk: true, dienst: "Business: hire an electrician", type: "bedrijf", service: "Electrician for hire as a subcontractor", crumb: "Business", body: zakelijk,
      title: `Electrician for hire, commercial buildings | ${H}`,
      desc: `Hire an electrician or electrical work in commercial buildings? Subcontracting for installation companies and suppliers, per job or project, nationwide.` },
  ].concat(cfg.erkendLeerbedrijf ? [
    { id: "stage/", path: "en/internship/", form: true, stage: true, dienst: "Internship", crumb: "Internship", body: stage,
      title: `Internship in electrical engineering | ${H}`,
      desc: `An internship in electrical engineering? ${H} is an SBB-accredited training company in the Utrecht, Amersfoort and Amsterdam region. Apply now.` }
  ] : []).concat([
    { id: "kennisbank/", path: "en/knowledge-base/", crumb: "Knowledge base", body: kbOverzicht,
      title: `Knowledge base: meter cupboard and wiring | ${H}`,
      desc: `Explanations of the meter cupboard, single-phase and three-phase, the RCD, induction, EV chargers and home batteries. For people who are not electricians.` }
  ]).concat(projecten.length ? [
    { id: "projecten/", path: "en/projects/", crumb: "Projects", body: projectenPagina,
      title: `Projects | ${H}`,
      desc: `Completed projects by ${H}: fuse boxes, EV chargers, home batteries and electrical installations.` }
  ] : []).concat(kb.artikelen.map(a => ({ id: `kennisbank/${a.id}/`, path: `en/knowledge-base/${a.slug}/`, crumb: a.kort_titel, kb: true, article: a, body: artikel(a), title: a.title, desc: a.desc }))).concat([
    { id: "over/", path: "en/about/", crumb: "About us", body: over,
      title: `About us | ${H}`,
      desc: `${H} carries out electrical installations for private customers and provides subcontracting capacity. How we work, qualifications and area.` },
    { id: "privacyverklaring/", path: "en/privacy-statement/", crumb: "Privacy statement", body: privacy,
      title: `Privacy statement | ${H}`,
      desc: `Privacy statement of ${H}: what data we process, for what purpose, how long we keep it and what your rights are.` },
    { id: "algemene-voorwaarden/", path: "en/terms-and-conditions/", crumb: "Terms and conditions", body: voorwaarden,
      title: `Terms and conditions | ${H}`,
      desc: `Terms and conditions of ${H}: how you receive them, the cooling-off period for consumers and our company details.` },
    { id: "bedankt/", path: "en/thank-you/", noindex: true, body: bedankt, title: `Thank you for your request | ${H}`, desc: "Your request has been received." }
  ]));
};
