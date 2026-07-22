import type { CSSProperties } from "react";
import { Star } from "lucide-react";
import { reviews } from "./content";

function Stars() {
  return (
    <div className="mb-3 flex gap-0.5" role="img" aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={16} fill="#f59e0b" stroke="#f59e0b" aria-hidden="true" />
      ))}
    </div>
  );
}

function TrustBadge() {
  return (
    <div className="flex items-center gap-2 text-base text-gray-700">
      <span className="flex items-center gap-0.5" role="img" aria-label="4.7 out of 5 stars">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} size={14} fill="#00b67a" stroke="#00b67a" aria-hidden="true" />
        ))}
      </span>
      <span className="font-semibold text-gray-900">Excellent</span>
      <span>4.7</span>
      <span aria-hidden="true">·</span>
      <span>10,000+ happy customers</span>
    </div>
  );
}

// Same alternating card tilt as a scattered photo collage — even cards lean
// one way, odd cards the other, so the two rows don't read as perfectly
// regimented while they scroll.
const TILTS = ["rotate-2", "-rotate-2", "rotate-3", "-rotate-3"];

function ReviewCard({ review, index }: { review: (typeof reviews)[number]; index: number }) {
  return (
    <article
      className={`flex w-[clamp(280px,30vw,380px)] shrink-0 flex-col gap-2 rounded-2xl bg-white p-6 shadow-[0_1px_2px_rgba(16,24,40,0.06),0_1px_3px_rgba(16,24,40,0.1)] sm:p-7 ${TILTS[index % TILTS.length]}`}
    >
      <Stars />
      <p className="text-lg font-semibold leading-snug text-gray-900">{review.title}</p>
      <p className="leading-snug text-gray-600">{review.text}</p>
      <p className="mt-2 font-medium text-gray-700">— {review.author}</p>
    </article>
  );
}

/**
 * Modeled on freyameds.com/how-it-works' "Results That Speak For Themselves"
 * section: an oversized serif headline sits behind, and review cards (styled
 * like modules/home/Reviews.tsx, used on /glp2) float above it (z-10) on an
 * endless two-direction scroll, each tilted a few degrees — no video, unlike
 * the reference's mixed video/quote cards.
 *
 * Pure CSS `.marquee-track` / `.marquee-track-reverse` (globals.css), same
 * technique as the media-logos strip in modules/glp1/Hero.tsx —
 * `--marquee-duration` overrides that shared class's default speed just for
 * these rows. Each row's content is duplicated so the loop point is
 * invisible, and reversed order on the second row so the two lanes don't
 * feel identical.
 */
export default function Reviews() {
  const rowA = [...reviews, ...reviews];
  const rowB = [...reviews].reverse();
  const rowBLooped = [...rowB, ...rowB];

  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      <div className="z-10 pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-4 px-6 text-center">
        <h2 className="max-w-xl text-center font-[family-name:var(--font-inter)] font-medium text-6xl italic leading-relaxed text-gray-900 sm:text-7xl lg:text-8xl">
          Results That Speak For Themselves
        </h2>
        <TrustBadge />
      </div>

      <div
        className="relative flex flex-col gap-10 sm:gap-14"
        style={{ "--marquee-duration": "40s" } as CSSProperties}
      >
        <div className="marquee-track flex gap-28 md:gap-40 xl:gap-72" style={{ width: "max-content" }}>
          {rowA.map((review, i) => (
            <ReviewCard key={i} review={review} index={i} />
          ))}
        </div>
        <div
          className="marquee-track-reverse flex gap-28 md:gap-40 xl:gap-72"
          style={{ width: "max-content" }}
        >
          {rowBLooped.map((review, i) => (
            <ReviewCard key={i} review={review} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
