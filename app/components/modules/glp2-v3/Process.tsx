import { Check } from "lucide-react";
import { Reveal } from "./Reveal";
import { processTitle, processLead, timeline } from "./content";

/* S6 — The process (timeline). Matches the approved build-sheet mockup: a
 * plain row-per-step list, no connecting rail. "Today" is marked done (coral
 * circle + check); every other step gets a navy circle with a white dot. */
export function Process() {
  return (
    <section className="v2-section v2-bg-white">
      <div className="v2-container">
        <Reveal className="mx-auto mb-10 max-w-xl text-center lg:mb-14">
          <h2 className="v2-h2 mb-4">{processTitle}</h2>
          <p className="v2-lede">{processLead}</p>
        </Reveal>

        <div className="v2-timeline2 mx-auto max-w-xl">
          {timeline.map((step, i) => {
            const isDone = i === 0;
            return (
              <Reveal key={step.when} delay={i * 70} className="v2-timeline2__row">
                <span
                  className={`v2-timeline2__marker${isDone ? " v2-timeline2__marker--done" : ""}`}
                  aria-hidden="true"
                >
                  {isDone ? (
                    <Check size={16} strokeWidth={3} />
                  ) : (
                    <span className="v2-timeline2__dot" />
                  )}
                </span>
                <div>
                  <h3 className="v2-timeline2__when">{step.when}</h3>
                  <p className="v2-timeline2__text">{step.text}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
