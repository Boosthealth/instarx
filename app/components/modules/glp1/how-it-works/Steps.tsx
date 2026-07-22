import Image from "next/image";
import { Check } from "lucide-react";
import { steps } from "./content";

// Same radial-gradient pairs as `.v2-bg-pink--soft` / `.v2-bg-lilac` in the
// glp2-v2/nad-plus/partner stylesheets, inlined rather than imported — those
// CSS files are bundled per-page and aren't loaded on /glp1/how-it-works, and
// `var(--v2-cream)` (their base) isn't defined here either, so the literal
// hex stands in for it.
const STEP_BACKGROUNDS = [
  `radial-gradient(66% 72% at 10% 14%, rgba(244, 204, 218, 0.32) 0%, rgba(244, 204, 218, 0) 72%),
   radial-gradient(58% 64% at 94% 86%, rgba(240, 222, 198, 0.3) 0%, rgba(240, 222, 198, 0) 72%),
   #fbf7f2`,
  `radial-gradient(70% 76% at 90% 10%, rgba(220, 209, 236, 0.52) 0%, rgba(220, 209, 236, 0) 72%),
   radial-gradient(62% 68% at 6% 90%, rgba(242, 218, 204, 0.42) 0%, rgba(242, 218, 204, 0) 72%),
   #fbf7f2`,
];

/**
 * Scroll-stacked steps: each step sticks to the top of the viewport as the
 * page scrolls, and the next step slides up to cover it — like a deck of
 * cards. After the last step, its sticky box ends and the page scrolls on
 * normally.
 *
 * Pure CSS `position: sticky`, no scroll-jacking JS: every step is a direct
 * sibling reserving its own (content-sized, not viewport-stretched) height
 * in normal flow, so it stays pinned just below the page's own sticky
 * header for exactly that scroll distance before the next (higher z-index,
 * later in DOM) step's box reaches that point and paints over it.
 *
 * `top-[112px]` (not `top-0`) — this page's Header.tsx is its own sticky bar
 * (marquee strip + nav row, ~108–111px depending on scroll state), so
 * sticking to the very top would tuck each step's top edge behind it.
 */
export default function Steps() {
  return (
    <section className="bg-[var(--glp1-feature-bg)]">
      {steps.map((step, i) => {
        const imageRight = i % 2 === 0;
        return (
          <div
            key={step.number}
            style={{ zIndex: i + 1, background: STEP_BACKGROUNDS[i % 2] }}
            className="sticky top-28 border-t border-white"
          >
            <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-6 px-6 py-6 sm:gap-8 sm:py-10 md:grid-cols-2 md:gap-12 md:py-16 lg:gap-20">
              {/* Text */}
              <div data-reveal={imageRight ? "slide-left" : "slide-right"}>
                <div className="flex items-center gap-4">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#3f6ea3] text-sm font-semibold text-white sm:h-10 sm:w-10 sm:text-base">
                    {step.number}
                  </span>
                  <span className="text-sm font-semibold uppercase tracking-[0.18em] text-[#3f6ea3]">
                    {step.label}
                  </span>
                </div>
                <h2 className="mt-4 text-2xl font-medium leading-snug text-gray-900 sm:mt-6 sm:text-3xl font-[family-name:var(--font-inter)]">
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
                className={`relative aspect-[5/3] w-full overflow-hidden rounded-2xl bg-[#eef3f8] md:aspect-[5/4] ${
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
          </div>
        );
      })}
    </section>
  );
}
