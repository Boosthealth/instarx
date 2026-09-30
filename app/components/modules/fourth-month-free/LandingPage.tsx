import type { FAQItem, Offer } from "./types";
import { PageEffects } from "./PageEffects";
import { Header } from "./Header";
import { Hero } from "./Hero";
import { Featured } from "./Featured";
import { Trap } from "./Trap";
import { Science } from "./Science";
import { Journey } from "./Journey";
import { Stats } from "./Stats";
import { Plans } from "./Plans";
import { Results } from "./Results";
import { Comparison } from "./Comparison";
import { FAQ } from "./FAQ";
import { FinalCTA } from "./FinalCTA";
import { Footer } from "./Footer";
import { StickyOffer } from "./StickyOffer";

export function FourthMonthFreeLanding({ offer, faqs }: { offer: Offer; faqs: readonly FAQItem[] }) {
  return <div className="m4-page"><PageEffects /><Header /><main><Hero /><Featured /><Trap /><Science /><Journey /><Stats /><Plans offer={offer} /><Results /><Comparison /><FAQ faqs={faqs} /><FinalCTA /></main><Footer /><StickyOffer startingAt={offer.sema.effectiveMonthly} /></div>;
}
