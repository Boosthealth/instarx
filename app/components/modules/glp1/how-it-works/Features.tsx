import Image from "next/image";
import { features } from "./content";

/**
 * Two alternating explanatory blocks (image + copy). Clean version for the
 * how-it-works page: cream section background matching the homepage (#f5f0eb),
 * no decorative floating blobs, and readable body text.
 */
export default function Features() {
  return (
    <section className="bg-[var(--glp1-feature-bg)]">
      <div className="mx-auto flex max-w-7xl flex-col gap-12 px-6 py-10 sm:py-16">
        {features.map(({ image, imageAlt, title, description }, i) => (
          <div
            key={title}
            className="grid grid-cols-1 items-start gap-8 md:grid-cols-2 md:gap-12 lg:gap-20"
          >
            {/* Image */}
            <div
              data-reveal={i % 2 === 0 ? "slide-left" : "slide-right"}
              className={`relative aspect-[5/4] w-full overflow-hidden rounded-2xl bg-white ${
                i % 2 === 1 ? "md:order-last" : ""
              }`}
            >
              <Image
                src={image}
                alt={imageAlt}
                fill
                sizes="(max-width: 768px) 90vw, 45vw"
                className="object-cover"
              />
            </div>

            {/* Text */}
            <div data-reveal={i % 2 === 0 ? "slide-right" : "slide-left"}>
              <h3 className="text-2xl font-medium leading-snug text-gray-900 sm:text-3xl font-[family-name:var(--font-inter)]">
                {title}
              </h3>
              <p className="mt-4 text-lg leading-relaxed text-gray-700">
                {description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
