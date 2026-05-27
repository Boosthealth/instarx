import type { Metadata } from "next";
import Header from "@/app/components/modules/glp1/Header";
import Hero from "@/app/components/modules/glp1/Hero";
import Difference from "@/app/components/modules/glp1/Difference";
import Calculator from "@/app/components/modules/glp1/Calculator";
import FAQ from "@/app/components/modules/glp1/FAQ";
import Features from "@/app/components/modules/glp1/Features";
import CTA from "@/app/components/modules/glp1/CTA";
import Disclaimer from "@/app/components/modules/glp1/Disclaimer";
import { Footer } from "@/app/components/Footer";
import { PageViewedEvent } from "@/app/components/modules/home/PageViewedEvent";
import { ScrollReveal } from "@/app/components/modules/glp1/ScrollReveal";

export const metadata: Metadata = {
  title: "InstaRx - Lose Weight With GLP-1 Meds - Get Started For Just $199 | InstaRx",
  description:
    "InstaRx is a telehealth service that delivers personalized medicine right to your door. Specializing in weight loss, we provide treatments tailored to help you reach your health and body goals—all with the convenience of a fully online experience.",
  openGraph: {
    title: "InstaRx - Lose Weight With GLP-1 Meds - Get Started For Just $199",
    description:
      "InstaRx is a telehealth service that delivers personalized medicine right to your door. Specializing in weight loss, we provide treatments tailored to help you reach your health and body goals—all with the convenience of a fully online experience.",
    url: "/start-glp1",
    siteName: "InstaRx",
    type: "website",
  },
};

export default function StartGLP1() {
  return (
    <>
      <PageViewedEvent pageName="Start GLP-1" />
      <ScrollReveal />
      <Header />
      <main>
        <Hero />
        <Difference />
        <Calculator />
        <FAQ />
        <Features />
        <CTA />
        <Disclaimer />
      </main>
      <Footer />
    </>
  );
}
