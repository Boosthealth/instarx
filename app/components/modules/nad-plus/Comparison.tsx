import { Check, X, Minus } from "lucide-react";
import { Reveal } from "./Reveal";
import { V2Button } from "./ui";
import { comparison, INTAKE_HREF, type ComparisonCell } from "./content";

/* "Not all NAD+ is the same" — a 3-column comparison: InstaRx NAD+ Injections
 * (emphasized) vs unregulated research peptides vs oral supplements. On desktop
 * a feature-label rail sits left of three value columns; the InstaRx column is
 * raised onto a white card (enclosing its header + every row) and flagged "Best
 * choice", the other two recessed. Each competitor cell renders a ✗ by default,
 * or a neutral dash when `partial` is set (a technically-true but inferior
 * answer, so the mark never contradicts the text). On mobile it stacks into
 * three labeled blocks (InstaRx first). Styling lives in nad-plus.css under
 * `.nad-compare3*`. */

const { columns, rows } = comparison;

// Shared cell type lives in content.ts (the source of truth) so this consumer
// can't drift from the data shape.
type AltCell = ComparisonCell;

/* One competitor cell: a neutral dash for `partial` (true-but-inferior), else a
 * ✗. `who` is the mobile-only prefix label restoring the column framing. */
function AltCell({ cell, who }: { cell: AltCell; who: string }) {
  const Icon = cell.partial ? Minus : X;
  return (
    <span className="nad-compare3__cell nad-compare3__cell--alt">
      <span
        className={`nad-compare3__mark ${
          cell.partial ? "nad-compare3__mark--partial" : "nad-compare3__mark--no"
        }`}
        aria-hidden="true"
      >
        <Icon size={13} strokeWidth={2.5} />
      </span>
      <span className="nad-compare3__cell-label" aria-hidden="true">
        {who}:{" "}
      </span>
      {cell.text}
    </span>
  );
}

export function Comparison() {
  return (
    <section className="v2-section v2-bg-cream">
      <div className="v2-container">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="v2-eyebrow v2-kicker-rule mb-4 inline-flex">
            The InstaRx difference
          </p>
          <h2 className="v2-h2 mb-10">
            Not all NAD+ is the <span className="v2-accent">same</span>.
          </h2>
        </Reveal>

        <Reveal className="nad-compare3" delay={80}>
          {/* Column headers: empty over the feature rail, the three product
              columns to the right, all on one baseline ABOVE the card. The
              InstaRx header carries a "Best choice" flag + the accent treatment;
              the dose sits on a quiet second line. */}
          <div className="nad-compare3__head" role="row">
            <span className="nad-compare3__corner" aria-hidden="true" />
            <span className="nad-compare3__col nad-compare3__col--us">
              <span className="nad-compare3__flag">Best choice</span>
              <span className="nad-compare3__col-name">{columns.us.name}</span>
              <span className="nad-compare3__col-dose">{columns.us.dose}</span>
            </span>
            <span className="nad-compare3__col nad-compare3__col--alt">
              <span className="nad-compare3__col-name">{columns.peptide.name}</span>
              <span className="nad-compare3__col-dose">{columns.peptide.dose}</span>
            </span>
            <span className="nad-compare3__col nad-compare3__col--alt">
              <span className="nad-compare3__col-name">{columns.oral.name}</span>
              <span className="nad-compare3__col-dose">{columns.oral.dose}</span>
            </span>
          </div>

          <ul className="nad-compare3__rows">
            {/* White "best choice" card behind the InstaRx column — spans only
                the rows (headers sit above it on one line). Decorative. */}
            <span className="nad-compare3__card" aria-hidden="true" />
            {rows.map((row) => (
              <li key={row.label} className="nad-compare3__row">
                <span className="nad-compare3__feature">{row.label}</span>

                <span className="nad-compare3__cell nad-compare3__cell--us">
                  <span className="nad-compare3__mark nad-compare3__mark--yes" aria-hidden="true">
                    <Check size={13} strokeWidth={2.5} />
                  </span>
                  <span className="nad-compare3__cell-label" aria-hidden="true">
                    InstaRx:{" "}
                  </span>
                  {row.us}
                </span>

                <AltCell cell={row.peptide} who="Research peptides" />
                <AltCell cell={row.oral} who="Oral supplements" />
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal className="nad-compare3__cta" delay={160}>
          <p className="nad-compare3__join">
            Real, high-potency, doctor-prescribed NAD+ — in stock and ready to
            ship.
          </p>
          <V2Button href={INTAKE_HREF} variant="primary" className="v2-btn--lg" arrow>
            Get started
          </V2Button>
        </Reveal>
      </div>
    </section>
  );
}
