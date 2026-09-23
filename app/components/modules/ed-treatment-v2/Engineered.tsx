import { benefits } from "./content";
import { MediaSlot } from "./ui";
import { Reveal } from "./Reveal";

/* Three benefit rows, media and copy alternating sides on desktop. */
export function Engineered() {
  return (
    <section
      className="edv2-section edv2-benefits"
      aria-labelledby="edv2-benefits-title"
    >
      <div className="edv2-container">
        <Reveal className="edv2-head">
          <h2 id="edv2-benefits-title" className="edv2-h2">
            {benefits.heading}
          </h2>
        </Reveal>
        <ul className="edv2-benefits__list">
          {benefits.items.map((item) => (
            <Reveal key={item.title} as="li" className="edv2-benefit">
              <MediaSlot slot={item.media} className="edv2-benefit__media" />
              <div className="edv2-benefit__copy">
                <h3 className="edv2-h3">{item.title}</h3>
                <p>{item.body}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
