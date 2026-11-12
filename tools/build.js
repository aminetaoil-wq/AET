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
const pages = require(path.join(root, "src/pages.js"))(ctx);
const homeDesc = pages[0].desc;

const business = () => {
  const b = { "@type": "Electrician", "@id": base + "/#bedrijf", name: cfg.handelsnaam, url: base + "/", description: homeDesc,
    logo: base + "/assets/logo.jpg", image: base + "/assets/og.png", email: cfg.email,
    areaServed: [{ "@type": "AdministrativeArea", name: "Provincie Utrecht" }].concat(cfg.steden.map(c => ({ "@type": "City", name: c }))) };
  if (tel) b.telephone = "+" + intl;
  if (cfg.vestigingsplaats) {
    b.address = { "@type": "PostalAddress", addressLocality: cfg.vestigingsplaats, addressCountry: "NL" };
    if (cfg.adres) b.address.streetAddress = cfg.adres;
  }
  if (cfg.btw) b.vatID = cfg.btw;
  return b;
};

function head(p, url) {
  const graph = [business()];
  if (p.service) graph.push({ "@type": "Service", name: p.service, description: p.desc, url, provider: { "@id": base + "/#bedrijf" },
    areaServed: cfg.steden.map(c => ({ "@type": "City", name: c })) });
  if (p.path) graph.push({ "@type": "BreadcrumbList", itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: base + "/" },
    { "@type": "ListItem", position: 2, name: p.crumb || p.title.split(" | ")[0], item: url }] });
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
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="preload" href="/assets/inter.woff2" as="font" type="font/woff2" crossorigin>
<meta property="og:type" content="website"><meta property="og:locale" content="nl_NL"><meta property="og:site_name" content="${esc(cfg.handelsnaam)}">
<meta property="og:title" content="${esc(p.title)}"><meta property="og:description" content="${esc(p.desc)}"><meta property="og:url" content="${url}">
<meta property="og:image" content="${base}/assets/og.png"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<link rel="stylesheet" href="/assets/style.css">
${p.noindex ? "" : `<script type="application/ld+json">${JSON.stringify({ "@context": "https://schema.org", "@graph": graph })}</script>\n`}</head>`;
}

function header(p) {
  const h = p.path || p.file ? "/" : "";
  const off = p.form ? "#offerte" : "/#offerte";
  return `<a class="skip" href="#main">Naar de inhoud</a>
<header><div class="wrap bar">
<a class="logo" href="/" aria-label="${esc(cfg.handelsnaam)}, naar de homepage"><img src="/assets/logo.jpg" alt="${esc(cfg.handelsnaam)}" width="420" height="194"></a>
<button class="menu" id="menu" aria-expanded="false" aria-controls="nav">Menu</button>
<nav id="nav" aria-label="Hoofdmenu">
<a href="${h}#diensten">Diensten</a><a href="${h}#werkwijze">Werkwijze</a><a href="${h}#over">Over ons</a><a href="/zakelijk/">Zakelijk</a><a href="${h}#faq">Vragen</a>${tel ? `<a class="navtel" href="${tel.href}">${esc(tel.label)}</a>` : ""}<a class="btn" href="${off}">Offerte aanvragen</a>
</nav></div></header>`;
}

function form(p) {
  const opts = ["Meterkast / verdeelinrichting", "Laadpaal", "Overige elektrotechniek", "Thuisbatterij", "Zakelijke inhuur"];
  return `<section class="band" id="offerte"><div class="wrap two">
<div><span class="eyebrow">Offerte</span>
<h2>Vraag een vrijblijvende offerte aan</h2>
<p class="lead">Beschrijf kort wat u wilt laten doen. U ontvangt een offerte met de werkzaamheden, de materialen en de prijs.${cfg.reactietijd ? ` Wij reageren ${esc(cfg.reactietijd)}.` : ""}</p>
<ul class="contact-list">
<li><span class="ic">${ico("mail")}</span>${mail}</li>
${tel ? `<li><span class="ic">${ico("phone")}</span><a href="${tel.href}">${esc(tel.label)}</a></li>\n` : ""}${wa ? `<li><span class="ic">${ico("chat")}</span><a href="${wa}">WhatsApp</a></li>\n` : ""}</ul>
<ul class="checks"><li>Vrijblijvend, met de prijs vooraf</li><li>Eén aanspreekpunt: u krijgt antwoord van de vakman zelf</li><li>${ctx.fotoRoute}</li></ul></div>
<form id="f" novalidate>
<div class="hp" aria-hidden="true"><label>Laat dit veld leeg<input name="_gotcha" tabindex="-1" autocomplete="off"></label></div>
<div class="row"><label>Ik ben<select id="type"><option>Particulier</option><option>Bedrijf</option></select></label>
<label>Onderwerp<select id="dienst">${opts.map(o => `<option>${o}</option>`).join("")}</select></label></div>
<label id="bedr" hidden>Bedrijfsnaam<input id="bedrijf" autocomplete="organization"></label>
<label>Uw naam<input id="naam" autocomplete="name" required><span class="err" id="e-naam" role="alert"></span></label>
<div class="row"><label>Uw e-mailadres<input id="mail" type="email" autocomplete="email"></label><label>Uw telefoonnummer<input id="tel2" type="tel" autocomplete="tel"></label></div>
<span class="err" id="e-contact" role="alert"></span>
<label>Uw postcode<input id="pc" autocomplete="postal-code" placeholder="1234 AB"></label>
<div class="row"><label>Uw aansluiting<select id="aansl"><option>Weet ik niet</option><option>1-fase</option><option>3-fase</option></select></label><label>Heeft u zonnepanelen?<select id="zon"><option>Nee</option><option>Ja</option></select></label></div>
<label>Toelichting<textarea id="msg" rows="4" placeholder="Bijvoorbeeld: wat u wilt laten aansluiten, het type auto of wat er niet werkt."></textarea></label>
<button class="btn" type="submit">Aanvraag versturen</button>
<p class="small">Met het versturen gaat u ermee akkoord dat wij uw gegevens gebruiken om op uw aanvraag te reageren. Zie de <a href="/privacyverklaring/">privacyverklaring</a>.</p>
<p class="ok" id="ok" role="status"></p><p class="err" id="fail" role="alert"></p>
</form></div></section>`;
}

function footer(p) {
  const h = p.path || p.file ? "/" : "";
  const off = p.form ? "#offerte" : "/#offerte";
  return `<div class="mbar">${tel ? `<a href="${tel.href}">Bel</a>` : ""}${wa ? `<a href="${wa}">WhatsApp</a>` : ""}${tel ? "" : `<a href="mailto:${esc(cfg.email)}">E-mail</a>`}<a class="btn" href="${off}">Offerte</a></div>
<footer><div class="wrap">
<div class="fgrid">
<div><a class="flogo" href="/" aria-label="${esc(cfg.handelsnaam)}"><img src="/assets/logo.jpg" alt="" width="420" height="194" loading="lazy"></a><p>Elektrotechnisch installatiebedrijf voor particulieren en bedrijven. Elektricien in ${stedenOmg(3)}.</p></div>
<div><h2 class="fh">Diensten</h2><ul><li><a href="/meterkast/">Meterkast / verdeelinrichting</a></li><li><a href="/laadpaal/">Laadpaal</a></li><li><a href="/overige-elektrotechniek/">Elektra en storingen</a></li><li><a href="/thuisbatterij/">Thuisbatterij</a></li><li><a href="/zakelijk/">Zakelijke inhuur</a></li></ul></div>
<div><h2 class="fh">Informatie</h2><ul><li><a href="${h}#werkwijze">Werkwijze</a></li><li><a href="${h}#werkgebied">Werkgebied</a></li><li><a href="${h}#faq">Veelgestelde vragen</a></li><li><a href="/algemene-voorwaarden/">Algemene voorwaarden</a></li><li><a href="/privacyverklaring/">Privacyverklaring</a></li></ul></div>
<div><h2 class="fh">Contact</h2><ul><li>${mail}</li>${tel ? `<li><a href="${tel.href}">Bel ${esc(tel.label)}</a></li>` : ""}${wa ? `<li><a href="${wa}">WhatsApp</a></li>` : ""}<li><a href="${off}">Offerte aanvragen</a></li>${cfg.vestigingsplaats ? `<li>${esc(cfg.adres ? cfg.adres + ", " : "")}${esc(cfg.vestigingsplaats)}</li>` : ""}<li>KvK ${esc(cfg.kvk)}</li>${cfg.btw ? `<li>Btw ${esc(cfg.btw)}</li>` : ""}</ul></div>
</div>
<div class="legal"><span>© <span id="y">${new Date().getFullYear()}</span> ${esc(cfg.handelsnaam)}</span><a href="#top">Naar boven ↑</a></div>
</div></footer>
<script src="/assets/site.js" defer></script>
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
fs.writeFileSync(path.join(root, "sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `<url><loc>${u}</loc><lastmod>${today}</lastmod></url>`).join("\n")}
</urlset>
`);
fs.writeFileSync(path.join(root, "robots.txt"), `User-agent: *\nAllow: /\nSitemap: ${base}/sitemap.xml\n`);
fs.writeFileSync(path.join(root, "CNAME"), cfg.domein);
console.log("Gebouwd:", pages.length, "pagina's voor", base);
