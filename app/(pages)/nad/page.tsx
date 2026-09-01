import type { Metadata } from "next";
import EmbeddablesScript from "../../components/EmbeddablesScript";

// Embeddables (Savvy) NAD+ intake flow. This route is listed in
// EMBEDDABLES_ROUTES in app/components/AnalyticsScripts.tsx so our PostHog
// stays off here (the embed runs its own); GTM still loads via the root layout.
export const metadata: Metadata = {
  title: "NAD+ Intake",
  description:
    "Complete your InstaRx NAD+ intake form to get started with your personalized, doctor-prescribed treatment plan.",
  openGraph: {
    title: "NAD+ Intake | InstaRx",
    description:
      "Complete your InstaRx NAD+ intake form to get started with your personalized, doctor-prescribed treatment plan.",
    url: "/nad",
  },
};

export default function NadIntake() {
  return (
    <>
      <EmbeddablesScript />
      <savvy id="flow_14e739ic4d07j8588cb1baef6"></savvy>
    </>
  );
}
