"use client";

import { useState } from "react";
import Image from "next/image";

const faqs = [
  {
    question: "Can I pay with my HSA/FSA card?",
    answer: "Yes. GLP-1 therapy is HSA/FSA-eligible. We send an itemized receipt instantly so you can submit for reimbursement in a couple of clicks.",
  },
  {
    question: "Do I need insurance?",
    answer: "No insurance needed. Our pricing is transparent and affordable with no hidden fees.",
  },
  {
    question: "What are the most common GLP-1 medication side effects?",
    answer: "The most common side effects include nausea, vomiting, diarrhea, and constipation. These are usually mild and improve over time.",
  },
  {
    question: "How much weight will I lose?",
    answer: "Results vary, but clinical studies show patients lose an average of 15-20% of their body weight over 12-18 months.",
  },
  {
    question: "How are compounded GLP-1 sourced?",
    answer: "Our compounded medications are sourced from FDA-registered 503B pharmacies that meet strict quality and safety standards.",
  },
];

export const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="max-w-2xl mx-auto py-16 text-[#101010] lg:max-w-none lg:py-24">
      <h2 className="text-center text-3xl font-bold leading-tight tracking-tight lg:text-[44px]">
        All your questions,<br />answered
      </h2>
      <div className="mt-8 flex flex-col divide-y divide-gray-200 border-b border-gray-200">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div key={index}>
              <button
                className="flex w-full items-center justify-between py-6 text-left hover:cursor-pointer"
                onClick={() => setOpenIndex(isOpen ? null : index)}
              >
                <span className="text-lg font-medium">{faq.question}</span>
                <span className="ml-6 shrink-0 text-xl">{isOpen ? "×" : "+"}</span>
              </button>
              {isOpen && (
                <p className="pb-6 text-gray-500">{faq.answer}</p>
              )}
            </div>
          );
        })}
      </div>
      <div className="mt-12 text-center text-[#040404]">
        <h3 className="text-lg font-medium">Still have questions?</h3>
        <p>Feel free to leave a message for us</p>
        <a href="#" className="flex items-center justify-center gap-2 border border-gray-300 rounded-full py-2 px-10 mt-4 mx-auto w-max text-lg hover:bg-gray-50">
          <span>Message us</span>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M8.5395 10.5395C8.69267 10.3862 8.76925 10.2063 8.76925 10C8.76925 9.79367 8.69267 9.61383 8.5395 9.4605C8.38617 9.30733 8.20633 9.23075 8 9.23075C7.79367 9.23075 7.61383 9.30733 7.4605 9.4605C7.30733 9.61383 7.23075 9.79367 7.23075 10C7.23075 10.2063 7.30733 10.3862 7.4605 10.5395C7.61383 10.6927 7.79367 10.7693 8 10.7693C8.20633 10.7693 8.38617 10.6927 8.5395 10.5395ZM12.5395 10.5395C12.6927 10.3862 12.7692 10.2063 12.7692 10C12.7692 9.79367 12.6927 9.61383 12.5395 9.4605C12.3862 9.30733 12.2063 9.23075 12 9.23075C11.7937 9.23075 11.6138 9.30733 11.4605 9.4605C11.3073 9.61383 11.2308 9.79367 11.2308 10C11.2308 10.2063 11.3073 10.3862 11.4605 10.5395C11.6138 10.6927 11.7937 10.7693 12 10.7693C12.2063 10.7693 12.3862 10.6927 12.5395 10.5395ZM16.5395 10.5395C16.6927 10.3862 16.7693 10.2063 16.7693 10C16.7693 9.79367 16.6927 9.61383 16.5395 9.4605C16.3862 9.30733 16.2063 9.23075 16 9.23075C15.7937 9.23075 15.6138 9.30733 15.4605 9.4605C15.3073 9.61383 15.2308 9.79767 15.2308 10C15.2308 10.2063 15.3073 10.3862 15.4605 10.5395C15.6138 10.6927 15.7937 10.7693 16 10.7693C16.2063 10.7693 16.3862 10.6927 16.5395 10.5395ZM3 20.077V4.6155C3 4.15517 3.15417 3.77083 3.4625 3.4625C3.77083 3.15417 4.15517 3 4.6155 3H19.3845C19.8448 3 20.2292 3.15417 20.5375 3.4625C20.8458 3.77083 21 4.15517 21 4.6155V15.3845C21 15.8448 20.8458 16.2292 20.5375 16.5375C20.2292 16.8458 19.8448 17 19.3845 17H6.077L3 20.077ZM5.65 16H19.3845C19.5385 16 19.6796 15.9359 19.8078 15.8078C19.9359 15.6796 20 15.5385 20 15.3845V4.6155C20 4.4615 19.9359 4.32042 19.8078 4.19225C19.6796 4.06408 19.5385 4 19.3845 4H4.6155C4.4615 4 4.32042 4.06408 4.19225 4.19225C4.06408 4.32042 4 4.4615 4 4.6155V17.6443L5.65 16Z" />
          </svg>
        </a>
      </div>
    </section>
  );
};
