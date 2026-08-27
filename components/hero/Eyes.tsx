"use client";

import {
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useEffect, useId, useMemo, useRef } from "react";

const VB_W = 260;
const VB_H = 150;
const CX = VB_W / 2;
const CY = VB_H / 2;

/** Deterministischer Zufall – identisch auf Server und Client (kein Hydration-Mismatch). */
function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type Lash = { d: string; w: number; o: number };

type Pt = { x: number; y: number };

// Kontrollpunkte des oberen Lidbogens – Wimpern sitzen exakt auf dieser Kurve.
const P0: Pt = { x: 14, y: CY };
const P1: Pt = { x: CX * 0.5, y: CY - 62 };
const P2: Pt = { x: CX * 1.5, y: CY - 62 };
const P3: Pt = { x: VB_W - 14, y: CY };

function cubicAt(u: number): Pt {
  const v = 1 - u;
  return {
    x: v * v * v * P0.x + 3 * v * v * u * P1.x + 3 * v * u * u * P2.x + u * u * u * P3.x,
    y: v * v * v * P0.y + 3 * v * v * u * P1.y + 3 * v * u * u * P2.y + u * u * u * P3.y,
  };
}

function cubicTangent(u: number): Pt {
  const v = 1 - u;
  const x = 3 * v * v * (P1.x - P0.x) + 6 * v * u * (P2.x - P1.x) + 3 * u * u * (P3.x - P2.x);
  const y = 3 * v * v * (P1.y - P0.y) + 6 * v * u * (P2.y - P1.y) + 3 * u * u * (P3.y - P2.y);
  const len = Math.hypot(x, y) || 1;
  return { x: x / len, y: y / len };
}

function rotate(p: Pt, a: number): Pt {
  const c = Math.cos(a);
  const s = Math.sin(a);
  return { x: p.x * c - p.y * s, y: p.x * s + p.y * c };
}

/**
 * Wimpernkranz entlang des Lidbogens: Ansatz auf der Kurve, Richtung entlang
 * der Normalen, nach außen aufgefächert und an der Spitze eingedreht.
 */
function buildUpperLashes(
  seed: number,
  count: number,
  maxLength: number,
  opts: { widthScale?: number; lengthScale?: number; jitter?: number } = {},
): Lash[] {
  const { widthScale = 1, lengthScale = 1, jitter = 1 } = opts;
  const rnd = mulberry32(seed);
  const lashes: Lash[] = [];

  for (let i = 0; i < count; i++) {
    const u = 0.035 + (0.93 * (i + 0.5)) / count;
    const root = cubicAt(u);
    const tan = cubicTangent(u);
    // Normale zeigt vom Lid weg nach oben
    const normal = { x: tan.y, y: -tan.x };
    // Auffächern: innen steil, außen zunehmend geneigt
    const dir = rotate(normal, (u - 0.42) * 0.85);

    const bell = Math.sin(Math.PI * Math.min(Math.max(u, 0.05), 0.95));
    const len =
      maxLength * lengthScale * (0.44 + 0.56 * bell) * (0.8 + 0.36 * u) * (0.9 + rnd() * 0.2 * jitter);

    const tip = { x: root.x + dir.x * len, y: root.y + dir.y * len };
    // Leichte Drehung der Spitze erzeugt den typischen Curl
    const curlDir = rotate(dir, (0.34 + rnd() * 0.18) * (u < 0.5 ? -1 : 1));
    const c1 = { x: root.x + dir.x * len * 0.42, y: root.y + dir.y * len * 0.42 };
    const c2 = { x: tip.x - curlDir.x * len * 0.34, y: tip.y - curlDir.y * len * 0.34 };

    lashes.push({
      d: `M${root.x.toFixed(2)} ${root.y.toFixed(2)} C${c1.x.toFixed(2)} ${c1.y.toFixed(2)} ${c2.x.toFixed(2)} ${c2.y.toFixed(2)} ${tip.x.toFixed(2)} ${tip.y.toFixed(2)}`,
      w: Number(((0.95 + rnd() * 1.0) * widthScale).toFixed(2)),
      o: Number((0.7 + rnd() * 0.3).toFixed(2)),
    });
  }
  return lashes;
}

const B0: Pt = { x: 14, y: CY };
const B1: Pt = { x: CX * 0.5, y: CY + 44 };
const B2: Pt = { x: CX * 1.5, y: CY + 44 };
const B3: Pt = { x: VB_W - 14, y: CY };

function buildLowerLashes(seed: number, count: number): Lash[] {
  const rnd = mulberry32(seed);
  const lashes: Lash[] = [];
  for (let i = 0; i < count; i++) {
    const u = 0.1 + (0.8 * (i + 0.5)) / count;
    const v = 1 - u;
    const x =
      v * v * v * B0.x + 3 * v * v * u * B1.x + 3 * v * u * u * B2.x + u * u * u * B3.x;
    const y =
      v * v * v * B0.y + 3 * v * v * u * B1.y + 3 * v * u * u * B2.y + u * u * u * B3.y;
    const len = (6 + Math.sin(Math.PI * u) * 7) * (0.8 + rnd() * 0.4);
    const a = (78 + (u - 0.5) * 74) * (Math.PI / 180);
    const ex = x + Math.cos(a) * len;
    const ey = y + Math.sin(a) * len;
    lashes.push({
      d: `M${x.toFixed(2)} ${y.toFixed(2)} Q${(x + (ex - x) * 0.45).toFixed(2)} ${(y + (ey - y) * 0.75).toFixed(2)} ${ex.toFixed(2)} ${ey.toFixed(2)}`,
      w: Number((0.65 + rnd() * 0.45).toFixed(2)),
      o: Number((0.35 + rnd() * 0.3).toFixed(2)),
    });
  }
  return lashes;
}

const LID_TOP = `M14 ${CY} C${CX * 0.5} ${CY - 62} ${CX * 1.5} ${CY - 62} ${VB_W - 14} ${CY}`;
const LID_BOTTOM = `M14 ${CY} C${CX * 0.5} ${CY + 44} ${CX * 1.5} ${CY + 44} ${VB_W - 14} ${CY}`;
const EYE_SHAPE = `${LID_TOP} C${CX * 1.5} ${CY + 44} ${CX * 0.5} ${CY + 44} 14 ${CY} Z`;

type EyeProps = {
  seed: number;
  /** Spiegelt nur die Wimperngeometrie – der Blick beider Augen bleibt gleichgerichtet. */
  mirrored?: boolean;
  px: MotionValue<number>;
  py: MotionValue<number>;
};

function Eye({ seed, mirrored = false, px, py }: EyeProps) {
  const uid = useId().replace(/:/g, "");
  const reduceMotion = useReducedMotion();
  const blink = useMotionValue(1);

  const flip = mirrored ? `translate(${VB_W} 0) scale(-1 1)` : undefined;

  const upperLashes = useMemo(() => buildUpperLashes(seed, 34, 44), [seed]);
  // Zweite, kürzere Lage direkt darunter – erzeugt die Dichte eines Volume-Sets
  const underLashes = useMemo(
    () => buildUpperLashes(seed + 421, 28, 44, { widthScale: 0.72, lengthScale: 0.58 }),
    [seed],
  );
  const lowerLashes = useMemo(() => buildLowerLashes(seed + 99, 18), [seed]);

  // Iris folgt dem Zeiger – begrenzt, damit sie im Auge bleibt
  const irisX = useTransform(px, [-1, 1], [-19, 19]);
  const irisY = useTransform(py, [-1, 1], [-9, 9]);
  const pupilX = useTransform(px, [-1, 1], [-23, 23]);
  const pupilY = useTransform(py, [-1, 1], [-11, 11]);
  // Wimpern und Lid bewegen sich minimal mit – wirkt lebendig statt starr
  const lashX = useTransform(px, [-1, 1], [-5, 5]);
  const lashY = useTransform(py, [-1, 1], [-3.5, 3.5]);
  const lidTilt = useTransform(px, [-1, 1], [-2.2, 2.2]);
  const shineX = useTransform(px, [-1, 1], [-26, 26]);

  // Natürliches Blinzeln in unregelmäßigen Abständen
  useEffect(() => {
    if (reduceMotion) return;
    let cancelled = false;
    let timer: ReturnType<typeof setTimeout>;
    let extra: ReturnType<typeof setTimeout>;

    const loop = () => {
      const delay = 2600 + Math.random() * 4200;
      timer = setTimeout(() => {
        if (cancelled) return;
        animate(blink, [1, 0.04, 1], { duration: 0.34, times: [0, 0.42, 1] });
        if (Math.random() > 0.7) {
          extra = setTimeout(() => {
            if (!cancelled) animate(blink, [1, 0.1, 1], { duration: 0.24 });
          }, 420);
        }
        loop();
      }, delay);
    };
    loop();

    return () => {
      cancelled = true;
      clearTimeout(timer);
      clearTimeout(extra);
    };
  }, [blink, reduceMotion]);

  return (
    <motion.svg
      viewBox={`0 0 ${VB_W} ${VB_H}`}
      className="h-auto w-[42vw] max-w-[300px] min-w-[130px] sm:w-[32vw] md:w-[24vw]"
      style={{ rotate: lidTilt }}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <radialGradient id={`sclera-${uid}`} cx="50%" cy="42%">
          <stop offset="0%" stopColor="#fbf9ff" />
          <stop offset="58%" stopColor="#e7e1f2" />
          <stop offset="100%" stopColor="#aea4c2" />
        </radialGradient>
        <radialGradient id={`iris-${uid}`} cx="42%" cy="36%">
          <stop offset="0%" stopColor="#d8c8ff" />
          <stop offset="34%" stopColor="#a983f7" />
          <stop offset="72%" stopColor="#6b3ac0" />
          <stop offset="100%" stopColor="#2a1650" />
        </radialGradient>
        <linearGradient id={`lash-${uid}`} x1="0" y1="1" x2="0.25" y2="0">
          <stop offset="0%" stopColor="#050409" />
          <stop offset="62%" stopColor="#1c1428" />
          <stop offset="100%" stopColor="#a983f7" />
        </linearGradient>
        <linearGradient id={`lidline-${uid}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#0a0810" stopOpacity="0.35" />
          <stop offset="50%" stopColor="#0a0810" />
          <stop offset="100%" stopColor="#0a0810" stopOpacity="0.35" />
        </linearGradient>
        <radialGradient id={`socket-${uid}`} cx="50%" cy="45%">
          <stop offset="0%" stopColor="#c0a7ff" stopOpacity="0.16" />
          <stop offset="100%" stopColor="#c0a7ff" stopOpacity="0" />
        </radialGradient>
        <filter id={`soft-${uid}`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="6" />
        </filter>
        <clipPath id={`clip-${uid}`}>
          <path d={EYE_SHAPE} />
        </clipPath>
      </defs>

      <ellipse cx={CX} cy={CY - 6} rx={CX * 0.98} ry={CY * 1.15} fill={`url(#socket-${uid})`} />

      <motion.g style={{ scaleY: blink, originY: (CY - 6) / VB_H }}>
        {/* Untere Wimpern liegen hinter dem Auge */}
        <g transform={flip} stroke={`url(#lash-${uid})`} fill="none" strokeLinecap="round">
          {lowerLashes.map((l, i) => (
            <path key={i} d={l.d} strokeWidth={l.w} opacity={l.o} />
          ))}
        </g>

        <g clipPath={`url(#clip-${uid})`}>
          <path d={EYE_SHAPE} fill={`url(#sclera-${uid})`} />

          <motion.g style={{ x: irisX, y: irisY }}>
            <circle cx={CX} cy={CY - 2} r="31" fill={`url(#iris-${uid})`} />
            <g stroke="#3a2064" strokeWidth="0.7" opacity="0.5">
              {Array.from({ length: 28 }).map((_, i) => {
                const a = (i / 28) * Math.PI * 2;
                return (
                  <line
                    key={i}
                    x1={CX + Math.cos(a) * 11}
                    y1={CY - 2 + Math.sin(a) * 11}
                    x2={CX + Math.cos(a) * 29}
                    y2={CY - 2 + Math.sin(a) * 29}
                  />
                );
              })}
            </g>
            <circle cx={CX} cy={CY - 2} r="31" fill="none" stroke="#1b0f33" strokeWidth="3.4" opacity="0.75" />
            <circle cx={CX} cy={CY - 2} r="20" fill="#c0a7ff" opacity="0.12" />
          </motion.g>

          {/* Pupille bewegt sich einen Hauch weiter – das erzeugt Tiefe */}
          <motion.g style={{ x: pupilX, y: pupilY }}>
            <circle cx={CX} cy={CY - 2} r="12.5" fill="#050409" />
            <circle cx={CX - 5} cy={CY - 9} r="5" fill="#ffffff" opacity="0.92" />
            <circle cx={CX + 7} cy={CY + 5} r="2.4" fill="#ffffff" opacity="0.5" />
          </motion.g>

          <motion.ellipse
            cx={CX}
            cy={CY - 20}
            rx="54"
            ry="12"
            fill="#ffffff"
            opacity="0.16"
            filter={`url(#soft-${uid})`}
            style={{ x: shineX }}
          />

          <path d={LID_TOP} fill="none" stroke="#1a1424" strokeWidth="12" opacity="0.4" />
        </g>

        <path d={LID_TOP} fill="none" stroke={`url(#lidline-${uid})`} strokeWidth="4.6" strokeLinecap="round" />
        <path d={LID_BOTTOM} fill="none" stroke="#2b2336" strokeWidth="1.8" opacity="0.8" strokeLinecap="round" />

        <motion.g style={{ x: lashX, y: lashY }}>
          <g transform={flip} stroke={`url(#lash-${uid})`} fill="none" strokeLinecap="round">
            {underLashes.map((l, i) => (
              <path key={`u${i}`} d={l.d} strokeWidth={l.w} opacity={l.o * 0.8} />
            ))}
            {upperLashes.map((l, i) => (
              <motion.path
                key={i}
                d={l.d}
                strokeWidth={l.w}
                opacity={l.o}
                initial={reduceMotion ? false : { pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: l.o }}
                transition={{ duration: 0.9, delay: 0.35 + i * 0.018, ease: [0.22, 1, 0.36, 1] }}
              />
            ))}
          </g>
        </motion.g>

        <path
          d={`M28 ${CY - 16} C${CX * 0.7} ${CY - 58} ${CX * 1.4} ${CY - 56} ${VB_W - 30} ${CY - 14}`}
          fill="none"
          stroke="#b9a7d6"
          strokeWidth="1.2"
          opacity="0.18"
        />
      </motion.g>
    </motion.svg>
  );
}

/** Zwei Augen, deren Blick dem Mauszeiger weich folgt. */
export function Eyes() {
  const reduceMotion = useReducedMotion();
  const wrapRef = useRef<HTMLDivElement>(null);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  const spring = { stiffness: 90, damping: 22, mass: 0.9 };
  const px = useSpring(rawX, spring);
  const py = useSpring(rawY, spring);

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
        // Normiert auf -1 … 1, mit weichem Auslauf zum Rand
        const nx = Math.max(-1, Math.min(1, (clientX - cx) / (window.innerWidth * 0.42)));
        const ny = Math.max(-1, Math.min(1, (clientY - cy) / (window.innerHeight * 0.45)));
        rawX.set(nx);
        rawY.set(ny);
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
      className="pointer-events-none flex items-center justify-center gap-[4vw] select-none sm:gap-10 md:gap-14"
    >
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.94 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
      >
        <Eye seed={11} px={px} py={py} />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.94 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1.3, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
      >
        <Eye seed={11} mirrored px={px} py={py} />
      </motion.div>
    </div>
  );
}
