import Image from "next/image";
import { Check } from "lucide-react";
import { Reveal } from "./Reveal";
import { qualityTests } from "./content";

/* "Always quality tested" — a trust section (Reference 4 layout): a left rail
 * with the headline + intro, and a right stack of hairline-separated rows, each
 * pairing a test name + a green PASSED badge with its description. A small
 * cluster of lab photos sits top-right. Styling lives in nad-plus.css under
 * `.nad-quality*`; the PASSED green reuses the in-stock status green. */
const LAB_IMG = "/images/nad-plus/quality.webp";

export function QualityTested() {
  return (
    <section className="v2-section v2-bg-sand">
      <div className="v2-container">
        <div className="nad-quality">
          {/* Left: headline + intro + lab photo */}
          <Reveal className="nad-quality__lead">
            <p className="v2-eyebrow v2-kicker-rule mb-5 inline-flex">
              Quality &amp; safety
            </p>
            <h2 className="nad-quality__title">
              Always quality tested, with{" "}
              <span className="v2-accent">proven results</span>
            </h2>
            <p className="nad-quality__intro">
              Your NAD+ is delivered from a state-licensed pharmacy in our
              network, straight to your door.
            </p>
            <p className="nad-quality__body">
              Every batch is fully tested in chemistry and microbiology labs at
              the pharmacy facility to meet strict guidelines — giving you full
              confidence through strict compliance with cGMP regulations.
            </p>
            <div className="nad-quality__figure">
              <Image
                src={LAB_IMG}
                alt="A technician testing NAD+ vials in a U.S. compounding pharmacy lab"
                width={1000}
                height={655}
                sizes="(max-width: 960px) 90vw, 440px"
                className="nad-quality__img"
              />
            </div>
          </Reveal>

          {/* Right: hairline-separated test rows */}
          <Reveal className="nad-quality__list" delay={120}>
            {qualityTests.map((test) => (
              <div key={test.name} className="nad-quality__row">
                <div className="nad-quality__head">
                  <h3 className="nad-quality__name">{test.name}</h3>
                  <span className="nad-quality__badge">
                    <Check size={13} strokeWidth={2.5} aria-hidden="true" />
                    Passed
                  </span>
                </div>
                <p className="nad-quality__desc">{test.desc}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
