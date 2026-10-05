import type { Metadata } from "next";
import { Footer as SiteFooter } from "@/app/components/Footer";
import { AnchorScrollFix } from "@/app/components/modules/home/AnchorScrollFix";
import { PageViewedEvent } from "@/app/components/modules/home/PageViewedEvent";
import { CompleteStack } from "@/app/components/modules/ed-treatment-v2/CompleteStack";
import { Delivered } from "@/app/components/modules/ed-treatment-v2/Delivered";
import { Engineered } from "@/app/components/modules/ed-treatment-v2/Engineered";
import { FinalCta } from "@/app/components/modules/ed-treatment-v2/FinalCta";
import { Footer as Disclaimers } from "@/app/components/modules/ed-treatment-v2/Footer";
import { Header } from "@/app/components/modules/ed-treatment-v2/Header";
import { OldWayNewWay } from "@/app/components/modules/ed-treatment-v2/OldWayNewWay";
import { PressWall } from "@/app/components/modules/ed-treatment-v2/PressWall";
import { Pricing } from "@/app/components/modules/ed-treatment-v2/Pricing";
import { Reviews } from "@/app/components/modules/ed-treatment-v2/Reviews";
import { Steps } from "@/app/components/modules/ed-treatment-v2/Steps";
import { StickyBar } from "@/app/components/modules/ed-treatment-v2/StickyBar";
import { VideoHero } from "@/app/components/modules/ed-treatment-v2/VideoHero";
import { metadata as pageMeta } from "@/app/components/modules/ed-treatment-v2/content";

export const metadata: Metadata = {
  /* absolute: the root layout's "%s | InstaRx" template would double the brand. */
  title: { absolute: pageMeta.title },
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
        <PressWall />
        <CompleteStack />
        <Engineered />
        <Delivered />
        <OldWayNewWay />
        <Pricing />
        <Steps />
        <Reviews />
        <FinalCta />
      </main>
      <Disclaimers />
      {/* Same footer as /glp2 (client, 2026-09-28). The wrapper pads for the
          sticky bar below 64rem so the bottom links stay reachable. */}
      <div className="edv2-site-footer">
        <SiteFooter />
      </div>
      <StickyBar />
    </>
  );
}
