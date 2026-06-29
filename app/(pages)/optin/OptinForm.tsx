"use client";

import { useState, type FormEvent } from "react";
import PolicyLayout from "../../components/PolicyLayout";

// Where the opt-in form submits. Drop the real endpoint (CRM / webhook / form
// handler) in here — the POST below sends the form fields as JSON. Until it's
// set, submit short-circuits to the thank-you state without a network call so
// the page is still demoable.
const OPTIN_POST_URL = "";

// USPS two-letter codes for the 50 states + DC, used for the State dropdown.
const US_STATES = [
  ["AL", "Alabama"], ["AK", "Alaska"], ["AZ", "Arizona"], ["AR", "Arkansas"],
  ["CA", "California"], ["CO", "Colorado"], ["CT", "Connecticut"], ["DE", "Delaware"],
  ["DC", "District of Columbia"], ["FL", "Florida"], ["GA", "Georgia"], ["HI", "Hawaii"],
  ["ID", "Idaho"], ["IL", "Illinois"], ["IN", "Indiana"], ["IA", "Iowa"],
  ["KS", "Kansas"], ["KY", "Kentucky"], ["LA", "Louisiana"], ["ME", "Maine"],
  ["MD", "Maryland"], ["MA", "Massachusetts"], ["MI", "Michigan"], ["MN", "Minnesota"],
  ["MS", "Mississippi"], ["MO", "Missouri"], ["MT", "Montana"], ["NE", "Nebraska"],
  ["NV", "Nevada"], ["NH", "New Hampshire"], ["NJ", "New Jersey"], ["NM", "New Mexico"],
  ["NY", "New York"], ["NC", "North Carolina"], ["ND", "North Dakota"], ["OH", "Ohio"],
  ["OK", "Oklahoma"], ["OR", "Oregon"], ["PA", "Pennsylvania"], ["RI", "Rhode Island"],
  ["SC", "South Carolina"], ["SD", "South Dakota"], ["TN", "Tennessee"], ["TX", "Texas"],
  ["UT", "Utah"], ["VT", "Vermont"], ["VA", "Virginia"], ["WA", "Washington"],
  ["WV", "West Virginia"], ["WI", "Wisconsin"], ["WY", "Wyoming"],
] as const;

type Status = "idle" | "submitting" | "success" | "error";

// Format raw keystrokes into "MM/DD/YYYY" as the user types: keep only digits,
// cap at 8 (MMDDYYYY), and re-insert the slashes.
function formatBirthdayInput(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 8);
  const parts = [digits.slice(0, 2), digits.slice(2, 4), digits.slice(4, 8)];
  return parts.filter(Boolean).join("/");
}

export default function OptinForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [birthday, setBirthday] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "submitting") return;
    setError(null);

    const form = event.currentTarget;
    const data = new FormData(form);

    // TCPA consent is the only legally required consent gate (call/voice +
    // 18+). The account-texts and marketing-texts checkboxes record separate
    // text-message consent and are optional — they must not block submission.
    const tcpa = data.get("tcpa_consent") === "on";
    const accountTexts = data.get("account_texts") === "on";
    const marketingTexts = data.get("marketing_texts") === "on";

    // The form is noValidate (so we own messaging), so re-check key fields here.
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const birthdayValue = String(data.get("birthday") || "").trim();
    const address = String(data.get("address") || "").trim();
    const city = String(data.get("city") || "").trim();
    const state = String(data.get("state") || "");
    const zip = String(data.get("zip") || "").trim();
    const phone = String(data.get("phone") || "");

    if (!name || !email || !address || !city) {
      setError("Please fill in all required fields.");
      return;
    }
    if (phone.replace(/\D/g, "").length < 10) {
      setError("Please enter a valid phone number with at least 10 digits.");
      return;
    }
    if (!/^\d{2}\/\d{2}\/\d{4}$/.test(birthdayValue)) {
      setError("Please enter your birthday as MM/DD/YYYY.");
      return;
    }
    if (!state) {
      setError("Please select your state.");
      return;
    }
    if (!/^\d{5}(-\d{4})?$/.test(zip)) {
      setError("Please enter a valid 5-digit ZIP code.");
      return;
    }

    if (!tcpa) {
      setError("Please confirm the TCPA consent checkbox so we can contact you.");
      return;
    }

    setStatus("submitting");

    const payload = {
      name,
      phone,
      email,
      birthday: birthdayValue,
      address,
      city,
      state,
      zip,
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
              <label htmlFor="birthday">
                Birthday <span className="optin-req">*</span>
              </label>
              <input
                id="birthday"
                name="birthday"
                type="text"
                inputMode="numeric"
                placeholder="MM/DD/YYYY"
                autoComplete="bday"
                value={birthday}
                onChange={(e) => setBirthday(formatBirthdayInput(e.target.value))}
                maxLength={10}
                pattern="\d{2}/\d{2}/\d{4}"
                title="Enter your birthday as MM/DD/YYYY."
                required
              />
            </div>

            <div className="optin-field">
              <label htmlFor="address">
                Street address <span className="optin-req">*</span>
              </label>
              <input
                id="address"
                name="address"
                type="text"
                placeholder="123 Main St, Apt 4"
                autoComplete="street-address"
                required
              />
            </div>

            <div className="optin-row">
              <div className="optin-field optin-col-city">
                <label htmlFor="city">
                  City <span className="optin-req">*</span>
                </label>
                <input
                  id="city"
                  name="city"
                  type="text"
                  placeholder="Los Angeles"
                  autoComplete="address-level2"
                  required
                />
              </div>

              <div className="optin-field optin-col-state">
                <label htmlFor="state">
                  State <span className="optin-req">*</span>
                </label>
                <select
                  id="state"
                  name="state"
                  autoComplete="address-level1"
                  defaultValue=""
                  required
                >
                  <option value="" disabled>
                    State
                  </option>
                  {US_STATES.map(([code, name]) => (
                    <option key={code} value={code}>
                      {name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="optin-field optin-col-zip">
                <label htmlFor="zip">
                  ZIP <span className="optin-req">*</span>
                </label>
                <input
                  id="zip"
                  name="zip"
                  type="text"
                  inputMode="numeric"
                  placeholder="90001"
                  autoComplete="postal-code"
                  pattern="\d{5}(-\d{4})?"
                  title="Enter a 5-digit ZIP code."
                  required
                />
              </div>
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
                <input type="checkbox" id="account_texts" name="account_texts" />
                <label htmlFor="account_texts">
                  <b>Account &amp; care texts (recommended).</b> Express consent to receive recurring
                  automated service updates and account notification texts from InstaRx. Message and
                  data rates may apply. Frequency varies up to ~6 msgs/mo. Reply <b>STOP</b> to opt
                  out or <b>HELP</b> for more info. Consent is <b>not</b> required for purchasing
                  products or services. The number will not be shared with third parties or
                  affiliates. See our <a href="/policies/terms-and-conditions">Terms of Service</a>,{" "}
                  <a href="/policies/privacy-policy">Privacy Policy</a>, and{" "}
                  <a href="/policies/terms-and-conditions">SMS Terms</a>.
                </label>
              </div>

              <div className="optin-check">
                <input type="checkbox" id="marketing_texts" name="marketing_texts" />
                <label htmlFor="marketing_texts">
                  <b>Marketing &amp; offers texts.</b> Consent to receive marketing communications and
                  promotions to the phone number provided.
                </label>
              </div>

              <div className="optin-check">
                <input type="checkbox" id="tcpa_consent" name="tcpa_consent" />
                <label htmlFor="tcpa_consent">
                  <b>TCPA consent.</b> By checking this box, I agree that InstaRx and its care
                  partners may contact me at the number provided using an automatic telephone dialing
                  system or prerecorded/AI voice. I confirm this is my number and I am 18+. I have
                  read the <a href="/policies/privacy-policy">Privacy Policy</a>.
                </label>
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
