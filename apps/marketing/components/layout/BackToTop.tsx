'use client'

import { useState, useEffect } from 'react'

export function BackToTop() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setIsVisible(window.scrollY > 400)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <button
      type="button"
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className={`fixed bottom-6 right-6 z-40 flex h-10 w-10 items-center justify-center rounded-full border border-teal/30 bg-dark-base/90 text-teal-light shadow-[0_4px_20px_rgba(0,0,0,.3)] backdrop-blur-sm transition-all hover:border-teal/50 hover:shadow-[0_4px_20px_rgba(13,148,136,.2)] sm:bottom-8 sm:right-8 sm:h-11 sm:w-11 ${
        isVisible
          ? 'translate-y-0 opacity-100'
          : 'pointer-events-none translate-y-4 opacity-0'
      }`}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <polyline points="18 15 12 9 6 15" />
      </svg>
    </button>
  )
}
