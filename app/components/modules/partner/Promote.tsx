import { Reveal } from "./Reveal";
import { categories, promoteNote } from "./content";

/* "What you can promote" — an editorial hairline list rather than another card
 * grid: serif category name on the left, one-line description on the right,
 * with the reassurance paragraph (providers / pharmacies / shipping) closing
 * the section. */
export function Promote() {
  return (
    <section id="promote" className="v2-section v2-bg-white">
      <div className="v2-container">
        <div className="mx-auto max-w-4xl">
          <Reveal>
            <h2 className="v2-h2 mb-10 text-center lg:mb-14">
              What you can <span className="v2-accent">promote</span>
            </h2>
          </Reveal>

          <div className="v2-promote">
            {categories.map((cat, i) => (
              <Reveal key={cat.title} delay={i * 80}>
                <div className="v2-promote__row">
                  <h3 className="v2-h3">{cat.title}</h3>
                  <p className="v2-body">{cat.body}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <p className="v2-promote__note">{promoteNote}</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
