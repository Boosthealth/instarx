'use client';

import { FormHeader } from '@/app/components/FormHeader';
import { Button } from '@/app/components/ui/button';
import { CheckboxItem } from '@/app/components/ui/checkbox-item';
import { FieldError } from '@/app/components/ui/field-error';
import { FormInput } from '@/app/components/ui/form-input';
import { FullRadioButton } from '@/app/components/ui/full-radio-button';
import { calcBMI, getBMICategory } from '@/app/lib/bmi';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

// ---- Schema ----

const formSchema = z.object({
  primaryHealthGoal: z.string().min(1, 'Please select your primary health goal'),
  mainReason: z.string().min(1, 'Please select your main reason'),
  state: z.string().min(1, 'Please select your state'),
  dateOfBirth: z
    .string()
    .min(1, 'Date of birth is required')
    .regex(/^\d{2}-\d{2}-\d{4}$/, 'Please use MM-DD-YYYY format')
    .refine((v) => {
      const [m, d, y] = v.split('-').map(Number);
      if (!m || !d || !y) return false;
      const dob = new Date(y, m - 1, d);
      const today = new Date();
      let age = today.getFullYear() - dob.getFullYear();
      const mo = today.getMonth() - dob.getMonth();
      if (mo < 0 || (mo === 0 && today.getDate() < dob.getDate())) age--;
      return age >= 18;
    }, 'You must be at least 18 years old'),
  email: z.string().min(1, 'Email is required').email('Please enter a valid email'),
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  phone: z
    .string()
    .min(1, 'Phone number is required')
    .refine((v) => v.replace(/\D/g, '').length === 10, 'Please enter a valid US phone number'),
  consent: z.boolean().refine((v) => v === true, 'You must agree to continue'),
  weightLbs: z
    .string()
    .min(1, 'Weight is required')
    .refine((v) => !isNaN(parseFloat(v)) && parseFloat(v) > 0, 'Weight must be greater than 0'),
  feet: z
    .string()
    .min(1, 'Feet is required')
    .refine((v) => { const n = parseInt(v); return !isNaN(n) && n >= 3 && n <= 7; }, 'Feet must be 3–7'),
  inches: z
    .string()
    .min(1, 'Inches is required')
    .refine((v) => { const n = parseInt(v); return !isNaN(n) && n >= 0 && n <= 11; }, 'Inches must be 0–11'),
  weightLossGoal: z.string().min(1, 'Please select your weight loss goal'),
  bariatricSurgery: z.string().min(1, 'Please select an option'),
  surgeryWithin6Months: z.string().optional(),
  surgeryDetails: z.string().optional(),
  healthConditions: z.array(z.string()).min(1, 'Please select at least one option'),
  hasOtherConditions: z.string().min(1, 'Please select an option'),
  otherConditionsDetails: z.string().optional(),
  glp1Conditions: z.array(z.string()).min(1, 'Please select at least one option'),
  glp1ConditionsDetails: z.string().optional(),
}).superRefine((data, ctx) => {
  if (data.bariatricSurgery === 'yes' && data.surgeryWithin6Months === 'no' && !data.surgeryDetails?.trim()) {
    ctx.addIssue({ code: 'custom', path: ['surgeryDetails'], message: 'Please provide details about your surgery' });
  }
});

type FormSchema = z.infer<typeof formSchema>;

// ---- Constants ----

const STORAGE_KEY = 'glp1_form';
const TOTAL_STEPS = 14;

const DEFAULT_VALUES: FormSchema = {
  primaryHealthGoal: '',
  mainReason: '',
  state: '',
  dateOfBirth: '',
  email: '',
  firstName: '',
  lastName: '',
  phone: '',
  consent: false,
  weightLbs: '',
  feet: '',
  inches: '',
  weightLossGoal: '',
  bariatricSurgery: '',
  surgeryWithin6Months: '',
  surgeryDetails: '',
  healthConditions: [],
  hasOtherConditions: '',
  otherConditionsDetails: '',
  glp1Conditions: [],
  glp1ConditionsDetails: '',
};

const US_STATES = [
  'Alabama AL', 'Alaska AK', 'Arizona AZ', 'Arkansas AR', 'California CA',
  'Colorado CO', 'Connecticut CT', 'Delaware DE', 'District of Columbia DC', 'Florida FL',
  'Georgia GA', 'Hawaii HI', 'Idaho ID', 'Illinois IL', 'Indiana IN',
  'Iowa IA', 'Kansas KS', 'Kentucky KY', 'Louisiana LA', 'Maine ME',
  'Maryland MD', 'Massachusetts MA', 'Michigan MI', 'Minnesota MN', 'Mississippi MS',
  'Missouri MO', 'Montana MT', 'Nebraska NE', 'Nevada NV', 'New Hampshire NH',
  'New Jersey NJ', 'New Mexico NM', 'New York NY', 'North Carolina NC', 'North Dakota ND',
  'Ohio OH', 'Oklahoma OK', 'Oregon OR', 'Pennsylvania PA', 'Rhode Island RI',
  'South Carolina SC', 'South Dakota SD', 'Tennessee TN', 'Texas TX', 'Utah UT',
  'Vermont VT', 'Virginia VA', 'Washington WA', 'West Virginia WV', 'Wisconsin WI',
  'Wyoming WY',
];

const HEALTH_CONDITIONS = [
  'None of the below',
  'Gallbladder disease',
  'Seizures',
  'Type 2 diabetes (on insulin), diabetic retinopathy (diabetic eye disease), damage to the optic nerve from trauma or reduced blood flow, or blindness',
  'Tumor/infection in brain/spinal cord',
  'Kidney disease',
  'Elevated resting heart rate (tachycardia), QT prolongation, or other arrhythmias',
  'Human immunodeficiency virus (HIV)',
  'Elevated IGFR (insulin-like growth factor) levels',
  'Untreated hypothyroidism',
];

const GLP1_CONDITIONS = [
  'None of the below',
  'Gastroparesis (Paralysis of your intestines)',
  'Triglycerides over 600 at any point',
  'Pancreatic cancer',
  'Pancreatitis',
  'Type 1 Diabetes',
  'Hypoglycemia (low blood sugar)',
  'Family history of thyroid cancer',
  'Personal or family history of Multiple Endocrine Neoplasia (MEN-2) syndrome',
  'Anorexia or bulimia',
  'Leber optic nerve atrophy',
  'Cyanocobalamin hypersensitivity (allergy to vitamin B12)',
  'Benzyl Alcohol Allergy',
];

export default function GLP1WeightLossNewForm() {
  'use no memo';
  const [step, setStep] = useState(() => {
    if (typeof window === 'undefined') return 1;
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY);
      if (!saved) return 1;
      const parsed = JSON.parse(saved) as { step: number; data: FormSchema };
      return parsed.step ?? 1;
    } catch {
      return 1;
    }
  });
  const [disqualified, setDisqualified] = useState(false);
  const [disqualifiedFromStep, setDisqualifiedFromStep] = useState(0);
  const [stateSearch, setStateSearch] = useState('');

  const {
    register,
    setValue,
    watch,
    trigger,
    reset,
    getValues,
    formState: { errors },
  } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: DEFAULT_VALUES,
    mode: 'onTouched',
  });

  const [
    primaryHealthGoal,
    mainReason,
    state,
    weightLbs,
    feet,
    inches,
    weightLossGoal,
    bariatricSurgery,
    surgeryWithin6Months,
    healthConditions,
    hasOtherConditions,
    glp1Conditions,
    // eslint-disable-next-line react-hooks/incompatible-library
  ] = watch([
    'primaryHealthGoal',
    'mainReason',
    'state',
    'weightLbs',
    'feet',
    'inches',
    'weightLossGoal',
    'bariatricSurgery',
    'surgeryWithin6Months',
    'healthConditions',
    'hasOtherConditions',
    'glp1Conditions',
  ]);

  const bmi = useMemo(() => calcBMI(feet, inches, weightLbs), [feet, inches, weightLbs]);

  const filteredStates = useMemo(
    () =>
      stateSearch.trim()
        ? US_STATES.filter((s) => s.toLowerCase().includes(stateSearch.toLowerCase()))
        : US_STATES,
    [stateSearch],
  );

  // Restore form values from sessionStorage after hydration
  useEffect(() => {
    const saved = sessionStorage.getItem(STORAGE_KEY);
    if (!saved) return;
    try {
      const parsed = JSON.parse(saved) as { step: number; data: FormSchema };
      reset(parsed.data ?? DEFAULT_VALUES);
    } catch {
      // ignore corrupt session data
    }
  }, [reset]);

  // ---- Navigation ----

  const persist = (s: number) => {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ step: s, data: getValues() }));
  };

  const advance = async (fields: (keyof FormSchema)[], nextStep: number) => {
    if (fields.length > 0) {
      const valid = await trigger(fields);
      if (!valid) return;
    }
    setStep(nextStep);
    persist(nextStep);
    window.scrollTo({ top: 0 });
  };

  const advanceSilent = (nextStep: number) => {
    setStep(nextStep);
    persist(nextStep);
    window.scrollTo({ top: 0 });
  };

  const goBack = () => {
    if (disqualified) {
      setDisqualified(false);
      setStep(disqualifiedFromStep);
      return;
    }
    const prev = Math.max(1, step - 1);
    setStep(prev);
    persist(prev);
    window.scrollTo({ top: 0 });
  };

  // ---- Field helpers ----

  const selectSingle = (field: keyof FormSchema, value: string) => {
    setValue(field, value, { shouldValidate: true, shouldDirty: true });
  };

  const toggleCondition = (field: 'healthConditions' | 'glp1Conditions', value: string) => {
    const current: string[] = getValues(field) ?? [];
    const isNone = value === 'None of the below';
    let next: string[];
    if (isNone) {
      next = ['None of the below'];
    } else {
      const without = current.filter((v) => v !== 'None of the below');
      next = without.includes(value) ? without.filter((v) => v !== value) : [...without, value];
    }
    setValue(field, next, { shouldValidate: true, shouldDirty: true });
  };

  // ---- Step handlers ----

  const handleBariatricContinue = async () => {
    const fields: (keyof FormSchema)[] = ['bariatricSurgery', 'surgeryWithin6Months'];
    if (surgeryWithin6Months === 'no') fields.push('surgeryDetails');
    const valid = await trigger(fields);
    if (!valid) return;
    if (surgeryWithin6Months === 'yes') {
      setDisqualified(true);
      setDisqualifiedFromStep(10);
      window.scrollTo({ top: 0 });
      return;
    }
    advanceSilent(11);
  };

  const handleGLP1Conditions = async () => {
    const valid = await trigger(['glp1Conditions']);
    if (!valid) return;
    const hasDisqualifying = glp1Conditions.some((c) => c !== 'None of the below');
    if (hasDisqualifying) {
      setDisqualified(true);
      setDisqualifiedFromStep(13);
      window.scrollTo({ top: 0 });
      return;
    }
    advanceSilent(14);
  };

  const progress = (step / TOTAL_STEPS) * 100;

  return (
    <div className="form-page min-h-screen bg-[#f5f5f7] flex flex-col">
      <FormHeader
        showBack={step > 1 || disqualified}
        onBack={goBack}
        progress={progress}
      />

      <main className="flex-1 flex flex-col items-center py-10 px-4">
        <div className="w-full max-w-150 flex flex-col gap-6">

          {/* STEP 1 — Primary health goal */}
          {step === 1 && !disqualified && (
            <>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  What is your primary health goal?
                </h1>
                <p className="text-gray-500 text-lg mt-1">
                  Select the one that matters most to you
                </p>
              </div>
              <div className="flex flex-col gap-3">
                {[
                  'Lose weight',
                  'Improve general physical health',
                  'Improve another health condition',
                  'Increase confidence about my appearance',
                  'Increase energy for daily activities',
                  'Other',
                ].map((option) => (
                  <FullRadioButton
                    key={option}
                    label={option}
                    selected={primaryHealthGoal === option}
                    onClick={() => selectSingle('primaryHealthGoal', option)}
                  />
                ))}
              </div>
              <FieldError message={errors.primaryHealthGoal?.message} />
              <Button onClick={() => advance(['primaryHealthGoal'], 2)}>Continue →</Button>
            </>
          )}

          {/* STEP 2 — Intro */}
          {step === 2 && !disqualified && (
            <>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 leading-snug">
                  Join thousands of GLP-1 success stories on their weight loss journey
                </h1>
                <p className="text-gray-500 text-lg mt-2 mb-10">
                  Let&apos;s answer a few quick questions to kickstart yours!
                </p>
              </div>
              <Button onClick={() => advanceSilent(3)}>Next</Button>
            </>
          )}

          {/* STEP 3 — Main reason */}
          {step === 3 && !disqualified && (
            <>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  What is the main reason you decided you want to make a change?
                </h1>
                <p className="text-gray-500 text-lg mt-2">
                  Pick the option that is most important to you. (We can assist with all of these!)
                </p>
              </div>
              <div className="flex flex-col gap-3">
                {[
                  'I want to increase my life expectancy',
                  'I want to improve my appearance',
                  'I want to minimize my health risks',
                  'I want to boost my mental health',
                ].map((option) => (
                  <FullRadioButton
                    key={option}
                    label={option}
                    selected={mainReason === option}
                    onClick={() => selectSingle('mainReason', option)}
                  />
                ))}
              </div>
              <FieldError message={errors.mainReason?.message} />
              <Button onClick={() => advance(['mainReason'], 4)}>Continue →</Button>
            </>
          )}

          {/* STEP 4 — Metabolism info */}
          {step === 4 && !disqualified && (
            <>
              <h1 className="text-3xl font-bold text-gray-900 leading-snug">
                Better metabolism supports longevity and all-round wellbeing
              </h1>
              <div className="flex flex-col gap-6">
                {[
                  { icon: 'export.svg', text: 'Weight loss may support overall health and longevity' },
                  { icon: 'export-2.svg', text: 'Managing blood sugar may help reduce cardiovascular risk' },
                  { icon: 'export-3.svg', text: 'Weight management may help reduce diabetes-related risks' },
                ].map((item) => (
                  <div key={item.icon} className="flex items-start gap-4">
                    <Image src={`/icons/${item.icon}`} alt="" width={32} height={32} className="shrink-0 mt-1" />
                    <p className="text-gray-700 text-lg">{item.text}</p>
                  </div>
                ))}
              </div>
              <Button onClick={() => advanceSilent(5)}>Continue →</Button>
            </>
          )}

          {/* STEP 5 — State */}
          {step === 5 && !disqualified && (
            <>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  What state do you live in?
                </h1>
                <p className="text-gray-500 text-lg mt-2">
                  We need to verify our services are available in your location
                </p>
              </div>
              <input
                type="text"
                placeholder="Search states..."
                value={stateSearch}
                onChange={(e) => setStateSearch(e.target.value)}
                className="w-full bg-white border-2 rounded-2xl px-4 py-3 text-gray-900 outline-none focus:border-primary transition-colors border-gray-200"
              />
              <div className="flex flex-col gap-2 max-h-96 overflow-y-auto">
                {filteredStates.map((s) => (
                  <FullRadioButton
                    key={s}
                    label={s}
                    selected={state === s}
                    onClick={() => selectSingle('state', s)}
                  />
                ))}
              </div>
              <FieldError message={errors.state?.message} />
              <Button onClick={() => advance(['state'], 6)}>Continue →</Button>
            </>
          )}

          {/* STEP 6 — Date of birth */}
          {step === 6 && !disqualified && (
            <>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  What&apos;s your date of birth?
                </h1>
                <p className="text-gray-500 text-sm mt-1">
                  We need to verify you&apos;re at least 18 years old
                </p>
              </div>
              <FormInput
                type="text"
                inputMode="numeric"
                placeholder="MM-DD-YYYY"
                maxLength={10}
                error={errors.dateOfBirth?.message}
                {...register('dateOfBirth', {
                  onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                    const digits = e.target.value.replace(/\D/g, '').slice(0, 8);
                    let formatted = digits;
                    if (digits.length > 4) {
                      formatted = `${digits.slice(0, 2)}-${digits.slice(2, 4)}-${digits.slice(4)}`;
                    } else if (digits.length > 2) {
                      formatted = `${digits.slice(0, 2)}-${digits.slice(2)}`;
                    }
                    setValue('dateOfBirth', formatted, { shouldValidate: false, shouldDirty: true });
                  },
                })}
              />
              <Button onClick={() => advance(['dateOfBirth'], 7)}>Continue →</Button>
            </>
          )}

          {/* STEP 7 — Create account */}
          {step === 7 && !disqualified && (
            <>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Create your account</h1>
                <p className="text-gray-500 text-lg mt-2">Just a few details to get you started</p>
              </div>
              <FormInput
                label="Email"
                type="email"
                placeholder="Enter your email"
                error={errors.email?.message}
                {...register('email')}
              />
              <div className="flex gap-4">
                <FormInput
                  label="First Name"
                  type="text"
                  placeholder="John"
                  error={errors.firstName?.message}
                  {...register('firstName')}
                />
                <FormInput
                  label="Last Name"
                  type="text"
                  placeholder="Doe"
                  error={errors.lastName?.message}
                  {...register('lastName')}
                />
              </div>
              <FormInput
                label="Mobile Number"
                type="tel"
                inputMode="numeric"
                placeholder="(555) 555-4567"
                maxLength={14}
                error={errors.phone?.message}
                {...register('phone', {
                  onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                    const digits = e.target.value.replace(/\D/g, '').slice(0, 10);
                    let formatted = digits;
                    if (digits.length > 6) {
                      formatted = `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
                    } else if (digits.length > 3) {
                      formatted = `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
                    } else if (digits.length > 0) {
                      formatted = `(${digits}`;
                    }
                    setValue('phone', formatted, { shouldValidate: false, shouldDirty: true });
                  },
                })}
              />
              <div className="flex items-start gap-3">
                <input
                  id="consent"
                  type="checkbox"
                  className="mt-1 w-4 h-4 shrink-0 cursor-pointer accent-primary"
                  {...register('consent')}
                />
                <label htmlFor="consent" className="text-xs text-gray-600 leading-relaxed cursor-pointer">
                  By pressing the Create Account button (1) you understand that using an electronic
                  signature to express written consent to receive emails, telephone calls, artificial
                  or pre-recorded messages from InstaRx LLC, its affiliates, and/or any{' '}
                  <a href="/policies/third-party-partners" className="text-primary underline">
                    third-party partners
                  </a>{' '}
                  (or service provider partners on their behalf); (2) you understand that you may be
                  contacted at the email address and/or telephone number you provided, including your
                  wireless phone number (if provided) utilizing an automated telephone dialing system
                  or robocall, even if you are on a government do-not-call registry, and (3) you agree
                  to this website&apos;s{' '}
                  <a href="/policies/privacy-policy" className="text-primary underline">
                    Privacy Policy
                  </a>{' '}
                  and{' '}
                  <a href="/policies/terms-and-conditions" className="text-primary underline">
                    Terms of Use
                  </a>
                  . You acknowledge your understanding that the provision of false information may
                  subject you to liability. You understand that your consent is not required as a
                  condition of purchase and that you may revoke your consent at any time. Message and
                  data rates may apply.{' '}
                  <a href="/glp1-info" className="text-primary underline">
                    Please read the following about all GLP-1s
                  </a>
                  .
                </label>
              </div>
              <FieldError message={errors.consent?.message} />
              <Button
                onClick={() =>
                  advance(['email', 'firstName', 'lastName', 'phone', 'consent'], 8)
                }
              >
                Create Account →
              </Button>
            </>
          )}

          {/* STEP 8 — Height / Weight */}
          {step === 8 && !disqualified && (
            <>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  What is your current height and weight?
                </h1>
                <p className="text-gray-500 text-lg mt-2">
                  We&apos;ll calculate your BMI to check your eligibility
                </p>
              </div>
              <FormInput
                label="Weight (pounds)"
                type="number"
                placeholder="Enter your weight"
                error={errors.weightLbs?.message}
                {...register('weightLbs')}
              />
              <div>
                <p className="text-gray-900 font-medium mb-3">Height</p>
                <div className="flex gap-4">
                  <div className="flex-1">
                    <FormInput
                      type="number"
                      placeholder="Feet"
                      error={errors.feet?.message}
                      {...register('feet')}
                    />
                    <p className="text-gray-500 text-sm mt-1">Feet</p>
                  </div>
                  <div className="flex-1">
                    <FormInput
                      type="number"
                      placeholder="Inches"
                      error={errors.inches?.message}
                      {...register('inches')}
                    />
                    <p className="text-gray-500 text-sm mt-1">Inches</p>
                  </div>
                </div>
              </div>
              {bmi > 0 && (
                <div>
                  <p className="text-gray-500 text-sm mb-2">Your BMI Result</p>
                  <div className="bg-white rounded-2xl px-5 py-3 border border-gray-200 text-center text-gray-900 font-semibold mb-3">
                    {bmi} — {getBMICategory(bmi)}
                  </div>
                  <div className="grid grid-cols-4 gap-1 text-xs text-gray-500 text-center">
                    <span>Underweight<br />&lt;18.5</span>
                    <span>Normal<br />18.5–24.9</span>
                    <span>Overweight<br />25–29.9</span>
                    <span>Obese<br />≥30</span>
                  </div>
                </div>
              )}
              <Button onClick={() => advance(['weightLbs', 'feet', 'inches'], 9)}>
                Continue →
              </Button>
            </>
          )}

          {/* STEP 9 — Weight loss goal */}
          {step === 9 && !disqualified && (
            <>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  What is your weight loss goal?
                </h1>
                <p className="text-gray-500 text-lg mt-2">
                  This helps us determine the best treatment plan for you.
                </p>
              </div>
              <div className="flex flex-col gap-3">
                {['1-20 lbs', '21-50 lbs', '50+ lbs', "I haven't decided yet"].map((option) => (
                  <FullRadioButton
                    key={option}
                    label={option}
                    selected={weightLossGoal === option}
                    onClick={() => selectSingle('weightLossGoal', option)}
                  />
                ))}
              </div>
              <FieldError message={errors.weightLossGoal?.message} />
              <Button onClick={() => advance(['weightLossGoal'], 10)}>Continue →</Button>
            </>
          )}

          {/* STEP 10 — Bariatric surgery */}
          {step === 10 && !disqualified && (
            <>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Have you undergone bariatric or gastric bypass surgery?
                </h1>
                <p className="text-gray-500 text-lg mt-2">
                  This helps us ensure your safety and determine the best treatment option
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <FullRadioButton
                  label="No"
                  selected={bariatricSurgery === 'no'}
                  onClick={() => {
                    selectSingle('bariatricSurgery', 'no');
                    advanceSilent(11);
                  }}
                />
                <FullRadioButton
                  label="Yes"
                  selected={bariatricSurgery === 'yes'}
                  onClick={() => selectSingle('bariatricSurgery', 'yes')}
                />
              </div>

              {bariatricSurgery === 'yes' && (
                <>
                  <div>
                    <p className="text-gray-900 font-medium mb-3">
                      Was the surgery within the past 6 months?
                    </p>
                    <div className="flex flex-col gap-3">
                      <FullRadioButton
                        label="No"
                        selected={surgeryWithin6Months === 'no'}
                        onClick={() => selectSingle('surgeryWithin6Months', 'no')}
                      />
                      <FullRadioButton
                        label="Yes"
                        selected={surgeryWithin6Months === 'yes'}
                        onClick={() => selectSingle('surgeryWithin6Months', 'yes')}
                      />
                    </div>
                  </div>

                  {surgeryWithin6Months === 'no' && (
                    <div className="flex flex-col gap-1">
                      <p className="text-gray-900 font-medium mb-1">
                        Please share details about your surgery
                      </p>
                      <textarea
                        {...register('surgeryDetails')}
                        placeholder="Type details about your procedure, date, or recovery..."
                        rows={4}
                        className="w-full bg-white border border-gray-200 rounded-2xl px-4 py-3 text-gray-900 outline-none focus:border-primary transition-colors resize-none"
                      />
                      <FieldError message={errors.surgeryDetails?.message} />
                    </div>
                  )}

                  {surgeryWithin6Months && (
                    <Button onClick={handleBariatricContinue}>Continue →</Button>
                  )}
                </>
              )}
            </>
          )}

          {/* STEP 11 — Health conditions */}
          {step === 11 && !disqualified && (
            <>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Do you have any of these conditions?
                </h1>
                <p className="text-gray-500 text-lg mt-2">This helps to ensure your safety</p>
              </div>
              <div className="flex flex-col gap-2">
                {HEALTH_CONDITIONS.map((condition) => (
                  <CheckboxItem
                    key={condition}
                    label={condition}
                    checked={healthConditions?.includes(condition) ?? false}
                    onClick={() => toggleCondition('healthConditions', condition)}
                  />
                ))}
              </div>
              <FieldError message={errors.healthConditions?.message} />
              <Button onClick={() => advance(['healthConditions'], 12)}>Continue →</Button>
            </>
          )}

          {/* STEP 12 — Other medical conditions */}
          {step === 12 && !disqualified && (
            <>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Do you have any other medical conditions not already listed?
                </h1>
                <p className="text-gray-500 text-sm mt-1">
                  Be as specific as possible with any relevant details
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <FullRadioButton
                  label="No"
                  selected={hasOtherConditions === 'no'}
                  onClick={() => selectSingle('hasOtherConditions', 'no')}
                />
                <FullRadioButton
                  label="Yes"
                  selected={hasOtherConditions === 'yes'}
                  onClick={() => selectSingle('hasOtherConditions', 'yes')}
                />
              </div>
              {hasOtherConditions === 'yes' && (
                <div>
                  <p className="text-gray-900 font-medium mb-2">
                    List any additional medical conditions:
                  </p>
                  <textarea
                    {...register('otherConditionsDetails')}
                    placeholder="List any other medical conditions..."
                    rows={4}
                    className="w-full bg-gray-100 border border-gray-200 rounded-2xl px-4 py-3 text-gray-900 outline-none focus:border-primary transition-colors resize-none"
                  />
                </div>
              )}
              <FieldError message={errors.hasOtherConditions?.message} />
              {hasOtherConditions && (
                <Button onClick={() => advance(['hasOtherConditions'], 13)}>Continue →</Button>
              )}
            </>
          )}

          {/* STEP 13 — GLP-1 specific conditions */}
          {step === 13 && !disqualified && (
            <>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Do any of these apply to you?
                </h1>
                <p className="text-gray-500 text-sm mt-1">
                  These conditions may affect your eligibility for treatment
                </p>
              </div>
              <div className="flex flex-col gap-2">
                {GLP1_CONDITIONS.map((condition) => (
                  <CheckboxItem
                    key={condition}
                    label={condition}
                    checked={glp1Conditions?.includes(condition) ?? false}
                    onClick={() => toggleCondition('glp1Conditions', condition)}
                  />
                ))}
              </div>
              <div>
                <p className="text-gray-700 text-sm font-medium mb-2">
                  Tell us more about these conditions
                </p>
                <textarea
                  {...register('glp1ConditionsDetails')}
                  placeholder="Share any details that may help us understand your situation..."
                  rows={3}
                  className="w-full bg-gray-100 border border-gray-200 rounded-2xl px-4 py-3 text-gray-900 outline-none focus:border-primary transition-colors resize-none"
                />
              </div>
              <FieldError message={errors.glp1Conditions?.message} />
              <Button onClick={handleGLP1Conditions}>Continue →</Button>
            </>
          )}

          {/* STEP 14 — Completion placeholder */}
          {step === 14 && !disqualified && (
            <div className="flex flex-col items-center text-center py-8 gap-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M20 6L9 17l-5-5"
                    stroke="#16a34a"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-gray-900">You&apos;re all set!</h1>
              <p className="text-gray-600">
                We&apos;re preparing your personalized plan.
              </p>
            </div>
          )}

          {/* DISQUALIFICATION */}
          {disqualified && (
            <div className="flex flex-col gap-5 py-8">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="#ef4444" strokeWidth="2" />
                  <path
                    d="M15 9l-6 6M9 9l6 6"
                    stroke="#ef4444"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <h1 className="text-3xl font-bold text-gray-900">Not Eligible for Treatment</h1>
              <p className="text-gray-600">
                Based on your responses, you may not be eligible for treatment at this time. This
                is for your safety and wellbeing.
              </p>
              <Button
                onClick={() => {
                  setDisqualified(false);
                  if (disqualifiedFromStep === 10) {
                    setValue('bariatricSurgery', '', { shouldDirty: true });
                    setValue('surgeryWithin6Months', '', { shouldDirty: true });
                  } else if (disqualifiedFromStep === 13) {
                    setValue('glp1Conditions', [], { shouldDirty: true });
                    setValue('glp1ConditionsDetails', '', { shouldDirty: true });
                  }
                  setStep(disqualifiedFromStep);
                  persist(disqualifiedFromStep);
                  window.scrollTo({ top: 0 });
                }}
              >
                Review My Answers →
              </Button>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}
