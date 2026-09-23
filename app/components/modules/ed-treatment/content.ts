/*
 * Single source of copy + data for the /ed-treatment lander (qualifier-first,
 * Motivated pattern). Copy follows docs/ed-treatment/landing-page-brief.md v3,
 * Part 5, filtered through the Part 4 claims guardrails (Part 4 wins wherever
 * the two disagree). Components render these values and hold no copy.
 */

/* ------------------------------------------------------------------------ */
/* TODO_CONFIRM                                                              */
/* Every value in this block is a PLACEHOLDER. Prices, dose counts, shipping */
/* promises and guarantees are unconfirmed; each one is listed in the PR.    */
/* Change them here only; everything downstream derives from them.           */
/* ------------------------------------------------------------------------ */

/** Quattro™ first-month price (placeholder, benchmarked vs QUAD $114). */
export const TODO_QUATTRO_FIRST_MONTH = 99;
/** Quattro™ strikethrough "was" anchor (placeholder). */
export const TODO_QUATTRO_WAS = 179;
/** Quattro™ recurring monthly price after month one (placeholder). */
export const TODO_QUATTRO_MONTHLY = 129;
/** Quattro™ 3-month plan, per-month equivalent (placeholder). */
export const TODO_QUATTRO_QUARTERLY_PER_MONTH = 109;
/** Doses per monthly shipment (placeholder; intake catalog hints ~$8.3/use). */
export const TODO_DOSES_PER_MONTH = 12;
/** "From" prices on the ladder cards (placeholders, per month). */
export const TODO_LADDER_FROM = {
  sildenafil: 29,
  tadalafil: 39,
  daily: 49,
  dual: 79,
  quattro: TODO_QUATTRO_FIRST_MONTH,
  plus: 149,
} as const;
/** Delivery window promise (placeholder; keep only if ops can honour it). */
export const TODO_SHIP_DAYS = "1–2 day";
/** Shipping cost line (placeholder). */
export const TODO_SHIPPING = "Free";
/** Provider review turnaround (placeholder). */
export const TODO_REVIEW_TIME = "within 24 hours";
/** Guarantee we can honour (placeholder; needs confirmation). */
export const TODO_NOT_CHARGED = "You're not charged if you don't qualify";
/** Cancellation terms (placeholder). */
export const TODO_CANCEL_TERMS =
  "Renews automatically. Pause or cancel from your account any time before your next billing date.";
/** States served (placeholder). */
export const TODO_STATES = "most US states";
/** LegitScript certification for the ED line (unconfirmed → hidden). */
export const TODO_LEGITSCRIPT_ED_CONFIRMED = false;

/* ------------------------------------------------------------------------ */

const usd = (n: number) => `$${n}`;
const perDose = (monthly: number) =>
  `about $${(monthly / TODO_DOSES_PER_MONTH).toFixed(2).replace(/\.00$/, "")}/dose`;

// Every CTA on the page, including every ladder card and the skip link.
export const INTAKE_HREF = "https://my.instarx.com/intake/insta-ready";

/* Press strip (5.3) — hidden until press placements that covered InstaRx as a
 * brand are confirmed. Flip to true and fill `featuredIn` to show it. */
export const SHOW_FEATURED_IN = false;
export const featuredIn = {
  label: "As featured in",
  logos: [] as Array<{
    name: string;
    src: string;
    width: number;
    height: number;
  }>,
};

export const meta = {
  title: `InstaRx - 4-in-1 ED Treatment - First Month Just ${usd(TODO_QUATTRO_FIRST_MONTH)}`,
  description: `Doctor-prescribed ED treatment online, from generic sildenafil to the 4-in-1 Quattro™ sublingual. One flat price, plain packaging, first month ${usd(TODO_QUATTRO_FIRST_MONTH)}.`,
};

/* 5.0 */
export const announcement = `Insta-Ready in stock. Doctor-prescribed ED treatment, delivered in ${TODO_SHIP_DAYS.replace(" day", "")} days.`;
export const announcementAlt = `First month ${usd(TODO_QUATTRO_FIRST_MONTH)}. Real doctors, plain packaging, no membership.`;

/* 5.1 */
export const brandName = "InstaRx";
export const navLinks = [
  { label: "How it works", href: "#how-it-works" },
  { label: "Formulas", href: "#formulas" },
  { label: "Pricing", href: "#pricing" },
  { label: "Reviews", href: "#reviews" },
  { label: "FAQ", href: "#faq" },
];
export const primaryCta = "Find my treatment";

/* 5.2 Hero. `heroVariant` selects the H1 for split tests: one-line change. */
export const heroHeadlines = {
  A: "Ready in minutes. Ready all weekend.",
  B: "Stop planning around a pill.",
  C: "Four ingredients. One dose. Ready when it counts.",
  // Part 4 deviation: the brief's D ended "treat desire, not just blood flow".
  // Apomorphine evidence supports arousal-pathway wording, not a desire claim.
  D: "Get hard faster, stay ready up to 36 hours, and work on arousal, not just blood flow.",
  E: "Your body doesn't work on a schedule. Your treatment shouldn't either.",
} as const;
export type HeroVariant = keyof typeof heroHeadlines;
export const heroVariant: HeroVariant = "A";

export const hero = {
  eyebrow: ["4-in-1 sublingual", "Doctor-prescribed", "100% online"],
  headline: heroHeadlines[heroVariant],
  subhead:
    "Insta-Ready Quattro™ combines the active ingredients behind Viagra®, Cialis® and Levitra® with apomorphine, which works through the brain's arousal pathway rather than blood flow alone. It dissolves under your tongue, so many men feel it in as little as 15 minutes* and stay ready for up to 36 hours. Prescribed online by a US-licensed doctor if it's right for you, shipped in plain packaging.",
  rating: {
    label: "Excellent 4.7",
    detail: "10,000+ InstaRx customers",
    // Sitewide InstaRx rating, not ED-specific (brief Part 4).
    note: "Sitewide InstaRx rating",
  },
};

/* 5.2 trust bar — rendered as chips in the qualifier result. */
export const trustChips = [
  {
    label: "Online, doctor-led",
    text: "2-minute visit · US-licensed providers",
  },
  {
    label: "Rx and visit included",
    text: "No insurance needed · no hidden fees",
  },
  {
    label: "Discreet delivery",
    text: `Plain packaging · ${TODO_SHIPPING.toLowerCase()} ${TODO_SHIP_DAYS} shipping`,
  },
];

/* ------------------------------------------------------------------------ */
/* 5.2 Qualifier. Preferences, not medical screening: nothing is stored and  */
/* no answer text is sent anywhere.                                          */
/* ------------------------------------------------------------------------ */

export type Goal = "faster" | "longer" | "desire" | "all";
export type Timing = "asap" | "plan";
export type Online = "online" | "any";

export const qualifier = {
  label: "Find your formula",
  stepLabel: (n: number, total: number) => `Question ${n} of ${total}`,
  back: "Back",
  skip: "Skip and start my online visit",
  browse: "See all formulas",
  restart: "Start over",
  steps: [
    {
      key: "goal",
      question: "What do you want to improve?",
      answers: [
        { value: "faster", label: "Getting hard faster" },
        { value: "longer", label: "Staying ready longer" },
        { value: "desire", label: "Desire and arousal" },
        { value: "all", label: "All of the above" },
      ],
    },
    {
      key: "timing",
      question: "When do you want to be ready?",
      answers: [
        { value: "asap", label: "As soon as possible" },
        { value: "plan", label: "I don't mind planning ahead" },
      ],
    },
    {
      key: "online",
      question: "Do you want to do this 100% online?",
      answers: [
        { value: "online", label: "Yes" },
        { value: "any", label: "Doesn't matter" },
      ],
    },
  ],
  result: {
    title: "Good news. You have options.",
    titleBrowse: "Every Insta-Ready formula.",
    lede: "Not everyone needs a 4-in-1. Your doctor helps you pick.",
    provider: "A licensed provider decides what's right for you.",
    recommended: "Recommended for you",
    addonHint: "Ask your provider about this add-on",
    cardCta: "Find my formula",
    fromLabel: "from",
    perMonth: "/mo",
    bestFor: "Best for",
    onset: "Onset",
    window: "Window",
    disclosure:
      "Compounded formulas (Dual Action, Quattro™, Plus) are prepared for you by a state-licensed 503A compounding pharmacy and are not FDA-approved finished drugs. Sildenafil, tadalafil and vardenafil are FDA-approved on their own; apomorphine and bremelanotide are used off-label. Prices shown are starting prices; your provider sets the formula and strength.",
  },
};

export type LadderId =
  | "sildenafil"
  | "tadalafil"
  | "daily"
  | "dual"
  | "quattro"
  | "plus";

/* 5.7 ladder, rendered as the qualifier's result cards. */
export const ladder: Array<{
  id: LadderId;
  name: string;
  ingredients: string;
  tag: string;
  bestFor: string;
  onset: string;
  window: string;
  from: string;
  note?: string;
}> = [
  {
    id: "sildenafil",
    name: "Generic Viagra®",
    ingredients: "Sildenafil",
    tag: "FDA-approved generic",
    bestFor: "First-timers, lowest cost",
    onset: "30–60 min",
    window: "4–6 h",
    from: usd(TODO_LADDER_FROM.sildenafil),
  },
  {
    id: "tadalafil",
    name: "Generic Cialis®",
    ingredients: "Tadalafil",
    tag: "FDA-approved generic",
    bestFor: "Spontaneity, weekend cover",
    onset: "30–60 min",
    window: "up to 36 h",
    from: usd(TODO_LADDER_FROM.tadalafil),
  },
  {
    id: "daily",
    name: "Daily Use",
    ingredients: "Low-dose daily tadalafil",
    tag: "FDA-approved generic",
    bestFor: "Always ready, no planning",
    onset: "Continuous",
    window: "Continuous",
    from: usd(TODO_LADDER_FROM.daily),
  },
  {
    id: "dual",
    name: "Dual Action",
    ingredients: "Tadalafil + sildenafil",
    tag: "Compounded",
    bestFor: "Fast and long",
    onset: "as little as 15 min*",
    window: "up to 36 h",
    from: usd(TODO_LADDER_FROM.dual),
  },
  {
    id: "quattro",
    name: "Quattro™ Sublingual",
    ingredients: "Sildenafil + tadalafil + vardenafil + apomorphine",
    tag: "Compounded",
    bestFor: "Speed, duration, and arousal",
    onset: "as little as 15 min*",
    window: "up to 36 h",
    from: usd(TODO_LADDER_FROM.quattro),
  },
  {
    id: "plus",
    name: "Plus add-on",
    ingredients: "Adds bremelanotide (PT-141)",
    tag: "Compounded · off-label",
    bestFor: "Low desire, performance anxiety",
    onset: "Discussed with your provider",
    window: "Discussed with your provider",
    from: usd(TODO_LADDER_FROM.plus),
    note: "Off-label in men; may support desire. Your provider decides whether it fits.",
  },
];

/* Answer → recommended card (brief 5.2 structure note). Question 3 only
 * affirms the online route; it doesn't change the recommendation. "Ignite" from
 * the brief's map is dropped until confirmed live (Misha, 2026-09-22). */
export function recommend(goal: Goal, timing: Timing): LadderId {
  if (goal === "longer") return timing === "plan" ? "daily" : "tadalafil";
  return "quattro"; // faster, desire, all
}

/* ------------------------------------------------------------------------ */
/* Sections                                                                 */
/* ------------------------------------------------------------------------ */

/* 5.4 */
export const problem = {
  label: "The old way",
  headline: "A pill makes you plan.",
  body: "Swallow it, wait 30 to 60 minutes, hope dinner doesn't get in the way, and hope the timing lines up. Single-ingredient pills only work on blood flow. Insta-Ready Quattro™ was built for the moment, not the countdown.",
  stats: [
    "Dissolves under the tongue",
    "Up to 36-hour window",
    "Blood flow and arousal pathways",
  ],
};

/* 5.5 */
export const formula = {
  headline: "What's in Quattro™",
  lede: "Four ingredients, each well studied on its own, in one dose that dissolves under your tongue.",
  roleLabel: "Role",
  approvalLabel: "Approval",
  strengthLabel: "Strength",
  ingredients: [
    {
      name: "Sildenafil",
      role: "Blood flow",
      body: "The most-studied ED ingredient, the active in Viagra®. Supports the blood flow behind a firm, reliable response when you're aroused.",
      approval: "FDA-approved on its own",
      strength: "Set by your provider",
    },
    {
      name: "Tadalafil",
      role: "Duration",
      body: "The long-acting one, the active in Cialis®. Keeps you responsive for up to 36 hours.",
      approval: "FDA-approved on its own",
      strength: "Set by your provider",
    },
    {
      name: "Vardenafil",
      role: "Blood flow",
      // Part 4 deviation: the brief's "Often the first ingredient men notice"
      // is an unsupported comparative onset claim; replaced with a label fact.
      body: "The active in Levitra®. Works on the same blood-flow pathway as sildenafil, adding a third well-studied option to the dose.",
      approval: "FDA-approved on its own",
      strength: "Set by your provider",
    },
    {
      name: "Apomorphine",
      role: "Arousal pathway",
      body: "Works through the brain's arousal pathway, a different route from the three above. Studied for erectile response.",
      approval: "Used off-label; not FDA-approved for ED in the US",
      strength: "Set by your provider",
    },
  ],
  footer:
    "Each ingredient is FDA-approved on its own, except apomorphine, which is used off-label. Quattro™ is a compounded combination prepared for you by a state-licensed 503A pharmacy; the combined formula is not an FDA-approved finished drug. Your provider sets the exact strengths.",
};

/* 5.6 */
export const whySublingual = {
  headline: "Why sublingual",
  blocks: [
    {
      title: "Faster by design.",
      body: "Absorbs through the tissue under your tongue instead of waiting on digestion, so many men feel it in as little as 15 minutes.*",
    },
    {
      title: "Less dependent on dinner.",
      body: "A meal is less likely to blunt it than a swallowed tablet. Your provider will tell you how to time it.",
    },
    {
      title: "Built for spontaneity.",
      body: "Tadalafil keeps the window open up to 36 hours. One dose can carry a weekend.",
    },
  ],
};

/* 5.8 */
export const comparison = {
  headline: "Insta-Ready vs. the old way",
  featureLabel: "Feature",
  columns: ["Insta-Ready Quattro™", "Traditional pill", "In-person clinic"],
  rows: [
    { label: "Format", values: ["Sublingual", "Swallowed tablet", "Tablet"] },
    {
      label: "Feel it in",
      values: ["as little as 15 min*", "30–60 min", "30–60 min"],
    },
    { label: "Active window", values: ["up to 36 h", "varies", "varies"] },
    { label: "Affected by food", values: ["less likely", "can be", "can be"] },
    { label: "Arousal pathway", values: ["yes (apomorphine)", "no", "no"] },
    {
      label: "Doctor visit",
      values: ["2 min online", "online", "waiting room"],
    },
    {
      label: "Price",
      values: [
        "flat, shown up front",
        "subscription tiers",
        "copay + pharmacy",
      ],
    },
    {
      label: "Packaging",
      values: ["plain, unmarked", "varies", "pharmacy bag"],
    },
  ],
};

/* 5.9 */
export const transparency = {
  headline: "Straight answers about compounded treatment.",
  body: `Insta-Ready formulas are compounded prescription medications, prepared for you by a state-licensed 503A pharmacy. Compounded medications are not FDA-approved finished products, and the FDA does not review them the way it reviews approved drugs. The ingredients themselves are FDA-approved on their own (sildenafil, tadalafil, vardenafil) or used off-label (apomorphine, bremelanotide). A US-licensed provider reviews your health history, medications and contraindications before deciding whether treatment is appropriate. Completing the intake doesn't guarantee a prescription, and ${TODO_NOT_CHARGED.charAt(0).toLowerCase()}${TODO_NOT_CHARGED.slice(1)}.`,
  bullets: [
    "US-licensed providers",
    "State-licensed 503A pharmacies",
    TODO_LEGITSCRIPT_ED_CONFIRMED
      ? "HIPAA-compliant · LegitScript certified"
      : "HIPAA-compliant",
  ],
};

/* 5.10 */
export const pricing = {
  headline: "One flat price. No membership. Cancel anytime.",
  lede: "Quattro™ Sublingual. Doctor visit and prescription included in every plan.",
  cta: primaryCta,
  plans: [
    {
      name: "Monthly",
      price: usd(TODO_QUATTRO_FIRST_MONTH),
      was: usd(TODO_QUATTRO_WAS),
      priceNote: "first month",
      chip: `${usd(TODO_QUATTRO_WAS - TODO_QUATTRO_FIRST_MONTH)} off`,
      rows: [
        `${TODO_DOSES_PER_MONTH} doses per month · ${perDose(TODO_QUATTRO_MONTHLY)}`,
        `Then ${usd(TODO_QUATTRO_MONTHLY)}/month, billed monthly`,
        "Doctor visit and Rx included",
        `${TODO_SHIPPING} ${TODO_SHIP_DAYS} shipping, plain packaging`,
        TODO_CANCEL_TERMS,
        TODO_NOT_CHARGED,
      ],
      featured: false,
    },
    {
      name: "3-month plan",
      price: usd(TODO_QUATTRO_QUARTERLY_PER_MONTH),
      was: undefined,
      priceNote: "per month",
      chip: "Lowest per dose",
      rows: [
        `${TODO_DOSES_PER_MONTH * 3} doses per shipment · ${perDose(TODO_QUATTRO_QUARTERLY_PER_MONTH)}`,
        `${usd(TODO_QUATTRO_QUARTERLY_PER_MONTH * 3)} billed every 3 months`,
        "Doctor visit and Rx included",
        `${TODO_SHIPPING} ${TODO_SHIP_DAYS} shipping, plain packaging`,
        TODO_CANCEL_TERMS,
        TODO_NOT_CHARGED,
      ],
      featured: true,
    },
  ],
};

/* Safety strip — under every offer card group and the floating CTA (Part 4). */
export const safetyStrip = {
  label: "Important safety information:",
  body: 'Do not use with nitrates or "poppers". Seek emergency care for an erection lasting 4 hours or longer. A licensed provider reviews your medications and health history before prescribing.',
  link: "Full safety information",
  href: "#safety",
  short: "Not for use with nitrates. Safety information",
};

/* 5.12 — video testimonials. Empty-safe: an empty array renders `pendingState`.
 * Slots without `src` render as labelled placeholders (no names, no quotes). */
export type VideoReview = {
  id: string;
  src?: string;
  poster?: string;
  alt: string;
  placeholder: string;
};
export const videoReviews = {
  headline: "Real InstaRx customers.",
  lede: "Reviews from InstaRx customers. ED-specific reviews will be added as they come in.",
  pendingState: "Customer video reviews are on their way.",
  unmute: "Tap for sound",
  mute: "Mute",
  prev: "Previous review",
  next: "Next review",
  items: [
    {
      id: "slot-1",
      alt: "TODO: customer testimonial video",
      placeholder:
        "Testimonial video: man, 30s, to camera, 9:16, muted loop with poster",
    },
    {
      id: "slot-2",
      alt: "TODO: customer testimonial video",
      placeholder:
        "Testimonial video: man, 50s, kitchen, 9:16, muted loop with poster",
    },
    {
      id: "slot-3",
      alt: "TODO: customer testimonial video",
      placeholder:
        "Testimonial video: man, 40s, outdoors, 9:16, muted loop with poster",
    },
  ] as VideoReview[],
};

/* 5.11 */
export const howItWorks = {
  headline: "How it works",
  steps: [
    {
      title: "Take the 2-minute online visit.",
      body: "A few private questions about your health, medications and what you've tried.",
    },
    {
      title: "A US-licensed doctor reviews it.",
      body: `Usually ${TODO_REVIEW_TIME}. If treatment is right for you, your prescription goes to a state-licensed pharmacy.`,
    },
    {
      title: "It arrives in plain packaging.",
      body: `${TODO_SHIPPING} ${TODO_SHIP_DAYS} shipping with usage instructions. Message your care team any time.`,
    },
  ],
};

/* 5.13 */
export const faqGroups = [
  {
    group: "About the treatment",
    items: [
      {
        q: "What is Insta-Ready?",
        a: "InstaRx's line of doctor-prescribed ED treatments, from generic sildenafil and tadalafil to the 4-in-1 Quattro™ sublingual.",
      },
      {
        q: "How is it different from Viagra or Cialis?",
        // Part 4 deviation: "absorbs directly" replaced with the tissue wording
        // (no implied full bypass of digestion).
        a: "Generic Viagra and Cialis are single-ingredient tablets, and we offer both. Quattro™ combines those actives with vardenafil and apomorphine in a sublingual that absorbs through the tissue under your tongue, so it can work sooner and also acts on the brain's arousal pathway. Your doctor recommends what fits you.",
      },
      {
        q: "Is it FDA-approved?",
        a: "The individual ingredients sildenafil, tadalafil and vardenafil are. The compounded combination is prepared for you by a state-licensed 503A pharmacy and is not an FDA-approved finished drug. Apomorphine is used off-label.",
      },
      {
        q: "How fast does it work?",
        a: "Many men feel Quattro™ in as little as 15 minutes.* Tablets usually take 30 to 60 minutes. Onset varies.",
      },
      {
        q: "How long does it last?",
        a: "Tadalafil keeps the window open for up to 36 hours. That means you can respond when the moment comes, not a 36-hour erection.",
      },
      {
        q: "Does it give me an automatic erection?",
        a: "No. These medications work with sexual stimulation; they don't replace it.",
      },
      {
        q: "What if I've had low desire, not just trouble getting hard?",
        a: "Apomorphine acts on arousal pathways in the brain. If desire is the main issue, your doctor may discuss a bremelanotide (PT-141) add-on. Both are off-label.",
      },
    ],
  },
  {
    group: "Safety",
    items: [
      {
        q: "Can I take it with blood pressure medication?",
        a: 'Often yes, but never with nitrates (nitroglycerin, isosorbide) or "poppers", and some alpha-blockers need care. The online visit asks about every medication.',
      },
      {
        q: "Can I combine it with other ED medication?",
        a: "No. Tell your provider what you already take.",
      },
      {
        q: "How often can I take it?",
        a: "Your prescription states the maximum; typically no more than once in 24 hours.",
      },
      {
        q: "What are the side effects?",
        a: "Most common: headache, flushing, stuffy nose, upset stomach, back ache. Usually mild and short-lived. Full details on our safety pages.",
      },
      {
        q: "What if an erection lasts 4 hours or more?",
        a: "Seek emergency care immediately.",
      },
      {
        q: "Who shouldn't take it?",
        a: "Men on nitrates, with recent heart attack or stroke, severe liver or kidney disease, or who've been told to avoid sexual activity. The doctor decides.",
      },
    ],
  },
  {
    group: "Process and privacy",
    items: [
      {
        q: "Do I need a prescription?",
        a: "Yes. It's included: a US-licensed doctor reviews your visit and prescribes if appropriate.",
      },
      {
        q: "Who sees my medical information?",
        a: "Only your licensed provider and pharmacy, protected under HIPAA.",
      },
      {
        q: "Will anyone know what I ordered?",
        a: "Plain, unmarked packaging. Your statement shows InstaRx.",
      },
      {
        q: "Is this a subscription? How do I cancel?",
        a: "Plans renew so you don't run out; pause or cancel anytime from your account before the next billing date. No membership fee.",
      },
      {
        q: "What if it doesn't work for me?",
        a: "Message your care team. Doctors can adjust strength or switch you to a different formula.",
      },
      {
        q: "Do you ship to my state?",
        a: `We ship to ${TODO_STATES}. The online visit confirms availability for your state before you pay.`,
      },
    ],
  },
];
export const faq = { headline: "Questions, answered." };

/* 5.14 */
export const finalCta = {
  headline: "Ready when you are.",
  body: `Two minutes online. A real doctor. Plain packaging at your door in ${TODO_SHIP_DAYS.replace(" day", "")} days.`,
  cta: primaryCta,
  sub: `First month ${usd(TODO_QUATTRO_FIRST_MONTH)}. Cancel anytime.`,
};

/* 5.15 */
export const floatingCta = {
  price: `${usd(TODO_QUATTRO_FIRST_MONTH)} first month`,
  cta: primaryCta,
};

/* 5.16 */
export const footer = {
  tagline: "Doctor-prescribed treatment, delivered to your door.",
  safetyHeading: "Safety information",
  safetyLinks: [
    { label: "Sildenafil", href: "/safety/sildenafil" },
    { label: "Tadalafil", href: "/safety/tadalafil" },
    { label: "Vardenafil", href: "/safety/vardenafil" },
    { label: "Apomorphine", href: "/safety/apomorphine" },
    { label: "Bremelanotide (PT-141)", href: "/safety/bremelanotide" },
  ],
  columns: [
    {
      heading: "Company",
      links: [
        { label: "Safety", href: "/policies/safety" },
        { label: "Contact Us", href: "/contact-us" },
        { label: "Refund Policy", href: "/policies/refund-policy" },
      ],
    },
    {
      heading: "Legal",
      links: [
        { label: "Privacy Policy", href: "/policies/privacy-policy" },
        { label: "Terms of Use", href: "/policies/terms-and-conditions" },
        { label: "Telehealth Consent", href: "/policies/telehealth-consent" },
      ],
    },
  ],
  contact: {
    email: "patientcare@instarx.com",
    phone: "(866) 673-8730",
    tel: "+18666738730",
  },
  badges: {
    hipaa: "HIPAA compliant",
    legitscript: "LegitScript certified",
    showLegitScript: TODO_LEGITSCRIPT_ED_CONFIRMED,
  },
  safetyLabel: safetyStrip.label,
  safetyStripLong: safetyStrip.body,
  disclaimer:
    "InstaRx is a technology platform that connects you with independent, US-licensed healthcare providers. Prescription products require an online consultation with a licensed provider who determines whether a prescription is appropriate; completing the intake does not guarantee a prescription. Compounded medications are prepared by state-licensed 503A compounding pharmacies for individual patients and are not FDA-approved; the FDA does not review compounded drugs for safety, effectiveness, or quality. Sildenafil, tadalafil and vardenafil are FDA-approved in their own branded and generic forms; the compounded combination is not an FDA-approved finished drug. Apomorphine and bremelanotide are used off-label. Do not use ED medication with nitrates or if you have been told not to have sexual activity for health reasons. Individual results vary. This page is informational and is not medical advice.",
  footnote:
    "*Onset and results vary by individual. Based on ingredient pharmacology and patient reports; no clinical trial has evaluated the combined formulation.",
  trademarks:
    "Viagra®, Cialis® and Levitra® are registered trademarks of their respective owners. InstaRx is not affiliated with them.",
  copyright: "© 2026 InstaRx (instarx.com). All rights reserved.",
};
