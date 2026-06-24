"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Reveal } from "./Reveal";
import { Stars } from "./ui";
import { reviews } from "./content";

/* Stacked, click-to-advance testimonial carousel. The interaction is adapted
 * from a community "stagger testimonials" pattern but fully re-skinned to the v2
 * editorial system (cream cards, Fraunces quotes, our ink/rose tokens) — no
 * shadcn tokens, no stock avatars. The centre card is highlighted; the flanking
 * cards fan out behind it and can be clicked to bring forward. */

type Review = (typeof reviews)[number] & { tempId: number };

const initial: Review[] = reviews.map((r, i) => ({ ...r, tempId: i }));

function Card({
  position,
  review,
  cardSize,
  onMove,
}: {
  position: number;
  review: Review;
  cardSize: number;
  onMove: (steps: number) => void;
}) {
  const isCenter = position === 0;
  return (
    <button
      type="button"
      onClick={() => onMove(position)}
      aria-hidden={!isCenter}
      tabIndex={isCenter ? 0 : -1}
      className="v2-stagger__card"
      data-center={isCenter ? "true" : undefined}
      style={{
        width: cardSize,
        height: cardSize,
        transform: `translate(-50%, -50%)
          translateX(${(cardSize / 1.55) * position}px)
          translateY(${isCenter ? -8 : position % 2 ? 18 : -18}px)
          rotate(${isCenter ? 0 : position % 2 ? 2 : -2}deg)`,
      }}
    >
      <Stars count={5} size={15} className="v2-stagger__stars" />
      <blockquote className="v2-stagger__quote">“{review.quote}”</blockquote>
      <figcaption className="v2-stagger__by">
        <span className="v2-stagger__name">{review.name}</span>
        <span className="v2-stagger__tag"> — {review.tag}</span>
      </figcaption>
    </button>
  );
}

export function Reviews() {
  const [cardSize, setCardSize] = useState(340);
  const [list, setList] = useState<Review[]>(initial);

  const move = (steps: number) => {
    if (!steps) return;
    setList((cur) => {
      const next = [...cur];
      if (steps > 0) {
        for (let i = 0; i < steps; i++) {
          const item = next.shift();
          if (item) next.push({ ...item, tempId: item.tempId + cur.length });
        }
      } else {
        for (let i = 0; i < -steps; i++) {
          const item = next.pop();
          if (item) next.unshift({ ...item, tempId: item.tempId - cur.length });
        }
      }
      return next;
    });
  };

  useEffect(() => {
    const update = () =>
      setCardSize(window.matchMedia("(min-width: 640px)").matches ? 340 : 268);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    <section id="reviews" className="v2-section v2-bg-pink">
      <div className="v2-container">
        <Reveal className="mx-auto mb-4 max-w-2xl text-center">
          <p className="v2-eyebrow v2-kicker-rule mb-5 inline-flex">
            In their words
          </p>
          <h2 className="v2-h2 mb-4">
            Real people who reclaimed their{" "}
            <span className="v2-accent">health</span>.
          </h2>
          <p className="v2-lede mx-auto max-w-xl">
            Thousands of members have lost weight with InstaRx — here&apos;s what
            a few of them have to say about the journey.
          </p>
          <div className="mt-5 flex items-center justify-center gap-2">
            <span
              className="text-sm font-semibold"
              style={{ color: "var(--v2-ink)" }}
            >
              Excellent 4.7
            </span>
            <Stars count={5} size={15} />
            <span className="text-sm" style={{ color: "var(--v2-ink-mute)" }}>
              · 10,000+ happy customers
            </span>
          </div>
        </Reveal>
      </div>

      {/* Stacked carousel — full-bleed (outside the container) so the fanned
          side cards spread edge-to-edge */}
      <div
        className="v2-stagger"
        style={{ height: cardSize + 190 }}
        role="group"
        aria-label="Member testimonials"
      >
          {list.map((review, index) => {
            const position =
              list.length % 2
                ? index - (list.length + 1) / 2
                : index - list.length / 2;
            return (
              <Card
                key={review.tempId}
                review={review}
                position={position}
                cardSize={cardSize}
                onMove={move}
              />
            );
          })}

          <div className="v2-stagger__nav">
            <button
              type="button"
              onClick={() => move(-1)}
              className="v2-stagger__btn"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={20} aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => move(1)}
              className="v2-stagger__btn"
              aria-label="Next testimonial"
            >
              <ChevronRight size={20} aria-hidden="true" />
            </button>
          </div>
      </div>
    </section>
  );
}
