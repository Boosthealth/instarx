import type { CSSProperties } from "react";
import { delivered } from "./content";
import { Glyph, type GlyphName } from "./Glyph";
import { MediaSlot } from "./ui";
import { Reveal } from "./Reveal";

const GLYPHS: GlyphName[] = ["stethoscope", "clipboard", "package"];

/* Trust band: packaging shot plus three proof chips. The shot bleeds up
 * over the band above on wide screens; the chips rise as one group. */
export function Delivered() {
  return (
    <section
      className="edv2-section edv2-section--soft edv2-delivered"
      aria-labelledby="edv2-delivered-title"
    >
      <div className="edv2-container edv2-delivered__grid">
        <MediaSlot slot={delivered.media} className="edv2-delivered__media" />
        <div className="edv2-delivered__copy">
          <h2 id="edv2-delivered-title" className="edv2-h2">
            {delivered.heading}
          </h2>
          <p className="edv2-lead">{delivered.body}</p>
          <Reveal className="edv2-delivered__chips edv2-stagger" as="ul">
            {delivered.chips.map((chip, i) => (
              <li
                key={chip.title}
                className="edv2-trust edv2-stagger__item"
                style={{ "--i": i } as CSSProperties}
              >
                <span className="edv2-trust__icon">
                  <Glyph name={GLYPHS[i] ?? "stethoscope"} />
                </span>
                <div>
                  <p className="edv2-trust__title">{chip.title}</p>
                  <p className="edv2-trust__detail">{chip.detail}</p>
                </div>
              </li>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
