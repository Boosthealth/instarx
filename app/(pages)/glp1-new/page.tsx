import type { Metadata } from "next";
import PolicyLayout from "../../components/PolicyLayout";
import { Hero, HowHelp, CTA, Note, FAQ, Reviews } from "@/app/components/modules/glp1-weight-loss";

export const metadata: Metadata = {
  title: "GLP-1 Weight Loss Treatment",
  description:
    "Start your GLP-1 weight loss journey with InstaRx. Access affordable semaglutide and tirzepatide treatments with a personalized plan.",
  openGraph: {
    title: "GLP-1 Weight Loss Treatment | InstaRx",
    description:
      "Start your GLP-1 weight loss journey with InstaRx. Access affordable semaglutide and tirzepatide treatments with a personalized plan.",
    url: "/glp1-weight-loss",
  },
};

export default function GLP1NewPage() {
  return (
    <PolicyLayout contentWidth="full">
      <Hero />
      <HowHelp />
      <Reviews />
      <CTA />
      <FAQ />
      <Note />
    </PolicyLayout>
  );
}
