/**
 * Konfiguration für den fotografischen Hero.
 *
 * Ist `heroPhoto` gesetzt, zeigt die Startseite das Foto und lässt die Iris
 * dem Mauszeiger folgen. Ist es `null`, greift die gezeichnete Variante
 * (components/hero/Eyes.tsx).
 *
 * So kalibrierst du ein neues Foto:
 *   1. Bild nach `public/hero/` legen (JPG oder WebP, mindestens 1600 px breit).
 *   2. `npm run dev` starten und http://localhost:3000/kalibrierung öffnen.
 *   3. Dort in jede Pupille klicken und den Radius bis zum Irisrand ziehen.
 *   4. Die angezeigten Werte hier eintragen.
 *
 * Alle Koordinaten sind Pixel im Originalbild.
 */
export type EyeCalibration = {
  /** Mittelpunkt der Iris im Bild */
  cx: number;
  cy: number;
  /** Radius der Iris in Pixeln */
  r: number;
  /**
   * Sichtbare Lidspalte als Ellipse. Die bewegte Iris wird darauf begrenzt,
   * damit sie niemals über Lidkante oder Wimpern malt. Ohne Angabe wird eine
   * Ellipse um die Iris herum geschätzt – bei einem engen Lid lohnt es sich,
   * die Werte in der Kalibrierung zu setzen.
   */
  opening?: { cx: number; cy: number; rx: number; ry: number };
};

export type HeroPhoto = {
  src: string;
  /** Originalmaße des Bildes in Pixeln */
  width: number;
  height: number;
  alt: string;
  /** Eine Kalibrierung je sichtbarem Auge */
  eyes: EyeCalibration[];
  /**
   * Maximaler Ausschlag der Iris in Pixeln. Faustregel: etwa ein Fünftel des
   * Irisradius horizontal, ein Fünfzehntel vertikal – darüber wirkt der Blick
   * unnatürlich. Die nötige Abdeckung ergibt sich daraus automatisch.
   */
  move?: { x: number; y: number };
  /** Optionaler Zuschlag zur Abdeckung, falls der Irisrand doch durchscheint */
  padding?: number;
};

export const heroPhoto: HeroPhoto | null = null;

/* Beispiel für ein eingesetztes Foto:

export const heroPhoto: HeroPhoto | null = {
  src: "/hero/augen.jpg",
  width: 2000,
  height: 1200,
  alt: "Nahaufnahme von Augen mit Volume-Wimpernverlängerung",
  eyes: [
    { cx: 620, cy: 560, r: 150, opening: { cx: 640, cy: 566, rx: 300, ry: 140 } },
    { cx: 1380, cy: 560, r: 150, opening: { cx: 1360, cy: 566, rx: 300, ry: 140 } },
  ],
  move: { x: 30, y: 10 },
};

*/
