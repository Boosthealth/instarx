import type { Metadata } from "next";
import PolicyLayout from "../../../components/PolicyLayout";

export const metadata: Metadata = {
  title: "B12/MIC Injections Safety Information",
  description: "Safety information for B12/MIC injections including common side effects and important warnings.",
};

export default function B12MicInjectionsPage() {
  return (
    <PolicyLayout>
      <article className="prose prose-gray max-w-none">
        <h1 className="text-3xl font-bold mb-6">B12/MIC Injections</h1>

        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8">
          <h2 className="text-lg font-semibold text-yellow-800 mt-0 mb-2">Important Safety Information</h2>
          <p className="text-yellow-800 text-sm mb-0">
            Read the following safety information carefully. Discuss any questions or concerns with your healthcare
            provider.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-10 mb-4">Common Side Effects</h2>
        <p>The most common side effects of B12/MIC injections include:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Pain, redness, or swelling at the injection site</li>
          <li>Itching</li>
          <li>Muscle cramps</li>
          <li>Upset stomach</li>
          <li>Ankle swelling</li>
          <li>Tiredness</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-10 mb-4">Serious Side Effects</h2>
        <p>
          In severe cases, seek medical attention immediately if you experience:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Irregular heartbeat</li>
          <li>Trouble breathing</li>
        </ul>
        <p className="mt-4">
          If you experience any of these serious side effects, stop using the medication and seek emergency medical
          attention.
        </p>

        <h2 className="text-2xl font-semibold mt-10 mb-4">Who Should Not Use B12/MIC Injections</h2>
        <p>
          B12/MIC injections are not recommended for individuals who are pregnant or breastfeeding. Tell your
          healthcare provider if you are pregnant, planning to become pregnant, or are breastfeeding before starting
          treatment.
        </p>

        <h2 className="text-2xl font-semibold mt-10 mb-4">FDA Disclaimer</h2>
        <p className="text-sm text-gray-600">
          These statements have not been evaluated by the Food and Drug Administration. This product is not
          intended to diagnose, treat, cure, or prevent any disease. Compounded medications are prepared by a
          licensed compounding pharmacy and are not FDA-approved. Always consult your healthcare provider before
          starting any new treatment.
        </p>
      </article>
    </PolicyLayout>
  );
}
