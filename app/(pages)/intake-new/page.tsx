import type { Metadata } from "next";
import IntakeNewForm from "./IntakeNewForm";

export const metadata: Metadata = {
  title: "Patient Intake",
  description:
    "Complete your InstaRx patient intake form to get started with your personalized treatment plan.",
  openGraph: {
    title: "Patient Intake | InstaRx",
    description:
      "Complete your InstaRx patient intake form to get started with your personalized treatment plan.",
    url: "/intake",
  },
};

export default function IntakeNewPage() {
  return <IntakeNewForm />;
}
