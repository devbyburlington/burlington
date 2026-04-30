import type { ReactNode } from 'react'

interface CheckItemProps {
  children: ReactNode
}

export function CheckItem({ children }: CheckItemProps) {
  return (
    <div className="sv-check-item">
      <svg viewBox="0 0 24 24" className="sv-check-icon">
        <polyline points="20 6 9 17 4 12" />
      </svg>
      <span>{children}</span>
    </div>
  )
}
