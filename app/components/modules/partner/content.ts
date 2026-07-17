/*
 * Single source of copy + data for the /partner lander. Centralized so the
 * client can tweak words without touching layout, and so each section component
 * stays focused on presentation. Copy is the client-supplied partner-program
 * text, preserved verbatim wherever it renders.
 */

// Every CTA on the page points at the partner application Google Form.
export const FORM_HREF =
  "https://docs.google.com/forms/d/e/1FAIpQLSezIlvcXfxiQ-QEh4ECSGCU-gS2NiwTTTuWi3H_4GEc-wiUWg/viewform";

export const announcement =
  "Now accepting new affiliates, partners & ambassadors.";

export const navLinks = [
  { label: "Why InstaRx", href: "#why" },
  { label: "Programs", href: "#programs" },
  { label: "What to promote", href: "#promote" },
  { label: "FAQ", href: "#faq" },
];

/* Hero trust-bar (same strip pattern as /glp2-v2): icon + short bold label +
 * one-line description. Facts pulled from the client copy: licensed providers,
 * fully-online experience with free discreet shipping, transparent pricing
 * from $199. `icon` is a lucide-react name resolved in Hero.tsx. */
export const heroChecks = [
  {
    icon: "Stethoscope",
    label: "Doctor-backed care",
    text: "Licensed providers · real telehealth evaluations.",
  },
  {
    icon: "Package",
    label: "100% online",
    text: "Free, discreet shipping to their door.",
  },
  {
    icon: "BadgeDollarSign",
    label: "Transparent pricing",
    text: "No hidden fees · treatments from $199.",
  },
];

/* "Why partner with InstaRx" — intro + the three value props. */
export const whyIntro =
  "We've built more than an affiliate program — we've built a partnership designed to convert. Licensed providers, U.S. pharmacies, transparent pricing with no hidden fees, and treatments starting at just $199. When you send us traffic, you're sending it to an experience that turns curiosity into customers.";

export const valueProps = [
  {
    icon: "TrendingUp",
    title: "Offers that convert.",
    body: "High-demand categories, a frictionless online intake, and pricing that removes the biggest objection.",
  },
  {
    icon: "Wallet",
    title: "Payouts that respect your work.",
    body: "Competitive commissions, real-time tracking, and reliable payments.",
  },
  {
    icon: "Palette",
    title: "Creative that does the heavy lifting.",
    body: "Ready-to-use assets, landing pages, and messaging tested to perform.",
  },
];

/* The three partnership programs, each with its own CTA into the same form. */
export const programs = [
  {
    icon: "Newspaper",
    title: "Affiliates",
    body: "Built for publishers who want to pair trusted editorial with healthcare offers that actually perform. Plug into a category people are searching for every single day — and monetize that intent with content you're proud to publish.",
    cta: "Become an affiliate",
  },
  {
    icon: "BarChart3",
    title: "Partners",
    body: "Drive traffic, earn commission. We offer competitive payouts, real-time reporting, and a library of creative built to convert — so you can scale campaigns with confidence and see exactly what's working.",
    cta: "Partner with us",
  },
  {
    icon: "Megaphone",
    title: "Brand ambassadors",
    body: "We give you a brand worth talking about. Share your real experience with treatments that change how people look, feel, and live — and get rewarded every time your audience takes the next step.",
    cta: "Become an ambassador",
  },
];

/* "What you can promote" — editorial rows + the supporting reassurance line. */
export const categories = [
  {
    title: "Weight Loss",
    body: "Compounded Semaglutide, compounded Tirzepatide, and personalized GLP-1 plans.",
  },
  {
    title: "Anti-Aging",
    body: "Treatments designed to help people feel and look their best.",
  },
  {
    title: "Intimacy & Hormones",
    body: "Discreet, doctor-guided sexual health and hormone care.",
  },
];

export const promoteNote =
  "Every treatment is prescribed by a licensed provider after a real telehealth evaluation, sourced from U.S. pharmacies, and shipped free and discreet. We'll help you match the right offer to the right audience.";

export const faqGroups = [
  {
    group: "Partnering",
    items: [
      {
        q: "Who is InstaRx's ideal partner?",
        a: "We work with a wide range of partners — health and wellness publishers, lifestyle and fitness creators, podcast hosts, and performance marketers. If your audience cares about looking and feeling their best, there's a fit.",
      },
      {
        q: "What treatment areas can I promote?",
        a: "Our categories span weight loss (GLP-1 medications like compounded Semaglutide and Tirzepatide), anti-aging, and intimacy and hormone health — with more on the way. We'll help you match the right offer to your audience.",
      },
    ],
  },
  {
    group: "Earnings & getting started",
    items: [
      {
        q: "How much can I earn?",
        a: "We offer competitive commissions with real-time tracking, so you always know how your traffic is performing. Reach out and we'll walk you through the numbers.",
      },
      {
        q: "How do I get started?",
        a: "Apply below. We aim to review and respond quickly if it's a fit — then get you set up with your links, tracking, and creative assets.",
      },
    ],
  },
];
