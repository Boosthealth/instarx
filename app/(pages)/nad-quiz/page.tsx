import type { Metadata } from "next";
import EmbeddablesScript from "../../components/EmbeddablesScript";

export const metadata: Metadata = {
  title: "NAD+ Anti Aging Quiz",
  description:
    "Take the InstaRx NAD+ Anti Aging quiz to find a personalized treatment plan and get started.",
  openGraph: {
    title: "NAD+ Anti Aging Quiz | InstaRx",
    description:
      "Take the InstaRx NAD+ Anti Aging quiz to find a personalized treatment plan and get started.",
    url: "/nad-quiz",
  },
};

export default function NadQuiz() {
  return (
    <>
      <EmbeddablesScript />
      <savvy id="flow_a5c71j78g8j6b5ic2a919bbg4"></savvy>
    </>
  );
}
