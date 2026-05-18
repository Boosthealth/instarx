import Image from "next/image";

const steps = [
  {
    label: "Today",
    text: "Get $150 Off today. Discount applied at checkout",
  },
  {
    label: "In 1 day",
    text: "Doctor Review: A Licensed U.S. Physician reviews your profile and writes your prescription",
  },
  {
    label: "Within 1 day",
    text: "Insta-Ship: Our licensed US pharmacies prepare your kit and express ship it to your door in 1–2 days.",
  },
  {
    label: "Free & Discreet 1-2 Day Delivery",
    text: "Receive your medication and supply kit",
  },
  {
    label: "On-going care & support with Insta Rx Nursing Staff",
    text: "Begin treatment, and start losing weight :)",
  },
];

export function HowItWorks() {
  return (
    <section className="bg-white py-16 overflow-hidden" id="how-it-works">
      <div className="max-w-7xl mx-auto px-4 sm:px-0 grid grid-cols-1 md:grid-cols-[1fr_auto] gap-10 items-center">

        {/* Left: timeline */}
        <div className="px-6 md:pl-12 md:pr-0 max-w-2xl xl:max-w-3xl">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-gray-900 mb-3 leading-tight">
            Get your weight loss meds in 1–2 days
          </h2>
          <p className="text-lg text-gray-500 mb-8">
            Concierge medical weight loss without the waiting room.
          </p>

          <div className="flex flex-col divide-y divide-gray-200">
            {steps.map((step, i) => (
              <div key={i} className="py-3.5 md:py-4">
                <p className="text-sm font-medium mb-1.5 text-orange-700">{step.label}</p>
                <p className="text-base text-gray-800 flex items-start gap-2 font-semibold">
                  <svg className="mt-1 shrink-0" width="12" height="12" viewBox="0 0 12 12" fill="currentColor" aria-hidden="true">
                    <path d="M2 1.5l9 4.5-9 4.5V1.5z" />
                  </svg>
                  {step.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Right: phone mockup — flush to right edge */}
        <div className="flex justify-center md:justify-end">
          <Image
            src="/lose-weight/timeline.webp"
            alt="InstaRx app"
            width={460}
            height={920}
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 360px, 460px"
            className="object-contain w-full sm:w-70 md:w-90 lg:w-115"
          />
        </div>

      </div>
    </section>
  );
}
