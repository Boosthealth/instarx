/**
 * /ed-treatment-v2 — content for the video-led single-product ED lander.
 * Every string the page renders lives here. Claims follow the guardrails in
 * docs/ed-treatment/landing-page-brief.md Part 4.
 */

export const INTAKE_HREF = "https://my.instarx.com/intake/insta-ready";

// ---------------------------------------------------------------------------
// TODO_CONFIRM — commercial and product values not yet confirmed by the
// prescribing/pharmacy partners (brief Part 9). Placeholders are plausible
// against the intake catalog (5-packs $98–$187, "about $8.3/use") and QUAD's
// $114 / was $179 anchor. Change here only; nothing else hard-codes them.
// ---------------------------------------------------------------------------
export const TODO_CONFIRM = {
  /** First-month price for the monthly tier (USD). */
  PRICE_MONTHLY: 99,
  /** "Was" anchor shown struck through beside the monthly price. */
  PRICE_MONTHLY_WAS: 149,
  /** Recurring price after the first month, monthly tier. */
  PRICE_MONTHLY_RECURRING: 129,
  /** 3-month tier price (USD), billed once every 3 months. */
  PRICE_QUARTERLY: 249,
  /** "Was" anchor for the 3-month tier. */
  PRICE_QUARTERLY_WAS: 447,
  /** Doses per shipment, monthly tier. */
  DOSES_MONTHLY: 12,
  /** Doses per shipment, 3-month tier. */
  DOSES_QUARTERLY: 36,
  /** Shipping cost and speed claim. */
  SHIPPING: "Free 1–2 day shipping",
  /** Delivery window as a noun phrase, for sentences and the SEO description. */
  SHIPPING_DAYS: "1–2 days",
  /** Qualification guarantee wording (confirm with provider partner). */
  NOT_QUALIFIED: "You're not charged if you don't qualify",
  /** Cancellation terms. */
  CANCEL: "Cancel anytime, no membership",
  /** Provider review turnaround. */
  REVIEW_TIME: "Usually within 24 hours",
  /** Per-ingredient strengths. Publish exact mg or keep "set by your provider". */
  STRENGTHS: {
    sildenafil: "Strength set by your provider",
    vardenafil: "Strength set by your provider",
    tadalafil: "Strength set by your provider",
    apomorphine: "Strength set by your provider",
  },
  /** Safety-information destination. A combined Quattro™ safety page does not
   *  exist yet; the sildenafil page is the closest live one. */
  SAFETY_HREF: "/safety/sildenafil",
  /** Video path. The loop does not exist yet; the poster stills do, and the
   *  labelled gradient slot underneath still renders if a poster 404s. */
  HERO_VIDEO_SRC: "/video/ed-treatment-v2/hero.mp4",
  /** Public Trustpilot profile URL. Neither instarx.com nor go.instarx.com
   *  links one today (checked 2026-09-23), so TrustBadge shows the sitewide
   *  rating labelled InstaRx and no Trustpilot mark until this is set. */
  TRUSTPILOT_URL: null as string | null,
} as const;

const money = (n: number) => `$${n}`;
const perDose = (price: number, doses: number) =>
  `$${(price / doses).toFixed(2).replace(/\.00$/, "")}`;

/** Sitewide, real, not ED-specific. Always labelled as InstaRx (brief Part 4).
 *  Rendered by TrustBadge in the hero (compact) and above the testimonials. */
export const rating = {
  grade: "Excellent",
  score: "4.7",
  outOf: "5",
  /** Whose rating this is. Replaced by the Trustpilot mark once TRUSTPILOT_URL exists. */
  source: "InstaRx customer rating",
  count: "Across 10,000+ InstaRx customers",
  outOfLabel: "out of",
  trustpilotWordmark: "Trustpilot",
  /** Accessible names for the whole badge (it is one role="img"). */
  labelInstaRx:
    "InstaRx customer rating: Excellent, 4.7 out of 5. Across 10,000+ InstaRx customers.",
  labelTrustpilot:
    "Rated Excellent, 4.7 out of 5 on Trustpilot. Across 10,000+ InstaRx customers.",
} as const;

export const header = {
  logoAlt: "InstaRx",
  logoSrc: "/logos/instarx-logo-inverse.webp",
  anchor: { label: "Reviews", href: "#reviews" },
  cta: "See if I qualify",
} as const;

/** Media slots: labelled aspect-ratio boxes with gradient placeholders. */
export type MediaSlot = {
  /** Human label shown in the placeholder while real media is pending. */
  label: string;
  /** What the final asset should be (for the PR body and the asset brief). */
  asset: string;
  /** CSS aspect-ratio for desktop. */
  aspect: string;
  /** CSS aspect-ratio for mobile, if it differs. */
  aspectMobile?: string;
  /** Placeholder gradient variant (see .edv2 --slot-* tokens). */
  tone: 0 | 1 | 2 | 3 | 4;
  /** Real still for the slot, under /public. When set, the slot renders it
   * over the gradient and drops the brief label. Decorative: the copy beside
   * it carries the meaning, so it ships with an empty alt. */
  src?: string;
  /** Separate still for viewports under 48rem when the mobile crop needs its
   * own framing (a 4:5 for a 3:2 slot). Served via <picture>, so only one of
   * the two downloads. */
  srcMobile?: string;
};

export type HeroVariant = "default" | "A" | "B" | "C" | "D" | "E";

export const hero = {
  /** Which headline ships. Options A–E are brief 5.2; "default" is Part 6. */
  heroVariant: "default" as HeroVariant,
  headlines: {
    default: "Speed. Strength. Desire.",
    A: "Ready in minutes. Ready all weekend.",
    B: "Stop planning around a pill.",
    C: "Four ingredients. One dose. Ready when it counts.",
    D: "Get hard faster, stay ready up to 36 hours, and treat desire, not just blood flow.",
    E: "Your body doesn't work on a schedule. Your treatment shouldn't either.",
  } satisfies Record<HeroVariant, string>,
  subhead:
    "Insta-Ready Quattro™ combines the active ingredients behind Viagra®, Cialis® and Levitra® with apomorphine, which works through the brain's arousal pathway rather than blood flow alone. It dissolves under your tongue, so many men feel it in as little as 15 minutes* and stay ready for up to 36 hours.",
  subheadTail:
    "Prescribed online by a US-licensed doctor if it's right for you, shipped in plain packaging.",
  cta: "See if I qualify",
  ctaMicro: `Private online visit · Prescription required · ${TODO_CONFIRM.NOT_QUALIFIED}`,
  video: {
    src: TODO_CONFIRM.HERO_VIDEO_SRC,
    /** Poster stills, 16:9 for desktop and 9:16 for mobile. These are the
     *  LCP frame today and the start frames for the loop later. */
    poster: "/images/ed-treatment-v2/hero-poster-wide.webp",
    posterMobile: "/images/ed-treatment-v2/hero-poster-tall.webp",
    slot: {
      label:
        "Hero video · 16:9 desktop / 9:16 mobile · muted loop · poster first",
      asset:
        "Night apartment: a man in a half-unbuttoned shirt seen from behind, a woman's hand on the back of his neck from out of frame, city lights blurred through the window, one warm lamp. 8–12 s seamless loop, no audio.",
      aspect: "16 / 9",
      aspectMobile: "9 / 16",
      tone: 0,
    } satisfies MediaSlot,
  },
} as const;

/* The hero, sticky bar, tier and final CTA all say "first month" for
 * PRICE_MONTHLY so one product never shows three different "regular" prices. */
export const heroOffer = {
  price: `${money(TODO_CONFIRM.PRICE_MONTHLY)} first month`,
  was: money(TODO_CONFIRM.PRICE_MONTHLY_WAS),
  perDose: `about ${perDose(TODO_CONFIRM.PRICE_MONTHLY, TODO_CONFIRM.DOSES_MONTHLY)} a dose`,
} as const;

export type Ingredient = {
  key: "sildenafil" | "vardenafil" | "tadalafil" | "apomorphine";
  /** The one-word card title (QUAD pattern). */
  title: string;
  ingredient: string;
  role: string;
  approval: string;
  strength: string;
  media: MediaSlot;
};

export const formula = {
  heading: "The complete stack.",
  sub: "Four ingredients in one sublingual dose. Each does one job.",
  items: [
    {
      key: "sildenafil",
      title: "Speed",
      ingredient: "Sildenafil",
      role: "The most-studied ED ingredient, the active in Viagra®. Supports the blood flow behind a firm, reliable response when you're aroused.",
      approval: "FDA-approved on its own.",
      strength: TODO_CONFIRM.STRENGTHS.sildenafil,
      media: {
        label: "Ingredient card · 4:5 abstract macro · no faces",
        asset:
          "Close crop of a hand gripping a navy linen sheet, warm lamp on the hand, cool window fill, no faces.",
        aspect: "4 / 5",
        tone: 1,
        src: "/images/ed-treatment-v2/formula-speed.webp",
      },
    },
    {
      key: "vardenafil",
      title: "Strength",
      ingredient: "Vardenafil",
      role: "The active in Levitra®. Often the first ingredient men notice.",
      approval: "FDA-approved on its own.",
      strength: TODO_CONFIRM.STRENGTHS.vardenafil,
      media: {
        label: "Ingredient card · 4:5 abstract macro · no faces",
        src: "/images/ed-treatment-v2/formula-strength.webp",
        asset:
          "Dense, dark material texture with a single warm highlight: brushed metal or stone.",
        aspect: "4 / 5",
        tone: 2,
      },
    },
    {
      key: "tadalafil",
      title: "Stamina",
      ingredient: "Tadalafil",
      role: "The long-acting one, the active in Cialis®. Keeps you responsive for up to 36 hours.",
      approval: "FDA-approved on its own.",
      strength: TODO_CONFIRM.STRENGTHS.tadalafil,
      media: {
        label: "Ingredient card · 4:5 abstract macro · no faces",
        asset:
          "Bare shoulder and back turned to a blue window before dawn, deep shadow, warm skin. No face.",
        aspect: "4 / 5",
        tone: 3,
        src: "/images/ed-treatment-v2/formula-stamina.webp",
      },
    },
    {
      key: "apomorphine",
      title: "Desire",
      ingredient: "Apomorphine",
      role: "Works through the brain's arousal pathway, a different route from the three above. Studied for erectile response; used off-label in compounded formulas.",
      approval: "Off-label. Not FDA-approved for ED in the US.",
      strength: TODO_CONFIRM.STRENGTHS.apomorphine,
      media: {
        label: "Ingredient card · 4:5 abstract macro · no faces",
        asset:
          "Two faces a breath apart, lips parted, eyes closed, warm amber light on navy.",
        aspect: "4 / 5",
        tone: 4,
        src: "/images/ed-treatment-v2/formula-desire.webp",
      },
    },
  ] satisfies Ingredient[],
  footer:
    "Sildenafil, tadalafil and vardenafil are each FDA-approved on their own; apomorphine is used off-label. Quattro™ is a compounded combination prepared by a state-licensed 503A compounding pharmacy for you; the combined formula is not an FDA-approved finished drug. Your provider sets the exact strengths.",
} as const;

export type Benefit = {
  title: string;
  body: string;
  media: MediaSlot;
};

export const benefits = {
  heading: "Engineered for your body.",
  items: [
    {
      title: "Melts in minutes.",
      body: "Absorbs through the tissue under your tongue instead of waiting on digestion, so many men feel it in as little as 15 minutes*.",
      media: {
        label: "Benefit visual · 1:1 · sublingual troche macro",
        asset:
          "Macro: two fingertips lifting a single pale troche toward parted lips, nose and mouth only, dusk light.",
        aspect: "1 / 1",
        tone: 1,
        src: "/images/ed-treatment-v2/benefit-melts.webp",
      },
    },
    {
      title: "Dinner and performance.",
      body: "A meal is less likely to blunt it than a swallowed tablet. No countdown, no skipping the second course. Your provider will tell you how to time it.",
      media: {
        label: "Benefit visual · 1:1 · low-light dinner table, no faces",
        asset:
          "Candlelit table after dinner: two glasses of red, her hand resting on his, wrists and a watch only.",
        aspect: "1 / 1",
        tone: 3,
        src: "/images/ed-treatment-v2/benefit-dinner.webp",
      },
    },
    {
      title: "Ready when you are.",
      body: "Tadalafil keeps the window open for up to 36 hours. One dose can carry a weekend.",
      media: {
        label: "Benefit visual · 1:1 · duration, no faces",
        asset:
          "Couple asleep under a blue duvet at first light, faces soft, shoulders covered.",
        aspect: "1 / 1",
        tone: 2,
        src: "/images/ed-treatment-v2/benefit-ready.webp",
      },
    },
  ] satisfies Benefit[],
} as const;

export const delivered = {
  heading: "Doctor-prescribed. Delivered discreetly.",
  body: "A US-licensed provider reviews your health history before anything ships. It arrives in plain, unmarked packaging.",
  chips: [
    {
      title: "Online, doctor-led",
      detail: "2-minute visit · US-licensed providers",
    },
    {
      title: "Rx and visit included",
      detail: "No insurance needed · no hidden fees",
    },
    {
      title: "Discreet delivery",
      detail: `Plain packaging · delivered in ${TODO_CONFIRM.SHIPPING_DAYS}`,
    },
  ],
  media: {
    label: "Packaging shot · 3:2 · plain box on a doorstep or table",
    asset:
      "Unbranded matte box on a hallway console, keys beside it, no people. Desktop: grey morning daylight. Mobile: blue dusk through the open front door.",
    aspect: "3 / 2",
    aspectMobile: "4 / 5",
    tone: 2,
    src: "/images/ed-treatment-v2/delivered-wide.webp",
    srcMobile: "/images/ed-treatment-v2/delivered-tall.webp",
  } satisfies MediaSlot,
} as const;

export type ComparisonIcon =
  | "pill"
  | "timer"
  | "clock"
  | "utensils"
  | "brain"
  | "stethoscope"
  | "receipt"
  | "package";

export type ComparisonRow = {
  label: string;
  oldWay: string;
  newWay: string;
  icon: ComparisonIcon;
};

export const comparison = {
  heading: "The old way vs. the new way.",
  oldLabel: "A swallowed pill",
  newLabel: "Insta-Ready Quattro™",
  rows: [
    {
      label: "Format",
      oldWay: "Swallowed tablet",
      newWay: "Dissolves under the tongue",
      icon: "pill",
    },
    {
      label: "Feel it in",
      oldWay: "30–60 minutes",
      newWay: "As little as 15 minutes*",
      icon: "timer",
    },
    {
      label: "Active window",
      oldWay: "Varies by pill",
      newWay: "Up to 36 hours",
      icon: "clock",
    },
    {
      label: "Affected by food",
      oldWay: "Can be",
      newWay: "Less likely",
      icon: "utensils",
    },
    {
      label: "Arousal pathway",
      oldWay: "Blood flow only",
      newWay: "Blood flow and the brain's arousal pathway",
      icon: "brain",
    },
    {
      label: "Doctor visit",
      oldWay: "Waiting room or a portal",
      newWay: "2 minutes online",
      icon: "stethoscope",
    },
    {
      label: "Price",
      oldWay: "Copay, or subscription tiers",
      newWay: "Flat, shown up front",
      icon: "receipt",
    },
    {
      label: "Packaging",
      oldWay: "Pharmacy bag",
      newWay: "Plain, unmarked",
      icon: "package",
    },
  ] satisfies ComparisonRow[],
} as const;

export type PricingTier = {
  key: "monthly" | "quarterly";
  name: string;
  billing: string;
  price: string;
  was: string;
  doses: string;
  perDose: string;
  recurring: string;
  features: string[];
  recommended: boolean;
  cta: string;
};

const sharedFeatures = [
  "Doctor visit and prescription included",
  TODO_CONFIRM.SHIPPING,
  TODO_CONFIRM.CANCEL,
  TODO_CONFIRM.NOT_QUALIFIED,
];

export const pricing = {
  heading: "The power of 4. In 1 dose.",
  sub: "Pricing shown up front. No membership. Cancel anytime.",
  tiers: [
    {
      key: "monthly",
      name: "Monthly",
      billing: "Billed monthly",
      price: money(TODO_CONFIRM.PRICE_MONTHLY),
      was: money(TODO_CONFIRM.PRICE_MONTHLY_WAS),
      doses: `${TODO_CONFIRM.DOSES_MONTHLY} doses`,
      perDose: `${perDose(TODO_CONFIRM.PRICE_MONTHLY, TODO_CONFIRM.DOSES_MONTHLY)} per dose`,
      recurring: `First month ${money(TODO_CONFIRM.PRICE_MONTHLY)}, then ${money(TODO_CONFIRM.PRICE_MONTHLY_RECURRING)}/month`,
      features: sharedFeatures,
      recommended: false,
      cta: "See if I qualify",
    },
    {
      key: "quarterly",
      name: "3-month supply",
      billing: "Billed every 3 months",
      price: money(TODO_CONFIRM.PRICE_QUARTERLY),
      was: money(TODO_CONFIRM.PRICE_QUARTERLY_WAS),
      doses: `${TODO_CONFIRM.DOSES_QUARTERLY} doses`,
      perDose: `${perDose(TODO_CONFIRM.PRICE_QUARTERLY, TODO_CONFIRM.DOSES_QUARTERLY)} per dose`,
      recurring: `${money(TODO_CONFIRM.PRICE_QUARTERLY)} every 3 months, auto-renews until you cancel`,
      features: sharedFeatures,
      recommended: true,
      cta: "See if I qualify",
    },
  ] satisfies PricingTier[],
  recommendedLabel: "Best value",
  fine: "Prices shown are for the compounded Quattro™ sublingual. A licensed provider decides whether a prescription is appropriate; completing the intake does not guarantee a prescription.",
} as const;

export const safetyStrip = {
  lead: "Important safety information:",
  body: 'Do not use with nitrates or "poppers". Seek emergency care for an erection lasting 4 hours or longer. A licensed provider reviews your medications and health history before prescribing.',
  linkLabel: "Full safety information",
  href: TODO_CONFIRM.SAFETY_HREF,
} as const;

export const steps = {
  heading: "Three steps. No waiting room.",
  items: [
    {
      title: "Take the 2-minute online visit.",
      body: "A few private questions about your health, medications and what you've tried.",
    },
    {
      title: "A US-licensed doctor reviews it.",
      body: `${TODO_CONFIRM.REVIEW_TIME}. If treatment is right for you, your prescription goes to a state-licensed 503A compounding pharmacy.`,
    },
    {
      title: "It arrives in plain packaging.",
      body: `${TODO_CONFIRM.SHIPPING} with usage instructions. Message your care team any time.`,
    },
  ],
} as const;

export type Review = {
  /** One-line headline in the customer's words, e.g. "Worth the investment". */
  title: string;
  quote: string;
  /** First name and last initial only, e.g. "Mark T." Never invented. */
  name: string;
  /** e.g. "Verified InstaRx customer". */
  label: string;
  rating: 1 | 2 | 3 | 4 | 5;
};

export const reviews = {
  heading: "What InstaRx customers say.",
  sub: "Real, verified InstaRx customer reviews. ED-specific reviews are added as they are collected.",
  /** Shown instead of `sub` while no real reviews exist (production). */
  emptySub:
    "ED-specific reviews are added as they are collected. The rating above is InstaRx's sitewide customer rating.",
  listLabel: "Customer reviews",
  starsLabel: (n: number) => `${n} out of 5 stars`,
  /** Real InstaRx reviews only. Empty until ED reviews exist. */
  items: [] as Review[],
  /** SAMPLE CONTENT, NOT INSTARX REVIEWS. Six MEDVi customer reviews copied
   *  verbatim from quad.medvi.org (2026-09-23) so the marquee can be judged at
   *  real text density. Rendered only while `items` is empty, under a visible
   *  banner and a per-card "Sample" tag. Replace with verified InstaRx reviews
   *  before this route takes traffic: another company's reviews shown as ours
   *  is a fabricated endorsement (FTC fake-reviews rule) and breaks brief
   *  Part 4. Quad shows customer photos; these cards use initials until
   *  InstaRx has photos with consent. Never rendered in a production build
   *  (Reviews.tsx checks VERCEL_ENV); local and preview builds show them. */
  sample: {
    sub: "Layout preview with sample cards. Verified InstaRx reviews replace them before this page takes traffic.",
    listLabel: "Sample reviews (MEDVi, not InstaRx)",
    banner:
      "Sample content: these six cards are MEDVi reviews copied from quad.medvi.org to size the layout. They are not InstaRx reviews and are replaced with verified ones before launch.",
    tag: "Sample · MEDVi review",
    items: [
      {
        name: "Ethan H.",
        title: "Libido Boost Takes Things to the Next Level",
        quote:
          "Incredible product — not only does it work, but the libido boost truly takes things to the next level in an amazing way.",
        label: "MEDVi customer (sample)",
        rating: 5,
      },
      {
        name: "Doug R.",
        title: "Feeling Like My Younger Self Again",
        quote:
          "Honestly, I didn't think anything would really help me, but MEDVi proved me wrong. I feel like my younger self again, and my wife's noticed too.",
        label: "MEDVi customer (sample)",
        rating: 5,
      },
      {
        name: "Amir R.",
        title: "Worth the Investment",
        quote:
          "Truly thankful to have discovered a solution that actually works for my needs. It's a little on the expensive side, but absolutely worth the investment.",
        label: "MEDVi customer (sample)",
        rating: 5,
      },
      {
        name: "Frank N.",
        title: "Huge Difference: More Energy, More Drive",
        quote:
          "I was nervous to try something new, but the difference has been huge. More energy, more drive, and just better in every way.",
        label: "MEDVi customer (sample)",
        rating: 5,
      },
      {
        name: "Bryan G.",
        title: "Nothing Compares to MEDVi's Combination",
        quote:
          "I've tried other products, but nothing compares to MEDVi. The combination of medicines works perfectly together, and the difference is incredible.",
        label: "MEDVi customer (sample)",
        rating: 5,
      },
      {
        name: "John D.",
        title: "Game-Changing Libido",
        quote:
          "I was skeptical at first, but MEDVi proved me wrong. The increased libido and improved blood flow have been game-changing for me and my wife.",
        label: "MEDVi customer (sample)",
        rating: 5,
      },
    ] as Review[],
  },
} as const;

export const finalCta = {
  heading: "Ready when you are.",
  body: `Two minutes online. A real doctor. Plain packaging at your door in ${TODO_CONFIRM.SHIPPING_DAYS}.`,
  cta: "See if I qualify",
  sub: `First month ${money(TODO_CONFIRM.PRICE_MONTHLY)}. Cancel anytime.`,
} as const;

export const stickyBar = {
  price: `${money(TODO_CONFIRM.PRICE_MONTHLY)} first month`,
  cta: "See if I qualify",
  safetyLabel: "Safety info",
  safetyHref: TODO_CONFIRM.SAFETY_HREF,
} as const;

export const footerDisclaimers = {
  footnote:
    "*Onset and results vary by individual. Based on ingredient pharmacology and patient reports; no clinical trial has evaluated the combined formulation.",
  paragraphs: [
    "InstaRx is a technology platform that connects you with independent, US-licensed healthcare providers. Prescription products require an online consultation with a licensed provider who determines whether a prescription is appropriate; completing the intake does not guarantee a prescription.",
    "Compounded medications are prepared by state-licensed 503A compounding pharmacies for individual patients and are not FDA-approved; the FDA does not review compounded drugs for safety, effectiveness, or quality. Sildenafil, tadalafil and vardenafil are FDA-approved in their own branded and generic forms; the compounded combination is not an FDA-approved finished drug. Apomorphine is used off-label.",
    "Do not use ED medication with nitrates or if you have been told not to have sexual activity for health reasons. Individual results vary. This page is informational and is not medical advice.",
  ],
  trademarks:
    "Viagra®, Cialis® and Levitra® are registered trademarks of their respective owners, which are not affiliated with InstaRx.",
  links: [
    { label: "Privacy policy", href: "/policies/privacy-policy" },
    { label: "Terms", href: "/policies/terms-and-conditions" },
    { label: "Safety information", href: TODO_CONFIRM.SAFETY_HREF },
  ],
  copyright: "© 2026 InstaRx. All rights reserved.",
} as const;

export const metadata = {
  /* Rendered with title.absolute in page.tsx, so no "| InstaRx" template suffix. */
  title: `4-in-1 ED Sublingual from ${money(TODO_CONFIRM.PRICE_MONTHLY)}/mo | Insta-Ready by InstaRx`,
  description: `Sildenafil, tadalafil, vardenafil and apomorphine in one sublingual dose. Doctor-prescribed online, no membership, plain packaging in ${TODO_CONFIRM.SHIPPING_DAYS}.`,
} as const;
