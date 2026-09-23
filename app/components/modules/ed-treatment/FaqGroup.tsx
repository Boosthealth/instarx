"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

/* One FAQ group: one item open at a time. Height animates via the
 * grid-template-rows 0fr→1fr trick (user-triggered, so no CLS); the chevron
 * rotates. Closed answers stay in the DOM (SEO) but are `inert`. */
export function FaqGroup({
  group,
  items,
  idPrefix,
}: {
  group: string;
  items: Array<{ q: string; a: string }>;
  idPrefix: string;
}) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="ed-faq__group">
      <h3 className="ed-faq__group-title">{group}</h3>
      {items.map((it, i) => {
        const isOpen = open === i;
        const btnId = `${idPrefix}-q${i}`;
        const panelId = `${idPrefix}-a${i}`;
        return (
          <div key={it.q} className="ed-faq__item">
            <h4 className="ed-faq__q">
              <button
                type="button"
                id={btnId}
                className="ed-faq__btn"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
              >
                {it.q}
                <ChevronDown
                  className="ed-faq__chev"
                  size={20}
                  aria-hidden="true"
                />
              </button>
            </h4>
            <div
              id={panelId}
              role="region"
              aria-labelledby={btnId}
              className="ed-faq__panel"
              data-open={isOpen}
              inert={!isOpen}
            >
              <div className="ed-faq__inner">
                <p>{it.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
