import type { Metadata } from "next";
import PolicyLayout from "../../components/PolicyLayout";

export const metadata: Metadata = {
  title: "GLP-1 Information | InstaRx",
  description:
    "Learn how GLP-1 receptor agonists work, their benefits, risks, common side effects, and important contraindications.",
};

export default function GLP1InfoPage() {
  return (
    <PolicyLayout>
      <article className="prose prose-gray max-w-none">
        <h1 className="text-3xl font-bold mb-6">GLP-1 Information</h1>

        <h2 className="text-2xl font-semibold mt-10 mb-4">How They Work</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Increasing insulin production from the pancreas.</li>
          <li>
            Decreasing glucagon release after a meal. Glucagon triggers your
            liver to store fat.
          </li>
          <li>
            Slows gastric emptying, which will make you feel &apos;full&apos;.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-10 mb-4">Benefits</h2>
        <p>
          GLP-1&apos;s have been shown to help with weight reduction when
          combined with lifestyle medications such as exercise and reduction of
          caloric intake.
        </p>

        <h2 className="text-2xl font-semibold mt-10 mb-4">Risks</h2>
        <p>
          Medicines in the GLP family have caused thyroid tumors in lab mice. It
          is not yet known if they will cause thyroid tumors or medullary thyroid
          carcinoma (MTC) in people. No studies have confirmed a linkage between
          GLP-1&apos;s and thyroid tumors in humans.
        </p>

        <h2 className="text-2xl font-semibold mt-10 mb-4">
          Common Side Effects
        </h2>
        <p>
          Nausea, constipation, gastroesophageal reflux, diarrhea, fatigue
        </p>

        <h2 className="text-2xl font-semibold mt-10 mb-4">
          Rare Side Effects
        </h2>
        <p>
          Depression, hair loss, or Non-Arteritic Anterior Ischemic Optic
          Neuropathy (NAION)
        </p>

        <h2 className="text-2xl font-semibold mt-10 mb-4">
          You Should Not Use a GLP-1 If You Have Any of the Following
        </h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Eating Disorder</li>
          <li>
            Gallbladder Disease (does not include gallbladder
            removal/cholecystectomy)
          </li>
          <li>
            Severe GI disease (eg: gastroparesis, Crohns, ulcerative colitis)
          </li>
          <li>Drug Abuse</li>
          <li>Alcohol Abuse</li>
          <li>Recent Bariatric Surgery</li>
          <li>
            Chronic pancreatitis, or pancreatitis while taking a GLP-1
          </li>
          <li>Personal or family history of medullary Thyroid Cancer</li>
          <li>Multiple endocrine neoplasia type 2 syndrome (MEN-2)</li>
          <li>Currently Pregnant (or planning to become pregnant)</li>
          <li>Currently Breastfeeding</li>
          <li>Retinopathy</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-10 mb-4">
          You Should Stop Using a GLP-1 If You Have Any of the Following
        </h2>
        <p>
          Sudden vision changes (medications that alter blood sugar can have
          various effects on vision and should be evaluated promptly by an eye
          doctor)
        </p>
      </article>
    </PolicyLayout>
  );
}
