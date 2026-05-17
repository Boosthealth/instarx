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
        <div className="relative mb-4 rounded-3xl overflow-hidden">
          <Image
            src="/lose-weight/medication-card.webp"
            alt="Semaglutide and Tirzepatide vials"
            width={900}
            height={675}
            className="mx-auto object-contain rounded-3xl"
          />
          <div className="bg-gradient absolute bottom-8 left-1/2 -translate-x-1/2 inline-flex items-center text-black text-sm font-medium px-4 py-2 rounded-full whitespace-nowrap">
            In Stock · Up to $200 OFF
          </div>
        </div>

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
