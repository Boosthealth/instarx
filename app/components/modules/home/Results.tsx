import { WeightCalculator } from "./WeightCalculator";
import { BeforeAfterSlider } from "./BeforeAfterSlider";
import { TrustBadgesCarousel } from "./TrustBadgesCarousel";
import { CTA } from "./CTA";



export default function Results({
  ctaHref = "https://go.instarx.com/intake",
}: {
  ctaHref?: string;
}) {
  return (
    <section className="px-4 py-12 bg-gray-100" id="about">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-center text-4xl md:text-6xl font-bold tracking-tight text-gray-900 max-w-5xl mx-auto mb-12 leading-tight">
          Finally Lose Weight Without the Cravings, the Crash Diets, or the Constant Exhaustion
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-12 lg:gap-8">

          <div className="lg:col-span-3">
            <BeforeAfterSlider />
          </div>
          <div className="lg:col-span-2">
            <WeightCalculator />
          </div>
        </div>

        <div className="mb-12 md:mb-20">
          <TrustBadgesCarousel />
        </div>

        <CTA href={ctaHref} />
      </div>
    </section>
  );
}
