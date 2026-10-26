import type { Metadata } from "next";
import Header from "@/app/components/modules/home/Header";
import { Footer } from "@/app/components/Footer";
import { AnchorScrollFix } from "@/app/components/modules/home/AnchorScrollFix";
import { PageViewedEvent } from "@/app/components/modules/home/PageViewedEvent";
import {
  INTAKE_HREF,
  faq,
  metadata as pageMeta,
  navLinks,
} from "@/app/components/modules/sleep-apnea/content";
import { PageEffects } from "@/app/components/modules/sleep-apnea/PageEffects";
import {
  Callout,
  Disclaimers,
  Expectations,
  Faq,
  FinalCta,
  Fit,
  Hero,
  HowItWorks,
  Pricing,
  Problem,
  Science,
  TrustBar,
} from "@/app/components/modules/sleep-apnea/Sections";

export const metadata: Metadata = {
  /* absolute: the root layout's "%s | InstaRx" template would double the brand. */
  title: { absolute: pageMeta.title },
  description: pageMeta.description,
  openGraph: {
    title: pageMeta.title,
    description: pageMeta.description,
    type: "website",
    url: "/sleep-apnea",
    images: [{ url: pageMeta.ogImage, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: pageMeta.title,
    description: pageMeta.description,
    images: [pageMeta.ogImage],
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faq.items.slice(0, faq.jsonLdCount).map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
};

export default function SleepApnea() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <AnchorScrollFix />
      <PageViewedEvent pageName="sleep-apnea" />
      <PageEffects />
      <Header ctaHref={INTAKE_HREF} links={[...navLinks]} />
      <main>
        <Hero />
        <TrustBar />
        <Problem />
        <Science />
        <Expectations />
        <HowItWorks />
        <Pricing />
        <Fit />
        <Callout />
        <Faq />
        <FinalCta />
      </main>
      <Disclaimers />
      <Footer />
    </>
  );
}
