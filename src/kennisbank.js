// Kennisbank: vaste set naslagartikelen. Schrijfregels staan in content/kennisbank-backlog.md.
// Elk getal heeft een bron in content/bronnen.md. Na een wijziging: node tools/build.js
module.exports = function (c) {
  const clusters = [
    ["meterkast", "Meterkast begrijpen"],
    ["storingen", "Storingen en veiligheid"],
    ["verduurzamen", "Verduurzamen"],
    ["laden", "Laadpaal en thuisbatterij"]
  ];
  const D = {
    meterkast: { href: "/meterkast/", label: "Meterkast laten vervangen of uitbreiden" },
    laadpaal: { href: "/laadpaal/", label: "Laadpaal laten installeren" },
    overige: { href: "/overige-elektrotechniek/", label: "Storing laten verhelpen" },
    thuisbatterij: { href: "/thuisbatterij/", label: "Thuisbatterij laten installeren" }
  };
  const datum = "2026-11-13";

  const artikelen = [
    /* ---------- K5 ---------- */
    { slug: "meterkast-geschikt-laadpaal-thuisbatterij", cluster: "laden", datum,
      kort_titel: "Meterkast geschikt voor laadpaal of batterij?",
      h1: "Is mijn meterkast geschikt voor een laadpaal of thuisbatterij?",
      title: "Meterkast geschikt voor laadpaal of thuisbatterij?",
      desc: "Met vijf punten ziet u zelf of uw meterkast klaar is voor een laadpaal of thuisbatterij, en wat er anders eerst moet gebeuren.",
      lead: "In de meeste woningen kan een laadpaal of thuisbatterij worden aangesloten, maar zelden zonder aanpassing. Beide krijgen een eigen groep in de meterkast, en daar moet ruimte voor zijn. Met de vijf punten hieronder ziet u zelf waar u staat.",
      kort: ["Een laadpaal en een thuisbatterij krijgen elk een eigen groep met eigen beveiliging.", "Vijf punten kunt u zelf nalopen, zonder iets open te maken.", "Met een foto van uw meterkast is veel al op afstand te beoordelen."],
      dienst: D.thuisbatterij, dienst2: D.laadpaal,
      zin: "Wilt u weten wat er bij u nodig is? Stuur een foto van uw meterkast mee met uw aanvraag.",
      verwant: ["1-fase-of-3-fase", "wat-zit-er-in-mijn-meterkast"],
      secties: [
        ["fase", "Punt 1: heeft u 1-fase of 3-fase?", `<p>Uw aansluiting bepaalt hoeveel stroom uw woning tegelijk kan afnemen. Bij 1-fase komt de stroom over één draad binnen, bij 3-fase over drie. Hoe u ziet wat u heeft, leest u in <a href="/kennisbank/1-fase-of-3-fase/">1-fase of 3-fase</a>.</p>
<p><strong>In orde:</strong> met 1-fase kunt u laden op ongeveer 3,7 kW, en op 7,4 kW als uw aansluiting dat toelaat. Kleinere thuisbatterijen werken ook op 1-fase.</p>
<p><strong>Vraagt aanpassing:</strong> voor laden op 11 kW of een batterij met een groot vermogen heeft u 3-fase nodig.</p>`],
        ["ruimte", "Punt 2: is er vrije ruimte in de kast?", `<p>Een groep is een aparte stroomkring met een eigen beveiliging. In de kast herkent u de groepen als een rij schakelaars naast elkaar. Kijk of daarnaast lege plekken zitten, afgedekt met een blind plaatje.</p>
<p><strong>In orde:</strong> er zijn nog enkele plekken vrij. Dan kan er meestal een groep bij.</p>
<p><strong>Vraagt aanpassing:</strong> de rij is vol. De kast moet dan worden uitgebreid of vervangen voordat er iets bij kan.</p>`],
        ["staat", "Punt 3: hoe oud is de kast en in welke staat?", `<p>Een oude kast heeft ronde schroefzekeringen, ook wel stoppen genoemd. Een moderne groepenkast heeft schakelaars die u weer omhoog zet.</p>
<p><strong>In orde:</strong> een kast met schakelaars, zonder verkleuring of losse onderdelen.</p>
<p><strong>Vraagt aanpassing:</strong> een kast met stoppen, of een kast waarin onderdelen verkleurd zijn. Die wordt eerst vervangen.</p>`],
        ["aardlek", "Punt 4: is er aardlekbeveiliging?", `<p>Een aardlekschakelaar schakelt de stroom uit zodra er stroom weglekt, bijvoorbeeld via een defect apparaat of via een persoon. U herkent hem aan een kleine testknop, vaak met de letter T.</p>
<p><strong>In orde:</strong> er zit minimaal één aardlekschakelaar in de kast.</p>
<p><strong>Vraagt aanpassing:</strong> er is er geen. Voor een laadpaal is bovendien een type nodig dat ook gelijkstroomlekken afschakelt. Soms zit dat in de laadpaal zelf. Welk type bij u past, bepaalt de installateur.</p>`],
        ["afstand", "Punt 5: hoe ver is het naar de laadplek of de batterij?", `<p>De kabel loopt van de meterkast naar de laadpaal of de batterij. Meet de afstand en bekijk de route: kan de kabel door een muur of kruipruimte, of moet er in de tuin of oprit worden gegraven?</p>
<p>Een korte, rechte route is weinig werk. Een lange route met graafwerk bepaalt een groot deel van de klus.</p>`],
        ["loadbalancing", "Load balancing voorkomt vaak een verzwaring", `<p>Laadt uw auto terwijl ook de oven en de wasdroger aanstaan, dan vraagt uw woning meer stroom dan de aansluiting aankan. Load balancing lost dat op: een meter in de kast houdt het totale verbruik bij en de laadpaal laadt tijdelijk langzamer. Daardoor is een zwaardere aansluiting vaak niet nodig.</p>`],
        ["controle", "Wat een installateur ter plaatse nog controleert", `<ul class="checks"><li>De waarde van de hoofdzekering.</li><li>De aarding en de staat van de bestaande bedrading.</li><li>Bij een batterij: het merk en type van uw omvormer en de plek waar de batterij komt.</li></ul>`],
        ["meesturen", "Wat u kunt meesturen voor een eerste inschatting", `<ul class="checks"><li>Een foto van uw meterkast, met de deur open.</li><li>Een foto van het opschrift op uw meter.</li><li>De afstand tot de laadplek of de plek van de batterij.</li><li>Het merk en type van uw auto, laadpaal of batterij, als u dat al weet.</li></ul>
<p>Een thuisbatterij meldt u na de installatie aan op energieleveren.nl, net als zonnepanelen. Dat is verplicht en gratis.</p>`]
      ],
      bellen: ["Uw kast heeft nog stoppen of er is geen aardlekschakelaar.", "De kast is vol en u wilt iets laten aansluiten.", "U twijfelt of u 1-fase of 3-fase heeft.", "Onderdelen zijn warm of verkleurd, of u ruikt een brandlucht. Schakel de groep dan uit en neem direct contact op."] },

    /* ---------- K1 ---------- */
    { slug: "wat-zit-er-in-mijn-meterkast", cluster: "meterkast", datum,
      kort_titel: "Wat zit er in mijn meterkast?",
      h1: "Wat zit er in mijn meterkast?",
      title: "Wat zit er in mijn meterkast? Uitleg per onderdeel",
      desc: "Hoofdzekering, meter, hoofdschakelaar, aardlekschakelaars en groepen: wat elk onderdeel doet en waar u wel en niet aan mag komen.",
      lead: "In uw meterkast gaat de stroom langs vijf onderdelen: de aansluiting met de hoofdzekering, de meter, de hoofdschakelaar, één of meer aardlekschakelaars en de groepen. De eerste twee zijn van de netbeheerder en verzegeld. Alles vanaf de hoofdschakelaar is van u.",
      kort: ["Aansluiting, hoofdzekering en meter zijn van de netbeheerder: niet aankomen.", "Hoofdschakelaar, aardlekschakelaars en groepen mag u bedienen.", "Een kast met schroefzekeringen of zonder aardlekschakelaar is verouderd."],
      dienst: D.meterkast,
      zin: "Is uw meterkast verouderd of vol? Stuur een foto mee, dan hoort u wat er nodig is.",
      verwant: ["1-fase-of-3-fase", "aardlekschakelaar-valt-uit"],
      secties: [
        ["aansluiting", "De aansluiting en de hoofdzekering", `<p>Hier komt de stroomkabel van buiten uw woning binnen. De hoofdzekering beveiligt de hele aansluiting. Dit deel zit in een gesloten kastje met een verzegeling, een draadje met een loodje of een plastic zegel.</p>
<p><strong>Mag u eraan komen?</strong> Nee. Dit is eigendom van de netbeheerder, het bedrijf dat het stroomnet in uw regio beheert. Valt de hoofdzekering uit, dan belt u het Nationaal Storingsnummer: 0800-9009.</p>`],
        ["meter", "De meter", `<p>De meter houdt bij hoeveel stroom u afneemt en teruglevert. In de meeste woningen hangt een slimme meter met een schermpje.</p>
<p><strong>Mag u eraan komen?</strong> Aflezen mag, verder niet. Ook de meter is van de netbeheerder.</p>`],
        ["hoofdschakelaar", "De hoofdschakelaar", `<p>Met de hoofdschakelaar zet u in één keer de stroom in de hele woning uit. Het is meestal een bredere schakelaar aan het begin van de rij, vaak met een draaiknop of een brede hendel.</p>
<p><strong>Mag u eraan komen?</strong> Ja. Gebruik hem als u een brandlucht ruikt of als er water in de buurt van de installatie komt.</p>`],
        ["aardlek", "De aardlekschakelaars", `<p>Een aardlekschakelaar schakelt de stroom uit zodra er stroom weglekt, bijvoorbeeld via een defect apparaat of via een persoon. Dat voorkomt een gevaarlijke schok. U herkent hem aan de testknop, vaak met de letter T. Achter één aardlekschakelaar zitten meestal meerdere groepen.</p>
<p><strong>Mag u eraan komen?</strong> Ja. U mag hem weer inschakelen en de testknop gebruiken. Blijft hij uitvallen, lees dan <a href="/kennisbank/aardlekschakelaar-valt-uit/">zo vindt u de oorzaak</a>.</p>`],
        ["groepen", "De groepen", `<p>Een groep is een aparte stroomkring voor een deel van uw woning: bijvoorbeeld de woonkamer, de keuken of de wasmachine. Elke groep heeft een eigen schakelaar, de installatieautomaat. Die schakelt uit als de groep overbelast raakt of als er kortsluiting is.</p>
<p><strong>Mag u eraan komen?</strong> Ja. Haal eerst een paar apparaten van de groep af en zet de schakelaar dan weer omhoog. Valt hij direct opnieuw uit, laat hem dan uit.</p>`],
        ["extra", "Wat er verder in kan zitten", `<ul class="checks"><li><strong>Een kookgroep:</strong> twee gekoppelde schakelaars voor een elektrische kookplaat.</li><li><strong>Een groep voor zonnepanelen:</strong> hierop is de omvormer aangesloten.</li><li><strong>Een groep voor de laadpaal</strong> of voor een thuisbatterij.</li><li><strong>Een extra meter</strong> voor load balancing, die het totale verbruik bijhoudt.</li></ul>`],
        ["stoppenkast", "Stoppenkast of moderne groepenkast?", `<p>In een oude kast zitten ronde schroefzekeringen van porselein of glas, de stoppen. Is er één doorgebrand, dan moet er een nieuwe in. Een moderne groepenkast heeft schakelaars die u weer omhoog zet. Belangrijker nog: een oude kast heeft vaak geen aardlekschakelaar. Die beveiliging hoort in elke woning aanwezig te zijn.</p>`],
        ["welkegroep", "Welke groep hoort bij welke ruimte?", `<p>In een nette kast staat bij elke groep een nummer met een omschrijving, of er hangt een lijst op de deur. Ontbreekt die, dan maakt u hem zelf. Zet één groep uit, loop door het huis en noteer welke lampen en stopcontacten geen stroom meer hebben. Doe dat groep voor groep. Bij een storing weet u dan direct waar u moet kijken.</p>`]
      ],
      bellen: ["Er is geen aardlekschakelaar in de kast.", "De kast heeft nog schroefzekeringen (stoppen).", "U ziet brandplekken, verkleuring of losse onderdelen.", "De verzegeling van de netbeheerder is verbroken: meld dat bij uw netbeheerder."] },

    /* ---------- K2 ---------- */
    { slug: "1-fase-of-3-fase", cluster: "meterkast", datum,
      kort_titel: "1-fase of 3-fase?",
      h1: "1-fase of 3-fase: wat heb ik, en wanneer moet ik verzwaren?",
      title: "1-fase of 3-fase: wat heb ik en wanneer verzwaren?",
      desc: "Zo ziet u of u een 1-fase of 3-fase aansluiting heeft, welke apparaten 3-fase vragen en hoe verzwaren bij de netbeheerder verloopt.",
      lead: "U ziet het aan drie dingen: het opschrift op uw meter, de breedte van de hoofdschakelaar en de aansluitwaarde die uw netbeheerder van u heeft. Verzwaren naar 3-fase is pas nodig als wat u wilt aansluiten niet meer op 1-fase past. Dat is minder vaak het geval dan veel mensen denken.",
      kort: ["Het opschrift op de meter en de hoofdschakelaar laten zien wat u heeft.", "Veel past op 1-fase. Laden op 11 kW en grote batterijen vragen 3-fase.", "De aansluiting verzwaart de netbeheerder, de groepenkast past een installateur aan."],
      dienst: D.meterkast,
      zin: "Twijfelt u wat u heeft? Op een foto van uw meterkast is het meestal direct te zien.",
      verwant: ["meterkast-geschikt-laadpaal-thuisbatterij", "inductie-koken-aparte-groep"],
      secties: [
        ["herkennen", "Hoe ziet u wat u heeft?", `<ul class="checks"><li><strong>Het opschrift op de meter.</strong> Staat er 3x230/400 V, dan is het een 3-fasemeter. Staat er alleen 230 V, dan heeft u 1-fase. Let op: soms hangt er een 3-fasemeter aan een 1-fase aansluiting. De meter alleen geeft dus geen zekerheid.</li><li><strong>De hoofdschakelaar.</strong> Bij 1-fase is hij smal, met twee aansluitingen. Bij 3-fase is hij ongeveer twee keer zo breed.</li><li><strong>De aansluitwaarde.</strong> Uw netbeheerder weet precies wat u heeft, bijvoorbeeld 1x35 A of 3x25 A. Het eerste getal is het aantal fasen, het tweede de sterkte van de hoofdzekering in ampère.</li></ul>
<p>Twijfelt u? Maak een foto van de meter en de kast. Een installateur ziet het vrijwel altijd direct.</p>`],
        ["verschil", "Wat is het verschil?", `<p>Bij 1-fase komt de stroom over één draad uw woning binnen, bij 3-fase over drie. Met drie fasen kan uw woning in totaal meer vermogen tegelijk afnemen. Een gangbare 1-fase aansluiting van 1x35 A levert ongeveer 8 kilowatt. Een 3-fase aansluiting van 3x25 A levert ongeveer 17 kilowatt.</p>
<p>Ter vergelijking: een waterkoker vraagt ongeveer 2 kilowatt, een oven 3 en een laadpaal op volle snelheid 11.</p>`],
        ["apparaten", "Wat wilt u aansluiten?", `<div class="tablewrap"><table><thead><tr><th>Apparaat</th><th>Redt 1-fase dit meestal?</th></tr></thead><tbody>
<tr><td>Inductiekookplaat</td><td>Ja, op een eigen kookgroep</td></tr>
<tr><td>Laadpaal tot ongeveer 7,4 kW</td><td>Ja, vaak met load balancing</td></tr>
<tr><td>Laadpaal op 11 kW</td><td>Nee, daarvoor is 3-fase nodig</td></tr>
<tr><td>Warmtepomp</td><td>Vaak wel, afhankelijk van het model</td></tr>
<tr><td>Thuisbatterij</td><td>Kleinere modellen wel, grote vermogens niet</td></tr>
<tr><td>Zonnepanelen</td><td>Kleinere installaties wel</td></tr>
</tbody></table></div>
<p>Het gaat niet alleen om één apparaat, maar om wat er tegelijk aanstaat. Load balancing en slim plannen, zoals 's nachts laden, voorkomen vaak een verzwaring.</p>`],
        ["verzwaren", "Hoe verloopt verzwaren?", `<p>Verzwaren bestaat uit twee delen, met twee partijen.</p>
<p><strong>De netbeheerder verzwaart de aansluiting.</strong> U vraagt dat aan via mijnaansluiting.nl. De netbeheerder past de hoofdzekering en zo nodig de meter en de kabel aan. Daarvoor betaalt u eenmalige kosten, die per netbeheerder verschillen. De vaste jaarlijkse kosten blijven tot en met 3x25 A bij de meeste netbeheerders gelijk. In gebieden waar het stroomnet vol is, kan voor een zwaardere aansluiting een wachtlijst gelden. Uw netbeheerder vertelt of dat bij u zo is.</p>
<p><strong>Een installateur past de groepenkast aan.</strong> De hoofdschakelaar en de aardlekschakelaars worden vervangen door 3-fase uitvoeringen en de groepen worden over de drie fasen verdeeld. Zonder die aanpassing heeft u niets aan de zwaardere aansluiting.</p>`],
        ["volgorde", "In welke volgorde regelt u het?", `<p>Vraag eerst een installateur wat u werkelijk nodig heeft. Blijkt 3-fase nodig, dan doet u de aanvraag bij de netbeheerder en wordt het werk aan de groepenkast daarop afgestemd. Zo zit u niet onnodig lang zonder stroom en betaalt u niet voor een verzwaring die niet nodig was.</p>`]
      ],
      bellen: ["U wilt een laadpaal, kookplaat, warmtepomp of batterij laten aansluiten en weet niet of het past.", "De hoofdschakelaar of een aardlekschakelaar valt uit als er veel tegelijk aanstaat.", "Uw aansluiting is verzwaard, maar de groepenkast is nog niet aangepast.", "De hoofdzekering van de netbeheerder is uitgevallen: bel 0800-9009."] },

    /* ---------- K3 ---------- */
    { slug: "aardlekschakelaar-valt-uit", cluster: "storingen", datum,
      kort_titel: "Aardlekschakelaar valt steeds uit",
      h1: "De aardlekschakelaar valt steeds uit: zo vindt u de oorzaak",
      title: "Aardlekschakelaar valt steeds uit? Zo vindt u de oorzaak",
      desc: "De aardlekschakelaar blijft uitvallen. Met dit stappenplan vindt u veilig welke groep of welk apparaat de oorzaak is, en wanneer u een elektricien belt.",
      lead: "Blijft de aardlekschakelaar uitvallen, dan lekt er ergens stroom weg. Meestal komt dat door een defect apparaat of door vocht. Met het stappenplan hieronder vindt u veilig uit welke groep en welk apparaat de oorzaak is. U hoeft daarvoor niets open te maken.",
      kort: ["De oorzaak is meestal een defect apparaat of vocht.", "Met vijf stappen vindt u zelf de groep en het apparaat.", "Valt hij ook uit met alle groepen uit, dan is een elektricien nodig."],
      dienst: D.overige,
      zin: "Vindt u de oorzaak niet, of zit de fout in de installatie? Beschrijf wat er gebeurt en sinds wanneer.",
      verwant: ["wat-zit-er-in-mijn-meterkast", "inductie-koken-aparte-groep"],
      secties: [
        ["watdoet", "Wat doet een aardlekschakelaar?", `<p>Een aardlekschakelaar vergelijkt de stroom die uw woning in gaat met de stroom die terugkomt. Is er verschil, dan lekt er stroom weg, bijvoorbeeld via een defect apparaat of via een persoon. De schakelaar zet de stroom dan binnen een fractie van een seconde uit.</p>`],
        ["verschil", "Aardlekschakelaar of groep?", `<p>Kijk eerst wat er precies is uitgevallen.</p>
<ul class="checks"><li><strong>De aardlekschakelaar</strong> heeft een testknop. Valt hij uit, dan hebben meerdere groepen tegelijk geen stroom.</li><li><strong>Een groep</strong> is een enkele schakelaar zonder testknop. Valt die uit, dan heeft alleen dat deel van de woning geen stroom. De oorzaak is dan meestal overbelasting: te veel apparaten tegelijk op één groep.</li></ul>`],
        ["stappenplan", "Stappenplan: zo vindt u de oorzaak", `<ol class="steps v">
<li><b>Zet alle groepen uit</b><span>Zet de schakelaars van alle groepen achter de uitgevallen aardlekschakelaar omlaag.</span></li>
<li><b>Zet de aardlekschakelaar aan</b><span>Blijft hij aan, ga dan verder. Valt hij direct weer uit, lees dan verderop wat dat betekent.</span></li>
<li><b>Zet de groepen één voor één aan</b><span>Wacht na elke groep even. De groep waarbij de aardlekschakelaar uitvalt, is de verdachte.</span></li>
<li><b>Haal de stekkers eruit</b><span>Zet de verdachte groep uit en trek van alle apparaten op die groep de stekker uit het stopcontact.</span></li>
<li><b>Steek de apparaten één voor één terug</b><span>Zet de groep en de aardlekschakelaar aan. Het apparaat waarbij hij uitvalt, is de oorzaak. Gebruik het niet meer.</span></li>
</ol>`],
        ["oorzaken", "De meest voorkomende oorzaken", `<ul class="checks"><li><strong>Een defect apparaat.</strong> Vooral apparaten met een verwarmingselement: wasmachine, vaatwasser, waterkoker, boiler of oven.</li><li><strong>Vocht.</strong> Een buitenlamp, een stopcontact in de tuin of een aansluiting in de badkamer. Valt de schakelaar vooral uit na regen, zoek het dan buiten.</li><li><strong>Een beschadigd snoer</strong> of een verlengsnoer dat buiten ligt.</li><li><strong>Veel apparaten op één aardlekschakelaar.</strong> Elk apparaat lekt een heel klein beetje stroom. Bij veel apparaten samen kan dat net te veel worden, zonder dat er één echt defect is.</li></ul>`],
        ["allesuit", "Hij valt uit terwijl alle groepen uit staan", `<p>Dan zit de fout niet in een apparaat. De oorzaak ligt in de vaste installatie of in de aardlekschakelaar zelf. Dat kunt u niet zelf oplossen. Laat de schakelaar uit en schakel een elektricien in.</p>`],
        ["nooit", "Nooit vastzetten of overbruggen", `<p>Een aardlekschakelaar die uitvalt, doet zijn werk. Zet hem nooit vast met tape of een wig en laat hem nooit overbruggen. De stroom die weglekt, kan dan door iemand heen gaan die het apparaat aanraakt. Dat is levensgevaarlijk.</p>`],
        ["testknop", "Hoe gebruikt u de testknop?", `<p>Druk de testknop in. De schakelaar hoort direct uit te vallen. Zet hem daarna weer aan. Valt hij niet uit, dan werkt hij niet meer en moet hij worden vervangen.</p>
<p>Hoe vaak u test, is niet wettelijk vastgelegd. De adviezen van fabrikanten lopen uiteen van elke maand tot twee keer per jaar. Twee keer per jaar is voor de meeste huishoudens goed vol te houden. Houd er rekening mee dat de stroom op de aangesloten groepen even uitvalt.</p>`]
      ],
      bellen: ["De aardlekschakelaar valt direct weer uit terwijl alle groepen uit staan.", "U ruikt een brandlucht of onderdelen in de kast worden warm.", "Hij valt na elke regenbui opnieuw uit.", "Hij reageert niet op de testknop.", "U vindt de oorzaak niet met het stappenplan."] },

    /* ---------- K4 ---------- */
    { slug: "inductie-koken-aparte-groep", cluster: "verduurzamen", datum,
      kort_titel: "Inductie koken: aparte groep nodig?",
      h1: "Inductie koken: heeft u een aparte groep nodig?",
      title: "Inductie koken: heeft u een aparte groep nodig?",
      desc: "Van gas naar inductie? In bijna alle gevallen is een eigen kookgroep nodig. Zo ziet u of die er al is en wat er anders moet gebeuren.",
      lead: "Ja, in bijna alle gevallen. Een inductiekookplaat vraagt meer vermogen dan een gewone groep kan leveren en krijgt daarom een eigen kookgroep in de meterkast. Heeft u die al, dan hoeft er vaak weinig te gebeuren.",
      kort: ["Een inductiekookplaat hoort op een eigen kookgroep, niet op een gewone groep.", "Een groot stopcontact met vijf gaten achter het fornuis wijst op een kookgroep.", "Is de kast vol, dan moet die eerst worden uitgebreid."],
      dienst: D.meterkast,
      zin: "Stapt u over op inductie? Stuur een foto van uw meterkast en het type kookplaat mee.",
      verwant: ["1-fase-of-3-fase", "wat-zit-er-in-mijn-meterkast"],
      secties: [
        ["waarom", "Waarom niet op een gewone groep?", `<p>Een gewone groep in huis is beveiligd op 16 ampère. Dat is genoeg voor ongeveer 3,7 kilowatt. Een inductiekookplaat met vier zones vraagt op vol vermogen ongeveer het dubbele: rond de 7,4 kilowatt. Sluit u die aan op een gewone groep, dan valt de groep uit zodra u op meerdere zones tegelijk kookt. Daarom krijgt een kookplaat een eigen kookgroep: een aansluiting in de meterkast die alleen voor de kookplaat is.</p>`],
        ["controleren", "Hoe ziet u of er al een kookgroep is?", `<ul class="checks"><li><strong>In de meterkast:</strong> twee schakelaars naast elkaar die met een beugel aan elkaar zijn gekoppeld, vaak met de aanduiding koken of fornuis.</li><li><strong>In de keuken:</strong> een groter stopcontact met vijf gaten achter het fornuis of in het keukenkastje ernaast. Dat is een perilex-stopcontact, bedoeld voor een kookplaat of fornuis.</li></ul>
<p>Heeft u beide, dan is de kookgroep er al. Kookt u nu op gas, dan ontbreekt hij in de meeste woningen.</p>`],
        ["varianten", "De drie manieren van aansluiten", `<p>Op de sticker onder of achter op de kookplaat en in de handleiding staat hoe het toestel kan worden aangesloten.</p>
<ul class="checks"><li><strong>Op 1 fase.</strong> Kleine kookplaten en modellen met een gewone stekker. Het vermogen is beperkt tot ongeveer 3,7 kilowatt, dus op meerdere zones tegelijk kookt u langzamer.</li><li><strong>Op 2 fasen.</strong> De meest gebruikte aansluiting in Nederland: twee groepen van 16 ampère, samen ongeveer 7,4 kilowatt. Dit kan ook in een woning met een 1-fase aansluiting.</li><li><strong>Op 3 fasen.</strong> Voor brede kookplaten en fornuizen, tot ongeveer 11 kilowatt. Dit kan alleen als uw woning een 3-fase aansluiting heeft.</li></ul>
<p>Veel kookplaten hebben vermogensbeheer: de plaat verdeelt het beschikbare vermogen zelf over de zones. Bij de installatie kan het maximale vermogen worden begrensd, zodat de kookplaat ook op een lichtere aansluiting werkt. U kookt dan iets langzamer als alle zones tegelijk op de hoogste stand staan.</p>
<p>Wat u heeft, leest u in <a href="/kennisbank/1-fase-of-3-fase/">1-fase of 3-fase</a>.</p>`],
        ["installateur", "Wat doet de installateur?", `<ul class="checks"><li>Een kookgroep bijplaatsen in de meterkast.</li><li>Een eigen leiding leggen van de meterkast naar de keuken.</li><li>Een perilex-stopcontact plaatsen en de kookplaat aansluiten volgens het schema van de fabrikant.</li><li>De aansluiting testen.</li></ul>
<p>Hoeveel werk dat is, hangt vooral af van de route van de leiding: door een kruipruimte gaat het snel, door afgewerkte wanden of vloeren kost het meer tijd. De planning staat in uw offerte.</p>`],
        ["vol", "En als de meterkast vol is?", `<p>Een kookgroep neemt twee plekken in. Is de kast vol, dan moet die eerst worden uitgebreid of vervangen. Een oude kast met schroefzekeringen wordt altijd vervangen voordat er een kookgroep bij komt.</p>`],
        ["combineren", "Combineren met andere plannen", `<p>Overweegt u ook een laadpaal, een warmtepomp of een thuisbatterij? Laat dat dan in één keer beoordelen. Elk van die apparaten krijgt een eigen groep. Wie de kast in één keer goed laat aanpassen, voorkomt dat hij een jaar later opnieuw open moet.</p>`]
      ],
      bellen: ["U stapt over op inductie en er is geen kookgroep.", "De meterkast is vol of heeft nog schroefzekeringen.", "De kookplaat is op een gewone groep aangesloten en die valt uit bij het koken.", "Er zit een perilex-stopcontact, maar u weet niet hoe het is aangesloten."] }
  ];

  const bySlug = {};
  artikelen.forEach(a => { bySlug[a.slug] = a; a.url = "/kennisbank/" + a.slug + "/"; });
  return { clusters, artikelen, bySlug };
};
