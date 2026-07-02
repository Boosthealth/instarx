"use client";

import { useState, useRef, useEffect, type CSSProperties } from "react";
import { faqGroups, FORM_HREF } from "./content";
import { PartnerButton } from "./ui";

/* Categorized FAQ accordion, same mechanics as /glp2-v2: two fixed columns so
 * opening a question only grows its own column, one panel open at a time,
 * first item open by default. An "Apply now" CTA closes the section (the
 * client copy places one right after the FAQ). */
export function FAQ() {
  const [open, setOpen] = useState<string>("0-0");

  return (
    <section id="faq" className="v2-section v2-faq">
      {/* very subtle warm wash — quieter than the closing-CTA gradient */}
      <div className="v2-faq__bg" aria-hidden="true" />
      <div className="v2-container relative">
        <div className="mx-auto mb-12 max-w-2xl text-center lg:mb-16">
          <h2 className="v2-h2 mb-5">
            Questions? <span className="v2-accent">Answered.</span>
          </h2>
          <p className="v2-lede">
            Everything you need to know before you apply.
          </p>
        </div>

        <div className="v2-faq-grid">
          {faqGroups.map((group, gi) => (
            <div key={group.group} className="v2-faq-col">
              <div className="v2-faq-group">
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
            </div>
          ))}
        </div>

        <div className="mt-12 flex justify-center lg:mt-16">
          <PartnerButton href={FORM_HREF} variant="primary" arrow>
            Apply now
          </PartnerButton>
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
  // animates to an exact value without reading the ref during render.
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
