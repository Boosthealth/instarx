"use client";

import { useState, useRef, useEffect, type CSSProperties } from "react";
import Image from "next/image";
import { Reveal } from "./Reveal";
import { V2Button } from "./ui";
import { scienceClaims, INTAKE_HREF } from "./content";

/* "The science" — a two-column editorial split (Reference 2 layout): a serif
 * headline + a large rounded product image on the left, and an accordion of
 * scannable NAD+ claims (each row a `+` expander) on the right, capped with the
 * "Not all NAD+ is the same" line + a CTA. Sits on the existing pink/lilac wash.
 * Styling lives in nad-plus.css under `.nad-science*`; the accordion reuses the
 * FAQ height-measuring pattern.
 *
 * IMAGE: tirz-glp1.png is the GLP-1 (tirzepatide) product vial — a WRONG-PRODUCT
 * placeholder, not a neutral one. Must be replaced with a real NAD+ vial shot
 * before launch. */
const SCIENCE_IMG = "/images/tirz-glp1.png";

export function Mechanism() {
  // One row open at a time; the first opens by default.
  const [open, setOpen] = useState(0);

  return (
    <section className="v2-section v2-bg-pink">
      <div className="v2-container">
        <div className="nad-science">
          {/* Left: headline + product image */}
          <Reveal className="nad-science__lead">
            <span className="v2-glass v2-glass-pill mb-5">The science</span>
            <h2 className="nad-science__title">
              Give your cells exactly what they need with{" "}
              <span className="v2-accent">NAD+</span>.
            </h2>
            <p className="nad-science__intro">
              As you age, NAD+ levels decline — leaving you tired, foggy, and
              frustrated. NAD+ injections are a power-up at the cellular level,
              starting with your very first dose.
            </p>
            <div className="nad-science__figure">
              <Image
                src={SCIENCE_IMG}
                alt="A doctor-prescribed NAD+ injection vial"
                width={1200}
                height={1200}
                sizes="(max-width: 960px) 70vw, 420px"
                className="nad-science__img"
              />
            </div>
          </Reveal>

          {/* Right: accordion claim list + CTA */}
          <Reveal className="nad-science__panel" delay={120}>
            <ul className="nad-science__list">
              {scienceClaims.map((claim, i) => (
                <ScienceRow
                  key={claim.title}
                  title={claim.title}
                  body={claim.body}
                  isOpen={open === i}
                  onToggle={() => setOpen((cur) => (cur === i ? -1 : i))}
                />
              ))}
            </ul>

            <p className="nad-science__note">
              <strong>Not all NAD+ is the same.</strong> Be wary of cheap
              research peptides or low-absorption supplements — we only offer
              real, high-potency, doctor-prescribed NAD+ injections you can trust.
            </p>

            <V2Button
              href={INTAKE_HREF}
              variant="primary"
              className="v2-btn--lg nad-science__cta"
              arrow
            >
              See if NAD+ is for you
            </V2Button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function ScienceRow({
  title,
  body,
  isOpen,
  onToggle,
}: {
  title: string;
  body: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const innerRef = useRef<HTMLDivElement>(null);
  // Measure the body's natural height into state so the max-height transition
  // animates to an exact value (mirrors the FAQ accordion). Re-measure on resize,
  // when this row opens, and once webfonts settle — the serif display font wraps
  // differently than the fallback, so a measure taken before it loads would clip
  // the last line.
  const [contentHeight, setContentHeight] = useState(0);
  useEffect(() => {
    const measure = () => {
      if (innerRef.current) setContentHeight(innerRef.current.scrollHeight);
    };
    measure();
    window.addEventListener("resize", measure);
    if (typeof document !== "undefined" && document.fonts?.ready) {
      document.fonts.ready.then(measure).catch(() => {});
    }
    return () => window.removeEventListener("resize", measure);
  }, [isOpen]);

  const panelStyle: CSSProperties = { maxHeight: isOpen ? contentHeight : 0 };

  return (
    <li className="nad-science__item">
      <button
        type="button"
        className="nad-science__q"
        aria-expanded={isOpen}
        onClick={onToggle}
      >
        <span>{title}</span>
        <span className="nad-science__icon" aria-hidden="true">
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <line x1="5" y1="12" x2="19" y2="12" />
            <line
              x1="12"
              y1="5"
              x2="12"
              y2="19"
              style={{
                transform: isOpen ? "scaleY(0)" : "scaleY(1)",
                transformOrigin: "center",
                transition: "transform 0.25s ease",
              }}
            />
          </svg>
        </span>
      </button>
      <div className="nad-science__a" style={panelStyle} role="region">
        <div ref={innerRef} className="nad-science__a-inner">
          {body}
        </div>
      </div>
    </li>
  );
}
