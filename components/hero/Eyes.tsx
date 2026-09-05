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

const VB_W = 320;
const VB_H = 220;

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

type Pt = { x: number; y: number };
const pt = (x: number, y: number): Pt => ({ x, y });

/**
 * Lidkanten als kubische Bézier. Die Lidspalte ist bewusst asymmetrisch:
 * innerer Winkel tiefer und spitz, äußerer Winkel leicht angehoben.
 */
const UPPER: readonly Pt[] = [pt(36, 124), pt(80, 56), pt(212, 48), pt(270, 104)];
const LOWER: readonly Pt[] = [pt(270, 104), pt(228, 152), pt(118, 160), pt(36, 124)];

// Iris ist höher als die Lidspalte – sie wird oben und unten vom Lid überdeckt.
const IRIS_C = pt(154, 102);
const IR = 45;
const PUPIL_R = 18;

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

function rotate(p: Pt, a: number): Pt {
  const c = Math.cos(a);
  const s = Math.sin(a);
  return { x: p.x * c - p.y * s, y: p.x * s + p.y * c };
}

const path = (c: readonly Pt[]) =>
  `M${c[0].x} ${c[0].y} C${c[1].x} ${c[1].y} ${c[2].x} ${c[2].y} ${c[3].x} ${c[3].y}`;

const UPPER_PATH = path(UPPER);
const LOWER_PATH = path(LOWER);
const EYE_SHAPE = `${UPPER_PATH} C${LOWER[1].x} ${LOWER[1].y} ${LOWER[2].x} ${LOWER[2].y} ${LOWER[3].x} ${LOWER[3].y} Z`;

/* ------------------------------------------------------------------ *
 * Wimpern
 * ------------------------------------------------------------------ */

type Lash = { d: string; tinted: boolean; o: number };

/** Punkt auf einer kubischen Kurve, die durch vier freie Kontrollpunkte läuft. */
function bezier(p0: Pt, p1: Pt, p2: Pt, p3: Pt, t: number): Pt {
  const v = 1 - t;
  return {
    x: v * v * v * p0.x + 3 * v * v * t * p1.x + 3 * v * t * t * p2.x + t * t * t * p3.x,
    y: v * v * v * p0.y + 3 * v * v * t * p1.y + 3 * v * t * t * p2.y + t * t * t * p3.y,
  };
}

/**
 * Eine Wimper als geschlossene Fläche: an der Wurzel dick, zur Spitze fein
 * auslaufend. Genau das unterscheidet echte Wimpern von gleichmäßigen Strichen.
 */
function taperedStrand(p0: Pt, p1: Pt, p2: Pt, p3: Pt, rootWidth: number, samples = 12): string {
  const left: string[] = [];
  const right: string[] = [];

  for (let i = 0; i <= samples; i++) {
    const t = i / samples;
    const p = bezier(p0, p1, p2, p3, t);
    const nxt = bezier(p0, p1, p2, p3, Math.min(1, t + 0.02));
    const prv = bezier(p0, p1, p2, p3, Math.max(0, t - 0.02));
    const tx = nxt.x - prv.x;
    const ty = nxt.y - prv.y;
    const len = Math.hypot(tx, ty) || 1;
    // Breite fällt zur Spitze hin ab, bleibt aber knapp über null
    const w = (rootWidth * Math.pow(1 - t, 0.7)) / 2 + 0.08;
    const nx = (ty / len) * w;
    const ny = (-tx / len) * w;
    left.push(`${(p.x + nx).toFixed(2)} ${(p.y + ny).toFixed(2)}`);
    right.push(`${(p.x - nx).toFixed(2)} ${(p.y - ny).toFixed(2)}`);
  }

  return `M${left.join(" L")} L${right.reverse().join(" L")} Z`;
}

type LashOptions = {
  lengthScale?: number;
  widthScale?: number;
  fan?: number;
  tintFrom?: number;
  from?: number;
  to?: number;
};

function buildUpperLashes(seed: number, count: number, maxLength: number, opts: LashOptions = {}): Lash[] {
  const {
    lengthScale = 1,
    widthScale = 1,
    fan = 1.15,
    tintFrom = 0.55,
    from = 0.05,
    to = 0.97,
  } = opts;
  const rnd = mulberry32(seed);
  const out: Lash[] = [];

  for (let i = 0; i < count; i++) {
    const u = from + ((to - from) * (i + 0.5)) / count;
    const root = curveAt(UPPER, u);
    const tan = curveTangent(UPPER, u);
    const normal = { x: tan.y, y: -tan.x };

    // Fächer: innen steil, nach außen zunehmend geneigt
    const dir = rotate(normal, (u - 0.45) * fan + (rnd() - 0.5) * 0.16);

    // Am längsten im äußeren Drittel – der klassische Cat-Eye-Verlauf
    const bell = Math.sin(Math.PI * Math.min(Math.max(u, 0.02), 0.98));
    const len = maxLength * lengthScale * (0.34 + 0.66 * bell) * (0.7 + 0.52 * u) * (0.84 + rnd() * 0.32);

    const tip = { x: root.x + dir.x * len, y: root.y + dir.y * len };
    // Die Spitze dreht nach außen weg – der typische Curl
    const flick = rotate(dir, (0.3 + rnd() * 0.28) * (u < 0.45 ? -1 : 1));
    const c1 = { x: root.x + dir.x * len * 0.4, y: root.y + dir.y * len * 0.4 };
    const c2 = { x: tip.x - flick.x * len * 0.36, y: tip.y - flick.y * len * 0.36 };

    out.push({
      d: taperedStrand(root, c1, c2, tip, (1.9 + rnd() * 1.5) * widthScale),
      tinted: u > tintFrom && rnd() > 0.62,
      o: 0.72 + rnd() * 0.28,
    });
  }
  return out;
}

function buildLowerLashes(seed: number, count: number): Lash[] {
  const rnd = mulberry32(seed);
  const out: Lash[] = [];
  for (let i = 0; i < count; i++) {
    const u = 0.12 + (0.76 * (i + 0.5)) / count;
    const root = curveAt(LOWER, u);
    const tan = curveTangent(LOWER, u);
    // Untere Kurve läuft rückwärts – Normale zeigt daher nach unten
    const normal = { x: tan.y, y: -tan.x };
    const dir = rotate(normal, (0.45 - u) * 0.7 + (rnd() - 0.5) * 0.2);
    const len = (7 + Math.sin(Math.PI * u) * 9) * (0.75 + rnd() * 0.5);
    const tip = { x: root.x + dir.x * len, y: root.y + dir.y * len };
    const c1 = { x: root.x + dir.x * len * 0.45, y: root.y + dir.y * len * 0.45 };
    const c2 = { x: tip.x - dir.x * len * 0.2, y: tip.y - dir.y * len * 0.2 };
    out.push({
      d: taperedStrand(root, c1, c2, tip, 1.1 + rnd() * 0.7, 8),
      tinted: false,
      o: 0.4 + rnd() * 0.35,
    });
  }
  return out;
}

/** Lidkante („Eyeliner"): schmal am inneren Winkel, kräftiger nach außen. */
function buildLidMargin(): string {
  const outer: string[] = [];
  const inner: string[] = [];
  const steps = 26;
  for (let i = 0; i <= steps; i++) {
    const u = i / steps;
    const p = curveAt(UPPER, u);
    const tan = curveTangent(UPPER, u);
    const n = { x: tan.y, y: -tan.x };
    const w = 1.1 + 5.4 * Math.pow(u, 1.7) * Math.sin(Math.PI * Math.min(u + 0.12, 1));
    outer.push(`${(p.x + n.x * 0.9).toFixed(2)} ${(p.y + n.y * 0.9).toFixed(2)}`);
    inner.push(`${(p.x - n.x * w).toFixed(2)} ${(p.y - n.y * w).toFixed(2)}`);
  }
  return `M${outer.join(" L")} L${inner.reverse().join(" L")} Z`;
}

/** Wasserlinie am Unterlid. */
function buildWaterline(): string {
  const a: string[] = [];
  const b: string[] = [];
  const steps = 22;
  for (let i = 0; i <= steps; i++) {
    const u = 0.06 + (0.88 * i) / steps;
    const p = curveAt(LOWER, u);
    const tan = curveTangent(LOWER, u);
    const n = { x: tan.y, y: -tan.x };
    const w = 2.6 * Math.sin(Math.PI * Math.min(Math.max(u, 0.02), 0.98));
    a.push(`${p.x.toFixed(2)} ${p.y.toFixed(2)}`);
    b.push(`${(p.x - n.x * w).toFixed(2)} ${(p.y - n.y * w).toFixed(2)}`);
  }
  return `M${a.join(" L")} L${b.reverse().join(" L")} Z`;
}

const LID_MARGIN = buildLidMargin();
const WATERLINE = buildWaterline();

type Fiber = { d: string; w: number; o: number; light: boolean };

function buildIrisFibers(seed: number, count: number): Fiber[] {
  const rnd = mulberry32(seed);
  const out: Fiber[] = [];
  for (let i = 0; i < count; i++) {
    const a = (i / count) * Math.PI * 2 + (rnd() - 0.5) * 0.06;
    const r0 = IR * (0.3 + rnd() * 0.16);
    const r1 = IR * (0.58 + rnd() * 0.36);
    const bend = (rnd() - 0.5) * 0.18;
    const x0 = IRIS_C.x + Math.cos(a) * r0;
    const y0 = IRIS_C.y + Math.sin(a) * r0;
    const x1 = IRIS_C.x + Math.cos(a + bend) * r1;
    const y1 = IRIS_C.y + Math.sin(a + bend) * r1;
    const mx = IRIS_C.x + Math.cos(a + bend * 0.4) * ((r0 + r1) / 2);
    const my = IRIS_C.y + Math.sin(a + bend * 0.4) * ((r0 + r1) / 2);
    out.push({
      d: `M${x0.toFixed(2)} ${y0.toFixed(2)} Q${mx.toFixed(2)} ${my.toFixed(2)} ${x1.toFixed(2)} ${y1.toFixed(2)}`,
      w: 0.3 + rnd() * 0.45,
      o: 0.16 + rnd() * 0.34,
      light: rnd() > 0.74,
    });
  }
  return out;
}

type Crypt = { cx: number; cy: number; rx: number; ry: number; a: number; o: number };

/** Krypten – die unregelmäßigen dunklen Stellen im Irisgewebe. */
function buildCrypts(seed: number, count: number): Crypt[] {
  const rnd = mulberry32(seed);
  const out: Crypt[] = [];
  for (let i = 0; i < count; i++) {
    const a = (i / count) * Math.PI * 2 + rnd() * 0.4;
    const r = IR * (0.46 + rnd() * 0.26);
    out.push({
      cx: IRIS_C.x + Math.cos(a) * r,
      cy: IRIS_C.y + Math.sin(a) * r,
      rx: 2.4 + rnd() * 3.4,
      ry: 1.2 + rnd() * 1.8,
      a: (a * 180) / Math.PI,
      o: 0.2 + rnd() * 0.28,
    });
  }
  return out;
}

/* ------------------------------------------------------------------ *
 * Auge
 * ------------------------------------------------------------------ */

type EyeProps = {
  seed: number;
  mirrored?: boolean;
  px: MotionValue<number>;
  py: MotionValue<number>;
};

function Eye({ seed, mirrored = false, px, py }: EyeProps) {
  const uid = useId().replace(/:/g, "");
  const reduceMotion = useReducedMotion();
  const blink = useMotionValue(1);

  const underLashes = useMemo(
    () => buildUpperLashes(seed + 17, 34, 62, { lengthScale: 0.52, widthScale: 0.7, fan: 1.3 }),
    [seed],
  );
  const mainLashes = useMemo(() => buildUpperLashes(seed, 42, 62), [seed]);
  const strayLashes = useMemo(
    () => buildUpperLashes(seed + 991, 7, 62, { lengthScale: 1.24, widthScale: 0.8, fan: 1.5, from: 0.3 }),
    [seed],
  );
  const lowerLashes = useMemo(() => buildLowerLashes(seed + 404, 20), [seed]);
  const fibers = useMemo(() => buildIrisFibers(seed + 55, 132), [seed]);
  const crypts = useMemo(() => buildCrypts(seed + 77, 12), [seed]);

  // Das ganze Auge wird gespiegelt – der Blick beider Augen bleibt gleich,
  // indem die horizontale Bewegung beim gespiegelten Auge invertiert wird.
  const sx = mirrored ? -1 : 1;
  const irisX = useTransform(px, [-1, 1], [-22 * sx, 22 * sx]);
  const irisY = useTransform(py, [-1, 1], [-6, 6]);
  // Der Reflex sitzt auf der Hornhaut und wandert daher weniger weit als die Iris
  const glintX = useTransform(px, [-1, 1], [-14 * sx, 14 * sx]);
  const glintY = useTransform(py, [-1, 1], [-4, 4]);
  const lashX = useTransform(px, [-1, 1], [-3.5 * sx, 3.5 * sx]);
  const lashY = useTransform(py, [-1, 1], [-2.5, 2.5]);
  const lidTilt = useTransform(px, [-1, 1], [-1.6 * sx, 1.6 * sx]);

  // Natürliches Blinzeln in unregelmäßigen Abständen
  useEffect(() => {
    if (reduceMotion) return;
    let cancelled = false;
    let timer: ReturnType<typeof setTimeout>;
    let extra: ReturnType<typeof setTimeout>;

    const loop = () => {
      timer = setTimeout(
        () => {
          if (cancelled) return;
          animate(blink, [1, 0.02, 1], { duration: 0.32, times: [0, 0.4, 1] });
          if (Math.random() > 0.72) {
            extra = setTimeout(() => {
              if (!cancelled) animate(blink, [1, 0.08, 1], { duration: 0.24 });
            }, 400);
          }
          loop();
        },
        2800 + Math.random() * 4400,
      );
    };
    loop();

    return () => {
      cancelled = true;
      clearTimeout(timer);
      clearTimeout(extra);
    };
  }, [blink, reduceMotion]);

  const lashFill = (l: Lash) => (l.tinted ? `url(#lashTint-${uid})` : `url(#lashDark-${uid})`);

  return (
    <motion.svg
      viewBox={`0 0 ${VB_W} ${VB_H}`}
      className="h-auto w-[48vw] max-w-[340px] min-w-[150px] sm:w-[34vw] md:w-[25vw]"
      style={{ rotate: lidTilt }}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        {/* Haut rund um das Auge, weich auslaufend */}
        <radialGradient id={`skin-${uid}`} cx="50%" cy="52%">
          <stop offset="0%" stopColor="#5b4550" stopOpacity="0.95" />
          <stop offset="45%" stopColor="#3b2c36" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#1a1320" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`lidskin-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#241a24" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#6b5261" stopOpacity="0.35" />
        </linearGradient>

        {/* Lederhaut: nie reinweiß, zu den Winkeln hin beschattet */}
        <radialGradient id={`sclera-${uid}`} cx="46%" cy="46%">
          <stop offset="0%" stopColor="#ddd5d4" />
          <stop offset="52%" stopColor="#c3b8b8" />
          <stop offset="100%" stopColor="#7c7076" />
        </radialGradient>
        <linearGradient id={`scleraShade-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#120c14" stopOpacity="0.72" />
          <stop offset="38%" stopColor="#120c14" stopOpacity="0.16" />
          <stop offset="100%" stopColor="#120c14" stopOpacity="0.32" />
        </linearGradient>
        <radialGradient id={`corners-${uid}`} cx="50%" cy="50%">
          <stop offset="52%" stopColor="#150e18" stopOpacity="0" />
          <stop offset="100%" stopColor="#150e18" stopOpacity="0.8" />
        </radialGradient>

        {/* Iris: kühles Grau-Violett, wie es blaugraue Augen zeigen */}
        <radialGradient id={`iris-${uid}`} cx="42%" cy="34%">
          <stop offset="0%" stopColor="#8f83a8" />
          <stop offset="30%" stopColor="#6a5c88" />
          <stop offset="62%" stopColor="#443a63" />
          <stop offset="88%" stopColor="#241c3a" />
          <stop offset="100%" stopColor="#120c1e" />
        </radialGradient>
        <radialGradient id={`pupil-${uid}`} cx="50%" cy="50%">
          <stop offset="70%" stopColor="#050408" />
          <stop offset="100%" stopColor="#0d0912" />
        </radialGradient>

        {/* Wimpern: fast schwarz, ein Teil mit farbigen Spitzen */}
        <linearGradient id={`lashDark-${uid}`} x1="0" y1="1" x2="0.2" y2="0">
          <stop offset="0%" stopColor="#040308" />
          <stop offset="55%" stopColor="#0d0a13" />
          <stop offset="100%" stopColor="#2a2136" />
        </linearGradient>
        <linearGradient id={`lashTint-${uid}`} x1="0" y1="1" x2="0.2" y2="0">
          <stop offset="0%" stopColor="#040308" />
          <stop offset="66%" stopColor="#150e22" />
          <stop offset="100%" stopColor="#b491f5" />
        </linearGradient>

        <filter id={`soft-${uid}`} x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="3.5" />
        </filter>
        <filter id={`softer-${uid}`} x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="7" />
        </filter>
        <filter id={`hair-${uid}`} x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="0.35" />
        </filter>

        <clipPath id={`eye-${uid}`}>
          <path d={EYE_SHAPE} />
        </clipPath>
        <clipPath id={`iris-clip-${uid}`}>
          <circle cx={IRIS_C.x} cy={IRIS_C.y} r={IR} />
        </clipPath>
      </defs>

      <g transform={mirrored ? `translate(${VB_W} 0) scale(-1 1)` : undefined}>
        {/* Hautpartie */}
        <ellipse cx={158} cy={106} rx={152} ry={100} fill={`url(#skin-${uid})`} />
        {/* Lidfalte darüber */}
        <path
          d="M40 96 C86 34 214 26 276 88"
          fill="none"
          stroke="#150f1a"
          strokeWidth="7"
          opacity="0.5"
          filter={`url(#soft-${uid})`}
        />
        <path
          d="M44 104 C88 46 210 40 272 96"
          fill="none"
          stroke="#8d7484"
          strokeWidth="1.4"
          opacity="0.22"
        />

        <motion.g style={{ scaleY: blink, originY: 142 / VB_H, originX: 0.5 }}>
          {/* Beweglicher Lidbereich */}
          <path d={`${UPPER_PATH} C214 20 84 30 36 124 Z`} fill={`url(#lidskin-${uid})`} opacity="0.55" />

          {/* Untere Wimpern liegen hinter dem Auge */}
          <g filter={`url(#hair-${uid})`}>
            {lowerLashes.map((l, i) => (
              <path key={`low-${i}`} d={l.d} fill={`url(#lashDark-${uid})`} opacity={l.o} />
            ))}
          </g>

          <g clipPath={`url(#eye-${uid})`}>
            <path d={EYE_SHAPE} fill={`url(#sclera-${uid})`} />

            {/* Feine Äderchen */}
            <g stroke="#9c5f63" strokeWidth="0.8" fill="none" opacity="0.16">
              <path d="M52 118 C66 112 78 116 88 110" />
              <path d="M56 128 C70 126 80 130 92 126" />
              <path d="M258 100 C246 96 238 100 228 96" />
            </g>

            <motion.g style={{ x: irisX, y: irisY }}>
              <circle cx={IRIS_C.x} cy={IRIS_C.y} r={IR} fill={`url(#iris-${uid})`} />
              <g clipPath={`url(#iris-clip-${uid})`}>
                <g fill="none" strokeLinecap="round">
                  {fibers.map((f, i) => (
                    <path
                      key={`fib-${i}`}
                      d={f.d}
                      stroke={f.light ? "#a89cc4" : "#150e26"}
                      strokeWidth={f.w}
                      opacity={f.light ? f.o * 0.62 : f.o}
                    />
                  ))}
                </g>
                {crypts.map((c, i) => (
                  <ellipse
                    key={`cr-${i}`}
                    cx={c.cx}
                    cy={c.cy}
                    rx={c.rx}
                    ry={c.ry}
                    transform={`rotate(${c.a.toFixed(1)} ${c.cx.toFixed(1)} ${c.cy.toFixed(1)})`}
                    fill="#0f0a1c"
                    opacity={c.o}
                    filter={`url(#soft-${uid})`}
                  />
                ))}
                {/* Collarette – der hellere Ring um die Pupille */}
                <circle
                  cx={IRIS_C.x}
                  cy={IRIS_C.y}
                  r={IR * 0.42}
                  fill="none"
                  stroke="#a294c4"
                  strokeWidth="3"
                  opacity="0.22"
                  filter={`url(#soft-${uid})`}
                />
                {/* Lichtstimmung von oben, Schatten am unteren Irisrand */}
                {/* Licht von oben: Schatten am oberen Rand, Durchleuchtung unten */}
                <ellipse cx={IRIS_C.x} cy={IRIS_C.y - IR * 0.68} rx={IR * 1.05} ry={IR * 0.62} fill="#08050f" opacity="0.5" filter={`url(#softer-${uid})`} />
                <ellipse cx={IRIS_C.x} cy={IRIS_C.y + IR * 0.55} rx={IR * 0.78} ry={IR * 0.42} fill="#b5a6d8" opacity="0.2" filter={`url(#softer-${uid})`} />
              </g>

              {/* Limbalring */}
              <circle cx={IRIS_C.x} cy={IRIS_C.y} r={IR - 1.5} fill="none" stroke="#0a0612" strokeWidth="5" opacity="0.75" />
              <circle cx={IRIS_C.x} cy={IRIS_C.y} r={IR} fill="none" stroke="#0a0612" strokeWidth="2" opacity="0.55" filter={`url(#soft-${uid})`} />

              <circle cx={IRIS_C.x} cy={IRIS_C.y} r={PUPIL_R} fill={`url(#pupil-${uid})`} />
              <circle cx={IRIS_C.x} cy={IRIS_C.y} r={PUPIL_R + 1.5} fill="none" stroke="#0a0612" strokeWidth="2" opacity="0.5" filter={`url(#soft-${uid})`} />
            </motion.g>

            {/* Reflex des Ringlichts – sitzt auf der Hornhaut, nicht auf der Iris */}
            <motion.g style={{ x: glintX, y: glintY }}>
              <circle
                cx={IRIS_C.x - 12}
                cy={IRIS_C.y - 13}
                r="7.5"
                fill="none"
                stroke="#ffffff"
                strokeWidth="2.4"
                strokeDasharray="24 10"
                strokeLinecap="round"
                opacity="0.88"
                transform={`rotate(-40 ${IRIS_C.x - 12} ${IRIS_C.y - 13})`}
              />
              <circle cx={IRIS_C.x - 12} cy={IRIS_C.y - 13} r="7.5" fill="#ffffff" opacity="0.06" />
              <circle cx={IRIS_C.x + 17} cy={IRIS_C.y + 12} r="2.2" fill="#ffffff" opacity="0.22" filter={`url(#soft-${uid})`} />
            </motion.g>

            {/* Schatten des Oberlids auf dem Augapfel */}
            <path d={EYE_SHAPE} fill={`url(#scleraShade-${uid})`} />
            <ellipse cx={150} cy={104} rx={112} ry={40} fill={`url(#corners-${uid})`} />
            <path d={UPPER_PATH} fill="none" stroke="#0d0812" strokeWidth="13" opacity="0.5" filter={`url(#soft-${uid})`} />

            {/* Feuchter Glanz auf der Unterlidkante */}
            <path d={LOWER_PATH} fill="none" stroke="#ffffff" strokeWidth="2.2" opacity="0.3" filter={`url(#soft-${uid})`} />
          </g>

          {/* Wasserlinie und Unterlidkante */}
          <path d={WATERLINE} fill="#e9d3cd" opacity="0.4" />
          <path d={LOWER_PATH} fill="none" stroke="#241a22" strokeWidth="1.5" opacity="0.75" />
          {/* Weiche Schattenkante unter dem Unterlid */}
          <path
            d="M40 130 C94 170 212 168 266 112"
            fill="none"
            stroke="#241820"
            strokeWidth="6"
            opacity="0.35"
            filter={`url(#soft-${uid})`}
          />

          {/* Tränenkanal im inneren Winkel */}
          <path d="M38 124 C44 118 50 120 51 124 C50 130 43 130 38 124 Z" fill="#7c4a4c" opacity="0.42" />
          <circle cx={45} cy={123} r="1.6" fill="#c68d89" opacity="0.28" filter={`url(#soft-${uid})`} />

          {/* Lidkante */}
          <path d={LID_MARGIN} fill="#0a0710" opacity="0.95" />

          {/* Wimpernkranz: untere Lage, Hauptlage, einzelne längere Härchen */}
          <motion.g style={{ x: lashX, y: lashY }} filter={`url(#hair-${uid})`}>
            {underLashes.map((l, i) => (
              <path key={`u-${i}`} d={l.d} fill={lashFill(l)} opacity={l.o * 0.85} />
            ))}
            {mainLashes.map((l, i) => (
              <motion.path
                key={`m-${i}`}
                d={l.d}
                fill={lashFill(l)}
                initial={reduceMotion ? false : { opacity: 0 }}
                animate={{ opacity: l.o }}
                transition={{ duration: 0.6, delay: 0.3 + i * 0.014, ease: [0.22, 1, 0.36, 1] }}
              />
            ))}
            {strayLashes.map((l, i) => (
              <path key={`s-${i}`} d={l.d} fill={lashFill(l)} opacity={l.o * 0.9} />
            ))}
          </motion.g>
        </motion.g>

        {/* Angedeutete Braue weit oben – nur als weiche Schattierung */}
        <g opacity="0.5" filter={`url(#softer-${uid})`}>
          <path d="M52 46 C110 12 214 14 268 44 C210 30 108 30 52 46 Z" fill="#241a22" />
        </g>
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
      className="pointer-events-none flex items-center justify-center gap-[2vw] select-none sm:gap-6 md:gap-8"
    >
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.94 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
      >
        <Eye seed={11} mirrored px={px} py={py} />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.94 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1.3, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
      >
        <Eye seed={11} px={px} py={py} />
      </motion.div>
    </div>
  );
}
