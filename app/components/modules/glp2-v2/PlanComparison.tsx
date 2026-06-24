import Image from "next/image";
import { Check, X } from "lucide-react";
import { Reveal } from "./Reveal";
import { V2Button } from "./ui";
import { INTAKE_HREF } from "./content";

/* "What your personalized plan includes" — a light editorial comparison
 * (yourEra-style) that lands right after Medications: feature statements down
 * the left, an InstaRx accent card holding every "Included" check in the
 * centre, and a recessed "Other providers" column on the right so InstaRx wins
 * the eye. Replaces the old duplicate trust strip in Medications. Every claim
 * reuses facts already stated elsewhere on the page — no new claims. */
const COMPARISON_ROWS = [
  {
    feature: "Same flat price at every dose — no memberships or contracts.",
    competitor: "Prices climb · surprise fees.",
  },
  {
    feature: "Free 1–2 day shipping, cold-chain packed.",
    competitor: "Speed and cost vary · you wait.",
  },
  {
    feature: "A real U.S.-licensed provider, 1:1 — not a chatbot.",
    competitor: "Limited hours or automated replies.",
  },
  {
    feature: "Compounded by certified U.S. pharmacies.",
    competitor: "Opaque pharmacy sourcing.",
  },
  {
    feature: "Ongoing care that stays with you past month one.",
    competitor: "Short-term, meds-only.",
  },
] as const;

export function PlanComparison() {
  return (
    <section className="v2-section v2-bg-cream">
      <div className="v2-container">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="v2-eyebrow v2-kicker-rule mb-4 inline-flex">
            The InstaRx difference
          </p>
          <h2 className="v2-h2 mb-10">
            What your personalized plan{" "}
            <span className="v2-accent">includes</span>
          </h2>
        </Reveal>

        <Reveal className="v2-compare">
          {/* Column headers — empty over the feature rail, brand over the
              InstaRx card, muted over competitors. */}
          <div className="v2-compare__head" aria-hidden="true">
            <span />
            <span className="v2-compare__brand">
              <Image
                src="/logos/instarx-logo.png"
                alt="InstaRx"
                width={104}
                height={26}
                className="h-5 w-auto"
              />
            </span>
            <span className="v2-compare__vs">Other providers</span>
          </div>

          <ul className="v2-compare__rows">
            {COMPARISON_ROWS.map((row) => (
              <li key={row.feature} className="v2-compare__row">
                <span className="v2-compare__feature">{row.feature}</span>
                <span className="v2-compare__cell v2-compare__cell--us">
                  <span className="v2-compare__check" aria-hidden="true">
                    <Check size={14} strokeWidth={2.5} />
                  </span>
                  <span className="sr-only">InstaRx: </span>
                  Included
                </span>
                <span className="v2-compare__cell v2-compare__cell--them">
                  <span className="v2-compare__x" aria-hidden="true">
                    <X size={14} strokeWidth={2.5} />
                  </span>
                  <span className="sr-only">Other providers: </span>
                  {row.competitor}
                </span>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal className="v2-compare__cta">
          <p className="v2-compare__join">
            Join 10,000+ Americans losing weight with InstaRx
          </p>
          <V2Button href={INTAKE_HREF} variant="primary" className="v2-btn--lg" arrow>
            Find your treatment
          </V2Button>
        </Reveal>
      </div>
    </section>
  );
}
