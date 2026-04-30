'use client'

import { useState, useEffect } from 'react'
import { getMarketingUrl, MARKETING_URL_FALLBACK } from '../../lib/utils/marketing-url'

interface BrandPanelProps {
  heading?: React.ReactNode
  body?: string
  quote?: string
}

export function BrandPanel({ heading, body, quote }: BrandPanelProps) {
  const [siteUrl, setSiteUrl] = useState(MARKETING_URL_FALLBACK)

  useEffect(() => {
    setSiteUrl(getMarketingUrl())
  }, [])

  return (
    <aside className="auth-brand">
      <div className="auth-brand-top">
        <a href={siteUrl} className="flex items-center gap-[3px] font-serif text-[1.25rem] font-medium text-white">
          Burlington
          <span className="inline-block h-[6px] w-[6px] rounded-full bg-teal-light shadow-[0_0_10px_rgba(45,212,191,.5)]" />
        </a>
        <span className="ml-3.5 border-l border-white/10 pl-3.5 font-sans text-[0.625rem] font-medium uppercase tracking-[.14em] text-white/45">
          Client Portal
        </span>
      </div>

      <div className="auth-brand-middle">
        <h1 className="mb-4 font-serif text-[clamp(1.75rem,2.8vw,2.375rem)] font-medium leading-[1.14] tracking-tight text-white">
          {heading ?? (
            <>
              Your case, your{' '}
              <em className="font-medium italic text-teal-light" style={{ textShadow: '0 0 24px rgba(45,212,191,.25)' }}>
                documents
              </em>
              , your path to a U.S. green card.
            </>
          )}
        </h1>
        <p className="max-w-[48ch] text-[1rem] leading-[1.65] text-white/60">
          {body ?? 'Track your case journey, upload evidence, book consultations, and communicate with your adviser — all in one secure place.'}
        </p>
      </div>

      <div className="auth-brand-quote">
        <p className="mb-3 font-serif text-[0.875rem] italic leading-[1.55] text-white/48">
          &ldquo;{quote ?? 'A self-petitioned EB-1A is built on three things: your record, your field of endeavour, and the specificity of your evidence. We handle the latter two.'}&rdquo;
        </p>
        <div className="flex items-center gap-2 text-[0.69rem] text-white/30">
          <span className="h-px w-4 bg-white/20" />
          Chris Ogbodo, Founder
        </div>
      </div>
    </aside>
  )
}
