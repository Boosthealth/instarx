import type { Metadata } from "next";
import PolicyLayout from "../../../components/PolicyLayout";

export const metadata: Metadata = {
  title: "Compounded Tirzepatide Safety Information",
  description:
    "Important safety information for compounded tirzepatide including indications, warnings, side effects, and dosing schedule.",
};

export default function CompoundedTirzepatidePage() {
  return (
    <PolicyLayout>
      <article className="prose prose-gray max-w-none">
        <h1 className="text-3xl font-bold mb-6">Compounded Tirzepatide</h1>

        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8">
          <h2 className="text-lg font-semibold text-yellow-800 mt-0 mb-2">Important Safety Information</h2>
          <p className="text-yellow-800 text-sm mb-0">
            Read the following safety information carefully before starting treatment. Discuss any questions or
            concerns with your healthcare provider.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-10 mb-4">Indications and Use</h2>
        <p>
          Tirzepatide is a glucose-dependent insulinotropic polypeptide (GIP) and glucagon-like peptide-1 (GLP-1)
          receptor agonist indicated as an adjunct to a reduced calorie diet and increased physical activity for
          chronic weight management in adults with an initial body mass index (BMI) of 30 kg/m&sup2; or greater
          (obesity), or 27 kg/m&sup2; or greater (overweight) in the presence of at least one weight-related
          comorbid condition.
        </p>

        <h2 className="text-2xl font-semibold mt-10 mb-4">WARNING: Thyroid C-Cell Tumors</h2>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
          <p className="text-red-900 font-medium">
            In rodents, tirzepatide causes dose-dependent and treatment-duration-dependent thyroid C-cell tumors at
            clinically relevant exposures. It is unknown whether tirzepatide causes thyroid C-cell tumors, including
            medullary thyroid carcinoma (MTC), in humans, as human relevance of tirzepatide-induced rodent thyroid
            C-cell tumors has not been determined.
          </p>
          <p className="text-red-900 font-medium mt-2 mb-0">
            Tirzepatide is contraindicated in patients with a personal or family history of MTC or in patients with
            Multiple Endocrine Neoplasia syndrome type 2 (MEN 2). Counsel patients regarding the potential risk of
            MTC and symptoms of thyroid tumors.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-10 mb-4">FDA Approval Status</h2>
        <p>
          Compounded tirzepatide is not an FDA-approved drug. It is prepared by a compounding pharmacy and is not
          subject to the same FDA review and approval process as commercially manufactured drugs. Compounded
          medications are tailored to individual patient needs and may differ from commercially available products
          in formulation, strength, or delivery method.
        </p>

        <h2 className="text-2xl font-semibold mt-10 mb-4">Limitations</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            Has not been studied in patients with a history of pancreatitis. Consider other therapies in patients
            with a history of pancreatitis.
          </li>
          <li>Not indicated for use in combination with any other GLP-1 receptor agonist.</li>
          <li>
            Has not been studied in patients with severe gastrointestinal disease, including severe gastroparesis.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-10 mb-4">Who Should Not Use Tirzepatide</h2>
        <p>Do not use tirzepatide if you:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Have a personal or family history of medullary thyroid carcinoma (MTC).</li>
          <li>Have Multiple Endocrine Neoplasia syndrome type 2 (MEN 2).</li>
          <li>Are allergic to tirzepatide or any of the ingredients in the medication.</li>
          <li>Are pregnant or planning to become pregnant.</li>
          <li>Are breastfeeding.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-10 mb-4">Administration</h2>
        <p>
          Tirzepatide is administered as a subcutaneous injection once weekly. The injection can be given in the
          abdomen, thigh, or upper arm. Rotate injection sites with each dose. Tirzepatide may be taken at any
          time of day, with or without meals. It should be taken on the same day each week. If a dose is missed,
          administer it as soon as possible within 4 days after the missed dose. If more than 4 days have passed,
          skip the missed dose and administer the next dose on the regularly scheduled day.
        </p>

        <h2 className="text-2xl font-semibold mt-10 mb-4">Drug Interactions</h2>
        <p>
          Tirzepatide delays gastric emptying, which may affect the absorption of concomitantly administered oral
          medications. Use with caution in patients receiving oral medications that require rapid gastrointestinal
          absorption. When used with insulin or an insulin secretagogue (e.g., sulfonylurea), consider lowering the
          dose of the insulin or insulin secretagogue to reduce the risk of hypoglycemia. Patients using oral
          hormonal contraceptives should switch to a non-oral contraceptive method, or add a barrier method of
          contraception, for 4 weeks after initiation and for 4 weeks after each dose escalation step.
        </p>

        <h2 className="text-2xl font-semibold mt-10 mb-4">Medical History</h2>
        <p>Before starting tirzepatide, tell your healthcare provider about all your medical conditions, including if you:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Have or have had problems with your pancreas or kidneys.</li>
          <li>Have a history of diabetic retinopathy.</li>
          <li>Have or have had depression, suicidal thoughts, or mental health problems.</li>
          <li>Have any other medical conditions.</li>
          <li>Are taking any prescription or over-the-counter medications, vitamins, or herbal supplements.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-10 mb-4">Pregnancy and Breastfeeding</h2>
        <p>
          Tirzepatide should not be used during pregnancy. Discontinue tirzepatide at least 2 months before a
          planned pregnancy due to its long half-life. There are no data on the presence of tirzepatide in human
          milk, the effects on the breastfed infant, or the effects on milk production. Because of the potential
          for serious adverse reactions in a breastfed infant, breastfeeding is not recommended during treatment
          with tirzepatide.
        </p>

        <h2 className="text-2xl font-semibold mt-10 mb-4">Side Effects</h2>
        <p>The most common side effects of tirzepatide include:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Nausea</li>
          <li>Diarrhea</li>
          <li>Vomiting</li>
          <li>Constipation</li>
          <li>Abdominal pain</li>
          <li>Dyspepsia (indigestion)</li>
          <li>Injection site reactions</li>
          <li>Fatigue</li>
          <li>Hypersensitivity reactions</li>
          <li>Eructation (belching)</li>
          <li>Hair loss</li>
          <li>Gastroesophageal reflux disease</li>
        </ul>
        <p className="mt-4">
          Serious side effects may include pancreatitis, gallbladder problems, hypoglycemia, kidney problems,
          serious allergic reactions, changes in vision in patients with type 2 diabetes, and depression or suicidal
          thoughts. Contact your healthcare provider immediately if you experience severe abdominal pain, symptoms
          of an allergic reaction, or changes in mood or behavior.
        </p>

        <h2 className="text-2xl font-semibold mt-10 mb-4">Dosing Schedule</h2>
        <p>The recommended dose escalation schedule for tirzepatide is as follows:</p>
        <div className="overflow-x-auto mt-4">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Weeks</th>
                <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Weekly Dose</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-4 py-3">Weeks 1&ndash;4</td>
                <td className="border border-gray-300 px-4 py-3">2.5 mg</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border border-gray-300 px-4 py-3">Weeks 5&ndash;8</td>
                <td className="border border-gray-300 px-4 py-3">5 mg</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-3">Weeks 9&ndash;12</td>
                <td className="border border-gray-300 px-4 py-3">7.5 mg</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border border-gray-300 px-4 py-3">Weeks 13&ndash;16</td>
                <td className="border border-gray-300 px-4 py-3">10 mg</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-3">Weeks 17&ndash;20</td>
                <td className="border border-gray-300 px-4 py-3">12.5 mg</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border border-gray-300 px-4 py-3">Weeks 21&ndash;24</td>
                <td className="border border-gray-300 px-4 py-3">15 mg</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm text-gray-600 mt-2">
          Your healthcare provider may adjust the dose escalation schedule based on your tolerability.
        </p>

        <h2 className="text-2xl font-semibold mt-10 mb-4">Legal Disclaimers</h2>
        <p className="text-sm text-gray-600">
          The information provided on this page is for educational purposes only and is not intended to be a
          substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your
          physician or other qualified healthcare provider with any questions you may have regarding a medical
          condition or treatment.
        </p>
        <p className="text-sm text-gray-600 mt-4">
          Compounded medications are not FDA-approved. They are prepared by licensed compounding pharmacies in
          accordance with applicable state and federal regulations. The safety and efficacy of compounded
          medications have not been verified by the FDA.
        </p>
        <p className="text-sm text-gray-600 mt-4">
          Individual results may vary. Weight loss results depend on various factors, including adherence to a
          reduced-calorie diet and increased physical activity.
        </p>
      </article>
    </PolicyLayout>
  );
}
