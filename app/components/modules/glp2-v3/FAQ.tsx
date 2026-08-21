"use client";

import { useState, useRef, useEffect, type CSSProperties } from "react";
import { faqGroups } from "./content";

/* S9 — FAQ. Matches the approved build-sheet mockup: one column, a small
 * muted category label above each group, and each question its own bordered
 * card (no full-bleed accordion rows). First question opens by default. */
export function FAQ() {
  const [open, setOpen] = useState<string>("0-0");

  return (
    <section id="faq" className="v2-section v2-faq v2-bg-tint">
      <div className="v2-container relative">
        <div className="mx-auto mb-12 max-w-2xl text-center lg:mb-16">
          <h2 className="v2-h2 mb-5">
            Questions, <span className="v2-accent">answered</span>.
          </h2>
          <p className="v2-lede">Got questions? We&apos;ve got answers.</p>
        </div>

        <div className="v2-faq-groups">
          {faqGroups.map((group, gi) => (
            <div key={group.group}>
              <p className="v2-faqgrp">{group.group}</p>
              <div className="v2-faq2">
                {group.items.map((item, ii) => {
                  const key = `${gi}-${ii}`;
                  return (
                    <QaRow
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
      </div>
    </section>
  );
}

function QaRow({
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
  const [contentHeight, setContentHeight] = useState(0);
  useEffect(() => {
    const measure = () => {
      if (innerRef.current) setContentHeight(innerRef.current.scrollHeight);
    };
    measure();
    // Re-measure once the web fonts swap in (Lora/Lato load with
    // `display: "swap"`), since the first measurement happens against the
    // fallback stack and can leave the open panel clipped after the reflow.
    document.fonts?.ready.then(measure);
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const panelStyle: CSSProperties = { maxHeight: isOpen ? contentHeight : 0 };
  const qId = `faq-q-${id}`;
  const panelId = `faq-panel-${id}`;

  return (
    <div className="v2-qa">
      <button
        type="button"
        id={qId}
        className="v2-qa__q"
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={onToggle}
      >
        <span>{question}</span>
        <span className="v2-qa__marker" aria-hidden="true">
          {isOpen ? "–" : "+"}
        </span>
      </button>
      <div
        id={panelId}
        className="v2-qa__a"
        style={panelStyle}
        role="region"
        aria-labelledby={qId}
        aria-hidden={!isOpen}
      >
        <div ref={innerRef} className="v2-qa__a-inner">
          {answer}
        </div>
      </div>
    </div>
  );
}
