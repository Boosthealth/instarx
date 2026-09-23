import type { CSSProperties } from "react";
import { Reveal } from "./Reveal";
import { EdButton } from "./ui";
import { INTAKE_HREF, howItWorks, primaryCta } from "./content";

/* 5.11 three steps. */
export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="ed-section ed-section--surface"
      aria-labelledby="ed-how"
    >
      <div className="ed-wrap">
        <Reveal>
          <h2 id="ed-how" className="ed-h2">
            {howItWorks.headline}
          </h2>
        </Reveal>
        <Reveal group as="ol" className="ed-how__list">
          {howItWorks.steps.map((s, i) => (
            <li
              key={s.title}
              className="ed-how__item ed-seq"
              style={{ "--i": i } as CSSProperties}
            >
              <span className="ed-how__num" aria-hidden="true">
                {i + 1}
              </span>
              <div>
                <h3 className="ed-how__title">{s.title}</h3>
                <p className="ed-how__body">{s.body}</p>
              </div>
            </li>
          ))}
        </Reveal>
        <div className="ed-how__cta">
          <EdButton href={INTAKE_HREF}>{primaryCta}</EdButton>
        </div>
      </div>
    </section>
  );
}
