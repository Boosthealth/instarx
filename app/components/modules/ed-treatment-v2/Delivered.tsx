import { ClipboardCheck, Package, Stethoscope } from "lucide-react";
import { delivered } from "./content";
import { MediaSlot } from "./ui";
import { Reveal } from "./Reveal";

const ICONS = [Stethoscope, ClipboardCheck, Package];

/* Trust band: packaging shot plus three proof chips. */
export function Delivered() {
  return (
    <section
      className="edv2-section edv2-section--soft edv2-delivered"
      aria-labelledby="edv2-delivered-title"
    >
      <div className="edv2-container edv2-delivered__grid">
        <Reveal>
          <MediaSlot slot={delivered.media} className="edv2-delivered__media" />
        </Reveal>
        <Reveal className="edv2-delivered__copy" delay={80}>
          <h2 id="edv2-delivered-title" className="edv2-h2">
            {delivered.heading}
          </h2>
          <p className="edv2-lead">{delivered.body}</p>
          <ul className="edv2-delivered__chips">
            {delivered.chips.map((chip, i) => {
              const Icon = ICONS[i] ?? Stethoscope;
              return (
                <li key={chip.title} className="edv2-trust">
                  <span className="edv2-trust__icon" aria-hidden="true">
                    <Icon strokeWidth={2} />
                  </span>
                  <div>
                    <p className="edv2-trust__title">{chip.title}</p>
                    <p className="edv2-trust__detail">{chip.detail}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
