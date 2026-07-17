import { TrendingUp, Wallet, Palette } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Reveal } from "./Reveal";
import { whyIntro, valueProps } from "./content";

const ICONS: Record<string, LucideIcon> = {
  TrendingUp,
  Wallet,
  Palette,
};

/* "Why partner with InstaRx" — centered intro (client copy verbatim) over three
 * white value-prop cards. Cards use the shared .v2-card primitive with the
 * cream icon tile from the trust row. */
export function WhyPartner() {
  return (
    <section id="why" className="v2-section v2-bg-pink--soft">
      <div className="v2-container">
        <Reveal>
          <div className="mx-auto mb-12 max-w-3xl text-center lg:mb-16">
            <h2 className="v2-h2 mb-5">
              Why partner with <span className="v2-accent">InstaRx</span>
            </h2>
            <p className="v2-body">{whyIntro}</p>
          </div>
        </Reveal>

        <div className="grid gap-5 md:grid-cols-3">
          {valueProps.map((prop, i) => {
            const Icon = ICONS[prop.icon];
            return (
              <Reveal key={prop.title} delay={i * 100}>
                <div className="v2-value">
                  <span className="v2-value__icon" aria-hidden="true">
                    {Icon && <Icon size={22} strokeWidth={1.8} />}
                  </span>
                  <h3 className="v2-h3 v2-value__title">{prop.title}</h3>
                  <p className="v2-body-sm">{prop.body}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
