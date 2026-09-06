# Anna Blush Lashes

Website für das Wimpernstudio **Anna Blush Lashes** – dunkles, edles Theme mit lila Akzenten,
Glassmorphism, weichen Übergängen und einer Hero-Section mit zwei realistischen Augen,
deren Blick dem Mauszeiger folgt.

## Tech-Stack

| Bereich | Umsetzung |
| --- | --- |
| Framework | Next.js 15 (App Router, React 19, TypeScript) |
| Styling | Tailwind CSS v4 (Design-Tokens in `app/globals.css`) |
| Animation | Framer Motion (Scroll-Reveals, Parallax, Springs) |
| Bilder | Handgezeichnete SVGs in `public/` (kein externer Asset-Host nötig) |
| SEO | Metadata API, JSON-LD (`BeautySalon`), `sitemap.xml`, `robots.txt` |

## Entwicklung

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # Produktions-Build
npm run start   # Produktions-Server
```

## Struktur

```
app/
  layout.tsx        Metadaten, JSON-LD, Fonts, Skip-Link
  page.tsx          Komposition aller Sections
  globals.css       Farb-/Schatten-Tokens, Utilities (glass, text-gradient …)
components/
  Navbar.tsx        Logo links, Hamburger rechts, Fullscreen-Overlay-Menü
  Footer.tsx
  hero/Eyes.tsx     Gezeichnete Augen: Wimpern, Iris, Blickfolge, Blinzeln
  hero/PhotoEyes.tsx  Fotovariante: Iris als bewegliche Ebene über dem Bild
  hero/HeroEyes.tsx   Wählt Foto oder Zeichnung (Server-Komponente)
  sections/         Hero, Services, Pricing, Studio, Gallery, Testimonials,
                    Faq, BookingCta, Contact
  ui/               Button, Logo, Reveal (Scroll-Animationen), SectionHeading
lib/site.ts         Alle Inhalte: Kontaktdaten, Leistungen, Preise, Galerie …
scripts/            Generator für die Vorher-/Nachher-SVGs
```

## Hero: gezeichnete Augen oder echtes Foto

Der Hero zeigt `public/hero/augen.jpg`, wobei nur die Iris dem Mauszeiger folgt.
Die Kalibrierung dazu steht in `lib/heroPhoto.ts`; die Bildmaße liest die Seite
beim Build selbst aus der Datei.

Ein anderes Foto einsetzen:

1. Datei als `public/hero/augen.jpg` ablegen (JPG, PNG oder WebP, ab 1600 px
   Breite). Fehlt die Datei, greift automatisch die gezeichnete Variante.
2. `npm run dev` starten, `/kalibrierung` öffnen, das Foto laden, in die
   Pupillenmitte und dann auf den Irisrand klicken.
3. Die ausgegebenen Werte in `lib/heroPhoto.ts` übernehmen. Alle Werte sind
   Anteile des Bildes (0 bis 1), bleiben bei einem Austausch in anderer
   Auflösung also gültig.

Worauf es beim Ergebnis ankommt: Die bewegte Iris wird auf die Lidspalte
(`opening`) begrenzt, damit sie nie über Lidkante oder Wimpern malt, und deckt
etwas mehr als den Irisradius ab, damit am nachlaufenden Rand kein zweiter
Irisrand aufblitzt. Ein kleiner Ausschlag wirkt natürlicher als ein großer –
etwa ein Fünftel des Irisradius. Die Seite `/kalibrierung` ist nicht indexiert
und kann nach dem Einrichten gelöscht werden.

## Inhalte anpassen

Sämtliche Texte, Preise, Öffnungszeiten und Kontaktdaten stehen zentral in
`lib/site.ts` – dort Telefonnummer, WhatsApp-Nummer, Instagram-Handle, Adresse und
Google-Maps-Einbettung auf die echten Daten ändern. Die Galeriebilder unter
`public/gallery/` sind Platzhalter und können 1:1 durch echte Fotos ersetzt werden
(`tall` = Hochformat 4:5, `short` = Querformat 4:3).

Vor dem Livegang zusätzlich `site.url` setzen sowie Impressum und Datenschutz ergänzen.

## Barrierefreiheit & Performance

- Semantische Landmarks, beschriftete Sections, Skip-Link zum Inhalt
- Menü und Lightbox mit `aria-*`, Escape-Taste, Pfeiltasten und Fokus-Rückgabe
- Sichtbare Fokus-Ringe, `prefers-reduced-motion` schaltet alle Animationen ab
- Dekorative Grafiken `aria-hidden`, Inhaltsbilder mit beschreibendem Alt-Text
- Statisch vorgerendert, SVG-Assets, keine externen Skripte
