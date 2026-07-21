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
import { PageViewedEvent } from "@/app/components/modules/home/PageViewedEvent";

const CTA_HREF = "https://quiz.instarx.com/";

export const metadata: Metadata = {
  title: "InstaRx - Lose Weight With GLP-1 Meds - Get Started For Just $199",
  description:
    "InstaRx is a telehealth service that delivers personalized medicine right to your door. Specializing in weight loss, we provide treatments tailored to help you reach your health and body goals—all with the convenience of a fully online experience.",
  openGraph: {
    title: "InstaRx - Lose Weight With GLP-1 Meds - Get Started For Just $199",
    description:
      "InstaRx is a telehealth service that delivers personalized medicine right to your door. Specializing in weight loss, we provide treatments tailored to help you reach your health and body goals—all with the convenience of a fully online experience.",
    url: "/glp2-quiz",
  },
};

export default function Glp2Quiz() {
  return (
    <>
      <AnchorScrollFix />
      <PageViewedEvent pageName="glp2-quiz" />
      <Header ctaHref={CTA_HREF} />
      <main>
        <Hero ctaHref={CTA_HREF} />
        <Results ctaHref={CTA_HREF} />
        <VideoTestimonials ctaHref={CTA_HREF} />
        <HowItWorks />
        <Reviews />
        <Medications ctaHref={CTA_HREF} />
        <FAQ />
        <FinalCTA ctaHref={CTA_HREF} />
      </main>
      <Footer />
    </>
  );
}
