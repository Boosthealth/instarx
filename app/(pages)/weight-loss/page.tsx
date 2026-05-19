import type { Metadata } from "next";
import Header from "@/app/components/modules/home/Header";
import Hero from "@/app/components/modules/home/Hero";
import Results from "@/app/components/modules/home/Results";
import { VideoTestimonials } from "@/app/components/modules/home/VideoTestimonials";
import { HowItWorks } from "@/app/components/modules/home/HowItWorks";
import { Reviews } from "@/app/components/modules/home/Reviews";
import { Medications } from "@/app/components/modules/home/Medications";
import { FAQ } from "@/app/components/modules/home/FAQ";
import { FinalCTA } from "@/app/components/modules/home/FinalCTA";
import { Footer } from "@/app/components/Footer";
import { AnchorScrollFix } from "@/app/components/modules/home/AnchorScrollFix";

export const metadata: Metadata = {
  title: "InstaRx - Lose Weight With GLP-1 Meds - Get Started For Just $199",
  description:
    "InstaRx is a telehealth service that delivers personalized medicine right to your door. Specializing in weight loss, we provide treatments tailored to help you reach your health and body goals—all with the convenience of a fully online experience.",
  openGraph: {
    title: "InstaRx - Lose Weight With GLP-1 Meds - Get Started For Just $199",
    description:
      "InstaRx is a telehealth service that delivers personalized medicine right to your door. Specializing in weight loss, we provide treatments tailored to help you reach your health and body goals—all with the convenience of a fully online experience.",
    url: "/weight-loss",
  },
};

export default function WeightLoss() {
  return (
    <>
      <AnchorScrollFix />
      <Header />
      <main>
        <Hero />
        <Results />
        <VideoTestimonials />
        <HowItWorks />
        <Reviews />
        <Medications />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
