import { reviews, type Review } from "./content";
import { Stars, TrustBadge } from "./ui";
import { Reveal } from "./Reveal";

/* Testimonials: a CSS marquee of review cards (avatar initials, name, stars,
 * headline, quote) under the sitewide rating badge. Structure mirrors the
 * quad.medvi.org wall; motion is the 21st.dev infinite-moving-cards idea done
 * in CSS so it runs off the main thread next to the hero video.
 *
 * Empty-safe and honest: with no ED reviews yet, the six MEDVi sample reviews
 * from content.ts render under a "layout preview" lead, each labelled
 * "MEDVi customer (sample)" under the name and listed as sample reviews for
 * assistive tech, and only outside production builds (VERCEL_ENV is inlined
 * at build time).
 * Production shows the badge, heading and an empty-state line until
 * `reviews.items` is non-empty, which replaces the samples everywhere. */
const SHOW_SAMPLES = process.env.VERCEL_ENV !== "production";
const initials = (name: string) =>
  name
    .split(/\s+/)
    .map((part) => part.replace(/[^A-Za-z]/g, "")[0] ?? "")
    .join("")
    .slice(0, 2)
    .toUpperCase();

function ReviewCard({ review }: { review: Review }) {
  return (
    <li className="edv2-review">
      <div className="edv2-review__who">
        <span className="edv2-review__avatar" aria-hidden="true">
          {initials(review.name)}
        </span>
        <span className="edv2-review__id">
          <strong>{review.name}</strong>
          <span>{review.label}</span>
        </span>
        <Stars
          count={review.rating}
          label={reviews.starsLabel(review.rating)}
          className="edv2-review__stars"
        />
      </div>
      <p className="edv2-review__title">{review.title}</p>
      <blockquote className="edv2-review__quote">
        <p>{review.quote}</p>
      </blockquote>
    </li>
  );
}

export function Reviews() {
  const live = reviews.items.length > 0;
  const sample = !live && SHOW_SAMPLES;
  const items: readonly Review[] = live
    ? reviews.items
    : sample
      ? reviews.sample.items
      : [];
  const sub = live
    ? reviews.sub
    : sample
      ? reviews.sample.sub
      : reviews.emptySub;
  /* ~26px/s (the 21st.dev "slow" speed) at a 22rem card + 1rem gap. */
  const duration = `${items.length * 14}s`;

  const cards = items.map((review, i) => (
    <ReviewCard key={`${review.name}-${i}`} review={review} />
  ));

  return (
    <section
      className="edv2-section edv2-section--soft edv2-reviews"
      id="reviews"
      tabIndex={-1}
      aria-labelledby="edv2-reviews-title"
    >
      <div className="edv2-container">
        <Reveal className="edv2-head edv2-head--center">
          <TrustBadge />
          <h2 id="edv2-reviews-title" className="edv2-h2">
            {reviews.heading}
          </h2>
          <p className="edv2-lead">{sub}</p>
        </Reveal>
      </div>

      {items.length > 0 && (
        <Reveal className="edv2-marquee">
          <div
            className="edv2-marquee__track"
            style={{ "--marquee-dur": duration } as React.CSSProperties}
          >
            {/* Focusable so keyboard users can pause the marquee (focus-within)
                and scroll the reduced-motion container with arrow keys. */}
            <ul
              className="edv2-marquee__set"
              aria-label={sample ? reviews.sample.listLabel : reviews.listLabel}
              tabIndex={0}
            >
              {cards}
            </ul>
            {/* Second copy makes the loop seamless; hidden from assistive tech
                and removed entirely under reduced motion. */}
            <ul className="edv2-marquee__set" aria-hidden="true">
              {cards}
            </ul>
          </div>
        </Reveal>
      )}
    </section>
  );
}
