export const site = {
  name: "aanaa.lashes",
  /** Wortmarke in zwei Teilen – der Punkt bleibt der Akzent dazwischen. */
  nameParts: { first: "aanaa", second: "lashes" },
  slogan: "Luxuriöse Wimpernverlängerungen für deinen perfekten Look",
  /** Claim und Augenzwinkern aus dem Instagram-Profil */
  claim: "Sets with me · Lashes with Ana",
  warning: "Warning: These lashes cause obsession.",
  description:
    "aanaa.lashes – Wimpernverlängerung in Frankfurt am Main, Riedberg. Classic, Hybrid, Volume, Mega Volume und UV Lashes sowie Schulungen – individuell gestylt für einen natürlich eleganten Blick.",
  url: "https://lashes.adversify.de",
  locale: "de_DE",
  phone: "+49 69 123 456 78",
  phoneHref: "+496912345678",
  whatsapp: "496912345678",
  whatsappText: "Hallo Anna, ich möchte gerne einen Termin buchen.",
  instagram: "https://instagram.com/aanaa.lashes",
  instagramHandle: "@aanaa.lashes",
  email: "hallo@aanaa-lashes.de",
  /** Genaue Anschrift wird erst mit der Terminbestätigung geteilt */
  street: "Adresse nach Terminvereinbarung",
  district: "Riedberg",
  postalCode: "60438",
  city: "Frankfurt am Main",
  country: "DE",
  bookingUrl: "#kontakt",
  mapsEmbed: "https://www.google.com/maps?q=Riedberg,+60438+Frankfurt+am+Main&output=embed",
  mapsLink:
    "https://www.google.com/maps/search/?api=1&query=Riedberg,+60438+Frankfurt+am+Main",
} as const;

export const whatsappLink = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(
  site.whatsappText,
)}`;

export type NavItem = { label: string; href: string };

export const navItems: NavItem[] = [
  { label: "Start", href: "#start" },
  { label: "Leistungen", href: "#leistungen" },
  { label: "Preise", href: "#preise" },
  { label: "Studio", href: "#studio" },
  { label: "Galerie", href: "#galerie" },
  { label: "Bewertungen", href: "#bewertungen" },
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
    id: "classic",
    title: "Classic Lashes",
    tagline: "1 : 1 Technik",
    description:
      "Auf jede Naturwimper wird eine einzelne Extension gesetzt. Das Ergebnis: ein wacher, natürlich definierter Blick – wie ein perfekt getuschter Wimpernkranz.",
    details: ["Natürlicher Look", "Ideal für Einsteigerinnen", "Sehr leicht zu tragen"],
    duration: "ca. 90 Min.",
    from: "ab 89 €",
  },
  {
    id: "hybrid",
    title: "Hybrid Lashes",
    tagline: "Mix aus Classic & Volume",
    description:
      "Die Kombination aus einzelnen und fächerartigen Wimpern schafft Tiefe und eine feine Textur – elegant, aber mit spürbar mehr Ausdruck.",
    details: ["Texturierter Look", "Mehr Fülle als Classic", "Für jede Augenform"],
    duration: "ca. 105 Min.",
    from: "ab 109 €",
  },
  {
    id: "volume",
    title: "Volume Lashes",
    tagline: "2D – 5D Fächer",
    description:
      "Handgelegte, ultraleichte Fächer aus feinsten Wimpern geben deinem Blick sichtbare Dichte, ohne die Naturwimper zu belasten.",
    details: ["Dichter, samtiger Wimpernkranz", "Federleichtes Tragegefühl", "Sehr beliebt"],
    duration: "ca. 120 Min.",
    from: "ab 129 €",
  },
  {
    id: "mega-volume",
    title: "Mega Volume",
    tagline: "6D – 12D Fächer",
    description:
      "Maximale Fülle für den großen Auftritt. Ultrafeine Wimpern werden zu voluminösen Fächern gelegt – dramatisch, glamourös und trotzdem federleicht.",
    details: ["Maximale Dichte", "Glamouröser Auftritt", "Perfekt für Events"],
    duration: "ca. 150 Min.",
    from: "ab 149 €",
  },
  {
    id: "wet-look",
    title: "Wet Look Lashes",
    tagline: "Trend-Styling",
    description:
      "Geschlossene Spikes im angesagten Wet Look – ein moderner, leicht verwegener Blick, der an frisch getuschte Wimpern erinnert.",
    details: ["Angesagter Spike-Effekt", "Modern & edgy", "Individuell abgestimmt"],
    duration: "ca. 120 Min.",
    from: "ab 129 €",
  },
  {
    id: "uv-lashes",
    title: "UV Lashes",
    tagline: "Bonding mit UV-Licht",
    description:
      "Der Kleber härtet unter UV-Licht in Sekunden aus. Das bedeutet kürzere Termine, kein Brennen in den Augen und eine spürbar längere Haltbarkeit.",
    details: ["Sehr gut verträglich", "Hält länger als klassisch", "Auch bei empfindlichen Augen"],
    duration: "ca. 120 Min.",
    from: "ab 139 €",
  },
  {
    id: "schulungen",
    title: "Schulungen",
    tagline: "Für Einsteigerinnen & Profis",
    description:
      "Lerne das Handwerk von Grund auf oder hebe deine Technik aufs nächste Level – in kleinen Gruppen oder als Einzelcoaching, inklusive Starterset und Zertifikat.",
    details: ["Basis, Volumen und UV", "Kleine Gruppen", "Inkl. Material & Zertifikat"],
    duration: "1 – 2 Tage",
    from: "auf Anfrage",
  },
  {
    id: "lifting",
    title: "Lash Lifting & Botox",
    tagline: "Für Naturwimpern",
    description:
      "Deine eigenen Wimpern werden sanft aufgerichtet, getönt und mit Keratin gepflegt – für einen offenen Blick ganz ohne Extensions.",
    details: ["Ohne Verlängerung", "Inkl. Färben & Pflege", "Hält 6 – 8 Wochen"],
    duration: "ca. 60 Min.",
    from: "ab 69 €",
  },
];

export type PriceGroup = {
  title: string;
  note?: string;
  items: { name: string; meta?: string; price: string; featured?: boolean }[];
};

export const priceGroups: PriceGroup[] = [
  {
    title: "Neuanfertigung",
    note: "Vollständiger Neuaufbau inkl. Beratung & Styling",
    items: [
      { name: "Classic Lashes", meta: "ca. 90 Min.", price: "89 €" },
      { name: "Hybrid Lashes", meta: "ca. 105 Min.", price: "109 €" },
      { name: "Volume Lashes", meta: "ca. 120 Min.", price: "129 €", featured: true },
      { name: "Mega Volume", meta: "ca. 150 Min.", price: "149 €" },
      { name: "Wet Look Lashes", meta: "ca. 120 Min.", price: "129 €" },
      { name: "UV Lashes", meta: "ca. 120 Min.", price: "139 €" },
    ],
  },
  {
    title: "Auffüllen",
    note: "Preis abhängig vom Zeitpunkt deines letzten Termins",
    items: [
      { name: "Refill bis 2 Wochen", meta: "ca. 60 Min.", price: "49 €" },
      { name: "Refill bis 3 Wochen", meta: "ca. 75 Min.", price: "59 €", featured: true },
      { name: "Refill bis 4 Wochen", meta: "ca. 90 Min.", price: "69 €" },
      { name: "Volume Refill Zuschlag", meta: "je nach Technik", price: "+ 15 €" },
      { name: "UV Refill", meta: "ca. 75 Min.", price: "69 €" },
      { name: "Fremdarbeit auffüllen", meta: "nach Absprache", price: "ab 69 €" },
    ],
  },
  {
    title: "Pflege & Extras",
    note: "Ergänzende Treatments rund um deine Wimpern",
    items: [
      { name: "Lash Lifting inkl. Färben", meta: "ca. 60 Min.", price: "69 €" },
      { name: "Wimpern-Botox", meta: "ca. 30 Min.", price: "29 €" },
      { name: "Augenbrauen zupfen & färben", meta: "ca. 30 Min.", price: "29 €" },
      { name: "Entfernen der Extensions", meta: "ca. 30 Min.", price: "19 €" },
      { name: "Aftercare-Set", meta: "Bürste, Schaum & Serum", price: "24 €" },
    ],
  },
  {
    title: "Schulungen",
    note: "Kleine Gruppen oder Einzelcoaching, inklusive Material und Zertifikat",
    items: [
      { name: "Basis-Schulung", meta: "1 Tag", price: "auf Anfrage" },
      { name: "Volumen-Schulung", meta: "1 Tag", price: "auf Anfrage", featured: true },
      { name: "UV-Lashes-Schulung", meta: "1 Tag", price: "auf Anfrage" },
      { name: "Einzelcoaching", meta: "nach Absprache", price: "auf Anfrage" },
      { name: "Auffrischung", meta: "halber Tag", price: "auf Anfrage" },
    ],
  },
];

export type GalleryItem = {
  id: string;
  src: string;
  alt: string;
  caption: string;
  technique: string;
  span: "tall" | "short";
};

export const gallery: GalleryItem[] = [
  {
    id: "g1",
    src: "/gallery/lashes-01.svg",
    alt: "Vorher-Nachher: Naturwimpern und Classic Lashes im Vergleich",
    caption: "Classic Lashes – natürlich definiert",
    technique: "Vorher / Nachher",
    span: "tall",
  },
  {
    id: "g2",
    src: "/gallery/lashes-02.svg",
    alt: "Vorher-Nachher: Hybrid Lashes mit weicher Textur",
    caption: "Hybrid Lashes – weiche Textur",
    technique: "Vorher / Nachher",
    span: "short",
  },
  {
    id: "g3",
    src: "/gallery/lashes-03.svg",
    alt: "Vorher-Nachher: Volume Lashes mit dichtem Wimpernkranz",
    caption: "Volume Lashes – samtige Dichte",
    technique: "Vorher / Nachher",
    span: "short",
  },
  {
    id: "g4",
    src: "/gallery/lashes-04.svg",
    alt: "Vorher-Nachher: Mega Volume Lashes für maximale Fülle",
    caption: "Mega Volume – maximale Fülle",
    technique: "Vorher / Nachher",
    span: "tall",
  },
  {
    id: "g5",
    src: "/gallery/lashes-05.svg",
    alt: "Vorher-Nachher: Wet Look Lashes mit Spikes",
    caption: "Wet Look – moderne Spikes",
    technique: "Vorher / Nachher",
    span: "short",
  },
  {
    id: "g6",
    src: "/gallery/lashes-06.svg",
    alt: "Vorher-Nachher: Lash Lifting an Naturwimpern",
    caption: "Lash Lifting – offener Blick",
    technique: "Vorher / Nachher",
    span: "tall",
  },
];

export type Testimonial = {
  name: string;
  role: string;
  quote: string;
  rating: number;
};

export const testimonials: Testimonial[] = [
  {
    name: "Lena M.",
    role: "Volume Lashes",
    quote:
      "Ich habe mich noch nie so gut aufgehoben gefühlt. Anna nimmt sich Zeit, berät ehrlich und das Ergebnis war exakt der Look, den ich mir vorgestellt habe.",
    rating: 5,
  },
  {
    name: "Sophie K.",
    role: "Hybrid Lashes",
    quote:
      "Das Studio ist eine kleine Oase – ruhig, edel und mega gepflegt. Meine Wimpern halten wochenlang perfekt und sehen dabei völlig natürlich aus.",
    rating: 5,
  },
  {
    name: "Merve A.",
    role: "Mega Volume",
    quote:
      "Absolute Präzision. Jede Wimper sitzt, nichts zwickt, nichts klebt zusammen. Für mich das beste Lash-Studio der Stadt.",
    rating: 5,
  },
  {
    name: "Jasmin R.",
    role: "Lash Lifting",
    quote:
      "Ich wollte etwas Dezentes und bin begeistert: offener Blick, kein Mascara mehr nötig. Termin war unkompliziert per WhatsApp gebucht.",
    rating: 5,
  },
  {
    name: "Carolin B.",
    role: "Classic Lashes",
    quote:
      "Zwei Stunden purer Entspannung – ich bin tatsächlich eingeschlafen. Und danach: Wow. Ich komme definitiv wieder.",
    rating: 5,
  },
  {
    name: "Tuana Ö.",
    role: "Refill",
    quote:
      "Sehr hygienisch, sehr professionell und einfach ein herzlicher Mensch. Die Auffülltermine sind für mich mittlerweile ein festes Ritual.",
    rating: 5,
  },
];

export const openingHours = [
  { day: "Montag", time: "10:00 – 19:00" },
  { day: "Dienstag", time: "10:00 – 19:00" },
  { day: "Mittwoch", time: "10:00 – 19:00" },
  { day: "Donnerstag", time: "10:00 – 20:00" },
  { day: "Freitag", time: "10:00 – 20:00" },
  { day: "Samstag", time: "10:00 – 16:00" },
  { day: "Sonntag", time: "geschlossen" },
];

export const studioFeatures = [
  {
    title: "Zertifizierte Expertise",
    text: "Ausgebildet nach internationalen Standards, eigene Schulungen und geprüfte Premium-Materialien.",
  },
  {
    title: "Höchste Hygiene",
    text: "Sterile Einweg-Tools, medizinische Flächendesinfektion und ein Behandlungsplatz nur für dich.",
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
    q: "Wie lange halten Wimpernverlängerungen?",
    a: "Bei guter Pflege bleibt das Ergebnis 3 bis 4 Wochen schön. Da Naturwimpern im natürlichen Zyklus ausfallen, empfehlen wir alle 2 bis 3 Wochen einen Refill-Termin.",
  },
  {
    q: "Schadet die Behandlung meinen Naturwimpern?",
    a: "Nein. Bei fachgerechter Anwendung wird pro Naturwimper das passende Gewicht gewählt, sodass deine eigenen Wimpern ungestört weiterwachsen können.",
  },
  {
    q: "Wie bereite ich mich auf den Termin vor?",
    a: "Bitte komme ungeschminkt und ohne Mascara-Reste. Verzichte am Behandlungstag auf ölhaltige Pflegeprodukte im Augenbereich und plane etwas Puffer ein.",
  },
  {
    q: "Kann ich mit Extensions duschen und Sport machen?",
    a: "Ja – nach den ersten 24 Stunden ganz normal. Vermeide lediglich ölhaltige Reiniger, Wimpernzangen und starkes Reiben der Augen.",
  },
];
