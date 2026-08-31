import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/app/components/modules/home/Header";
import Hero from "@/app/components/modules/home/Hero";
import Results from "@/app/components/modules/home/Results";
import { VideoTestimonials } from "@/app/components/modules/home/VideoTestimonials";
import { HowItWorks } from "@/app/components/modules/home/HowItWorks";
import { Reviews } from "@/app/components/modules/home/Reviews";
import { Medications } from "@/app/components/modules/home/Medications";
import { FAQ } from "@/app/components/modules/home/FAQ";
import { FinalCTA } from "@/app/components/modules/home/FinalCTA";
import { Footer } from "@/app/components/Footer";
import { AnchorScrollFix } from "@/app/components/modules/home/AnchorScrollFix";
import { PageViewedEvent } from "@/app/components/modules/home/PageViewedEvent";
import { LanderSplitEvent } from "@/app/components/LanderSplitEvent";
import { LANDERS } from "@/app/lib/landers";

/**
 * Message-matched ad landers — the "new" arm of the /glp2 lander split.
 *
 * Ad traffic never navigates here by URL: ads keep their final URL
 * (go.instarx.com/glp2 + `lp=<slug>` suffix) and proxy.ts REWRITES bucketed
 * visitors to this route, so the address bar still shows /glp2?lp=…. The pages
 * are statically generated (one per LANDERS entry) so the rewrite serves
 * prerendered HTML with zero flicker. Only the hero copy differs from /glp2 —
 * everything below it is the same shared modules.
 *
 * noindex: these are paid-traffic pages that duplicate /glp2; keeping them out
 * of the organic index avoids duplicate-content dilution. AdsBot ignores the
 * robots meta, so Google Ads destination review is unaffected.
 */

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(LANDERS).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const lander = LANDERS[slug];
  if (!lander) return {};
  return {
    title: lander.title,
    description: lander.description,
    robots: { index: false, follow: false },
    openGraph: {
      title: lander.title,
      description: lander.description,
      url: `/glp2?lp=${slug}`,
    },
  };
}

export default async function Glp2Lander({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const lander = LANDERS[slug];
  if (!lander) notFound();

  return (
    <>
      <AnchorScrollFix />
      <PageViewedEvent pageName={`glp2-lp-${slug}`} />
      <LanderSplitEvent />
      <Header />
      <main>
        <Hero lander={lander} />
        <Results />
        <VideoTestimonials />
        <HowItWorks />
        <Reviews />
        <Medications />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
