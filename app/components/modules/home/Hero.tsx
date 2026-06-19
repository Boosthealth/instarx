import type { ReactNode } from "react";
import Image from "next/image";
import { Button } from "./Button";
import type { WeightLossHeroVariant } from "@/app/lib/experiments";

// A/B test content keyed by Convert variation. `control` renders the original
// hero verbatim; `variation_1` swaps the headline and primary CTA label.
const HERO_CONTENT: Record<
  WeightLossHeroVariant,
  { headline: ReactNode; primaryCta: string }
> = {
  control: {
    headline: (
      <>
        Drop up to 1-2lbs
        <br />
        per week!
      </>
    ),
    primaryCta: "Start Quiz →",
  },
  variation_1: {
    headline: (
      <>
        Doctor-prescribed GLP-1,
        <br />
        delivered to your door
      </>
    ),
    primaryCta: "Get Started →",
  },
};

function StarBox({ fill = 1 }: { fill?: number }) {
  const pct = `${Math.round(fill * 100)}%`;
  return (
    <span className="relative inline-flex items-center justify-center w-5 h-5 overflow-hidden" style={{ backgroundColor: "#dcdce0" }}>
      <span className="absolute inset-0" style={{ backgroundColor: "#00b67a", width: pct }} />
      <svg width="12" height="12" viewBox="0 0 24 24" fill="white" aria-hidden="true" className="relative z-10">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    </span>
  );
}

function TrustpilotStars({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-wrap items-center gap-x-2 gap-y-1 mb-4 ${className}`.trim()}>
      <span className="text-sm font-bold text-gray-900">Excellent 4.7</span>
      <div className="flex items-center gap-0.5" role="img" aria-label="4.7 out of 5 stars">
        <StarBox fill={1} />
        <StarBox fill={1} />
        <StarBox fill={1} />
        <StarBox fill={1} />
        <StarBox fill={0.7} />
      </div>
      <span className="text-sm text-gray-500">10,000+ happy customers</span>
    </div>
  );
}

const checkItems = [
  { icon: "clipboard-check.svg", text: "100% online doctor visits. Semaglutide or Tirzepatide, your choice." },
  { icon: "clipboard-list.svg", text: "Tailored visit & prescription included. HSA/FSA accepted." },
  { icon: "shield-check.svg", text: "Same price, every dose." },
  { icon: "truck.svg", text: "Free 1-2 day shipping, temperature-controlled." },
];

export default function Hero({
  variant = "control",
  layout = "default",
}: {
  variant?: WeightLossHeroVariant;
  layout?: "default" | "a" | "b" | "d" | "c2";
}) {
  const content = HERO_CONTENT[variant];
  const isVariant = layout !== "default";
  // b is the only variant that places the mobile CTA above the price paragraph.
  const ctaAbovePrice = layout === "b";

  // Mobile-only modifiers for the variant layouts; all resolve back to the
  // original rendering at the `sm:` breakpoint so desktop stays identical.
  // Only d and c2 center the upper block on mobile; a and b stay left-aligned.
  const mobileCenter = layout === "d" || layout === "c2" ? "text-center sm:text-left" : "";
  const ledeClasses =
    layout === "c2"
      ? "hidden sm:block" // C2 drops the 17% lede on mobile, keeps it on desktop
      : layout === "d"
        ? "text-center sm:text-left mx-auto sm:mx-0"
        : "";
  const priceClasses =
    layout === "c2"
      ? "hidden sm:block" // desktop keeps the inline guarantees; mobile uses the stacked, reordered version below
      : layout === "d"
        ? "text-center sm:text-left"
        : "";

  // Single full-width CTA shown on mobile for every variant; its slot in the
  // flow differs (above vs below the price), so render it from one definition.
  const mobileCta = (
    <div className="mb-6 sm:hidden">
      <Button
        href="https://go.instarx.com/intake"
        text="Find your treatment →"
        className="w-full"
      />
      <p className="mt-4 text-center text-sm text-gray-700">
        Zero Hidden Fees &nbsp;·&nbsp; Zero Monthly Membership &nbsp;·&nbsp; Cancel Anytime
      </p>
    </div>
  );

  return (
    <section className="sm:px-4" style={{ paddingTop: "var(--header-height)" }}>
      {/* Gradient card */}
      <div className="bg-gradient rounded-3xl sm:rounded-[48px] overflow-hidden">
        <div
          className="max-w-7xl mx-auto px-6 text-gray-900"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center py-5 sm:py-14">

            {/* Left: text */}
            <div>
              <TrustpilotStars className={layout === "c2" ? "justify-center sm:justify-start" : ""} />

              <h1 className={`text-4xl sm:text-6xl font-extrabold leading-[1.1] tracking-tight mb-4 ${mobileCenter}`.trim()}>
                {content.headline}
              </h1>
              {/* Lede: C2 removes it on mobile only (desktop keeps it verbatim). */}
              <p className={`mb-4 max-w-md ${ledeClasses}`.trim()}>
                Lose up to 17%* of your body weight with prescription GLP‑1.
              </p>
              {/* Variant B: CTA sits above the price paragraph on mobile. */}
              {ctaAbovePrice && mobileCta}
              {/* C2: stacked, centered guarantees on mobile only. */}
              {layout === "c2" && (
                <p className="mb-5 text-center sm:hidden">
                  Starting at{" "}
                  <span className="text-2xl font-bold">$148</span>
                  {" "}— Doctor-prescribed GLP‑1, delivered in 1-2 days.{" "}
                  <span className="font-semibold">
                    <span className="block">No insurance needed.</span>
                    <span className="block">No clinic visits.</span>
                    <span className="block">No hidden fees.</span>
                  </span>
                </p>
              )}
              {/* Default/D price paragraph; for C2 this is the desktop-only inline copy (mobile uses the reordered stacked version above). */}
              <p className={`mb-5 sm:mb-6 ${priceClasses}`.trim()}>
                Starting at{" "}
                <span className="text-2xl font-bold sm:text-3xl">$148</span>
                {" "}— Doctor-prescribed GLP‑1, delivered in 1-2 days.{" "}
                <span className="font-semibold">No insurance needed. No hidden fees. No clinic visits.</span>
              </p>
              {/* All variants except B place the CTA below the price paragraph. */}
              {isVariant && !ctaAbovePrice && mobileCta}
              <ul className="space-y-2 mb-6 sm:mb-8">
                {checkItems.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Image
                      src={`/lose-weight/${item.icon}`}
                      alt=""
                      aria-hidden="true"
                      width={24}
                      height={24}
                      className="shrink-0 mt-0.5"
                    />
                    <span>{item.text}</span>
                  </li>
                ))}
              </ul>
              <div
                className={`flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-4 sm:justify-start${
                  isVariant ? " hidden sm:flex" : ""
                }`}
              >
                <Button href="https://go.instarx.com/intake" text={content.primaryCta} className="w-full sm:w-auto" />
                <Button href="https://go.instarx.com/intake" text="See pricing" color="light" className="w-full sm:w-auto" />
              </div>
              <p
                className={`text-center text-sm text-gray-700 sm:text-left${
                  isVariant ? " hidden sm:block" : ""
                }`}
              >
                Zero Hidden Fees &nbsp;·&nbsp; Zero Monthly Membership &nbsp;·&nbsp; Cancel Anytime
              </p>
            </div>

            {/* Right: image */}
            <div className="flex justify-center rounded-2xl overflow-hidden lg:justify-end">
              <Image
                src="/lose-weight/hero-lady.webp"
                alt="Woman achieving her weight loss goals with InstaRx GLP-1 medication"
                width={540}
                height={514}
                sizes="(max-width: 640px) calc(100vw - 48px), (max-width: 1024px) 448px, 512px"
                className="object-cover w-full rounded-2xl sm:max-w-md lg:max-w-lg"
                priority
              />
            </div>

          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 pt-6 pb-2">
        <p className="text-center text-xs uppercase tracking-[0.2em] text-gray-700 mb-4 font-medium sm:mb-6">
          we&apos;ve been featured all over
        </p>
        <div className="flex justify-center">
          <Image
            src="/lose-weight/seen-on-desktop.webp"
            alt="As seen in: OK!, BalancingAct, Woman's World, LA Weekly, Lifetime, Health"
            width={720}
            height={48}
            sizes="(max-width: 1280px) 80vw, 720px"
            className="hidden w-[80%] sm:block object-contain"
          />
          <Image
            src="/lose-weight/seen-on-mobile.webp"
            alt="As seen in: OK!, BalancingAct, Woman's World, LA Weekly, Lifetime, Health"
            width={340}
            height={80}
            sizes="100vw"
            className="w-full sm:hidden object-contain"
          />
        </div>
      </div>
    </section>
  );
}
