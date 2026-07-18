import Link from "next/link";
import { hero, INTAKE_HREF } from "./content";

export default function Hero() {
  return (
    <section
      className="px-6 pb-8 sm:pb-10"
      style={{ paddingTop: "calc(var(--header-height) + 1.5rem)" }}
    >
      <div
        className="max-w-7xl mx-auto rounded-3xl px-8 sm:px-14 py-16 sm:py-24 text-center"
        style={{ background: "var(--glp1-hero-gradient)" }}
      >
        <p
          className="text-sm font-semibold uppercase tracking-[0.18em] text-white/90"
          style={{ animation: "glp1FadeUp 0.65s cubic-bezier(0.16, 1, 0.3, 1) both" }}
        >
          {hero.eyebrow}
        </p>
        <h1
          className="heading-display mt-5 text-white font-[family-name:var(--font-inter)]"
          style={{
            animation: "glp1FadeUp 0.65s cubic-bezier(0.16, 1, 0.3, 1) both",
            animationDelay: "110ms",
          }}
        >
          {hero.title}
        </h1>
        <p
          className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/90"
          style={{
            animation: "glp1FadeUp 0.65s cubic-bezier(0.16, 1, 0.3, 1) both",
            animationDelay: "220ms",
          }}
        >
          {hero.subtitle}
        </p>
        <div
          style={{
            animation: "glp1FadeUp 0.65s cubic-bezier(0.16, 1, 0.3, 1) both",
            animationDelay: "330ms",
          }}
        >
          <Link
            href={INTAKE_HREF}
            prefetch={false}
            className="mt-9 inline-flex items-center gap-2 rounded-full bg-gray-900 px-8 py-3 text-lg font-semibold text-white transition-colors duration-200 hover:bg-gray-800"
          >
            {hero.ctaLabel} →
          </Link>
        </div>
      </div>
    </section>
  );
}
