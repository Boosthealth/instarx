"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";
import type { FAQItem } from "./types";
import { PROMO, track } from "./ui";

export function FAQ({ faqs }: { faqs: readonly FAQItem[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? faqs : faqs.slice(0, 5);
  return <section className="m4-section m4-faq" id="faq" data-track-section="faq"><div className="m4-faq__shape m4-faq__shape--one" /><div className="m4-faq__shape m4-faq__shape--two" /><div className="m4-container m4-faq__grid"><header><h2>Get the answers you need</h2><p>Find answers to frequently asked questions about the 4th Month Free plan.</p></header><div className="m4-accordion">{visible.map((faq, i) => { const isOpen = open === i; return <article key={faq.question}><button aria-expanded={isOpen} aria-controls={`m4-faq-${i}`} onClick={() => { setOpen(isOpen ? null : i); if (!isOpen) track({ event: "lp_faq_open", question: faq.question, promo: PROMO }); }}><span>{faq.question}</span><ChevronDown /></button><div id={`m4-faq-${i}`} className={`m4-accordion__answer ${isOpen ? "is-open" : ""}`}><div><p>{faq.answer}</p></div></div></article>; })}{!expanded && <button className="m4-faq__more" onClick={() => setExpanded(true)}>Load More</button>}</div></div></section>;
}

