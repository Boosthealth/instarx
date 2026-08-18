import { Reveal } from "./Reveal";
import { V2Button } from "./ui";
import { differenceTableHeaders, differenceRows, INTAKE_HREF } from "./content";

/* S8 — Comparison table ("The InstaRx difference"). Matches the approved
 * build-sheet mockup exactly: a plain bordered table, two equal columns
 * (InstaRx / Typical injectable), green checks vs. muted grey text. */
export function Difference() {
  return (
    <section className="v2-section v2-bg-white">
      <div className="v2-container">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="v2-h2">The InstaRx difference</h2>
        </Reveal>

        <Reveal delay={80} className="v2-difftable">
          <div className="v2-difftable__hd">
            <div className="v2-difftable__us">{differenceTableHeaders.us}</div>
            <div className="v2-difftable__them">{differenceTableHeaders.them}</div>
          </div>

          {differenceRows.map((row) => (
            <div key={row.feature} className="v2-difftable__row">
              <div className="v2-difftable__us">
                <span className="v2-difftable__check" aria-hidden="true">
                  ✓
                </span>{" "}
                {row.feature}
              </div>
              <div className="v2-difftable__them">{row.competitor}</div>
            </div>
          ))}
        </Reveal>

        <Reveal delay={140} className="mt-6 flex justify-center">
          <V2Button href={INTAKE_HREF} variant="primary" className="v2-btn--lg w-full sm:w-96" arrow>
            Check my eligibility
          </V2Button>
        </Reveal>
      </div>
    </section>
  );
}
