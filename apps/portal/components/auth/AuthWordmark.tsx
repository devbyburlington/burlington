'use client'

import { useState, useEffect } from 'react'
import { getMarketingUrl, MARKETING_URL_FALLBACK } from '../../lib/utils/marketing-url'

export function AuthWordmark() {
  const [href, setHref] = useState(MARKETING_URL_FALLBACK)

  useEffect(() => {
    setHref(getMarketingUrl())
  }, [])

  return (
    <a href={href} className="auth-form-wordmark">
      Burlington
      <span className="inline-block h-[5px] w-[5px] rounded-full bg-teal" />
    </a>
  )
}
