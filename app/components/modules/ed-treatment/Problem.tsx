import type { CSSProperties } from "react";
import { Reveal } from "./Reveal";
import { problem } from "./content";

/* 5.4 "A pill makes you plan": ink field, three stat chips. */
export function Problem() {
  return (
    <section
      className="ed-section ed-section--ink"
      aria-labelledby="ed-problem"
    >
      <div className="ed-wrap">
        <Reveal className="ed-problem__grid">
          <div>
            <p className="ed-eyebrow">{problem.label}</p>
            <h2 id="ed-problem" className="ed-h2 ed-problem__h2">
              {problem.headline}
            </h2>
          </div>
          <p className="ed-problem__body">{problem.body}</p>
        </Reveal>
        <Reveal group as="ul" className="ed-stats">
          {problem.stats.map((s, i) => (
            <li
              key={s}
              className="ed-seq"
              style={{ "--i": i } as CSSProperties}
            >
              {s}
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
