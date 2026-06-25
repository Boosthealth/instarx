import Image from "next/image";
import {
  Stethoscope,
  ClipboardCheck,
  BadgeDollarSign,
  type LucideIcon,
} from "lucide-react";
import { V2Button, Stars } from "./ui";
import { GradientBg } from "./GradientBg";
import { ReassuranceLine } from "./ReassuranceLine";
import { heroChecks, INTAKE_HREF } from "./content";

// Transparent-background cutout (portrait): the subject stands on the gradient
// and bleeds off the bottom of the hero card.
const HERO_IMG = "/images/hero-4.webp";

// Maps the lucide icon name in content.ts to the imported component.
const TRUST_ICONS: Record<string, LucideIcon> = {
  Stethoscope,
  ClipboardCheck,
  BadgeDollarSign,
};

export function Hero() {
  return (
    // Contained hero (Lightship-style): the section provides a gutter so the
    // card floats inset from the browser edges; the header stays full-width above.
    <section id="top" className="v2-hero-wrap">
      <div className="v2-hero-card">
        {/* Animated pastel gradient (framer-motion crossfade: pink/purple/beige).
            The CSS --v2-gradient on .v2-hero-card is the SSR fallback underneath.
            A soft scrim keeps the left copy legible. */}
        <GradientBg />
        <div className="v2-hero-scrim" aria-hidden="true" />

        {/* Subject as a BACKGROUND layer, not a grid column. She's pinned to the
            bottom-right of the card at her natural aspect ratio (object-contain),
            so she is never cropped on any side — only her lower body extends past
            the card's bottom edge (clipped by overflow:hidden). Content layers on
            top; she shows through the open right side of the hero. */}
        <div className="v2-hero-photo">
          <Image
            src={HERO_IMG}
            alt="A happy woman holding her InstaRx GLP-1 medication"
            width={1696}
            height={2200}
            sizes="(max-width: 1023px) 70vw, 620px"
            className="v2-hero-photo__img"
            style={{ filter: "saturate(1.04) contrast(1.02)" }}
            priority
            fetchPriority="high"
          />

          {/* Floating matte-white glass price card — nested in the photo layer so
              it positions relative to the subject (over her hand/torso) at every
              breakpoint. */}
          <div className="v2-glass v2-glass--matte v2-hero-price flex items-center justify-between gap-3 rounded-2xl px-5 py-3.5">
            <div>
              <p
                className="text-xs font-semibold uppercase tracking-wider"
                style={{ color: "var(--v2-ink-mute)" }}
              >
                First month
              </p>
              <p className="v2-h3" style={{ fontStyle: "normal" }}>
                $148{" "}
                <span
                  className="align-middle text-sm font-normal line-through"
                  style={{
                    fontFamily: "var(--v2-fb)",
                    color: "var(--v2-ink-mute)",
                  }}
                >
                  $248
                </span>
              </p>
            </div>
            <span className="v2-chip v2-chip--solid">$100 off</span>
          </div>
        </div>

        <div className="v2-container v2-hero-grid relative z-10">
          {/* Left: copy (sits on a subtle darker wash for contrast) */}
          <div className="v2-hero-copy">
            {/* Glass category pill (Coivas-style). HSA/FSA lives in the trust-bar
                below, so it's not repeated here — the lone pill reads cleaner. */}
            <div className="mb-6 flex flex-wrap items-center gap-3">
              <span className="v2-glass v2-glass-pill">
                <span className="v2-glass-dot" aria-hidden="true" />
                GLP-1 Weight Loss
              </span>
            </div>

            <h1 className="v2-display v2-hero-h1 mb-5">
              Drop up to{" "}
              <span className="v2-accent" style={{ whiteSpace: "nowrap" }}>
                1–2 lbs
              </span>
              <br className="v2-hero-br" /> per week
            </h1>

            {/* Benefit sub-line — the price lives in the offer card (right), so
                the lede stays a clean benefit statement and doesn't repeat $148. */}
            <p className="v2-lede mb-6 max-w-lg">
              Lose up to{" "}
              <span style={{ color: "var(--v2-ink)", fontWeight: 600 }}>17%*</span>{" "}
              of your body weight with prescription GLP-1 — doctor-prescribed and
              delivered in 1–2 days.
            </p>

            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
              <V2Button
                href={INTAKE_HREF}
                variant="primary"
                className="v2-btn--lg w-full sm:w-auto"
                arrow
              >
                Find your treatment
              </V2Button>
              {/* Glass secondary button */}
              <V2Button
                href={INTAKE_HREF}
                variant="glass"
                className="v2-btn--lg w-full sm:w-auto"
              >
                See pricing
              </V2Button>
            </div>

            {/* Trustpilot-style social proof — sits just under the CTAs */}
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <span
                className="text-sm font-semibold"
                style={{ color: "var(--v2-ink)" }}
              >
                Excellent 4.7
              </span>
              <Stars count={5} size={16} />
              <span className="text-sm" style={{ color: "var(--v2-ink-soft)" }}>
                10,000+ happy customers · No insurance needed
              </span>
            </div>
          </div>
        </div>

        {/* 3-column glass trust-bar. On desktop it's an absolute overlay pinned
            to the bottom of the hero card, deliberately overlapping the lower
            part of the photo so the frosted glass has the subject + gradient to
            blur (Intercom-style). On small screens it drops to a single column in
            normal flow below the stacked content. */}
        <div className="v2-trustbar-wrap v2-container">
          <ul className="v2-trustbar">
            {heroChecks.map((item, i) => {
              const Icon = TRUST_ICONS[item.icon];
              return (
                <li key={i} className="v2-trustbar__item">
                  <span className="v2-trustbar__icon" aria-hidden="true">
                    {Icon ? <Icon size={20} strokeWidth={1.75} /> : null}
                  </span>
                  <div className="v2-trustbar__text">
                    <p className="v2-trustbar__label">{item.label}</p>
                    <p className="v2-trustbar__desc">{item.text}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="v2-hero-fineprint v2-container relative z-10 flex justify-center">
          <ReassuranceLine align="center" />
        </div>
      </div>
    </section>
  );
}
