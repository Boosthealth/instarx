import type { Metadata } from "next";
import PolicyLayout from "../../../components/PolicyLayout";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "InstaRx Terms of Service. Please read these terms carefully before using our services.",
};

export default function TermsAndConditionsPage() {
  return (
    <PolicyLayout>
      <article className="prose prose-gray max-w-none">
        <h1 className="text-3xl font-bold mb-2">Terms of Service</h1>
        <p className="text-sm text-gray-500 mb-8">Effective Date: August 5, 2025</p>

        <p>
          Please read these Terms of Service (&ldquo;Terms&rdquo;) carefully before using the websites, mobile
          applications, and other online products and services (collectively, the &ldquo;Services&rdquo;) provided
          by InstaRx, Inc. (&ldquo;InstaRx,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;). By
          accessing or using our Services, you agree to be bound by these Terms. If you do not agree to these Terms,
          you may not access or use the Services.
        </p>

        {/* Section 1 */}
        <h2 className="text-2xl font-semibold mt-10 mb-4">1. Basic Terms</h2>
        <p>
          InstaRx is a technology platform that connects patients with licensed healthcare providers and facilitates
          prescription fulfillment through licensed pharmacies. <strong>InstaRx is not a healthcare provider.</strong>{" "}
          InstaRx does not practice medicine, provide medical advice, diagnose conditions, or prescribe medications.
          All medical decisions are made solely by the licensed healthcare providers who use our platform.
        </p>
        <p className="mt-4">
          Healthcare services are provided by independent provider groups. By using our Services, you acknowledge
          that your healthcare provider operates independently from InstaRx and is solely responsible for the
          medical care you receive.
        </p>
        <p className="mt-4">
          Provider group: Dr Telx:{" "}
          <a
            href="https://drtelx.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            https://drtelx.com/
          </a>
        </p>
        <p className="mt-2">
          MDI Integrations:{" "}
          <a
            href="https://mdintegrations.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            https://mdintegrations.com/
          </a>
        </p>
        <p className="mt-4">
          Prescription medications, when prescribed, are dispensed by licensed pharmacies. InstaRx facilitates the
          coordination between you, your healthcare provider, and the pharmacy, but does not itself dispense or
          distribute any medications.
        </p>

        {/* Section 2 */}
        <h2 className="text-2xl font-semibold mt-10 mb-4">2. Eligibility</h2>
        <p>
          You must be at least 18 years of age to use our Services. By using the Services, you represent and warrant
          that you are at least 18 years old and have the legal capacity to enter into these Terms. You agree to
          comply with all applicable laws and regulations in connection with your use of the Services.
        </p>

        {/* Section 3 */}
        <h2 className="text-2xl font-semibold mt-10 mb-4">3. Registering for an Account</h2>
        <p>
          To access certain features of our Services, you may be required to create an account. When registering,
          you agree to provide accurate, current, and complete information and to update such information to keep it
          accurate, current, and complete. You are responsible for safeguarding your account credentials and for all
          activities that occur under your account. You agree to notify us immediately of any unauthorized use of
          your account.
        </p>

        {/* Section 4 */}
        <h2 className="text-2xl font-semibold mt-10 mb-4">4. Passwords</h2>
        <p>
          You are responsible for maintaining the confidentiality of your password and account. You agree not to
          share your password with anyone else. You are fully responsible for all activities that occur under your
          account, whether or not you have authorized such activities. You agree to immediately notify InstaRx of
          any unauthorized use of your password or account or any other breach of security.
        </p>

        {/* Section 5 */}
        <h2 className="text-2xl font-semibold mt-10 mb-4">5. Payment for the Services</h2>
        <p>
          Certain Services require payment. By providing a payment method, you represent and warrant that you are
          authorized to use the designated payment method and authorize us (or our third-party payment processor)
          to charge your payment method for the total amount of your order (including any applicable taxes and
          fees). If the payment method you provide cannot be verified, is invalid, or is otherwise not acceptable,
          your order may be suspended or cancelled.
        </p>
        <p className="mt-4">
          Prices for our Services are subject to change at any time. We are not responsible for pricing errors.
          Subscription services will automatically renew and charge your payment method at the then-current rate
          unless you cancel prior to the renewal date.
        </p>

        {/* Section 6 */}
        <h2 className="text-2xl font-semibold mt-10 mb-4">6. Content Regarding the Services</h2>
        <p>
          All content provided through our Services, including but not limited to text, graphics, images, and
          information, is for informational purposes only and is not intended to be a substitute for professional
          medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified
          health provider with any questions you may have regarding a medical condition.
        </p>
        <p className="mt-4">
          You retain ownership of any content you submit through the Services, but you grant InstaRx a
          non-exclusive, worldwide, royalty-free license to use, reproduce, modify, and display such content in
          connection with operating and providing the Services.
        </p>

        {/* Section 7 */}
        <h2 className="text-2xl font-semibold mt-10 mb-4">7. Insta RX&rsquo;s Rights</h2>
        <p>
          InstaRx and its licensors exclusively own all right, title, and interest in the Services, including all
          associated intellectual property rights. You acknowledge that the Services are protected by copyright,
          trademark, and other laws. You agree not to remove, alter, or obscure any copyright, trademark, or other
          proprietary notices.
        </p>
        <p className="mt-4">
          We reserve the right to modify, suspend, or discontinue the Services (or any part thereof) at any time,
          with or without notice. We shall not be liable to you or any third party for any modification, suspension,
          or discontinuance of the Services.
        </p>

        {/* Section 8 */}
        <h2 className="text-2xl font-semibold mt-10 mb-4">8. Restrictions on Use</h2>
        <p>You agree not to:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Use the Services for any unlawful purpose or in violation of any applicable law or regulation.</li>
          <li>
            Impersonate any person or entity, or falsely state or misrepresent your identity or affiliation with any
            person or entity.
          </li>
          <li>Interfere with or disrupt the Services or servers or networks connected to the Services.</li>
          <li>
            Attempt to gain unauthorized access to any part of the Services, other accounts, computer systems, or
            networks connected to the Services.
          </li>
          <li>Use any robot, spider, scraper, or other automated means to access the Services.</li>
          <li>
            Reverse engineer, decompile, or disassemble any aspect of the Services or do anything that might
            discover source code or bypass security measures.
          </li>
          <li>
            Use the Services to transmit any viruses, worms, defects, Trojan horses, or other items of a destructive
            nature.
          </li>
          <li>
            Use the Services to collect or harvest personal information about other users without their consent.
          </li>
        </ul>

        {/* Section 9 */}
        <h2 className="text-2xl font-semibold mt-10 mb-4">9. Termination</h2>
        <p>
          We may terminate or suspend your account and access to the Services at our sole discretion, without prior
          notice or liability, for any reason, including if you breach these Terms. Upon termination, your right to
          use the Services will immediately cease. All provisions of these Terms which by their nature should survive
          termination shall survive, including without limitation ownership provisions, warranty disclaimers,
          indemnity, and limitations of liability.
        </p>

        {/* Section 10 */}
        <h2 className="text-2xl font-semibold mt-10 mb-4">
          10. Disclaimers, Limitation of Liability, and Indemnity
        </h2>
        <p className="uppercase font-semibold">
          THE SERVICES ARE PROVIDED &ldquo;AS IS&rdquo; AND &ldquo;AS AVAILABLE&rdquo; WITHOUT WARRANTIES OF ANY
          KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY,
          FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
        </p>
        <p className="mt-4 uppercase font-semibold">
          IN NO EVENT SHALL INSTARX, ITS DIRECTORS, EMPLOYEES, PARTNERS, AGENTS, SUPPLIERS, OR AFFILIATES BE LIABLE
          FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING WITHOUT LIMITATION
          LOSS OF PROFITS, DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES, ARISING OUT OF OR IN CONNECTION WITH
          YOUR USE OF THE SERVICES.
        </p>
        <p className="mt-4">
          You agree to indemnify, defend, and hold harmless InstaRx and its officers, directors, employees, agents,
          and affiliates from and against any and all claims, damages, obligations, losses, liabilities, costs, or
          debt, and expenses (including attorney&rsquo;s fees) arising from your use of the Services, your violation
          of these Terms, or your violation of any rights of a third party.
        </p>

        {/* Section 11 */}
        <h2 className="text-2xl font-semibold mt-10 mb-4">
          11. Dispute Resolution and Arbitration Agreement
        </h2>
        <p>
          Any dispute, claim, or controversy arising out of or relating to these Terms or the breach, termination,
          enforcement, interpretation, or validity thereof, including the determination of the scope or
          applicability of this agreement to arbitrate, shall be determined by binding arbitration. The arbitration
          shall be administered by a recognized arbitration organization and conducted in Orange County, California.
        </p>
        <p className="mt-4">
          You agree that any arbitration shall be conducted on an individual basis and not as a class, consolidated,
          or representative action. If for any reason a claim proceeds in court rather than in arbitration, you and
          InstaRx each waive any right to a jury trial.
        </p>
        <p className="mt-4">
          You may opt out of this arbitration agreement by sending written notice to us within 30 days of first
          accepting these Terms. Your notice must include your name, address, and a clear statement that you wish
          to opt out of the arbitration agreement.
        </p>

        {/* Section 12 */}
        <h2 className="text-2xl font-semibold mt-10 mb-4">12. Miscellaneous Terms</h2>
        <p>
          These Terms constitute the entire agreement between you and InstaRx regarding the Services and supersede
          all prior and contemporaneous agreements, proposals, or representations, written or oral, concerning the
          Services.
        </p>
        <p className="mt-4">
          Our failure to enforce any right or provision of these Terms will not be considered a waiver of such right
          or provision. If any provision of these Terms is held to be invalid or unenforceable by a court, the
          remaining provisions will remain in full force and effect.
        </p>
        <p className="mt-4">
          These Terms shall be governed by and construed in accordance with the laws of the State of California,
          without regard to its conflict of law provisions.
        </p>
        <p className="mt-4">
          You may not assign or transfer these Terms, by operation of law or otherwise, without our prior written
          consent. We may assign or transfer these Terms, in whole or in part, without restriction.
        </p>

        <h2 className="text-2xl font-semibold mt-10 mb-4">Contact</h2>
        <p>If you have any questions about these Terms, please contact us at:</p>
        <p className="mt-4">
          <strong>Email:</strong>{" "}
          <a href="mailto:support@instarx.com" className="text-blue-600 hover:underline">
            support@instarx.com
          </a>
        </p>
        <p className="mt-2">
          <strong>Address:</strong> 15061 Springdale St. Suite 206, Huntington Beach, CA 92649
        </p>
      </article>
    </PolicyLayout>
  );
}
