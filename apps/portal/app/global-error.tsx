'use client'

import { useEffect } from 'react'
import * as Sentry from '@sentry/nextjs'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    Sentry.captureException(error)
  }, [error])

  return (
    <html lang="en">
      <body className="bg-ink font-sans text-white antialiased">
        <main className="flex min-h-dvh flex-col items-center justify-center px-6 text-center">
          <h2 className="font-serif text-2xl text-burl-gray-700">
            Something went wrong
          </h2>
          <p className="mt-3 max-w-md text-[0.875rem] leading-relaxed text-burl-gray-400">
            We have been notified and are looking into it. You can try again,
            or head back to your dashboard.
          </p>
          <div className="mt-6 flex gap-3">
            <button
              type="button"
              onClick={reset}
              className="auth-btn-primary"
            >
              Try again
            </button>
            <a
              href="/dashboard"
              className="inline-flex h-11 items-center rounded-lg border border-white/10 px-5 text-[0.8125rem] font-medium text-burl-gray-400 transition-colors hover:text-white"
            >
              Dashboard
            </a>
          </div>
        </main>
      </body>
    </html>
  )
}
