export const site = {
  name: "aanaa.lashes",
  /** Wortmarke in zwei Teilen – der Punkt bleibt der Akzent dazwischen. */
  nameParts: { first: "aanaa", second: "lashes" },
  slogan: "Wimpernverlängerungen für deinen perfekten Look",
  /** Claim und Augenzwinkern aus dem Instagram-Profil */
  claim: "Sets with me · Lashes with Ana",
  warning: "Warning: These lashes cause obsession.",
  description:
    "aanaa.lashes – Wimpernverlängerung in Frankfurt am Main, Riedberg. Classic, Hybrid, Volume, Mega Volume und UV Lashes sowie Schulungen – individuell gestylt für einen natürlich eleganten Blick.",
  url: "https://lashes.adversify.de",
  locale: "de_DE",
  phone: "0155 60878913",
  phoneHref: "+4915560878913",
  whatsapp: "4915560878913",
  whatsappText: "Hallo Anna, ich möchte gerne einen Termin buchen.",
  instagram: "https://instagram.com/aanaa.lashes",
  instagramHandle: "@aanaa.lashes",
  email: "ana.chickenwings@icloud.com",
  /** Inhaberin – für Impressum und verantwortliche Stelle */
  owner: "Ana Catarina De Oliveira Akhouaji",
  street: "Ernst-Abbe-Straße 8",
  district: "Riedberg",
  postalCode: "60438",
  city: "Frankfurt am Main",
  country: "DE",
  bookingUrl: "#kontakt",
  mapsEmbed:
    "https://www.google.com/maps?q=Ernst-Abbe-Stra%C3%9Fe+8,+60438+Frankfurt+am+Main&output=embed",
  mapsLink:
    "https://www.google.com/maps/search/?api=1&query=Ernst-Abbe-Stra%C3%9Fe+8,+60438+Frankfurt+am+Main",
} as const;

export const whatsappLink = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(
  site.whatsappText,
)}`;

export type NavItem = { label: string; href: string };

// Reihenfolge wie auf der Seite
export const navItems: NavItem[] = [
  { label: "Start", href: "#start" },
  { label: "Galerie", href: "#galerie" },
  { label: "Bewertungen", href: "#bewertungen" },
  { label: "Leistungen", href: "#leistungen" },
  { label: "Preise", href: "#preise" },
  { label: "Studio", href: "#studio" },
  { label: "Pflege", href: "#pflege" },
  { label: "Kontakt", href: "#kontakt" },
];

export type Service = {
  id: string;
  title: string;
  tagline: string;
  description: string;
  details: string[];
  duration: string;
  from: string;
};

export const services: Service[] = [
  {
    id: "eins-zu-eins",
    title: "1 : 1 Technik",
    tagline: "Classic",
    description:
      "Auf jede Naturwimper kommt genau eine Extension. Das Ergebnis ist ein wacher, natürlich definierter Blick – wie ein perfekt getuschter Wimpernkranz, nur ohne Mascara.",
    details: ["Natürlicher Look", "Ideal für den Anfang", "Sehr leicht zu tragen"],
    duration: "ca. 90 Min.",
    from: "70 €",
  },
  {
    id: "soft-volumen",
    title: "Soft Volumen",
    tagline: "Feine Fächer",
    description:
      "Leichte, handgelegte Fächer geben deinem Wimpernkranz sanfte Dichte. Der Übergang von Classic zu Volumen – sichtbar voller, trotzdem zurückhaltend.",
    details: ["Weiche Fülle", "Alltagstauglich", "Sehr beliebt"],
    duration: "ca. 105 Min.",
    from: "85 €",
  },
  {
    id: "hybrid",
    title: "Hybrid",
    tagline: "Mix aus beidem",
    description:
      "Einzelne Wimpern und Fächer im Wechsel. Das erzeugt Textur und Tiefe – elegant, aber mit spürbar mehr Ausdruck als ein reines Classic-Set.",
    details: ["Texturierter Look", "Mehr Fülle als 1 : 1", "Für jede Augenform"],
    duration: "ca. 105 Min.",
    from: "95 €",
  },
  {
    id: "wispy",
    title: "Wispy",
    tagline: "Spikes & Textur",
    description:
      "Bewusst gesetzte Spitzen brechen den Kranz auf und geben ihm den verspielten, leicht ungezähmten Look, den man aus dem Netz kennt.",
    details: ["Sichtbare Spikes", "Modern & lebendig", "Individuell gesetzt"],
    duration: "ca. 120 Min.",
    from: "90 €",
  },
  {
    id: "wet-look",
    title: "Wet Look",
    tagline: "Geschlossene Spikes",
    description:
      "Dichte, zu Spitzen geschlossene Bündel – der Effekt erinnert an frisch getuschte Wimpern. Klar, modern und ein bisschen verwegen.",
    details: ["Angesagter Spike-Effekt", "Definierte Linie", "Starker Auftritt"],
    duration: "ca. 120 Min.",
    from: "95 €",
  },
  {
    id: "mega-volumen",
    title: "Mega Volumen",
    tagline: "Maximale Dichte",
    description:
      "Ultrafeine Wimpern werden zu voluminösen Fächern gelegt. Maximale Fülle für den großen Auftritt – dramatisch und trotzdem federleicht.",
    details: ["Maximale Dichte", "Glamouröser Auftritt", "Perfekt für Events"],
    duration: "ca. 150 Min.",
    from: "100 €",
  },
  {
    id: "schulungen",
    title: "Schulungen",
    tagline: "Für Einsteigerinnen & Profis",
    description:
      "Lerne das Handwerk von Grund auf oder hebe deine Technik aufs nächste Level – in kleinen Gruppen oder als Einzelcoaching.",
    details: ["Basis, Volumen und UV", "Kleine Gruppen", "Termine nach Absprache"],
    duration: "nach Absprache",
    from: "auf Anfrage",
  },
];

export type PriceGroup = {
  title: string;
  note?: string;
  items: { name: string; meta?: string; price: string; featured?: boolean }[];
};

export const priceGroups: PriceGroup[] = [
  {
    title: "Wimpernverlängerung",
    note: "Neuanfertigung inklusive Beratung und Styling",
    items: [
      { name: "1 : 1 Technik", meta: "ca. 90 Min.", price: "70 €" },
      { name: "Soft Volumen", meta: "ca. 105 Min.", price: "85 €", featured: true },
      { name: "Wispy", meta: "ca. 120 Min.", price: "90 €" },
      { name: "Hybrid", meta: "ca. 105 Min.", price: "95 €" },
      { name: "Wet Look", meta: "ca. 120 Min.", price: "95 €" },
      { name: "Mega Volumen", meta: "ca. 150 Min.", price: "100 €" },
    ],
  },
  {
    title: "Auffüllen",
    note: "Sind noch mindestens zwei Drittel der Extensions vorhanden, wird aufgefüllt – darunter ist es eine Neuanfertigung",
    items: [
      { name: "1 : 1 Technik", meta: "ca. 60 Min.", price: "50 €" },
      { name: "Soft Volumen", meta: "ca. 75 Min.", price: "60 €", featured: true },
      { name: "Wispy", meta: "ca. 75 Min.", price: "70 €" },
      { name: "Hybrid", meta: "ca. 75 Min.", price: "75 €" },
      { name: "Wet Look", meta: "ca. 75 Min.", price: "75 €" },
      { name: "Mega Volumen", meta: "ca. 90 Min.", price: "80 €" },
    ],
  },
  {
    title: "Schulungen",
    note: "Einzelcoaching oder kleine Gruppe, Inhalte nach Vorkenntnissen",
    items: [
      { name: "Basis-Schulung", meta: "nach Absprache", price: "auf Anfrage" },
      { name: "Volumen-Schulung", meta: "nach Absprache", price: "auf Anfrage" },
      { name: "UV-Technik", meta: "nach Absprache", price: "auf Anfrage" },
      { name: "Einzelcoaching", meta: "nach Absprache", price: "auf Anfrage" },
    ],
  },
];

export type GalleryItem = {
  id: string;
  src: string;
  alt: string;
  caption: string;
  technique: string;
};

export const gallery: GalleryItem[] = [
  {
    id: "set-01",
    src: "/galerie/set-01.jpg",
    alt: "Wimpernverlängerung an blauen Augen, natürlicher Wispy-Look",
    caption: "Wispy",
    technique: "Soft & natürlich",
  },
  {
    id: "set-02",
    src: "/galerie/set-02.jpg",
    alt: "Wimpernverlängerung an grünen Augen mit weichem Volumen",
    caption: "Soft Volumen",
    technique: "Weiche Fülle",
  },
  {
    id: "set-03",
    src: "/galerie/set-03.jpg",
    alt: "Volles Wimpernset an braunen Augen",
    caption: "Volumen",
    technique: "Dichter Kranz",
  },
  {
    id: "set-04",
    src: "/galerie/set-04.jpg",
    alt: "Wispy-Set mit sichtbaren Spitzen an braunen Augen",
    caption: "Wispy",
    technique: "Spikes & Textur",
  },
  {
    id: "set-05",
    src: "/galerie/set-05.jpg",
    alt: "Dezentes Wimpernset mit natürlichem Schwung",
    caption: "1 : 1 Technik",
    technique: "Natürlich definiert",
  },
  {
    id: "set-06",
    src: "/galerie/set-06.jpg",
    alt: "Kräftiges Wimpernset mit deutlichem Schwung nach außen",
    caption: "Hybrid",
    technique: "Textur & Tiefe",
  },
  {
    id: "set-07",
    src: "/galerie/set-07.jpg",
    alt: "Wet-Look-Set mit geschlossenen Spitzen",
    caption: "Wet Look",
    technique: "Geschlossene Spikes",
  },
];

export type Feedback = {
  /** Ausschnitt der Chat-Antwort, freigestellt */
  src: string;
  /** Wortlaut – für Vorlesewerkzeuge und Suchmaschinen */
  text: string;
  datum: string;
  /** Hochformat oder breite Blase, steuert die Spaltenaufteilung */
  breit?: boolean;
};

/**
 * Echte Rückmeldungen aus Instagram, als Ausschnitt der Nachricht selbst.
 * Bewusst nur die Antworten: keine Profilbilder, keine Gesichter, keine Namen.
 */
export const feedback: Feedback[] = [
  {
    src: "/feedback/feedback-5.png",
    text: "Eyyy die Wimpern halten so Bombe. Hatte ich noch nie sooo. Obwohl ich so Lücken hatte.",
    datum: "7. August",
  },
  {
    src: "/feedback/feedback-2.png",
    text: "Ich finde die Lashes richtig schön, bin mega zufrieden. Danke für deine tolle Arbeit und ich werde es auf jeden Fall weiterempfehlen. Ich freue mich jetzt schon auf den nächsten Termin.",
    datum: "5. August",
  },
  {
    src: "/feedback/feedback-6.png",
    text: "Die halten sich echt super, hab das Gefühl, dass nix auf den Wimpern ist, obwohl da halt was ist. Finde es mega, hast du ehrlich richtig schön gemacht.",
    datum: "7. August",
  },
  {
    src: "/feedback/feedback-1.png",
    text: "Du machst so eine schöne Arbeit. Wollte ich dir nur mal gesagt haben.",
    datum: "25. Juli",
  },
  {
    src: "/feedback/feedback-3.png",
    text: "Die Wimpern sind so toll. Danke nochmal!",
    datum: "6. August",
  },
  {
    src: "/feedback/feedback-4.png",
    text: "Die Wimpern sehen sehr schön aus, danke dir nochmal.",
    datum: "6. August",
  },
];

/** Termine laufen ausschließlich nach Vereinbarung. */
export const termine = {
  hinweis: "Termine ausschließlich nach Vereinbarung",
  text: "Schreib mir per WhatsApp oder Instagram – ich melde mich mit freien Zeiten zurück.",
};

/** Vorbereitung auf den Termin – so hält das Set am längsten. */
export const vorbereitung = {
  titel: "Vor deinem Termin",
  intro:
    "Bitte komm ungeschminkt und ohne Wimperntusche-Reste im Augenbereich. Das ist entscheidend für die Haltbarkeit deiner Verlängerung.",
  punkte: [
    "Ungeschminkt kommen, besonders am Auge",
    "Keine Mascara-Reste – auch nicht vom Vortag",
    "Wasserfeste Produkte vorher gründlich entfernen",
    "Bekannte Allergien vorab mitteilen",
  ],
  hinweis:
    "Ich reinige deine Naturwimpern vor der Behandlung trotzdem immer gründlich. Mascara kann die Vorbereitung und die Haftung der Extensions aber deutlich beeinträchtigen.",
};

/** Pflege nach der Behandlung. */
export const aftercare = {
  titel: "Pflege danach",
  intro: "Für ein langanhaltendes und sauberes Ergebnis:",
  punkte: [
    "In den ersten 24 bis 48 Stunden kein Wasser, kein Dampf, keine Sauna",
    "Keine ölhaltigen Produkte im Augenbereich",
    "Täglich mit einem geeigneten Lash Shampoo reinigen",
    "Regelmäßig und vorsichtig mit der Bürste in Form bringen",
    "Nicht reiben, ziehen oder an den Wimpern spielen",
    "Kein Mascara, keine Wimpernzange",
    "Beim Abschminken ausschließlich ölfreie Produkte",
    "Möglichst in Rückenlage schlafen",
    "Hitze und starke Dampfentwicklung vermeiden",
    "Nach starkem Schwitzen die Wimpern reinigen",
  ],
  wichtig: "Vereinbare deinen Refill-Termin rechtzeitig – das erspart dir eine Neuanfertigung.",
};

/** Verbindliche Studioregeln. */
export const studioregeln = [
  {
    titel: "Anzahlung",
    text: "Für jeden Termin wird eine Anzahlung fällig. Erst damit ist der Termin verbindlich reserviert.",
  },
  {
    titel: "Absagen",
    text: "Termine, die nicht mindestens 24 Stunden vorher abgesagt werden, werden in voller Höhe berechnet. Ich reserviere die Zeit fest für dich und plane entsprechend.",
  },
  {
    titel: "Verspätungen",
    text: "Sag mir rechtzeitig Bescheid, wenn es später wird. Je nach Restzeit passe ich das Set an oder wir verschieben.",
  },
  {
    titel: "Begleitpersonen",
    text: "Begleitpersonen und Kinder nur nach vorheriger Absprache – im Studio arbeite ich mit einem Termin zur Zeit.",
  },
  {
    titel: "Auffüllen",
    text: "Sind noch mindestens zwei Drittel der Extensions vorhanden, wird aufgefüllt – darunter ist es eine Neuanfertigung.",
  },
  {
    titel: "Haftung",
    text: "Für allergische Reaktionen oder Unverträglichkeiten während oder nach der Behandlung übernehme ich keine Haftung. Bitte informiere mich vorab über bekannte Allergien.",
  },
];

/**
 * Vorstellung zwischen Banner und Galerie. Bewusst ohne Angaben, die sich
 * nicht belegen lassen – keine Jahreszahlen, keine Abschlüsse.
 */
export const ueberMich = {
  bild: "/ana.jpg",
  bildAlt: "Ana, Inhaberin von aanaa.lashes",
  absaetze: [
    "Ich bin Ana. Hinter aanaa.lashes steht keine Kette und kein Großsalon, sondern mein eigenes Studio auf dem Riedberg – und bei jedem Termin sitzt genau eine Kundin auf dem Stuhl.",
    "Mein Anspruch ist nicht das Set, das auf dem Foto am meisten hermacht, sondern das, das zu deinem Gesicht passt und im Alltag hält. Deshalb wird jedes Design vorher auf deine Augenform und deine Naturwimpern abgestimmt, statt eine Vorlage abzuarbeiten.",
    "Ein Studio zu Hause heißt: keine Wartezone, kein Termindruck im Nacken, keine fremden Blicke. Du liegst zwei Stunden in Ruhe, ich arbeite in Ruhe – und du gehst mit einem Blick raus, für den du morgens nichts mehr tun musst.",
  ],
};

export const studioFeatures = [
  {
    title: "UV-Technik",
    text: "Der Kleber härtet unter UV-Licht in Sekunden aus. Das bedeutet kürzere Termine, kein Brennen in den Augen und eine spürbar längere Haltbarkeit.",
  },
  {
    title: "Höchste Hygiene",
    text: "Sterile Einweg-Tools, saubere Flächen und ein Behandlungsplatz nur für dich.",
  },
  {
    title: "Individuelles Mapping",
    text: "Jedes Design wird auf Augenform, Naturwimper und deinen Alltag abgestimmt – kein Look von der Stange.",
  },
  {
    title: "Ruhe & Privatsphäre",
    text: "Nur ein Termin zur gleichen Zeit. Gedämpftes Licht, warme Decke, Musik nach Wunsch.",
  },
];

export const faqs = [
  {
    q: "Wie lange halten die Wimpern?",
    a: "Bei guter Pflege bleibt das Ergebnis drei bis vier Wochen schön. Da Naturwimpern im eigenen Zyklus ausfallen, empfehle ich alle zwei bis drei Wochen einen Refill.",
  },
  {
    q: "Was ist der Unterschied bei UV Lashes?",
    a: "Der Kleber härtet unter UV-Licht in Sekunden aus, statt langsam an der Luft. Das ist verträglicher für die Augen, verkürzt den Termin und hält länger.",
  },
  {
    q: "Wie bereite ich mich auf den Termin vor?",
    a: "Komm ungeschminkt und ohne Mascara-Reste im Augenbereich – auch nicht vom Vortag. Mascara beeinträchtigt die Haftung der Extensions deutlich.",
  },
  {
    q: "Warum eine Anzahlung?",
    a: "Ich reserviere die Zeit fest für dich und arbeite mit nur einem Termin zur Zeit. Die Anzahlung macht den Termin verbindlich; sie wird mit dem Behandlungspreis verrechnet.",
  },
  {
    q: "Was gilt bei Absagen?",
    a: "Termine, die nicht mindestens 24 Stunden vorher abgesagt werden, werden in voller Höhe berechnet.",
  },
  {
    q: "Wann ist es ein Refill, wann eine Neuanfertigung?",
    a: "Sind noch mindestens zwei Drittel der Extensions vorhanden, wird aufgefüllt – darunter ist es eine Neuanfertigung.",
  },
  {
    q: "Schadet die Behandlung meinen Naturwimpern?",
    a: "Nein. Pro Naturwimper wird das passende Gewicht gewählt, sodass deine eigenen Wimpern ungestört weiterwachsen können.",
  },
  {
    q: "Kann ich mit Extensions duschen und Sport machen?",
    a: "Nach den ersten 24 bis 48 Stunden ja. Vermeide ölhaltige Reiniger, Wimpernzangen und starkes Reiben; nach starkem Schwitzen die Wimpern reinigen.",
  },
];
