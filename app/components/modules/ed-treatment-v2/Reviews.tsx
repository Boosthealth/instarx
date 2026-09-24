import Image from "next/image";
import type { CSSProperties } from "react";
import { reviews, type Review } from "./content";
import { Stars, TrustBadge } from "./ui";
import { Reveal } from "./Reveal";

/* Testimonials: a still-and-quote wall under the sitewide rating badge.
 * Each review is a pair of tiles side by side, a 3:4 still and a quote tile
 * (headline, quote, name and label, and stars only when the customer gave a
 * rating). Every other pair is mirrored, so a desktop row reads still,
 * quote, quote, still and the stills step diagonally on phones. No motion
 * beyond the shared stagger on entry.
 *
 * Honest by construction: `reviews.items` holds real InstaRx customer
 * reviews only, and the stills are illustrative (made for the page, not the
 * reviewers), which the note under the wall says in so many words. */

function Pair({ review, index }: { review: Review; index: number }) {
  const flip = index % 2 === 1 ? " edv2-mosaic__item--flip" : "";
  return (
    <li
      className={`edv2-mosaic__item edv2-stagger__item${flip}`}
      style={{ "--i": index } as CSSProperties}
    >
      {review.photo && (
        <div className="edv2-mosaic__photo">
          {/* Illustrative, so no alt text; the note under the wall covers it. */}
          <Image
            src={review.photo}
            alt=""
            fill
            sizes="(min-width: 64rem) 20rem, 50vw"
            className="edv2-mosaic__img"
          />
        </div>
      )}
      {/* Only the customer's words go inside the blockquote; the rating and
          the byline are ours, so they sit beside it in the tile. */}
      <div className="edv2-mosaic__quote">
        {review.rating !== undefined && (
          <Stars
            count={review.rating}
            label={reviews.starsLabel(review.rating)}
            className="edv2-mosaic__stars"
          />
        )}
        <blockquote className="edv2-mosaic__bq">
          <p className="edv2-mosaic__title">{review.title}</p>
          <p className="edv2-mosaic__text">{review.quote}</p>
        </blockquote>
        <footer className="edv2-mosaic__by">
          <strong>{review.name}</strong>
          <span>{review.label}</span>
        </footer>
      </div>
    </li>
  );
}

export function Reviews() {
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
          <p className="edv2-lead">{reviews.sub}</p>
        </Reveal>

        <Reveal className="edv2-stagger edv2-mosaic-wrap">
          {/* role="list" keeps the list announced in Safari, which drops
              list semantics on list-style: none. */}
          <ul className="edv2-mosaic" role="list" aria-label={reviews.listLabel}>
            {reviews.items.map((review, i) => (
              <Pair key={`${review.name}-${i}`} review={review} index={i} />
            ))}
          </ul>
          <p className="edv2-mosaic__note">{reviews.photoNote}</p>
        </Reveal>
      </div>
    </section>
  );
}
