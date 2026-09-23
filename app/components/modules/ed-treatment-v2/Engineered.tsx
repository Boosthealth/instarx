import { benefits } from "./content";
import { MediaSlot } from "./ui";

/* Three benefit rows, media and copy alternating sides on desktop. No
 * entrance fade: the photos drift inside their cards as they pass, and a
 * warm pool of light sits behind each one. The last card overlaps into the
 * band below. */
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
            <li key={item.title} className="edv2-benefit">
              <MediaSlot slot={item.media} className="edv2-benefit__media" />
              <div className="edv2-benefit__copy">
                <h3 className="edv2-h3">{item.title}</h3>
                <p>{item.body}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
