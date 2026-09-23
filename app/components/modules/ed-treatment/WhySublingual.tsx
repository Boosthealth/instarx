import type { CSSProperties } from "react";
import { Reveal } from "./Reveal";
import { whySublingual } from "./content";

/* 5.6 three blocks. */
export function WhySublingual() {
  return (
    <section
      className="ed-section ed-section--surface"
      aria-labelledby="ed-why"
    >
      <div className="ed-wrap">
        <Reveal>
          <h2 id="ed-why" className="ed-h2">
            {whySublingual.headline}
          </h2>
        </Reveal>
        <Reveal group as="ul" className="ed-why__grid">
          {whySublingual.blocks.map((b, i) => (
            <li
              key={b.title}
              className="ed-why__item ed-seq"
              style={{ "--i": i } as CSSProperties}
            >
              <h3 className="ed-why__title">{b.title}</h3>
              <p className="ed-why__body">{b.body}</p>
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
