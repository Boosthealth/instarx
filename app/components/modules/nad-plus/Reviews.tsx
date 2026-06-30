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

// Each review carries a stable `id` from its source index. The id never changes
// as the carousel rotates, so React keys are always unique — no key collisions
// can drop or merge cards (the old approach rewrote a numeric key on every move,
// which could collide). Position is derived from array index, not the key.
type Review = (typeof reviews)[number] & { id: string };

const initial: Review[] = reviews.map((r, i) => ({ ...r, id: `rev-${i}` }));

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

  // Rotate the array by `steps` (signed). Slice-based rotation is total — it can
  // never lose, duplicate, or collide cards regardless of how large |steps| is —
  // and keys stay stable because we only reorder, never rewrite ids.
  const move = (steps: number) => {
    if (!steps) return;
    setList((cur) => {
      if (cur.length === 0) return cur;
      const n = ((steps % cur.length) + cur.length) % cur.length;
      return [...cur.slice(n), ...cur.slice(0, n)];
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
            Real people who feel like{" "}
            <span className="v2-accent">themselves</span> again.
          </h2>
          <p className="v2-lede mx-auto max-w-xl">
            Hundreds of thousands of members have boosted their energy and
            vitality with InstaRx — here&apos;s what a few of them have to say.
          </p>
          <div className="mt-5 flex items-center justify-center gap-2">
            <span
              className="text-sm font-semibold"
              style={{ color: "var(--v2-ink)" }}
            >
              Excellent 5.0
            </span>
            <Stars count={5} size={15} />
            <span className="text-sm" style={{ color: "var(--v2-ink-mute)" }}>
              · 250k+ happy customers
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
            // Center the middle card: for an odd count this is symmetric
            // (e.g. 7 cards → positions -3..3, center at the middle index). The
            // old `(length+1)/2` offset put the center one slot too far left,
            // fanning extra cards to the left and leaving a gap on the right.
            const position = index - Math.floor(list.length / 2);
            return (
              <Card
                key={review.id}
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
