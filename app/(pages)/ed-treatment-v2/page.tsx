import type { Metadata } from "next";
import { AnchorScrollFix } from "@/app/components/modules/home/AnchorScrollFix";
import { PageViewedEvent } from "@/app/components/modules/home/PageViewedEvent";
import { CompleteStack } from "@/app/components/modules/ed-treatment-v2/CompleteStack";
import { Delivered } from "@/app/components/modules/ed-treatment-v2/Delivered";
import { Engineered } from "@/app/components/modules/ed-treatment-v2/Engineered";
import { FinalCta } from "@/app/components/modules/ed-treatment-v2/FinalCta";
import { Footer } from "@/app/components/modules/ed-treatment-v2/Footer";
import { Header } from "@/app/components/modules/ed-treatment-v2/Header";
import { OldWayNewWay } from "@/app/components/modules/ed-treatment-v2/OldWayNewWay";
import { Pricing } from "@/app/components/modules/ed-treatment-v2/Pricing";
import { Reviews } from "@/app/components/modules/ed-treatment-v2/Reviews";
import { Steps } from "@/app/components/modules/ed-treatment-v2/Steps";
import { StickyBar } from "@/app/components/modules/ed-treatment-v2/StickyBar";
import { VideoHero } from "@/app/components/modules/ed-treatment-v2/VideoHero";
import { metadata as pageMeta } from "@/app/components/modules/ed-treatment-v2/content";

export const metadata: Metadata = {
  title: pageMeta.title,
  description: pageMeta.description,
  openGraph: {
    title: pageMeta.title,
    description: pageMeta.description,
    url: "/ed-treatment-v2",
  },
};

export default function EdTreatmentV2() {
  return (
    <>
      <AnchorScrollFix />
      <PageViewedEvent pageName="ed-treatment-v2" />
      <Header />
      <main>
        <VideoHero />
        <CompleteStack />
        <Engineered />
        <Delivered />
        <OldWayNewWay />
        <Pricing />
        <Steps />
        <Reviews />
        <FinalCta />
      </main>
      <Footer />
      <StickyBar />
    </>
  );
}
