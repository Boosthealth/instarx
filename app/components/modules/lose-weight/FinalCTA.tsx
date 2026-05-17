import { Button } from "./Button";

export function FinalCTA() {
  return (
    <section className="sm:p-4" id="pricing">
      <div className="bg-linear-to-br from-purple-100 via-pink-100 to-yellow-100 rounded-t-3xl sm:rounded-[48px] overflow-hidden py-14 sm:py-20 px-6 sm:px-10 text-center">
        <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gray-600 mb-4">
          Get Started
        </p>
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight max-w-2xl mx-auto">
          Ready to lose your weight without the struggle?{" "}
          <span className="block text-black">Get $150 OFF instantly!</span>
        </h2>
        <p className="text-base text-gray-700 mb-8 max-w-lg mx-auto leading-relaxed">
          This isn&apos;t a fad. It&apos;s medicine backed by science. Over 10,000 members are already
          losing up to 15% of their body weight safely and effectively from the comfort of home.
        </p>
        <Button href="https://go.instarx.com/intake" text="Get started" />
      </div>
    </section>
  );
}
