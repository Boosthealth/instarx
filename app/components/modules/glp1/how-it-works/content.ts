/**
 * All copy for the `/glp1/how-it-works` page lives here. To clone this page for
 * another product (`/glp2`, `/glp2-v2`), copy the `how-it-works` folder and edit
 * this file — the components read everything from these exports.
 */

export const INTAKE_HREF = "https://go.instarx.com/intake";

export const hero = {
  eyebrow: "How it works",
  // Non-breaking hyphen (U+2011) keeps "GLP-1" intact, and a non-breaking space
  // (U+00A0) binds "GLP-1 journey" so the pair wraps together with a visible
  // gap — avoids the "GLP-1journey" collapse seen at narrow widths.
  title: "Your GLP‑1 journey, step by step",
  subtitle:
    "From your first assessment to medication at your door, here's exactly how InstaRx works — plus answers to the questions patients ask most.",
  ctaLabel: "Start your assessment",
  secondaryLabel: "Jump to answers",
};

export const cta = {
  heading: "Ready when you are",
  subcopy:
    "A licensed U.S. provider reviews every assessment. No commitment to start.",
  ctaLabel: "Start your assessment",
};

export type Step = {
  number: string;
  label: string;
  heading: string;
  paragraph: string;
  bullets: string[];
  image: string;
  imageAlt: string;
};

export const steps: Step[] = [
  {
    number: "01",
    label: "Learn",
    heading: "Take the quiz",
    paragraph:
      "Answer a few questions about your health, goals, and history — it takes just a few minutes.",
    bullets: [
      "Quick, confidential assessment",
      "Questions about your health and goals",
      "No commitment to start",
    ],
    image: "/glp1/how-it-works/hiw-learn.webp",
    imageAlt: "Man at home taking the InstaRx GLP-1 assessment on his phone",
  },
  {
    number: "02",
    label: "Assess",
    heading: "Get reviewed by a licensed provider",
    paragraph:
      "A licensed U.S. provider reviews your intake and, if appropriate, prescribes a compounded GLP-1 plan tailored to you.",
    bullets: [
      "Independent medical review",
      "Personalized treatment plan",
      "Clear guidance on what's next",
    ],
    image: "/glp1/how-it-works/hiw-assess.webp",
    imageAlt: "Licensed provider in a white coat reviewing a patient's GLP-1 intake",
  },
  {
    number: "03",
    label: "Begin",
    heading: "Start treatment, delivered to your door",
    paragraph:
      "If prescribed, your medication ships from a regulated compounding pharmacy — discreetly, in 1–2 days.",
    bullets: [
      "Fast, discreet delivery",
      "Step-by-step dosing guidance",
      "Support when you need it",
    ],
    image: "/glp1/how-it-works/hiw-begin.webp",
    imageAlt: "Hand receiving a discreet GLP-1 medication package at home",
  },
  {
    number: "04",
    label: "Maintain",
    heading: "Stay supported the whole way",
    paragraph:
      "Check in with your care team, adjust as needed, and build the habits that make your results stick.",
    bullets: [
      "Ongoing provider access",
      "Dose adjustments when appropriate",
      "Progress you can track",
    ],
    image: "/glp1/how-it-works/hiw-maintain.webp",
    imageAlt: "InstaRx provider waving during a telehealth check-in",
  },
  {
    number: "05",
    label: "Success",
    heading: "Reach your goals",
    paragraph:
      "Make steady, sustainable progress toward the weight and wellbeing goals you set.",
    bullets: [
      "Real, self-reported results",
      "More energy and confidence",
      "A plan built to last",
    ],
    image: "/glp1/how-it-works/hiw-success.webp",
    imageAlt: "Fit, confident InstaRx patient outdoors after reaching their goals",
  },
];

export type Stat = {
  value: string;
  label: string;
  note?: boolean;
};

export const stats: Stat[] = [
  { value: "9 lbs", label: "Average weight loss in the first month", note: true },
  {
    value: "up to 17%",
    label: "Average body-weight reduction with prescription GLP-1",
    note: true,
  },
  { value: "1–2 days", label: "Typical delivery once you're prescribed" },
];

export const statsFootnote =
  "*Individual results vary. Claims reflect self-reported data from InstaRx customers.";

export type Feature = {
  image: string;
  imageAlt: string;
  title: string;
  description: string;
};

export const featuresIntro = {
  heading: "Why patients choose InstaRx",
  body: "Regulated pharmacies, licensed providers, and support that stays with you.",
};

export const features: Feature[] = [
  {
    image: "/glp1/how-it-works/hiw-why-1.webp",
    imageAlt: "InstaRx compounded semaglutide vial",
    title: "Compounded GLP-1 medications",
    description:
      "Start your InstaRx weight loss journey with peace of mind, knowing that all compounded GLP-1 medications are sourced from rigorously regulated and licensed pharmacies. Maximizing patient outcomes is our primary goal.",
  },
  {
    image: "/glp1/how-it-works/hiw-why-2.webp",
    imageAlt: "Pharmacist in gloves inspecting a compounded GLP-1 vial",
    title: "Setting the gold standard for care and fast shipping",
    description:
      "At InstaRx, your well-being and safety is our top priority, which is why we partner with state-regulated compounding pharmacies. These pharmacies adhere to strict regulatory board standards to ensure the safety and quality of every compounded GLP-1 prescription.",
  },
];

export const resultsIntro = {
  heading: "Care that stays with you",
  body: "Your provider and care team stay connected through every stage of your treatment.",
};

export type ResultIcon = "message" | "dose" | "calendar";

export type Result = {
  image: string;
  imageAlt: string;
  icon: ResultIcon;
  title: string;
  caption: string;
};

export const results: Result[] = [
  {
    image: "/glp1/how-it-works/hiw-care-1.webp",
    imageAlt: "Patient messaging their InstaRx care team from a phone",
    icon: "message",
    title: "Message your provider",
    caption: "A direct line to the care team that knows your case.",
  },
  {
    image: "/glp1/how-it-works/hiw-care-2.webp",
    imageAlt: "Pharmacist dosing compounded GLP-1 vials in a lab",
    icon: "dose",
    title: "Dose adjustments when you need them",
    caption: "No waiting rooms, no delays in your care.",
  },
  {
    image: "/glp1/how-it-works/hiw-care-3.webp",
    imageAlt: "InstaRx patient checking in on their phone at home",
    icon: "calendar",
    title: "Ongoing check-ins",
    caption: "Regular touchpoints to track progress and refine your plan.",
  },
];

export const faqIntro = {
  heading: "Questions & answers",
  body: "Learn more about how compounded GLP-1 treatment through InstaRx works.",
};

export type Faq = {
  question: string;
  answer: string;
};

export const faqs: Faq[] = [
  {
    question: "Is compounded GLP-1 treatment safe?",
    answer:
      "Your treatment is prescribed by a licensed U.S. provider and prepared by state-regulated compounding pharmacies that follow strict Board of Pharmacy standards. Compounded medications are not FDA-approved, which means they have not undergone FDA premarket review; your provider weighs the benefits and risks for your situation before prescribing. See our safety information for full details.",
  },
  {
    question: "What side effects should I know about?",
    answer:
      "GLP-1 medications can cause side effects — most commonly nausea, digestive changes, or reduced appetite, especially as your dose increases. Your care team reviews your history first and stays available to adjust your plan if side effects come up. Always discuss risks and benefits with your provider.",
  },
  {
    question: "What are compounded GLP-1 medications?",
    answer:
      "Compounded GLP-1 medications are prepared at compounding pharmacies based on a doctor's prescription.",
  },
  {
    question: "Does my insurance plan cover compounded GLP-1 medications?",
    answer:
      "While compounded GLP-1 medications aren't covered by insurance, InstaRx offers industry leading prices to help you achieve your weight loss goals.",
  },
  {
    question: "Can I use my HSA or FSA to pay for compounded GLP-1 medications?",
    answer:
      "Absolutely! You can use your HSA or FSA card to pay for compounded GLP-1 medications.",
  },
  {
    question: "How do I get started on a compounded GLP-1 medication?",
    answer:
      "To begin, you'll consult with a licensed healthcare provider. They will assess your medical history and weight loss goals, then prescribe a compounded GLP-1 medication if appropriate, which will be prepared and delivered by a regulated compounding pharmacy.",
  },
];
