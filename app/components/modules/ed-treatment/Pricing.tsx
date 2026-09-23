import type { CSSProperties } from "react";
import { Check } from "lucide-react";
import { Reveal } from "./Reveal";
import { EdButton, MediaSlot, SafetyStrip } from "./ui";
import { INTAKE_HREF, pricing } from "./content";

/* 5.10 Quattro™ plans only (the ladder lives in the qualifier result). The
 * safety strip sits directly under the cards (Part 4). */
export function Pricing() {
  return (
    <section id="pricing" className="ed-section" aria-labelledby="ed-pricing">
      <div className="ed-wrap">
        <Reveal>
          <h2 id="ed-pricing" className="ed-h2">
            {pricing.headline}
          </h2>
          <p className="ed-lede">{pricing.lede}</p>
        </Reveal>
        <div className="ed-pricing__grid">
          <Reveal>
            <MediaSlot
              label="Product: Quattro™ sublingual pack, plain shipper beside it, 4:5"
              ratio="4 / 5"
            />
          </Reveal>
          <div>
            <Reveal group className="ed-plans">
              {pricing.plans.map((p, i) => (
                <article
                  key={p.name}
                  className={`ed-plan ed-seq ${p.featured ? "ed-plan--featured" : ""}`}
                  style={{ "--i": i } as CSSProperties}
                  aria-labelledby={`ed-plan-${i}`}
                >
                  <div className="ed-plan__head">
                    <h3 id={`ed-plan-${i}`} className="ed-plan__name">
                      {p.name}
                    </h3>
                    <span className="ed-plan__chip">{p.chip}</span>
                  </div>
                  <p className="ed-plan__price">
                    <strong>{p.price}</strong>
                    {p.was && (
                      <s>
                        <span className="ed-sr">was </span>
                        {p.was}
                      </s>
                    )}
                    <span>{p.priceNote}</span>
                  </p>
                  <ul className="ed-plan__rows">
                    {p.rows.map((row) => (
                      <li key={row}>
                        <Check size={16} strokeWidth={2.5} aria-hidden="true" />
                        {row}
                      </li>
                    ))}
                  </ul>
                  <EdButton
                    href={INTAKE_HREF}
                    variant={p.featured ? "ink" : "outline"}
                    className="ed-btn--block"
                  >
                    {pricing.cta}
                  </EdButton>
                </article>
              ))}
            </Reveal>
            <SafetyStrip />
          </div>
        </div>
      </div>
    </section>
  );
}
