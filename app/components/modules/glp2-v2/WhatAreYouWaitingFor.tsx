import { Reveal } from "./Reveal";
import { V2Button } from "./ui";
import { INTAKE_HREF } from "./content";

/* Closing CTA section that sits directly above the footer. Mirrors the airy
 * "what are you waiting for?" pattern: small eyebrow pill, oversized two-line
 * headline, short supporting line, and a single dark pill CTA — all on a soft
 * warm gradient wash (EOS-style). The trust points now live in the Ticker that
 * runs between this section and the footer. */
export function WhatAreYouWaitingFor() {
  return (
    <section className="v2-waiting">
      {/* soft warm gradient backdrop */}
      <div className="v2-waiting__bg" aria-hidden="true" />
      <div className="v2-container relative">
        <Reveal>
          <div className="mx-auto max-w-3xl px-2 py-24 text-center sm:py-32">
            {/* eyebrow pill — same glass treatment as the hero "GLP-1 Weight Loss"
                tag, minus the leading dot. */}
            <span className="v2-glass v2-glass-pill">
              What are you waiting for?
            </span>

            <h2 className="v2-waiting__title">
              You&apos;re one click away{" "}
              <br className="v2-waiting__br" />
              from a new you.
            </h2>

            <p className="v2-waiting__sub">
              This isn&apos;t a fad. It&apos;s medicine backed by science. Over
              10,000 members are already losing up to 17% of their body weight
              safely and effectively from the comfort of home.
            </p>

            <div className="mt-9 flex justify-center">
              <V2Button
                href={INTAKE_HREF}
                variant="primary"
                className="v2-btn--lg"
                arrow
              >
                Find your treatment
              </V2Button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
