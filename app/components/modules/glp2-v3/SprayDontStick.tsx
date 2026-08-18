import { SprayCan, Stethoscope, BadgeDollarSign, type LucideIcon } from "lucide-react";
import { Reveal } from "./Reveal";
import { spray } from "./content";

const TILE_ICONS: Record<string, LucideIcon> = {
  SprayCan,
  Stethoscope,
  BadgeDollarSign,
};

/* S2 — "Spray, don't stick" strip: lead line + three icon tiles on a light
 * tint background, per the build sheet. */
export function SprayDontStick() {
  return (
    <section className="v2-section v2-section--compact v2-bg-tint">
      <div className="v2-container">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="v2-h2 mb-4">{spray.title}</h2>
          <p className="v2-lede mx-auto max-w-xl">{spray.lead}</p>
        </Reveal>

        <div className="v2-tiles">
          <div className="v2-tiles__grid">
            {spray.tiles.map((tile, i) => {
              const Icon = TILE_ICONS[tile.icon];
              const isSpray = tile.icon === "SprayCan";
              return (
                <Reveal key={tile.title} delay={i * 80} as="div" className="v2-tile">
                  <span
                    className={`v2-tile__icon${isSpray ? " v2-tile__icon--spray" : ""}`}
                    aria-hidden="true"
                  >
                    {Icon ? <Icon size={24} strokeWidth={1.75} /> : null}
                  </span>
                  <p className="v2-tile__title">{tile.title}</p>
                  <p className="v2-tile__desc">{tile.desc}</p>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
