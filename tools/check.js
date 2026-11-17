const fs=require("fs"),path=require("path");const root=process.argv[2];
const walk=d=>fs.readdirSync(path.join(root,d),{withFileTypes:true}).filter(e=>e.isDirectory()&&!/^(\.|node_modules|assets|src|tools|content|docs)/.test(e.name)).flatMap(e=>{const s=d?d+"/"+e.name:e.name;return (fs.existsSync(path.join(root,s,"index.html"))?[s+"/index.html"]:[]).concat(walk(s))});
const pages=["index.html","404.html",...walk("")];
const ids={},html={};for(const p of pages){html[p]=fs.readFileSync(path.join(root,p),"utf8");ids[p]=new Set([...html[p].matchAll(/\sid="([^"]+)"/g)].map(m=>m[1]))}
let bad=0,n=0;
for(const p of pages){const h=html[p];
 const h1=(h.match(/<h1/g)||[]).length,canon=(h.match(/rel="canonical" href="([^"]+)"/)||[])[1],robots=(h.match(/name="robots" content="([^"]+)"/)||[])[1];
 const title=(h.match(/<title>(.*?)<\/title>/)||[])[1],desc=(h.match(/name="description" content="([^"]*)"/)||[])[1]||"";
 const heads=[...h.matchAll(/<h([1-6])/g)].map(m=>m[1]).join("");
 console.log(p.padEnd(36),"h1:",h1,"| koppen:",heads,"| title",title.length,"| desc",desc.length,"|",robots,"| ld+json:",/ld\+json/.test(h),"|",canon);
 const zicht=h.replace(/<script[\s\S]*?<\/script>/g," ").replace(/<[^>]+>/g," ");const rest=zicht.match(/\$\{[^}]*\}?|\{\{|\bundefined\b|\[object |\bNaN\b/g);if(rest){bad+=rest.length;console.log("  PLACEHOLDER",p,[...new Set(rest)].join(" "))}
 for(const m of h.matchAll(/(?:href|src)="([^"]+)"/g)){const u=m[1];if(/^(mailto:|tel:|https?:|#$)/.test(u))continue;n++;
  let [f,a]=u.split("#");f=f.split("?")[0];let tp=p;
  if(f){if(!f.startsWith("/")){console.log("  RELATIEF",p,u);}tp=f.replace(/^\//,"");if(tp===""||tp.endsWith("/"))tp+="index.html";
   if(!fs.existsSync(path.join(root,tp))){bad++;console.log("  KAPOT",p,u);continue}}
  if(a&&ids[tp]&&!ids[tp].has(a)){bad++;console.log("  ANKER ONTBREEKT",p,u)}}}
// RONDE3 3a/3b: srcset-bestanden, kwalificatieformulering, merkenblok, licenties
for(const p of pages){const h=html[p],zicht=h.replace(/<script[\s\S]*?<\/script>/g," ").replace(/<[^>]+>/g," ");
 for(const m of h.matchAll(/(?:srcset|imagesrcset)="([^"]+)"/g))for(const part of m[1].split(",")){const u=part.trim().split(/\s+/)[0];n++;if(!fs.existsSync(path.join(root,u.replace(/^\//,"")))){bad++;console.log("  KAPOT (srcset)",p,u)}}
 if(/gecertificeerd/i.test(zicht)){bad++;console.log("  VERBODEN WOORD 'gecertificeerd'",p)}
 // FIX.md: het bedrijf is niet zelf VP; geen opleiders of jaartallen op de site
 for(const w of [/wij zijn NEN 3140/i,/is NEN 3140 Vakbekwaam/i,/ROVC/,/opleiding behaald/i])if(w.test(zicht)){bad++;console.log("  VERBODEN FORMULERING",w,p)}
 const mb=(h.match(/<section class="merken"[\s\S]*?<\/section>/)||[""])[0].replace(/<[^>]+>/g," ");
 if(/partner|erkend|officieel|dealer|geautoriseerd|in samenwerking met|aanbevolen door/i.test(mb)){bad++;console.log("  MERKENBLOK suggereert relatie",p)}}
const lic=JSON.parse(fs.readFileSync(path.join(root,"content/fotos.json"),"utf8")),lg=JSON.parse(fs.readFileSync(path.join(root,"content/logos.json"),"utf8"));
for(const f of lic)if(!f.bron||!f.licentie||!f.alt){bad++;console.log("  FOTO zonder bron/licentie/alt",f.naam)}
for(const l of lg)if(!l.bron){bad++;console.log("  LOGO zonder bron",l.naam)}
console.log("links gecontroleerd:",n,"fouten:",bad);
if(bad)process.exit(1);
