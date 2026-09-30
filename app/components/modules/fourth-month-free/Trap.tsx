import { Dumbbell, LockKeyhole, TriangleAlert } from "lucide-react";

export function Trap() {
  const cards = [
    { icon: <Dumbbell />, eyebrow: "Months 1–2", title: "The Warm-Up", body: "The first 2 months are preparation. Your body is safely adjusting to the medication and your dose is still ramping up.", tone: "green" },
    { icon: <TriangleAlert />, eyebrow: "The Trap", title: "Most People Quit Here", body: "Month-to-month plans tempt you to quit out of frustration because the dose is still too low for the best results. Most people quit here.", tone: "red", badge: "The danger zone" },
    { icon: <LockKeyhole />, eyebrow: "The Fix", title: "The Solution", body: "Committing to 4 months locks you in and carries you across the finish line into the breakthrough phase, where the weight actually starts coming off. And month 4 is on us.", tone: "green" },
  ];
  return <section className="m4-section m4-trap" data-track-section="trap"><div className="m4-container"><header className="m4-section-head"><p className="m4-eyebrow">The month-to-month trap</p><h2>Why Quitting Early <span>Sets You Up to Fail</span></h2><p>The diet industry sells &quot;overnight results.&quot; Your body doesn&apos;t work that way. Quitting your medication in the first 60 days is like walking out of the gym while you&apos;re still stretching.</p></header><div className="m4-trap__grid">{cards.map((card) => <article key={card.title} className={`m4-trap-card m4-trap-card--${card.tone}`}>{card.badge && <span className="m4-corner-badge">{card.badge}</span>}<span className="m4-icon-tile">{card.icon}</span><p>{card.eyebrow}</p><h3>{card.title}</h3><div>{card.body}</div></article>)}</div></div></section>;
}

