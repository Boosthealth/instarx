import Image from "next/image";
import { Reveal } from "./Reveal";
import { V2Button } from "./ui";
import { INTAKE_HREF } from "./content";

/* "Real people, real results" community band — a Mochi-style photo section with
 * a glass overlay card (leveraging the hero's glass treatment). A real-person
 * lifestyle photo fills the rounded card; a frosted glass panel sits over it
 * holding the headline + supporting copy on the left and the CTAs on the right.
 * No form — it's a content/CTA band. Placeholder photo for now. */
const COMMUNITY_IMG = "/images/community-placeholder.png";

export function Community() {
  return (
    <section className="v2-community">
      <div className="v2-container">
        <Reveal>
          <div className="v2-community__card">
            {/* Real-person background photo (pre-darkened so white text reads) */}
            <Image
              src={COMMUNITY_IMG}
              alt="An InstaRx member preparing a healthy smoothie at home"
              fill
              sizes="(max-width: 1280px) 100vw, 1200px"
              className="v2-community__photo"
              priority={false}
            />
            {/* Scrim so the glass card + text stay legible over any photo */}
            <div className="v2-community__scrim" aria-hidden="true" />

            {/* Glass overlay card */}
            <div className="v2-community__glass v2-glass">
              <div className="v2-community__inner">
                <div className="v2-community__copy">
                  <p className="v2-eyebrow mb-4">Real people, real results</p>
                  <h2 className="v2-community__title">
                    Thousands losing weight,{" "}
                    <span className="v2-accent">together</span>.
                  </h2>
                  <p className="v2-community__sub">
                    Over 10,000 members are losing up to 17% of their body weight
                    with InstaRx — backed by U.S.-licensed physicians and 1:1 care
                    every step of the way.
                  </p>
                </div>
                <div className="v2-community__actions">
                  <V2Button
                    href={INTAKE_HREF}
                    variant="primary"
                    className="v2-btn--lg w-full sm:w-auto"
                    arrow
                  >
                    Find your treatment
                  </V2Button>
                  <V2Button
                    href={INTAKE_HREF}
                    variant="glass"
                    className="v2-btn--lg w-full sm:w-auto"
                  >
                    See pricing
                  </V2Button>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
