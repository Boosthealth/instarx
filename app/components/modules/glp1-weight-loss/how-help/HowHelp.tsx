import Image from "next/image";
import { BuyNowBtn } from "../_components";

export const HowHelp = () => {
  return (
    <section className="max-w-2xl mx-auto py-16 text-[#242424] lg:max-w-none lg:py-24">
        <div className="flex flex-col-reverse items-center justify-between gap-4 lg:flex-row lg:gap-8">
          <div className="flex flex-1 flex-col gap-4 xl:gap-8">
            <div>
              <h2 className="hidden text-[44px] font-bold leading-none tracking-tight pr-4 lg:block">
                How GLP-1 medications help you lose weight?
              </h2>
              <p className="text-blak text-lg lg:mt-4">
                GLP-1 medications mimic the body’s natural hormone, GLP-1, facilitating weight loss by:
              </p>
            </div>
            <ul className="flex flex-col gap-3 list-style-none text-black">
              <li className="flex items-center gap-4">
                <div className="shadow-list-item h-12 w-12 flex items-center justify-center rounded-2xl shrink-0">
                  <Image src="/images/glp1-weight-loss/icon-help-1.svg" alt="Benefit 1" width={24} height={24} />
                </div>
                <div className="flex flex-col">
                  <h3 className="text-lg sm:text-2xl">Reducing hunger and cravings</h3>
                  <p className="text-sm sm:text-base opacity-70">Tells your brain that you’re full.</p>
                </div>
              </li>
              <li className="flex items-center gap-4">
                <div className="shadow-list-item h-12 w-12 flex items-center justify-center rounded-2xl shrink-0">
                  <Image src="/images/glp1-weight-loss/icon-help-2.svg" alt="Benefit 2" width={24} height={24} />
                </div>
                <div className="flex flex-col">
                  <h3 className="text-lg sm:text-2xl">Slowing stomach emptying</h3>
                  <p className="text-sm sm:text-base opacity-70">Feel full longer.</p>
                </div>
              </li>
              <li className="flex items-center gap-4">
                <div className="shadow-list-item h-12 w-12 flex items-center justify-center rounded-2xl shrink-0">
                  <Image src="/images/glp1-weight-loss/icon-help-3.svg" alt="Benefit 3" width={24} height={24} />
                </div>
                <div className="flex flex-col">
                  <h3 className="text-lg sm:text-2xl">Creating “fullness” faster</h3>
                  <p className="text-sm sm:text-base opacity-70">Eat fewer calories without feeling deprived.</p>
                </div>
              </li>
              <li className="flex items-center gap-4">
                <div className="shadow-list-item h-12 w-12 flex items-center justify-center rounded-2xl shrink-0">
                  <Image src="/images/glp1-weight-loss/icon-help-4.svg" alt="Benefit 4" width={24} height={24} />
                </div>
                <div className="flex flex-col">
                  <h3 className="text-lg sm:text-2xl">Enabling lifestyle improvements</h3>
                  <p className="text-sm sm:text-base opacity-70 sm:w-90">Weight loss can inspire healthier habits as well as enhance self-esteem and confidence.</p>
                </div>
              </li>
            </ul>
            <BuyNowBtn href="#" />
          </div>
          <div className="glp1-bg overflow-hidden w-full h-[400px] flex items-end justify-center rounded-3xl lg:w-[520px] lg:h-[520px] xl:w-[622px] xl:h-[600px]">
            <Image
              src="/images/glp1-weight-loss/hero-help.png"
              alt="How GLP-1 medications help you lose weight?"
              width={760}
              height={534}
              className="h-auto w-full containe"
            />
          </div>
          <h2 className="text-center text-3xl font-bold tracking-tight lg:hidden">
            How GLP-1 medications help you lose weight?
          </h2>
        </div>
      </section>
  );
};
