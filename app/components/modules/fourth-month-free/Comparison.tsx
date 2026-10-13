import { Check, X } from "lucide-react";
import { CtaLink } from "./ui";

const ROWS = [
  ["Monthly membership fee", "$0", "$149/mo"],
  ["Every 4th month free", true, false],
  ["Same price at every dose", true, false],
  ["Doctor visit & prescription included", true, true],
  ["Free 1-2 day shipping", true, false],
  ["Unlimited doctor consults", true, false],
  ["24/7 human support", true, false],
  ["Home injection kit included", true, false],
  ["Cancel anytime", true, true],
] as const;

function Mark({ value, ours }: { value: boolean | string; ours?: boolean }) {
  if (typeof value === "string") {
    return <span className={`font-bold ${ours ? "text-gray-900" : "text-gray-500"}`}>{value}</span>;
  }
  return value ? (
    <span className={`inline-flex size-7 items-center justify-center rounded-full ${ours ? "bg-black text-white" : "bg-gray-200 text-gray-700"}`}>
      <Check className="size-4" strokeWidth={3} aria-hidden="true" />
      <span className="sr-only">Included</span>
    </span>
  ) : (
    <span className="inline-flex size-7 items-center justify-center text-gray-400">
      <X className="size-5" aria-hidden="true" />
      <span className="sr-only">Not included</span>
    </span>
  );
}

export function Comparison() {
  return (
    <section className="sm:px-4" data-track-section="compare">
      <div className="bg-[#f5f0eb] rounded-3xl sm:rounded-[48px] px-4 py-16 sm:px-6 lg:py-24">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-balance text-gray-900 leading-tight mb-4">Why pay more for less?</h2>
            <p className="text-lg text-gray-700 text-pretty md:text-xl">
              InstaRx doesn&apos;t just cost less. It delivers more: more care, more flexibility, and every 4th month free.
              See how it stacks up:
            </p>
          </div>
          <div className="rounded-3xl bg-white p-2 sm:p-4">
            <table className="w-full text-left">
              <caption className="sr-only">InstaRx plan compared with typical telehealth GLP-1 programs</caption>
              <thead>
                <tr>
                  <th scope="col" className="px-3 py-3"><span className="sr-only">Feature</span></th>
                  <th scope="col" className="w-24 rounded-t-2xl bg-gradient px-2 py-3 text-center text-gray-900 sm:w-32">
                    <span className="block font-bold">InstaRx</span>
                    <span className="block text-xs font-medium">Lowest price</span>
                  </th>
                  <th scope="col" className="w-20 px-2 py-3 text-center font-semibold text-gray-600 sm:w-32">Others</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {ROWS.map(([label, ours, others], i) => (
                  <tr key={label}>
                    <th scope="row" className="px-3 py-3.5 font-medium text-gray-900">{label}</th>
                    <td className={`bg-[#faf6f0] px-2 py-3.5 text-center ${i === ROWS.length - 1 ? "rounded-b-2xl" : ""}`}><Mark value={ours} ours /></td>
                    <td className="px-2 py-3.5 text-center"><Mark value={others} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-5 text-center text-xs text-gray-600 leading-snug">
            Comparison based on publicly available pricing and plan details of typical telehealth GLP-1 programs as of
            September 2026. Details may have changed. InstaRx is not affiliated with any other provider.
          </p>
          <div className="mt-8 flex justify-center">
            <CtaLink location="compare">See if You Qualify</CtaLink>
          </div>
        </div>
      </div>
    </section>
  );
}
