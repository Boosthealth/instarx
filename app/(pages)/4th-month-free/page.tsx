import type { Metadata } from "next";
import { FourthMonthFreeLanding } from "@/app/components/modules/fourth-month-free";

export const metadata: Metadata = {
  title: { absolute: "Get Your 4th Month Free — GLP-1 Weight Loss | InstaRx" },
  description:
    "Commit to 3 months of doctor-prescribed GLP-1 and get every 4th month free, forever. Same price at every dose. No hidden fees. Free 1-2 day shipping.",
  openGraph: {
    title: "Get Your 4th Month Free — GLP-1 Weight Loss | InstaRx",
    description:
      "Commit to 3 months of doctor-prescribed GLP-1 and get every 4th month free, forever. Same price at every dose. No hidden fees. Free 1-2 day shipping.",
    url: "/4th-month-free",
  },
};

const OFFER = {
  tirz: {
    treatment: "tirzepatide",
    name: "Tirzepatide",
    retailMonthly: 348,
    planTotal: 1044,
    effectiveMonthly: 261,
    strikePlanTotal: 1392,
    savings: 348,
  },
  sema: {
    treatment: "semaglutide",
    name: "Semaglutide",
    retailMonthly: 248,
    planTotal: 744,
    effectiveMonthly: 186,
    strikePlanTotal: 992,
    savings: 248,
  },
} as const;

const FAQS = [
  {
    question: 'How does "every 4th month free" work?',
    answer:
      "You commit to a 4-month plan and pay the price of 3 months. Your plan renews every 4 months at that same 3-month price, so every 4th month stays free for as long as you're with us.",
  },
  {
    question: "Who qualifies for GLP-1 weight loss medication?",
    answer:
      "Adults 18+ with a BMI of 27 or higher are typically eligible. A licensed provider reviews your intake and makes the final decision. If you're not approved, you're not charged.",
  },
  {
    question: "What is included in the price?",
    answer:
      "Your doctor consultation, prescription, medication, injection supplies, free 1-2 day temperature-controlled shipping, and unlimited follow-ups with our care team. No membership fee.",
  },
  {
    question: "Does the price change when my dose goes up?",
    answer: "No. Your price stays the same at every prescribed dose.",
  },
  {
    question: "Do you accept insurance?",
    answer:
      "We don't bill insurance, which keeps pricing simple. Your plan is HSA/FSA eligible for reimbursement.",
  },
  {
    question: "What if I'm not approved?",
    answer: "You won't be charged. Your provider reviews your intake before anything ships.",
  },
  {
    question: "Can I cancel?",
    answer: "Yes. Cancel anytime from your patient portal before your next 4-month renewal.",
  },
  {
    question: "Semaglutide or tirzepatide, which should I pick?",
    answer:
      "Both are GLP-1 medications. Tirzepatide also targets a second hunger pathway (GIP) and shows the highest average weight loss in its class. Your provider can switch you at any time at no extra cost.",
  },
  {
    question: "How fast will I get my medication?",
    answer: "Most orders are reviewed within 24 hours and arrive in 1-2 days with free expedited shipping.",
  },
  {
    question: "Are the medications FDA approved?",
    answer:
      "The active ingredients are FDA-approved. Compounded medications are prepared by licensed U.S. pharmacies and are not themselves FDA-approved. See the safety information in the footer.",
  },
] as const;

export default function FourthMonthFreePage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema).replace(/</g, "\\u003c") }}
      />
      <FourthMonthFreeLanding offer={OFFER} faqs={FAQS} />
    </>
  );
}
