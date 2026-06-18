import Image from "next/image";
import { TrustBadgesCarousel } from "./TrustBadgesCarousel";
import { CTA } from "./CTA";

export function Medications() {
  return (
    <section className="bg-[#f5f0eb] py-16 px-6 rounded-b-[48px]">
      <div className="max-w-4xl mx-auto text-center">

        <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-gray-900 mb-10 leading-tight">
          Medications In Stock Ready to Ship
        </h2>
        <p className="text-lg font-medium text-gray-700 mb-6 md:text-xl">
          Compounded Semaglutide &amp; Tirzepatide Injections
        </p>

        {/* Medication card */}
        <div className="mb-4 rounded-3xl overflow-hidden bg-[#faf6f0]">
          <div className="flex items-center justify-center gap-4 sm:gap-8 pt-8 px-4">
            <Image
              src="/images/sem-glp1.png"
              alt="Compounded Semaglutide injection vial"
              width={640}
              height={640}
              sizes="(max-width: 640px) 45vw, 320px"
              className="w-1/2 max-w-[320px] h-auto object-contain"
            />
            <Image
              src="/images/tirz-glp1.png"
              alt="Compounded Tirzepatide injection vial"
              width={640}
              height={640}
              sizes="(max-width: 640px) 45vw, 320px"
              className="w-1/2 max-w-[320px] h-auto object-contain"
            />
          </div>
          <div className="flex justify-center pb-8 pt-2">
            <div className="bg-gradient inline-flex items-center text-black text-sm font-medium px-4 py-2 rounded-full whitespace-nowrap">
              In Stock · Up to $200 OFF
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto text-center">
        {/* Trust badges */}
        <div className="mb-10 mt-10 md:mb-16">
          <TrustBadgesCarousel />
        </div>

        {/* CTA */}
        <CTA href="https://go.instarx.com/intake" btnText="Get started" price className="text-center" />
      </div>
    </section>
  );
}
