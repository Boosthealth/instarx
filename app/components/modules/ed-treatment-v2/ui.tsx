import Image, { getImageProps } from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type {
  CSSProperties,
  ReactEventHandler,
  ReactNode,
  Ref,
} from "react";
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

/* Struck-through anchor price with a coherent sentence for screen readers. */
export function WasPrice({ value }: { value: string }) {
  return (
    <s>
      <span className="sr-only">regularly </span>
      {value}
    </s>
  );
}

const STAR_PATH =
  "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z";

function StarBox({ fill }: { fill: number }) {
  const pct = Math.round(Math.max(0, Math.min(1, fill)) * 100);
  return (
    <span
      className="edv2-rating__box"
      style={{ "--fill": `${pct}%` } as CSSProperties}
    >
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d={STAR_PATH} />
      </svg>
    </span>
  );
}

/* Trustpilot-style rating badge: five boxed stars with a fractional fill on
 * the last, "Excellent 4.7 out of 5", and whose rating it is. The Trustpilot
 * mark and outbound link appear only once TODO_CONFIRM.TRUSTPILOT_URL is set;
 * until then the badge is labelled InstaRx (brief Part 4). Default is the
 * stacked, centred form; `compact` is the single-row hero form. */
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
  const url = TODO_CONFIRM.TRUSTPILOT_URL;
  const label = url ? rating.labelTrustpilot : rating.labelInstaRx;
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
        {url ? (
          <>
            <svg
              className="edv2-rating__mark"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d={STAR_PATH} />
            </svg>
            {rating.trustpilotWordmark}
          </>
        ) : (
          rating.source
        )}
      </span>
      <span className="edv2-rating__boxes">
        {[0, 1, 2, 3, 4].map((i) => (
          <StarBox key={i} fill={score - i} />
        ))}
      </span>
      <span className="edv2-rating__score">
        <strong>
          {rating.grade} {rating.score}
        </strong>{" "}
        {rating.outOfLabel} {rating.outOf}
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
