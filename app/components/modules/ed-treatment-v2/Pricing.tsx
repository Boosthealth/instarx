import type { CSSProperties } from "react";
import Link from "next/link";
import { Check, ShieldAlert } from "lucide-react";
import { INTAKE_HREF, pricing, safetyStrip } from "./content";
import { Button, WasPrice } from "./ui";
import { Reveal } from "./Reveal";

/* Two tiers, the recommended one emphasised, safety strip directly beneath. */
export function Pricing() {
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

        {/* The tiers rise together; the recommended one lands 80ms later so
            the eye finishes on it. */}
        <Reveal className="edv2-pricing__grid edv2-stagger">
          {pricing.tiers.map((tier) => (
            <article
              key={tier.key}
              className={`edv2-tier edv2-stagger__item ${tier.recommended ? "edv2-tier--recommended" : ""}`.trim()}
              style={
                tier.recommended
                  ? ({ "--stagger-delay": "80ms" } as CSSProperties)
                  : undefined
              }
            >
              {tier.recommended && (
                <span className="edv2-tier__badge">
                  {pricing.recommendedLabel}
                </span>
              )}
              <div className="edv2-tier__head">
                <h3 className="edv2-tier__name">{tier.name}</h3>
                <p className="edv2-tier__billing">{tier.billing}</p>
              </div>
              <div className="edv2-tier__price">
                <span className="edv2-tier__amount">{tier.price}</span>
                <span className="edv2-tier__was">
                  <WasPrice value={tier.was} />
                </span>
              </div>
              <div className="edv2-tier__facts">
                <span className="edv2-chip">{tier.doses}</span>
                <span className="edv2-chip">{tier.perDose}</span>
              </div>
              <p className="edv2-tier__recurring">{tier.recurring}</p>
              <ul className="edv2-tier__features">
                {tier.features.map((feature) => (
                  <li key={feature} className="edv2-tier__feature">
                    <Check aria-hidden="true" strokeWidth={2.5} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Button
                href={INTAKE_HREF}
                variant={tier.recommended ? "primary" : "dark"}
                size="lg"
                block
                arrow
                className="edv2-tier__cta"
              >
                {tier.cta}
              </Button>
            </article>
          ))}
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
