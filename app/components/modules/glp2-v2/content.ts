/*
 * Single source of copy + data for the /glp2-v2 lander. Centralized so the
 * client can tweak words without touching layout, and so each section component
 * stays focused on presentation. Copy is the premium rewrite (clarity upgrade
 * over the live /glp2); all factual claims, prices, and percentages are
 * preserved verbatim from the existing lander.
 */

export const INTAKE_HREF = "https://go.instarx.com/intake";

// Static announcement bar (Coivas-style): one concise, generic line + arrow.
export const announcement = "Doctor-prescribed GLP-1, delivered in 1–2 days.";

export const navLinks = [
  { label: "How it works", href: "#how-it-works" },
  { label: "Medications", href: "#medications" },
  { label: "Reviews", href: "#reviews" },
  { label: "FAQ", href: "#faq" },
];

/* Hero trust-bar (Coivas-style strip below the hero): each item is an icon +
 * a short bold label + a one-line description. `icon` is a lucide-react name,
 * resolved in Hero.tsx. Every factual claim (choice of peptide, HSA/FSA, flat
 * pricing, shipping speed + cold chain) is preserved from the prior copy. */
/* Balanced for the 3-up strip: each label is 2–3 words and each description is a
 * single short line of comparable length, so the columns read as equal weight.
 * Facts preserved: peptide choice, HSA/FSA + Rx included, flat price, free fast
 * shipping. */
export const heroChecks = [
  {
    icon: "Stethoscope",
    label: "Online, doctor-led",
    text: "Semaglutide or Tirzepatide.",
  },
  {
    icon: "ClipboardCheck",
    label: "Tailored & covered",
    text: "Rx included · HSA/FSA accepted.",
  },
  {
    icon: "BadgeDollarSign",
    label: "One flat price",
    text: "Same price · free 1–2 day shipping.",
  },
];

export const comparison = {
  rows: [
    {
      label: "How it works",
      sema: "A proven single-action peptide for appetite control",
      tirz: "A next-generation dual-action peptide for deeper metabolic support",
    },
    {
      label: "Weight reduction",
      sema: "Supports up to 15% body weight reduction",
      tirz: "Supports up to 20.9% body weight reduction",
    },
    {
      label: "Best for",
      sema: "Ideal for long-term balance and consistency",
      tirz: "Ideal for accelerated transformation and fat reduction",
    },
    {
      label: "In short",
      sema: "A strong starting point for most clients",
      tirz: "The most comprehensive option for advanced goals",
    },
  ],
};

export const steps = [
  {
    n: "01",
    when: "~5 minutes",
    title: "Tell us your goals",
    body: "Complete a 100% online medical intake covering your BMI, metabolic goals, and any clinical contraindications.",
  },
  {
    n: "02",
    when: "Within 24 hours",
    title: "A physician reviews you",
    body: "A U.S.-licensed, obesity-certified practitioner verifies your eligibility, customizes your titration, and issues a safe prescription.",
  },
  {
    n: "03",
    when: "1–2 day shipping",
    title: "Your kit is dispensed",
    body: "503A state-licensed compounding pharmacies formulate your kit and ship it next-day in temperature-controlled packaging.",
  },
  {
    n: "04",
    when: "Ongoing",
    title: "We stay with you",
    body: "Message your medical team any time to manage early side effects and calibrate your dose as your body adapts.",
  },
];

export const kitItems = [
  "Your medication vial (Semaglutide or Tirzepatide)",
  "Sterile, single-use syringes",
  "Alcohol prep pads",
  "A clear, step-by-step injection guide",
];

/* Timeline steps for the "Get your meds in 1–2 days" section. Each `when` is
 * rendered as a small tag, with the step copy to its right. Mirrors the layout
 * on go.instarx.com/glp2. */
export const timeline = [
  { when: "Today", text: "Get $150 off today. Discount applied at checkout." },
  {
    when: "In 1 day",
    text: "Doctor review — a licensed U.S. physician reviews your profile and writes your prescription.",
  },
  {
    when: "Within 1 day",
    text: "Insta-Ship — our licensed U.S. pharmacies prepare your kit and express ship it to your door in 1–2 days.",
  },
  {
    when: "Free & discreet 1–2 day delivery",
    text: "Receive your medication and supply kit.",
  },
  {
    when: "Ongoing care & support",
    text: "Begin treatment with InstaRx nursing staff, and start losing weight.",
  },
];

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
    quote:
      "I've lost 10 lbs in my first month! So excited about life again.",
    name: "Amy J.",
    tag: "Wow",
  },
  {
    quote:
      "I feel healthier, more confident, and whenever I have any questions the Insta team has been very helpful.",
    name: "Darlene N.",
    tag: "Life-changing",
  },
];

export const medicationPoints = [
  "FDA-regulated 503A compounding pharmacies",
  "Personalized treatments",
  "1:1 medical support",
  "American customer support",
];

export const faqGroups = [
  {
    group: "Getting started",
    items: [
      {
        q: "How does InstaRx work?",
        a: "InstaRx is 100% online. Take our short quiz, get reviewed by a licensed U.S. physician, and have your medication delivered to your door in 1–2 days.",
      },
      {
        q: "How do I know which dosage is right for me?",
        a: "Your physician customizes your titration based on your goals and health profile, then adjusts it over time with your care team as your body adapts.",
      },
    ],
  },
  {
    group: "Safety & medication",
    items: [
      {
        q: "Are these medications safe?",
        a: "All medications are prescribed by U.S.-licensed physicians and dispensed by FDA-regulated 503A compounding pharmacies. Your care team monitors and supports you throughout.",
      },
      {
        q: "Are these authentic Semaglutide and Tirzepatide medications?",
        a: "Yes. We provide compounded Semaglutide and Tirzepatide formulated by state-licensed 503A compounding pharmacies.",
      },
      {
        q: "Where do my prescriptions come from?",
        a: "Prescriptions are issued by U.S.-licensed physicians and filled by 503A state-licensed compounding pharmacies.",
      },
      {
        q: "How is the medication kept fresh during shipping?",
        a: "Your kit ships in temperature-controlled, cold-chain packaging with 1–2 day delivery to keep your medication fresh.",
      },
      {
        q: "How much weight will I lose?",
        a: "Individual results vary. Members lose up to 17% of their body weight on average with prescription GLP-1.",
      },
    ],
  },
  {
    group: "Pricing & logistics",
    items: [
      {
        q: "Does the price increase as my dosage goes up?",
        a: "No. You pay the same flat price, every dose — no hidden fees and no surprises as your titration changes.",
      },
      {
        q: "Can I cancel at any time?",
        a: "Yes. There's no monthly membership and no long-term commitment — cancel any time.",
      },
    ],
  },
];
