import type { Metadata } from "next";
import { DM_Sans, Fraunces } from "next/font/google";
import { AnchorScrollFix } from "@/app/components/modules/home/AnchorScrollFix";
import { PageViewedEvent } from "@/app/components/modules/home/PageViewedEvent";
import { AnnounceBar } from "@/app/components/modules/partner/AnnounceBar";
import { Header } from "@/app/components/modules/partner/Header";
import { Hero } from "@/app/components/modules/partner/Hero";
import { WhyPartner } from "@/app/components/modules/partner/WhyPartner";
import { Programs } from "@/app/components/modules/partner/Programs";
import { Promote } from "@/app/components/modules/partner/Promote";
import { FAQ } from "@/app/components/modules/partner/FAQ";
import { ClosingCTA } from "@/app/components/modules/partner/ClosingCTA";
import { Ticker } from "@/app/components/modules/partner/Ticker";
import { FloatingCTA } from "@/app/components/modules/partner/FloatingCTA";
import { V2Footer } from "@/app/components/modules/partner/V2Footer";
import "./partner.css";

// Editorial/luxe-wellness type pairing — same house style as /glp2-v2 and
// /nad-plus. Loaded here (not globally) and scoped via the `.v2` wrapper so
// the rest of the site keeps Figtree/Inter.
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

const title = "Partner with InstaRx — Affiliates, Partners & Brand Ambassadors";
const description =
  "Turn your audience's health goals into results — and get rewarded for it. Partner with InstaRx: doctor-backed GLP-1 treatments, anti-aging care, and intimacy solutions, delivered 100% online with free, discreet shipping.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description, url: "/partner" },
};

export default function Partner() {
  return (
    <div className={`v2 v2-grain ${fraunces.variable} ${dmSans.variable}`}>
      <AnchorScrollFix />
      <PageViewedEvent pageName="partner" />
      <AnnounceBar />
      <Header />
      <main>
        <Hero />
        <WhyPartner />
        <Programs />
        <Promote />
        <FAQ />
        <ClosingCTA />
        <Ticker />
      </main>
      <V2Footer />
      <FloatingCTA />
    </div>
  );
}
