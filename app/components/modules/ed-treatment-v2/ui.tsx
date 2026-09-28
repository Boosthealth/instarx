import Image, { getImageProps } from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { CSSProperties, ReactEventHandler, ReactNode, Ref } from "react";
import {
  rating,
  TODO_CONFIRM,
  type MediaSlot as MediaSlotSpec,
} from "./content";
import { ParallaxLayer } from "./Parallax";

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

/* Decorative still that fills its positioned parent. With `srcMobile` it
 * becomes a <picture>: the desktop file behind a min-width source, the mobile
 * file as the <img>, both through the image optimizer via getImageProps, so
 * each viewport downloads exactly one. Without it, plain next/image `fill`. */
export function SlotImage({
  src,
  srcMobile,
  sizes,
  className,
  priority = false,
  ref,
  onLoad,
  onError,
}: {
  src: string;
  srcMobile?: string;
  sizes: string;
  className: string;
  priority?: boolean;
  ref?: Ref<HTMLImageElement>;
  onLoad?: ReactEventHandler<HTMLImageElement>;
  onError?: ReactEventHandler<HTMLImageElement>;
}) {
  if (!srcMobile) {
    return (
      <Image
        ref={ref}
        src={src}
        alt=""
        fill
        sizes={sizes}
        priority={priority}
        fetchPriority={priority ? "high" : undefined}
        className={className}
        onLoad={onLoad}
        onError={onError}
      />
    );
  }
  const common = { alt: "", fill: true, sizes } as const;
  const { props: wide } = getImageProps({ ...common, src });
  const { props: tall } = getImageProps({ ...common, src: srcMobile });
  return (
    <picture>
      <source
        media="(min-width: 48rem)"
        srcSet={wide.srcSet}
        sizes={wide.sizes}
      />
      {/* Plain <img> inside <picture> on purpose: both files already go through getImageProps. */}
      <img
        {...tall}
        ref={ref}
        alt=""
        className={className}
        loading={priority ? "eager" : tall.loading}
        fetchPriority={priority ? "high" : undefined}
        onLoad={onLoad}
        onError={onError}
      />
    </picture>
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
  const filled = Boolean(children) || Boolean(slot.src);
  return (
    <div
      className={`edv2-slot edv2-slot--${slot.tone} ${className}`.trim()}
      style={style}
      aria-hidden={filled ? undefined : "true"}
    >
      <div className="edv2-slot__grain" aria-hidden="true" />
      {slot.src && (
        <ParallaxLayer>
          <SlotImage
            src={slot.src}
            srcMobile={slot.srcMobile}
            sizes="(min-width: 48rem) 45vw, 100vw"
            className="edv2-slot__img"
          />
        </ParallaxLayer>
      )}
      {children}
      {!hideLabel && !slot.src && (
        <span className="edv2-slot__label" aria-hidden="true">
          {slot.label}
        </span>
      )}
    </div>
  );
}

/* Ambient light for a dark band: the band's own still, scaled up, blurred
 * to colour fields and laid at low opacity under a grain, so the section
 * glows with the palette of its imagery instead of sitting on flat zinc.
 * A small file is plenty once it is blurred 40px. */
export function Ambient({ src }: { src: string }) {
  return (
    <div className="edv2-ambient" aria-hidden="true">
      <Image
        src={src}
        alt=""
        fill
        sizes="40vw"
        loading="lazy"
        className="edv2-ambient__img"
      />
      <div className="edv2-ambient__grain" />
    </div>
  );
}

/* 24-box five-point star shared by the rating badge and Stars. */
const STAR_PATH =
  "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z";

/* One star: grey base with a gold copy clipped to `fill` (0..1) on top, so
 * the fifth star shows 4.7 as seven tenths gold. */
function Star({ fill }: { fill: number }) {
  const pct = Math.round(Math.max(0, Math.min(1, fill)) * 100);
  return (
    <span
      className="edv2-rating__star"
      style={{ "--fill": `${pct}%` } as CSSProperties}
    >
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d={STAR_PATH} />
      </svg>
      <svg
        className="edv2-rating__star-fill"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d={STAR_PATH} />
      </svg>
    </span>
  );
}

/* Google's four-colour G, drawn inline so it needs no request. */
function GoogleMark() {
  return (
    <svg className="edv2-rating__mark" viewBox="0 0 48 48" aria-hidden="true">
      <path
        fill="#ea4335"
        d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
      />
      <path
        fill="#4285f4"
        d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
      />
      <path
        fill="#fbbc05"
        d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
      />
      <path
        fill="#34a853"
        d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
      />
    </svg>
  );
}

/* Google Reviews badge: the G and "Google Reviews", five gold stars with a
 * fractional fill on the last, "4.7 out of 5", and the count line. It links
 * to the Business Profile once TODO_CONFIRM.GOOGLE_REVIEWS_URL is set and is
 * a single role="img" until then. Default is the stacked, centred form;
 * `compact` is the single-row hero form. */
export function TrustBadge({
  compact = false,
  onDark = false,
  className = "",
}: {
  compact?: boolean;
  onDark?: boolean;
  className?: string;
}) {
  const score = Number(rating.score);
  const url = TODO_CONFIRM.GOOGLE_REVIEWS_URL;
  const label = rating.label;
  const cls = [
    "edv2-rating",
    compact && "edv2-rating--compact",
    onDark && "edv2-rating--on-dark",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const inner = (
    <>
      <span className="edv2-rating__source">
        <GoogleMark />
        {rating.source}
      </span>
      <span className="edv2-rating__stars">
        {[0, 1, 2, 3, 4].map((i) => (
          <Star key={i} fill={score - i} />
        ))}
      </span>
      <span className="edv2-rating__score">
        <strong>{rating.score}</strong> {rating.outOfLabel} {rating.outOf}
      </span>
      {!compact && <span className="edv2-rating__count">{rating.count}</span>}
    </>
  );

  return url ? (
    <a
      className={cls}
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
    >
      {inner}
    </a>
  ) : (
    <span className={cls} role="img" aria-label={label}>
      {inner}
    </span>
  );
}
