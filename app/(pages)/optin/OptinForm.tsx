"use client";

import { useState, type FormEvent } from "react";
import PolicyLayout from "../../components/PolicyLayout";

// Where the opt-in form submits. Drop the real endpoint (CRM / webhook / form
// handler) in here — the POST below sends the form fields as JSON. Until it's
// set, submit short-circuits to the thank-you state without a network call so
// the page is still demoable.
const OPTIN_POST_URL = "";

type Status = "idle" | "submitting" | "success" | "error";

export default function OptinForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "submitting") return;
    setError(null);

    const form = event.currentTarget;
    const data = new FormData(form);

    // TCPA consent (c3) is the legally required gate; the carrier-message
    // checkboxes record preference but at least one channel + TCPA consent
    // must be affirmed before we can text anyone.
    const tcpa = data.get("tcpa_consent") === "on";
    const accountTexts = data.get("account_texts") === "on";
    const marketingTexts = data.get("marketing_texts") === "on";

    // The form is noValidate (so we own messaging), so re-check the phone here:
    // strip formatting and require at least 10 digits.
    const phone = String(data.get("phone") || "");
    if (phone.replace(/\D/g, "").length < 10) {
      setError("Please enter a valid phone number with at least 10 digits.");
      return;
    }

    if (!tcpa) {
      setError("Please confirm the TCPA consent checkbox so we can text you.");
      return;
    }
    if (!accountTexts && !marketingTexts) {
      setError("Please opt in to at least one type of text message.");
      return;
    }

    setStatus("submitting");

    const payload = {
      name: String(data.get("name") || ""),
      phone,
      email: String(data.get("email") || ""),
      address: String(data.get("address") || ""),
      accountTexts,
      marketingTexts,
      tcpaConsent: tcpa,
    };

    try {
      if (OPTIN_POST_URL) {
        const res = await fetch(OPTIN_POST_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error(`Request failed (${res.status})`);
      }
      setStatus("success");
    } catch {
      setStatus("error");
      setError("Something went wrong submitting your details. Please try again.");
    }
  }

  return (
    <PolicyLayout contentWidth="full">
      {/* Full-width hero + form area; the form card itself stays centered. */}
      <div className="optin-wrap">
        <div className="optin-hero">
          <span className="optin-eyebrow">Text Alerts &amp; Care Updates</span>
          <h1>
            Get your plan updates <i>by text</i> — fast, private, on your schedule.
          </h1>
          <p>
            Shipping alerts, dose reminders, and exclusive savings, sent right to your phone by your
            InstaRx care team.
          </p>
        </div>

        {status === "success" ? (
          <div className="optin-card">
            <div className="optin-success">
              <div className="optin-success-ic">
                <svg
                  width="30"
                  height="30"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.4"
                >
                  <path d="m9 11 3 3L22 4" />
                  <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                </svg>
              </div>
              <div className="optin-card-title">You&rsquo;re signed up!</div>
              <p className="optin-success-sub">
                Check your phone — we&rsquo;ll text you a confirmation shortly. Reply <b>STOP</b> at
                any time to opt out, or <b>HELP</b> for help.
              </p>
            </div>
          </div>
        ) : (
          <form className="optin-card" onSubmit={handleSubmit} noValidate>
            <div className="optin-card-title">Sign up for text updates</div>
            <div className="optin-card-sub">
              Enter your details below and tell us how you&rsquo;d like to hear from us.
            </div>

            <div className="optin-field">
              <label htmlFor="name">
                Full name <span className="optin-req">*</span>
              </label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Jane Doe"
                autoComplete="name"
                required
              />
            </div>

            <div className="optin-field">
              <label htmlFor="phone">
                Mobile phone <span className="optin-req">*</span>
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                inputMode="tel"
                placeholder="(555) 000-0000"
                autoComplete="tel"
                pattern="[\d\s().+-]{10,}"
                title="Enter a valid phone number (at least 10 digits)."
                required
              />
            </div>

            <div className="optin-field">
              <label htmlFor="email">
                Email address <span className="optin-req">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="jane@email.com"
                autoComplete="email"
                required
              />
            </div>

            <div className="optin-field">
              <label htmlFor="address">
                Mailing address <span className="optin-req">*</span>
              </label>
              <input
                id="address"
                name="address"
                type="text"
                placeholder="Street, City, State, ZIP"
                autoComplete="street-address"
                required
              />
            </div>

            <div className="optin-consent">
              <div className="optin-consent-head">
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.4"
                >
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
                Message Preferences
              </div>

              <div className="optin-check">
                <input type="checkbox" id="account_texts" name="account_texts" defaultChecked />
                <label htmlFor="account_texts">
                  <b>Account &amp; care texts (recommended).</b> Yes, send me transactional SMS about
                  my orders, shipping, and prescription — such as delivery tracking and dose
                  reminders.
                </label>
              </div>

              <div className="optin-check">
                <input type="checkbox" id="marketing_texts" name="marketing_texts" />
                <label htmlFor="marketing_texts">
                  <b>Marketing &amp; offers texts.</b> Yes, send me recurring promotional SMS about
                  new treatments, refill savings, and special offers. Consent is <b>not</b> a
                  condition of purchase.
                </label>
              </div>

              <div className="optin-check">
                <input type="checkbox" id="tcpa_consent" name="tcpa_consent" />
                <label htmlFor="tcpa_consent">
                  <b>TCPA consent.</b> By checking this box, I agree that InstaRx and its care
                  partners may contact me at the number provided using an automatic telephone dialing
                  system or prerecorded/AI voice and text messages. I confirm this is my number and I
                  am 18+. I have read the <a href="/policies/privacy-policy">Privacy Policy</a> and{" "}
                  <a href="/policies/terms-and-conditions">SMS Terms</a>.
                </label>
              </div>

              <div className="optin-finelegal">
                <b>Msg frequency varies (up to ~6 msgs/mo). Msg &amp; data rates may apply.</b> Reply{" "}
                <b>STOP</b> to cancel or <b>HELP</b> for help at any time. Carriers are not liable for
                delayed or undelivered messages. See{" "}
                <a href="/policies/privacy-policy">Privacy Policy</a> &amp;{" "}
                <a href="/policies/terms-and-conditions">Terms</a>.
              </div>
            </div>

            {error ? (
              <div className="optin-error" role="alert">
                {error}
              </div>
            ) : null}

            <button className="optin-cta" type="submit" disabled={status === "submitting"}>
              {status === "submitting" ? "Signing you up…" : "Sign me up →"}
            </button>
            <div className="optin-submicro">
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
              >
                <rect x="4" y="11" width="16" height="9" rx="2" />
                <path d="M8 11V7a4 4 0 0 1 8 0v4" />
              </svg>
              HIPAA secure · We never sell your data
            </div>
          </form>
        )}
      </div>
    </PolicyLayout>
  );
}
