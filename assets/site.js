(function(){
var PHONE="";    // Telefoonnummer zonder + of spaties, bijvoorbeeld 31612345678. Leeg = bel- en WhatsApp-knoppen blijven verborgen.
var ENDPOINT=""; // Formulier-adres van uw formulierdienst, bijvoorbeeld https://formspree.io/f/xxxxxxxx. Leeg = het formulier opent het e-mailprogramma.
var EMAIL="AET-Works@hotmail.com";
var $=function(i){return document.getElementById(i)};
function show(id,on){var e=$(id);if(e)e.hidden=!on}
if($("y"))$("y").textContent=new Date().getFullYear();
if(PHONE){
 show("tel-li",1);show("m-tel",1);show("m-wa",1);show("f-tel",1);show("f-wa",1);
 var t="tel:+"+PHONE,w="https://wa.me/"+PHONE;
 [["tel",t],["m-tel",t],["f-tela",t],["wa",w],["m-wa",w],["f-waa",w]].forEach(function(x){if($(x[0]))$(x[0]).href=x[1]});
 if($("tel"))$("tel").textContent="+"+PHONE;if($("f-tela"))$("f-tela").textContent="Bel +"+PHONE;
}
var mb=$("menu"),n=$("nav");
if(mb&&n){mb.onclick=function(){var o=n.classList.toggle("open");mb.setAttribute("aria-expanded",o)};
n.addEventListener("click",function(e){if(e.target.tagName==="A"){n.classList.remove("open");mb.setAttribute("aria-expanded",false)}})}
var f=$("f");if(!f)return;
var q=new URLSearchParams(location.search).get("dienst"),pre=document.body.getAttribute("data-dienst")||q;
if(pre&&$("dienst"))$("dienst").value=pre;
document.addEventListener("click",function(e){var a=e.target.closest&&e.target.closest("[data-dienst]");if(a&&$("dienst"))$("dienst").value=a.getAttribute("data-dienst")});
$("type").onchange=function(){$("bedr").hidden=this.value!=="Bedrijf"};
f.addEventListener("submit",function(e){
 e.preventDefault();
 var ok=true,naam=$("naam").value.trim(),mail=$("mail").value.trim(),tel=$("tel2").value.trim();
 $("e-naam").textContent="";$("e-contact").textContent="";$("ok").textContent="";$("fail").textContent="";
 if(f.elements["_gotcha"]&&f.elements["_gotcha"].value)return;
 if(!naam){$("e-naam").textContent="Vul uw naam in.";ok=false}
 if(!mail&&!tel){$("e-contact").textContent="Vul uw e-mailadres of telefoonnummer in.";ok=false}
 else if(mail&&!/^\S+@\S+\.\S+$/.test(mail)){$("e-contact").textContent="Dit e-mailadres lijkt niet te kloppen.";ok=false}
 if(!ok)return;
 var typ=$("type").value,bedr=$("bedrijf").value.trim(),dienst=$("dienst").value,pc=$("pc").value.trim(),msg=$("msg").value.trim();
 var t=typ==="Bedrijf"&&bedr?"Bedrijf ("+bedr+")":typ;
 if(ENDPOINT){
  var b=f.querySelector("button[type=submit]"),lbl=b.textContent;b.disabled=true;b.textContent="Bezig met versturen…";
  var fail=function(){b.disabled=false;b.textContent=lbl;$("fail").textContent="Het versturen is niet gelukt. Probeer het opnieuw of stuur een e-mail naar "+EMAIL+"."};
  fetch(ENDPOINT,{method:"POST",headers:{"Accept":"application/json","Content-Type":"application/json"},body:JSON.stringify({_subject:"Offerteaanvraag "+dienst,type:t,dienst:dienst,naam:naam,email:mail,telefoon:tel,postcode:pc,toelichting:msg})})
  .then(function(r){if(r.ok)location.href="/bedankt/";else fail()}).catch(fail);
 }else{
  var body="Type: "+t+"\nOnderwerp: "+dienst+"\nNaam: "+naam+"\nE-mail: "+mail+"\nTelefoon: "+tel+"\nPostcode: "+pc+"\n\nToelichting:\n"+msg;
  $("ok").textContent="Uw e-mailprogramma opent nu. Druk daar op verzenden om uw aanvraag te versturen.";
  location.href="mailto:"+EMAIL+"?subject="+encodeURIComponent("Offerteaanvraag "+dienst)+"&body="+encodeURIComponent(body);
 }
});
})();
