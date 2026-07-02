import { Ban, CircleCheck } from "lucide-react";

/* Small reassurance line shown under CTAs: each point gets a tiny icon — a
 * "no" mark for the fee/membership points and a check for cancel-anytime.
 * Centralized so the CTA placements (Hero, WhatAreYouWaitingFor) stay
 * consistent. `align` switches between centered (default) and left. */
const POINTS = [
  { icon: Ban, label: "No hidden fees" },
  { icon: Ban, label: "No monthly membership" },
  { icon: CircleCheck, label: "Cancel anytime" },
] as const;

export function ReassuranceLine({
  align = "center",
}: {
  align?: "center" | "start";
}) {
  return (
    <ul
      className="v2-reassure"
      style={{ justifyContent: align === "center" ? "center" : "flex-start" }}
    >
      {POINTS.map(({ icon: Icon, label }) => (
        <li key={label} className="v2-reassure__item">
          <Icon size={15} strokeWidth={1.75} aria-hidden="true" />
          {label}
        </li>
      ))}
    </ul>
  );
}
