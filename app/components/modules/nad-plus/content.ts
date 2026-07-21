/*
 * Single source of copy + data for the /nad-plus lander. Same pattern as the
 * /glp2-v2 module: the client can tweak words here without touching layout, and
 * each section component stays focused on presentation. Copy is adapted from the
 * client's NAD.docx; all factual claims, prices, and dosages are preserved
 * verbatim (Starting at $99, 500–1000mg, $99/mo, 250k+ customers, free 1–2 day
 * shipping, FDA-registered 503A compounding).
 */

// All CTAs point at the dedicated NAD+ intake site.
export const INTAKE_HREF = "https://nad.instarx.com/";

// Static announcement bar (Coivas-style): one concise, generic line + arrow.
export const announcement = "NAD+ in stock — doctor-prescribed, delivered in 1–2 days.";

export const navLinks = [
  { label: "How it works", href: "#how-it-works" },
  { label: "Benefits", href: "#benefits" },
  { label: "Reviews", href: "#reviews" },
  { label: "FAQ", href: "#faq" },
];

/* The icon names the hero trust-bar may use. A closed union (not `string`) so a
 * typo is a compile error instead of a silently-blank icon; Hero.tsx's
 * TRUST_ICONS map is keyed by exactly these names. */
export type HeroIconName = "Stethoscope" | "ClipboardCheck" | "BadgeDollarSign";

/* Hero trust-bar (Coivas-style strip below the hero): each item is an icon +
 * a short bold label + a one-line description. `icon` is a lucide-react name,
 * resolved in Hero.tsx. Facts preserved from the NAD.docx hero: 100% online
 * visit + dosage range, Rx/telemed included + no insurance, flat price + free
 * fast shipping. */
export const heroChecks: Array<{
  icon: HeroIconName;
  label: string;
  text: string;
}> = [
  {
    icon: "Stethoscope",
    label: "Online, doctor-led",
    text: "100% online visit · 500–1000mg.",
  },
  {
    icon: "ClipboardCheck",
    label: "Rx & visit included",
    text: "Telemed included · no insurance.",
  },
  {
    icon: "BadgeDollarSign",
    label: "One flat price",
    text: "Same price · free 1–2 day shipping.",
  },
];

/* Benefits — the four strongest NAD+ benefits, rendered as a vertical row stack
 * beside a left header rail (Reference 3 layout): each row has its own thumbnail
 * (`img` + `alt`) + title + body. */
export const benefits = [
  {
    img: "/images/nad-plus/benefit-1.webp",
    alt: "An active person mid-workout, energized",
    title: "Increase energy & reduce fatigue",
    body: "Recharge at the cellular level for steady, all-day energy — without jitters, crashes, or extra caffeine.",
  },
  {
    img: "/images/nad-plus/benefit-2.webp",
    alt: "A clear-eyed, focused portrait in warm light",
    title: "Improve memory & focus",
    body: "Boost clarity, concentration, and recall so you can think faster, stay on task, and perform at your best.",
  },
  {
    img: "/images/nad-plus/benefit-3.webp",
    alt: "An abstract close-up of a cellular DNA strand",
    title: "Revitalize cellular DNA",
    body: "Protect and repair DNA to strengthen cellular health, enhance resilience, and support long-term longevity.",
  },
  {
    img: "/images/nad-plus/benefit-4.webp",
    alt: "A close-up of healthy, radiant, mature skin",
    title: "Rejuvenate youthful skin",
    body: "Encourage collagen and cellular repair for smoother texture, improved elasticity, and a healthy, youthful glow.",
  },
];

/* "The science" claim list — rendered as an accordion (Reference 2 layout): each
 * row is a short claim with a `+` expander revealing the detail. Reframes the
 * mechanism copy as scannable, expandable points. */
export const scienceClaims = [
  {
    title: "Recharges cellular energy",
    body: "NAD+ fuels the mitochondria — your cells' power plants — restoring steady, all-day energy that declines as NAD+ levels fall with age.",
  },
  {
    title: "Sharpens memory & focus",
    body: "By supporting healthy brain-cell metabolism, NAD+ helps lift the fog so you can think faster, concentrate longer, and recall more.",
  },
  {
    title: "Repairs & protects your DNA",
    body: "NAD+ is essential for the enzymes that repair damaged DNA, strengthening cellular resilience and supporting long-term longevity.",
  },
  {
    title: "Slows the visible signs of aging",
    body: "Supporting collagen and cellular repair helps smooth skin texture, improve elasticity, and keep you looking and feeling younger.",
  },
];

/* "Always quality tested" section — each compounded batch passes the standard
 * USP tests for sterile injectables. Rendered as hairline-separated rows: test
 * name + PASSED badge on the left, description on the right (Reference 4 layout).
 * Test descriptions reflect the real USP standards for 503A compounded
 * injectables (USP <797> sterility, USP <85> bacterial endotoxins). */
export const qualityTests = [
  {
    name: "Potency",
    desc: "Performed every 3 to 6 months. Confirms the medication is within ±10% of the appropriate concentration of the active ingredient.",
  },
  {
    name: "Sterility",
    desc: "Ensures the medication is free from contaminants, including bacteria or other pathogens. Every batch must meet the requirements of USP <797>.",
  },
  {
    name: "pH",
    desc: "Assesses the acid/base balance of the formulation to ensure minimal irritation upon injection.",
  },
  {
    name: "Endotoxicity",
    desc: "Alongside sterility testing, ensures the medication is free of harmful toxins. Every batch is tested for bacterial endotoxins, which may not exceed the threshold limits defined in USP <85>.",
  },
];

/* Floating "NAD+ may help support" benefit pills for the Community band — each a
 * frosted glass check pill (Shed-style) overlaid in the copy column. Carefully
 * hedged ("supports normal …") to stay within wellness-claim guardrails. */
export const supportPills = [
  "Healthy energy production",
  "Normal cognitive function",
  "Mental clarity & focus",
  "Healthy aging & longevity",
  "Consistent all-day energy",
];

/* Timeline steps for the "Get your NAD+ in 1–2 days" section. Each `when` is
 * rendered as a small tag, with the step copy to its right. Mirrors the docx
 * timeline. */
export const timeline = [
  {
    when: "Today",
    text: "Complete the intake form",
  },
  {
    when: "In 1 day",
    text: "A licensed U.S. provider reviews you and writes your prescription.",
  },
  {
    when: "Within 1 day",
    text: "Your order ships from our licensed U.S. pharmacies.",
  },
  {
    when: "Free 1–2 day delivery",
    text: "Your NAD+ medication and supply kit arrive at your door — free and discreet.",
  },
  {
    when: "Ongoing care",
    text: "Begin treatment with InstaRx nursing staff, and start feeling like yourself again.",
    // The journey continues past delivery — rendered with an open node to
    // signal "ongoing" rather than a completed step.
    ongoing: true,
  },
];

/* 3-column comparison: InstaRx NAD+ Injections vs unregulated research peptides
 * vs oral supplements. Verbatim from the docx comparison block. Rendered in
 * Comparison.tsx — the `us` column is emphasized (always a ✓), the other two
 * recessed. Each competitor cell is `{ text, partial? }`: by default it renders
 * a ✗ (a genuine downside), but `partial: true` renders a neutral dash instead
 * — for cells that are technically a "yes" yet still inferior (e.g. oral is OTC,
 * oral is cheaper), so the mark never contradicts the text. Column labels split
 * into `name` + `dose` so the dosage sits on a quieter second line. */

/* A single competitor cell. `partial` is always an optional boolean here (not a
 * non-uniform `as const` literal), so consumers can safely read `cell.partial`.
 * Exported as the source of truth for Comparison.tsx's `AltCell`. */
export type ComparisonCell = { text: string; partial?: boolean };

type ComparisonColumn = { name: string; dose: string };
type ComparisonData = {
  columns: { us: ComparisonColumn; peptide: ComparisonColumn; oral: ComparisonColumn };
  rows: Array<{
    label: string;
    us: string;
    peptide: ComparisonCell;
    oral: ComparisonCell;
  }>;
};

export const comparison = {
  columns: {
    us: { name: "InstaRx NAD+ Injections", dose: "500–1000mg" },
    peptide: { name: 'Research Peptides "NAD+"', dose: "500–1000mg" },
    oral: { name: "Oral NAD+ Supplements", dose: "175–250mg" },
  },
  rows: [
    {
      label: "Legally prescribed for human use",
      us: "Yes — Rx from a licensed provider",
      peptide: { text: "Not approved for human use" },
      oral: { text: "Yes — over the counter", partial: true },
    },
    {
      label: "Purity & transparency",
      us: "Clinical-grade, U.S. pharmacy sourced",
      peptide: { text: "Often unverified; inconsistent dosage" },
      oral: { text: "Variable quality & under-dosed" },
    },
    {
      label: "Absorption rate",
      us: "~100% bioavailability (injection)",
      peptide: { text: "Injection form, but questionable purity" },
      oral: { text: "Low — ~10–15% absorbed" },
    },
    {
      label: "Medical oversight",
      us: "Includes consult & dosage guidance",
      peptide: { text: "None" },
      oral: { text: "None" },
    },
    {
      label: "Results timeline",
      us: "Fast — feel energy & clarity in days",
      peptide: { text: "Unpredictable" },
      oral: { text: "Slow or negligible" },
    },
    {
      label: "Safety & compliance",
      us: "HIPAA-compliant & pharmacy-verified",
      peptide: { text: "Risk of contamination & legal issues" },
      oral: { text: "Often lacks 3rd-party testing" },
    },
    {
      label: "Monthly cost",
      us: "Starting at $99/mo",
      peptide: { text: "Varies — low price = risky" },
      oral: { text: "$40–$100/mo", partial: true },
    },
  ],
} satisfies ComparisonData;

export const reviews = [
  {
    quote:
      "From start to finish, my experience with InstaRx has been outstanding. The entire process was seamless, and I've noticed a real difference in my energy levels, mental clarity, and overall vitality. Clean, effective, and exactly what I was looking for!",
    name: "Darlene P.",
    tag: "The results speak for themselves",
  },
  // NOTE: verify all testimonials below are from real, consenting InstaRx NAD+
  // members before launch — FTC endorsement rules apply to medical products.
  {
    quote:
      "I feel sharper and more focused by mid-afternoon than I used to feel first thing in the morning. The brain fog is just gone.",
    name: "Marcus T.",
    tag: "Clarity I hadn't felt in years",
  },
  {
    quote:
      "The whole process was easy — a short visit online and my kit arrived two days later. My energy has been steady all day, no crashes.",
    name: "Renee G.",
    tag: "Steady energy, no crash",
  },
  {
    quote:
      "Recovery after my workouts is noticeably faster. I'm training harder and bouncing back the next day.",
    name: "Dev S.",
    tag: "Recover faster, train harder",
  },
  {
    quote:
      "Flat pricing with no surprise fees and a real provider to answer my questions made this an easy yes. I feel like myself again.",
    name: "Carol M.",
    tag: "Feel like myself again",
  },
  {
    quote:
      "A few weeks in and my skin looks brighter and my sleep is better. Small changes that add up to feeling younger.",
    name: "Priya N.",
    tag: "Looking and feeling younger",
  },
  {
    quote:
      "Fantastic product — the results speak for themselves. Within a couple of weeks I had more energy, sharper focus, and just felt like a better version of myself. Easily the best thing I've added to my routine.",
    name: "Ryan B.",
    tag: "Fantastic product, real results",
  },
];

export const faqGroups = [
  {
    group: "Getting started",
    items: [
      {
        q: "How does InstaRx work?",
        a: "InstaRx is 100% online. Complete a short medical visit, get reviewed by a licensed U.S. provider, and have your NAD+ medication delivered to your door in 1–2 days.",
      },
      {
        q: "So how does the signup process work?",
        a: "Start the quiz, complete a brief online medical intake, and a licensed U.S. provider reviews your eligibility. Once approved, your prescription is filled and shipped from our U.S. pharmacies.",
      },
      {
        q: "What states/jurisdictions are eligible?",
        a: "NAD+ is available in most U.S. states. Eligibility is confirmed during your online medical intake based on your location and health profile.",
      },
      {
        q: "When will I experience the benefits of NAD+?",
        a: "Many members feel increased energy and mental clarity within days. Benefits like recovery, skin, and longevity support build over weeks of consistent treatment. Individual results vary.",
      },
      {
        q: "How do I contact support?",
        a: "Message your InstaRx care team any time through your account, or email patientcare@instarx.com. Our U.S.-based support and nursing staff are here throughout your treatment.",
      },
    ],
  },
  {
    group: "Safety & medication",
    items: [
      {
        q: "How do I know this is safe?",
        a: "All NAD+ treatments are reviewed and approved by a licensed U.S. healthcare provider and dispensed by FDA-registered 503A compounding pharmacies. Your care team monitors and supports you throughout.",
      },
      {
        q: "Is the medication real NAD+?",
        a: "Yes. We provide real, high-potency, doctor-prescribed NAD+ injections compounded by U.S. state-licensed 503A pharmacies — not research peptides or low-absorption supplements.",
      },
      {
        q: "What is the dosage I'll be taking?",
        a: "NAD+ injections are available from 500mg to 1000mg. Your provider recommends a dosage based on your goals and health profile and adjusts it over time with your care team.",
      },
      {
        q: "Where do my prescriptions come from?",
        a: "Prescriptions are issued by U.S.-licensed providers and filled by FDA-registered 503A state-licensed compounding pharmacies in the United States.",
      },
      {
        q: "How do I take my medication?",
        a: "Your kit includes everything you need plus a clear, step-by-step injection guide. Your care team is available to answer questions any time.",
      },
      {
        q: "How is it shipped?",
        a: "Your kit ships free in discreet, temperature-controlled packaging with 1–2 day delivery to keep your medication fresh.",
      },
    ],
  },
  {
    group: "Pricing & logistics",
    items: [
      {
        q: "How does the pricing work?",
        a: "NAD+ starts at $99, with monthly treatment starting at $99/mo. You pay the same flat price every dose — no hidden fees and no surprises.",
      },
      {
        q: "What if I need to cancel?",
        a: "There's no monthly membership and no long-term commitment — cancel any time.",
      },
    ],
  },
];

/* Footer legal copy — required disclaimers from the docx. Rendered in the
 * V2Footer bottom block so every factual/regulatory statement appears on-page. */
export const footerDisclaimers = [
  "*Based on published clinical research, NAD+ (Nicotinamide Adenine Dinucleotide) therapy has shown potential to support energy metabolism, cognitive performance, and cellular repair. Individual results may vary depending on baseline health, dosage, and adherence to treatment protocols.",
  "Safety Information: NAD+ is a naturally occurring coenzyme essential for mitochondrial function, DNA repair, and healthy aging. NAD+ injections are commonly used in wellness and anti-aging clinics and are generally well tolerated. However, they may not be suitable for individuals with specific health conditions. Always consult with a licensed medical provider before beginning any new supplement or therapy.",
  "Medical Oversight: All NAD+ treatments provided through InstaRx are reviewed and approved by a licensed healthcare professional. Our pharmacy partners are FDA-registered compounding facilities based in the United States.",
  "FDA Disclaimer: These statements have not been evaluated by the Food and Drug Administration. NAD+ therapy is not intended to diagnose, treat, cure, or prevent any disease.",
];
