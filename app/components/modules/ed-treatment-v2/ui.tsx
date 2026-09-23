import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { CSSProperties, ReactNode } from "react";
import type { MediaSlot as MediaSlotSpec } from "./content";

type ButtonVariant = "primary" | "dark" | "ghost-light";
type ButtonSize = "sm" | "md" | "lg";

/* Every CTA on the page goes through this: one family, one destination.
 * prefetch={false} because the intake lives on another origin. */
export function Button({
  href,
  children,
  variant = "primary",
  size = "md",
  block = false,
  arrow = false,
  className = "",
  tabIndex,
  ariaLabel,
}: {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  block?: boolean;
  arrow?: boolean;
  className?: string;
  tabIndex?: number;
  ariaLabel?: string;
}) {
  const classes = [
    "edv2-btn",
    `edv2-btn--${variant}`,
    size !== "md" ? `edv2-btn--${size}` : "",
    block ? "edv2-btn--block" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");
  return (
    <Link
      href={href}
      prefetch={false}
      className={classes}
      tabIndex={tabIndex}
      aria-label={ariaLabel}
    >
      <span>{children}</span>
      {arrow && <ArrowRight className="edv2-btn__icon" aria-hidden="true" />}
    </Link>
  );
}

/* Five filled stars for the sitewide rating. One svg path, repeated. */
export function Stars({
  count = 5,
  label,
  className = "",
}: {
  count?: number;
  label: string;
  className?: string;
}) {
  return (
    <span
      className={`edv2-stars ${className}`.trim()}
      role="img"
      aria-label={label}
    >
      {Array.from({ length: count }, (_, i) => (
        <svg key={i} viewBox="0 0 20 20" aria-hidden="true">
          <path d="M10 1.6l2.6 5.4 5.9.8-4.3 4.1 1.1 5.9L10 15l-5.3 2.8 1.1-5.9L1.5 7.8l5.9-.8L10 1.6z" />
        </svg>
      ))}
    </span>
  );
}

/* Labelled media slot. Renders the gradient placeholder plus the label so the
 * asset brief is visible on the page while real media is pending. Pass
 * `children` to layer real media (video, next/image) on top of the gradient.
 * The gradient and its label are decorative: an empty slot is hidden from
 * assistive tech, and a filled slot lets the child (Image alt, aria-hidden
 * video) carry the semantics. */
export function MediaSlot({
  slot,
  className = "",
  children,
  hideLabel = false,
}: {
  slot: MediaSlotSpec;
  className?: string;
  children?: ReactNode;
  hideLabel?: boolean;
}) {
  const style = {
    "--slot-aspect": slot.aspect,
    ...(slot.aspectMobile ? { "--slot-aspect-mobile": slot.aspectMobile } : {}),
  } as CSSProperties;
  return (
    <div
      className={`edv2-slot edv2-slot--${slot.tone} ${className}`.trim()}
      style={style}
      aria-hidden={children ? undefined : "true"}
    >
      <div className="edv2-slot__grain" aria-hidden="true" />
      {children}
      {!hideLabel && (
        <span className="edv2-slot__label" aria-hidden="true">
          {slot.label}
        </span>
      )}
    </div>
  );
}

/* Struck-through anchor price with a coherent sentence for screen readers. */
export function WasPrice({ value }: { value: string }) {
  return (
    <s>
      <span className="sr-only">regularly </span>
      {value}
    </s>
  );
}
