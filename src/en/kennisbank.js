// English knowledge base. Same articles, figures and sources as src/kennisbank.js (Dutch); keep both in step.
// id = the Dutch slug (links the two languages), slug = the English url.
module.exports = function (c) {
  const clusters = [
    ["meterkast", "Understanding your meter cupboard"],
    ["storingen", "Faults and safety"],
    ["verduurzamen", "Making your home more sustainable"],
    ["laden", "EV charger and home battery"]
  ];
  const D = {
    meterkast: { href: "/en/fuse-box/", label: "Have your fuse box replaced or extended" },
    laadpaal: { href: "/en/ev-charger/", label: "Have an EV charger installed" },
    groepenkast: { href: "/en/fuse-box/replacement/", label: "Have your fuse box replaced" },
    inductie: { href: "/en/electrical-work/induction-hob/", label: "Have your induction hob connected" },
    thuisbatterij: { href: "/en/home-battery/", label: "Have a home battery installed" }
  };
  const datum = "2026-11-13";

  const artikelen = [
    /* ---------- K5 ---------- */
    { id: "meterkast-geschikt-laadpaal-thuisbatterij", slug: "meter-cupboard-ready-for-ev-charger-or-home-battery", cluster: "laden", datum,
      kort_titel: "Meter cupboard ready for an EV charger or battery?",
      h1: "Is my meter cupboard ready for an EV charger or home battery?",
      title: "Meter cupboard ready for an EV charger or home battery?",
      desc: "Five points to check yourself whether your meter cupboard is ready for an EV charger or home battery, and what needs to happen first if it is not.",
      lead: "In most homes an EV charger or home battery can be connected, but rarely without changes. Both get their own circuit in the meter cupboard (meterkast), and there has to be room for that. With the five points below you can see for yourself where you stand.",
      kort: ["An EV charger and a home battery each get their own circuit with their own protection.", "You can check five points yourself, without opening anything.", "With a photo of your meter cupboard, a lot can already be assessed remotely."],
      dienst: D.thuisbatterij, dienst2: D.laadpaal,
      zin: "Want to know what is needed in your home? Send a photo of your meter cupboard with your request.",
      verwant: ["1-fase-of-3-fase", "wat-zit-er-in-mijn-meterkast"],
      secties: [
        ["phase", "Point 1: do you have single-phase or three-phase?", `<p>Your connection determines how much power your home can draw at the same time. With single-phase the power comes in over one wire, with three-phase over three. How to see what you have is explained in <a href="/en/knowledge-base/single-phase-or-three-phase/">single-phase or three-phase</a>.</p>
<p><strong>Fine:</strong> with single-phase you can charge at about 3.7 kW, and at 7.4 kW if your connection allows it. Smaller home batteries also work on single-phase.</p>
<p><strong>Needs changes:</strong> for charging at 11 kW or a battery with a high power rating, you need three-phase.</p>`],
        ["room", "Point 2: is there free space in the fuse box?", `<p>A circuit (groep) is a separate electrical circuit with its own protection. In the fuse box you recognise the circuits as a row of switches next to each other. Check whether there are empty slots next to them, covered with a blank plate.</p>
<p><strong>Fine:</strong> there are still a few free slots. Then a circuit can usually be added.</p>
<p><strong>Needs changes:</strong> the row is full. The fuse box then has to be extended or replaced before anything can be added.</p>`],
        ["condition", "Point 3: how old is the fuse box and what condition is it in?", `<p>An old fuse box has round screw-in fuses (stoppen). A modern fuse box has switches that you flip back up.</p>
<p><strong>Fine:</strong> a fuse box with switches, without discolouration or loose parts.</p>
<p><strong>Needs changes:</strong> a fuse box with screw-in fuses, or one in which parts are discoloured. It is replaced first.</p>`],
        ["rcd", "Point 4: is there RCD protection?", `<p>A residual current device (RCD, aardlekschakelaar) switches off the power as soon as current leaks away, for example through a faulty appliance or through a person. You recognise it by a small test button, often marked with the letter T.</p>
<p><strong>Fine:</strong> there is at least one RCD in the fuse box.</p>
<p><strong>Needs changes:</strong> there is none. An EV charger also needs a type that trips on DC leakage. Sometimes that is built into the charger itself. Which type suits you is decided by the installer.</p>`],
        ["distance", "Point 5: how far is it to the charging point or the battery?", `<p>The cable runs from the meter cupboard to the charger or the battery. Measure the distance and look at the route: can the cable go through a wall or crawl space, or does digging in the garden or driveway have to be done?</p>
<p>A short, straight route is little work. A long route with digging makes up a large part of the job.</p>`],
        ["loadbalancing", "Load balancing often avoids an upgrade", `<p>If your car charges while the oven and the tumble dryer are also on, your home asks for more power than the connection can handle. Load balancing solves this: a meter in the fuse box monitors the total consumption and the charger temporarily charges more slowly. As a result, a heavier connection is often not needed.</p>`],
        ["check", "What an installer still checks on site", `<ul class="checks"><li>The rating of the main fuse.</li><li>The earthing and the condition of the existing wiring.</li><li>For a battery: the brand and type of your inverter and the place where the battery will go.</li></ul>`],
        ["send", "What you can send for a first assessment", `<ul class="checks"><li>A photo of your meter cupboard, with the door open.</li><li>A photo of the label on your meter.</li><li>The distance to the charging point or the place for the battery.</li><li>The brand and type of your car, charger or battery, if you already know them.</li></ul>
<p>After installation you register a home battery on energieleveren.nl, just like solar panels. This is mandatory and free.</p>`]
      ],
      bellen: ["Your fuse box still has screw-in fuses or there is no RCD.", "The fuse box is full and you want something connected.", "You are not sure whether you have single-phase or three-phase.", "Parts are warm or discoloured, or you smell burning. Then switch the circuit off and contact an electrician immediately."] },

    /* ---------- K1 ---------- */
    { id: "wat-zit-er-in-mijn-meterkast", slug: "whats-in-my-meter-cupboard", cluster: "meterkast", datum,
      kort_titel: "What's in my meter cupboard?",
      h1: "What's in my meter cupboard?",
      title: "What's in my meter cupboard? Each part explained",
      desc: "Main fuse, meter, main switch, RCDs and circuits: what each part does, and what you may and may not touch.",
      lead: "In your meter cupboard (meterkast) the power passes five parts: the connection with the main fuse, the meter, the main switch, one or more residual current devices (RCDs) and the circuits. The first two belong to the grid operator and are sealed. Everything from the main switch onwards is yours.",
      kort: ["Connection, main fuse and meter belong to the grid operator: do not touch.", "You may operate the main switch, RCDs and circuits.", "A fuse box with screw-in fuses or without an RCD is outdated."],
      dienst: D.meterkast,
      zin: "Is your fuse box outdated or full? Send us a photo and we will tell you what is needed.",
      verwant: ["1-fase-of-3-fase", "aardlekschakelaar-valt-uit"],
      secties: [
        ["connection", "The connection and the main fuse", `<p>This is where the power cable enters your home from outside. The main fuse protects the whole connection. This part sits in a closed box with a seal: a wire with a lead seal or a plastic seal.</p>
<p><strong>May you touch it?</strong> No. It belongs to the grid operator, the company that manages the electricity grid in your region. If the main fuse trips, call the national power outage number (Nationaal Storingsnummer): 0800-9009.</p>`],
        ["meter", "The meter", `<p>The meter records how much electricity you take from the grid and feed back into it. Most homes have a smart meter with a small display.</p>
<p><strong>May you touch it?</strong> You may read it, nothing more. The meter also belongs to the grid operator.</p>`],
        ["mainswitch", "The main switch", `<p>With the main switch you switch off the power in the whole house at once. It is usually a wider switch at the start of the row, often with a rotary knob or a wide lever.</p>
<p><strong>May you touch it?</strong> Yes. Use it if you smell burning or if water gets near the installation.</p>`],
        ["rcd", "The residual current devices (RCDs)", `<p>An RCD switches off the power as soon as current leaks away, for example through a faulty appliance or through a person. That prevents a dangerous shock. You recognise it by the test button, often marked with the letter T. One RCD usually protects several circuits.</p>
<p><strong>May you touch it?</strong> Yes. You may switch it back on and use the test button. If it keeps tripping, read <a href="/en/knowledge-base/rcd-keeps-tripping/">how to find the cause</a>.</p>`],
        ["circuits", "The circuits", `<p>A circuit (groep) is a separate electrical circuit for part of your home: for example the living room, the kitchen or the washing machine. Each circuit has its own switch, the circuit breaker. It switches off if the circuit is overloaded or if there is a short circuit.</p>
<p><strong>May you touch it?</strong> Yes. First unplug a few appliances on the circuit, then flip the switch back up. If it trips again immediately, leave it off.</p>`],
        ["extra", "What else may be in it", `<ul class="checks"><li><strong>A cooker circuit:</strong> two linked switches for an electric hob.</li><li><strong>A circuit for solar panels:</strong> the inverter is connected to it.</li><li><strong>A circuit for the EV charger</strong> or for a home battery.</li><li><strong>An extra meter</strong> for load balancing, which monitors the total consumption.</li></ul>`],
        ["oldfusebox", "Screw-in fuses or a modern fuse box?", `<p>An old fuse box has round screw-in fuses (stoppen) made of porcelain or glass. If one blows, it has to be replaced. A modern fuse box has switches that you flip back up. More importantly: an old fuse box often has no RCD. That protection should be present in every home.</p>`],
        ["whichcircuit", "Which circuit belongs to which room?", `<p>In a tidy fuse box every circuit has a number with a description, or there is a list on the door. If it is missing, make one yourself. Switch off one circuit, walk through the house and note which lights and sockets no longer have power. Do this circuit by circuit. Then, if there is a fault, you know immediately where to look.</p>`]
      ],
      bellen: ["There is no RCD in the fuse box.", "The fuse box still has screw-in fuses.", "You see scorch marks, discolouration or loose parts.", "The grid operator's seal is broken: report this to your grid operator."] },

    /* ---------- K2 ---------- */
    { id: "1-fase-of-3-fase", slug: "single-phase-or-three-phase", cluster: "meterkast", datum,
      kort_titel: "Single-phase or three-phase?",
      h1: "Single-phase or three-phase: what do I have, and when should I upgrade?",
      title: "Single-phase or three-phase: what do I have?",
      desc: "How to tell whether you have a single-phase or three-phase connection, which appliances need three-phase and how an upgrade with the grid operator works.",
      lead: "You can tell from three things: the label on your meter, the width of the main switch and the connection capacity your grid operator has on record for you. Upgrading to three-phase is only needed if what you want to connect no longer fits on single-phase. That is less often the case than many people think.",
      kort: ["The label on the meter and the main switch show what you have.", "A lot fits on single-phase. Charging at 11 kW and large batteries need three-phase.", "The grid operator upgrades the connection; an installer adapts the fuse box."],
      dienst: D.meterkast,
      zin: "Not sure what you have? On a photo of your meter cupboard it can usually be seen straight away.",
      verwant: ["meterkast-geschikt-laadpaal-thuisbatterij", "inductie-koken-aparte-groep"],
      secties: [
        ["recognise", "How can you tell what you have?", `<ul class="checks"><li><strong>The label on the meter.</strong> If it says 3x230/400 V, it is a three-phase meter. If it only says 230 V, you have single-phase. Note: sometimes a three-phase meter is fitted to a single-phase connection. The meter alone therefore gives no certainty.</li><li><strong>The main switch.</strong> With single-phase it is narrow, with two connections. With three-phase it is about twice as wide.</li><li><strong>The connection capacity.</strong> Your grid operator knows exactly what you have, for example 1x35 A or 3x25 A. The first number is the number of phases, the second the rating of the main fuse in amps.</li></ul>
<p>Not sure? Take a photo of the meter and the fuse box. An installer can almost always tell straight away.</p>`],
        ["difference", "What is the difference?", `<p>With single-phase the power enters your home over one wire, with three-phase over three. With three phases your home can draw more power in total at the same time. A standard single-phase connection of 1x35 A supplies about 8 kilowatts. A three-phase connection of 3x25 A supplies about 17 kilowatts.</p>
<p>For comparison: a kettle needs about 2 kilowatts, an oven 3 and an EV charger at full speed 11.</p>`],
        ["appliances", "What do you want to connect?", `<div class="tablewrap"><table><thead><tr><th>Appliance</th><th>Does single-phase usually cope?</th></tr></thead><tbody>
<tr><td>Induction hob</td><td>Yes, on its own cooker circuit</td></tr>
<tr><td>EV charger up to about 7.4 kW</td><td>Yes, often with load balancing</td></tr>
<tr><td>EV charger at 11 kW</td><td>No, that needs three-phase</td></tr>
<tr><td>Heat pump</td><td>Often yes, depending on the model</td></tr>
<tr><td>Home battery</td><td>Smaller models yes, high power ratings no</td></tr>
<tr><td>Solar panels</td><td>Smaller systems yes</td></tr>
</tbody></table></div>
<p>It is not just about one appliance, but about what is on at the same time. Load balancing and smart planning, such as charging overnight, often avoid an upgrade.</p>`],
        ["upgrade", "How does an upgrade work?", `<p>An upgrade consists of two parts, with two parties.</p>
<p><strong>The grid operator upgrades the connection.</strong> You apply for this via mijnaansluiting.nl. The grid operator adapts the main fuse and, if needed, the meter and the cable. You pay a one-off fee for this, which differs per grid operator. The fixed annual costs stay the same up to and including 3x25 A at most grid operators. In areas where the grid is full, there may be a waiting list for a heavier connection. Your grid operator will tell you whether that applies to you.</p>
<p><strong>An installer adapts the fuse box.</strong> The main switch and the RCDs are replaced by three-phase versions and the circuits are divided across the three phases. Without that adaptation, the heavier connection is of no use to you.</p>`],
        ["order", "In which order do you arrange it?", `<p>First ask an installer what you really need. If three-phase turns out to be necessary, you apply to the grid operator and the work on the fuse box is planned around it. That way you are not without power for longer than needed, and you do not pay for an upgrade that was not necessary.</p>`]
      ],
      bellen: ["You want to connect an EV charger, hob, heat pump or battery and do not know whether it fits.", "The main switch or an RCD trips when a lot is on at the same time.", "Your connection has been upgraded, but the fuse box has not yet been adapted.", "The grid operator's main fuse has tripped: call 0800-9009."] },

    /* ---------- K3 ---------- */
    { id: "aardlekschakelaar-valt-uit", slug: "rcd-keeps-tripping", cluster: "storingen", datum,
      kort_titel: "RCD keeps tripping",
      h1: "The RCD keeps tripping: how to find the cause",
      title: "RCD keeps tripping? How to find the cause",
      desc: "Your RCD keeps tripping. With this step-by-step plan you safely find which circuit or appliance is the cause, and when to call an electrician.",
      lead: "If the residual current device (RCD, aardlekschakelaar) keeps tripping, current is leaking away somewhere. Usually this is caused by a faulty appliance or by moisture. With the step-by-step plan below you can safely find out which circuit and which appliance is the cause. You do not need to open anything.",
      kort: ["The cause is usually a faulty appliance or moisture.", "With five steps you find the circuit and the appliance yourself.", "If it also trips with all circuits switched off, an electrician is needed."],
      dienst: D.groepenkast, geenStoring: true,
      zin: "Does the RCD keep tripping because of an outdated or overloaded fuse box? Then you can have the fuse box replaced.",
      verwant: ["wat-zit-er-in-mijn-meterkast", "inductie-koken-aparte-groep"],
      secties: [
        ["whatitdoes", "What does an RCD do?", `<p>An RCD compares the current going into your home with the current coming back. If there is a difference, current is leaking away, for example through a faulty appliance or through a person. The switch then cuts the power within a fraction of a second.</p>`],
        ["difference", "RCD or circuit?", `<p>First check exactly what has tripped.</p>
<ul class="checks"><li><strong>The RCD</strong> has a test button. If it trips, several circuits are without power at the same time.</li><li><strong>A circuit</strong> is a single switch without a test button. If it trips, only that part of the home is without power. The cause is then usually overload: too many appliances on one circuit at the same time.</li></ul>`],
        ["steps", "Step-by-step: how to find the cause", `<ol class="steps v">
<li><b>Switch off all circuits</b><span>Switch down all circuits behind the tripped RCD.</span></li>
<li><b>Switch the RCD on</b><span>If it stays on, carry on. If it trips again immediately, read further down what that means.</span></li>
<li><b>Switch the circuits on one by one</b><span>Wait a moment after each circuit. The circuit on which the RCD trips is the suspect.</span></li>
<li><b>Unplug everything</b><span>Switch off the suspect circuit and unplug all appliances on that circuit.</span></li>
<li><b>Plug the appliances back in one by one</b><span>Switch the circuit and the RCD on. The appliance on which it trips is the cause. Stop using it.</span></li>
</ol>`],
        ["causes", "The most common causes", `<ul class="checks"><li><strong>A faulty appliance.</strong> Especially appliances with a heating element: washing machine, dishwasher, kettle, water heater or oven.</li><li><strong>Moisture.</strong> An outdoor light, a socket in the garden or a connection in the bathroom. If the switch mainly trips after rain, look outside.</li><li><strong>A damaged lead</strong> or an extension lead lying outside.</li><li><strong>Many appliances on one RCD.</strong> Every appliance leaks a very small amount of current. With many appliances together, that can add up to just too much, without one of them actually being faulty.</li></ul>`],
        ["alloff", "It trips while all circuits are switched off", `<p>Then the fault is not in an appliance. The cause lies in the fixed installation or in the RCD itself. You cannot solve this yourself. Leave the switch off and call in an electrician.</p>`],
        ["never", "Never fix or bypass it", `<p>An RCD that trips is doing its job. Never fix it in place with tape or a wedge, and never have it bypassed. The leaking current can then pass through someone who touches the appliance. That is life-threatening.</p>`],
        ["testbutton", "How do you use the test button?", `<p>Press the test button. The switch should trip immediately. Then switch it back on. If it does not trip, it no longer works and must be replaced.</p>
<p>How often you test is not laid down by law. Manufacturers' advice ranges from every month to twice a year. Twice a year is manageable for most households. Bear in mind that the power on the connected circuits briefly goes off.</p>`]
      ],
      bellen: ["The RCD trips again immediately while all circuits are switched off.", "You smell burning or parts in the fuse box get warm.", "It trips again after every rain shower.", "It does not respond to the test button.", "You cannot find the cause with the step-by-step plan."] },

    /* ---------- K4 ---------- */
    { id: "inductie-koken-aparte-groep", slug: "induction-hob-separate-circuit", cluster: "verduurzamen", datum,
      kort_titel: "Induction cooking: separate circuit needed?",
      h1: "Induction cooking: do you need a separate circuit?",
      title: "Induction cooking: do you need a separate circuit?",
      desc: "Switching from gas to induction? You almost always need a dedicated cooker circuit. How to see whether you already have one, and what to do if not.",
      lead: "Yes, in almost all cases. An induction hob needs more power than an ordinary circuit can supply, so it gets its own cooker circuit in the meter cupboard. If you already have one, often little needs to be done.",
      kort: ["An induction hob belongs on its own cooker circuit, not on an ordinary circuit.", "A large five-pin socket behind the cooker indicates a cooker circuit.", "If the fuse box is full, it has to be extended first."],
      dienst: D.inductie, dienst2: D.meterkast,
      zin: "Switching to induction? Send a photo of your meter cupboard and the type of hob.",
      verwant: ["1-fase-of-3-fase", "wat-zit-er-in-mijn-meterkast"],
      secties: [
        ["why", "Why not on an ordinary circuit?", `<p>An ordinary circuit in a home is protected at 16 amps. That is enough for about 3.7 kilowatts. A four-zone induction hob at full power needs about twice that: around 7.4 kilowatts. If you connect it to an ordinary circuit, the circuit trips as soon as you cook on several zones at once. That is why a hob gets its own cooker circuit: a connection in the meter cupboard that is only for the hob.</p>`],
        ["check", "How can you tell whether there is already a cooker circuit?", `<ul class="checks"><li><strong>In the meter cupboard:</strong> two switches next to each other, linked with a bar, often labelled koken (cooking) or fornuis (cooker).</li><li><strong>In the kitchen:</strong> a larger socket with five holes behind the cooker or in the kitchen cabinet next to it. That is a perilex socket, intended for a hob or cooker.</li></ul>
<p>If you have both, the cooker circuit is already there. If you currently cook on gas, it is missing in most homes.</p>`],
        ["variants", "The three ways to connect", `<p>The label under or on the back of the hob and the manual show how the appliance can be connected.</p>
<ul class="checks"><li><strong>On 1 phase.</strong> Small hobs and models with an ordinary plug. The power is limited to about 3.7 kilowatts, so you cook more slowly on several zones at once.</li><li><strong>On 2 phases.</strong> The most common connection in the Netherlands: two 16-amp circuits, together about 7.4 kilowatts. This is also possible in a home with a single-phase connection.</li><li><strong>On 3 phases.</strong> For wide hobs and range cookers, up to about 11 kilowatts. This is only possible if your home has a three-phase connection.</li></ul>
<p>Many hobs have power management: the hob itself divides the available power across the zones. During installation the maximum power can be limited, so the hob also works on a lighter connection. You then cook a little more slowly when all zones are on the highest setting at the same time.</p>
<p>What you have is explained in <a href="/en/knowledge-base/single-phase-or-three-phase/">single-phase or three-phase</a>.</p>`],
        ["installer", "What does the installer do?", `<ul class="checks"><li>Adding a cooker circuit in the meter cupboard.</li><li>Running a dedicated cable from the meter cupboard to the kitchen.</li><li>Fitting a perilex socket and connecting the hob according to the manufacturer's diagram.</li><li>Testing the connection.</li></ul>
<p>How much work that is depends mainly on the cable route: through a crawl space it is quick, through finished walls or floors it takes more time. The planning is in your quote.</p>`],
        ["full", "And if the fuse box is full?", `<p>A cooker circuit takes up two slots. If the fuse box is full, it first has to be extended or replaced. An old fuse box with screw-in fuses is always replaced before a cooker circuit is added.</p>`],
        ["combine", "Combining with other plans", `<p>Are you also considering an EV charger, a heat pump or a home battery? Then have it all assessed in one go. Each of those appliances gets its own circuit. Having the fuse box adapted properly in one go means it does not have to be opened up again a year later.</p>`]
      ],
      bellen: ["You are switching to induction and there is no cooker circuit.", "The fuse box is full or still has screw-in fuses.", "The hob is connected to an ordinary circuit and it trips when you cook.", "There is a perilex socket, but you do not know how it is connected."] }
  ];

  const bySlug = {};
  artikelen.forEach(a => { bySlug[a.id] = a; a.url = "/en/knowledge-base/" + a.slug + "/"; });
  return { clusters, artikelen, bySlug };
};
