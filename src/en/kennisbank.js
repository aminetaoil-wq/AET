// English knowledge base. Same articles, figures and sources as src/kennisbank.js (Dutch); keep both in step.
// id = the Dutch slug (links the two languages), slug = the English url.
module.exports = function (c) {
  const clusters = [
    ["meterkast", "Understanding your meter cupboard"],
    ["storingen", "Faults and safety"],
    ["verduurzamen", "Going electric"],
    ["laden", "EV chargers and home batteries"]
  ];
  const D = {
    meterkast: { href: "/en/fuse-box/", label: "Fuse box replacement or extension" },
    laadpaal: { href: "/en/ev-charger/", label: "EV charger installation" },
    groepenkast: { href: "/en/fuse-box/replacement/", label: "Fuse box replacement" },
    inductie: { href: "/en/electrical-work/induction-hob/", label: "Induction hob installation" },
    thuisbatterij: { href: "/en/home-battery/", label: "Home battery installation" }
  };
  const datum = "2026-11-13";

  const artikelen = [
    /* ---------- K5 ---------- */
    { id: "meterkast-geschikt-laadpaal-thuisbatterij", slug: "meter-cupboard-ready-for-ev-charger-or-home-battery", cluster: "laden", datum,
      kort_titel: "Is your meter cupboard ready for a charger or battery?",
      h1: "Is my meter cupboard ready for an EV charger or home battery?",
      title: "Is my meter cupboard ready for an EV charger or battery?",
      desc: "Five simple checks to see whether your meter cupboard is ready for an EV charger or home battery, and what needs to happen first if it isn't.",
      lead: "Most homes can take an EV charger or home battery, but rarely without some changes. Both need their own circuit in the meter cupboard (meterkast), and there has to be room for it. The five checks below show you where you stand.",
      kort: ["An EV charger and a home battery each need their own circuit with its own protection.", "You can do all five checks yourself, without opening anything up.", "From a photo of your meter cupboard, much can be assessed remotely."],
      dienst: D.thuisbatterij, dienst2: D.laadpaal,
      zin: "Want to know what your home needs? Send us a photo of your meter cupboard with your request.",
      verwant: ["1-fase-of-3-fase", "wat-zit-er-in-mijn-meterkast"],
      secties: [
        ["phase", "Check 1: single-phase or three-phase?", `<p>Your connection determines how much power your home can draw at once. With single-phase, power comes in over one conductor; with three-phase, over three. Our article <a href="/en/knowledge-base/single-phase-or-three-phase/">single-phase or three-phase</a> explains how to tell which you have.</p>
<p><strong>All good:</strong> on single-phase you can charge at around 3.7 kW, or 7.4 kW if your connection allows it. Smaller home batteries also run on single-phase.</p>
<p><strong>Work needed:</strong> charging at 11 kW, or a battery with a high power output, requires three-phase.</p>`],
        ["room", "Check 2: is there space in the fuse box?", `<p>A circuit (groep) is a separate electrical circuit with its own protection. In the fuse box, the circuits are the row of switches side by side. Look for empty spaces next to them, covered by a blanking plate.</p>
<p><strong>All good:</strong> there are still a few spare ways. A circuit can usually be added.</p>
<p><strong>Work needed:</strong> the row is full. The fuse box will need extending or replacing before anything else can be added.</p>`],
        ["condition", "Check 3: how old is the fuse box, and what condition is it in?", `<p>An old fuse box has round screw-in fuses (stoppen). A modern fuse box has switches that you simply flip back up.</p>
<p><strong>All good:</strong> a fuse box with switches, with no discolouration or loose parts.</p>
<p><strong>Work needed:</strong> a fuse box with screw-in fuses, or with discoloured components. It needs replacing first.</p>`],
        ["rcd", "Check 4: is there RCD protection?", `<p>A residual current device (RCD, aardlekschakelaar) cuts the power as soon as current leaks away, for example through a faulty appliance or through a person. You can recognise it by a small test button, often marked with the letter T.</p>
<p><strong>All good:</strong> there is at least one RCD in the fuse box.</p>
<p><strong>Work needed:</strong> there is none. An EV charger also needs a type of RCD that responds to DC leakage. Sometimes this is built into the charger. Your installer will determine which type you need.</p>`],
        ["distance", "Check 5: how far is it to the charging point or battery?", `<p>The cable runs from the meter cupboard to the charger or battery. Measure the distance and look at the route: can the cable go through a wall or crawl space, or will the garden or driveway need digging up?</p>
<p>A short, direct route is little work. A long route with excavation makes up a large part of the job.</p>`],
        ["loadbalancing", "Load balancing often avoids an upgrade", `<p>If your car is charging while the oven and tumble dryer are on, your home may demand more power than the connection can supply. Load balancing solves this: a meter in the fuse box monitors total consumption and the charger temporarily slows down. As a result, a heavier connection is often unnecessary.</p>`],
        ["check", "What an installer will check on site", `<ul class="checks"><li>The rating of the main fuse.</li><li>The earthing and the condition of the existing wiring.</li><li>For a battery: the make and model of your inverter and where the battery will go.</li></ul>`],
        ["send", "What to send us for an initial assessment", `<ul class="checks"><li>A photo of your meter cupboard with the door open.</li><li>A photo of the label on your meter.</li><li>The distance to the charging point or battery location.</li><li>The make and model of your car, charger or battery, if you know them.</li></ul>
<p>Once installed, a home battery must be registered on energieleveren.nl, just like solar panels. Registration is mandatory and free.</p>`]
      ],
      bellen: ["Your fuse box still has screw-in fuses, or there is no RCD.", "The fuse box is full and you want something connected.", "You are not sure whether you have single-phase or three-phase.", "Components feel warm or are discoloured, or you can smell burning. Switch off the circuit and contact an electrician immediately."] },

    /* ---------- K1 ---------- */
    { id: "wat-zit-er-in-mijn-meterkast", slug: "whats-in-my-meter-cupboard", cluster: "meterkast", datum,
      kort_titel: "What's in my meter cupboard?",
      h1: "What's in my meter cupboard?",
      title: "What's in my meter cupboard? Every part explained",
      desc: "Main fuse, meter, main switch, RCDs and circuits: what each part of your meter cupboard does, and what you can and cannot touch.",
      lead: "Electricity passes through five parts in your meter cupboard (meterkast): the incoming supply with the main fuse, the meter, the main switch, one or more residual current devices (RCDs) and the circuits. The first two belong to the grid operator and are sealed. Everything from the main switch onwards is yours.",
      kort: ["The incoming supply, main fuse and meter belong to the grid operator: do not touch them.", "You may operate the main switch, the RCDs and the circuit breakers.", "A fuse box with screw-in fuses, or without an RCD, is outdated."],
      dienst: D.meterkast,
      zin: "Is your fuse box outdated or full? Send us a photo and we'll tell you what's needed.",
      verwant: ["1-fase-of-3-fase", "aardlekschakelaar-valt-uit"],
      secties: [
        ["connection", "The incoming supply and the main fuse", `<p>This is where the power cable enters your home from outside. The main fuse protects the entire connection. This part sits in a closed housing with a seal: a wire with a lead seal, or a plastic seal.</p>
<p><strong>Can you touch it?</strong> No. It belongs to the grid operator, the company that manages the electricity network in your area. If the main fuse blows, call the national power outage line (Nationaal Storingsnummer) on 0800-9009.</p>`],
        ["meter", "The meter", `<p>The meter records how much electricity you import and export. Most homes have a smart meter with a small display.</p>
<p><strong>Can you touch it?</strong> You can read it, but nothing more. The meter also belongs to the grid operator.</p>`],
        ["mainswitch", "The main switch", `<p>The main switch turns off the power to the whole house in one go. It is usually a wider switch at the start of the row, often with a rotary knob or a large lever.</p>
<p><strong>Can you touch it?</strong> Yes. Use it if you smell burning or if water gets near the installation.</p>`],
        ["rcd", "The residual current devices (RCDs)", `<p>An RCD cuts the power as soon as current leaks away, for example through a faulty appliance or through a person, preventing a dangerous electric shock. You can recognise it by its test button, often marked with the letter T. One RCD usually protects several circuits.</p>
<p><strong>Can you touch it?</strong> Yes. You can switch it back on and use the test button. If it keeps tripping, read <a href="/en/knowledge-base/rcd-keeps-tripping/">how to find the cause</a>.</p>`],
        ["circuits", "The circuits", `<p>A circuit (groep) supplies one part of your home: the living room, for example, the kitchen or the washing machine. Each circuit has its own switch, the circuit breaker, which trips if the circuit is overloaded or there is a short circuit.</p>
<p><strong>Can you touch it?</strong> Yes. First unplug some of the appliances on that circuit, then switch it back on. If it trips again immediately, leave it off.</p>`],
        ["extra", "What else you may find", `<ul class="checks"><li><strong>A cooker circuit:</strong> two linked switches for an electric hob.</li><li><strong>A solar panel circuit:</strong> the inverter is connected to it.</li><li><strong>A circuit for an EV charger</strong> or home battery.</li><li><strong>An additional meter</strong> for load balancing, which monitors total consumption.</li></ul>`],
        ["oldfusebox", "Screw-in fuses or a modern fuse box?", `<p>An old fuse box has round porcelain or glass screw-in fuses (stoppen). When one blows, it has to be replaced. A modern fuse box has switches that you simply flip back up. More importantly, an old fuse box often has no RCD, and that protection should be present in every home.</p>`],
        ["whichcircuit", "Which circuit supplies which room?", `<p>In a well-labelled fuse box, each circuit has a number and description, or there is a list on the door. If yours does not, you can make one yourself. Switch off one circuit, walk round the house and note which lights and sockets have gone off. Repeat for each circuit. Then, if something goes wrong, you will know exactly where to look.</p>`]
      ],
      bellen: ["There is no RCD in the fuse box.", "The fuse box still has screw-in fuses.", "You can see scorch marks, discolouration or loose parts.", "The grid operator's seal is broken: report this to your grid operator."] },

    /* ---------- K2 ---------- */
    { id: "1-fase-of-3-fase", slug: "single-phase-or-three-phase", cluster: "meterkast", datum,
      kort_titel: "Single-phase or three-phase?",
      h1: "Single-phase or three-phase: what do I have, and when should I upgrade?",
      title: "Single-phase or three-phase: what do I have?",
      desc: "How to tell whether you have a single-phase or three-phase connection, which appliances need three-phase, and how an upgrade with your grid operator works.",
      lead: "Three things tell you: the label on your meter, the width of the main switch and the connection capacity your grid operator has on record. Upgrading to three-phase is only necessary if what you want to connect no longer fits on single-phase, which is less often the case than many people think.",
      kort: ["The meter label and the main switch show what you have.", "A lot fits on single-phase. Charging at 11 kW and large batteries need three-phase.", "The grid operator upgrades the connection; an installer adapts the fuse box."],
      dienst: D.meterkast,
      zin: "Not sure what you have? A photo of your meter cupboard usually tells us straight away.",
      verwant: ["meterkast-geschikt-laadpaal-thuisbatterij", "inductie-koken-aparte-groep"],
      secties: [
        ["recognise", "How to tell what you have", `<ul class="checks"><li><strong>The label on the meter.</strong> If it says 3x230/400 V, it is a three-phase meter. If it only says 230 V, you have single-phase. Note that a three-phase meter is sometimes fitted on a single-phase connection, so the meter alone is not conclusive.</li><li><strong>The main switch.</strong> On single-phase it is narrow, with two terminals. On three-phase it is roughly twice as wide.</li><li><strong>The connection capacity.</strong> Your grid operator knows exactly what you have, for example 1x35 A or 3x25 A. The first number is the number of phases; the second is the main fuse rating in amps.</li></ul>
<p>Still not sure? Take a photo of the meter and the fuse box. An installer can almost always tell straight away.</p>`],
        ["difference", "What's the difference?", `<p>With single-phase, power enters your home over one conductor; with three-phase, over three. With three phases, your home can draw more power in total at the same time. A standard 1x35 A single-phase connection supplies about 8 kilowatts. A 3x25 A three-phase connection supplies about 17 kilowatts.</p>
<p>For comparison: a kettle uses about 2 kilowatts, an oven 3, and an EV charger at full speed 11.</p>`],
        ["appliances", "What do you want to connect?", `<div class="tablewrap"><table><thead><tr><th>Appliance</th><th>Will single-phase usually cope?</th></tr></thead><tbody>
<tr><td>Induction hob</td><td>Yes, on its own cooker circuit</td></tr>
<tr><td>EV charger up to about 7.4 kW</td><td>Yes, often with load balancing</td></tr>
<tr><td>EV charger at 11 kW</td><td>No, this needs three-phase</td></tr>
<tr><td>Heat pump</td><td>Often, depending on the model</td></tr>
<tr><td>Home battery</td><td>Smaller models yes, high outputs no</td></tr>
<tr><td>Solar panels</td><td>Smaller systems yes</td></tr>
</tbody></table></div>
<p>It is not about a single appliance, but about what is running at the same time. Load balancing and smart scheduling, such as charging overnight, often avoid the need for an upgrade.</p>`],
        ["upgrade", "How does an upgrade work?", `<p>An upgrade has two parts, carried out by two parties.</p>
<p><strong>The grid operator upgrades the connection.</strong> You apply via mijnaansluiting.nl. The grid operator changes the main fuse and, if necessary, the meter and the cable. You pay a one-off fee, which varies by grid operator. Up to and including 3x25 A, most grid operators keep the fixed annual charge the same. In areas where the grid is at capacity, there may be a waiting list for a heavier connection. Your grid operator will tell you if this applies.</p>
<p><strong>An installer adapts the fuse box.</strong> The main switch and RCDs are replaced with three-phase versions and the circuits are distributed across the three phases. Without this work, the heavier connection is of no use to you.</p>`],
        ["order", "In what order should you arrange it?", `<p>Start by asking an installer what you actually need. If three-phase turns out to be necessary, you apply to the grid operator and the work on the fuse box is scheduled to match. That way you are not without power for longer than necessary, and you don't pay for an upgrade you didn't need.</p>`]
      ],
      bellen: ["You want to connect an EV charger, hob, heat pump or battery and aren't sure it will fit.", "The main switch or an RCD trips when a lot is on at once.", "Your connection has been upgraded, but the fuse box hasn't been adapted yet.", "The grid operator's main fuse has blown: call 0800-9009."] },

    /* ---------- K3 ---------- */
    { id: "aardlekschakelaar-valt-uit", slug: "rcd-keeps-tripping", cluster: "storingen", datum,
      kort_titel: "RCD keeps tripping",
      h1: "Your RCD keeps tripping: how to find the cause",
      title: "RCD keeps tripping? How to find the cause",
      desc: "Your RCD keeps tripping. This step-by-step guide helps you safely find the circuit or appliance responsible, and tells you when to call an electrician.",
      lead: "If your residual current device (RCD, aardlekschakelaar) keeps tripping, current is leaking away somewhere. The usual culprits are a faulty appliance or moisture. The step-by-step guide below helps you safely identify the circuit and the appliance responsible, without opening anything up.",
      kort: ["The cause is usually a faulty appliance or moisture.", "Five steps help you find the circuit and the appliance yourself.", "If it trips even with every circuit switched off, you need an electrician."],
      dienst: D.groepenkast, geenStoring: true,
      zin: "Does your RCD keep tripping because the fuse box is outdated or overloaded? Then it may be time to replace it.",
      verwant: ["wat-zit-er-in-mijn-meterkast", "inductie-koken-aparte-groep"],
      secties: [
        ["whatitdoes", "What does an RCD do?", `<p>An RCD compares the current flowing into your home with the current flowing back. If there is a difference, current is leaking away, for example through a faulty appliance or through a person. The RCD then cuts the power within a fraction of a second.</p>`],
        ["difference", "RCD or circuit breaker?", `<p>First check exactly what has tripped.</p>
<ul class="checks"><li><strong>An RCD</strong> has a test button. When it trips, several circuits lose power at once.</li><li><strong>A circuit breaker</strong> is a single switch without a test button. When it trips, only that part of the home loses power. The cause is then usually overload: too many appliances on one circuit at the same time.</li></ul>`],
        ["steps", "Step by step: finding the cause", `<ol class="steps v">
<li><b>Switch off all circuits</b><span>Switch off every circuit breaker behind the RCD that has tripped.</span></li>
<li><b>Switch the RCD back on</b><span>If it stays on, continue. If it trips again immediately, see the section further down.</span></li>
<li><b>Switch the circuits back on one at a time</b><span>Pause after each one. The circuit that makes the RCD trip is the one to investigate.</span></li>
<li><b>Unplug everything on that circuit</b><span>Switch that circuit off again and unplug every appliance on it.</span></li>
<li><b>Plug the appliances back in one at a time</b><span>Switch the circuit and the RCD back on. The appliance that makes it trip is the cause. Stop using it.</span></li>
</ol>`],
        ["causes", "The most common causes", `<ul class="checks"><li><strong>A faulty appliance.</strong> Especially appliances with a heating element: washing machines, dishwashers, kettles, water heaters and ovens.</li><li><strong>Moisture.</strong> An outdoor light, a garden socket or a connection in the bathroom. If it mainly trips after rain, look outside.</li><li><strong>A damaged lead</strong>, or an extension lead left outdoors.</li><li><strong>Too many appliances on one RCD.</strong> Every appliance leaks a tiny amount of current. Together, many appliances can add up to just too much, without any single one being faulty.</li></ul>`],
        ["alloff", "It trips even with every circuit switched off", `<p>Then the fault is not in an appliance, but in the fixed installation or in the RCD itself. This is not something you can fix yourself. Leave the RCD switched off and call an electrician.</p>`],
        ["never", "Never tape it up or bypass it", `<p>An RCD that trips is doing its job. Never hold it on with tape or a wedge, and never have it bypassed. The leaking current could then flow through anyone who touches the appliance. That can be fatal.</p>`],
        ["testbutton", "How to use the test button", `<p>Press the test button. The RCD should trip immediately. Then switch it back on. If it does not trip, it is no longer working and must be replaced.</p>
<p>There is no legal requirement for how often you test. Manufacturers' advice ranges from monthly to twice a year. Twice a year is manageable for most households. Bear in mind that the circuits on that RCD will briefly lose power.</p>`]
      ],
      bellen: ["The RCD trips again immediately with every circuit switched off.", "You can smell burning, or components in the fuse box feel warm.", "It trips again after every rain shower.", "It does not respond to the test button.", "You cannot find the cause using the steps above."] },

    /* ---------- K4 ---------- */
    { id: "inductie-koken-aparte-groep", slug: "induction-hob-separate-circuit", cluster: "verduurzamen", datum,
      kort_titel: "Does an induction hob need its own circuit?",
      h1: "Induction cooking: do you need a separate circuit?",
      title: "Induction cooking: do you need a separate circuit?",
      desc: "Switching from gas to induction? You almost always need a dedicated cooker circuit. How to tell whether you already have one, and what to do if not.",
      lead: "Yes, in almost every case. An induction hob draws more power than a standard circuit can supply, so it needs its own cooker circuit in the meter cupboard. If you already have one, little work is usually required.",
      kort: ["An induction hob belongs on a dedicated cooker circuit, not a standard circuit.", "A large five-pin socket behind the cooker indicates a cooker circuit.", "If the fuse box is full, it will need extending first."],
      dienst: D.inductie, dienst2: D.meterkast,
      zin: "Switching to induction? Send us a photo of your meter cupboard and the model of your hob.",
      verwant: ["1-fase-of-3-fase", "wat-zit-er-in-mijn-meterkast"],
      secties: [
        ["why", "Why not on a standard circuit?", `<p>A standard household circuit is protected at 16 amps, which is enough for about 3.7 kilowatts. A four-zone induction hob at full power draws roughly twice that: around 7.4 kilowatts. Connect it to a standard circuit and it will trip as soon as you cook on several zones at once. That is why a hob gets its own cooker circuit: a connection in the meter cupboard used for the hob alone.</p>`],
        ["check", "How to tell whether you already have a cooker circuit", `<ul class="checks"><li><strong>In the meter cupboard:</strong> two switches side by side, joined by a bar and often labelled koken (cooking) or fornuis (cooker).</li><li><strong>In the kitchen:</strong> a larger five-pin socket behind the cooker or in the adjacent cupboard. This is a perilex socket, designed for a hob or cooker.</li></ul>
<p>If you have both, the cooker circuit is already in place. If you currently cook on gas, most homes will not have one.</p>`],
        ["variants", "Three ways to connect a hob", `<p>The rating plate under or on the back of the hob, and the manual, show how it can be connected.</p>
<ul class="checks"><li><strong>Single phase.</strong> Small hobs and plug-in models. Power is limited to about 3.7 kilowatts, so cooking on several zones at once is slower.</li><li><strong>Two phases.</strong> The most common connection in the Netherlands: two 16-amp circuits, together about 7.4 kilowatts. This also works in a home with a single-phase supply.</li><li><strong>Three phases.</strong> For wide hobs and range cookers, up to about 11 kilowatts. Only possible if your home has a three-phase supply.</li></ul>
<p>Many hobs have built-in power management, distributing the available power across the zones. During installation the maximum power can be limited, so the hob also works on a lighter supply. You will then cook slightly more slowly when every zone is on full at the same time.</p>
<p>Our article <a href="/en/knowledge-base/single-phase-or-three-phase/">single-phase or three-phase</a> explains how to tell which supply you have.</p>`],
        ["installer", "What does the installer do?", `<ul class="checks"><li>Adds a cooker circuit in the meter cupboard.</li><li>Runs a dedicated cable from the meter cupboard to the kitchen.</li><li>Fits a perilex socket and connects the hob according to the manufacturer's diagram.</li><li>Tests the connection.</li></ul>
<p>The amount of work depends mainly on the cable route: through a crawl space it is quick; through finished walls or floors it takes longer. The schedule is set out in your quote.</p>`],
        ["full", "What if the fuse box is full?", `<p>A cooker circuit takes up two spaces. If the fuse box is full, it will first need extending or replacing. An old fuse box with screw-in fuses is always replaced before a cooker circuit is added.</p>`],
        ["combine", "Combining it with other plans", `<p>Also thinking about an EV charger, a heat pump or a home battery? Have everything assessed at once. Each of these appliances needs its own circuit, and adapting the fuse box properly in one go saves you from opening it up again a year later.</p>`]
      ],
      bellen: ["You are switching to induction and there is no cooker circuit.", "The fuse box is full or still has screw-in fuses.", "Your hob is on a standard circuit that trips when you cook.", "There is a perilex socket, but you are not sure how it is wired."] }
  ];

  const bySlug = {};
  artikelen.forEach(a => { bySlug[a.id] = a; a.url = "/en/knowledge-base/" + a.slug + "/"; });
  return { clusters, artikelen, bySlug };
};
