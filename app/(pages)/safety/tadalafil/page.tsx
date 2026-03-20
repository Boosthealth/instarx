import type { Metadata } from "next";
import PolicyLayout from "../../../components/PolicyLayout";

export const metadata: Metadata = {
  title: "Tadalafil Safety Information",
  description:
    "Important safety information for tadalafil including allergic reaction signs, serious side effects, and when to seek care.",
};

export default function TadalafilPage() {
  return (
    <PolicyLayout>
      <article className="prose prose-gray max-w-none">
        <h1 className="text-3xl font-bold mb-6">Tadalafil</h1>

        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8">
          <h2 className="text-lg font-semibold text-yellow-800 mt-0 mb-2">Important Safety Information</h2>
          <p className="text-yellow-800 text-sm mb-0">
            Read the following safety information carefully before using tadalafil. Discuss any questions or
            concerns with your healthcare provider.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-10 mb-4">Allergic Reaction Signs</h2>
        <p>
          Get emergency medical help if you have signs of an allergic reaction to tadalafil:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Hives</li>
          <li>Difficulty breathing</li>
          <li>Swelling of the face, lips, tongue, or throat</li>
          <li>Skin rash or redness</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-10 mb-4">Stop and Seek Immediate Medical Care</h2>
        <p>
          Stop using tadalafil and get emergency medical help or contact your healthcare provider right away if you
          experience any of the following:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Light-headedness or fainting:</strong> Tadalafil can cause a drop in blood pressure, especially
            when taken with certain other medications. If you feel dizzy or faint, sit or lie down and seek medical
            attention.
          </li>
          <li>
            <strong>An erection lasting more than 4 hours (priapism):</strong> A prolonged erection can cause
            permanent damage to the penis. This is a medical emergency requiring immediate treatment.
          </li>
          <li>
            <strong>Sudden vision changes or loss of vision:</strong> In one or both eyes. This may be a sign of a
            serious eye condition called non-arteritic anterior ischemic optic neuropathy (NAION).
          </li>
          <li>
            <strong>Sudden hearing loss:</strong> Sometimes with ringing in the ears (tinnitus) or dizziness. Stop
            taking tadalafil and seek medical attention immediately.
          </li>
          <li>
            <strong>Heart attack symptoms:</strong> Chest pain or pressure, pain spreading to the jaw or shoulder,
            nausea, sweating. Sexual activity may put extra strain on the heart, especially if you have existing
            heart problems.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-10 mb-4">Common Side Effects</h2>
        <p>Common side effects of tadalafil may include:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Headache</li>
          <li>Indigestion or upset stomach</li>
          <li>Back pain</li>
          <li>Muscle aches</li>
          <li>Flushing (warmth or redness in the face, neck, or chest)</li>
          <li>Stuffy or runny nose</li>
          <li>Pain in the arms or legs</li>
        </ul>
        <p className="mt-4">
          These side effects usually go away after a few hours. If side effects persist or become bothersome, contact
          your healthcare provider.
        </p>

        <h2 className="text-2xl font-semibold mt-10 mb-4">More Information</h2>
        <p>
          For more detailed safety information about tadalafil, visit{" "}
          <a
            href="https://www.drugs.com/tadalafil.html"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            Drugs.com &ndash; Tadalafil
          </a>
          .
        </p>

        <p className="text-sm text-gray-600 mt-10">
          This information is not a substitute for professional medical advice, diagnosis, or treatment. Always
          consult your healthcare provider before starting or stopping any medication.
        </p>
      </article>
    </PolicyLayout>
  );
}
