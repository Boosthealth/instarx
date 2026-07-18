import Link from "next/link";
import { hero, INTAKE_HREF } from "./content";

export default function Hero() {
  return (
    <section
      className="px-6 pb-8 sm:pb-10"
      style={{ paddingTop: "calc(var(--header-height) + 1.5rem)" }}
    >
      <div
        className="relative overflow-hidden max-w-7xl mx-auto rounded-3xl px-8 sm:px-14 py-16 sm:py-24 text-center"
        style={{ background: "var(--glp1-hero-gradient)" }}
      >
        {/* Legibility scrim: darkest at the center where the radial gradient is
            lightest and the text sits, fading out at the edges so the brand blue
            stays vivid. Lifts white text over WCAG contrast without a new color. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(60% 60% at 50% 45%, rgba(20,45,75,0.34) 0%, rgba(20,45,75,0.12) 60%, rgba(20,45,75,0) 100%)",
          }}
        />
        <div className="relative">
          <p
            className="text-sm font-semibold uppercase tracking-[0.18em] text-white"
            style={{ animation: "glp1FadeUp 0.65s cubic-bezier(0.16, 1, 0.3, 1) both" }}
          >
            {hero.eyebrow}
          </p>
          <h1
            className="heading-display mt-5 text-white text-balance font-[family-name:var(--font-inter)]"
            style={{
              animation: "glp1FadeUp 0.65s cubic-bezier(0.16, 1, 0.3, 1) both",
              animationDelay: "110ms",
            }}
          >
            {hero.title}
          </h1>
          <p
            className="mx-auto mt-6 max-w-2xl text-xl leading-relaxed text-white"
            style={{
              animation: "glp1FadeUp 0.65s cubic-bezier(0.16, 1, 0.3, 1) both",
              animationDelay: "220ms",
            }}
          >
            {hero.subtitle}
          </p>
        <div
          className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row"
          style={{
            animation: "glp1FadeUp 0.65s cubic-bezier(0.16, 1, 0.3, 1) both",
            animationDelay: "330ms",
          }}
        >
          <Link
            href={INTAKE_HREF}
            prefetch={false}
            className="inline-flex items-center gap-2 rounded-full bg-gray-900 px-8 py-3 text-lg font-semibold text-white transition-colors duration-200 hover:bg-gray-800"
          >
            {hero.ctaLabel} →
          </Link>
          <a
            href="#faq"
            className="inline-flex items-center gap-1.5 rounded-full px-5 py-3 text-lg font-medium text-white underline decoration-white/40 underline-offset-4 transition-colors duration-200 hover:decoration-white"
          >
            {hero.secondaryLabel}
          </a>
          </div>
        </div>
      </div>
    </section>
  );
}
