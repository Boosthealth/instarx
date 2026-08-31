import { Reveal } from "./Reveal";
import { V2Button } from "./ui";
import { pricing, INTAKE_HREF, type PricingPlan } from "./content";

/* "#pricing" — the plan chart: one cream card per product form (Shot / Spray),
 * each listing its four plan rows (Monthly → 12 Month). Every row shows the
 * flat per-month rate with the billing fine print beneath it; the Monthly row
 * additionally carries the discounted first month (`intro`), and the 12-month
 * plan is flagged "Best value". Data lives in content.ts (`pricing`); styling
 * in nad-plus.css under `.nad-pricing*`. */

function PlanRow({ plan }: { plan: PricingPlan }) {
  return (
    <li className="nad-pricing__row">
      <div className="nad-pricing__term-wrap">
        <span className="nad-pricing__term">{plan.term}</span>
        {plan.best && <span className="nad-pricing__flag">Best value</span>}
        {plan.intro && (
          <span className="nad-pricing__flag nad-pricing__flag--intro">
            {plan.intro} first month
          </span>
        )}
      </div>
      <div className="nad-pricing__price-wrap">
        <span className="nad-pricing__price">
          {plan.perMonth}
          <span className="nad-pricing__per">/mo</span>
        </span>
        <span className="nad-pricing__note">{plan.note}</span>
      </div>
    </li>
  );
}

export function Pricing() {
  return (
    // tabIndex={-1} lets the router move focus here when the "See pricing"
    // CTAs (Next <Link>s) navigate to #pricing — matching the focus behavior
    // AnchorScrollFix gives the header's plain-<a> anchors.
    <section id="pricing" tabIndex={-1} className="v2-section v2-bg-white">
      <div className="v2-container">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="v2-eyebrow v2-kicker-rule mb-4 inline-flex">
            Simple, flat pricing
          </p>
          <h2 className="v2-h2 mb-4">
            Choose your NAD+ <span className="v2-accent">plan</span>.
          </h2>
          <p className="v2-lede mb-10">
            Provider visit, prescription, and free 1–2 day shipping included in
            every plan. Longer plans, lower monthly rate.
          </p>
        </Reveal>

        <div className="nad-pricing">
          {pricing.map((product, i) => (
            <Reveal
              key={product.product}
              className="nad-pricing__card"
              delay={80 + i * 80}
            >
              <h3 className="nad-pricing__product">{product.product}</h3>
              <p className="nad-pricing__tagline">{product.tagline}</p>

              <ul className="nad-pricing__rows">
                {product.plans.map((plan) => (
                  <PlanRow key={plan.term} plan={plan} />
                ))}
              </ul>

              <V2Button
                href={INTAKE_HREF}
                variant="primary"
                className="nad-pricing__cta"
                arrow
              >
                Get started
              </V2Button>
            </Reveal>
          ))}
        </div>

        <Reveal className="nad-pricing__fineprint" delay={200}>
          <p className="v2-caption">
            No membership fees, no hidden fees, no insurance needed.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
