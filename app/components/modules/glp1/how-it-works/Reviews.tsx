"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { reviews } from "./content";

/**
 * Stacked, click-to-advance testimonial carousel — ported from
 * modules/glp2-v2/Reviews.tsx (its `.v2-stagger*` classes), restyled here as
 * Tailwind/inline styles instead of importing glp2-v2.css, which isn't
 * otherwise loaded on /glp1/how-it-works. Scroll-in reveal uses this page's
 * own `data-reveal` + ScrollReveal (see Steps.tsx) rather than glp2-v2's
 * Reveal component.
 */

type Testimonial = { quote: string; name: string; tag: string; tempId: number };

// glp2-v2's reviews are { quote, name, tag }; this page's content.ts uses
// { title, text, author } — mapped 1:1 (title -> tag, text -> quote, author -> name).
const initial: Testimonial[] = reviews.map((r, i) => ({
  quote: r.text,
  name: r.author,
  tag: r.title,
  tempId: i,
}));

function Stars({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex gap-0.5 ${className}`} role="img" aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={15} fill="currentColor" stroke="currentColor" aria-hidden="true" />
      ))}
    </span>
  );
}

function Card({
  position,
  review,
  cardSize,
  onMove,
}: {
  position: number;
  review: Testimonial;
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
      className={`absolute left-1/2 top-1/2 flex flex-col rounded-[10px] p-[clamp(1.5rem,2.4vw,2.1rem)] text-left transition-[transform,background-color,box-shadow,opacity] duration-500 ease-[cubic-bezier(0.165,0.84,0.44,1)] ${
        isCenter
          ? "z-10 cursor-default bg-[#3f6ea3] opacity-100 shadow-[0_1px_2px_rgba(60,40,30,0.05),0_24px_48px_-30px_rgba(60,40,30,0.28)]"
          : "cursor-pointer bg-white opacity-85 shadow-[0_2px_4px_rgba(60,40,30,0.04),0_18px_40px_-24px_rgba(60,40,30,0.22)]"
      }`}
      style={{
        width: cardSize,
        height: cardSize,
        transform: `translate(-50%, -50%)
          translateX(${(cardSize / 1.55) * position}px)
          translateY(${isCenter ? -8 : position % 2 ? 18 : -18}px)
          rotate(${isCenter ? 0 : position % 2 ? 2 : -2}deg)`,
      }}
    >
      <Stars className={`mb-4 ${isCenter ? "text-[#f0c98b]" : "text-amber-600"}`} />
      <blockquote
        className={`flex-1 overflow-hidden text-[clamp(1.15rem,1.7vw,1.5rem)] leading-[1.38] tracking-[-0.01em] ${
          isCenter ? "text-[#fbf7f2]" : "text-gray-900"
        }`}
      >
        &ldquo;{review.quote}&rdquo;
      </blockquote>
      <figcaption className="mt-[1.1rem] text-[0.9rem]">
        <span className={`font-semibold ${isCenter ? "text-white" : "text-gray-900"}`}>{review.name}</span>
        <span className={isCenter ? "text-white/70" : "text-gray-600"}> — {review.tag}</span>
      </figcaption>
    </button>
  );
}

export default function Reviews() {
  const [cardSize, setCardSize] = useState(340);
  const [list, setList] = useState<Testimonial[]>(initial);

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
    <section id="reviews" className="bg-[var(--glp1-feature-bg)] py-10 sm:py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div data-reveal="up" className="mx-auto mb-4 max-w-2xl text-center">
          <p
            className="mb-5 text-sm font-semibold uppercase tracking-[0.18em] text-gray-700"
            style={{ animation: "glp1FadeUp 0.65s cubic-bezier(0.16, 1, 0.3, 1) both" }}
          >
            In their words
          </p>
          <h2 className="text-center text-3xl font-medium leading-tight text-gray-900 sm:text-4xl font-[family-name:var(--font-inter)]">
            Real people who reclaimed their health.
          </h2>
          <p className="text-center mt-4 text-lg leading-relaxed text-gray-700">
          Thousands of members have lost weight with InstaRx — here&apos;s what
          a few of them have to say about the journey.
        </p>
        <div className="mt-5 flex items-center justify-center gap-2">
          <span className="text-sm font-semibold text-gray-900">Excellent 4.7</span>
          <Stars className="text-amber-600" />
          <span className="text-sm text-gray-600">· 10,000+ happy customers</span>
        </div>
        </div>
      </div>

      {/* Stacked carousel — full-bleed (outside the container) so the fanned
          side cards spread edge-to-edge */}
      <div
        className="relative overflow-hidden"
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

        <div className="absolute bottom-[clamp(0.5rem,2vw,1.25rem)] left-1/2 z-20 flex -translate-x-1/2 gap-3">
          <button
            type="button"
            onClick={() => move(-1)}
            aria-label="Previous testimonial"
            className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#3f6ea3] text-white shadow-[0_6px_18px_-12px_rgba(26,23,20,0.55)] transition-[transform,background-color,box-shadow] duration-300 ease-out hover:-translate-y-0.5 hover:bg-[#1a4371] hover:shadow-[0_10px_26px_-14px_rgba(26,23,20,0.7)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1a1714] focus-visible:ring-offset-2"
          >
            <ChevronLeft size={20} aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => move(1)}
            aria-label="Next testimonial"
            className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#3f6ea3] text-white shadow-[0_6px_18px_-12px_rgba(26,23,20,0.55)] transition-[transform,background-color,box-shadow] duration-300 ease-out hover:-translate-y-0.5 hover:bg-[#1a4371] hover:shadow-[0_10px_26px_-14px_rgba(26,23,20,0.7)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1a1714] focus-visible:ring-offset-2"
          >
            <ChevronRight size={20} aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
}
