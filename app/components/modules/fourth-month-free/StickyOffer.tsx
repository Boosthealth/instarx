"use client";

import { ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Price } from "./display";
import { CtaLink } from "./ui";

export function StickyOffer({ startingAt }: { startingAt: number }) {
  const [show, setShow] = useState(false);
  const states = useRef({ heroGone: false, plans: false, final: false });
  useEffect(() => {
    const update = () => setShow(states.current.heroGone && !states.current.plans && !states.current.final);
    const hero = document.querySelector(".m4-hero-cta");
    const plans = document.getElementById("plans");
    const final = document.querySelector(".m4-final");
    const heroObserver = new IntersectionObserver(([entry]) => { states.current.heroGone = !entry.isIntersecting && entry.boundingClientRect.top < 0; update(); });
    const sectionObserver = new IntersectionObserver((entries) => { entries.forEach((entry) => { if (entry.target === plans) states.current.plans = entry.isIntersecting; if (entry.target === final) states.current.final = entry.isIntersecting; }); update(); }, { threshold: 0.08 });
    if (hero) heroObserver.observe(hero);
    if (plans) sectionObserver.observe(plans);
    if (final) sectionObserver.observe(final);
    return () => { heroObserver.disconnect(); sectionObserver.disconnect(); };
  }, []);
  return <aside className={`m4-sticky ${show ? "is-visible" : ""}`} aria-hidden={!show}><div><strong>Get Month 4 FREE</strong><span>Starting at <Price value={startingAt} />/mo</span></div><CtaLink location="sticky" className="m4-btn m4-btn--green">Claim Now <ArrowRight /></CtaLink></aside>;
}
