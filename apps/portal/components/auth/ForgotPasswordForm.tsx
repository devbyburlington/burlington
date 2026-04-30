'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { AuthBackLink } from './AuthBackLink'
import { AuthWordmark } from './AuthWordmark'
import { AuthFooter } from './AuthFooter'

export function ForgotPasswordForm() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return
    setSent(true)
  }

  return (
    <main className="auth-form-panel">
      <div className="auth-form-top">
        <AuthBackLink href="/login" label="Back to sign in" />
        <AuthWordmark />
      </div>

      <div className="auth-form-wrap">
        {!sent ? (
          <RequestStep email={email} onEmailChange={setEmail} onSubmit={handleSubmit} />
        ) : (
          <SentStep email={email} />
        )}
      </div>

      <AuthFooter />
    </main>
  )
}

function RequestStep({
  email,
  onEmailChange,
  onSubmit,
}: {
  email: string
  onEmailChange: (v: string) => void
  onSubmit: (e: React.FormEvent) => void
}) {
  return (
    <>
      <h1 className="mb-2 font-serif text-[1.4375rem] font-medium leading-[1.2] tracking-tight text-burl-gray-700">
        Reset your password.
      </h1>
      <p className="mb-10 text-[0.84rem] leading-[1.6] text-burl-gray-400">
        Enter the email address associated with your account. We&apos;ll send a link to reset your password.
      </p>

      <form onSubmit={onSubmit}>
        <div className="auth-field">
          <label htmlFor="reset-email" className="auth-field-label">Email address</label>
          <input
            id="reset-email"
            className="auth-field-input"
            type="email"
            autoComplete="email"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => onEmailChange(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="auth-btn-primary">
          Send reset link
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </button>
      </form>
    </>
  )
}

function SentStep({ email }: { email: string }) {
  const [remaining, setRemaining] = useState(60)

  useEffect(() => {
    if (remaining <= 0) return
    const timer = setTimeout(() => setRemaining(remaining - 1), 1000)
    return () => clearTimeout(timer)
  }, [remaining])

  const handleResend = () => {
    if (remaining > 0) return
    setRemaining(60)
  }

  return (
    <>
      <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl border border-teal/15 bg-teal/[.06]">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-teal">
          <rect x="2" y="4" width="20" height="16" rx="2" />
          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
        </svg>
      </div>

      <h1 className="mb-2 font-serif text-[1.4375rem] font-medium leading-[1.2] tracking-tight text-burl-gray-700">
        Check your inbox.
      </h1>
      <p className="mb-3 text-[0.84rem] leading-[1.6] text-burl-gray-400">
        We&apos;ve sent a password reset link to:
      </p>
      <p className="mb-8 text-[0.875rem] font-medium text-burl-gray-700">
        {email}
      </p>

      <div className="auth-otp-help">
        <b>Note</b> &middot; The link expires in 60 minutes. If you don&apos;t see it, check your spam folder. The email comes from <span className="font-medium text-burl-gray-500">hello@burlingtonconsult.com</span>.
      </div>

      <div className="mt-8 flex flex-col gap-3">
        <Link href="/login" className="auth-btn-primary justify-center">
          Return to sign in
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </Link>

        <button
          type="button"
          onClick={handleResend}
          disabled={remaining > 0}
          className={`auth-btn-sso ${remaining > 0 ? 'cursor-not-allowed opacity-50' : ''}`}
        >
          {remaining > 0 ? <span className="tabular-nums">Resend email in {remaining}s</span> : 'Resend email'}
        </button>
      </div>

      <p className="mt-8 text-[0.78rem] leading-[1.6] text-burl-gray-300">
        Wrong email? <Link href="/forgot-password" className="font-medium text-teal transition-colors hover:text-teal-dark" onClick={() => window.location.reload()}>Try again</Link>
      </p>
    </>
  )
}
