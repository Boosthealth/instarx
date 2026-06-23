import Image from "next/image";
import { V2Button, Stars } from "./ui";
import { heroChecks, INTAKE_HREF } from "./content";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      {/* soft radial blush glow behind the hero, top-right */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 -top-24 h-[42rem] w-[42rem] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(247,233,236,0.9) 0%, rgba(247,233,236,0) 62%)",
        }}
      />

      <div className="v2-container relative grid grid-cols-1 items-center gap-12 pb-16 pt-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:pb-24 lg:pt-16">
        {/* Left: copy */}
        <div>
          <p className="v2-eyebrow v2-kicker-rule mb-6">
            GLP-1 Weight Loss · Telehealth
          </p>

          <h1 className="v2-display mb-6">
            Drop up to <span className="v2-accent">1–2 lbs</span>
            <br />
            per week
          </h1>

          <p className="v2-lede mb-5 max-w-md">
            Lose up to <span style={{ color: "var(--v2-ink)", fontWeight: 600 }}>17%*</span>{" "}
            of your body weight with prescription GLP-1.
          </p>

          <p className="mb-7 max-w-md" style={{ color: "var(--v2-ink-soft)" }}>
            Starting at{" "}
            <span
              className="v2-h3"
              style={{ fontStyle: "normal", color: "var(--v2-ink)" }}
            >
              $148
            </span>{" "}
            — doctor-prescribed GLP-1, delivered in 1–2 days.{" "}
            <span style={{ color: "var(--v2-ink)", fontWeight: 600 }}>
              No insurance needed. No hidden fees. No clinic visits.
            </span>
          </p>

          {/* Trustpilot-style social proof */}
          <div className="mb-7 flex flex-wrap items-center gap-x-3 gap-y-1">
            <span className="text-sm font-semibold" style={{ color: "var(--v2-ink)" }}>
              Excellent 4.7
            </span>
            <Stars count={5} size={16} />
            <span className="text-sm" style={{ color: "var(--v2-ink-mute)" }}>
              10,000+ happy customers
            </span>
          </div>

          <div className="mb-7 flex flex-col gap-3 sm:flex-row sm:items-center">
            <V2Button href={INTAKE_HREF} variant="primary" className="w-full sm:w-auto">
              Start the quiz →
            </V2Button>
            <V2Button href={INTAKE_HREF} variant="ghost" className="w-full sm:w-auto">
              See pricing
            </V2Button>
          </div>

          <ul className="space-y-3">
            {heroChecks.map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <span
                  className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full"
                  style={{ background: "var(--v2-blush)" }}
                >
                  <Image
                    src={`/lose-weight/${item.icon}`}
                    alt=""
                    aria-hidden="true"
                    width={15}
                    height={15}
                  />
                </span>
                <span style={{ color: "var(--v2-ink-soft)" }}>{item.text}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Right: framed portrait + floating price card */}
        <div className="relative">
          <div
            className="relative overflow-hidden rounded-[28px]"
            style={{
              boxShadow: "var(--v2-shadow-card)",
              border: "1px solid var(--v2-line)",
            }}
          >
            <Image
              src="/lose-weight/hero-lady.webp"
              alt="A woman achieving her weight loss goals with InstaRx GLP-1 medication"
              width={620}
              height={620}
              sizes="(max-width: 1024px) 100vw, 540px"
              className="h-full w-full object-cover"
              priority
            />
          </div>

          {/* floating price chip */}
          <div
            className="absolute -bottom-5 left-5 right-5 mx-auto flex max-w-sm items-center justify-between gap-3 rounded-2xl px-5 py-3.5 sm:left-auto sm:right-6 sm:max-w-xs"
            style={{
              background: "#fff",
              border: "1px solid var(--v2-line)",
              boxShadow: "var(--v2-shadow-soft)",
            }}
          >
            <div>
              <p
                className="text-xs font-semibold uppercase tracking-wider"
                style={{ color: "var(--v2-rose-deep)" }}
              >
                First month
              </p>
              <p className="v2-h3" style={{ fontStyle: "normal" }}>
                $148{" "}
                <span
                  className="align-middle text-sm font-normal line-through"
                  style={{ fontFamily: "var(--v2-fb)", color: "var(--v2-ink-mute)" }}
                >
                  $298
                </span>
              </p>
            </div>
            <span className="v2-chip">$150 off</span>
          </div>
        </div>
      </div>

      <p
        className="v2-container pb-2 text-sm"
        style={{ color: "var(--v2-ink-mute)" }}
      >
        Zero hidden fees · Zero monthly membership · Cancel anytime
      </p>
    </section>
  );
}
