import type { Metadata } from "next";
import PolicyLayout from "../../../components/PolicyLayout";

export const metadata: Metadata = {
  title: "NAD+ Injections Safety Information",
  description:
    "Safety information for NAD+ injections including potential side effects, interactions, and important warnings.",
};

export default function NadPlusPage() {
  return (
    <PolicyLayout>
      <article className="prose prose-gray max-w-none">
        <h1 className="text-3xl font-bold mb-6">NAD+ Injections</h1>

        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8">
          <h2 className="text-lg font-semibold text-yellow-800 mt-0 mb-2">Important Safety Information</h2>
          <p className="text-yellow-800 text-sm mb-0">
            Read the following safety information carefully. Discuss any questions or concerns with your healthcare
            provider.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-10 mb-4">Injection Site Reactions</h2>
        <p>
          As with any injectable treatment, NAD+ injections may cause reactions at the injection site, including
          pain, redness, swelling, or bruising. These reactions are generally mild and resolve on their own within
          a few days. If injection site reactions persist or worsen, contact your healthcare provider.
        </p>

        <h2 className="text-2xl font-semibold mt-10 mb-4">Allergic Reactions</h2>
        <p>
          Although rare, allergic reactions to NAD+ injections may occur. Signs of an allergic reaction include
          rash, itching, hives, swelling (especially of the face, lips, tongue, or throat), dizziness, and
          difficulty breathing. If you experience any signs of a serious allergic reaction, seek emergency medical
          attention immediately.
        </p>

        <h2 className="text-2xl font-semibold mt-10 mb-4">Medication Interactions</h2>
        <p>
          NAD+ may interact with certain medications. Inform your healthcare provider about all medications you are
          currently taking, including prescription drugs, over-the-counter medications, vitamins, and herbal
          supplements. Your healthcare provider can determine whether NAD+ injections are appropriate for you based
          on your current medication regimen.
        </p>

        <h2 className="text-2xl font-semibold mt-10 mb-4">Underlying Health Conditions</h2>
        <p>
          Individuals with certain underlying health conditions should use caution when considering NAD+ injections.
          Discuss your complete medical history with your healthcare provider before starting treatment, including
          any chronic conditions, recent surgeries, or ongoing treatments.
        </p>

        <h2 className="text-2xl font-semibold mt-10 mb-4">Long-Term Effects</h2>
        <p>
          The long-term effects of NAD+ supplementation via injection have not been extensively studied. While NAD+
          is a naturally occurring molecule in the body, the safety and efficacy of long-term supplementation through
          injections is still being researched. Your healthcare provider will monitor your progress and make
          adjustments to your treatment plan as needed.
        </p>

        <p className="text-sm text-gray-600 mt-10">
          These statements have not been evaluated by the Food and Drug Administration. This product is not
          intended to diagnose, treat, cure, or prevent any disease. Always consult your healthcare provider before
          starting any new treatment.
        </p>
      </article>
    </PolicyLayout>
  );
}
