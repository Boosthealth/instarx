"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { hero, heroOffer, INTAKE_HREF } from "./content";
import { HeroParallax } from "./Parallax";
import { Button, MediaSlot, SlotImage, TrustBadge, WasPrice } from "./ui";

/* Video hero. Order of operations, deliberately:
 * 1. The poster (next/image, priority) is the LCP element and paints first.
 * 2. Once the poster has painted (or failed), and only when the visitor has
 *    not asked for reduced motion, the video gets its src and plays. It fades
 *    in over the poster on canplay. preload="none" keeps it off the critical
 *    path; a 404 hides the element and the poster/gradient slot remains.
 * The gradient MediaSlot sits underneath both, so a missing poster still
 * renders a complete hero. */
export function VideoHero() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [posterState, setPosterState] = useState<"loading" | "ready" | "error">(
    "loading",
  );

  // A cached poster can finish before hydration, in which case its load event
  // fired into the void. A callback ref sees the element the moment it mounts
  // and reads its state once instead of waiting for an event that never comes.
  const posterRef = useCallback((img: HTMLImageElement | null) => {
    if (img?.complete && img.naturalWidth > 0) setPosterState("ready");
  }, []);
  const [videoState, setVideoState] = useState<
    "idle" | "loading" | "ready" | "error"
  >("idle");

  useEffect(() => {
    if (posterState === "loading") return;
    const video = videoRef.current;
    if (!video) return;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduce) return;
    // Defer past the poster paint so the LCP frame is never contended.
    const id = requestAnimationFrame(() => {
      setVideoState("loading");
      video.src = hero.video.src;
      video.load();
      const play = video.play();
      if (play && typeof play.catch === "function") {
        play.catch(() => {
          /* Autoplay refused: poster stays. */
        });
      }
    });
    return () => cancelAnimationFrame(id);
  }, [posterState]);

  // A decorative loop has no business running offscreen or in a hidden tab.
  useEffect(() => {
    if (videoState !== "ready") return;
    const video = videoRef.current;
    if (!video) return;
    let inView = true;
    const sync = () => {
      if (inView && !document.hidden) {
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    };
    const obs =
      typeof IntersectionObserver !== "undefined"
        ? new IntersectionObserver(
            ([entry]) => {
              inView = entry.isIntersecting;
              sync();
            },
            { threshold: 0 },
          )
        : null;
    obs?.observe(video);
    document.addEventListener("visibilitychange", sync);
    return () => {
      obs?.disconnect();
      document.removeEventListener("visibilitychange", sync);
    };
  }, [videoState]);

  const headline = hero.headlines[hero.heroVariant];
  const stacked = hero.heroVariant === "default";

  return (
    <section className="edv2-hero" aria-labelledby="edv2-hero-title">
      <HeroParallax>
        <MediaSlot
          slot={hero.video.slot}
          className="edv2-hero__slot"
          hideLabel={posterState === "ready"}
        >
          {posterState !== "error" && (
            <SlotImage
              ref={posterRef}
              src={hero.video.poster}
              srcMobile={hero.video.posterMobile}
              sizes="100vw"
              priority
              className="edv2-hero__poster"
              onLoad={() => setPosterState("ready")}
              onError={() => setPosterState("error")}
            />
          )}
          {videoState !== "error" && (
            <video
              ref={videoRef}
              className="edv2-hero__video"
              data-ready={videoState === "ready" ? "true" : "false"}
              muted
              loop
              playsInline
              preload="none"
              aria-hidden="true"
              tabIndex={-1}
              onPlaying={() => setVideoState("ready")}
              onError={() => setVideoState("error")}
            />
          )}
        </MediaSlot>
      </HeroParallax>
      <div className="edv2-hero__scrim" aria-hidden="true" />

      <div className="edv2-container edv2-hero__content">
        <div className="edv2-hero__stack">
          <div
            className="edv2-hero__rating"
            style={{ "--i": 0 } as React.CSSProperties}
          >
            <TrustBadge compact onDark />
          </div>

          <h1
            id="edv2-hero-title"
            className="edv2-display edv2-hero__title"
            style={{ "--i": 1 } as React.CSSProperties}
          >
            {stacked
              ? headline
                  .split(" ")
                  .map((word) => <span key={word}>{word}</span>)
              : headline}
          </h1>

          <p
            className="edv2-hero__sub"
            style={{ "--i": 2 } as React.CSSProperties}
          >
            <span className="edv2-hero__sub-short">{hero.subheadShort}</span>
            <span className="edv2-hero__sub-long">
              {hero.subhead}{" "}
              <span className="edv2-hero__sub-tail">{hero.subheadTail}</span>
            </span>
          </p>

          <div
            className="edv2-hero__offer"
            style={{ "--i": 3 } as React.CSSProperties}
          >
            <span className="edv2-chip edv2-chip--on-dark edv2-hero__price">
              <strong>{heroOffer.price}</strong>
              <span aria-hidden="true">·</span>
              <WasPrice value={heroOffer.was} />
            </span>
            <span className="edv2-small edv2-muted">{heroOffer.perDose}</span>
          </div>

          <div
            className="edv2-hero__actions"
            style={{ "--i": 4 } as React.CSSProperties}
          >
            <Button
              href={INTAKE_HREF}
              size="lg"
              arrow
              block
              className="edv2-hero__cta"
            >
              {hero.cta}
            </Button>
            <p className="edv2-micro edv2-hero__micro">{hero.ctaMicro}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
