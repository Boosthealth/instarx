import Image from "next/image";
import type { CSSProperties } from "react";
import { reviews, type Review } from "./content";
import { Stars, TrustBadge } from "./ui";
import { Reveal } from "./Reveal";

/* Testimonials: a photo-and-quote wall under the sitewide rating badge.
 * Each review is one column of two tiles, a 3:4 customer photo with the name
 * and label over its foot and a quote tile with stars, headline and quote.
 * Every other column is flipped so the photos step diagonally across the
 * wall. No motion beyond the shared stagger on entry.
 *
 * Empty-safe and honest: with no ED reviews yet, the first four MEDVi sample
 * reviews from content.ts render under a "layout preview" lead, each photo
 * captioned "MEDVi customer (sample)" and the list named as sample reviews
 * for assistive tech, and only outside production builds (VERCEL_ENV is
 * inlined at build time). The sample photos are generated stand-ins, not
 * customers. Production shows the badge, heading and an empty-state line
 * until `reviews.items` is non-empty, which replaces the samples everywhere.
 * A live review without a photo renders as a quote tile with the name and
 * label at its foot. */
const SHOW_SAMPLES = process.env.VERCEL_ENV !== "production";
/** Sample tiles on the wall: one desktop row, two rows of two on phones. */
const SAMPLE_COUNT = 4;

function Tile({ review, index }: { review: Review; index: number }) {
  const who = (
    <>
      <strong>{review.name}</strong>
      <span>{review.label}</span>
    </>
  );
  const flip = index % 2 === 1 ? " edv2-mosaic__item--flip" : "";
  return (
    <li
      className={`edv2-mosaic__item edv2-stagger__item${flip}`}
      style={{ "--i": index } as CSSProperties}
    >
      {review.photo && (
        <figure className="edv2-mosaic__photo">
          {/* Decorative: the caption carries the name and label as text. */}
          <Image
            src={review.photo}
            alt=""
            fill
            sizes="(min-width: 64rem) 20rem, 50vw"
            className="edv2-mosaic__img"
          />
          <figcaption className="edv2-mosaic__who">{who}</figcaption>
        </figure>
      )}
      {/* Only the customer's words go inside the blockquote; the rating and
          the byline are ours, so they sit beside it in the tile. */}
      <div className="edv2-mosaic__quote">
        <Stars
          count={review.rating}
          label={reviews.starsLabel(review.rating)}
          className="edv2-mosaic__stars"
        />
        <blockquote className="edv2-mosaic__bq">
          <p className="edv2-mosaic__title">{review.title}</p>
          <p className="edv2-mosaic__text">{review.quote}</p>
        </blockquote>
        {!review.photo && <footer className="edv2-mosaic__by">{who}</footer>}
      </div>
    </li>
  );
}

export function Reviews() {
  const live = reviews.items.length > 0;
  const sample = !live && SHOW_SAMPLES;
  const items: readonly Review[] = live
    ? reviews.items
    : sample
      ? reviews.sample.items.slice(0, SAMPLE_COUNT)
      : [];
  const sub = live
    ? reviews.sub
    : sample
      ? reviews.sample.sub
      : reviews.emptySub;

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

        {items.length > 0 && (
          <Reveal className="edv2-stagger edv2-mosaic-wrap">
            {/* role="list" keeps the list announced in Safari, which drops
                list semantics on list-style: none. */}
            <ul
              className="edv2-mosaic"
              role="list"
              aria-label={sample ? reviews.sample.listLabel : reviews.listLabel}
            >
              {items.map((review, i) => (
                <Tile key={`${review.name}-${i}`} review={review} index={i} />
              ))}
            </ul>
          </Reveal>
        )}
      </div>
    </section>
  );
}
