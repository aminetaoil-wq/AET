// Favicon: de streep loopt één keer door het teken (bij laden en als het tabblad weer zichtbaar wordt).
(function(){var l=document.querySelector('link[rel=icon][type="image/svg+xml"]'),d=document;if(!l||!d.createElement("canvas").getContext||matchMedia("(prefers-reduced-motion:reduce)").matches)return;
var h=l.href,c=d.createElement("canvas"),x=c.getContext("2d"),A=new Path2D("M31.7,9H34.6L58.3,55.4H48.9L32.9,23.6L15.5,55.4H6Z"),T=new Path2D("M3,48C12,33 36,24 61,23C40,28 22,37 9,53Z"),t=0;c.width=c.height=32;
function f(i){x.setTransform(.5,0,0,.5,0,0);x.clearRect(0,0,64,64);x.fillStyle="#154169";x.beginPath();x.roundRect?x.roundRect(0,0,64,64,12):x.rect(0,0,64,64);x.fill();x.fillStyle="#fff";x.fill(A);
x.save();x.beginPath();x.rect(0,0,64*i/12,64);x.clip();x.strokeStyle="#154169";x.lineWidth=3;x.stroke(T);x.fillStyle="#5fb0ff";x.fill(T);x.restore();
try{l.href=i<12?c.toDataURL():h}catch(e){l.href=h;return}if(i<12)t=setTimeout(f,60,i+1);else t=0}
function go(){if(!t&&d.visibilityState==="visible")f(0)}
d.addEventListener("visibilitychange",go);go()})();
(function(){
// Contactgegevens en formulieradres komen uit site.config.json (via tools/build.js), niet uit dit bestand.
var B=document.body,ENDPOINT=B.getAttribute("data-endpoint")||"",EMAIL=B.getAttribute("data-email")||"";
var $=function(i){return document.getElementById(i)};
var mb=$("menu"),n=$("nav");
if(mb&&n){mb.onclick=function(){var o=n.classList.toggle("open");mb.setAttribute("aria-expanded",o)};
n.addEventListener("click",function(e){if(e.target.tagName==="A"){n.classList.remove("open");mb.setAttribute("aria-expanded",false)}})}
var f=$("f");if(!f)return;
var ZK=!!f.getAttribute("data-zakelijk"),q=new URLSearchParams(location.search).get("dienst"),pre=B.getAttribute("data-dienst")||q;
if(pre)$("dienst").value=pre;
if(B.getAttribute("data-type"))$("type").value=B.getAttribute("data-type");
// Velden volgen het gekozen onderwerp: alleen vragen wat voor die dienst nodig is.
var auto=0;
function sync(){var d=$("dienst").value,st=d==="Stage",a=/^(Meterkast|Laadpaal|Thuisbatterij)/.test(d),z=/^(Laadpaal|Thuisbatterij)/.test(d);
 $("l-aansl").hidden=!a;$("l-zon").hidden=!z;$("inst").hidden=!a&&!z;$("typewrap").hidden=st;
 if(d==="Zakelijke inhuur"){if($("type").value!=="Bedrijf"){$("type").value="Bedrijf";auto=1}}else if(auto){$("type").value="Particulier";auto=0}
 $("bedr").hidden=st||$("type").value!=="Bedrijf"}
$("type").onchange=function(){auto=0;sync()};$("dienst").addEventListener("change",sync);sync();
document.addEventListener("click",function(e){var a=e.target.closest&&e.target.closest("[data-dienst]");if(a&&a!==B){$("dienst").value=a.getAttribute("data-dienst");sync()}});
f.addEventListener("submit",function(e){
 e.preventDefault();
 var v=function(i){var el=$(i);return el?el.value.trim():""},ok=true,naam=v("naam"),mail=v("mail"),tel=v("tel2"),bedr=v("bedrijf"),d=$("dienst").value,st=d==="Stage",fi=$("files"),fl=fi?fi.files:[];
 ["e-naam","e-contact","e-bedr","e-files","ok","fail"].forEach(function(i){if($(i))$(i).textContent=""});
 if(f.elements["_gotcha"]&&f.elements["_gotcha"].value)return;
 var first=null,err=function(id,msg,el){$(id).textContent=msg;ok=false;first=first||el};
 if(ZK&&!bedr)err("e-bedr","Vul uw bedrijfsnaam in.",$("bedrijf"));
 if(!naam)err("e-naam","Vul uw naam in.",$("naam"));
 if(!mail&&!tel)err("e-contact","Vul uw e-mailadres of telefoonnummer in.",$("mail"));
 else if(mail&&!/^\S+@\S+\.\S+$/.test(mail))err("e-contact","Dit e-mailadres lijkt niet te kloppen.",$("mail"));
 if(fl.length>3)err("e-files","Voeg maximaal 3 bestanden toe.",fi);
 else for(var i=0;i<fl.length;i++)if(fl[i].size>10485760){err("e-files","Een bestand mag maximaal 10 MB zijn.",fi);break}
 if(!ok){first.focus();return}
 var typ=$("type").value,vis=function(i){return !$(i).hidden},rows=[];
 if(!st&&!ZK)rows.push(["Type",typ]);
 rows.push(["Onderwerp",d]);
 if(vis("bedr")&&bedr)rows.push(["Bedrijfsnaam",bedr]);
 rows.push([ZK?"Contactpersoon":"Naam",naam],["E-mail",mail],["Telefoon",tel]);
 if(ZK)rows.push(["Type werkzaamheden",v("zwerk")],["Projectlocatie",v("zloc")],["Periode en inzet",v("zper")]);else rows.push(["Postcode",v("pc")]);
 if(vis("inst")&&vis("l-aansl"))rows.push(["Aansluiting",v("aansl")]);
 if(vis("inst")&&vis("l-zon"))rows.push(["Zonnepanelen",v("zon")]);
 var msg=v("msg"),subj=st?"Stage-aanmelding":ZK?"Zakelijke aanvraag":"Offerteaanvraag "+d;
 if(ENDPOINT){
  var b=f.querySelector("button[type=submit]"),lbl=b.textContent;b.disabled=true;b.textContent="Bezig met versturen…";
  var fail=function(){b.disabled=false;b.textContent=lbl;$("fail").textContent="Het versturen is niet gelukt. Probeer het opnieuw of stuur een e-mail naar "+EMAIL+"."};
  var opt={method:"POST",headers:{"Accept":"application/json"}},o={_subject:subj};
  rows.forEach(function(r){o[r[0].toLowerCase()]=r[1]});o.toelichting=msg;
  if(fl.length){var fd=new FormData();Object.keys(o).forEach(function(k){fd.append(k,o[k])});for(var j=0;j<fl.length;j++)fd.append("bijlage",fl[j]);opt.body=fd}
  else{opt.headers["Content-Type"]="application/json";opt.body=JSON.stringify(o)}
  fetch(ENDPOINT,opt).then(function(r){if(r.ok)location.href="/bedankt/";else fail()}).catch(fail);
 }else{
  var body=rows.map(function(r){return r[0]+": "+r[1]}).join("\n")+"\n\nToelichting:\n"+msg;
  $("ok").textContent="Uw e-mailprogramma opent nu. Druk daar op verzenden om uw aanvraag te versturen.";
  location.href="mailto:"+EMAIL+"?subject="+encodeURIComponent(subj)+"&body="+encodeURIComponent(body);
 }
});
})();
