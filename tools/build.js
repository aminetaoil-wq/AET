#!/usr/bin/env node
// Bouwt alle pagina's uit site.config.json, src/pages.js en content/*.json.
// Gebruik: node tools/build.js   (geen installatie nodig)
const fs = require("fs"), path = require("path");
const root = path.join(__dirname, "..");
const read = f => JSON.parse(fs.readFileSync(path.join(root, f), "utf8"));
const cfg = read("site.config.json");
const reviews = read("content/reviews.json");
const projecten = read("content/projecten.json").filter(p => p.toestemming === true);

const esc = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;");
const base = "https://" + cfg.domein;
const digits = (cfg.telefoon || "").replace(/\D/g, "");
const intl = digits ? (digits.startsWith("0") ? "31" + digits.slice(1) : digits) : "";
const tel = intl ? { href: "tel:+" + intl, label: cfg.telefoon } : null;
const wa = intl && cfg.whatsapp ? "https://wa.me/" + intl + "?text=" + encodeURIComponent("Goedendag, ik heb een vraag over ") : "";
const mail = `<a href="mailto:${esc(cfg.email)}">${esc(cfg.email)}</a>`;
const stedenTekst = n => { const s = cfg.steden.slice(0, n); return s.slice(0, -1).join(", ") + " en " + s[s.length - 1]; };
const stedenOmg = n => cfg.steden.slice(0, n).join(", ") + " en omgeving";

// Logo als inline SVG, zodat de streep met CSS kan bewegen (zie .streep in style.css).
const logoSvg = fs.readFileSync(path.join(root, "assets/logo.svg"), "utf8").replace(/\n/g, "").replace(' role="img" aria-label="AET Solutions"', ' width="113" height="52" aria-hidden="true" focusable="false"');

const ver = f => require("crypto").createHash("md5").update(fs.readFileSync(path.join(root, f))).digest("hex").slice(0, 8);
const cssV = ver("assets/style.css"), jsV = ver("assets/site.js");

const ICONS = {
  meterkast: '<rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 8h3M8 12h3M8 16h3M14 8h2M14 12h2M14 16h2"/>',
  laadpaal: '<path d="M5 20V6a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v14M3 20h14M15 9h2a2 2 0 0 1 2 2v4a1.5 1.5 0 0 0 3 0V8l-3-3"/><path d="M9 8l-2 4h4l-2 4"/>',
  batterij: '<rect x="3" y="7" width="16" height="10" rx="2"/><path d="M21 10v4M8 12h4M10 10v4"/>',
  elektra: '<path d="M13 2 4 14h7l-1 8 9-12h-7z"/>',
  tool: '<path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.5 2.5-2.5-.5-.5-2.5z"/>',
  shield: '<path d="M12 3l8 3v6c0 4.500-3.200 7.800-8 9-4.800-1.200-8-4.500-8-9V6z"/><path d="M9 12l2 2 4-4"/>',
  cap: '<path d="M2 9l10-5 10 5-10 5z"/><path d="M6 11.500V16c0 1.500 2.700 3 6 3s6-1.500 6-3v-4.500"/>',
  doc: '<path d="M6 3h9l4 4v14H6z"/><path d="M15 3v4h4M9 12h6M9 16h6"/>',
  tag: '<path d="M3 12V4h8l10 10-8 8z"/><circle cx="7.500" cy="8.500" r="1.500"/>',
  pin: '<path d="M12 21s-7-6.200-7-11a7 7 0 0 1 14 0c0 4.800-7 11-7 11z"/><circle cx="12" cy="10" r="2.500"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  alert: '<path d="M12 3 2 20h20z"/><path d="M12 10v4M12 17v.500"/>',
  arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  check: '<path d="M5 12l5 5 9-10"/>',
  user: '<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 3.600-6 8-6s8 2 8 6"/>',
  plug: '<path d="M9 2v6M15 2v6M6 8h12v3a6 6 0 0 1-12 0zM12 17v5"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.500 1.500M17.500 17.500 19 19M5 19l1.500-1.500M17.500 6.500 19 5"/>',
  home: '<path d="M3 11l9-8 9 8v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/>',
  cable: '<path d="M4 3v7a4 4 0 0 0 4 4h8a4 4 0 0 1 4 4v3"/><path d="M2 3h4M18 21h4"/>',
  gauge: '<path d="M4 18a9 9 0 1 1 16 0"/><path d="M12 14l4-5"/>',
  grid: '<rect x="3" y="3" width="7" height="7" rx="1.500"/><rect x="14" y="3" width="7" height="7" rx="1.500"/><rect x="3" y="14" width="7" height="7" rx="1.500"/><rect x="14" y="14" width="7" height="7" rx="1.500"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
  phone: '<path d="M5 3h4l2 5-2.500 1.500a11 11 0 0 0 6 6L16 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 5a2 2 0 0 1 2-2z"/>',
  chat: '<path d="M4 5h16v11H9l-5 4z"/>',
  car: '<path d="M5 16l1.500-5.500A2 2 0 0 1 8.400 9h7.200a2 2 0 0 1 1.900 1.500L19 16"/><rect x="3" y="14" width="18" height="5" rx="1.500"/><path d="M7 19v2M17 19v2"/>',
  truck: '<path d="M2 6h12v10H2zM14 10h4l4 3v3h-8z"/><circle cx="7" cy="18" r="2"/><circle cx="18" cy="18" r="2"/>'
};
const ico = n => `<svg class="i" viewBox="0 0 24 24" aria-hidden="true">${ICONS[n]}</svg>`;

const ctx = { cfg, esc, tel, wa, mail, reviews, projecten, stedenTekst, stedenOmg, ico,
  reactie: cfg.reactietijd ? `Wij reageren ${esc(cfg.reactietijd)}.` : "Wij nemen daarna contact met u op.",
  fotoRoute: wa ? `Foto's van uw meterkast stuurt u via <a href="${wa}">WhatsApp</a> of per e-mail.` : "Foto's van uw meterkast stuurt u per e-mail."
};
ctx.partner = cfg.partner.tonen && cfg.partner.naam
  ? `<p>Wij leveren en installeren batterijen van ${esc(cfg.partner.naam)}. Heeft u zelf al een batterij gekocht? Laat het ons weten bij uw aanvraag.</p>`
  : `<p>Heeft u al een batterij gekocht of een model op het oog? Geef dan het merk en type door bij uw aanvraag. Wij beoordelen of uw installatie er geschikt voor is en sluiten de batterij aan volgens de voorschriften van de fabrikant.</p>`;
/* ---------- Foto's (content/fotos.json, bestanden via tools/fotos.js) ---------- */
const fotos = {}; read("content/fotos.json").forEach(f => fotos[f.naam] = f);
const BREED = { hero: [480, 960, 1600], kaart: [480, 960] };
const srcset = (naam, u, ext) => BREED[u].map(w => `/assets/img/${naam}-${u}-${w}.${ext} ${w}w`).join(", ");
const SIZES = { hero: "(max-width:1000px) 100vw, 58vw", kaart: "(max-width:640px) 100vw, (max-width:1000px) 50vw, 360px" };
function foto(naam, u, o = {}) {
  const f = fotos[naam]; if (!f || !f.uitsneden[u]) return "";
  const [a, b] = f.uitsneden[u].ar.split(":").map(Number), w = 960, h = Math.round(w * b / a), sz = o.sizes || SIZES[u];
  return `<picture${o.cls ? ` class="${o.cls}"` : ""}><source type="image/avif" srcset="${srcset(naam, u, "avif")}" sizes="${sz}"><source type="image/webp" srcset="${srcset(naam, u, "webp")}" sizes="${sz}"><img src="/assets/img/${naam}-${u}-960.jpg" srcset="${srcset(naam, u, "jpg")}" sizes="${sz}" alt="${esc(f.alt)}" width="${w}" height="${h}" ${o.eager ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async"></picture>`;
}
const preload = naam => fotos[naam] ? `<link rel="preload" as="image" type="image/avif" imagesrcset="${srcset(naam, "hero", "avif")}" imagesizes="${SIZES.hero}" fetchpriority="high">
` : "";

/* ---------- Logo's van merken en normen (content/logos.json, RONDE3 3a) ---------- */
const logos = {}; read("content/logos.json").forEach(l => logos[l.naam] = l);
const afm = bestand => { // breedte/hoogte uit PNG-header of SVG-viewBox
  const buf = fs.readFileSync(path.join(root, bestand));
  if (bestand.endsWith(".png")) return [buf.readUInt32BE(16), buf.readUInt32BE(20)];
  const vb = (buf.toString().match(/viewBox="[\d.\s-]*?([\d.]+)\s+([\d.]+)"/) || []); return [+vb[1] || 1, +vb[2] || 1];
};
const logoBestand = naam => { const l = logos[naam]; return l && l.tonen && l.bestand && fs.existsSync(path.join(root, l.bestand)) ? l : null; };
// Merk: logo als het bestand er is en tonen aan staat, anders de naam als tekst. Norm: logo of niets (dan blijft het icoon staan).
function logo(naam, hoogte, tekstTerug = true) {
  const l = logoBestand(naam);
  if (!l) return tekstTerug ? `<span class="logo-tekst">${esc(naam)}</span>` : "";
  const [w, h] = afm(l.bestand);
  return `<img class="logo-img" src="/${esc(l.bestand)}" alt="${esc(naam)}" height="${hoogte}" width="${Math.round(hoogte * w / h)}" loading="lazy" decoding="async">`;
}

ctx.foto = foto; ctx.logo = logo; ctx.logos = logos;
ctx.dd = require(path.join(root, "src/diensten.js"))(ctx, { naam: esc(cfg.handelsnaam), stedenOmg, partner: ctx.partner });
const { groepen, diensten } = ctx.dd;
const pages = require(path.join(root, "src/pages.js"))(ctx);
const homeDesc = pages[0].desc;

const business = () => {
  const b = { "@type": "Electrician", "@id": base + "/#bedrijf", name: cfg.handelsnaam, url: base + "/", description: homeDesc,
    logo: base + "/assets/logo.jpg", image: base + "/assets/og.png", email: cfg.email,
    areaServed: [{ "@type": "AdministrativeArea", name: "Provincie Utrecht" }].concat(cfg.steden.map(c => ({ "@type": "City", name: c }))),
    knowsAbout: diensten.map(d => d.service).concat(["Verdeelinrichtingen", "Utiliteitsbouw", "NEN 1010", "NEN 3140"]) };
  if (tel) b.telephone = "+" + intl;
  if (cfg.btw) b.vatID = cfg.btw;
  const sameAs = [cfg.googleProfiel].concat(cfg.profielen || []).filter(Boolean);
  if (sameAs.length) b.sameAs = sameAs;
  return b;
};

function head(p, url) {
  const graph = [business()];
  if (p.service) graph.push({ "@type": "Service", name: p.service, description: p.desc, url, provider: { "@id": base + "/#bedrijf" },
    areaServed: cfg.steden.map(c => ({ "@type": "City", name: c })) });
  if (p.path) { const trail = (p.trail || (p.kb ? [["Kennisbank", "/kennisbank/"]] : [])).concat([[p.crumb || p.title.split(" | ")[0], "/" + p.path]]);
    graph.push({ "@type": "BreadcrumbList", itemListElement: [["Home", "/"]].concat(trail).map(([n, u], i) => ({ "@type": "ListItem", position: i + 1, name: n, item: base + u })) }); }
  if (p.article) graph.push({ "@type": "Article", headline: p.article.h1, description: p.desc, datePublished: p.article.datum, dateModified: p.article.datum,
    inLanguage: "nl", mainEntityOfPage: url, image: base + "/assets/og.png",
    author: { "@type": "Organization", "@id": base + "/#bedrijf", name: cfg.handelsnaam }, publisher: { "@id": base + "/#bedrijf" } });
  return `<!DOCTYPE html>
<html lang="nl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(p.title)}</title>
<meta name="description" content="${esc(p.desc)}">
<link rel="canonical" href="${url}">
<meta name="robots" content="${p.noindex ? "noindex,follow" : "index,follow"}">
<meta name="theme-color" content="#0d2c47">
<link rel="icon" href="/favicon.ico" sizes="32x32">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">
<link rel="preload" href="/assets/inter.woff2" as="font" type="font/woff2" crossorigin>
${p.preload ? preload(p.preload) : ""}<meta property="og:type" content="website"><meta property="og:locale" content="nl_NL"><meta property="og:site_name" content="${esc(cfg.handelsnaam)}">
<meta property="og:title" content="${esc(p.title)}"><meta property="og:description" content="${esc(p.desc)}"><meta property="og:url" content="${url}">
<meta property="og:image" content="${base}/assets/og.png"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<link rel="stylesheet" href="/assets/style.css?v=${cssV}">
${p.noindex ? "" : `<script type="application/ld+json">${JSON.stringify({ "@context": "https://schema.org", "@graph": graph })}</script>\n`}</head>`;
}

function header(p) {
  const afs = p.path === "contact/" ? "#offerte" : "/contact/";
  const groep = g => `<div class="dd"><button type="button" class="ddb" aria-expanded="false" aria-controls="dd-${g.key}">${esc(g.label)}<svg class="i" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg></button>
<ul class="ddm" id="dd-${g.key}">${g.overzicht ? `<li><a href="${g.url}">Alles over ${esc(g.label.toLowerCase())}</a></li>` : ""}${g.items.map(d => `<li><a href="${d.url}">${esc(d.menu)}</a></li>`).join("")}${g.key === "elektra" ? `<li><a href="/zakelijk/#utiliteitsbouw">Utiliteitsbouw</a></li>` : ""}</ul></div>`;
  return `<a class="skip" href="#main">Naar de inhoud</a>
<header><div class="wrap bar">
<a class="logo" href="/" aria-label="${esc(cfg.handelsnaam)}, naar de homepage">${logoSvg}</a>
<button class="menu" id="menu" aria-expanded="false" aria-controls="nav">Menu</button>
<nav id="nav" aria-label="Hoofdmenu">
<a href="/keurmerk/">Keurmerk</a>
${groepen.map(groep).join("\n")}
${projecten.length ? `<a href="/projecten/">Projecten</a>` : ""}<a href="/zakelijk/">Zakelijk</a><a href="/kennisbank/">Kennisbank</a><a href="/contact/">Contact</a><a class="btn" href="${afs}">Maak een afspraak</a>
</nav></div></header>`;
}

function form(p) {
  const opts = groepen.map(g => `<optgroup label="${esc(g.label)}">${g.items.map(d => `<option${d.a ? ' data-a="1"' : ""}${d.z ? ' data-z="1"' : ""}>${esc(d.formOptie)}</option>`).join("")}</optgroup>`).join("")
    + `<optgroup label="Overig"><option>Elektra aanleggen of renovatie, overig</option><option>Zakelijke inhuur</option>${cfg.erkendLeerbedrijf ? "<option>Stage</option>" : ""}</optgroup>`;
  const st = !!p.stage, zk = !!p.zakelijk, U = st ? "Je" : "Uw", up = !!cfg.formulierEndpoint;
  const kop = st ? ["Stage", "Meld je aan voor een stage", "Vertel kort welke opleiding je volgt en wanneer je stage wilt lopen. Wij reageren op je aanmelding."]
    : zk ? ["Zakelijke aanvraag", "Leg uw project of opdracht voor", "Beschrijf de werkzaamheden, de locatie en de gewenste periode. U ontvangt een reactie met beschikbaarheid en tarief."]
    : ["Afspraak maken", "Maak een afspraak of vraag een offerte aan", "Vertel in een paar zinnen wat u wilt laten doen. Wij nemen contact met u op voor een afspraak of sturen u een vrijblijvende offerte met de werkzaamheden, de materialen en een vaste prijs."];
  const punten = st ? ["Noem je opleiding, niveau en leerjaar", "Geef aan of je BOL of BBL volgt", "Vermeld de periode en het aantal dagen per week", "Je cv stuur je mee per e-mail"]
    : zk ? ["Inzet per klus of per project", "Zelfstandige uitvoering volgens afspraak", "Oplevering met meet- en opleverdocumentatie", up ? "Tekeningen en projectdocumentatie voegt u toe als bijlage" : "Tekeningen en projectdocumentatie stuurt u per e-mail"]
    : ["Vrijblijvend: u zit nergens aan vast", "U weet de prijs voordat u beslist", "Offerte met een vaste scope en een vaste prijs", up ? "Foto's van uw meterkast voegt u toe aan het formulier" : ctx.fotoRoute];
  return `<section class="band" id="offerte"><div class="wrap two">
<div><span class="eyebrow">${kop[0]}</span>
<h2>${kop[1]}</h2>
<p class="lead">${kop[2]}${cfg.reactietijd && !st ? ` Wij reageren ${esc(cfg.reactietijd)}.` : ""}</p>
<ul class="contact-list">
<li><span class="ic">${ico("mail")}</span>${mail}</li>
${tel ? `<li><span class="ic">${ico("phone")}</span><a href="${tel.href}">${esc(tel.label)}</a></li>\n` : ""}${wa ? `<li><span class="ic">${ico("chat")}</span><a href="${wa}">WhatsApp</a></li>\n` : ""}</ul>
<ul class="checks">${punten.map(x => `<li>${x}</li>`).join("")}</ul>
${wa && !st && !zk ? `<div class="cta"><a class="btn ghost" href="https://wa.me/${intl}?text=${encodeURIComponent("Goedendag, hierbij foto's van mijn meterkast voor een offerte.")}">Stuur foto's via WhatsApp</a></div>` : ""}</div>
<form id="f" novalidate${zk ? ' data-zakelijk="1"' : ""}>
<div class="hp" aria-hidden="true"><input name="_gotcha" tabindex="-1" autocomplete="off" aria-hidden="true"></div>
<div class="row"${zk ? " hidden" : ""}><label id="typewrap">Ik ben<select id="type"><option>Particulier</option><option>Bedrijf</option></select></label>
<label>Onderwerp<select id="dienst">${!p.dienst && !st && !zk ? '<option value="">Maak een keuze</option>' : ""}${opts}</select><span class="err" id="e-dienst" role="alert"></span></label></div>
<label id="bedr" hidden>Bedrijfsnaam<input id="bedrijf" autocomplete="organization"><span class="err" id="e-bedr" role="alert"></span></label>
<label>${zk ? "Contactpersoon" : U + " naam"}<input id="naam" autocomplete="name" required><span class="err" id="e-naam" role="alert"></span></label>
<div class="row"><label>${U} e-mailadres<input id="mail" type="email" autocomplete="email"></label><label>${U} telefoonnummer<input id="tel2" type="tel" autocomplete="tel"></label></div>
<span class="err" id="e-contact" role="alert"></span>
${zk ? `<label>Type werkzaamheden<select id="zwerk"><option>Groepenkasten en verdeelinrichtingen</option><option>Laadpalen</option><option>Thuisbatterijen</option><option>Elektrotechnisch installatiewerk</option><option>Anders</option></select></label>
<div class="row"><label>Projectlocatie<input id="zloc" autocomplete="address-level2" placeholder="Plaats of regio"></label><label>Gewenste periode en inzet<input id="zper" placeholder="Bijv. week 3-6, drie dagen per week"></label></div>` : ""}
<label id="l-pc"${zk ? " hidden" : ""}>${U} postcode<input id="pc" autocomplete="postal-code" placeholder="1234 AB"></label>
<div class="row" id="inst"><label id="l-aansl">Uw aansluiting<select id="aansl"><option>Weet ik niet</option><option>1-fase</option><option>3-fase</option></select></label><label id="l-zon">Heeft u zonnepanelen?<select id="zon"><option>Nee</option><option>Ja</option></select></label></div>
<label>${zk ? "Technische toelichting" : "Toelichting"}<textarea id="msg" rows="4" placeholder="${st ? "Bijvoorbeeld: je opleiding en leerjaar, BOL of BBL, de periode en waarom je bij ons stage wilt lopen." : zk ? "Bijvoorbeeld: aantallen, type installatie, wie het materiaal levert en bijzonderheden op locatie." : "Bijvoorbeeld: wat u wilt laten aanleggen of aansluiten, welke auto u heeft of wanneer het u uitkomt."}"></textarea></label>
${up && !st ? `<label>${zk ? "Bijlagen" : "Foto's"} (optioneel, maximaal 3 bestanden van 10 MB)<input id="files" type="file" multiple accept="image/jpeg,image/png,image/heic,.heic,.pdf"><span class="err" id="e-files" role="alert"></span></label>` : ""}
<button class="btn" type="submit">${st ? "Aanmelding versturen" : zk ? "Zakelijke aanvraag versturen" : "Aanvraag versturen"}</button>
<p class="small">${st ? "Wij gebruiken je gegevens alleen om op je aanmelding te reageren. Meer lees je in de" : "Wij gebruiken uw gegevens alleen om op uw aanvraag te reageren. Meer leest u in de"} <a href="/privacyverklaring/">privacyverklaring</a>.</p>
<p class="ok" id="ok" role="status"></p><p class="err" id="fail" role="alert"></p>
</form></div></section>`;
}

function footer(p) {
  const afs = p.form && !p.stage ? "#offerte" : "/contact/#offerte";
  return `<div class="mbar"><a href="/contact/#terugbellen">Bel mij terug</a><a href="mailto:${esc(cfg.email)}">E-mail</a><a class="btn" href="${p.stage ? "#offerte" : afs}">${p.stage ? "Aanmelden" : "Afspraak"}</a></div>
<footer><div class="wrap">
<div class="fgrid">
<div><a class="flogo" href="/" aria-label="${esc(cfg.handelsnaam)}"><img src="/assets/logo.jpg" alt="" width="420" height="194" loading="lazy"></a><p>${esc(cfg.handelsnaam)} verzorgt elektrotechnische installaties voor particulieren en levert capaciteit in onderaanneming. Particulier: ${stedenOmg(3)}. Zakelijk: landelijk op projectbasis.</p></div>
<div><h2 class="fh">Diensten</h2><ul>${groepen.filter(g => g.overzicht).map(g => `<li><a href="${g.url}">${esc(g.label)}</a></li>`).join("")}<li><a href="/laadpaal/">Laadpaal installatie</a></li><li><a href="/thuisbatterij/">Thuisbatterij-installatie</a></li><li><a href="/zakelijk/">Zakelijk en utiliteitsbouw</a></li><li><a href="/keurmerk/">Keurmerk en normen</a></li></ul></div>
<div><h2 class="fh">Informatie</h2><ul><li><a href="/over/">Over ons</a></li><li><a href="/#werkwijze">Werkwijze</a></li><li><a href="/#faq">Veelgestelde vragen</a></li><li><a href="/kennisbank/">Kennisbank</a></li>${cfg.erkendLeerbedrijf ? `<li><a href="/stage/">Stage</a></li>` : ""}<li><a href="/algemene-voorwaarden/">Algemene voorwaarden</a></li><li><a href="/privacyverklaring/">Privacyverklaring</a></li></ul></div>
<div><h2 class="fh">Contact</h2><ul><li>${mail}</li><li><a href="/contact/#terugbellen">Bel mij terug</a></li><li><a href="/contact/">Maak een afspraak</a></li><li><a href="/#werkgebied">Werkgebied</a></li></ul></div>
</div>
<div class="legal"><span>© <span id="y">${new Date().getFullYear()}</span> ${esc(cfg.handelsnaam)}</span><a href="#top">Naar boven ↑</a></div>
</div></footer>
<script src="/assets/site.js?v=${jsV}" defer></script>
</body>
</html>
`;
}

const today = new Date().toISOString().slice(0, 10);
const urls = [];
for (const p of pages) {
  const url = base + "/" + (p.file || p.path);
  const attrs = [`data-email="${esc(cfg.email)}"`];
  if (cfg.formulierEndpoint) attrs.push(`data-endpoint="${esc(cfg.formulierEndpoint)}"`);
  if (p.dienst) attrs.push(`data-dienst="${esc(p.dienst)}"`);
  if (p.type) attrs.push(`data-type="${esc(p.type)}"`);
  const html = head(p, url) + `\n<body ${attrs.join(" ")}>\n` + header(p) + `\n<main id="main">\n` + p.body + "\n" + (p.form ? form(p) + "\n" : "") + "</main>\n" + footer(p);
  const out = path.join(root, p.file || path.join(p.path, "index.html"));
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, html);
  if (!p.noindex) urls.push(url);
}
// GitHub Pages kent geen 301: oude adressen krijgen een doorverwijspagina (niet in de sitemap).
const redirects = { "overige-elektrotechniek/": "/elektra/renovatie/" };
for (const [van, naar] of Object.entries(redirects)) {
  const out = path.join(root, van, "index.html");
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, `<!DOCTYPE html>
<html lang="nl"><head><meta charset="utf-8"><title>Deze pagina is verplaatst</title>
<meta http-equiv="refresh" content="0; url=${naar}"><link rel="canonical" href="${base}${naar}"><meta name="robots" content="noindex,follow">
</head><body><p>Deze pagina is verplaatst naar <a href="${naar}">${base}${naar}</a>.</p></body></html>
`);
}
fs.writeFileSync(path.join(root, "sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `<url><loc>${u}</loc><lastmod>${today}</lastmod></url>`).join("\n")}
</urlset>
`);
fs.writeFileSync(path.join(root, "robots.txt"), `User-agent: *\nAllow: /\nSitemap: ${base}/sitemap.xml\n`);
fs.writeFileSync(path.join(root, "CNAME"), cfg.domein);

// Beeldlicenties: altijd gelijk aan wat er in content/fotos.json en content/logos.json staat.
fs.writeFileSync(path.join(root, "content/beeldlicenties.md"), `# Beeldlicenties

Gegenereerd door \`node tools/build.js\` uit \`content/fotos.json\` en \`content/logos.json\`. Niet met de hand wijzigen.

## Foto's

Stockfoto's zijn sfeerbeeld (RONDE3 regel 3.4): nooit als eigen werk tonen, niet op /projecten/, geen bijschrift als "onze installatie".

| Bestand | Bron | Unsplash-pagina | Fotograaf | Licentie | Datum | Alt-tekst |
|---|---|---|---|---|---|---|
${Object.values(fotos).map(f => `| assets/img/${f.naam}-* | ${f.bron} | ${f.pagina || "TODO eigenaar"} | ${f.fotograaf || "TODO eigenaar"} | ${f.licentie} | ${f.datum} | ${f.alt} |`).join("\n")}

## Logo's

| Naam | Type | Bestand | Aanwezig | Getoond | Bron | Datum |
|---|---|---|---|---|---|---|
${Object.values(logos).map(l => `| ${l.naam} | ${l.type} | ${l.bestand} | ${fs.existsSync(path.join(root, l.bestand)) ? "ja" : "nee"} | ${logoBestand(l.naam) ? "logo" : l.type === "merk" ? "naam als tekst" : "icoon"} | ${l.bron} | ${l.datum || "-"} |`).join("\n")}
`);
console.log("Gebouwd:", pages.length, "pagina's voor", base);
