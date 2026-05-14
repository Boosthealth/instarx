import type { Metadata } from "next";
import Intake01Form from "./Intake01Form";

export const metadata: Metadata = {
  title: "Patient Intake",
  description:
    "Complete your InstaRx patient intake form to get started with your personalized treatment plan.",
  openGraph: {
    title: "Patient Intake | InstaRx",
    description:
      "Complete your InstaRx patient intake form to get started with your personalized treatment plan.",
    url: "/intake01",
  },
};

export default function Intake01NewPage() {
  return <Intake01Form />;
}
