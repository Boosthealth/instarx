import Image from "next/image";
import { Check, Gift, Heart, ShieldCheck, Sparkles, Stethoscope } from "lucide-react";
import { TrustBadgesCarousel } from "@/app/components/modules/home/TrustBadgesCarousel";
import type { Offer, OfferItem } from "./types";
import { FreeLink, Price } from "./display";
import { BTN_DARK, BTN_LIGHT } from "./buttons";
import { CtaLink } from "./ui";

const SEMA_FEATURES = ["No membership fees, ever", "Doctor visit & prescription included", "Same price at every dose", "Free 1-2 day temperature-controlled shipping", "Unlimited doctor consults & 24/7 support"];
const TIRZ_FEATURES = ["Targets 2 hunger pathways (GIP + GLP-1)", "Highest average weight loss in its class", "Rated #1 for speed & results"];
const INCLUDES = [
  { icon: Stethoscope, label: "Free dosage increases" },
  { icon: Sparkles, label: "Treatment changes anytime" },
  { icon: Heart, label: "Unlimited doctor consults" },
  { icon: ShieldCheck, label: "Home injection kit included" },
];

function PlanCard({ item, featured }: { item: OfferItem; featured?: boolean }) {
  return (
    <article className={`relative flex flex-col rounded-3xl bg-white p-4 sm:p-6 ${featured ? "ring-2 ring-black shadow-lg" : ""}`}>
      <span className={`absolute -top-3 left-6 rounded-full px-3 py-1 text-xs font-semibold ${featured ? "bg-black text-white" : "bg-white text-gray-900 ring-1 ring-gray-300"}`}>
        {featured ? "#1 rated for speed & results" : "Most affordable"}
      </span>
      <div className="rounded-2xl bg-[#faf6f0] pt-6 pb-4 px-4 mb-5">
        <Image
          src={featured ? "/images/tirz-glp1.png" : "/images/sem-glp1.png"}
          alt={`Compounded ${item.name} injection vial`}
          width={640}
          height={640}
          sizes="256px"
          className="mx-auto -my-4 w-56 h-auto object-contain sm:w-64"
        />
        <div className="flex justify-center pt-2">
          <span className="bg-gradient inline-flex items-center gap-1.5 text-black text-sm font-medium px-4 py-2 rounded-full">
            <Gift className="size-4" aria-hidden="true" /> Every 4th month <FreeLink className="font-bold" />
          </span>
        </div>
      </div>
      <div className="px-2 flex flex-col flex-1">
        <h3 className="text-3xl font-bold tracking-tight text-gray-900">{item.name}</h3>
        <p className="text-sm font-medium text-gray-600 mb-2">Compounded {featured ? "GLP-1 + GIP" : "GLP-1"} Injection</p>
        <p className="text-gray-700 mb-5">
          {featured ? "Our most powerful dual-action formula for greater, faster results." : "The reliable, affordable path to quiet cravings and steady weight loss."}
        </p>
        <p className="rounded-2xl bg-gray-100 px-4 py-3 text-gray-900 mb-5">
          Commit to 4 Months <strong className="block font-extrabold">&amp; Get EVERY 4TH MONTH <FreeLink /></strong>
        </p>
        <div className="mb-5">
          <p className="text-sm text-gray-600">Starting at</p>
          <p className="text-gray-900">
            <span className="text-5xl font-extrabold tracking-tight"><Price value={item.effectiveMonthly} /></span>
            <span className="text-lg font-semibold">/mo</span>
          </p>
          <p className="text-sm text-gray-600">
            <s><Price value={item.retailMonthly} />/mo</s> month-to-month
          </p>
        </div>
        <ul className="space-y-2.5 mb-6">
          {featured && <li className="font-semibold text-gray-900">Everything in Semaglutide, plus:</li>}
          {(featured ? TIRZ_FEATURES : SEMA_FEATURES).map((feature) => (
            <li key={feature} className="flex items-start gap-3 text-gray-700">
              <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-black text-white mt-0.5">
                <Check className="size-3" strokeWidth={3} aria-hidden="true" />
              </span>
              {feature}
            </li>
          ))}
        </ul>
        <div className="mt-auto">
          <p className="flex items-center gap-2 text-sm font-semibold text-gray-900 mb-4">
            <Gift className="size-4 shrink-0" aria-hidden="true" />
            <span>Save <Price value={item.savings} /> every 4th month<a href="#offer-terms" className="underline hover:text-blue-500">*</a>, forever</span>
          </p>
          <CtaLink location="plans" treatment={item.treatment} className={`${featured ? BTN_DARK : BTN_LIGHT} w-full`}>
            Claim My FREE Month — {item.name}
          </CtaLink>
          <p className="mt-3 text-center text-xs text-gray-600 leading-snug">
            <Price value={item.planTotal} /> billed every 4 months · <s><Price value={item.strikePlanTotal} /></s> regular total · covers 4 months of medication
          </p>
        </div>
      </div>
    </article>
  );
}

export function Plans({ offer }: { offer: Offer }) {
  return (
    <section className="py-16 sm:px-4 lg:py-24" id="plans" data-track-section="plans">
      <div className="bg-[#f5f0eb] rounded-3xl sm:rounded-[48px] px-4 py-14 sm:px-6 lg:py-20">
        <div className="max-w-5xl mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-700 mb-3">Price-lock guarantee</p>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-gray-900 leading-tight mb-4">
              Every 4th month is <FreeLink />, forever
            </h2>
            <p className="text-lg text-gray-700 md:text-xl">
              Choose your medication. Commit to 4 months, pay for 3. Stay with us and we&apos;ll cover every 4th month,
              forever. Same price at every dose. Zero hidden fees.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 md:gap-6">
            <PlanCard item={offer.sema} />
            <PlanCard item={offer.tirz} featured />
          </div>
          <div className="mt-8 rounded-3xl bg-white p-6 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-600 mb-4">Every plan includes</p>
            <ul className="grid grid-cols-2 gap-3 md:grid-cols-4">
              {INCLUDES.map(({ icon: Icon, label }) => (
                <li key={label} className="flex flex-col items-center gap-2 rounded-2xl bg-[#faf6f0] px-3 py-4 text-sm font-medium text-gray-900">
                  <Icon className="size-5" aria-hidden="true" />
                  {label}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-gray-600">Free expedited shipping · 24/7 customer support · HSA/FSA eligible</p>
          </div>
        </div>
        <div className="mt-10">
          <TrustBadgesCarousel />
        </div>
      </div>
    </section>
  );
}
