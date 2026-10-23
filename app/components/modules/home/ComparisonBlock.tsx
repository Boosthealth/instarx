/**
 * Side-by-side comparison for the competitor-conquest lander (/glp2?lp=switch).
 *
 * The ad never names a competitor (trademark policy); the page can, as
 * nominative fair use, as long as every claim is factual, dated and sourced.
 * Competitor cells come from their public pricing/FAQ pages and published
 * reviews as of September 2026 — see SOURCES below. Re-verify before any copy
 * change; competitor pricing moves.
 *
 * InstaRx cells use only claims already made on go.instarx.com/glp2.
 */

type Cell = { ok: boolean | null; text: string };
type Row = { label: string; us: Cell; hims: Cell; ro: Cell };

const yes = (text: string): Cell => ({ ok: true, text });
const no = (text: string): Cell => ({ ok: false, text });
const info = (text: string): Cell => ({ ok: null, text });

const ROWS: readonly Row[] = [
  {
    label: "Compounded tirzepatide or semaglutide",
    us: yes("Yes. Compounded tirzepatide or semaglutide, your choice."),
    hims: no("Discontinued in 2026. Brand-name medication only."),
    ro: no("Brand-name medication only."),
  },
  {
    label: "Starting price",
    us: yes("From $148, medication and doctor visit included."),
    hims: info("Brand tirzepatide from $399/mo, plus membership."),
    ro: info("Brand medication from $299/mo, billed separately from membership."),
  },
  {
    label: "Monthly membership on top of the medication",
    us: yes("Zero monthly membership. Zero hidden fees."),
    hims: no("$149/mo after the first month. Not HSA/FSA eligible."),
    ro: no("$149/mo after the first month ($74/mo if you prepay a year)."),
  },
  {
    label: "Same price at every dose",
    us: yes("Yes. The price does not climb as your dose increases."),
    hims: no("Brand pricing varies by dose."),
    ro: no("Brand pricing varies by dose."),
  },
  {
    label: "Pay with your HSA/FSA card at checkout",
    us: yes("Yes. Pay with your HSA/FSA card at checkout."),
    hims: no("HSA/FSA cards cannot be kept on file. Pay another way, then request reimbursement."),
    ro: no("No longer accepts HSA/FSA cards at checkout as of 2026."),
  },
  {
    label: "Insurance required",
    us: yes("No insurance needed."),
    hims: yes("No insurance needed."),
    ro: yes("No insurance needed."),
  },
  {
    label: "Doctor visit",
    us: yes("100% online, included in the price."),
    hims: info("Online, included with the membership."),
    ro: info("Online, included with the membership."),
  },
  {
    label: "Delivery",
    us: yes("Free 1-2 day shipping, temperature-controlled."),
    hims: info("Varies."),
    ro: info("Typically within a week for cash-pay orders."),
  },
  {
    label: "Pharmacy and FDA status",
    us: info("Compounded by US pharmacies licensed and inspected by state Boards of Pharmacy. Compounded medications are not FDA approved; we say so up front."),
    hims: info("FDA-approved brand-name medication."),
    ro: info("FDA-approved brand-name medication."),
  },
];

const SOURCES: readonly string[] = [
  "Hims: hims.com/weight-loss pricing and FAQ (membership $39 first month then $149/mo; FSA/HSA cards cannot be used as a payment method on file); compounded GLP-1 marketing ended after the March 9, 2026 settlement with Novo Nordisk.",
  "Ro: ro.co/weight-loss pricing (membership $39 first month, $149/mo, or $74/mo prepaid annually; medication not included); HSA card acceptance ended in 2026 per Ro customer service as reported by customers.",
  "InstaRx: go.instarx.com/glp2, as published.",
  "All competitor details as of September 2026. Prices and policies change; confirm on the provider's own site.",
];

function Mark({ ok }: { ok: boolean | null }) {
  if (ok === null) {
    return (
      <span
        aria-hidden="true"
        className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gray-200 text-gray-600 text-xs font-bold"
      >
        i
      </span>
    );
  }
  return ok ? (
    <span
      aria-hidden="true"
      className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full"
      style={{ backgroundColor: "#00b67a" }}
    >
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 13l4 4L19 7" />
      </svg>
    </span>
  ) : (
    <span
      aria-hidden="true"
      className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gray-300"
    >
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3.5" strokeLinecap="round">
        <path d="M6 6l12 12M18 6L6 18" />
      </svg>
    </span>
  );
}

function CellView({ cell, strong = false }: { cell: Cell; strong?: boolean }) {
  return (
    <div className="flex items-start gap-2">
      <Mark ok={cell.ok} />
      <span className={strong ? "text-gray-900 font-semibold" : "text-gray-700"}>
        {cell.text}
      </span>
    </div>
  );
}

export function ComparisonBlock() {
  return (
    <section className="bg-white py-16" id="compare">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-gray-900 mb-3 leading-tight">
          Switching from a branded-only program?
        </h2>
        <p className="text-lg text-gray-500 mb-8 max-w-2xl">
          What changed at the big names in 2026, and what you get here instead. Same weekly shot, a fraction of the bill, and your HSA/FSA card works at checkout.
        </p>

        {/* Desktop: table. */}
        <div className="hidden md:block overflow-x-auto rounded-3xl border border-gray-200">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="bg-gray-50 text-xs uppercase tracking-wide text-gray-500">
                <th scope="col" className="px-5 py-4 font-semibold w-[22%]">
                  What matters
                </th>
                <th scope="col" className="px-5 py-4 font-semibold text-gray-900 w-[30%]">
                  InstaRx
                </th>
                <th scope="col" className="px-5 py-4 font-semibold w-[24%]">
                  Hims
                </th>
                <th scope="col" className="px-5 py-4 font-semibold w-[24%]">
                  Ro
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {ROWS.map((row) => (
                <tr key={row.label} className="align-top">
                  <th scope="row" className="px-5 py-4 font-semibold text-gray-900">
                    {row.label}
                  </th>
                  <td className="px-5 py-4 bg-emerald-50/40">
                    <CellView cell={row.us} strong />
                  </td>
                  <td className="px-5 py-4">
                    <CellView cell={row.hims} />
                  </td>
                  <td className="px-5 py-4">
                    <CellView cell={row.ro} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile: one card per row. */}
        <div className="md:hidden flex flex-col gap-4">
          {ROWS.map((row) => (
            <div key={row.label} className="rounded-2xl border border-gray-200 p-4">
              <p className="text-xs uppercase tracking-wide text-gray-500 font-semibold mb-3">
                {row.label}
              </p>
              <div className="flex flex-col gap-3 text-sm">
                <div>
                  <p className="text-xs font-semibold text-gray-900 mb-1">InstaRx</p>
                  <CellView cell={row.us} strong />
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-500 mb-1">Hims</p>
                  <CellView cell={row.hims} />
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-500 mb-1">Ro</p>
                  <CellView cell={row.ro} />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 text-xs text-gray-500 space-y-1.5 max-w-3xl">
          <p>
            Compounded medications are not FDA approved and are not reviewed by the FDA for safety, effectiveness or quality. They are prepared by licensed pharmacies for an individual patient on a prescription from a licensed provider. Hims and Ro are trademarks of their respective owners; InstaRx is not affiliated with either.
          </p>
          <ul className="list-disc pl-4 space-y-1">
            {SOURCES.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
