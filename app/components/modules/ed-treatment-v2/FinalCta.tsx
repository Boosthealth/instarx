import Image from "next/image";
import { benefits, finalCta, INTAKE_HREF } from "./content";
import { Ambient, Button, TrustBadge } from "./ui";

/* The "Ready when you are" still lights this band from behind. */
const AMBIENT_SRC = benefits.items[benefits.items.length - 1]?.media.src;

/* Closing CTA band: rating pill, heading, button, then a slow strip of the
 * page's own stills and three night frames made for it, tilted a few degrees
 * each, rolling slowly and fading out at the edges. The strip is decoration only
 * (every photo already appears above with its copy), so it is hidden from
 * assistive tech and stands still under reduced motion. The sticky bar
 * watches this section and hides while it is on screen, so the two never
 * stack. */
export function FinalCta() {
  const cards = finalCta.strip.map((src, i) => (
    <li key={`${src}-${i}`} className="edv2-still">
      <Image
        src={src}
        alt=""
        fill
        sizes="(min-width: 48rem) 192px, 144px"
        className="edv2-still__img"
      />
    </li>
  ));

  return (
    <section
      className="edv2-section edv2-section--tuck edv2-final"
      id="edv2-final"
      aria-labelledby="edv2-final-title"
    >
      {AMBIENT_SRC && <Ambient src={AMBIENT_SRC} />}
      <div className="edv2-container">
        <div className="edv2-final__inner">
          <TrustBadge compact onDark />
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

      <div className="edv2-strip" aria-hidden="true">
        <div className="edv2-strip__track">
          <ul className="edv2-strip__set">{cards}</ul>
          {/* Second copy makes the loop seamless. */}
          <ul className="edv2-strip__set">{cards}</ul>
        </div>
      </div>
    </section>
  );
}
