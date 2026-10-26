import Image from "next/image";
import type { ReactNode } from "react";
import {
  INTAKE_HREF,
  callout,
  disclaimers,
  expectations,
  faq,
  finalCta,
  fit,
  hero,
  howItWorks,
  pricing,
  problem,
  science,
  trust,
} from "./content";

/* ------------------------------------------------------------------------ */
/* Shared pieces                                                             */
/* ------------------------------------------------------------------------ */

const CONTAINER = "max-w-7xl mx-auto px-4 sm:px-6";
const H2 =
  "text-4xl md:text-5xl font-bold tracking-tight text-gray-900 leading-tight text-balance";
const BODY = "text-lg text-gray-700 leading-relaxed text-pretty";
const PHOTO_SIZES =
  "(max-width: 640px) calc(100vw - 32px), (max-width: 1024px) calc(100vw - 48px), 600px";

/** Primary CTA: a plain anchor (full navigation) so proxy rewrites and the
 *  /intake split apply; next/link would soft-navigate in production. */
function Cta({
  children,
  color = "dark",
  className = "",
}: {
  children: ReactNode;
  color?: "dark" | "light" | "white";
  className?: string;
}) {
  const base =
    "inline-flex items-center justify-center px-6 md:px-10 py-3.5 rounded-full text-base font-semibold transition-colors duration-200 hover:bg-blue-500 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2";
  const variant =
    color === "light"
      ? "bg-white text-black border border-gray-300 hover:border-blue-500"
      : color === "white"
        ? "bg-white text-black shadow"
        : "bg-black text-white shadow";
  return (
    <a href={INTAKE_HREF} className={`${base} ${variant} ${className}`.trim()}>
      {children}
    </a>
  );
}

/** Numbered reference, linked to the References list above the footer. */
function Ref({ n }: { n: number }) {
  return (
    <sup className="ml-0.5 text-[max(0.65em,11px)] leading-none">
      <a
        href={`#ref-${n}`}
        className="font-bold text-blue-600 no-underline hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-sm"
        aria-label={`Reference ${n}`}
      >
        {n}
      </a>
    </sup>
  );
}

function CheckIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      width="16"
      height="16"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <path
        d="m3.5 8.5 3 3 6-7"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SymptomIcon({
  name,
}: {
  name: (typeof problem.symptoms)[number]["icon"];
}) {
  const paths = {
    snore: "M3 12c2-3 4-3 6 0s4 3 6 0 4-3 6 0M3 17c2-3 4-3 6 0s4 3 6 0 4-3 6 0",
    battery:
      "M2 9a2 2 0 0 1 2-2h13a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2zM22 11v2M6 10v4",
    moon: "M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z",
  } as const;
  return (
    <svg
      viewBox="0 0 24 24"
      width="26"
      height="26"
      aria-hidden="true"
      focusable="false"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d={paths[name]} />
    </svg>
  );
}

function Photo({
  src,
  alt,
  className = "",
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    <Image
      src={src}
      alt={alt}
      width={1376}
      height={768}
      sizes={PHOTO_SIZES}
      className={`w-full h-auto rounded-3xl object-cover aspect-[16/11] ${className}`.trim()}
    />
  );
}

/* ------------------------------------------------------------------------ */
/* 1. Hero                                                                   */
/* ------------------------------------------------------------------------ */

export function Hero() {
  return (
    <section className="sm:px-4" style={{ paddingTop: "var(--header-height)" }}>
      <div className="bg-gradient rounded-3xl sm:rounded-[48px] overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 text-gray-900">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center py-8 sm:py-14">
            <div>
              <p className="inline-block mb-5 rounded-full bg-white/70 px-4 py-1.5 text-sm font-semibold tracking-wide text-gray-900">
                {hero.eyebrow}
              </p>
              <h1 className="text-4xl sm:text-6xl font-extrabold leading-[1.1] tracking-tight mb-5 text-balance">
                {hero.headline}
              </h1>
              <p className="text-lg sm:text-xl text-gray-800 mb-7 max-w-xl leading-relaxed">
                {hero.sub}
              </p>
              <Cta className="w-full sm:w-auto mb-4">{hero.cta}</Cta>
              <p className="text-sm text-gray-700">
                {hero.micro.map((item, i) => (
                  <span key={item}>
                    {i > 0 && (
                      <span aria-hidden="true">&nbsp;&nbsp;·&nbsp;&nbsp;</span>
                    )}
                    {item}
                  </span>
                ))}
              </p>
            </div>
            <div className="flex justify-center lg:justify-end">
              <Image
                src={hero.image.src}
                alt={hero.image.alt}
                width={1376}
                height={768}
                sizes="(max-width: 1024px) calc(100vw - 48px), 560px"
                priority
                fetchPriority="high"
                className="w-full lg:max-w-[560px] h-auto rounded-2xl object-cover aspect-[4/3] lg:aspect-[16/11]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------------ */
/* Trust strip                                                               */
/* ------------------------------------------------------------------------ */

export function TrustBar() {
  return (
    <div className="bg-white">
      <ul
        className={`${CONTAINER} flex flex-wrap justify-center gap-x-10 gap-y-2 py-5 text-sm sm:text-base font-semibold text-gray-900`}
      >
        {trust.map((item) => (
          <li key={item} className="inline-flex items-center gap-2">
            <CheckIcon className="text-emerald-600" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ------------------------------------------------------------------------ */
/* 2. The problem                                                            */
/* ------------------------------------------------------------------------ */

export function Problem() {
  return (
    <section className="bg-white py-16 md:py-24">
      <div
        className={`${CONTAINER} grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center`}
      >
        <Photo src={problem.image.src} alt={problem.image.alt} />
        <div>
          <h2 className={`${H2} mb-5`}>{problem.title}</h2>
          <p className={BODY}>{problem.body}</p>
          <ul className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3">
            {problem.symptoms.map((s) => (
              <li
                key={s.text}
                className="flex sm:flex-col items-center gap-4 sm:gap-3 rounded-2xl bg-gray-100 p-4 sm:p-5 text-left sm:text-center text-base font-semibold text-gray-900"
              >
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-white text-blue-600">
                  <SymptomIcon name={s.icon} />
                </span>
                {s.text}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------------ */
/* 3. The science                                                            */
/* ------------------------------------------------------------------------ */

export function Science() {
  return (
    <section className="sm:px-4">
      <div className="bg-gray-100 rounded-3xl sm:rounded-[48px] py-16 md:py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className={`${H2} mb-5`}>{science.title}</h2>
            <p className={BODY}>
              {science.intro.map((part, i) => (
                <span key={part.text}>
                  {i > 0 && " "}
                  {part.text}
                  <Ref n={part.ref} />
                </span>
              ))}
            </p>
          </div>
          <ul className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-5">
            {science.stats.map((stat) => (
              <li key={stat.n} className="rounded-3xl bg-white p-7 md:p-8">
                <p className="text-4xl xl:text-5xl font-extrabold tracking-tight text-gray-900 leading-none mb-3">
                  {stat.n}
                </p>
                <p className="text-base text-gray-700 leading-relaxed">
                  {stat.text}
                  <Ref n={stat.ref} />
                </p>
              </li>
            ))}
          </ul>
          <p className="mx-auto mt-8 max-w-3xl text-center text-sm text-gray-700 leading-relaxed">
            {science.disclosure}
          </p>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------------ */
/* 4. Set expectations                                                       */
/* ------------------------------------------------------------------------ */

export function Expectations() {
  return (
    <section className="bg-white py-16 md:py-24">
      <div
        className={`${CONTAINER} grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center`}
      >
        <Photo src={expectations.image.src} alt={expectations.image.alt} />
        <div>
          <h2 className={`${H2} mb-5`}>{expectations.title}</h2>
          <p className={BODY}>
            {expectations.body}
            <Ref n={expectations.bodyRef} /> {expectations.bodyTail}
          </p>
          {/* Timeline: a hairline track with a dot per milestone (vertical on
              phones, horizontal from `sm`), not a coloured side stripe. */}
          <ol className="mt-8 grid grid-cols-1 sm:grid-cols-4 gap-4 sm:gap-3">
            {expectations.timeline.map((step) => (
              <li
                key={step.when}
                className="relative border-l border-gray-300 pl-5 sm:border-l-0 sm:border-t sm:pl-0 sm:pt-4"
              >
                <span
                  className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full bg-blue-500 ring-2 ring-white sm:left-0 sm:-top-[5px]"
                  aria-hidden="true"
                />
                <p className="text-base font-bold text-gray-900">{step.when}</p>
                <p className="text-sm text-gray-700">{step.what}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------------ */
/* 5. How InstaRx works                                                      */
/* ------------------------------------------------------------------------ */

export function HowItWorks() {
  return (
    <section className="bg-white pb-16 md:pb-24" id="how-it-works">
      <div className={CONTAINER}>
        <h2 className={`${H2} text-center mb-10`}>{howItWorks.title}</h2>
        <ol className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12 md:mb-16">
          {howItWorks.steps.map((step, i) => (
            <li key={step.title} className="rounded-3xl bg-gray-100 p-7">
              <span
                className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-black text-base font-extrabold text-white"
                aria-hidden="true"
              >
                {i + 1}
              </span>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                <span className="sr-only">Step {i + 1}: </span>
                {step.title}
              </h3>
              <p className="text-base text-gray-700 leading-relaxed">
                {step.text}
              </p>
            </li>
          ))}
        </ol>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <Photo src={howItWorks.image.src} alt={howItWorks.image.alt} />
          <div>
            <h3 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 leading-tight mb-4">
              {howItWorks.care.title}
            </h3>
            <p className={`${BODY} mb-7`}>{howItWorks.care.text}</p>
            <Cta className="w-full sm:w-auto">{howItWorks.care.cta}</Cta>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------------ */
/* 6. Pricing — the standard GLP-1 block from /glp2                          */
/* ------------------------------------------------------------------------ */

export function Pricing() {
  return (
    <section className="bg-[#f5f0eb] py-16 md:py-24 px-6" id="pricing">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className={`${H2} mb-3`}>{pricing.title}</h2>
        <p className="text-lg md:text-xl font-medium text-gray-700 mb-10">
          {pricing.lead}
        </p>

        <div className="rounded-3xl overflow-hidden bg-[#faf6f0] text-left">
          <div className="pt-8 px-4">
            <p className="text-center text-base font-medium text-gray-700">
              {pricing.medications}
            </p>
            <div className="flex items-center justify-center gap-4 sm:gap-8 pt-4">
              {pricing.vials.map((vial) => (
                <Image
                  key={vial.src}
                  src={vial.src}
                  alt={vial.alt}
                  width={640}
                  height={640}
                  sizes="(max-width: 640px) 40vw, 280px"
                  className="w-1/2 max-w-[280px] h-auto object-contain"
                />
              ))}
            </div>
            <div className="flex justify-center pt-2">
              <span className="bg-gradient inline-flex items-center rounded-full px-4 py-2 text-sm font-medium text-black whitespace-nowrap">
                {pricing.badge}
              </span>
            </div>
          </div>
          <ul className="mx-auto max-w-xl px-6 sm:px-10 py-8 divide-y divide-gray-200">
            {pricing.included.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 py-3 text-base font-medium text-gray-900"
              >
                <CheckIcon className="mt-1 shrink-0 text-emerald-600" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-8 flex flex-col items-center gap-4">
          <div className="flex w-full flex-col sm:w-auto sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <Cta className="w-full sm:w-auto min-w-48">{pricing.cta}</Cta>
            <Cta color="light" className="w-full sm:w-auto min-w-48">
              {pricing.ctaSecondary}
            </Cta>
          </div>
          <p className="text-sm text-gray-700">{pricing.reassurance}</p>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------------ */
/* 7. Who it's for                                                           */
/* ------------------------------------------------------------------------ */

function FitList({ items }: { items: readonly string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li
          key={item}
          className="flex items-start gap-3 text-base text-gray-900 leading-relaxed"
        >
          <span
            className="mt-2.5 h-2 w-2 shrink-0 rounded-full bg-gray-900"
            aria-hidden="true"
          />
          {item}
        </li>
      ))}
    </ul>
  );
}

export function Fit() {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className={CONTAINER}>
        <h2 className={`${H2} text-center mb-10`}>{fit.title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="rounded-3xl bg-emerald-50 p-7 md:p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              {fit.yes.title}
            </h3>
            <FitList items={fit.yes.items} />
          </div>
          <div className="rounded-3xl bg-orange-50 p-7 md:p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              {fit.no.title}
            </h3>
            <FitList items={fit.no.items} />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------------ */
/* 8. CPAP + safety callout — required, never collapsible, above the FAQ     */
/* ------------------------------------------------------------------------ */

export function Callout() {
  return (
    <section className="bg-white pb-6" aria-label="CPAP and safety notice">
      <div className={CONTAINER}>
        <div
          role="note"
          className="flex flex-col sm:flex-row gap-4 sm:gap-6 rounded-3xl border-2 border-amber-300 bg-amber-50 p-6 sm:p-8"
        >
          <span
            className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-white text-amber-700"
            aria-hidden="true"
          >
            <svg
              viewBox="0 0 24 24"
              width="26"
              height="26"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              focusable="false"
            >
              <path d="M12 3 2 20h20L12 3z" />
              <path d="M12 10v4M12 17v.5" />
            </svg>
          </span>
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              {callout.title}
            </h3>
            <p className="text-base text-gray-800 leading-relaxed">
              {callout.body}
              <Ref n={callout.bodyRef} />
            </p>
            <p className="mt-3 text-sm text-gray-800 leading-relaxed">
              {callout.fine}
              <Ref n={callout.fineRef} />
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------------ */
/* 9. FAQ — native <details>; `name` keeps one answer open at a time         */
/* ------------------------------------------------------------------------ */

export function Faq() {
  return (
    <section className="bg-white py-16 md:py-24" id="faq">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <h2 className={`${H2} text-center mb-10`}>{faq.title}</h2>
        <div className="divide-y divide-gray-200 border-t border-gray-200">
          {faq.items.map((item, i) => (
            <details
              key={item.q}
              name="sleep-apnea-faq"
              open={i === 0}
              className="group"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-5 py-5 text-lg font-bold text-gray-900 leading-snug [&::-webkit-details-marker]:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-blue-500 rounded-sm">
                {item.q}
                <span
                  className="shrink-0 text-3xl font-light leading-none text-blue-600 transition-transform duration-200 group-open:rotate-45 motion-reduce:transition-none"
                  aria-hidden="true"
                >
                  +
                </span>
              </summary>
              <p className="pb-6 text-base text-gray-700 leading-relaxed">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------------ */
/* 10. Final CTA                                                             */
/* ------------------------------------------------------------------------ */

export function FinalCta() {
  return (
    <section className="sm:p-4">
      {/* The couple is centred in the photo, so copy never overlays it: phones
          stack the photo above the copy, and from `sm` up the photo becomes a
          right-hand panel fading into the dark card while the copy sits left. */}
      <div className="relative overflow-hidden rounded-t-3xl sm:rounded-[48px] bg-gray-950 sm:min-h-[480px] sm:flex sm:items-center">
        <div className="relative aspect-[16/11] sm:absolute sm:inset-y-0 sm:right-0 sm:w-[62%] sm:aspect-auto">
          <Image
            src={finalCta.image.src}
            alt={finalCta.image.alt}
            fill
            sizes="(max-width: 640px) 100vw, 62vw"
            className="object-cover sm:object-[center_40%]"
          />
          <div
            className="absolute inset-0 hidden sm:block bg-linear-to-r from-gray-950 from-5% via-gray-950/45 via-45% to-gray-950/0"
            aria-hidden="true"
          />
        </div>
        <div className="relative w-full px-6 py-12 text-center sm:max-w-xl sm:py-16 sm:pl-12 sm:text-left lg:pl-16">
          <h2 className="mx-auto mb-7 max-w-3xl text-4xl md:text-5xl font-bold tracking-tight leading-tight text-balance text-white sm:mx-0">
            {finalCta.title}
          </h2>
          <Cta color="white" className="w-full sm:w-auto">
            {finalCta.cta}
          </Cta>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------------ */
/* Disclaimer + references, directly above the shared site footer           */
/* ------------------------------------------------------------------------ */

export function Disclaimers() {
  return (
    <section
      className="bg-white py-10 border-t border-gray-200"
      aria-label="Disclaimers and references"
    >
      <div className={`${CONTAINER} text-sm text-gray-700 leading-relaxed`}>
        <p className="max-w-4xl">{disclaimers.text}</p>
        <p className="mt-6 font-semibold text-gray-900">
          {disclaimers.referencesTitle}
        </p>
        <ol className="mt-1 list-decimal pl-5 space-y-1">
          {disclaimers.references.map((ref, i) => (
            <li key={ref.links[0].href} id={`ref-${i + 1}`}>
              {ref.links.map((link, j) => (
                <span key={link.href}>
                  {j > 0 && "; "}
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener nofollow"
                    className="text-blue-700 underline underline-offset-2 hover:text-blue-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-sm"
                  >
                    {link.label}
                  </a>
                </span>
              ))}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
