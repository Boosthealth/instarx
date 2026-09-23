import type { Metadata } from "next";
import PolicyLayout from "../../../components/PolicyLayout";

export const metadata: Metadata = {
  title: "Apomorphine Safety Information",
  description:
    "Important safety information for apomorphine, used off-label for ED, including who should not take it, serious side effects, and when to seek care.",
};

export default function ApomorphinePage() {
  return (
    <PolicyLayout>
      <article className="prose prose-gray max-w-none">
        <h1 className="text-3xl font-bold mb-6">Apomorphine</h1>

        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8">
          <h2 className="text-lg font-semibold text-yellow-800 mt-0 mb-2">
            Important Safety Information
          </h2>
          <p className="text-yellow-800 text-sm mb-2">
            Read the following safety information carefully before using
            apomorphine. Discuss any questions or concerns with your healthcare
            provider.
          </p>
          <p className="text-yellow-800 text-sm mb-0">
            <strong>Off-label use:</strong> In the US, apomorphine is
            FDA-approved only as Apokyn&reg; (injection) and related products
            for &ldquo;off&rdquo; episodes in Parkinson&rsquo;s disease. It is
            not FDA-approved for erectile dysfunction in the US. When prescribed
            for ED, it is used off-label in a compounded formula, at your
            provider&rsquo;s discretion.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-10 mb-4">Do Not Use If</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            You take a 5-HT3 antagonist anti-nausea medicine such as
            ondansetron, granisetron, dolasetron, palonosetron or alosetron.
            Combining them has caused severe low blood pressure and loss of
            consciousness.
          </li>
          <li>You are allergic to apomorphine or any ingredient in it.</li>
        </ul>
        <p className="mt-4">
          Tell your healthcare provider if you have low blood pressure, heart
          problems or a heart rhythm condition such as long QT syndrome, a
          history of fainting, liver or kidney problems, or if you drink alcohol
          or take blood pressure medicines, nitrates or other medicines that
          cause drowsiness.
        </p>

        <h2 className="text-2xl font-semibold mt-10 mb-4">
          Allergic Reaction Signs
        </h2>
        <p>
          Get emergency medical help if you have signs of an allergic reaction
          to apomorphine:
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
          Stop using apomorphine and get emergency medical help or contact your
          healthcare provider right away if you experience any of the following:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Fainting or dizziness on standing:</strong> Apomorphine can
            lower blood pressure, especially when you stand up (orthostatic
            hypotension). Sit or lie down and seek medical attention.
          </li>
          <li>
            <strong>Irregular or fast heartbeat:</strong> Apomorphine can affect
            the heart&rsquo;s electrical rhythm (QT prolongation).
          </li>
          <li>
            <strong>Falling asleep suddenly:</strong> Unexpected sleepiness
            during daily activities. Do not drive or operate machinery until you
            know how apomorphine affects you.
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
        <p>Common side effects of apomorphine may include:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Nausea or vomiting</li>
          <li>Yawning</li>
          <li>Dizziness or light-headedness</li>
          <li>Drowsiness (somnolence)</li>
          <li>Headache</li>
          <li>Sweating or flushing</li>
        </ul>
        <p className="mt-4">
          These side effects usually go away on their own. If side effects
          persist or become bothersome, contact your healthcare provider.
        </p>

        <h2 className="text-2xl font-semibold mt-10 mb-4">More Information</h2>
        <p>
          For more detailed safety information about apomorphine, visit{" "}
          <a
            href="https://www.drugs.com/mtm/apomorphine.html"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            Drugs.com &ndash; Apomorphine
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
