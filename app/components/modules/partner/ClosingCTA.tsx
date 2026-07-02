import { Reveal } from "./Reveal";
import { PartnerButton } from "./ui";
import { FORM_HREF } from "./content";

/* Closing CTA above the footer — the same airy "peak" pattern as the product
 * landers: glass eyebrow pill, oversized serif headline, short supporting
 * line, single CTA, on the soft golden-hour gradient wash. */
export function ClosingCTA() {
  return (
    <section className="v2-waiting">
      {/* soft warm gradient backdrop */}
      <div className="v2-waiting__bg" aria-hidden="true" />
      <div className="v2-container relative">
        {/* Peak entrance — gentle scale-up + fade marks the closing CTA as the
            page's destination (peak-end rule). */}
        <Reveal className="v2-reveal--peak">
          <div className="mx-auto max-w-3xl px-2 py-24 text-center sm:py-32">
            <span className="v2-glass v2-glass-pill">Ready when you are</span>

            <h2 className="v2-waiting__title">
              Great health starts with{" "}
              <br className="v2-waiting__br" />
              <span className="v2-accent">one decision.</span>
            </h2>

            <p className="v2-waiting__sub">
              And so does a great partnership. Join a growing network of
              creators and publishers helping people transform their health,
              one step at a time.
            </p>

            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <PartnerButton
                href={FORM_HREF}
                variant="primary"
                className="w-full sm:w-auto"
                arrow
              >
                Apply to partner
              </PartnerButton>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
