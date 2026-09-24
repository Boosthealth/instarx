"use client";

import { useState, type CSSProperties } from "react";
import Link from "next/link";
import { Check, ShieldAlert } from "lucide-react";
import {
  INTAKE_HREF,
  pricing,
  safetyStrip,
  tierView,
  type PricingTermKey,
} from "./content";
import { Button } from "./ui";
import { Reveal } from "./Reveal";

/* Three packs at one supply length at a time; the toggle swaps the prices in
   place so the eye compares packs, not eight numbers. The recommended pack is
   emphasised, safety strip directly beneath. */
export function Pricing() {
  const [term, setTerm] = useState<PricingTermKey>(pricing.defaultTerm);

  return (
    <section
      className="edv2-section edv2-section--soft edv2-pricing"
      id="pricing"
      tabIndex={-1}
      aria-labelledby="edv2-pricing-title"
    >
      <div className="edv2-container">
        <div className="edv2-head edv2-head--center">
          <h2 id="edv2-pricing-title" className="edv2-h2">
            {pricing.heading}
          </h2>
          <p className="edv2-lead">{pricing.sub}</p>
        </div>

        <div
          className="edv2-pricing__terms"
          role="group"
          aria-label={pricing.termsLabel}
        >
          {pricing.terms.map((option) => (
            <button
              key={option.key}
              type="button"
              className="edv2-pricing__term"
              aria-pressed={term === option.key}
              onClick={() => setTerm(option.key)}
            >
              <span>{option.label}</span>
              {option.hint && (
                <span className="edv2-pricing__term-hint">{option.hint}</span>
              )}
            </button>
          ))}
        </div>

        {/* The cards rise together; the recommended one lands 80ms later so
            the eye finishes on it. */}
        <Reveal className="edv2-pricing__grid edv2-stagger">
          {pricing.packs.map((pack) => {
            const view = tierView(pack, term);
            return (
              <article
                key={pack.key}
                className={`edv2-tier edv2-stagger__item ${pack.recommended ? "edv2-tier--recommended" : ""}`.trim()}
                style={
                  pack.recommended
                    ? ({ "--stagger-delay": "80ms" } as CSSProperties)
                    : undefined
                }
              >
                {pack.recommended && (
                  <span className="edv2-tier__badge">
                    {pricing.recommendedLabel}
                  </span>
                )}
                <div className="edv2-tier__head">
                  <h3 className="edv2-tier__name">{view.name}</h3>
                  <p className="edv2-tier__billing">{view.supply}</p>
                </div>
                <div className="edv2-tier__price">
                  <span className="edv2-tier__amount">{view.price}</span>
                  <span className="edv2-tier__unit">{view.unit}</span>
                </div>
                <div className="edv2-tier__facts">
                  <span className="edv2-chip">{view.perDose}</span>
                  {view.saving && (
                    <span className="edv2-chip edv2-chip--saving">
                      {view.saving}
                    </span>
                  )}
                </div>
                <p className="edv2-tier__recurring">{view.note}</p>
                <ul className="edv2-tier__features">
                  {pricing.features.map((feature) => (
                    <li key={feature} className="edv2-tier__feature">
                      <Check aria-hidden="true" strokeWidth={2.5} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  href={INTAKE_HREF}
                  variant={pack.recommended ? "primary" : "dark"}
                  size="lg"
                  block
                  arrow
                  className="edv2-tier__cta"
                >
                  {pricing.cta}
                </Button>
              </article>
            );
          })}
        </Reveal>

        <p className="edv2-small edv2-pricing__fine">{pricing.fine}</p>

        <div className="edv2-safety">
          <ShieldAlert aria-hidden="true" strokeWidth={2} />
          <p>
            <strong>{safetyStrip.lead}</strong> {safetyStrip.body}{" "}
            <Link href={safetyStrip.href} className="edv2-link">
              {safetyStrip.linkLabel}
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
