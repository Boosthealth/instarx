import { benefits, finalCta, INTAKE_HREF } from "./content";
import { Ambient, Button } from "./ui";

/* The "Ready when you are" still lights this band from behind. */
const AMBIENT_SRC = benefits.items[benefits.items.length - 1]?.media.src;

/* Closing CTA band. The sticky bar watches this section and hides while it
 * is on screen, so the two never stack. */
export function FinalCta() {
  return (
    <section
      className="edv2-section edv2-section--tuck edv2-final"
      id="edv2-final"
      aria-labelledby="edv2-final-title"
    >
      {AMBIENT_SRC && <Ambient src={AMBIENT_SRC} />}
      <div className="edv2-container">
        <div className="edv2-final__inner">
          <h2 id="edv2-final-title" className="edv2-h2">
            {finalCta.heading}
          </h2>
          <p className="edv2-final__body">{finalCta.body}</p>
          <Button href={INTAKE_HREF} size="lg" arrow>
            {finalCta.cta}
          </Button>
          <p className="edv2-small edv2-final__sub">{finalCta.sub}</p>
        </div>
      </div>
    </section>
  );
}
