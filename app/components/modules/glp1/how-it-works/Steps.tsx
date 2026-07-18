import Image from "next/image";
import { steps } from "./content";

/**
 * The five steps as alternating image/copy blocks — same layout as the Features
 * section. The image alternates left/right per step; each block keeps its step
 * cues (01–05 number badge, category label) plus heading, paragraph, and the
 * three checkmark bullets.
 */
export default function Steps() {
  return (
    <section className="px-6 py-10 sm:py-16">
      <div className="mx-auto flex max-w-7xl flex-col gap-14 sm:gap-20">
        {steps.map((step, i) => {
          const imageRight = i % 2 === 0;
          return (
            <div
              key={step.number}
              className="grid grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-12 lg:gap-20"
            >
              {/* Text */}
              <div data-reveal={imageRight ? "slide-left" : "slide-right"}>
                <div className="flex items-center gap-4">
                  <span
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full text-base font-semibold text-white"
                    style={{ background: "var(--glp1-hero-gradient)" }}
                  >
                    {step.number}
                  </span>
                  <span className="text-sm font-semibold uppercase tracking-[0.18em] text-[#5f8dba]">
                    {step.label}
                  </span>
                </div>
                <h2 className="mt-6 text-2xl font-medium leading-snug text-gray-900 sm:text-3xl font-[family-name:var(--font-inter)]">
                  {step.heading}
                </h2>
                <p className="mt-4 text-lg leading-relaxed text-gray-700">
                  {step.paragraph}
                </p>
                <ul className="mt-6 flex flex-col gap-3">
                  {step.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-3 text-gray-800">
                      <span
                        aria-hidden="true"
                        className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
                        style={{ background: "var(--glp1-hero-gradient)" }}
                      >
                        ✓
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
