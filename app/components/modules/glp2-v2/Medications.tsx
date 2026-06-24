import Image from "next/image";
import { Reveal } from "./Reveal";
import { V2Button, Stars } from "./ui";
import { medications, INTAKE_HREF } from "./content";

/* Medications — a spec-sheet diptych + pick-your-peptide (merges the old
 * "Choose your path" comparison). Each card: real vial hero, identity (with a
 * small "Most comprehensive" flag by the Tirzepatide name), three spec rows, an
 * in-stock status, and its own CTA. A single rating line closes the section. */
export function Medications() {
  return (
    <section id="medications" className="v2-section v2-bg-lilac">
      <div className="v2-container">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="v2-eyebrow v2-kicker-rule mb-4 inline-flex">
            Medications in stock
          </p>
          <h2 className="v2-h2 mb-5">
            Two proven peptides,{" "}
            <span className="v2-accent">ready to ship</span>.
          </h2>
          <p className="v2-lede mx-auto max-w-xl">
            Doctor-prescribed, dispensed by U.S.-licensed 503A pharmacies, and
            delivered in 1–2 days. Pick the one your physician recommends.
          </p>
        </Reveal>

        <div className="v2-medgrid">
          {medications.map((med, i) => (
            <Reveal
              key={med.name}
              as="article"
              delay={i * 90}
              className="v2-medcard"
            >
              {/* In-stock label — glass pill (matches hero / footer), with a
                  green status dot for the "available" signal. */}
              <span className="v2-glass v2-glass-pill v2-medcard__status">
                <span className="v2-medcard__dot" aria-hidden="true" />
                In stock
              </span>

              {/* Vial stage */}
              <div className="v2-medcard__stage">
                <Image
                  src={med.img}
                  alt={`Compounded ${med.name} vial`}
                  width={640}
                  height={640}
                  className="v2-medcard__vial"
                />
              </div>

              {/* Identity — regular eyebrow, name, + inline flag on the premium pick */}
              <p className="v2-eyebrow">{med.type}</p>
              <div className="v2-medcard__namerow">
                <h3 className="v2-medcard__name">{med.name}</h3>
                {med.flag && (
                  <span className="v2-medcard__flag">{med.flag}</span>
                )}
              </div>
              <p className="v2-medcard__tagline">{med.tagline}</p>

              {/* Spec rows */}
              <dl className="v2-medcard__specs">
                {med.specs.map((spec) => (
                  <div key={spec.label} className="v2-medcard__spec">
                    <dt>{spec.label}</dt>
                    <dd className={spec.emphasize ? "is-emph" : ""}>
                      {spec.value}
                    </dd>
                  </div>
                ))}
              </dl>

              {/* Per-card CTA — pick your peptide. Both primary, left-aligned. */}
              <V2Button
                href={INTAKE_HREF}
                variant="primary"
                className="v2-medcard__cta"
                arrow
              >
                {med.cta}
              </V2Button>
            </Reveal>
          ))}
        </div>

        {/* Rating closes the section */}
        <Reveal className="v2-medcta">
          <div
            className="v2-medcta__rating"
            role="img"
            aria-label="Rated Excellent, 4.7 out of 5 stars"
          >
            <span className="v2-medcta__score">Excellent 4.7</span>
            <Stars count={5} size={16} />
            <span className="v2-medcta__count">
              10,000+ happy customers · Same flat price, every dose
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
