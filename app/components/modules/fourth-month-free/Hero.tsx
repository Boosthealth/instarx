import Image from "next/image";
import { FreeLink, Price, TrustpilotStars } from "./display";
import { PlanTracker } from "./PlanTracker";
import { BTN_DARK, BTN_LIGHT } from "./buttons";
import { CtaLink } from "./ui";

const CHECK_ITEMS = [
  { icon: "clipboard-check.svg", text: <>Every 4th month is <FreeLink />, for as long as you stay with us.</> },
  { icon: "shield-check.svg", text: "Same price at every dose. No step-ups, ever." },
  { icon: "clipboard-list.svg", text: "Doctor visit & prescription included. No membership fee." },
  { icon: "truck.svg", text: "Free 1-2 day shipping, temperature-controlled." },
];

// Layout, gradient card and featured strip follow the /glp2 hero
// (app/components/modules/home/Hero.tsx) so the two pages read as one brand.
export function Hero({ startingAt }: { startingAt: number }) {
  return (
    <section className="sm:px-4" style={{ paddingTop: "var(--header-height)" }} data-track-section="hero">
      <div className="bg-gradient rounded-3xl sm:rounded-[48px] overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 text-gray-900">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center py-6 sm:py-14">
            <div>
              <TrustpilotStars className="mb-4" />
              <p className="inline-flex items-center gap-2 rounded-full bg-white/70 px-3 py-1 text-sm font-semibold mb-4">
                <span className="size-2 rounded-full bg-orange-600" aria-hidden="true" />
                Don&apos;t quit right before the breakthrough
              </p>
              <h1 className="text-4xl sm:text-6xl font-extrabold leading-[1.1] tracking-tight mb-4">
                Commit to weight loss. Get your 4th month <FreeLink />, forever.
              </h1>
              <p className="mb-4 max-w-md">
                Most weight-loss journeys stall in month 2, right before real results kick in. Lock in a
                4-month plan, quiet the food noise, and we cover month 4.
              </p>
              <p className="mb-5 sm:mb-6">
                Starting at <span className="text-2xl font-bold sm:text-3xl"><Price value={startingAt} />/mo</span>{" "}
                on a 4-month plan.{" "}
                <span className="font-semibold">No insurance needed. No hidden fees. No clinic visits.</span>
              </p>
              <ul className="space-y-2 mb-6 sm:mb-8">
                {CHECK_ITEMS.map((item) => (
                  <li key={item.icon} className="flex items-start gap-3">
                    <Image src={`/lose-weight/${item.icon}`} alt="" aria-hidden="true" width={24} height={24} className="shrink-0 mt-0.5" />
                    <span>{item.text}</span>
                  </li>
                ))}
              </ul>
              <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 mb-4">
                <CtaLink location="hero" data-hero-cta="" className={`${BTN_DARK} w-full sm:w-auto`}>
                  Claim My Free Month →
                </CtaLink>
                <a href="#plans" className={`${BTN_LIGHT} w-full sm:w-auto`}>See pricing</a>
              </div>
              <p className="text-center text-sm text-gray-700 sm:text-left">
                Zero Hidden Fees &nbsp;·&nbsp; Zero Monthly Membership &nbsp;·&nbsp; HSA/FSA Eligible
              </p>
            </div>

            <div className="relative mx-auto w-full sm:max-w-md lg:max-w-lg lg:mr-0">
              <Image
                src="/lose-weight/4th-month-free-hero.webp"
                alt="Smiling woman in a knit cardigan holding a coffee mug at home"
                width={1200}
                height={1200}
                sizes="(max-width: 640px) calc(100vw - 48px), (max-width: 1024px) 448px, 512px"
                className="w-full h-auto rounded-2xl object-cover"
                priority
              />
              <div className="absolute left-3 right-3 bottom-3 sm:left-auto sm:right-auto sm:-left-8 sm:bottom-8 sm:w-72 rounded-2xl bg-white p-4 shadow-lg">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-600 mb-3">Your 4-month plan</p>
                <PlanTracker />
                <p className="mt-3 text-sm text-gray-700">
                  Pay for 3. <span className="font-semibold text-gray-900">Month 4 is on us.*</span>
                </p>
              </div>
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
