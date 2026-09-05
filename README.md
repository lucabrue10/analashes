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
  hero/HeroEyes.tsx   Wählt Foto oder Zeichnung
  sections/         Hero, Services, Pricing, Studio, Gallery, Testimonials,
                    Faq, BookingCta, Contact
  ui/               Button, Logo, Reveal (Scroll-Animationen), SectionHeading
lib/site.ts         Alle Inhalte: Kontaktdaten, Leistungen, Preise, Galerie …
scripts/            Generator für die Vorher-/Nachher-SVGs
```

## Hero: gezeichnete Augen oder echtes Foto

Standardmäßig zeigt der Hero die gezeichneten Augen (`components/hero/Eyes.tsx`).
Für echten Fotorealismus lässt sich stattdessen ein Foto einsetzen, bei dem nur
die Iris dem Mauszeiger folgt:

1. Foto nach `public/hero/` legen (JPG oder WebP, mindestens 1600 px breit).
2. `npm run dev` starten und `/kalibrierung` öffnen.
3. Foto laden, je Auge in die Pupillenmitte und dann auf den Irisrand klicken;
   optional die Lidspalte markieren.
4. Den ausgegebenen Block in `lib/heroPhoto.ts` eintragen.

Die bewegte Iris wird auf die Lidspalte begrenzt und läuft an den Rändern weich
aus, damit weder ein doppelter Irisrand noch eine verschobene Lidkante sichtbar
wird. Ein kleiner Ausschlag wirkt dabei natürlicher als ein großer – etwa ein
Fünftel des Irisradius. Steht in `lib/heroPhoto.ts` `null`, greift automatisch
wieder die gezeichnete Variante; die Seite `/kalibrierung` ist nicht indexiert
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
