import { Reveal } from "./Reveal";
import { EdButton, SafetyStrip } from "./ui";
import { INTAKE_HREF, finalCta } from "./content";

/* 5.14 close. */
export function FinalCTA() {
  return (
    <section
      id="final-cta"
      className="ed-section ed-section--ink ed-final"
      aria-labelledby="ed-final"
    >
      <Reveal className="ed-wrap">
        <h2 id="ed-final" className="ed-display ed-final__h2">
          {finalCta.headline}
        </h2>
        <p className="ed-final__body">{finalCta.body}</p>
        <div className="ed-final__row">
          <EdButton href={INTAKE_HREF} variant="light">
            {finalCta.cta}
          </EdButton>
          <span className="ed-final__sub">{finalCta.sub}</span>
        </div>
        <SafetyStrip className="ed-final__safety" />
      </Reveal>
    </section>
  );
}
