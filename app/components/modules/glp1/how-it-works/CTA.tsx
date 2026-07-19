import Image from "next/image";
import Link from "next/link";
import { cta, INTAKE_HREF } from "./content";

/**
 * Page-local closing CTA. Uses the same primary verb as the hero
 * ("Start your assessment") so the page has one consistent call to action,
 * rather than the shared /start-glp1 CTA's different label.
 */
export default function CTA() {
  return (
    <section className="px-6 py-8 sm:py-10">
      <div
        className="max-w-7xl mx-auto rounded-3xl overflow-hidden relative"
        style={{ background: "var(--glp1-cta-gradient)" }}
      >
        {/* Mobile: stacked */}
        <div className="flex flex-col items-center px-6 pt-10 text-center md:hidden">
          <h2 className="mb-4 text-3xl font-medium leading-tight text-gray-900 sm:text-4xl font-[family-name:var(--font-inter)]">
            {cta.heading}
          </h2>
          <p className="mb-6 max-w-sm text-gray-800 leading-relaxed">{cta.subcopy}</p>
          <Link
            href={INTAKE_HREF}
            prefetch={false}
            className="mb-6 inline-flex items-center gap-2 rounded-full bg-gray-900 px-7 py-3 font-semibold text-white transition-colors duration-200 hover:bg-gray-800"
          >
            {cta.ctaLabel} →
          </Link>
          <Image
            src="/glp1/happy-person.webp"
            alt="Smiling InstaRx patient after reaching their weight-loss goal"
            width={976}
            height={934}
            sizes="(max-width: 768px) 80vw, 50vw"
            className="w-[80%] object-contain"
          />
        </div>

        {/* Desktop: text left, image right */}
        <div className="hidden min-h-[480px] items-center md:flex">
          <div className="relative z-10 flex max-w-2xl flex-col gap-6 px-16 py-12">
            <h2 className="text-3xl font-medium leading-tight text-gray-900 sm:text-4xl font-[family-name:var(--font-inter)]">
              {cta.heading}
            </h2>
            <p className="max-w-md text-lg text-gray-800 leading-relaxed">{cta.subcopy}</p>
            <Link
              href={INTAKE_HREF}
              prefetch={false}
              className="inline-flex w-fit items-center gap-2 rounded-full bg-gray-900 px-7 py-3 text-lg font-semibold text-white transition-colors duration-200 hover:bg-gray-800"
            >
              {cta.ctaLabel} →
            </Link>
          </div>
          <div className="absolute bottom-0 right-0 flex h-full items-end">
            <Image
              src="/glp1/happy-person.webp"
              alt="Smiling InstaRx patient after reaching their weight-loss goal"
              width={976}
              height={934}
              sizes="(max-width: 1280px) 50vw, 600px"
              className="h-full w-auto object-contain object-bottom"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
