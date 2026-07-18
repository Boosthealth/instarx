/**
 * All copy for the `/glp1/how-it-works` page lives here. To clone this page for
 * another product (`/glp2`, `/glp2-v2`), copy the `how-it-works` folder and edit
 * this file — the components read everything from these exports.
 */

export const INTAKE_HREF = "https://go.instarx.com/intake";

export const hero = {
  eyebrow: "How it works",
  // Non-breaking hyphen (U+2011) keeps "GLP-1" from splitting across lines.
  title: "Your GLP‑1 journey, step by step",
  subtitle:
    "From your first assessment to medication at your door, here's exactly how InstaRx works — plus answers to the questions patients ask most.",
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
    image: "/glp1/hero.webp",
    imageAlt: "Person starting the InstaRx GLP-1 online assessment on a phone",
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
    image: "/glp1/Image-1.webp",
    imageAlt: "Licensed provider reviewing a patient's GLP-1 intake",
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
    image: "/glp1/image_2.webp",
    imageAlt: "Discreet GLP-1 medication package delivered to a patient's door",
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
    image: "/glp1/weight.webp",
    imageAlt: "Patient tracking weight-loss progress over time",
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
    image: "/glp1/happy-person.webp",
    imageAlt: "Happy InstaRx patient who reached their weight-loss goals",
  },
];

export type Stat = {
  value: string;
  label: string;
};

export const stats: Stat[] = [
  { value: "9 lbs", label: "Average weight loss in the first month" },
  {
    value: "up to 17%",
    label: "Average body-weight reduction with prescription GLP-1",
  },
  { value: "1–2 days", label: "Typical delivery once you're prescribed" },
];

export const statsFootnote =
  "*Individual results vary. Claims reflect self-reported data from InstaRx customers.";

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
