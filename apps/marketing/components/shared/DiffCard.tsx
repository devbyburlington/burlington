import type { ReactNode } from 'react'

interface DiffCardProps {
  icon: ReactNode
  title: string
  description: string
}

export function DiffCard({ icon, title, description }: DiffCardProps) {
  return (
    <div className="diff-card">
      <div className="diff-card-icon">{icon}</div>
      <div>
        <h4 className="diff-card-title">{title}</h4>
        <p className="diff-card-desc">{description}</p>
      </div>
    </div>
  )
}
