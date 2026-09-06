import { site } from "@/lib/site";

/**
 * Wortmarke: Kleinschreibung mit dem Punkt als Akzent – so, wie der Name
 * geschrieben wird. `subline` blendet die Zeile darunter ein.
 */
export function Wordmark({ subline = true }: { subline?: boolean }) {
  return (
    <span className="flex flex-col leading-none">
      <span className="font-[family-name:var(--font-display)] text-[21px] tracking-[0.02em] text-white/95 sm:text-[23px]">
        {site.nameParts.first}
        <span className="text-lilac-300">.{site.nameParts.second}</span>
      </span>
      {subline ? (
        <span className="mt-1.5 text-[9px] tracking-[0.44em] text-white/40 uppercase">
          Lash Studio
        </span>
      ) : null}
    </span>
  );
}
