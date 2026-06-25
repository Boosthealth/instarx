import {
  Truck,
  Clock,
  Globe,
  FileText,
  ShieldCheck,
  Stethoscope,
  CreditCard,
} from "lucide-react";

/* Scrolling trust ticker that runs between the closing CTA section and the
 * footer. A single seamless marquee: the item list is rendered twice so the
 * track can translate by -50% and loop with no visible seam. Pauses on hover;
 * frozen entirely under prefers-reduced-motion (handled in CSS). */
const TICKER_ITEMS = [
  { icon: Truck, label: "Fast, discreet shipping" },
  { icon: Clock, label: "Easy questionnaire" },
  { icon: Globe, label: "100% online" },
  { icon: FileText, label: "No insurance required" },
  { icon: ShieldCheck, label: "HIPAA-compliant care" },
  { icon: Stethoscope, label: "U.S.-licensed clinicians" },
  { icon: CreditCard, label: "Transparent pricing" },
];

export function Ticker() {
  return (
    <div className="v2-ticker" role="marquee" aria-label="What you get with InstaRx">
      <div className="v2-ticker__track">
        {/* Rendered twice for a seamless -50% loop. The duplicate is hidden from
            assistive tech so the labels aren't announced twice. */}
        {[0, 1].map((copy) => (
          <ul
            key={copy}
            className="v2-ticker__group"
            aria-hidden={copy === 1 ? true : undefined}
          >
            {TICKER_ITEMS.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.label} className="v2-ticker__item">
                  <Icon size={17} strokeWidth={1.75} aria-hidden="true" />
                  <span>{item.label}</span>
                  <span className="v2-ticker__dot" aria-hidden="true" />
                </li>
              );
            })}
          </ul>
        ))}
      </div>
    </div>
  );
}
