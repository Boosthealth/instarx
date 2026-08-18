import Image from "next/image";
import { Reveal } from "./Reveal";
import { V2Button } from "./ui";
import { medication, INTAKE_HREF } from "./content";

/* S4 — The medication (navy-teal panel). Group image in a rounded card + ONE
 * product spec card (no chooser — this build only sells GLP-1 Tirzepatide).
 * The 20.9% claim's footnote is mandatory in the same viewport, so it renders
 * inside the card, directly under the spec rows — never pushed to the footer. */
export function Medication() {
  return (
    <section id="medication" className="v2-section v2-medpanel">
      <div className="v2-container">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="v2-eyebrow v2-kicker-rule mb-4 inline-flex">
            {medication.eyebrow}
          </p>
          <h2 className="v2-h2 mb-5">{medication.title}</h2>
          <p className="v2-medpanel__body mx-auto max-w-xl">{medication.body}</p>
        </Reveal>

        <div className="v2-medpanel__grid">
          <Reveal className="v2-medpanel__imgcard">
            <Image
              src={medication.img}
              alt={medication.imgAlt}
              width={medication.imgWidth}
              height={medication.imgHeight}
              sizes="(max-width: 860px) 92vw, 440px"
              className="w-full"
            />
          </Reveal>

          <Reveal delay={90} as="article" className="v2-medcard">
            <h3 className="v2-medcard__name">{medication.card.name}</h3>

            <dl className="v2-medcard__specs">
              {medication.card.specs.map((spec) => {
                const ddClass = [
                  spec.emphasize && "is-emph",
                  spec.isPrice && "is-price",
                ]
                  .filter(Boolean)
                  .join(" ");
                return (
                  <div key={spec.label} className="v2-medcard__spec">
                    <dt>{spec.label}</dt>
                    <dd className={ddClass}>{spec.value}</dd>
                  </div>
                );
              })}
            </dl>

            <V2Button
              href={INTAKE_HREF}
              variant="primary"
              className="v2-medcard__cta"
              arrow
            >
              {medication.card.cta}
            </V2Button>

            <p className="v2-medpanel__footnote">{medication.footnote}</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
