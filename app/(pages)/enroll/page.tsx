import type { Metadata } from "next";
import EmbeddablesScript from "../../components/EmbeddablesScript";

export const metadata: Metadata = {
  title: "Enroll",
  description:
    "Complete your InstaRx enrollment to find a personalized treatment plan and get started.",
  openGraph: {
    title: "Enroll | InstaRx",
    description:
      "Complete your InstaRx enrollment to find a personalized treatment plan and get started.",
    url: "/enroll",
  },
};

export default function Enroll() {
  return (
    <>
      <EmbeddablesScript />
      <savvy id="flow_d929bifdgb381hfgae3f95h86"></savvy>
    </>
  );
}
