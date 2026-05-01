'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@burlington/shared/src/supabase/client'
import { loginSchema } from '../../lib/schemas/auth'
import { getMarketingUrl, MARKETING_URL_FALLBACK } from '../../lib/utils/marketing-url'
import { AuthBackLink } from './AuthBackLink'
import { AuthWordmark } from './AuthWordmark'
import { AuthFooter } from './AuthFooter'

export function LoginForm() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isRedirecting, setIsRedirecting] = useState(false)
  const [backUrl, setBackUrl] = useState(MARKETING_URL_FALLBACK)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const base = getMarketingUrl()
    const from = params.get('from')
    setBackUrl(from && from.startsWith('/') ? base + from : base)

    if (params.get('error') === 'auth') {
      setError('Google sign-in failed. Please try again.')
    }
  }, [])

  const handleLogin = async () => {
    const parsed = loginSchema.safeParse({ email, password })
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? 'Invalid input')
      return
    }
    setError('')
    setIsLoading(true)

    const supabase = createClient()
    const { error: authError } = await supabase.auth.signInWithPassword({
      email: parsed.data.email,
      password: parsed.data.password,
    })

    if (authError) {
      if (authError.message.includes('Invalid login credentials')) {
        const res = await fetch('/api/check-auth-method', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email }),
        })
        if (res.ok) {
          const { isOAuthOnly } = await res.json()
          if (isOAuthOnly) {
            setIsLoading(false)
            setError('This account uses Google sign-in. Please use "Continue with Google" below, or set a password in your profile settings.')
            return
          }
        }
        setIsLoading(false)
        setError('Invalid email or password. Please try again.')
      } else if (authError.message.includes('Email not confirmed')) {
        setIsLoading(false)
        setError('Please verify your email address before signing in.')
      } else {
        setIsLoading(false)
        setError('Unable to sign in. Please try again.')
      }
      return
    }

    const maxAge = rememberMe ? 7 * 24 * 60 * 60 : 24 * 60 * 60
    await fetch('/api/set-persist', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ maxAge }),
    })

    setIsRedirecting(true)

    const params = new URLSearchParams(window.location.search)
    const redirectTo = params.get('redirect')
    const safeRedirect = redirectTo && redirectTo.startsWith('/') && !redirectTo.startsWith('//') ? redirectTo : '/'
    router.replace(safeRedirect)
    router.refresh()
  }

  return (
    <main className="auth-form-panel">
      <div className="auth-form-top">
        <AuthBackLink href={backUrl} external label="Back to site" />
        <AuthWordmark />
      </div>

      <div className="auth-form-wrap">
        {isRedirecting ? (
          <div className="flex flex-col items-center py-16">
            <div className="mb-6 h-8 w-8 animate-spin rounded-full border-2 border-burl-gray-200 border-t-teal" />
            <p className="text-[0.875rem] text-burl-gray-400">Signing you in...</p>
          </div>
        ) : (
          <SignInStep
            showPassword={showPassword}
            onTogglePassword={() => setShowPassword(!showPassword)}
            rememberMe={rememberMe}
            onToggleRemember={() => setRememberMe(!rememberMe)}
            email={email}
            onEmailChange={setEmail}
            password={password}
            onPasswordChange={setPassword}
            error={error}
            isLoading={isLoading}
            onSubmit={handleLogin}
          />
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
  password,
  onPasswordChange,
  error,
  isLoading,
  onSubmit,
}: {
  showPassword: boolean
  onTogglePassword: () => void
  rememberMe: boolean
  onToggleRemember: () => void
  email: string
  onEmailChange: (v: string) => void
  password: string
  onPasswordChange: (v: string) => void
  error: string
  isLoading: boolean
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

      {error && (
        <div role="alert" className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-[0.8125rem] text-red-700">
          {error}
        </div>
      )}

      <form onSubmit={(e) => { e.preventDefault(); onSubmit() }}>
        <div className="auth-field">
          <label htmlFor="login-email" className="auth-field-label">Email address</label>
          <input
            id="login-email"
            className="auth-field-input"
            type="email"
            autoComplete="email"
            placeholder="name@example.com"
            required
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
              required
              value={password}
              onChange={(e) => onPasswordChange(e.target.value)}
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
            Remember this device for 7 days
          </button>
        </div>

        <button type="submit" className="auth-btn-primary" disabled={isLoading}>
          {isLoading ? 'Signing in…' : 'Sign in'}
          {!isLoading && (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          )}
        </button>
      </form>

      <div className="auth-divider"><span>Or</span></div>

      <button
        type="button"
        className="auth-btn-sso"
        onClick={async () => {
          const supabase = createClient()
          await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
              redirectTo: `${window.location.origin}/auth/callback`,
            },
          })
        }}
      >
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

