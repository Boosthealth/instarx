import {
  Brain,
  Clock,
  Package,
  Pill,
  Receipt,
  Stethoscope,
  Timer,
  Utensils,
  type LucideIcon,
} from "lucide-react";
import { comparison, type ComparisonIcon } from "./content";
import { Reveal } from "./Reveal";

const ICONS: Record<ComparisonIcon, LucideIcon> = {
  pill: Pill,
  timer: Timer,
  clock: Clock,
  utensils: Utensils,
  brain: Brain,
  stethoscope: Stethoscope,
  receipt: Receipt,
  package: Package,
};

/* Two columns, same eight rows, revealed top to bottom in sequence. */
export function OldWayNewWay() {
  return (
    <section
      className="edv2-section edv2-comparison"
      aria-labelledby="edv2-compare-title"
    >
      <div className="edv2-container">
        <Reveal className="edv2-head edv2-head--center">
          <h2 id="edv2-compare-title" className="edv2-h2">
            {comparison.heading}
          </h2>
        </Reveal>
        <div className="edv2-compare">
          <Column
            title={comparison.oldLabel}
            variant="old"
            values={comparison.rows.map((r) => r.oldWay)}
          />
          <Column
            title={comparison.newLabel}
            variant="new"
            values={comparison.rows.map((r) => r.newWay)}
          />
        </div>
      </div>
    </section>
  );
}

function Column({
  title,
  variant,
  values,
}: {
  title: string;
  variant: "old" | "new";
  values: string[];
}) {
  return (
    <div className={`edv2-compare__col edv2-compare__col--${variant}`}>
      <h3 className="edv2-compare__title">{title}</h3>
      <ul className="edv2-compare__rows">
        {comparison.rows.map((row, i) => {
          const Icon = ICONS[row.icon];
          return (
            <Reveal
              key={row.label}
              as="li"
              className="edv2-compare__row"
              delay={i * 50}
            >
              <span className="edv2-compare__icon" aria-hidden="true">
                <Icon strokeWidth={2} />
              </span>
              <div>
                <span className="edv2-compare__label">{row.label}</span>
                <span className="edv2-compare__value">{values[i]}</span>
              </div>
            </Reveal>
          );
        })}
      </ul>
    </div>
  );
}
