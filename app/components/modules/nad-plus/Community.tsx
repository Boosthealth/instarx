import Image from "next/image";
import { Check } from "lucide-react";
import { Reveal } from "./Reveal";
import { V2Button } from "./ui";
import { INTAKE_HREF, supportPills } from "./content";

/* "Feel like yourself again" — a full-bleed, hero-style band: a rich pink→beige
 * gradient spans edge to edge, with a headline + short copy + a set of floating
 * frosted-glass "check" benefit pills on the left (Shed-style), and a real-person
 * cutout filling the right. The pills reuse the hero's glass treatment (no dot)
 * and sit in the copy column, aligned left with the rest of the content. */
const COMMUNITY_IMG = "/images/nad-plus/hero-2.webp";

export function Community() {
  return (
    <section className="v2-community">
      <div className="v2-community__band">
        <div className="v2-community__grid">
          {/* Left: copy + floating benefit pills + CTA */}
          <Reveal className="v2-community__copy">
            <h2 className="v2-community__title">
              Feel like <span className="v2-accent">yourself</span> again.
            </h2>
            <p className="v2-community__sub">
              There&apos;s no shame in optimizing your health with modern science.
              NAD+ therapy supports cellular energy, mental clarity, and overall
              vitality — so you can feel energized, sharp, and ready to thrive.
            </p>

            {/* Floating glass benefit pills (check + label, no dot). */}
            <p className="v2-community__pills-label">NAD+ may help support</p>
            <ul className="v2-community__pills">
              {supportPills.map((label) => (
                <li key={label} className="v2-glass v2-community__pill">
                  <Check
                    size={15}
                    strokeWidth={2.5}
                    aria-hidden="true"
                    className="v2-community__pill-check"
                  />
                  {label}
                </li>
              ))}
            </ul>

            <div className="v2-community__actions">
              <V2Button
                href={INTAKE_HREF}
                variant="primary"
                className="v2-btn--lg w-full sm:w-auto"
                arrow
              >
                Get started
              </V2Button>
            </div>
          </Reveal>

          {/* Right: real-person cutout */}
          <div className="v2-community__figure">
            <Image
              src={COMMUNITY_IMG}
              alt="An InstaRx member holding their prescription NAD+ vial"
              width={1400}
              height={1863}
              sizes="(max-width: 900px) 80vw, 640px"
              className="v2-community__photo"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
