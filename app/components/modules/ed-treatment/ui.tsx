import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";
import type { ReactNode } from "react";
import { safetyStrip } from "./content";

/* Small shared primitives for the /ed-treatment lander. Styling lives in
 * ed-treatment.css (`.ed-btn*`, `.ed-safety`). */

type BtnVariant = "ink" | "light" | "outline";

export function EdButton({
  href,
  children,
  variant = "ink",
  className = "",
  arrow = true,
  tabIndex,
}: {
  href: string;
  children: ReactNode;
  variant?: BtnVariant;
  className?: string;
  arrow?: boolean;
  /* Pulls the floating CTA out of the tab order while it's hidden. */
  tabIndex?: number;
}) {
  // prefetch={false}: every CTA points at the external intake, so viewport
  // prefetch buys nothing.
  return (
    <Link
      href={href}
      prefetch={false}
      tabIndex={tabIndex}
      className={`ed-btn ed-btn--${variant} ${className}`.trim()}
    >
      {children}
      {arrow && (
        <ArrowRight
          className="ed-btn__arrow"
          size={18}
          strokeWidth={2.25}
          aria-hidden="true"
        />
      )}
    </Link>
  );
}

export function Stars({ size = 15 }: { size?: number }) {
  return (
    <span className="ed-rating__stars" aria-hidden="true">
      {Array.from({ length: 5 }, (_, i) => (
        <Star key={i} size={size} fill="currentColor" strokeWidth={0} />
      ))}
    </span>
  );
}

/* Part 4: sits under every offer card group. */
export function SafetyStrip({ className = "" }: { className?: string }) {
  return (
    <p className={`ed-safety ${className}`.trim()}>
      <strong>{safetyStrip.label}</strong> {safetyStrip.body}{" "}
      <a href={safetyStrip.href}>{safetyStrip.link}</a>
    </p>
  );
}

/* Labelled aspect-ratio slot for media that doesn't exist yet. */
export function MediaSlot({
  label,
  ratio,
  ink = false,
  className = "",
}: {
  label: string;
  ratio: string;
  ink?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`ed-media ${ink ? "ed-media--ink" : ""} ${className}`.trim()}
      style={{ aspectRatio: ratio }}
      role="img"
      aria-label={`Placeholder: ${label}`}
    >
      {label}
    </div>
  );
}
