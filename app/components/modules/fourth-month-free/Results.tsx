"use client";

import { useState } from "react";

const VIDEOS = ["/video/1000019567.mp4", "/video/1000103649.mp4", "/video/IMG_2142.mp4"];

// Same playback setup as the /glp2 VideoSlide (app/components/modules/home/VideoTestimonials.tsx):
// metadata preload + a derived poster, since iOS Safari paints nothing without one.
function VideoSlide({ src, index }: { src: string; index: number }) {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return (
      <div className="flex aspect-[9/16] w-full items-center justify-center rounded-2xl bg-gray-200">
        <p className="px-4 text-center text-sm text-gray-500">Video unavailable. Please refresh and try again.</p>
      </div>
    );
  }
  return (
    <video
      controls
      playsInline
      preload="metadata"
      poster={src.replace(/\.mp4$/, "-poster.webp")}
      aria-label={`InstaRx member testimonial video ${index + 1}`}
      className="aspect-[9/16] w-full rounded-2xl bg-black object-cover"
      onError={() => setFailed(true)}
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}

export function Results() {
  return (
    <section className="bg-white py-16 lg:py-24" id="results" data-track-section="results">
      <div className="max-w-6xl mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-10 px-4 sm:px-6 md:mb-14">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-700 mb-3">Real member results</p>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-gray-900 leading-tight mb-4">
            They didn&apos;t quit. Neither will you.
          </h2>
          <p className="text-lg text-gray-700 md:text-xl">
            Thousands of InstaRx members have committed to the full journey. Here&apos;s what happened when they did.
          </p>
        </div>
        <ul
          className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 [scrollbar-width:none] sm:px-6 md:grid md:grid-cols-3 md:gap-6 md:overflow-visible"
          aria-label="Member testimonial videos"
        >
          {VIDEOS.map((src, i) => (
            <li key={src} className="w-[72%] shrink-0 snap-center sm:w-[45%] md:w-auto">
              <VideoSlide src={src} index={i} />
            </li>
          ))}
        </ul>
        <p className="mt-6 px-4 text-center text-sm text-gray-600">Results vary. Videos from InstaRx members.</p>
      </div>
    </section>
  );
}
