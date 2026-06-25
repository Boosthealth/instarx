"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Play, Quote } from "lucide-react";
import { Reveal } from "./Reveal";
import { FloatingBottles } from "./FloatingBottles";

/* How GLP-1/GIP works. Centered editorial copy with decorative GLP-1 bottles
 * drifting around it (scroll parallax), and three portrait member-testimonial
 * videos below. Mirrors the original /glp2 "Kill the Cravings" section, re-skinned
 * to the v2 palette. */

/* TODO(videos): `name` and `result` are PLACEHOLDERS — replace with the real
 * name + success result of each person in the video before launch (the user is
 * providing these from the actual testimonials). They are shown as the caption
 * on each thumbnail, so they must reflect the real customer. */
const VIDEOS = [
  { src: "/video/1000019567.mp4", name: "Member name", result: "Replace · e.g. lost 31 lbs" },
  { src: "/video/1000103649.mp4", name: "Member name", result: "Replace · e.g. lost 24 lbs" },
  { src: "/video/IMG_2142.mp4", name: "Member name", result: "Replace · e.g. lost 28 lbs" },
];

function VideoCard({
  src,
  name,
  result,
  index,
}: {
  src: string;
  name: string;
  result: string;
  index: number;
}) {
  const [failed, setFailed] = useState(false);
  const [playing, setPlaying] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  // poster is derived from the src (…-poster.webp) — iOS won't paint frame 1.
  const poster = src.replace(/\.mp4$/, "-poster.webp");

  // Reveal on scroll: add .is-in when the card enters the viewport (staggered
  // via the --i delay set inline). Falls back to visible if IO is unavailable.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.classList.add("is-in");
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            el.classList.add("is-in");
            io.disconnect();
          }
        }
      },
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const play = () => {
    setPlaying(true);
    // play after the poster overlay is removed and native controls appear
    requestAnimationFrame(() => videoRef.current?.play());
  };

  if (failed) {
    return (
      <div ref={ref} className="v2-mech-vcard" style={{ ["--i" as string]: index }}>
        <div className="v2-mech-video v2-mech-video--fallback">
          <p>Video unavailable. Please refresh and try again.</p>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className="v2-mech-vcard"
      data-playing={playing ? "true" : undefined}
      style={{ ["--i" as string]: index }}
    >
      <video
        ref={videoRef}
        controls={playing}
        playsInline
        preload="metadata"
        poster={poster}
        aria-label={`Testimonial from ${name}`}
        className="v2-mech-video"
        onError={() => setFailed(true)}
        onPause={() => undefined}
      >
        <source src={src} type="video/mp4" />
      </video>

      {/* Poster overlay — hidden once the viewer hits play. A bottom scrim
          carries an enlarged caption (quote mark + name + result) with the play
          button anchored at the bottom. */}
      {!playing && (
        <button
          type="button"
          className="v2-mech-vplay"
          onClick={play}
          aria-label={`Play testimonial from ${name}`}
        >
          <span className="v2-mech-vplay__scrim" aria-hidden="true" />
          <span className="v2-mech-vplay__cap">
            <Quote
              className="v2-mech-vplay__mark"
              size={30}
              strokeWidth={0}
              fill="currentColor"
              aria-hidden="true"
            />
            <span className="v2-mech-vplay__name">{name}</span>
            <span className="v2-mech-vplay__result">{result}</span>
            <span className="v2-mech-vplay__cta">
              <span className="v2-mech-vplay__btn" aria-hidden="true">
                <Play size={18} strokeWidth={0} fill="currentColor" />
              </span>
              <span className="v2-mech-vplay__cta-label">Watch story</span>
            </span>
          </span>
        </button>
      )}
    </div>
  );
}

export function Mechanism() {
  return (
    <section className="v2-section v2-bg-pink v2-mech">
      {/* decorative parallax bottles drifting around the centered copy */}
      <FloatingBottles />

      <div className="v2-container relative" style={{ zIndex: 1 }}>
        <Reveal className="mx-auto max-w-3xl text-center">
          {/* Eyebrow as a frosted-glass pill (same treatment as the closing CTA's
              "What are you waiting for?" tag). "The science" — distinct from the
              HowItWorks "process" framing so the two sections don't echo. */}
          <span className="v2-glass v2-glass-pill mb-5">The science</span>

          <h2 className="v2-h2 mb-6">
            Kill the cravings, feel full faster, and switch on fat-burning mode —
            with <span className="v2-accent">GLP-1/GIP</span>.
          </h2>
          <p className="v2-lede mx-auto mb-6 max-w-2xl">
            You shouldn&apos;t have to suffer to lose weight. GLP-1/GIP attacks
            the problem from both sides — killing hunger at the source and
            switching on your body&apos;s ability to burn stored fat. InstaRx is
            one of the few providers where{" "}
            <span style={{ color: "var(--v2-ink)", fontWeight: 600 }}>
              all of our doctors are obesity certified
            </span>
            .
          </p>
          <p
            className="text-lg font-semibold"
            style={{ color: "var(--v2-ink)" }}
          >
            Hear from real people who reclaimed their health with InstaRx:
          </p>
          <div className="mt-5 flex justify-center" aria-hidden="true">
            <Image
              src="/lose-weight/dwnarrow.webp"
              alt=""
              width={40}
              height={58}
              className="opacity-60"
            />
          </div>
        </Reveal>

        <div className="v2-mech-videos">
          {VIDEOS.map((v, i) => (
            <VideoCard
              key={v.src}
              src={v.src}
              name={v.name}
              result={v.result}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
