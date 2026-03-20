import type { Metadata } from "next";
import PolicyLayout from "../../../components/PolicyLayout";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "InstaRx Consumer Health Data Privacy Notice. Learn about how we collect, use, and protect your personal data.",
};

export default function PrivacyPolicyPage() {
  return (
    <PolicyLayout>
      <article className="prose prose-gray max-w-none">
        <h1 className="text-3xl font-bold mb-2">CONSUMER HEALTH DATA PRIVACY NOTICE</h1>
        <p className="text-sm text-gray-500 mb-8">Last Updated: August 4, 2025</p>

        <p>
          This Consumer Health Data Privacy Notice (&ldquo;Privacy Notice&rdquo;) describes how InstaRx, Inc.
          (&ldquo;InstaRx,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) collects, uses,
          discloses, and otherwise processes personal data in connection with our websites, mobile applications,
          and other online services that link to this Privacy Notice (collectively, the &ldquo;Services&rdquo;),
          as well as offline services and interactions.
        </p>
        <p>
          If you are a resident of certain U.S. states, please also review the{" "}
          <a href="#supplemental-state" className="text-blue-600 hover:underline">
            Supplemental U.S. State Privacy Disclosures
          </a>{" "}
          section below for additional information about your rights and our practices.
        </p>

        <h2 className="text-2xl font-semibold mt-10 mb-4">Types of Personal Data We Collect</h2>
        <p>We may collect the following categories of personal data:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Identifiers:</strong> Name, email address, phone number, mailing address, IP address, account
            username, and other similar identifiers.
          </li>
          <li>
            <strong>Records:</strong> Financial information such as payment card details, billing address, and
            purchase history.
          </li>
          <li>
            <strong>Demographic Information:</strong> Age, gender, and other demographic details.
          </li>
          <li>
            <strong>Internet or Network Activity:</strong> Browsing history, search history, and information regarding
            your interactions with our Services, advertisements, and other online services.
          </li>
          <li>
            <strong>Geolocation Data:</strong> General location information derived from your IP address.
          </li>
          <li>
            <strong>Audio, Visual, or Similar Information:</strong> Photos, videos, or audio recordings you provide
            to us.
          </li>
          <li>
            <strong>Professional or Employment Information:</strong> Job title, employer, and professional
            qualifications.
          </li>
          <li>
            <strong>Inferences:</strong> Inferences drawn from any of the above to create a profile about you,
            reflecting your preferences, characteristics, behavior, and attitudes.
          </li>
          <li>
            <strong>Sensitive Personal Data:</strong> Health information including medical history, prescriptions,
            treatment information, insurance information, and other health-related data necessary to provide our
            Services.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-10 mb-4">Sources of Personal Data</h2>
        <p>We collect personal data from the following sources:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Directly from you:</strong> When you create an account, complete a health questionnaire, make a
            purchase, contact us, or otherwise interact with our Services.
          </li>
          <li>
            <strong>Automatically through tracking technologies:</strong> When you use our Services, we may
            automatically collect certain information through cookies, pixels, web beacons, and similar
            technologies.
          </li>
          <li>
            <strong>From third parties:</strong> We may receive personal data from healthcare providers, pharmacies,
            laboratories, payment processors, identity verification services, marketing partners, and other
            third parties.
          </li>
          <li>
            <strong>From publicly available sources:</strong> We may collect information from public records and
            other publicly available sources.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-10 mb-4">How We Use Personal Data</h2>
        <p>We use personal data for the following purposes:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Provide our Services:</strong> To facilitate telehealth consultations, process prescriptions,
            fulfill orders, manage your account, and provide customer support.
          </li>
          <li>
            <strong>Operate our business:</strong> To manage and improve our operations, conduct internal analytics,
            perform quality assurance, and maintain our technology infrastructure.
          </li>
          <li>
            <strong>Research and improvement:</strong> To develop new products and services, improve existing ones,
            and conduct research and analysis.
          </li>
          <li>
            <strong>Legal and safety:</strong> To comply with legal obligations, enforce our terms, protect our
            rights and the rights of others, and ensure the safety and security of our Services.
          </li>
          <li>
            <strong>Marketing and advertising:</strong> To send you promotional communications, personalize
            advertising, and measure the effectiveness of our marketing campaigns. You may opt out of marketing
            emails at any time by following the unsubscribe instructions in each email.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-10 mb-4">How We Disclose Personal Data</h2>
        <p>We may disclose personal data to the following categories of recipients:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Affiliates:</strong> Our parent companies, subsidiaries, and other affiliated entities.
          </li>
          <li>
            <strong>Service providers:</strong> Third parties that perform services on our behalf, including payment
            processors, shipping providers, cloud hosting services, analytics providers, and customer service
            platforms.
          </li>
          <li>
            <strong>Professional consultants:</strong> Auditors, lawyers, accountants, and other professional
            advisors.
          </li>
          <li>
            <strong>Law enforcement and government agencies:</strong> When required by law, regulation, legal process,
            or governmental request, or when we believe disclosure is necessary to protect our rights or the safety
            of others.
          </li>
          <li>
            <strong>Corporate transactions:</strong> In connection with a merger, acquisition, sale of assets,
            reorganization, bankruptcy, or other corporate transaction.
          </li>
          <li>
            <strong>Business partners:</strong> Third parties with whom we jointly offer products or services.
          </li>
          <li>
            <strong>The public:</strong> Information you choose to make publicly available through our Services.
          </li>
          <li>
            <strong>With your consent:</strong> Other third parties when you have given us your consent to do so.
          </li>
        </ul>
        <p className="mt-4">
          For a list of our third-party partners, please visit our{" "}
          <a href="/policies/third-party-partners" className="text-blue-600 hover:underline">
            Third Party Partners
          </a>{" "}
          page.
        </p>

        <h2 className="text-2xl font-semibold mt-10 mb-4">Cookies and Other Tracking Technologies</h2>
        <p>We and our third-party partners use cookies and similar tracking technologies to:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Personalization:</strong> Remember your preferences and settings to personalize your experience.
          </li>
          <li>
            <strong>Performance:</strong> Ensure our Services function properly and load efficiently.
          </li>
          <li>
            <strong>Analytics:</strong> Understand how visitors use our Services, which pages are most popular, and
            how users navigate through the site.
          </li>
          <li>
            <strong>Advertising:</strong> Deliver relevant advertisements and measure their effectiveness.
          </li>
          <li>
            <strong>Security:</strong> Detect and prevent fraud, unauthorized access, and other security threats.
          </li>
        </ul>
        <p className="mt-4">
          You can manage your cookie preferences through your browser settings. Please note that disabling certain
          cookies may affect the functionality of our Services.
        </p>

        <h2 className="text-2xl font-semibold mt-10 mb-4">Data Security and Retention</h2>
        <p>
          We implement appropriate technical and organizational security measures to protect personal data against
          unauthorized access, alteration, disclosure, or destruction. These measures include encryption, access
          controls, secure data storage, and regular security assessments.
        </p>
        <p className="mt-4">
          We retain personal data for as long as necessary to fulfill the purposes for which it was collected,
          comply with our legal obligations, resolve disputes, and enforce our agreements. The retention period may
          vary depending on the context of the processing and our legal obligations.
        </p>

        <h2 className="text-2xl font-semibold mt-10 mb-4">Children&rsquo;s Privacy</h2>
        <p>
          Our Services are not intended for individuals under the age of 18. We do not knowingly collect personal
          data from children under 18. If we learn that we have collected personal data from a child under 18, we
          will take steps to delete such data as soon as possible. If you believe we have inadvertently collected
          information from a child under 18, please contact us immediately.
        </p>

        <h2 className="text-2xl font-semibold mt-10 mb-4">External Links</h2>
        <p>
          Our Services may contain links to third-party websites, applications, or services that are not operated
          by us. This Privacy Notice does not apply to those third-party services, and we are not responsible for
          their privacy practices. We encourage you to review the privacy policies of any third-party services you
          access.
        </p>

        <h2 className="text-2xl font-semibold mt-10 mb-4" id="supplemental-state">
          Supplemental U.S. State Privacy Disclosures
        </h2>

        <h3 className="text-xl font-semibold mt-6 mb-3">California &ndash; Shine the Light</h3>
        <p>
          Under California&rsquo;s &ldquo;Shine the Light&rdquo; law (Civil Code Section 1798.83), California
          residents who have provided personal data to a business with which they have established a business
          relationship may request disclosure of the categories of personal data shared with third parties for
          their direct marketing purposes during the preceding calendar year. To make such a request, please
          contact us using the information provided below.
        </p>
        <p className="mt-4">
          If you are a California resident, you may also have additional rights under the California Consumer
          Privacy Act (CCPA), including the right to know, access, delete, and correct your personal data, as well
          as the right to opt out of the &ldquo;sale&rdquo; or &ldquo;sharing&rdquo; of personal data, as those
          terms are defined under the CCPA.
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3">Nevada and Washington</h3>
        <p>
          Nevada residents may opt out of the sale of certain covered information by contacting us at the email
          address below. Washington residents may have additional rights regarding the collection and use of
          consumer health data under the Washington My Health My Data Act.
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3">Texas and Nebraska</h3>
        <p>
          Residents of Texas and Nebraska may have additional rights with respect to their personal data under
          applicable state privacy laws. Please contact us for more information about exercising your rights.
        </p>

        <h2 className="text-2xl font-semibold mt-10 mb-4">Changes</h2>
        <p>
          We may update this Privacy Notice from time to time to reflect changes in our practices or applicable
          laws. When we make material changes, we will notify you by updating the &ldquo;Last Updated&rdquo; date
          at the top of this notice and, where required by law, provide additional notice (such as posting a
          statement on our website or sending you a notification). We encourage you to review this Privacy Notice
          periodically.
        </p>

        <h2 className="text-2xl font-semibold mt-10 mb-4">Contact Information</h2>
        <p>
          If you have any questions, concerns, or requests regarding this Privacy Notice or our privacy practices,
          please contact us at:
        </p>
        <p className="mt-4">
          <strong>Email:</strong>{" "}
          <a href="mailto:privacy@instarx.com" className="text-blue-600 hover:underline">
            privacy@instarx.com
          </a>
        </p>
        <p className="mt-2">
          <strong>Address:</strong> InstaRx, Inc., 15061 Springdale St. Suite 206, Huntington Beach, CA 92649
        </p>
      </article>
    </PolicyLayout>
  );
}
