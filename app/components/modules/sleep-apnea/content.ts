/**
 * /sleep-apnea (INS-725) — GLP-1 weight loss + obstructive sleep apnea lander.
 * Copy is the client-approved text from the shared static page, word for word
 * (compliance: brand names only in the disclosure, trademark line and
 * references; "FDA-approved" only in the negated disclosures and FAQ Q3).
 * Exception: `pricing` below is our placeholder, lifted from /glp2, because
 * the client package left prices unconfirmed; it awaits their sign-off.
 * Every string the page renders lives here. Do not edit copy without Jeremy.
 */

export const INTAKE_HREF = "https://go.instarx.com/intake";

export const metadata = {
  title: "GLP-1 Weight Loss & Sleep Apnea | InstaRx",
  description:
    "Extra weight is a major driver of sleep apnea. See if a provider-guided GLP-1 weight-loss program is right for you. 2-minute online visit.",
  ogImage: "/images/sleep-apnea/og-image-1200x630.jpg",
} as const;

export const navLinks = [
  { label: "How it works", href: "#how-it-works" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
] as const;

export const hero = {
  eyebrow: "Weight loss + better sleep",
  headline:
    "Tired of waking up tired? Extra weight and sleep apnea are linked.",
  sub: "A provider-guided GLP-1 weight-loss program, prescribed online and shipped to your door.",
  cta: "See if you qualify",
  micro: [
    "2-minute online visit",
    "Licensed U.S. providers",
    "No insurance needed",
  ],
  image: {
    src: "/images/sleep-apnea/s1-hero-woman-waking-rested.jpg",
    alt: "Woman stretching in bed after waking up rested in a sunny bedroom",
  },
} as const;

export const trust = [
  "Licensed U.S. providers",
  "Free shipping",
  "HSA/FSA eligible",
  "Cancel anytime",
] as const;

export const problem = {
  title: "Snoring, gasping, and exhausted every morning?",
  body: "Obstructive sleep apnea happens when your airway narrows or closes while you sleep, interrupting your breathing again and again through the night. Excess weight is one of the biggest risk factors — extra tissue around the neck and upper airway makes it easier for the airway to collapse.",
  symptoms: [
    { icon: "snore", text: "Loud snoring or gasping" },
    { icon: "battery", text: "Daytime fatigue and brain fog" },
    { icon: "moon", text: "Struggling to stick with CPAP" },
  ],
  image: {
    src: "/images/sleep-apnea/s2-problem-tired-man-morning.jpg",
    alt: "Tired man rubbing his eyes at a kitchen table in the early morning",
  },
} as const;

/** Stats stay live text so legal can edit them; the disclosure must stay
 *  directly under the stats. */
export const science = {
  title: "What the research shows",
  intro: [
    {
      text: "In December 2024, the FDA approved a brand-name tirzepatide medication for moderate-to-severe obstructive sleep apnea in adults with obesity.",
      ref: 1,
    },
    {
      text: "The approval was based on two 52-week clinical trials of 469 adults.",
      ref: 2,
    },
  ],
  stats: [
    {
      n: "61–72%",
      text: "of trial participants on tirzepatide cut their breathing interruptions at least in half (vs. 19–23% on placebo).",
      ref: 2,
    },
    {
      n: "~25–29 fewer",
      text: "breathing interruptions per hour on average (vs. ~5 fewer on placebo).",
      ref: 2,
    },
    {
      n: "18–20%",
      text: "average body-weight reduction over 52 weeks (vs. ~2% on placebo).",
      ref: 2,
    },
  ],
  disclosure:
    "Results are from clinical trials of brand-name tirzepatide (Zepbound®), funded by Eli Lilly. InstaRx providers may prescribe compounded tirzepatide, which is not FDA-approved and has not been studied for sleep apnea. Individual results vary.",
} as const;

export const expectations = {
  title: "Real change takes time",
  body: "In the trials, improvement tracked closely with weight loss. The difference compared with placebo became clear at around 20 weeks, and participants were followed for a full year.",
  bodyRef: 3,
  bodyTail:
    "A GLP-1 program works best alongside healthy eating and regular activity.",
  timeline: [
    { when: "Week 1", what: "Start your program" },
    { when: "Weeks 4–20", what: "Dose adjusts with your provider" },
    { when: "Week 20+", what: "Measurable change" },
    { when: "52 weeks", what: "Full year of support" },
  ],
  image: {
    src: "/images/sleep-apnea/s4-expectations-couple-sleeping.jpg",
    alt: "Couple sleeping peacefully in a cozy bedroom",
  },
} as const;

export const howItWorks = {
  title: "How InstaRx works",
  steps: [
    {
      title: "Take the quiz",
      text: "Take a 2-minute online health quiz — tell us about your weight, sleep and health history.",
    },
    {
      title: "Provider review",
      text: "A licensed provider reviews your information and decides if a GLP-1 is right for you.",
    },
    {
      title: "Ships to your door",
      text: "If prescribed, your medication ships to your door with ongoing provider support.",
    },
  ],
  care: {
    title: "Care from home, on your schedule",
    text: "No waiting rooms. Your provider stays with you as your dose adjusts over time.",
    cta: "Start my quiz",
  },
  image: {
    src: "/images/sleep-apnea/s5-how-it-works-video-visit.jpg",
    alt: "Woman on a video call with a provider from her living room sofa",
  },
} as const;

/** Pricing reuses the standard GLP-1 block from /glp2 (medications in stock,
 *  vials, intake CTAs) under the sleep apnea page's own heading. No price is
 *  printed here: plans and prices are shown in the intake. */
export const pricing = {
  title: "One simple monthly price.",
  lead: "Provider visit included.",
  medications: "Compounded Semaglutide & Tirzepatide Injections",
  badge: "In Stock · Up to $200 OFF",
  included: [
    "Online provider visit included",
    "Medication shipped free to your door",
    "Ongoing provider support as your dose adjusts",
    "HSA/FSA eligible • Cancel anytime",
  ],
  cta: "See my plan options",
  ctaSecondary: "See pricing",
  reassurance: "No Hidden Fees · No Monthly Membership · Cancel Anytime",
  vials: [
    {
      src: "/images/sem-glp1.png",
      alt: "Compounded Semaglutide injection vial",
    },
    {
      src: "/images/tirz-glp1.png",
      alt: "Compounded Tirzepatide injection vial",
    },
  ],
} as const;

export const fit = {
  title: "Is this right for you?",
  yes: {
    title: "May be a fit if you…",
    items: [
      "Are an adult living with obesity",
      "Have been told you snore heavily or have sleep apnea",
      "Want a medical weight-loss program guided by a licensed provider",
    ],
  },
  no: {
    title: "Talk to your doctor first if you…",
    items: [
      "Have type 1 or type 2 diabetes (the sleep apnea trials did not include people with diabetes)",
      "Have central or mixed sleep apnea",
      "Are pregnant, planning pregnancy, or have a personal/family history of medullary thyroid cancer or MEN2",
    ],
  },
} as const;

/** Required, never collapsible, directly above the FAQ. */
export const callout = {
  title: "Keep using your CPAP.",
  body: "Do not stop or change your sleep apnea treatment on your own. The trials did not show when, or whether, it is safe to stop CPAP — only your sleep doctor can make that call, usually after a new sleep study.",
  bodyRef: 2,
  fine: "The most common side effects in the trials were nausea (about 22–25%) and diarrhea (about 22–26%), usually mild to moderate. About 3–4% of people stopped treatment because of side effects.",
  fineRef: 2,
} as const;

export const faq = {
  title: "Frequently asked questions",
  /** The first six are also emitted as FAQPage JSON-LD. */
  items: [
    {
      q: "Can a GLP-1 help with sleep apnea?",
      a: "Weight is one of the biggest drivers of obstructive sleep apnea, and clinical trials of brand-name tirzepatide showed meaningful improvement in adults with obesity. A licensed InstaRx provider will review your health history to decide if a GLP-1 weight-loss program is right for you.",
    },
    {
      q: "Can I stop using my CPAP?",
      a: "Not without talking to your sleep doctor. Keep using your CPAP as prescribed. Any change to your sleep apnea treatment should be decided by your sleep clinician, usually after a follow-up sleep study.",
    },
    {
      q: "Is this the same medication that was FDA-approved for sleep apnea?",
      a: "No. The FDA approval is for a brand-name tirzepatide product. InstaRx providers may prescribe compounded tirzepatide, which is prepared by a licensed pharmacy for individual patients. Compounded medications are not FDA-approved and have not been studied in sleep apnea trials.",
    },
    {
      q: "How long until I notice a difference?",
      a: "Everyone is different. In the trials, the difference compared with placebo was clear around 20 weeks and continued through one year, closely following weight loss.",
    },
    {
      q: "What are the side effects?",
      a: "The most common are nausea, diarrhea, vomiting and constipation, especially as your dose increases. Your provider will start low and adjust over time.",
    },
    {
      q: "Do I need a sleep apnea diagnosis?",
      a: "No. Our program is for weight management. If you think you have sleep apnea but haven't been diagnosed, we recommend talking to your doctor about a sleep study.",
    },
    {
      q: "Do I need insurance?",
      a: "No, insurance is not required.",
    },
  ],
  jsonLdCount: 6,
} as const;

export const finalCta = {
  title: "Better sleep can start with your weight.",
  cta: "See if you qualify",
  image: {
    src: "/images/sleep-apnea/s10-final-cta-couple-walking.jpg",
    alt: "Couple laughing on a morning walk in their neighborhood",
  },
} as const;

export const disclaimers = {
  text: "InstaRx does not diagnose or treat sleep apnea. Prescriptions are at the sole discretion of a licensed provider after an online consultation. Compounded medications are not FDA-approved and are not evaluated by the FDA for safety, effectiveness or quality. Zepbound® is a registered trademark of Eli Lilly and Company; InstaRx is not affiliated with or endorsed by Eli Lilly. Individual results vary.",
  referencesTitle: "References",
  references: [
    {
      links: [
        {
          label: "FDA press announcement, Dec 2024",
          href: "https://www.fda.gov/news-events/press-announcements/fda-approves-first-medication-obstructive-sleep-apnea",
        },
      ],
    },
    {
      links: [
        {
          label: "Malhotra et al., SURMOUNT-OSA, NEJM 2024",
          href: "https://pmc.ncbi.nlm.nih.gov/articles/PMC11598664/",
        },
        {
          label: "Prescribing information, Table 9",
          href: "https://pi.lilly.com/us/zepbound-uspi.pdf",
        },
      ],
    },
    {
      links: [
        {
          label: "SURMOUNT-OSA secondary analysis, 2025",
          href: "https://pubmed.ncbi.nlm.nih.gov/41135142/",
        },
      ],
    },
  ],
} as const;
