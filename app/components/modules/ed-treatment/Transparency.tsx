import { Check } from "lucide-react";
import { Reveal } from "./Reveal";
import { transparency } from "./content";

/* 5.9 straight answers about compounding. */
export function Transparency() {
  return (
    <section
      className="ed-section ed-section--surface"
      aria-labelledby="ed-trans"
    >
      <Reveal className="ed-wrap ed-trans">
        <h2 id="ed-trans" className="ed-h2">
          {transparency.headline}
        </h2>
        <div>
          <p className="ed-trans__body">{transparency.body}</p>
          <ul className="ed-checks">
            {transparency.bullets.map((b) => (
              <li key={b}>
                <Check size={16} strokeWidth={2.5} aria-hidden="true" />
                {b}
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </section>
  );
}
