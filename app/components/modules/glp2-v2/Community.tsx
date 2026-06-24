import Image from "next/image";
import { Reveal } from "./Reveal";
import { V2Button } from "./ui";
import { INTAKE_HREF } from "./content";

/* "Thousands losing weight, together" — a full-bleed, hero-style band that
 * brings color to the page mid-scroll: a rich pink→beige gradient spans edge to
 * edge, with the copy + CTA on the left and a real-person cutout (woman holding
 * a GLP-1 vial) filling the right. Mirrors the hero's split layout. */
const COMMUNITY_IMG = "/images/1 hero.png";

export function Community() {
  return (
    <section className="v2-community">
      <div className="v2-community__band">
        <div className="v2-community__grid">
          {/* Left: copy + CTA */}
          <Reveal className="v2-community__copy">
            <h2 className="v2-community__title">
              Thousands losing weight,{" "}
              <span className="v2-accent">together</span>.
            </h2>
            <p className="v2-community__sub">
              Over 10,000 members are losing up to 17% of their body weight with
              InstaRx — backed by U.S.-licensed physicians and 1:1 care every
              step of the way.
            </p>
            <div className="v2-community__actions">
              <V2Button
                href={INTAKE_HREF}
                variant="primary"
                className="v2-btn--lg w-full sm:w-auto"
                arrow
              >
                Find your treatment
              </V2Button>
            </div>
          </Reveal>

          {/* Right: real-person cutout */}
          <div className="v2-community__figure">
            <Image
              src={COMMUNITY_IMG}
              alt="An InstaRx member holding her prescription GLP-1 vial"
              width={1696}
              height={2200}
              sizes="(max-width: 900px) 80vw, 640px"
              className="v2-community__photo"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
