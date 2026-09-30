"use client";

import { Heart } from "lucide-react";
import { useRef, useState } from "react";

const VIDEOS = ["/video/1000019567.mp4", "/video/1000103649.mp4", "/video/IMG_2142.mp4"];

function VideoCard({ src, index }: { src: string; index: number }) {
  return <article className="m4-video-card"><video controls playsInline preload="none" poster={src.replace(".mp4", "-poster.webp")} aria-label={`InstaRx member testimonial ${index + 1}`}><source src={src} type="video/mp4" /></video><div><span>★★★★★</span><strong>Verified InstaRx member</strong><p>Real member experience with doctor-prescribed GLP-1 weight-loss care.</p><em>GLP-1</em></div></article>;
}

export function Results() {
  const [active, setActive] = useState(0);
  const rail = useRef<HTMLDivElement>(null);
  const go = (index: number) => { const next = (index + VIDEOS.length) % VIDEOS.length; setActive(next); rail.current?.children[next]?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" }); };
  return <section className="m4-section m4-member-results" id="results" data-track-section="results"><div className="m4-container"><header className="m4-section-head"><p className="m4-eyebrow m4-eyebrow--outline"><Heart /> Real member results</p><h2>They Didn&apos;t Quit. Neither Will You.</h2><p>Thousands of InstaRx members have committed to the full journey. Here&apos;s what happened when they did.</p></header><div className="m4-videos"><div className="m4-videos__rail" ref={rail} onScroll={() => { const el = rail.current; if (el) setActive(Math.round(el.scrollLeft / Math.max(1, el.clientWidth))); }}>{VIDEOS.map((video, i) => <VideoCard src={video} index={i} key={video} />)}</div></div><div className="m4-dots">{VIDEOS.map((_, i) => <button key={i} className={i === active ? "is-active" : ""} aria-label={`Show testimonial ${i + 1}`} onClick={() => go(i)} />)}</div><p className="m4-results-note">Results vary. Reviews from verified InstaRx members.</p></div></section>;
}
