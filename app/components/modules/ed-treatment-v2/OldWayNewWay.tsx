import Image from "next/image";
import type { CSSProperties } from "react";
import { comparison } from "./content";
import { Reveal } from "./Reveal";

/* One text table, no icons: label, old way, new way. Zebra rows carry the
 * eye across. Rows are laid out as grids (two columns under the label on
 * phones), so the table roles are stated explicitly to survive the display
 * change. Row i rises 40ms behind row i-1. The product cutout stands in a
 * spare grid column between the old and new cells from 48rem, breaking the
 * top rule, and sits centred above the table on phones. It is decorative:
 * the "new way" column header already names the product. */
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
          <div className="edv2-compare__product" aria-hidden="true">
            <Image
              src={comparison.product.src}
              alt=""
              width={comparison.product.width}
              height={comparison.product.height}
              sizes="(min-width: 48rem) 88px, 64px"
            />
          </div>
          <table className="edv2-compare__table" role="table">
            <thead role="rowgroup">
              <tr
                className="edv2-compare__row edv2-compare__row--head"
                role="row"
              >
                <td className="edv2-compare__corner" role="cell" />
                <th
                  scope="col"
                  role="columnheader"
                  className="edv2-compare__cell edv2-compare__cell--old"
                >
                  {comparison.oldLabel}
                </th>
                <th
                  scope="col"
                  role="columnheader"
                  className="edv2-compare__cell edv2-compare__cell--new"
                >
                  {comparison.newLabel}
                </th>
              </tr>
            </thead>
            <tbody role="rowgroup">
              {comparison.rows.map((row, i) => (
                <tr
                  key={row.label}
                  role="row"
                  className="edv2-compare__row edv2-stagger__item"
                  style={{ "--i": i } as CSSProperties}
                >
                  <th
                    scope="row"
                    role="rowheader"
                    className="edv2-compare__label"
                  >
                    {row.label}
                  </th>
                  <td
                    role="cell"
                    className="edv2-compare__cell edv2-compare__cell--old"
                  >
                    {row.oldWay}
                  </td>
                  <td
                    role="cell"
                    className="edv2-compare__cell edv2-compare__cell--new"
                  >
                    {row.newWay}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal>
      </div>
    </section>
  );
}
