const BRIDGES = {
  'dark-to-light': 'from-dark-base to-off-white',
  'light-to-dark': 'from-off-white to-dark-base',
  'dark-to-white': 'from-dark-base to-white',
  'white-to-dark': 'from-white to-dark-base',
  'dark-to-warm': 'from-dark-base to-warm-gray',
  'warm-to-light': 'from-warm-gray to-off-white',
  'light-to-white': 'from-off-white to-white',
  'white-to-light': 'from-white to-off-white',
} as const

interface SectionBridgeProps {
  variant: keyof typeof BRIDGES
}

export function SectionBridge({ variant }: SectionBridgeProps) {
  return <div className={`h-6 bg-gradient-to-b ${BRIDGES[variant]} opacity-70`} aria-hidden="true" />
}
