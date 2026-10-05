import { CircleCheck } from "lucide-react";
import { benefits, type BenefitOverlay } from "./content";
import { Reveal } from "./Reveal";
import { MediaSlot } from "./ui";

/* Three benefit rows, each a soft grey box holding a photo and its copy,
 * sides alternating on desktop and the boxes almost touching, so the band
 * reads as one argument instead of three floating sections. A few frosted
 * labels sit over each photo; their strings repeat claims already on the
 * page (see BenefitOverlay in content.ts). The photos still drift inside
 * their cards as they pass. */
function Overlay({ overlay }: { overlay: BenefitOverlay }) {
  if (overlay.kind === "chips") {
    return (
      <div className="edv2-benefit__overlay edv2-benefit__overlay--chips">
        {overlay.items.map((item, i) => (
          <span
            key={item}
            className="edv2-glass edv2-glass--chip"
            style={{ "--i": i } as React.CSSProperties}
          >
            {item}
          </span>
        ))}
      </div>
    );
  }
  if (overlay.kind === "compare") {
    return (
      <div className="edv2-benefit__overlay edv2-benefit__overlay--top">
        <div className="edv2-glass edv2-glass--card edv2-compare-mini">
          <span className="edv2-compare-mini__label">{overlay.label}</span>
          <span className="edv2-compare-mini__row">
            <span>{overlay.oldLabel}</span>
            <span>{overlay.oldValue}</span>
          </span>
          <span className="edv2-compare-mini__row edv2-compare-mini__row--new">
            <span>{overlay.newLabel}</span>
            <span>{overlay.newValue}</span>
          </span>
        </div>
      </div>
    );
  }
  return (
    <div className="edv2-benefit__overlay">
      <div className="edv2-glass edv2-glass--card edv2-window-mini">
        <span className="edv2-window-mini__label">{overlay.label}</span>
        <span className="edv2-window-mini__value">{overlay.value}</span>
        <span className="edv2-window-mini__track">
          <span className="edv2-window-mini__fill" />
        </span>
      </div>
    </div>
  );
}

export function Engineered() {
  return (
    <section
      className="edv2-section edv2-benefits"
      aria-labelledby="edv2-benefits-title"
    >
      <div className="edv2-container">
        <div className="edv2-head">
          <h2 id="edv2-benefits-title" className="edv2-h2">
            {benefits.heading}
          </h2>
        </div>
        <ul className="edv2-benefits__list">
          {benefits.items.map((item) => (
            <Reveal as="li" key={item.title} className="edv2-benefit">
              <MediaSlot slot={item.media} className="edv2-benefit__media">
                {/* The overlay repeats visible copy, so it is decoration
                    for assistive tech. */}
                <div aria-hidden="true" className="edv2-benefit__layer">
                  <Overlay overlay={item.overlay} />
                </div>
              </MediaSlot>
              <div className="edv2-benefit__copy">
                <div className="edv2-benefit__intro">
                  <h3 className="edv2-h3">{item.title}</h3>
                  <p>{item.body}</p>
                </div>
                <ul className="edv2-benefit__points">
                  {item.points.map((point) => (
                    <li key={point.title}>
                      <CircleCheck aria-hidden="true" strokeWidth={2} />
                      <p>
                        <strong>{point.title}:</strong> {point.body}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
