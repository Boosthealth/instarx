import type { Metadata } from "next";
import PolicyLayout from "../../../components/PolicyLayout";

export const metadata: Metadata = {
  title: "Sildenafil Safety Information",
  description:
    "Important safety information for sildenafil including contraindications, drug interactions, side effects, and FAQs.",
};

export default function SildenafilPage() {
  return (
    <PolicyLayout>
      <article className="prose prose-gray max-w-none">
        <h1 className="text-3xl font-bold mb-6">Sildenafil</h1>

        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8">
          <h2 className="text-lg font-semibold text-yellow-800 mt-0 mb-2">Important Safety Information</h2>
          <p className="text-yellow-800 text-sm mb-0">
            Read the following safety information carefully before using sildenafil. Discuss any questions or
            concerns with your healthcare provider.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-10 mb-4">Safety Checklist</h2>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
          <p className="text-red-900 font-semibold mb-2">Do NOT take sildenafil if you:</p>
          <ul className="list-disc pl-6 space-y-2 text-red-900">
            <li>
              Take nitrate medications for chest pain or heart problems (such as nitroglycerin, isosorbide
              mononitrate, or isosorbide dinitrate). Taking sildenafil with nitrates can cause a sudden, unsafe
              drop in blood pressure.
            </li>
            <li>
              Use recreational drugs called &ldquo;poppers&rdquo; (such as amyl nitrate or amyl nitrite, butyl
              nitrate).
            </li>
            <li>
              Take riociguat (Adempas), a guanylate cyclase stimulator used for pulmonary arterial hypertension.
            </li>
          </ul>
        </div>

        <h2 className="text-2xl font-semibold mt-10 mb-4">Who Should Avoid Sildenafil</h2>
        <p>Tell your healthcare provider if you have any of the following conditions before taking sildenafil:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Heart problems such as angina, heart failure, irregular heartbeat, or a history of heart attack.</li>
          <li>Stroke within the last 6 months.</li>
          <li>Low or high blood pressure (hypotension or hypertension).</li>
          <li>
            A condition affecting the shape of the penis (such as Peyronie&rsquo;s disease, cavernosal fibrosis, or
            angulation).
          </li>
          <li>Blood cell problems such as sickle cell anemia, multiple myeloma, or leukemia.</li>
          <li>Bleeding disorders.</li>
          <li>Stomach ulcers or other bleeding problems.</li>
          <li>Retinitis pigmentosa or other eye problems.</li>
          <li>Liver or kidney disease.</li>
          <li>Allergy to sildenafil or any ingredients in the medication.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-10 mb-4">Medication Interactions</h2>
        <p>
          Tell your healthcare provider about all medications you take, including prescription and over-the-counter
          drugs, vitamins, and herbal supplements. Sildenafil may interact with:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Alpha-blockers:</strong> Used for prostate problems or high blood pressure. Taking sildenafil
            with alpha-blockers can cause a drop in blood pressure.
          </li>
          <li>
            <strong>Other PDE5 inhibitors:</strong> Such as tadalafil (Cialis) or vardenafil (Levitra). Do not use
            sildenafil with other PDE5 inhibitors.
          </li>
          <li>
            <strong>HIV protease inhibitors:</strong> Such as ritonavir. These may increase sildenafil levels in
            the blood.
          </li>
          <li>
            <strong>Certain antibiotics and antifungals:</strong> Such as erythromycin, clarithromycin,
            ketoconazole, and itraconazole.
          </li>
          <li>
            <strong>Other blood pressure medications:</strong> Sildenafil may add to the blood-pressure-lowering
            effects of these medications.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-10 mb-4">How to Use Safely</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Take sildenafil exactly as prescribed by your healthcare provider.</li>
          <li>Sildenafil is typically taken about 30 to 60 minutes before sexual activity.</li>
          <li>Do not take more than one dose in a 24-hour period.</li>
          <li>Sildenafil can be taken with or without food. A high-fat meal may delay the time it takes to work.</li>
          <li>Avoid excessive alcohol consumption, which can increase the risk of side effects.</li>
          <li>Do not combine sildenafil with other erectile dysfunction medications.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-10 mb-4">Common Side Effects</h2>
        <p>Common side effects of sildenafil include:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Headache</li>
          <li>Flushing (warmth, redness, or tingly feeling)</li>
          <li>Upset stomach or indigestion</li>
          <li>Nasal congestion (stuffy nose)</li>
          <li>Back pain</li>
          <li>Muscle pain</li>
          <li>Dizziness</li>
          <li>Nausea</li>
          <li>Rash</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-10 mb-4">Serious Side Effects</h2>
        <p>Seek immediate medical attention if you experience any of the following:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Priapism:</strong> An erection that lasts more than 4 hours. This is a medical emergency that
            can cause permanent damage to the penis if not treated immediately.
          </li>
          <li>
            <strong>Sudden vision loss:</strong> In one or both eyes. This may be a sign of a serious eye problem
            called non-arteritic anterior ischemic optic neuropathy (NAION).
          </li>
          <li>
            <strong>Sudden hearing loss:</strong> Sometimes with ringing in the ears (tinnitus) or dizziness.
          </li>
          <li>
            <strong>Heart attack symptoms:</strong> Chest pain, pain spreading to the jaw or shoulder, nausea,
            sweating.
          </li>
          <li>
            <strong>Allergic reaction:</strong> Hives, difficulty breathing, swelling of the face, lips, tongue, or
            throat.
          </li>
          <li>
            <strong>Severe dizziness or fainting.</strong>
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-10 mb-4">Frequently Asked Questions</h2>

        <h3 className="text-lg font-semibold mt-6 mb-2">How long does sildenafil last?</h3>
        <p>
          Sildenafil typically lasts 4 to 6 hours. The effects may vary from person to person depending on dosage,
          metabolism, and other factors. It does not cause a constant erection; sexual stimulation is still
          required.
        </p>

        <h3 className="text-lg font-semibold mt-6 mb-2">Is sildenafil safe?</h3>
        <p>
          Sildenafil is generally safe when taken as prescribed by a healthcare provider. It has been used by
          millions of men worldwide. However, it is not safe for everyone, especially those taking nitrates or
          certain other medications. Always consult your provider to determine if sildenafil is right for you.
        </p>

        <h3 className="text-lg font-semibold mt-6 mb-2">Can I take sildenafil with blood pressure medications?</h3>
        <p>
          Sildenafil can interact with some blood pressure medications and cause your blood pressure to drop too
          low. Tell your healthcare provider about all medications you take, especially alpha-blockers and nitrates.
          Your provider can advise whether it is safe for you.
        </p>

        <h3 className="text-lg font-semibold mt-6 mb-2">Can I take supplements with sildenafil?</h3>
        <p>
          Some supplements may interact with sildenafil. Always inform your healthcare provider about any
          supplements, vitamins, or herbal products you are taking. Avoid combining sildenafil with other
          supplements marketed for erectile dysfunction.
        </p>

        <h2 className="text-2xl font-semibold mt-10 mb-4">Telehealth Safety Note</h2>
        <p>
          Through InstaRx, a licensed healthcare provider will review your medical history and current medications
          to determine if sildenafil is appropriate and safe for you. It is important to provide complete and
          accurate information during your consultation. If your health status changes or you experience side
          effects, contact your healthcare provider promptly through the InstaRx platform.
        </p>
      </article>
    </PolicyLayout>
  );
}
