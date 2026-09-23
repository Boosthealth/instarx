import type { CSSProperties } from "react";
import { Qualifier } from "./Qualifier";
import { Stars } from "./ui";
import { hero } from "./content";

const d = (n: number) => ({ "--d": n }) as CSSProperties;

/* 5.2. H1 + subhead + rating, then the qualifier band. The text entrance is
 * transform-only (`.ed-enter`) so the LCP text paints on the first frame. */
export function Hero() {
  return (
    <section id="hero" className="ed-hero" aria-labelledby="ed-hero-h1">
      <div className="ed-wrap">
        <div className="ed-hero__top">
          <div className="ed-hero__h1wrap">
            <ul className="ed-hero__eyebrow ed-enter" style={d(0)}>
              {hero.eyebrow.map((e) => (
                <li key={e}>{e}</li>
              ))}
            </ul>
            <h1
              id="ed-hero-h1"
              className="ed-display ed-hero__h1 ed-enter"
              style={d(1)}
            >
              {hero.headline}
            </h1>
          </div>
          <div className="ed-hero__aside">
            <p
              className="ed-hero__sub ed-hero__sub--full ed-enter"
              style={d(2)}
            >
              {hero.subhead}
            </p>
            <p
              className="ed-hero__sub ed-hero__sub--short ed-enter"
              style={d(2)}
            >
              {hero.subheadShort}
            </p>
            <p className="ed-rating ed-enter" style={d(3)}>
              <Stars />
              <span className="ed-rating__label">{hero.rating.label}</span>
              <span className="ed-rating__detail">{hero.rating.detail}</span>
            </p>
          </div>
        </div>
        <div className="ed-enter-fade" style={d(4)}>
          <Qualifier />
        </div>
      </div>
    </section>
  );
}
