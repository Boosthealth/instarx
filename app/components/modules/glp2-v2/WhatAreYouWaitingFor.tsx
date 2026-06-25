import { Reveal } from "./Reveal";
import { V2Button, Stars } from "./ui";
import { ReassuranceLine } from "./ReassuranceLine";
import { INTAKE_HREF } from "./content";

/* Closing CTA section that sits directly above the footer. Mirrors the airy
 * "what are you waiting for?" pattern: small eyebrow pill, oversized two-line
 * headline, short supporting line, dual CTAs, the icon reassurance line, and a
 * Trustpilot-style rating strip — all on a soft warm gradient wash (EOS-style).
 * The trust ticker runs between this section and the footer. */
export function WhatAreYouWaitingFor() {
  return (
    <section className="v2-waiting">
      {/* soft warm gradient backdrop */}
      <div className="v2-waiting__bg" aria-hidden="true" />
      <div className="v2-container relative">
        {/* Peak entrance — gentle scale-up + fade (not the standard rise) marks
            the closing CTA as the page's destination (peak-end rule). */}
        <Reveal className="v2-reveal--peak">
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

            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <V2Button
                href={INTAKE_HREF}
                variant="primary"
                className="w-full sm:w-auto"
                arrow
              >
                Find your treatment
              </V2Button>
              <V2Button
                href={INTAKE_HREF}
                variant="glass"
                className="w-full sm:w-auto"
              >
                See pricing
              </V2Button>
            </div>

            <div className="mt-6 flex justify-center">
              <ReassuranceLine align="center" />
            </div>

            {/* Trustpilot-style rating strip */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-x-2 gap-y-1">
              <span
                className="text-sm font-semibold"
                style={{ color: "var(--v2-ink)" }}
              >
                Excellent 4.7
              </span>
              <Stars count={5} size={16} />
              <span
                className="text-sm"
                style={{ color: "var(--v2-ink-mute)" }}
              >
                10,000+ happy customers
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
