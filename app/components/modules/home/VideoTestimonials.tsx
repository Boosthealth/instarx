"use client";

import { useState } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { CTA } from "./CTA";

const videos = [
  "/video/1000019567.mp4",
  "/video/1000103649.mp4",
  "/video/IMG_2142.mp4",
];

const bottlesLeft = [
  { src: "/lose-weight/instarx-semaglutide.webp", style: { top: "2%", left: "2%", rotate: "-12deg", width: 110 } },
  { src: "/lose-weight/instarx-tirzepatide.webp", style: { top: "32%", left: "5%", rotate: "8deg", width: 90 } },
];

const bottlesRight = [
  { src: "/lose-weight/instarx-tirzepatide.webp", style: { top: "2%", right: "2%", rotate: "14deg", width: 100 } },
  { src: "/lose-weight/instarx-semaglutide.webp", style: { top: "30%", right: "4%", rotate: "-8deg", width: 90 } },
];

function VideoSlide({ src, index }: { src: string; index: number }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className="w-full h-full rounded-2xl bg-gray-200 flex items-center justify-center">
        <p className="text-gray-500 text-sm text-center px-4">Video unavailable. Please refresh and try again.</p>
      </div>
    );
  }

  return (
    <video
      controls
      playsInline
      preload="metadata"
      aria-label={`Customer testimonial video ${index + 1}`}
      className="w-full h-full object-cover rounded-2xl bg-black"
      onError={() => setFailed(true)}
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}

export function VideoTestimonials() {
  const [emblaRef] = useEmblaCarousel({
    loop: false,
    align: "start",
    containScroll: "trimSnaps",
  });

  return (
    <section className="bg-gray-100">
      <div className="bg-[#f5f0eb] py-16 overflow-hidden rounded-t-[48px]">
        {/* Container — bottles are positioned relative to this */}
        <div className="relative max-w-7xl mx-auto">
          {/* Left bottles — desktop only */}
          <div className="hidden lg:block" aria-hidden="true">
            {bottlesLeft.map((b, i) => (
              <div
                key={i}
                className="absolute pointer-events-none select-none"
                style={{
                  top: b.style.top,
                  left: b.style.left,
                  transform: `rotate(${b.style.rotate})`,
                  width: `${b.style.width}px`,
                }}
              >
                <Image src={b.src} alt="" width={b.style.width} height={Math.round(b.style.width * 1.4)} />
              </div>
            ))}
          </div>

          {/* Right bottles — desktop only */}
          <div className="hidden lg:block" aria-hidden="true">
            {bottlesRight.map((b, i) => (
              <div
                key={i}
                className="absolute pointer-events-none select-none"
                style={{
                  top: b.style.top,
                  right: b.style.right,
                  transform: `rotate(${b.style.rotate})`,
                  width: `${b.style.width}px`,
                }}
              >
                <Image src={b.src} alt="" width={b.style.width} height={Math.round(b.style.width * 1.4)} />
              </div>
            ))}
          </div>
          <div className="max-w-5xl mx-auto">
            {/* Text content */}
            <div className="relative z-10 max-w-2xl mx-auto text-center px-6 mb-10">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-800 mb-5 leading-tight">
              We&apos;ll Help You Kill the Cravings, Feel Full Faster, and Put Your Body Into Fat-Burning Mode — With GLP-1/GIP Treatment.
            </h2>
            <p className="text-lg text-gray-600 mb-7 leading-relaxed md:text-xl">
              You shouldn&apos;t have to suffer to lose weight. GLP-1/GIP attacks the problem from both sides —
              killing hunger at the source and switching on your body&apos;s ability to burn stored fat. Insta Rx is
              one of the few providers where all of our doctors are obesity certified. Questions? Concerns?
              We&apos;re a message away.
            </p>
            <p className="text-xl md:text-2xl text-gray-700 font-semibold">
              Hear from real people who reclaimed their health with Insta Rx:
            </p>
            <div className="flex justify-center mt-6" aria-hidden="true">
              <Image
                src="/lose-weight/dwnarrow.webp"
                alt=""
                width={44}
                height={64}
                className="opacity-70"
              />
            </div>
          </div>
            {/* Mobile: embla carousel — 1 slide at a time */}
            <div className="block lg:hidden">
              <div ref={emblaRef} className="overflow-hidden px-4">
                <div className="flex gap-4">
                  {videos.map((src, i) => (
                    <div key={i} className="flex-none w-[55vw] md:w-[calc(40%-8px)] aspect-9/16">
                      <VideoSlide src={src} index={i} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* Desktop: all 3 side by side */}
            <div className="hidden lg:flex gap-6 px-8 max-w-4xl mx-auto">
              {videos.map((src, i) => (
                <div key={i} className="flex-1 aspect-9/16">
                  <VideoSlide src={src} index={i} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#f5f0eb] sm:p-4">
        <div className="bg-linear-to-br from-purple-100 via-pink-100 to-yellow-100 rounded-t-3xl sm:rounded-[48px] py-12 px-6 sm:px-12 md:py-20">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-800 mb-8 text-center leading-tight">
              Are you ready to shed 15% of your body weight?
            </h2>
            <CTA href="https://go.instarx.com/intake" className="text-center" btnText="Let's Go!" price />
          </div>
        </div>
      </div>
    </section>
  );
}
