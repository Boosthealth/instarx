import type { Metadata } from "next";
import PolicyLayout from "../../../components/PolicyLayout";

export const metadata: Metadata = {
  title: "Bremelanotide (PT-141) Safety Information",
  description:
    "Important safety information for bremelanotide (PT-141), used off-label in men, including who should not take it, side effects, and when to seek care.",
};

export default function BremelanotidePage() {
  return (
    <PolicyLayout>
      <article className="prose prose-gray max-w-none">
        <h1 className="text-3xl font-bold mb-6">Bremelanotide (PT-141)</h1>

        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8">
          <h2 className="text-lg font-semibold text-yellow-800 mt-0 mb-2">
            Important Safety Information
          </h2>
          <p className="text-yellow-800 text-sm mb-2">
            Read the following safety information carefully before using
            bremelanotide. Discuss any questions or concerns with your
            healthcare provider.
          </p>
          <p className="text-yellow-800 text-sm mb-0">
            <strong>Off-label use:</strong> In the US, bremelanotide is
            FDA-approved only as Vyleesi&reg; for premenopausal women with
            acquired, generalized hypoactive sexual desire disorder (HSDD). It
            is not FDA-approved for use in men or for erectile dysfunction in
            the US. When prescribed for men, it is used off-label in a
            compounded formula, at your provider&rsquo;s discretion.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-10 mb-4">Do Not Use If</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>You have uncontrolled high blood pressure.</li>
          <li>You have known cardiovascular disease.</li>
          <li>You are allergic to bremelanotide or any ingredient in it.</li>
        </ul>
        <p className="mt-4">
          Bremelanotide can temporarily raise blood pressure and lower heart
          rate after each dose. Do not use more than one dose within 24 hours or
          more than eight doses per month. It can lower the levels of oral
          naltrexone in your blood; tell your healthcare provider if you take
          naltrexone or any medicine that depends on steady blood levels.
        </p>

        <h2 className="text-2xl font-semibold mt-10 mb-4">
          Allergic Reaction Signs
        </h2>
        <p>
          Get emergency medical help if you have signs of an allergic reaction
          to bremelanotide:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Hives</li>
          <li>Difficulty breathing</li>
          <li>Swelling of the face, lips, tongue, or throat</li>
          <li>Skin rash or redness</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-10 mb-4">
          Stop and Seek Immediate Medical Care
        </h2>
        <p>
          Stop using bremelanotide and get emergency medical help or contact
          your healthcare provider right away if you experience any of the
          following:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Severe headache, chest pain or pounding heartbeat:</strong>{" "}
            These may be signs of a rise in blood pressure.
          </li>
          <li>
            <strong>Severe or persistent nausea or vomiting.</strong>
          </li>
          <li>
            <strong>An erection lasting more than 4 hours (priapism):</strong> A
            prolonged erection can cause permanent damage to the penis. This is
            a medical emergency requiring immediate treatment.
          </li>
          <li>
            <strong>Heart attack symptoms:</strong> Chest pain or pressure, pain
            spreading to the jaw or shoulder, nausea, sweating.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-10 mb-4">
          Common Side Effects
        </h2>
        <p>Common side effects of bremelanotide may include:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Nausea</li>
          <li>Flushing (warmth or redness in the face, neck, or chest)</li>
          <li>Headache</li>
          <li>Injection-site reactions (redness, pain or itching)</li>
          <li>
            Darkening of the skin on the face, gums or breasts
            (hyperpigmentation), more likely with frequent use
          </li>
        </ul>
        <p className="mt-4">
          Nausea is most common with the first dose and usually improves. If
          side effects persist or become bothersome, contact your healthcare
          provider.
        </p>

        <h2 className="text-2xl font-semibold mt-10 mb-4">More Information</h2>
        <p>
          For more detailed safety information about bremelanotide, visit{" "}
          <a
            href="https://www.drugs.com/mtm/bremelanotide.html"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            Drugs.com &ndash; Bremelanotide
          </a>
          .
        </p>

        <p className="text-sm text-gray-600 mt-10">
          This information is not a substitute for professional medical advice,
          diagnosis, or treatment. Always consult your healthcare provider
          before starting or stopping any medication.
        </p>
      </article>
    </PolicyLayout>
  );
}
