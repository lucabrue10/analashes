"use client";

import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { useEffect, useId, useRef } from "react";
import type { HeroPhoto } from "@/lib/heroPhoto";

/** Bis zu diesem Anteil des Radius deckt die Maske vollflächig, danach läuft sie aus. */
const SOLID = 0.86;

/**
 * Fotografischer Hero: Das Bild bleibt unverändert, nur die Iris wird als
 * eigene, weich auslaufende Scheibe darübergelegt und folgt dem Mauszeiger.
 *
 * Die Scheibe ist bewusst etwas größer als die Iris (`padding`) und wandert
 * höchstens um diesen Betrag – so verdeckt sie die ursprüngliche Iris
 * vollständig und es entsteht kein doppelter Rand.
 */
export function PhotoEyes({ photo }: { photo: HeroPhoto }) {
  const uid = useId().replace(/:/g, "");
  const reduceMotion = useReducedMotion();
  const wrapRef = useRef<HTMLDivElement>(null);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const px = useSpring(rawX, { stiffness: 90, damping: 22, mass: 0.9 });
  const py = useSpring(rawY, { stiffness: 90, damping: 22, mass: 0.9 });

  const range = photo.move ?? {
    x: Math.round(Math.min(...photo.eyes.map((e) => e.r)) * 0.2),
    y: Math.round(Math.min(...photo.eyes.map((e) => e.r)) * 0.07),
  };
  const extra = photo.padding ?? 0;

  /**
   * Die Scheibe muss bis mindestens `r + Ausschlag` vollflächig decken, sonst
   * blitzt die ursprüngliche Iris am nachlaufenden Rand hervor. Da die Maske
   * erst ab SOLID weich wird, ergibt sich der nötige Radius daraus direkt.
   */
  const discRadius = (r: number, move: number) => (r + move + 2) / SOLID + extra;

  /** Ohne eigene Angabe: großzügig in der Breite, knapp in der Höhe. */
  const openingOf = (eye: (typeof photo.eyes)[number]) =>
    eye.opening ?? { cx: eye.cx, cy: eye.cy, rx: eye.r * 2, ry: eye.r * 0.95 };

  const irisX = useTransform(px, [-1, 1], [-range.x, range.x]);
  const irisY = useTransform(py, [-1, 1], [-range.y, range.y]);

  useEffect(() => {
    if (reduceMotion) return;

    let frame = 0;
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(frame);
      const { clientX, clientY } = e;
      frame = requestAnimationFrame(() => {
        const el = wrapRef.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        rawX.set(Math.max(-1, Math.min(1, (clientX - cx) / (window.innerWidth * 0.42))));
        rawY.set(Math.max(-1, Math.min(1, (clientY - cy) / (window.innerHeight * 0.45))));
      });
    };
    const onLeave = () => {
      rawX.set(0);
      rawY.set(0);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, [rawX, rawY, reduceMotion]);

  return (
    <div ref={wrapRef} className="pointer-events-none mx-auto w-full max-w-5xl select-none">
      <svg
        viewBox={`0 0 ${photo.width} ${photo.height}`}
        className="h-auto w-full"
        role="img"
        aria-label={photo.alt}
      >
        <defs>
          <radialGradient id={`feather-${uid}`} cx="50%" cy="50%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset={`${SOLID * 100}%`} stopColor="#ffffff" />
            <stop offset="100%" stopColor="#000000" />
          </radialGradient>
          {photo.eyes.map((eye, i) => {
            const o = openingOf(eye);
            return (
              <clipPath key={`clip-${i}`} id={`opening-${uid}-${i}`} clipPathUnits="userSpaceOnUse">
                <ellipse cx={o.cx} cy={o.cy} rx={o.rx} ry={o.ry} />
              </clipPath>
            );
          })}
          {photo.eyes.map((eye, i) => (
            <mask key={i} id={`iris-mask-${uid}-${i}`} maskUnits="userSpaceOnUse">
              {/* Quer weiter gedehnt als hoch – der Blick wandert vor allem seitlich */}
              <ellipse
                cx={eye.cx}
                cy={eye.cy}
                rx={discRadius(eye.r, range.x)}
                ry={discRadius(eye.r, range.y)}
                fill={`url(#feather-${uid})`}
              />
            </mask>
          ))}
        </defs>

        <image
          href={photo.src}
          x="0"
          y="0"
          width={photo.width}
          height={photo.height}
          preserveAspectRatio="xMidYMid slice"
        />

        {photo.eyes.map((eye, i) => (
          // Der Clip steht fest, nur der Inhalt darin wandert
          <g key={i} clipPath={`url(#opening-${uid}-${i})`}>
            <motion.g style={{ x: irisX, y: irisY }}>
              <image
                href={photo.src}
                x="0"
                y="0"
                width={photo.width}
                height={photo.height}
                mask={`url(#iris-mask-${uid}-${i})`}
                preserveAspectRatio="xMidYMid slice"
              />
            </motion.g>
          </g>
        ))}
      </svg>
    </div>
  );
}
