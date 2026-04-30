'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { getMarketingUrl, MARKETING_URL_FALLBACK } from '../../lib/utils/marketing-url'
import { AuthBackLink } from './AuthBackLink'
import { AuthWordmark } from './AuthWordmark'
import { AuthFooter } from './AuthFooter'

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(true)
  const [is2FA, setIs2FA] = useState(false)
  const [email, setEmail] = useState('')
  const [backUrl, setBackUrl] = useState(MARKETING_URL_FALLBACK)

  useEffect(() => {
    const base = getMarketingUrl()
    const from = new URLSearchParams(window.location.search).get('from')
    setBackUrl(from && from.startsWith('/') ? base + from : base)
  }, [])

  return (
    <main className="auth-form-panel">
      <div className="auth-form-top">
        {is2FA ? (
          <AuthBackLink onClick={() => setIs2FA(false)} label="Back" />
        ) : (
          <AuthBackLink href={backUrl} external label="Back to site" />
        )}
        <AuthWordmark />
      </div>

      <div className="auth-form-wrap">
        {!is2FA ? (
          <SignInStep
            showPassword={showPassword}
            onTogglePassword={() => setShowPassword(!showPassword)}
            rememberMe={rememberMe}
            onToggleRemember={() => setRememberMe(!rememberMe)}
            email={email}
            onEmailChange={setEmail}
            onSubmit={() => setIs2FA(true)}
          />
        ) : (
          <TwoFAStep email={email} />
        )}
      </div>

      <AuthFooter />
    </main>
  )
}

function SignInStep({
  showPassword,
  onTogglePassword,
  rememberMe,
  onToggleRemember,
  email,
  onEmailChange,
  onSubmit,
}: {
  showPassword: boolean
  onTogglePassword: () => void
  rememberMe: boolean
  onToggleRemember: () => void
  email: string
  onEmailChange: (v: string) => void
  onSubmit: () => void
}) {
  return (
    <>
      <h1 className="mb-2 font-serif text-[1.4375rem] font-medium leading-[1.2] tracking-tight text-burl-gray-700">
        Welcome back.
      </h1>
      <p className="mb-10 text-[0.84rem] leading-[1.6] text-burl-gray-400">
        Access your case, documents, and progress.
      </p>

      <form onSubmit={(e) => { e.preventDefault(); onSubmit() }}>
        <div className="auth-field">
          <label htmlFor="login-email" className="auth-field-label">Email address</label>
          <input
            id="login-email"
            className="auth-field-input"
            type="email"
            autoComplete="email"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => onEmailChange(e.target.value)}
          />
        </div>

        <div className="auth-field">
          <label htmlFor="login-password" className="auth-field-label">Password</label>
          <div className="relative">
            <input
              id="login-password"
              className="auth-field-input pr-11"
              type={showPassword ? 'text' : 'password'}
              autoComplete="current-password"
              placeholder="Enter your password"
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
          <div className="mt-2 flex justify-end">
            <Link href="/forgot-password" className="text-[0.72rem] font-medium text-teal transition-colors hover:text-teal-dark">
              Forgot password?
            </Link>
          </div>
        </div>

        <div className="my-5 mb-7">
          <button type="button" onClick={onToggleRemember} className="auth-remember">
            <span
              className={`auth-remember-box ${rememberMe ? 'auth-remember-checked' : ''}`}
              role="checkbox"
              aria-checked={rememberMe}
            >
              {rememberMe && (
                <svg width="9" height="7" viewBox="0 0 9 7" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="1 3.5 3.5 6 8 1" />
                </svg>
              )}
            </span>
            Remember this device for 30 days
          </button>
        </div>

        <button type="submit" className="auth-btn-primary">
          Sign in
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </button>
      </form>

      <div className="auth-divider"><span>Or</span></div>

      <button type="button" className="auth-btn-sso">
        <svg width="16" height="16" viewBox="0 0 24 24">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
        </svg>
        Continue with Google
      </button>

      <p className="mt-6 text-[0.8125rem] text-burl-gray-400">
        New here?{' '}
        <Link href="/apply" className="font-medium text-teal transition-colors hover:text-teal-dark">
          Start your application &rarr;
        </Link>
      </p>
    </>
  )
}

function maskEmail(email: string): string {
  const [local, domain] = email.split('@')
  if (!local || !domain) return email
  const visible = local.length <= 3 ? local.charAt(0) : local.slice(0, 3)
  return `${visible}${'*'.repeat(Math.max(local.length - visible.length, 2))}@${domain}`
}

function useResendCooldown(seconds: number) {
  const [remaining, setRemaining] = useState(seconds)

  useEffect(() => {
    if (remaining <= 0) return
    const timer = setTimeout(() => setRemaining(remaining - 1), 1000)
    return () => clearTimeout(timer)
  }, [remaining])

  const reset = () => setRemaining(seconds)
  return { remaining, canResend: remaining <= 0, reset }
}

function TwoFAStep({ email }: { email: string }) {
  const { remaining, canResend, reset } = useResendCooldown(30)

  const handleResend = () => {
    if (!canResend) return
    reset()
  }

  const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
    const input = e.currentTarget
    if (input.value.length === 1) {
      const next = input.nextElementSibling as HTMLInputElement | null
      next?.focus()
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !e.currentTarget.value) {
      const prev = e.currentTarget.previousElementSibling as HTMLInputElement | null
      prev?.focus()
    }
  }

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const paste = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6)
    if (paste.length === 0) return
    e.preventDefault()
    const container = e.currentTarget.parentElement
    if (!container) return
    const inputs = container.querySelectorAll<HTMLInputElement>('input')
    paste.split('').forEach((char, i) => {
      if (inputs[i]) inputs[i].value = char
    })
    const focusIndex = Math.min(paste.length, 5)
    inputs[focusIndex]?.focus()
  }

  return (
    <>
      <h1 className="mb-2 font-serif text-[1.4375rem] font-medium leading-[1.2] tracking-tight text-burl-gray-700">
        Check your email.
      </h1>
      <p className="mb-3 text-[0.84rem] leading-[1.6] text-burl-gray-400">
        We&apos;ve sent a 6-digit verification code to:
      </p>
      <p className="mb-8 text-[0.875rem] font-medium text-burl-gray-700">
        {maskEmail(email)}
      </p>

      <div className="auth-otp-help">
        <b>Note</b> &middot; The code expires in 10 minutes. If you don&apos;t see it, check your spam folder. The email comes from <span className="font-medium text-burl-gray-500">hello@burlingtonconsult.com</span>.
      </div>

      <form onSubmit={(e) => { e.preventDefault() }}>
        <div className="auth-field">
          <label className="auth-field-label">6-digit code</label>
          <div className="flex gap-2.5">
            {Array.from({ length: 6 }).map((_, i) => (
              <input
                key={i}
                className="auth-otp-digit"
                type="text"
                maxLength={1}
                inputMode="numeric"
                autoComplete="one-time-code"
                aria-label={`Digit ${i + 1} of 6`}
                onInput={handleInput}
                onKeyDown={handleKeyDown}
                onPaste={i === 0 ? handlePaste : undefined}
              />
            ))}
          </div>
        </div>

        <button type="submit" className="auth-btn-primary">
          Verify &amp; sign in
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </button>
      </form>

      <p className="mt-5 text-center text-[0.75rem] text-burl-gray-400">
        Didn&apos;t receive it?{' '}
        {canResend ? (
          <button type="button" onClick={handleResend} className="font-medium text-teal transition-colors hover:text-teal-dark">
            Resend code
          </button>
        ) : (
          <span className="font-medium tabular-nums text-burl-gray-300">Resend in {remaining}s</span>
        )}
      </p>
    </>
  )
}
