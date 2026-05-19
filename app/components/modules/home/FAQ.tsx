"use client";

import { useState } from "react";

const faqs = [
  {
    q: "How does Insta Rx work?",
    a: "Insta Rx is 100% online. Take our short quiz, get reviewed by a licensed U.S. physician, and have your medication delivered to your door in 1–2 days.",
  },
  {
    q: "Is your customer service team in the U.S.?",
    a: "Yes — our entire care and support team is based in the United States and ready to help any time you need them.",
  },
  {
    q: "Are these medications safe?",
    a: "All Insta Rx medications are compounded at U.S.-licensed pharmacies and prescribed only after review by a licensed physician.",
  },
  {
    q: "How do I sign up?",
    a: "Click the Start Quiz button, answer a few quick questions about your health, and our team will handle the rest.",
  },
  {
    q: "Does the price increase as my dosage goes up?",
    a: "No. You pay the same flat monthly price no matter what dose your physician prescribes.",
  },
  {
    q: "Can I cancel at any time?",
    a: "Yes — you can cancel any time with no fees and no questions asked.",
  },
  {
    q: "Are these authentic Semaglutide and Tirzepatide medications?",
    a: "Yes. Our medications are compounded by FDA-registered pharmacies using pharmaceutical-grade active ingredients.",
  },
  {
    q: "How do I know which dosage is right for me?",
    a: "Yes — all medications are compounded at FDA-registered, U.S.-licensed pharmacies with the same active ingredients as the brand-name versions.",
  },
  {
    q: "Where do my prescriptions come from?",
    a: "Your prescription is filled exclusively by a U.S.-licensed compounding pharmacy and shipped directly to your door.",
  },
  {
    q: "Are there instructions on how to take my medication?",
    a: "Yes — every kit ships with clear, step-by-step instructions, and our team is available to answer any questions you have.",
  },
  {
    q: "How is the medication kept fresh during shipping?",
    a: "Every order ships in temperature-controlled packaging to keep your medication fresh and safe from door to door.",
  },
  {
    q: "How much weight will I lose?",
    a: "Many Insta Rx customers lose up to 17% of their body weight over time. Individual results may vary.",
  },
  {
    q: "How do I get in touch if I have questions?",
    a: "Our U.S.-based support team is available by message or phone — just reach out any time you need us.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="bg-white py-16 px-4 sm:px-6" id="faqs">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-gray-900 text-center mb-4 leading-tight">
          We&apos;re here to help.
        </h2>
        <p className="text-center text-lg text-gray-700 mb-12 md:text-xl md:mb-16">
          Got Questions? We&apos;ve got answers.
        </p>

        <div className="divide-y divide-gray-200 border-t border-gray-200">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={i}>
                <button
                  className="w-full flex items-center justify-between py-4 text-left gap-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-blue-500 rounded-sm"
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${i}`}
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                >
                  <span className="font-semibold text-gray-900 text-lg leading-snug">
                    {faq.q}
                  </span>
                  <span className="shrink-0 text-gray-400 text-xl leading-none" aria-hidden="true">
                    {isOpen ? "×" : "+"}
                  </span>
                </button>
                <div
                  id={`faq-panel-${i}`}
                  role="region"
                  aria-label={faq.q}
                  className={`grid transition-all duration-300 ease-in-out ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
                >
                  <div className="overflow-hidden">
                    <p className="pb-4 text-base text-gray-600 leading-snug">
                      {faq.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
