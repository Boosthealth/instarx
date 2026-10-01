import { LockKeyhole } from "lucide-react";
import { PlanTracker } from "./PlanTracker";
import { CtaLink } from "./ui";

export function FinalCTA() {
  return (
    <section className="pb-16 sm:px-4" id="final-cta" data-track-section="final">
      <div className="bg-gradient rounded-3xl sm:rounded-[48px] px-6 py-14 text-center text-gray-900 sm:py-20">
        <div className="max-w-3xl mx-auto">
          <p className="inline-flex items-center gap-2 rounded-full bg-white/70 px-3 py-1 text-sm font-semibold mb-5">
            <span className="size-2 rounded-full bg-orange-600" aria-hidden="true" />
            Don&apos;t miss the breakthrough
          </p>
          <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-[1.1] mb-5">
            Your 4th month is already paid for.<a href="#offer-terms" className="hover:text-blue-500" aria-label="See offer terms">*</a>{" "}
            You just have to claim it.
          </h2>
          <p className="text-lg md:text-xl mb-8">
            Thousands of patients almost gave up in month 2. The ones who committed to the full journey are the ones who
            transformed. Your breakthrough is waiting.
          </p>
          <div className="max-w-sm mx-auto rounded-2xl bg-white p-4 mb-8">
            <PlanTracker />
          </div>
          <div>
            <CtaLink location="final">Claim My Free Month Now →</CtaLink>
          </div>
          <p className="mt-5 flex items-center justify-center gap-2 text-sm text-gray-700">
            <LockKeyhole className="size-4" aria-hidden="true" /> Secure checkout · HIPAA compliant · No hidden fees
          </p>
        </div>
      </div>
    </section>
  );
}
