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
var q=new URLSearchParams(location.search).get("dienst"),pre=B.getAttribute("data-dienst")||q;
if(pre)$("dienst").value=pre;
function syncType(){$("bedr").hidden=$("type").value!=="Bedrijf"}
if(B.getAttribute("data-type"))$("type").value=B.getAttribute("data-type");
$("type").onchange=syncType;syncType();
function syncDienst(){var st=$("dienst").value==="Stage";$("inst").hidden=st;$("typewrap").hidden=st;if(st)$("bedr").hidden=true;else syncType()}
$("dienst").addEventListener("change",syncDienst);syncDienst();
document.addEventListener("click",function(e){var a=e.target.closest&&e.target.closest("[data-dienst]");if(a&&a!==B){$("dienst").value=a.getAttribute("data-dienst");syncDienst()}});
f.addEventListener("submit",function(e){
 e.preventDefault();
 var ok=true,naam=$("naam").value.trim(),mail=$("mail").value.trim(),tel=$("tel2").value.trim();
 $("e-naam").textContent="";$("e-contact").textContent="";$("ok").textContent="";$("fail").textContent="";
 if(f.elements["_gotcha"]&&f.elements["_gotcha"].value)return;
 if(!naam){$("e-naam").textContent="Vul uw naam in.";ok=false}
 if(!mail&&!tel){$("e-contact").textContent="Vul uw e-mailadres of telefoonnummer in.";ok=false}
 else if(mail&&!/^\S+@\S+\.\S+$/.test(mail)){$("e-contact").textContent="Dit e-mailadres lijkt niet te kloppen.";ok=false}
 if(!ok){var first=!naam?$("naam"):$("mail");first.focus();return}
 var typ=$("type").value,bedr=$("bedrijf").value.trim(),dienst=$("dienst").value,pc=$("pc").value.trim(),msg=$("msg").value.trim(),aansl=$("aansl").value,zon=$("zon").value;
 var t=typ==="Bedrijf"&&bedr?"Bedrijf ("+bedr+")":typ,st=dienst==="Stage",subj=st?"Stage-aanmelding":"Offerteaanvraag "+dienst;
 if(ENDPOINT){
  var b=f.querySelector("button[type=submit]"),lbl=b.textContent;b.disabled=true;b.textContent="Bezig met versturen…";
  var fail=function(){b.disabled=false;b.textContent=lbl;$("fail").textContent="Het versturen is niet gelukt. Probeer het opnieuw of stuur een e-mail naar "+EMAIL+"."};
  fetch(ENDPOINT,{method:"POST",headers:{"Accept":"application/json","Content-Type":"application/json"},body:JSON.stringify(st?{_subject:subj,dienst:dienst,naam:naam,email:mail,telefoon:tel,postcode:pc,toelichting:msg}:{_subject:subj,type:t,dienst:dienst,naam:naam,email:mail,telefoon:tel,postcode:pc,aansluiting:aansl,zonnepanelen:zon,toelichting:msg})})
  .then(function(r){if(r.ok)location.href="/bedankt/";else fail()}).catch(fail);
 }else{
  var body=(st?"":"Type: "+t+"\n")+"Onderwerp: "+dienst+"\nNaam: "+naam+"\nE-mail: "+mail+"\nTelefoon: "+tel+"\nPostcode: "+pc+(st?"":"\nAansluiting: "+aansl+"\nZonnepanelen: "+zon)+"\n\nToelichting:\n"+msg;
  $("ok").textContent="Uw e-mailprogramma opent nu. Druk daar op verzenden om uw aanvraag te versturen.";
  location.href="mailto:"+EMAIL+"?subject="+encodeURIComponent(subj)+"&body="+encodeURIComponent(body);
 }
});
})();
