export const RESTRICTED_COUNTRIES_ISO = [
  'CU',
  'IR',
  'KP',
  'SY',
  'RU',
  'BY',
] as const

export function isRestrictedCountry(iso: string): boolean {
  return RESTRICTED_COUNTRIES_ISO.includes(
    iso as (typeof RESTRICTED_COUNTRIES_ISO)[number]
  )
}
