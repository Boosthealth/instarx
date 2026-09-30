"use client";

import { Calculator, Droplets, Gift, Rocket, Scale } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { FreeLink } from "./display";
import { PROMO, track } from "./ui";

const CHART = { months: [1, 2, 3, 4, 5, 6], tirzepatide: [3, 6, 9, 12.5, 14.5, 16.5], semaglutide: [2, 4, 6, 8, 9.5, 11] } as const;
const CHART_BASE_Y = 205;
const CHART_SCALE_Y = 8.5;

export function Science() {
  const [weight, setWeight] = useState(200);
  const [sources, setSources] = useState(false);
  const [activeMonth, setActiveMonth] = useState<number | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [draw, setDraw] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setDraw(true); observer.disconnect(); } }, { threshold: 0.35 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  const emitWeight = useCallback((value: number) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => track({ event: "lp_slider_change", weight: value, promo: PROMO }), 250);
  }, []);
  const chartY = (value: number) => CHART_BASE_Y - value * CHART_SCALE_Y;
  const points = (values: readonly number[]) => values.map((value, i) => `${44 + i * 52},${chartY(value)}`).join(" ");
  const handleChartPointer = (event: React.PointerEvent<SVGSVGElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const chartX = ((event.clientX - bounds.left) / bounds.width) * 330;
    setActiveMonth(Math.max(0, Math.min(CHART.months.length - 1, Math.round((chartX - 44) / 52))));
  };

  return <section className="m4-section m4-science" data-track-section="science"><div className="m4-container">
    <header className="m4-section-head m4-section-head--dark"><p className="m4-eyebrow">Clinical data</p><h2>See the Science: <span>Why 3 Months Matters</span></h2><p>Look at the data. If you quit in month 2, you miss the big drop.</p></header>
    <div className="m4-science__grid">
      <article className="m4-science-card" ref={cardRef}><div className="m4-card-title"><span className="m4-icon-tile"><Calculator /></span><div><h3>The 3-Month Weight Loss Timeline</h3><p>Average body-weight reduction over time</p></div></div>
        <div className={`m4-chart ${draw ? "is-drawn" : ""}`}><svg viewBox="0 0 330 240" role="img" aria-label="Chart comparing average tirzepatide and semaglutide weight loss from month one through six" onPointerMove={handleChartPointer} onPointerLeave={() => setActiveMonth(null)}>
          <rect x="143" y="22" width="64" height="183" rx="8" className="m4-chart__band" />
          {[0, 5, 10, 15, 20].map((n) => <g key={n}><line x1="44" x2="310" y1={chartY(n)} y2={chartY(n)} className="m4-chart__grid" /><text x="8" y={chartY(n) + 4}>{n}%</text></g>)}
          {CHART.months.map((m, i) => <text key={m} x={39 + i * 52} y="229">M{m}</text>)}
          <text x="148" y="36" className="m4-chart__band-label">FREE MONTH</text>
          <polyline points={points(CHART.semaglutide)} className="m4-chart__line m4-chart__line--sema" /><polyline points={points(CHART.tirzepatide)} className="m4-chart__line m4-chart__line--tirz" />
          {CHART.tirzepatide.map((n, i) => <circle key={`t${n}`} cx={44 + i * 52} cy={chartY(n)} r="3.5" className={`m4-chart__dot m4-chart__dot--tirz ${activeMonth === i ? "is-active" : ""}`} />)}
          {CHART.semaglutide.map((n, i) => <circle key={`s${n}`} cx={44 + i * 52} cy={chartY(n)} r="3" className={`m4-chart__dot m4-chart__dot--sema ${activeMonth === i ? "is-active" : ""}`} />)}
        </svg><div className="m4-chart__legend"><span><i className="tirz" /> Tirzepatide</span><span><i /> Semaglutide</span></div><span className="m4-chart__breakthrough">The 3-month breakthrough</span>
          {activeMonth !== null && <div className="m4-chart__tooltip" style={{ left: `${Math.max(18, Math.min(82, ((44 + activeMonth * 52) / 330) * 100))}%` }} aria-hidden="true"><strong>Month {CHART.months[activeMonth]}</strong><span><i className="tirz" />Tirzepatide: {CHART.tirzepatide[activeMonth]}%</span><span><i />Semaglutide: {CHART.semaglutide[activeMonth]}%</span></div>}
        </div>
        <button className="m4-source-toggle" onClick={() => setSources(!sources)} aria-expanded={sources}>{sources ? "−" : "+"} View Clinical Sources</button>
        <div id="clinical-sources" className={`m4-sources ${sources ? "is-open" : ""}`}><div><p>Disclaimer: Projections reflect 24-week clinical averages from Phase 3 trials of the active ingredients. Individual results vary based on starting BMI, diet, and adherence.</p><p>STEP 1 trial (semaglutide 2.4 mg), NEJM 2021: ~11% average weight reduction at 24 weeks (14.9% at 68 weeks).</p><p>SURMOUNT-1 trial (tirzepatide), NEJM 2022: ~16% average weight reduction at 24 weeks (20.9–22.5% at 72 weeks).</p></div></div>
      </article>
      <article className="m4-science-card"><div className="m4-card-title"><span className="m4-icon-tile"><Scale /></span><div><h3>Your 4-Month Transformation Potential</h3><p>Drag the slider to your <strong>current weight</strong> to see what happens when you don&apos;t quit.</p></div></div>
        <div className="m4-weight-value">{weight} lbs</div><input className="m4-range" type="range" min="150" max="350" value={weight} aria-label="Current weight in pounds" onChange={(e) => setWeight(Number(e.target.value))} onPointerUp={() => emitWeight(weight)} onKeyUp={() => emitWeight(weight)} style={{ "--range": `${((weight - 150) / 200) * 100}%` } as React.CSSProperties} /><div className="m4-range-labels"><span>150 lbs</span><span>350 lbs</span></div>
        <div className="m4-results-tiles"><div><p>At month 4</p><span>The Breakthrough</span><strong>{Math.round(weight * 0.92)} lbs</strong><em>~8% avg. loss</em></div><div><p>At 1 year</p><span>The Goal</span><strong>{Math.round(weight * 0.85)} lbs</strong><em>~15% avg. loss</em></div></div><small>Based on clinical study averages. Individual results vary.</small>
      </article>
    </div>
    <div className="m4-phases"><div><span><Droplets /></span><p><strong>Months 1–2: Silence</strong>&quot;Food noise&quot; quiets down. Cravings stop. Your body adapts to the medication safely.</p></div><div><span><Rocket /></span><p><strong>Month 3: The Breakthrough</strong>Weight loss accelerates as your body responds to the medication.</p></div><div><span><Gift /></span><p><strong>Month 4: The Reward (<FreeLink />)</strong>Where weight loss really gains momentum, and we&apos;re paying for it.</p></div></div>
  </div></section>;
}
