"use client";

import { useRef, useState, type ChangeEvent, type MouseEvent } from "react";

type Eye = { cx: number; cy: number; r: number };

/**
 * Hilfsseite: Foto laden, in jede Pupille klicken, Radius bis zum Irisrand
 * ziehen – die fertigen Werte lassen sich direkt nach lib/heroPhoto.ts kopieren.
 * Wird nicht indexiert und kann nach dem Einrichten gelöscht werden.
 */
export function Calibrator() {
  const [src, setSrc] = useState<string | null>(null);
  const [size, setSize] = useState({ w: 0, h: 0 });
  const [fileName, setFileName] = useState("augen.jpg");
  const [eyes, setEyes] = useState<Eye[]>([]);
  const [draft, setDraft] = useState<Eye | null>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  const onFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileName(file.name);
    setEyes([]);
    setDraft(null);
    setSrc(URL.createObjectURL(file));
  };

  /** Bildschirmkoordinaten in Pixel des Originalbilds umrechnen */
  const toImage = (e: MouseEvent<HTMLDivElement>) => {
    const img = imgRef.current;
    if (!img) return null;
    const r = img.getBoundingClientRect();
    const scale = size.w / r.width;
    return { x: Math.round((e.clientX - r.left) * scale), y: Math.round((e.clientY - r.top) * scale) };
  };

  const onClick = (e: MouseEvent<HTMLDivElement>) => {
    const p = toImage(e);
    if (!p) return;
    if (!draft) {
      setDraft({ cx: p.x, cy: p.y, r: 0 });
      return;
    }
    const r = Math.round(Math.hypot(p.x - draft.cx, p.y - draft.cy));
    setEyes((prev) => [...prev, { ...draft, r }]);
    setDraft(null);
  };

  const onHover = (e: MouseEvent<HTMLDivElement>) => {
    if (!draft) return;
    const p = toImage(e);
    if (!p) return;
    setDraft({ ...draft, r: Math.round(Math.hypot(p.x - draft.cx, p.y - draft.cy)) });
  };

  const snippet = `export const heroPhoto: HeroPhoto | null = {
  src: "/hero/${fileName}",
  width: ${size.w},
  height: ${size.h},
  alt: "Nahaufnahme von Augen mit Wimpernverlängerung",
  eyes: [
${eyes.map((e) => `    { cx: ${e.cx}, cy: ${e.cy}, r: ${e.r} },`).join("\n")}
  ],
  move: { x: ${eyes.length ? Math.round(eyes[0].r * 0.2) : 30}, y: ${eyes.length ? Math.round(eyes[0].r * 0.07) : 10} },
};`;

  return (
    <main className="min-h-screen bg-ink-950 px-6 py-12 text-white/80">
      <div className="mx-auto max-w-5xl">
        <h1 className="font-[family-name:var(--font-display)] text-4xl font-light text-white">
          Hero-Foto kalibrieren
        </h1>
        <ol className="mt-6 space-y-2 text-sm text-white/60">
          <li>1. Foto auswählen (dasselbe, das später unter <code>public/hero/</code> liegt).</li>
          <li>2. In die Mitte der ersten Pupille klicken, dann an den Rand der Iris klicken.</li>
          <li>3. Für jedes weitere Auge wiederholen.</li>
          <li>4. Den erzeugten Block nach <code>lib/heroPhoto.ts</code> kopieren.</li>
        </ol>

        <input
          type="file"
          accept="image/*"
          onChange={onFile}
          className="mt-8 block w-full cursor-pointer rounded-xl border border-white/15 bg-white/5 p-3 text-sm file:mr-4 file:rounded-full file:border-0 file:bg-lilac-500 file:px-4 file:py-2 file:text-white"
        />

        {src ? (
          <>
            <div
              className="relative mt-8 cursor-crosshair overflow-hidden rounded-2xl border border-white/10"
              onClick={onClick}
              onMouseMove={onHover}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                ref={imgRef}
                src={src}
                alt="Zu kalibrierendes Foto"
                className="block w-full"
                onLoad={(e) =>
                  setSize({ w: e.currentTarget.naturalWidth, h: e.currentTarget.naturalHeight })
                }
              />
              {size.w > 0 ? (
                <svg
                  viewBox={`0 0 ${size.w} ${size.h}`}
                  className="pointer-events-none absolute inset-0 h-full w-full"
                >
                  {[...eyes, ...(draft ? [draft] : [])].map((e, i) => (
                    <g key={i}>
                      <circle cx={e.cx} cy={e.cy} r={e.r} fill="none" stroke="#c0a7ff" strokeWidth={size.w / 400} />
                      <circle cx={e.cx} cy={e.cy} r={size.w / 250} fill="#c0a7ff" />
                    </g>
                  ))}
                </svg>
              ) : null}
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3 text-xs">
              <span className="text-white/50">
                Bild: {size.w} × {size.h} px · {eyes.length} Auge(n) erfasst
              </span>
              <button
                type="button"
                onClick={() => {
                  setEyes([]);
                  setDraft(null);
                }}
                className="rounded-full border border-white/15 px-4 py-2 tracking-widest uppercase transition-colors hover:border-lilac-400/50"
              >
                Zurücksetzen
              </button>
            </div>

            <pre className="mt-6 overflow-x-auto rounded-2xl border border-white/10 bg-black/40 p-6 text-xs leading-relaxed text-lilac-100">
              {snippet}
            </pre>
          </>
        ) : null}
      </div>
    </main>
  );
}
