import type { CSSProperties } from "react";
import { steps } from "./content";
import { Reveal } from "./Reveal";

/* Three numbered steps. Numbers stay: the sequence carries information.
 * The three steps rise as one group, in order. */
export function Steps() {
  return (
    <section
      className="edv2-section edv2-steps"
      id="how-it-works"
      aria-labelledby="edv2-steps-title"
    >
      <div className="edv2-container">
        <div className="edv2-head">
          <h2 id="edv2-steps-title" className="edv2-h2">
            {steps.heading}
          </h2>
        </div>
        <Reveal as="ol" className="edv2-steps__list edv2-stagger">
          {steps.items.map((step, i) => (
            <li
              key={step.title}
              className="edv2-step edv2-stagger__item"
              style={{ "--i": i } as CSSProperties}
            >
              <span className="edv2-step__num" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="edv2-step__title">{step.title}</h3>
              <p className="edv2-step__body">{step.body}</p>
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
