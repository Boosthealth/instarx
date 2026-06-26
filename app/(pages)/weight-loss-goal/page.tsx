import type { Metadata } from "next";
import { PageViewedEvent } from "@/app/components/modules/home/PageViewedEvent";
import WeightLossGoalButtons from "./WeightLossGoalButtons";
import "./weight-loss-goal.css";

export const metadata: Metadata = {
  title: "What Is Your Weight Loss Goal?",
  description:
    "Take a quick 5-minute quiz to see if you qualify for personalized GLP-1 weight loss treatment from InstaRx.",
  openGraph: {
    title: "What Is Your Weight Loss Goal?",
    description:
      "Take a quick 5-minute quiz to see if you qualify for personalized GLP-1 weight loss treatment from InstaRx.",
    url: "/weight-loss-goal",
  },
  // Paid-traffic direct-link pre-lander, like /optin — keep it out of search.
  robots: { index: false, follow: false },
};

export default function WeightLossGoalPage() {
  return (
    <>
      {/* GTM + PostHog load globally from the root layout's <AnalyticsScripts />.
          This route is intentionally NOT in EMBEDDABLES_ROUTES, so OUR PostHog
          fires here just like on /glp2. */}
      <PageViewedEvent pageName="weight-loss-goal" />
      <main className="wlg-page">
        <div className="wlg-inner">
          <h1 className="wlg-title">What Is Your Weight Loss Goal?</h1>
          <p className="wlg-sub">
            On the next page, you will take a 5-minute quiz to see if you
            qualify.
          </p>
          <WeightLossGoalButtons />
        </div>
      </main>
    </>
  );
}
