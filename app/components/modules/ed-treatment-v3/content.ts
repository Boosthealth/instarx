/**
 * /ed-treatment-v3 — content for the premium single-product ED lander.
 * Section order and beats follow the BetterMe Rx QMAX page (qmax.bettermerx.com
 * /ed/main-oo-2); every claim is rewritten to Insta-Ready's own facts and the
 * guardrails in docs/ed-treatment/landing-page-brief.md Part 4: swish and
 * swallow (never sublingual / "dissolves"), footnoted onset, "state-licensed
 * 503A" (never "FDA-registered"), strengths set by the provider.
 * Every string the page renders lives here.
 */

export const INTAKE_HREF = "https://my.instarx.com/intake/insta-ready";

// ---------------------------------------------------------------------------
// TODO_CONFIRM — placeholders awaiting a real value from Misha / ops.
// Change here only; nothing else hard-codes them.
// ---------------------------------------------------------------------------
export const TODO_CONFIRM = {
  /** Promo strip, mirrored from the reference page. There is no list price on
   *  the ED schedule yet, so this offer must be confirmed (and backed by a
   *  real price) before the page takes paid traffic. */
  PROMO: "Introductory offer: 50% off your first order",
  PROMO_TAIL: "Today only",
  /** Product safety page. */
  SAFETY_HREF: "/safety/sildenafil",
} as const;

/** Sitewide Google rating, InstaRx-wide (not ED-specific). */
const RATING = { score: "4.7", source: "Google Reviews" } as const;

export const promo = {
  offer: TODO_CONFIRM.PROMO,
  tail: TODO_CONFIRM.PROMO_TAIL,
} as const;

export const header = {
  cta: "Take the quiz",
} as const;

export const hero = {
  rating: { score: RATING.score, label: `out of 5 on ${RATING.source}` },
  kicker: "Insta-Ready · 4-in-1 formula",
  /** One line per array entry; the last word of each line is set in the accent italic. */
  headline: [
    ["Better", "performance."],
    ["Better", "confidence."],
    ["Better", "you."],
  ] as const,
  body: "Insta-Ready is a 4-in-1 prescription ED treatment in one small liquid vial, made to support blood flow, arousal and confidence when it matters most.*",
  chips: [
    "No pills. No injections.",
    "Feel it in as little as 15 min*",
    "Up to a 36-hour window*",
    "Discreet delivery",
  ],
  cta: "Take the quiz",
  micro: "Clinician-prescribed · 100% online · Plain packaging",
  image: {
    wide: "/images/ed-treatment-v3/hero-wide.webp",
    tall: "/images/ed-treatment-v3/hero-tall.webp",
    alt: "A couple in their fifties sharing a quiet moment at home in lamplight",
  },
} as const;

export const trust = [
  "Licensed U.S. providers",
  "State-licensed 503A pharmacy",
  "Discreet, unmarked shipping",
  "100% online, no clinic visits",
] as const;

export const ready = {
  heading: "Ready the moment it matters.",
  body: "A pill makes you plan: swallow it, wait 30 to 60 minutes and hope the timing lines up. Insta-Ready is a liquid you swish for 30 to 60 seconds, then swallow. It's made for a faster start than a swallowed tablet, so you're ready closer to when it actually happens, not an hour ahead of it.*",
  points: [
    {
      lead: "Faster by design.",
      text: "Made for a faster start, so many men feel it sooner than a swallowed tablet.*",
    },
    {
      lead: "Built for spontaneity.",
      text: "No countdown and no clock-watching. Ready on your schedule, not the pill's.",
    },
    {
      lead: "Dinner gets less of a say.",
      text: "A heavy meal can blunt a standard pill. Insta-Ready is less likely to be slowed down by one.",
    },
  ],
  cta: "See if you qualify",
  image: {
    src: "/images/ed-treatment-v3/vial-hand.webp",
    alt: "A single Insta-Ready vial, shorter than the top joint of a thumb, held between finger and thumb",
  },
} as const;

export const why = {
  heading: "Why one ingredient was never enough.",
  body: "Traditional ED pills lean on a single compound and a single mechanism. Insta-Ready layers four (speed, strength, stamina and desire) into one dose, with strengths your provider sets to work together.",
} as const;

export type Ingredient = {
  key: string;
  ingredient: string;
  role: string;
  text: string;
  approval: string;
  image: string;
  alt: string;
};

export const formula = {
  heading: "The complete formula.",
  sub: "Four actives. One small vial.",
  items: [
    {
      key: "sildenafil",
      ingredient: "Sildenafil",
      role: "Speed",
      text: "The most-studied ED compound there is, the active in Viagra®. Drives the blood flow behind a firm, reliable response.",
      approval: "FDA-approved on its own",
      image: "/images/ed-treatment-v3/formula-sildenafil.webp",
      alt: "Warm light branching slowly through dark liquid",
    },
    {
      key: "tadalafil",
      ingredient: "Tadalafil",
      role: "Stamina",
      text: "The long-acting compound, the active in Cialis®. Keeps you responsive for up to 36 hours, so there's no timing the moment.*",
      approval: "FDA-approved on its own",
      image: "/images/ed-treatment-v3/formula-tadalafil.webp",
      alt: "A long unbroken trail of bronze light across a dark field",
    },
    {
      key: "vardenafil",
      ingredient: "Vardenafil",
      role: "Strength",
      text: "The active in Levitra®. Often the first ingredient men notice.*",
      approval: "FDA-approved on its own",
      image: "/images/ed-treatment-v3/formula-vardenafil.webp",
      alt: "A fast streak of warm light with motion blur",
    },
    {
      key: "apomorphine",
      ingredient: "Apomorphine",
      role: "Desire",
      text: "Works through the brain's arousal pathway, not just blood flow. A different route from the three above.",
      approval: "Used off-label",
      image: "/images/ed-treatment-v3/formula-apomorphine.webp",
      alt: "Fine glowing filaments forming a web in the dark",
    },
  ] satisfies Ingredient[],
  strength: "Strength set by your provider",
  footer:
    "Compounded prescription product. Sildenafil, tadalafil and vardenafil are each FDA-approved on their own; apomorphine is used off-label. The compounded combination is not an FDA-approved finished drug. Your provider sets the exact strengths.",
} as const;

export const engineered = {
  heading: "Engineered for the moment.",
  items: [
    {
      title: "Minutes, not hours.",
      text: "Swish, then swallow. Many men feel it in as little as 15 minutes, against the 30 to 60 minutes a swallowed pill can take.*",
    },
    {
      title: "Dinner-friendly.",
      text: "A heavy meal can blunt a standard ED pill. Insta-Ready is less likely to be slowed down by food, so you don't have to choose between a real dinner and the rest of the night.*",
    },
    {
      title: "One dose, all weekend.",
      text: "With a long-acting compound in the mix, a single dose can keep you responsive for up to 36 hours. No countdown, no planning around a pill.*",
    },
  ],
} as const;

export const compare = {
  heading: "Why settle for a single ingredient?",
  columns: ["Insta-Ready", "A traditional pill"] as const,
  rows: [
    ["Format", "Liquid vial, swish and swallow", "Swallowed tablet"],
    ["Onset", "As little as 15 minutes*", "30 to 60 minutes"],
    ["Active ingredients", "4 compounds", "1 compound"],
    ["Active window", "Up to 36 hours*", "Varies by pill"],
    ["Slowed by food", "Less likely*", "Can be"],
    ["Arousal pathway", "Also works through the brain", "Blood flow only"],
  ] as const,
  cta: "See if you qualify",
} as const;

export const steps = {
  heading: "Three steps to ready.",
  items: [
    {
      title: "Online visit",
      text: "Answer a few private questions about your health. It takes about three minutes.",
    },
    {
      title: "Provider review",
      text: "A licensed U.S. provider reviews your intake. If Insta-Ready is right for you, they write the prescription.",
    },
    {
      title: "Discreet delivery",
      text: "Your treatment ships in plain, unmarked packaging, straight to your door.",
    },
  ],
  cta: "See if you qualify",
  image: {
    wide: "/images/ed-treatment-v3/steps-wide.webp",
    tall: "/images/ed-treatment-v3/steps-tall.webp",
    alt: "A man in his fifties on the sofa in the evening, looking at his phone under a single lamp",
  },
} as const;

export type Testimonial = {
  quote: string;
  name: string;
  meta: string;
};

/**
 * SAMPLE testimonials written for layout review (Misha, 2026-10-06: "create
 * testimonials and we will replace later"). They are not real customers, so
 * they render only outside production (VERCEL_ENV !== "production"); the
 * production build falls back to the two real InstaRx reviews below until
 * real ED reviews replace these.
 */
export const testimonials = {
  heading: "Men who stopped waiting.",
  rating: `Rated ${RATING.score} out of 5 on ${RATING.source}`,
  sample: {
    note: "Sample testimonials for layout review. Replace with real customer reviews before launch.",
    items: [
      {
        quote:
          "I'd stopped bothering with the pill because dinner always got in the way. This fits into an evening instead of running it.",
        name: "Richard M.",
        meta: "58 · North Carolina",
      },
      {
        quote:
          "The vial is tiny. It lives in my travel kit and nobody's the wiser. One dose carried us through the weekend.",
        name: "Daniel K.",
        meta: "47 · Texas",
      },
      {
        quote:
          "Three minutes of questions, a doctor checked my meds, and it showed up in a plain box. I wish I'd done it years ago.",
        name: "Marcus T.",
        meta: "54 · Florida",
      },
    ] satisfies Testimonial[],
  },
  /** Real InstaRx customer reviews (sitewide, from /glp2-v2), used in production. */
  real: {
    note: "Reviews from InstaRx customers across our treatments.",
    items: [
      {
        quote:
          "The customer service is spot on: individualized personal attention, quick response time and a great product. I am 100% happy and will continue with InstaRx.",
        name: "Alex B.",
        meta: "InstaRx customer",
      },
      {
        quote:
          "I made an error during my initial order and these people were kind enough to help me out. Would recommend them to anyone.",
        name: "James",
        meta: "InstaRx customer",
      },
    ] satisfies Testimonial[],
  },
  disclaimer: "Individual results may vary.",
} as const;

export const faq = {
  heading: "Good to know.",
  items: [
    {
      q: "How is Insta-Ready different from Viagra or Cialis?",
      a: "Viagra and Cialis are single-compound pills that mainly address blood flow and can take 30 to 60 minutes to work. Insta-Ready combines four prescription compounds (for speed, strength, stamina and desire) in one small liquid vial that you swish for 30 to 60 seconds, then swallow.",
    },
    {
      q: "How fast does it actually work?",
      a: "Many men feel it in as little as 15 minutes, though onset varies from person to person.* It is also less likely to be slowed down by a meal.* Sexual stimulation is still needed.",
    },
    {
      q: "Is it safe and doctor-prescribed?",
      a: "Every prescription is reviewed by a licensed U.S. provider and prepared by a state-licensed 503A compounding pharmacy. It is real prescription medicine, not a supplement, and it isn't right for everyone. Don't use it with nitrates or “poppers”; the online visit screens your medications and health history.",
    },
    {
      q: "Do I need a prescription?",
      a: "Yes, and it's handled for you. After a short online intake, a licensed provider reviews your information and, if appropriate, issues a prescription. No in-person visit required.",
    },
    {
      q: "Will anyone know what I ordered?",
      a: "No. Your order ships in plain, unmarked packaging and your information is kept private. The whole process is online and discreet from start to finish.",
    },
  ],
} as const;

export const finalCta = {
  heading: "Your best nights aren't behind you.",
  body: "The private intake takes about three minutes. A licensed provider reviews every case.",
  cta: "See if you qualify",
  micro: "Clinician-prescribed · 100% online · Plain packaging",
  image: {
    src: "/images/ed-treatment-v3/final-tall.webp",
    alt: "A couple laughing together over a candlelit table after dinner",
  },
} as const;

export const safetyStrip =
  "Important safety information: Do not use with nitrates or “poppers”. Seek emergency care for an erection lasting 4 hours or longer. A licensed provider reviews your medications and health history before prescribing.";

export const footerDisclaimers = {
  footnote:
    "*Onset, duration, food effects and results vary by individual. Based on ingredient pharmacology and patient reports; no clinical trial has evaluated the combined formulation.",
  paragraphs: [
    "InstaRx is a technology platform that connects you with independent, US-licensed healthcare providers. Prescription products require an online consultation with a licensed provider who determines whether a prescription is appropriate; completing the intake does not guarantee a prescription.",
    "Compounded medications are prepared by state-licensed 503A compounding pharmacies for individual patients and are not FDA-approved; the FDA does not review compounded drugs for safety, effectiveness, or quality. Sildenafil, tadalafil and vardenafil are FDA-approved in their own branded and generic forms; the compounded combination is not an FDA-approved finished drug. Apomorphine is used off-label.",
    "Do not use ED medication with nitrates or if you have been told not to have sexual activity for health reasons. Individual results vary. This page is informational and is not medical advice.",
  ],
  trademarks:
    "Viagra®, Cialis® and Levitra® are registered trademarks of their respective owners, which are not affiliated with InstaRx.",
  safety: { label: "Safety information", href: TODO_CONFIRM.SAFETY_HREF },
} as const;

export const metadata = {
  title: "Insta-Ready 4-in-1 ED Treatment | InstaRx",
  description:
    "Sildenafil, tadalafil, vardenafil and apomorphine in one small liquid vial. Swish, swallow, ready sooner. Doctor-prescribed online, shipped in plain packaging.",
} as const;
