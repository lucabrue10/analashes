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
  hero/Eyes.tsx     SVG-Augen: Wimpern auf dem Lidbogen, Blickfolge, Blinzeln
  sections/         Hero, Services, Pricing, Studio, Gallery, Testimonials,
                    Faq, BookingCta, Contact
  ui/               Button, Logo, Reveal (Scroll-Animationen), SectionHeading
lib/site.ts         Alle Inhalte: Kontaktdaten, Leistungen, Preise, Galerie …
scripts/            Generator für die Vorher-/Nachher-SVGs
```

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
