"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

const MIN = 100;
const MAX = 500;

function useSpringNumber(target: number) {
  const [display, setDisplay] = useState(target);
  const raf = useRef<number>(0);
  const pos = useRef(target);
  const vel = useRef(0);

  useEffect(() => {
    cancelAnimationFrame(raf.current);
    const tick = () => {
      vel.current = vel.current * 0.74 + (target - pos.current) * 0.16;
      pos.current += vel.current;
      setDisplay(Math.round(pos.current));
      if (Math.abs(target - pos.current) > 0.4 || Math.abs(vel.current) > 0.05) {
        raf.current = requestAnimationFrame(tick);
      } else {
        pos.current = target;
        vel.current = 0;
        setDisplay(target);
      }
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [target]);

  return display;
}

export default function Calculator() {
  const [weight, setWeight] = useState(145);

  const loss = Math.round(weight * 0.15);
  const animatedLoss = useSpringNumber(loss);
  const pct = ((weight - MIN) / (MAX - MIN)) * 100;

  return (
    <section className="max-w-7xl mx-auto px-6 py-10 sm:py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch">

        {/* Left: text card */}
        <div data-reveal="slide-left" className="bg-[var(--glp1-calc-card-bg)] rounded-2xl border border-gray-100 shadow-sm p-8 sm:p-10 flex flex-col justify-center">
          <h2 className="text-3xl sm:text-4xl font-medium text-gray-900 leading-tight mb-5 font-[family-name:var(--font-inter)]">
            Begin Your Weight Loss Journey Here:
          </h2>
          <p className="text-gray-800 leading-relaxed mb-8">
            Click the button below and start the journey to weight loss success.
            Once you complete the intake form, a licensed provider will review.
            If a prescription is approved, it will then be sent to a licensed
            pharmacy partner for immediate shipment.
          </p>
          <div>
            <Link
              href="https://go.instarx.com/intake"
              prefetch={false}
              className="inline-flex items-center gap-2 bg-white border border-gray-300 text-gray-900 text-lg font-semibold px-6 py-2.5 rounded-full hover:bg-gray-50 transition-colors duration-200"
            >
              Get Started →
            </Link>
          </div>
        </div>

        {/* Right: calculator */}
        <div
          data-reveal="slide-right"
          style={{ transitionDelay: "110ms", background: "var(--glp1-calc-gradient)" }}
          className="rounded-2xl p-8 sm:p-10 flex flex-col gap-12"
        >
          {/* Label + weight display */}
          <div className="text-center">
            <p className="text-2xl font-semibold text-white mb-4">Select your starting weight</p>
            <p className="text-4xl font-bold text-white">
              {weight} <span className="text-lg font-medium text-white">lbs</span>
            </p>
          </div>

          {/* Slider */}
          <input
            type="range"
            min={MIN}
            max={MAX}
            value={weight}
            onChange={(e) => setWeight(Number(e.target.value))}
            aria-label="Select your starting weight"
            aria-valuemin={MIN}
            aria-valuemax={MAX}
            aria-valuenow={weight}
            className="glp1-slider w-full appearance-none cursor-pointer h-2 rounded-full"
            style={{
              background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${pct}%, #bfdbfe ${pct}%, #bfdbfe 100%)`,
            }}
          />

          {/* Result card */}
          <div className="w-[90%] mx-auto bg-white/35 rounded-2xl p-6 text-center shadow-sm sm:w-[80%]">
            <p className="text-gray-900 text-xl font-semibold mb-4 sm:text-2xl">Your potential weight loss is</p>
            <div className="flex items-baseline justify-center gap-2">
              <p className="text-5xl font-bold text-blue-900 leading-none">
                {animatedLoss}
              </p>
              <p className="text-lg font-medium text-blue-900 mt-1">lbs</p>
            </div>
          </div>

          {/* CTA */}
          <Link
            href="https://go.instarx.com/intake"
            prefetch={false}
            className="inline-flex items-center justify-center gap-2 bg-gray-900 text-white text-lg font-semibold px-8 py-3.5 rounded-full hover:bg-gray-800 transition-colors duration-200 w-full"
          >
            Find your treatment →
          </Link>
        </div>

      </div>
    </section>
  );
}
