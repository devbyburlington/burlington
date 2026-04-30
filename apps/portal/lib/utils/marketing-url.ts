const MARKETING_URL_FALLBACK = process.env.NEXT_PUBLIC_MARKETING_URL || 'https://burlingtonconsult.com'

export function getMarketingUrl(): string {
  if (typeof window === 'undefined') return MARKETING_URL_FALLBACK
  if (window.location.hostname === 'localhost' || window.location.hostname.match(/^\d/)) {
    return `${window.location.protocol}//${window.location.hostname}:4000`
  }
  return MARKETING_URL_FALLBACK
}

export { MARKETING_URL_FALLBACK }
