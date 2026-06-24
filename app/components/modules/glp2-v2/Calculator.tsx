"use client";

import { useState } from "react";
import { V2Button } from "./ui";
import { ReassuranceLine } from "./ReassuranceLine";
import { INTAKE_HREF } from "./content";

const MIN = 150;
const MAX = 400;
const LOSS_RATE = 0.17; // up to 17% body weight

/* Weight projection calculator. Two-column editorial layout: pitch + CTA on the
 * left, an interactive slider with a clean two-stat result (loss + projected
 * weight) on the right. Re-skinned to the cream/beige palette. */
export function Calculator() {
  const [raw, setRaw] = useState("260");
  const weight = Math.min(MAX, Math.max(MIN, Number(raw) || MIN));
  const loss = Math.round(weight * LOSS_RATE);
  const projected = weight - loss;
  const pct = ((weight - MIN) / (MAX - MIN)) * 100;

  return (
    <section className="v2-section v2-bg-lilac">
      <div className="v2-container">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left: pitch + CTA */}
          <div>
            <p className="v2-eyebrow v2-kicker-rule mb-5 inline-flex">
              The projection
            </p>
            <h2 className="v2-h2 mb-5">
              How much could you shed by{" "}
              <span className="v2-accent">next spring</span>?
            </h2>
            <p className="v2-lede mb-9 max-w-md">
              Prescription GLP-1 treatment designed to curb appetite, support
              healthier habits, and deliver meaningful weight loss over time.
            </p>
            <V2Button href={INTAKE_HREF} variant="primary" arrow>
              Find your treatment
            </V2Button>
            <div className="mt-5">
              <ReassuranceLine align="start" />
            </div>
          </div>

          {/* Right: interactive slider + two-stat result */}
          <div className="v2-calc-card p-6 sm:p-8">
            <div className="mb-2 flex items-baseline justify-between">
              <label
                htmlFor="v2-weight"
                className="text-sm font-semibold"
                style={{ color: "var(--v2-ink)" }}
              >
                Your current weight
              </label>
              <span className="flex items-baseline gap-1">
                <input
                  id="v2-weight"
                  type="number"
                  min={MIN}
                  max={MAX}
                  value={raw}
                  onChange={(e) => setRaw(e.target.value)}
                  onBlur={(e) =>
                    setRaw(
                      String(
                        Math.min(
                          MAX,
                          Math.max(MIN, Number(e.target.value) || MIN),
                        ),
                      ),
                    )
                  }
                  className="w-[4ch] bg-transparent text-right text-2xl font-bold leading-snug focus:outline-none"
                  style={{
                    color: "var(--v2-ink)",
                    fontFamily: "var(--v2-fb)",
                    fontVariantNumeric: "tabular-nums",
                  }}
                  aria-label="Your current weight in pounds"
                />
                <span
                  className="text-sm font-medium"
                  style={{ color: "var(--v2-ink-mute)" }}
                >
                  lbs
                </span>
              </span>
            </div>

            <input
              aria-label="Adjust your current weight"
              type="range"
              min={MIN}
              max={MAX}
              value={weight}
              onChange={(e) => setRaw(e.target.value)}
              className="v2-range mt-3"
              style={{
                background: `linear-gradient(to right, var(--v2-rose) 0%, var(--v2-rose) ${pct}%, var(--v2-blush-deep) ${pct}%, var(--v2-blush-deep) 100%)`,
              }}
            />
            <div
              className="mt-2 flex justify-between text-xs"
              style={{ color: "var(--v2-ink-mute)" }}
            >
              <span>{MIN} lbs</span>
              <span>{MAX} lbs</span>
            </div>

            {/* two-stat result — uses the hero's pink→peach gradient */}
            <div
              className="mt-7 grid grid-cols-2 overflow-hidden rounded-2xl"
              style={{ background: "var(--v2-gradient)" }}
            >
              <div className="px-5 py-6">
                <p
                  className="mb-1 text-xs font-medium"
                  style={{ color: "var(--v2-ink-soft)" }}
                >
                  Estimated weight loss
                </p>
                <p className="flex items-baseline gap-1">
                  <span
                    className="v2-display"
                    style={{ color: "var(--v2-ink)", fontStyle: "normal" }}
                  >
                    {loss}
                  </span>
                  <span
                    className="text-base font-semibold"
                    style={{ color: "var(--v2-ink-mute)" }}
                  >
                    lbs
                  </span>
                </p>
              </div>
              <div
                className="px-5 py-6"
                style={{ borderLeft: "1px solid rgba(255,255,255,0.45)" }}
              >
                <p
                  className="mb-1 text-xs font-medium"
                  style={{ color: "var(--v2-ink-soft)" }}
                >
                  Projected weight
                </p>
                <p className="flex items-baseline gap-1">
                  <span
                    className="v2-display"
                    style={{ color: "var(--v2-ink)", fontStyle: "normal" }}
                  >
                    {projected}
                  </span>
                  <span
                    className="text-base font-semibold"
                    style={{ color: "var(--v2-ink-mute)" }}
                  >
                    lbs
                  </span>
                </p>
              </div>
            </div>

            <p
              className="mt-5 text-xs"
              style={{ color: "var(--v2-ink-mute)" }}
            >
              *Based on clinical trial data. Individual results may vary. Only a
              licensed provider can determine if treatment is right for you.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
