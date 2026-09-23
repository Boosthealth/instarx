import { finalCta, INTAKE_HREF } from "./content";
import { Button } from "./ui";
import { Reveal } from "./Reveal";

/* Closing CTA band. The sticky bar watches this section and hides while it
 * is on screen, so the two never stack. */
export function FinalCta() {
  return (
    <section
      className="edv2-section edv2-section--tuck edv2-final"
      id="edv2-final"
      aria-labelledby="edv2-final-title"
    >
      <div className="edv2-container">
        <Reveal className="edv2-final__inner">
          <h2 id="edv2-final-title" className="edv2-h2">
            {finalCta.heading}
          </h2>
          <p className="edv2-final__body">{finalCta.body}</p>
          <Button href={INTAKE_HREF} size="lg" arrow>
            {finalCta.cta}
          </Button>
          <p className="edv2-small edv2-final__sub">{finalCta.sub}</p>
        </Reveal>
      </div>
    </section>
  );
}
