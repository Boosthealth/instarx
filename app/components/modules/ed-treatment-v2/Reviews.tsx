import { rating, reviews } from "./content";
import { Stars } from "./ui";
import { Reveal } from "./Reveal";

/* Verified results. Empty-safe: with no ED reviews yet, the section shows a
 * clear "reviews pending" state and labelled theme placeholders. No invented
 * names, no invented quotes. */
export function Reviews() {
  const hasReviews = reviews.items.length > 0;

  return (
    <section
      className="edv2-section edv2-section--soft edv2-reviews"
      id="reviews"
      tabIndex={-1}
      aria-labelledby="edv2-reviews-title"
    >
      <div className="edv2-container">
        <Reveal className="edv2-head">
          <h2 id="edv2-reviews-title" className="edv2-h2">
            {reviews.heading}
          </h2>
          <p className="edv2-lead">{reviews.sub}</p>
          <p className="edv2-reviews__rating">
            <Stars label={`Rated ${rating.score} out of 5`} />
            <span>{rating.line}</span>
          </p>
        </Reveal>

        {hasReviews ? (
          <ul className="edv2-reviews__grid">
            {reviews.items.map((review, i) => (
              <Reveal
                key={`${review.name}-${i}`}
                as="li"
                className="edv2-review"
                delay={(i % 4) * 60}
              >
                <Stars
                  count={review.rating}
                  label={`${review.rating} out of 5 stars`}
                />
                <blockquote className="edv2-review__quote">
                  {review.quote}
                </blockquote>
                <p className="edv2-review__meta">
                  <strong>{review.name}</strong> · {review.label}
                </p>
              </Reveal>
            ))}
          </ul>
        ) : (
          <>
            <Reveal className="edv2-reviews__pending">
              <h3>{reviews.pending.heading}</h3>
              <p>{reviews.pending.body}</p>
            </Reveal>
            <ul className="edv2-reviews__grid" aria-label="Review placeholders">
              {reviews.pending.themes.map((theme, i) => (
                <Reveal
                  key={theme}
                  as="li"
                  className="edv2-review edv2-review--pending"
                  delay={i * 60}
                >
                  <span className="edv2-review__label">
                    {reviews.pending.cardLabel}
                  </span>
                  <p className="edv2-review__quote">{theme}</p>
                  <p className="edv2-review__meta">Verified InstaRx customer</p>
                </Reveal>
              ))}
            </ul>
          </>
        )}
      </div>
    </section>
  );
}
