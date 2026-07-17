import { Newspaper, BarChart3, Megaphone } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Reveal } from "./Reveal";
import { PartnerButton, Eyebrow } from "./ui";
import { programs, FORM_HREF } from "./content";

const ICONS: Record<string, LucideIcon> = {
  Newspaper,
  BarChart3,
  Megaphone,
};

/* The three partnership programs — Affiliates / Partners / Brand ambassadors.
 * Frosted glass cards (the medcard treatment from /glp2-v2) on a lilac wash,
 * each with its own CTA into the same application form. */
export function Programs() {
  return (
    <section id="programs" className="v2-section v2-bg-lilac">
      <div className="v2-container">
        <Reveal>
          <div className="mx-auto mb-12 max-w-2xl text-center lg:mb-16">
            <Eyebrow rule={false} className="justify-center">
              Programs
            </Eyebrow>
            <h2 className="v2-h2 mt-4">
              Partner <span className="v2-accent">your</span> way.
            </h2>
          </div>
        </Reveal>

        <div className="grid gap-5 md:grid-cols-3">
          {programs.map((program, i) => {
            const Icon = ICONS[program.icon];
            return (
              <Reveal key={program.title} delay={i * 100} className="flex">
                <div className="v2-progcard">
                  <span className="v2-value__icon" aria-hidden="true">
                    {Icon && <Icon size={22} strokeWidth={1.8} />}
                  </span>
                  <h3 className="v2-h3 v2-progcard__title">{program.title}</h3>
                  <p className="v2-body-sm v2-progcard__body">{program.body}</p>
                  <PartnerButton
                    href={FORM_HREF}
                    variant="primary"
                    className="v2-progcard__cta"
                    arrow
                  >
                    {program.cta}
                  </PartnerButton>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
