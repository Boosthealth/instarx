import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";

/* Small shared primitives for the /glp2-v2 lander. The page uses a cream/beige
 * editorial palette, so we don't reuse the shared `home/Button` (it hardcodes a
 * blue hover). Styling comes from glp2-v2.css (`.v2-btn*`). */

type BtnVariant = "primary" | "ghost" | "light" | "onink" | "glass";

export function V2Button({
  href,
  children,
  variant = "primary",
  className = "",
  arrow = false,
  tabIndex,
}: {
  href: string;
  children: ReactNode;
  variant?: BtnVariant;
  className?: string;
  /* Append a diagonal arrow that swaps on hover (YMI-style). */
  arrow?: boolean;
  /* Override focusability — used to pull the floating CTA out of the tab order
     while it's hidden. */
  tabIndex?: number;
}) {
  // prefetch={false}: matches the shared Button — every CTA points at /intake,
  // and viewport prefetch would pre-bucket visitors in the experiment proxy.
  return (
    <Link
      href={href}
      prefetch={false}
      tabIndex={tabIndex}
      className={`v2-btn v2-btn--${variant} ${className}`.trim()}
    >
      <span className="v2-btn__text">{children}</span>
      {arrow && (
        // YMI-style diagonal arrow swap: two ↗ arrows stacked in a clipped box;
        // on hover the visible one exits top-right and the duplicate slides in
        // from bottom-left, with a springy ease. CSS in glp2-v2.css.
        <span className="v2-btn__arrowswap" aria-hidden="true">
          <ArrowUpRight className="v2-btn__ar v2-btn__ar--a" size={18} strokeWidth={2} />
          <ArrowUpRight className="v2-btn__ar v2-btn__ar--b" size={18} strokeWidth={2} />
        </span>
      )}
    </Link>
  );
}

export function Stars({
  count = 5,
  size = 16,
  className = "",
}: {
  count?: number;
  size?: number;
  className?: string;
}) {
  return (
    <span
      className={`v2-stars ${className}`.trim()}
      role="img"
      aria-label={`${count} out of 5 stars`}
    >
      {Array.from({ length: count }).map((_, i) => (
        <svg
          key={i}
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </span>
  );
}

export function Eyebrow({
  children,
  className = "",
  rule = true,
}: {
  children: ReactNode;
  className?: string;
  rule?: boolean;
}) {
  return (
    <p
      className={`v2-eyebrow ${rule ? "v2-kicker-rule" : ""} ${className}`.trim()}
    >
      {children}
    </p>
  );
}
