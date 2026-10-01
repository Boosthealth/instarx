"use client";

import { useEffect, useRef } from "react";
import { BTN_DARK } from "./buttons";
import { CTA_BASE_URL, PROMO } from "./constants";
import type { Treatment } from "./types";

export { CTA_BASE_URL, PROMO };

declare global {
  interface Window { dataLayer?: Record<string, unknown>[]; }
}

export function track(payload: Record<string, unknown>) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(payload);
}

export function buildCtaHref(treatment: Treatment) {
  const url = new URL(CTA_BASE_URL);
  if (typeof window !== "undefined") {
    new URLSearchParams(window.location.search).forEach((value, key) => url.searchParams.set(key, value));
  }
  url.searchParams.set("promo", PROMO);
  url.searchParams.set("treatment", treatment);
  return url.toString();
}

export function CtaLink({ location, treatment, className = BTN_DARK, children, onNavigate, ...rest }: {
  location: string;
  treatment?: Treatment;
  className?: string;
  children: React.ReactNode;
  onNavigate?: () => void;
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "onClick" | "className" | "children">) {
  const anchorRef = useRef<HTMLAnchorElement>(null);
  const href = `${CTA_BASE_URL}?promo=${PROMO}&treatment=${treatment || "tirzepatide"}`;

  useEffect(() => {
    const chosen = treatment || (sessionStorage.getItem("treatment") as Treatment | null) || "tirzepatide";
    if (anchorRef.current) anchorRef.current.href = buildCtaHref(chosen);
  }, [treatment]);

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    const chosen = treatment || (sessionStorage.getItem("treatment") as Treatment | null) || "tirzepatide";
    event.currentTarget.href = buildCtaHref(chosen);
    if (treatment) {
      sessionStorage.setItem("treatment", treatment);
      track({ event: "lp_plan_card_click", treatment, promo: PROMO });
    }
    track({ event: "lp_cta_click", cta_location: location, treatment: chosen, promo: PROMO });
    onNavigate?.();
  };

  return <a ref={anchorRef} href={href} className={className} onClick={handleClick} {...rest}>{children}</a>;
}
