import Image from "next/image";
import { Reveal } from "./Reveal";
import { steps, kitItems } from "./content";

export function HowItWorks() {
  return (
    <section id="how-it-works" className="v2-section v2-bg-cream">
      <div className="v2-container">
        <Reveal className="mx-auto mb-14 max-w-2xl text-center">
          <p className="v2-eyebrow mb-5 inline-flex justify-center">
            The process
          </p>
          <h2 className="v2-h2 mb-5">
            Get your meds in <span className="v2-accent">1–2 days</span>.
          </h2>
          <p className="v2-lede">
            Concierge medical weight loss without the waiting room.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 gap-x-10 gap-y-10 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <Reveal as="div" key={step.n} delay={i * 70}>
              <div className="flex items-baseline gap-3">
                <span
                  className="v2-h3"
                  style={{ color: "var(--v2-rose)", fontStyle: "italic" }}
                >
                  {step.n}
                </span>
                <span
                  className="text-xs font-semibold uppercase tracking-wider"
                  style={{ color: "var(--v2-ink-mute)" }}
                >
                  {step.when}
                </span>
              </div>
              <div
                className="my-4 h-px w-full"
                style={{ background: "var(--v2-line)" }}
              />
              <h3
                className="mb-2 text-lg font-semibold"
                style={{ color: "var(--v2-ink)" }}
              >
                {step.title}
              </h3>
              <p style={{ color: "var(--v2-ink-soft)" }}>{step.body}</p>
            </Reveal>
          ))}
        </div>

        {/* Kit contents */}
        <Reveal className="mt-16">
          <div
            className="grid grid-cols-1 items-center gap-10 overflow-hidden rounded-[28px] p-8 sm:p-10 lg:grid-cols-2"
            style={{ background: "var(--v2-cream-2)", border: "1px solid var(--v2-line)" }}
          >
            <div>
              <p
                className="mb-5 text-xs font-semibold uppercase tracking-[0.2em]"
                style={{ color: "var(--v2-rose-deep)" }}
              >
                In every temperature-controlled kit
              </p>
              <ul className="space-y-3">
                {kitItems.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="var(--v2-rose)"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                      className="mt-1 shrink-0"
                    >
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                    <span style={{ color: "var(--v2-ink-soft)" }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="overflow-hidden rounded-2xl">
              <Image
                src="/lose-weight/timeline.webp"
                alt="InstaRx temperature-controlled medication kit and app"
                width={620}
                height={420}
                sizes="(max-width: 1024px) 100vw, 520px"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
