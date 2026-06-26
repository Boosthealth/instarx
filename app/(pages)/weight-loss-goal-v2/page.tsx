import type { Metadata } from "next";
import { PageViewedEvent } from "@/app/components/modules/home/PageViewedEvent";
import GoalButtons from "./GoalButtons";

export const metadata: Metadata = {
  title: "What Is Your Weight Loss Goal?",
  description:
    "Take a quick 5-minute quiz to see if you qualify for personalized GLP-1 weight loss treatment from InstaRx.",
  openGraph: {
    title: "What Is Your Weight Loss Goal?",
    description:
      "Take a quick 5-minute quiz to see if you qualify for personalized GLP-1 weight loss treatment from InstaRx.",
    url: "/weight-loss-goal-v2",
  },
  // Paid-traffic direct-link pre-lander, like /optin — keep it out of search.
  // Also avoids duplicate-content competition with /weight-loss-goal.
  robots: { index: false, follow: false },
};

// v2 of the /weight-loss-goal pre-lander, restyled to match the /glp2 lander:
// the same lavender→pink→yellow `.bg-gradient` (full-bleed, no card), Figtree
// font (global default from the root layout), and extrabold tracking-tight
// headings. GTM + PostHog load globally from <AnalyticsScripts /> in the root
// layout; this route is intentionally NOT in EMBEDDABLES_ROUTES so OUR PostHog
// fires here just like on /glp2.
export default function WeightLossGoalV2Page() {
  return (
    <>
      <PageViewedEvent pageName="weight-loss-goal-v2" />
      <main className="bg-gradient min-h-[100svh] flex items-center">
        <div className="max-w-3xl mx-auto px-6 py-12 sm:py-20 text-gray-900 w-full">
          <h1 className="text-4xl sm:text-6xl font-extrabold leading-[1.1] tracking-tight text-center mb-4">
            What Is Your
            <br />
            Weight Loss Goal?
          </h1>
          <p className="text-center text-base sm:text-lg font-semibold text-gray-700 max-w-md mx-auto mb-10">
            On the next page, you will take a 5-minute quiz to see if you
            qualify.
          </p>

          <GoalButtons />
        </div>
      </main>
    </>
  );
}
