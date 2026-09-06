import { join } from "node:path";
import { existsSync } from "node:fs";
import { site } from "@/lib/site";
import { Logo } from "./Logo";
import { Wordmark } from "./Wordmark";

/**
 * Mögliche Dateinamen, in dieser Reihenfolge:
 * `logo-freigestellt.png` ist die aufbereitete Fassung ohne Hintergrund und
 * wird unverändert gezeigt. Liegt nur das Original mit weißem Grund vor, wird
 * es notdürftig umgekehrt – das ist als Zwischenlösung gedacht.
 */
const PREPARED = ["/logo-freigestellt.png", "/logo-freigestellt.webp", "/logo.svg"];
const RAW = ["/logo.png", "/logo.webp", "/logo.jpg", "/logo.jpeg"];

function find(files: string[]): string | null {
  for (const file of files) {
    if (existsSync(join(process.cwd(), "public", file))) return file;
  }
  return null;
}

/**
 * Zeigt das echte Logo, sobald es unter `public/logo.png` liegt – sonst die
 * gesetzte Wortmarke.
 *
 * Das Logo ist schwarze Zeichnung auf Weiß. `invert` dreht es zu heller
 * Zeichnung auf Schwarz, `mix-blend-screen` lässt das Schwarz verschwinden –
 * damit steht die Marke sauber auf dem dunklen Hintergrund, ohne dass eine
 * freigestellte Fassung nötig wäre.
 */
export function BrandMark({ size = "nav" }: { size?: "nav" | "footer" }) {
  const prepared = find(PREPARED);
  const raw = prepared ? null : find(RAW);
  const logo = prepared ?? raw;
  const height = size === "nav" ? "h-11 sm:h-12" : "h-20";

  if (logo) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={logo}
        alt={site.name}
        className={`w-auto object-contain ${height} ${raw ? "mix-blend-screen invert" : ""}`}
      />
    );
  }

  return (
    <span className="flex items-center gap-3">
      {/* Auf schmalen Geräten nur die Wortmarke – sonst wird es neben dem
          Menüknopf zu eng */}
      <Logo
        className={size === "nav" ? "hidden h-9 w-9 sm:block" : "h-10 w-10"}
      />
      <Wordmark subline={size === "footer"} />
    </span>
  );
}
