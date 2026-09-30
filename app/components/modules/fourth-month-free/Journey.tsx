"use client";

import { Check, CircleDollarSign, Droplets, Rocket, TriangleAlert } from "lucide-react";
import { useEffect } from "react";
import { FreeLink } from "./display";

const MONTHS: readonly { number: number; icon: React.ReactNode; title: string; accent?: string; callout?: string; body: React.ReactNode; chips: readonly string[]; tone: string }[] = [
  { number: 1, icon: <Droplets />, title: "The Warm-Up", body: "Your body is adjusting to the medication. The dose is low and results are modest, but the foundation is being laid. This is the phase most people underestimate.", chips: ["~2–4% loss", "Mild appetite shift", "Dose titrating up", "Building momentum", "Energy surge"], tone: "green" },
  { number: 2, icon: <TriangleAlert />, title: "The Shift", accent: "(Don't Quit Here)", callout: "The Danger Zone. Most quit at 2.5 months, mistaking the biological loading phase for failure. Stay the course. Your body is still catching up.", body: "Side effects may peak here. Progress can feel slow. Your brain is rewiring its relationship with food. This discomfort is a signal you're on the edge of a breakthrough, not a reason to stop.", chips: ["~5–8% loss", "Food noise quieting", "Cravings reducing", "Dose increasing", "Breakthrough near"], tone: "amber" },
  { number: 3, icon: <Rocket />, title: "Dialed in. Weight dropping.", body: "You are finally back in the driver's seat. The \"food noise\" is gone, hunger doesn't control you, and your body is shifting toward sustainable weight loss. The scale finally matches how you feel.", chips: ["~11–16% loss", "Noticeable weight loss", "Energy surge", "Food noise silenced", "Medication taking hold"], tone: "deep" },
  { number: 4, icon: <CircleDollarSign />, title: "The Reward", accent: "(We Pay)", body: <>{`You've hit peak momentum and your habits are locked in. We're paying for this month because we believe in your success. The best part? Every 4th month is `}<FreeLink>free!*</FreeLink>{` You keep crushing it, and we'll keep paying.`}</>, chips: ["$0 — FREE*", "Momentum locked in", "Habits formed", "Results compounding", "Fully covered"], tone: "green" },
];

export function Journey() {
  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>(".m4-month"));
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    }), { threshold: 0.3 });
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);
  return <section className="m4-section m4-journey" id="journey" data-track-section="journey"><div className="m4-container m4-container--narrow"><header className="m4-section-head"><p className="m4-eyebrow m4-eyebrow--outline"><Rocket /> Your 4-month journey</p><h2>What You&apos;ll Feel, Month by Month</h2><p>Understanding the timeline is the difference between quitting and transforming. Here&apos;s exactly what to expect.</p></header><div className="m4-timeline">{MONTHS.map((month, index) => <article key={month.number} className={`m4-month m4-month--${month.tone} ${index % 2 ? "m4-month--right" : ""}`}><div className="m4-month__node">{month.icon}</div><div className="m4-month__copy"><p className="m4-month__label">Month {month.number}</p><h3>{month.title} {month.accent && <span>{month.accent}</span>}</h3>{month.callout && <div className="m4-month__callout"><TriangleAlert /><span>{month.callout}</span></div>}<p>{month.body}</p></div><div className="m4-month__chips">{month.chips.map((chip, i) => <span key={chip} className={i === 0 ? "is-stat" : ""}>{i > 0 && <Check />} {chip === "$0 — FREE*" ? <FreeLink>{chip}</FreeLink> : chip}</span>)}</div></article>)}</div></div></section>;
}
