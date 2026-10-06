import { Check } from "lucide-react";

const MONTHS = [
  { short: "M1", label: "Warm-up" },
  { short: "M2", label: "Shift" },
  { short: "M3", label: "Breakthrough" },
] as const;

// The page's signature device: three paid months and a gradient "free" month,
// in the same pastel gradient the /glp2 cards and pills use.
export function PlanTracker({ size = "compact" }: { size?: "compact" | "large" }) {
  const large = size === "large";
  return (
    <ol className={`grid grid-cols-4 ${large ? "gap-2 sm:gap-3" : "gap-1.5"}`} aria-label="Four-month plan: months one to three paid, month four free">
      {MONTHS.map((month) => (
        <li
          key={month.short}
          className={`flex flex-col items-center rounded-xl bg-gray-100 text-gray-900 ${large ? "py-4 gap-1.5" : "py-2 gap-1"}`}
        >
          <span className={`${large ? "text-sm" : "text-xs"} font-semibold`}>{month.short}</span>
          <Check className={large ? "size-5" : "size-4"} aria-hidden="true" />
          {large && <span className="text-xs text-gray-600">{month.label}</span>}
          <span className="sr-only">{month.label}, paid</span>
        </li>
      ))}
      <li className={`bg-gradient flex flex-col items-center rounded-xl text-gray-900 ring-1 ring-black/10 ${large ? "py-4 gap-1.5" : "py-2 gap-1"}`}>
        <span className={`${large ? "text-sm" : "text-xs"} font-semibold`}>M4</span>
        <span className={`${large ? "text-base" : "text-xs"} font-extrabold leading-5`}>FREE</span>
        {large && <span className="text-xs text-gray-700">Reward</span>}
      </li>
    </ol>
  );
}
