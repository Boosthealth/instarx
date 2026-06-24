import type { Metadata } from "next";
import { DM_Sans, Fraunces } from "next/font/google";
import { V2Footer } from "@/app/components/modules/glp2-v2/V2Footer";
import { AnchorScrollFix } from "@/app/components/modules/home/AnchorScrollFix";
import { PageViewedEvent } from "@/app/components/modules/home/PageViewedEvent";
import { AnnounceBar } from "@/app/components/modules/glp2-v2/AnnounceBar";
import { Header } from "@/app/components/modules/glp2-v2/Header";
import { Hero } from "@/app/components/modules/glp2-v2/Hero";
import { FeaturedIn } from "@/app/components/modules/glp2-v2/FeaturedIn";
import { Results } from "@/app/components/modules/glp2-v2/Results";
import { Calculator } from "@/app/components/modules/glp2-v2/Calculator";
import { Mechanism } from "@/app/components/modules/glp2-v2/Mechanism";
import { HowItWorks } from "@/app/components/modules/glp2-v2/HowItWorks";
import { Reviews } from "@/app/components/modules/glp2-v2/Reviews";
import { Medications } from "@/app/components/modules/glp2-v2/Medications";
import { PlanComparison } from "@/app/components/modules/glp2-v2/PlanComparison";
import { Community } from "@/app/components/modules/glp2-v2/Community";
import { FAQ } from "@/app/components/modules/glp2-v2/FAQ";
import { WhatAreYouWaitingFor } from "@/app/components/modules/glp2-v2/WhatAreYouWaitingFor";
import { Ticker } from "@/app/components/modules/glp2-v2/Ticker";
import { FloatingCTA } from "@/app/components/modules/glp2-v2/FloatingCTA";
import "./glp2-v2.css";

// Editorial/luxe-wellness type pairing — same house style as /optin. Loaded
// here (not globally) and scoped via the `.v2` wrapper so the rest of the site
// keeps Figtree/Inter.
const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-fraunces",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-dm-sans",
});

const title =
  "InstaRx - Lose Weight With GLP-1 Meds - Get Started For Just $199";
const description =
  "InstaRx is a telehealth service that delivers personalized medicine right to your door. Specializing in weight loss, we provide treatments tailored to help you reach your health and body goals—all with the convenience of a fully online experience.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description, url: "/glp2-v2" },
};

export default function Glp2V2() {
  return (
    <div className={`v2 v2-grain ${fraunces.variable} ${dmSans.variable}`}>
      <AnchorScrollFix />
      <PageViewedEvent pageName="glp2-v2" />
      <AnnounceBar />
      <Header />
      <main>
        <Hero />
        <FeaturedIn />
        <Results />
        <Calculator />
        <Mechanism />
        <HowItWorks />
        <Reviews />
        <Medications />
        <PlanComparison />
        <Community />
        <FAQ />
        <WhatAreYouWaitingFor />
        <Ticker />
      </main>
      <V2Footer />
      <FloatingCTA />
    </div>
  );
}
