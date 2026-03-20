import type { Metadata } from "next";
import PolicyLayout from "../../../components/PolicyLayout";

export const metadata: Metadata = {
  title: "Telehealth Consent",
  description: "InstaRx Telehealth Consent. Understand the terms of telehealth services provided through InstaRx.",
};

export default function TelehealthConsentPage() {
  return (
    <PolicyLayout>
      <article className="prose prose-gray max-w-none">
        <h1 className="text-3xl font-bold mb-2">Telehealth Consent</h1>
        <p className="text-sm text-gray-500 mb-8">Last Updated: November 14, 2024</p>

        <p>
          This Telehealth Informed Consent (&ldquo;Consent&rdquo;) applies to your use of telehealth services
          facilitated through InstaRx, Inc. (&ldquo;InstaRx&rdquo;). By using the Services, you acknowledge that
          you have read, understood, and agree to the terms below. Telehealth services are provided by independently
          licensed healthcare providers who use the InstaRx platform to deliver care.
        </p>

        <h2 className="text-2xl font-semibold mt-10 mb-4">Purpose</h2>
        <p>
          The purpose of telehealth is to provide healthcare services remotely using electronic communications,
          information technology, or other means. This may be used for diagnosis, treatment, follow-up, patient
          education, and other healthcare-related services. Telehealth enables access to medical professionals when
          an in-person visit is not practical or necessary.
        </p>

        <h2 className="text-2xl font-semibold mt-10 mb-4">Use of Telehealth</h2>
        <p>Telehealth services provided through InstaRx may include, but are not limited to:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            Asynchronous consultations where you submit health information and a licensed provider reviews your
            information and responds with a treatment plan.
          </li>
          <li>
            Synchronous (live) video or audio consultations with a licensed healthcare provider.
          </li>
          <li>Secure messaging between you and your healthcare provider.</li>
          <li>Review of medical records, lab results, photos, and other health information.</li>
          <li>
            Electronic prescribing and management of medications, when medically appropriate and in accordance with
            applicable law.
          </li>
          <li>
            Follow-up communications related to your ongoing treatment and care plan.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-10 mb-4">Anticipated Benefits</h2>
        <p>The potential benefits of telehealth include:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Improved access to healthcare by enabling you to receive care remotely.</li>
          <li>Convenience of receiving care from your home or other location.</li>
          <li>Reduced travel time and associated costs.</li>
          <li>Timely access to medical professionals who may not be available locally.</li>
          <li>Efficient follow-up care and ongoing monitoring of treatment.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-10 mb-4">Potential Risks</h2>
        <p>
          As with any healthcare service, there are potential risks associated with the use of telehealth,
          including but not limited to:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            The healthcare provider may not be able to perform a physical examination, which may limit the ability
            to diagnose certain conditions.
          </li>
          <li>
            Technical difficulties, including interruptions, delays, or failures in the electronic communication,
            may occur.
          </li>
          <li>
            In rare cases, information transmitted may not be sufficient (e.g., poor image quality) to allow for
            appropriate medical decision-making.
          </li>
          <li>
            Although security measures are in place, electronic communications may be subject to interception or
            unauthorized access.
          </li>
          <li>
            Delays in evaluation and treatment could occur due to deficiencies or failures of the equipment or
            technology.
          </li>
          <li>
            A lack of access to all of your medical records may result in adverse drug interactions, allergic
            reactions, or other clinical errors.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-10 mb-4">Life-Threatening Emergencies</h2>
        <p className="font-semibold text-red-700">
          Telehealth is not appropriate for life-threatening emergencies. If you are experiencing a medical
          emergency, call 911 or go to the nearest emergency room immediately. Do not rely on telehealth services
          for emergency care.
        </p>

        <h2 className="text-2xl font-semibold mt-10 mb-4">Data Privacy &amp; Protection</h2>
        <p>
          InstaRx takes the privacy and security of your personal and health information seriously. We use
          appropriate administrative, technical, and physical safeguards to protect your information. Our telehealth
          services are conducted using secure, encrypted communication channels.
        </p>
        <p className="mt-4">
          Your health information may be shared with healthcare providers, pharmacies, laboratories, and other
          entities as necessary to provide your care. For more information about how we collect, use, and protect
          your personal data, please review our{" "}
          <a href="/policies/privacy-policy" className="text-blue-600 hover:underline">
            Privacy Policy
          </a>
          .
        </p>

        <h2 className="text-2xl font-semibold mt-10 mb-4">Laboratory Products &amp; Services</h2>
        <p>
          In some cases, your healthcare provider may order laboratory tests as part of your telehealth
          consultation. These tests may be performed by third-party laboratories. You understand and agree that
          InstaRx is not responsible for the accuracy, timeliness, or quality of laboratory services provided by
          third parties. Lab results will be reviewed by your healthcare provider and shared with you as part of
          your treatment plan.
        </p>

        <h2 className="text-2xl font-semibold mt-10 mb-4">Open Payments Notice</h2>
        <p>
          For informational purposes, applicable providers may report payments or transfers of value they receive
          to the Centers for Medicare &amp; Medicaid Services (CMS) Open Payments program. You may access the Open
          Payments database at{" "}
          <a
            href="https://openpaymentsdata.cms.gov/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            https://openpaymentsdata.cms.gov/
          </a>
          .
        </p>

        <h2 className="text-2xl font-semibold mt-10 mb-4">Contacting Us</h2>
        <p>
          If you have any questions about this Telehealth Consent or our telehealth services, please contact us at:
        </p>
        <p className="mt-4">
          <strong>Email:</strong>{" "}
          <a href="mailto:patientcare@instarx.com" className="text-blue-600 hover:underline">
            patientcare@instarx.com
          </a>
        </p>
        <p className="mt-2">
          <strong>Phone:</strong>{" "}
          <a href="tel:+18666738730" className="text-blue-600 hover:underline">
            (866) 673-8730
          </a>
        </p>
        <p className="mt-2">
          <strong>Address:</strong> 15061 Springdale St. Suite 206, Huntington Beach, CA 92649
        </p>
      </article>
    </PolicyLayout>
  );
}
