import { Check } from "lucide-react";
import { Reveal } from "./Reveal";
import { V2Button } from "./ui";
import { pricing, INTAKE_HREF } from "./content";

/* S5 — Pricing ($299 flat). Price lockup, three checks, CTA, and a small
 * decorative line-chart motif (flat line vs. a climbing competitor line) —
 * pure inline SVG, no chart library, purely illustrative. */
export function Pricing() {
  return (
    <section id="pricing" className="v2-section v2-bg-tint">
      <div className="v2-container">
        <Reveal className="v2-pricing__lockup mx-auto max-w-2xl">
          <p className="v2-eyebrow v2-kicker-rule mb-4 inline-flex">
            {pricing.eyebrow}
          </p>
          <h2 className="v2-pricing__price">
            {pricing.priceValue}
            <small>{pricing.pricePeriod}</small>
          </h2>
          <p className="v2-pricing__lead">{pricing.priceLead}</p>
          <p className="v2-lede mx-auto mt-4 max-w-xl">{pricing.body}</p>
        </Reveal>

        <Reveal delay={80} className="v2-pricing__chart">
          <svg
            viewBox="0 0 320 120"
            width="100%"
            role="presentation"
            aria-hidden="true"
          >
            <path
              d="M8 100 L312 100"
              stroke="var(--v2-line)"
              strokeWidth="1"
            />
            {/* Climbing "other providers" line — draws in first on scroll-reveal */}
            <path
              className="v2-chart-line v2-chart-line--them"
              d="M8 88 C 90 84, 150 60, 210 40 S 300 12, 312 8"
              fill="none"
              stroke="var(--v2-line-strong)"
              strokeWidth="3"
              strokeLinecap="round"
            />
            {/* Flat InstaRx line — draws in just after */}
            <path
              className="v2-chart-line v2-chart-line--us"
              d="M8 60 L312 60"
              fill="none"
              stroke="var(--v2-teal-action)"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
          </svg>
          <div className="v2-pricing__chart-legend">
            <span>
              <i style={{ background: "var(--v2-teal-action)" }} />
              InstaRx — flat $299/mo
            </span>
            <span>
              <i style={{ background: "var(--v2-line-strong)" }} />
              Other providers
            </span>
          </div>
        </Reveal>

        <Reveal delay={140} className="v2-pricing__checks">
          {pricing.checks.map((check) => (
            <p key={check} className="v2-pricing__check">
              <Check size={18} strokeWidth={2.5} aria-hidden="true" />
              {check}
            </p>
          ))}
        </Reveal>

        <Reveal delay={200} className="v2-pricing__cta">
          <V2Button href={INTAKE_HREF} variant="primary" className="v2-btn--lg w-full sm:w-96" arrow>
            {pricing.cta}
          </V2Button>
          <p className="v2-caption">{pricing.ctaSub}</p>
        </Reveal>
      </div>
    </section>
  );
}
