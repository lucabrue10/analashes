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

const VB_W = 300;
const VB_H = 180;

type Pt = { x: number; y: number };
const pt = (x: number, y: number): Pt => ({ x, y });

/** Lidbögen als je eine kubische Kurve – ruhige, durchgehende Linienführung. */
const UPPER: readonly Pt[] = [pt(30, 104), pt(80, 50), pt(214, 44), pt(272, 94)];
const LOWER: readonly Pt[] = [pt(272, 94), pt(230, 132), pt(114, 138), pt(30, 104)];

const IRIS = pt(152, 94);
const IR = 40;
const PUPIL_R = 15;

function curveAt(c: readonly Pt[], u: number): Pt {
  const v = 1 - u;
  return {
    x: v * v * v * c[0].x + 3 * v * v * u * c[1].x + 3 * v * u * u * c[2].x + u * u * u * c[3].x,
    y: v * v * v * c[0].y + 3 * v * v * u * c[1].y + 3 * v * u * u * c[2].y + u * u * u * c[3].y,
  };
}

function curveTangent(c: readonly Pt[], u: number): Pt {
  const v = 1 - u;
  const x = 3 * v * v * (c[1].x - c[0].x) + 6 * v * u * (c[2].x - c[1].x) + 3 * u * u * (c[3].x - c[2].x);
  const y = 3 * v * v * (c[1].y - c[0].y) + 6 * v * u * (c[2].y - c[1].y) + 3 * u * u * (c[3].y - c[2].y);
  const len = Math.hypot(x, y) || 1;
  return { x: x / len, y: y / len };
}

const rotate = (p: Pt, a: number): Pt => ({
  x: p.x * Math.cos(a) - p.y * Math.sin(a),
  y: p.x * Math.sin(a) + p.y * Math.cos(a),
});

const pathOf = (c: readonly Pt[]) =>
  `M${c[0].x} ${c[0].y} C${c[1].x} ${c[1].y} ${c[2].x} ${c[2].y} ${c[3].x} ${c[3].y}`;

const UPPER_PATH = pathOf(UPPER);
const LOWER_PATH = pathOf(LOWER);
const EYE_SHAPE = `${UPPER_PATH} C${LOWER[1].x} ${LOWER[1].y} ${LOWER[2].x} ${LOWER[2].y} ${LOWER[3].x} ${LOWER[3].y} Z`;

function bezier(p0: Pt, p1: Pt, p2: Pt, p3: Pt, t: number): Pt {
  const v = 1 - t;
  return {
    x: v * v * v * p0.x + 3 * v * v * t * p1.x + 3 * v * t * t * p2.x + t * t * t * p3.x,
    y: v * v * v * p0.y + 3 * v * v * t * p1.y + 3 * v * t * t * p2.y + t * t * t * p3.y,
  };
}

/** Eine Wimper als Fläche: an der Wurzel breit, zur Spitze fein auslaufend. */
function strand(p0: Pt, p1: Pt, p2: Pt, p3: Pt, rootWidth: number, samples = 14): string {
  const left: string[] = [];
  const right: string[] = [];
  for (let i = 0; i <= samples; i++) {
    const t = i / samples;
    const p = bezier(p0, p1, p2, p3, t);
    const a = bezier(p0, p1, p2, p3, Math.max(0, t - 0.03));
    const b = bezier(p0, p1, p2, p3, Math.min(1, t + 0.03));
    const tx = b.x - a.x;
    const ty = b.y - a.y;
    const len = Math.hypot(tx, ty) || 1;
    const w = (rootWidth * Math.pow(1 - t, 0.85)) / 2 + 0.06;
    const nx = (ty / len) * w;
    const ny = (-tx / len) * w;
    left.push(`${(p.x + nx).toFixed(2)} ${(p.y + ny).toFixed(2)}`);
    right.push(`${(p.x - nx).toFixed(2)} ${(p.y - ny).toFixed(2)}`);
  }
  return `M${left.join(" L")} L${right.reverse().join(" L")} Z`;
}

type Lash = { d: string; tinted: boolean };

/**
 * Wimpernkranz mit streng gleichmäßigem Fächer: Ansatz, Winkel und Länge
 * wachsen monoton über die Lidkante. Dadurch können sich zwei Wimpern nicht
 * kreuzen – der Kranz bleibt ruhig, statt zu verfilzen.
 */
function buildLashes(
  count: number,
  maxLength: number,
  opts: { lengthScale?: number; widthScale?: number; from?: number; to?: number; tintFrom?: number } = {},
): Lash[] {
  const { lengthScale = 1, widthScale = 1, from = 0.08, to = 0.96, tintFrom = 0.84 } = opts;
  const out: Lash[] = [];

  for (let i = 0; i < count; i++) {
    const u = from + ((to - from) * i) / (count - 1);
    const root = curveAt(UPPER, u);
    const tan = curveTangent(UPPER, u);
    const normal = { x: tan.y, y: -tan.x };

    // Fächer: innen steil, nach außen zunehmend flach – der Schwung des Sets
    const dir = rotate(normal, (u - 0.36) * 1.0 + Math.pow(Math.max(u - 0.55, 0) / 0.45, 2) * 0.34);

    // Länge: weiche Glocke mit klarem Übergewicht nach außen
    const bell = Math.sin(Math.PI * Math.min(Math.max(u, 0.02), 0.98));
    // Sanfte Bündelung zu Spitzen – die Modulation bleibt so klein,
    // dass sich benachbarte Wimpern trotzdem nicht kreuzen
    const cluster = 1 + 0.07 * Math.cos(2 * Math.PI * 4.5 * u);
    const len =
      maxLength * lengthScale * (0.34 + 0.66 * bell) * (0.52 + 1.06 * Math.pow(u, 1.35)) * cluster;

    const tip = { x: root.x + dir.x * len, y: root.y + dir.y * len };
    // Der Curl dreht stetig durch – kein Vorzeichenwechsel, keine Kreuzung
    const flick = rotate(dir, (u - 0.42) * 0.9);
    const c1 = { x: root.x + dir.x * len * 0.4, y: root.y + dir.y * len * 0.4 };
    const c2 = { x: tip.x - flick.x * len * 0.34, y: tip.y - flick.y * len * 0.34 };

    out.push({
      d: strand(root, c1, c2, tip, (1.5 + 1.0 * bell) * (0.85 + 0.75 * u) * widthScale),
      tinted: u > tintFrom,
    });
  }
  return out;
}

function buildLowerLashes(count: number): Lash[] {
  const out: Lash[] = [];
  for (let i = 0; i < count; i++) {
    const u = 0.18 + (0.64 * i) / (count - 1);
    const root = curveAt(LOWER, u);
    const tan = curveTangent(LOWER, u);
    const dir = rotate({ x: tan.y, y: -tan.x }, (0.42 - u) * 0.6);
    const len = 7 + Math.sin(Math.PI * u) * 6;
    const tip = { x: root.x + dir.x * len, y: root.y + dir.y * len };
    const c1 = { x: root.x + dir.x * len * 0.45, y: root.y + dir.y * len * 0.45 };
    const c2 = { x: tip.x - dir.x * len * 0.25, y: tip.y - dir.y * len * 0.25 };
    out.push({ d: strand(root, c1, c2, tip, 1, 8), tinted: false });
  }
  return out;
}

/** Lidkante: schmal am inneren Winkel, gleichmäßig breiter nach außen. */
function buildLidMargin(): string {
  const outer: string[] = [];
  const inner: string[] = [];
  const steps = 28;
  for (let i = 0; i <= steps; i++) {
    const u = i / steps;
    const p = curveAt(UPPER, u);
    const tan = curveTangent(UPPER, u);
    const n = { x: tan.y, y: -tan.x };
    const w = 1.4 + 5.6 * Math.sin(Math.PI * Math.min(u + 0.1, 1)) * (0.4 + 0.6 * u);
    outer.push(`${(p.x + n.x * 0.6).toFixed(2)} ${(p.y + n.y * 0.6).toFixed(2)}`);
    inner.push(`${(p.x - n.x * w).toFixed(2)} ${(p.y - n.y * w).toFixed(2)}`);
  }
  return `M${outer.join(" L")} L${inner.reverse().join(" L")} Z`;
}

const LID_MARGIN = buildLidMargin();

type EyeProps = {
  mirrored?: boolean;
  px: MotionValue<number>;
  py: MotionValue<number>;
};

function Eye({ mirrored = false, px, py }: EyeProps) {
  const uid = useId().replace(/:/g, "");
  const reduceMotion = useReducedMotion();
  const blink = useMotionValue(1);

  const underLashes = useMemo(() => buildLashes(30, 50, { lengthScale: 0.56, widthScale: 0.78 }), []);
  const lashes = useMemo(() => buildLashes(38, 50), []);
  const lowerLashes = useMemo(() => buildLowerLashes(12), []);

  // Das ganze Auge wird gespiegelt – damit beide Augen gleich blicken, wird
  // die waagerechte Bewegung beim gespiegelten Auge invertiert.
  const sx = mirrored ? -1 : 1;
  const irisX = useTransform(px, [-1, 1], [-11 * sx, 11 * sx]);
  const irisY = useTransform(py, [-1, 1], [-4, 4]);
  const glintX = useTransform(px, [-1, 1], [-7 * sx, 7 * sx]);
  const glintY = useTransform(py, [-1, 1], [-4, 4]);
  const lashX = useTransform(px, [-1, 1], [-3 * sx, 3 * sx]);
  const lashY = useTransform(py, [-1, 1], [-2, 2]);
  const tilt = useTransform(px, [-1, 1], [-1.4 * sx, 1.4 * sx]);

  useEffect(() => {
    if (reduceMotion) return;
    let cancelled = false;
    let timer: ReturnType<typeof setTimeout>;

    const loop = () => {
      timer = setTimeout(
        () => {
          if (cancelled) return;
          animate(blink, [1, 0.03, 1], { duration: 0.3, times: [0, 0.42, 1] });
          loop();
        },
        3200 + Math.random() * 4200,
      );
    };
    loop();

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [blink, reduceMotion]);

  const fill = (l: Lash) => (l.tinted ? `url(#tip-${uid})` : `url(#lash-${uid})`);

  return (
    <motion.svg
      viewBox={`0 0 ${VB_W} ${VB_H}`}
      className="h-auto w-[46vw] max-w-[330px] min-w-[150px] sm:w-[33vw] md:w-[25vw]"
      style={{ rotate: tilt }}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <radialGradient id={`sclera-${uid}`} cx="48%" cy="46%">
          <stop offset="0%" stopColor="#c3bcc8" />
          <stop offset="50%" stopColor="#9c94a6" />
          <stop offset="100%" stopColor="#514b5c" />
        </radialGradient>
        <linearGradient id={`shade-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0d0912" stopOpacity="0.85" />
          <stop offset="45%" stopColor="#0d0912" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#0d0912" stopOpacity="0.34" />
        </linearGradient>
        <radialGradient id={`corner-${uid}`} cx="50%" cy="50%">
          <stop offset="40%" stopColor="#120d18" stopOpacity="0" />
          <stop offset="100%" stopColor="#120d18" stopOpacity="0.9" />
        </radialGradient>
        <radialGradient id={`iris-${uid}`} cx="44%" cy="36%">
          <stop offset="0%" stopColor="#b6c6d6" />
          <stop offset="36%" stopColor="#7e93ab" />
          <stop offset="72%" stopColor="#44566e" />
          <stop offset="100%" stopColor="#18212e" />
        </radialGradient>
        <linearGradient id={`lash-${uid}`} x1="0" y1="1" x2="0.15" y2="0">
          <stop offset="0%" stopColor="#050409" />
          <stop offset="100%" stopColor="#221b30" />
        </linearGradient>
        <linearGradient id={`tip-${uid}`} x1="0" y1="1" x2="0.15" y2="0">
          <stop offset="0%" stopColor="#050409" />
          <stop offset="70%" stopColor="#1a1327" />
          <stop offset="100%" stopColor="#7d64ad" />
        </linearGradient>
        <filter id={`soft-${uid}`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="4" />
        </filter>
        <filter id={`brow-${uid}`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="9" />
        </filter>
        <clipPath id={`eye-${uid}`}>
          <path d={EYE_SHAPE} />
        </clipPath>
      </defs>

      <g transform={mirrored ? `translate(${VB_W} 0) scale(-1 1)` : undefined}>
        {/* Braue nur als weiche Schattierung – sie rahmt das Auge, ohne
            Aufmerksamkeit zu ziehen */}
        <path
          d="M34 30 C96 -4 214 -2 276 26 C214 12 96 12 34 30 Z"
          fill="#241c2c"
          opacity="0.55"
          filter={`url(#brow-${uid})`}
        />

        <motion.g style={{ scaleY: blink, originY: 130 / VB_H, originX: 0.5 }}>
          <g fill={`url(#lash-${uid})`} opacity="0.5">
            {lowerLashes.map((l, i) => (
              <path key={`low-${i}`} d={l.d} />
            ))}
          </g>

          <g clipPath={`url(#eye-${uid})`}>
            <path d={EYE_SHAPE} fill={`url(#sclera-${uid})`} />

            <motion.g style={{ x: irisX, y: irisY }}>
              <circle cx={IRIS.x} cy={IRIS.y} r={IR} fill={`url(#iris-${uid})`} />
              <circle
                cx={IRIS.x}
                cy={IRIS.y}
                r={IR - 2}
                fill="none"
                stroke="#0b0716"
                strokeWidth="4"
                opacity="0.55"
              />
              <circle cx={IRIS.x} cy={IRIS.y} r={PUPIL_R} fill="#050409" />
              <circle
                cx={IRIS.x}
                cy={IRIS.y}
                r={PUPIL_R + 2}
                fill="none"
                stroke="#0a0714"
                strokeWidth="3"
                opacity="0.5"
                filter={`url(#soft-${uid})`}
              />
            </motion.g>

            {/* Schattenkranz um die Iris – erst dadurch sitzt sie im Auge */}
            <motion.ellipse
              cx={IRIS.x}
              cy={IRIS.y}
              rx={IR + 7}
              ry={IR + 7}
              fill="none"
              stroke="#0d0912"
              strokeWidth="12"
              opacity="0.4"
              filter={`url(#soft-${uid})`}
              style={{ x: irisX, y: irisY }}
            />

            {/* Weicher Lidschatten von oben */}
            <path d={EYE_SHAPE} fill={`url(#shade-${uid})`} />
            <path
              d={UPPER_PATH}
              fill="none"
              stroke="#0d0912"
              strokeWidth="10"
              opacity="0.35"
              filter={`url(#soft-${uid})`}
            />

            {/* Schatten in den Augenwinkeln */}
            <ellipse cx={150} cy={94} rx={104} ry={40} fill={`url(#corner-${uid})`} />

            {/* Der Reflex liegt über allen Schatten – sonst wirkt er grau */}
            <motion.g style={{ x: glintX, y: glintY }}>
              <circle cx={IRIS.x - 12} cy={IRIS.y - 13} r="5" fill="#ffffff" opacity="0.9" />
              <circle cx={IRIS.x + 13} cy={IRIS.y + 10} r="2.2" fill="#ffffff" opacity="0.28" />
            </motion.g>
          </g>

          {/* Feuchter Glanz auf der Unterlidkante */}
          <path
            d={LOWER_PATH}
            fill="none"
            stroke="#e8e2ee"
            strokeWidth="1.6"
            opacity="0.3"
            filter={`url(#soft-${uid})`}
          />
          <path d={LOWER_PATH} fill="none" stroke="#1d1626" strokeWidth="1.4" opacity="0.7" />
          <path d={LID_MARGIN} fill="#07050c" />

          <motion.g style={{ x: lashX, y: lashY }}>
            <g>
              {underLashes.map((l, i) => (
                <path key={`u-${i}`} d={l.d} fill={fill(l)} opacity="0.75" />
              ))}
            </g>
            <g>
              {lashes.map((l, i) => (
                <motion.path
                  key={`m-${i}`}
                  d={l.d}
                  fill={fill(l)}
                  initial={reduceMotion ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.3 + i * 0.02, ease: [0.22, 1, 0.36, 1] }}
                />
              ))}
            </g>
          </motion.g>
        </motion.g>
      </g>
    </motion.svg>
  );
}

/** Zwei Augen, deren Blick dem Mauszeiger weich folgt. */
export function Eyes() {
  const reduceMotion = useReducedMotion();
  const wrapRef = useRef<HTMLDivElement>(null);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const px = useSpring(rawX, { stiffness: 90, damping: 22, mass: 0.9 });
  const py = useSpring(rawY, { stiffness: 90, damping: 22, mass: 0.9 });

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
      className="pointer-events-none flex items-center justify-center gap-[3vw] select-none sm:gap-8 md:gap-10"
    >
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      >
        <Eye mirrored px={px} py={py} />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1.2, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      >
        <Eye px={px} py={py} />
      </motion.div>
    </div>
  );
}
