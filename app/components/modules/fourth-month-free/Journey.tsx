import { TriangleAlert } from "lucide-react";
import { FreeLink } from "./display";
import { PlanTracker } from "./PlanTracker";
import { BTN_DARK } from "./buttons";
import { CtaLink } from "./ui";

const MONTHS: readonly { number: number; title: string; accent?: string; callout?: string; body: React.ReactNode; chips: readonly React.ReactNode[] }[] = [
  {
    number: 1,
    title: "The Warm-Up",
    body: "Your body is adjusting to the medication. The dose is low and results are modest, but the foundation is being laid. This is the phase most people underestimate.",
    chips: ["~2–4% loss", "Mild appetite shift", "Dose titrating up", "Building momentum", "Energy surge"],
  },
  {
    number: 2,
    title: "The Shift",
    accent: "(Don't Quit Here)",
    callout: "The Danger Zone. Most quit at 2.5 months, mistaking the biological loading phase for failure. Stay the course. Your body is still catching up.",
    body: "Side effects may peak here. Progress can feel slow. Your brain is rewiring its relationship with food. This discomfort is a signal you're on the edge of a breakthrough, not a reason to stop.",
    chips: ["~5–8% loss", "Food noise quieting", "Cravings reducing", "Dose increasing", "Breakthrough near"],
  },
  {
    number: 3,
    title: "Dialed in. Weight dropping.",
    body: "You are finally back in the driver's seat. The \"food noise\" is gone, hunger doesn't control you, and your body is shifting toward sustainable weight loss. The scale finally matches how you feel.",
    chips: ["~11–16% loss", "Noticeable weight loss", "Energy surge", "Food noise silenced", "Medication taking hold"],
  },
  {
    number: 4,
    title: "The Reward",
    accent: "(We Pay)",
    body: <>You&apos;ve hit peak momentum and your habits are locked in. We&apos;re paying for this month because we believe in your success. The best part? Every 4th month is <FreeLink>free!*</FreeLink> You keep crushing it, and we&apos;ll keep paying.</>,
    chips: [<FreeLink key="free">$0 — FREE*</FreeLink>, "Momentum locked in", "Habits formed", "Results compounding", "Fully covered"],
  },
];

// Same structure as the /glp2 HowItWorks timeline: orange step labels over a divide-y list.
export function Journey() {
  return (
    <section className="bg-white py-16 px-4 sm:px-6 lg:py-24" id="how-it-works" data-track-section="journey">
      <div className="max-w-7xl mx-auto grid gap-10 lg:grid-cols-[1fr_380px] lg:gap-16">
        <div>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-balance text-gray-900 leading-tight mb-4">
            What you&apos;ll feel, month by month
          </h2>
          <p className="text-lg text-gray-700 text-pretty mb-10 md:text-xl">
            Understanding the timeline is the difference between quitting and transforming. Here&apos;s exactly what to expect.
          </p>
          <ol className="divide-y divide-gray-200 border-t border-gray-200">
            {MONTHS.map((month) => (
              <li key={month.number} className="py-8 md:grid md:grid-cols-[140px_1fr] md:gap-8">
                <p className="text-orange-700 font-semibold mb-2 md:text-lg">Month {month.number}</p>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 md:text-3xl">
                    {month.title} {month.accent && <span className="text-gray-500 font-semibold">{month.accent}</span>}
                  </h3>
                  {month.callout && (
                    <p className="flex gap-3 rounded-2xl bg-orange-50 p-4 mb-4 text-orange-900">
                      <TriangleAlert className="size-5 shrink-0 mt-0.5 text-orange-700" aria-hidden="true" />
                      <span>{month.callout}</span>
                    </p>
                  )}
                  <p className="text-gray-700 leading-relaxed mb-4">{month.body}</p>
                  <ul className="flex flex-wrap gap-2">
                    {month.chips.map((chip, i) => (
                      <li
                        key={i}
                        className={`rounded-full px-3 py-1 text-sm ${i === 0 ? "bg-gradient font-bold text-gray-900" : "bg-gray-100 text-gray-700"}`}
                      >
                        {chip}
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ol>
        </div>
        <aside className="lg:pt-32">
          <div className="lg:sticky lg:top-[calc(var(--header-height)+24px)] rounded-3xl bg-linear-to-br from-purple-100 via-pink-100 to-yellow-100 p-6 md:p-8">
            <p className="text-3xl font-bold tracking-tight text-balance text-gray-900 mb-5">Pay for 3. Month 4 is on us.*</p>
            <div className="rounded-2xl bg-white p-4 mb-5">
              <PlanTracker size="large" />
            </div>
            <p className="text-gray-700 mb-6">And it repeats: every 4th month is <FreeLink />, for as long as you stay.</p>
            <CtaLink location="journey" className={`${BTN_DARK} w-full`}>
              Claim My Free Month →
            </CtaLink>
          </div>
        </aside>
      </div>
    </section>
  );
}
