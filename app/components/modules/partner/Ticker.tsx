import {
  BadgeDollarSign,
  LineChart,
  Palette,
  Stethoscope,
  Building2,
  Truck,
  ShieldCheck,
} from "lucide-react";

/* Scrolling trust ticker between the closing CTA and the footer — same
 * seamless -50% marquee as the product landers, with partner-program benefits
 * instead of patient benefits. */
const TICKER_ITEMS = [
  { icon: BadgeDollarSign, label: "Competitive commissions" },
  { icon: LineChart, label: "Real-time tracking" },
  { icon: Palette, label: "Ready-to-use creative" },
  { icon: Stethoscope, label: "Licensed providers" },
  { icon: Building2, label: "U.S. pharmacies" },
  { icon: Truck, label: "Free, discreet shipping" },
  { icon: ShieldCheck, label: "Transparent pricing" },
];

export function Ticker() {
  return (
    <div className="v2-ticker" role="marquee" aria-label="Partner program benefits">
      <div className="v2-ticker__track">
        {/* Rendered twice for a seamless -50% loop. The duplicate is hidden
            from assistive tech so the labels aren't announced twice. */}
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
