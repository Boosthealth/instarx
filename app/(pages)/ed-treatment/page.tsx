import type { Metadata } from "next";
import { Archivo, Public_Sans } from "next/font/google";
import { AnchorScrollFix } from "@/app/components/modules/home/AnchorScrollFix";
import { PageViewedEvent } from "@/app/components/modules/home/PageViewedEvent";
import { AnnounceBar } from "@/app/components/modules/ed-treatment/AnnounceBar";
import { Header } from "@/app/components/modules/ed-treatment/Header";
import { Hero } from "@/app/components/modules/ed-treatment/Hero";
import { FeaturedIn } from "@/app/components/modules/ed-treatment/FeaturedIn";
import { Problem } from "@/app/components/modules/ed-treatment/Problem";
import { Formula } from "@/app/components/modules/ed-treatment/Formula";
import { WhySublingual } from "@/app/components/modules/ed-treatment/WhySublingual";
import { Comparison } from "@/app/components/modules/ed-treatment/Comparison";
import { Transparency } from "@/app/components/modules/ed-treatment/Transparency";
import { Pricing } from "@/app/components/modules/ed-treatment/Pricing";
import { VideoReviews } from "@/app/components/modules/ed-treatment/VideoReviews";
import { HowItWorks } from "@/app/components/modules/ed-treatment/HowItWorks";
import { FAQ } from "@/app/components/modules/ed-treatment/FAQ";
import { FinalCTA } from "@/app/components/modules/ed-treatment/FinalCTA";
import { FloatingCTA } from "@/app/components/modules/ed-treatment/FloatingCTA";
import { Footer } from "@/app/components/modules/ed-treatment/Footer";
import { meta } from "@/app/components/modules/ed-treatment/content";
import "./ed-treatment.css";

// Semi-condensed heavy display (Archivo's wdth axis) + Public Sans body.
// Route-scoped via the `.ed` wrapper so the rest of the site keeps its fonts.
const display = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  display: "swap",
  variable: "--font-ed-display",
});

const body = Public_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-ed-body",
});

export const metadata: Metadata = {
  // Absolute: meta.title already carries the brand, so skip the root template.
  title: { absolute: meta.title },
  description: meta.description,
  openGraph: {
    title: meta.title,
    description: meta.description,
    url: "/ed-treatment",
  },
};

export default function EdTreatment() {
  return (
    <div className={`ed ${display.variable} ${body.variable}`}>
      <AnchorScrollFix />
      <PageViewedEvent pageName="ed-treatment" />
      <AnnounceBar />
      <Header />
      <main>
        <Hero />
        <FeaturedIn />
        <Problem />
        <Formula />
        <WhySublingual />
        <Comparison />
        <Transparency />
        <Pricing />
        <VideoReviews />
        <HowItWorks />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
      <FloatingCTA />
    </div>
  );
}
