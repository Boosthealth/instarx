import Image from "next/image";
import { Reveal } from "./Reveal";
import { timeline } from "./content";

export function HowItWorks() {
  return (
    <section id="how-it-works" className="v2-section v2-bg-white">
      <div className="v2-container">
        {/* Two columns: timeline list on the left, bottom-aligned phone on the
            right. White background so the app screenshot's white edges blend. */}
        <div className="grid grid-cols-1 items-end gap-12 lg:grid-cols-[1fr_0.9fr] lg:gap-16">
          <Reveal>
            <h2 className="v2-h2 mb-4">
              Get your weight loss meds in{" "}
              <span className="v2-accent">1–2 days</span>
            </h2>
            <p className="v2-lede mb-10">
              Concierge medical weight loss without the waiting room.
            </p>

            <ol className="v2-timeline">
              {timeline.map((step) => (
                <li key={step.when} className="v2-timeline__row">
                  <div className="v2-timeline__head">
                    <span className="v2-glass v2-glass-pill v2-timeline__tag">
                      {step.when}
                    </span>
                    <span className="v2-timeline__rule" aria-hidden="true" />
                  </div>
                  <p className="v2-timeline__text">{step.text}</p>
                </li>
              ))}
            </ol>
          </Reveal>

          <Reveal delay={120} className="flex justify-center lg:justify-end">
            <Image
              src="/lose-weight/timeline.webp"
              alt="The InstaRx app showing the weight-loss intake flow"
              width={460}
              height={920}
              sizes="(max-width: 1024px) 90vw, 500px"
              className="h-auto w-full max-w-[360px] object-contain lg:max-w-[480px]"
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
