import { steps } from "./content";
import { Reveal } from "./Reveal";

/* Three numbered steps. Numbers stay: the sequence carries information. */
export function Steps() {
  return (
    <section
      className="edv2-section edv2-steps"
      id="how-it-works"
      aria-labelledby="edv2-steps-title"
    >
      <div className="edv2-container">
        <Reveal className="edv2-head">
          <h2 id="edv2-steps-title" className="edv2-h2">
            {steps.heading}
          </h2>
        </Reveal>
        <ol className="edv2-steps__list">
          {steps.items.map((step, i) => (
            <Reveal
              key={step.title}
              as="li"
              className="edv2-step"
              delay={i * 70}
            >
              <span className="edv2-step__num" aria-hidden="true">
                {i + 1}
              </span>
              <h3 className="edv2-step__title">{step.title}</h3>
              <p className="edv2-step__body">{step.body}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
