import Image from "next/image";
import { BuyNowBtn } from "../_components";

export const Hero = () => {
  return (
    <section className="max-w-2xl mx-auto pb-16 text-[#242424] lg:max-w-none lg:pb-24">
        <div className="flex flex-col items-center justify-between gap-8 lg:flex-row">
          <div className="block lg:hidden">
            <h1 className="flex flex-col text-3xl font-bold leading-nonetracking-tight">
              <span>GLP-1 weight</span>
              <span>loss medication</span>
            </h1>
            <div className="mt-4 flex items-center flex-wrap gap-2">
              <div className="flex items-center gap-2 border border-gray-300 rounded-full py-1 px-2">
                <p className="text-gray-500">In-Stock</p>
                <div className="w-2 h-2 rounded-full bg-green-500"/>
              </div>
              <p className="text-gray-500">04/28/2026</p>
              <div className="flex items-center gap-1">
                <Image
                  src="/images/glp1-weight-loss/rating.png"
                  alt="Rating"
                  width={93}
                  height={18}
                />
                <p className="text-gray-500">4.9</p>
                <p className="text-gray-500">4000+ reviews</p>
              </div>
            </div>
          </div>
          <div className="glp1-bg w-full h-[400px] flex items-center justify-center rounded-3xl lg:w-[520px] lg:h-[520px] xl:w-[588px] xl:h-[588px]">
            <Image
              src="/images/glp1-weight-loss/GLP-1.png"
              alt="GLP-1 weight loss medication"
              width={300}
              height={471}
              className="h-4/5 w-auto object-contai"
            />
          </div>
          <div className="flex flex-1 flex-col gap-4">
            <div className="hidden lg:block">
              <h1 className="flex flex-col text-[44px] font-bold leading-none tracking-tight">
                <span>GLP-1 weight</span>
                <span>loss medication</span>
              </h1>
              <div className="mt-4 flex items-center flex-wrap gap-2">
                <div className="flex items-center gap-2 border border-gray-300 rounded-full py-1 px-2">
                  <p className="text-gray-500">In-Stock</p>
                  <div className="w-2 h-2 rounded-full bg-green-500"/>
                </div>
                <p className="text-gray-500">04/28/2026</p>
                <div className="flex items-center gap-1">
                  <Image
                    src="/images/glp1-weight-loss/rating.png"
                    alt="Rating"
                    width={93}
                    height={18}
                  />
                  <p className="text-gray-500">4.9</p>
                  <p className="text-gray-500">4000+ reviews</p>
                </div>
              </div>
            </div>
            <ul className="flex flex-col gap-3 list-style-none">
              <li className="flex items-center gap-2 text-sm">
                <Image src="/images/glp1-weight-loss/icon-hero-1.svg" alt="Benefit 1" width={24} height={24} />
                <span><strong>82.6%</strong> of our customers report weight loss*</span>
              </li>
              <li className="flex items-center gap-2 text-sm">
                <Image src="/images/glp1-weight-loss/icon-hero-2.svg" alt="Benefit 2" width={24} height={24} />
                <span><strong>Affordable pricing</strong> - no surprises, no insurance needed</span>
              </li>
              <li className="flex items-center gap-2 text-sm">
                <Image src="/images/glp1-weight-loss/icon-hero-3.svg" alt="Benefit 3" width={24} height={24} />
                <span><strong>Fast, free</strong> temperature-controlled delivery</span>
              </li>
              <li className="flex items-center gap-2 text-sm">
                <Image src="/images/glp1-weight-loss/icon-hero-4.svg" alt="Benefit 4" width={24} height={24} />
                <span><strong>Same-day physician review</strong> (approval emailed)</span>
              </li>
            </ul>
            <BuyNowBtn href="#" price="148" />
            <div className="text-sm">
              *Based on internal customer survey data <br/>
              Medication compounded in an FDA-registered U.S. pharmacy.
            </div>
          </div>
        </div>
      </section>
  );
};
