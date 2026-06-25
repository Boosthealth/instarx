import Image from "next/image";
import { Reveal } from "./Reveal";
import { V2Button } from "./ui";
import { INTAKE_HREF } from "./content";

/* "The kind of progress people stay for" — a full-bleed, hero-style band that
 * brings color to the page mid-scroll: a rich pink→beige gradient spans edge to
 * edge, with the copy + CTA on the left and a real-person cutout (woman holding
 * a GLP-1 vial) filling the right. Mirrors the hero's split layout. This band
 * owns the retention/stickiness angle — members keep going past month one —
 * which no other section on the page claims, so it doesn't restate the hero. */
const COMMUNITY_IMG = "/images/community-2.webp";

export function Community() {
  return (
    <section className="v2-community">
      <div className="v2-community__band">
        <div className="v2-community__grid">
          {/* Left: copy + CTA */}
          <Reveal className="v2-community__copy">
            <h2 className="v2-community__title">
              The kind of progress people{" "}
              <span className="v2-accent">stay</span> for.
            </h2>
            <p className="v2-community__sub">
              GLP-1 isn't a one-month fix — and most members don't treat it like
              one. They keep going well past their first month, because steady
              support makes it stick when willpower alone doesn't.
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
