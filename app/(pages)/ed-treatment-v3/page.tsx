import type { Metadata } from "next";
import { AnchorScrollFix } from "@/app/components/modules/home/AnchorScrollFix";
import { PageViewedEvent } from "@/app/components/modules/home/PageViewedEvent";
import { metadata as pageMeta } from "@/app/components/modules/ed-treatment-v3/content";
import { Header } from "@/app/components/modules/ed-treatment-v3/Header";
import {
  Compare,
  Engineered,
  Faq,
  FinalCta,
  Formula,
  Hero,
  Ready,
  SafetyAndDisclaimers,
  Steps,
  Testimonials,
  TrustBar,
  Why,
} from "@/app/components/modules/ed-treatment-v3/Sections";
import { SiteFooter } from "@/app/components/modules/ed-treatment-v3/SiteFooter";

export const metadata: Metadata = {
  /* absolute: the root layout's "%s | InstaRx" template would double the brand. */
  title: { absolute: pageMeta.title },
  description: pageMeta.description,
  openGraph: {
    title: pageMeta.title,
    description: pageMeta.description,
    url: "/ed-treatment-v3",
  },
};

export default function EdTreatmentV3() {
  return (
    <>
      <AnchorScrollFix />
      <PageViewedEvent pageName="ed-treatment-v3" />
      <Header />
      <main>
        <Hero />
        <TrustBar />
        <Ready />
        <Why />
        <Formula />
        <Engineered />
        <Compare />
        <Steps />
        <Testimonials />
        <Faq />
        <FinalCta />
      </main>
      <SafetyAndDisclaimers />
      <SiteFooter />
    </>
  );
}
