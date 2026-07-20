import Image from "next/image";
import { Check } from "lucide-react";
import { steps } from "./content";

/**
 * The five steps as alternating image/copy blocks on the warm neutral band.
 * Content is top-aligned so
 * the heading sits on a shared baseline with the image rather than floating in
 * the middle of a taller photo. Each block keeps its step cues (01–05 badge,
 * category label), heading, paragraph, and checkmark bullets.
 */
export default function Steps() {
  return (
    <section className="bg-[var(--glp1-feature-bg)]">
      <div className="mx-auto flex max-w-7xl flex-col gap-16 px-6 py-10 sm:gap-24 sm:py-16">
        {steps.map((step, i) => {
          const imageRight = i % 2 === 0;
          return (
            <div
              key={step.number}
              className="grid grid-cols-1 items-start gap-8 md:grid-cols-2 md:gap-12 lg:gap-20"
            >
              {/* Text */}
              <div data-reveal={imageRight ? "slide-left" : "slide-right"}>
                <div className="flex items-center gap-4">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#3f6ea3] text-base font-semibold text-white">
                    {step.number}
                  </span>
                  <span className="text-sm font-semibold uppercase tracking-[0.18em] text-[#3f6ea3]">
                    {step.label}
                  </span>
                </div>
                <h2 className="mt-6 text-2xl font-medium leading-snug text-gray-900 sm:text-3xl font-[family-name:var(--font-inter)]">
                  {step.heading}
                </h2>
                <p className="mt-4 max-w-prose text-lg leading-relaxed text-gray-700">
                  {step.paragraph}
                </p>
                <ul className="mt-6 flex flex-col gap-3">
                  {step.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-center gap-3 text-gray-800">
                      <span
                        aria-hidden="true"
                        className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#3f6ea3] text-white"
                      >
                        <Check size={14} strokeWidth={3} />
                      </span>
                      <span className="leading-relaxed">{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Image */}
              <div
                data-reveal={imageRight ? "slide-right" : "slide-left"}
                className={`relative aspect-[5/4] w-full overflow-hidden rounded-2xl bg-[#eef3f8] ${
                  imageRight ? "order-first md:order-last" : "order-first"
                }`}
              >
                <Image
                  src={step.image}
                  alt={step.imageAlt}
                  fill
                  sizes="(max-width: 768px) 90vw, 45vw"
                  className="object-cover"
                />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
