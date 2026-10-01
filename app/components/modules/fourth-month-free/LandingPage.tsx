import { Footer } from "@/app/components/Footer";
import Header from "@/app/components/modules/home/Header";
import { AnchorScrollFix } from "@/app/components/modules/home/AnchorScrollFix";
import { Reviews } from "@/app/components/modules/home/Reviews";
import type { FAQItem, Offer } from "./types";
import { PageEffects } from "./PageEffects";
import { Hero } from "./Hero";
import { Trap } from "./Trap";
import { Science } from "./Science";
import { Journey } from "./Journey";
import { Plans } from "./Plans";
import { Results } from "./Results";
import { Comparison } from "./Comparison";
import { FAQ } from "./FAQ";
import { FinalCTA } from "./FinalCTA";
import { OfferTerms } from "./OfferTerms";
import { StickyOffer } from "./StickyOffer";
import { CTA_BASE_URL, PROMO } from "./ui";

// Shell (Header, Reviews, Footer) is shared with /glp2 so the page carries the same brand frame.
export function FourthMonthFreeLanding({ offer, faqs }: { offer: Offer; faqs: readonly FAQItem[] }) {
  return (
    <>
      <AnchorScrollFix />
      <PageEffects />
      <Header ctaHref={`${CTA_BASE_URL}?promo=${PROMO}`} />
      <main>
        <Hero startingAt={offer.sema.effectiveMonthly} />
        <Trap />
        <Science />
        <Journey />
        <Plans offer={offer} />
        <Results />
        <Reviews />
        <Comparison />
        <FAQ faqs={faqs} />
        <FinalCTA />
        <OfferTerms />
      </main>
      <Footer />
      <StickyOffer startingAt={offer.sema.effectiveMonthly} />
    </>
  );
}
