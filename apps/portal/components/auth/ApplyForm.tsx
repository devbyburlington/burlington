'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { AuthBackLink } from './AuthBackLink'
import { AuthWordmark } from './AuthWordmark'
import { AuthFooter } from './AuthFooter'

const STEPS = [
  { label: 'You', key: 'personal' },
  { label: 'Work', key: 'professional' },
  { label: 'Goals', key: 'immigration' },
  { label: 'Account', key: 'account' },
] as const

type StepKey = (typeof STEPS)[number]['key']

interface FormData {
  fullName: string
  email: string
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
  fullName: '',
  email: '',
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
  const [step, setStep] = useState(0)
  const [data, setData] = useState<FormData>(INITIAL_DATA)
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({})
  const [submitted, setSubmitted] = useState(false)

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

  const validateStep = (): boolean => {
    const errs: Partial<Record<keyof FormData, string>> = {}

    if (step === 0) {
      if (!data.fullName.trim()) errs.fullName = 'Full name is required'
      if (!data.email.trim()) errs.email = 'Email is required'
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errs.email = 'Enter a valid email'
      if (!data.citizenshipCountry) errs.citizenshipCountry = 'Select your country of citizenship'
      if (!data.residenceCountry) errs.residenceCountry = 'Select your country of residence'
    }

    if (step === 1) {
      if (!data.field) errs.field = 'Select your field'
      if (!data.highestEducation) errs.highestEducation = 'Select your education level'
    }

    if (step === 2) {
      if (!data.immigrationGoal) errs.immigrationGoal = 'Select your immigration goal'
      if (!data.howHeard) errs.howHeard = 'Tell us how you heard about us'
    }

    if (step === 3) {
      if (!data.password) errs.password = 'Create a password'
      else if (!isPasswordStrong(data.password)) errs.password = 'Password does not meet all requirements'
      if (!data.confirmPassword) errs.confirmPassword = 'Confirm your password'
      else if (data.password !== data.confirmPassword) errs.confirmPassword = 'Passwords do not match'
    }

    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleNext = () => {
    setSubmitted(true)
    if (!validateStep()) return
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    if (!validateStep()) return
    // TODO: submit to Supabase before redirecting
    localStorage.removeItem('burlington:form:apply')
    window.location.href = '/nda'
  }

  return (
    <main className="auth-form-panel">
      <div className="auth-form-top">
        {step > 0 ? (
          <AuthBackLink onClick={handleBack} label="Back" />
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

        <form onSubmit={handleSubmit}>
          {step === 0 && (
            <PersonalStep data={data} errors={errors} update={update} />
          )}
          {step === 1 && (
            <ProfessionalStep data={data} errors={errors} update={update} />
          )}
          {step === 2 && (
            <ImmigrationStep data={data} errors={errors} update={update} />
          )}
          {step === 3 && (
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
              <button type="submit" className="auth-btn-primary">
                Submit application
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </button>
            )}
          </div>
        </form>

        {step === 0 && (
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
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null
  return <p className="mt-1.5 text-[0.72rem] font-medium text-red-500">{message}</p>
}

/* ── Step 1: Personal Info ── */

function PersonalStep({ data, errors, update }: StepProps) {
  return (
    <>
      <h2 className="mb-2 font-serif text-[1.4375rem] font-medium leading-[1.2] tracking-tight text-burl-gray-700">
        Tell us about yourself.
      </h2>
      <p className="mb-8 text-[0.84rem] leading-[1.6] text-burl-gray-400">
        Start with the basics. All fields marked with * are required.
      </p>

      <div className="auth-field">
        <label htmlFor="apply-name" className="auth-field-label">Full name *</label>
        <input
          id="apply-name"
          className="auth-field-input"
          type="text"
          autoComplete="name"
          placeholder="As it appears on your passport"
          value={data.fullName}
          onChange={e => update('fullName', e.target.value)}
        />
        <FieldError message={errors.fullName} />
      </div>

      <div className="auth-field">
        <label htmlFor="apply-email" className="auth-field-label">Email address *</label>
        <input
          id="apply-email"
          className="auth-field-input"
          type="email"
          autoComplete="email"
          placeholder="name@example.com"
          value={data.email}
          onChange={e => update('email', e.target.value)}
        />
        <FieldError message={errors.email} />
      </div>

      <div className="auth-field">
        <label htmlFor="apply-phone" className="auth-field-label">Phone number</label>
        <input
          id="apply-phone"
          className="auth-field-input"
          type="tel"
          autoComplete="tel"
          placeholder="+234 803 000 0000"
          value={data.phone}
          onChange={e => update('phone', e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="auth-field">
          <label htmlFor="apply-citizenship" className="auth-field-label">Country of citizenship *</label>
          <select
            id="apply-citizenship"
            className="auth-field-input"
            value={data.citizenshipCountry}
            onChange={e => update('citizenshipCountry', e.target.value)}
          >
            <option value="">Select country</option>
            <CountryOptions />
          </select>
          <FieldError message={errors.citizenshipCountry} />
        </div>

        <div className="auth-field">
          <label htmlFor="apply-residence" className="auth-field-label">Country of residence *</label>
          <select
            id="apply-residence"
            className="auth-field-input"
            value={data.residenceCountry}
            onChange={e => update('residenceCountry', e.target.value)}
          >
            <option value="">Select country</option>
            <CountryOptions />
          </select>
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

/* ── Password helpers ── */

const PASSWORD_RULES = [
  { key: 'length', label: 'At least 8 characters', test: (p: string) => p.length >= 8 },
  { key: 'lower', label: 'One lowercase letter', test: (p: string) => /[a-z]/.test(p) },
  { key: 'upper', label: 'One uppercase letter', test: (p: string) => /[A-Z]/.test(p) },
  { key: 'symbol', label: 'One symbol (!@#$%...)', test: (p: string) => /[^a-zA-Z0-9]/.test(p) },
] as const

function isPasswordStrong(password: string): boolean {
  return PASSWORD_RULES.every(r => r.test(password))
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

function CountryOptions() {
  return (
    <>
      {COUNTRIES.map(c => (
        <option key={c.code} value={c.code}>{c.name}</option>
      ))}
    </>
  )
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
