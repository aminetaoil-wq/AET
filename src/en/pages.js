// English page texts. Mirrors src/pages.js (Dutch); every page has id = the Dutch path so the language switch and hreflang link the pair.
// Style: British English, plain and professional. See src/en/diensten.js for the standard terms.
// After a change: node tools/build.js
module.exports = function (c) {
  const { cfg, esc, mail, tel, wa, reviews, projecten, stedenTekst, stedenOmg, ico, foto, logo, logos } = c;
  const naam = esc(cfg.handelsnaam);
  const kb = require("./kennisbank.js")(c);
  const nlKey = k => c.nl.dd.byKey[k].url.slice(1); // Dutch path of a service = its id
  const VP = "experienced, qualified NEN 3140 Skilled Person (Vakbekwaam Persoon)";

  /* ---------- Building blocks ---------- */
  const faq = items => items.map(([q, a]) => `<details><summary>${q}</summary><p>${a}</p></details>`).join("\n");
  const tiles = items => `<ul class="tiles">${items.map(([i, t]) => `<li>${ico(i)}<span>${t}</span></li>`).join("")}</ul>`;
  const icards = items => `<ul class="icards">${items.map(([i, t, d]) => `<li><span class="ic">${ico(i)}</span><b>${t}</b><p>${d}</p></li>`).join("")}</ul>`;
  const callout = t => `<div class="callout">${ico("alert")}<p>${t}</p></div>`;
  const vanaf = k => cfg.vanafPrijs[k] ? `<p><strong>Guide price:</strong> from ${esc(cfg.vanafPrijs[k])}. Your quote will state the exact price.</p>` : "";
  const phead = (o, knop) => `<div class="phead${o.foto ? " has-foto" : ""}" id="top">${o.foto ? foto(o.foto, "hero", { cls: "bg", eager: true }) : ""}<div class="wrap">
<ol class="crumbs"><li><a href="/en/">Home</a></li>${(o.crumbs || [[o.crumb]]).map(k => k[1] ? `<li><a href="${k[1]}">${k[0]}</a></li>` : `<li>${k[0]}</li>`).join("")}</ol>
<h1>${o.h1}</h1>
<p class="lead">${o.lead}</p>
${knop ? `<div class="cta"><a class="btn" href="#offerte">${o.knop || "Book an appointment"}</a>${o.geenTerug ? "" : `<a class="btn ghost" href="/en/contact/#callback">Request a callback</a>`}</div>` : ""}
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
  const side = (kort, knop) => `<aside class="side" aria-label="At a glance">
<h2>At a glance</h2>
<ul class="checks">${kort.map(k => `<li>${k}</li>`).join("")}</ul>
<a class="btn" href="#offerte">${knop || "Book an appointment"}</a>
<a class="btn line" href="/en/contact/#callback">Request a callback</a>
<div class="sidec"><a href="mailto:${esc(cfg.email)}">${ico("mail")}${esc(cfg.email)}</a></div>
</aside>`;
  const meerLezen = slugs => `\n<h2>Further reading</h2>\n<ul class="checks">${slugs.map(x => `<li><a href="${kb.bySlug[x].url}">${kb.bySlug[x].h1}</a></li>`).join("")}</ul>`;
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
  const normen = `<p>Every installation is built to NEN 1010 and fully tested before sign-off. All work is carried out by an ${VP}. <a href="/en/standards/">More about our standards and working methods</a>.</p>`;
  // Brand block per RONDE3 3a: only "We work with", never suggesting a relationship with the brand.
  const merkenBlok = `<section class="merken" aria-labelledby="merken-h"><div class="wrap">
<h2 id="merken-h">We work with</h2>
<ul class="merkrij">${["Hager", "ABB", "Schneider Electric"].map(m => `<li>${logo(m, 40)}</li>`).join("")}</ul>
<p class="small">${naam} is an independent electrical contractor. Brand names and logos are the property of their respective manufacturers.</p>
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

<h2>Our approach</h2>
<ol class="steps v">${d.stappen.map(([t, x]) => `<li><b>${t}</b><span>${x}</span></li>`).join("")}</ol>

${d.secties.map(([t, x]) => `<h2>${t}</h2>\n${x}`).join("\n\n")}

<h2>What's included</h2>
<ul class="checks">${d.inbegrepen.map(x => `<li>${x}</li>`).join("")}</ul>

<h2>What determines the price?</h2>
${tiles(d.prijs)}
${d.prijsKey ? vanaf(d.prijsKey) : ""}<p>You'll receive a no-obligation quote with a fixed price up front, with each of these items listed separately. No extra work is carried out without your approval.</p>

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

  const groepKaart = d => `<a class="svc" href="${d.url}"><span class="ic">${ico(d.icon)}</span><h3>${d.menu}</h3><p>${d.kaart}</p><span class="more">Learn more${ico("arrow")}</span></a>`;

  /* ---------- Overview: electrical work ---------- */
  const gE = groepen.find(g => g.key === "elektra"), gM = groepen.find(g => g.key === "meterkast");
  const elektraOverzicht = svc({ crumb: "Electrical work", foto: "elektra-lasdoos",
    h1: "Electrical work in Utrecht, Amersfoort and Amsterdam",
    lead: `New wiring for a renovation, a kitchen ready for induction, or lighting indoors and in the garden. ${naam} carries out the installation, finishes everything neatly and tests the work before sign-off. You know the cost before we start.`,
    kort: ["Renovations, kitchens, lighting and gardens", "Coordinated with your builder", "Fully tested before sign-off", "Fixed price, no extra work without approval"],
    body: `<h2>How we can help</h2>
<div class="grid two">${gE.items.map(groepKaart).join("")}</div>

<h2>Electrical work in commercial premises</h2>
<p>We also carry out electrical work in offices, shops and business premises, from additional circuits to lighting. For commercial building projects, and for installation companies looking for extra capacity, see <a href="/en/business/#commercial-buildings">commercial buildings</a>.</p>

<h2>Get it right first time</h2>
<p>Electrical work is best done while walls and floors are open anyway. Chasing, drilling and re-plastering afterwards costs more time and money. That is why we plan ahead with you: where the sockets and switches will go, which appliances need their own circuit, and whether your fuse box has room for future additions such as an EV charger or home battery.</p>

<h2>How the work is carried out</h2>
<ol class="steps v"><li><b>Enquiry</b><span>Tell us what you need and send a drawing, sketch or photos.</span></li><li><b>Quotation</b><span>You receive a no-obligation quote setting out the work, the materials and a fixed price.</span></li><li><b>Installation</b><span>We carry out the work at the agreed stages, coordinated with your builder.</span></li><li><b>Completion</b><span>We test the installation and talk you through the result.</span></li></ol>

<h2>Safety and standards</h2>
${normen}` });

  /* ---------- Overview: fuse box ---------- */
  const meterkastOverzicht = svc({ crumb: "Fuse box", foto: "groepenkast-abb", lezen: ["wat-zit-er-in-mijn-meterkast", "meterkast-geschikt-laadpaal-thuisbatterij", "1-fase-of-3-fase"],
    h1: "Meter cupboards and fuse boxes in Utrecht, Amersfoort and Amsterdam",
    lead: `Planning to connect an EV charger, induction hob or home battery? Each of these needs its own circuit, and a full or outdated meter cupboard (meterkast) simply has no room for it. ${naam} replaces and extends fuse boxes and prepares them for three-phase power, in homes and commercial premises.`,
    kort: ["Replacement, extension or an additional circuit", "Three-phase preparation", "Built and tested to NEN 1010", "Usually completed in one working day"],
    body: `<h2>How we can help</h2>
<div class="grid two">${gM.items.map(groepKaart).join("")}</div>

<h2>Meter cupboard, fuse box or distribution board?</h2>
<p>They all refer to the same thing. In a home it is usually called the meter cupboard (meterkast) or fuse box (groepenkast); in the UK it would be a consumer unit. In commercial premises it is called a distribution board: larger, often three-phase and with more circuits. We work on both.</p>

<h2>Signs of an outdated meter cupboard</h2>
<ul class="checks"><li>It still has screw-in fuses rather than circuit breakers.</li><li>There is no residual current device (RCD), or more than four circuits share a single RCD.</li><li>The same circuit trips regularly.</li><li>There is no space left for an additional circuit.</li></ul>
${callout("<strong>Are components warm or discoloured, or can you smell burning?</strong> Switch off the circuit and have the fuse box inspected.")}

<h2>The grid operator's role, and ours</h2>
<p>The grid operator owns the service cable, the main fuse and the meter. You apply for a heavier connection or three-phase via mijnaansluiting.nl. Everything behind the meter is our responsibility: the main switch, RCDs, circuits and wiring.</p>

<h2>Having your meter cupboard assessed</h2>
<p>Much can be assessed remotely from a photo. With your request, send a photo of the fuse box with the door open, what you would like to connect and your postcode.</p>
${normen}` });

  /* ---------- Homepage ---------- */
  const kern = [["tag", "Fixed price up front", ""], ["shield", "Experienced, qualified NEN&nbsp;3140 Skilled Person", "", "NEN 3140"], ["doc", "Built to NEN&nbsp;1010", "", "NEN 1010"], ["gauge", "Fully tested on completion", ""]]
    .concat(cfg.reactietijd ? [["clock", "Response " + esc(cfg.reactietijd), "To every enquiry"]] : []);

  const homeFaq = [
    ["Is my meter cupboard ready for an EV charger, induction hob or home battery?", `That depends on your supply (single-phase or three-phase), the rating of your main fuse and the space left in your fuse box. Each high-power appliance needs its own circuit. Send us a photo of your meter cupboard and we'll give you an initial assessment. See also our <a href="/en/fuse-box/">fuse box</a> page.`],
    ["How much does an electrician cost?", `It varies from job to job. The price is made up of materials, labour and any travel costs. Most of it depends on the number of circuits or connection points, the length of the cable runs and any changes to your fuse box. You'll receive a no-obligation quote with a fixed price before any work starts.`],
    ["Do you offer a guarantee?", `Yes. ${naam} guarantees the work carried out for 12 months from completion: any defects resulting from our workmanship are put right free of charge. Materials such as fuse boxes, circuit breakers, EV chargers and home batteries are covered by the manufacturer's warranty, and we'll handle any claim for you. Full details are in our <a href="/en/terms-and-conditions/">terms and conditions</a>.`],
    ["What happens if extra work is needed?", `If anything unexpected comes up during the work, we discuss it with you first. We never carry out extra work without your approval.`],
    ["Can you call me instead?", `Of course. Leave your name, phone number and preferred time via a <a href="/en/contact/#callback">callback request</a> and we'll call you back.`],
    ["Which areas do you cover?", `For residential clients: ${cfg.steden.map(esc).join(", ")} and the surrounding areas. For businesses: nationwide, on a project basis.`],
    [`What qualifications does ${naam} have?`, `All work at ${naam} is carried out by an ${VP}. Every installation is built to NEN 1010, the Dutch standard for electrical installations, and fully tested on completion.`],
    ["Do you work as a subcontractor?", `Yes, for installation companies and for suppliers of home batteries and EV chargers, per job or per project. See <a href="/en/business/">Business</a>.`]
  ].concat(cfg.startTermijn ? [["How soon can you start?", esc(cfg.startTermijn)]] : []);

  const reviewsBlok = reviews.length ? `<section id="reviews"><div class="wrap">
<div class="shead"><span class="kicker">Reviews</span><h2>What our clients say</h2></div>
<div class="grid">${reviews.slice(0, 2).map(r => `<article class="card"><p>“${esc(r.tekst)}”</p><p class="small"><strong>${esc(r.naam)}</strong>${r.plaats ? ", " + esc(r.plaats) : ""}${r.klus ? " · " + esc(r.klus) : ""}</p></article>`).join("")}</div>
</div></section>\n\n` : "";
  const projectKaart = p => `<article class="card">${p.fotos && p.fotos[0] ? `<img src="${esc(p.fotos[0].src)}" alt="${esc(p.fotos[0].alt_en || p.fotos[0].alt)}" width="${p.fotos[0].w}" height="${p.fotos[0].h}" loading="lazy">` : ""}<h3>${esc(p.klus_en || p.klus)} in ${esc(p.plaats)}</h3><p>${esc(p.opdracht_en || p.opdracht || p.beschrijving || "")}</p>${p.werkzaamheden && p.werkzaamheden.length ? `<ul class="checks">${(p.werkzaamheden_en || p.werkzaamheden).map(w => `<li>${esc(w)}</li>`).join("")}</ul>` : ""}${p.bijzonderheden ? `<p>${esc(p.bijzonderheden_en || p.bijzonderheden)}</p>` : ""}${p.resultaat ? `<p><strong>Result:</strong> ${esc(p.resultaat_en || p.resultaat)}</p>` : ""}</article>`;
  const projectenBlok = projecten.length ? `<section id="projects"><div class="wrap">
<div class="shead"><span class="kicker">Projects</span><h2>Recent work</h2></div>
<div class="grid">${projecten.slice(0, 3).map(projectKaart).join("")}</div>
${projecten.length > 3 ? `<div class="cta"><a class="btn line" href="/en/projects/">All projects</a></div>` : ""}
</div></section>\n\n` : "";

  const groepBlok = g => `<article class="card groep">${g.foto ? `<div class="kfoto">${foto(g.foto, "kaart")}</div>` : `<span class="ic">${ico(g.icon)}</span>`}<h3><a href="${g.url}">${g.label}</a></h3><p>${g.intro}</p>
<ul class="links">${g.items.filter(d => !d.uitgelicht).map(d => `<li><a href="${d.url}">${d.menu}${ico("arrow")}</a></li>`).join("")}${g.key === "elektra" ? `<li><a href="/en/business/#commercial-buildings">Commercial buildings${ico("arrow")}</a></li>` : ""}</ul></article>`;
  const tb = byKey.thuisbatterij;

  const home = `
<div class="hero has-foto" id="top">${foto("groepenkast-abb", "hero", { cls: "bg", eager: true })}<div class="wrap">
<div>
<div class="eyebrow">Electrical contractor · Utrecht · Amersfoort · Amsterdam</div>
<h1>Electrical work, done right.<br><em>From fuse box to home battery.</em></h1>
<p class="lead"><strong>Skilled workmanship. Clear agreements. One point of contact.</strong> Electrical installations, fuse boxes, EV chargers and complete home battery systems for residential and business clients.${cfg.reactietijd ? " You'll hear from us " + esc(cfg.reactietijd) + "." : ""}</p>
<div class="cta"><a class="btn" href="#offerte">Book an appointment</a><a class="btn ghost" href="/en/contact/#callback">Request a callback</a></div>
</div>
</div></div>

<div class="trust"><div class="wrap"><ul class="k${kern.length}">
${kern.map(t => `<li>${(t[3] && normLogo(t[3], 40)) || `<span class="ic">${ico(t[0])}</span>`}<span><b>${t[1]}</b>${t[2] ? `<span>${t[2]}</span>` : ""}</span></li>`).join("\n")}
</ul></div></div>

<section id="over"><div class="wrap two">
<div><span class="kicker">About ${naam}</span>
<h2>An electrician who agrees the price before starting</h2>
<p class="sub">${naam} carries out electrical installations for residential clients and provides capacity to the trade as a subcontractor. We install wiring, replace and extend fuse boxes, and install EV chargers and home batteries. You get a fixed price up front, a single point of contact and an installation that is fully tested on completion.</p>
<div class="cta"><a class="btn" href="/en/contact/#callback">Request a callback</a><a class="btn line" href="/en/about/">About ${naam}</a></div>
</div>
<div class="card"><h3>Why ${naam}</h3>
<ul class="checks"><li>Experienced, qualified NEN 3140 Skilled Person</li><li>Every installation built to NEN 1010</li>${cfg.erkendLeerbedrijf ? `<li>SBB-accredited training company (<a href="/en/internship/">internships</a>)</li>` : ""}<li>No extra work without your approval</li></ul></div>
</div></section>

<section class="alt" id="keurmerk"><div class="wrap">
<div class="shead"><span class="kicker">Standards</span><h2>Safe work to recognised standards</h2>
<p class="sub">Two standards govern how we work: how an installation must be built, and how to work on it safely.</p></div>
<div class="grid two">
<article class="card">${normLogo("NEN 3140", 64) || `<span class="ic">${ico("shield")}</span>`}<h3>NEN 3140</h3><p>The standard for working safely on, and managing, electrical installations. All work at ${naam} is carried out by an ${VP}.</p></article>
<article class="card">${normLogo("NEN 1010", 64) || `<span class="ic">${ico("doc")}</span>`}<h3>NEN 1010</h3><p>The standard setting out the safety requirements for designing and installing low-voltage installations, such as the wiring in your home or business premises. Every installation is built to NEN 1010 and fully tested before sign-off.</p></article>
</div>
<div class="cta"><a class="btn line" href="/en/standards/">More about our standards</a></div>
</div></section>

<section id="diensten"><div class="wrap">
<div class="shead"><span class="kicker">Services</span><h2>Electrical work for homes and businesses</h2>
<p class="sub">For each service, we explain what we do, how the work is carried out and what determines the price.</p></div>
<a class="uitgelicht" href="${tb.url}"><span class="ic">${ico("batterij")}</span><span><span class="kicker">Featured</span><b>${tb.menu}</b><span>${tb.kaart} First, we check whether a battery makes sense for your consumption.</span></span><span class="more">See how it works${ico("arrow")}</span></a>
<div class="grid three">
${groepen.map(groepBlok).join("\n")}
</div>
</div></section>

<section class="alt" id="how-we-work"><div class="wrap">
<div class="shead"><span class="kicker">How we work</span><h2>From enquiry to completion</h2>
<p class="sub">Four steps, with the scope, price and schedule agreed up front.</p></div>
<ol class="steps">
<li><b>Enquiry</b><span>Book an appointment or request a callback, and send us photos of your meter cupboard.</span></li>
<li><b>Fixed-price quote</b><span>You receive a no-obligation quote setting out the work, the materials, the price and the schedule.</span></li>
<li><b>Installation</b><span>We carry out the work on the agreed date. No extra work without your approval.</span></li>
<li><b>Testing and sign-off</b><span>We test the installation and hand it over with a clear explanation of how to use it.</span></li>
</ol></div></section>

<section id="voor-wie"><div class="wrap">
<div class="shead"><span class="kicker">Business</span><h2>For installation companies and suppliers</h2></div>
<div class="grid two">
<article class="card"><span class="ic">${ico("grid")}</span><h3>Subcontracting and commercial buildings</h3><p>For installation companies, project organisations and suppliers of EV chargers and home batteries. Per job or per project, nationwide.</p>
<div class="cta"><a class="btn" href="/en/business/#offerte">Discuss your project</a><a class="btn line" href="/en/business/">Business services</a></div></article>
<article class="card"><span class="ic">${ico("tag")}</span><h3>Home charging for company cars</h3><p>Drive a company car? A home charger that records every charging session, so your employer can reimburse the electricity.</p>
<div class="cta"><a class="btn line" href="/en/ev-charger/business-reimbursement/">Company car charging</a></div></article>
</div></div></section>

${reviewsBlok}${projectenBlok}${merkenBlok}

<section class="alt" id="faq"><div class="wrap narrow">
<div class="shead"><span class="kicker">FAQ</span><h2>Good to know before you start</h2></div>
${faq(homeFaq)}
</div></section>

<section id="service-area"><div class="wrap narrow">
<div class="shead"><span class="kicker">Service area</span><h2>Utrecht, Amersfoort, Amsterdam and surrounding areas</h2>
<p class="sub">Residential: ${stedenOmg(3)}. Business: nationwide, on a project basis.</p></div>
<ul class="tags">${cfg.steden.map(s => `<li>${ico("pin")}${esc(s)}</li>`).join("")}<li>And surrounding towns</li></ul>
</div></section>
`;

  /* ---------- Standards ---------- */
  const keurmerk = tekst({ crumb: "Standards", h1: "Our standards: NEN 3140 and NEN 1010",
    lead: `An electrical installation has to be safe, today and in twenty years' time. This page explains which standards ${naam} works to, what they mean and how you can see them reflected in the finished job.`,
    body: `<h2 class="metlogo">${normLogo("NEN 3140", 64)}<span>NEN 3140: working safely on electrical installations</span></h2>
<p>NEN 3140 is the Dutch standard for the operation of electrical installations: how to work on an installation safely, how to manage it and who is authorised to carry out which work. Among other things, it defines the Skilled Person (Vakbekwaam Persoon, VP): someone with the training, knowledge and experience to work on electrical installations independently and safely.</p>
<p><strong>What this means for you:</strong> the person working on your installation knows how to do so safely, for you and for your home or business.</p>
<ul class="checks"><li>All work is carried out by an ${VP}.</li><li>Wherever possible, we isolate the supply and lock it off so it cannot be switched back on by accident.</li></ul>

<h2 class="metlogo">${normLogo("NEN 1010", 64)}<span>NEN 1010: requirements for electrical installations</span></h2>
<p>NEN 1010 sets out the safety requirements for designing and installing low-voltage installations: the wiring in homes, business premises and commercial buildings. Among other things, it specifies how circuits are protected, which RCD protection is required, how cables are sized and what applies in bathrooms and outdoors.</p>
<p><strong>What this means for you:</strong> your installation meets the applicable safety requirements, and this is verified by testing on completion.</p>
<ul class="checks"><li>Every installation is built to NEN 1010 and fully tested before sign-off, from the fuse box to the last socket.</li><li>Cable sizes and protective devices are always selected to match.</li></ul>

<h2>What you can expect on completion</h2>
<ul class="checks"><li>The installation has been tested and every RCD has been checked.</li><li>An up-to-date circuit chart in your meter cupboard.</li><li>A clear explanation of how to use everything that has been installed.</li></ul>

${cfg.erkendLeerbedrijf ? `
<h2>SBB-accredited training company</h2>
<p>${naam} is accredited by SBB as a training company. We train electrical engineering students on the job. <a href="/en/internship/">More about internships</a>.</p>` : ""}
<div class="cta"><a class="btn" href="/en/contact/">Book an appointment</a><a class="btn line" href="/en/contact/#callback">Request a callback</a></div>` });

  /* ---------- Contact ---------- */
  const contact = `${phead({ crumb: "Contact", h1: "Contact us", lead: `Book an appointment or request a quote using the form. Would you rather talk it through first? Leave your number and we'll call you back.` }, false)}
<div class="wrap solo"><div class="grid two">
<form id="tb" class="card" novalidate>
<h2 id="callback">Request a callback</h2>
<p>Leave your name, phone number and preferred time, and we'll call you back.</p>
<div class="hp" aria-hidden="true"><input name="_gotcha" tabindex="-1" autocomplete="off" aria-hidden="true"></div>
<label>Your name<input id="tbnaam" autocomplete="name" required><span class="err" id="e-tbnaam" role="alert"></span></label>
<label>Your phone number<input id="tbtel" type="tel" autocomplete="tel" required><span class="err" id="e-tbtel" role="alert"></span></label>
<label>Preferred time<select id="tbtijd"><option>Any time</option><option>Morning</option><option>Afternoon</option><option>Late afternoon</option></select></label>
<label>What is it about? (optional)<input id="tbwaar" placeholder="For example: fuse box replacement"></label>
<button class="btn" type="submit">Request a callback</button>
<p class="small">We only use your details to call you back. See our <a href="/en/privacy-statement/">privacy statement</a> for more information.</p>
<p class="ok" id="tbok" role="status"></p><p class="err" id="tbfail" role="alert"></p>
</form>
<div class="card"><h2>Contact details</h2>
<ul class="contact-list plain"><li><span class="ic">${ico("mail")}</span>${mail}</li></ul>
<h3>Service area</h3>
<p>Residential: ${stedenOmg(3)}. Business: nationwide, on a project basis.</p>
<ul class="tags">${cfg.steden.map(s => `<li>${ico("pin")}${esc(s)}</li>`).join("")}</ul>
<h3>Business enquiries</h3>
<p>For subcontracting and project work, please use our <a href="/en/business/#offerte">business enquiry form</a>.</p>
</div>
</div></div>`;

  /* ---------- Business ---------- */
  const zakelijk = svc({ key: "zakelijk", crumb: "Business", knop: "Discuss your project",
    h1: "Electrical subcontracting, per job or per project",
    lead: `Skilled electrical support whenever you need extra capacity. ${naam} carries out electrical installations for residential clients and works as a subcontractor for the trade. We work for installation companies, project organisations and suppliers of EV chargers, solar PV systems and home batteries: independently, as agreed, and with full test and completion records. Email: ${mail}.`,
    kort: ["Electricians for hire, per job or per project", "Nationwide, on a project basis", "Independent working, as agreed", "Test report on completion"],
    body: `<h2>What you can hire us for</h2>
<h3>Fuse boxes and distribution boards</h3>
<p>Replacement and extension of fuse boxes and distribution boards, in homes and commercial premises.</p>
<h3>EV chargers</h3>
<p>EV charger installation: cable routing, dedicated circuit and protection, mounting, load balancing and commissioning.</p>
<h3>Home batteries</h3>
<p>Installation and connection of battery systems, including a dedicated circuit and metering.</p>
<h3>Electrical installation work</h3>
<p>Project support for new-build, renovation and refurbishment in residential construction.</p>

<h2 id="commercial-buildings">Commercial buildings</h2>
<p>Offices, shops, schools and industrial units have larger, heavier installations than homes: three-phase distribution boards, sub-distribution boards per floor or area, lighting across multiple circuits and charging points on site. We install, extend and replace these installations, either independently or as a subcontractor within your project.</p>
<ul class="checks"><li>Replacement or extension of distribution boards and sub-distribution boards.</li><li>Circuits, connection points and lighting for refurbishments and new fit-outs.</li><li>On-site charging points with load balancing.</li><li>Testing and completion records as agreed.</li></ul>

<h2>Experience</h2>
<p>Experience with distribution boards, EV charger installations, home batteries, lighting and switchgear.</p>

<h2>Typical projects</h2>
<ul class="checks"><li>EV charger and home battery roll-outs for suppliers.</li><li>Replacement and extension of distribution boards.</li><li>Installation work for new-build, renovation and refurbishment projects.</li><li>Temporary reinforcement of your own installation team.</li></ul>

<h2>How an assignment works</h2>
<ol class="steps v">
<li><b>Briefing</b><span>You share the scope, location, drawings and preferred period. Together we agree what needs to be done and who supplies the materials.</span></li>
<li><b>Planning</b><span>You receive a proposal covering capacity, schedule and rate. Any extra work or deviations are always flagged in advance.</span></li>
<li><b>Execution</b><span>Independent working, as agreed and to NEN 1010, with a single point of contact.</span></li>
<li><b>Completion</b><span>The installation is fully tested. You receive the test report and the agreed completion records.</span></li>
</ol>

<h2>What we need from you</h2>
<ul class="checks"><li>The type of work and quantities.</li><li>The project location.</li><li>The preferred period and capacity.</li><li>Drawings or a description of the installation.</li><li>Who will supply the materials.</li></ul>

<h2>Availability and coverage</h2>
<p>Nationwide, on a project basis. ${cfg.beschikbaarheidZakelijk ? "Availability: " + esc(cfg.beschikbaarheidZakelijk) + "." : "Availability on request, per project."}${cfg.verzekerd ? " Covered by business liability insurance." : ""}${cfg.eigenGereedschap ? " We use our own tools and test equipment." : ""}</p>

<h2>Qualifications</h2>
<ul class="checks"><li>Experienced, qualified NEN 3140 Skilled Person</li><li>Every installation built to NEN 1010</li>${cfg.erkendLeerbedrijf ? "<li>SBB-accredited training company</li>" : ""}</ul>

<h2>Documents available on request</h2>
<ul class="checks">${docs.map(d => `<li>${d}</li>`).join("")}</ul>
<p><a href="#offerte">Tell us about your project</a> and we'll let you know whether we can fit it into our schedule.</p>` });

  /* ---------- About ---------- */
  const over = tekst({ crumb: "About us", h1: `About ${naam}`,
    lead: `${naam} carries out electrical installations for residential clients and works as a subcontractor for the trade. Below you can read how we work, what to expect on completion and what qualifications we hold.`,
    body: `<h2>What we do</h2>
<p>Electrical installation work, meter cupboards and distribution boards, EV chargers and complete home battery systems. We specialise in installations that place higher demands on the supply: charging infrastructure, energy storage and the extension of distribution boards.</p>
<p>For residential clients, we take care of everything from advice to completion. For installation companies and suppliers, we provide capacity as a subcontractor. See our <a href="/en/business/">Business</a> page for more.</p>

<h2>How we work</h2>
<ul class="checks"><li>A quote with a fixed scope and fixed price before we start.</li><li>Extra work only after consultation and with your approval.</li><li>A single point of contact from enquiry to completion.</li><li>All work carried out to NEN 1010.</li><li>Every installation is fully tested on completion, with an explanation of how to use it.</li></ul>

<h2>Qualifications</h2>
<ul class="checks"><li>Experienced, qualified NEN 3140 Skilled Person.</li><li>Every installation built to NEN 1010.</li>${cfg.erkendLeerbedrijf ? `<li>SBB-accredited training company: we train electrical engineering students on the job. <a href="/en/internship/">More about internships</a>.</li>` : ""}</ul>

<h2>Experience</h2>
<p>Experience with distribution boards, EV charger installations, home batteries, lighting and switchgear.</p>

<h2>Service area</h2>
<p>Residential: ${stedenOmg(3)}. Business: nationwide, on a project basis.</p>
${cfg.googleProfiel ? `<h2>Reviews</h2>\n<p><a href="${esc(cfg.googleProfiel)}" rel="noopener">Read our reviews on Google</a>.</p>` : ""}
<div class="cta"><a class="btn" href="/en/contact/">Book an appointment</a><a class="btn line" href="/en/business/#offerte">Business enquiry</a></div>` });

  /* ---------- Internship ---------- */
  const stage = svc({ key: "stage", crumb: "Internship", knop: "Apply for an internship", geenRelated: true, geenTerug: true,
    h1: "An electrical engineering internship at an accredited training company",
    lead: `${naam} is an SBB-accredited training company. Studying electrical engineering and looking for an internship where you'll do real work? With us, you'll work on real jobs and learn the trade in practice, across the ${stedenTekst(3)} region.`,
    kort: ["SBB-accredited training company", "Hands-on work on real jobs", "A dedicated supervisor", "Apply using the form"],
    body: `<h2>What you'll learn</h2>
${icards([
      ["meterkast", "Meter cupboards and distribution boards", "Replacing and extending fuse boxes in homes and commercial premises."],
      ["laadpaal", "EV chargers", "Installing a dedicated circuit, running the cable, and mounting and configuring the charger."],
      ["gauge", "Testing and completion", "Testing an installation, checking RCDs and signing off the work."],
      ["tool", "Electrical work in renovations", "Installing and finishing cabling and connection points."]
    ])}

<h2>What your internship looks like</h2>
<p>You join us on the jobs we carry out, so you see each job from start to finish: the assessment, the preparation, the installation, and the testing on completion. You work to NEN 1010 and learn to work safely in accordance with NEN 3140. We build up what you do independently step by step.</p>

<h2>What we ask of you</h2>
<ul class="checks"><li>You are following a vocational (mbo) course in electrical engineering.</li><li>You are motivated and reliable.</li><li>You work carefully and take safety seriously.</li></ul>

<h2>How to apply</h2>
<p>Use the form to send us:</p>
<ul class="checks"><li>Your course, level and year.</li><li>Whether you follow the BOL (school-based) or BBL (work-based) route.</li><li>The period and number of days per week.</li><li>A few sentences on why you would like to do your internship with us.</li></ul>
<p>Please email your CV to ${mail}. We will respond to every application and let you know whether a place is available at that time. <a href="#offerte">Apply now</a>.</p>` });

  /* ---------- Knowledge base ---------- */
  const maanden = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const enDatum = d => { const [j, m, dag] = d.split("-").map(Number); return `${dag} ${maanden[m - 1]} ${j}`; };
  const fotoMail = `mailto:${esc(cfg.email)}?subject=${encodeURIComponent("Photo of my meter cupboard")}`;
  const artikel = a => `${phead({ crumbs: [["Knowledge base", "/en/knowledge-base/"], [a.kort_titel]], h1: a.h1, lead: a.lead }, false)}
<div class="wrap layout"><div class="prose">
<div class="kort"><h2>At a glance</h2><ul class="checks">${a.kort.map(k => `<li>${k}</li>`).join("")}</ul></div>
<p class="meta">${naam} · Last updated <time datetime="${a.datum}">${enDatum(a.datum)}</time></p>
<div class="toc" role="navigation" aria-label="Contents"><b>On this page</b><ol>${a.secties.map(x => `<li><a href="#${x[0]}">${x[1]}</a></li>`).join("")}</ol></div>
${a.secties.map(x => `<h2 id="${x[0]}">${x[1]}</h2>\n${x[2]}`).join("\n\n")}

<div class="bel"><h2 id="call">When to call an electrician</h2><ul>${a.bellen.map(b => `<li>${b}</li>`).join("")}</ul></div>${a.geenStoring ? `
<p class="small"><strong>Please note:</strong> ${naam} does not offer an emergency breakdown service. For an urgent fault, please contact a breakdown service. If a fault keeps recurring because your fuse box is outdated or full, we can <a href="/en/fuse-box/replacement/">replace</a> it for you.</p>` : ""}
</div>
<aside class="side" aria-label="Need help?">
<h2>Need help?</h2>
<p>${a.zin}</p>
<a class="btn" href="${a.dienst.href}">${a.dienst.label}</a>
<a class="btn line" href="${fotoMail}">Email us a photo of your meter cupboard</a>
${a.dienst2 ? `<div class="sidec"><a href="${a.dienst2.href}">${ico("arrow")}${a.dienst2.label}</a></div>` : ""}
</aside></div>
<div class="related"><div class="wrap">
<h2>Related articles</h2>
<div class="grid">${a.verwant.map(x => `<a class="rel" href="${kb.bySlug[x].url}"><span class="ic">${ico("doc")}</span>${kb.bySlug[x].kort_titel}<span class="arr">${ico("arrow")}</span></a>`).join("")}</div>
</div></div>`;

  const kbOverzicht = `${phead({ crumb: "Knowledge base", h1: "Knowledge base: your meter cupboard and installation explained", lead: "Clear answers about the meter cupboard, RCDs, induction cooking, EV chargers and home batteries. Written for people who aren't electricians but want to understand what's going on." }, false)}
<div class="wrap solo kbover">
${kb.clusters.map(([key, titel]) => { const lijst = kb.artikelen.filter(a => a.cluster === key); return lijst.length ? `<h2>${titel}</h2>\n<div class="grid two">${lijst.map(a => `<a class="svc" href="${a.url}"><h3>${a.h1}</h3><p>${a.desc}</p><span class="more">Read the article${ico("arrow")}</span></a>`).join("")}</div>` : ""; }).join("\n")}
</div>`;

  const projectenPagina = `${phead({ crumb: "Projects", h1: "Projects: recent work", lead: "A selection of jobs " + naam + " has carried out, with the work done and the result." }, false)}
<div class="wrap solo"><div class="grid two">${projecten.map(projectKaart).join("")}</div></div>`;

  const vertaling = `<p class="callout-note"><strong>This is a translation.</strong> In the event of any discrepancy, the Dutch version shall prevail.</p>`;

  /* ---------- Privacy ---------- */
  const privacy = tekst({ crumb: "Privacy statement", h1: "Privacy statement",
    lead: `Last updated: November 2026. This statement explains how ${naam} handles your personal data.`,
    body: `${vertaling}
<h2>Who is responsible?</h2>
<p>${naam}${cfg.kvk ? " (Chamber of Commerce no. " + esc(cfg.kvk) + ")" : ""}${cfg.vestigingsplaats ? ", based in " + esc(cfg.vestigingsplaats) + "," : ""} is the controller responsible for processing your personal data. You can contact us at ${mail}.</p>
<h2>What data do we process?</h2>
<ul class="checks"><li>Your name, email address, phone number and postcode.</li><li>For business enquiries, your company name.</li><li>Details of your installation: the type of supply, whether you have solar panels and anything you include in your message.</li><li>Photos you send us, for example of your meter cupboard.</li></ul>
<h2>Purposes and legal basis</h2>
<ul class="checks">
<li><strong>Responding to your enquiry and preparing a quote.</strong> Legal basis: taking steps at your request prior to entering into a contract.</li>
<li><strong>Carrying out the work.</strong> Legal basis: performance of a contract.</li>
<li><strong>Invoicing and bookkeeping.</strong> Legal basis: compliance with a legal obligation.</li>
</ul>
<h2>How long do we keep your data?</h2>
<ul class="checks"><li>Enquiries that do not lead to an order, including any photos: ${esc(cfg.bewaartermijn).replace("maanden", "months")} after our last contact.</li><li>Data and photos relating to completed work: for as long as needed for the guarantee and aftercare.</li><li>Invoices and accounting records: 7 years, as required by Dutch tax law.</li></ul>
<h2>Who do we share your data with?</h2>
<p>We never sell your data. We use the following service providers:</p>
<ul class="checks">${/hotmail|outlook|live\./i.test(cfg.email) ? "<li><strong>Microsoft (Outlook):</strong> our email provider. Enquiries and photos you email us are stored in this mailbox.</li>" : "<li><strong>Our email provider:</strong> enquiries and photos you email us are stored in our mailbox.</li>"}<li><strong>GitHub (GitHub Pages):</strong> the host of this website. GitHub logs technical data on every visit, such as your IP address, for security purposes.</li>${cfg.formulierEndpoint && cfg.formulierdienst ? `<li><strong>${esc(cfg.formulierdienst)}:</strong> forwards the content of the contact form to our mailbox.</li>` : ""}<li><strong>Our accountant:</strong> for bookkeeping purposes.</li></ul>
<p>GitHub and Microsoft are US companies, so your data may be processed outside the European Union. We only share data with other parties where the law requires it.</p>
<h2>Cookies</h2>
<p>This website does not use cookies, tracking or analytics.</p>
<h2>Your rights</h2>
<p>You have the right to access, correct or delete your personal data, and to object to its processing. To exercise these rights, please send us an email. We will respond within one month. If we cannot resolve your concern, you have the right to lodge a complaint with the Dutch Data Protection Authority (Autoriteit Persoonsgegevens).</p>` });

  /* ---------- Terms and conditions ---------- */
  const voorwaarden = tekst({ crumb: "Terms and conditions", h1: "Terms and conditions",
    lead: `The general terms and conditions of ${naam} apply to all our quotations and work.`,
    body: `${vertaling}
<h2>Receiving the terms and conditions</h2>
<ul class="checks"><li>The full terms and conditions are enclosed with every quotation, so you receive them before entering into a contract with us.</li><li>Would you like to see them earlier? Email ${mail} and we will send them to you free of charge.</li></ul>
<h2>Cooling-off period for consumers</h2>
<p>If you enter into a contract as a consumer at a distance or at your home, you are in many cases entitled to a 14-day cooling-off period. This does not apply to urgent repairs carried out at your own request. Full details are set out in the terms and conditions and in the quotation.</p>
${cfg.garantieArbeid ? `<h2>Guarantee</h2><p>${naam} guarantees the work carried out for ${esc(cfg.garantieArbeid).replace("maanden", "months")} from completion. Materials are covered by the warranty of the manufacturer or supplier. The full terms are set out in article 9 of the terms and conditions.</p>\n` : ""}<h2>Company details</h2>
<ul class="checks"><li>${naam}, sole proprietorship (eenmanszaak)${cfg.vestigingsplaats ? " in " + esc(cfg.vestigingsplaats) : ""}</li>${cfg.kvk ? `<li>Chamber of Commerce (KvK) no.: ${esc(cfg.kvk)}</li>` : `<li>Registered with the Dutch Chamber of Commerce; the registration number appears on your quotation and invoice</li>`}${cfg.btw ? `<li>VAT no.: ${esc(cfg.btw)}</li>` : ""}<li>Email: ${mail}</li></ul>` });

  const kaal = (h1, lead, extra, knop) => `<div class="phead" id="top"><div class="wrap"><h1>${h1}</h1><p class="lead">${lead}</p>${extra ? `<p class="lead">${extra}</p>` : ""}<div class="cta"><a class="btn" href="/en/">${knop}</a></div></div></div>
${groepRelated}`;
  const bedankt = kaal("Thank you for your enquiry", `We have received your enquiry and will review it${cfg.reactietijd ? ", responding " + esc(cfg.reactietijd) : " and be in touch shortly"}.`, c.fotoRoute, "Back to the homepage");

  const H = cfg.handelsnaam;
  return [
    { id: "", path: "en/", form: true, preload: "groepenkast-abb", body: home,
      title: `Electrician Utrecht, Amersfoort & Amsterdam | ${H}`,
      desc: `Electrician in Utrecht, Amersfoort and Amsterdam. Wiring, fuse boxes, EV chargers and home batteries, built to NEN 1010 at a fixed price agreed up front.` },
    { id: "elektra/", path: "en/electrical-work/", form: true, preload: "elektra-lasdoos", dienst: "Electrical renovation", crumb: "Electrical work", body: elektraOverzicht,
      title: `Electrical work Utrecht & Amersfoort | ${H}`,
      desc: `Electrical work in Utrecht, Amersfoort and Amsterdam: renovations, kitchen preparation, induction hobs, lighting and garden lighting. Fixed price up front.` },
    { id: "meterkast/", path: "en/fuse-box/", form: true, preload: "groepenkast-abb", dienst: "Fuse box replacement", crumb: "Fuse box", body: meterkastOverzicht,
      title: `Fuse box and meter cupboard Utrecht | ${H}`,
      desc: `Fuse box replacement, extension and three-phase preparation in Utrecht, Amersfoort and Amsterdam. Built to NEN 1010, fixed price agreed up front.` }
  ].concat(DL.map(dienstPagina)).concat([
    { id: "keurmerk/", path: "en/standards/", crumb: "Standards", body: keurmerk,
      title: `Our standards: NEN 3140 and NEN 1010 | ${H}`,
      desc: `Every installation built to NEN 1010, with all work carried out by an experienced, qualified NEN 3140 Skilled Person. What that means for you.` },
    { id: "contact/", path: "en/contact/", form: true, crumb: "Contact", body: contact,
      title: `Contact: book an appointment or callback | ${H}`,
      desc: `Book an appointment, request a quote or ask ${H} to call you back. Residential clients in Utrecht, Amersfoort, Amsterdam; businesses nationwide.` },
    { id: "zakelijk/", path: "en/business/", form: true, zakelijk: true, dienst: "Subcontracting / electrician hire", type: "bedrijf", service: "Electrical subcontracting", crumb: "Business", body: zakelijk,
      title: `Electrical subcontracting & commercial | ${H}`,
      desc: `Electricians for hire and electrical work in commercial buildings. Subcontracting for installation companies and suppliers, per job or project, nationwide.` },
  ].concat(cfg.erkendLeerbedrijf ? [
    { id: "stage/", path: "en/internship/", form: true, stage: true, dienst: "Internship", crumb: "Internship", body: stage,
      title: `Electrical engineering internship | ${H}`,
      desc: `Looking for an electrical engineering internship? ${H} is an SBB-accredited training company in the Utrecht, Amersfoort and Amsterdam region.` }
  ] : []).concat([
    { id: "kennisbank/", path: "en/knowledge-base/", crumb: "Knowledge base", body: kbOverzicht,
      title: `Knowledge base: meter cupboards explained | ${H}`,
      desc: `Clear explanations of the meter cupboard, single- and three-phase, RCDs, induction, EV chargers and home batteries. Written for non-electricians.` }
  ]).concat(projecten.length ? [
    { id: "projecten/", path: "en/projects/", crumb: "Projects", body: projectenPagina,
      title: `Projects | ${H}`,
      desc: `Recent projects by ${H}: fuse boxes, EV chargers, home batteries and electrical installations.` }
  ] : []).concat(kb.artikelen.map(a => ({ id: `kennisbank/${a.id}/`, path: `en/knowledge-base/${a.slug}/`, crumb: a.kort_titel, kb: true, article: a, body: artikel(a), title: a.title, desc: a.desc }))).concat([
    { id: "over/", path: "en/about/", crumb: "About us", body: over,
      title: `About us | ${H}`,
      desc: `${H} carries out electrical installations for residential clients and subcontracts for the trade. How we work, our qualifications and coverage.` },
    { id: "privacyverklaring/", path: "en/privacy-statement/", crumb: "Privacy statement", body: privacy,
      title: `Privacy statement | ${H}`,
      desc: `Privacy statement of ${H}: what personal data we process, why, how long we keep it and what your rights are.` },
    { id: "algemene-voorwaarden/", path: "en/terms-and-conditions/", crumb: "Terms and conditions", body: voorwaarden,
      title: `Terms and conditions | ${H}`,
      desc: `Terms and conditions of ${H}: how you receive them, the cooling-off period for consumers, our guarantee and company details.` },
    { id: "bedankt/", path: "en/thank-you/", noindex: true, body: bedankt, title: `Thank you for your enquiry | ${H}`, desc: "We have received your enquiry." }
  ]));
};
