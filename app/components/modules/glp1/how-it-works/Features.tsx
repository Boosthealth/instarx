import Image from "next/image";
import { features, featuresIntro } from "./content";

/**
 * Two-up explanatory cards (image over copy) on the system's warm neutral band
 * (--glp1-feature-bg). The two-column shape is deliberate: it distinguishes this
 * section from the Steps sequence's full-width alternating rows.
 */
export default function Features() {
  return (
    <section className="bg-[var(--glp1-feature-bg)]">
      <div className="mx-auto flex max-w-7xl flex-col gap-12 px-6 py-10 sm:py-16">
        <div className="max-w-2xl" data-reveal="up">
          <h2 className="text-3xl font-medium leading-tight text-gray-900 sm:text-4xl font-[family-name:var(--font-inter)]">
            {featuresIntro.heading}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-gray-700">
            {featuresIntro.body}
          </p>
        </div>

        {/* Two-up columns — deliberately a different shape from the Steps
            section's full-width alternating rows, so this reads as its own
            section rather than a continuation of the numbered sequence. */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-12">
          {features.map(({ image, imageAlt, title, description }, i) => (
            <article
              key={title}
              data-reveal="up"
              style={{ transitionDelay: `${i * 90}ms` }}
              className="flex flex-col"
            >
              <div className="relative aspect-[3/2] w-full overflow-hidden rounded-2xl bg-[#eef3f8]">
                <Image
                  src={image}
                  alt={imageAlt}
                  fill
                  sizes="(max-width: 768px) 90vw, 45vw"
                  className="object-cover"
                />
              </div>
              <h3 className="mt-6 text-2xl font-medium leading-snug text-gray-900 font-[family-name:var(--font-inter)]">
                {title}
              </h3>
              <p className="mt-3 text-lg leading-relaxed text-gray-700">
                {description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
