"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import PolicyLayout from "../../../components/PolicyLayout";

interface FAQItem {
  question: string;
  answer: ReactNode;
}

const faqItems: FAQItem[] = [
  {
    question: "How does shipping work?",
    answer: (
      <p>
        For new orders placed before 2:00 PM EST on a business day, we ship same-day via overnight delivery. Orders
        placed after 2:00 PM EST will ship the following business day. Recurring/subscription orders are shipped via
        ground or 2-day shipping.
      </p>
    ),
  },
  {
    question: "What is your refund policy?",
    answer: (
      <p>
        Due to the nature of our products, we are unable to accommodate returns or exchanges once an order has been
        shipped. If you experience an issue with your order, please contact our patient care team and we will do our
        best to assist you.
      </p>
    ),
  },
  {
    question: "How long does shipping take?",
    answer: (
      <p>
        Orders are typically delivered within 48 hours of being shipped. We use 2-day shipping for most orders.
        Overnight shipping is available for qualifying new orders placed before 2:00 PM EST.
      </p>
    ),
  },
  {
    question: "Is packaging discreet?",
    answer: (
      <p>
        Yes, all orders are shipped in a plain brown corrugated box. The only external marking is
        &ldquo;InstaRx&rdquo; on the shipping label.
      </p>
    ),
  },
  {
    question: "When is my next delivery?",
    answer: (
      <p>
        You can check the date of your next delivery by logging into your account and navigating to{" "}
        <strong>Account &gt; Subscriptions &gt; Next Shipment</strong>.
      </p>
    ),
  },
  {
    question: "Where is my order?",
    answer: (
      <p>
        Once your order ships, you will receive a tracking email from the pharmacy with a tracking number. You can
        use this number to track your package.
      </p>
    ),
  },
  {
    question: "Why has my order not processed yet?",
    answer: (
      <p>
        If your order has not yet been processed, please check your secure messaging portal for any messages from
        your provider. There may be additional information needed before your order can be fulfilled.
      </p>
    ),
  },
  {
    question: "How do I change my address?",
    answer: (
      <p>
        You can update your shipping address by logging in to your account and navigating to{" "}
        <strong>Website &gt; Subscriptions &gt; Manage &gt; Shipping &gt; Edit</strong>. Please ensure your address
        is updated before your next scheduled shipment.
      </p>
    ),
  },
];

function AccordionItem({ item }: { item: FAQItem }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200">
      <button
        className="w-full flex items-center justify-between py-5 text-left"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span className="text-base font-medium text-gray-900">{item.question}</span>
        <svg
          className={`w-5 h-5 text-gray-500 transition-transform ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && <div className="pb-5 text-gray-600 leading-relaxed">{item.answer}</div>}
    </div>
  );
}

export default function RefundPolicyPage() {
  return (
    <PolicyLayout>
      <h1 className="text-3xl font-bold mb-8">Shipping and Refund Policy</h1>
      <div className="divide-y divide-gray-200 border-t border-gray-200">
        {faqItems.map((item) => (
          <AccordionItem key={item.question} item={item} />
        ))}
      </div>
    </PolicyLayout>
  );
}
