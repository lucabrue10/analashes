/**
 * Konfiguration für den fotografischen Hero.
 *
 * Liegt die unter `src` angegebene Datei in `public/`, zeigt die Startseite das
 * Foto und lässt die Iris dem Mauszeiger folgen. Fehlt sie, greift automatisch
 * die gezeichnete Variante (components/hero/Eyes.tsx) – die Seite bleibt also
 * in jedem Fall funktionsfähig.
 *
 * Alle Werte sind **Anteile** des Bildes, nicht Pixel: 0 = linker bzw. oberer
 * Rand, 1 = rechter bzw. unterer Rand. Dadurch bleibt die Kalibrierung gültig,
 * wenn das Foto später in einer anderen Auflösung ausgetauscht wird.
 *
 * So kalibrierst du ein neues Foto:
 *   1. Bild nach `public/hero/` legen (JPG, PNG oder WebP, ab 1600 px Breite).
 *   2. `npm run dev` starten und http://localhost:3000/kalibrierung öffnen.
 *   3. Je Auge in die Pupillenmitte und dann auf den Irisrand klicken.
 *   4. Die angezeigten Werte hier eintragen.
 */
export type EyeCalibration = {
  /** Mittelpunkt der Iris, Anteil von Breite bzw. Höhe */
  cx: number;
  cy: number;
  /** Radius der Iris, Anteil der Bildbreite */
  r: number;
  /**
   * Sichtbare Lidspalte als Ellipse. Die bewegte Iris wird darauf begrenzt,
   * damit sie niemals über Lidkante oder Wimpern malt. Ohne Angabe wird eine
   * Ellipse um die Iris herum geschätzt.
   */
  opening?: { cx: number; cy: number; rx: number; ry: number };
};

export type HeroPhoto = {
  /** Pfad unterhalb von `public/`, z. B. "/hero/augen.jpg" */
  src: string;
  alt: string;
  /** Eine Kalibrierung je sichtbarem Auge */
  eyes: EyeCalibration[];
  /**
   * Sichtbarer Ausschnitt des Bildes. Nützlich bei Hochformat-Fotos, von denen
   * im Hero nur das Augenband gezeigt werden soll.
   */
  crop?: { x: number; y: number; w: number; h: number };
  /**
   * Maximaler Ausschlag der Iris als Anteil der Bildbreite. Faustregel: etwa
   * ein Fünftel des Irisradius seitlich, ein Fünfzehntel vertikal.
   */
  move?: { x: number; y: number };
  /** Optionaler Zuschlag zur Abdeckung, falls der Irisrand doch durchscheint */
  padding?: number;
};

/**
 * Vorkalibriert auf die Nahaufnahme im Hochformat: ein Auge, Blick nach vorn.
 * Sobald `public/hero/augen.jpg` existiert, wird das Foto verwendet.
 */
export const heroPhoto: HeroPhoto | null = {
  src: "/hero/augen.jpg",
  alt: "Nahaufnahme eines Auges mit Volume-Wimpernverlängerung",
  crop: { x: 0.04, y: 0.36, w: 0.92, h: 0.32 },
  eyes: [
    {
      cx: 0.47,
      cy: 0.586,
      r: 0.108,
      opening: { cx: 0.485, cy: 0.588, rx: 0.2, ry: 0.055 },
    },
  ],
  move: { x: 0.02, y: 0.006 },
};
