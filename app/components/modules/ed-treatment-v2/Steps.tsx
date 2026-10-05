import type { CSSProperties } from "react";
import { steps } from "./content";
import { ParallaxLayer } from "./Parallax";
import { Reveal } from "./Reveal";
import { SlotImage } from "./ui";

/* Three numbered steps over a full-bleed night still: the visit happens
 * from the sofa, so the band shows one. Heading at the top, the steps in a
 * single frosted panel along the bottom, one object with hairline dividers.
 * Numbers stay: the sequence carries information. The still is decorative;
 * the copy carries the meaning, so it is hidden from assistive tech. */
export function Steps() {
  return (
    <section
      className="edv2-steps"
      id="how-it-works"
      aria-labelledby="edv2-steps-title"
    >
      <div className="edv2-steps__media" aria-hidden="true">
        <ParallaxLayer>
          <SlotImage
            src={steps.media.src}
            srcMobile={steps.media.srcMobile}
            sizes="100vw"
            className="edv2-slot__img"
          />
        </ParallaxLayer>
        <div className="edv2-slot__grain" />
      </div>
      <div className="edv2-steps__scrim" aria-hidden="true" />
      <div className="edv2-container edv2-steps__content">
        <div className="edv2-head edv2-steps__head">
          <h2 id="edv2-steps-title" className="edv2-h2">
            {steps.heading}
          </h2>
        </div>
        <Reveal as="ol" className="edv2-steps__list edv2-glass edv2-stagger">
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
