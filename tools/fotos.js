#!/usr/bin/env node
// Haalt de foto's uit content/fotos.json op bij Unsplash (images.unsplash.com) in de formaten die de site gebruikt.
// Eenmalig draaien na een wijziging in content/fotos.json: node tools/fotos.js
// Alleen foto's met de gratis Unsplash-licentie (bestandsnaam begint met "photo-", niet "premium_photo-").
const fs = require("fs"), path = require("path"), { execFileSync } = require("child_process");
const root = path.join(__dirname, "..");
const fotos = JSON.parse(fs.readFileSync(path.join(root, "content/fotos.json"), "utf8"));
const BREED = { hero: [480, 960, 1600], kaart: [480, 960] };
const KWALITEIT = { avif: 50, webp: 60, jpg: 68 };
const MAX = 200 * 1024;
const out = path.join(root, "assets/img");
fs.mkdirSync(out, { recursive: true });
let fout = 0;
for (const f of fotos) {
  if (!/^photo-/.test(f.id)) { console.error("Geweigerd (geen gratis Unsplash-foto):", f.id); fout++; continue; }
  for (const [u, s] of Object.entries(f.uitsneden)) {
    const [a, b] = s.ar.split(":").map(Number);
    for (const w of BREED[u]) for (const fm of Object.keys(KWALITEIT)) {
      const h = Math.round(w * b / a);
      const q = new URLSearchParams({ w, h, fit: "crop", crop: "focalpoint", "fp-x": s.fpx, "fp-y": s.fpy, "fp-z": s.fpz, sat: -10, q: KWALITEIT[fm], fm });
      const bestand = path.join(out, `${f.naam}-${u}-${w}.${fm}`);
      execFileSync("curl", ["-sSf", "-m", "60", "-o", bestand, `https://images.unsplash.com/${f.id}?${q}`]);
      const kb = fs.statSync(bestand).size;
      const grens = u === "hero" && w === 1600 && fm === "jpg" ? 250 * 1024 : MAX;
      if (kb > grens) { console.error("Te groot:", path.basename(bestand), Math.round(kb / 1024), "kB"); fout++; }
      console.log(path.basename(bestand).padEnd(36), Math.round(kb / 1024), "kB");
    }
  }
}
if (fout) process.exit(1);
