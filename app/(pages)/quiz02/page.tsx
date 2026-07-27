import type { Metadata } from "next";
import EmbeddablesScript from "../../components/EmbeddablesScript";

export const metadata: Metadata = {
  title: "GLP-1 Weight Loss Quiz",
  description:
    "Take the InstaRx GLP-1 Weight Loss quiz to find a personalized treatment plan and get started.",
  openGraph: {
    title: "GLP-1 Weight Loss Quiz | InstaRx",
    description:
      "Take the InstaRx GLP-1 Weight Loss quiz to find a personalized treatment plan and get started.",
    url: "/quiz02",
  },
};

export default function Quiz02() {
  return (
    <>
      <EmbeddablesScript />
      <savvy id="flow_d929bifdgb381hfgae3f95h86"></savvy>
    </>
  );
}
