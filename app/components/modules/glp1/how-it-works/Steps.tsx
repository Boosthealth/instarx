import Image from "next/image";
import { steps } from "./content";

/**
 * Sticky stacking-card scroll, adapted from freyameds.com/how-it-works. Each
 * card is a sibling that pins below the fixed header and is progressively
 * covered by the next as you scroll — cards deal over one another like a stack.
 * Pure CSS, no JS. The wrapper must NOT clip overflow or set a height, or the
 * sticky siblings won't stack. The opaque card background is load-bearing: it's
 * what makes each pinned card read as a discrete layer.
 */
export default function Steps() {
  return (
    <section className="px-6 py-10 sm:py-16">
      <div className="mx-auto max-w-7xl">
        {steps.map((step) => (
          <div
            key={step.number}
            className="sticky pb-6"
            style={{ top: "calc(var(--header-height) + 1rem)" }}
          >
            <div className="overflow-hidden rounded-3xl bg-white ring-1 ring-gray-200 shadow-list-item">
              <div className="grid grid-cols-1 items-center gap-8 p-8 sm:p-12 lg:grid-cols-2 lg:gap-14">
                {/* Text */}
                <div data-reveal="slide-left">
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
                  <h2 className="mt-6 text-3xl font-medium leading-tight text-gray-900 sm:text-4xl font-[family-name:var(--font-inter)]">
                    {step.heading}
                  </h2>
                  <p className="mt-4 text-lg leading-relaxed text-gray-800">
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
                <div data-reveal="slide-right" className="order-first lg:order-last">
                  <Image
                    src={step.image}
                    alt={step.imageAlt}
                    width={900}
                    height={900}
                    sizes="(max-width: 1024px) 90vw, 45vw"
                    className="aspect-square w-full rounded-[20px] object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
