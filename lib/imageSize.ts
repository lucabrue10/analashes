import { readFileSync } from "node:fs";

export type ImageSize = { width: number; height: number };

/**
 * Liest die Maße eines Bildes direkt aus dem Dateikopf – ohne zusätzliche
 * Abhängigkeit. Unterstützt PNG, JPEG und WebP; das genügt für den Hero.
 * Läuft nur zur Build-Zeit auf dem Server.
 */
export function readImageSize(file: string): ImageSize | null {
  let buf: Buffer;
  try {
    buf = readFileSync(file);
  } catch {
    return null;
  }

  // PNG: Breite und Höhe stehen im IHDR-Chunk
  if (buf.length > 24 && buf.toString("ascii", 1, 4) === "PNG") {
    return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
  }

  // WebP: VP8, VP8L oder VP8X
  if (buf.length > 30 && buf.toString("ascii", 0, 4) === "RIFF" && buf.toString("ascii", 8, 12) === "WEBP") {
    const format = buf.toString("ascii", 12, 16);
    if (format === "VP8X") {
      return {
        width: 1 + buf.readUIntLE(24, 3),
        height: 1 + buf.readUIntLE(27, 3),
      };
    }
    if (format === "VP8 ") {
      return { width: buf.readUInt16LE(26) & 0x3fff, height: buf.readUInt16LE(28) & 0x3fff };
    }
    if (format === "VP8L") {
      const bits = buf.readUInt32LE(21);
      return { width: (bits & 0x3fff) + 1, height: ((bits >> 14) & 0x3fff) + 1 };
    }
  }

  // JPEG: den ersten SOF-Marker suchen
  if (buf.length > 4 && buf[0] === 0xff && buf[1] === 0xd8) {
    let i = 2;
    while (i < buf.length - 9) {
      if (buf[i] !== 0xff) {
        i++;
        continue;
      }
      const marker = buf[i + 1];
      // SOF0…SOF15, ohne die Marker, die keine Bildmaße tragen
      if (marker >= 0xc0 && marker <= 0xcf && marker !== 0xc4 && marker !== 0xc8 && marker !== 0xcc) {
        return { height: buf.readUInt16BE(i + 5), width: buf.readUInt16BE(i + 7) };
      }
      i += 2 + buf.readUInt16BE(i + 2);
    }
  }

  return null;
}

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
  if (buf.length > 21 && buf.toString("ascii", 0, 4) === "RIFF" && buf.toString("ascii", 8, 12) === "WEBP") {
    const format = buf.toString("ascii", 12, 16);
    if (format === "VP8X") return (buf[20] & 0x10) !== 0;
    if (format === "VP8L") return (buf[24] & 0x10) !== 0;
    return false;
  }

  // JPEG kennt keine Transparenz
  return false;
}
