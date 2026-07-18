import type { Metadata } from "next";
import Header from "@/app/components/modules/glp1/Header";
import Disclaimer from "@/app/components/modules/glp1/Disclaimer";
import { ScrollReveal } from "@/app/components/modules/glp1/ScrollReveal";
import { Footer } from "@/app/components/Footer";
import { PageViewedEvent } from "@/app/components/modules/home/PageViewedEvent";
import Hero from "@/app/components/modules/glp1/how-it-works/Hero";
import Steps from "@/app/components/modules/glp1/how-it-works/Steps";
import Stats from "@/app/components/modules/glp1/how-it-works/Stats";
import Features from "@/app/components/modules/glp1/how-it-works/Features";
import Results from "@/app/components/modules/glp1/how-it-works/Results";
import FaqSection from "@/app/components/modules/glp1/how-it-works/FaqSection";
import CTA from "@/app/components/modules/glp1/how-it-works/CTA";

export const metadata: Metadata = {
  title: "How It Works",
  description:
    "See how InstaRx GLP-1 treatment works — from quiz to licensed provider review to medication at your door — plus answers to the questions patients ask most.",
  openGraph: {
    title: "How GLP-1 Treatment Works",
    description:
      "See how InstaRx GLP-1 treatment works — from quiz to licensed provider review to medication at your door — plus answers to the questions patients ask most.",
    url: "/glp1/how-it-works",
    siteName: "InstaRx",
    type: "website",
  },
};

export default function Glp1HowItWorks() {
  return (
    <>
      <PageViewedEvent pageName="GLP-1 How It Works" />
      <ScrollReveal />
      <Header />
      <main>
        <Hero />
        <Steps />
        <Stats />
        <Features />
        <Results />
        <FaqSection />
        <CTA />
        <Disclaimer />
      </main>
      <Footer />
    </>
  );
}
