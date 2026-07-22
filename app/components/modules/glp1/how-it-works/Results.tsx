import Image from "next/image";
import { MessageCircle, SlidersHorizontal, CalendarCheck } from "lucide-react";
import { results, resultsIntro, type ResultIcon } from "./content";

const iconFor: Record<ResultIcon, typeof MessageCircle> = {
  message: MessageCircle,
  dose: SlidersHorizontal,
  calendar: CalendarCheck,
};

/**
 * Three text-over-image care cards. A blue-toned bottom scrim keeps the white
 * heading and caption legible over the photography at WCAG contrast.
 */
export default function Results() {
  return (
    <section className="px-6 py-10 sm:py-16">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-medium leading-tight text-gray-900 sm:text-4xl font-[family-name:var(--font-inter)]">
            {resultsIntro.heading}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-gray-700">
            {resultsIntro.body}
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:mx-auto sm:max-w-md sm:gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {results.map((card, i) => {
            const Icon = iconFor[card.icon];
            return (
              <article
                key={card.title}
                data-reveal="up"
                style={{ transitionDelay: `${i * 90}ms` }}
                className="relative aspect-[5/4] overflow-hidden rounded-3xl bg-[#eef3f8] lg:aspect-[4/5]"
              >
                <Image
                  src={card.image}
                  alt={card.imageAlt}
                  fill
                  sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw"
                  className="object-cover"
                />
                {/* Bottom-weighted scrim for text legibility */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(20,45,75,0) 26%, rgba(20,45,75,0.55) 58%, rgba(20,45,75,0.88) 100%)",
                  }}
                />
                <span
                  aria-hidden="true"
                  className="absolute left-6 top-6 inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#3f6ea3] text-white shadow-md sm:left-7 sm:top-7"
                >
                  <Icon size={20} strokeWidth={2} />
                </span>
                <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7">
                  <h3 className="text-xl font-semibold leading-snug text-white font-[family-name:var(--font-inter)]">
                    {card.title}
                  </h3>
                  <p className="mt-2 leading-relaxed text-white">{card.caption}</p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
