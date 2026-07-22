import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Star } from "lucide-react";
import { hero, INTAKE_HREF } from "./content";

/**
 * Buttons modeled on modules/glp2-v2/Hero.tsx (`.v2-btn--primary` /
 * `.v2-btn--glass` in glp2-v2.css) — ported as Tailwind/inline styles rather
 * than importing that stylesheet, since it's bundled only for the /glp2-v2
 * route and isn't loaded here.
 *
 * The card itself spans (almost) the full viewport width, but its content
 * stays inside a max-w-7xl/px-6 column — the same one every other section on
 * this page uses — so text/photo don't stretch edge to edge on wide screens.
 *
 * The subject photo is an absolutely positioned background layer, not a grid
 * column — pinned to the bottom of the content column and sized taller than
 * the reserved space so it bleeds past the visible area, clipped by the
 * card's own `overflow-hidden` + rounded corners. Copy sits on top (z-10),
 * width-capped on large screens so the photo shows through the open right
 * side.
 */
export default function Hero() {
  return (
    <section className="px-2 pb-2 pt-3 sm:px-3 sm:pb-3 lg:px-4 lg:pb-4">
      <div
        className="relative mx-auto max-w-none overflow-hidden rounded-3xl"
        style={{ background: "var(--glp1-hero-gradient)" }}
      >
        {/* Legibility scrim: darkest at the center where the radial gradient is
            lightest and the text sits, fading out at the edges so the brand blue
            stays vivid. Lifts white text over WCAG contrast without a new color. */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0"/>

        {/* Content column — aligned with every other section's max-w-7xl/px-6
            column instead of stretching edge to edge. */}
        <div className="relative mx-auto max-w-7xl px-6">
          {/* Photo layer — deliberately taller than the space the copy reserves
              so it hangs past the card's bottom edge; the card's own
              overflow-hidden clips it there instead of squeezing it to fit. */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center lg:justify-end">
            <div className="relative h-[300px] w-[70vw] max-w-sm sm:h-[420px] sm:w-[50vw] lg:h-[560px] lg:w-[420px]">
              <Image
                src="/glp1/how-it-works/hero.webp"
                alt="Smiling couple who started their GLP-1 journey with InstaRx"
                fill
                sizes="(max-width: 1024px) 70vw, 420px"
                className="object-contain object-bottom"
                priority
              />
            </div>
          </div>

          <div className="relative z-10 pb-64 pt-16 text-center sm:pb-80 sm:pt-24 lg:max-w-xl lg:pb-24 lg:text-left">
            <p
              className="text-sm font-semibold uppercase tracking-[0.18em] text-white"
              style={{ animation: "glp1FadeUp 0.65s cubic-bezier(0.16, 1, 0.3, 1) both" }}
            >
              {hero.eyebrow}
            </p>
            <h1
              className="heading-display mt-5 text-balance text-white font-[family-name:var(--font-inter)]"
              style={{
                animation: "glp1FadeUp 0.65s cubic-bezier(0.16, 1, 0.3, 1) both",
                animationDelay: "110ms",
              }}
            >
              {hero.title}
            </h1>
            <p
              className="mx-auto mt-6 max-w-2xl text-xl leading-relaxed text-white lg:mx-0"
              style={{
                animation: "glp1FadeUp 0.65s cubic-bezier(0.16, 1, 0.3, 1) both",
                animationDelay: "220ms",
              }}
            >
              {hero.subtitle}
            </p>
            <div
              className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row lg:justify-start"
              style={{
                animation: "glp1FadeUp 0.65s cubic-bezier(0.16, 1, 0.3, 1) both",
                animationDelay: "330ms",
              }}
            >
              <Link
                href={INTAKE_HREF}
                prefetch={false}
                className="group inline-flex h-[52px] items-center gap-2 rounded-full bg-[#1a1714] px-8 text-[1.02rem] font-medium text-white shadow-[0_6px_18px_-12px_rgba(26,23,20,0.55)] transition-[background-color,box-shadow,transform] duration-300 ease-out hover:-translate-y-0.5 hover:bg-black hover:shadow-[0_10px_26px_-14px_rgba(26,23,20,0.7)]"
              >
                <span>{hero.ctaLabel}</span>
                {/* Diagonal arrow swap (YMI-style, matches .v2-btn__arrowswap in
                    glp2-v2.css): two ↗ arrows in a clipped box; on hover the
                    visible one exits top-right and the duplicate slides in
                    from bottom-left. */}
                <span className="relative inline-block h-[18px] w-[18px] shrink-0 overflow-hidden" aria-hidden="true">
                  <ArrowUpRight
                    size={18}
                    strokeWidth={2}
                    className="absolute inset-0 transition-transform duration-[400ms] ease-[cubic-bezier(0.48,1.4,0.5,1)] group-hover:translate-x-[110%] group-hover:-translate-y-[110%]"
                  />
                  <ArrowUpRight
                    size={18}
                    strokeWidth={2}
                    className="absolute inset-0 -translate-x-[110%] translate-y-[110%] transition-transform duration-[400ms] ease-[cubic-bezier(0.48,1.4,0.5,1)] group-hover:translate-x-0 group-hover:translate-y-0"
                  />
                </span>
              </Link>
              <a
                href="#faq"
                className="inline-flex h-[52px] items-center gap-2 rounded-full border border-white/55 bg-white/35 px-8 text-[1.02rem] font-medium text-white backdrop-blur-md transition-[background-color,border-color,transform] duration-300 ease-out hover:-translate-y-0.5 hover:border-white/80 hover:bg-white/60"
              >
                {hero.secondaryLabel}
              </a>
            </div>

            {/* Trustpilot-style social proof, same copy as the Reviews section */}
            <div
              className="mt-6 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 lg:justify-start"
              style={{
                animation: "glp1FadeUp 0.65s cubic-bezier(0.16, 1, 0.3, 1) both",
                animationDelay: "400ms",
              }}
            >
              <span className="flex items-center gap-0.5" role="img" aria-label="4.7 out of 5 stars">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={16} fill="#00b67a" stroke="#00b67a" aria-hidden="true" />
                ))}
              </span>
              <span className="text-sm font-semibold text-white">Excellent 4.7</span>
              <span className="text-sm text-white/80">10,000+ happy customers</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
