import type { ReactNode } from "react";
import { INTAKE_HREF } from "./content";

export function ArrowIcon() {
  return (
    <svg
      className="edv3-arrow"
      viewBox="0 0 16 16"
      width="16"
      height="16"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M3 8h9.5M8.5 3.5 13 8l-4.5 4.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function CheckIcon() {
  return (
    <svg
      className="edv3-check"
      viewBox="0 0 16 16"
      width="16"
      height="16"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="m3.5 8.5 3 3 6-7"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Primary CTA: every button on the page goes to the one intake URL. */
export function Cta({
  children,
  variant = "solid",
}: {
  children: ReactNode;
  variant?: "solid" | "ghost";
}) {
  return (
    <a
      href={INTAKE_HREF}
      className={variant === "ghost" ? "edv3-btn edv3-btn--ghost" : "edv3-btn"}
    >
      {children}
      <ArrowIcon />
    </a>
  );
}

/** Scroll-linked reveal. Content is fully visible by default; the entrance
 *  is a CSS scroll-driven animation that only applies where supported and
 *  motion is allowed, so nothing can get stuck hidden. */
export function Reveal({
  children,
  className = "",
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "li" | "p" | "figure";
}) {
  return <Tag className={`edv3-reveal ${className}`.trim()}>{children}</Tag>;
}
