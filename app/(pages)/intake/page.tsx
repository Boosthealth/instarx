import type { Metadata } from "next";
import EmbeddablesScript from "../../components/EmbeddablesScript";

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

export default function Intake() {
  return (
    <>
      <EmbeddablesScript />
      <savvy id="flow_7b06ch6be62dbf2f5j814i083"></savvy>
    </>
  );
}
