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
// Teksten in de taal van de pagina (<html lang>); de inhoud van aanvragen komt in die taal binnen.
var EN=(document.documentElement.lang||"nl").slice(0,2)==="en",BEDANKT=B.getAttribute("data-bedankt")||"/bedankt/";
var M=EN?{naam:"Please enter your name.",telnr:"Please enter a valid phone number.",kies:"Please choose a subject.",bedr:"Please enter your company name.",contact:"Please enter your email address or phone number.",mailfout:"This email address does not look right.",max3:"Add up to 3 files.",max10:"A file can be up to 10 MB.",bezig:"Sending…",fail:"Sending failed. Please try again or send an email to ",mailto:"Your email program is opening now. Press send there to submit your request.",mailtoTb:"Your email program is opening now. Press send there to submit your callback request.",
 tbSubj:"Callback request",tbNaam:"Name",tbTel:"Phone",tbTijd:"Preferred time",tbWaar:"Subject",stSubj:"Internship application",zkSubj:"Business enquiry",subj:"Appointment/quote request: ",
 type:"Type",onderwerp:"Subject",bedrijfsnaam:"Company name",contactpersoon:"Contact person",naamL:"Name",email:"Email",tel:"Phone",zwerk:"Type of work",zloc:"Project location",zper:"Period and capacity",pc:"Postcode",aansl:"Connection",zon:"Solar panels",toel:"Details"}
 :{naam:"Vul uw naam in.",telnr:"Vul een geldig telefoonnummer in.",kies:"Kies een onderwerp.",bedr:"Vul uw bedrijfsnaam in.",contact:"Vul uw e-mailadres of telefoonnummer in.",mailfout:"Dit e-mailadres lijkt niet te kloppen.",max3:"Voeg maximaal 3 bestanden toe.",max10:"Een bestand mag maximaal 10 MB zijn.",bezig:"Bezig met versturen…",fail:"Het versturen is niet gelukt. Probeer het opnieuw of stuur een e-mail naar ",mailto:"Uw e-mailprogramma opent nu. Druk daar op verzenden om uw aanvraag te versturen.",mailtoTb:"Uw e-mailprogramma opent nu. Druk daar op verzenden om uw terugbelverzoek te versturen.",
 tbSubj:"Terugbelverzoek",tbNaam:"Naam",tbTel:"Telefoon",tbTijd:"Voorkeurstijd",tbWaar:"Waar gaat het over",stSubj:"Stage-aanmelding",zkSubj:"Zakelijke aanvraag",subj:"Aanvraag afspraak/offerte: ",
 type:"Type",onderwerp:"Onderwerp",bedrijfsnaam:"Bedrijfsnaam",contactpersoon:"Contactpersoon",naamL:"Naam",email:"E-mail",tel:"Telefoon",zwerk:"Type werkzaamheden",zloc:"Projectlocatie",zper:"Periode en inzet",pc:"Postcode",aansl:"Aansluiting",zon:"Zonnepanelen",toel:"Toelichting"};
var mb=$("menu"),n=$("nav"),dds=[].slice.call(document.querySelectorAll(".ddb"));
function dicht(x){dds.forEach(function(b){if(b!==x){b.setAttribute("aria-expanded","false");b.parentNode.classList.remove("open")}})}
dds.forEach(function(b){b.onclick=function(){var o=b.getAttribute("aria-expanded")!=="true";dicht(b);b.setAttribute("aria-expanded",o);b.parentNode.classList.toggle("open",o)}});
document.addEventListener("keydown",function(e){if(e.key!=="Escape")return;var b=dds.filter(function(x){return x.getAttribute("aria-expanded")==="true"})[0];
 if(b){dicht();b.focus()}else if(n&&n.classList.contains("open")){n.classList.remove("open");mb.setAttribute("aria-expanded",false);mb.focus()}});
document.addEventListener("click",function(e){if(!e.target.closest||!e.target.closest(".dd"))dicht()});
if(n)n.addEventListener("focusout",function(e){var d=e.target.closest(".dd");if(d&&!d.contains(e.relatedTarget)&&matchMedia("(min-width:1260px)").matches)dicht()});
if(mb&&n){mb.onclick=function(){var o=n.classList.toggle("open");mb.setAttribute("aria-expanded",o);if(!o)dicht()};
n.addEventListener("click",function(e){if(e.target.tagName==="A"){n.classList.remove("open");mb.setAttribute("aria-expanded",false);dicht()}})}
// Terugbelverzoek (alleen op /contact/)
var tb=$("tb");if(tb)tb.addEventListener("submit",function(e){e.preventDefault();
 var v=function(i){return $(i).value.trim()},nm=v("tbnaam"),tl=v("tbtel"),ok=true,first=null;
 ["e-tbnaam","e-tbtel","tbok","tbfail"].forEach(function(i){$(i).textContent=""});
 if(tb.elements["_gotcha"].value)return;
 if(!nm){$("e-tbnaam").textContent=M.naam;ok=false;first=$("tbnaam")}
 if(!/^[+0-9 ()-]{10,}$/.test(tl)){$("e-tbtel").textContent=M.telnr;ok=false;first=first||$("tbtel")}
 if(!ok){first.focus();return}
 var o={_subject:M.tbSubj};o[M.tbNaam.toLowerCase()]=nm;o[M.tbTel.toLowerCase()]=tl;o[M.tbTijd.toLowerCase()]=v("tbtijd");o[M.tbWaar.toLowerCase()]=v("tbwaar");
 if(ENDPOINT){var b=tb.querySelector("button[type=submit]");b.disabled=true;
  fetch(ENDPOINT,{method:"POST",headers:{"Accept":"application/json","Content-Type":"application/json"},body:JSON.stringify(o)}).then(function(r){if(r.ok)location.href=BEDANKT;else throw 0}).catch(function(){b.disabled=false;$("tbfail").textContent=M.fail+EMAIL+"."});
 }else{$("tbok").textContent=M.mailtoTb;
  location.href="mailto:"+EMAIL+"?subject="+encodeURIComponent(M.tbSubj)+"&body="+encodeURIComponent(M.tbNaam+": "+nm+"\n"+M.tbTel+": "+tl+"\n"+M.tbTijd+": "+v("tbtijd")+"\n"+M.tbWaar+": "+v("tbwaar"))}
});
var f=$("f");if(!f)return;
var ZK=!!f.getAttribute("data-zakelijk"),q=new URLSearchParams(location.search).get("dienst"),pre=B.getAttribute("data-dienst")||q;
if(pre&&[].some.call($("dienst").options,function(o){return o.value===pre}))$("dienst").value=pre;
if(B.getAttribute("data-type"))$("type").value=B.getAttribute("data-type");
// Velden volgen het gekozen onderwerp: alleen vragen wat voor die dienst nodig is.
var auto=0;
var opt=function(){var sel=$("dienst");return sel.options[sel.selectedIndex]||null},heeft=function(k){var o=opt();return !!(o&&o.getAttribute(k))};
function sync(){var st=heeft("data-st"),a=heeft("data-a"),z=heeft("data-z");
 $("l-aansl").hidden=!a;$("l-zon").hidden=!z;$("inst").hidden=!a&&!z;$("typewrap").hidden=st;
 if(heeft("data-zk")){if($("type").value!=="bedrijf"){$("type").value="bedrijf";auto=1}}else if(auto){$("type").value="particulier";auto=0}
 $("bedr").hidden=st||$("type").value!=="bedrijf"}
$("type").onchange=function(){auto=0;sync()};$("dienst").addEventListener("change",sync);sync();
document.addEventListener("click",function(e){var a=e.target.closest&&e.target.closest("[data-dienst]");if(a&&a!==B){$("dienst").value=a.getAttribute("data-dienst");sync()}});
f.addEventListener("submit",function(e){
 e.preventDefault();
 var v=function(i){var el=$(i);return el?el.value.trim():""},ok=true,naam=v("naam"),mail=v("mail"),tel=v("tel2"),bedr=v("bedrijf"),d=$("dienst").value,st=heeft("data-st"),fi=$("files"),fl=fi?fi.files:[];
 ["e-dienst","e-naam","e-contact","e-bedr","e-files","ok","fail"].forEach(function(i){if($(i))$(i).textContent=""});
 if(f.elements["_gotcha"]&&f.elements["_gotcha"].value)return;
 var first=null,err=function(id,msg,el){$(id).textContent=msg;ok=false;first=first||el};
 if(!d)err("e-dienst",M.kies,$("dienst"));
 if(ZK&&!bedr)err("e-bedr",M.bedr,$("bedrijf"));
 if(!naam)err("e-naam",M.naam,$("naam"));
 if(!mail&&!tel)err("e-contact",M.contact,$("mail"));
 else if(mail&&!/^\S+@\S+\.\S+$/.test(mail))err("e-contact",M.mailfout,$("mail"));
 if(fl.length>3)err("e-files",M.max3,fi);
 else for(var i=0;i<fl.length;i++)if(fl[i].size>10485760){err("e-files",M.max10,fi);break}
 if(!ok){first.focus();return}
 var ty=$("type"),typ=ty.options[ty.selectedIndex].text,vis=function(i){return !$(i).hidden},rows=[];
 if(!st&&!ZK)rows.push([M.type,typ]);
 rows.push([M.onderwerp,d]);
 if(vis("bedr")&&bedr)rows.push([M.bedrijfsnaam,bedr]);
 rows.push([ZK?M.contactpersoon:M.naamL,naam],[M.email,mail],[M.tel,tel]);
 if(ZK)rows.push([M.zwerk,v("zwerk")],[M.zloc,v("zloc")],[M.zper,v("zper")]);else rows.push([M.pc,v("pc")]);
 if(vis("inst")&&vis("l-aansl"))rows.push([M.aansl,v("aansl")]);
 if(vis("inst")&&vis("l-zon"))rows.push([M.zon,v("zon")]);
 var msg=v("msg"),subj=st?M.stSubj:ZK?M.zkSubj:M.subj+d;
 if(ENDPOINT){
  var b=f.querySelector("button[type=submit]"),lbl=b.textContent;b.disabled=true;b.textContent=M.bezig;
  var fail=function(){b.disabled=false;b.textContent=lbl;$("fail").textContent=M.fail+EMAIL+"."};
  var opt={method:"POST",headers:{"Accept":"application/json"}},o={_subject:subj};
  rows.forEach(function(r){o[r[0].toLowerCase()]=r[1]});o[M.toel.toLowerCase()]=msg;
  if(fl.length){var fd=new FormData();Object.keys(o).forEach(function(k){fd.append(k,o[k])});for(var j=0;j<fl.length;j++)fd.append("bijlage",fl[j]);opt.body=fd}
  else{opt.headers["Content-Type"]="application/json";opt.body=JSON.stringify(o)}
  fetch(ENDPOINT,opt).then(function(r){if(r.ok)location.href=BEDANKT;else fail()}).catch(fail);
 }else{
  var body=rows.map(function(r){return r[0]+": "+r[1]}).join("\n")+"\n\n"+M.toel+":\n"+msg;
  $("ok").textContent=M.mailto;
  location.href="mailto:"+EMAIL+"?subject="+encodeURIComponent(subj)+"&body="+encodeURIComponent(body);
 }
});
})();
