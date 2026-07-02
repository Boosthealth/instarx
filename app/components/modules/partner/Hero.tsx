import { Stethoscope, Package, BadgeDollarSign } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { GradientBg } from "./GradientBg";
import { PartnerButton } from "./ui";
import { heroChecks, FORM_HREF } from "./content";

const ICONS: Record<string, LucideIcon> = {
  Stethoscope,
  Package,
  BadgeDollarSign,
};

/* Contained hero (Lightship-style, matching /glp2-v2): a rounded gradient card
 * inset from the browser edges, with the animated pastel GradientBg behind the
 * content. No product photo here — the partner pitch is copy-led, so the copy
 * sits centered over the gradient with the frosted trust strip anchoring the
 * card's lower edge. */
export function Hero() {
  return (
    <div className="v2-hero-wrap" id="top">
      <section className="v2-hero-card" aria-label="Partner with InstaRx">
        <GradientBg />

        <div className="v2-phero">
          {/* glass tag */}
          <span className="v2-glass v2-glass-pill">
            <span className="v2-glass-dot" aria-hidden="true" />
            InstaRx Partner Program
          </span>

          <h1 className="v2-display v2-phero__title">
            Partner with <span className="v2-accent">InstaRx</span>
          </h1>

          <p className="v2-lede v2-phero__lede">
            Turn your audience&apos;s health goals into results — and get
            rewarded for it.
          </p>

          <p className="v2-phero__body">
            Millions of people are ready to take control of their weight, their
            energy, and their confidence. InstaRx makes it effortless:
            doctor-backed GLP-1 treatments, anti-aging care, and intimacy
            solutions, delivered 100% online with free, discreet shipping.
            Partner with us and put a brand people actually want to talk about
            in front of your audience.
          </p>

          <div className="v2-phero__actions">
            <PartnerButton
              href={FORM_HREF}
              variant="primary"
              className="v2-btn--lg w-full sm:w-auto"
              arrow
            >
              Apply now
            </PartnerButton>
            <PartnerButton
              href="#programs"
              variant="glass"
              className="v2-btn--lg w-full sm:w-auto"
            >
              Explore programs
            </PartnerButton>
          </div>

          {/* Frosted trust strip — same three-column glass band as the product
              landers, carrying the brand facts partners lean on. */}
          <div className="v2-trustbar v2-phero__trustbar">
            {heroChecks.map((item) => {
              const Icon = ICONS[item.icon];
              return (
                <div key={item.label} className="v2-trustbar__item">
                  <span className="v2-trustbar__icon" aria-hidden="true">
                    {Icon && <Icon size={20} strokeWidth={1.8} />}
                  </span>
                  <span className="v2-trustbar__text">
                    <span className="v2-trustbar__label">{item.label}</span>
                    <span className="v2-trustbar__desc block">{item.text}</span>
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
