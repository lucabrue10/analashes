import type { ComponentPropsWithoutRef, ReactNode } from "react";

type Variant = "primary" | "ghost" | "hell";

const stile: Record<Variant, string> = {
  // Schwarz auf Creme – der einzige harte Kontrast auf der Seite
  primary: "bg-ink-900 text-creme-100 hover:bg-ink-700",
  ghost:
    "border border-ink-900/20 text-ink-900 hover:border-ink-900/50 hover:bg-white",
  hell: "bg-white text-ink-900 border border-beige-200 hover:bg-creme-50",
};

type Props = ComponentPropsWithoutRef<"a"> & {
  href: string;
  variant?: Variant;
  children: ReactNode;
};

export function Button({
  href,
  variant = "primary",
  children,
  className = "",
  ...rest
}: Props) {
  return (
    <a
      href={href}
      className={`inline-flex items-center justify-center gap-3 rounded-full px-8 py-4 text-[11px] font-medium tracking-[0.22em] uppercase transition-colors duration-300 ${stile[variant]} ${className}`}
      {...rest}
    >
      {children}
    </a>
  );
}
