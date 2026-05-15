import Image from "next/image";
import { Button } from "./Button";

function StarBox({ fill = 1 }: { fill?: number }) {
  const pct = `${Math.round(fill * 100)}%`;
  return (
    <span className="relative inline-flex items-center justify-center w-5 h-5 overflow-hidden" style={{ backgroundColor: "#dcdce0" }}>
      <span className="absolute inset-0" style={{ backgroundColor: "#00b67a", width: pct }} />
      <svg width="12" height="12" viewBox="0 0 24 24" fill="white" aria-hidden="true" className="relative z-10">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    </span>
  );
}

function TrustpilotStars() {
  return (
    <div className="flex items-center gap-2 mb-4">
      <span className="text-sm font-bold text-gray-900">Excellent 4.7</span>
      <div className="flex items-center gap-0.5">
        <StarBox fill={1} />
        <StarBox fill={1} />
        <StarBox fill={1} />
        <StarBox fill={1} />
        <StarBox fill={0.7} />
      </div>
      <span className="text-sm text-gray-500">10,000+ happy customers</span>
    </div>
  );
}

const checkItems = [
  { icon: "clipboard-check.svg", text: "100% online doctor visits. Semaglutide or Tirzepatide, your choice." },
  { icon: "clipboard-list.svg", text: "Tailored visit & prescription included. HSA/FSA accepted." },
  { icon: "shield-check.svg", text: "Same price, every dose." },
  { icon: "truck.svg", text: "Free 1-2 day shipping, temperature-controlled." },
];

export default function Hero() {
  return (
    <section className="px-4 pt-[98px]">
      {/* Gradient card */}
      <div className="bg-gradient rounded-[48px] overflow-hidden">
        <div
          className="max-w-7xl mx-auto px-6 text-gray-900"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center py-10 sm:py-14">

            {/* Left: text */}
            <div>
              <TrustpilotStars />

              <h1 className="text-4xl sm:text-6xl font-extrabold leading-[1.1] mb-4">
                Drop up to 1-2lbs<br />per week!
              </h1>
              <p className="mb-4 max-w-md">
                Lose up to 17%* of your body weight with prescription GLP-1.
              </p>
              <p className="mb-6">
                Starting at{" "}
                <span className="text-3xl font-bold sm:text-4xl">$148</span>
                {" "}— Doctor-prescribed GLP-1, delivered in 1-2 days.{" "}
                <span className="font-semibold">No insurance needed. No hidden fees. No clinic visits.</span>
              </p>
              <ul className="space-y-2 mb-8">
                {checkItems.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Image
                      src={`/lose-weight/${item.icon}`}
                      alt=""
                      aria-hidden="true"
                      width={24}
                      height={24}
                      className="shrink-0 mt-0.5"
                    />
                    <span>{item.text}</span>
                  </li>
                ))}
              </ul>
              <div className="flex items-center justify-center gap-4 mb-4 sm:justify-start">
                <Button href="https://go.instarx.com/intake" text="Start Quiz →" />
                <Button href="#pricing" text="See pricing" color="light" />
              </div>
              <p className="text-sm text-gray-700">
                Zero Hidden Fees &nbsp;·&nbsp; Zero Monthly Membership &nbsp;·&nbsp; Cancel Anytime
              </p>
            </div>

            {/* Right: image */}
            <div className="flex justify-center rounded-2xl overflow-hidden lg:justify-end">
              <Image
                src="/lose-weight/hero-lady.webp"
                alt="Woman smiling"
                width={480}
                height={520}
                className="object-contain w-full rounded-2xl sm:max-w-md lg:max-w-lg"
                priority
              />
            </div>

          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 pt-6 pb-2">
        <p className="text-center text-xs uppercase tracking-[0.2em] text-gray-700 mb-4 font-medium sm:mb-6">
          we&apos;ve been featured all over
        </p>
        <div className="flex justify-center">
          <Image
            src="/lose-weight/seen-on-desktop.webp"
            alt="As seen in: OK!, BalancingAct, Woman's World, LA Weekly, Lifetime, Health"
            width={720}
            height={48}
            className="hidden w-[80%] sm:block object-contain"
          />
          <Image
            src="/lose-weight/seen-on-mobile.webp"
            alt="As seen in: OK!, BalancingAct, Woman's World, LA Weekly, Lifetime, Health"
            width={340}
            height={80}
            className="w-full sm:hidden object-contain"
          />
        </div>
      </div>
    </section>
  );
}
