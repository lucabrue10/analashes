import { readFileSync } from "node:fs";

/**
 * Prüft, ob eine Bilddatei einen Alphakanal besitzt.
 *
 * Das entscheidet über die Darstellung auf dunklem Grund: Ein freigestelltes
 * Logo lässt sich einfärben, ein Logo mit weißem Hintergrund muss umgekehrt
 * und der Hintergrund weggerechnet werden.
 */
export function hasTransparency(file: string): boolean {
  if (file.toLowerCase().endsWith(".svg")) return true;

  let buf: Buffer;
  try {
    buf = readFileSync(file);
  } catch {
    return false;
  }

  // PNG: Farbtyp 4 und 6 tragen Alpha, Palettenbilder über den tRNS-Abschnitt
  if (buf.length > 26 && buf.toString("ascii", 1, 4) === "PNG") {
    const colorType = buf[25];
    if (colorType === 4 || colorType === 6) return true;
    return buf.includes(Buffer.from("tRNS", "ascii"));
  }

  // WebP: im erweiterten Format steckt die Angabe in den Merkmalsbits
  if (
    buf.length > 21 &&
    buf.toString("ascii", 0, 4) === "RIFF" &&
    buf.toString("ascii", 8, 12) === "WEBP"
  ) {
    const format = buf.toString("ascii", 12, 16);
    if (format === "VP8X") return (buf[20] & 0x10) !== 0;
    if (format === "VP8L") return (buf[24] & 0x10) !== 0;
    return false;
  }

  // JPEG kennt keine Transparenz
  return false;
}
