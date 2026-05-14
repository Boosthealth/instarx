'use client';

import { FormHeader } from '@/app/components/FormHeader';
import { SelectionCard } from '@/app/components/SelectionCard';
import { Button } from '@/app/components/ui/button';
import { FieldError } from '@/app/components/ui/field-error';
import { FormInput } from '@/app/components/ui/form-input';
import { RadioOption } from '@/app/components/ui/radio-option';
import { calcBMI } from '@/app/lib/bmi';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

// ---- Schema ----

const formSchema = z.object({
  feet: z
    .string()
    .min(1, 'Feet is required')
    .refine((v) => {
      const n = parseInt(v);
      return !isNaN(n) && n >= 3 && n <= 7;
    }, 'Feet must be a whole number from 3 to 7'),
  inches: z
    .string()
    .min(1, 'Inches is required')
    .refine((v) => {
      const n = parseInt(v);
      return !isNaN(n) && n >= 0 && n <= 11;
    }, 'Inches must be from 0 to 11'),
  weightLbs: z
    .string()
    .min(1, 'Weight is required')
    .refine((v) => {
      const n = parseFloat(v);
      return !isNaN(n) && n >= 1 && n <= 500;
    }, 'Weight must be between 1 and 500 lbs'),
  goalWeight: z
    .string()
    .min(1, 'Goal weight is required')
    .refine((v) => {
      const n = parseFloat(v);
      return !isNaN(n) && n >= 1 && n <= 500;
    }, 'Please enter a goal weight between 1 and 500 lbs'),
  gender: z.string().min(1, 'Please select your gender'),
  symptoms: z.array(z.string()).min(1, 'Please select at least one option'),
  primaryGoal: z.string().min(1, 'Please select your goal'),
  primaryReason: z.string().min(1, 'Please select a reason'),
  pace: z.string().min(1, 'Please select your preferred pace'),
  sleepQuality: z.string().min(1, 'Please select your sleep quality'),
  sleepHours: z.string().min(1, 'Please select your sleep hours'),
  medicalConditions: z.array(z.string()).min(1, 'Please select at least one option'),
});

type FormSchema = z.infer<typeof formSchema>;

// ---- Constants ----

const STORAGE_KEY = 'intake_new_form';
const TOTAL_STEPS = 16;

const DEFAULT_VALUES: FormSchema = {
  feet: '',
  inches: '',
  weightLbs: '',
  goalWeight: '',
  gender: '',
  symptoms: [],
  primaryGoal: '',
  primaryReason: '',
  pace: '',
  sleepQuality: '',
  sleepHours: '',
  medicalConditions: [],
};

const MEDICAL_CONDITIONS = [
  'None of these',
  'History of or current pancreatitis',
  'Type 1 or Insulin-dependent diabetes',
  'Severe gastrointestinal condition (gastroparesis, blockage, inflammatory bowel disease)',
  'Personal or family history of thyroid cyst/nodule/cancer, thyroid cancer, medullary thyroid carcinoma, or multiple endocrine neoplasia syndrome type 2',
  'Anorexia or bulimia',
  'Current symptomatic gallstones',
  'Triglycerides over 600 at any point',
  'Hypoglycemia (low blood sugar)',
  'Allergic to any GLP-1 medications (Ozempic, Wegovy, Mounjaro, Zepbound, Saxenda, or Trulicity)',
  'Leber optic nerve atrophy',
  'Cyanocobalamin hypersensitivity (allergy to vitamin B12)',
  'Benzyl Alcohol Allergy',
  'History of diabetic retinopathy, liver disease/cirrhosis, or Leber Hereditary Optic Neuropathy (LHON)',
  'Other medication allergies',
];

const MALE_SYMPTOMS = [
  { icon: 'low-libido.svg', label: 'Low libido' },
  { icon: 'hair-loss.svg', label: 'Hair loss' },
  { icon: 'skin-issues.svg', label: 'Skin issues' },
  { icon: 'cognition-issues.svg', label: 'Cognition issues' },
  { icon: 'ok.svg', label: 'None of these' },
];

const FEMALE_SYMPTOMS = [
  { icon: 'hair-loss.svg', label: 'Hair loss' },
  { icon: 'skin-issues.svg', label: 'Skin issues' },
  { icon: 'cognition-issues.svg', label: 'Cognition issues' },
  { icon: 'low-libido.svg', label: 'Low libido' },
  { icon: 'ok.svg', label: 'None of these' },
];

export default function IntakeNewForm() {
  'use no memo';
  const router = useRouter();
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
    feet,
    inches,
    weightLbs,
    goalWeight,
    gender,
    symptoms,
    primaryGoal,
    primaryReason,
    pace,
    sleepQuality,
    sleepHours,
    medicalConditions,
    // eslint-disable-next-line react-hooks/incompatible-library
  ] = watch([
    'feet',
    'inches',
    'weightLbs',
    'goalWeight',
    'gender',
    'symptoms',
    'primaryGoal',
    'primaryReason',
    'pace',
    'sleepQuality',
    'sleepHours',
    'medicalConditions',
  ]);

  const bmi = calcBMI(feet, inches, weightLbs);
  const weightDiff = Math.round(parseFloat(weightLbs || '0') - parseFloat(goalWeight || '0'));
  const weeksToGoal = weightDiff > 0 ? Math.ceil(weightDiff / 4.375) : 0;

  const symptomOptions = gender === 'male' ? MALE_SYMPTOMS : FEMALE_SYMPTOMS;

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
      return;
    }
    const prev = Math.max(1, step - 1);
    setStep(prev);
    persist(prev);
    window.scrollTo({ top: 0 });
  };

  // ---- Custom field helpers ----

  const toggleArrayValue = (field: 'symptoms' | 'medicalConditions', value: string) => {
    const current: string[] = getValues(field) ?? [];
    const isNone = value === 'None of these';
    let next: string[];
    if (isNone) {
      next = ['None of these'];
    } else {
      const without = current.filter((v) => v !== 'None of these');
      next = without.includes(value) ? without.filter((v) => v !== value) : [...without, value];
    }
    setValue(field, next, { shouldValidate: true, shouldDirty: true });
  };

  const selectSingle = (field: keyof FormSchema, value: string) => {
    setValue(field, value, { shouldValidate: true, shouldDirty: true });
  };

  // ---- Step handlers ----

  const handleMedicalConditions = async () => {
    const valid = await trigger(['medicalConditions']);
    if (!valid) return;
    const hasDisqualifying = medicalConditions.some((c) => c !== 'None of these');
    if (hasDisqualifying) {
      setDisqualified(true);
      window.scrollTo({ top: 0 });
      return;
    }
    sessionStorage.removeItem(STORAGE_KEY);
    router.push('/glp1-weight-loss-new');
  };

  const progress = (step / TOTAL_STEPS) * 100;

  return (
    <div className="form-page min-h-screen bg-[#f5f5f7] flex flex-col">
      <FormHeader
        showBack={step > 1 || disqualified}
        onBack={goBack}
        progress={progress}
        progressVariant="gradient"
      />

      <main className="flex-1 flex flex-col items-center py-10 px-4">
        <div className="w-full max-w-150 flex flex-col gap-6">

          {/* STEP 1 — BMI + hero image */}
          {step === 1 && (
            <>
              <div className="relative">
                <Image
                  src="/icons/intro.webp"
                  alt="Start your weight loss journey"
                  width={600}
                  height={400}
                  className="w-full rounded-2xl object-cover"
                  priority
                />
                <Image src="/logos/instarx-logo-inverse.png" alt="InstaRx logo" width={160} height={50} className="absolute bottom-4 left-4" />
              </div>
              <div>
                <h1 className="text-3xl text-gray-900 mb-2">
                  <span className="text-medium">Reach your goal weight fast</span><span className="text-primary font-semibold"> without restrictive diets and exercise.</span>
                </h1>
                <p className="text-lg text-gray-500 leading-relaxed">
                  Let&apos;s calculate your BMI to make sure you&apos;re a good candidate for medical weight loss.
                </p>
                <p className="mt-4 text-3xl">What is your height and weight?</p>
              </div>

              <div className="flex gap-4">
                <FormInput
                  label="Feet *"
                  type="number"
                  placeholder="5"
                  error={errors.feet?.message}
                  {...register('feet')}
                />
                <FormInput
                  label="Inches *"
                  type="number"
                  placeholder="6"
                  error={errors.inches?.message}
                  {...register('inches')}
                />
              </div>

              <FormInput
                label="Weight (lbs) *"
                type="number"
                placeholder="180"
                error={errors.weightLbs?.message}
                {...register('weightLbs')}
              />

              <Button onClick={() => advance(['feet', 'inches', 'weightLbs'], 2)}>
                Next →
              </Button>
            </>
          )}

          {/* STEP 2 — Goal weight + social proof */}
          {step === 2 && (
            <>
              <div>
                <p className="text-gray-500 mb-2">
                  Perfect! With a BMI of {bmi}, we can continue.
                </p>
                <h1 className="text-3xl text-gray-900">
                  <span className="font-medium">We&apos;re in this together.</span><span className="text-primary font-semibold">Your goal is our goal.</span>
                </h1>
                <p className="text-2xl text-gray-900 mt-5">
                  What is your goal weight?
                </p>
              </div>

              <FormInput
                label="Your goal weight (lbs)"
                type="number"
                placeholder="150"
                error={errors.goalWeight?.message}
                {...register('goalWeight')}
              />

              <Button onClick={() => advance(['goalWeight'], 3)}>Next →</Button>

              <Image
                src="/icons/10k.webp"
                alt="Join over 10,000 success stories"
                width={600}
                height={400}
                className="w-full rounded-2xl"
              />
            </>
          )}

          {/* STEP 3 — Gender */}
          {step === 3 && (
            <>
              <div>
                <h1 className="text-gray-900 text-2xl">
                  Medication can be tailored to{' '}
                  <span className="text-primary font-semibold">your unique needs,</span> so
                  let&apos;s get to know you a little better.
                </h1>
                <p className="text-2xl text-gray-900 mt-4">
                  Are you male or female?
                </p>
                <p className="text-gray-500 text-sm mt-1">
                  This helps us understand your body complexity and hormones so we can assess you
                  better.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: 'female', icon: 'female.svg', label: 'Female' },
                  { value: 'male', icon: 'male.svg', label: 'Male' },
                ].map((opt) => (
                  <SelectionCard
                    key={opt.value}
                    icon={opt.icon}
                    label={opt.label}
                    selected={gender === opt.value}
                    onClick={() => selectSingle('gender', opt.value)}
                  />
                ))}
              </div>

              <FieldError message={errors.gender?.message} />
              <Button onClick={() => advance(['gender'], 4)}>Next →</Button>
            </>
          )}

          {/* STEP 4 — Symptoms */}
          {step === 4 && (
            <>
              <h1 className="text-gray-700 text-3xl">
                {gender === 'male' ? 'Men' : 'Women'} experience{' '}
                <span className="text-primary font-semibold">unique effects</span> from weight
                gain.
              </h1>
              <p className="text-3xl text-gray-900 mt-2">
                Do you experience any of the following?
              </p>

              <div className="grid grid-cols-2 gap-3">
                {symptomOptions.map((s) => (
                  <SelectionCard
                    key={s.label}
                    icon={s.icon}
                    label={s.label}
                    selected={symptoms?.includes(s.label) ?? false}
                    onClick={() => toggleArrayValue('symptoms', s.label)}
                    multi
                  />
                ))}
              </div>

              <FieldError message={errors.symptoms?.message} />
              <Button onClick={() => advance(['symptoms'], 5)}>Next →</Button>
            </>
          )}

          {/* STEP 5 — Goals */}
          {step === 5 && (
            <>
              <h1 className="text-gray-700 text-3xl">
                We can support you with{' '}
                <span className="text-primary font-semibold">all of these,</span> but choose the
                most important for you.
              </h1>
              <p className="text-3xl text-gray-900 mt-2">
                Which of these is most important to you?
              </p>

              <div className="grid grid-cols-2 gap-3">
                {[
                  { value: 'lose_weight', icon: 'lose-weight.svg', label: 'Lose weight' },
                  { value: 'gain_muscle', icon: 'gain-muscle.svg', label: 'Gain muscle' },
                  { value: 'improve_health', icon: 'ok.svg', label: 'Maintain my current body' },
                ].map((opt) => (
                  <SelectionCard
                    key={opt.value}
                    icon={opt.icon}
                    label={opt.label}
                    selected={primaryGoal === opt.value}
                    onClick={() => selectSingle('primaryGoal', opt.value)}
                  />
                ))}
              </div>

              <FieldError message={errors.primaryGoal?.message} />
              <Button onClick={() => advance(['primaryGoal'], 6)}>Next →</Button>
            </>
          )}

          {/* STEP 6 — Rankings (info) */}
          {step === 6 && (
            <>
              <h1 className="mb-2 text-2xl text-gray-900">
                InstaRx is proud to be{' '}
                <span className="text-primary font-semibold">ranked #1</span>
              </h1>

              <Image
                src="/icons/banner_3.webp"
                alt="InstaRx ranked #1 — Real Patient Testimonials, Verified 5-Star Google Rating"
                width={600}
                height={480}
                className="w-full rounded-2xl"
              />

              <Button onClick={() => advanceSilent(7)}>Next →</Button>
            </>
          )}

          {/* STEP 7 — Metabolic science (info) */}
          {step === 7 && (
            <>
              <h1 className="text-gray-700 text-2xl">
                It feels like magic, but it&apos;s{' '}
                <span className="text-primary font-semibold">metabolic science.</span>
              </h1>
              <Image
                src="/icons/metabolic_science_final.svg"
                alt="Metabolic science chart"
                width={600}
                height={320}
                className="w-full rounded-2xl"
              />
              <div className="text-gray-700 text-lg space-y-2">
                <p>
                  On average, GLP-1 patients{' '}
                  <span className="font-bold">
                    lose over 22% of their body weight.
                  </span>
                </p>
                <p>
                  GLP-1 medications are{' '}
                  <span className="font-bold">extremely effective</span> —
                  offering you a strong path toward your{' '}
                  {weightDiff > 0 ? `${weightDiff} pound${weightDiff !== 1 ? 's' : ''}` : ''} goal weight.
                </p>
              </div>
              <Button onClick={() => advanceSilent(8)}>Next →</Button>
            </>
          )}

          {/* STEP 8 — Testimonial Lori */}
          {step === 8 && (
            <>
              <p className="text-3xl text-gray-900">
                &ldquo;Just to let you know I started at 209 and down to 181. I was a size 18 and
                now fit into a size 12/14. Yes, I am happy.&rdquo;
              </p>
              <Image
                src="/icons/ba_2.webp"
                alt="Lori before and after"
                width={600}
                height={420}
                className="w-full rounded-2xl object-cover"
              />
              <Button onClick={() => advanceSilent(9)}>Next →</Button>
            </>
          )}

          {/* STEP 9 — How GLP-1 works (info) */}
          {step === 9 && (
            <>
              <h1 className="text-3xl text-gray-900 text-center">
                How can GLP-1<br />
                <span className="text-primary font-semibold">work for you?</span>
              </h1>
              <Image
                src="/icons/how_will_it_work_for_you_final.svg"
                alt="How GLP-1 works"
                width={600}
                height={300}
                className="w-full rounded-2xl"
              />
              <div className="mt-2 text-gray-700 text-lg space-y-1">
                <p><strong>Week 1-4:</strong> Your body gets acclimated to GLP-1 medication</p>
                <p>
                  <strong>Week 4-8:</strong> Weight loss is increasing more and more
                </p>
                <p>
                  <strong>Week 9+:</strong> Your body has become a{' '}
                  <strong>fat burning machine</strong>
                </p>
              </div>
              <p className="text-gray-700 text-lg">
                We identify the root causes of your metabolic issues, so you get a{' '}
                <strong>long-term solution,</strong> not just another quick fix.
              </p>
              <Button onClick={() => advanceSilent(10)}>Next →</Button>
            </>
          )}

          {/* STEP 10 — Primary reason */}
          {step === 10 && (
            <>
              <p className="text-gray-900 text-3xl">
                Improving your life requires{' '}
                <span className="text-primary font-semibold">motivation.</span>
              </p>
              <h1 className="text-3xl text-gray-900 mt-3">
                What is your{' '}
                <span className="text-primary font-semibold">primary reason</span> for taking weight loss
                seriously?
              </h1>

              <div className="flex flex-col gap-3">
                {[
                  'I want to live longer',
                  'I want to feel and look better',
                  'I want to reduce current health issues',
                  'All of these',
                ].map((reason) => (
                  <RadioOption
                    key={reason}
                    label={reason}
                    selected={primaryReason === reason}
                    onClick={() => selectSingle('primaryReason', reason)}
                  />
                ))}
              </div>

              <FieldError message={errors.primaryReason?.message} />
              <Button onClick={() => advance(['primaryReason'], 11)}>Next →</Button>
            </>
          )}

          {/* STEP 11 — Pace */}
          {step === 11 && (
            <>
              <h1 className="text-3xl text-gray-900">
                With medication, you can lose an average of 3.75 to 5 pounds {' '}
                <span className="text-primary font-semibold">per week.</span>*
              </h1>
              <p className="-mt-4 text-sm">* Results are not guaranteed</p>
              {weightDiff > 0 && (
                <div className="my-2 pt-2 pb-4 border-t border-b border-gray-300">
                  <p className="text-lg text-gray-700 mt-2">
                    That&apos;s roughly{' '}
                    {weeksToGoal} weeks to reach your goal weight of{' '}
                    <strong>{goalWeight} lbs.</strong>
                  </p>
                </div>
              )}
              <p className="text-3xl text-gray-900">How is that pace for you?</p>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { value: 'works_for_me', icon: 'ok.svg', label: 'That works for me' },
                  { value: 'want_faster', icon: 'faster.svg', label: 'I want it faster' },
                  { value: 'too_fast', icon: 'slower.svg', label: "That's too fast" },
                ].map((opt) => (
                  <SelectionCard
                    key={opt.value}
                    icon={opt.icon}
                    label={opt.label}
                    selected={pace === opt.value}
                    onClick={() => selectSingle('pace', opt.value)}
                  />
                ))}
              </div>

              <FieldError message={errors.pace?.message} />
              <Button onClick={() => advance(['pace'], 12)}>Next →</Button>
            </>
          )}

          {/* STEP 12 — Perfect! info */}
          {step === 12 && (
            <>
              <h1 className="text-3xl text-gray-900">Perfect!</h1>
              <p className="text-gray-900 text-xl leading-relaxed">
                Losing {weightDiff > 0 ? `${weightDiff} lbs` : 'weight'} is easier than you think
                — and it{' '}
                <span className="text-primary font-semibold">
                  doesn&apos;t involve restrictive diets
                </span>
                .
              </p>
              <hr className="border-gray-200" />
              <p className="text-gray-900 text-xl leading-relaxed">
                Now, let&apos;s <strong>analyze your metabolism</strong> and discover how well your
                body processes macronutrients.
              </p>
              <Button onClick={() => advanceSilent(13)}>Next →</Button>
            </>
          )}

          {/* STEP 13 — Sleep quality */}
          {step === 13 && (
            <>
              <h1 className="text-gray-700 text-3xl">
                How you sleep tells us a lot about your{' '}
                <span className="text-primary font-semibold">cortisol</span> and{' '}
                <span className="text-primary font-semibold">efficiency.</span>
              </h1>
              <p className="text-3xl text-gray-900 mt-3">
                How is your sleep, overall?
              </p>

              <div className="grid grid-cols-3 gap-3">
                {[
                  { value: 'pretty_good', icon: 'sleep-pretty-good.svg', label: 'Pretty good' },
                  {
                    value: 'bit_restless',
                    icon: 'sleep-a-bit-restless.svg',
                    label: 'A bit restless',
                  },
                  {
                    value: 'dont_sleep_well',
                    icon: 'sleep-not-well.svg',
                    label: "I don't sleep well",
                  },
                ].map((opt) => (
                  <SelectionCard
                    key={opt.value}
                    icon={opt.icon}
                    label={opt.label}
                    selected={sleepQuality === opt.value}
                    onClick={() => selectSingle('sleepQuality', opt.value)}
                  />
                ))}
              </div>

              <FieldError message={errors.sleepQuality?.message} />
              <Button onClick={() => advance(['sleepQuality'], 14)}>Next →</Button>
            </>
          )}

          {/* STEP 14 — Sleep hours */}
          {step === 14 && (
            <>
              <Image
                src="/icons/sleep.webp"
                alt="Sleep quality"
                width={600}
                height={360}
                className="w-full rounded-3xl object-cover"
              />
              <h1 className="text-3xl text-gray-900">
                How many hours of sleep do you usually get each night?
              </h1>

              <div className="flex flex-col gap-3">
                {[
                  'Less than 5 hours',
                  '6–7 hours',
                  '8–9 hours',
                  'More than 9 hours',
                ].map((option) => (
                  <RadioOption
                    key={option}
                    label={option}
                    selected={sleepHours === option}
                    onClick={() => selectSingle('sleepHours', option)}
                  />
                ))}
              </div>

              <FieldError message={errors.sleepHours?.message} />
              <Button onClick={() => advance(['sleepHours'], 15)}>Next →</Button>
            </>
          )}

          {/* STEP 15 — Testimonial Karen */}
          {step === 15 && (
            <>
              <p className="text-3xl text-gray-900">
                &ldquo;What a great company!{' '}
                <span className="text-primary font-semibold">The customer service is spot on</span>{' '}
                (Concierge Style) individualized personal attention, quick response time and a great
                product. I am 100% happy and will continue with InstaRx.&rdquo;
              </p>
              <Image
                src="/icons/before_after_2.webp"
                alt="Karen before and after"
                width={600}
                height={420}
                className="w-full rounded-2xl object-cover"
              />
              <Button onClick={() => advanceSilent(16)}>Next →</Button>
            </>
          )}

          {/* STEP 16 — Medical conditions */}
          {step === 16 && !disqualified && (
            <>
              <h1 className="text-2xl text-gray-900">
                <span className="text-primary font-semibold">Do any of these apply to you?</span> These
                conditions may affect your eligibility for treatment.
              </h1>
              <p className="text-gray-900 text-lg font-bold text-center mt-2">
                Your answers are completely confidential and protected by HIPAA.
              </p>

              <div className="flex flex-col gap-2">
                {MEDICAL_CONDITIONS.map((condition) => {
                  const checked = medicalConditions?.includes(condition) ?? false;
                  return (
                    <button
                      key={condition}
                      type="button"
                      onClick={() => toggleArrayValue('medicalConditions', condition)}
                      className={cn(
                        'flex items-start gap-3 bg-white border rounded-xl px-4 py-3 text-left cursor-pointer transition-colors',
                        checked ? 'border-primary' : 'border-gray-200 hover:border-gray-300',
                      )}
                    >
                      <div
                        className={cn(
                          'w-4 h-4 rounded border mt-0.5 shrink-0 flex items-center justify-center transition-colors',
                          checked ? 'bg-primary border-primary' : 'border-gray-400 bg-white',
                        )}
                      >
                        {checked && (
                          <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                            <path
                              d="M1 4l2.5 2.5L9 1"
                              stroke="white"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        )}
                      </div>
                      <span className="text-gray-700 text-sm leading-snug">{condition}</span>
                    </button>
                  );
                })}
              </div>

              <FieldError message={errors.medicalConditions?.message} />
              <Button onClick={handleMedicalConditions}>Next →</Button>
            </>
          )}

          {/* DISQUALIFICATION */}
          {disqualified && (
            <div className="flex flex-col gap-5 text-center py-8">
              <h1 className="text-3xl font-bold text-gray-900">Thank You</h1>
              <p className="text-gray-600 text-xl">You selected:</p>
              <p className="text-lg font-bold text-gray-900">
                {medicalConditions.filter((c) => c !== 'None of these').join(', ')}
              </p>
              <p className="text-gray-700 text-lg">
                If you believe you made a mistake on your information or health form, please go back
                and review your answers.
              </p>
              <p className="text-gray-700 text-lg">
                Your safety is our number one priority. We&apos;re sorry we couldn&apos;t approve
                you for a prescription today.
              </p>
              <Button
                onClick={() => {
                  setDisqualified(false);
                  setStep(16);
                  setValue('medicalConditions', [], { shouldDirty: true });
                  persist(16);
                }}
              >
                Change my answers
              </Button>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}
