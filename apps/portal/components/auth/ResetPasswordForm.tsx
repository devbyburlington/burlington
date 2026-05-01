'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@burlington/shared/src/supabase/client'
import { isPasswordStrong, PASSWORD_RULES } from '../../lib/schemas/auth'
import { AuthBackLink } from './AuthBackLink'
import { AuthWordmark } from './AuthWordmark'
import { AuthFooter } from './AuthFooter'

export function ResetPasswordForm() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!isPasswordStrong(password)) {
      setError('Password must be at least 8 characters with uppercase, lowercase, and a symbol.')
      return
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    setIsLoading(true)

    const supabase = createClient()
    const { error: updateError } = await supabase.auth.updateUser({
      password,
    })

    if (updateError) {
      setIsLoading(false)
      if (updateError.message.includes('same password')) {
        setError('New password must be different from your current password.')
      } else {
        setError('Unable to update password. Please try again.')
      }
      return
    }

    setSuccess(true)
  }

  if (success) {
    return (
      <main className="auth-form-panel">
        <div className="auth-form-top">
          <AuthWordmark />
        </div>

        <div className="auth-form-wrap">
          <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl border border-teal/15 bg-teal/[.06]">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-teal">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>

          <h1 className="mb-2 font-serif text-[1.4375rem] font-medium leading-[1.2] tracking-tight text-burl-gray-700">
            Password updated.
          </h1>
          <p className="mb-8 text-[0.84rem] leading-[1.6] text-burl-gray-400">
            Your password has been changed successfully. You can now sign in with your new password.
          </p>

          <Link href="/login" className="auth-btn-primary justify-center">
            Sign in
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        </div>

        <AuthFooter />
      </main>
    )
  }

  return (
    <main className="auth-form-panel">
      <div className="auth-form-top">
        <AuthBackLink href="/login" label="Back to sign in" />
        <AuthWordmark />
      </div>

      <div className="auth-form-wrap">
        <h1 className="mb-2 font-serif text-[1.4375rem] font-medium leading-[1.2] tracking-tight text-burl-gray-700">
          Set a new password.
        </h1>
        <p className="mb-10 text-[0.84rem] leading-[1.6] text-burl-gray-400">
          Choose a strong password for your account.
        </p>

        {error && (
          <div role="alert" className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-[0.8125rem] text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="auth-field">
            <label htmlFor="new-password" className="auth-field-label">New password</label>
            <div className="relative">
              <input
                id="new-password"
                className="auth-field-input pr-11"
                type={showPassword ? 'text' : 'password'}
                autoComplete="new-password"
                placeholder="Enter your new password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
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

            <PasswordStrength password={password} />
          </div>

          <div className="auth-field">
            <label htmlFor="confirm-password" className="auth-field-label">Confirm password</label>
            <input
              id="confirm-password"
              className="auth-field-input"
              type="password"
              autoComplete="new-password"
              placeholder="Re-enter your new password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="auth-btn-primary" disabled={isLoading}>
            {isLoading ? 'Updating…' : 'Update password'}
            {!isLoading && (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            )}
          </button>
        </form>
      </div>

      <AuthFooter />
    </main>
  )
}

function PasswordStrength({ password }: { password: string }) {
  if (!password) return null

  const checks = PASSWORD_RULES.map((r) => ({
    label: r.label,
    met: r.test(password),
  }))

  return (
    <ul className="mt-2 space-y-1">
      {checks.map(({ label, met }) => (
        <li key={label} className={`flex items-center gap-1.5 text-[0.72rem] ${met ? 'text-teal' : 'text-burl-gray-300'}`}>
          {met ? (
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          ) : (
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <circle cx="12" cy="12" r="10" />
            </svg>
          )}
          {label}
        </li>
      ))}
    </ul>
  )
}
