import type { CSSProperties } from "react";
import { Reveal } from "./Reveal";
import { formula } from "./content";

/* 5.5 What's in Quattro™: four ingredient cards from the data array. */
export function Formula() {
  return (
    <section
      id="ingredients"
      className="ed-section"
      aria-labelledby="ed-formula"
    >
      <div className="ed-wrap">
        <Reveal>
          <h2 id="ed-formula" className="ed-h2">
            {formula.headline}
          </h2>
          <p className="ed-lede">{formula.lede}</p>
        </Reveal>
        <Reveal group as="ol" className="ed-formula__grid">
          {formula.ingredients.map((ing, i) => (
            <li
              key={ing.name}
              className="ed-seq"
              style={{ "--i": i } as CSSProperties}
            >
              <article className="ed-ing">
                <span className="ed-ing__num">0{i + 1}</span>
                <h3 className="ed-ing__name">{ing.name}</h3>
                <p className="ed-ing__role">{ing.role}</p>
                <p className="ed-ing__body">{ing.body}</p>
                <dl className="ed-ing__meta">
                  <div>
                    <dt>{formula.approvalLabel}</dt>
                    <dd>{ing.approval}</dd>
                  </div>
                  <div>
                    <dt>{formula.strengthLabel}</dt>
                    <dd>{ing.strength}</dd>
                  </div>
                </dl>
              </article>
            </li>
          ))}
        </Reveal>
        <p className="ed-footnote-block">{formula.footer}</p>
      </div>
    </section>
  );
}
