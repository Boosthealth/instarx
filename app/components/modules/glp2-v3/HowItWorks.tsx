import Image from "next/image";
import { Reveal } from "./Reveal";
import { howItWorks } from "./content";

/* S3 — How it works (Spray → Absorb → Circulate). Close-up image above three
 * numbered step cards, per the build sheet ("reuse Pharmacy Hub pattern"). */
export function HowItWorks() {
  return (
    <section id="how-it-works" className="v2-section v2-bg-white">
      <div className="v2-container">
        <Reveal className="mx-auto mb-10 max-w-2xl text-center lg:mb-14">
          <p className="v2-eyebrow v2-kicker-rule mb-5 inline-flex">The process</p>
          <h2 className="v2-h2 mb-4">{howItWorks.title}</h2>
          <p className="v2-lede mx-auto max-w-xl">{howItWorks.lead}</p>
        </Reveal>

        <Reveal delay={80} className="v2-steps3__media">
          <Image
            src={howItWorks.media}
            alt={howItWorks.mediaAlt}
            width={howItWorks.mediaWidth}
            height={howItWorks.mediaHeight}
            sizes="(max-width: 640px) 92vw, 640px"
            className="w-full"
          />
          {/* Decorative mist — echoes "a fine mist" from the copy; disabled
              under prefers-reduced-motion in CSS. */}
          <span className="v2-mist" aria-hidden="true">
            <span style={{ left: "18%", width: 10, height: 10, animationDelay: "0s" }} />
            <span style={{ left: "34%", width: 7, height: 7, animationDelay: "1.1s" }} />
            <span style={{ left: "52%", width: 12, height: 12, animationDelay: "0.5s" }} />
            <span style={{ left: "67%", width: 8, height: 8, animationDelay: "2s" }} />
            <span style={{ left: "80%", width: 9, height: 9, animationDelay: "1.6s" }} />
          </span>
        </Reveal>

        <div className="v2-steps3__grid">
          {howItWorks.steps.map((step, i) => (
            <Reveal key={step.n} delay={i * 90} className="v2-step3card">
              <span className="v2-step3card__num">{step.n}</span>
              <h3 className="v2-step3card__title">{step.title}</h3>
              <p className="v2-step3card__body">{step.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
