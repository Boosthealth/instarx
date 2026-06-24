"use client";

import { useState, useRef, useEffect, type CSSProperties } from "react";
import { faqGroups } from "./content";

/* Categories split into two fixed columns so opening a question only grows its
 * own column (no cross-column reflow). Column 1 = Getting Started + Pricing;
 * column 2 = the longer Safety & Medication block. */
const FAQ_COLUMNS = [
  [faqGroups[0], faqGroups[2]],
  [faqGroups[1]],
];

/* Categorized FAQ accordion. One panel open at a time across the whole list
 * (single `open` key). First item opens by default. Height animates via
 * scrollHeight measured from a ref so it works with variable-length answers. */
export function FAQ() {
  const [open, setOpen] = useState<string>("0-0");

  return (
    <section id="faq" className="v2-section v2-faq">
      {/* very subtle warm wash — quieter than the closing-CTA gradient so it
          adds depth without competing with the dense FAQ text */}
      <div className="v2-faq__bg" aria-hidden="true" />
      <div className="v2-container relative">
        <div className="mx-auto mb-12 max-w-2xl text-center lg:mb-16">
          <p className="v2-eyebrow v2-kicker-rule mb-5 inline-flex">FAQ</p>
          <h2 className="v2-h2 mb-5">
            We&apos;re here to <span className="v2-accent">help</span>.
          </h2>
          <p className="v2-lede">Got questions? We&apos;ve got answers.</p>
        </div>

        {/* Two fixed columns. Categories are assigned to a column explicitly
            (not auto-flowed), so opening a question only grows its own column and
            never reflows content across columns. */}
        <div className="v2-faq-grid">
          {FAQ_COLUMNS.map((colGroups, ci) => (
            <div key={ci} className="v2-faq-col">
              {colGroups.map((group) => {
                const gi = faqGroups.indexOf(group);
                return (
                  <div key={group.group} className="v2-faq-group">
                    <h3 className="v2-faq-cat">{group.group}</h3>
                    {group.items.map((item, ii) => {
                      const key = `${gi}-${ii}`;
                      return (
                        <FaqRow
                          key={key}
                          id={key}
                          question={item.q}
                          answer={item.a}
                          isOpen={open === key}
                          onToggle={() => setOpen((cur) => (cur === key ? "" : key))}
                        />
                      );
                    })}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FaqRow({
  id,
  question,
  answer,
  isOpen,
  onToggle,
}: {
  id: string;
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const innerRef = useRef<HTMLDivElement>(null);
  // Measure the answer's natural height into state so the max-height transition
  // animates to an exact value without reading the ref during render. Re-measure
  // on open and on resize (long answers wrap differently across breakpoints).
  const [contentHeight, setContentHeight] = useState(0);
  useEffect(() => {
    const measure = () => {
      if (innerRef.current) setContentHeight(innerRef.current.scrollHeight);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const panelStyle: CSSProperties = { maxHeight: isOpen ? contentHeight : 0 };

  return (
    <div className="v2-faq-item">
      <button
        type="button"
        className="v2-faq-q"
        aria-expanded={isOpen}
        aria-controls={`faq-panel-${id}`}
        onClick={onToggle}
      >
        <span>{question}</span>
        <span className="v2-faq-icon" aria-hidden="true">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="5" y1="12" x2="19" y2="12" />
            <line
              x1="12"
              y1="5"
              x2="12"
              y2="19"
              style={{
                transform: isOpen ? "scaleY(0)" : "scaleY(1)",
                transformOrigin: "center",
                transition: "transform 0.25s ease",
              }}
            />
          </svg>
        </span>
      </button>
      <div id={`faq-panel-${id}`} className="v2-faq-a" style={panelStyle} role="region">
        <div ref={innerRef} className="v2-faq-a__inner">
          {answer}
        </div>
      </div>
    </div>
  );
}
