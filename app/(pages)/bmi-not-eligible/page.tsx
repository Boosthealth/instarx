import type { Metadata } from "next";
import { PageViewedEvent } from "@/app/components/modules/home/PageViewedEvent";
import "./bmi-not-eligible.css";

export const metadata: Metadata = {
  title: "Weight Management Is Not Right for You",
  description:
    "GLP-1 weight management treatment is not a fit for a body mass index below 20. Please talk to your own healthcare provider about your health goals.",
  // Exit page for people who screen out of the intake flow. Keep it out of
  // search: it is not a landing page and must not compete for traffic.
  robots: { index: false, follow: false },
};

// Landing page for people who screen out of the intake flow with a BMI under
// 20. The embedded (Savvy/Embeddables) flow points its low-BMI exit here.
//
// This route is intentionally NOT in EMBEDDABLES_ROUTES: it renders no embedded
// flow, so OUR PostHog must load (via <AnalyticsScripts /> in the root layout)
// to make the rejection rate measurable. PageViewedEvent fires the same
// dataLayer page_viewed event the other first-party pages use.
export default function BmiNotEligiblePage() {
  return (
    <>
      <PageViewedEvent pageName="bmi-not-eligible" />
      <main className="bmi-page">
        <div className="bmi-inner">
          <h1 className="bmi-title">Weight Management Is Not Right for You</h1>
          <p className="bmi-body">
            Thank you for your answers. Your body mass index (BMI) is below 20,
            which is a healthy or lower weight range.
          </p>
          <p className="bmi-body">
            GLP-1 weight management medications treat adults with a BMI of 27 or
            higher. These medications are not safe or appropriate at your
            weight, so we cannot offer you this treatment.
          </p>
          <p className="bmi-body">
            Please talk to your own healthcare provider about your health goals.
          </p>
          <p className="bmi-contact">
            Do you have a question? Email us at{" "}
            <a href="mailto:patientcare@instarx.com">patientcare@instarx.com</a>
            .
          </p>
        </div>
      </main>
    </>
  );
}
