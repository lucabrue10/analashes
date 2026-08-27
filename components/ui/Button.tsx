"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

type Variant = "primary" | "ghost";

// Framer Motion belegt einige DOM-Handler selbst – daher hier ausgeklammert.
type AnchorProps = Omit<
  ComponentPropsWithoutRef<"a">,
  | "onAnimationStart"
  | "onAnimationEnd"
  | "onAnimationIteration"
  | "onDrag"
  | "onDragStart"
  | "onDragEnd"
  | "onDragEnter"
  | "onDragExit"
  | "onDragLeave"
  | "onDragOver"
  | "onDrop"
  | "style"
  | "ref"
>;

type Props = AnchorProps & {
  href: string;
  variant?: Variant;
  children: ReactNode;
};

const base =
  "group relative inline-flex items-center justify-center gap-2.5 overflow-hidden rounded-full px-7 py-3.5 text-sm font-medium tracking-[0.14em] uppercase transition-colors duration-500";

export function Button({ href, variant = "primary", children, className = "", ...rest }: Props) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.a
      href={href}
      className={`${base} ${
        variant === "primary"
          ? "text-white shadow-[0_18px_50px_-20px_rgba(144,97,232,0.9)]"
          : "glass text-white/85 hover:text-white"
      } ${className}`}
      whileHover={reduceMotion ? undefined : { y: -3 }}
      whileTap={reduceMotion ? undefined : { y: -1, scale: 0.985 }}
      transition={{ type: "spring", stiffness: 320, damping: 24 }}
      {...rest}
    >
      {variant === "primary" ? (
        <>
          <span
            aria-hidden
            className="absolute inset-0 bg-gradient-to-r from-lilac-600 via-lilac-500 to-lilac-400"
          />
          <span
            aria-hidden
            className="absolute inset-0 translate-y-full bg-gradient-to-r from-lilac-400 via-lilac-300 to-lilac-500 transition-transform duration-600 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0"
          />
          <span
            aria-hidden
            className="shimmer absolute inset-0 bg-[linear-gradient(110deg,transparent_35%,rgba(255,255,255,0.35)_50%,transparent_65%)]"
          />
        </>
      ) : (
        <span
          aria-hidden
          className="absolute inset-0 bg-white/0 transition-colors duration-500 group-hover:bg-white/[0.06]"
        />
      )}
      <span className="relative z-10 flex items-center gap-2.5">{children}</span>
    </motion.a>
  );
}
