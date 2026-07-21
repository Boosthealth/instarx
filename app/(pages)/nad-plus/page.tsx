import type { Metadata } from "next";
import { DM_Sans, Fraunces } from "next/font/google";
import { V2Footer } from "@/app/components/modules/nad-plus/V2Footer";
import { AnchorScrollFix } from "@/app/components/modules/home/AnchorScrollFix";
import { PageViewedEvent } from "@/app/components/modules/home/PageViewedEvent";
import { AnnounceBar } from "@/app/components/modules/nad-plus/AnnounceBar";
import { Header } from "@/app/components/modules/nad-plus/Header";
import { Hero } from "@/app/components/modules/nad-plus/Hero";
import { FeaturedIn } from "@/app/components/modules/nad-plus/FeaturedIn";
import { Benefits } from "@/app/components/modules/nad-plus/Benefits";
import { Mechanism } from "@/app/components/modules/nad-plus/Mechanism";
import { HowItWorks } from "@/app/components/modules/nad-plus/HowItWorks";
import { Comparison } from "@/app/components/modules/nad-plus/Comparison";
import { QualityTested } from "@/app/components/modules/nad-plus/QualityTested";
import { Reviews } from "@/app/components/modules/nad-plus/Reviews";
import { Community } from "@/app/components/modules/nad-plus/Community";
import { FAQ } from "@/app/components/modules/nad-plus/FAQ";
import { WhatAreYouWaitingFor } from "@/app/components/modules/nad-plus/WhatAreYouWaitingFor";
import { Ticker } from "@/app/components/modules/nad-plus/Ticker";
import { FloatingCTA } from "@/app/components/modules/nad-plus/FloatingCTA";
import "./nad-plus.css";

// Editorial/luxe-wellness type pairing — same house style as /glp2-v2 and
// /optin. Loaded here (not globally) and scoped via the `.v2` wrapper so the
// rest of the site keeps Figtree/Inter.
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
  "InstaRx - Start Aging Backwards With NAD+ - Starting at Just $99";
const description =
  "InstaRx delivers doctor-prescribed NAD+ injections to your door. Boost energy, sharpen memory, and support healthy aging with personalized, medically supervised treatment — 100% online, no insurance required.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description, url: "/nad-plus" },
};

export default function NadPlus() {
  return (
    <div className={`v2 v2-grain ${fraunces.variable} ${dmSans.variable}`}>
      <AnchorScrollFix />
      <PageViewedEvent pageName="nad-plus" />
      <AnnounceBar />
      <Header />
      <main>
        <Hero />
        <FeaturedIn />
        <Benefits />
        <Mechanism />
        <HowItWorks />
        <Comparison />
        <QualityTested />
        <Reviews />
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
