import Image from "next/image";
import { Reveal } from "./Reveal";
import { timeline } from "./content";

export function HowItWorks() {
  return (
    <section id="how-it-works" className="v2-section v2-section--compact v2-bg-white v2-hiw">
      <div className="v2-container">
        {/* Two columns: timeline list on the left, phone attached to the section
            bottom on the right. White background so the app screenshot's white
            edges blend; the section's bottom padding is removed (.v2-hiw) so the
            phone reads as anchored to the section's lower edge. */}
        <div className="v2-hiw__grid">
          <Reveal className="v2-hiw__copy">
            <p className="v2-eyebrow v2-kicker-rule mb-5 inline-flex">
              The process
            </p>
            <h2 className="v2-h2 mb-4">
              Get your NAD+ meds in{" "}
              <span className="v2-accent">1–2 days</span>
            </h2>
            <p className="v2-lede mb-10">
              Direct healthcare — without the long waits or doctor denials.
            </p>

            {/* Vertical stepper: a connecting rail down the left with a node per
                step; the glass tag + text sit to the right of each node. */}
            <ol className="v2-step">
              {timeline.map((step) => {
                const isOffer = "offer" in step && step.offer;
                const isOngoing = "ongoing" in step && step.ongoing;
                return (
                  <li
                    key={step.when}
                    className={`v2-step__row${
                      isOngoing ? " v2-step__row--ongoing" : ""
                    }`}
                  >
                    <span
                      className={`v2-step__node${
                        isOngoing ? " v2-step__node--open" : ""
                      }`}
                      aria-hidden="true"
                    />
                    <div className="v2-step__content">
                      <span
                        className={`v2-glass v2-glass-pill v2-step__tag${
                          isOffer ? " v2-step__tag--offer" : ""
                        }`}
                      >
                        {step.when}
                      </span>
                      <p className="v2-step__text">{step.text}</p>
                    </div>
                  </li>
                );
              })}
            </ol>
          </Reveal>

          <Reveal delay={120} className="v2-hiw__media">
            <Image
              src="/images/phone-1.avif"
              alt="The InstaRx app showing the NAD+ intake flow"
              width={1600}
              height={2070}
              sizes="(max-width: 1024px) 90vw, 500px"
              className="v2-hiw__phone"
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
