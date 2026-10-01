"use client";

import { Droplets, Gift, Rocket } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { FreeLink } from "./display";
import { CtaLink, PROMO, track } from "./ui";

const CHART = { months: [1, 2, 3, 4, 5, 6], tirzepatide: [3, 6, 9, 12.5, 14.5, 16.5], semaglutide: [2, 4, 6, 8, 9.5, 11] } as const;
const CHART_BASE_Y = 205;
const CHART_SCALE_Y = 8.5;
const chartX = (i: number) => 44 + i * 52;
const chartY = (value: number) => CHART_BASE_Y - value * CHART_SCALE_Y;
const linePath = (values: readonly number[]) => values.map((value, i) => `${i ? "L" : "M"}${chartX(i)},${chartY(value)}`).join(" ");

const PHASES = [
  { icon: Droplets, title: "Months 1–2: Silence", body: <>&quot;Food noise&quot; quiets down. Cravings stop. Your body adapts to the medication safely.</> },
  { icon: Rocket, title: "Month 3: The Breakthrough", body: "Weight loss accelerates as your body responds to the medication." },
  { icon: Gift, title: <>Month 4: The Reward (<FreeLink />)</>, body: "Where weight loss really gains momentum, and we're paying for it." },
];

function TimelineChart() {
  const [activeMonth, setActiveMonth] = useState<number | null>(null);
  const [drawn, setDrawn] = useState(false);
  const [sources, setSources] = useState(false);
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = chartRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      setDrawn(true);
      observer.disconnect();
    }, { threshold: 0.35 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handlePointer = (event: React.PointerEvent<SVGSVGElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width) * 330;
    setActiveMonth(Math.max(0, Math.min(CHART.months.length - 1, Math.round((x - 44) / 52))));
  };

  // pathLength=1 lets the stroke-dash draw-in work for any line length.
  const lineClass = `transition-[stroke-dashoffset] duration-[1400ms] ease-out motion-reduce:transition-none ${drawn ? "[stroke-dashoffset:0]" : "[stroke-dashoffset:1] motion-reduce:[stroke-dashoffset:0]"}`;

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col">
      <h3 className="text-2xl font-bold text-gray-900 leading-tight mb-1">The 3-month weight loss timeline</h3>
      <p className="text-gray-600 mb-4">Average body-weight reduction over time</p>
      <div ref={chartRef} className="relative">
        <svg
          viewBox="0 0 330 240"
          className="w-full h-auto touch-pan-y"
          role="img"
          aria-label="Chart comparing average tirzepatide and semaglutide weight loss from month one through six. Month four is the free month."
          onPointerMove={handlePointer}
          onPointerLeave={() => setActiveMonth(null)}
        >
          <defs>
            <linearGradient id="m4f-band" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#d8b4fe" />
              <stop offset="50%" stopColor="#fbcfe8" />
              <stop offset="100%" stopColor="#fef08a" />
            </linearGradient>
          </defs>
          <rect x="143" y="22" width="64" height="183" rx="8" fill="url(#m4f-band)" opacity="0.7" />
          <text x="175" y="36" textAnchor="middle" className="fill-gray-900 text-[9px] font-bold tracking-wider">FREE MONTH</text>
          {[0, 5, 10, 15, 20].map((n) => (
            <g key={n}>
              <line x1="44" x2="310" y1={chartY(n)} y2={chartY(n)} className="stroke-gray-200" strokeDasharray={n === 0 ? undefined : "3 4"} />
              <text x="8" y={chartY(n) + 4} className="fill-gray-500 text-[10px]">{n}%</text>
            </g>
          ))}
          {CHART.months.map((m, i) => (
            <text key={m} x={chartX(i)} y="229" textAnchor="middle" className={`text-[10px] ${i === 3 ? "fill-gray-900 font-bold" : "fill-gray-500"}`}>M{m}</text>
          ))}
          {activeMonth !== null && (
            <line x1={chartX(activeMonth)} x2={chartX(activeMonth)} y1="22" y2={CHART_BASE_Y} className="stroke-gray-300" />
          )}
          <path d={linePath(CHART.semaglutide)} pathLength={1} strokeDasharray="1" fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={`stroke-gray-400 ${lineClass}`} />
          <path d={linePath(CHART.tirzepatide)} pathLength={1} strokeDasharray="1" fill="none" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={`stroke-gray-900 ${lineClass}`} />
          {CHART.semaglutide.map((n, i) => (
            <circle key={`s${i}`} cx={chartX(i)} cy={chartY(n)} r={activeMonth === i ? 5 : 3} className="fill-white stroke-gray-400" strokeWidth="2" />
          ))}
          {CHART.tirzepatide.map((n, i) => (
            <circle key={`t${i}`} cx={chartX(i)} cy={chartY(n)} r={activeMonth === i ? 5.5 : 3.5} className="fill-gray-900 stroke-white" strokeWidth="1.5" />
          ))}
        </svg>
        {activeMonth !== null && (
          <div
            className="pointer-events-none absolute top-2 -translate-x-1/2 rounded-xl bg-gray-900 px-3 py-2 text-xs text-white shadow-lg"
            style={{ left: `${Math.max(20, Math.min(80, (chartX(activeMonth) / 330) * 100))}%` }}
            aria-hidden="true"
          >
            <strong className="block mb-0.5">Month {CHART.months[activeMonth]}{activeMonth === 3 ? " · FREE*" : ""}</strong>
            <span className="block">Tirzepatide: {CHART.tirzepatide[activeMonth]}%</span>
            <span className="block text-gray-300">Semaglutide: {CHART.semaglutide[activeMonth]}%</span>
          </div>
        )}
      </div>
      <div className="flex flex-wrap items-center gap-x-5 gap-y-1 mt-3 text-sm text-gray-700">
        <span className="inline-flex items-center gap-2"><span className="h-1 w-5 rounded-full bg-gray-900" aria-hidden="true" />Tirzepatide</span>
        <span className="inline-flex items-center gap-2"><span className="h-1 w-5 rounded-full bg-gray-400" aria-hidden="true" />Semaglutide</span>
      </div>
      <div className="mt-auto pt-4 border-t border-gray-100">
        <button
          type="button"
          className="mt-4 text-sm font-semibold text-gray-900 underline underline-offset-4 hover:text-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-sm"
          onClick={() => setSources(!sources)}
          aria-expanded={sources}
          aria-controls="clinical-sources"
        >
          {sources ? "Hide" : "View"} clinical sources
        </button>
        <div id="clinical-sources" className={`grid transition-all duration-300 ease-in-out ${sources ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
          <div className="overflow-hidden" inert={!sources}>
            <div className="space-y-2 pt-3 text-sm text-gray-600 leading-snug">
              <p>Disclaimer: Projections reflect 24-week clinical averages from Phase 3 trials of the active ingredients. Individual results vary based on starting BMI, diet, and adherence.</p>
              <p>STEP 1 trial (semaglutide 2.4 mg), NEJM 2021: ~11% average weight reduction at 24 weeks (14.9% at 68 weeks).</p>
              <p>SURMOUNT-1 trial (tirzepatide), NEJM 2022: ~16% average weight reduction at 24 weeks (20.9–22.5% at 72 weeks).</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Mirrors the /glp2 WeightCalculator card: .calc-slider, sky-400 fill, gradient result pills.
function TransformationCalculator() {
  const [weight, setWeight] = useState(200);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const emitWeight = useCallback((value: number) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => track({ event: "lp_slider_change", weight: value, promo: PROMO }), 250);
  }, []);
  useEffect(() => () => { if (debounceRef.current) clearTimeout(debounceRef.current); }, []);
  const pct = ((weight - 150) / 200) * 100;

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col justify-center">
      <h3 className="text-2xl font-bold text-gray-900 leading-tight mb-2">Your 4-month transformation potential</h3>
      <p className="text-gray-600">
        Drag the slider to your <strong className="text-gray-900">current weight</strong> to see what happens when you don&apos;t quit.
      </p>
      <div className="border-t border-gray-100 my-5" />
      <p className="text-center text-gray-600 mb-2">Your current weight:</p>
      <p className="text-center text-4xl font-semibold text-gray-900 mb-5" aria-live="polite">{weight} lbs</p>
      <div className="px-2 mb-2">
        <input
          type="range"
          min={150}
          max={350}
          value={weight}
          aria-label="Current weight in pounds"
          aria-valuetext={`${weight} pounds`}
          onChange={(e) => {
            const value = Number(e.target.value);
            setWeight(value);
            emitWeight(value);
          }}
          className="calc-slider w-full appearance-none cursor-pointer h-1 rounded-full"
          style={{ background: `linear-gradient(to right, #38bdf8 0%, #38bdf8 ${pct}%, #e5e7eb ${pct}%, #e5e7eb 100%)` }}
        />
      </div>
      <div className="flex justify-between text-xs text-gray-500 px-2 mb-6">
        <span>150 lbs</span>
        <span>350 lbs</span>
      </div>
      <div className="space-y-3">
        <div className="bg-gradient flex items-center justify-between rounded-full px-6 py-3.5 text-gray-900">
          <span className="leading-tight">
            <span className="block text-sm font-semibold">At month 4</span>
            <span className="block text-xs text-gray-700">The breakthrough · ~8% avg. loss</span>
          </span>
          <span className="text-2xl font-extrabold sm:text-3xl">{Math.round(weight * 0.92)} lbs</span>
        </div>
        <div className="flex items-center justify-between rounded-full bg-gray-100 px-6 py-3.5 text-gray-900">
          <span className="leading-tight">
            <span className="block text-sm font-semibold">At 1 year</span>
            <span className="block text-xs text-gray-700">The goal · ~15% avg. loss</span>
          </span>
          <span className="text-2xl font-extrabold sm:text-3xl">{Math.round(weight * 0.85)} lbs</span>
        </div>
      </div>
      <p className="mt-4 text-center text-xs text-gray-500">Based on clinical study averages. Individual results vary.</p>
    </div>
  );
}

export function Science() {
  return (
    <section className="bg-[#f5f0eb] rounded-t-[32px] sm:rounded-t-[48px] pt-16 pb-16 px-4 sm:px-6 lg:pt-24" data-track-section="science">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-10 md:mb-14">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-700 mb-3">Clinical data</p>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-gray-900 leading-tight mb-4">
            See the science: why 3 months matters
          </h2>
          <p className="text-lg text-gray-700 md:text-xl">Look at the data. If you quit in month 2, you miss the big drop.</p>
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
          <TimelineChart />
          <TransformationCalculator />
        </div>
        <ol className="grid gap-4 mt-6 md:grid-cols-3">
          {PHASES.map(({ icon: Icon, title, body }, i) => (
            <li key={i} className="flex gap-4 rounded-2xl bg-[#faf6f0] p-5">
              <span className={`flex size-11 shrink-0 items-center justify-center rounded-full ${i === 2 ? "bg-gradient" : "bg-white"} text-gray-900`}>
                <Icon className="size-5" aria-hidden="true" />
              </span>
              <p className="text-gray-700 leading-snug">
                <strong className="block text-gray-900 mb-1">{title}</strong>
                {body}
              </p>
            </li>
          ))}
        </ol>
        <div className="mt-10 rounded-3xl bg-linear-to-br from-purple-100 via-pink-100 to-yellow-100 px-6 py-8 text-center sm:px-10 md:flex md:items-center md:justify-between md:text-left">
          <p className="text-2xl font-bold text-gray-900 tracking-tight mb-5 md:mb-0 md:text-3xl">
            Get past month 2. We&apos;ll cover month 4.
          </p>
          <CtaLink location="science">Claim My Free Month →</CtaLink>
        </div>
      </div>
    </section>
  );
}
