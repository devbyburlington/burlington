'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { createClient } from '@burlington/shared/src/supabase/client'
import { forgotPasswordSchema } from '../../lib/schemas/auth'
import { AuthBackLink } from './AuthBackLink'
import { AuthWordmark } from './AuthWordmark'
import { AuthFooter } from './AuthFooter'

async function sendResetEmail(email: string): Promise<string | null> {
  const supabase = createClient()
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/auth/callback?next=/reset-password`,
  })
  if (error) return error.message
  return null
}

export function ForgotPasswordForm() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const parsed = forgotPasswordSchema.safeParse({ email })
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? 'Enter a valid email address')
      return
    }
    setError('')
    setIsLoading(true)

    try {
      const res = await fetch('/api/check-auth-method', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim() }),
      })
      if (res.ok) {
        const { isOAuthOnly } = await res.json()
        if (isOAuthOnly) {
          setIsLoading(false)
          setError('This account uses Google sign-in and does not have a password to reset. Please use "Continue with Google" on the sign-in page.')
          return
        }
      }
    } catch { /* network error — proceed with reset attempt */ }

    const err = await sendResetEmail(email)
    setIsLoading(false)
    if (err) {
      setError('Unable to send reset link. Please try again.')
      return
    }
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
          <RequestStep email={email} onEmailChange={setEmail} onSubmit={handleSubmit} error={error} isLoading={isLoading} />
        ) : (
          <SentStep email={email} onResend={() => sendResetEmail(email)} />
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
  error,
  isLoading,
}: {
  email: string
  onEmailChange: (v: string) => void
  onSubmit: (e: React.FormEvent) => void
  error: string
  isLoading: boolean
}) {
  return (
    <>
      <h1 className="mb-2 font-serif text-[1.4375rem] font-medium leading-[1.2] tracking-tight text-burl-gray-700">
        Reset your password.
      </h1>
      <p className="mb-10 text-[0.84rem] leading-[1.6] text-burl-gray-400">
        Enter the email address associated with your account. We&apos;ll send a link to reset your password.
      </p>

      {error && (
        <div role="alert" className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-[0.8125rem] text-red-700">
          {error}
        </div>
      )}

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

        <button type="submit" className="auth-btn-primary" disabled={isLoading}>
          {isLoading ? 'Sending…' : 'Send reset link'}
          {!isLoading && (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          )}
        </button>
      </form>
    </>
  )
}

function SentStep({ email, onResend }: { email: string; onResend: () => Promise<string | null> }) {
  const [remaining, setRemaining] = useState(60)

  useEffect(() => {
    if (remaining <= 0) return
    const timer = setTimeout(() => setRemaining(remaining - 1), 1000)
    return () => clearTimeout(timer)
  }, [remaining])

  const handleResend = async () => {
    if (remaining > 0) return
    await onResend()
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
