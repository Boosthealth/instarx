import Image from "next/image";
import { BuyNowBtn } from "../_components";

export const CTA = () => {
  return (
    <section className="max-w-2xl mx-auto py-16 text-white lg:max-w-none lg:py-24">
        <div className="glp1-bg flex flex-col-reverse items-center justify-between gap-8 rounded-4xl overflow-hidden lg:flex-row lg:items-end">
          <div className="flex flex-1 flex-col gap-6 px-4 pb-8 lg:pb-16 lg:pl-20 xl:pl-30 xl:pr-24">
            <h2 className="text-3xl font-bold leading-none tracking-tight lg:text-[44px]">
              Finally, end your struggle with weight loss.
            </h2>
            <p>Find out if you’re eligible for GLP-1 weight loss medication online - no insurance needed</p>
            <BuyNowBtn href="#" color="light" />
          </div>
          <div className="w-full h-[360px] flex items-center justify-center rounded-3xl lg:w-[508px] lg:h-[508px]">
            <Image
              src="/images/glp1-weight-loss/GLP-1.png"
              alt="GLP-1 weight loss medication"
              width={300}
              height={471}
              className="h-4/5 w-auto object-contai"
            />
          </div>
        </div>
      </section>
  );
};