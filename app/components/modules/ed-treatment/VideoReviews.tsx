"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, Volume2, VolumeX } from "lucide-react";
import { MediaSlot, Stars } from "./ui";
import { hero, videoReviews, type VideoReview } from "./content";

/* 5.12 video testimonials. Embla carousel of muted, looping, poster-first
 * clips: preload="none", play only while on screen, pause off-screen, tap to
 * unmute. Under reduced motion clips never autoplay (poster only). Empty-safe:
 * no items renders the pending state; items without `src` render labelled
 * placeholder slots (no invented names or quotes). */
export function VideoReviews() {
  const items = videoReviews.items;
  const [emblaRef, embla] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
  });
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const sync = useCallback(() => {
    if (!embla) return;
    setCanPrev(embla.canScrollPrev());
    setCanNext(embla.canScrollNext());
  }, [embla]);

  useEffect(() => {
    if (!embla) return;
    // First read is deferred a frame (embla is already initialised by now);
    // later updates arrive through embla's own events.
    const frame = requestAnimationFrame(sync);
    embla.on("select", sync).on("reInit", sync);
    return () => {
      cancelAnimationFrame(frame);
      embla.off("select", sync).off("reInit", sync);
    };
  }, [embla, sync]);

  return (
    <section
      id="reviews"
      className="ed-section ed-section--surface"
      aria-labelledby="ed-reviews"
    >
      <div className="ed-wrap">
        <div className="ed-reviews__head">
          <div>
            <h2 id="ed-reviews" className="ed-h2">
              {videoReviews.headline}
            </h2>
            <p className="ed-lede">{videoReviews.lede}</p>
            <p className="ed-rating">
              <Stars />
              <span className="ed-rating__label">{hero.rating.label}</span>
              <span>· {hero.rating.detail}</span>
            </p>
          </div>
          {items.length > 1 && (
            <div className="ed-reviews__nav">
              <button
                type="button"
                className="ed-iconbtn"
                onClick={() => embla?.scrollPrev()}
                disabled={!canPrev}
                aria-label={videoReviews.prev}
              >
                <ChevronLeft size={20} aria-hidden="true" />
              </button>
              <button
                type="button"
                className="ed-iconbtn"
                onClick={() => embla?.scrollNext()}
                disabled={!canNext}
                aria-label={videoReviews.next}
              >
                <ChevronRight size={20} aria-hidden="true" />
              </button>
            </div>
          )}
        </div>

        {items.length === 0 ? (
          <p className="ed-reviews__pending">{videoReviews.pendingState}</p>
        ) : (
          <div className="ed-embla" ref={emblaRef}>
            <ul className="ed-embla__track">
              {items.map((item) => (
                <li key={item.id} className="ed-embla__slide">
                  <ReviewVideo item={item} />
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}

function ReviewVideo({ item }: { item: VideoReview }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    const v = ref.current;
    if (!v || !item.src) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (typeof IntersectionObserver === "undefined") return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) v.play().catch(() => {});
        else v.pause();
      },
      { threshold: 0.6 },
    );
    obs.observe(v);
    return () => obs.disconnect();
  }, [item.src]);

  if (!item.src) {
    return (
      <div className="ed-vid">
        <MediaSlot label={item.placeholder} ratio="9 / 16" ink />
      </div>
    );
  }

  const toggleSound = () => {
    const v = ref.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
    if (!v.muted && v.paused) v.play().catch(() => {});
  };

  return (
    <div className="ed-vid">
      <video
        ref={ref}
        src={item.src}
        poster={item.poster}
        muted
        loop
        playsInline
        preload="none"
        aria-label={item.alt}
      />
      <button type="button" className="ed-vid__sound" onClick={toggleSound}>
        {muted ? (
          <VolumeX size={15} aria-hidden="true" />
        ) : (
          <Volume2 size={15} aria-hidden="true" />
        )}
        {muted ? videoReviews.unmute : videoReviews.mute}
      </button>
    </div>
  );
}
