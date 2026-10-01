"use client";

import { Plus } from "lucide-react";
import { useState } from "react";
import type { FAQItem } from "./types";
import { PROMO, track } from "./ui";

// Same accordion as the /glp2 FAQ (app/components/modules/home/FAQ.tsx), plus lp_faq_open tracking.
export function FAQ({ faqs }: { faqs: readonly FAQItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="bg-white py-16 px-4 sm:px-6 lg:py-24" id="faqs" data-track-section="faq">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-balance text-gray-900 text-center mb-4 leading-tight">
          Get the answers you need
        </h2>
        <p className="text-center text-lg text-gray-700 text-pretty mb-12 md:text-xl md:mb-16">
          Everything about the 4th Month Free plan.
        </p>
        <div className="divide-y divide-gray-200 border-t border-b border-gray-200">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={faq.question}>
                <h3>
                  <button
                    type="button"
                    className="w-full flex items-center justify-between py-4 text-left gap-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-blue-500 rounded-sm"
                    aria-expanded={isOpen}
                    aria-controls={`m4f-faq-panel-${i}`}
                    id={`m4f-faq-button-${i}`}
                    onClick={() => {
                      setOpenIndex(isOpen ? null : i);
                      if (!isOpen) track({ event: "lp_faq_open", question: faq.question, promo: PROMO });
                    }}
                  >
                    <span className="font-semibold text-gray-900 text-lg leading-snug">{faq.question}</span>
                    <Plus
                      className={`size-5 shrink-0 text-gray-500 transition-transform duration-200 ease-out motion-reduce:transition-none ${isOpen ? "rotate-45" : ""}`}
                      aria-hidden="true"
                    />
                  </button>
                </h3>
                <div
                  id={`m4f-faq-panel-${i}`}
                  role="region"
                  aria-labelledby={`m4f-faq-button-${i}`}
                  className={`grid transition-[grid-template-rows] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] motion-reduce:transition-none ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
                >
                  <div className="overflow-hidden" inert={!isOpen}>
                    <p className="pb-4 text-base text-gray-600 leading-snug">{faq.answer}</p>
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
