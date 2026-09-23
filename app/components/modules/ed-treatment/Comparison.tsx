import type { CSSProperties } from "react";
import { Reveal } from "./Reveal";
import { comparison } from "./content";

/* 5.8 real table on desktop; each row restacks into a small card on mobile
 * (CSS, using the td data-label). Rows reveal in sequence. */
export function Comparison() {
  const [us, ...them] = comparison.columns;
  return (
    <section className="ed-section" aria-labelledby="ed-compare">
      <div className="ed-wrap">
        <Reveal>
          <h2 id="ed-compare" className="ed-h2">
            {comparison.headline}
          </h2>
        </Reveal>
        <Reveal group className="ed-compare">
          <table>
            <thead>
              <tr>
                <th scope="col">
                  <span className="ed-sr">{comparison.featureLabel}</span>
                </th>
                <th scope="col" className="is-us">
                  {us}
                </th>
                {them.map((c) => (
                  <th key={c} scope="col">
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {comparison.rows.map((row, i) => (
                <tr
                  key={row.label}
                  className="ed-seq"
                  style={{ "--i": i } as CSSProperties}
                >
                  <th scope="row">{row.label}</th>
                  {row.values.map((v, j) => (
                    <td
                      key={comparison.columns[j]}
                      data-label={comparison.columns[j]}
                      className={j === 0 ? "is-us" : undefined}
                    >
                      {v}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal>
      </div>
    </section>
  );
}
