import type { CSSProperties } from "react";
import Image from "next/image";
import { press } from "./content";
import { Reveal } from "./Reveal";

/* Press logo wall: one centred, wrapping row of monochrome outlet wordmarks
 * on the dark ground directly under the hero, so the hero's night carries on
 * for one more beat before the stack. The marks are the same files the other
 * landers use under "As featured in", turned white by a CSS filter. Motion
 * is the 21st.dev "cinematic logo cloud" entrance, done in CSS: each mark
 * resolves out of a blur, in order, once, when the row scrolls in. A static
 * row; the only marquee on the page is the still strip under the final CTA. */
export function PressWall() {
  return (
    <section className="edv2-press" aria-labelledby="edv2-press-lead">
      <div className="edv2-container">
        <Reveal as="p" className="edv2-press__lead">
          <span id="edv2-press-lead">{press.lead}</span>
        </Reveal>
        <Reveal className="edv2-stagger edv2-press__wall">
          {/* role="list" keeps the list announced in Safari, which drops
              list semantics on list-style: none. */}
          <ul
            className="edv2-press__list"
            role="list"
            aria-label={press.listLabel}
          >
            {press.items.map((logo, i) => (
              <li
                key={logo.name}
                className="edv2-press__item edv2-stagger__item"
                style={{ "--i": i, "--h": logo.px } as CSSProperties}
              >
                {/* unoptimized: small monochrome SVGs, the optimizer would only
                    add a round-trip (and refuses SVG without dangerouslyAllowSVG). */}
                <Image
                  className={`edv2-press__logo${logo.twoTone ? " edv2-press__logo--two-tone" : ""}`}
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
