'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { getMarketingUrl, MARKETING_URL_FALLBACK } from '../../lib/utils/marketing-url'
import { AuthBackLink } from './AuthBackLink'
import { AuthWordmark } from './AuthWordmark'
import { AuthFooter } from './AuthFooter'

type ApplicationStatus = 'pending' | 'approved' | 'waitlisted' | 'rejected'

export function StatusView() {
  // TODO: fetch real status from Supabase
  const status = 'pending' as ApplicationStatus
  const appliedAt = new Date().toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
  const [backUrl, setBackUrl] = useState(MARKETING_URL_FALLBACK)

  useEffect(() => {
    setBackUrl(getMarketingUrl())
  }, [])

  return (
    <main className="auth-form-panel">
      <div className="auth-form-top">
        <AuthBackLink href={backUrl} external label="Back to site" />
        <AuthWordmark />
      </div>

      <div className="auth-form-wrap">
        {status === 'pending' && <PendingState appliedAt={appliedAt} />}
        {status === 'approved' && <ApprovedState />}
        {status === 'waitlisted' && <WaitlistedState />}
        {status === 'rejected' && <RejectedState />}
      </div>

      <AuthFooter />
    </main>
  )
}

function StatusIcon({ children, colour }: { children: React.ReactNode; colour: string }) {
  return (
    <div className={`mb-8 flex h-14 w-14 items-center justify-center rounded-2xl border ${colour}`}>
      {children}
    </div>
  )
}

function PendingState({ appliedAt }: { appliedAt: string }) {
  return (
    <>
      <StatusIcon colour="border-amber-500/15 bg-amber-500/[.06]">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-amber-500">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      </StatusIcon>

      <h1 className="mb-2 font-serif text-[1.4375rem] font-medium leading-[1.2] tracking-tight text-burl-gray-700">
        Application under review.
      </h1>
      <p className="mb-6 text-[0.84rem] leading-[1.6] text-burl-gray-400">
        Our team is reviewing your application. We aim to respond within <span className="font-medium text-burl-gray-700">48 hours</span> of submission.
      </p>

      <div className="mb-8 rounded-lg border border-burl-gray-200 bg-warm-gray/60 px-4 py-3">
        <div className="flex items-center justify-between text-[0.75rem] text-burl-gray-400">
          <span>Submitted</span>
          <span className="font-medium text-burl-gray-700">{appliedAt}</span>
        </div>
        <div className="mt-2 flex items-center justify-between text-[0.75rem] text-burl-gray-400">
          <span>Status</span>
          <span className="inline-flex items-center gap-1.5 font-medium text-amber-600">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-amber-500" />
            Under review
          </span>
        </div>
      </div>

      <div className="auth-otp-help">
        <b>What to expect</b> &middot; You will receive an email once a decision has been made. In the meantime, there is nothing else you need to do.
      </div>

      <div className="mt-8">
        <Link href="/login" className="auth-btn-sso justify-center">
          Return to sign in
        </Link>
      </div>
    </>
  )
}

function ApprovedState() {
  return (
    <>
      <StatusIcon colour="border-teal/15 bg-teal/[.06]">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-teal">
          <path d="M9 12l2 2 4-4" />
          <path d="M12 3c7.2 0 9 1.8 9 9s-1.8 9-9 9-9-1.8-9-9 1.8-9 9-9z" />
        </svg>
      </StatusIcon>

      <h1 className="mb-2 font-serif text-[1.4375rem] font-medium leading-[1.2] tracking-tight text-burl-gray-700">
        You have been approved.
      </h1>
      <p className="mb-6 text-[0.84rem] leading-[1.6] text-burl-gray-400">
        Congratulations. Your application has been reviewed and accepted. You can now sign in and begin your onboarding.
      </p>

      <div className="mb-8 rounded-lg border border-burl-gray-200 bg-warm-gray/60 px-4 py-3">
        <div className="flex items-center justify-between text-[0.75rem] text-burl-gray-400">
          <span>Status</span>
          <span className="inline-flex items-center gap-1.5 font-medium text-teal">
            <span className="h-1.5 w-1.5 rounded-full bg-teal" />
            Approved
          </span>
        </div>
      </div>

      <div className="mt-8">
        <Link href="/login" className="auth-btn-primary justify-center">
          Sign in to get started
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </Link>
      </div>
    </>
  )
}

function WaitlistedState() {
  return (
    <>
      <StatusIcon colour="border-blue-500/15 bg-blue-500/[.06]">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-blue-500">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <line x1="19" y1="8" x2="19" y2="14" />
          <line x1="22" y1="11" x2="16" y2="11" />
        </svg>
      </StatusIcon>

      <h1 className="mb-2 font-serif text-[1.4375rem] font-medium leading-[1.2] tracking-tight text-burl-gray-700">
        You are on our waitlist.
      </h1>
      <p className="mb-6 text-[0.84rem] leading-[1.6] text-burl-gray-400">
        We have reviewed your application and believe there may be a fit, but our current capacity is limited. We will reach out as soon as a place becomes available.
      </p>

      <div className="mb-8 rounded-lg border border-burl-gray-200 bg-warm-gray/60 px-4 py-3">
        <div className="flex items-center justify-between text-[0.75rem] text-burl-gray-400">
          <span>Status</span>
          <span className="inline-flex items-center gap-1.5 font-medium text-blue-600">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
            Waitlisted
          </span>
        </div>
      </div>

      <div className="auth-otp-help">
        <b>No action required</b> &middot; You do not need to reapply. We will notify you by email when your place is confirmed. This typically takes 2 to 4 weeks.
      </div>

      <div className="mt-8">
        <Link href="/login" className="auth-btn-sso justify-center">
          Return to sign in
        </Link>
      </div>
    </>
  )
}

function RejectedState() {
  // TODO: pull rejection reason from Supabase
  const reason = 'Based on the information provided, your professional profile does not currently meet the evidentiary threshold for an EB-1A or EB-2 NIW petition.'
  const steps = [
    'Strengthen your publication record or secure additional peer citations.',
    'Obtain documented evidence of awards or recognition in your field.',
    'Secure a leadership role with demonstrable impact at your organisation.',
  ]

  return (
    <>
      <StatusIcon colour="border-burl-gray-300/30 bg-burl-gray-100/60">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-burl-gray-400">
          <circle cx="12" cy="12" r="10" />
          <line x1="15" y1="9" x2="9" y2="15" />
          <line x1="9" y1="9" x2="15" y2="15" />
        </svg>
      </StatusIcon>

      <h1 className="mb-2 font-serif text-[1.4375rem] font-medium leading-[1.2] tracking-tight text-burl-gray-700">
        Application not approved.
      </h1>
      <p className="mb-6 text-[0.84rem] leading-[1.6] text-burl-gray-400">
        After careful review, we are unable to accept your application at this time.
      </p>

      <div className="mb-6 rounded-lg border border-burl-gray-200 bg-warm-gray/60 px-4 py-3">
        <div className="flex items-center justify-between text-[0.75rem] text-burl-gray-400">
          <span>Status</span>
          <span className="inline-flex items-center gap-1.5 font-medium text-burl-gray-500">
            <span className="h-1.5 w-1.5 rounded-full bg-burl-gray-400" />
            Not approved
          </span>
        </div>
      </div>

      <div className="mb-6">
        <p className="mb-1.5 text-[0.72rem] font-medium uppercase tracking-[.04em] text-burl-gray-400">Reason</p>
        <p className="text-[0.84rem] leading-[1.6] text-burl-gray-500">{reason}</p>
      </div>

      <div className="mb-8">
        <p className="mb-3 text-[0.72rem] font-medium uppercase tracking-[.04em] text-burl-gray-400">Suggested next steps</p>
        <ul className="space-y-2">
          {steps.map((s, i) => (
            <li key={i} className="flex gap-2.5 text-[0.84rem] leading-[1.6] text-burl-gray-500">
              <span className="mt-[3px] flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-burl-gray-100 text-[0.6rem] font-medium text-burl-gray-400">
                {i + 1}
              </span>
              {s}
            </li>
          ))}
        </ul>
      </div>

      <div className="auth-otp-help">
        <b>You may reapply</b> &middot; If your circumstances change, you are welcome to submit a new application. There is no waiting period.
      </div>

      <div className="mt-8 flex flex-col gap-3">
        <Link href="/apply" className="auth-btn-primary justify-center">
          Start a new application
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </Link>
        <Link href="/login" className="auth-btn-sso justify-center">
          Return to sign in
        </Link>
      </div>
    </>
  )
}
