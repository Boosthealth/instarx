export type Treatment = "tirzepatide" | "semaglutide";

export type OfferItem = {
  treatment: Treatment;
  name: string;
  retailMonthly: number;
  planTotal: number;
  effectiveMonthly: number;
  strikePlanTotal: number;
  savings: number;
};

export type Offer = { tirz: OfferItem; sema: OfferItem };
export type FAQItem = { question: string; answer: string };

