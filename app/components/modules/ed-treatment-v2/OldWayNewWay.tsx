import type { CSSProperties } from "react";
import { comparison } from "./content";
import { Glyph } from "./Glyph";
import { Reveal } from "./Reveal";

/* Two columns, same eight rows. One reveal for the whole table: row i rises
 * in both columns together, 40ms behind row i-1. */
export function OldWayNewWay() {
  return (
    <section
      className="edv2-section edv2-comparison"
      aria-labelledby="edv2-compare-title"
    >
      <div className="edv2-container">
        <div className="edv2-head edv2-head--center">
          <h2 id="edv2-compare-title" className="edv2-h2">
            {comparison.heading}
          </h2>
        </div>
        <Reveal className="edv2-compare edv2-stagger">
          <Column
            title={comparison.oldLabel}
            variant="old"
            values={comparison.rows.map((r) => r.oldWay)}
          />
          <Column
            title={comparison.newLabel}
            variant="new"
            values={comparison.rows.map((r) => r.newWay)}
          />
        </Reveal>
      </div>
    </section>
  );
}

function Column({
  title,
  variant,
  values,
}: {
  title: string;
  variant: "old" | "new";
  values: string[];
}) {
  return (
    <div className={`edv2-compare__col edv2-compare__col--${variant}`}>
      <h3 className="edv2-compare__title">{title}</h3>
      <ul className="edv2-compare__rows">
        {comparison.rows.map((row, i) => (
          <li
            key={row.label}
            className="edv2-compare__row edv2-stagger__item"
            style={{ "--i": i } as CSSProperties}
          >
            <span className="edv2-compare__icon">
              <Glyph name={row.icon} />
            </span>
            <div>
              <span className="edv2-compare__label">{row.label}</span>
              <span className="edv2-compare__value">{values[i]}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
