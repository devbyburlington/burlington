'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

const COOKIE_KEY = 'burlington:cookie-consent'

type Consent = 'accepted' | 'declined'

function getConsent(): Consent | null {
  if (typeof window === 'undefined') return null
  return localStorage.getItem(COOKIE_KEY) as Consent | null
}

function setConsent(value: Consent) {
  localStorage.setItem(COOKIE_KEY, value)
}

export function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const existing = getConsent()
    if (!existing) {
      const timer = setTimeout(() => setVisible(true), 1500)
      return () => clearTimeout(timer)
    }
  }, [])

  function handleAccept() {
    setConsent('accepted')
    setVisible(false)
  }

  function handleDecline() {
    setConsent('declined')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="cookie-banner">
      <div className="cookie-banner-inner">
        <p className="cookie-banner-text">
          We use cookies to analyse site traffic and improve your experience.
          By accepting, you consent to our use of analytics cookies.{' '}
          <Link href="/privacy" className="cookie-banner-link">
            Privacy Policy
          </Link>
        </p>
        <div className="cookie-banner-actions">
          <button onClick={handleDecline} className="cookie-btn-decline">
            Decline
          </button>
          <button onClick={handleAccept} className="cookie-btn-accept">
            Accept
          </button>
        </div>
      </div>
    </div>
  )
}
