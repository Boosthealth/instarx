import type { Metadata } from "next";
import EmbeddablesScript from "../../components/EmbeddablesScript";

export const metadata: Metadata = {
  title: "NAD+ Patient Intake",
  description:
    "Complete your InstaRx NAD+ patient intake form to get started with your personalized treatment plan.",
  openGraph: {
    title: "NAD+ Patient Intake | InstaRx",
    description:
      "Complete your InstaRx NAD+ patient intake form to get started with your personalized treatment plan.",
    url: "/nad_plus_intake",
  },
};

export default function NadPlusIntake() {
  return (
    <>
      <EmbeddablesScript />
      <savvy id="flow_a5c71j78g8j6b5ic2a919bbg4"></savvy>
    </>
  );
}
