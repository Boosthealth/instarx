"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { CtaLink } from "./ui";

const NAV_ITEMS = [["How it works", "journey"], ["Pricing", "plans"], ["Results", "results"], ["FAQ", "faq"]] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);
  useEffect(() => {
    const updateActiveSection = () => {
      const marker = Math.max(96, window.innerHeight * 0.3);
      const active = NAV_ITEMS.find(([, id]) => {
        const section = document.getElementById(id);
        if (!section) return false;
        const bounds = section.getBoundingClientRect();
        return bounds.top <= marker && bounds.bottom > marker;
      });
      setActiveSection(active?.[1] ?? "");
    };
    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);
    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, []);
  return <header className="m4-nav">
    <div className="m4-container m4-nav__inner">
      <Link href="/" aria-label="InstaRx home" className="m4-nav__logo"><Image src="/logos/instarx-logo.png" alt="InstaRx" width={130} height={40} priority /></Link>
      <nav className="m4-nav__desktop" aria-label="Main navigation">{NAV_ITEMS.map(([label, id]) => <a key={id} href={`#${id}`} aria-current={activeSection === id ? "location" : undefined}><span>{label}</span></a>)}<CtaLink location="nav" className="m4-btn m4-btn--small">Claim My Free Month</CtaLink></nav>
      <button className="m4-nav__toggle" onClick={() => setOpen(!open)} aria-expanded={open} aria-label={open ? "Close menu" : "Open menu"}>{open ? <X /> : <Menu />}</button>
    </div>
    {open && <nav className="m4-nav__mobile" aria-label="Mobile navigation">{NAV_ITEMS.map(([label, id]) => <a key={id} href={`#${id}`} aria-current={activeSection === id ? "location" : undefined} onClick={() => setOpen(false)}><span>{label}</span></a>)}<CtaLink location="nav" className="m4-btn" onNavigate={() => setOpen(false)}>Claim My Free Month</CtaLink></nav>}
  </header>;
}
