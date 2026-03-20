import type { Metadata } from "next";
import PolicyLayout from "../../components/PolicyLayout";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with InstaRx. Ask a question or share feedback.",
};

export default function ContactUsPage() {
  return (
    <PolicyLayout>
      <div className="max-w-2xl">
        <h1 className="text-4xl font-bold mb-2">Connect</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">How can we help you?</h2>
        <p className="text-gray-600 mb-10">
          Ask a question or share feedback. We&rsquo;ll get you answers right away.
        </p>

        <div className="space-y-8">
          {/* Email */}
          <div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Email</h3>
            <a
              href="mailto:patientcare@instarx.com"
              className="text-lg text-blue-600 hover:underline"
            >
              patientcare@instarx.com
            </a>
          </div>

          {/* Address & Phone */}
          <div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">
              Address &amp; Phone
            </h3>
            <p className="text-gray-900 leading-relaxed">
              15061 Springdale St. Suite 206
              <br />
              Huntington Beach, CA 92649
            </p>
            <p className="mt-2">
              <a href="tel:+18666738730" className="text-lg text-blue-600 hover:underline">
                (866) 673-8730
              </a>
            </p>
          </div>
        </div>
      </div>
    </PolicyLayout>
  );
}
