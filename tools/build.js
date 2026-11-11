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
const ctx = { cfg, esc, tel, wa, mail, reviews, projecten, stedenTekst, stedenOmg,
  reactie: cfg.reactietijd ? `Wij reageren ${esc(cfg.reactietijd)}.` : "Wij nemen daarna contact met u op.",
  fotoRoute: wa ? `Foto's van uw meterkast stuurt u via <a href="${wa}">WhatsApp</a> of per e-mail.` : "Foto's van uw meterkast stuurt u per e-mail."
};
const pages = require(path.join(root, "src/pages.js"))(ctx);

const business = () => {
  const b = { "@type": "Electrician", "@id": base + "/#bedrijf", name: cfg.handelsnaam, url: base + "/",
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
  if (p.service) graph.push({ "@type": "Service", name: p.service, url, provider: { "@id": base + "/#bedrijf" },
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
<meta name="theme-color" content="#154169">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
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
<a href="${h}#diensten">Diensten</a><a href="${h}#werkwijze">Zo werkt het</a><a href="${h}#over">Over ons</a><a href="/zakelijk/">Zakelijk</a><a href="${h}#faq">Veelgestelde vragen</a>${tel ? `<a class="navtel" href="${tel.href}">${esc(tel.label)}</a>` : ""}<a class="btn" href="${off}">Offerte aanvragen</a>
</nav></div></header>`;
}

function form(p) {
  const opts = ["Thuisbatterij", "Laadpaal", "Meterkast", "Overige elektrotechniek", "Zakelijke inhuur"];
  return `<section class="alt" id="offerte"><div class="wrap two">
<div><h2>Vraag een vrijblijvende offerte aan</h2>
<p>Vertel kort wat u wilt laten doen. ${ctx.reactie}</p>
<ul class="contact-list">
<li>E-mail: ${mail}</li>
${tel ? `<li>Bellen: <a href="${tel.href}">${esc(tel.label)}</a>${wa ? ` · <a href="${wa}">WhatsApp</a>` : ""}</li>\n` : ""}</ul>
<p class="small">${ctx.fotoRoute}</p></div>
<form id="f" novalidate>
<div class="hp" aria-hidden="true"><label>Laat dit veld leeg<input name="_gotcha" tabindex="-1" autocomplete="off"></label></div>
<label>Ik ben<select id="type"><option>Particulier</option><option>Bedrijf</option></select></label>
<label id="bedr" hidden>Bedrijfsnaam<input id="bedrijf" autocomplete="organization"></label>
<label>Waar kunnen wij u mee helpen?<select id="dienst">${opts.map(o => `<option>${o}</option>`).join("")}</select></label>
<label>Uw naam<input id="naam" autocomplete="name" required><span class="err" id="e-naam" role="alert"></span></label>
<div class="row"><label>Uw e-mailadres<input id="mail" type="email" autocomplete="email"></label><label>Uw telefoonnummer<input id="tel2" type="tel" autocomplete="tel"></label></div>
<span class="err" id="e-contact" role="alert"></span>
<label>Uw postcode<input id="pc" autocomplete="postal-code" placeholder="1234 AB"></label>
<div class="row"><label>Uw aansluiting<select id="aansl"><option>Weet ik niet</option><option>1-fase</option><option>3-fase</option></select></label><label>Heeft u zonnepanelen?<select id="zon"><option>Nee</option><option>Ja</option></select></label></div>
<label>Toelichting<textarea id="msg" rows="4" placeholder="Bijvoorbeeld: het aantal zonnepanelen, het type auto of wat u wilt laten aanpassen."></textarea></label>
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
<div><h2 class="fh">${esc(cfg.handelsnaam)}</h2><p>Elektrotechnische installaties voor particulieren en bedrijven in ${esc(cfg.regio)}: ${stedenOmg(2)}.</p></div>
<div><h2 class="fh">Diensten</h2><ul><li><a href="/thuisbatterij/">Thuisbatterij</a></li><li><a href="/laadpaal/">Laadpaal</a></li><li><a href="/meterkast/">Meterkast</a></li><li><a href="/overige-elektrotechniek/">Overige elektrotechniek</a></li><li><a href="/zakelijk/">Zakelijke inhuur</a></li></ul></div>
<div><h2 class="fh">Informatie</h2><ul><li><a href="${h}#werkwijze">Zo werkt het</a></li><li><a href="${h}#faq">Veelgestelde vragen</a></li><li><a href="/algemene-voorwaarden/">Algemene voorwaarden</a></li><li><a href="/privacyverklaring/">Privacyverklaring</a></li></ul></div>
<div><h2 class="fh">Contact</h2><ul><li>${mail}</li>${tel ? `<li><a href="${tel.href}">Bel ${esc(tel.label)}</a></li>` : ""}${wa ? `<li><a href="${wa}">WhatsApp</a></li>` : ""}<li><a href="${off}">Contactformulier</a></li><li>Werkgebied: <a href="/#werkgebied">${esc(cfg.regio)}</a></li>${cfg.vestigingsplaats ? `<li>${esc(cfg.adres ? cfg.adres + ", " : "")}${esc(cfg.vestigingsplaats)}</li>` : ""}<li>KvK ${esc(cfg.kvk)}</li>${cfg.btw ? `<li>Btw ${esc(cfg.btw)}</li>` : ""}</ul></div>
</div>
<div class="legal">© <span id="y">${new Date().getFullYear()}</span> ${esc(cfg.handelsnaam)} · <a href="#top">Naar boven ↑</a></div>
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
