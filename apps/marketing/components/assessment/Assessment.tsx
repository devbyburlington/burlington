'use client'

import { useState, useMemo, useEffect, useCallback } from 'react'
import {
  FIELDS, CRITERIA, IMPROVEMENTS, COUNTRIES,
  getQuestionsForField, computeScore, getTier, getStrengthLabel,
  getStrategicDirection, getInterpretation, getComparison,
  type Criterion, type Tier,
} from './data'

const CRITERIA_LABELS = [
  'Awards', 'Membership', 'Press', 'Judging', 'Contributions',
  'Scholarly', 'Exhibitions', 'Leadership', 'Salary', 'Commercial',
]
const SAMPLE_PROFILE = [0.87, 0.68, 0.93, 0.52, 0.78, 0.38, 0.83, 0.62, 0.45, 0.73]

function CriteriaGraphic() {
  const cx = 200, cy = 200, n = 10, outerR = 140
  const rings = [47, 93, 140]

  const pt = (i: number, r: number): [number, number] => {
    const a = -Math.PI / 2 + (i * 2 * Math.PI) / n
    return [cx + r * Math.cos(a), cy + r * Math.sin(a)]
  }

  const poly = (r: number) =>
    Array.from({ length: n }, (_, i) => pt(i, r).map(v => v.toFixed(1)).join(',')).join(' ')

  const profilePts = SAMPLE_PROFILE.map((pct, i) => pt(i, outerR * pct))
  const profilePoly = profilePts.map(p => p.map(v => v.toFixed(1)).join(',')).join(' ')

  return (
    <div className="relative mx-auto w-full max-w-[380px] lg:max-w-none">
      <div className="pointer-events-none absolute inset-[-20%] rounded-full bg-[radial-gradient(circle_at_center,rgba(13,148,136,.05)_0%,transparent_65%)]" />
      <svg viewBox="0 0 400 400" className="relative w-full" aria-hidden="true">
        <defs>
          <radialGradient id="ag-fill">
            <stop offset="0%" stopColor="rgba(13,148,136,.14)" />
            <stop offset="100%" stopColor="rgba(13,148,136,.03)" />
          </radialGradient>
        </defs>

        {rings.map(r => (
          <polygon key={r} points={poly(r)} fill="none" stroke="#DDDDD8" strokeWidth="0.5" />
        ))}

        {Array.from({ length: n }, (_, i) => {
          const [x2, y2] = pt(i, outerR + 2)
          return <line key={i} x1={cx} y1={cy} x2={x2.toFixed(1)} y2={y2.toFixed(1)} stroke="#DDDDD8" strokeWidth="0.5" />
        })}

        <polygon points={profilePoly} fill="url(#ag-fill)" stroke="#0D9488" strokeWidth="1.5" strokeLinejoin="round" />

        {profilePts.map(([x, y], i) => (
          <circle key={i} cx={x.toFixed(1)} cy={y.toFixed(1)} r="3" fill="#0D9488" />
        ))}

        {CRITERIA_LABELS.map((label, i) => {
          const [x, y] = pt(i, outerR + 22)
          const anchor = Math.abs(x - cx) < 3 ? 'middle' : x > cx ? 'start' : 'end'
          return (
            <text
              key={i}
              x={x.toFixed(1)}
              y={y.toFixed(1)}
              textAnchor={anchor}
              dominantBaseline="central"
              fill="#A3A39B"
              fontSize="8.5"
              fontFamily="var(--font-inter), sans-serif"
            >
              {label}
            </text>
          )
        })}

        <circle cx={cx} cy={cy} r="2" fill="#0D9488" opacity="0.2" />
      </svg>
    </div>
  )
}

function IntroPhase({ onStart }: { onStart: () => void }) {
  return (
    <section className="relative flex min-h-[calc(100dvh-72px)] items-center overflow-hidden bg-off-white px-5 pt-32 pb-20 sm:px-10 lg:px-20 lg:py-20 animate-assess-fade-in">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_40%,rgba(13,148,136,.04),transparent)]" />

      <div className="relative z-[1] mx-auto grid w-full max-w-[1100px] grid-cols-1 items-center gap-10 lg:grid-cols-[1fr_minmax(0,420px)] lg:gap-16">
        <div className="text-center lg:text-left">
          <div className="mb-5 flex justify-center lg:justify-start">
            <span className="inline-flex items-center gap-2.5 text-[0.72rem] font-medium uppercase tracking-[.12em] text-teal">
              <span className="h-px w-5 bg-teal/30" />
              Free Self-Assessment
              <span className="h-px w-5 bg-teal/30" />
            </span>
          </div>
          <h1 className="section-heading mb-6 text-[clamp(1.8rem,3.5vw,2.6rem)]">
            EB-1A Eligibility Assessment
          </h1>
          <p className="section-body mx-auto mb-5 max-w-[600px] lg:mx-0">
            A preliminary evaluation against the ten EB-1A extraordinary ability criteria.
            Adapts to your field. Takes about four minutes.
          </p>
          <p className="mx-auto mb-10 max-w-[520px] text-[0.84rem] leading-[1.6] text-burl-gray-300 lg:mx-0">
            This assessment provides a directional reading of your profile. It is not a legal opinion,
            and USCIS adjudication depends on evidence that cannot be captured in a form.
          </p>

          <button
            type="button"
            onClick={onStart}
            className="inline-flex items-center gap-2.5 rounded-full bg-gradient-to-br from-teal to-teal-light px-9 py-4 text-[0.88rem] font-medium text-white shadow-[0_2px_12px_rgba(13,148,136,0.2),inset_0_1px_0_rgba(255,255,255,0.1)] transition-all hover:-translate-y-px hover:shadow-[0_4px_20px_rgba(13,148,136,0.35)]"
          >
            Begin Assessment
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </button>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-2 text-[0.78rem] text-burl-gray-300 lg:justify-start">
            <span>Free</span>
            <span className="text-burl-gray-200">&middot;</span>
            <span>No signup</span>
            <span className="text-burl-gray-200">&middot;</span>
            <span>Instant results</span>
          </div>
        </div>

        <div className="hidden lg:block">
          <CriteriaGraphic />
        </div>
      </div>
    </section>
  )
}

const PANEL_STATS = [
  { value: '10', label: 'USCIS criteria evaluated' },
  { value: '7', label: 'Professional fields supported' },
  { value: '~4 min', label: 'Average completion time' },
]

function AssessmentPanel({ step, totalSteps }: { step: number; totalSteps: number }) {
  return (
    <aside className="relative hidden overflow-hidden px-12 pt-[100px] pb-12 text-white lg:sticky lg:top-0 lg:flex lg:h-dvh lg:flex-col" style={{
      background: 'radial-gradient(ellipse 75% 55% at 28% 42%, rgba(13,127,117,.22) 0%, transparent 55%), radial-gradient(ellipse 65% 50% at 72% 82%, rgba(45,212,191,.12) 0%, transparent 50%), linear-gradient(160deg, #040A0F 0%, #061520 22%, #0A2030 45%, #0D3040 65%, #0A2535 85%, #050D15 100%)',
    }}>
      <div className="pointer-events-none absolute inset-0" style={{
        backgroundImage: 'radial-gradient(rgba(45,212,191,.12) 1px, transparent 1px)',
        backgroundSize: '32px 32px',
        maskImage: 'radial-gradient(ellipse 60% 55% at 35% 55%, black 0%, transparent 70%)',
        WebkitMaskImage: 'radial-gradient(ellipse 60% 55% at 35% 55%, black 0%, transparent 70%)',
      }} />

      <div className="relative z-[1] my-auto max-w-[640px]">
        <span className="mb-5 inline-flex items-center gap-2.5 text-[0.72rem] font-medium uppercase tracking-[.12em] text-teal-light/70">
          <span className="h-px w-5 bg-teal-light/30" />
          EB-1A Assessment
        </span>
        <h2 className="mb-4 font-serif text-[clamp(1.5rem,2.2vw,2rem)] font-medium leading-[1.2] tracking-tight text-white">
          Evaluate your profile against the evidentiary standard USCIS actually applies.
        </h2>
        <p className="mb-10 max-w-[42ch] text-[0.88rem] leading-[1.65] text-white/50">
          This assessment adapts to your professional field, benchmarks your record across all ten criteria, and identifies the strongest available argument.
        </p>

        <div className="grid grid-cols-3 gap-6">
          {PANEL_STATS.map(stat => (
            <div key={stat.label}>
              <p className="mb-1 font-serif text-[1.5rem] font-medium text-teal-light">{stat.value}</p>
              <p className="text-[0.72rem] leading-[1.4] text-white/35">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="relative z-[1] shrink-0 border-t border-white/[.06] pt-5">
        <div className="mb-3 flex items-center gap-2">
          {Array.from({ length: totalSteps }).map((_, i) => (
            <div key={i} className={`h-1 flex-1 rounded-full transition-all ${i < step ? 'bg-teal-light' : 'bg-white/10'}`} />
          ))}
        </div>
        <p className="text-[0.72rem] font-medium uppercase tracking-[.12em] text-white/30">
          Step {step} of {totalSteps}
        </p>
      </div>
    </aside>
  )
}

function SplitLayout({ step, children }: { step: number; children: React.ReactNode }) {
  return (
    <div className="grid min-h-dvh grid-cols-1 pt-[72px] lg:grid-cols-[minmax(0,546px)_minmax(0,1fr)] lg:pt-0">
      <AssessmentPanel step={step} totalSteps={3} />

      <div className="flex flex-col bg-off-white lg:justify-center lg:px-12 lg:pt-[100px] lg:pb-12">
        {/* Mobile step bar */}
        <div className="border-b border-burl-gray-100 bg-white px-6 py-3.5 sm:px-10 lg:hidden">
          <div className="mx-auto flex max-w-[480px] items-center gap-3">
            <div className="flex flex-1 items-center gap-1.5">
              {[1, 2, 3].map(i => (
                <div key={i} className={`h-[3px] flex-1 rounded-full transition-all duration-300 ${i <= step ? 'bg-teal' : 'bg-burl-gray-100'}`} />
              ))}
            </div>
            <span className="whitespace-nowrap font-sans text-[0.7rem] font-medium text-burl-gray-300">
              Step {step} of 3
            </span>
          </div>
        </div>

        <div className="flex flex-1 flex-col px-6 py-5 sm:px-10 lg:py-8">
          {children}
        </div>
      </div>
    </div>
  )
}

function FieldPhase({ onSelect }: { onSelect: (id: string) => void }) {
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const handleSelect = (id: string) => {
    if (selectedId) return
    setSelectedId(id)
    setTimeout(() => onSelect(id), 400)
  }

  return (
    <SplitLayout step={1}>
      <div className={`mx-auto w-full max-w-[480px] ${selectedId ? 'animate-assess-fade-out' : 'animate-assess-fade-in'}`}>
        <div className="mb-10">
          <div className="mb-3 flex items-center justify-between">
            <span className="whitespace-nowrap text-[0.72rem] font-medium uppercase tracking-[.12em] text-teal">
              Select your field
            </span>
          </div>
          <div className="h-[3px] overflow-hidden rounded-full bg-burl-gray-100" />
        </div>

        <h2 className="mb-3.5 font-serif text-[clamp(1.5rem,4vw,2rem)] font-medium leading-[1.3] tracking-tight text-burl-gray-700">
          Which best describes your field?
        </h2>
        <p className="mb-10 max-w-[420px] text-[0.84rem] leading-[1.6] text-burl-gray-400">
          We adapt the assessment to the evidence patterns that matter for your field.
        </p>

        <div className="flex flex-col gap-2.5">
          {FIELDS.map(field => (
            <button
              key={field.id}
              type="button"
              onClick={() => handleSelect(field.id)}
              className={`w-full rounded-xl border bg-white px-5 py-[18px] text-left text-[0.88rem] transition-all ${
                selectedId === field.id
                  ? 'border-teal bg-teal/[.05] text-burl-gray-700'
                  : 'border-burl-gray-200 text-burl-gray-500 hover:border-teal/30 hover:bg-teal/[.03] hover:text-burl-gray-700'
              }`}
            >
              {field.label}
            </button>
          ))}
        </div>
      </div>
    </SplitLayout>
  )
}

function QuestionsPhase({ fieldId, onComplete, onBack }: { fieldId: string; onComplete: (answers: Record<string, number>) => void; onBack: () => void }) {
  const questions = useMemo(() => getQuestionsForField(fieldId), [fieldId])
  const [currentQ, setCurrentQ] = useState(0)
  const [answers, setAnswers] = useState<Record<string, number>>(() => {
    const field = FIELDS.find(f => f.id === fieldId)
    if (field?.skipsArtsCriteria) return { commercial: -1, display: -1 } as Record<string, number>
    return {} as Record<string, number>
  })
  const [animating, setAnimating] = useState(false)

  const handleBack = () => {
    if (animating) return
    if (currentQ === 0) {
      onBack()
    } else {
      setCurrentQ(prev => prev - 1)
    }
  }

  const handleAnswer = (criterionId: string, score: number) => {
    setAnimating(true)
    const newAnswers = { ...answers, [criterionId]: score }
    setAnswers(newAnswers)
    setTimeout(() => {
      if (currentQ < questions.length - 1) {
        setCurrentQ(prev => prev + 1)
      } else {
        onComplete(newAnswers)
      }
      setAnimating(false)
    }, 400)
  }

  const current = questions[currentQ]
  if (!current) return null

  return (
    <SplitLayout step={2}>
      <div className="mx-auto flex w-full max-w-[480px] flex-1 flex-col">
        <div className="mb-5 lg:mb-10">
          <div className="mb-3 grid grid-cols-[auto_1fr_auto] items-center">
              <button
                type="button"
                onClick={handleBack}
                aria-label={currentQ === 0 ? 'Back to field selection' : 'Previous question'}
                className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-[0.75rem] font-medium text-burl-gray-400 transition-colors hover:bg-warm-gray hover:text-burl-gray-600"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
                Back
              </button>
              <span className="whitespace-nowrap text-center text-[0.72rem] font-medium uppercase tracking-[.12em] text-teal">
                Question {currentQ + 1} of {questions.length}
              </span>
              <span className="whitespace-nowrap text-[0.75rem] text-burl-gray-300">{current.name}</span>
          </div>
          <div className="h-[3px] overflow-hidden rounded-full bg-burl-gray-100">
            <div
              className="h-full rounded-full bg-gradient-to-r from-teal to-teal-light transition-all duration-500 ease-[cubic-bezier(.16,1,.3,1)]"
              style={{ width: `${((currentQ + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>

        <div key={currentQ} className={`flex-1 ${animating ? 'animate-assess-fade-out' : 'animate-assess-fade-in'}`}>
          <h2 className="mb-5 font-serif text-[clamp(1.35rem,4vw,1.75rem)] font-medium leading-[1.35] tracking-tight text-burl-gray-700 lg:mb-10">
            {current.question}
          </h2>

          <div className="flex flex-col gap-2 lg:gap-3">
            {current.options.map((opt, i) => (
              <button
                key={i}
                type="button"
                onClick={() => handleAnswer(current.id, opt.score)}
                className="w-full rounded-xl border border-burl-gray-200 bg-white px-5 py-3.5 text-left text-[0.84rem] leading-[1.5] text-burl-gray-500 transition-all hover:translate-x-1 hover:border-teal/30 hover:bg-teal/[.03] hover:text-burl-gray-700 active:translate-x-0.5 lg:px-6 lg:py-[18px] lg:text-[0.88rem]"
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </SplitLayout>
  )
}

function ResultsSection({ title, children, className = '' }: { title: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={`mb-10 ${className}`}>
      <h3 className="mb-5 font-serif text-[1.25rem] font-medium tracking-tight text-burl-gray-700">
        {title}
      </h3>
      {children}
    </div>
  )
}

function CollapsibleSection({ title, badge, children, defaultOpen = false }: {
  title: string
  badge?: string
  children: React.ReactNode
  defaultOpen?: boolean
}) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <div className="mb-4 overflow-hidden rounded-2xl border border-burl-gray-100 bg-white shadow-[0_1px_3px_rgba(0,0,0,.04)] lg:mb-12 lg:overflow-visible lg:rounded-none lg:border-0 lg:bg-transparent lg:shadow-none">
      <button
        type="button"
        onClick={() => setOpen(prev => !prev)}
        className="flex w-full items-center justify-between px-5 py-4 text-left lg:pointer-events-none lg:px-0 lg:pb-6 lg:pt-0"
      >
        <div className="flex items-center gap-3">
          <h3 className="font-serif text-[1.1rem] font-medium tracking-tight text-burl-gray-700 lg:text-[1.25rem]">
            {title}
          </h3>
          {badge && (
            <span className="rounded-full bg-teal/10 px-2.5 py-0.5 font-sans text-[0.7rem] font-medium text-teal lg:hidden">
              {badge}
            </span>
          )}
        </div>
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`shrink-0 text-burl-gray-300 transition-transform duration-200 lg:hidden ${open ? 'rotate-180' : ''}`}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      <div className={`${open ? 'block' : 'hidden'} px-5 pb-5 lg:block lg:px-0 lg:pb-0`}>
        {children}
      </div>
    </div>
  )
}

function EmailCaptureForm({ onSubmit }: { onSubmit: () => void }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [country, setCountry] = useState('')
  const [linkedin, setLinkedin] = useState('')
  const [updates, setUpdates] = useState(false)

  const canSubmit = name.trim() && email.trim() && email.includes('@')

  return (
    <div className="rounded-2xl border border-burl-gray-100 bg-warm-gray p-6 sm:p-7">
      <p className="mb-5 text-[0.84rem] leading-[1.6] text-burl-gray-400">
        We'll email you these results so you can reference them later. Entirely optional.
      </p>
      <div className="mb-3.5 grid grid-cols-1 gap-3.5 sm:grid-cols-2">
        <div>
          <label htmlFor="assess-name" className="mb-2 block font-sans text-[0.66rem] font-medium uppercase tracking-[.04em] text-burl-gray-400">First name</label>
          <input id="assess-name" className="w-full rounded-lg border border-burl-gray-200 bg-white px-3.5 py-[13px] text-[0.875rem] text-burl-gray-700 outline-none transition-all placeholder:text-burl-gray-300 hover:border-burl-gray-300 focus:border-teal focus:shadow-[0_0_0_3px_rgba(13,148,136,.06)]" value={name} onChange={e => setName(e.target.value)} placeholder="Your first name" />
        </div>
        <div>
          <label htmlFor="assess-email" className="mb-2 block font-sans text-[0.66rem] font-medium uppercase tracking-[.04em] text-burl-gray-400">Email</label>
          <input id="assess-email" type="email" className="w-full rounded-lg border border-burl-gray-200 bg-white px-3.5 py-[13px] text-[0.875rem] text-burl-gray-700 outline-none transition-all placeholder:text-burl-gray-300 hover:border-burl-gray-300 focus:border-teal focus:shadow-[0_0_0_3px_rgba(13,148,136,.06)]" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" autoComplete="email" />
        </div>
      </div>
      <div className="mb-5 grid grid-cols-1 gap-3.5 sm:grid-cols-2">
        <div>
          <label htmlFor="assess-country" className="mb-2 block font-sans text-[0.66rem] font-medium uppercase tracking-[.04em] text-burl-gray-400">Country of citizenship</label>
          <select id="assess-country" className="w-full rounded-lg border border-burl-gray-200 bg-white px-3.5 py-[13px] text-[0.875rem] text-burl-gray-700 outline-none transition-all hover:border-burl-gray-300 focus:border-teal focus:shadow-[0_0_0_3px_rgba(13,148,136,.06)]" value={country} onChange={e => setCountry(e.target.value)}>
            <option value="">Select country</option>
            {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="assess-linkedin" className="mb-2 block font-sans text-[0.66rem] font-medium uppercase tracking-[.04em] text-burl-gray-400">LinkedIn (optional)</label>
          <input id="assess-linkedin" className="w-full rounded-lg border border-burl-gray-200 bg-white px-3.5 py-[13px] text-[0.875rem] text-burl-gray-700 outline-none transition-all placeholder:text-burl-gray-300 hover:border-burl-gray-300 focus:border-teal focus:shadow-[0_0_0_3px_rgba(13,148,136,.06)]" value={linkedin} onChange={e => setLinkedin(e.target.value)} placeholder="linkedin.com/in/yourprofile" />
        </div>
      </div>
      <label className="mb-5 flex cursor-pointer items-start gap-2.5 text-[0.78rem] leading-[1.5] text-burl-gray-400">
        <input type="checkbox" checked={updates} onChange={e => setUpdates(e.target.checked)} className="mt-0.5 accent-teal" />
        <span>Send me Burlington's occasional immigration strategy brief. USCIS updates, policy changes, approval trends. Unsubscribe anytime.</span>
      </label>
      <button
        type="button"
        disabled={!canSubmit}
        onClick={() => canSubmit && onSubmit()}
        className="inline-flex items-center gap-2.5 rounded-lg bg-teal px-7 py-3.5 text-[0.875rem] font-medium text-white transition-all hover:-translate-y-px hover:bg-teal-dark hover:shadow-[0_8px_24px_rgba(13,148,136,.2)] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:shadow-none"
      >
        Email Me My Results
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
          <line x1="5" y1="12" x2="19" y2="12" />
          <polyline points="12 5 19 12 12 19" />
        </svg>
      </button>
    </div>
  )
}

const PORTAL_URL = process.env.NEXT_PUBLIC_PORTAL_URL || 'https://app.burlingtonconsult.com'

function UpgradeCTA({ tier }: { tier: Tier }) {
  const headlines: Record<string, string> = {
    strong: 'Ready to file? Get the strategic version.',
    viable: 'Your profile is viable. The question is framing.',
    developing: 'Your profile needs strategic framing.',
    early: 'Build toward filing with a written roadmap.',
  }

  const items = [
    'Criterion-by-criterion evidence mapping against USCIS standards',
    'Proposed field of endeavour recommendation with Dhanasar three-prong analysis',
    'Gap analysis: what is missing and exactly how to close it',
    '90-day action plan with specific, prioritised steps for your field',
    'Comparison to approved profiles in your specific discipline',
    'Written recommendation on whether to file now, when to file, or whether to develop further',
  ]

  return (
    <div className="overflow-hidden rounded-2xl border border-burl-gray-100 bg-white shadow-[0_4px_24px_rgba(0,0,0,.06)]">
      {/* Accent bar */}
      <div className="h-[3px] bg-gradient-to-r from-teal to-teal-light" />

      <div className="p-7 sm:p-9">
        <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-teal/15 bg-teal/[.06] px-3 py-1 font-sans text-[0.65rem] font-semibold uppercase tracking-[.12em] text-teal">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
          Go Deeper
        </span>

        <h3 className="mb-3.5 font-serif text-[clamp(1.35rem,4vw,1.75rem)] font-medium leading-[1.3] tracking-tight text-burl-gray-700">
          {headlines[tier.tone]}
        </h3>

        <p className="mb-8 max-w-[540px] text-[0.88rem] leading-[1.65] text-burl-gray-400">
          A Burlington adviser reviews your complete professional record and delivers a written
          strategic assessment within 48 hours. This is not a longer version of what you just took.
          It is a different product entirely.
        </p>

        {/* Feature grid */}
        <div className="mb-8 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
          {items.map((item, i) => (
            <div key={i} className="flex items-start gap-3 rounded-xl border border-burl-gray-100 bg-warm-gray px-4 py-3.5">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-teal/10">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-teal">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </span>
              <span className="text-[0.8rem] leading-[1.5] text-burl-gray-500">{item}</span>
            </div>
          ))}
        </div>

        {/* CTA row */}
        <div className="flex flex-col gap-6 rounded-xl bg-warm-gray p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <div>
            <span className="font-serif text-[1.75rem] font-medium tracking-tight text-burl-gray-700">$500</span>
            <p className="mt-0.5 font-sans text-[0.8rem] text-burl-gray-400">1 hour consultation · credited toward engagement</p>
          </div>
          <a
            href={`${PORTAL_URL}/apply`}
            className="inline-flex shrink-0 items-center gap-2.5 rounded-lg bg-gradient-to-br from-teal to-teal-dark px-8 py-4 text-[0.88rem] font-medium text-white shadow-[0_2px_8px_rgba(13,148,136,.25)] transition-all hover:-translate-y-px hover:shadow-[0_6px_20px_rgba(13,148,136,.3)]"
          >
            Get Your Full Assessment
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </a>
        </div>
      </div>

      {/* Trust signals footer */}
      <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 border-t border-burl-gray-100 bg-warm-gray px-7 py-4">
        {['Fee credited toward engagement', 'Delivered within 48 hours', 'Reviewed by a senior adviser'].map((note, i) => (
          <span key={i} className="flex items-center gap-1.5 text-[0.75rem] text-burl-gray-400">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-teal">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            {note}
          </span>
        ))}
      </div>
    </div>
  )
}

function ResultsPhase({ answers, fieldId, onRestart }: { answers: Record<string, number>; fieldId: string; onRestart: () => void }) {
  const applicable = CRITERIA.filter(c => answers[c.id] !== -1 && answers[c.id] !== undefined)
  const [whatIfs, setWhatIfs] = useState<Record<string, boolean>>({})
  const [showUpgrade, setShowUpgrade] = useState(false)
  const [captured, setCaptured] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setShowUpgrade(true), 1500)
    return () => clearTimeout(t)
  }, [])

  const effectiveAnswers = useMemo(() => {
    const out = { ...answers }
    Object.entries(whatIfs).forEach(([criterionId, active]) => {
      if (active) {
        const bumpTo = IMPROVEMENTS[criterionId]?.bumpTo ?? 2
        if ((out[criterionId] ?? 0) < bumpTo) out[criterionId] = bumpTo
      }
    })
    return out
  }, [answers, whatIfs])

  const originalScore = computeScore(answers, applicable)
  const score = computeScore(effectiveAnswers, applicable)
  const tier = getTier(originalScore.pct, originalScore.met)
  const direction = getStrategicDirection(answers, fieldId)
  const interpretation = getInterpretation(tier, originalScore.met)
  const comparison = getComparison(originalScore.pct)

  const whatIfCandidates = applicable
    .filter(c => (answers[c.id] ?? 0) < 2 && IMPROVEMENTS[c.id])
    .slice(0, 4)

  const sortedBreakdown = [...applicable].sort((a, b) => (answers[b.id] ?? 0) - (answers[a.id] ?? 0))

  return (
    <div className="grid min-h-dvh grid-cols-1 pt-[72px] lg:grid-cols-[minmax(0,546px)_minmax(0,1fr)] lg:pt-0">

      {/* Left column — dark panel, sticky */}
      <aside className="relative overflow-hidden px-6 py-10 text-white sm:px-10 lg:sticky lg:top-0 lg:flex lg:h-dvh lg:flex-col lg:px-14 lg:pt-[100px] lg:pb-12" style={{
        background: 'radial-gradient(ellipse 75% 55% at 28% 42%, rgba(13,127,117,.22) 0%, transparent 55%), radial-gradient(ellipse 65% 50% at 72% 82%, rgba(45,212,191,.12) 0%, transparent 50%), linear-gradient(160deg, #040A0F 0%, #061520 22%, #0A2030 45%, #0D3040 65%, #0A2535 85%, #050D15 100%)',
      }}>
        <div className="pointer-events-none absolute inset-0" style={{
          backgroundImage: 'radial-gradient(rgba(45,212,191,.12) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
          maskImage: 'radial-gradient(ellipse 60% 55% at 35% 55%, black 0%, transparent 70%)',
          WebkitMaskImage: 'radial-gradient(ellipse 60% 55% at 35% 55%, black 0%, transparent 70%)',
        }} />

        <div className="relative z-[1] lg:my-auto">
          <span className="mb-5 inline-flex items-center gap-2.5 font-sans text-[0.72rem] font-medium uppercase tracking-[.12em] text-teal-light/80 animate-assess-fade-in">
            <span className="h-px w-5 bg-teal-light/30" />
            Your Results
          </span>

          <h1 className="mb-3 font-serif text-[clamp(1.6rem,2.5vw,2.15rem)] font-medium leading-[1.2] tracking-tight text-white animate-assess-fade-in">
            EB-1A Profile: <span style={{ color: tier.color }}>{tier.name}</span>
          </h1>
          <p className="mb-8 max-w-[46ch] font-sans text-[0.88rem] leading-[1.65] text-white/60 animate-assess-fade-in">
            You meet the threshold for <strong className="text-white">{originalScore.met} of {applicable.length}</strong> applicable
            criteria. USCIS requires evidence satisfying at least 3.
          </p>

          {/* Stats */}
          <div className="mb-8 grid grid-cols-3 gap-6 animate-assess-fade-in">
            {[
              { label: 'Criteria Met', value: `${originalScore.met} / ${applicable.length}`, sub: 'threshold: 3' },
              { label: 'Overall Score', value: `${originalScore.total}`, sub: `of ${originalScore.max}` },
              { label: 'Profile Tier', value: tier.name, sub: 'preliminary', valueColor: tier.color },
            ].map((stat, i) => (
              <div key={i}>
                <div className="mb-1.5 font-sans text-[0.65rem] uppercase tracking-[.08em] text-white/40">{stat.label}</div>
                <div
                  className="mb-0.5 font-serif text-[1.5rem] font-medium tracking-tight"
                  style={{ color: stat.valueColor || '#2DD4BF' }}
                >
                  {stat.value}
                </div>
                <div className="font-sans text-[0.7rem] text-white/30">{stat.sub}</div>
              </div>
            ))}
          </div>

          {/* Strategic Direction */}
          <div className="rounded-xl border border-teal-light/10 bg-white/[.04] p-5">
            <span className="mb-2.5 block font-sans text-[0.65rem] font-semibold uppercase tracking-[.12em] text-teal-light/80">
              Your Strongest Argument
            </span>
            <h4 className="mb-2.5 font-serif text-[1.1rem] font-medium leading-[1.35] text-white">
              {direction.theme}
            </h4>
            <p className="font-sans text-[0.84rem] leading-[1.7] text-white/50">
              {direction.description}
            </p>
          </div>
        </div>

        {/* Footer — step indicator + restart */}
        <div className="relative z-[1] mt-8 shrink-0 border-t border-white/[.06] pt-5 lg:mt-0">
          <div className="mb-3 flex items-center gap-2">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-1 flex-1 rounded-full bg-teal-light" />
            ))}
          </div>
          <div className="flex items-center justify-between">
            <p className="font-sans text-[0.72rem] font-medium uppercase tracking-[.12em] text-white/35">
              Step 3 of 3 — Results
            </p>
            <button
              type="button"
              onClick={onRestart}
              className="font-sans text-[0.75rem] font-medium text-teal-light/60 transition-colors hover:text-teal-light"
            >
              Start over
            </button>
          </div>
        </div>
      </aside>

      {/* Right column — off-white, scrollable */}
      <div className="bg-off-white px-5 py-8 sm:px-8 lg:overflow-y-auto lg:px-14 lg:pt-[100px] lg:pb-16">
        <div className="mx-auto w-full max-w-[600px]">
          {/* Interpretation — collapsible on mobile */}
          <CollapsibleSection title="Interpretation" badge={tier.name}>
            <h4 className="mb-4 font-serif text-[1.15rem] font-medium leading-[1.3] tracking-tight text-burl-gray-700">
              {interpretation.headline}
            </h4>
            <p className="mb-4 font-sans text-[0.9rem] leading-[1.75] text-burl-gray-500">
              {interpretation.body}
            </p>
            <p className="mb-4 font-sans text-[0.84rem] italic leading-[1.65] text-burl-gray-400">
              {comparison}
            </p>
            <p className="font-sans text-[0.9rem] leading-[1.7] text-burl-gray-700">
              <strong>{interpretation.recommendation}</strong>
            </p>
          </CollapsibleSection>

          {/* Criteria Breakdown — collapsible on mobile */}
          <CollapsibleSection title="Criteria Breakdown" badge={`${originalScore.met} met`}>
            <div className="flex flex-col gap-3">
              {sortedBreakdown.map(criterion => {
                const effScore = effectiveAnswers[criterion.id] ?? 0
                const origScore = answers[criterion.id] ?? 0
                const strength = getStrengthLabel(effScore)
                const wasBumped = effScore > origScore
                return (
                  <div key={criterion.id} className="rounded-xl border border-burl-gray-100 bg-white px-5 py-4 shadow-[0_1px_3px_rgba(0,0,0,.04)] lg:bg-white">
                    <div className="mb-2.5 flex items-center justify-between">
                      <span className="font-sans text-[0.88rem] text-burl-gray-700">{criterion.name}</span>
                      <span className="font-sans text-[0.78rem] font-medium" style={{ color: strength.color }}>
                        {wasBumped && (
                          <span className="mr-2 font-sans text-[0.6rem] uppercase tracking-[.08em] text-teal">with change</span>
                        )}
                        {strength.label}
                      </span>
                    </div>
                    <div className="h-[5px] overflow-hidden rounded-full bg-burl-gray-100">
                      <div
                        className="h-full rounded-full transition-all duration-500 ease-[cubic-bezier(.16,1,.3,1)]"
                        style={{ width: `${(effScore / 3) * 100}%`, backgroundColor: strength.color }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </CollapsibleSection>

          {/* What-If — collapsible on mobile */}
          {whatIfCandidates.length > 0 && (
            <CollapsibleSection title="What would change my score?">
              <p className="mb-5 font-sans text-[0.84rem] leading-[1.65] text-burl-gray-400">
                Toggle hypothetical improvements to see their impact on your profile.
              </p>
              <div className="mb-5 flex flex-col gap-2.5">
                {whatIfCandidates.map(c => {
                  const active = !!whatIfs[c.id]
                  return (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => setWhatIfs(prev => ({ ...prev, [c.id]: !prev[c.id] }))}
                      className={`flex items-center justify-between rounded-xl border px-5 py-4 text-left transition-all ${
                        active
                          ? 'border-teal/25 bg-teal/[.05] shadow-[0_1px_3px_rgba(13,148,136,.08)]'
                          : 'border-burl-gray-100 bg-white shadow-[0_1px_3px_rgba(0,0,0,.04)] hover:border-burl-gray-200'
                      }`}
                    >
                      <span className={`flex-1 font-sans text-[0.84rem] leading-[1.5] ${active ? 'text-burl-gray-700' : 'text-burl-gray-500'}`}>
                        {IMPROVEMENTS[c.id]?.label}
                      </span>
                      <span className={`ml-3.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border-[1.5px] transition-all ${
                        active ? 'border-teal bg-teal' : 'border-burl-gray-200 bg-white'
                      }`}>
                        {active && (
                          <svg width="10" height="8" viewBox="0 0 10 8" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="1 4 3.5 6.5 9 1" />
                          </svg>
                        )}
                      </span>
                    </button>
                  )
                })}
              </div>
              {Object.values(whatIfs).some(v => v) && (
                <div className="rounded-xl border border-teal/20 bg-teal/[.04] px-5 py-4 font-sans text-[0.84rem] leading-[1.65] text-burl-gray-500 animate-assess-fade-in">
                  <strong className="text-teal">With these changes:</strong>{' '}
                  Your score moves from {originalScore.total} to <strong className="text-burl-gray-700">{score.total}</strong>,
                  and you meet {score.met} of {applicable.length} criteria.
                </div>
              )}
            </CollapsibleSection>
          )}

          {/* Email capture — collapsible on mobile */}
          {!captured ? (
            <CollapsibleSection title="Save your results">
              <EmailCaptureForm onSubmit={() => setCaptured(true)} />
            </CollapsibleSection>
          ) : (
            <div className="mb-4 rounded-xl border border-teal/20 bg-teal/[.04] px-6 py-5 text-center animate-assess-fade-in lg:mb-12">
              <p className="font-sans text-[0.88rem] text-burl-gray-600">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mr-2 inline-block text-teal">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Results saved. Check your inbox.
              </p>
            </div>
          )}

          {/* Upgrade CTA */}
          {showUpgrade && <UpgradeCTA tier={tier} />}

          {/* Start over + Disclaimer */}
          <div className="mt-14 flex flex-col items-center gap-6 border-t border-burl-gray-100 pt-8">
            <button
              type="button"
              onClick={onRestart}
              className="inline-flex items-center gap-2 rounded-full border border-burl-gray-200 bg-white px-6 py-3 font-sans text-[0.84rem] font-medium text-burl-gray-500 shadow-[0_1px_3px_rgba(0,0,0,.04)] transition-all hover:border-burl-gray-300 hover:text-burl-gray-700"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="1 4 1 10 7 10" />
                <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
              </svg>
              Take assessment again
            </button>
            <p className="max-w-[480px] text-center font-sans text-[0.75rem] leading-[1.6] text-burl-gray-300">
              Self-assessment is for informational purposes only. It does not constitute legal advice
              or a guarantee of eligibility. Burlington Consult provides immigration strategy and
              advisory services and does not practise law.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

const LOADING_STEPS = [
  'Reviewing your responses',
  'Mapping against EB-1A criteria',
  'Generating your profile',
]

function LoadingPhase() {
  const [progress, setProgress] = useState(0)
  const [stepIndex, setStepIndex] = useState(0)

  useEffect(() => {
    const timers = [
      setTimeout(() => setProgress(30), 300),
      setTimeout(() => { setProgress(55); setStepIndex(1) }, 900),
      setTimeout(() => { setProgress(80); setStepIndex(2) }, 1600),
      setTimeout(() => setProgress(100), 2200),
    ]
    return () => timers.forEach(clearTimeout)
  }, [])

  return (
    <SplitLayout step={2}>
      <div className="mx-auto flex w-full max-w-[480px] flex-1 flex-col items-center justify-center animate-assess-fade-in">
        <span className="mb-5 inline-flex items-center gap-2.5 text-[0.72rem] font-medium uppercase tracking-[.12em] text-teal">
          <span className="h-px w-5 bg-teal/30" />
          Processing
          <span className="h-px w-5 bg-teal/30" />
        </span>
        <h2 className="mb-8 font-serif text-[1.5rem] font-medium tracking-tight text-burl-gray-700">
          Analysing your profile
        </h2>
        <div className="mb-6 h-[3px] w-full max-w-[280px] overflow-hidden rounded-full bg-burl-gray-100">
          <div
            className="h-full rounded-full bg-gradient-to-r from-teal to-teal-light transition-all duration-700 ease-[cubic-bezier(.16,1,.3,1)]"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-[0.84rem] text-burl-gray-400">
          {LOADING_STEPS[stepIndex]}
        </p>
      </div>
    </SplitLayout>
  )
}

export function Assessment() {
  const [phase, setPhase] = useState<'intro' | 'field' | 'questions' | 'loading' | 'results'>('intro')
  const [fieldId, setFieldId] = useState<string | null>(null)
  const [answers, setAnswers] = useState<Record<string, number>>({})

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    if (phase === 'loading') {
      const timer = setTimeout(() => setPhase('results'), 2500)
      return () => clearTimeout(timer)
    }
  }, [phase])

  const handleRestart = useCallback(() => {
    setFieldId(null)
    setAnswers({})
    setPhase('intro')
  }, [])

  return (
    <div>
      {phase === 'intro' && <IntroPhase onStart={() => setPhase('field')} />}
      {phase === 'field' && <FieldPhase onSelect={(id) => { setFieldId(id); setPhase('questions') }} />}
      {phase === 'questions' && fieldId && <QuestionsPhase fieldId={fieldId} onComplete={(a) => { setAnswers(a); setPhase('loading') }} onBack={() => setPhase('field')} />}
      {phase === 'loading' && <LoadingPhase />}
      {phase === 'results' && fieldId && <ResultsPhase answers={answers} fieldId={fieldId} onRestart={handleRestart} />}
    </div>
  )
}
