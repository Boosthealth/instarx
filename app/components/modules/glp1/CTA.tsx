import Image from "next/image";
import Link from "next/link";

export default function CTA() {
  return (
    <section className="px-6 py-8 sm:py-10">
      <div
        data-reveal="scale-up"
        className="max-w-7xl mx-auto rounded-3xl overflow-hidden relative"
        style={{ background: "var(--glp1-cta-gradient)" }}
      >
        {/* Mobile: stack top-to-bottom */}
        <div className="flex flex-col items-center text-center pt-10 px-6 md:hidden">
          <h2 className="text-3xl font-medium text-gray-900 leading-tight mb-5 font-[family-name:var(--font-inter)]">
            Your InstaRx feeling awaits
          </h2>
          <Link
            href="https://go.instarx.com/intake01"
            className="inline-flex items-center gap-2 bg-gray-900 text-white font-semibold px-7 py-3 rounded-full hover:bg-gray-800 transition-colors duration-200 mb-6"
          >
            Find your treatment →
          </Link>
          <Image
            src="/glp1/happy-person.webp"
            alt="Happy InstaRx patient"
            width={976}
            height={934}
            sizes="(max-width: 768px) 80vw, 50vw"
            className="w-[80%] object-contain"
          />
        </div>

        {/* Desktop: text left, image right absolute */}
        <div className="hidden md:flex items-center min-h-[480px]">
          <div className="relative z-10 px-16 py-12 flex flex-col gap-6 max-w-2xl">
            <h2 className="text-4xl font-medium text-gray-900 leading-tight font-[family-name:var(--font-inter)]">
              Your InstaRx feeling awaits
            </h2>
            <Link
              href="https://my.instarx.com/intake/wm-vtvz7x/"
              className="inline-flex items-center gap-2 bg-gray-900 text-white text-lg font-semibold px-7 py-3 rounded-full hover:bg-gray-800 transition-colors duration-200 w-fit"
            >
              Find your treatment →
            </Link>
          </div>
          <div className="absolute right-0 bottom-0 h-full flex items-end">
            <Image
              src="/glp1/happy-person.webp"
              alt="Happy InstaRx patient"
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
