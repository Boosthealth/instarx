/**
 * Message-matched ad landers for /glp2 — registry + split allocation.
 *
 * Each Google Ads ad group carries one dominant promise (verified against the
 * served-combination report, not just the headline pools). The ads keep their
 * final URL (go.instarx.com/glp2) and append `lp=<slug>` via a final-URL
 * suffix; proxy.ts reads it, buckets the visitor 50/50, and REWRITES the "new"
 * arm to /glp2/lp/<slug> (URL stays /glp2?lp=…, so no redirect and no ad
 * re-review). The control arm falls through to the unchanged /glp2 page.
 *
 * Like GLP_FUNNEL_SPLIT_WEIGHTS, allocation is a pure function of the stable
 * `cvt_vid` visitor id — sticky across visits, re-weightable by editing
 * LANDER_SPLIT_NEW_WEIGHT (0 = kill all new heroes, 100 = full rollout).
 *
 * Measurement: both arms fire a `lander_split` dataLayer event (slug + arm),
 * and proxy.ts folds `utm_lp` / `utm_lander_arm` into the ix_attribution
 * cookie so the assignment reaches the intake funnel → PostHog → Stripe join.
 */

/** Hero copy slots a lander overrides. Everything below the hero is shared. */
export type LanderContent = {
  /** H1 lines (rendered with a <br> between them). */
  h1: readonly string[];
  /** Sub-headline under the H1. */
  lede: string;
  /** Price line after the "Starting at $148" anchor. */
  priceRest: string;
  /** The four check bullets, theme bullet first (icons keep their order). */
  bullets: readonly [string, string, string, string];
  /** Primary CTA label (desktop + sticky mobile). */
  cta: string;
  /** <title> for the page. */
  title: string;
  /** Meta description. */
  description: string;
};

/** Price anchor shared by every lander's price line. */
export const LANDER_PRICE = "$148";

const HSA_BULLETS = (med: string): LanderContent["bullets"] => [
  "HSA/FSA accepted at checkout. No insurance required.",
  `100% online doctor visits. ${med} prescribed by US-licensed providers.`,
  "Same price, every dose.",
  "Free 1-2 day shipping, temperature-controlled.",
];

const DESCRIPTION_BASE =
  "InstaRx is a telehealth service that delivers personalized medicine right to your door. Prescribed online by US-licensed providers, shipped fast and discreet.";

/**
 * Slug → hero content. Slugs are the `lp=` values carried by the ads' final
 * URL suffixes (one per ad group; keyword-level suffixes override where an ad
 * group mixes intents). Copy is tuned to what Google actually SERVES per ad
 * group (served-combination report, last 30d), not just the headline pool.
 */
export const LANDERS: Record<string, LanderContent> = {
  "tirzepatide-hsa": {
    h1: ["Pay for Tirzepatide With", "Your HSA/FSA Card"],
    lede: "No insurance needed. Doctor-prescribed tirzepatide, fully HSA/FSA eligible.",
    priceRest:
      "Pay with your HSA/FSA card at checkout. No hidden fees. No clinic visits.",
    bullets: HSA_BULLETS("Tirzepatide"),
    cta: "Check My HSA/FSA Eligibility →",
    title: "Tirzepatide HSA/FSA Eligible - Pay With Your HSA/FSA Card",
    description: `Tirzepatide is HSA/FSA eligible at InstaRx. ${DESCRIPTION_BASE}`,
  },
  "glp1-hsa": {
    h1: ["GLP-1 Weight Loss,", "HSA/FSA Eligible"],
    lede: "Use your HSA/FSA dollars for doctor-prescribed semaglutide or tirzepatide.",
    priceRest: "HSA/FSA accepted. No insurance needed. No hidden fees.",
    bullets: HSA_BULLETS("Semaglutide or Tirzepatide"),
    cta: "Check My HSA/FSA Eligibility →",
    title: "GLP-1 HSA/FSA Eligible - Pay With Your HSA/FSA Card",
    description: `GLP-1 weight loss treatment is HSA/FSA eligible at InstaRx. ${DESCRIPTION_BASE}`,
  },
  "weight-loss-injections": {
    h1: ["Weight Loss Injections,", "Designed by Doctors"],
    lede: "Prescription GLP-1 injections tailored to your body and goals. No in-person visits required.",
    priceRest:
      "Doctor-prescribed and delivered in 1-2 days. No insurance needed. No clinic visits.",
    bullets: [
      "No in-person visits. 100% online doctor consultations.",
      "Tailored visit & prescription included. HSA/FSA accepted.",
      "Same price, every dose.",
      "Free 1-2 day shipping, temperature-controlled.",
    ],
    cta: "Find My Injection Plan →",
    title: "Doctor-Designed Weight Loss Injections From $148",
    description: `Doctor-designed weight loss injections from $148. ${DESCRIPTION_BASE}`,
  },
  "fat-burning": {
    h1: ["Weight Loss Injections", `Starting at ${LANDER_PRICE}`],
    lede: "Lose stubborn belly fat with a doctor-guided GLP-1 program. No in-person visits required.",
    priceRest:
      "Doctor-prescribed GLP-1, delivered in 1-2 days. No insurance needed. No hidden fees.",
    bullets: [
      "Doctor-guided GLP-1 program, tailored to your goals.",
      "No in-person visits. 100% online doctor consultations.",
      "Same price, every dose.",
      "Free 1-2 day shipping, temperature-controlled.",
    ],
    cta: "Start My Fat Loss Plan →",
    title: `Weight Loss Injections Starting at ${LANDER_PRICE}`,
    description: `Doctor-guided GLP-1 injections starting at ${LANDER_PRICE}. ${DESCRIPTION_BASE}`,
  },
  "tirzepatide-injection": {
    h1: ["Tirzepatide Injections,", "Delivered Fast"],
    lede: "Prescribed online by US-licensed providers and shipped discreetly to your door.",
    priceRest: "Same price every dose. Free 1-2 day cold shipping.",
    bullets: [
      "Fast, discreet home delivery. Temperature-controlled.",
      "100% online doctor visits. Tirzepatide prescribed by US-licensed providers.",
      "Same price, every dose.",
      "HSA/FSA accepted. No insurance required.",
    ],
    cta: "Get My Tirzepatide Rx →",
    title: "Tirzepatide Injections Online - Fast, Discreet Delivery",
    description: `Tirzepatide injections prescribed online and delivered fast. ${DESCRIPTION_BASE}`,
  },
  "glp1-injection": {
    h1: ["GLP-1 Injections,", "Prescribed Online"],
    lede: "Semaglutide or tirzepatide injections, your choice. HSA/FSA eligible.",
    priceRest:
      "HSA/FSA accepted. Same price every dose. Free 1-2 day cold shipping.",
    bullets: [
      "100% online doctor visits. Semaglutide or Tirzepatide, your choice.",
      "HSA/FSA accepted at checkout. No insurance required.",
      "Same price, every dose.",
      "Free 1-2 day shipping, temperature-controlled.",
    ],
    cta: "Get My GLP-1 Rx →",
    title: "GLP-1 Injections Online - HSA/FSA Eligible",
    description: `GLP-1 injections prescribed online, HSA/FSA eligible. ${DESCRIPTION_BASE}`,
  },
  "tirzepatide-online": {
    h1: ["Tirzepatide, Prescribed", "Online in Minutes"],
    lede: "No waiting rooms. Complete your visit from home and get tirzepatide delivered fast.",
    priceRest:
      "Prescribed online and delivered in 1-2 days. No insurance needed. No clinic visits.",
    bullets: [
      "100% online doctor visits. No waiting rooms.",
      "Tailored visit & prescription included. HSA/FSA accepted.",
      "Same price, every dose.",
      "Free 1-2 day shipping, temperature-controlled.",
    ],
    cta: "Start My Online Visit →",
    title: "Tirzepatide Prescribed Online in Minutes",
    description: `Tirzepatide prescribed online in minutes. ${DESCRIPTION_BASE}`,
  },
  "glp1-online": {
    h1: ["GLP-1, Prescribed", "Online in Minutes"],
    lede: "No waiting rooms. Complete your online visit from home. HSA/FSA eligible.",
    priceRest:
      "Prescribed online and delivered in 1-2 days. HSA/FSA accepted. No hidden fees.",
    bullets: [
      "100% online doctor visits. No waiting rooms.",
      "HSA/FSA accepted at checkout. No insurance required.",
      "Same price, every dose.",
      "Free 1-2 day shipping, temperature-controlled.",
    ],
    cta: "Start My Online Visit →",
    title: "GLP-1 Prescribed Online in Minutes - HSA/FSA Eligible",
    description: `GLP-1 prescribed online in minutes, HSA/FSA eligible. ${DESCRIPTION_BASE}`,
  },
  semaglutide: {
    h1: ["Pay for Semaglutide With", "Your HSA/FSA Card"],
    lede: "No insurance needed. Doctor-prescribed semaglutide, fully HSA/FSA eligible.",
    priceRest:
      "Pay with your HSA/FSA card at checkout. No hidden fees. No clinic visits.",
    bullets: HSA_BULLETS("Semaglutide"),
    cta: "Check My HSA/FSA Eligibility →",
    title: "Semaglutide HSA/FSA Eligible - Pay With Your HSA/FSA Card",
    description: `Semaglutide is HSA/FSA eligible at InstaRx. ${DESCRIPTION_BASE}`,
  },
};

export type LanderSlug = keyof typeof LANDERS;

export function isLanderSlug(value: string | null | undefined): value is LanderSlug {
  return typeof value === "string" && value in LANDERS;
}

/** Arms of the per-lander split. `new` = matched hero, `control` = current /glp2 hero. */
export type LanderArm = "new" | "control";

/**
 * Percentage of lander traffic that sees the NEW matched hero; the rest fall
 * through to the unchanged /glp2 page. One-line re-weighting, like
 * GLP_FUNNEL_SPLIT_WEIGHTS: 0 kills every new hero, 100 is full rollout.
 */
export const LANDER_SPLIT_NEW_WEIGHT = 50;

/**
 * FNV-1a, salted so lander-arm assignment is independent of the funnel-split
 * assignment computed from the same visitor id (an unsalted reuse would
 * correlate the two experiments' buckets).
 */
function hashSalted(visitorId: string): number {
  const input = `glp2-lander:${visitorId}`;
  let hash = 0x811c9dc5;
  for (let i = 0; i < input.length; i += 1) {
    hash ^= input.charCodeAt(i);
    hash = Math.imul(hash, 0x01000193);
  }
  return hash >>> 0;
}

/** Sticky 50/50 (per LANDER_SPLIT_NEW_WEIGHT) arm assignment for a visitor. */
export function landerArmFor(visitorId: string): LanderArm {
  if (!visitorId) return "control";
  return hashSalted(visitorId) % 100 < LANDER_SPLIT_NEW_WEIGHT
    ? "new"
    : "control";
}
