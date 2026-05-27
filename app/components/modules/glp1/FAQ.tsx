"use client";

import { useState } from "react";

const faqs = [
  {
    question: "What are compounded GLP-1 medications?",
    answer: "Compounded GLP-1 medications are prepared at compounding pharmacies based on a doctor's prescription.",
  },
  {
    question: "Does my insurance plan cover compounded GLP-1 medications?",
    answer: "While compounded GLP-1 medications aren't covered by insurance, InstaRx offers industry leading prices to help you achieve your weight loss goals.",
  },
  {
    question: "Can I use my HSA or FSA to pay for compounded GLP-1 medications?",
    answer: "Absolutely! You can use your HSA or FSA card to pay for compounded GLP-1 medications.",
  },
  {
    question: "How do I get started on a compounded GLP-1 medication?",
    answer: "To begin, you'll consult with a licensed healthcare provider. They will assess your medical history and weight loss goals, then prescribe a compounded GLP-1 medication if appropriate, which will be prepared and delivered by a regulated compounding pharmacy.",
  },
];

export default function FAQ() {
  const [openItems, setOpenItems] = useState<Set<number>>(new Set());

  const toggle = (index: number) => {
    setOpenItems((prev) => {
      const next = new Set(prev);
      next.has(index) ? next.delete(index) : next.add(index);
      return next;
    });
  };

  return (
    <section className="px-6 py-10 sm:py-16">
      <div
        className="max-w-7xl mx-auto rounded-3xl sm:rounded-[48px] px-8 sm:px-14 py-14 sm:py-16"
        style={{ background: "var(--glp1-faq-gradient)" }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-16">

          {/* Left */}
          <div data-reveal="slide-left" className="lg:col-span-1">
            <h2 className="text-2xl sm:text-3xl font-medium text-gray-900 leading-tight mb-4 font-[family-name:var(--font-inter)]">
              Questions &amp; Answers
            </h2>
            <p className="text-gray-800 leading-relaxed pr-2">
              Learn more about how to understand how GLP-1-containing compounds work.
            </p>
          </div>

          {/* Right */}
          <div data-reveal="up" style={{ transitionDelay: "120ms" }} className="lg:col-span-2 flex flex-col divide-y divide-gray-200">
            {faqs.map((faq, i) => {
              const isOpen = openItems.has(i);
              return (
                <div key={i}>
                  <button
                    id={`faq-btn-${i}`}
                    onClick={() => toggle(i)}
                    className="flex w-full items-center justify-between py-4 text-left gap-4"
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${i}`}
                  >
                    <span className="text-lg font-medium text-gray-900">{faq.question}</span>
                    <span className="shrink-0 text-xl text-gray-400 leading-none" aria-hidden="true">{isOpen ? "−" : "+"}</span>
                  </button>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateRows: isOpen ? "1fr" : "0fr",
                      transition: "grid-template-rows 0.28s cubic-bezier(0.16, 1, 0.3, 1)",
                    }}
                    aria-hidden={isOpen ? undefined : true}
                  >
                    <div className="overflow-hidden">
                      <div id={`faq-panel-${i}`} role="region" aria-labelledby={`faq-btn-${i}`}>
                        <p className="pb-5 pt-1 text-gray-800 leading-relaxed">{faq.answer}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
