'use client'

import { useState } from 'react'

export function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'success'>('idle')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return
    setStatus('success')
    setEmail('')
  }

  if (status === 'success') {
    return (
      <div className="mt-6 text-center sm:mt-0">
        <div className="mb-2 flex items-center justify-center gap-2 sm:justify-start">
          <svg viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-teal-light stroke-[2.5]">
            <polyline points="20 6 9 17 4 12" />
          </svg>
          <span className="text-[0.86rem] font-medium text-teal-light">Subscribed</span>
        </div>
        <p className="text-[0.78rem] text-white/35">
          Welcome to The Burlington Brief.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 sm:mt-0">
      <div className="flex flex-col gap-2.5 sm:flex-row">
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="you@example.com"
          required
          className="h-11 flex-1 rounded-lg border border-white/10 bg-white/[.06] px-4 text-[0.84rem] text-white placeholder-white/25 outline-none transition-colors focus:border-teal/40 focus:bg-white/[.08]"
        />
        <button
          type="submit"
          className="h-11 shrink-0 rounded-lg bg-teal px-5 text-[0.82rem] font-medium text-white shadow-[0_2px_8px_rgba(13,148,136,.3)] transition-all hover:-translate-y-px hover:shadow-[0_4px_16px_rgba(13,148,136,.4)]"
        >
          Subscribe
        </button>
      </div>
      <p className="mt-2.5 text-[0.68rem] text-white/20">
        No spam. Unsubscribe at any time.
      </p>
    </form>
  )
}
