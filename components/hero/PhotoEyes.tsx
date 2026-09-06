"use client";

import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { useEffect, useId, useRef } from "react";
import type { HeroPhoto } from "@/lib/heroPhoto";

/** Bis zu diesem Anteil des Radius deckt die Maske vollflächig, danach läuft sie aus. */
const SOLID = 0.86;

const EDGE_FADE = [
  "linear-gradient(to right, transparent 0%, black 14%, black 86%, transparent 100%)",
  "linear-gradient(to bottom, transparent 0%, black 12%, black 84%, transparent 100%)",
].join(", ");

type Props = {
  photo: HeroPhoto;
  /** Tatsächliche Maße der Bilddatei, zur Build-Zeit ausgelesen */
  width: number;
  height: number;
};

/**
 * Fotografischer Hero: Das Bild bleibt unverändert, nur die Iris wird als
 * eigene, weich auslaufende Scheibe darübergelegt und folgt dem Mauszeiger.
 *
 * Zwei Details entscheiden darüber, ob das echt wirkt:
 * die Scheibe muss bis `Irisradius + Ausschlag` vollflächig decken, sonst
 * blitzt die ursprüngliche Iris am nachlaufenden Rand hervor – und sie muss
 * auf die Lidspalte begrenzt sein, sonst wandert die Lidkante mit.
 */
export function PhotoEyes({ photo, width, height }: Props) {
  const uid = useId().replace(/:/g, "");
  const reduceMotion = useReducedMotion();
  const wrapRef = useRef<HTMLDivElement>(null);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const px = useSpring(rawX, { stiffness: 90, damping: 22, mass: 0.9 });
  const py = useSpring(rawY, { stiffness: 90, damping: 22, mass: 0.9 });

  // Anteile in Pixel des Originalbilds umrechnen
  const smallestRadius = Math.min(...photo.eyes.map((e) => e.r)) * width;
  const range = {
    x: (photo.move?.x ?? 0.2 * Math.min(...photo.eyes.map((e) => e.r))) * width,
    y: (photo.move?.y ?? 0.07 * Math.min(...photo.eyes.map((e) => e.r))) * width,
  };
  const extra = (photo.padding ?? 0) * width;

  const irisX = useTransform(px, [-1, 1], [-range.x, range.x]);
  const irisY = useTransform(py, [-1, 1], [-range.y, range.y]);

  const discRadius = (r: number, move: number) => (r + move + smallestRadius * 0.02) / SOLID + extra;

  const eyes = photo.eyes.map((eye) => {
    const cx = eye.cx * width;
    const cy = eye.cy * height;
    const r = eye.r * width;
    const opening = eye.opening
      ? {
          cx: eye.opening.cx * width,
          cy: eye.opening.cy * height,
          rx: eye.opening.rx * width,
          ry: eye.opening.ry * height,
        }
      : { cx, cy, rx: r * 2, ry: r * 0.95 };
    return { cx, cy, r, opening };
  });

  const crop = photo.crop
    ? {
        x: photo.crop.x * width,
        y: photo.crop.y * height,
        w: photo.crop.w * width,
        h: photo.crop.h * height,
      }
    : { x: 0, y: 0, w: width, h: height };

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
    <div
      ref={wrapRef}
      className="pointer-events-none mx-auto w-full max-w-6xl select-none"
      style={{
        // Kanten weich auslaufen lassen, damit das Foto nicht als Rechteck
        // im dunklen Hero steht
        WebkitMaskImage: EDGE_FADE,
        maskImage: EDGE_FADE,
        WebkitMaskComposite: "source-in",
        maskComposite: "intersect",
      }}
    >
      <svg
        viewBox={`${crop.x} ${crop.y} ${crop.w} ${crop.h}`}
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
          {eyes.map((eye, i) => (
            <clipPath key={`clip-${i}`} id={`opening-${uid}-${i}`} clipPathUnits="userSpaceOnUse">
              <ellipse cx={eye.opening.cx} cy={eye.opening.cy} rx={eye.opening.rx} ry={eye.opening.ry} />
            </clipPath>
          ))}
          {eyes.map((eye, i) => (
            <mask key={`mask-${i}`} id={`iris-mask-${uid}-${i}`} maskUnits="userSpaceOnUse">
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

        <image href={photo.src} x="0" y="0" width={width} height={height} />

        {eyes.map((eye, i) => (
          // Der Clip steht fest, nur der Inhalt darin wandert
          <g key={i} clipPath={`url(#opening-${uid}-${i})`}>
            <motion.g style={{ x: irisX, y: irisY }}>
              <image
                href={photo.src}
                x="0"
                y="0"
                width={width}
                height={height}
                mask={`url(#iris-mask-${uid}-${i})`}
              />
            </motion.g>
          </g>
        ))}
      </svg>
    </div>
  );
}
