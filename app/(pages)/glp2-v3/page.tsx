import type { Metadata } from "next";
import { DM_Sans, Fraunces } from "next/font/google";
import { V2Footer } from "@/app/components/modules/glp2-v3/V2Footer";
import { AnchorScrollFix } from "@/app/components/modules/home/AnchorScrollFix";
import { PageViewedEvent } from "@/app/components/modules/home/PageViewedEvent";
import { AnnounceBar } from "@/app/components/modules/glp2-v3/AnnounceBar";
import { Header } from "@/app/components/modules/glp2-v3/Header";
import { Hero } from "@/app/components/modules/glp2-v3/Hero";
import { SprayDontStick } from "@/app/components/modules/glp2-v3/SprayDontStick";
import { HowItWorks } from "@/app/components/modules/glp2-v3/HowItWorks";
import { Medication } from "@/app/components/modules/glp2-v3/Medication";
import { Pricing } from "@/app/components/modules/glp2-v3/Pricing";
import { Process } from "@/app/components/modules/glp2-v3/Process";
import { Reviews } from "@/app/components/modules/glp2-v3/Reviews";
import { Difference } from "@/app/components/modules/glp2-v3/Difference";
import { FAQ } from "@/app/components/modules/glp2-v3/FAQ";
import { FinalCta } from "@/app/components/modules/glp2-v3/FinalCta";
import { FloatingCTA } from "@/app/components/modules/glp2-v3/FloatingCTA";
import { faqGroups } from "@/app/components/modules/glp2-v3/content";
import "./glp2-v3.css";

// Same house style as /glp2-v2 (that page is this build's named reference),
// loaded here and scoped via the `.v2` wrapper so the rest of the site keeps
// Figtree/Inter.
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
  "InstaRx - Needle-Free GLP-1 Tirzepatide Spray - $299/Month Flat";
const description =
  "Doctor-prescribed GLP-1 Tirzepatide in a needle-free transdermal spray. One flat $299/month price at every dose, delivered to your door. No injections, no insurance needed.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description, url: "/glp2-v3" },
};

// FAQPage structured data (S9, per the build sheet).
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqGroups.flatMap((group) =>
    group.items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  ),
};

export default function Glp2V3() {
  return (
    <div className={`v2 v2-grain ${fraunces.variable} ${dmSans.variable}`}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <AnchorScrollFix />
      <PageViewedEvent pageName="glp2-v3" />
      <AnnounceBar />
      <Header />
      <main>
        <Hero />
        <SprayDontStick />
        <HowItWorks />
        <Medication />
        <Pricing />
        <Process />
        <Reviews />
        <Difference />
        <FAQ />
        <FinalCta />
      </main>
      <V2Footer />
      <FloatingCTA />
    </div>
  );
}
