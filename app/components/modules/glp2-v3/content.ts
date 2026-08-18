/*
 * Single source of copy + data for the /glp2-v3 HypoSpray lander. Copy is
 * taken verbatim from "HypoSpray GLP-1 Landing Page — Build Sheet" (Rev 2,
 * Aug 17 2026, Jeremy Small) — the blocks there are marked final, paste-as-is.
 *
 * Compliance non-negotiables baked into this copy (see the build sheet):
 * tirzepatide only, no "semaglutide" anywhere; no drug brand names; never
 * "FDA-approved" for the product; the 20.9% claim always carries its
 * injectable-form footnote in the same viewport; $299/month flat, no fake
 * strikethrough pricing.
 */

export const INTAKE_HREF = "https://go.instarx.com/intake";

export const announcement = "NEW — Needle-free GLP-1 is here · $299/month flat";

export const navLinks = [
  { label: "How it works", href: "#how-it-works" },
  { label: "The medication", href: "#medication" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

// ---- S1 — Hero ----
export const hero = {
  eyebrow: "Needle-free GLP-1 weight loss",
  title: "All the power of GLP-1 — without a single needle.",
  sub: "Doctor-prescribed GLP-1 Tirzepatide in a needle-free transdermal spray. One flat $299/month price at every dose — delivered to your door.",
  cta: "Check my eligibility",
  ctaSub: "No needles · No insurance needed · Cancel anytime",
  price: "$299/mo — same price at every dose",
  img: "/images/hypospray/hero-lifestyle.webp",
  imgAlt: "Woman applying needle-free GLP-1 Tirzepatide transdermal spray to her arm",
  imgWidth: 900,
  imgHeight: 1117,
};

// ---- S2 — "Spray, don't stick" ----
export const spray = {
  title: "Spray, don’t stick.",
  lead: "Weekly injections work — but nobody loves them. HypoSpray delivers your GLP-1 through the skin in seconds.",
  tiles: [
    {
      icon: "SprayCan",
      title: "Needle-free",
      desc: "No injections, no sharps container, no dread.",
    },
    {
      icon: "Stethoscope",
      title: "Doctor-led",
      desc: "Prescribed and monitored by U.S.-licensed physicians.",
    },
    {
      icon: "BadgeDollarSign",
      title: "One flat price",
      desc: "$299/month at every dose. No memberships.",
    },
  ] as const,
};

// ---- S3 — How it works (Spray / Absorb / Circulate) ----
export const howItWorks = {
  title: "How it works",
  lead: "A fine mist delivers your prescription through the skin and into the bloodstream — no needles, no pills, no patches.",
  media: "/images/hypospray/spray-closeup.webp",
  mediaAlt: "Fine mist from a GLP-1 Tirzepatide spray on skin",
  mediaWidth: 900,
  mediaHeight: 603,
  steps: [
    {
      n: "01",
      title: "Spray",
      body: "Apply to clean skin once a day, five days a week.",
    },
    {
      n: "02",
      title: "Absorb",
      body: "The active ingredient passes through the skin barrier in seconds.",
    },
    {
      n: "03",
      title: "Circulate",
      body: "Your medication enters the bloodstream and gets to work on appetite and cravings.",
    },
  ],
};

// ---- S4 — The medication (navy panel) ----
export const medication = {
  eyebrow: "The medication",
  title: "Dual-action GLP-1, reimagined for your skin.",
  body: "GLP-1 Tirzepatide is a next-generation dual-action peptide (GLP-1 + GIP) that curbs appetite and switches on your body’s fat-burning mode. HypoSpray is the needle-free way to take it.",
  img: "/images/hypospray/bottle-group.webp",
  imgAlt: "GLP-1 Tirzepatide HypoSpray bottles",
  imgWidth: 900,
  imgHeight: 672,
  card: {
    name: "GLP-1 Tirzepatide Transdermal Spray",
    cta: "Start with GLP-1 Tirzepatide",
    specs: [
      { label: "Mechanism", value: "GLP-1 + GIP dual agonist" },
      { label: "Delivery", value: "Needle-free transdermal spray" },
      { label: "Protocol", value: "5 dosing days per week, doctor-adjusted" },
      { label: "Avg. weight loss", value: "up to 20.9%*", emphasize: true },
      { label: "Price", value: "$299/month, every dose", isPrice: true },
    ],
  },
  footnote:
    "*Clinical trial results for tirzepatide (injectable form); individual results vary. Compounded medications are not FDA-approved.",
};

// ---- S5 — Pricing ($299 flat) ----
export const pricing = {
  eyebrow: "One flat price",
  priceValue: "$299",
  pricePeriod: "/month",
  priceLead: "Every dose. No exceptions.",
  body: "Injectable GLP-1 programs often raise the price as your dose goes up. Ours doesn’t — as your doctor adjusts your protocol, your price stays exactly where it started.",
  checks: [
    "Same price at every dose step",
    "Free shipping, delivered to your door",
    "No membership fees, no contracts — cancel anytime",
  ],
  cta: "Lock in my $299/month",
  ctaSub: "HIPAA secure · Licensed U.S. physicians",
};

// ---- S6 — The process (timeline) ----
export const processTitle = "Needle-free treatment in days";
export const processLead = "Concierge weight loss — without the waiting room.";
export const timeline = [
  {
    when: "Today",
    text: "Take the 3-minute online health quiz.",
  },
  {
    when: "In 1 day",
    text: "A licensed U.S. physician reviews your health profile and, if appropriate, writes your prescription.",
  },
  {
    when: "Within 1 day",
    text: "A state-licensed U.S. compounding pharmacy prepares your HypoSpray kit and ships it express.",
  },
  {
    when: "Free 1–2 day delivery",
    text: "Your spray and supply kit arrive at your door.",
  },
  {
    when: "Ongoing care",
    text: "Start treatment with 1:1 support from the InstaRx care team, and adjust your dose over time.",
  },
];

// ---- S7 — Testimonials ----
// Medication-agnostic service reviews (no injection references, no fabricated
// spray quotes) — per the build sheet, real HypoSpray reviews aren't in yet.
export const reviews = [
  {
    quote:
      "I have lost 28 lbs and all my cravings. No side effects and the results are amazing!",
    name: "Sara P.",
    tag: "I feel 10 years younger",
  },
  {
    quote:
      "The customer service is spot on — individualized personal attention, quick response time and a great product. I am 100% happy and will continue with InstaRx.",
    name: "Alex B.",
    tag: "What a great company",
  },
  {
    quote: "I've lost 10 lbs in my first month! So excited about life again.",
    name: "Amy J.",
    tag: "Wow",
  },
  {
    quote:
      "I feel healthier, more confident, and whenever I have any questions the Insta team has been very helpful.",
    name: "Darlene N.",
    tag: "Life-changing",
  },
  {
    quote:
      "The whole thing was easier than I expected — the quiz took a few minutes and my kit arrived two days later.",
    name: "Megan R.",
    tag: "Down 19 lbs in 3 months",
  },
  {
    quote:
      "Having a real provider answer my questions made me feel comfortable starting. I never felt rushed.",
    name: "Priya S.",
    tag: "Felt supported the whole way",
  },
  {
    quote:
      "Flat pricing with no surprise fees is exactly why I stuck with it. Simple and predictable every month.",
    name: "Jordan T.",
    tag: "No hidden costs",
  },
  {
    quote:
      "A few months in and my appetite is steadier, the cravings are gone, and the routine just fits my life.",
    name: "Lauren M.",
    tag: "Cravings finally gone",
  },
];

// ---- S8 — Comparison table ("The InstaRx difference") ----
export const differenceTableHeaders = { us: "InstaRx", them: "Typical injectable" };
export const differenceRows = [
  {
    feature: "Needle-free transdermal spray",
    competitor: "Weekly self-injections",
  },
  {
    feature: "$299/month flat at every dose",
    competitor: "Prices climb as doses increase",
  },
  {
    feature: "A real U.S. provider, 1:1",
    competitor: "Limited hours or chatbots",
  },
  {
    feature: "Certified 503A pharmacies",
    competitor: "Opaque sourcing",
  },
  {
    feature: "No sharps, no cold-chain hassle",
    competitor: "Sharps disposal + refrigeration",
  },
] as const;

// ---- S9 — FAQ ----
export const faqGroups = [
  {
    group: "The spray",
    items: [
      {
        q: "How does a spray replace an injection?",
        a: "HypoSpray uses a transdermal delivery system: a fine mist applied to clean skin carries the medication through the skin barrier and into the bloodstream. You spray, let it absorb, and go about your day.",
      },
      {
        q: "Does it hurt or irritate the skin?",
        a: "No needles are involved. Most people feel nothing more than a cool mist. If you get skin irritation, your care team is one message away.",
      },
      {
        q: "How often do I use it?",
        a: "Your doctor sets your protocol. A typical schedule is one quick application per day, five days a week.",
      },
      {
        q: "Is this really tirzepatide?",
        a: "Yes. Your prescription is compounded GLP-1 Tirzepatide, formulated by state-licensed 503A pharmacies and prescribed by U.S.-licensed physicians.",
      },
    ],
  },
  {
    group: "Pricing",
    items: [
      {
        q: "Does the price increase as my dosage goes up?",
        a: "No. You pay $299/month at every dose — no hidden fees, no surprises as your protocol changes.",
      },
      {
        q: "Can I cancel at any time?",
        a: "Yes. No membership, no long-term commitment.",
      },
    ],
  },
  {
    group: "Safety & results",
    items: [
      {
        q: "Is it safe?",
        a: "All medications are prescribed by U.S.-licensed physicians and dispensed by state-licensed 503A compounding pharmacies. Your care team monitors and supports you throughout treatment.",
      },
      {
        q: "How much weight will I lose?",
        a: "Individual results vary. In clinical trials of tirzepatide (injectable form), participants lost up to 20.9% of their body weight. Only a licensed provider can determine what’s right for you.",
      },
    ],
  },
];

// ---- S10 — Final CTA ----
export const finalCta = {
  eyebrow: "What are you waiting for?",
  title: "The needle was the hard part. We removed it.",
  body: "Doctor-prescribed GLP-1 Tirzepatide in a simple daily spray, for one flat $299/month. Take the quiz and see if you qualify.",
  cta: "Check my eligibility",
  sub: "No needles · No hidden fees · Cancel anytime",
};
