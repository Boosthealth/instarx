"use client";

import { useRef, useState, type CSSProperties } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { formula, type Ingredient } from "./content";
import { MediaSlot } from "./ui";
import { Reveal } from "./Reveal";

const N = formula.items.length;

/* The signature section. Desktop: a runway N viewports tall with one sticky
 * viewport; card i+1 rises over card i, which recedes (scale 0.94, opacity
 * 0.55). Driven by useScroll so it is exactly scrubbable, with the full
 * transform string so Framer hands it to the compositor. Mobile: a plain
 * CSS scroll-snap carousel with no scroll-linking at all. Reduced motion:
 * the runway collapses into a static stacked list. */
export function CompleteStack() {
  const runwayRef = useRef<HTMLDivElement | null>(null);
  const reduce = useReducedMotion() ?? false;
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({
    target: runwayRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    const next = Math.min(N - 1, Math.floor(p * N));
    if (next !== active) setActive(next);
  });

  return (
    <section
      className="edv2-stack"
      id="formula"
      aria-labelledby="edv2-stack-title"
    >
      <div className="edv2-container">
        <Reveal className="edv2-head">
          <h2 id="edv2-stack-title" className="edv2-h2">
            {formula.heading}
          </h2>
          <p className="edv2-lead">{formula.sub}</p>
        </Reveal>
      </div>

      {/* Desktop runway */}
      <div
        ref={runwayRef}
        className="edv2-stack__runway"
        data-static={reduce ? "true" : "false"}
        style={{ "--stack-n": N } as CSSProperties}
      >
        <div className="edv2-stack__viewport">
          <div className="edv2-container edv2-stack__frame">
            {formula.items.map((item, i) => (
              <StackCard
                key={item.key}
                item={item}
                index={i}
                progress={scrollYProgress}
                reduce={reduce}
              />
            ))}
          </div>
          {!reduce && (
            <div className="edv2-stack__rail" aria-hidden="true">
              {formula.items.map((item, i) => (
                <span
                  key={item.key}
                  className="edv2-stack__dot"
                  data-active={i === active ? "true" : "false"}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile carousel */}
      <div
        className="edv2-stack__carousel"
        role="list"
        aria-label="The four ingredients"
      >
        {formula.items.map((item, i) => (
          <article key={item.key} className="edv2-stack__slide" role="listitem">
            <MediaSlot slot={item.media} className="edv2-stack__slide-media" />
            <div className="edv2-stack__copy">
              <span className="edv2-stack__index">
                {String(i + 1).padStart(2, "0")} / {String(N).padStart(2, "0")}
              </span>
              <h3 className="edv2-stack__word">{item.title}</h3>
              <p className="edv2-stack__ingredient">{item.ingredient}</p>
              <p className="edv2-stack__role">{item.role}</p>
              <div className="edv2-stack__meta">
                <span className="edv2-chip edv2-chip--on-dark">
                  {item.approval}
                </span>
                <span className="edv2-chip edv2-chip--on-dark">
                  {item.strength}
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="edv2-container">
        <p className="edv2-small edv2-stack__footer">{formula.footer}</p>
      </div>
    </section>
  );
}

function StackCard({
  item,
  index,
  progress,
  reduce,
}: {
  item: Ingredient;
  index: number;
  progress: MotionValue<number>;
  reduce: boolean;
}) {
  const start = index / N;
  const end = (index + 1) / N;
  const half = 0.5 / N;

  // Enter: hold below, then rise over the second half of the previous
  // card's window so each card gets a still moment before the next covers it.
  const y = useTransform(
    progress,
    [Math.max(0, start - half), start],
    [index === 0 ? "0%" : "110%", "0%"],
  );
  // Recede: shrink and dim while the next card rises over this one.
  const scale = useTransform(
    progress,
    [end - half, end],
    [1, index === N - 1 ? 1 : 0.94],
  );
  const opacity = useTransform(
    progress,
    [end - half, end],
    [1, index === N - 1 ? 1 : 0.55],
  );
  const transform = useMotionTemplate`translate3d(0, ${y}, 0) scale(${scale})`;

  return (
    <motion.article
      className="edv2-stack__card"
      style={reduce ? undefined : { transform, opacity, zIndex: index + 1 }}
      aria-label={`${item.title}: ${item.ingredient}`}
    >
      <div className="edv2-stack__card-inner">
        <MediaSlot slot={item.media} className="edv2-stack__media" />
        <div className="edv2-stack__copy">
          <span className="edv2-stack__index">
            {String(index + 1).padStart(2, "0")} / {String(N).padStart(2, "0")}
          </span>
          <h3 className="edv2-stack__word">{item.title}</h3>
          <p className="edv2-stack__ingredient">{item.ingredient}</p>
          <p className="edv2-stack__role">{item.role}</p>
          <div className="edv2-stack__meta">
            <span className="edv2-chip edv2-chip--on-dark">
              {item.approval}
            </span>
            <span className="edv2-chip edv2-chip--on-dark">
              {item.strength}
            </span>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
