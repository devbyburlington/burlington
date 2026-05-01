'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { parsePhoneNumberFromString, type CountryCode } from 'libphonenumber-js'
import { createClient } from '@burlington/shared/src/supabase/client'
import { isRestrictedCountry } from '@burlington/shared/src/constants/sanctions'
import { isPasswordStrong, PASSWORD_RULES } from '../../lib/schemas/auth'
import { personalStepSchema, professionalStepSchema, immigrationStepSchema, accountStepSchema, profilePayloadSchema } from '../../lib/schemas/application'
import { AuthBackLink } from './AuthBackLink'
import { AuthWordmark } from './AuthWordmark'
import { AuthFooter } from './AuthFooter'

const ALL_STEPS = [
  { label: 'You', key: 'personal' },
  { label: 'Work', key: 'professional' },
  { label: 'Goals', key: 'immigration' },
  { label: 'Account', key: 'account' },
] as const

const OAUTH_STEPS = [
  { label: 'You', key: 'personal' },
  { label: 'Work', key: 'professional' },
  { label: 'Goals', key: 'immigration' },
] as const

type StepKey = (typeof ALL_STEPS)[number]['key']

interface FormData {
  firstName: string
  lastName: string
  email: string
  phoneCountryCode: string
  phone: string
  citizenshipCountry: string
  residenceCountry: string
  employer: string
  currentRole: string
  field: string
  highestEducation: string
  linkedinUrl: string
  immigrationGoal: string
  howHeard: string
  howHeardOther: string
  referralSource: string
  marketingConsent: boolean
  password: string
  confirmPassword: string
}

const INITIAL_DATA: FormData = {
  firstName: '',
  lastName: '',
  email: '',
  phoneCountryCode: '',
  phone: '',
  citizenshipCountry: '',
  residenceCountry: '',
  employer: '',
  currentRole: '',
  field: '',
  highestEducation: '',
  linkedinUrl: '',
  immigrationGoal: '',
  howHeard: '',
  howHeardOther: '',
  referralSource: '',
  marketingConsent: false,
  password: '',
  confirmPassword: '',
}

const FIELDS = [
  'Science / Research',
  'Technology / Engineering',
  'Business / Finance',
  'Law / Public Policy',
  'Medicine / Healthcare',
  'Arts / Media / Creative',
  'Other',
]

const EDUCATION_LEVELS = [
  'High school / Secondary',
  'Associate degree / Diploma',
  'Bachelor\'s degree',
  'Master\'s degree',
  'Doctorate (PhD)',
  'Medical degree (MD / MBBS)',
  'Law degree (JD / LLB / LLM)',
  'MBA',
  'Other professional degree',
]

const IMMIGRATION_GOALS = [
  'EB-1A (Extraordinary Ability)',
  'EB-2 NIW (National Interest Waiver)',
  'Dual Petition (EB-1A + EB-2 NIW)',
  'Exploring options',
  'Other',
]

const HOW_HEARD = [
  'Google search',
  'LinkedIn',
  'Twitter / X',
  'Friend or colleague',
  'Burlington article or resource',
  'Podcast or interview',
  'Other',
]

export function ApplyForm() {
  const router = useRouter()
  const [step, setStep] = useState(0)
  const [data, setData] = useState<FormData>(INITIAL_DATA)
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({})
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [isOAuthUser, setIsOAuthUser] = useState(false)
  const STEPS = isOAuthUser ? OAUTH_STEPS : ALL_STEPS

  useEffect(() => {
    async function checkExistingSession() {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const { data: profile } = await supabase
        .from('profiles')
        .select('field_industry, status')
        .eq('id', user.id)
        .single()

      if (profile?.field_industry) {
        router.replace('/status')
        return
      }

      const isOAuth = user.app_metadata?.provider !== 'email'
      if (!isOAuth) return

      setIsOAuthUser(true)
      setData(prev => ({
        ...prev,
        email: user.email ?? '',
      }))
    }
    checkExistingSession()
  }, [])

  useEffect(() => {
    try {
      const saved = localStorage.getItem('burlington:form:apply')
      if (!saved) return
      const { values, savedAt } = JSON.parse(saved)
      if (Date.now() - new Date(savedAt).getTime() > 7 * 24 * 60 * 60 * 1000) {
        localStorage.removeItem('burlington:form:apply')
        return
      }
      const { password, confirmPassword, ...safe } = values
      setData(prev => ({ ...prev, ...safe }))
    } catch { /* ignore corrupt storage */ }
  }, [])

  useEffect(() => {
    const { password, confirmPassword, ...safe } = data
    if (Object.values(safe).some(v => v !== '' && v !== false)) {
      localStorage.setItem('burlington:form:apply', JSON.stringify({
        values: safe,
        savedAt: new Date().toISOString(),
      }))
    }
  }, [data])

  const update = (field: keyof FormData, value: string | boolean) => {
    setData(prev => ({ ...prev, [field]: value }))
    setErrors(prev => ({ ...prev, [field]: undefined }))
  }

  const validateStep = async (): Promise<boolean> => {
    const errs: Partial<Record<keyof FormData, string>> = {}

    if (step === 0) {
      const parsed = personalStepSchema.safeParse(data)
      if (!parsed.success) {
        for (const issue of parsed.error.issues) {
          const field = issue.path[0] as keyof FormData
          if (!errs[field]) errs[field] = issue.message
        }
      }

      let parsedPhone: ReturnType<typeof parsePhoneNumberFromString> = undefined
      if (!errs.phone && !errs.phoneCountryCode && data.phoneCountryCode && data.phone.trim()) {
        parsedPhone = parsePhoneNumberFromString(data.phone, data.phoneCountryCode as CountryCode)
        if (!parsedPhone || !parsedPhone.isValid()) {
          errs.phone = 'Enter a valid phone number for the selected country'
        }
      }

      const shouldCheckEmail = !isOAuthUser && !errs.email
      const shouldCheckPhone = !errs.phone
      if (shouldCheckEmail || shouldCheckPhone) {
        try {
          const e164 = parsedPhone?.isValid() ? parsedPhone.format('E.164') : undefined
          const res = await fetch('/api/check-duplicate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              email: shouldCheckEmail ? data.email.trim() : undefined,
              phone: shouldCheckPhone && e164 ? e164 : undefined,
            }),
          })
          if (res.ok) {
            const { emailTaken, emailIsOAuth, phoneTaken } = await res.json()
            if (shouldCheckEmail && emailTaken) {
              errs.email = emailIsOAuth
                ? 'This email is linked to a Google account. Please use "Continue with Google" to sign in.'
                : 'An account with this email already exists'
            }
            if (phoneTaken) errs.phone = 'An account with this phone number already exists'
          }
        } catch { /* network error — let submission handle it */ }
      }

      if (!errs.citizenshipCountry && isRestrictedCountry(data.citizenshipCountry)) {
        errs.citizenshipCountry = 'We are unable to accept applications from this jurisdiction due to US regulatory requirements'
      }
      if (!errs.residenceCountry && isRestrictedCountry(data.residenceCountry)) {
        errs.residenceCountry = 'We are unable to accept applications from this jurisdiction due to US regulatory requirements'
      }
    }

    if (step === 1) {
      const parsed = professionalStepSchema.safeParse(data)
      if (!parsed.success) {
        for (const issue of parsed.error.issues) {
          const field = issue.path[0] as keyof FormData
          if (!errs[field]) errs[field] = issue.message
        }
      }
    }

    if (step === 2) {
      const parsed = immigrationStepSchema.safeParse(data)
      if (!parsed.success) {
        for (const issue of parsed.error.issues) {
          const field = issue.path[0] as keyof FormData
          if (!errs[field]) errs[field] = issue.message
        }
      }
    }

    if (step === 3) {
      const parsed = accountStepSchema.safeParse(data)
      if (!parsed.success) {
        for (const issue of parsed.error.issues) {
          const field = issue.path[0] as keyof FormData
          if (!errs[field]) errs[field] = issue.message
        }
      }
    }

    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleNext = async () => {
    setSubmitted(true)
    if (!(await validateStep())) return
    if (step < STEPS.length - 1) {
      setSubmitted(false)
      setErrors({})
      setStep(step + 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handleBack = () => {
    if (step > 0) {
      setSubmitted(false)
      setErrors({})
      setStep(step - 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    if (!(await validateStep())) return

    setSubmitError('')
    setIsSubmitting(true)

    const supabase = createClient()
    const fullName = `${data.firstName.trim()} ${data.lastName.trim()}`

    const rawPayload = {
      full_name: fullName,
      given_name: data.firstName.trim(),
      family_name: data.lastName.trim(),
      phone_e164: data.phone
        ? (parsePhoneNumberFromString(data.phone, data.phoneCountryCode as CountryCode)?.format('E.164') ?? null)
        : null,
      country_citizenship_iso: data.citizenshipCountry || null,
      country_residence_iso: data.residenceCountry || null,
      employer: data.employer.trim() || null,
      job_title: data.currentRole.trim() || null,
      field_industry: data.field || null,
      highest_education: data.highestEducation || null,
      linkedin_url: data.linkedinUrl.trim() || null,
      immigration_goal: data.immigrationGoal || null,
      how_heard: data.howHeard === 'Other' ? data.howHeardOther.trim() : data.howHeard || null,
      referral_source: data.referralSource.trim() || null,
      marketing_consent: data.marketingConsent,
    }

    const payloadResult = profilePayloadSchema.safeParse(rawPayload)
    if (!payloadResult.success) {
      console.error('[ApplyForm] Profile payload validation failed', payloadResult.error.issues)
      setIsSubmitting(false)
      setSubmitError('Invalid form data. Please review your entries and try again.')
      return
    }
    const profilePayload = payloadResult.data

    if (isOAuthUser) {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        setIsSubmitting(false)
        setSubmitError('Your session has expired. Please sign in again.')
        return
      }

      const { data: updatedRows, error: updateError } = await supabase
        .from('profiles')
        .update(profilePayload)
        .eq('id', user.id)
        .select()

      if (updateError) {
        console.error('[ApplyForm] Profile update failed', updateError)
        setIsSubmitting(false)
        setSubmitError('Unable to save your application. Please try again.')
        return
      }

      if (!updatedRows?.length) {
        console.error('[ApplyForm] Profile update returned 0 rows', { userId: user.id })
      }

      supabase
        .from('profiles')
        .update({ auth_provider: 'google', has_set_password: false })
        .eq('id', user.id)
        .then(() => {})
    } else {
      const { data: authData, error: signUpError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: { full_name: fullName },
          emailRedirectTo: `${window.location.origin}/auth/callback?next=/nda`,
        },
      })

      if (signUpError) {
        setIsSubmitting(false)
        if (signUpError.message.includes('already registered')) {
          setSubmitError('An account with this email already exists. Please sign in instead.')
        } else {
          setSubmitError('Unable to create your account. Please try again.')
        }
        return
      }

      if (authData.user) {
        const { error: profileError } = await supabase
          .from('profiles')
          .update(profilePayload)
          .eq('id', authData.user.id)

        if (profileError) {
          console.error('[ApplyForm] Profile update failed for email user', profileError)
        }
      }

      await fetch('/api/set-persist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ maxAge: 24 * 60 * 60 }),
      })
    }

    localStorage.removeItem('burlington:form:apply')
    router.push('/nda')
    router.refresh()
  }

  return (
    <main className="auth-form-panel">
      <div className="auth-form-top">
        {step > 0 ? (
          <AuthBackLink onClick={handleBack} label="Back" />
        ) : isOAuthUser ? (
          <div />
        ) : (
          <AuthBackLink href="/login" label="Sign in instead" />
        )}
        <AuthWordmark />
      </div>

      <div className="auth-form-wrap">
        <div className="auth-eyebrow">
          Step {step + 1} of {STEPS.length}
        </div>

        <ProgressStepper steps={STEPS} current={step} />

        {submitError && (
          <div role="alert" className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-[0.8125rem] text-red-700">
            {submitError}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {step === 0 && (
            <PersonalStep data={data} errors={errors} update={update} isOAuthUser={isOAuthUser} />
          )}
          {step === 1 && (
            <ProfessionalStep data={data} errors={errors} update={update} />
          )}
          {step === 2 && (
            <ImmigrationStep data={data} errors={errors} update={update} />
          )}
          {step === 3 && !isOAuthUser && (
            <AccountStep
              data={data}
              errors={errors}
              update={update}
              showPassword={showPassword}
              onTogglePassword={() => setShowPassword(!showPassword)}
              submitted={submitted}
            />
          )}

          <div className="mt-8">
            {step < STEPS.length - 1 ? (
              <button
                type="button"
                onClick={handleNext}
                className="auth-btn-primary"
              >
                Continue
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </button>
            ) : (
              <button type="submit" className="auth-btn-primary" disabled={isSubmitting}>
                {isSubmitting ? (isOAuthUser ? 'Submitting…' : 'Creating account…') : 'Submit application'}
                {!isSubmitting && (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
              </button>
            )}
          </div>
        </form>

        {step === 0 && !isOAuthUser && (
          <p className="mt-6 text-[0.8125rem] text-burl-gray-400">
            Already have an account?{' '}
            <Link href="/login" className="font-medium text-teal transition-colors hover:text-teal-dark">
              Sign in &rarr;
            </Link>
          </p>
        )}
      </div>

      <AuthFooter />
    </main>
  )
}

/* ── Progress Stepper ── */

function ProgressStepper({
  steps,
  current,
}: {
  steps: readonly { label: string; key: string }[]
  current: number
}) {
  return (
    <div className="mb-8 flex gap-1.5">
      {steps.map((s, i) => (
        <div key={s.key} className="flex-1">
          <div
            className={`h-[3px] rounded-full transition-colors ${
              i <= current ? 'bg-teal' : 'bg-burl-gray-200'
            }`}
          />
          <span
            className={`mt-1.5 block text-[0.6rem] font-medium uppercase tracking-[.08em] ${
              i <= current ? 'text-teal' : 'text-burl-gray-300'
            }`}
          >
            {s.label}
          </span>
        </div>
      ))}
    </div>
  )
}

/* ── Shared field helpers ── */

interface StepProps {
  data: FormData
  errors: Partial<Record<keyof FormData, string>>
  update: (field: keyof FormData, value: string | boolean) => void
  isOAuthUser?: boolean
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null
  return <p className="mt-1.5 text-[0.72rem] font-medium text-red-500">{message}</p>
}

/* ── Step 1: Personal Info ── */

function PersonalStep({ data, errors, update, isOAuthUser }: StepProps) {
  return (
    <>
      <h2 className="mb-2 font-serif text-[1.4375rem] font-medium leading-[1.2] tracking-tight text-burl-gray-700">
        Tell us about yourself.
      </h2>
      <p className="mb-8 text-[0.84rem] leading-[1.6] text-burl-gray-400">
        {isOAuthUser
          ? 'Complete your application. Please enter your full legal name as it appears on your passport — this is required for immigration filings.'
          : 'Start with the basics. All fields marked with * are required.'}
      </p>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="auth-field">
          <label htmlFor="apply-first-name" className="auth-field-label">First name *</label>
          <input
            id="apply-first-name"
            className="auth-field-input"
            type="text"
            autoComplete="given-name"
            placeholder="As on your passport"
            value={data.firstName}
            onChange={e => update('firstName', e.target.value)}
          />
          <FieldError message={errors.firstName} />
        </div>

        <div className="auth-field">
          <label htmlFor="apply-last-name" className="auth-field-label">Last name *</label>
          <input
            id="apply-last-name"
            className="auth-field-input"
            type="text"
            autoComplete="family-name"
            placeholder="As on your passport"
            value={data.lastName}
            onChange={e => update('lastName', e.target.value)}
          />
          <FieldError message={errors.lastName} />
        </div>
      </div>

      <div className="auth-field">
        <label htmlFor="apply-email" className="auth-field-label">Email address *</label>
        {isOAuthUser ? (
          <div className="rounded-lg border border-burl-gray-200 bg-warm-gray px-3.5 py-[13px] text-[1rem] text-burl-gray-400 sm:text-[0.875rem]">
            {data.email}
          </div>
        ) : (
          <input
            id="apply-email"
            className="auth-field-input"
            type="email"
            autoComplete="email"
            placeholder="name@example.com"
            value={data.email}
            onChange={e => update('email', e.target.value)}
          />
        )}
        <FieldError message={errors.email} />
      </div>

      <div className="auth-field">
        <label htmlFor="apply-phone" className="auth-field-label">Phone number *</label>
        <PhoneInput
          countryCode={data.phoneCountryCode}
          onCountryChange={code => update('phoneCountryCode', code)}
          phone={data.phone}
          onPhoneChange={val => update('phone', val)}
        />
        <FieldError message={errors.phone} />
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="auth-field">
          <label className="auth-field-label">Country of citizenship *</label>
          <CountrySelect
            value={data.citizenshipCountry}
            onChange={code => update('citizenshipCountry', code)}
            placeholder="Select country"
          />
          <FieldError message={errors.citizenshipCountry} />
        </div>

        <div className="auth-field">
          <label className="auth-field-label">Country of residence *</label>
          <CountrySelect
            value={data.residenceCountry}
            onChange={code => update('residenceCountry', code)}
            placeholder="Select country"
          />
          <FieldError message={errors.residenceCountry} />
        </div>
      </div>
    </>
  )
}

/* ── Step 2: Professional Background ── */

function ProfessionalStep({ data, errors, update }: StepProps) {
  return (
    <>
      <h2 className="mb-2 font-serif text-[1.4375rem] font-medium leading-[1.2] tracking-tight text-burl-gray-700">
        Your professional background.
      </h2>
      <p className="mb-8 text-[0.84rem] leading-[1.6] text-burl-gray-400">
        Help us understand your expertise and career stage.
      </p>

      <div className="auth-field">
        <label htmlFor="apply-employer" className="auth-field-label">Current employer</label>
        <input
          id="apply-employer"
          className="auth-field-input"
          type="text"
          placeholder="Company or organisation"
          value={data.employer}
          onChange={e => update('employer', e.target.value)}
        />
      </div>

      <div className="auth-field">
        <label htmlFor="apply-role" className="auth-field-label">Current role / title</label>
        <input
          id="apply-role"
          className="auth-field-input"
          type="text"
          placeholder="e.g. Senior Software Engineer"
          value={data.currentRole}
          onChange={e => update('currentRole', e.target.value)}
        />
      </div>

      <div className="auth-field">
        <label htmlFor="apply-field" className="auth-field-label">Field / industry *</label>
        <select
          id="apply-field"
          className="auth-field-input"
          value={data.field}
          onChange={e => update('field', e.target.value)}
        >
          <option value="">Select your field</option>
          {FIELDS.map(f => (
            <option key={f} value={f}>{f}</option>
          ))}
        </select>
        <FieldError message={errors.field} />
      </div>

      <div className="auth-field">
        <label htmlFor="apply-education" className="auth-field-label">Highest education *</label>
        <select
          id="apply-education"
          className="auth-field-input"
          value={data.highestEducation}
          onChange={e => update('highestEducation', e.target.value)}
        >
          <option value="">Select education level</option>
          {EDUCATION_LEVELS.map(e => (
            <option key={e} value={e}>{e}</option>
          ))}
        </select>
        <FieldError message={errors.highestEducation} />
      </div>

      <div className="auth-field">
        <label htmlFor="apply-linkedin" className="auth-field-label">LinkedIn profile</label>
        <input
          id="apply-linkedin"
          className="auth-field-input"
          type="url"
          placeholder="https://linkedin.com/in/yourname"
          value={data.linkedinUrl}
          onChange={e => update('linkedinUrl', e.target.value)}
        />
      </div>
    </>
  )
}

/* ── Step 3: Immigration Goals ── */

function ImmigrationStep({ data, errors, update }: StepProps) {
  return (
    <>
      <h2 className="mb-2 font-serif text-[1.4375rem] font-medium leading-[1.2] tracking-tight text-burl-gray-700">
        Your immigration goals.
      </h2>
      <p className="mb-8 text-[0.84rem] leading-[1.6] text-burl-gray-400">
        Tell us what you are looking to achieve and how you found Burlington.
      </p>

      <div className="auth-field">
        <label htmlFor="apply-goal" className="auth-field-label">Immigration goal *</label>
        <select
          id="apply-goal"
          className="auth-field-input"
          value={data.immigrationGoal}
          onChange={e => update('immigrationGoal', e.target.value)}
        >
          <option value="">Select your goal</option>
          {IMMIGRATION_GOALS.map(g => (
            <option key={g} value={g}>{g}</option>
          ))}
        </select>
        <FieldError message={errors.immigrationGoal} />
      </div>

      <div className="auth-field">
        <label htmlFor="apply-heard" className="auth-field-label">How did you hear about us? *</label>
        <select
          id="apply-heard"
          className="auth-field-input"
          value={data.howHeard}
          onChange={e => update('howHeard', e.target.value)}
        >
          <option value="">Select an option</option>
          {HOW_HEARD.map(h => (
            <option key={h} value={h}>{h}</option>
          ))}
        </select>
        <FieldError message={errors.howHeard} />
      </div>

      {data.howHeard === 'Other' && (
        <div className="auth-field">
          <label htmlFor="apply-heard-other" className="auth-field-label">Please specify</label>
          <input
            id="apply-heard-other"
            className="auth-field-input"
            type="text"
            placeholder="Where did you hear about us?"
            value={data.howHeardOther}
            onChange={e => update('howHeardOther', e.target.value)}
          />
        </div>
      )}

      <div className="auth-field">
        <label htmlFor="apply-referral" className="auth-field-label">Referral code</label>
        <input
          id="apply-referral"
          className="auth-field-input"
          type="text"
          placeholder="Optional"
          value={data.referralSource}
          onChange={e => update('referralSource', e.target.value)}
        />
      </div>

      <div className="mt-2">
        <button
          type="button"
          onClick={() => update('marketingConsent', !data.marketingConsent)}
          className="auth-remember"
        >
          <span
            className={`auth-remember-box ${data.marketingConsent ? 'auth-remember-checked' : ''}`}
            role="checkbox"
            aria-checked={data.marketingConsent}
          >
            {data.marketingConsent && (
              <svg width="9" height="7" viewBox="0 0 9 7" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="1 3.5 3.5 6 8 1" />
              </svg>
            )}
          </span>
          Send me Burlington&apos;s occasional immigration strategy brief
        </button>
      </div>
    </>
  )
}

/* ── Step 4: Account Creation ── */

function AccountStep({
  data,
  errors,
  update,
  showPassword,
  onTogglePassword,
  submitted,
}: StepProps & {
  showPassword: boolean
  onTogglePassword: () => void
  submitted: boolean
}) {
  const hasTyped = data.password.length > 0

  return (
    <>
      <h2 className="mb-2 font-serif text-[1.4375rem] font-medium leading-[1.2] tracking-tight text-burl-gray-700">
        Create your account.
      </h2>
      <p className="mb-8 text-[0.84rem] leading-[1.6] text-burl-gray-400">
        Set a password for your Burlington portal. You will use this to sign in and track your application.
      </p>

      <div className="auth-field">
        <label className="auth-field-label">Email address</label>
        <div className="rounded-lg border border-burl-gray-200 bg-warm-gray px-3.5 py-[13px] text-[1rem] text-burl-gray-400 sm:text-[0.875rem]">
          {data.email}
        </div>
      </div>

      <div className="auth-field">
        <label htmlFor="apply-password" className="auth-field-label">Password *</label>
        <div className="relative">
          <input
            id="apply-password"
            className="auth-field-input pr-11"
            type={showPassword ? 'text' : 'password'}
            autoComplete="new-password"
            placeholder="Create a strong password"
            value={data.password}
            onChange={e => update('password', e.target.value)}
          />
          <button
            type="button"
            onClick={onTogglePassword}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            className="absolute top-1/2 right-3 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-md text-burl-gray-400 transition-all hover:bg-warm-gray hover:text-burl-gray-500"
          >
            {showPassword ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                <line x1="1" y1="1" x2="23" y2="23" />
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            )}
          </button>
        </div>

        {hasTyped && (
          <ul className="mt-3 space-y-1.5">
            {PASSWORD_RULES.map(rule => {
              const passed = rule.test(data.password)
              const failed = !passed && submitted
              return (
                <li key={rule.key} className="flex items-center gap-2 text-[0.72rem]">
                  {passed ? (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0 text-teal">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  ) : failed ? (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0 text-red-500">
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  ) : (
                    <span className="flex h-3 w-3 shrink-0 items-center justify-center rounded-full border border-burl-gray-300" />
                  )}
                  <span className={passed ? 'text-teal' : failed ? 'text-red-500' : 'text-burl-gray-400'}>{rule.label}</span>
                </li>
              )
            })}
          </ul>
        )}

        {!hasTyped && submitted && errors.password && <FieldError message={errors.password} />}
      </div>

      <div className="auth-field">
        <label htmlFor="apply-confirm" className="auth-field-label">Confirm password *</label>
        <input
          id="apply-confirm"
          className="auth-field-input"
          type={showPassword ? 'text' : 'password'}
          autoComplete="new-password"
          placeholder="Re-enter your password"
          value={data.confirmPassword}
          onChange={e => update('confirmPassword', e.target.value)}
        />
        {submitted && <FieldError message={errors.confirmPassword} />}
      </div>

      <div className="mt-1 rounded-lg border border-burl-gray-200 bg-warm-gray/60 px-4 py-3 text-[0.75rem] leading-[1.6] text-burl-gray-400">
        By submitting this application, you agree to Burlington Consult&apos;s{' '}
        <Link href="#" className="font-medium text-teal transition-colors hover:text-teal-dark">Terms of Service</Link>
        {' '}and{' '}
        <Link href="#" className="font-medium text-teal transition-colors hover:text-teal-dark">Privacy Policy</Link>.
        You will be asked to sign a non-disclosure agreement after submission.
      </div>
    </>
  )
}

/* ── Country list (ISO 3166-1, comprehensive) ── */

const PRIORITY_COUNTRIES = ['NG', 'GH', 'KE', 'ZA']

const DIAL_CODES: { code: string; dial: string; name: string }[] = [
  { code: 'NG', dial: '+234', name: 'Nigeria' },
  { code: 'GH', dial: '+233', name: 'Ghana' },
  { code: 'KE', dial: '+254', name: 'Kenya' },
  { code: 'ZA', dial: '+27', name: 'South Africa' },
  { code: 'US', dial: '+1', name: 'United States' },
  { code: 'GB', dial: '+44', name: 'United Kingdom' },
  { code: 'CA', dial: '+1', name: 'Canada' },
  { code: 'IN', dial: '+91', name: 'India' },
  { code: 'PK', dial: '+92', name: 'Pakistan' },
  { code: 'AU', dial: '+61', name: 'Australia' },
  { code: 'DE', dial: '+49', name: 'Germany' },
  { code: 'FR', dial: '+33', name: 'France' },
  { code: 'BR', dial: '+55', name: 'Brazil' },
  { code: 'CN', dial: '+86', name: 'China' },
  { code: 'AE', dial: '+971', name: 'UAE' },
  { code: 'SG', dial: '+65', name: 'Singapore' },
  { code: 'PH', dial: '+63', name: 'Philippines' },
  { code: 'EG', dial: '+20', name: 'Egypt' },
  { code: 'ET', dial: '+251', name: 'Ethiopia' },
  { code: 'TZ', dial: '+255', name: 'Tanzania' },
  { code: 'UG', dial: '+256', name: 'Uganda' },
  { code: 'RW', dial: '+250', name: 'Rwanda' },
  { code: 'CI', dial: '+225', name: "Côte d'Ivoire" },
  { code: 'CM', dial: '+237', name: 'Cameroon' },
  { code: 'SN', dial: '+221', name: 'Senegal' },
  { code: 'JP', dial: '+81', name: 'Japan' },
  { code: 'KR', dial: '+82', name: 'South Korea' },
  { code: 'MX', dial: '+52', name: 'Mexico' },
  { code: 'IE', dial: '+353', name: 'Ireland' },
  { code: 'NL', dial: '+31', name: 'Netherlands' },
  { code: 'IT', dial: '+39', name: 'Italy' },
  { code: 'ES', dial: '+34', name: 'Spain' },
  { code: 'SE', dial: '+46', name: 'Sweden' },
  { code: 'CH', dial: '+41', name: 'Switzerland' },
  { code: 'IL', dial: '+972', name: 'Israel' },
  { code: 'SA', dial: '+966', name: 'Saudi Arabia' },
  { code: 'QA', dial: '+974', name: 'Qatar' },
  { code: 'MY', dial: '+60', name: 'Malaysia' },
  { code: 'NZ', dial: '+64', name: 'New Zealand' },
]

function countryFlag(code: string): string {
  return String.fromCodePoint(
    ...code.toUpperCase().split('').map(c => 0x1f1e6 + c.charCodeAt(0) - 65)
  )
}

function getDialCode(code: string): string {
  return DIAL_CODES.find(c => c.code === code)?.dial ?? ''
}

function CountrySelect({
  value,
  onChange,
  placeholder,
}: {
  value: string
  onChange: (code: string) => void
  placeholder: string
}) {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [highlighted, setHighlighted] = useState(-1)
  const ref = useRef<HTMLDivElement>(null)
  const searchRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLUListElement>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    if (open) document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [open])

  useEffect(() => {
    if (open) {
      searchRef.current?.focus()
      setHighlighted(-1)
    } else {
      setSearch('')
    }
  }, [open])

  const selected = COUNTRIES.find(c => c.code === value)
  const priority = PRIORITY_COUNTRIES.map(code => COUNTRIES.find(c => c.code === code)!)
  const rest = COUNTRIES.filter(c => !PRIORITY_COUNTRIES.includes(c.code))

  const filterCountries = (list: typeof COUNTRIES) =>
    search ? list.filter(c => c.name.toLowerCase().includes(search.toLowerCase())) : list

  const filteredPriority = filterCountries(priority)
  const filteredRest = filterCountries(rest)
  const allFiltered = [...filteredPriority, ...filteredRest]

  useEffect(() => {
    setHighlighted(-1)
  }, [search])

  useEffect(() => {
    if (highlighted >= 0 && listRef.current) {
      const items = listRef.current.querySelectorAll('[role="option"]')
      items[highlighted]?.scrollIntoView({ block: 'nearest' })
    }
  }, [highlighted])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setHighlighted(prev => (prev < allFiltered.length - 1 ? prev + 1 : 0))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setHighlighted(prev => (prev > 0 ? prev - 1 : allFiltered.length - 1))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      if (highlighted >= 0 && allFiltered[highlighted]) {
        onChange(allFiltered[highlighted].code)
        setOpen(false)
      }
    } else if (e.key === 'Escape') {
      e.preventDefault()
      setOpen(false)
    }
  }

  const handleTriggerKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault()
      setOpen(true)
    }
  }

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        onKeyDown={handleTriggerKeyDown}
        className="flex w-full items-center justify-between rounded-lg border border-burl-gray-200 bg-white px-3.5 py-[13px] text-left text-[1rem] transition-colors hover:bg-warm-gray sm:text-[0.875rem]"
        aria-expanded={open}
        aria-haspopup="listbox"
      >
        {selected ? (
          <span className="flex items-center gap-2.5">
            <span className="text-base leading-none">{countryFlag(selected.code)}</span>
            <span className="text-burl-gray-700">{selected.name}</span>
          </span>
        ) : (
          <span className="text-burl-gray-400">{placeholder}</span>
        )}
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0 text-burl-gray-400">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {open && (
        <div className="absolute left-0 top-full z-50 mt-1 w-full overflow-hidden rounded-lg border border-burl-gray-200 bg-white shadow-lg">
          <div className="border-b border-burl-gray-100 px-3 py-2">
            <input
              ref={searchRef}
              type="text"
              className="w-full bg-transparent text-[1rem] text-burl-gray-700 outline-none placeholder:text-burl-gray-300 sm:text-[0.8125rem]"
              placeholder="Search countries..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              onKeyDown={handleKeyDown}
              aria-activedescendant={highlighted >= 0 ? `country-opt-${allFiltered[highlighted]?.code}` : undefined}
            />
          </div>
          <ul ref={listRef} role="listbox" className="max-h-60 overflow-y-auto py-1">
            {filteredPriority.map((c, i) => (
              <li key={c.code}>
                <button
                  type="button"
                  role="option"
                  id={`country-opt-${c.code}`}
                  aria-selected={value === c.code}
                  className={`flex w-full items-center gap-2.5 px-3 py-2 text-left text-[0.8125rem] transition-colors hover:bg-warm-gray ${highlighted === i ? 'bg-warm-gray text-burl-gray-700' : value === c.code ? 'bg-warm-gray font-medium text-burl-gray-700' : 'text-burl-gray-500'}`}
                  onClick={() => { onChange(c.code); setOpen(false) }}
                  onMouseEnter={() => setHighlighted(i)}
                >
                  <span className="text-base leading-none">{countryFlag(c.code)}</span>
                  <span>{c.name}</span>
                </button>
              </li>
            ))}
            {filteredPriority.length > 0 && filteredRest.length > 0 && (
              <li className="my-1 border-t border-burl-gray-100" />
            )}
            {filteredRest.map((c, i) => {
              const idx = filteredPriority.length + i
              return (
                <li key={c.code}>
                  <button
                    type="button"
                    role="option"
                    id={`country-opt-${c.code}`}
                    aria-selected={value === c.code}
                    className={`flex w-full items-center gap-2.5 px-3 py-2 text-left text-[0.8125rem] transition-colors hover:bg-warm-gray ${highlighted === idx ? 'bg-warm-gray text-burl-gray-700' : value === c.code ? 'bg-warm-gray font-medium text-burl-gray-700' : 'text-burl-gray-500'}`}
                    onClick={() => { onChange(c.code); setOpen(false) }}
                    onMouseEnter={() => setHighlighted(idx)}
                  >
                    <span className="text-base leading-none">{countryFlag(c.code)}</span>
                    <span>{c.name}</span>
                  </button>
                </li>
              )
            })}
            {allFiltered.length === 0 && (
              <li className="px-3 py-3 text-center text-[0.8125rem] text-burl-gray-400">No countries found</li>
            )}
          </ul>
        </div>
      )}
    </div>
  )
}

function PhoneInput({
  countryCode,
  onCountryChange,
  phone,
  onPhoneChange,
}: {
  countryCode: string
  onCountryChange: (code: string) => void
  phone: string
  onPhoneChange: (val: string) => void
}) {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [highlighted, setHighlighted] = useState(-1)
  const ref = useRef<HTMLDivElement>(null)
  const searchRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLUListElement>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    if (open) document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [open])

  useEffect(() => {
    if (open) {
      searchRef.current?.focus()
      setHighlighted(-1)
    } else {
      setSearch('')
    }
  }, [open])

  useEffect(() => {
    setHighlighted(-1)
  }, [search])

  useEffect(() => {
    if (highlighted >= 0 && listRef.current) {
      const items = listRef.current.querySelectorAll('[role="option"]')
      items[highlighted]?.scrollIntoView({ block: 'nearest' })
    }
  }, [highlighted])

  const dial = getDialCode(countryCode)
  const priority = PRIORITY_COUNTRIES.map(code => DIAL_CODES.find(c => c.code === code)!).filter(Boolean)
  const rest = DIAL_CODES.filter(c => !PRIORITY_COUNTRIES.includes(c.code))

  const filterCodes = (list: typeof DIAL_CODES) =>
    search ? list.filter(c => c.name.toLowerCase().includes(search.toLowerCase()) || c.dial.includes(search)) : list

  const filteredPriority = filterCodes(priority)
  const filteredRest = filterCodes(rest)
  const allFiltered = [...filteredPriority, ...filteredRest]

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setHighlighted(prev => (prev < allFiltered.length - 1 ? prev + 1 : 0))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setHighlighted(prev => (prev > 0 ? prev - 1 : allFiltered.length - 1))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      if (highlighted >= 0 && allFiltered[highlighted]) {
        onCountryChange(allFiltered[highlighted].code)
        setOpen(false)
      }
    } else if (e.key === 'Escape') {
      e.preventDefault()
      setOpen(false)
    }
  }

  const handleTriggerKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault()
      setOpen(true)
    }
  }

  return (
    <div className="flex items-stretch" ref={ref}>
      <div className="relative">
        <button
          type="button"
          onClick={() => setOpen(!open)}
          onKeyDown={handleTriggerKeyDown}
          className="flex h-full items-center gap-1 rounded-l-lg border border-r-0 border-burl-gray-200 bg-white px-2.5 text-[0.875rem] transition-colors hover:bg-warm-gray"
          aria-label="Select country code"
          aria-expanded={open}
          aria-haspopup="listbox"
        >
          <span className="text-base leading-none">{countryCode ? countryFlag(countryCode) : '🌐'}</span>
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-burl-gray-400">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>

        {open && (
          <div className="absolute left-0 top-full z-50 mt-1 w-64 overflow-hidden rounded-lg border border-burl-gray-200 bg-white shadow-lg">
            <div className="border-b border-burl-gray-100 px-3 py-2">
              <input
                ref={searchRef}
                type="text"
                className="w-full bg-transparent text-[1rem] text-burl-gray-700 outline-none placeholder:text-burl-gray-300 sm:text-[0.8125rem]"
                placeholder="Search..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                onKeyDown={handleKeyDown}
                aria-activedescendant={highlighted >= 0 ? `dial-opt-${allFiltered[highlighted]?.code}` : undefined}
              />
            </div>
            <ul ref={listRef} role="listbox" className="max-h-60 overflow-y-auto py-1">
              {filteredPriority.map((c, i) => (
                <li key={c.code}>
                  <button
                    type="button"
                    role="option"
                    id={`dial-opt-${c.code}`}
                    aria-selected={countryCode === c.code}
                    className={`flex w-full items-center gap-2.5 px-3 py-2 text-left text-[0.8125rem] transition-colors hover:bg-warm-gray ${highlighted === i ? 'bg-warm-gray text-burl-gray-700' : countryCode === c.code ? 'bg-warm-gray font-medium text-burl-gray-700' : 'text-burl-gray-500'}`}
                    onClick={() => { onCountryChange(c.code); setOpen(false) }}
                    onMouseEnter={() => setHighlighted(i)}
                  >
                    <span className="text-base leading-none">{countryFlag(c.code)}</span>
                    <span className="text-burl-gray-400">{c.dial}</span>
                    <span>{c.name}</span>
                  </button>
                </li>
              ))}
              {filteredPriority.length > 0 && filteredRest.length > 0 && (
                <li className="my-1 border-t border-burl-gray-100" />
              )}
              {filteredRest.map((c, i) => {
                const idx = filteredPriority.length + i
                return (
                  <li key={c.code}>
                    <button
                      type="button"
                      role="option"
                      id={`dial-opt-${c.code}`}
                      aria-selected={countryCode === c.code}
                      className={`flex w-full items-center gap-2.5 px-3 py-2 text-left text-[0.8125rem] transition-colors hover:bg-warm-gray ${highlighted === idx ? 'bg-warm-gray text-burl-gray-700' : countryCode === c.code ? 'bg-warm-gray font-medium text-burl-gray-700' : 'text-burl-gray-500'}`}
                      onClick={() => { onCountryChange(c.code); setOpen(false) }}
                      onMouseEnter={() => setHighlighted(idx)}
                    >
                      <span className="text-base leading-none">{countryFlag(c.code)}</span>
                      <span className="text-burl-gray-400">{c.dial}</span>
                      <span>{c.name}</span>
                    </button>
                  </li>
                )
              })}
              {allFiltered.length === 0 && (
                <li className="px-3 py-3 text-center text-[0.8125rem] text-burl-gray-400">No results</li>
              )}
            </ul>
          </div>
        )}
      </div>

      {dial && (
        <span className="flex items-center border-y border-burl-gray-200 bg-white px-2 text-[0.8125rem] text-burl-gray-400">
          {dial}
        </span>
      )}

      <input
        id="apply-phone"
        className="auth-field-input flex-1 rounded-l-none border-l-0"
        type="tel"
        autoComplete="tel-national"
        placeholder={getPhonePlaceholder(countryCode)}
        value={phone}
        onChange={e => onPhoneChange(e.target.value)}
      />
    </div>
  )
}

function getPhonePlaceholder(countryCode: string): string {
  const placeholders: Record<string, string> = {
    NG: '803 000 0000',
    GH: '24 000 0000',
    KE: '712 000000',
    ZA: '71 000 0000',
    US: '(201) 555-0123',
    GB: '7911 123456',
    CA: '(204) 555-0123',
    IN: '98765 43210',
  }
  return placeholders[countryCode] || 'Enter your number'
}

const COUNTRIES = [
  { code: 'AF', name: 'Afghanistan' },
  { code: 'AL', name: 'Albania' },
  { code: 'DZ', name: 'Algeria' },
  { code: 'AD', name: 'Andorra' },
  { code: 'AO', name: 'Angola' },
  { code: 'AG', name: 'Antigua and Barbuda' },
  { code: 'AR', name: 'Argentina' },
  { code: 'AM', name: 'Armenia' },
  { code: 'AU', name: 'Australia' },
  { code: 'AT', name: 'Austria' },
  { code: 'AZ', name: 'Azerbaijan' },
  { code: 'BS', name: 'Bahamas' },
  { code: 'BH', name: 'Bahrain' },
  { code: 'BD', name: 'Bangladesh' },
  { code: 'BB', name: 'Barbados' },
  { code: 'BY', name: 'Belarus' },
  { code: 'BE', name: 'Belgium' },
  { code: 'BZ', name: 'Belize' },
  { code: 'BJ', name: 'Benin' },
  { code: 'BT', name: 'Bhutan' },
  { code: 'BO', name: 'Bolivia' },
  { code: 'BA', name: 'Bosnia and Herzegovina' },
  { code: 'BW', name: 'Botswana' },
  { code: 'BR', name: 'Brazil' },
  { code: 'BN', name: 'Brunei' },
  { code: 'BG', name: 'Bulgaria' },
  { code: 'BF', name: 'Burkina Faso' },
  { code: 'BI', name: 'Burundi' },
  { code: 'CV', name: 'Cabo Verde' },
  { code: 'KH', name: 'Cambodia' },
  { code: 'CM', name: 'Cameroon' },
  { code: 'CA', name: 'Canada' },
  { code: 'CF', name: 'Central African Republic' },
  { code: 'TD', name: 'Chad' },
  { code: 'CL', name: 'Chile' },
  { code: 'CN', name: 'China' },
  { code: 'CO', name: 'Colombia' },
  { code: 'KM', name: 'Comoros' },
  { code: 'CG', name: 'Congo' },
  { code: 'CD', name: 'Congo (DRC)' },
  { code: 'CR', name: 'Costa Rica' },
  { code: 'CI', name: "Cote d'Ivoire" },
  { code: 'HR', name: 'Croatia' },
  { code: 'CU', name: 'Cuba' },
  { code: 'CY', name: 'Cyprus' },
  { code: 'CZ', name: 'Czechia' },
  { code: 'DK', name: 'Denmark' },
  { code: 'DJ', name: 'Djibouti' },
  { code: 'DM', name: 'Dominica' },
  { code: 'DO', name: 'Dominican Republic' },
  { code: 'EC', name: 'Ecuador' },
  { code: 'EG', name: 'Egypt' },
  { code: 'SV', name: 'El Salvador' },
  { code: 'GQ', name: 'Equatorial Guinea' },
  { code: 'ER', name: 'Eritrea' },
  { code: 'EE', name: 'Estonia' },
  { code: 'SZ', name: 'Eswatini' },
  { code: 'ET', name: 'Ethiopia' },
  { code: 'FJ', name: 'Fiji' },
  { code: 'FI', name: 'Finland' },
  { code: 'FR', name: 'France' },
  { code: 'GA', name: 'Gabon' },
  { code: 'GM', name: 'Gambia' },
  { code: 'GE', name: 'Georgia' },
  { code: 'DE', name: 'Germany' },
  { code: 'GH', name: 'Ghana' },
  { code: 'GR', name: 'Greece' },
  { code: 'GD', name: 'Grenada' },
  { code: 'GT', name: 'Guatemala' },
  { code: 'GN', name: 'Guinea' },
  { code: 'GW', name: 'Guinea-Bissau' },
  { code: 'GY', name: 'Guyana' },
  { code: 'HT', name: 'Haiti' },
  { code: 'HN', name: 'Honduras' },
  { code: 'HU', name: 'Hungary' },
  { code: 'IS', name: 'Iceland' },
  { code: 'IN', name: 'India' },
  { code: 'ID', name: 'Indonesia' },
  { code: 'IR', name: 'Iran' },
  { code: 'IQ', name: 'Iraq' },
  { code: 'IE', name: 'Ireland' },
  { code: 'IL', name: 'Israel' },
  { code: 'IT', name: 'Italy' },
  { code: 'JM', name: 'Jamaica' },
  { code: 'JP', name: 'Japan' },
  { code: 'JO', name: 'Jordan' },
  { code: 'KZ', name: 'Kazakhstan' },
  { code: 'KE', name: 'Kenya' },
  { code: 'KI', name: 'Kiribati' },
  { code: 'KP', name: 'Korea (North)' },
  { code: 'KR', name: 'Korea (South)' },
  { code: 'KW', name: 'Kuwait' },
  { code: 'KG', name: 'Kyrgyzstan' },
  { code: 'LA', name: 'Laos' },
  { code: 'LV', name: 'Latvia' },
  { code: 'LB', name: 'Lebanon' },
  { code: 'LS', name: 'Lesotho' },
  { code: 'LR', name: 'Liberia' },
  { code: 'LY', name: 'Libya' },
  { code: 'LI', name: 'Liechtenstein' },
  { code: 'LT', name: 'Lithuania' },
  { code: 'LU', name: 'Luxembourg' },
  { code: 'MG', name: 'Madagascar' },
  { code: 'MW', name: 'Malawi' },
  { code: 'MY', name: 'Malaysia' },
  { code: 'MV', name: 'Maldives' },
  { code: 'ML', name: 'Mali' },
  { code: 'MT', name: 'Malta' },
  { code: 'MH', name: 'Marshall Islands' },
  { code: 'MR', name: 'Mauritania' },
  { code: 'MU', name: 'Mauritius' },
  { code: 'MX', name: 'Mexico' },
  { code: 'FM', name: 'Micronesia' },
  { code: 'MD', name: 'Moldova' },
  { code: 'MC', name: 'Monaco' },
  { code: 'MN', name: 'Mongolia' },
  { code: 'ME', name: 'Montenegro' },
  { code: 'MA', name: 'Morocco' },
  { code: 'MZ', name: 'Mozambique' },
  { code: 'MM', name: 'Myanmar' },
  { code: 'NA', name: 'Namibia' },
  { code: 'NR', name: 'Nauru' },
  { code: 'NP', name: 'Nepal' },
  { code: 'NL', name: 'Netherlands' },
  { code: 'NZ', name: 'New Zealand' },
  { code: 'NI', name: 'Nicaragua' },
  { code: 'NE', name: 'Niger' },
  { code: 'NG', name: 'Nigeria' },
  { code: 'MK', name: 'North Macedonia' },
  { code: 'NO', name: 'Norway' },
  { code: 'OM', name: 'Oman' },
  { code: 'PK', name: 'Pakistan' },
  { code: 'PW', name: 'Palau' },
  { code: 'PA', name: 'Panama' },
  { code: 'PG', name: 'Papua New Guinea' },
  { code: 'PY', name: 'Paraguay' },
  { code: 'PE', name: 'Peru' },
  { code: 'PH', name: 'Philippines' },
  { code: 'PL', name: 'Poland' },
  { code: 'PT', name: 'Portugal' },
  { code: 'QA', name: 'Qatar' },
  { code: 'RO', name: 'Romania' },
  { code: 'RU', name: 'Russia' },
  { code: 'RW', name: 'Rwanda' },
  { code: 'KN', name: 'Saint Kitts and Nevis' },
  { code: 'LC', name: 'Saint Lucia' },
  { code: 'VC', name: 'Saint Vincent and the Grenadines' },
  { code: 'WS', name: 'Samoa' },
  { code: 'SM', name: 'San Marino' },
  { code: 'ST', name: 'Sao Tome and Principe' },
  { code: 'SA', name: 'Saudi Arabia' },
  { code: 'SN', name: 'Senegal' },
  { code: 'RS', name: 'Serbia' },
  { code: 'SC', name: 'Seychelles' },
  { code: 'SL', name: 'Sierra Leone' },
  { code: 'SG', name: 'Singapore' },
  { code: 'SK', name: 'Slovakia' },
  { code: 'SI', name: 'Slovenia' },
  { code: 'SB', name: 'Solomon Islands' },
  { code: 'SO', name: 'Somalia' },
  { code: 'ZA', name: 'South Africa' },
  { code: 'SS', name: 'South Sudan' },
  { code: 'ES', name: 'Spain' },
  { code: 'LK', name: 'Sri Lanka' },
  { code: 'SD', name: 'Sudan' },
  { code: 'SR', name: 'Suriname' },
  { code: 'SE', name: 'Sweden' },
  { code: 'CH', name: 'Switzerland' },
  { code: 'SY', name: 'Syria' },
  { code: 'TW', name: 'Taiwan' },
  { code: 'TJ', name: 'Tajikistan' },
  { code: 'TZ', name: 'Tanzania' },
  { code: 'TH', name: 'Thailand' },
  { code: 'TL', name: 'Timor-Leste' },
  { code: 'TG', name: 'Togo' },
  { code: 'TO', name: 'Tonga' },
  { code: 'TT', name: 'Trinidad and Tobago' },
  { code: 'TN', name: 'Tunisia' },
  { code: 'TR', name: 'Turkey' },
  { code: 'TM', name: 'Turkmenistan' },
  { code: 'TV', name: 'Tuvalu' },
  { code: 'UG', name: 'Uganda' },
  { code: 'UA', name: 'Ukraine' },
  { code: 'AE', name: 'United Arab Emirates' },
  { code: 'GB', name: 'United Kingdom' },
  { code: 'US', name: 'United States' },
  { code: 'UY', name: 'Uruguay' },
  { code: 'UZ', name: 'Uzbekistan' },
  { code: 'VU', name: 'Vanuatu' },
  { code: 'VA', name: 'Vatican City' },
  { code: 'VE', name: 'Venezuela' },
  { code: 'VN', name: 'Vietnam' },
  { code: 'YE', name: 'Yemen' },
  { code: 'ZM', name: 'Zambia' },
  { code: 'ZW', name: 'Zimbabwe' },
]
