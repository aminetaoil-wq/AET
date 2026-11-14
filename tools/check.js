const fs=require("fs"),path=require("path");const root=process.argv[2];
const pages=["index.html","404.html",...fs.readdirSync(root).filter(d=>fs.existsSync(path.join(root,d,"index.html"))).map(d=>d+"/index.html")];
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
console.log("links gecontroleerd:",n,"fouten:",bad);
if(bad)process.exit(1);
