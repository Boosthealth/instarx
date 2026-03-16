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
      <savvy id="flow_539idb331d11ddf89j111hd4ie"></savvy>
    </>
  );
}
