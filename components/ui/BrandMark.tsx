import { site } from "@/lib/site";

/**
 * Das Logo der Kundin: die Ligatur AC neben "MAISON by ana catarina".
 * Die Datei ist freigestellt, die Zeichnung liegt also direkt auf dem
 * Creme-Grund – kein sichtbarer Kreis, kein weißer Kasten.
 */
export function BrandMark({ size = "nav" }: { size?: "nav" | "footer" }) {
  const hoehe = size === "footer" ? "h-14 sm:h-16" : "h-10 sm:h-14";

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/logo-ac.png"
      alt={site.name}
      className={`${hoehe} w-auto`}
      width={1081}
      height={491}
    />
  );
}

/**
 * Der Name groß im Kopf der Startseite – in der Schrift des Logos, gesperrt
 * gesetzt wie "MAISON" darin.
 */
export function Wortmarke({ className = "" }: { className?: string }) {
  return (
    <span
      className={`font-[family-name:var(--font-display)] leading-[1.25] font-normal tracking-[0.18em] text-ink-900 uppercase ${className}`}
    >
      {site.name}
    </span>
  );
}
