/**
 * /ed-treatment-v2 — content for the video-led single-product ED lander.
 * Every string the page renders lives here. Claims follow the guardrails in
 * docs/ed-treatment/landing-page-brief.md Part 4.
 */

export const INTAKE_HREF = "https://my.instarx.com/intake/insta-ready";

// ---------------------------------------------------------------------------
// Customer pricing (USD), from the 2026-09-24 ED pricing schedule. A pack is
// one month of doses; the 3-month price covers three packs. The schedule also
// lists "Forte Sublingual 15-pack" ($188 / $508); that is a different product
// and stays off this single-product page. Change here only; nothing else
// hard-codes a price.
// ---------------------------------------------------------------------------
export type PricingTermKey = "monthly" | "quarterly";

export type PricingPack = {
  key: "5" | "10" | "20";
  /** Card title, as the schedule names it. */
  name: string;
  /** Doses in one pack (one month). */
  doses: number;
  /** Price for a 1-month supply and for a 3-month supply. */
  price: Record<PricingTermKey, number>;
  recommended: boolean;
};

export const PRICING_PACKS = [
  {
    key: "5",
    name: "5-pack",
    doses: 5,
    price: { monthly: 98, quarterly: 248 },
    recommended: false,
  },
  {
    key: "10",
    name: "10-pack",
    doses: 10,
    price: { monthly: 158, quarterly: 398 },
    recommended: false,
  },
  {
    key: "20",
    name: "20-pack",
    doses: 20,
    price: { monthly: 210, quarterly: 548 },
    recommended: true,
  },
] satisfies PricingPack[];

const TERM_MONTHS: Record<PricingTermKey, number> = {
  monthly: 1,
  quarterly: 3,
};

/** Lowest 1-month price on the schedule: the hero, sticky bar and final CTA anchor. */
const PRICE_FROM = Math.min(...PRICING_PACKS.map((p) => p.price.monthly));

// TODO_CONFIRM — values not yet confirmed by the prescribing/pharmacy
// partners (brief Part 9). Change here only; nothing else hard-codes them.
// ---------------------------------------------------------------------------
export const TODO_CONFIRM = {
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
  /** Public Trustpilot profile URL. Neither instarx.com nor go.instarx.com
   *  links one today (checked 2026-09-23), so TrustBadge shows the sitewide
   *  rating labelled InstaRx and no Trustpilot mark until this is set. */
  TRUSTPILOT_URL: null as string | null,
} as const;

const money = (n: number) => `$${n}`;
const perDose = (price: number, doses: number) =>
  `$${(price / doses).toFixed(2).replace(/\.00$/, "")}`;
/** What a 3-month supply saves against three 1-month orders of the same pack. */
const savings = (pack: PricingPack) =>
  pack.price.monthly * 3 - pack.price.quarterly;
const LOWEST_PER_DOSE = perDose(
  Math.min(...PRICING_PACKS.map((p) => p.price.quarterly / (p.doses * 3))),
  1,
);
const MAX_SAVINGS = Math.max(...PRICING_PACKS.map(savings));

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
    "Insta-Ready Quattro™ combines the active ingredients behind Viagra®, Cialis® and Levitra® with apomorphine, which works through the brain's arousal pathway rather than blood flow alone. It comes as a small vial of liquid: swish it for 30 to 60 seconds, swallow, and many men feel it in as little as 15 minutes* and stay ready for up to 36 hours.",
  /** Phone subhead: the CTA sits near the fold, so two short sentences.
   *  Headline C's device plus the Part 4 onset line, footnote kept. */
  subheadShort:
    "Four ingredients in one small vial. Swish for 30 to 60 seconds, swallow, and many men feel it in as little as 15 minutes* and stay ready for up to 36 hours.",
  subheadTail:
    "Prescribed online by a US-licensed doctor if it's right for you, shipped in plain packaging.",
  cta: "See if I qualify",
  ctaMicro: `Private online visit · Prescription required · ${TODO_CONFIRM.NOT_QUALIFIED}`,
  video: {
    /** 16:9 muted loop, generated from the wide poster (same start and end
     *  frame, so it loops without a cut). Plays at 48rem and up only: phones
     *  keep the tall poster until a 9:16 loop exists. */
    src: "/images/ed-treatment-v2/hero-wide.mp4",
    /** Poster stills, 16:9 for desktop and 9:16 for mobile. The poster is the
     *  LCP frame; the video fades in over it. */
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

/* The hero, sticky bar and final CTA all anchor on the same "from" price so
 * one product never shows three different entry prices. No "was" anchor: the
 * schedule has no list price to strike through. */
export const heroOffer = {
  price: `From ${money(PRICE_FROM)} a month`,
  perDose: `as low as ${LOWEST_PER_DOSE} a dose`,
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
  sub: "Four ingredients in one small vial. Each does one job.",
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

/** Frosted labels laid over a benefit photo. Every string repeats a claim
 *  that already appears elsewhere on the page (hero, comparison table);
 *  nothing here is new. */
export type BenefitOverlay =
  | { kind: "chips"; items: readonly string[] }
  | {
      kind: "compare";
      label: string;
      oldLabel: string;
      oldValue: string;
      newLabel: string;
      newValue: string;
    }
  | { kind: "window"; label: string; value: string };

export type Benefit = {
  title: string;
  body: string;
  /** Two check-list points under the body. */
  points: readonly { title: string; body: string }[];
  overlay: BenefitOverlay;
  media: MediaSlot;
};

export const benefits = {
  heading: "Engineered for your body.",
  items: [
    {
      title: "Swish and swallow.",
      body: "A small vial of liquid, not a pill. Hold it in your mouth for 30 to 60 seconds, swallow, and many men feel it in as little as 15 minutes*.",
      points: [
        {
          title: "Absorbs in the mouth",
          body: "The liquid starts absorbing through the lining of your mouth before it reaches your stomach.",
        },
        {
          title: "Four ingredients, one vial",
          body: "The actives behind Viagra®, Cialis® and Levitra®, plus apomorphine.",
        },
      ],
      overlay: {
        kind: "chips",
        items: ["Swish 30–60 seconds", "As little as 15 minutes*"],
      },
      media: {
        label: "Benefit visual · 1:1 · liquid vial macro",
        asset:
          "Macro: two fingertips lifting a small clear single-dose vial toward parted lips, nose and mouth only, dusk light.",
        aspect: "1 / 1",
        tone: 1,
        src: "/images/ed-treatment-v2/benefit-vial.webp",
      },
    },
    {
      title: "Dinner and performance.",
      body: "A meal is less likely to blunt it than a swallowed tablet. No countdown, no skipping the second course.",
      points: [
        {
          title: "Less affected by food",
          body: "A swallowed pill can be; a dose absorbed in the mouth is less likely to be.",
        },
        {
          title: "Timing from your provider",
          body: "Your provider will tell you how to time it.",
        },
      ],
      overlay: {
        kind: "compare",
        label: "Affected by food",
        oldLabel: "Swallowed pill",
        oldValue: "Can be",
        newLabel: "Quattro™",
        newValue: "Less likely",
      },
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
      points: [
        {
          title: "Up to 36 hours",
          body: "Tadalafil is the long-acting ingredient, the active in Cialis®.",
        },
        {
          title: "Two pathways",
          body: "Blood flow, plus the brain's arousal pathway through apomorphine.",
        },
      ],
      overlay: {
        kind: "window",
        label: "Active window",
        value: "Up to 36 hours",
      },
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
  /** Full-bleed band still, the partner of `steps.media`: the box arrives
   *  at home at night, in the page's house look. */
  media: {
    label:
      "Delivered background · 16:9 · plain box on a hallway console at night",
    asset:
      "Unmarked matte box on a dark hallway console, keys and one small clear vial beside it, warm lamp light from off frame, front door ajar on blue dusk, no people, no pill bottles. Wide: box on the right third, the left two thirds in shadow for the copy. Mobile: 3:4, box in the upper half, lower half empty for the panel.",
    aspect: "16 / 9",
    aspectMobile: "3 / 4",
    tone: 0,
    src: "/images/ed-treatment-v2/delivered-night-wide.webp",
    srcMobile: "/images/ed-treatment-v2/delivered-night-tall.webp",
  } satisfies MediaSlot,
} as const;

export type ComparisonRow = {
  label: string;
  oldWay: string;
  newWay: string;
};

export const comparison = {
  heading: "The old way vs. the new way.",
  oldLabel: "A swallowed pill",
  newLabel: "Insta-Ready Quattro™",
  rows: [
    {
      label: "Format",
      oldWay: "Swallowed tablet",
      newWay: "Liquid vial, swish and swallow",
    },
    {
      label: "Feel it in",
      oldWay: "30–60 minutes",
      newWay: "As little as 15 minutes*",
    },
    {
      label: "Active window",
      oldWay: "Varies by pill",
      newWay: "Up to 36 hours",
    },
    {
      label: "Affected by food",
      oldWay: "Can be",
      newWay: "Less likely",
    },
    {
      label: "Arousal pathway",
      oldWay: "Blood flow only",
      newWay: "Blood flow and the brain's arousal pathway",
    },
    {
      label: "Doctor visit",
      oldWay: "Waiting room or a portal",
      newWay: "2 minutes online",
    },
    {
      label: "Price",
      oldWay: "Copay, or subscription tiers",
      newWay: "Flat, shown up front",
    },
    {
      label: "Packaging",
      oldWay: "Pharmacy bag",
      newWay: "Plain, unmarked",
    },
  ] satisfies ComparisonRow[],
} as const;

export type PricingTerm = {
  key: PricingTermKey;
  label: string;
  /** Small note inside the toggle option; only the 3-month term has one. */
  hint?: string;
};

/** Everything a tier card prints for one pack at one supply length. Kept
 *  here so no copy lives in JSX (brief Part 8). */
export type TierView = {
  name: string;
  supply: string;
  price: string;
  unit: string;
  perDose: string;
  saving?: string;
  note: string;
};

export function tierView(pack: PricingPack, term: PricingTermKey): TierView {
  const months = TERM_MONTHS[term];
  const price = pack.price[term];
  const doses = pack.doses * months;
  const saved = money(savings(pack));
  return {
    name: pack.name,
    supply:
      term === "monthly"
        ? `${doses} doses, 1-month supply`
        : `${doses} doses, 3-month supply`,
    price: money(price),
    unit: term === "monthly" ? "/month" : "/3 months",
    perDose: `${perDose(price, doses)} per dose`,
    saving: term === "quarterly" ? `Save ${saved}` : undefined,
    note:
      term === "monthly"
        ? `Or ${money(pack.price.quarterly)} for a 3-month supply and save ${saved}.`
        : `${saved} less than three 1-month orders.`,
  };
}

const sharedFeatures = [
  "Doctor visit and prescription included",
  TODO_CONFIRM.SHIPPING,
  TODO_CONFIRM.CANCEL,
  TODO_CONFIRM.NOT_QUALIFIED,
];

export const pricing = {
  heading: "The power of 4. In 1 dose.",
  sub: "Three pack sizes, two supply lengths. No membership. Cancel anytime.",
  termsLabel: "Supply length",
  terms: [
    { key: "monthly", label: "1-month supply" },
    {
      key: "quarterly",
      label: "3-month supply",
      hint: `Save up to ${money(MAX_SAVINGS)}`,
    },
  ] satisfies PricingTerm[],
  defaultTerm: "monthly" as PricingTermKey,
  packs: PRICING_PACKS,
  features: sharedFeatures,
  recommendedLabel: "Lowest per dose",
  cta: "See if I qualify",
  fine: "Prices shown are for the compounded Quattro™ liquid. A licensed provider decides whether a prescription is appropriate; completing the intake does not guarantee a prescription.",
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
  /** Full-bleed band still: the visit happens from the sofa, not a clinic. */
  media: {
    label: "Steps background · 16:9 · man on a sofa at night",
    asset:
      "A man on a dark sofa at night, lit by one warm floor lamp, phone in hand, the left two thirds of the frame in shadow for the copy. Mobile: 3:4, subject in the upper half, lower half empty for the panel.",
    aspect: "16 / 9",
    aspectMobile: "3 / 4",
    tone: 0,
    src: "/images/ed-treatment-v2/steps-wide.webp",
    srcMobile: "/images/ed-treatment-v2/steps-tall.webp",
  } satisfies MediaSlot,
} as const;

export type Review = {
  /** One-line headline in the customer's words, e.g. "What a great company". */
  title: string;
  quote: string;
  /** First name and last initial only, e.g. "Alex B." Never invented. */
  name: string;
  /** e.g. "InstaRx customer". */
  label: string;
  /** Star rating as the customer gave it. Left out when the source review
   *  carries none: the tile then shows no stars rather than an invented 5. */
  rating?: 1 | 2 | 3 | 4 | 5;
  /** 3:4 still that sits beside the quote on the wall. Illustrative, made
   *  for the page, not the reviewer; `reviews.photoNote` says so under the
   *  wall. A photo of the actual customer needs their written consent. */
  photo?: string;
};

export const reviews = {
  heading: "What InstaRx customers say.",
  sub: "Real InstaRx customer reviews. ED-specific reviews are added as they are collected.",
  listLabel: "Customer reviews",
  starsLabel: (n: number) => `${n} out of 5 stars`,
  /** Under the wall. The stills are not the reviewers and the page says so
   *  (FTC endorsement guides; brief Part 4). */
  photoNote: "Photos are illustrative and do not show the reviewers.",
  /** Real InstaRx customer reviews only: the two product-agnostic ones
   *  (service, confidence, support) that /glp2-v2 and /glp2-v3 already run,
   *  word for word, with no rating because the source carries none. No
   *  third-party reviews, ever. ED-specific reviews join as collected. */
  items: [
    {
      name: "Alex B.",
      label: "InstaRx customer",
      photo: "/images/ed-treatment-v2/wall-trail.webp",
      title: "What a great company",
      quote:
        "The customer service is spot on — individualized personal attention, quick response time and a great product. I am 100% happy and will continue with InstaRx.",
    },
    {
      name: "Darlene N.",
      label: "InstaRx customer",
      photo: "/images/ed-treatment-v2/wall-boat.webp",
      title: "Life-changing",
      quote:
        "I feel healthier, more confident, and whenever I have any questions the Insta team has been very helpful.",
    },
  ] as readonly Review[],
} as const;

export type PressLogo = {
  /** Outlet name, used as the image alt. */
  name: string;
  /** Vectorised wordmark under /public/lose-weight/press, shared with the
   *  other landers; the CSS filter turns it white for the dark band. */
  src: string;
  /** Intrinsic viewBox size, for next/image's aspect ratio. */
  w: number;
  h: number;
  /** Rendered height in px at desktop: the optical sizes tuned on /nad-plus. */
  px: number;
  /** Keeps a two-colour mark's internal contrast (LA Weekly's boxed "LA"),
   *  which the flat white filter would fill in. */
  twoTone?: boolean;
};

export const press = {
  lead: "Featured in",
  listLabel: "Press coverage",
  /** The outlets the live landers (/lose-weight, /nad-plus) list under
   *  "As featured in", from the same files, so a change there carries over.
   *  Nothing else: another company's coverage shown here would be a false
   *  endorsement. */
  items: [
    {
      name: "OK! magazine",
      src: "/lose-weight/press/ok-magazine.svg",
      w: 1804,
      h: 1130,
      px: 37,
    },
    {
      name: "The Balancing Act",
      src: "/lose-weight/press/balancing-act.svg",
      w: 675.46,
      h: 130.61,
      px: 29,
    },
    {
      name: "Woman's World",
      src: "/lose-weight/press/womans-world.svg",
      w: 1917,
      h: 257,
      px: 24,
    },
    {
      name: "LA Weekly",
      src: "/lose-weight/press/la-weekly.svg",
      w: 300,
      h: 77,
      px: 29,
      twoTone: true,
    },
    {
      name: "Lifetime",
      src: "/lose-weight/press/lifetime.svg",
      w: 237.364,
      h: 71.967,
      px: 29,
    },
    {
      name: "Health Uncensored with Dr. Drew",
      src: "/lose-weight/press/health-uncensored.svg",
      w: 1400,
      h: 711.9,
      px: 44,
    },
  ] as readonly PressLogo[],
} as const;

export const finalCta = {
  heading: "Ready when you are.",
  body: `Two minutes online. A real doctor. Plain packaging at your door in ${TODO_CONFIRM.SHIPPING_DAYS}.`,
  cta: "See if I qualify",
  sub: `From ${money(PRICE_FROM)} a month. Cancel anytime.`,
  /** Decorative strip under the CTA: the page's own stills mixed with three
   *  night frames made for the strip (mirror, taxi, front door), in an order
   *  that alternates warm and cool. No packaging or shipment frames here. */
  strip: [
    formula.items[0].media.src,
    "/images/ed-treatment-v2/strip-mirror.webp",
    benefits.items[0].media.src,
    formula.items[2].media.src,
    "/images/ed-treatment-v2/strip-taxi.webp",
    benefits.items[1].media.src,
    formula.items[1].media.src,
    "/images/ed-treatment-v2/strip-keys.webp",
    formula.items[3].media.src,
    benefits.items[2].media.src,
  ],
} as const;

export const stickyBar = {
  price: `From ${money(PRICE_FROM)}/mo`,
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
  title: `4-in-1 ED Treatment from ${money(PRICE_FROM)}/mo | Insta-Ready by InstaRx`,
  description: `Sildenafil, tadalafil, vardenafil and apomorphine in one small liquid vial. Doctor-prescribed online, no membership, plain packaging in ${TODO_CONFIRM.SHIPPING_DAYS}.`,
} as const;
