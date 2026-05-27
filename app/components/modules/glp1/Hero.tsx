import Image from "next/image";
import Link from "next/link";

const includedItems = [
  "Free Shipping",
  "24/7 Patient Support",
  "Medically Supervised Treatment",
  "Fast Shipping",
  "Friendly Patient Care",
];

const mediaLogos = [
  { name: "Healthline", src: "/glp1/healthline.webp", width: 140, height: 32 },
  { name: "Fortune", src: "/glp1/fortune.webp", width: 120, height: 32 },
  { name: "Forbes", src: "/glp1/forbes.webp", width: 100, height: 32 },
  { name: "Fast Company", src: "/glp1/fast.webp", width: 140, height: 32 },
  { name: "Bloomberg", src: "/glp1/bloom.webp", width: 140, height: 32 },
  { name: "WebMD", src: "/glp1/webmd.webp", width: 100, height: 32 },
  { name: "New York Times", src: "/glp1/nyt.webp", width: 180, height: 32 },
];

export default function Hero() {
  return (
    <section className="sm:px-4 2xl:px-[5%]" style={{ paddingTop: "var(--header-height)" }}>
      {/* Blue card */}
      <div
        className="relative overflow-hidden sm:rounded-3xl"
        style={{ background: "var(--glp1-hero-gradient)" }}
      >
        <div className="max-w-7xl mx-auto px-6 pt-10">
          {/* Top centered content */}
          <div className="text-center">
            <p
              className="glp1-entrance text-sm font-semibold text-white/90 tracking-[0.05em] uppercase mb-3"
              style={{ animation: "glp1FadeUp 0.65s cubic-bezier(0.16, 1, 0.3, 1) both" }}
            >
              GLP-1 WEIGHT LOSS
            </p>
            <h1
              className="glp1-entrance text-4xl sm:text-5xl lg:text-6xl font-semibold text-white leading-tight tracking-tight mb-6 font-[family-name:var(--font-inter)]"
              style={{ animation: "glp1FadeUp 0.65s cubic-bezier(0.16, 1, 0.3, 1) both", animationDelay: "110ms" }}
            >
              Lose weight your way.
            </h1>
            <Link
              href="https://go.instarx.com/intake01"
              className="glp1-entrance inline-flex items-center gap-2 bg-gray-900 text-white text-lg font-semibold px-8 py-3 rounded-full hover:bg-gray-800 transition-colors duration-200"
              style={{ animation: "glp1FadeUp 0.65s cubic-bezier(0.16, 1, 0.3, 1) both", animationDelay: "220ms" }}
            >
              Find your treatment →
            </Link>
          </div>

          {/* Image area with side panels */}
          <div
            className="glp1-entrance relative mt-8 flex items-end justify-center min-h-[320px] sm:min-h-[420px]"
            style={{ animation: "glp1FadeUp 0.65s cubic-bezier(0.16, 1, 0.3, 1) both", animationDelay: "330ms" }}
          >
            {/* Left: Included list */}
            <div className="hidden [@media(min-width:375px)]:flex flex-col absolute left-0 bottom-6 lg:bottom-10 text-white z-20">
              <p className="text-sm lg:text-2xl mb-2">Included:</p>
              <ul className="space-y-1">
                {includedItems.map((item) => (
                  <li key={item} className="max-w-max text-[13px] lg:text-sm text-white bg-[#5d7fa1b3] py-1 px-2 lg:py-1.5 lg:px-3 rounded-lg">
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Center: hero image */}
            <Image
              src="/glp1/hero.webp"
              alt="Couple achieving weight loss goals with GLP-1 medication"
              width={814}
              height={1152}
              className="relative z-10 w-auto max-h-[360px] sm:max-h-[480px] object-contain mx-auto"
              priority
            />

            {/* Right: stats text + card */}
            <div className="hidden [@media(min-width:375px)]:flex flex-col items-end gap-2 lg:gap-3 absolute right-0 top-0 z-20 max-w-[140px] lg:max-w-[320px]">
              <p className="text-white text-sm lg:text-2xl text-right leading-snug">
                The average GLP-1 patient<br />
                <span className="font-semibold">loses 9 lbs in the first month</span>
              </p>
              <Image
                src="/glp1/weight.webp"
                alt="Average weight loss 32.4 lbs"
                width={388}
                height={240}
                className="rounded-xl lg:rounded-2xl shadow-xl w-[70%]"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Media logos */}
      <div
        className="max-w-5xl py-8 mx-auto overflow-hidden border-b border-gray-300"
        style={{
          WebkitMaskImage: "linear-gradient(to right, rgba(0,0,0,0) 0%, rgb(0,0,0) 12.5%, rgb(0,0,0) 87.5%, rgba(0,0,0,0) 100%)",
          maskImage: "linear-gradient(to right, rgba(0,0,0,0) 0%, rgb(0,0,0) 12.5%, rgb(0,0,0) 87.5%, rgba(0,0,0,0) 100%)",
        }}
      >
        <p className="text-center text-sm uppercase tracking-[0.05em] text-gray-500 mb-6 font-medium">
          As featured in
        </p>
        <div className="marquee-track flex items-center whitespace-nowrap" style={{ width: "max-content" }}>
          {[...mediaLogos, ...mediaLogos].map(({ name, src, width, height }, i) => (
            <div key={i} className="mx-10 shrink-0">
              <Image
                src={src}
                alt={name}
                width={width}
                height={height}
                className="object-contain opacity-60"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
