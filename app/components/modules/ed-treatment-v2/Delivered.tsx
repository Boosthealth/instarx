import type { CSSProperties } from "react";
import { delivered } from "./content";
import { ParallaxLayer } from "./Parallax";
import { Reveal } from "./Reveal";
import { SlotImage } from "./ui";

/* Trust band over a full-bleed night still, the partner of the Steps band
 * further down: same house look (one warm tungsten key, navy shadow, grain),
 * different composition so the two read as a rhythm rather than a repeat.
 * Steps runs its copy along the foot of the frame; here the heading and one
 * frosted panel (body plus the three proof points as a hairline list) stand
 * in a single column on the shadowed left, the lit box on the right. Phones
 * stack the same pieces: heading at the top, panel at the foot. The still is
 * decorative; the copy carries the meaning, so it is hidden from assistive
 * tech. */
export function Delivered() {
  return (
    <section className="edv2-delivered" aria-labelledby="edv2-delivered-title">
      <div className="edv2-delivered__media" aria-hidden="true">
        <ParallaxLayer>
          <SlotImage
            src={delivered.media.src}
            srcMobile={delivered.media.srcMobile}
            sizes="100vw"
            className="edv2-slot__img"
          />
        </ParallaxLayer>
        <div className="edv2-slot__grain" />
      </div>
      <div className="edv2-delivered__scrim" aria-hidden="true" />
      <div className="edv2-container edv2-delivered__content">
        <div className="edv2-head edv2-delivered__head">
          <h2 id="edv2-delivered-title" className="edv2-h2">
            {delivered.heading}
          </h2>
        </div>
        <Reveal className="edv2-delivered__panel edv2-glass edv2-stagger">
          <p className="edv2-lead edv2-delivered__body">{delivered.body}</p>
          <ul className="edv2-delivered__list" role="list">
            {delivered.chips.map((chip, i) => (
              <li
                key={chip.title}
                className="edv2-trust edv2-stagger__item"
                style={{ "--i": i } as CSSProperties}
              >
                <p className="edv2-trust__title">{chip.title}</p>
                <p className="edv2-trust__detail">{chip.detail}</p>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
