import type { Metadata } from "next";
import EmbeddablesScript from "../components/EmbeddablesScript";

export const metadata: Metadata = {
  title: "InstaRx - Lose Weight With GLP-1 Meds - Get Started For Just $199",
  description:
    "InstaRx is a telehealth service that delivers personalized medicine right to your door. Specializing in weight loss, we provide treatments tailored to help you reach your health and body goals—all with the convenience of a fully online experience.",
  openGraph: {
    title: "InstaRx - Lose Weight With GLP-1 Meds - Get Started For Just $199",
    description:
      "InstaRx is a telehealth service that delivers personalized medicine right to your door. Specializing in weight loss, we provide treatments tailored to help you reach your health and body goals—all with the convenience of a fully online experience.",
    url: "/",
  },
};

export default function Home() {
  return (
    <>
      <EmbeddablesScript />
      <savvy id="flow_a22jeg0agf2ch469bbf95406"></savvy>
    </>
  );
}
