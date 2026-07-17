import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";

/* Small shared primitives for the /partner lander — same editorial palette and
 * button system as /glp2-v2. Styling comes from partner.css (`.v2-btn*`).
 *
 * Unlike the product landers (whose CTAs point at internal intake routes), the
 * partner CTAs point at an external Google Form, so the button renders a plain
 * <a> and opens external links in a new tab. In-page anchors ("#programs")
 * stay in the same tab. */

type BtnVariant = "primary" | "ghost" | "light" | "onink" | "glass";

export function PartnerButton({
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
  const external = /^https?:\/\//.test(href);
  return (
    <a
      href={href}
      tabIndex={tabIndex}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={`v2-btn v2-btn--${variant} ${className}`.trim()}
    >
      <span className="v2-btn__text">{children}</span>
      {arrow && (
        // YMI-style diagonal arrow swap: two ↗ arrows stacked in a clipped box;
        // on hover the visible one exits top-right and the duplicate slides in
        // from bottom-left, with a springy ease. CSS in partner.css.
        <span className="v2-btn__arrowswap" aria-hidden="true">
          <ArrowUpRight className="v2-btn__ar v2-btn__ar--a" size={18} strokeWidth={2} />
          <ArrowUpRight className="v2-btn__ar v2-btn__ar--b" size={18} strokeWidth={2} />
        </span>
      )}
    </a>
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
