'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@burlington/shared/src/supabase/client'

export function WelcomeView({ displayName }: { displayName: string }) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleContinue = async () => {
    setIsLoading(true)
    setError('')

    try {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.replace('/login')
        return
      }

      const { error: updateError } = await supabase
        .from('profiles')
        .update({ onboarded_at: new Date().toISOString() })
        .eq('id', user.id)

      if (updateError) {
        console.error('[WelcomeView] Failed to set onboarded_at', updateError)
        setError('Something went wrong. Please try again.')
        setIsLoading(false)
        return
      }

      router.replace('/dashboard')
      router.refresh()
    } catch {
      setError('Connection lost. Please try again.')
      setIsLoading(false)
    }
  }

  return (
    <main className="flex min-h-dvh items-center justify-center px-6">
      <div className="w-full max-w-lg text-center">
        <div className="mx-auto mb-8 flex h-16 w-16 items-center justify-center rounded-2xl border border-teal/15 bg-teal/[.06]">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-teal">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        </div>

        <h1 className="mb-3 font-serif text-[1.75rem] font-medium leading-[1.2] tracking-tight text-burl-gray-700">
          Welcome, {displayName}.
        </h1>
        <p className="mb-8 text-[0.9rem] leading-[1.7] text-burl-gray-400">
          Your application has been approved. You are now a Burlington Consult client. We will guide you through the next steps to begin your immigration journey.
        </p>

        {error && (
          <div role="alert" className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-[0.8125rem] text-red-700">
            {error}
          </div>
        )}

        <button
          type="button"
          onClick={handleContinue}
          disabled={isLoading}
          className="auth-btn-primary mx-auto inline-flex justify-center"
        >
          {isLoading ? 'Loading...' : 'Go to your dashboard'}
          {!isLoading && (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          )}
        </button>
      </div>
    </main>
  )
}
