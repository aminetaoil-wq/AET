// Vaste interfaceteksten (menu, formulier, footer, onderbalk) in het Nederlands en Engels.
// Pagina-inhoud staat in src/*.js (Nederlands) en src/en/*.js (Engels).
// Na een wijziging: node tools/build.js
module.exports = function (cfg) {
  const nl = {
    lang: "nl", locale: "nl_NL", pre: "/", home: "Home",
    langNaam: "Nederlands", langAria: "Nederlandse versie",
    skip: "Naar de inhoud", logoAria: "naar de homepage", navAria: "Hoofdmenu", menu: "Menu",
    nav: { keurmerk: ["Keurmerk", "/keurmerk/"], projecten: ["Projecten", "/projecten/"], zakelijk: ["Zakelijk", "/zakelijk/"],
      kennisbank: ["Kennisbank", "/kennisbank/"], contact: ["Contact", "/contact/"] },
    allesOver: l => `Alles over ${l.toLowerCase()}`,
    utiliteit: ["Utiliteitsbouw", "/zakelijk/#utiliteitsbouw"],
    afspraak: "Maak een afspraak", contactUrl: "/contact/", terugbelUrl: "/contact/#terugbellen", bedanktUrl: "/bedankt/",
    privacyUrl: "/privacyverklaring/",
    en: " en ", omgeving: " en omgeving",
    regio: "Provincie Utrecht",
    form: {
      overig: "Overig", overigOptie: "Elektra aanleggen of renovatie, overig", inhuur: "Zakelijke inhuur", stage: "Stage",
      ikBen: "Ik ben", particulier: "Particulier", bedrijf: "Bedrijf", onderwerp: "Onderwerp", kies: "Maak een keuze",
      bedrijfsnaam: "Bedrijfsnaam", contactpersoon: "Contactpersoon",
      naam: st => st ? "Je naam" : "Uw naam", mail: st => st ? "Je e-mailadres" : "Uw e-mailadres", tel: st => st ? "Je telefoonnummer" : "Uw telefoonnummer",
      pc: st => st ? "Je postcode" : "Uw postcode",
      zwerk: "Type werkzaamheden", zwerkOpties: ["Groepenkasten en verdeelinrichtingen", "Laadpalen", "Thuisbatterijen", "Elektrotechnisch installatiewerk", "Anders"],
      zloc: "Projectlocatie", zlocPh: "Plaats of regio", zper: "Gewenste periode en inzet", zperPh: "Bijv. week 3-6, drie dagen per week",
      aansl: "Uw aansluiting", aanslOpties: ["Weet ik niet", "1-fase", "3-fase"], zon: "Heeft u zonnepanelen?", zonOpties: ["Nee", "Ja"],
      toel: "Toelichting", toelZk: "Technische toelichting",
      ph: { st: "Bijvoorbeeld: je opleiding en leerjaar, BOL of BBL, de periode en waarom je bij ons stage wilt lopen.",
        zk: "Bijvoorbeeld: aantallen, type installatie, wie het materiaal levert en bijzonderheden op locatie.",
        std: "Bijvoorbeeld: wat u wilt laten aanleggen of aansluiten, welke auto u heeft of wanneer het u uitkomt." },
      bijlagen: zk => `${zk ? "Bijlagen" : "Foto's"} (optioneel, maximaal 3 bestanden van 10 MB)`,
      knop: { st: "Aanmelding versturen", zk: "Zakelijke aanvraag versturen", std: "Aanvraag versturen" },
      privacy: st => st ? "Wij gebruiken je gegevens alleen om op je aanmelding te reageren. Meer lees je in de" : "Wij gebruiken uw gegevens alleen om op uw aanvraag te reageren. Meer leest u in de",
      privacyLink: "privacyverklaring",
      kop: {
        st: ["Stage", "Meld je aan voor een stage", "Vertel kort welke opleiding je volgt en wanneer je stage wilt lopen. Wij reageren op je aanmelding."],
        zk: ["Zakelijke aanvraag", "Leg uw project of opdracht voor", "Beschrijf de werkzaamheden, de locatie en de gewenste periode. U ontvangt een reactie met beschikbaarheid en tarief."],
        std: ["Afspraak maken", "Maak een afspraak of vraag een offerte aan", "Vertel in een paar zinnen wat u wilt laten doen. Wij nemen contact met u op voor een afspraak of sturen u een vrijblijvende offerte met de werkzaamheden, de materialen en een vaste prijs."]
      },
      reageren: t => ` Wij reageren ${t}.`,
      punten: {
        st: ["Noem je opleiding, niveau en leerjaar", "Geef aan of je BOL of BBL volgt", "Vermeld de periode en het aantal dagen per week", "Je cv stuur je mee per e-mail"],
        zk: up => ["Inzet per klus of per project", "Zelfstandige uitvoering volgens afspraak", "Oplevering met meet- en opleverdocumentatie", up ? "Tekeningen en projectdocumentatie voegt u toe als bijlage" : "Tekeningen en projectdocumentatie stuurt u per e-mail"],
        std: (up, fotoRoute) => ["Vrijblijvend: u zit nergens aan vast", "U weet de prijs voordat u beslist", "Offerte met een vaste scope en een vaste prijs", up ? "Foto's van uw meterkast voegt u toe aan het formulier" : fotoRoute]
      },
      waFoto: ["Goedendag, hierbij foto's van mijn meterkast voor een offerte.", "Stuur foto's via WhatsApp"]
    },
    fotoRoute: wa => wa ? `Foto's van uw meterkast stuurt u via <a href="${wa}">WhatsApp</a> of per e-mail.` : "Foto's van uw meterkast stuurt u per e-mail.",
    waTekst: "Goedendag, ik heb een vraag over ",
    mbar: { terug: "Bel mij terug", mail: "E-mail", afspraak: "Afspraak", aanmelden: "Aanmelden" },
    footer: {
      over: omg => `${cfg.handelsnaam} verzorgt elektrotechnische installaties voor particulieren en levert capaciteit in onderaanneming. Particulier: ${omg}. Zakelijk: landelijk op projectbasis.`,
      diensten: "Diensten", dienstLinks: [["Laadpaal installatie", "/laadpaal/"], ["Thuisbatterij-installatie", "/thuisbatterij/"], ["Zakelijk en utiliteitsbouw", "/zakelijk/"], ["Keurmerk en normen", "/keurmerk/"]],
      info: "Informatie", infoLinks: [["Over ons", "/over/"], ["Werkwijze", "/#werkwijze"], ["Veelgestelde vragen", "/#faq"], ["Kennisbank", "/kennisbank/"]],
      stage: ["Stage", "/stage/"], legal: [["Algemene voorwaarden", "/algemene-voorwaarden/"], ["Privacyverklaring", "/privacyverklaring/"]],
      contact: "Contact", contactLinks: [["Bel mij terug", "/contact/#terugbellen"], ["Maak een afspraak", "/contact/"], ["Werkgebied", "/#werkgebied"]],
      kvk: "KvK", btw: "Btw", boven: "Naar boven ↑"
    }
  };

  const en = {
    lang: "en", locale: "en_GB", pre: "/en/", home: "Home",
    langNaam: "English", langAria: "English version",
    skip: "Skip to content", logoAria: "home page", navAria: "Main menu", menu: "Menu",
    nav: { keurmerk: ["Standards", "/en/standards/"], projecten: ["Projects", "/en/projects/"], zakelijk: ["Business", "/en/business/"],
      kennisbank: ["Knowledge base", "/en/knowledge-base/"], contact: ["Contact", "/en/contact/"] },
    allesOver: l => `${l}: overview`,
    utiliteit: ["Commercial buildings", "/en/business/#commercial-buildings"],
    afspraak: "Book an appointment", contactUrl: "/en/contact/", terugbelUrl: "/en/contact/#callback", bedanktUrl: "/en/thank-you/",
    privacyUrl: "/en/privacy-statement/",
    en: " and ", omgeving: " and surrounding areas",
    regio: "Province of Utrecht",
    form: {
      overig: "Other", overigOptie: "Other electrical or renovation work", inhuur: "Subcontracting / electrician hire", stage: "Internship",
      ikBen: "Enquiring as", particulier: "Private individual", bedrijf: "Business", onderwerp: "Service", kies: "Select a service",
      bedrijfsnaam: "Company name", contactpersoon: "Contact name",
      naam: () => "Your name", mail: () => "Your email address", tel: () => "Your phone number", pc: () => "Your postcode",
      zwerk: "Type of work", zwerkOpties: ["Fuse boxes and distribution boards", "EV chargers", "Home batteries", "Electrical installation work", "Other"],
      zloc: "Project location", zlocPh: "Town or region", zper: "Preferred dates and capacity", zperPh: "E.g. weeks 3-6, three days a week",
      aansl: "Your supply", aanslOpties: ["Not sure", "Single-phase", "Three-phase"], zon: "Do you have solar panels?", zonOpties: ["No", "Yes"],
      toel: "Message", toelZk: "Technical details",
      ph: { st: "For example: your course and year, BOL or BBL, the period, and why you would like to do your internship with us.",
        zk: "For example: quantities, type of installation, who supplies the materials and anything specific about the site.",
        std: "For example: what you would like installed or connected, which car you drive, or when suits you best." },
      bijlagen: zk => `${zk ? "Attachments" : "Photos"} (optional, up to 3 files of 10 MB each)`,
      knop: { st: "Send application", zk: "Send business enquiry", std: "Send enquiry" },
      privacy: () => "We only use your details to respond to your enquiry. See our",
      privacyLink: "privacy statement",
      kop: {
        st: ["Internship", "Apply for an internship", "Tell us briefly which course you are following and when you would like to start. We will respond to every application."],
        zk: ["Business enquiry", "Tell us about your project", "Describe the work, the location and your preferred dates. We'll come back to you with our availability and rate."],
        std: ["Book an appointment", "Book an appointment or request a quote", "Tell us briefly what you need. We'll get in touch to arrange an appointment, or send you a no-obligation quote setting out the work, the materials and a fixed price."]
      },
      reageren: t => ` We respond ${t}.`,
      punten: {
        st: ["Your course, level and year", "Whether you follow the BOL or BBL route", "The period and number of days per week", "Please email us your CV"],
        zk: up => ["Per job or per project", "Independent working, as agreed", "Full test and completion records", up ? "Attach drawings and project documents" : "Email us drawings and project documents"],
        std: (up, fotoRoute) => ["No obligation whatsoever", "You know the price before you decide", "A quote with a fixed scope and fixed price", up ? "Add photos of your meter cupboard to the form" : fotoRoute]
      },
      waFoto: ["Hello, here are some photos of my meter cupboard for a quote.", "Send photos via WhatsApp"]
    },
    fotoRoute: wa => wa ? `Send photos of your meter cupboard via <a href="${wa}">WhatsApp</a> or by email.` : "You can email us photos of your meter cupboard.",
    waTekst: "Hello AET Solutions, I have a question about ",
    mbar: { terug: "Callback", mail: "Email", afspraak: "Appointment", aanmelden: "Apply" },
    footer: {
      over: omg => `${cfg.handelsnaam} carries out electrical installations for residential clients and works as a subcontractor for the trade. Residential: ${omg}. Business: nationwide, on a project basis.`,
      diensten: "Services", dienstLinks: [["EV charger installation", "/en/ev-charger/"], ["Home battery installation", "/en/home-battery/"], ["Business and commercial buildings", "/en/business/"], ["Our standards", "/en/standards/"]],
      info: "Information", infoLinks: [["About us", "/en/about/"], ["How we work", "/en/#how-we-work"], ["FAQ", "/en/#faq"], ["Knowledge base", "/en/knowledge-base/"]],
      stage: ["Internships", "/en/internship/"], legal: [["Terms and conditions", "/en/terms-and-conditions/"], ["Privacy statement", "/en/privacy-statement/"]],
      contact: "Contact", contactLinks: [["Request a callback", "/en/contact/#callback"], ["Book an appointment", "/en/contact/"], ["Service area", "/en/#service-area"]],
      kvk: "Chamber of Commerce (KvK)", btw: "VAT", boven: "Back to top ↑"
    }
  };

  return { nl, en };
};
