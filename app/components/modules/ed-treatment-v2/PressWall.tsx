import type { CSSProperties } from "react";
import Image from "next/image";
import { press, type PressLogo } from "./content";
import { Reveal } from "./Reveal";

/* Press logo wall: one centred, wrapping row of monochrome outlet wordmarks on
 * the dark ground directly under the hero, so the hero's night carries on
 * for one more beat before the stack. Motion is the 21st.dev "cinematic logo
 * cloud" entrance, done in CSS: each mark resolves out of a blur, in order,
 * once, when the row scrolls in. A static row rather than a third marquee;
 * the page already moves at the reviews and the still strip.
 *
 * Empty-safe and honest: with no confirmed InstaRx coverage yet, the nine
 * MEDVi sample logos from content.ts render under a "layout preview" lead,
 * listed as sample logos for assistive tech, and only outside production
 * builds (VERCEL_ENV is inlined at build time). Production renders nothing
 * until `press.items` is non-empty. */
const SHOW_SAMPLES = process.env.VERCEL_ENV !== "production";

export function PressWall() {
  const live = press.items.length > 0;
  const sample = !live && SHOW_SAMPLES;
  const items: readonly PressLogo[] = live
    ? press.items
    : sample
      ? press.sample.items
      : [];
  if (items.length === 0) return null;

  return (
    <section className="edv2-press" aria-labelledby="edv2-press-lead">
      <div className="edv2-container">
        <Reveal as="p" className="edv2-press__lead">
          <span id="edv2-press-lead">
            {sample ? press.sample.lead : press.lead}
          </span>
        </Reveal>
        <Reveal className="edv2-stagger edv2-press__wall">
          {/* role="list" keeps the list (and its sample label) announced in
              Safari, which drops list semantics on list-style: none. */}
          <ul
            className="edv2-press__list"
            role="list"
            aria-label={sample ? press.sample.listLabel : press.listLabel}
          >
            {items.map((logo, i) => (
              <li
                key={logo.name}
                className="edv2-press__item edv2-stagger__item"
                style={{ "--i": i, "--h": logo.h } as CSSProperties}
              >
                {/* unoptimized: tiny monochrome SVGs, the optimizer would only
                    add a round-trip (and refuses SVG without dangerouslyAllowSVG). */}
                <Image
                  className="edv2-press__logo"
                  src={logo.src}
                  alt={logo.name}
                  width={logo.w}
                  height={logo.h}
                  unoptimized
                />
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
